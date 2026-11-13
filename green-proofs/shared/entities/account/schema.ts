import {
  type CommonConfig,
  CustomComponent,
  Input,
} from '@energywebfoundation/generic-green-proofs-config';
import { DomainTypes } from '@shared/generated-types.js';
import { z } from 'zod';

export const AccountMetadata = z.object({
  externalId: z.string(), // account and company share externalId
  asset_registry_reference: z.string().nullable(),
  metering_point_id: z.string().nullable(),
  asset_class: DomainTypes.AssetClass,
  name: z.string(),
});

export type AccountMetadata = z.infer<typeof AccountMetadata>;

const accountUISchema = {
  name: Input({
    title: 'Account Name',
    placeholder: 'Account Name',
    options: {
      noDebounce: true,
    },
  }),
  type: CustomComponent({
    componentName: 'AccountType',
  }),
};

export const AccountEntity = {
  getSchema: (() => AccountMetadata.toJSONSchema()) as CommonConfig['manifest']['Entities']['Account']['getSchema'],
  getUISchema: () => accountUISchema,
  mapping: {
    name: 'name',
    type: 'asset_class',
  },
  nonUpdatable: [],
};
