# Market Domain: Market, MarketTimeSeries

---

## int:Market

**IRI:** `int:Market`

**Subclass of:** `cim:Market`

**Standard mapping:** `cim:Market`, `saref4ener:EnergyMarket`

A time-bounded trading venue associated with an `EnergyCommUnit`. One `Market` record represents one delivery slot. Orders submitted within the `[openingTime, closingTime]` window are matched by the clearing algorithm and produce `EnergyTrade` and `ClearingResult` records.

### Datatype Properties

| Property | IRI | Range | Description |
|----------|-----|-------|-------------|
| marketId | `int:marketId` | `xsd:string` | Unique identifier. RFC 4122 UUID v4. |
| openingTime | `int:openingTime` | `xsd:dateTime` | Datetime at which the market opens for order submission. ISO 8601 with timezone. |
| closingTime | `int:closingTime` | `xsd:dateTime` | Datetime at which the market closes. After this time the matching algorithm is invoked. ISO 8601 with timezone. |
| deliveryStartTime | `int:deliveryStartTime` | `xsd:dateTime` | Start of the energy delivery period. ISO 8601 with timezone. |
| deliveryEndTime | `int:deliveryEndTime` | `xsd:dateTime` | End of the energy delivery period. ISO 8601 with timezone. |
| marketType | `int:marketType` | `owl:oneOf` | Type of market. |
| matchingAlgorithm | `int:matchingAlgorithm` | `owl:oneOf` | The clearing algorithm applied to this market slot. |
| createdAt | `int:createdAt` | `xsd:dateTime` | Timestamp when this record was created. ISO 8601 with timezone. |

### Object Properties

| Property | IRI | Range | Cardinality | Description |
|----------|-----|-------|-------------|-------------|
| belongsToCommunity | `int:belongsToCommunity` | [`int:EnergyCommUnit`](../spatial/community.md#intenergycommunity) | `owl:exactly 1` | Community this market is associated with. |

### Enumeration Values

#### int:marketType

| Value | Description |
|-------|-------------|
| `local_spot` | Intra-community P2P spot trading. |
| `flex` | Flexibility market for congestion management. |
| `local_settlement` | Settlement market. Included for forward compatibility per D4.4 M18 Table 7. |

#### int:matchingAlgorithm

| Value | Description |
|-------|-------------|
| `PayAsBid` | Each matched trade settles at its individual bid price. Default. |
| `PayAsClear` | All trades in the slot settle at the uniform clearing price. |
| `AMM` | Automated Market Maker algorithm led by UoC per the Grant Agreement. |

---

## int:MarketTimeSeries

**IRI:** `int:MarketTimeSeries`

**Subclass of:** `owl:Thing`

**Standard mapping:** `sosa:ObservationCollection`

A header record aggregating a sequence of `Market` slot records for a community over a defined historical period. Used by TUM's FOS module for retrospective market analysis. Replaces the discarded `HistoricalMarketData` class.

### Datatype Properties

| Property | IRI | Range | Description |
|----------|-----|-------|-------------|
| periodFrom | `int:periodFrom` | `xsd:dateTime` | Start of the historical period. ISO 8601 with timezone. |
| periodUntil | `int:periodUntil` | `xsd:dateTime` | End of the historical period. ISO 8601 with timezone. |
| granularity | `int:granularity` | `owl:oneOf` | Time resolution of the child market slot records. |

### Object Properties

| Property | IRI | Range | Cardinality | Description |
|----------|-----|-------|-------------|-------------|
| hasCommunity | `int:hasCommunity` | [`int:EnergyCommUnit`](../spatial/community.md#intenergycommunity) | `owl:exactly 1` | Community whose market history this covers. |
| hasMarkets | `int:hasMarkets` | [`int:Market`](#intmarket) | `owl:minCardinality 0` | Market slot records included in this time series. |

### Enumeration Values

#### int:granularity

| Value | Description |
|-------|-------------|
| `15min` | 15-minute slot resolution. |
| `1h` | 1-hour slot resolution. |
| `1d` | Daily resolution. |
