# Market Domain: EnergyTrade

---

## int:EnergyTrade

**IRI:** `int:EnergyTrade`

**Subclass of:** `owl:Thing`

**Standard mapping:** `cim:MarketAgreement`

A matched and executed energy exchange between a buyer and a seller. `EnergyTrade` is the central settlement record — downstream services (Billing, Tariff calculation) derive from it. The canonical attribute names adopted here are the prefixed forms, resolving the multi-partner naming divergence documented in the original ADR-008.

### Datatype Properties

| Property | IRI | Range | Description |
|----------|-----|-------|-------------|
| tradeId | `int:tradeId` | `xsd:string` | Unique identifier. RFC 4122 UUID v4. |
| tradeStatus | `int:tradeStatus` | `owl:oneOf` | Lifecycle status of the trade. |
| tradeQuantity | `int:tradeQuantity` | `xsd:float` | Traded energy quantity in kWh. |
| tradePrice | `int:tradePrice` | `xsd:float` | Settled trade price in EUR/kWh. |
| tradedAt | `int:tradedAt` | `xsd:dateTime` | Timestamp when the trade was matched. ISO 8601 with timezone. |

### Object Properties

| Property | IRI | Range | Cardinality | Description |
|----------|-----|-------|-------------|-------------|
| tradedOnMarket | `int:tradedOnMarket` | [`int:Market`](market.md#intmarket) | `owl:exactly 1` | Market in which this trade occurred. |
| matchedBid | `int:matchedBid` | [`int:EnergyOrder`](order.md#intenergyorder) | `owl:exactly 1` | The buy-side order matched in this trade. |
| matchedOffer | `int:matchedOffer` | [`int:EnergyOrder`](order.md#intenergyorder) | `owl:exactly 1` | The sell-side order matched in this trade. |
| hasBuyer | `int:hasBuyer` | [`int:Actor`](../participants/participant.md#intactor) | `owl:exactly 1` | Actor who bought energy in this trade. |
| hasSeller | `int:hasSeller` | [`int:Actor`](../participants/participant.md#intactor) | `owl:exactly 1` | Actor who sold energy in this trade. |
| hasResidualBid | `int:hasResidualBid` | [`int:EnergyOrder`](order.md#intenergyorder) | `owl:maxCardinality 1` | Residual buy-side order after partial matching. NULL if fully matched. |
| hasResidualOffer | `int:hasResidualOffer` | [`int:EnergyOrder`](order.md#intenergyorder) | `owl:maxCardinality 1` | Residual sell-side order after partial matching. NULL if fully matched. |

### Enumeration Values

#### int:tradeStatus

| Value | Description |
|-------|-------------|
| `matched` | Buyer and seller matched; pending physical delivery confirmation. |
| `executed` | Energy delivery confirmed. |
| `settled` | Financial settlement complete. |
| `rejected` | Trade rejected. |
