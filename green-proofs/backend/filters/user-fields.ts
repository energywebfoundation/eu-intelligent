import type { FilterFieldList } from '@energywebfoundation/generic-green-proofs-api';
import { textComparators } from '@energywebfoundation/generic-green-proofs-api';

export const userFilterFields: FilterFieldList = [
  { field: 'id', comparators: ['='] },
  { field: 'status', comparators: textComparators },
  { field: 'email', comparators: textComparators },
  { field: 'name', comparators: textComparators, queryPath: 'concat_ws(\' \', data::json ->> \'firstName\', NULLIF(data::json ->> \'middleName\', \'\'), data::json ->> \'lastName\')' },
];
