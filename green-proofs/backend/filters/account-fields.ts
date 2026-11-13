import type { FilterFieldList } from '@energywebfoundation/generic-green-proofs-api';
import { textComparators } from '@energywebfoundation/generic-green-proofs-api';

export const accountFilterFields: FilterFieldList = [
  { field: 'id', comparators: ['='] },
  { field: 'status', comparators: textComparators },
  { field: 'name', comparators: textComparators },
  { field: 'data.externalId', comparators: ['='] },
];
