# Design Decisions

This document records Architecture Decision Records (ADRs) and open questions identified during the development of the INTELLIGENT ontology. Each entry captures the question, the parties involved, the current status, and (once resolved) the decision and rationale.

Open items should also be tracked as GitHub Issues using the `attribute-change` or `new-class` templates.

---

## ADR-001: Is `Site` the same entity as `Pilot`?

**Status:** Open
**Raised by:** R2M, TUM
**Source:** ER diagram annotation on `Site.siteId` ("Is this the same as Pilot?")

**Question:**
`Site` (R2M) and `Pilot` (TUM) both appear to describe a physical location hosting energy assets. R2M links `Asset` to a `Site`; TUM links `Asset` to a `Pilot`. Are these the same concept under different names, or do they represent different scopes of location?

**Options:**
1. Merge into a single `Site` class, treating `Pilot` as a view or subtype.
2. Keep both, with `Pilot` being a project-specific grouping of one or more `Site` instances.
3. Make `Pilot` extend `Site` (inheritance relationship).

**Impact:** Affects `Asset.siteId` vs `Asset.pilotId` references, and how pilot-level aggregations (e.g. `PilotState`) relate to site-level billing.

---

## ADR-002: `Member` address fields vs `Address` class (BLOOO)

**Status:** Open
**Raised by:** R2M, BLOOO
**Source:** ER diagram annotation on `Member.address_address1` ("address can use BLOOO's address format")

**Question:**
`Member` (R2M) contains flattened address sub-fields (`address_address1`, `address_city`, etc.). BLOOO defines a separate structured `Address` class with the same semantic content. Should `Member` be refactored to reference `Address` directly, replacing the flat fields?

**Options:**
1. Replace `Member` address fields with a foreign key to `Address`.
2. Keep both as they are, accepting the duplication.
3. Keep `Member` flat fields for backwards compatibility but add a derived `Address` link.

**Recommendation:** Option 1. The `Actor ||--|{ Address` relationship already exists in the diagram. Aligning `Member` to the same pattern removes redundancy and makes BLOOO's canonical address format the single source of truth.

---

## ADR-003: AssetStatus — resolved, class removed

**Status:** Resolved
**Raised by:** R2M, TUM
**Resolution date:** 2026-05-22

`AssetStatus` (R2M) modelled operational health flags (`code`, `message`, `isHealthy`). After clarification with partners, it was confirmed that `int:AssetState` — which captures the current operational condition of each asset type — is the correct and sufficient concept. `AssetStatus` has been **removed** from the ontology. All asset condition information is now expressed through `int:AssetState`, with per-asset-type state fields defined in the individual asset class files.

---

## ADR-004: `Battery` and `PvSystem` as subtypes of `Asset`

**Status:** Open
**Raised by:** UG, HSLU
**Source:** ER diagram labels `Battery (UG, HSLU) --> Asset?` and `PvSystem (UG, HSLU) --> Asset?`

**Question:**
Should `Battery`, `PvSystem`, `Grid`, `Load`, `EVChargingStation`, `HydroPowerPlant`, and `GridBuilding` be explicit subtypes (specialisations) of `Asset`, or remain as standalone classes linked by `assetType` string?

**Options:**
1. Subtyping: each device class extends `Asset`, inheriting its lifecycle attributes. Asset-level relationships (to `Member`, `Site`, `Production`, `Consumption`) are automatically inherited.
2. Composition: `Asset.assetType` discriminates the type and the device record is a separate entity linked by `assetId`.
3. Hybrid: `Asset` is the registry entry; device classes carry the measurement schema only (no lifecycle duplication).

**Recommendation:** Option 3 (hybrid). `Asset` holds identity, lifecycle, and ownership. Device classes (`Battery`, `PvSystem`, etc.) hold measurement attributes only and carry `assetId` as their primary key / FK. This follows the IEC 61850 pattern where the `ConductingEquipment` class holds identity and specialised logical nodes hold measured values.

---

## ADR-005: `Bid` and `Offer` as thin wrappers vs. full `Order` subtypes

**Status:** Open
**Raised by:** R2M, GSY
**Source:** ER diagram: `Bid` has only `bidId`; `Offer` has only `offerId`; both are linked from `Trade`

**Question:**
`Bid` and `Offer` currently carry only a UUID. `Order` carries the full specification. The relation `Bid ||--|| Order : "equals"` implies they are the same record. Should `Bid` and `Offer` be eliminated in favour of `Order` with a `orderType` discriminator, or are they needed as separate references in `Trade`?

**Recommendation:** Evaluate whether `Trade` can reference two `Order` records (one of type BID, one of type OFFER) directly, removing the thin `Bid` and `Offer` wrapper classes. This would simplify the model and align with CIM `BidTimeSeries` conventions.

---

## ADR-006: `Payment.invoiceId` vs `Billing.billingId`

**Status:** Open
**Raised by:** R2M, BLOOO
**Source:** ER diagram annotation: `Payment.invoiceId "(Same as Billing.id?)"`

**Question:**
`Payment.invoiceId` and `Billing.billingId` appear to reference the same billing record. Additionally, BLOOO defines a separate `Invoice` class with its own `invoiceId`. There are therefore three potentially overlapping identifiers: `Billing.billingId`, `Billing.invoiceNumber`, and `Invoice.invoiceId`.

**Recommendation:** Clarify the hierarchy:
- `Billing` = the billing account/period record (one per member per period)
- `Invoice` = a specific payable document derived from a `Billing` record (one-to-many possible for revised invoices)
- `Payment.invoiceId` should reference `Invoice.invoiceId`, not `Billing.billingId`

---

## ADR-007: `Stripe.stripeInvoiceId` vs `Invoice.invoiceId`

**Status:** Open
**Raised by:** BLOOO
**Source:** ER diagram annotation: `Stripe.stripeInvoiceId "Is this different than the invoiceId above?"`

**Question:**
`Stripe` is the Stripe payment provider integration record. `stripeInvoiceId` is Stripe's internal invoice reference, which is different from the INTELLIGENT `Invoice.invoiceId`. These should remain separate with an explicit mapping between them rather than treating them as the same field.

**Decision (proposed):** Keep both. `Invoice.invoiceId` is the platform-internal identifier. `Stripe.stripeInvoiceId` is the external PSP reference. The `Invoice ||--o{ Stripe` relation already models this correctly. Pending confirmation from BLOOO.

---

## ADR-008: Field naming harmonisation for `Trade`

**Status:** Open
**Raised by:** R2M, GSY, UoC, TUM, BLOOO
**Source:** ER diagram attribute notes showing partner-specific naming variants

**Question:**
`Trade` attributes have divergent names across partners:
- `tradeId` (R2M uses `id`)
- `buyerId` / `buyer`
- `sellerId` / `seller`
- `status` / `tradeStatus`
- `quantity` / `tradeQuantity`
- `price` / `tradePrice`
- `timestamp` / `tradeTimestamp`
- `residualBid` / `residualBidId`
- `residualOffer` / `residualOfferId`

**Recommendation:** Adopt the prefixed form (`tradeId`, `tradeStatus`, `tradeQuantity`, `tradePrice`, `tradeTimestamp`, `residualBidId`, `residualOfferId`) as the canonical ontology attribute name, as it is unambiguous in multi-class contexts. Partners consuming the ontology via EWDS should map their internal names to the canonical form. A backward-compatibility alias table should be maintained.

---

## ADR-009: `Member.role` enumeration

**Status:** Open
**Raised by:** R2M

**Question:**
`Member.role` is defined as a free string. What are the valid role values across the four pilot sites? Common roles in the INTELLIGENT context include: `prosumer`, `consumer`, `producer`, `aggregator`, `community_manager`, `grid_operator`.

**Action:** R2M to propose an enumeration. Mapping to CIM `OrganisationRole.kind` once agreed.

---

## ADR-010: `GridParameter`, `GridTopology`, `FeederPara`, `TransfPara` attribute definitions

**Status:** Open
**Raised by:** GSY, UoC
**Source:** ER diagram: these four classes have empty attribute blocks

**Question:**
The grid topology classes are included in the ER diagram but have no attributes defined yet. These are critical for network-aware trading in GSY DEX.

**Expected attributes (from CIM/IEC 61850 reference):**
- `FeederPara`: resistance (R), reactance (X), susceptance (B), rated current, length
- `TransfPara`: rated power, voltage ratio, impedance, tap changer position
- `GridTopology`: node/branch connectivity, voltage level, substation reference

**Action:** GSY/UoC to provide attribute definitions. These will then be mapped to CIM `ACLineSegment`, `PowerTransformer`, and `ConnectivityNode` respectively.

---

## ADR-011: `Asset.assetParam` (TUM) definition

**Status:** Open
**Raised by:** TUM
**Source:** ER diagram: `TBD assetParam "TUM"`

**Question:**
TUM specifies an `assetParam` field on `Asset` of unknown type. This likely holds asset-specific technical parameters used by the FOS optimisation module (e.g. battery chemistry, inverter ratings, heat pump COP curve).

**Action:** TUM to specify the structure. May resolve as a set of typed sub-classes per asset type (see ADR-004) or a key-value extension map.

---

## ADR-012: `Pilot.buildingEnvelope` type definition

**Status:** Resolved — field removed

The `buildingEnvelope` field on `int:Pilot` has been removed. The field was TBD and no partner confirmed a structure for it. FOS thermal optimisation inputs are handled through the measurement and state classes (`int:SiteState`, `int:FacilityState`, `int:AssetState`) rather than a pilot-level geometry field.

---

## ADR-013: `Actor.ownershipInformation` and `Stripe.ownershipInformation` type definition

**Status:** Open
**Raised by:** BLOOO
**Source:** ER diagram: `TBD ownershipInformation` on both `Actor` and `Stripe`

**Question:**
`ownershipInformation` appears on both `Actor` and `Stripe` (the Stripe integration record). This is likely a KYC field capturing ultimate beneficial ownership (UBO) data. The structure, GDPR classification, and storage approach need to be defined.

**Action:** BLOOO to specify. Given GDPR sensitivity, this field should not be included in data exchanged through EWDS unless explicitly required and consented.
