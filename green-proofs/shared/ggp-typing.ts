import type {
  DefineAccountMetadata,
  DefineCompanyMetadata,
  DefineUnitMetadata,
  DefineUserMetadata,
} from '@energywebfoundation/generic-green-proofs-api';

import type {
  AccountMetadata,
  CompanyMetadata,
  UnitMetadata,
  UserMetadata,
} from './entities/index.js';

declare module '@energywebfoundation/generic-green-proofs-api' {
  export interface TypeConfig {
    AccountMetadata: DefineAccountMetadata<AccountMetadata>;
    CompanyMetadata: DefineCompanyMetadata<CompanyMetadata>;
    UserMetadata: DefineUserMetadata<UserMetadata>;
    UnitMetadata: DefineUnitMetadata<UnitMetadata>;
  }
}
