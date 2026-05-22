# Glossary — v1.0.0

Definitions of terms used across the INTELLIGENT ontology. Partner-specific naming variants are noted where relevant.

---

| Term | Definition | Standard Reference | Notes |
|------|-----------|-------------------|-------|
| **Actor** | The legal and domain identity of a person or organisation participating in the INTELLIGENT platform. Central identity record to which `Address`, `ContactDetails`, `DecentralizedIdentity`, and `UserAccount` all refer. Replaces the former `Member` class. | `cim:Organisation`, `idsa:Participant` | BLOOO, R2M |
| **ActuatableProperty** | A quality of an asset that can be controlled by issuing a `Command`. Represented as `owl:NamedIndividual` instances (e.g. `PowerSetpoint`, `HeatSetpoint`, `OnOffState`). | `sosa:ActuatableProperty` | TUM |
| **Address** | A structured postal address associated with an `Actor`. One actor may have multiple address records (billing, residential, business). | `vcard:Address` | BLOOO |
| **Asset** | The abstract base class for all energy devices. Carries identity, type, lifecycle, and controllability. Carries no measurement fields. Measurements are `Observation` instances with the asset as `featureOfInterest`. | `saref:Device`, `cim:Equipment` | R2M, TUM |
| **AssetState** | A time-stamped snapshot of the current operational condition of an asset (e.g. battery operating state, state of charge, EV connected flag). Specific fields depend on the asset subtype. Replaces the former `AssetStatus` class (removed). | `sosa:ObservationCollection` | TUM, R2M |
| **BatteryUnit** | A battery energy storage system (BESS). Subclass of `Asset`. Static parameters (rated energy, max charge power) are datatype properties; dynamic measurements are `Observation` instances. | `cim:BatteryUnit`, IEC 61850 `ZBAT` | UG, HSLU |
| **Billing** | The aggregate billing record for an `Actor` over a defined billing period. Groups all `Invoice` instances issued in that period. Distinct from `Invoice`, which is the individual payable document. | `cim:CustomerAccount` | R2M, BLOOO |
| **ClearingResult** | The outcome of a market clearing run for a given `Market` slot. Records clearing price, volumes, number of trades, and the Energy Web Chain transaction hash. | `cim:MarketAgreement` | GSY, UoC, TUM |
| **Command** | A control signal issued to a controllable asset. Mirrors the `Observation` pattern: `commandType` points to an `ActuatableProperty` named individual; `commandValue` carries the setpoint. Replaces the former flat `ControlAssetCommand` class. | `sosa:Actuation`, IEC 61850 `GGIO` | TUM |
| **CommunityMeasurement** | A specialisation of `MeteringPointMeasurement` scoped to a community-level metering point (PCC). Inherits all measurement properties and adds a direct reference to the `EnergyCommUnit`. | `sosa:ObservationCollection` | AEM |
| **ContactDetails** | A contact information record (email, phone, mobile) associated with an `Actor`. One actor may have multiple contact records of different types. | `vcard:Kind` | BLOOO |
| **DecentralizedIdentity** | A W3C DID (Decentralised Identifier) record for an `Actor`. Cryptographic identity anchor used within the EWDS ecosystem. | W3C DID Core 1.0 | EWAG |
| **EnergyCommUnit** | A Local Energy Community (LEC) — the top-level organisational and contractual grouping of participants, sites, assets, and markets. | `cim:EnergyArea` | R2M |
| **EnergyConsumer** | A generic measured electrical load that does not fall into a more specific asset subtype. Subclass of `Asset`. | `cim:EnergyConsumer` | UG |
| **EnergyOrder** | A buy or sell intent submitted by an `Actor` to a `Market`. The `orderType` property (`Bid` or `Offer`) replaces the former thin `Bid` and `Offer` wrapper classes. | `cim:BidTimeSeries` | GSY, UoC, TUM |
| **EnergyTrade** | A matched and executed energy exchange between a buyer and seller in the GSY DEX. The central settlement record from which billing is derived. | `cim:MarketAgreement` | R2M, GSY, UoC, TUM, BLOOO |
| **EVChargingStation** | An electric vehicle charging station. Subclass of `Asset`. Supports G2V and optionally V2G. | `cim:PowerElectronicsUnit`, OCPP | HSLU |
| **EWDS** | Energy Web Digital Spine. The interoperability backbone deployed by EWAG for the INTELLIGENT platform. | IDSA, GAIA-X | EWAG |
| **Facility** | A single apartment, unit, or group of units within a `Site`. The lowest level of the spatial hierarchy and the entity that owns or operates assets and participates in the market. Optional: absent when a site has no sub-unit structure. | `cim:EnergyConsumer` | R2M, HSLU |
| **FacilityMeasurement** | A time-stamped collection of electrical and environmental measurements at a facility boundary. | `sosa:ObservationCollection` | HSLU, UG |
| **FacilityState** | A time-stamped snapshot of the operational state of a facility (occupancy, operating mode). Distinct from `FacilityMeasurement`. | `sosa:ObservationCollection` | TUM, R2M |
| **Feeder** | A segment of the LV distribution network connecting a transformer to one or more sites. Grid topology class, not part of the spatial containment hierarchy. `featureOfInterest` for AEM SGIM observations. | `cim:ACLineSegment` | AEM, ERE |
| **FeederMeasurement** | A specialisation of `MeteringPointMeasurement` scoped to a feeder-level metering point. Used by AEM's SGIM at LIC. | `sosa:ObservationCollection` | AEM |
| **FOS** | Flexibility and Optimisation Service. The AI/ML-based energy management system developed by TUM that generates forecasts and `Command` signals. | — | TUM |
| **HeatPump** | A heat pump asset. Subclass of `Asset`. Used for space heating, cooling, and DHW. | `int:HeatPump` | TUM, UG |
| **HydroGeneratingUnit** | A hydroelectric generation unit. Subclass of `Asset`. Present at the CELL pilot (HSLU). | `cim:HydroGeneratingUnit` | HSLU |
| **IdentityCredential** | A W3C Verifiable Credential (VC) issued to a `DecentralizedIdentity`. Used for KYC verification and Green Proof issuance within EWDS. | W3C VC Data Model v2.0 | EWAG |
| **Invoice** | A formal payable document derived from a parent `Billing` record. `invoiceId` is used as the display identifier (no separate `invoiceNumber` field per May 2026 workshop). | `cim:CustomerBillingInfo` | BLOOO, R2M |
| **LEC** | Local Energy Community. See `EnergyCommUnit`. | — | All |
| **Market** | A time-bounded trading venue associated with an `EnergyCommUnit`. One `Market` record represents one delivery slot. | `cim:Market` | GSY, UoC, TUM |
| **MarketTimeSeries** | A header record aggregating a sequence of `Market` slot records over a historical period. Replaces the discarded `HistoricalMarketData` class. | `sosa:ObservationCollection` | TUM |
| **MeteringPoint** | The location where a meter is installed and the boundary at which energy flows are measured. `locatedAt` one topological level: Community, Feeder, Site, Facility, or Asset. Replaces the former `Grid` class. | `cim:UsagePoint` | AEM, HSLU, UG, ERE |
| **MeteringPointMeasurement** | A time-stamped collection of electrical measurements at a `MeteringPoint`. | `sosa:ObservationCollection` | All pilots |
| **ObservableProperty** | A quality of a feature of interest that can be observed and measured. Represented as `owl:NamedIndividual` instances (e.g. `ActivePower`, `Voltage`, `StateOfCharge`, `Temperature`). Not a class; not a field on a device class. | `sosa:ObservableProperty` | All |
| **Observation** | A single act of observing a property of a feature of interest. Every measurement in the platform is an `Observation` instance. | `sosa:Observation` | All |
| **Payment** | A financial transaction that settles an `Invoice`. Stripe-specific fields are in `StripePayment`. | — | R2M, BLOOO |
| **PhotovoltaicUnit** | A photovoltaic solar generation system. Subclass of `Asset`. | `cim:PhotovoltaicUnit`, IEC 61850 `MMXU` | UG, HSLU |
| **Pilot** | An INTELLIGENT project-level grouping of one or more `Site` instances representing one of the four demonstration sites. Scopes FOS optimisation and project reporting. Not part of the spatial containment hierarchy. | `int:Pilot` | TUM |
| **QuantityValue** | The result of an `Observation`, carrying a numeric value and its physical unit (as a QUDT unit IRI). | `qudt:QuantityValue` | All |
| **Site** | A single physical building within an `EnergyCommUnit`. The May 2026 workshop confirmed this as the canonical building-level concept. | `cim:ServiceLocation` | R2M |
| **SiteState** | A time-stamped snapshot of aggregate measured conditions across a site (temperature, power, humidity). Used by FOS for site-level optimisation. | `sosa:ObservationCollection` | TUM |
| **SmartMeter** | A physical metering device installed at a `MeteringPoint`. Subclass of `Asset`. Its observations have `featureOfInterest` pointing to the topological entity the metering point describes, not to the meter itself. | `cim:Meter`, `cim:EndDevice` | AEM, HSLU, UG |
| **StripePayment** | The Stripe payment provider integration record for a transaction. Personal identity fields are resolved via `hasCustomer` reference to `Actor`. | — | BLOOO |
| **Tariff** | A set of price and charge values governing energy exchange within an `EnergyCommUnit` at a defined point in time. Community-scoped and time-bounded. Components: `energyPrice`, `networkTariff`, `levies`, `taxes`. | `saref4ener:Tariff`, `cim:PricingStructure` | BLOOO, AEM, ERE |
| **UserAccount** | The platform access layer for an `Actor`. `kycVerified` gates financial transactions. Created during D3.2 onboarding. | `foaf:OnlineAccount` | R2M, EWAG |
| **UserPreferences** | User-configurable preferences for UI display and FOS trading behaviour. One record per `UserAccount`. | `int:UserPreferences` | R2M, TUM |
| **UUID** | Universally Unique Identifier (RFC 4122 v4). Primary key type for all ontology entities. | RFC 4122 | All |
