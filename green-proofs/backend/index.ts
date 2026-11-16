import type { ConfigurationPack } from '@energywebfoundation/generic-green-proofs-api';
import { createCommonConfig } from '@energywebfoundation/generic-green-proofs-config';
import { createBackendConfig } from '@energywebfoundation/generic-green-proofs-config/backend';
import { AccountTypesDetails } from '@shared/entities/account/config.js';
import { CompanyRolesDetails } from '@shared/entities/company/roles.js';
import type {
  AccountMetadata,
  CompanyMetadata,
  UserMetadata,
} from '@shared/index.js';
import { AppManifest } from '@shared/index.js';

import { AccountRolesDetails } from '../../shared/src/entities/account/roles.js';
import {
  accountFilterFields,
  companyFilterFields,
  unitFilterFields,
  unitProcessFilterFields,
  userFilterFields,
} from './filters/index.js';
import {
  appElrondConfig,
  iamConfig,
} from './iam/index.js';
import { AppApiModule } from './modules/app-api/app-api.module.js';
import { AppEmailsModule } from './modules/app-emails/app-emails.module.js';
import { customizedMinimalEmails } from './modules/app-emails/factories/index.js';
import { LocalOriginModule } from './modules/local-origin/local-origin.module.js';
import { SelfConsumptionModule } from './modules/self-consumption/self-consumption.module.js';
import { payloadGenerator } from './payload/index.js';
import { errorTranslations } from './translations/error-translations.js';
import { unitVolumeFactor } from './unit-view/factor.js';
import { unitViewBuilder } from './unit-view/unit-view-builder.js';

export const backendConfiguration: Omit<ConfigurationPack, 'envConfigPayload'> = {
  ...createBackendConfig(
    createCommonConfig({
      manifest: AppManifest,
      appName: 'Intelligent',
      themeName: 'pacific',
      unitVolumeFactor,
      payloadGenerator,
      AccountRolesDetails,
      AccountTypesDetails,
      CompanyRolesDetails,
    }),
    {
      unitProcess: {
        issueProcess: false,
        transferProcess: false,
        retireProcess: false,
        splitProcess: false,
        unitRemoveProcess: false,
        unitEditProcess: false,
      },
      onboarding: {},
      company: {
        createCompanyProcess: false,
        editCompanyProcess: false,
      },
      accountProcess: {
        accountEditProcess: false,
        accountCreateProcess: false,
      },
      userProcess: {
        userLeaveProcess: false,
      },
      modules: [AppEmailsModule, LocalOriginModule, SelfConsumptionModule],
      apiModules: [AppApiModule.register()],
      errorTranslations,
      excludePathsFromUnitsView: [],
      accountFilterFields,
      companyFilterFields,
      unitFilterFields,
      userFilterFields,
      unitProcessFilterFields,
      iamConfig,
      unitViewBuilder,
      valueToString: (value: unknown) => String(value),
      elrondConfig: appElrondConfig,
      mailConfig: {
        useMinimalEmailHTMLTemplateProvider: false,
        email: customizedMinimalEmails,
      },
      bootstrapConfig: { // data provided here is mostly arbitrary
        firstRegistryAdminCompanyData: {
          email: 'info@intelligent.com',
          name: 'Intelligent',
        } satisfies CompanyMetadata,
        firstRegistryAdminUserData: {
          email: 'support@energyweb.org', // not overwritten by env config, but not used anyway
          firstName: 'John', // overwritten by env config
          lastName: 'Smith', // overwritten by env config
        } satisfies UserMetadata,
        noOwnerAccountData: {
          asset_class: 'HeatPump',
          name: 'Void account',
          asset_registry_reference: 'void-account',
          externalId: 'void-account-external-id',
          metering_point_id: 'void-metering-point-id',
        } satisfies AccountMetadata,
        noOwnerCompanyData: {
          name: 'void account',
          email: 'support@energyweb.org',
        } satisfies CompanyMetadata,
      },
    },
  ),
  dataMigrations: {
    unit: [],
    account: [],
    process: {},
  },
};
