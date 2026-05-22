# Market: Trade, AssetMeasurement

## Overview

This module defines the executed trade record and the real-time measurement snapshot that supports market operation.

**Partners:** R2M, GSY, UoC, TUM, BLOOO (Trade); GSY, UoC (AssetMeasurement)

---

## Trade

**Contributing partners:** R2M, GSY, UoC, TUM, BLOOO
**Standard mappings:** CIM `MarketAgreement`, `TransmissionReservation`, SAREF4ENER transaction record

A `Trade` records a matched and executed energy exchange between a seller and a buyer in the GSY DEX. It is the central settlement record: downstream services (Billing, Tariff calculation, Green Proofs) all derive from Trade records.

### Attribute Naming Note

This class has the highest number of inter-partner naming conflicts in the ontology. The canonical names adopted here are the prefixed forms. The legacy variants are documented for mapping purposes.

### Attributes

| Canonical Attribute | Type | Required | Description | Legacy Names | Standard Mapping |
|--------------------|------|----------|-------------|-------------|-----------------|
| `tradeId` | UUID | Yes | Unique identifier | `id` (R2M) | CIM `IdentifiedObject.mRID` |
| `bidId` | UUID | Yes | Reference to the matched Bid | - | CIM `IdentifiedObject.mRID` |
| `buyerId` | UUID | Yes | Member who bought energy | `buyer` (GSY, UoC, TUM, BLOOO) | CIM `IdentifiedObject.mRID` |
| `offerId` | UUID | Yes | Reference to the matched Offer | - | CIM `IdentifiedObject.mRID` |
| `sellerId` | UUID | Yes | Member who sold energy | `seller` (GSY, UoC, TUM, BLOOO) | CIM `IdentifiedObject.mRID` |
| `marketId` | UUID | Yes | Market in which this trade occurred | - | CIM `IdentifiedObject.mRID` |
| `residualBidId` | UUID | No | Unmatched remainder of the Bid after this trade | `residualBid` (R2M), `residualBidId` (GSY, UoC, TUM) | CIM `IdentifiedObject.mRID` |
| `residualOfferId` | UUID | No | Unmatched remainder of the Offer after this trade | `residualOffer` (R2M), `residualOfferId` (GSY, UoC, TUM) | CIM `IdentifiedObject.mRID` |
| `tradeStatus` | string | Yes | Lifecycle status of the trade | `status` (R2M), `tradeStatus` (GSY, UoC, TUM) | CIM `MarketAgreement.status` |
| `tradeQuantity` | number (kWh) | Yes | Energy quantity exchanged | `quantity` (R2M), `tradeQuantity` (GSY, UoC, TUM, BLOOO) | CIM `EnergyBidTimeSeries.energyQuantity` |
| `tradePrice` | number (EUR/kWh) | Yes | Agreed price per unit of energy | `price` (R2M), `tradePrice` (GSY, UoC, TUM, BLOOO) | CIM `Price.amount` |
| `tradeTimestamp` | timestamp | Yes | Time at which the trade was executed | `timestamp` (R2M), `tradeTimestamp` (GSY, UoC, TUM, BLOOO) | OGC Time `Instant` |

### `tradeStatus` Values

| Value | Description |
|-------|-------------|
| `matched` | Trade matched by the clearing engine; pending settlement |
| `settled` | Trade settled; energy delivered and billing triggered |
| `disputed` | Trade flagged for manual review |
| `cancelled` | Trade cancelled before settlement |

### Relationships

| Relationship | Target | Cardinality | Description |
|-------------|--------|-------------|-------------|
| `has` | Bid | 1 to 1 | Buy-side order matched in this trade |
| `has` | Offer | 1 to 1 | Sell-side order matched in this trade |
| `belongs to` | Market | many to 1 | Market in which this trade occurred |
| `offered by` | Member | many to 1 | Seller member |
| `bought by` | Member | many to 1 | Buyer member |
| `has` | Tariff | 0 to many | Tariff components applied to this trade |

### Validation Rules

- `tradeId` must be a valid RFC 4122 UUID.
- `buyerId` must reference an existing `Member.memberId`.
- `sellerId` must reference an existing `Member.memberId`.
- `buyerId` and `sellerId` must be different.
- `bidId` must reference an existing `Bid.bidId`.
- `offerId` must reference an existing `Offer.offerId`.
- `marketId` must reference an existing `Market.marketId`.
- `tradeQuantity` must be greater than 0.
- `tradePrice` must be greater than or equal to 0.
- `tradeTimestamp` must fall within the `Market.deliveryStartTime` / `Market.deliveryEndTime` window.

### Notes

- See ADR-008 for the naming harmonisation decision and the full legacy alias table.
- `residualBidId` and `residualOfferId` point to new `Bid`/`Offer` (and corresponding `Order`) records created to represent the unmatched portion of a partially matched order. They will be null when the original order was fully matched.

---

## AssetMeasurement

**Contributing partners:** GSY, UoC
**Standard mappings:** SOSA `Observation`, SAREF `Measurement`, SSN `MeasurementCapability`

A real-time or near-real-time observed value from an asset or area, used to inform market operations in the GSY DEX. Distinct from `Production` and `Consumption` (which are aggregated over a period): `AssetMeasurement` represents an instantaneous or interval observation.

### Attributes

| Attribute | Type | Required | Description | Standard Mapping |
|-----------|------|----------|-------------|-----------------|
| `value` | number | Yes | Observed measurement value (unit is implicit from asset context) | SOSA `hasSimpleResult` |
| `areaId` | UUID | Yes | Area in which this measurement is scoped | CIM `IdentifiedObject.mRID` |
| `communityId` | UUID | Yes | Community context | CIM `IdentifiedObject.mRID` |
| `timestamp` | timestamp | Yes | Time of the observation | OGC Time `Instant` |

### Relationships

| Relationship | Target | Cardinality | Description |
|-------------|--------|-------------|-------------|
| `recorded by` | Area | many to 1 | Area scoping this measurement |
| `recorded by` | Community | many to 1 | Community context |

### Validation Rules

- `areaId` must reference an existing `Area.areaId`.
- `communityId` must reference an existing `Community.communityId`.
- `timestamp` must not be in the future at time of recording.

### Notes

- The unit of `value` is not stored directly in `AssetMeasurement`. It is derived from the asset type and the context in which the measurement is used. A future version of this class should add a `unit` attribute (aligned with QUDT or IEC 61850 unit definitions) and an `observedProperty` reference for SSN/SOSA compliance.
