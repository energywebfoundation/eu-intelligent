import {
  Actor,
  AppEvent,
  GandalfFacade,
} from '@energywebfoundation/generic-green-proofs-api';
import { Logger } from '@energywebfoundation/generic-green-proofs-logger';

import { mergeTradeHashes } from './helpers.js';
import { LocalOriginEnergyProcess } from './local-origin-energy-process/local-origin-energy-process.process.js';
import { LocalOriginReceivedBusEvent } from './local-origin-received.event.js';

@AppEvent.Bus.EventHandler({
  events: [LocalOriginReceivedBusEvent],
  queueName: 'local_origin_received_handler',
  queueConfig: {
    policy: 'key_strict_fifo',
    singletonKey: 'local_origin_received_handler',
  },
})
export class LocalOriginReceivedHandler implements AppEvent.Bus.EventHandler<LocalOriginReceivedBusEvent> {
  constructor(
    private loggerService: Logger,
    private gandalfFacade: GandalfFacade,
  ) {}

  public async handle(event: LocalOriginReceivedBusEvent): Promise<void> {
    const localOriginRecord = event.payload.localOriginRecord;

    const mergedTradeHashes = mergeTradeHashes(localOriginRecord.trade_and_delivery.trade_hash);
    const existingProcess = await this.gandalfFacade.findSingle({
      actor: Actor.SystemActor,
      type: LocalOriginEnergyProcess,
      context: {
        mergedTradeHashes: { $eq: mergedTradeHashes },
      },
    });

    if (existingProcess) {
      this.loggerService.logWarn(`Received duplicated local origin record of hash: ${mergedTradeHashes}`);
      return;
    }

    await this.gandalfFacade.createProcess(LocalOriginEnergyProcess, {
      actor: Actor.SystemActor,
      categoryPayload: {},
      data: {
        localOriginRecord,
      },
    });
  }
}
