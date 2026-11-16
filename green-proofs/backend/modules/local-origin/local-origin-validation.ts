import type { DomainTypes } from '@shared/index.js';
import dayjs from 'dayjs';

type LocalOriginValidator = (localOriginRecord: DomainTypes.LocalOriginRecord) => { valid: true } | { valid: false; reason: string };

const intervalValidator: LocalOriginValidator = (localOriginRecord) => {
  const start = new Date(localOriginRecord.time_and_quantity.interval_start);
  const end = new Date(localOriginRecord.time_and_quantity.interval_end);
  const diff = dayjs(end).diff(start);
  const diffAsSeconds = Math.floor(diff / 1000);

  if (start > end) {
    return { valid: false, reason: 'Interval start is bigger than interval end' };
  }

  if (diffAsSeconds !== localOriginRecord.time_and_quantity.interval_duration_s) {
    return { valid: false, reason: 'Interval (start-end) is different from interval duration in seconds' };
  }

  return { valid: true };
};

const sourceSlotTimestampValidator: LocalOriginValidator = (localOriginRecord) => {
  const slotDate = new Date(localOriginRecord.time_and_quantity.source_slot_timestamp * 1000);
  const intervalStart = new Date(localOriginRecord.time_and_quantity.interval_start);

  if (slotDate.getTime() !== intervalStart.getTime()) {
    return { valid: false, reason: 'Source slot timestamp must be equal interval start' };
  }

  return { valid: true };
};

const dataRecordClassForecastValidator: LocalOriginValidator = (localOriginRecord) => {
  if (localOriginRecord.measurement_provenance.data_record_class === 'forecast') {
    return { valid: false, reason: 'Local origin record data_record_class cannot be forecast' };
  }

  return { valid: true };
};

const dataCompletenessValidator: LocalOriginValidator = (localOriginRecord) => {
  if (localOriginRecord.measurement_provenance.data_completeness !== 'complete') {
    return { valid: false, reason: 'Local origin record must have data_completeness: complete' };
  }

  return { valid: true };
};

const deliveryScopeValidator: LocalOriginValidator = (localOriginRecord) => {
  switch (localOriginRecord.location.delivery_scope) {
    case 'intra_community': {
      if (localOriginRecord.location.community_id_origin !== localOriginRecord.location.community_id_consumption) {
        return { valid: false, reason: 'For delivery_scope=intra_community, community_id_origin and community_id_consumption should be equal' };
      }
      break;
    }
    case 'inter_community': {
      if (localOriginRecord.location.community_id_origin === localOriginRecord.location.community_id_consumption) {
        return { valid: false, reason: 'For delivery_scope=inter_community, community_id_origin and community_id_consumption should be different' };
      }
      break;
    }
    // These two fields are not part of PoC
    case 'grid_export':
    case 'supplier_offtake':
      return { valid: true };
    default: {
      const _: never = localOriginRecord.location.delivery_scope;
      throw new Error(`Unknown delivery_scope: ${localOriginRecord.location.delivery_scope}`);
    }
  }

  return { valid: true };
};

const tradeStatusAtIssuanceValidator: LocalOriginValidator = (localOriginRecord) => {
  if (localOriginRecord.trade_and_delivery.trade_reference.length > 0) {
    if (localOriginRecord.trade_and_delivery.trade_status_at_issuance !== 'delivery_verified') {
      return { valid: false, reason: 'When local origin record has at least one reference, trade_status_at_issuance should be delivery_verified' };
    }
  }

  return { valid: true };
};

const supportSchemeFeedInValidator: LocalOriginValidator = (localOriginRecord) => {
  const supportSchemeStatus = localOriginRecord.attribute_provenance.support_scheme_status;

  // Attribute is nullable (reserved in PoC); only enforced when populated.
  if (supportSchemeStatus === 'feed_in_tariff') {
    return { valid: false, reason: 'Local origin record cannot be issued when support_scheme_status indicates feed-in participation' };
  }

  return { valid: true };
};

const storageMediatedValidator: LocalOriginValidator = (localOriginRecord) => {
  if (!localOriginRecord.attribute_provenance.storage_mediated_flag) {
    return { valid: true };
  }

  const lossAdjustment = localOriginRecord.time_and_quantity.loss_adjustment;
  if (lossAdjustment === null || lossAdjustment <= 0) {
    return { valid: false, reason: 'When storage_mediated_flag is true, loss_adjustment should be present and greater than 0' };
  }

  if (!localOriginRecord.trade_and_delivery.charge_record_reference) {
    return { valid: false, reason: 'When storage_mediated_flag is true, charge_record_reference should be present' };
  }

  return { valid: true };
};

export const localOriginValidators = {
  intervalValidator,
  sourceSlotTimestampValidator,
  dataRecordClassForecastValidator,
  dataCompletenessValidator,
  deliveryScopeValidator,
  tradeStatusAtIssuanceValidator,
  supportSchemeFeedInValidator,
  storageMediatedValidator,
};

export const runLocalOriginValidators: LocalOriginValidator = (localOriginRecord) => {
  const results = Object.values(localOriginValidators).map(validator => validator(localOriginRecord));
  const notValid = results.filter(r => r.valid === false);

  if (notValid.length > 0) {
    return { valid: false, reason: notValid.map(r => r.reason).join('; ') };
  }

  return { valid: true };
};
