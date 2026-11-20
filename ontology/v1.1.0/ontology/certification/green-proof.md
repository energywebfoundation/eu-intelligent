# Certification Domain: GreenProof

---

## int:GreenProof

**IRI:** `int:GreenProof`

**Subclass of:** `owl:Thing`

**Standard mapping:** None confirmed. Project-specific (`int:` namespace). Alignment with an external standard is open, see [OQ-021](../open-questions.md#oq-021-greenproof-standard-alignment-and-relation-to-identitycredential).

A certification record for the origin of energy in one delivery interval, produced by the GSY DEX. Details provided by GSY and EW; applicable to AEM and GSY. Each record has one of two types, set by `recordType`:

- `local_origin_record`: the traded energy of one Executed [`int:EnergyTrade`](../market/trade.md#intenergytrade). It is returned only when the sale is covered by the seller facility's measured net export at the slot.
- `self_consumption_record`: the energy a facility generated and consumed itself in one interval. It carries no trade reference.

A record is issued only when it passes every rule in [Issuance Rules](#issuance-rules). A record failing any rule is not issued. Every `GreenProof` is derived from one [`sosa:Observation`](../observation/observation.md#sosaobservation), the measurement used as evidence.

Implementation detail for this class (DB/API field names such as `identity.record_type`, storage types, defaults and length limits) is kept in the shared working spreadsheet, GreenProofs tab, captured in [`reference-files/INTELLIGENT_Ontology_PILOT_SHARED_20261120.xlsx`](../../reference-files/INTELLIGENT_Ontology_PILOT_SHARED_20261120.xlsx). Obligation codes (M, C, R) are as given in the spreadsheet; C rows state their condition.

### Datatype Properties

#### Identity

| Property | IRI | Range | Description |
|----------|-----|-------|-------------|
| recordType | `int:recordType` | `owl:oneOf` | Record type: `local_origin_record` (traded energy of one Executed trade) or `self_consumption_record` (energy a facility generated and consumed itself in one interval). Determines which fields are populated. Obligation: M. |
| siteId | `int:siteId` | `xsd:string` | FK to [`int:Site`](../spatial/community.md#intsite): the site this record is issued for (spreadsheet: pilot certification instance id). Reuses the `int:siteId` identifier defined on `int:Site`. See `issuedForSite` and [OQ-015](../open-questions.md#oq-015-greenproofsiteid-values-are-not-site-uuids). Obligation: M. |

#### Time and Quantity

| Property | IRI | Range | Description |
|----------|-----|-------|-------------|
| intervalStart | `int:intervalStart` | `xsd:dateTime` | Start of the delivery interval (inclusive), UTC. Equals `sourceSlotTimestamp`. ISO 8601 with offset. Obligation: M. |
| intervalEnd | `int:intervalEnd` | `xsd:dateTime` | End of the delivery interval (exclusive). `intervalEnd` is later than `intervalStart`, and their difference equals `intervalDurationS`. ISO 8601 with offset. Obligation: M. |
| intervalDurationS | `int:intervalDurationS` | `xsd:integer` | Interval duration in seconds (minimum 1, default 900). Obligation: M. |
| sourceSlotTimestamp | `int:sourceSlotTimestamp` | `xsd:long` | Unix timestamp in seconds of the start of the delivery slot. Equals `intervalStart` and must fall on an interval boundary (slot mod `intervalDurationS` = 0); otherwise the trade is skipped and no record is returned. Obligation: M. |
| energyQuantity | `int:energyQuantity` | `xsd:decimal` | Traded energy (`local_origin_record`) or self-consumed energy (`self_consumption_record`) in the interval, in kWh. Greater than 0, rounded half-up to 2 decimal places. On a `local_origin_record` it is returned only when the sale is covered by the seller facility's measured net export at the slot, allocated over its Executed sales in time priority. Obligation: M. |
| energyUnit | `int:energyUnit` | `owl:oneOf` | Unit of `energyQuantity`. Two decimal places. Obligation: M. |
| roundingRule | `int:roundingRule` | `xsd:string` | Rounding rule applied to `energyQuantity` (for example `half_up_2dp`). Constant within a settlement version. Obligation: M. |
| lossAdjustment | `int:lossAdjustment` | `xsd:decimal` | Battery loss in kWh deducted where the volume was mediated by storage; applied at retirement following discharge. Minimum 0. Always null in GSY DEX v2. The spreadsheet notes that a storage loss rate of zero is inadmissible for attribute accounting. Obligation: C. Condition: storage-mediated volume. |

#### Production Asset

| Property | IRI | Range | Description |
|----------|-----|-------|-------------|
| productionAssetId | `int:productionAssetId` | `xsd:string` | Identifier of the production asset. In the GSY DEX this is the seller facility id (FK to Facility). See `hasProductionAsset` and [OQ-016](../open-questions.md#oq-016-greenproof-asset-identifiers-vs-intasset). Obligation: M. |
| productionAssetRegistryReference | `int:productionAssetRegistryReference` | `xsd:string` | National guarantee-of-origin registry reference of the production asset. Registry integration is outside the PoC. Obligation: C. Condition: mandatory where `attributeMode` is `cancelled_official` (see [OQ-014](../open-questions.md#oq-014-greenproof-attributemode-is-not-defined)). |
| productionMeteringPointId | `int:productionMeteringPointId` | `xsd:string` | Metering point of the volume: the seller facility. Obligation: C. Condition: absent on records issued at community or pilot-site level. |
| productionAssetClass | `int:productionAssetClass` | `owl:oneOf` | Asset class of the production asset. Values from [`int:greenProofAssetClass`](#intgreenproofassetclass). Obligation: M. |
| ratedPower | `int:ratedPower` | `xsd:decimal` | Rating of the production asset in kW, as held in the asset register. Minimum 0. See [OQ-023](../open-questions.md#oq-023-greenproofratedpower-representation). Obligation: C. Condition: absent where the asset register does not record a rating. |

#### Consumption Asset

| Property | IRI | Range | Description |
|----------|-----|-------|-------------|
| consumptionAssetId | `int:consumptionAssetId` | `xsd:string` | Buyer facility id, else buyer community id, else buyer party hash. On a `self_consumption_record`, the self-consuming facility. See `hasConsumptionAsset` and [OQ-016](../open-questions.md#oq-016-greenproof-asset-identifiers-vs-intasset). Obligation: M. |
| consumptionAssetRegistryReference | `int:consumptionAssetRegistryReference` | `xsd:string` | National registry reference of the consumption asset. Obligation: C. Condition: mandatory where `attributeMode` is `cancelled_official` (see [OQ-014](../open-questions.md#oq-014-greenproof-attributemode-is-not-defined)). |
| consumptionAssetMeteringPointId | `int:consumptionAssetMeteringPointId` | `xsd:string` | Metering point at which the volume was consumed. Obligation: C. Condition: absent on records issued at community or pilot-site level. |
| consumptionAssetClass | `int:consumptionAssetClass` | `owl:oneOf` | Asset class of the consumption asset. Values from [`int:greenProofAssetClass`](#intgreenproofassetclass). Obligation: M. |

#### Location and Deliverability

| Property | IRI | Range | Description |
|----------|-----|-------|-------------|
| municipalityCode | `int:municipalityCode` | `xsd:string` | Official municipality code of the generation site. One value per GSY DEX deployment. See [OQ-022](../open-questions.md#oq-022-greenproof-location-fields-are-pilot-specific). Obligation: M. |
| gridOperatorId | `int:gridOperatorId` | `xsd:string` | Identifier of the grid operator of the energy community. Obligation: M. |
| gridLevel | `int:gridLevel` | `xsd:integer` | Network level of the connection (Swiss network levels 1-7). Obligation: M. |
| communityIdOrigin | `int:communityIdOrigin` | `xsd:string` | FK to [`int:EnergyCommUnit`](../spatial/community.md#intenergycommunit): community in which generation occurred. Equals `communityIdConsumption` when `deliveryScope` is `intra_community`; differs when it is `inter_community`. See `originCommunity`. Obligation: C. Condition: absent when the generation asset belongs to the pilot site but to no community. |
| communityIdConsumption | `int:communityIdConsumption` | `xsd:string` | FK to [`int:EnergyCommUnit`](../spatial/community.md#intenergycommunit): community in which consumption occurred. See `consumptionCommunity`. Obligation: C. Condition: absent when the consuming party belongs to the pilot site but to no community. |
| deliveryScope | `int:deliveryScope` | `owl:oneOf` | Delivery relationship between origin and consumption, consistent with `communityIdOrigin` and `communityIdConsumption`. Inter-community delivery is not asserted as a community transaction. Obligation: C. Condition: `local_origin_record`; null on `self_consumption_record`. |

#### Measurement Provenance

| Property | IRI | Range | Description |
|----------|-----|-------|-------------|
| measurementId | `int:measurementId` | `xsd:string` | Identifier of the measurement used as evidence: the measurement point with the largest export at the slot. See `derivedFromMeasurement`. Obligation: M. |
| measuringSensorId | `int:measuringSensorId` | `xsd:string` | Sensor individual that produced the measurement, for example a smart meter. Obligation: M. |
| propertyMeasured | `int:propertyMeasured` | `xsd:anyURI` | Ontology property measured, for example active energy. See [OQ-018](../open-questions.md#oq-018-greenproofpropertymeasured-vs-the-observableproperty-vocabulary). Obligation: M. |
| flowDirection | `int:flowDirection` | `owl:oneOf` | Import or export as recorded by the measurement descriptor. Obligation: M. |
| dataProviderId | `int:dataProviderId` | `xsd:string` | Identity of the party supplying the measurement (for example a DID). Obligation: M. |
| dataCompleteness | `int:dataCompleteness` | `owl:oneOf` | Completeness of the measurement for the interval. Issuance is rejected where `incomplete`. Terms to be aligned to the national data exchange vocabulary. Obligation: M. |
| sourceOfRecord | `int:sourceOfRecord` | `owl:oneOf` | Origin of the data of record. Only `operator_validated` supports a claim of regulatory standing. Obligation: M. |
| dataRecordClass | `int:dataRecordClass` | `owl:oneOf` | Measurement or forecast. The GSY DEX persists both; only a measurement may be certified. Issuance is rejected where `forecast`. Obligation: M. |
| measurementRecordedAt | `int:measurementRecordedAt` | `xsd:long` | Unix timestamp in seconds of the time-series value used as evidence. Obligation: M. |

#### Attribute Provenance

| Property | IRI | Range | Description |
|----------|-----|-------|-------------|
| supportSchemeStatus | `int:supportSchemeStatus` | `owl:oneOf` | Support scheme under which the asset is remunerated. Where populated, `feed_in_tariff` excludes issuance. Obligation: R. |
| storageMediatedFlag | `int:storageMediatedFlag` | `xsd:boolean` | True where the volume passed through storage. Default `false`. Obligation: M. |

#### Beneficiary and Claim

| Property | IRI | Range | Description |
|----------|-----|-------|-------------|
| ownerId | `int:ownerId` | `xsd:string` | Seller party hash; on a `self_consumption_record`, the facility owner's party hash. See `ownedBy` and [OQ-017](../open-questions.md#oq-017-greenproofownerid-party-hash-vs-intactor). Obligation: M. |
| consumptionMeteringPointId | `int:consumptionMeteringPointId` | `xsd:string` | Buyer facility id, or the self-consuming facility; null if the buyer is not a facility. Obligation: C. |
| facilityId | `int:facilityId` | `xsd:string` | FK to [`int:Facility`](../spatial/community.md#intfacility): the seller on a `local_origin_record`, the self-consuming facility on a `self_consumption_record`. Reuses the `int:facilityId` identifier defined on `int:Facility`. Beneficiary accounts derive from facilities, pseudonymised. See `beneficiaryFacility`. Obligation: C. Condition: absent where the record is issued at community or pilot-site level. |

#### Trade and Delivery Reference

| Property | IRI | Range | Description |
|----------|-----|-------|-------------|
| tradeReference | `int:tradeReference` | `xsd:string` | `tradeId` of the Executed `int:EnergyTrade` (one per record; held as a list in the implementation). See `certifiesTrade`. Obligation: C. Condition: `local_origin_record`; empty on `self_consumption_record`. |
| tradeHash | `int:tradeHash` | `xsd:hexBinary` | Hash of the trade as held in the GSY DEX, in the order of `tradeReference`. Obligation: C. Condition: `local_origin_record`; empty on `self_consumption_record`. |
| tradeStatusAtIssuance | `int:tradeStatusAtIssuance` | `owl:oneOf` | Recorded state of the trade at issuance. Where a `tradeReference` is present, it must be `delivery_verified`. See [OQ-020](../open-questions.md#oq-020-greenprooftradestatusatissuance-vs-inttradestatus). Obligation: C. Condition: `local_origin_record`; null on `self_consumption_record`. |
| deliveryVerificationReference | `int:deliveryVerificationReference` | `xsd:string` | Reference to the GSY DEX execution cycle that reconciled delivery for the interval. Format `exec:<YYYY-MM-DD>:slot<n>`, where n = (time_slot mod 86400) / `intervalDurationS`, UTC. Obligation: C. Condition: `local_origin_record`; null on `self_consumption_record`. |
| selfConsumptionEventReference | `int:selfConsumptionEventReference` | `xsd:string` | Reference to the self-consumption measurement period. Present when `recordType` is `self_consumption_record`; null on `local_origin_record`. Obligation: C. |

### Object Properties

The spreadsheet's "Semantic layer" names its target classes `int:Trade`, `int:Community` and `int:AssetMeasurement`. In this ontology they are `int:EnergyTrade`, `int:EnergyCommUnit` and `sosa:Observation`. See [ADR-017](../../docs/design-decisions.md#adr-017-greenproof-added-v110).

| Property | IRI | Range | Cardinality | Description |
|----------|-----|-------|-------------|-------------|
| certifiesTrade | `int:certifiesTrade` | [`int:EnergyTrade`](../market/trade.md#intenergytrade) | `owl:maxCardinality 1` | The Executed trade this record certifies. Present on a `local_origin_record`; absent on a `self_consumption_record`. |
| hasProductionAsset | `int:hasProductionAsset` | [`int:Asset`](../assets/asset.md#intasset) | `owl:exactly 1` | The production asset of the certified volume. |
| hasConsumptionAsset | `int:hasConsumptionAsset` | [`int:Asset`](../assets/asset.md#intasset) | `owl:exactly 1` | The consumption asset of the certified volume. |
| originCommunity | `int:originCommunity` | [`int:EnergyCommUnit`](../spatial/community.md#intenergycommunit) | `owl:maxCardinality 1` | Community in which generation occurred. |
| consumptionCommunity | `int:consumptionCommunity` | [`int:EnergyCommUnit`](../spatial/community.md#intenergycommunit) | `owl:maxCardinality 1` | Community in which consumption occurred. |
| beneficiaryFacility | `int:beneficiaryFacility` | [`int:Facility`](../spatial/community.md#intfacility) | `owl:maxCardinality 1` | Facility that benefits from the record: the seller on a `local_origin_record`, the self-consuming facility on a `self_consumption_record`. |
| derivedFromMeasurement | `int:derivedFromMeasurement` | [`sosa:Observation`](../observation/observation.md#sosaobservation) | `owl:exactly 1` | The observation used as evidence for the certified volume. |
| ownedBy | `int:ownedBy` | [`int:Actor`](../participants/participant.md#intactor) | `owl:exactly 1` | Owner of the certified volume: the seller, or the facility owner on a `self_consumption_record`. |
| issuedForSite | `int:issuedForSite` | [`int:Site`](../spatial/community.md#intsite) | `owl:exactly 1` | Site this record is issued for. Added in v1.1.0 to pair with `siteId`; not in the spreadsheet's Semantic layer. |

### Enumeration Values

These value lists belong to `int:GreenProof` only. Existing enumerations such as `int:assetType` and `int:tradeStatus` are unchanged. Values marked `[to be confirmed by GSY/EW]` have no description in the spreadsheet.

#### int:recordType

| Value | Description |
|-------|-------------|
| `local_origin_record` | Traded energy of one Executed trade. Carries the trade and delivery reference. |
| `self_consumption_record` | Energy a facility generated and consumed itself in one interval. Carries no trade reference. |

#### int:energyUnit

| Value | Description |
|-------|-------------|
| `kWh` | Kilowatt-hour. |

#### int:greenProofAssetClass

Used by `productionAssetClass` and `consumptionAssetClass`. The "Corresponds to" column is informational only; see [OQ-019](../open-questions.md#oq-019-greenproofassetclass-vs-intassettype).

| Value | Corresponds to |
|-------|----------------|
| `PV` | [`int:PhotovoltaicUnit`](../assets/pv-system.md) |
| `Battery` | [`int:BatteryUnit`](../assets/battery.md) |
| `HeatPump` | [`int:HeatPump`](../assets/thermal.md) |
| `ElectricBoiler` | [`int:ElectricBoiler`](../assets/thermal.md) |
| `ChargingPoint` | [`int:EVChargingStation`](../assets/ev-charging.md) |
| `MeteringPoint` | [`int:MeteringPoint`](../spatial/metering.md#intmeteringpoint) (a class, not an `int:Asset` subtype) |

#### int:deliveryScope

| Value | Description |
|-------|-------------|
| `intra_community` | Origin and consumption in the same community (`communityIdOrigin` equals `communityIdConsumption`). |
| `inter_community` | Origin and consumption in different communities. Not asserted as a community transaction. |
| `supplier_offtake` | [to be confirmed by GSY/EW] |

#### int:flowDirection

| Value | Description |
|-------|-------------|
| `import` | Import, as recorded by the measurement descriptor. |
| `export` | Export, as recorded by the measurement descriptor. |

#### int:dataCompleteness

| Value | Description |
|-------|-------------|
| `complete` | Measurement complete for the interval. |
| `substituted` | [to be confirmed by GSY/EW] |
| `incomplete` | Measurement incomplete for the interval. Issuance is rejected. |

#### int:sourceOfRecord

| Value | Description |
|-------|-------------|
| `platform` | Data of record from the platform. |
| `operator_validated` | Data of record validated by the operator. The only value that supports a claim of regulatory standing. |

#### int:dataRecordClass

| Value | Description |
|-------|-------------|
| `measurement` | Measured value. Only a measurement may be certified. |
| `forecast` | Forecast value. Issuance is rejected. |

#### int:supportSchemeStatus

| Value | Description |
|-------|-------------|
| `feed_in_tariff` | Asset remunerated under a feed-in tariff. Excludes issuance. |
| `one_off_payment` | [to be confirmed by GSY/EW] |
| `waiting_list` | [to be confirmed by GSY/EW] |
| `none` | No support scheme. |

#### int:tradeStatusAtIssuance

| Value | Description |
|-------|-------------|
| `settled` | [to be confirmed by GSY/EW] |
| `delivery_verified` | Delivery of the trade verified. Required where a `tradeReference` is present. |

### Issuance Rules

A record failing any rule is not issued. Rules are restated with this file's property names; the spreadsheet uses the implementation field names.

| # | Rule | Constraint | Purpose |
|---|------|------------|---------|
| 1 | Interval consistency | `intervalEnd` > `intervalStart` and `intervalEnd` minus `intervalStart` = `intervalDurationS`. | Interval consistency. |
| 2 | Slot alignment | `sourceSlotTimestamp` = `intervalStart`; a timestamp not on an interval boundary is rejected. | Slot alignment. |
| 3 | Measurement only | Reject where `dataRecordClass` = `forecast`. | Only measurements may be certified. |
| 4 | Data completeness | Reject where `dataCompleteness` = `incomplete`. | Incomplete data is not certified. |
| 5 | Support scheme exclusion | Reject where `supportSchemeStatus` = `feed_in_tariff` (when populated). | Feed-in tariff participation excludes issuance. |
| 6 | Delivery scope consistency | `intra_community`: origin = consumption; `inter_community`: origin ≠ consumption. | Delivery scope consistency. |
| 7 | Delivery-verified trades | `local_origin_record`: if `tradeReference` is non-empty, `tradeStatusAtIssuance` = `delivery_verified`. | Only delivery-verified trades. |
| 8 | No over-issuance | `local_origin_record`: the sum of `energyQuantity` per `productionAssetId` and settlement version ≤ metered generation minus storage charge in the period. | A sale is certified only if the seller facility's measured net export covers it. |
| 9 | Cross-community reconciliation | The over-issuance check runs once across all participating communities for the settlement period. | Detects inter-community double counting and aggregate-vs-asset double counting. |
| 10 | Record type consistency | `self_consumption_record`: 0 ≤ `selfConsumptionPercentage` ≤ 100 and `tradeReference` empty; `local_origin_record`: `selfConsumptionPercentage` null. | Record type consistency. `selfConsumptionPercentage` is not yet defined, see [OQ-013](../open-questions.md#oq-013-greenproofselfconsumptionpercentage-is-not-defined). |
