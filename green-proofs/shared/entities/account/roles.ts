import type { JSONSchema } from '@energywebfoundation/generic-green-proofs-ui';
import type { FromSchema } from 'json-schema-to-ts';

export const AccountRoles = {
  fullAccess: 'Full Access',
  readOnly: 'Read Only',
} as const;

export const accountRoles = {
  schema: {
    $schema: 'https://json-schema.org/draft/2020-12/schema',
    type: 'string',
    oneOf: [
      {
        title: 'Initiate and approve',
        const: AccountRoles.fullAccess,
      },
      {
        title: 'Read only',
        const: AccountRoles.readOnly,
      },
    ],
  } as const satisfies JSONSchema,
  default: AccountRoles.fullAccess,
};

export type AccountRole = FromSchema<typeof accountRoles['schema']>;

export const AccountRolesDetails: { label: string; role: AccountRole; description: string }[] = [
  {
    label: 'Initiate and approve',
    role: AccountRoles.fullAccess,
    description: 'Full access role',
  },
  {
    label: 'Read only',
    role: AccountRoles.readOnly,
    description: 'Read only role',
  },
];
