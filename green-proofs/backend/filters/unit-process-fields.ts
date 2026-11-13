import type { FilterFieldList } from '@energywebfoundation/generic-green-proofs-api';

export const unitProcessFilterFields: FilterFieldList = [
  { field: 'id', comparators: ['=', 'ilike'] },
  { field: 'created_at', comparators: ['>=', '<='] },
  { field: 'type', comparators: ['ilike'] },
];
