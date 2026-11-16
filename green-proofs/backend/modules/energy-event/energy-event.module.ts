import { UnitModule } from '@energywebfoundation/generic-green-proofs-api';
import { Module } from '@nestjs/common';

import { AppConfigModule } from '../app-config/app-config.module.js';
import { EnergyEventIntegrationService } from './energy-event-integration.service.js';
import {
  DigitalSpineMessageBroker,
  MessageBroker,
} from './message-broker.js';
import { RetrieveEnergyRecordsTask } from './retrieve-energy-records.task.js';

@Module({
  providers: [
    EnergyEventIntegrationService,
    RetrieveEnergyRecordsTask,
    {
      provide: MessageBroker,
      useClass: DigitalSpineMessageBroker,
    },
  ],
  exports: [EnergyEventIntegrationService],
  imports: [UnitModule, AppConfigModule],
})
export class EnergyEventModule {}
