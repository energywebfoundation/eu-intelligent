import type { CommonConfig } from '@energywebfoundation/generic-green-proofs-config';
import type { JSONEntityIAM } from '@energywebfoundation/generic-green-proofs-ui';
import z from 'zod';

export const CompanyMetadata = z.object({
  email: z.email(),
  name: z.string().min(1).max(64),
});

export type CompanyMetadata = z.infer<typeof CompanyMetadata>;

export const companyUISchema: JSONEntityIAM['getUISchema'] = () => ({});

export const CompanyEntity: CommonConfig['manifest']['Entities']['Company'] = {
  getSchema: (() => CompanyMetadata.toJSONSchema()) as CommonConfig['manifest']['Entities']['Company']['getSchema'],
  mapping: {
    name: 'name',
    email: 'email',
  },
  nonUpdatable: [],
  getUISchema: companyUISchema,
};
