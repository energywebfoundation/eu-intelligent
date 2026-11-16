import { faker } from '@faker-js/faker';
import type { CompanyMetadata } from '@shared/index.js';

export const generateCompanyPayload = (company?: Partial<CompanyMetadata>): CompanyMetadata => ({
  name: faker.company.name(),
  email: faker.internet.email(),
  ...company,
});
