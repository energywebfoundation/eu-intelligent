import type { UnitComputed } from '@backend/unit-view/unit-view-builder.js';
import {
  API,
  type UnitView,
} from '@energywebfoundation/generic-green-proofs-api';
import { UnitCertificate } from '@shared/entities/unit/types.js';
import { z } from 'zod';

@API.Schema('Certificate')
export class CertificateDTO extends API.createDto(UnitCertificate) {
  public static fromUnitView(unitView: UnitView): CertificateDTO {
    const computed = unitView.computed as UnitComputed;

    return computed.certificate;
  }
}

export namespace GetCertificatesRequest {
  @API.Schema('GetCertificatesRequestQuery')
  export class QueryDTO extends API.createDto(z.object({
    ownerId: z.string().optional().describe('Producer/consumer ID to find certificates for'), // requires finding actual account for externalId
    retired: z.boolean().optional().describe('Return retired or non-retired certificates only'),
  })) { }

  @API.Schema('GetCertificatesRequestResponse')
  export class ResponseDTO extends API.createDto(z.object({
    certificates: z.array(CertificateDTO.schema),
  })) {
    public static fromUnitViews(input: { units: UnitView[] }): ResponseDTO {
      return {
        certificates: input.units.map(CertificateDTO.fromUnitView),
      };
    }
  }
}
