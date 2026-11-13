import {
  ConfigModule,
  GandalfModule,
  IamModule,
  ProcessModule,
  UnitModule,
  UnitProcessModule,
} from '@energywebfoundation/generic-green-proofs-api';
import { Module } from '@nestjs/common';

import { AppConfigModule } from '../app-config/app-config.module.js';
import { EnergyEventModule } from '../energy-event/energy-event.module.js';
import { IamIntelligentModule } from '../iam-intelligent/iam-intelligent.module.js';
import { LocalOriginEnergyProcess } from './local-origin-energy-process/local-origin-energy-process.process.js';
import { LocalOriginReceivedHandler } from './local-origin-received.handler.js';

@Module({
  providers: [
    LocalOriginReceivedHandler,
  ],
  imports: [IamModule, IamIntelligentModule, UnitModule, UnitProcessModule, GandalfModule, ConfigModule, AppConfigModule, EnergyEventModule],
})
@ProcessModule({
  processes: [
    LocalOriginEnergyProcess,
  ],
})
export class LocalOriginModule {}
