# Market Domain: EnergyOrder, ClearingResult

---

## int:EnergyOrder

**IRI:** `int:EnergyOrder`

**Subclass of:** `owl:Thing`

**Standard mapping:** `cim:BidTimeSeries`

A buy or sell intent submitted by a participant to a `Market`. The `orderType` property distinguishes bids (`Bid`) from offers (`Offer`). This single class replaces the former thin `Bid` and `Offer` wrapper classes; the direction is a datatype property, not a subclass distinction. See OQ-007 (resolved).

### Datatype Properties

| Property | IRI | Range | Description |
|----------|-----|-------|-------------|
| orderId | `int:orderId` | `xsd:string` | Unique identifier. RFC 4122 UUID v4. |
| orderType | `int:orderType` | `owl:oneOf` | Whether this order is a buy (Bid) or sell (Offer). |
| orderStatus | `int:orderStatus` | `owl:oneOf` | Current lifecycle status of this order submission. |
| timeSlot | `int:timeSlot` | `xsd:dateTime` | Target energy delivery timeslot. ISO 8601 with timezone. |
| quantity | `int:quantity` | `xsd:float` | Energy quantity in kWh. |
| priceLimit | `int:priceLimit` | `xsd:float` | Price limit in EUR/kWh. Maximum for bids, minimum for offers. |
| energySourcePreference | `int:energySourcePreference` | `xsd:string` | Preferred energy source types. |
| energyType | `int:energyType` | `xsd:string` | Energy type classification. |
| preferredTradingPartner | `int:preferredTradingPartner` | `xsd:string` | Preferred trading partner identifiers. |
| createdAt | `int:createdAt` | `xsd:dateTime` | Datetime when this order was submitted. ISO 8601 with timezone. |
| updatedAt | `int:updatedAt` | `xsd:dateTime` | Datetime when this order was last updated. ISO 8601 with timezone. |
| rejectionReason | `int:rejectionReason` | `xsd:string` | Human-readable reason for cancellation. Populated when `orderStatus = Cancelled`. |

### Object Properties

| Property | IRI | Range | Cardinality | Description |
|----------|-----|-------|-------------|-------------|
| belongsToMarket | `int:belongsToMarket` | [`int:Market`](market.md#intmarket) | `owl:exactly 1` | Market this order is submitted to. |
| createdBy | `int:createdBy` | `int:Actor` | `owl:exactly 1` | Actor who submitted this order. |

### Enumeration Values

#### int:orderType

| Value | Description |
|-------|-------------|
| `Bid` | Buy-side order — participant wants to purchase energy. |
| `Offer` | Sell-side order — participant wants to sell energy. |

#### int:orderStatus

| Value | Description |
|-------|-------------|
| `Submitted` | Order submitted and awaiting matching. |
| `PartiallyFilled` | Order partially matched; residual pending. |
| `Filled` | Order completely matched. |
| `Cancelled` | Order cancelled. |
| `Expired` | Order not matched before market close. |
| `Rejected` | Order rejected by the market engine. |
| `Executed` | Order executed and settled. |

---

## int:ClearingResult

**IRI:** `int:ClearingResult`

**Subclass of:** `owl:Thing`

**Standard mapping:** `cim:MarketAgreement`

The outcome of a single market clearing run for a given `Market` slot. Records aggregate cleared price, volumes, number of trades, and the blockchain transaction hash for on-chain settlement via the Energy Web Chain.

### Datatype Properties

| Property | IRI | Range | Description |
|----------|-----|-------|-------------|
| clearingStatus | `int:clearingStatus` | `owl:oneOf` | Outcome status of the clearing event. |
| noBidReason | `int:noBidReason` | `xsd:string` | Reason code when `clearingStatus = NO_BID` or `REJECTED`. NULL otherwise. |
| clearingPrice | `int:clearingPrice` | `xsd:float` | Market clearing price in EUR/kWh. Present for `FINAL` and `PARTIAL` outcomes. |
| totalSupply | `int:totalSupply` | `xsd:float` | Total aggregate supply at clearing time in kWh. |
| totalDemand | `int:totalDemand` | `xsd:float` | Total aggregate demand at clearing time in kWh. |
| tradedQuantity | `int:tradedQuantity` | `xsd:float` | Actual traded volume in kWh. Equal to min(totalSupply, totalDemand). |
| numTrades | `int:numTrades` | `xsd:integer` | Number of individual trades produced by this clearing. |
| txHash | `int:txHash` | `xsd:string` | Energy Web Chain transaction hash anchoring this clearing result on-chain. |
| createdAt | `int:createdAt` | `xsd:dateTime` | Datetime when this clearing result was recorded. ISO 8601 with timezone. |

### Object Properties

| Property | IRI | Range | Cardinality | Description |
|----------|-----|-------|-------------|-------------|
| clearsMarket | `int:clearsMarket` | [`int:Market`](market.md#intmarket) | `owl:exactly 1` | Market slot that was cleared. |

### Enumeration Values

#### int:clearingStatus

| Value | Description |
|-------|-------------|
| `FINAL` | Bid fully accepted; all matched trades settled at clearing price. |
| `PARTIAL` | Bid partially accepted. |
| `REJECTED` | Bid rejected by the market engine. Reason in `noBidReason`. |
| `NO_BID` | Trading module did not submit a bid. Reason in `noBidReason`. |

#### int:noBidReason

| Value | Description |
|-------|-------------|
| `invalid_inputs` | Input data failed validation. |
| `stale_input` | Input data too old to use. |
| `hard_constraints` | Hard operational constraints prevented bid generation. |
| `policy_unavailable` | No applicable bidding policy available. |
| `deadline_missed` | Internal deadline passed before bid could be submitted. |
| `timeout` | Bid generation timed out. |
| `operator_disabled` | Automated trading disabled by community operator. |
| `market_reject` | Market engine rejected the submitted bid. |
