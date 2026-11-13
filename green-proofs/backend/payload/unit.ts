import type { UnitMetadata } from '@shared/entities/unit/types.js';

import { randomLocalOriginRecord } from './local-origin-record-generator.js';

export const generateUnitPayload = (unit: Partial<UnitMetadata>): UnitMetadata => {
  return {
    version: 1,
    localOriginRecord: randomLocalOriginRecord(),
    status: 'issued',
    ...unit,
  };
};
