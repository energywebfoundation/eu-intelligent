# Standard Mappings — v1.0.0

This document cross-references every class in the INTELLIGENT ontology v1.0.0 to the international standards it is grounded in. For the full property-level detail, refer to each individual class definition file.

---

## Standards Key

| Prefix | Standard | Scope |
|--------|----------|-------|
| `cim:` | IEC 61970 / 61968 Common Information Model | Power network modelling, assets, markets, participants |
| `IEC 61850` | IEC 61850 | Substation automation logical nodes, measurement and control data objects |
| `DLMS-COSEM` | IEC 62056 | Smart meter register objects and energy data |
| `saref:` | SAREF (ETSI TS 103 264) | IoT device, property, measurement |
| `saref4ener:` | SAREF4ENER (ETSI TS 103 673) | Energy device types, tariff, price |
| `saref4grid:` | SAREF4GRID (ETSI TS 103 534) | Grid measurement, power quality |
| `s4bldg:` | SAREF4BLDG (ETSI TS 103 410-9) | Building occupancy, indoor temperature |
| `sosa:` | SOSA / SSN (W3C) | Observation, actuation, sensor, feature of interest |
| `qudt:` | QUDT | Quantities, units, dimensions |
| `foaf:` | FOAF | Agent, account |
| `vcard:` | vCard RFC 6350 | Address, contact |
| `W3C DID` | W3C DID Core 1.0 | Decentralised identifiers |
| `W3C VC` | W3C VC Data Model v2.0 | Verifiable credentials |
| `idsa:` | IDSA / GAIA-X | Data space participants, connectors |
| `int:` | INTELLIGENT project namespace | Project-specific classes with no direct standard equivalent |

---

## Spatial and Organisational Domain

| Class | Standard Mapping | Notes |
|-------|-----------------|-------|
| `int:EnergyCommUnit` | `cim:EnergyArea` | Top-level LEC container. |
| `int:Site` | `cim:ServiceLocation` | Single building. Confirmed May 2026 workshop. |
| `int:Facility` | `cim:EnergyConsumer` | Apartment or unit within a site. Optional level. |
| `int:Pilot` | `int:Pilot` | Project-specific. No CIM equivalent. |
| `int:SiteState` | `sosa:ObservationCollection` | Aggregate site-level state snapshot. |
| `int:FacilityState` | `sosa:ObservationCollection` | Facility occupancy and operating mode. |
| `int:FacilityMeasurement` | `sosa:ObservationCollection` | Facility boundary electrical measurements. |

---

## Metering Domain

| Class | Standard Mapping | Notes |
|-------|-----------------|-------|
| `int:MeteringPoint` | `cim:UsagePoint` | Replaces the former `Grid` class. Topological metering boundary. |
| `int:SmartMeter` | `cim:Meter`, `cim:EndDevice` | Physical meter device. Subclass of `int:Asset`. |
| `int:Feeder` | `cim:ACLineSegment` | LV distribution feeder. Grid topology, not spatial hierarchy. |
| `int:MeteringPointMeasurement` | `sosa:ObservationCollection` | Electrical measurements at a metering boundary. |
| `int:CommunityMeasurement` | `sosa:ObservationCollection` | Subclass of `MeteringPointMeasurement` at community (PCC) level. |
| `int:FeederMeasurement` | `sosa:ObservationCollection` | Subclass of `MeteringPointMeasurement` at feeder level. |

---

## Assets Domain

| Class | Standard Mapping | Notes |
|-------|-----------------|-------|
| `int:Asset` | `saref:Device`, `cim:Equipment`, `cim:PowerSystemResource` | Abstract base. No measurement fields. |
| `int:AssetState` | `sosa:ObservationCollection` | Operational condition snapshot. Replaces `AssetStatus` (removed). |
| `int:BatteryUnit` | `cim:BatteryUnit`, IEC 61850 `ZBAT` | Dynamic measurements via `sosa:Observation`. |
| `int:PhotovoltaicUnit` | `cim:PhotovoltaicUnit`, IEC 61850 `MMXU` | |
| `int:HeatPump` | `int:HeatPump` | Project-specific. No direct CIM equivalent. |
| `int:ElectricBoiler` | `int:ElectricBoiler` | Project-specific. No direct CIM equivalent. |
| `int:EVChargingStation` | `cim:PowerElectronicsUnit`, OCPP `ChargingStation` | |
| `int:HydroGeneratingUnit` | `cim:HydroGeneratingUnit`, IEC 62256 | |
| `int:EnergyConsumer` | `cim:EnergyConsumer`, `cim:ConformLoad` | Generic load. |

### Observable Property Named Individuals (selected)

| Individual | Standard Mapping | Unit |
|-----------|-----------------|------|
| `int:ActivePower` | IEC 61850 `MMXU.W` | W |
| `int:ReactivePower` | IEC 61850 `MMXU.VAr` | VAr |
| `int:Voltage` | IEC 61850 `MMXU.PhV` | V |
| `int:Current` | IEC 61850 `MMXU.A` | A |
| `int:Frequency` | IEC 61850 `MMXU.Hz` | Hz |
| `int:StateOfCharge` | IEC 61850 `ZBAT.SoC` | % |
| `int:StateOfHealth` | IEC 61850 `ZBAT.SoH` | % |
| `int:Temperature` | IEC 61850 `STMP.Tmp` | °C |
| `int:EnergyIn` | DLMS-COSEM `1.0.1.8.0.255` | Wh |
| `int:EnergyOut` | DLMS-COSEM `1.0.2.8.0.255` | Wh |
| `int:PhaseAVoltage` | IEC 61850 `MMXU.PhV.phsA` | V |
| `int:PhaseBVoltage` | IEC 61850 `MMXU.PhV.phsB` | V |
| `int:PhaseCVoltage` | IEC 61850 `MMXU.PhV.phsC` | V |

Full vocabulary: [`ontology/observation/properties.md`](../ontology/observation/properties.md)

---

## Observations and Actuation Domain

| Class | Standard Mapping | Notes |
|-------|-----------------|-------|
| `sosa:Observation` | `sosa:Observation`, `ssn:Observation` | Every measurement in the platform. |
| `sosa:ObservableProperty` | `sosa:ObservableProperty`, `ssn:Property` | Type of measurable quantity. Vocabulary of `owl:NamedIndividual` instances. |
| `int:QuantityValue` | `qudt:QuantityValue` | Numeric result with QUDT unit IRI. |
| `int:Command` | `sosa:Actuation`, IEC 61850 `GGIO` | Control signal to a controllable asset. |
| `sosa:ActuatableProperty` | `sosa:ActuatableProperty` | Type of controllable property. Named individual vocabulary. |

### Actuatable Property Named Individuals

| Individual | Standard Mapping | Unit |
|-----------|-----------------|------|
| `int:PowerSetpoint` | IEC 61850 `GGIO.AnOut` | W (kW) |
| `int:FractionalSetpoint` | IEC 61850 `GGIO.AnOut` | 0–1 |
| `int:OnOffState` | IEC 61850 `SPCSO.Oper` | boolean |
| `int:HeatSetpoint` | IEC 61850 `STMP.Tmp` | °C |
| `int:CoolSetpoint` | IEC 61850 `STMP.Tmp` | °C |
| `int:WaterHeaterSetpoint` | IEC 61850 `STMP.Tmp` | °C |

---

## Energy Markets Domain

| Class | Standard Mapping | Notes |
|-------|-----------------|-------|
| `int:Market` | `cim:Market`, `saref4ener:EnergyMarket` | One record per delivery slot. |
| `int:MarketTimeSeries` | `sosa:ObservationCollection` | Historical market slot sequence. Replaces discarded `HistoricalMarketData`. |
| `int:EnergyOrder` | `cim:BidTimeSeries` | Single class replacing former thin `Bid` / `Offer` wrappers. `orderType` discriminates. |
| `int:EnergyTrade` | `cim:MarketAgreement` | Matched and executed energy exchange. |
| `int:ClearingResult` | `cim:MarketAgreement` | Aggregate clearing outcome per market slot. |
| `int:Tariff` | `saref4ener:Tariff`, `cim:PricingStructure` | Community-scoped, time-bounded price structure. |

---

## Billing and Financial Domain

| Class | Standard Mapping | Notes |
|-------|-----------------|-------|
| `int:Billing` | `cim:CustomerAccount` | Aggregate billing record per actor per period. |
| `int:Invoice` | `cim:CustomerBillingInfo` | Individual payable document. `invoiceId` used as display identifier. |
| `int:Payment` | — | Financial transaction settling an invoice. |
| `int:StripePayment` | — | Stripe PSP integration record. Personal fields resolved via `Actor` reference. |

---

## Participants and Identity Domain

| Class | Standard Mapping | Notes |
|-------|-----------------|-------|
| `int:Actor` | `cim:Organisation`, `idsa:Participant`, `foaf:Agent` | Legal and domain identity. Replaces former `Member` class. |
| `int:Address` | `vcard:Address` | Structured postal address. Multiple per actor. |
| `int:ContactDetails` | `vcard:Kind` | Email, phone, mobile. Multiple per actor. |
| `int:DecentralizedIdentity` | W3C DID Core 1.0 | EWDS cryptographic identity anchor. |
| `int:IdentityCredential` | W3C VC Data Model v2.0 | KYC and Green Proof credential. |
| `int:UserAccount` | `foaf:OnlineAccount` | Platform access layer. `kycVerified` gates financial activity. |
| `int:UserPreferences` | `int:UserPreferences` | UI and FOS trading preferences. Project-specific. |
