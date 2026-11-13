import { AppEvent } from '@energywebfoundation/generic-green-proofs-api';
import type { DomainTypes } from '@shared/generated-types.js';

type Payload = {
  selfConsumptionRecord: DomainTypes.SelfConsumptionRecord;
};

@AppEvent.Bus.RegisterEvent('self_consumption_received')
export class SelfConsumptionReceivedBusEvent extends AppEvent.Bus.Event<Payload> {}

export class SelfConsumptionReceived implements AppEvent.BusSource {
  public constructor(
    public readonly payload: Payload,
  ) {}

  public toBusEvent() {
    return {
      event: new SelfConsumptionReceivedBusEvent(this.payload),
    };
  }
}
