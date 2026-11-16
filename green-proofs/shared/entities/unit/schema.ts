import type { UiSchema } from '@energywebfoundation/generic-green-proofs-api';
import {
  type CommonConfig,
  Input,
} from '@energywebfoundation/generic-green-proofs-config';

import { UnitMetadata } from './types.js';

export const unitUISchema = {
  testField: Input({
    title: 'Test Field',
    placeholder: 'Test Field',
  }),
} as const satisfies UiSchema;

export const UnitEntity: CommonConfig['manifest']['Entities']['Unit'] = {
  getSchema: (() => UnitMetadata.toJSONSchema()) as CommonConfig['manifest']['Entities']['Unit']['getSchema'],
  getUISchema: () => unitUISchema,
  mapping: {
    volume: 'volume',
  },
  nonUpdatable: [],
};
