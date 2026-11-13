import {
  IamFacade,
  UnitViewFacade,
  UseGet,
} from '@energywebfoundation/generic-green-proofs-api';
import {
  BadRequestException,
  Controller,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { GetCertificatesRequest } from './certificates.dto.js';
import { IntelligentAuthGuard } from './intelligent-auth.guard.js';

@Controller('/intelligent')
@ApiTags('INTELLIGENT')
@UseGuards(IntelligentAuthGuard)
export class CertificatesController {
  constructor(
    private unitViewFacade: UnitViewFacade,
    private iamFacade: IamFacade,
  ) { }

  @UseGet('/certificates', {
    description: 'Return certificates',
    type: GetCertificatesRequest.ResponseDTO,
  })
  public async getCertificates(
    @Query() query: GetCertificatesRequest.QueryDTO,
  ): Promise<GetCertificatesRequest.ResponseDTO> {
    const ownerId = query.ownerId ? await this.getAccountIdForExternalId(query.ownerId) : null;

    const units = await this.unitViewFacade
      .query()
      .then((b) => {
        if (ownerId) {
          return b.withOwnerId(ownerId);
        }
      })
      .then((b) => {
        if (query.retired !== undefined) {
          return query.retired === true ? b.final() : b.unfinal();
        }
      })
      .ordering('created_at', 'asc')
      .latest()
      .execute();

    return GetCertificatesRequest.ResponseDTO.fromUnitViews({ units });
  }

  private async getAccountIdForExternalId(externalId: string): Promise<string> {
    const account = await this.iamFacade.account.findOneBy({
      data: { externalId },
    });

    if (account === null) {
      throw new BadRequestException(`Cannot find owner of id: ${externalId}`);
    }

    return account.id;
  }
}
