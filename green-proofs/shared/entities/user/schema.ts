import { UiSchemaType } from '@energywebfoundation/generic-green-proofs-common';
import {
  type CommonConfig,
  Input,
} from '@energywebfoundation/generic-green-proofs-config';
import type {
  JSONEntityIAM,
  JSONSchema,
} from '@energywebfoundation/generic-green-proofs-ui';
import z from 'zod';

export const emailSchema = {
  type: 'string',
  format: 'email',
  maxLength: 64,
} as const satisfies JSONSchema;

export const UserMetadata = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.email(),
});

export type UserMetadata = z.infer<typeof UserMetadata>;

const userUISchema: JSONEntityIAM['getUISchema'] = ({ uiSchemaType }) => ({
  firstName: Input({
    title: 'First Name',
    placeholder: 'First Name',
  }),
  lastName: Input({
    title: 'Last Name',
    placeholder: 'Last Name',
  }),
  email: Input({
    title: 'Email address',
    placeholder: 'Email address',
    options: {
      readonly: uiSchemaType === UiSchemaType.Edit,
    },
  }),
});

export const UserEntity: CommonConfig['manifest']['Entities']['User'] = {
  getSchema: (() => UserMetadata.toJSONSchema()) as CommonConfig['manifest']['Entities']['User']['getSchema'],
  getUISchema: userUISchema,
  mapping: {
    email: 'email',
    firstName: 'firstName',
    lastName: 'lastName',
  },
  nonUpdatable: [],
};
