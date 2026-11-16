import { IamModule } from '@energywebfoundation/generic-green-proofs-api';
import { Module } from '@nestjs/common';

import { SiteService } from './site.service.js';

@Module({
  providers: [SiteService],
  exports: [SiteService],
  imports: [IamModule],
})
export class IamIntelligentModule {}
