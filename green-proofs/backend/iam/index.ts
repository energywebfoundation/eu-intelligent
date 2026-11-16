import type { ConfigurationPack } from '@energywebfoundation/generic-green-proofs-api';
import { accountRoles } from '@shared/entities/account/roles.js';
import {
  companyRoles,
  companyRolesActions,
} from '@shared/entities/company/roles.js';
export { appElrondConfig } from './elrond/config.js';

export const iamConfig: ConfigurationPack['iamConfig'] = {
  directCompanyCreating: true,
  directAccountCreating: true,
  directUserCreating: true,

  accountRoles,
  companyRoles,
  companyRolesActions,
};
