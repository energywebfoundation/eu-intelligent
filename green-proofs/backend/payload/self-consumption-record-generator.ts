import {
  type DeepPartial,
  defaultsDeep,
} from '@energywebfoundation/generic-green-proofs-common';
import {
  en,
  Faker,
} from '@faker-js/faker';
import { DomainTypes } from '@shared/index.js';
import dayjs from 'dayjs';

import type { SampleOptions } from './local-origin-record-generator.js';

const ENUMS = {
  EnergyUnit: ['kWh'],
  AssetClass: ['PV', 'HeatPump', 'MeteringPoint'], // no Battery - default passes validation
} as const;

function newFaker(seed?: number): Faker {
  const f = new Faker({ locale: [en] });
  if (seed !== undefined) f.seed(seed);
  return f;
}

/* ------------------------------------------------------------------ */
/* Primitives                                                          */
/* ------------------------------------------------------------------ */

function enumOf<K extends keyof typeof ENUMS>(
  f: Faker,
  name: K,
): (typeof ENUMS)[K][number] {
  return f.helpers.arrayElement(ENUMS[name]);
}

// ISO 8601 with a trailing Z (accepted by z.string().datetime({ offset: true })).
function isoDate(f: Faker): string {
  return f.date
    .between({ from: '2026-01-01T00:00:00Z', to: '2026-12-31T23:59:59Z' })
    .toISOString()
    .replace(/\.\d{3}Z$/, 'Z');
}

/* ------------------------------------------------------------------ */
/* Groups — every field populated                                      */
/* ------------------------------------------------------------------ */

function timeAndQuantity(f: Faker, partial: Partial<DomainTypes.SelfConsumptionRecord['time_and_quantity']> = {}): DomainTypes.SelfConsumptionRecord['time_and_quantity'] {
  const duration = partial.interval_duration_s ?? f.number.int({ min: 60, max: 3600 });
  const end = partial.interval_end ?? isoDate(f);
  const start = partial.interval_start ?? dayjs(end).subtract(duration, 'seconds').toISOString(); // default passes validation

  return defaultsDeep(partial, {
    interval_start: start,
    interval_end: end,
    interval_duration_s: duration,
    source_slot_timestamp: Math.floor(new Date(start).getTime() / 1000), // default passes validation
    energy_quantity: f.number.float({ min: 0.01, max: 50, fractionDigits: 2 }), // > 0
    energy_unit: enumOf(f, 'EnergyUnit'),
  });
}

function consumptionAsset(f: Faker, partial: Partial<DomainTypes.SelfConsumptionRecord['consumption_asset']> = {}): DomainTypes.SelfConsumptionRecord['consumption_asset'] {
  return defaultsDeep(partial, {
    consumption_asset_id: `${f.string.alpha(3).toUpperCase()}${f.number.int({ min: 1, max: 99 })}`,
    metering_point_id: `mp-${f.string.numeric(4)}`,
    asset_class: enumOf(f, 'AssetClass'),
  });
}

function tradeAndDelivery(f: Faker, partial: Partial<DomainTypes.SelfConsumptionRecord['trade_and_delivery']> = {}): DomainTypes.SelfConsumptionRecord['trade_and_delivery'] {
  return defaultsDeep(partial, {
    self_consumption_event_reference: f.string.uuid(),
  });
}

function attributeProvenance(f: Faker, partial: Partial<DomainTypes.SelfConsumptionRecord['attribute_provenance']> = {}): DomainTypes.SelfConsumptionRecord['attribute_provenance'] {
  return defaultsDeep(partial, {
    claim_permitted: true,
    storage_mediated_flag: f.datatype.boolean(),
  });
}

function beneficiaryAndClaim(f: Faker, partial: Partial<DomainTypes.SelfConsumptionRecord['beneficiary_and_claim']> = {}): DomainTypes.SelfConsumptionRecord['beneficiary_and_claim'] {
  return defaultsDeep(partial, {
    claim_holder_id: `owner-${f.string.numeric(3)}`,
    retirement_basis: 'self_consumption' as const,
  });
}

/* ------------------------------------------------------------------ */
/* Public API                                                          */
/* ------------------------------------------------------------------ */

export function randomSelfConsumptionRecord(partial: DeepPartial<DomainTypes.SelfConsumptionRecord> = {}, options: SampleOptions = {}): DomainTypes.SelfConsumptionRecord {
  const f = newFaker(options.seed);

  const rec: DomainTypes.SelfConsumptionRecord = {
    identity: {
      record_type: 'self_consumption_record',
      site_id: partial.identity?.site_id ?? `site-${f.string.alphanumeric(8)}`,
    },
    consumption_asset: consumptionAsset(f, partial.consumption_asset),
    time_and_quantity: timeAndQuantity(f, partial.time_and_quantity),
    trade_and_delivery: tradeAndDelivery(f, partial.trade_and_delivery),
    attribute_provenance: attributeProvenance(f, partial.attribute_provenance),
    beneficiary_and_claim: beneficiaryAndClaim(f, partial.beneficiary_and_claim),
  };

  return DomainTypes.SelfConsumptionRecord.parse(rec);
}
