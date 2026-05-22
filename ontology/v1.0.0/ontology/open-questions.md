# Open Questions

This file collects all unresolved design questions and open items across the INTELLIGENT ontology. Each entry identifies the question, the classes or properties affected, and the partner(s) responsible for resolution.

Items are removed from this file once resolved and the relevant class files are updated.

---

## OQ-001: Facility optionality and Site-as-Facility pattern

**Affects:** `int:Site`, `int:Facility`
**Responsible:** R2M, TUM, HSLU, UG

When a pilot site has no sub-unit structure (e.g. the Aran Islands pilot where individual buildings each represent a single participant), `Site` acts as its own facility. The current model expresses this as `owl:minCardinality 0` on `int:hasFacility`. Confirm whether a dedicated `isSingleFacilitySite` boolean flag on `int:Site` would improve query clarity, or whether the zero-cardinality relation is sufficient.

---

## OQ-002: Pilot.buildingEnvelope structure

**Affects:** `int:Pilot`
**Responsible:** TUM

The `int:buildingEnvelope` datatype property on `int:Pilot` is defined as `xsd:string` pending TUM specification. TUM to define whether this represents simplified U-value parameters, an IFC geometry reference, ISO 13790 thermal model parameters, or a reference to an external building model.

---

## OQ-003: AssetState — TUM original flat fields vs. per-asset-type pattern

**Affects:** `int:AssetState`
**Responsible:** TUM, GSY, UoC

TUM's original `AssetState` contained flat fields (`soeBESkwh`, `socBES`, `avgPvPower`, `tDwhC`, etc.) that mixed values from multiple asset types into a single record. The revised ontology distributes these into per-asset-type `AssetState` fields (defined in each asset class file). TUM, GSY, and UoC to confirm this restructuring is compatible with the FOS data interface described in D4.4.

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

**Affects:** `int:Actor`
**Responsible:** BLOOO

The `int:ownershipInformation` property on `int:Actor` is marked as removed in the working spreadsheet but `int:ownershipPercentage`, `int:isBeneficialOwner`, and `int:isControlPerson` were added as replacements. BLOOO to confirm the complete KYC ownership structure and whether additional fields are needed for EU AML compliance.

---

## OQ-007: Market domain — EnergyOrder direction property

**Affects:** `int:EnergyOrder`
**Responsible:** GSY, UoC, R2M

The revised ontology replaces the thin `Bid` and `Offer` wrapper classes with a single `int:EnergyOrder` carrying an `int:orderDirection` property (`BID` or `OFFER`). GSY and R2M to confirm that no existing integration depends on the separate `Bid`/`Offer` class identity in a way that cannot be addressed by filtering on `orderDirection`.

---

## OQ-008: FeederMeasurement — per-phase fields

**Affects:** `int:FeederMeasurement`
**Responsible:** AEM

AEM's SGIM at LIC captures per-phase measurements (Phase A, B, C power, voltage, current, power factor, frequency) in addition to total values. The current `int:FeederMeasurement` class defines aggregate fields. AEM to confirm whether per-phase values should be separate `sosa:Observation` instances (with `observedProperty` distinguishing phase, e.g. `int:PhaseAVoltage`) or additional datatype properties on `int:FeederMeasurement`.

---

## OQ-009: CommunityMeasurement vs FeederMeasurement — AEM disambiguation

**Affects:** `int:CommunityMeasurement`, `int:FeederMeasurement`, `int:MeteringPoint`
**Responsible:** AEM, EWAG

At LIC, AEM has two distinct metering installations: the Landis+Gyr S650 at the PCC (community-level, net import/export) and the SGIM at the MV/LV transformer (feeder-level, per-phase grid topology). The ontology models these as separate `MeteringPoint` instances with `meterLevel = Community` and `meterLevel = Feeder` respectively. AEM to confirm this distinction correctly reflects their data architecture and that both metering points can be unambiguously identified in their REST API.

---

## OQ-010: GridConnectionPoint as Asset subtype

**Affects:** `int:Asset`, `int:assetType`, `int:MeteringPoint`, `int:SmartMeter`
**Responsible:** EWAG, R2M

The `assetType` enumeration includes `GridConnectionPoint` as a value, intended to cover smart meters and metering points registered as assets. The ontology separately defines `int:SmartMeter` as a subclass of `int:Asset` and `int:MeteringPoint` as the location concept. Clarify whether `GridConnectionPoint` in the `assetType` enum maps to `int:SmartMeter` (the physical device) or `int:MeteringPoint` (the location), and update the enumeration description accordingly.

---

## OQ-011: HistoricalPilotData and HistoricalMarketData classes

**Affects:** Optimisation domain
**Responsible:** TUM

The original ontology included `HistoricalPilotData` and `HistoricalMarketData` classes as TUM time-series containers for FOS model training. These have not yet been rewritten in the new ontology format. TUM to confirm whether these should be modelled as `dcat:Dataset` instances (following the DCAT vocabulary for dataset cataloguing) or as project-specific classes, and what their relationship to `int:Pilot` and `int:EnergyCommUnit` should be.

---

## OQ-012: Tariff structure — grid fee and tax decomposition

**Affects:** `int:Tariff`
**Responsible:** BLOOO, ERE, AEM

The `int:Tariff` class decomposes trade price into `energyPrice`, `gridFee`, and `taxes`. Grid fee structures differ across pilots (Switzerland, Ireland, Portugal each have different regulatory frameworks). BLOOO and the pilot DSOs (AEM for LIC, ERE for Greenvolt) to confirm whether a single `gridFee` field is sufficient or whether regulatory components (network tariff, levies, capacity charges) need to be individually itemised.
