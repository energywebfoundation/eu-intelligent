# Standard Mappings

This document cross-references every INTELLIGENT ontology class and its key attributes to international standards. The goal is to ensure semantic interoperability when data flows through the Energy Web Digital Spine (EWDS) and beyond, into regulatory or grid operator systems.

---

## Standards Key

| Abbreviation | Full Name | Relevant Scope |
|---|---|---|
| **IEC 61850** | Communication networks and systems for power utility automation | Substation automation, logical nodes, data objects for electrical equipment |
| **CIM (IEC 61970/61968)** | Common Information Model | Power network modelling, market participants, assets, measurements |
| **DLMS-COSEM (IEC 62056)** | Device Language Message Specification / Companion Specification for Energy Metering | Smart meter objects, energy registers, demand |
| **SAREF** | Smart Applications REFerence ontology (ETSI TS 103 264) | IoT device, property, measurement, task |
| **SAREF4ENER** | SAREF extension for energy | Energy device, consumption, tariff, price |
| **SAREF4GRID** | SAREF extension for smart grid | Grid measurement, power quality, feeder |
| **SEAS** | Smart Energy Aware Systems ontology | Energy consumption, generation, system, evaluation |
| **SSN** | Semantic Sensor Network ontology (W3C) | Sensor, observation, feature of interest |
| **SOSA** | Sensor, Observation, Sample, and Actuator (W3C) | Observation, actuator, result |
| **OGC Time** | OGC Time ontology (W3C) | Temporal entity, interval, instant |
| **DCAT** | Data Catalog Vocabulary (W3C) | Dataset, data service, distribution |
| **IDSA** | International Data Spaces Association reference architecture | Data asset, connector, usage policy |

---

## Core Domain

### Community

| Attribute | Type | Standard Mapping | Notes |
|---|---|---|---|
| `communityId` | UUID | CIM: `IdentifiedObject.mRID` | Unique identifier pattern from CIM |
| `communityName` | string | CIM: `IdentifiedObject.name` | |

**Class mapping:** Closest CIM equivalent is `EnergyConsumer` aggregate or a custom `LocalEnergyConsumer` subclass. SAREF4ENER `EnergySystem` is also applicable.

---

### Site

| Attribute | Type | Standard Mapping | Notes |
|---|---|---|---|
| `siteId` | UUID | CIM: `IdentifiedObject.mRID` | |
| `name` | string | CIM: `IdentifiedObject.name` | |

**Class mapping:** CIM `SubGeographicalRegion` or `ServiceLocation`. Open question: relationship to `Pilot` — see ADR-001.

---

### Pilot

| Attribute | Type | Standard Mapping | Notes |
|---|---|---|---|
| `pilotId` | UUID | CIM: `IdentifiedObject.mRID` | |
| `latitude` | number | W3C WGS84 / GeoSPARQL | Anonymised to single representative value per site |
| `longitude` | number | W3C WGS84 / GeoSPARQL | Anonymised to single representative value per site |

**Class mapping:** No direct CIM equivalent for a pilot site. Maps loosely to CIM `Bay` or `VoltageLevel` depending on granularity.

---

### Member

| Attribute | Type | Standard Mapping | Notes |
|---|---|---|---|
| `memberId` | UUID | CIM: `IdentifiedObject.mRID` | |
| `communityId` | UUID | CIM: `IdentifiedObject.mRID` | Foreign key to Community |
| `validFrom` | timestamp | OGC Time: `hasBeginning` | Membership validity interval |
| `validUntil` | timestamp | OGC Time: `hasEnd` | |
| `name` | string | CIM: `IdentifiedObject.name` | |
| `role` | string | CIM: `OrganisationRole` | e.g. prosumer, consumer, producer |
| `address_*` | string | BLOOO Address format | See Actor/Address for canonical model |
| `contact_*` | string | BLOOO ContactDetails format | See Actor/ContactDetails |

**Class mapping:** CIM `Customer`, `UsagePoint` owner. SAREF `User`. The address sub-fields duplicate the BLOOO `Address` class — see ADR-002.

---

### Actor

| Attribute | Type | Standard Mapping | Notes |
|---|---|---|---|
| `actorName` | string | CIM: `IdentifiedObject.name` | |
| `actorType` | string | CIM: `OrganisationRole.kind` | e.g. individual, organisation |
| `legalEntity` | string | IDSA: `legalName` | Legal name for KYC/billing purposes |
| `taxId` | string | - | Jurisdiction-specific VAT/tax identifier |
| `dateOfBirth` | date | - | GDPR-sensitive; required for KYC |
| `ownershipInformation` | TBD | - | Pending definition; BLOOO |

---

### Address

| Attribute | Type | Standard Mapping | Notes |
|---|---|---|---|
| `line1` | string | vCard: `street-address` | |
| `line2` | string | vCard: `extended-address` | |
| `city` | string | vCard: `locality` | |
| `postalCode` | string | vCard: `postal-code` | |
| `country` | string | ISO 3166-1 alpha-2 | |
| `state` | string | ISO 3166-2 | |

---

### ContactDetails

| Attribute | Type | Standard Mapping | Notes |
|---|---|---|---|
| `email` | string | vCard: `email` | |
| `phoneNumber` | string | E.164 / vCard: `tel` | |
| `mobileNumber` | string | E.164 / vCard: `tel;type=cell` | |

---

## Asset Domain

### Asset

| Attribute | Type | Standard Mapping | Notes |
|---|---|---|---|
| `assetId` | UUID | CIM: `IdentifiedObject.mRID` | |
| `memberId` | UUID | CIM: `IdentifiedObject.mRID` | Owner reference |
| `siteId` | UUID | CIM: `IdentifiedObject.mRID` | Location reference |
| `name` | string | CIM: `IdentifiedObject.name` | |
| `assetType` | string | CIM: `Equipment.type` / SAREF: `Device.type` | Enum: Battery, PvSystem, Grid, Load, EVCharger, HydroPowerPlant |
| `validFrom` | timestamp | OGC Time: `hasBeginning` | Asset registration validity |
| `validUntil` | timestamp | OGC Time: `hasEnd` | |
| `isControlled` | bool | SAREF: `isControlledByDevice` | Whether FOS/TUM can send control signals |
| `category` | string | CIM: `EquipmentContainer` | Grouping category |
| `assetParam` | TBD | - | TUM-specific extended parameters; TBD |

**Class mapping:** CIM `Equipment`, SAREF `Device`, SEAS `System`.

---

### AssetState

`int:AssetState` captures the current operational condition of an asset. It replaces the former `AssetStatus` class. Per-asset-type state fields are defined in the individual asset class files. Maps to `sosa:ObservationCollection` as a collection of state values at a point in time.

| Attribute | Type | Standard Mapping | Notes |
|---|---|---|---|
| `assetStatusId` | UUID | CIM: `IdentifiedObject.mRID` | |
| `assetId` | UUID | CIM: `IdentifiedObject.mRID` | |
| `code` | string | IEC 61850: `Health` data object | Operational health code |
| `message` | string | IEC 61850: `Beh` (Behaviour) | Human-readable status message |
| `isHealthy` | bool | IEC 61850: `Health.stVal` | Derived boolean from health code |

**Class mapping:** IEC 61850 `LLN0.Health`, CIM `OperationalLimitSet`.

---

### AssetState

`int:AssetState` captures only a `timestamp` and the `isAssetStateOf` object property at the base class level. All state fields are defined per asset type in the individual asset class files. The former TUM flat fields (`soeBESkwh`, `socBES`, `avgPvPower`, `tDwhC`, etc.) have been removed. Refer to the per-asset-type state sections in `battery.md`, `ev-charging.md`, and `thermal.md` for the current state field definitions and their standard mappings.

---

### Battery

| Attribute | Type | Standard Mapping | Notes |
|---|---|---|---|
| `batteryId` | UUID | CIM: `IdentifiedObject.mRID` | |
| `chargePower` | number (kW) | IEC 61850: `ZBAT.ChaPwr` | Instantaneous charge power |
| `dischargePower` | number (kW) | IEC 61850: `ZBAT.DisPwr` | Instantaneous discharge power |
| `chargeEnergy` | number (kWh) | IEC 61850: `ZBAT.ChaWh` | Cumulative energy charged |
| `dischargeEnergy` | number (kWh) | IEC 61850: `ZBAT.DisWh` | Cumulative energy discharged |
| `stateOfCharge` | number (%) | IEC 61850: `ZBAT.SoC` | 0-100% |
| `stateOfHealth` | number (%) | IEC 61850: `ZBAT.SoH` | 0-100% |
| `temperature` | number (°C) | IEC 61850: `STMP.Tmp` | Cell/pack temperature |
| `voltage` | number (V) | IEC 61850: `MMXU.PhV` | Terminal voltage |
| `current` | number (A) | IEC 61850: `MMXU.A` | Terminal current |
| `cycleCount` | number | IEC 61850: `ZBAT.NumCyc` | Full equivalent cycles |

**Class mapping:** IEC 61850 `ZBAT` (Battery logical node), CIM `BatteryUnit`, SAREF4ENER `Battery`.

---

### PvSystem

| Attribute | Type | Standard Mapping | Notes |
|---|---|---|---|
| `pvSystemId` | UUID | CIM: `IdentifiedObject.mRID` | |
| `power` | number (kW) | IEC 61850: `MMXU.W` | Active power output |
| `current` | number (A) | IEC 61850: `MMXU.A` | DC or AC current |
| `voltage` | number (V) | IEC 61850: `MMXU.PhV` | DC or AC voltage |
| `energyYield` | number (kWh) | DLMS-COSEM: `Electricity_ID 1.0.1.8.0.255` | Total energy yield (cumulative) |
| `energyYieldYesterday` | number (kWh) | DLMS-COSEM: daily register | Yesterday's energy yield |
| `mppEnergy` | number (kWh) | - | Maximum power point tracking energy |

**Class mapping:** IEC 61850 `MMXU` (measurement unit), CIM `PhotovoltaicUnit`, SAREF4ENER `SolarPanel`.

---

### Grid

| Attribute | Type | Standard Mapping | Notes |
|---|---|---|---|
| `gridId` | UUID | CIM: `IdentifiedObject.mRID` | |
| `power` | number (kW) | IEC 61850: `MMXU.W` | Net active power at grid connection point |
| `powerIn` | number (kW) | DLMS-COSEM: import active power | Power imported from grid |
| `powerOut` | number (kW) | DLMS-COSEM: export active power | Power exported to grid |
| `reactivePower` | number (kVAR) | IEC 61850: `MMXU.VAr` | Reactive power |
| `current` | number (A) | IEC 61850: `MMXU.A` | |
| `voltage` | number (V) | IEC 61850: `MMXU.PhV` | Phase voltage |
| `frequency` | number (Hz) | IEC 61850: `MMXU.Hz` | Grid frequency |
| `importEnergy` | number (kWh) | DLMS-COSEM: `1.0.1.8.0.255` | Cumulative import energy |
| `exportEnergy` | number (kWh) | DLMS-COSEM: `1.0.2.8.0.255` | Cumulative export energy |

**Class mapping:** IEC 61850 `MMXU` logical node, CIM `EnergyConsumer` / `Terminal`, SAREF4GRID `GridMeasurement`.

---

### Load

| Attribute | Type | Standard Mapping | Notes |
|---|---|---|---|
| `loadId` | UUID | CIM: `IdentifiedObject.mRID` | |
| `power` | number (kW) | IEC 61850: `MMXU.W` | Active power demand |
| `current` | number (A) | IEC 61850: `MMXU.A` | |
| `voltage` | number (V) | IEC 61850: `MMXU.PhV` | |
| `frequency` | number (Hz) | IEC 61850: `MMXU.Hz` | |

**Class mapping:** CIM `EnergyConsumer`, SAREF4ENER `ElectricalLoad`, IEC 61850 `MMXU`.

---

### GridBuilding

| Attribute | Type | Standard Mapping | Notes |
|---|---|---|---|
| `gridBuildingId` | UUID | CIM: `IdentifiedObject.mRID` | |
| `powerIn` | number (kW) | DLMS-COSEM: import register | Imported active power for building |
| `powerOut` | number (kW) | DLMS-COSEM: export register | Exported active power from building |

**Class mapping:** CIM `ServiceLocation`, `EnergyConsumer`. Building-level grid connection point.

---

### HydroPowerPlant

| Attribute | Type | Standard Mapping | Notes |
|---|---|---|---|
| `hydroPowerPlantId` | UUID | CIM: `IdentifiedObject.mRID` | |
| `power` | number (kW) | IEC 61850: `MMXU.W` | Active power output |

**Class mapping:** CIM `HydroGeneratingUnit`, IEC 61850 `MMXU`.

---

### EVChargingStation

| Attribute | Type | Standard Mapping | Notes |
|---|---|---|---|
| `evChargingStationId` | UUID | CIM: `IdentifiedObject.mRID` | |
| `power` | number (kW) | IEC 61850: `MMXU.W` | Active charging power |

**Class mapping:** CIM `PowerElectronicsUnit`, OCPP `ChargingStation`. EWDS also supports OCN 2.0 (Open Charge Network) for EV integration per T3.1.

---

## Market Domain

### Market

| Attribute | Type | Standard Mapping | Notes |
|---|---|---|---|
| `marketId` | UUID | CIM: `IdentifiedObject.mRID` | |
| `communityId` | UUID | CIM: `IdentifiedObject.mRID` | Community scope |
| `openingTime` | timestamp | OGC Time: `hasBeginning` | |
| `closingTime` | timestamp | OGC Time: `hasEnd` | |
| `deliveryStartTime` | timestamp | OGC Time: `hasBeginning` | Delivery interval start |
| `deliveryEndTime` | timestamp | OGC Time: `hasEnd` | Delivery interval end |
| `marketType` | string | CIM: `MarketType` | e.g. spot, flexibility, day-ahead |

**Class mapping:** CIM `Market`, `MarketDocument` (ENTSO-E MADES). SAREF4ENER `EnergyMarket`.

---

### Order

| Attribute | Type | Standard Mapping | Notes |
|---|---|---|---|
| `orderId` | string | CIM: `IdentifiedObject.mRID` | |
| `orderType` | string | CIM: `Side` | BID or OFFER |
| `orderStatus` | string | CIM: `BidTimeSeries.status` | e.g. open, matched, cancelled |
| `createdBy` | UUID | CIM: `IdentifiedObject.mRID` | Member reference |
| `areaUuid` | UUID | CIM: `IdentifiedObject.mRID` | Area reference |
| `marketId` | UUID | CIM: `IdentifiedObject.mRID` | |
| `timeSlot` | timestamp | OGC Time: `Instant` | Target delivery slot |
| `creationTime` | timestamp | OGC Time: `Instant` | Order creation time |
| `quantity` | number (kWh) | CIM: `EnergyBidTimeSeries.energyQuantity` | |
| `priceLimit` | number (EUR/kWh) | CIM: `Price.amount` | Maximum (bid) or minimum (offer) price |
| `energySourcePreference` | string | SAREF4ENER: `EnergySource` | e.g. solar, wind, hydro |
| `energyType` | string | CIM: `MarketEnergyProduct` | e.g. active, reactive |

**Class mapping:** CIM `BidTimeSeries`, `RegisteredResource`. SAREF4ENER `BuyingOffer` / `SellingOffer`.

---

### Bid / Offer

Both are specialisations of `Order` carrying only a UUID identifier. They exist to support the explicit pairing in `Trade`.

**Class mapping:** CIM `Bid`, `Offer` within `BidTimeSeries`. See ADR-005 for rationalisation.

---

### Trade

| Attribute | Type | Standard Mapping | Notes |
|---|---|---|---|
| `tradeId` | UUID | CIM: `IdentifiedObject.mRID` | R2M uses `id`; GSY/UoC/TUM/BLOOO use `tradeId` |
| `bidId` | UUID | CIM: `IdentifiedObject.mRID` | |
| `buyerId` | UUID | CIM: `IdentifiedObject.mRID` | R2M: `buyerId`; GSY/BLOOO: `buyer` |
| `offerId` | UUID | CIM: `IdentifiedObject.mRID` | |
| `sellerId` | UUID | CIM: `IdentifiedObject.mRID` | R2M: `sellerId`; GSY/BLOOO: `seller` |
| `marketId` | UUID | CIM: `IdentifiedObject.mRID` | |
| `residualBidId` | UUID | CIM: `IdentifiedObject.mRID` | Unmatched portion of bid |
| `residualOfferId` | UUID | CIM: `IdentifiedObject.mRID` | Unmatched portion of offer |
| `tradeStatus` | string | CIM: `MarketAgreement.status` | R2M: `status`; GSY/TUM: `tradeStatus` |
| `tradeQuantity` | number (kWh) | CIM: `EnergyBidTimeSeries.energyQuantity` | R2M: `quantity` |
| `tradePrice` | number (EUR/kWh) | CIM: `Price.amount` | R2M: `price` |
| `tradeTimestamp` | timestamp | OGC Time: `Instant` | R2M: `timestamp` |

**Class mapping:** CIM `MarketAgreement`, `TransmissionReservation`. SAREF4ENER transaction record.

---

### ClearingResult

| Attribute | Type | Standard Mapping | Notes |
|---|---|---|---|
| `marketId` | UUID | CIM: `IdentifiedObject.mRID` | |
| `clearingStatus` | string | CIM: `MarketDocument.status` | |
| `clearingPrice` | number (EUR/kWh) | CIM: `Price.amount` | Market clearing price |
| `totalSupply` | number (kWh) | CIM: `EnergyBidTimeSeries` | Total matched supply |
| `totalDemand` | number (kWh) | CIM: `EnergyBidTimeSeries` | Total matched demand |
| `tradeQuantity` | number (kWh) | CIM: `EnergyBidTimeSeries.energyQuantity` | Total traded volume |
| `numTrades` | number | - | Count of matched trades |
| `txHash` | string | - | Blockchain transaction hash (GSY DEX on-chain record) |
| `clearingTime` | timestamp | OGC Time: `Instant` | |

---

### Tariff

| Attribute | Type | Standard Mapping | Notes |
|---|---|---|---|
| `tariffId` | UUID | CIM: `IdentifiedObject.mRID` | |
| `buyerId` | UUID | CIM: `IdentifiedObject.mRID` | |
| `sellerId` | UUID | CIM: `IdentifiedObject.mRID` | |
| `tariffName` | string | SAREF4ENER: `Tariff.name` | |
| `energyPrice` | number (EUR/kWh) | SAREF4ENER: `Price.value` | Energy component |
| `gridFee` | number (EUR/kWh) | CIM: `TransmissionReliabilityMargin` | Grid use-of-system fee |
| `taxes` | number (EUR/kWh) | - | VAT and levies |
| `currency` | string | ISO 4217 | e.g. EUR |
| `tradeId` | UUID | CIM: `IdentifiedObject.mRID` | Associated trade |
| `tradeQuantity` | number (kWh) | - | Quantity this tariff applies to |
| `tradePrice` | number (EUR/kWh) | - | Final price inclusive of tariff |
| `tradeTimestamp` | timestamp | OGC Time: `Instant` | |

---

## Billing Domain

### Billing

| Attribute | Type | Standard Mapping | Notes |
|---|---|---|---|
| `billingId` | UUID | CIM: `IdentifiedObject.mRID` | |
| `memberId` | UUID | CIM: `IdentifiedObject.mRID` | |
| `siteId` | UUID | CIM: `IdentifiedObject.mRID` | |
| `invoiceNumber` | string | - | Human-readable invoice reference |
| `status` | string | - | e.g. draft, issued, paid, overdue |
| `invoiceTotal` | number (EUR) | - | Total amount due |
| `outstandingAmount` | number (EUR) | - | Remaining unpaid amount |
| `billingPeriodFrom` | timestamp | OGC Time: `hasBeginning` | |
| `billingPeriodUntil` | timestamp | OGC Time: `hasEnd` | |
| `issueDate` | timestamp | OGC Time: `Instant` | |
| `overdueDate` | timestamp | OGC Time: `Instant` | |
| `issuingParty` | TBD | CIM: `Organisation` | Issuing organisation; TBD |
| `numberOfTrades` | number | - | BLOOO extension |
| `calculationTimestamp` | timestamp | OGC Time: `Instant` | BLOOO extension; when calculation was run |

---

### Payment

| Attribute | Type | Standard Mapping | Notes |
|---|---|---|---|
| `paymentId` | UUID | CIM: `IdentifiedObject.mRID` | |
| `invoiceId` | UUID | CIM: `IdentifiedObject.mRID` | Open question: same as `Billing.billingId`? See ADR-006 |
| `date` | timestamp | OGC Time: `Instant` | |
| `amount` | number (EUR) | - | Amount paid |
| `residual` | number (EUR) | - | Remaining balance after payment |
| `paymentMethod` | string | - | e.g. bank_transfer, stripe, direct_debit |
| `provider` | string | - | Payment service provider name |

---

### Invoice (BLOOO)

| Attribute | Type | Standard Mapping | Notes |
|---|---|---|---|
| `invoiceId` | string | CIM: `IdentifiedObject.mRID` | |
| `invoiceStatus` | string | - | e.g. draft, issued, paid |
| `invoiceIssueDate` | timestamp | OGC Time: `Instant` | |
| `invoiceDueDate` | timestamp | OGC Time: `Instant` | |
| `billingPeriod` | string | OGC Time: `Interval` | Human-readable period description |
| `actorId` | UUID | CIM: `IdentifiedObject.mRID` | Reference to Actor |
| `energyAmountEur` | number (EUR) | SAREF4ENER: energy cost | Energy component of invoice |
| `gridFeeAmountEur` | number (EUR) | - | Grid use-of-system fee component |
| `taxAmountEur` | number (EUR) | - | Tax component |
| `totalAmountEur` | number (EUR) | - | Total amount due |
| `numberOfTrades` | number | - | Trades included in this billing period |
| `calculationTimestamp` | timestamp | OGC Time: `Instant` | |

---

### Stripe (BLOOO)

The `Stripe` class models the payment provider integration record. It captures Stripe-specific identifiers and status fields alongside KYC-relevant actor data.

| Attribute | Type | Standard Mapping | Notes |
|---|---|---|---|
| `stripeInvoiceId` | string | - | Stripe platform invoice ID; open question re: overlap with `Invoice.invoiceId`. See ADR-007 |
| `stripeInvoiceStatus` | string | - | Stripe lifecycle status |
| `stripeInvoiceAmountDue` | number | - | Amount due per Stripe |
| `stripeInvoiceCurrency` | string | ISO 4217 | |
| `stripePaymentIntentId` | string | - | Stripe PaymentIntent reference |
| `paymentStatus` | string | - | e.g. succeeded, pending, failed |
| `paymentMethodTypes` | string | - | e.g. card, sepa_debit |
| `taxId` | string | - | GDPR-sensitive; KYC field |
| `ownershipInformation` | TBD | IDSA: `legalOwner` | Pending definition |

---

## Optimisation Domain

### PilotState (TUM)

| Attribute | Type | Standard Mapping | Notes |
|---|---|---|---|
| `pilotId` | UUID | CIM: `IdentifiedObject.mRID` | |
| `ts` | timestamp | OGC Time: `Instant` | Observation timestamp |
| `tIndoorC` | number (°C) | IEC 61850: `STMP.Tmp` | Indoor temperature |
| `avgLoad` | number (kW) | IEC 61850: `MMXU.W` | Average electrical load |
| `avgGrid` | number (kW) | IEC 61850: `MMXU.W` | Average grid exchange power |
| `occupancy` | bool | SAREF4BLDG: `occupancy` | Building occupancy flag |

---

### ControlAssetCommand (TUM)

| Attribute | Type | Standard Mapping | Notes |
|---|---|---|---|
| `assetId` | UUID | CIM: `IdentifiedObject.mRID` | |
| `assetType` | string | CIM: `Equipment.type` | |
| `controlMode` | string | IEC 61850: `Beh.stVal` | e.g. auto, manual, off |
| `powerSetpointKw` | number (kW) | IEC 61850: `GGIO.AnOut` | Active power setpoint |
| `fracSetpoint` | number (0-1) | IEC 61850: `GGIO.AnOut` | Fractional setpoint (e.g. 0.5 = 50% capacity) |
| `on` | bool | IEC 61850: `SPCSO.Oper` | On/off control |
| `tempHeatSetpointC` | number (°C) | IEC 61850: `STMP.Tmp` | Heating setpoint |
| `tempCoolSetpointC` | number (°C) | IEC 61850: `STMP.Tmp` | Cooling setpoint |
| `tempWaterHeaterSetpointC` | number (°C) | IEC 61850: `STMP.Tmp` | DHW setpoint |
| `timeStep` | timestamp | OGC Time: `Instant` | Command valid from timestamp |

**Class mapping:** IEC 61850 `GGIO` (Generic Process I/O), SAREF `Actuator`, SEAS `Actuator`.

---

### GridParameter / GridTopology / FeederPara / TransfPara (GSY, UoC)

These classes are pending full specification from GSY and UoC. Attribute definitions are TBD.

| Class | Likely CIM Mapping | IEC 61850 Mapping |
|---|---|---|
| `GridParameter` | CIM `BaseVoltage`, `OperationalLimitSet` | IEC 61850 `ZLIN`, `ZTCN` |
| `GridTopology` | CIM `Topology`, `ConnectivityNode` | IEC 61850 `LPHD`, `LLNO` |
| `FeederPara` | CIM `ACLineSegment` impedance attributes | IEC 61850 `ZLIN` |
| `TransfPara` | CIM `PowerTransformer`, `TransformerEnd` | IEC 61850 `ZTCN`, `YLTC` |

See ADR-010.

---

## Measurement Domain

### Production / Consumption

| Attribute | Type | Standard Mapping | Notes |
|---|---|---|---|
| `productionId` / `consumptionId` | UUID | CIM: `IdentifiedObject.mRID` | |
| `assetId` | UUID | CIM: `IdentifiedObject.mRID` | |
| `aggregationPeriod` | string | OGC Time: `Interval` | e.g. PT15M, PT1H, P1D |
| `aggregationType` | string | SOSA: `ObservationCollection` | e.g. sum, average, max |
| `value` | number | SOSA: `hasSimpleResult` | Numerical measurement value |
| `unit` | string | QUDT / IEC 61850 unit | e.g. kWh, kW, Wh |
| `timestamp` | timestamp | OGC Time: `Instant` | End of aggregation period |

**Class mapping:** SOSA `Observation`, SSN `MeasurementCapability`, DLMS-COSEM `Register` (class_id 3) for energy registers, SAREF `Measurement`.

---

### AssetMeasurement

| Attribute | Type | Standard Mapping | Notes |
|---|---|---|---|
| `value` | number | SOSA: `hasSimpleResult` | Measurement value (unit implicit from asset context) |
| `areaId` | UUID | CIM: `IdentifiedObject.mRID` | Spatial scope of observation |
| `communityId` | UUID | CIM: `IdentifiedObject.mRID` | |
| `timestamp` | timestamp | OGC Time: `Instant` | |

**Class mapping:** SOSA `Observation`, SAREF `Measurement`. The `areaId` FK links to GSY DEX's `Area` concept, providing geo-hierarchical scoping consistent with CIM `SubGeographicalRegion`.
