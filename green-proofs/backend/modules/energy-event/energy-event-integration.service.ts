import {
  Energy,
  type EnergyEventProcessTransactions,
} from '@backend/domain.js';
import { UnitFacade } from '@energywebfoundation/generic-green-proofs-api';
import { groupBy } from '@energywebfoundation/generic-green-proofs-common';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EnergyEventIntegrationService {
  constructor(
    private unitFacade: UnitFacade,
  ) { }

  public getProcessTransactionsIntegration(params: {
    processId: string;
  }): EnergyEventProcessTransactions {
    return {
      getCertificatesOwnedBy: async (accountId: string) => {
        const units = await this.unitFacade.query().alive().withOwnerId(accountId).execute();

        return units.map(u => ({
          createdAt: u.createdAt,
          id: u.id,
          energy: Energy.fromVolume(u.volume),
        }));
      },
      createCertificate: async (certData) => {
        const accountId = certData.ownerId;

        const unit = await this.unitFacade.issue({
          createdBy: { accountId, processId: params.processId },
          isFinal: false,
          metadata: certData.metadata,
          ownerId: accountId,
          volume: certData.energy.toVolume(),
        });

        return { id: unit.id, energy: certData.energy };
      },
      modifyCertificates: async (modifications) => {
        const groupedByCertId = groupBy(modifications, m => m.certificateId);

        for (const [certId, modifications] of Object.entries(groupedByCertId)) {
          const unit = await this.unitFacade.getById(certId);

          await this.unitFacade.modify({
            createdBy: { processId: params.processId, accountId: unit.ownerId },
            unitId: certId,
            children: modifications.map((modification, index) => {
              const accountId = modification.newOwnerId ? modification.newOwnerId : undefined;
              return {
                volume: modification.energy.toVolume(),
                isFinal: modification.isRetired ?? false,
                ownerId: accountId,
                // it doesn't matter that much, because there will be no processes pending
                rebaseTarget: index === 0,
                metadata: modification.metadata,
              };
            }),
          });
        }
      },
    };
  }
}
