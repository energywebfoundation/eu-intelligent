import { z } from 'zod';

export namespace DomainTypes {
  /* ------------------------------------------------------------------ */
  /* Enums                                                              */
  /* ------------------------------------------------------------------ */
  export const EnergyUnit = z.enum(['kWh']);

  export const AssetClass = z.enum(['PV', 'Battery', 'HeatPump', 'MeteringPoint']);

  export const FlowDirection = z.enum(['import', 'export']);

  export const ActivationDirection = z.enum(['charge', 'discharge']);

  export const DeliveryScope = z.enum([
    'intra_community',
    'inter_community',
    'supplier_offtake',
    'grid_export',
  ]);

  export const SupportSchemeStatus = z.enum([
    'feed_in_tariff',
    'one_off_payment',
    'waiting_list',
    'none',
  ]);

  export const DataCompleteness = z.enum([
    'complete',
    'substituted',
    'incomplete',
  ]);

  export const SourceOfRecord = z.enum(['platform', 'operator_validated']);

  export const DataRecordClass = z.enum(['measurement', 'forecast']);

  export const TradeStatusAtIssuance = z.enum(['settled', 'delivery_verified']);

  export const AttributeMode = z.enum(['not_marketed', 'cancelled_official', 'sold_external']);

  export const BundlingStatus = z.enum(['bundled', 'unbundled']);

  /* ------------------------------------------------------------------ */
  /* Leaf objects                                                        */
  /* ------------------------------------------------------------------ */

  /** Rating of an asset, as held in the asset register. */
  export const RatedPower = z.object({
    value: z.number(),
    unit: z.string(),
  });

  /* ------------------------------------------------------------------ */
  /* Composed records                                                    */
  /* ------------------------------------------------------------------ */

  /**
   * Record issued against metered generation. Identified by the presence of the
   * `production_asset` and `consumption_asset` groups.
   */
  export const LocalOriginRecord = z.object({
    time_and_quantity: z.object({
      interval_start: z.string().datetime({ offset: true }),
      interval_end: z.string().datetime({ offset: true }),
      interval_duration_s: z.number().int(),
      source_slot_timestamp: z.number().int().min(0),
      energy_quantity: z.number().gt(0),
      energy_unit: EnergyUnit,
      rounding_rule: z.string(),
      // Obligation C: value > 0 where storage_mediated_flag is true, else null.
      loss_adjustment: z.number().nullable(),
    }),
    location: z.object({
      municipality_code: z.string(),
      grid_operator_id: z.string(),
      grid_level: z.number().int(),
      community_id_origin: z.string().nullable(),
      community_id_consumption: z.string().nullable(),
      delivery_scope: DeliveryScope,
    }),
    measurement_provenance: z.object({
      measurement_id: z.string(),
      measuring_sensor_id: z.string(),
      property_measured: z.string(),
      flow_direction: FlowDirection,
      data_provider_id: z.string(),
      data_completeness: DataCompleteness,
      source_of_record: SourceOfRecord,
      data_record_class: DataRecordClass,
      measurement_recorded_at: z.number().int().min(0),
    }),
    attribute_provenance: z.object({
      // Obligation R (reserved, not populated in the PoC).
      support_scheme_status: SupportSchemeStatus.nullable(),
      storage_mediated_flag: z.boolean(),
      attribute_mode: AttributeMode.optional().default('not_marketed'),
      bundling_status: BundlingStatus,
      claim_permitted: z.boolean(),
      permitted_claim_text_id: z.string(),
      uniqueness_control_reference: z.string(),
    }),
    beneficiary_and_claim: z.object({
      owner_id: z.string(),
      consumption_metering_point_id: z.string().nullable(),
      facility_id: z.string().nullable(),
    }),
    trade_and_delivery: z.object({
      trade_reference: z.array(z.string()),
      trade_hash: z.array(z.string()),
      trade_status_at_issuance: TradeStatusAtIssuance.nullable(),
      delivery_verification_reference: z.string().nullable(),
      // Required storage_mediated_flag is true
      charge_record_reference: z.string().optional().nullable(),
    }),
    identity: z.object({
      record_type: z.literal('local_origin_record'),
      site_id: z.string(),
    }),
    production_asset: z.object({
      production_asset_id: z.string(),
      asset_registry_reference: z.string().nullable(),
      metering_point_id: z.string().nullable(),
      asset_class: AssetClass,
      rated_power: RatedPower.nullable(),
    }),
    consumption_asset: z.object({
      consumption_asset_id: z.string(),
      metering_point_id: z.string().nullable(),
      asset_class: AssetClass,
      asset_registry_reference: z.string().nullable(),
    }),
  });

  export const SelfConsumptionRecord = z.object({
    identity: z.object({
      record_type: z.literal('self_consumption_record'),
      site_id: z.string(),
    }),
    consumption_asset: z.object({
      consumption_asset_id: z.string(),
      metering_point_id: z.string().nullable(),
      asset_class: AssetClass,
    }),
    time_and_quantity: z.object({
      interval_start: z.string().datetime({ offset: true }),
      interval_end: z.string().datetime({ offset: true }),
      interval_duration_s: z.number().int(),
      source_slot_timestamp: z.number().int().min(0),
      energy_quantity: z.number().gt(0),
      energy_unit: EnergyUnit,
    }),
    trade_and_delivery: z.object({
      self_consumption_event_reference: z.string(),
    }),
    attribute_provenance: z.object({
      claim_permitted: z.boolean(),
    }),
    beneficiary_and_claim: z.object({
      claim_holder_id: z.string(),
      retirement_basis: z.literal('self_consumption'),
    }),
  });

  /* ------------------------------------------------------------------ */
  /* Inferred types                                                      */
  /* ------------------------------------------------------------------ */

  export type EnergyUnit = z.infer<typeof EnergyUnit>;
  export type AssetClass = z.infer<typeof AssetClass>;
  export type FlowDirection = z.infer<typeof FlowDirection>;
  export type ActivationDirection = z.infer<typeof ActivationDirection>;
  export type DeliveryScope = z.infer<typeof DeliveryScope>;
  export type SupportSchemeStatus = z.infer<typeof SupportSchemeStatus>;
  export type DataCompleteness = z.infer<typeof DataCompleteness>;
  export type SourceOfRecord = z.infer<typeof SourceOfRecord>;
  export type DataRecordClass = z.infer<typeof DataRecordClass>;
  export type TradeStatusAtIssuance = z.infer<typeof TradeStatusAtIssuance>;
  export type RatedPower = z.infer<typeof RatedPower>;
  export type LocalOriginRecord = z.infer<typeof LocalOriginRecord>;
  export type SelfConsumptionRecord = z.infer<typeof SelfConsumptionRecord>;
  export type EnergyRecord = LocalOriginRecord | SelfConsumptionRecord;
}
