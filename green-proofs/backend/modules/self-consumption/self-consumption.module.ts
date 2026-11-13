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
import { SelfConsumptionEnergyProcess } from './self-consumption-energy-process/self-consumption-energy-process.process.js';
import { SelfConsumptionReceivedHandler } from './self-consumption-received.handler.js';

@Module({
  providers: [
    SelfConsumptionReceivedHandler,
  ],
  imports: [IamModule, IamIntelligentModule, UnitModule, UnitProcessModule, GandalfModule, ConfigModule, AppConfigModule, EnergyEventModule],
})
@ProcessModule({
  processes: [
    SelfConsumptionEnergyProcess,
  ],
})
export class SelfConsumptionModule {}
