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

export interface SampleOptions {
  /** Seed for reproducible output. */
  seed?: number;
}

const ENUMS = {
  RecordType: ['local_origin_record', 'flexibility_activation_record'],
  EnergyUnit: ['kWh'],
  AssetClass: ['PV', 'Battery', 'HeatPump', 'MeteringPoint'],
  FlowDirection: ['import', 'export'],
  ActivationDirection: ['charge', 'discharge'],
  DeliveryScope: ['intra_community', 'inter_community', 'supplier_offtake', 'grid_export'],
  SupportSchemeStatus: ['one_off_payment', 'waiting_list', 'none'], // no feed_in_tariff - default passes validation
  DataCompleteness: ['complete', 'substituted', 'incomplete'],
  SourceOfRecord: ['platform', 'operator_validated'],
  DataRecordClass: ['measurement', 'forecast'],
  TradeStatusAtIssuance: ['settled', 'delivery_verified'],
  AttributeMode: ['not_marketed', 'cancelled_official', 'sold_external'],
  BundlingStatus: ['bundled', 'unbundled'],
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

function unixSeconds(f: Faker): number {
  return Math.floor(
    f.date.between({ from: '2026-01-01T00:00:00Z', to: '2026-12-31T23:59:59Z' }).getTime() / 1000,
  );
}

/* ------------------------------------------------------------------ */
/* Groups — every field populated                                      */
/* ------------------------------------------------------------------ */

function timeAndQuantity(f: Faker, storageMediated: boolean, partial: Partial<DomainTypes.LocalOriginRecord['time_and_quantity']> = {}): DomainTypes.LocalOriginRecord['time_and_quantity'] {
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
    rounding_rule: f.helpers.arrayElement(['half_up_2dp', 'bankers_2dp']),
    loss_adjustment: storageMediated ? f.number.float({ min: 0.001, max: 2, fractionDigits: 3 }) : null, // default passes validation
  });
}

function ratedPower(f: Faker): DomainTypes.RatedPower {
  return { value: f.number.float({ min: 0.5, max: 60, fractionDigits: 2 }), unit: 'kW' };
}

function productionAsset(f: Faker, partial: DeepPartial<DomainTypes.LocalOriginRecord['production_asset']> = {}): DomainTypes.LocalOriginRecord['production_asset'] {
  return defaultsDeep(partial, {
    production_asset_id: `${f.string.alpha(3).toUpperCase()}${f.number.int({ min: 1, max: 99 })}`,
    asset_registry_reference: `reg:${f.string.numeric(6)}`,
    metering_point_id: `mp-${f.string.numeric(4)}`,
    asset_class: enumOf(f, 'AssetClass'),
    rated_power: ratedPower(f),
  });
}

function consumptionAsset(f: Faker, partial: DeepPartial<DomainTypes.LocalOriginRecord['consumption_asset']> = {}): DomainTypes.LocalOriginRecord['consumption_asset'] {
  return defaultsDeep(partial, {
    consumption_asset_id: `${f.string.alpha(3).toUpperCase()}${f.number.int({ min: 1, max: 99 })}`,
    asset_registry_reference: `reg:${f.string.numeric(6)}`,
    metering_point_id: `mp-${f.string.numeric(4)}`,
    asset_class: enumOf(f, 'AssetClass'),
  });
}

function location(f: Faker, partial: Partial<DomainTypes.LocalOriginRecord['location']> = {}): DomainTypes.LocalOriginRecord['location'] {
  const deliveryScope = partial.delivery_scope ?? enumOf(f, 'DeliveryScope');
  const communityIdOrigin = f.location.city();
  const communityIdConsumption = deliveryScope === 'intra_community' ? communityIdOrigin : f.location.city(); // default passes validation

  return defaultsDeep(partial, {
    municipality_code: f.string.numeric(4),
    grid_operator_id: f.string.alpha({ length: 3, casing: 'upper' }),
    grid_level: f.number.int({ min: 1, max: 7 }),
    community_id_origin: communityIdOrigin,
    community_id_consumption: communityIdConsumption,
    delivery_scope: deliveryScope,
  });
}

function measurementProvenance(f: Faker, partial: Partial<DomainTypes.LocalOriginRecord['measurement_provenance']> = {}): DomainTypes.LocalOriginRecord['measurement_provenance'] {
  const dataRecordClass = partial.data_record_class ?? 'measurement'; // default passes validation
  const dataCompleteness = partial.data_completeness ?? 'complete'; // default passes validation

  return defaultsDeep(partial, {
    measurement_id: `M:${f.string.alphanumeric(8)}`,
    measuring_sensor_id: `sensor-${f.number.int({ min: 1, max: 200 })}`,
    property_measured: `measurement#${f.helpers.arrayElement(['active_energy', 'reactive_energy'])}`,
    flow_direction: enumOf(f, 'FlowDirection'),
    data_provider_id: `did:example:${f.string.alpha(6)}`,
    data_completeness: dataCompleteness,
    source_of_record: enumOf(f, 'SourceOfRecord'),
    data_record_class: dataRecordClass,
    measurement_recorded_at: unixSeconds(f),
  });
}

function attributeProvenance(f: Faker, storageMediated: boolean, partial: Partial<DomainTypes.LocalOriginRecord['attribute_provenance']> = {}): DomainTypes.LocalOriginRecord['attribute_provenance'] {
  return defaultsDeep(partial, {
    support_scheme_status: enumOf(f, 'SupportSchemeStatus'),
    storage_mediated_flag: storageMediated,
    attribute_mode: enumOf(f, 'AttributeMode'),
    bundling_status: enumOf(f, 'BundlingStatus'),
    claim_permitted: true,
    permitted_claim_text_id: f.string.alphanumeric(8),
    uniqueness_control_reference: f.string.alphanumeric(8),
  });
}

function beneficiaryAndClaim(f: Faker, partial: Partial<DomainTypes.LocalOriginRecord['beneficiary_and_claim']> = {}): DomainTypes.LocalOriginRecord['beneficiary_and_claim'] {
  return defaultsDeep(partial, {
    owner_id: `owner-${f.string.numeric(3)}`,
    consumption_metering_point_id: `mp-${f.string.numeric(4)}`,
    facility_id: `Facility${f.number.int({ min: 1, max: 99 })}`,
  });
}

function tradeAndDelivery(f: Faker, storageMediated: boolean, partial: Partial<DomainTypes.LocalOriginRecord['trade_and_delivery']> = {}): DomainTypes.LocalOriginRecord['trade_and_delivery'] {
  const n = f.number.int({ min: 1, max: 3 });
  return defaultsDeep(partial, {
    trade_reference: Array.from({ length: n }, () => f.string.uuid()),
    trade_hash: Array.from({ length: n }, () =>
      f.string.hexadecimal({ length: 64, prefix: '0x', casing: 'lower' }),
    ),
    trade_status_at_issuance: 'delivery_verified' as const, // default passes validation
    delivery_verification_reference: `exec:${f.string.alphanumeric(6)}`,
    charge_record_reference: storageMediated ? `charge:${f.string.alphanumeric(8)}` : null, // default passes validation
  });
}

/* ------------------------------------------------------------------ */
/* Public API                                                          */
/* ------------------------------------------------------------------ */

export function randomLocalOriginRecord(partial: DeepPartial<DomainTypes.LocalOriginRecord> = {}, options: SampleOptions = {}): DomainTypes.LocalOriginRecord {
  const f = newFaker(options.seed);
  // loss_adjustment and charge_record_reference depend on storage_mediated_flag
  const storageMediated = partial.attribute_provenance?.storage_mediated_flag ?? f.datatype.boolean();

  const common = {
    time_and_quantity: timeAndQuantity(f, storageMediated, partial.time_and_quantity),
    location: location(f, partial.location),
    measurement_provenance: measurementProvenance(f, partial.measurement_provenance),
    attribute_provenance: attributeProvenance(f, storageMediated, partial.attribute_provenance),
    beneficiary_and_claim: beneficiaryAndClaim(f, partial.beneficiary_and_claim),
    // casting required because of partial arrays Array<string | undefined> - there is GGP task to fix DeepPartial behavior on arrays
    trade_and_delivery: tradeAndDelivery(f, storageMediated, partial.trade_and_delivery as Partial<DomainTypes.LocalOriginRecord['trade_and_delivery']>),
  };

  const rec: DomainTypes.LocalOriginRecord = {
    ...common,
    identity: {
      record_type: 'local_origin_record',
      site_id: partial.identity?.site_id ?? `site-${f.string.alphanumeric(8)}`,
    },
    production_asset: productionAsset(f, 'production_asset' in partial ? partial.production_asset : {}),
    consumption_asset: consumptionAsset(f, 'consumption_asset' in partial ? partial.consumption_asset : {}),
  };

  return DomainTypes.LocalOriginRecord.parse(rec);
}
