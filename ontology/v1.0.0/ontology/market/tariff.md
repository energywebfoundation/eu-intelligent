# Market: Tariff

## Overview

The `Tariff` class defines the price structure applied to a `Trade`, decomposing the total cost into energy, grid fee, and tax components. It is defined by BLOOO as part of the Billing and Payments service.

**Partners:** BLOOO

---

## Tariff

**Contributing partners:** BLOOO
**Standard mappings:** SAREF4ENER `Tariff`, CIM `PricingStructure`, `TransmissionReliabilityMargin` (grid fee component)

A `Tariff` record captures the full price breakdown for a specific `Trade`. It is the bridge between the market trading record (what was traded and at what clearing price) and the billing record (what is actually charged to the buyer and paid to the seller after fees and taxes).

### Attributes

| Attribute | Type | Required | Description | Standard Mapping |
|-----------|------|----------|-------------|-----------------|
| `tariffId` | UUID | Yes | Unique identifier | CIM `IdentifiedObject.mRID` |
| `buyerId` | UUID | Yes | Member who is billed (buyer) | CIM `IdentifiedObject.mRID` |
| `sellerId` | UUID | Yes | Member who receives payment (seller) | CIM `IdentifiedObject.mRID` |
| `tariffName` | string | No | Human-readable tariff scheme name | SAREF4ENER `Tariff.name` |
| `energyPrice` | number (EUR/kWh) | Yes | Energy component of the price | SAREF4ENER `Price.value` |
| `gridFee` | number (EUR/kWh) | Yes | Grid use-of-system fee | CIM `TransmissionReliabilityMargin` |
| `taxes` | number (EUR/kWh) | Yes | Applicable taxes and levies | - |
| `currency` | string | Yes | ISO 4217 currency code | ISO 4217 |
| `tradeId` | UUID | Yes | Trade this tariff applies to | CIM `IdentifiedObject.mRID` |
| `tradeQuantity` | number (kWh) | Yes | Energy quantity this tariff covers | - |
| `tradePrice` | number (EUR/kWh) | Yes | Final all-inclusive price per unit (energyPrice + gridFee + taxes) | CIM `Price.amount` |
| `tradeTimestamp` | timestamp | Yes | Trade timestamp (copied for denormalisation / audit) | OGC Time `Instant` |

### Relationships

| Relationship | Target | Cardinality | Description |
|-------------|--------|-------------|-------------|
| `applies to` | Trade | many to 1 | Trade this tariff decomposes |
| `billed to` | Member | many to 1 | Buyer member |
| `paid to` | Member | many to 1 | Seller member |

### Validation Rules

- `tariffId` must be a valid RFC 4122 UUID.
- `buyerId` must reference an existing `Member.memberId`.
- `sellerId` must reference an existing `Member.memberId`.
- `tradeId` must reference an existing `Trade.tradeId`.
- `currency` must be a valid ISO 4217 code. INTELLIGENT pilots use `EUR`.
- `energyPrice`, `gridFee`, `taxes` must each be non-negative.
- `tradePrice` should equal `energyPrice + gridFee + taxes` (subject to rounding tolerance).
- `tradeQuantity` must be greater than 0 and must not exceed the corresponding `Trade.tradeQuantity`.

### Notes

- Grid fee values differ across pilots depending on the applicable DSO tariff structure and national regulation. The INTELLIGENT platform does not set grid fees; they are configured per pilot site by the Community Manager or DSO.
- Tax rates (VAT, levies) are jurisdiction-specific: Switzerland (CH), Ireland (IE), and Portugal (PT) each apply different rates. No universal validation is possible; rates must be configured per pilot.
- `tradePrice` is denormalised (redundant sum of components) to simplify invoice generation downstream without requiring a join.
