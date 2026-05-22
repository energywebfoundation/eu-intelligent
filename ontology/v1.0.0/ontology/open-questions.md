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

These fields will be reflected in the `int:Actor` class definition when the participants domain files are written.

---

## OQ-007: Market domain — EnergyOrder direction property

**Status:** Resolved

`int:EnergyOrder` carries an `int:orderDirection` datatype property (`owl:oneOf`: `BID`, `OFFER`) to represent the domain concept that a buy intent and a sell intent are both orders distinguished by their direction. This is a semantic representation of the domain, not an API field or database column.

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

The tariff components must be individually itemised. A single `gridFee` field is not sufficient. `int:Tariff` will carry separate fields for each regulatory component: network tariff, levies, and capacity charges, in addition to the energy price and tax fields. The exact field set will be defined when the market domain files are written, incorporating the specific regulatory components applicable across the Swiss (LIC, CELL), Irish (Aran Islands), and Portuguese (Greenvolt) pilot jurisdictions.
