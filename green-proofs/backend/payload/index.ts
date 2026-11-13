import {
  AccountStatus,
  type PayloadGenerator,
} from '@energywebfoundation/generic-green-proofs-api';
import { faker } from '@faker-js/faker';

import { generateAccountPayload } from './account.js';
import { generateCompanyPayload } from './company.js';
import { generateUnitPayload } from './unit.js';
import { generateUserPayload } from './user.js';

export const payload = {
  account: generateAccountPayload,
  company: generateCompanyPayload,
  unitMetadata: generateUnitPayload,
  user: generateUserPayload,
};

export const payloadGenerator: PayloadGenerator = {
  account(data) {
    const fake = payload.account(data.data);
    return {
      createdById: data.createdById ?? faker.string.uuid(),
      data: fake,
      name: `Site ${fake.externalId}`,
      status: data.status ?? AccountStatus.Active,
      companyId: data.companyId ?? faker.string.uuid(),
    };
  },
  company(data) {
    const fake = payload.company(data?.data);
    return {
      data: fake,
      name: fake.name,
      isRegistryAdminCompany: data?.isRegistryAdminCompany ?? false,
    };
  },

  unitMetadata({ payload: data }) {
    return {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      metadata: payload.unitMetadata(data as any),
      volume: 100,
    };
  },

  user(data) {
    const fake = payload.user({ email: data?.email });
    return fake;
  },
};
