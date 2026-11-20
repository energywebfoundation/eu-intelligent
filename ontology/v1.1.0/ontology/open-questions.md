# Open Questions

This file collects all unresolved design questions and open items across the INTELLIGENT ontology. Each entry identifies the question, the classes or properties affected, and the partner(s) responsible for resolution.

Items are removed from this file once resolved and the relevant class files are updated.

---

## OQ-001: Facility optionality and Site-as-Facility pattern

**Status:** Resolved

`int:Site` now carries a dedicated `isSingleFacilitySite` boolean flag. When `true`, the site has no sub-unit structure and acts as its own facility; no `int:Facility` instances are expected under it. The `owl:minCardinality 0` on `int:hasFacility` remains in place to accommodate both cases at the ontology level, with `isSingleFacilitySite` providing explicit query clarity. The flag has been added to `int:Site` in `community.md`.

---

## OQ-002: Pilot — additional attributes

**Affects:** `int:Pilot`
**Responsible:** TUM

TUM to confirm whether any additional pilot-level attributes are required beyond `pilotId` and `pilotName` for the FOS optimisation use cases.

---

## OQ-003: AssetState — TUM original flat fields vs. per-asset-type pattern

**Status:** Resolved

TUM's original flat `AssetState` fields (`soeBESkwh`, `socBES`, `avgPvPower`, `tDwhC`, etc.) are not used. `int:AssetState` carries only the common `timestamp` and `isAssetStateOf` properties. All state fields are defined per asset type, derived from the individual asset type sheets in the working spreadsheet. These are documented in the AssetState sections of each asset class file (`battery.md`, `ev-charging.md`, `thermal.md`).

---

## OQ-004: ObservableProperty vocabulary — completeness

**Affects:** `int:ObservableProperty` named individuals, `ontology/observation/properties.md`
**Responsible:** All pilots

The current `ObservableProperty` named individual vocabulary is derived from the asset type sheets. Pilots to confirm whether any measurement types in their deployed systems are not yet represented in the vocabulary (e.g. manufacturer-specific proprietary measurements, weather station data, occupancy sensor data beyond what is in `FacilityState`).

---

## OQ-005: ActuatableProperty vocabulary — FOS command types

**Affects:** `int:ActuatableProperty` named individuals, `ontology/observation/actuation.md`
**Responsible:** TUM

TUM to confirm the complete set of `ActuatableProperty` named individuals required by the FOS trading module (D4.4). The current vocabulary (`PowerSetpoint`, `TemperatureSetpoint`, `OnOffState`, `FractionalSetpoint`) is derived from the original `ControlAssetCommand` flat fields. Additional command types may be needed for specific asset types.

---

## OQ-006: Actor.ownershipInformation structure

**Status:** Resolved

The original `ownershipInformation` free-text field on `int:Actor` has been removed. BLOOO has confirmed the replacement structure with the following dedicated fields, all added to `int:Actor`:

- `int:ownershipPercentage` (`xsd:float`, 0–100) — proportion of shares, voting rights, or capital an individual holds in a company
- `int:isBeneficialOwner` (`xsd:boolean`) — whether the actor ultimately owns or controls a legal entity or account and reaps the financial benefits, even if not listed on official documents
- `int:isControlPerson` (`xsd:boolean`) — whether the actor exercises, directly or indirectly, significant authority, control, or management over a legal entity
- `int:nationality` (`xsd:string`) — nationality of the actor, applicable when `type = NaturalPerson`

These fields are defined on `int:Actor` in [`ontology/participants/participant.md`](../ontology/participants/participant.md).

---

## OQ-007: Market domain — EnergyOrder direction property

**Status:** Resolved

`int:EnergyOrder` carries an `int:orderType` datatype property (`owl:oneOf`: `Bid`, `Offer`) to represent the domain concept that a buy intent and a sell intent are both orders distinguished by their direction. This is a semantic representation of the domain, not an API field or database column.

The corresponding `orderType` field in the JSON Schema Definition for the `Order` class is the implementation-level expression of the same concept. The ontology and the schema operate at different levels of abstraction and there is no conflict between them. No action is required from GSY, UoC, or R2M.

---

## OQ-008: FeederMeasurement — per-phase fields

**Status:** Resolved

Per-phase measurements follow the same `sosa:Observation` pattern as all other measurements. No fields are added to `int:FeederMeasurement`. Instead, the `ObservableProperty` named individual vocabulary in `properties.md` is extended with per-phase variants (`int:PhaseAActivePower`, `int:PhaseAVoltage`, `int:PhaseACurrent`, `int:PhaseAPowerFactor`, etc. for phases A, B, and C). AEM's SGIM observations at LIC use these named individuals as their `observedProperty` with `featureOfInterest` pointing to the relevant `int:Feeder` instance. No structural changes to any class are required.

---

## OQ-009: CommunityMeasurement vs FeederMeasurement — AEM disambiguation

**Status:** Resolved

AEM confirms that the distinction between `int:CommunityMeasurement` (Landis+Gyr S650 at the PCC, `meterLevel = Community`) and `int:FeederMeasurement` (SGIM at the MV/LV transformer, `meterLevel = Feeder`) correctly reflects their data architecture at the LIC pilot. Both metering points are unambiguously identifiable in AEM's REST API. No changes to the ontology are required.

---

## OQ-010: GridConnectionPoint as Asset subtype

**Affects:** `int:Asset`, `int:assetType`, `int:MeteringPoint`, `int:SmartMeter`
**Responsible:** EWAG, R2M

The `assetType` enumeration includes `GridConnectionPoint` as a value, intended to cover smart meters and metering points registered as assets. The ontology separately defines `int:SmartMeter` as a subclass of `int:Asset` and `int:MeteringPoint` as the location concept. Clarify whether `GridConnectionPoint` in the `assetType` enum maps to `int:SmartMeter` (the physical device) or `int:MeteringPoint` (the location), and update the enumeration description accordingly.

---

## OQ-011: HistoricalPilotData and HistoricalMarketData classes

**Status:** Resolved — both classes discarded

`HistoricalMarketData` is superseded by `int:MarketTimeSeries`, which already captures historical market outcomes per slot. `HistoricalPilotData` is superseded by the existing measurement and state classes across the spatial and asset domains — historical pilot data is simply a time-bounded collection of `sosa:Observation` instances, `int:SiteState`, `int:FacilityState`, `int:FacilityMeasurement`, `int:MeteringPointMeasurement`, and per-asset-type `int:AssetState` records. No dedicated historical container classes are needed. Neither class will appear in the ontology.

---

## OQ-012: Tariff structure — grid fee and tax decomposition

**Status:** Resolved

The tariff components are individually itemised in [`ontology/market/tariff.md`](../ontology/market/tariff.md): `energyPrice`, `networkTariff`, `levies`, and `taxes`. `capacityCharge` was considered but excluded as it is not a universal component across the Swiss, Irish, and Portuguese pilot jurisdictions at the ontology level of abstraction.

---

## OQ-013: GreenProof.selfConsumptionPercentage is not defined

**Affects:** `int:GreenProof`, `int:recordType`, Issuance Rule 10 (Record type consistency)
**Responsible:** GSY, EWAG

The spreadsheet's `recordType` rule says a `self_consumption_record` carries `selfConsumptionPercentage`, and Issuance Rule 10 bounds it to 0-100. The GreenProofs tab has no row defining this field. Confirm whether to add it (name, range, obligation) or drop it from both rules.

---

## OQ-014: GreenProof attributeMode is not defined

**Affects:** `int:productionAssetRegistryReference`, `int:consumptionAssetRegistryReference`
**Responsible:** GSY, EWAG

Both registry-reference fields are conditional: mandatory where `attributeMode` is `cancelled_official`. The GreenProofs tab defines no `attributeMode` field or value list. Define it, or restate the condition.

---

## OQ-015: GreenProof.siteId values are not Site UUIDs

**Affects:** `int:GreenProof` (`siteId`), `int:issuedForSite`
**Responsible:** GSY, EWAG

On `int:GreenProof`, `siteId` is an FK to `int:Site` and reuses `int:siteId`, which is an RFC 4122 UUID v4. The spreadsheet describes the field as a pilot certification instance id, and its example (`ch-aem-lic`) is a readable slug rather than a UUID. Align the values the GSY DEX emits with real `int:Site` identifiers.

---

## OQ-016: GreenProof asset identifiers vs int:Asset

**Affects:** `int:productionAssetId`, `int:consumptionAssetId`, `int:hasProductionAsset`, `int:hasConsumptionAsset`
**Responsible:** GSY

The spreadsheet's Semantic layer points `hasProductionAsset` and `hasConsumptionAsset` to `int:Asset`. It also describes `productionAssetId` as the seller facility id (FK to Facility), and `consumptionAssetId` as a buyer facility id, else a community id, else a party hash. Confirm whether these identify assets, facilities, or both, and adjust the ranges or the identifiers.

---

## OQ-017: GreenProof.ownerId party hash vs int:Actor

**Affects:** `int:ownerId`, `int:ownedBy`
**Responsible:** GSY, EWAG

`ownerId` holds a pseudonymised party hash, while `ownedBy` points to `int:Actor`, whose `actorId` is a UUID. Confirm how a party hash resolves to an Actor, and whether the record carries the hash, the `actorId`, or both. GDPR-sensitive.

---

## OQ-018: GreenProof.propertyMeasured vs the ObservableProperty vocabulary

**Affects:** `int:propertyMeasured`, `int:ObservableProperty` named individuals ([`properties.md`](observation/properties.md))
**Responsible:** GSY, EWAG

The spreadsheet's default for `propertyMeasured` is `measurement#active_energy`. No `int:ObservableProperty` named individual has that name; the closest are `int:ExportEnergy` and `int:EnergyOut`. Confirm the mapping, or propose a new named individual.

---

## OQ-019: greenProofAssetClass vs int:assetType

**Affects:** `int:greenProofAssetClass`, `int:assetType`
**Responsible:** GSY, EWAG

GreenProof uses its own asset class values (`PV`, `Battery`, `HeatPump`, `ElectricBoiler`, `ChargingPoint`, `MeteringPoint`), which differ from `int:assetType`. `ChargingPoint` corresponds to `EVChargingStation`, and `MeteringPoint` is a location class rather than an `int:Asset` subtype (related to OQ-010). Confirm whether GreenProof should adopt the `int:assetType` values.

---

## OQ-020: GreenProof.tradeStatusAtIssuance vs int:tradeStatus

**Affects:** `int:tradeStatusAtIssuance`, `int:tradeStatus`
**Responsible:** GSY

`tradeStatusAtIssuance` uses `settled` and `delivery_verified`, while `int:EnergyTrade.tradeStatus` uses `matched`, `executed`, `settled` and `rejected`. Confirm how `delivery_verified` relates to `executed` (energy delivery confirmed).

---

## OQ-021: GreenProof standard alignment and relation to IdentityCredential

**Affects:** `int:GreenProof`, `int:IdentityCredential`
**Responsible:** EWAG

The spreadsheet gives no standard mapping for GreenProof, so it uses the `int:` namespace. Separately, `int:IdentityCredential` is described as used for Green Proof issuance. Confirm whether a GreenProof is issued as a Verifiable Credential and, if so, how the two classes relate.

---

## OQ-022: GreenProof location fields are pilot-specific

**Affects:** `int:municipalityCode`, `int:gridOperatorId`, `int:gridLevel`
**Responsible:** GSY, pilots

The spreadsheet's defaults for these fields are for AEM at LIC, and `gridLevel` uses Swiss network levels 1-7. The GreenProofs tab marks only AEM and GSY as applicable. Confirm how these fields apply to the other pilots (HSLU, GV/ERE, UG).

---

## OQ-023: GreenProof.ratedPower representation

**Affects:** `int:ratedPower`
**Responsible:** GSY, EWAG

The implementation stores `ratedPower` as `{value, unit}`, while the ontology range is `xsd:decimal` in kW. Confirm whether to keep the decimal or model it as an `int:QuantityValue`.
