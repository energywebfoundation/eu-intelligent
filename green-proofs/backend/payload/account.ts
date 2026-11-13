import { sample } from '@energywebfoundation/generic-green-proofs-common';
import { faker } from '@faker-js/faker';
import type { AccountMetadata } from '@shared/index.js';

export const generateAccountPayload = (account?: Partial<AccountMetadata>): AccountMetadata => ({
  asset_class: sample(['Battery', 'HeatPump', 'PV', 'MeteringPoint']),
  externalId: faker.string.uuid(),
  asset_registry_reference: faker.string.uuid(),
  metering_point_id: faker.string.uuid(),
  name: faker.company.name(),
  ...account,
});
