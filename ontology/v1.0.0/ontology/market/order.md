# Market: Order, Bid, Offer, ClearingResult, Area

## Overview

This module defines the order lifecycle and market clearing entities used by the GSY DEX trading engine.

**Partners:** GSY, UoC, TUM (Order, ClearingResult, Area), R2M (Bid, Offer)

---

## Order

**Contributing partners:** GSY, UoC, TUM
**Standard mappings:** CIM `BidTimeSeries`, `RegisteredResource`, SAREF4ENER `BuyingOffer` / `SellingOffer`

An `Order` is the full specification of a buy (`BID`) or sell (`OFFER`) intent submitted by a `Member` to the GSY DEX. Orders are matched by the clearing engine to produce `Trade` records.

### Attributes

| Attribute | Type | Required | Description | Standard Mapping |
|-----------|------|----------|-------------|-----------------|
| `orderId` | string | Yes | Unique identifier (string to allow GSY DEX internal format) | CIM `IdentifiedObject.mRID` |
| `orderType` | string | Yes | BID or OFFER | CIM `Side` |
| `orderStatus` | string | Yes | Current lifecycle status | CIM `BidTimeSeries.status` |
| `createdBy` | UUID | Yes | Member who created this order | CIM `IdentifiedObject.mRID` |
| `areaUuid` | UUID | Yes | Area in which this order is valid | CIM `IdentifiedObject.mRID` |
| `marketId` | UUID | Yes | Market this order is submitted to | CIM `IdentifiedObject.mRID` |
| `timeSlot` | timestamp | Yes | Target energy delivery time slot | OGC Time `Instant` |
| `creationTime` | timestamp | Yes | Time at which the order was submitted | OGC Time `Instant` |
| `quantity` | number | Yes | Energy quantity (kWh) being offered or requested | CIM `EnergyBidTimeSeries.energyQuantity` |
| `priceLimit` | number | Yes | Maximum price (BID) or minimum price (OFFER) in EUR/kWh | CIM `Price.amount` |
| `energySourcePreference` | string | No | Preferred energy source attribute | SAREF4ENER `EnergySource` |
| `energyType` | string | No | Type of energy product | CIM `MarketEnergyProduct` |

### `orderType` Values

| Value | Description |
|-------|-------------|
| `BID` | Buy-side order: member wants to purchase energy |
| `OFFER` | Sell-side order: member wants to sell energy |

### `orderStatus` Values

| Value | Description |
|-------|-------------|
| `open` | Order submitted and awaiting matching |
| `partially_matched` | Order partially matched; residual pending |
| `fully_matched` | Order completely matched |
| `cancelled` | Order cancelled by the member |
| `expired` | Order not matched before market close |

### `energySourcePreference` Values (Recommended)

| Value | Description |
|-------|-------------|
| `solar` | Photovoltaic generation |
| `wind` | Wind generation |
| `hydro` | Hydroelectric generation |
| `any` | No preference |

### Relationships

| Relationship | Target | Cardinality | Description |
|-------------|--------|-------------|-------------|
| `submitted by` | Member | many to 1 | Order creator |
| `located in` | Area | many to 1 | Geographic/logical area scope |
| `submitted to` | Market | many to 1 | Target market |
| `equals` | Bid | 1 to 1 (if BID) | Corresponding Bid identity record |

### Validation Rules

- `orderType` must be `BID` or `OFFER`.
- `quantity` must be greater than 0.
- `priceLimit` must be greater than or equal to 0.
- `createdBy` must reference an existing `Member.memberId`.
- `areaUuid` must reference an existing `Area.areaId`.
- `marketId` must reference an existing `Market.marketId`.
- `timeSlot` must fall within the `Market.deliveryStartTime` / `Market.deliveryEndTime` window.
- `creationTime` must be within the `Market.openingTime` / `Market.closingTime` window.

---

## Bid

**Contributing partners:** R2M
**Standard mappings:** CIM `BidTimeSeries` (buy side)

A thin identity wrapper for a buy-side `Order`. Exists to support explicit pairing references in `Trade`. See ADR-005 for the open question regarding whether `Bid` and `Offer` can be merged into `Order`.

### Attributes

| Attribute | Type | Required | Description |
|-----------|------|----------|-------------|
| `bidId` | UUID | Yes | Unique identifier; corresponds to the matching `Order.orderId` |

### Relationships

| Relationship | Target | Cardinality | Description |
|-------------|--------|-------------|-------------|
| `equals` | Order | 1 to 1 | The full Order specification this Bid represents |
| `referenced by` | Trade | 1 to 1 | Trade in which this Bid was matched |

---

## Offer

**Contributing partners:** R2M
**Standard mappings:** CIM `BidTimeSeries` (sell side)

A thin identity wrapper for a sell-side `Order`. See ADR-005.

### Attributes

| Attribute | Type | Required | Description |
|-----------|------|----------|-------------|
| `offerId` | UUID | Yes | Unique identifier; corresponds to the matching `Order.orderId` |

### Relationships

| Relationship | Target | Cardinality | Description |
|-------------|--------|-------------|-------------|
| `equals` | Order | 1 to 1 | The full Order specification this Offer represents |
| `referenced by` | Trade | 1 to 1 | Trade in which this Offer was matched |

---

## ClearingResult

**Contributing partners:** GSY, UoC, TUM
**Standard mappings:** CIM `MarketAgreement`, ENTSO-E clearing document

The outcome of a single market clearing run for a given `Market` time slot. Records the aggregate cleared price, volumes, and the blockchain transaction hash for on-chain settlement.

### Attributes

| Attribute | Type | Required | Description | Standard Mapping |
|-----------|------|----------|-------------|-----------------|
| `marketId` | UUID | Yes | Market that was cleared | CIM `IdentifiedObject.mRID` |
| `clearingStatus` | string | Yes | Outcome of the clearing process | CIM `MarketDocument.status` |
| `clearingPrice` | number (EUR/kWh) | No | Market clearing price | CIM `Price.amount` |
| `totalSupply` | number (kWh) | No | Total matched supply volume | CIM `EnergyBidTimeSeries` |
| `totalDemand` | number (kWh) | No | Total matched demand volume | CIM `EnergyBidTimeSeries` |
| `tradeQuantity` | number (kWh) | No | Total traded volume in this clearing | CIM `EnergyBidTimeSeries.energyQuantity` |
| `numTrades` | number | No | Number of individual trades produced | - |
| `txHash` | string | No | Blockchain transaction hash for on-chain record | GSY DEX on-chain protocol |
| `clearingTime` | timestamp | Yes | Time at which clearing was executed | OGC Time `Instant` |

### `clearingStatus` Values

| Value | Description |
|-------|-------------|
| `cleared` | Market cleared successfully with at least one trade |
| `no_match` | Market opened and closed with no trades matched |
| `failed` | Clearing process failed; manual review required |

### Relationships

| Relationship | Target | Cardinality | Description |
|-------------|--------|-------------|-------------|
| `result of` | Market | many to 1 | The market slot that was cleared |

### Validation Rules

- `marketId` must reference an existing `Market.marketId`.
- `clearingPrice` must be non-negative.
- `totalSupply` and `totalDemand` are expected to be equal (matched volumes).
- `txHash` format is blockchain-protocol specific (GSY DEX uses EVM-compatible hashes: 0x-prefixed 64-character hex string).

---

## Area

**Contributing partners:** GSY, UoC
**Standard mappings:** CIM `SubGeographicalRegion`, `TopologicalNode`

A geographic or logical zone used by the GSY DEX to scope `Order` submission and `AssetMeasurement` association. An Area may correspond to a feeder, building cluster, or community segment.

### Attributes

| Attribute | Type | Required | Description | Standard Mapping |
|-----------|------|----------|-------------|-----------------|
| `areaId` | UUID | Yes | Unique identifier (also referenced as `areaUuid` in Order and AssetMeasurement) | CIM `IdentifiedObject.mRID` |

### Relationships

| Relationship | Target | Cardinality | Description |
|-------------|--------|-------------|-------------|
| `records` | AssetMeasurement | 1 to many | Measurements scoped to this area |
| `scopes` | Order | 1 to many | Orders submitted within this area |

### Notes

- `Area` is intentionally minimal. It provides a scoping key for market operations without prescribing a specific geographic model. Extensions (e.g. voltage level, feeder reference) are expected as the grid topology model matures via ADR-010.
