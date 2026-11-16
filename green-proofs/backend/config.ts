import { getEnvConfig } from '@energywebfoundation/generic-green-proofs-api';

import { backendConfiguration } from './index.js';

export const configuration = {
  ...backendConfiguration,
  envConfigPayload: getEnvConfig(),
};
