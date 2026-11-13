import type { FromSchema } from 'json-schema-to-ts';

export const companyRoles = {
  schema: {
    $schema: 'https://json-schema.org/draft/2020-12/schema',
    type: 'string',
    oneOf: [
      {
        const: 'Company Representative',
      },
    ],
  } as const,
  default: 'Company Representative',
};

export type CompanyRole = FromSchema<typeof companyRoles['schema']>;

export const CompanyRoles = {
  companyRepresentative: 'Company Representative',
} as const;

export const CompanyRolesDetails: { label: string; role: CompanyRole; description: string }[] = [
  {
    label: 'Company Representative',
    role: CompanyRoles.companyRepresentative,
    description: 'Company Representative',
  },
];

export const companyRolesActions: Record<CompanyRole, {
  companyRemovalNotify: boolean;
  minimalMembershipsPerCompany: number;
  closeCompanyMembershipNotify: boolean;
}> = {
  [CompanyRoles.companyRepresentative]: {
    companyRemovalNotify: true,
    minimalMembershipsPerCompany: 1,
    closeCompanyMembershipNotify: true,
  },
};
