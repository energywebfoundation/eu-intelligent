import type { FilterFieldList } from '@energywebfoundation/generic-green-proofs-api';
import {
  numberComparators,
  textComparators,
} from '@energywebfoundation/generic-green-proofs-api';

export const unitFilterFields: FilterFieldList = [
  { field: 'id', comparators: ['='] },
  { field: 'status', comparators: textComparators },
  { field: 'rootId', comparators: ['='], queryPath: 'root_id' },
  { field: 'volume', comparators: numberComparators },
  { field: 'isFinal', comparators: ['='], queryPath: 'is_final' },
  { field: 'created_at', comparators: ['='], queryPath: 'created_at' },
  { field: 'process_id', comparators: ['='], queryPath: 'created_by.processId' },
];
