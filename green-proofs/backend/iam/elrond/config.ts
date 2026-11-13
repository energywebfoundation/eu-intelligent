import type { ConfigurationPack } from '@energywebfoundation/generic-green-proofs-api';
import { BackendMinimalConfig } from '@energywebfoundation/generic-green-proofs-config/backend';

export const appElrondConfig: ConfigurationPack['elrondConfig'] = {
  ...BackendMinimalConfig.defaultElrondConfig,
};
