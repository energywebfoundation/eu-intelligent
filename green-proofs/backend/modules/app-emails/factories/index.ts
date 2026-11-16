import type { MinimalEmailsModuleOpts } from '@energywebfoundation/generic-green-proofs-config/backend';

import { TestEmailFactory } from './test.email-factory.js';

export * from './test.email-factory.js';

/**
 * All factories that are gp-intelligent specific
 */
export const EmailFactories = [
  TestEmailFactory,
];

/**
 * All factories that are used by minimal configuration i.e. if an email factory is used internally by the minimal configuration, you can override it here
 */
export const customizedMinimalEmails: MinimalEmailsModuleOpts['email'] = {
  factories: {},
  factoriesModuleDependencies: [],
};
