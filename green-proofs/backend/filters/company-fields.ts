import type { FilterFieldList } from '@energywebfoundation/generic-green-proofs-api';
import { textComparators } from '@energywebfoundation/generic-green-proofs-api';

export const companyFilterFields: FilterFieldList = [
  { field: 'id', comparators: ['='] },
  { field: 'name', comparators: textComparators },
  { field: 'status', comparators: textComparators },
  { field: 'data.externalId', comparators: ['='] },
];
