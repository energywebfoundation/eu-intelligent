import type { TranslationTemplates } from '@energywebfoundation/generic-green-proofs-api';
import { BackendMinimalConfig } from '@energywebfoundation/generic-green-proofs-config/backend';
import lodash from 'lodash';

const { merge } = lodash;

export const errorTranslations = merge({}, BackendMinimalConfig.errorTranslations, {
  root: 'Unknown App error',
  error: {
    root: 'Unknown App error',
    iam_intelligent: {
      root: 'Unknown IAM error',
      company_without_account: 'Found company without account',
    },
  },
} satisfies TranslationTemplates);
