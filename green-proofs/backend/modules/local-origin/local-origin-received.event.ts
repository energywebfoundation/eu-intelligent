import { AppEvent } from '@energywebfoundation/generic-green-proofs-api';
import type { DomainTypes } from '@shared/generated-types.js';

type Payload = {
  localOriginRecord: DomainTypes.LocalOriginRecord;
};

@AppEvent.Bus.RegisterEvent('local_origin_received')
export class LocalOriginReceivedBusEvent extends AppEvent.Bus.Event<Payload> {}

export class LocalOriginReceived implements AppEvent.BusSource {
  public constructor(
    public readonly payload: Payload,
  ) {}

  public toBusEvent() {
    return {
      event: new LocalOriginReceivedBusEvent(this.payload),
    };
  }
}
