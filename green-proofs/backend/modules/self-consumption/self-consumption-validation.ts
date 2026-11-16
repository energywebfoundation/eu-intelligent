import type { DomainTypes } from '@shared/index.js';
import dayjs from 'dayjs';

type SelfConsumptionValidator = (selfConsumptionRecord: DomainTypes.SelfConsumptionRecord) => { valid: true } | { valid: false; reason: string };

const intervalValidator: SelfConsumptionValidator = (selfConsumptionRecord) => {
  const start = new Date(selfConsumptionRecord.time_and_quantity.interval_start);
  const end = new Date(selfConsumptionRecord.time_and_quantity.interval_end);
  const diff = dayjs(end).diff(start);
  const diffAsSeconds = Math.floor(diff / 1000);

  if (start > end) {
    return { valid: false, reason: 'Interval start is bigger than interval end' };
  }

  if (diffAsSeconds !== selfConsumptionRecord.time_and_quantity.interval_duration_s) {
    return { valid: false, reason: 'Interval (start-end) is different from interval duration in seconds' };
  }

  return { valid: true };
};

const sourceSlotTimestampValidator: SelfConsumptionValidator = (selfConsumptionRecord) => {
  const slotDate = new Date(selfConsumptionRecord.time_and_quantity.source_slot_timestamp * 1000);
  const intervalStart = new Date(selfConsumptionRecord.time_and_quantity.interval_start);

  if (slotDate.getTime() !== intervalStart.getTime()) {
    return { valid: false, reason: 'Source slot timestamp must be equal interval start' };
  }

  return { valid: true };
};

const consumptionAssetNotBatteryValidator: SelfConsumptionValidator = (selfConsumptionRecord) => {
  if (selfConsumptionRecord.consumption_asset.asset_class === 'Battery') {
    return { valid: false, reason: 'Self consumption record consumption_asset cannot be Battery' };
  }

  return { valid: true };
};

export const selfConsumptionValidators = {
  intervalValidator,
  sourceSlotTimestampValidator,
  consumptionAssetNotBatteryValidator,
};

export const runSelfConsumptionValidators: SelfConsumptionValidator = (selfConsumptionRecord) => {
  const results = Object.values(selfConsumptionValidators).map(validator => validator(selfConsumptionRecord));
  const notValid = results.filter(r => r.valid === false);

  if (notValid.length > 0) {
    return { valid: false, reason: notValid.map(r => r.reason).join('; ') };
  }

  return { valid: true };
};
