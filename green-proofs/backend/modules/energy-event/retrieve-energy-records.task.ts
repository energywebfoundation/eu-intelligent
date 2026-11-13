import { randomUUID } from 'node:crypto';

import {
  AppEventBus,
  ConfigFacade,
  type ITask,
  RegisterTask,
} from '@energywebfoundation/generic-green-proofs-api';
import { orderBy } from '@energywebfoundation/generic-green-proofs-common';
import { Logger } from '@energywebfoundation/generic-green-proofs-logger';
import { DomainTypes } from '@shared/generated-types.js';
import z from 'zod';

import { AppConfig } from '../app-config/app-config.js';
import { LocalOriginReceived } from '../local-origin/local-origin-received.event.js';
import { SelfConsumptionReceived } from '../self-consumption/self-consumption-received.event.js';
import { MessageBroker } from './message-broker.js';

type EnergyRecord = DomainTypes.LocalOriginRecord | DomainTypes.SelfConsumptionRecord;

type Storage = {
  lastTimeRangeUpperBound: string;
  clientId: string;
};

const fifteenMinutesInMs = 1000 * 60 * 15;
const timeRangeInMs = fifteenMinutesInMs;

@RegisterTask()
export class RetrieveEnergyRecordsTask implements ITask<Storage> {
  constructor(
    private appEventBus: AppEventBus,
    private appConfig: AppConfig,
    private configFacade: ConfigFacade,
    private messageBroker: MessageBroker,
  ) {}

  public getUniqueTag(): string {
    return RetrieveEnergyRecordsTask.name;
  }

  public getName(): string {
    return 'Retrieve energy records task';
  }

  public getCron(): string {
    return this.appConfig.config.retrieveEnergyRecordsCron;
  }

  public async run(logger: Logger, storage: Storage | null): Promise<Storage> {
    const clientId = storage?.clientId ?? `gp-intelligent-client-id-${randomUUID()}`;
    let lastTimeRangeUpperBound = storage ? new Date(storage.lastTimeRangeUpperBound) : this.floorDateToRange(this.getInitialStartTime());

    const ranges = this.getTimeRanges(lastTimeRangeUpperBound);

    for (const range of ranges) {
      try {
        const { requestId } = await this.sendMessageToGetEnergyRecords({ range, logger });
        const energyRecords = await this.readEnergyRecords({ requestId, clientId, logger });

        if (energyRecords.length === 0 && !this.configFacade.isTest()) {
          // Do not log 0 energy records in tests
          logger.logInfo(`Retrieved ${energyRecords.length} energy records for range: ${range.start.toISOString()} -- ${range.end.toISOString()}`);
        }

        if (energyRecords.length === 0) {
          lastTimeRangeUpperBound = range.end;
          continue;
        }

        const localOriginRecords = energyRecords.filter((r): r is DomainTypes.LocalOriginRecord => r.identity.record_type === 'local_origin_record');
        const selfConsumptionRecords = energyRecords.filter((r): r is DomainTypes.SelfConsumptionRecord => r.identity.record_type === 'self_consumption_record');

        const localOriginEvents = localOriginRecords.map(localOriginRecord => new LocalOriginReceived({ localOriginRecord }));
        const selfConsumptionEvents = selfConsumptionRecords.map(selfConsumptionRecord => new SelfConsumptionReceived({ selfConsumptionRecord }));

        // Both record types are processed independently, so they are ordered separately
        await this.appEventBus.publish([
          ...this.orderLocalOriginEvents(localOriginEvents),
          ...this.orderSelfConsumptionEvents(selfConsumptionEvents),
        ]);

        lastTimeRangeUpperBound = range.end;
      } catch (rawError: unknown) {
        logger.logError({ message: `Cannot fetch range: <${range.start.toISOString()}, ${range.end.toISOString()}>. Aborting safely.`, error: rawError });
        break;
      }
    }

    return { lastTimeRangeUpperBound: lastTimeRangeUpperBound.toISOString(), clientId };
  }

  // Builds time ranges starting from startFrom (including it (+1) if equal to 15-minute period, ignoring otherwise)
  // ending in NOW (excluding it if equal to 15-minute period)
  // ranges are ordered ASC
  // all start dates are bigger by 1ms to create `(start, end>` range
  public getTimeRanges(startFrom: Date): { start: Date; end: Date }[] {
    const now = new Date().getTime();
    const oneSecondInMs = 1000;
    const startAt = this.ceilDateToRange(startFrom).getTime();
    const endAt = this.floorDateToRange(new Date(now)).getTime(); // floor to not look into future
    const ranges: { start: Date; end: Date }[] = [];

    let currentStartAt = startAt;
    let currentEndAt = currentStartAt + timeRangeInMs;

    while (currentEndAt < now && currentEndAt <= endAt) {
      ranges.push({ start: new Date(currentStartAt + oneSecondInMs), end: new Date(currentEndAt) });
      currentStartAt = currentStartAt + timeRangeInMs;
      currentEndAt = currentEndAt + timeRangeInMs;
    }

    return ranges;
  }

  public floorDateToRange(date: Date) {
    return new Date(Math.floor(date.getTime() / timeRangeInMs) * timeRangeInMs);
  }

  public ceilDateToRange(date: Date) {
    return new Date(Math.ceil(date.getTime() / timeRangeInMs) * timeRangeInMs);
  }

  private orderLocalOriginEvents(events: LocalOriginReceived[]): LocalOriginReceived[] {
    return orderBy(events, [
      t => new Date(t.payload.localOriginRecord.time_and_quantity.interval_end).getTime(),
      (t) => {
        // push battery consumptions to front
        return t.payload.localOriginRecord.consumption_asset.asset_class === 'Battery' ? 1 : 0;
      },
    ], ['asc', 'asc']);
  }

  private orderSelfConsumptionEvents(events: SelfConsumptionReceived[]): SelfConsumptionReceived[] {
    return orderBy(events, [
      t => new Date(t.payload.selfConsumptionRecord.time_and_quantity.interval_end).getTime(),
    ], ['asc']);
  }

  private getInitialStartTime() {
    const timestamp = this.appConfig.config.retrieveEnergyRecordsInitialTimestamp;

    return timestamp ? new Date(timestamp) : new Date();
  }

  private toSeconds(date: Date) {
    return Math.floor(date.getTime() / 1000);
  }

  private async sendMessageToGetEnergyRecords({ range, logger }: { range: { start: Date; end: Date }; logger: Logger }): Promise<{ requestId: string }> {
    const requestId = `gp-intelligent-req-id-${randomUUID()}`;

    logger.logInfo(`Sending request for energy records for requestId=${requestId}`);
    await this.messageBroker.send({
      requestId,
      payload: {
        requestId,
        operation: 'guarantees_of_origin.query',
        payload: { startTime: this.toSeconds(range.start), endTime: this.toSeconds(range.end) },
      },
    });

    return { requestId };
  }

  private async readEnergyRecords({ requestId, clientId, logger }: { requestId: string; clientId: string; logger: Logger }): Promise<EnergyRecord[]> {
    logger.logInfo(`Reading energy records for requestId=${requestId}`);
    return await this.messageBroker.readUntil({
      clientId,
      parse: (payloads) => {
        const gsyResponses = z.array(GSYResponse).parse(payloads);
        const gsyResponsesForRequestId = gsyResponses.filter(msg => msg.requestId === requestId); // usually only one message should match

        if (gsyResponsesForRequestId.length === 0) {
          throw new Error(`Cannot read energy records: no messages for requestId=${requestId} found`);
        }

        const energyRecords = gsyResponsesForRequestId.flatMap(m => m.data);

        return energyRecords;
      },
    });
  }
}

const GSYResponse = z.object({
  requestId: z.string(),
  success: z.boolean(),
  data: z.array(z.union([DomainTypes.LocalOriginRecord, DomainTypes.SelfConsumptionRecord])),
});
