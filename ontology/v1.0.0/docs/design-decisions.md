# Design Decisions — v1.0.0

This document records Architecture Decision Records (ADRs) for the INTELLIGENT ontology. Resolved entries are kept for traceability. Open items are tracked as GitHub Issues using the `.github/ISSUE_TEMPLATE/` templates.

---

## ADR-001: Site vs Pilot distinction

**Status:** Resolved

`Site` and `Pilot` are distinct concepts. `Site` (mapped to `cim:ServiceLocation`) is a single physical building within a community — the spatial unit. `Pilot` (`int:Pilot`) is a project-level grouping of one or more `Site` instances representing one of the four INTELLIGENT demonstration sites, used for FOS scoping and project reporting. They are not the same entity. `Asset` references `Site` for physical installation; `Pilot` groups sites for project-level aggregation.

---

## ADR-002: Member address fields replaced by Address class

**Status:** Resolved

The former `Member` class carried flattened address sub-fields (`address_address1`, `address_city`, etc.). The `Member` class itself has been replaced by `int:Actor`. Address information is now represented by the separate `int:Address` class, referenced from `int:Actor` via dedicated object properties (`hasBillingAddress`, `hasResidentialAddress`, `hasBusinessAddress`). This removes redundancy and establishes BLOOO's canonical address structure as the single source of truth.

---

## ADR-003: AssetStatus removed — AssetState is the single class

**Status:** Resolved

`AssetStatus` (R2M) modelled operational health flags (`code`, `message`, `isHealthy`). It has been removed. `int:AssetState` is the single class for all asset condition information, with per-asset-type state fields defined in the individual asset class files.

---

## ADR-004: Asset subtype hierarchy

**Status:** Resolved

All device types (`BatteryUnit`, `PhotovoltaicUnit`, `HeatPump`, `ElectricBoiler`, `EVChargingStation`, `HydroGeneratingUnit`, `EnergyConsumer`, `SmartMeter`) are implemented as subclasses of `int:Asset`. `int:Asset` carries identity, lifecycle, and controllability. Subclasses carry static type-specific parameters as datatype properties. Dynamic measurements are `sosa:Observation` instances with the asset as `featureOfInterest` — not fields on the subclass. This follows the IEC CIM hybrid pattern.

---

## ADR-005: Bid and Offer replaced by EnergyOrder with orderType

**Status:** Resolved

The thin `Bid` and `Offer` wrapper classes (each carrying only a UUID) have been removed. A single `int:EnergyOrder` class with an `int:orderType` datatype property (`Bid` or `Offer`) replaces them. `int:EnergyTrade` references two `EnergyOrder` records via `matchedBid` and `matchedOffer` object properties. This aligns with `cim:BidTimeSeries` conventions. See OQ-007 for the ontology-vs-API framing clarification.

---

## ADR-006: Payment references Invoice, not Billing

**Status:** Resolved

The hierarchy is: `Billing` (aggregate period record) → `Invoice` (individual payable document) → `Payment` (financial transaction settling the invoice). `int:Payment.hasInvoice` references `int:Invoice` directly. `int:Invoice.hasBilling` references the parent `int:Billing`. `int:Billing.billingId` and `int:Invoice.invoiceId` are distinct identifiers serving different purposes.

---

## ADR-007: stripeInvoiceId vs invoiceId

**Status:** Resolved

`int:Invoice.invoiceId` is the INTELLIGENT platform-internal invoice identifier. `int:StripePayment.stripeInvoiceId` is Stripe's external PSP reference for the same invoice. These are distinct identifiers maintained separately. `int:StripePayment` links to `int:Payment` via `hasGenericPaymentDetails`, which in turn links to `int:Invoice`. The two IDs are never conflated.

---

## ADR-008: Trade field naming harmonisation

**Status:** Resolved

Canonical prefixed attribute names are used throughout: `tradeId`, `tradeStatus`, `tradeQuantity`, `tradePrice`, `tradedAt`, `residualBidId`, `residualOfferId`, `buyerId`, `sellerId`. These are unambiguous in multi-class contexts. Partner-specific variants (R2M's `id`, `timestamp`, `buyer`, `seller`) are implementation aliases documented in the working spreadsheet.

---

## ADR-009: Actor.role enumeration

**Status:** Resolved

`int:Actor.role` is a controlled enumeration: `Consumer`, `Prosumer`, `Producer`, `Aggregator`, `CommunityManager`, `ProjectPartner`, `Pilot`. Maps to `cim:MarketParticipant.marketRole`. Defined in [`ontology/participants/participant.md`](../ontology/participants/participant.md).

---

## ADR-010: Grid topology classes (GridParameter, GridTopology, FeederPara, TransfPara)

**Status:** Resolved

The original placeholder classes `GridParameter`, `GridTopology`, `FeederPara`, and `TransfPara` have been replaced by two properly defined classes. `int:Feeder` (`cim:ACLineSegment`) carries resistance, reactance, susceptance, rated current, and length for LV feeder segments. `int:Site` carries the Y-bus power flow parameters (`lineConductance`, `lineSusceptance`, `transformerReactance`, `minNodeVoltage`, `maxNodeVoltage`, `maxLineFlow`, `fromNodeId`, `toNodeId`, `lineId`) that were previously associated with `GridTopology`. There is no separate transformer class — transformer parameters relevant to site-level load flow are on `int:Site`.

---

## ADR-011: Asset.assetParam (TUM)

**Status:** Resolved

The TBD `assetParam` field on `Asset` has been resolved through the per-asset-type subclass structure. Type-specific technical parameters are defined as explicit datatype properties on each subclass (`BatteryUnit.ratedEnergy`, `PhotovoltaicUnit.peakPower`, `HeatPump.maxPowerRating`, etc.) derived from the individual asset type sheets in the working spreadsheet. No generic key-value extension map is used.

---

## ADR-012: Pilot.buildingEnvelope removed

**Status:** Resolved

The `buildingEnvelope` field on `int:Pilot` has been removed. No partner confirmed a structure for it. FOS thermal optimisation inputs are handled through `int:SiteState`, `int:FacilityState`, and per-asset `int:AssetState` records rather than a pilot-level geometry field.

---

## ADR-013: Actor.ownershipInformation replaced by structured KYC fields

**Status:** Resolved

The TBD `ownershipInformation` free-text field on `int:Actor` has been removed. BLOOO confirmed the replacement structure: `int:ownershipPercentage` (`xsd:float`), `int:isBeneficialOwner` (`xsd:boolean`), `int:isControlPerson` (`xsd:boolean`), and `int:nationality` (`xsd:string`). These fields are defined on `int:Actor` in [`ontology/participants/participant.md`](../ontology/participants/participant.md). All are GDPR-sensitive and must not be transmitted through EWDS unless explicitly required and consented. The `ownershipInformation` field that appeared on the `Stripe` class has been removed entirely — personal identity data for Stripe records is resolved via the `hasCustomer` and `hasLegalEntity` references to `int:Actor`.

---

## ADR-014: Grid class removed — replaced by MeteringPoint and Feeder

**Status:** Resolved

The `Grid` class conflated community-level PCC metering, feeder-level SGIM metering, building-level metering, and apartment-level metering across different partner interpretations. It has been removed. Its concepts are now correctly represented as follows: `int:MeteringPoint` (`cim:UsagePoint`) is the location where a meter is installed, with `meterLevel` discriminating the topological level (Community, Feeder, Site, Facility, Asset). `int:Feeder` (`cim:ACLineSegment`) is a segment of the LV distribution network — grid topology, not a metering concept. Confirmed by the May 2026 workshop.

---

## ADR-015: MarketSlotInfo removed

**Status:** Resolved

`MarketSlotInfo` was a message class mirroring `Market` data for broadcast. It has been removed. Each `Market` record is broadcast directly via EWDS to all relevant partners. A mirroring class is unnecessary. Confirmed in the May 2026 workshop with GSY and TUM.

---

## ADR-016: Member class replaced by Actor

**Status:** Resolved

The `Member` class (R2M) and its overlapping fields with `Actor` (BLOOO) have been consolidated into a single `int:Actor` class. `Actor` is the legal and domain identity of a platform participant. The former flat address and contact sub-fields on `Member` are replaced by object property references to `int:Address` and `int:ContactDetails`. The `Member.role` enumeration is retained as `int:Actor.role`.
