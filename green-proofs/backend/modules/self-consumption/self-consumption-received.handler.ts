import {
  Actor,
  AppEvent,
  GandalfFacade,
} from '@energywebfoundation/generic-green-proofs-api';
import { Logger } from '@energywebfoundation/generic-green-proofs-logger';

import { SelfConsumptionEnergyProcess } from './self-consumption-energy-process/self-consumption-energy-process.process.js';
import { SelfConsumptionReceivedBusEvent } from './self-consumption-received.event.js';

@AppEvent.Bus.EventHandler({
  events: [SelfConsumptionReceivedBusEvent],
  queueName: 'self_consumption_received_handler',
  queueConfig: {
    policy: 'key_strict_fifo',
    singletonKey: 'self_consumption_received_handler',
  },
})
export class SelfConsumptionReceivedHandler implements AppEvent.Bus.EventHandler<SelfConsumptionReceivedBusEvent> {
  constructor(
    private loggerService: Logger,
    private gandalfFacade: GandalfFacade,
  ) {}

  public async handle(event: SelfConsumptionReceivedBusEvent): Promise<void> {
    const selfConsumptionRecord = event.payload.selfConsumptionRecord;

    const selfConsumptionEventReference = selfConsumptionRecord.trade_and_delivery.self_consumption_event_reference;
    const existingProcess = await this.gandalfFacade.findSingle({
      actor: Actor.SystemActor,
      type: SelfConsumptionEnergyProcess,
      context: {
        selfConsumptionEventReference: { $eq: selfConsumptionEventReference },
      },
    });

    if (existingProcess) {
      this.loggerService.logWarn(`Received duplicated self consumption record of reference: ${selfConsumptionEventReference}`);
      return;
    }

    await this.gandalfFacade.createProcess(SelfConsumptionEnergyProcess, {
      actor: Actor.SystemActor,
      categoryPayload: {},
      data: {
        selfConsumptionRecord,
      },
    });
  }
}
