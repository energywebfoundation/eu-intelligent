# Market: Market, MarketSlotInfo

## Overview

This module defines the market structure entities. A `Market` is the time-bounded trading venue within a Community. `MarketSlotInfo` records the time windows for individual trading slots within a Market.

**Partners:** GSY, UoC, TUM (Market), GSY, UoC (MarketSlotInfo)

---

## Market

**Contributing partners:** GSY, UoC, TUM
**Standard mappings:** CIM `Market`, SAREF4ENER `EnergyMarket`, ENTSO-E `MarketDocument`

A `Market` is a scoped trading venue associated with a `Community`, operating within defined time boundaries. The GSY DEX matching engine processes `Order` records submitted to a `Market` and produces `Trade` and `ClearingResult` records.

### Attributes

| Attribute | Type | Required | Description | Standard Mapping |
|-----------|------|----------|-------------|-----------------|
| `marketId` | UUID | Yes | Unique identifier | CIM `IdentifiedObject.mRID` |
| `communityId` | UUID | Yes | Community this market serves | CIM `IdentifiedObject.mRID` |
| `openingTime` | timestamp | Yes | Time at which order submission opens | OGC Time `hasBeginning` |
| `closingTime` | timestamp | Yes | Time at which order submission closes | OGC Time `hasEnd` |
| `deliveryStartTime` | timestamp | Yes | Start of the energy delivery interval | OGC Time `hasBeginning` |
| `deliveryEndTime` | timestamp | Yes | End of the energy delivery interval | OGC Time `hasEnd` |
| `marketType` | string | Yes | Type of market | CIM `MarketType` |

### `marketType` Values

| Value | Description |
|-------|-------------|
| `spot` | Intraday spot energy trading |
| `day_ahead` | Day-ahead energy trading |
| `flexibility` | Flexibility / balancing market |
| `intraday` | Intraday continuous trading |

### Relationships

| Relationship | Target | Cardinality | Description |
|-------------|--------|-------------|-------------|
| `belongs to` | Community | many to 1 | Community in which this market operates |
| `is divided into` | MarketSlotInfo | 1 to many | Time-slot metadata records |
| `contains` | Trade | 1 to many | Trades executed in this market |
| `contains` | Order | 1 to many | Orders submitted to this market |

### Validation Rules

- `marketId` must be a valid RFC 4122 UUID.
- `communityId` must reference an existing `Community.communityId`.
- `openingTime` must be before `closingTime`.
- `deliveryStartTime` must be after `closingTime` (delivery follows trading).
- `deliveryStartTime` must be before `deliveryEndTime`.
- `marketType` must be one of the enumerated values above.

---

## MarketSlotInfo

**Contributing partners:** GSY, UoC
**Standard mappings:** OGC Time `Interval`, CIM `MarketDocument` time windows

`MarketSlotInfo` records metadata for a single time slot within a `Market`. A market may be divided into multiple slots (e.g. 15-minute or 30-minute slots). Both `Community` and `Market` can independently record slot information.

### Attributes

| Attribute | Type | Required | Description | Standard Mapping |
|-----------|------|----------|-------------|-----------------|
| `communityId` | UUID | Yes | Community scope | CIM `IdentifiedObject.mRID` |
| `marketId` | UUID | Yes | Market this slot belongs to | CIM `IdentifiedObject.mRID` |
| `marketType` | string | Yes | Market type (mirrors `Market.marketType`) | CIM `MarketType` |
| `openingTime` | timestamp | Yes | Order submission opens for this slot | OGC Time `hasBeginning` |
| `closingTime` | timestamp | Yes | Order submission closes for this slot | OGC Time `hasEnd` |
| `deliveryStartTime` | timestamp | Yes | Energy delivery start for this slot | OGC Time `hasBeginning` |
| `deliveryEndTime` | timestamp | Yes | Energy delivery end for this slot | OGC Time `hasEnd` |

### Relationships

| Relationship | Target | Cardinality | Description |
|-------------|--------|-------------|-------------|
| `part of` | Market | many to 1 | The market this slot is part of |
| `scoped to` | Community | many to 1 | Community scope |

### Validation Rules

- `communityId` must reference an existing `Community.communityId`.
- `marketId` must reference an existing `Market.marketId`.
- Time window constraints identical to `Market`.
- Slot delivery windows must not overlap within the same `marketId`.
