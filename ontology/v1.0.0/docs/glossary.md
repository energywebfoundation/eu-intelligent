# Glossary

This glossary defines terms used across the INTELLIGENT ontology, reconciling terminology differences between partners and aligning with international standards where applicable.

---

| Term | Definition | Standard Reference | Used By |
|------|-----------|-------------------|---------|
| **Actor** | A legal or natural person participating in the INTELLIGENT platform, identified for KYC and billing purposes. Encompasses both Members (community participants) and operational entities (community managers, grid operators). | CIM `OrganisationRole`, IDSA `Participant` | BLOOO |
| **Area** | A geographic or logical zone within a community used by the GSY DEX to scope orders and measurements. May correspond to a feeder, building, or community segment. | CIM `SubGeographicalRegion` | GSY, UoC |
| **Asset** | Any energy device or system registered under a Member within a Site. The canonical registry entry covering identity, ownership, and lifecycle. Specialised measurement schemas are defined in device-specific classes (Battery, PvSystem, etc.). | CIM `Equipment`, SAREF `Device` | R2M, TUM |
| **AssetMeasurement** | A single observed value from an asset or area at a given timestamp, used for real-time monitoring and market operation. | SOSA `Observation` | GSY, UoC |
| **AssetState** | A time-stamped snapshot of the current operational condition of an asset. Captures state values such as battery operating state, state of charge, EV connected status, and DHW enabled flag. Specific fields depend on the asset subtype. Replaces the former `AssetStatus` class. | `sosa:ObservationCollection` | TUM, R2M |
| **Battery (BESS)** | A Battery Energy Storage System. Modelled as a specialisation of `Asset` carrying storage-specific measurements. | IEC 61850 `ZBAT`, CIM `BatteryUnit` | UG, HSLU |
| **Bid** | A buy-side order in the GSY DEX market. A thin identity wrapper around an `Order` of type BID. | CIM `BidTimeSeries` | R2M |
| **Billing** | The aggregate billing record for a Member over a billing period, from which one or more Invoices may be issued. | CIM `Customer`, SAREF4ENER billing model | R2M, BLOOO |
| **ClearingResult** | The outcome of a market clearing run: price, matched volumes, and blockchain transaction hash. | CIM `MarketAgreement` | GSY, UoC, TUM |
| **Community (LEC)** | A Local Energy Community: a group of Members sharing energy infrastructure and participating in local P2P markets. The top-level organisational entity in the ontology. | CIM `EnergyConsumer` aggregate, SAREF4ENER `EnergySystem` | R2M |
| **ConsumingMember** | A Member whose primary role is energy consumption (no generation). A sub-role of Member. | CIM `Customer` | R2M |
| **Consumption** | An aggregated record of energy consumed by an Asset over a defined period. | SOSA `Observation`, DLMS-COSEM register | R2M |
| **ControlAssetCommand** | A command issued by the FOS optimisation module to a controllable asset, specifying setpoints for power, temperature, or on/off state. | IEC 61850 `GGIO`, SAREF `Actuator` | TUM |
| **DEX** | Decentralised Energy Exchange; the GSY P2P trading platform that is the core market engine of INTELLIGENT. | - | GSY |
| **DLMS-COSEM** | Device Language Message Specification / Companion Specification for Energy Metering (IEC 62056). Defines smart meter data objects and communication protocols. | IEC 62056 | - |
| **DSO** | Distribution System Operator. The grid operator responsible for managing the local distribution network in which INTELLIGENT pilots operate. | CIM `Operator` | - |
| **EVChargingStation** | An electric vehicle charging point. Modelled as a specialisation of `Asset`. EWDS also supports OCN 2.0 for EV network integration. | CIM `PowerElectronicsUnit`, OCPP | HSLU |
| **EWDS** | Energy Web Digital Spine. The data integration and interoperability middleware deployed by EWAG as the backbone of the INTELLIGENT platform. | IDSA, GAIA-X | EWAG |
| **FOS** | Flexibility and Optimisation Service. The AI/ML-based energy management system developed by TUM that generates forecasts, optimisation schedules, and control signals. | - | TUM |
| **Grid** | The grid connection point of a site, measuring import and export flows. | IEC 61850 `MMXU`, CIM `Terminal` | UG, HSLU |
| **Green Proof (GP)** | A Verifiable Credential issued by EWAG attesting to the renewable origin of energy produced or traded. | W3C Verifiable Credentials, EWAG | EWAG |
| **GridBuilding** | An HSLU-specific concept representing a building-level grid connection aggregating multiple assets. | CIM `ServiceLocation` | HSLU |
| **GridParameter** | A container for grid electrical parameters (feeder impedances, transformer ratings, topology). Pending full specification. | CIM `OperationalLimitSet` | GSY, UoC |
| **HydroPowerPlant** | A hydro generation asset at a pilot site (present at the HSLU Lucerne pilot). | CIM `HydroGeneratingUnit`, IEC 61850 `MMXU` | HSLU |
| **IEC 61850** | International standard for communication in electrical substations. Defines logical nodes and data objects used for device measurement and control. | - | - |
| **IEC 61970 / 61968 (CIM)** | Common Information Model. IEC standard for power network modelling, covering assets, measurements, markets, and network topology. | - | - |
| **Invoice** | A BLOOO-defined payable document derived from a Billing record, itemising energy, grid fee, and tax components. | CIM financial model | BLOOO |
| **KYC** | Know Your Customer. Legal identity verification required before enabling financial transactions through the Billing and Payments module. | - | BLOOO |
| **LEC** | Local Energy Community. See Community. | - | All |
| **Load** | A generic electrical load asset, measuring instantaneous power demand. | CIM `EnergyConsumer`, IEC 61850 `MMXU` | UG |
| **Market** | A time-bounded trading venue within a Community where Members submit Orders. Markets are divided into MarketSlots. | CIM `Market` | GSY, UoC, TUM |
| **MarketSlotInfo** | Metadata about a specific time slot within a Market, including opening, closing, and delivery windows. | OGC Time, CIM `MarketDocument` | GSY, UoC |
| **Member** | A registered participant in a Community. Owns or operates Assets, participates in Markets, and receives Billing records. Has a corresponding Actor record for KYC. | CIM `Customer`, SAREF `User` | R2M |
| **Offer** | A sell-side order in the GSY DEX market. A thin identity wrapper around an `Order` of type OFFER. | CIM `BidTimeSeries` | R2M |
| **Order** | The full specification of a buy or sell intent submitted to the GSY DEX, including quantity, price limit, energy source preference, and delivery slot. | CIM `BidTimeSeries`, `RegisteredResource` | GSY, UoC, TUM |
| **Payment** | A financial transaction settling an Invoice, linked to a Stripe payment record. | - | R2M |
| **Pilot** | A TUM-defined entity representing one of the four INTELLIGENT demonstration sites, grouping assets and providing site-level context for optimisation. | - | TUM |
| **PilotState** | A time-series snapshot of aggregate pilot-site conditions (average load, temperature, occupancy) used by FOS. | IEC 61850, SAREF4BLDG | TUM |
| **Production** | An aggregated record of energy produced by an Asset over a defined period. | SOSA `Observation`, DLMS-COSEM register | R2M |
| **Prosumer** | A Member who both produces and consumes energy. | - | All |
| **PvSystem** | A photovoltaic solar generation system. Modelled as a specialisation of `Asset`. | CIM `PhotovoltaicUnit`, IEC 61850 `MMXU`, SAREF4ENER | UG, HSLU |
| **SAREF** | Smart Applications REFerence ontology (ETSI TS 103 264). Semantic interoperability framework for IoT and energy devices. | ETSI TS 103 264 | - |
| **Site** | An R2M-defined physical location where Assets are installed. May be equivalent to Pilot (see ADR-001). | CIM `ServiceLocation`, `SubGeographicalRegion` | R2M |
| **SOSA / SSN** | Sensor, Observation, Sample, and Actuator / Semantic Sensor Network. W3C ontologies for modelling measurements and time-series. | W3C | - |
| **Stripe** | The BLOOO payment provider integration record, capturing Stripe-specific transaction identifiers and KYC fields. | - | BLOOO |
| **Tariff** | A BLOOO-defined price structure applied to a Trade, specifying energy price, grid fee, and tax components. | SAREF4ENER `Tariff`, CIM `PricingStructure` | BLOOO |
| **TimeSeries** | A sequence of (timestamp, value) pairs representing measurements over time. Not a standalone ontology class; historical data is modelled through the existing measurement and state classes (`sosa:Observation`, `int:SiteState`, `int:FacilityMeasurement`, `int:AssetState`) and market time-series data through `int:MarketTimeSeries`. | SOSA `ObservationCollection`, OGC Time | — |
| **Trade** | A matched and executed energy exchange between a buyer and seller in the GSY DEX, referencing a Bid and an Offer. | CIM `MarketAgreement` | R2M, GSY, UoC, TUM, BLOOO |
| **UoC** | University of Cyprus. Market and order domain partner. | - | - |
| **UUID** | Universally Unique Identifier (RFC 4122). Used as the primary key type for all INTELLIGENT ontology entities. | RFC 4122 | All |
