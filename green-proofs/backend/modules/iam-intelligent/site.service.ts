import { IamFacade } from '@energywebfoundation/generic-green-proofs-api';
import { SearchOperator } from '@energywebfoundation/generic-green-proofs-api';
import { Injectable } from '@nestjs/common';
import type {
  AccountMetadata,
  CompanyMetadata,
} from '@shared/index.js';

import { CompanyWithoutAccountError } from './errors.js';

@Injectable()
export class SiteService {
  constructor(
    private iamFacade: IamFacade,
  ) { }

  public async ensureAccountAndCompany(params: { metadata: Omit<AccountMetadata, 'name'> }): Promise<{ accountId: string }> {
    const externalId = params.metadata.externalId;

    const existingAccount = await this.iamFacade.account.findOneBy({
      data: {
        externalId,
      },
    });

    if (existingAccount) {
      return { accountId: existingAccount.id };
    }

    const [company] = await this.iamFacade.company.find({
      search: [
        {
          key: 'data.externalId',
          operator: SearchOperator.Equal,
          value: externalId,
        },
      ],
    });

    if (company !== undefined) {
      throw new CompanyWithoutAccountError({ externalId });
    }

    // Account requires company, so we just create one for it
    // Probably in future this hierarchy can be better utilized
    const { id: companyId } = await this.iamFacade.company.create({
      name: `Site company ${externalId}`,
      data: {
        email: 'intelligent@internal.com',
        name: `Site company ${externalId}`,
      } satisfies CompanyMetadata,
    });

    const accountMetadata: AccountMetadata = {
      ...params.metadata,
      name: `Site ${externalId}`,
    };
    const { accountId } = await this.iamFacade.account.create({
      companyId,
      creatingUserId: await this.getRegistryAdminUserId(),
      accountName: accountMetadata.name,
      accountData: accountMetadata,
    });

    return { accountId };
  }

  private async getRegistryAdminUserId() {
    const [membership] = await this.iamFacade.registryAdmin.findAllMemberships();
    if (membership === undefined) {
      throw new Error('There is no registry admin.');
    }
    return membership.userId;
  }
}
