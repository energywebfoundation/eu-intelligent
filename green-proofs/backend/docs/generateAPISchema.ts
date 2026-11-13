import { apiSchemaBuilder } from '@energywebfoundation/generic-green-proofs-api';

import { AppApiModule } from '../modules/app-api/app-api.module.js';

await apiSchemaBuilder({
  controllersModule: AppApiModule.registerControllersOnly(),
}).then(r => r.toStdoutYaml());
