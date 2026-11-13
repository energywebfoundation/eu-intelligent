import type { CommonConfig } from '@energywebfoundation/generic-green-proofs-config';

import { AccountEntity } from './account/schema.js';
import { CompanyEntity } from './company/schema.js';
import { UnitEntity } from './unit/schema.js';
import { UserEntity } from './user/schema.js';

export { AccountMetadata } from './account/schema.js';
export { CompanyMetadata } from './company/schema.js';
export { UserMetadata } from './user/schema.js';
export { UnitMetadata } from './unit/types.js';

export const AppManifest: CommonConfig['manifest'] = {
  Entities: {
    Account: AccountEntity,
    Company: CompanyEntity,
    Unit: UnitEntity,
    User: UserEntity,
  },
  System: {},
};
