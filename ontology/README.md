# INTELLIGENT Project Ontology

**EU Horizon Innovation Action | Grant Agreement No. 101160678**
**Full Title:** INteroperable Tools for nEtwork-aware, Ledger-based Local energy sharIng and flexibility manaGEment leveraging user engagemeNT

---

## Table of Contents

1. [Purpose](#purpose)
2. [Scope](#scope)
3. [What This Ontology Is Not](#what-this-ontology-is-not)
4. [Relationship to the Working Spreadsheet](#relationship-to-the-working-spreadsheet)
5. [Methodology](#methodology)
6. [Ontology Design Principles](#ontology-design-principles)
7. [Domain Overview](#domain-overview)
8. [Contributing Partners](#contributing-partners)
9. [Standards Referenced](#standards-referenced)
10. [How to Navigate](#how-to-navigate)
11. [Licence](#licence)

---

## Purpose

The INTELLIGENT project involves 15 partners across four pilot sites in three countries, each working on distinct services: a P2P energy trading engine (GSY DEX), an AI/ML-based flexibility optimisation service (FOS), a billing and payments module, pilot site data collection pipelines, and the Energy Web Digital Spine (EWDS) integration layer. Each partner brought their own internal understanding of the domain — their own names for concepts, their own mental models for how energy communities work, and their own service-level data structures.

This ontology exists to establish a **shared semantic understanding** of the domain across all partners. Its purpose is not to impose a common database schema or dictate API field names. It is to define what things *mean* — what an energy community is, what an asset is, what it means to observe a measurement, what a trade represents — so that all partners are reasoning about the same concepts even when their own systems use different names or structures internally.

More precisely, the ontology serves three purposes:

**Semantic alignment.** When one partner refers to a "facility" and another refers to a "building unit," the ontology establishes what these concepts mean and whether they are the same thing. When one partner captures battery voltage as a named field on a battery class and another captures it as a time-series data point from a sensor, the ontology expresses the correct and general representation of that concept so both partners understand it the same way.

**Standards grounding.** Every concept in this ontology is mapped, where applicable, to an established international standard — IEC CIM for power network entities, SSN/SOSA for observations and measurements, SAREF for energy devices, W3C DID/VC for identity and credentials. These mappings ensure that the INTELLIGENT domain model is not invented in isolation and that its classes and properties are interpretable by external systems, standards bodies, and future projects.

**Foundation for downstream artefacts.** The ontology is the reference from which JSON Schema definitions for EWDS topics, RESTful API payload contracts, and database schemas are derived. Those artefacts implement the ontology; they are not equivalent to it. The ontology defines meaning; downstream artefacts define structure and format.

**Process context.** This ontology is developed by EWAG under Work Package 3 (Data Integration and Interoperability Infrastructure), Task T3.1 (Interoperable Energy Data Exchange Framework), feeding into deliverable D3.2 and informing T3.2 (EWDS deployment), T4.4 (FOS data interfaces), and WP5 (market platform integration).

---

## Scope

The ontology covers the concepts required to semantically describe the INTELLIGENT project domain. It is organised into seven domains:

| Domain | Core Classes |
|--------|-------------|
| **Spatial and Organisational** | EnergyCommUnit, Site, Facility, Pilot |
| **Metering** | MeteringPoint, SmartMeter, Feeder |
| **Assets** | Asset, BatteryUnit, PhotovoltaicUnit, HeatPump, ElectricBoiler, EVChargingStation, HydroGeneratingUnit, EnergyConsumer |
| **Observations and Actuation** | Observation, ObservableProperty, QuantityValue, Command, ActuatableProperty |
| **Energy Markets** | Market, MarketSlotInfo, EnergyOrder, EnergyTrade, ClearingResult, Tariff |
| **Billing and Financial** | EnergyAccount, Invoice, Payment, StripePayment |
| **Participants and Identity** | Participant, Actor, Address, ContactDetails, DecentralizedIdentity, IdentityCredential |

The ontology covers all four pilot sites and the full range of asset types, measurement types, and market mechanisms present across them:

- **Pilot 1 — LIC (Lugaggia Innovation Community, Switzerland, lead: AEM):** PV systems, BESS (district and residential), heat pumps, electric boilers, EV chargers, smart meters at community (PCC) and feeder (SGIM) levels.
- **Pilot 2 — CELL (Collaborative Energy Living Lab, Lucerne, Switzerland, lead: HSLU):** PV systems, BESS, hydropower, EV chargers, smart meters at building and apartment levels.
- **Pilot 3 — Greenvolt Comunidades (Portugal, leads: GV, ERE):** PV systems, BESS, EV chargers, electric boilers, smart meters at facility level.
- **Pilot 4 — Aran Islands (Ireland, leads: UG, CFA):** PV systems, BESS, heat pumps, measured loads, smart meters at household level.

---

## What This Ontology Is Not

Understanding what this ontology is not matters as much as understanding what it is.

### Not a data modelling exercise

Data modelling asks: how should this data be structured for storage and retrieval? It produces tables, schemas, and field definitions optimised for a particular implementation. This ontology asks a different question: what are the concepts in this domain, what do they mean, and how do they relate? The answer to that question is independent of how any system chooses to store or transmit the data.

The distinction becomes concrete in the treatment of measurements. A data model asks: what columns does a battery table have? The answer is a list of named fields — voltage, current, temperature, state of charge — each tied to that specific device type. An ontology asks: what is the general concept of a measurement, and what are its essential parts? The answer is: an `Observation` has a `featureOfInterest` (the thing being observed), an `observedProperty` (what aspect is being measured — voltage, temperature, state of charge), a `hasResult` (the numeric value and its unit), and a `resultTime`. This pattern works identically for every asset type and every measurement type without needing a separate class or field for each.

This is not a stylistic preference. It is the correct way to represent observations, as established by the W3C SSN/SOSA ontology, SAREF, and IEC CIM. The working spreadsheet, which does list named fields per device type, is a requirements inventory — a record of what each partner measures and calls their measurements. It is valuable input to the ontology but is not itself an ontological representation.

### Not a JSON Schema Definition

This ontology does not produce machine-executable JSON Schema files. JSON Schema definitions for EWDS message topics and API payloads are downstream artefacts authored by implementing teams. They should be consistent with this ontology but are maintained separately.

### Not a RESTful API Contract

This ontology does not define HTTP methods, endpoint paths, query parameters, pagination conventions, error codes, or response envelope structures. These are implementation decisions for each service team.

### Not a Database Schema

This ontology does not specify table names, primary key constraints, index definitions, foreign key cascade behaviour, or storage types. The working spreadsheet provides guidance on storage types as implementation recommendations; those are not part of the ontology itself.

### Not a Final or Frozen Specification

This ontology is under active development. Several domains and class relationships are still being resolved with partners. The spatial and metering domains reflect confirmed workshop decisions. Other domains carry open questions documented in `v1.0.0/docs/design-decisions.md`. Nothing in `Pending` status should be treated as stable for implementation.

---

## Relationship to the Working Spreadsheet

The project maintains a shared working spreadsheet (`.xlsx`) alongside this repository. The two serve different and complementary purposes and must be understood as distinct artefacts.

**The working spreadsheet** is a requirements elicitation and inventory tool. Its purpose is to capture, for each partner and pilot, what classes they work with, what they call their fields, what data types they use, what validation rules they apply, and how they store things. It answers the question: what does each partner's system currently look like? The field-level detail in the spreadsheet — JSON Schema data types, storage data types, nullability, enum values, validation rules, example values, partner applicability flags — reflects implementation reality across the consortium.

**This ontology** takes the spreadsheet's content as source material and asks: given what all partners measure and model, what is the correct semantic representation of these concepts? The ontology generalises, abstracts, and grounds partner contributions in standards. A field like `BatteryUnit.stateOfCharge` in the spreadsheet becomes, in the ontology, an `Observation` with `observedProperty = StateOfCharge` pointing to a `BatteryUnit` as `featureOfInterest`. The concept is the same; the representation is correct.

The spreadsheet is not the ontology. The ontology is not the spreadsheet. Both are necessary, and both must be kept in sync as the project evolves. When the ontology design changes — for example, when a class is removed or a new pattern is introduced — the spreadsheet's structure should be updated to reflect it, and vice versa.

---

## Methodology

The ontology is developed through an iterative process with explicit partner involvement at each stage.

### Step 1: Partner input collection

Each technical partner provided their data model in a separate working spreadsheet, describing the classes and fields they use in their own service or pilot data collection without prior harmonisation. These files are the raw source material — a faithful record of how each partner thinks about the domain.

### Step 2: Consolidation and inventory

EWAG compiled all partner inputs into the shared working file. During this step, overlapping classes were identified (R2M's `Member` and BLOOO's `Actor` both describe a platform participant), fields with different names but the same meaning were flagged, and misunderstandings were surfaced. A key example: the `Grid` class appeared in multiple partner files but meant different things to different partners — a grid connection point, a feeder measurement, a building-level meter, and a community-level meter. Consolidation made this ambiguity visible. Another example: R2M's `AssetStatus` class (operational health flags) was removed after clarification that `AssetState` — which captures the current operational condition of each asset type — is the correct and sufficient concept.

### Step 3: Ontological analysis

For each set of partner contributions, EWAG asks the ontological question: what is the correct general representation of this concept? The answer draws on the reference ontologies listed in the Standards section. For measurements and observations, the correct pattern is SSN/SOSA's `Observation` with `featureOfInterest`, `observedProperty`, and `hasResult`. For assets, the correct pattern is a typed class hierarchy rather than flat field lists. For locations, the correct pattern is a containment hierarchy grounded in CIM's `ServiceLocation` and `EnergyArea`. Partner-contributed field names and structures are evidence of what needs to be represented; they are not prescriptions for how to represent it.

### Step 4: Workshop validation

Key structural decisions are validated in dedicated ontology workshops with pilots and service providers. The May 2026 workshop confirmed, among other things, that `Site` represents a single building within a community, that `Facility` represents a unit or apartment within a building (optional when a site is itself the smallest meaningful unit), that the `Grid` class should be removed and replaced by a `MeteringPoint` concept, and that feeder-level measurements are a distinct concept from smart meter measurements at community or facility level.

### Step 5: Standards mapping

Every class and property is mapped to the closest applicable standard. CIM provides the canonical model for power network entities, assets, and markets. SSN/SOSA provides the canonical model for observations and actuations. SAREF provides the canonical model for IoT devices and energy properties. W3C DID Core and VC Data Model provide the identity and credential model. Where no standard mapping exists, the INTELLIGENT project namespace (`int:`) is used with a clear note that the concept is project-specific.

### Step 6: Documentation and open question tracking

Confirmed classes are documented in the markdown files under `{version}/ontology/`. Open questions and unresolved design decisions are documented as ADRs in `{version}/docs/design-decisions.md` and tracked as GitHub Issues. No concept is silently left ambiguous — every known uncertainty is made explicit and assigned to the partner responsible for resolution.

---

## Ontology Design Principles

These principles govern every structural decision in this ontology. Reading them before reading the class definitions will make the design choices easier to understand.

**Generalise over specialise.** Where a general pattern covers many cases, that pattern is preferred over a specific class for each case. Measurements are `Observation`s with an `observedProperty`, not named fields on device classes. Control commands are `Command`s with a `commandType`, not flat records with one field per setpoint type. This is the pattern established by SSN/SOSA, SAREF, and IEC CIM, and it is the right pattern here.

**The `featureOfInterest` is the concept being described, not the sensor.** When a smart meter measures voltage at a feeder, the `featureOfInterest` of that observation is the feeder, not the smart meter. The smart meter is the sensor (`madeBy`). This distinction matters for the spatial and metering domains: measurements are anchored to the topological entity they describe, not to the device that captured them.

**Spatial containment and grid topology are separate hierarchies.** The spatial hierarchy (`EnergyCommUnit` → `Site` → `Facility`) describes physical location and community membership. The grid topology (`Feeder` connecting transformer to sites) describes the electrical network structure. These are related but not the same. A feeder serves multiple sites; it is not contained within a site. `MeteringPoint` bridges them: a `MeteringPoint` is `locatedAt` either a spatial entity or a feeder, and its observations describe the energy flows at that point.

**The `Facility` level is optional.** When a pilot site has no sub-unit structure — when the building itself is the smallest meaningful participant — `Site` acts as its own metering and participation boundary and `Facility` is absent. The ontology expresses this as a `0..*` containment relationship from `Site` to `Facility`.

**Asset identity is separate from asset measurement.** An `Asset` class carries the identity, lifecycle, and type of a physical device. It does not carry measurement fields. Measurements are `Observation`s with the asset as `featureOfInterest`. This follows the hybrid pattern recommended by IEC CIM, where `ConductingEquipment` holds identity and logical nodes (MMXU, ZBAT) hold measurement semantics.

**Classes are grounded in standards, not invented.** When IEC CIM, SAREF, or SSN/SOSA already defines a concept, the INTELLIGENT ontology reuses it. New classes using the `int:` namespace are introduced only when no standard equivalent exists. The `int:` prefix is not a claim of novelty; it is an acknowledgement that the concept is project-specific and may eventually be aligned with a standard.

---

## Domain Overview

### Spatial and Organisational

The spatial domain defines the physical and organisational structure of an energy community.

`EnergyCommUnit` (mapped to `cim:EnergyArea`) is the Local Energy Community — the top-level grouping of all participants, assets, and markets. It contains one or more `Site`s.

`Site` (mapped to `cim:ServiceLocation`) is a single physical building within a community. The May 2026 workshop confirmed this definition. A site contains zero or more `Facility` instances.

`Facility` (mapped to `cim:EnergyConsumer`) is a single apartment, unit, or group of units within a site. It is the lowest level of the spatial hierarchy and the entity that owns or operates assets and participates in the market. `Facility` is optional: when a site has no sub-unit structure, the site itself acts as the facility.

`Pilot` is an INTELLIGENT-project-specific concept representing one of the four demonstration sites as a whole. It groups one or more sites for project-level scoping and FOS optimisation. It is not part of the spatial containment hierarchy and has no standard equivalent (`int:Pilot`).

### Metering

The metering domain replaces the former `Grid` class, which was removed after a clarification workshop established that it conflated several distinct concepts.

`MeteringPoint` (mapped to `cim:UsagePoint`) is the location where a meter is installed and the boundary at which energy flows are measured. A metering point is `locatedAt` one of: an `EnergyCommUnit` (community-level PCC meter), a `Feeder` (feeder-level SGIM), a `Site` (building-level meter), a `Facility` (apartment-level meter), or an `Asset` (sub-meter on a specific device). This single class correctly represents all metering configurations across all four pilots without needing a separate class per installation level.

`SmartMeter` is a subclass of `Asset` — it is a physical device. It is `installedAt` a `MeteringPoint`. Its observations have `featureOfInterest` pointing to the topological entity the metering point describes, not to the meter itself.

`Feeder` (mapped to `cim:ACLineSegment`) represents a segment of the LV distribution network connecting a transformer to one or more sites. It is part of the grid topology domain, not the spatial containment hierarchy. AEM's SGIM at LIC produces observations whose `featureOfInterest` is a `Feeder` instance. These observations capture per-phase active power, voltage, current, and power factor at the LV transformer — grid topology data with a different analytical purpose from the community-level PCC smart meter data, which captures net energy exchange between the community and the public grid.

### Assets

`Asset` (mapped to `saref:Device` / `cim:Equipment`) is the base class for all energy devices. It carries identity (`assetId`), type (`assetType`), lifecycle validity (`validFrom`, `validUntil`), and controllability (`isControllable`). It carries no measurement fields. Specific asset types are subclasses: `BatteryUnit` (`cim:BatteryUnit`), `PhotovoltaicUnit` (`cim:PhotovoltaicUnit`), `HeatPump` (`int:HeatPump`), `ElectricBoiler` (`int:ElectricBoiler`), `EVChargingStation` (`int:EVChargingStation`), `HydroGeneratingUnit` (`cim:HydroGeneratingUnit`), `EnergyConsumer` (`cim:EnergyConsumer`). The subclass declares the type; the `ObservableProperty` vocabulary defines what can be measured on it.

### Observations and Actuation

This domain is the semantic core of the measurement model.

`Observation` (mapped to `sosa:Observation`) represents a single measurement of a property at a point in time. Every measurement across all asset types and all metering levels is an instance of this class. Its properties: `featureOfInterest` (the asset, metering point, or spatial entity being described), `observedProperty` (what is being measured, drawn from the `ObservableProperty` vocabulary), `hasResult` (a `QuantityValue` holding the numeric value and unit), and `resultTime` (the timestamp).

`ObservableProperty` (mapped to `sosa:ObservableProperty`) is a named concept representing a type of measurable quantity. Instances include `ActivePower`, `ReactivePower`, `Voltage`, `Current`, `Frequency`, `Energy`, `StateOfCharge`, `StateOfHealth`, `Temperature`, `PowerFactor`, and others. These instances are `owl:NamedIndividual`s in the ontology — they are not classes, and they are not fields on device classes.

`Command` (mapped to `sosa:Actuation`) represents a control signal sent to a controllable asset. It mirrors the `Observation` pattern: `commandType` points to an `ActuatableProperty` named individual (`PowerSetpoint`, `TemperatureSetpoint`, `OnOffState`, `FractionalSetpoint`), and `commandValue` holds the value. This replaces the earlier flat `ControlAssetCommand` class with its bespoke per-setpoint fields.

### Energy Markets

`Market` (`cim:Market`) is a time-bounded trading venue associated with a community. `EnergyOrder` (`cim:BidTimeSeries`) is a buy or sell intent submitted by a participant, with a direction property (`BID` or `OFFER`) replacing the earlier thin `Bid`/`Offer` wrapper classes. `EnergyTrade` (`cim:MarketAgreement`) is a matched and executed energy exchange. `ClearingResult` captures the aggregate outcome of a market clearing run. `Tariff` (`saref4ener:Tariff`) decomposes the financial components of a trade into individually itemised regulatory components: energy price, network tariff, levies, capacity charges, and tax.

### Billing and Financial

`EnergyAccount` is the billing entity for a participant. `Invoice` is a payable document derived from trades and tariffs over a billing period. `Payment` records a financial transaction settling an invoice. `StripePayment` captures the payment provider integration record for transactions processed through Stripe.

### Participants and Identity

`Participant` (`foaf:Agent`) is the community member concept — a person or organisation participating in the LEC. `Actor` is their legal identity for KYC and billing purposes. `DecentralizedIdentity` (W3C DID Core) is their cryptographic identity for EWDS messaging and credential issuance. `IdentityCredential` (W3C VC Data Model v2.0) is a verifiable credential held by an actor, used for KYC verification and Green Proof issuance. `Address` and `ContactDetails` are supporting classes for the Actor.

---

## Contributing Partners

The following partners have direct contributions to the ontology, either as service providers whose data models and domain knowledge shaped the class definitions, or as pilot operators whose real-world metering infrastructure and asset configurations are represented in the ontology.

| Short Name | Organisation | Country | Type | Service / Pilot |
|-----------|-------------|---------|------|-----------------|
| R2M / R2M IT | R2M Solution Spain SL / R2M Solution SRL | ES / IT | Service provider | User interface, API integration |
| UoC | Universität zu Köln | DE | Service provider | P2P market mechanism (AMM-based trading) |
| TUM | Technische Universität München | DE | Service provider | Flexibility and Optimisation Service (FOS) |
| GSY | Grid Singularity GmbH | DE | Service provider | GSY DEX (P2P energy exchange) |
| BLOOO | Blooo | FR | Service provider | Billing and payments |
| EWAG | Energy Web AG | CH | Service provider | Energy Web Digital Spine (EWDS), ontology consolidation |
| GV | Greenvolt Comunidades SA | PT | Pilot | Pilot 3 — Greenvolt Comunidades (Bicesse / Feirense, Portugal) |
| ERE | E-Redes Distribuição de Electricidade SA | PT | Pilot | Pilot 3 — Greenvolt Comunidades (DSO) |
| UG | University of Galway | IE | Pilot | Pilot 4 — Aran Islands (Inis Mór, Ireland) |
| HSLU | Hochschule Luzern | CH | Pilot | Pilot 2 — CELL (Lucerne, Switzerland) |
| AEM | Azienda Elettrica di Massagno SA | CH | Pilot | Pilot 1 — LIC (Lugaggia, Switzerland) |

---

## Standards Referenced

| Standard | Full Name | Role in this Ontology |
|----------|-----------|----------------------|
| IEC 61970 / 61968 (CIM) | Common Information Model | Canonical classes for EnergyCommUnit, Site, Asset subclasses, Market, EnergyTrade, MeteringPoint, Feeder |
| IEC 61850 | Communication Networks and Systems for Power Utility Automation | Observable property names and units for electrical measurements (MMXU, ZBAT, STMP logical nodes); control command patterns (GGIO) |
| IEC 62056 (DLMS-COSEM) | Device Language Message Specification / Companion Specification for Energy Metering | Smart meter register identifiers for energy import/export observations |
| SSN | Semantic Sensor Network ontology (W3C) | Core observation pattern: Sensor, ObservableProperty, FeatureOfInterest |
| SOSA | Sensor, Observation, Sample, and Actuator (W3C) | Observation, Actuation, hasResult, featureOfInterest, resultTime, madeBy |
| SAREF | Smart Applications REFerence ontology (ETSI TS 103 264) | Device model, Property, Measurement, Task for IoT semantic interoperability |
| SAREF4ENER | SAREF extension for energy (ETSI TS 103 673) | Energy device types, Tariff, Price, consumption profile patterns |
| SAREF4GRID | SAREF extension for smart grid (ETSI TS 103 534) | Grid measurement types, power quality, feeder-level properties |
| SAREF4BLDG | SAREF extension for buildings (ETSI TS 103 410-9) | Occupancy, indoor temperature, thermal comfort properties |
| SEAS | Smart Energy Aware Systems ontology | Energy system evaluation, generation and consumption modelling |
| OGC Time | OGC Time ontology (W3C) | Temporal entities: `resultTime`, validity intervals (`validFrom`, `validUntil`) |
| QUDT | Quantities, Units, Dimensions and Types | Unit of measure vocabulary for `QuantityValue.unit` |
| W3C DID Core 1.0 | W3C Decentralised Identifier specification | `DecentralizedIdentity` class; cryptographic identity anchors for EWDS |
| W3C VC Data Model v2.0 | W3C Verifiable Credentials specification | `IdentityCredential` class; KYC verification and Green Proof credential structure |
| OCPP | Open Charge Point Protocol (OCA) | Communication protocol context for `EVChargingStation` |
| DCAT | Data Catalog Vocabulary (W3C) | Dataset and data service descriptions for market and measurement data collections |
| IDSA / GAIA-X | International Data Spaces / GAIA-X federation | Data space interoperability layer informing EWDS connector architecture |
| ISO 4217 | Currency codes | Currency values in `Tariff`, `Invoice`, `StripePayment` |
| ISO 3166-1 / 3166-2 | Country and subdivision codes | `Address.country`, `Address.state` |
| vCard (RFC 6350) | vCard ontology | `Address` and `ContactDetails` property names |
| E.164 | International telephone numbering plan | `ContactDetails.phoneNumber`, `ContactDetails.mobileNumber` |

Full class-by-property standard cross-reference: see [`v1.0.0/docs/standard-mappings.md`](v1.0.0/docs/standard-mappings.md).

---

## How to Navigate

- New to the ontology? Start with `{version}/docs/overview.md` then `{version}/docs/er-diagram.md`.
- Looking for a specific class? The `{version}/ontology/` directory is organised by domain. The domain overview above maps concepts to their files.
- Unsure about an open design question or a structural decision? See `{version}/docs/design-decisions.md` and `{version}/ontology/open-questions.md`.
- Want to propose a change? Use the GitHub Issue templates under `.github/ISSUE_TEMPLATE/`.
- Looking for field-level implementation detail (data types, storage types, validation rules, enum values)? The authoritative source for that level of detail is the shared `.xlsx` working file. This repository contains the semantic ontology; the spreadsheet contains the implementation inventory.

---

## Licence

Apache 2.0. Published open-source in compliance with the INTELLIGENT project's Horizon Europe Open Access commitment (FAIR principles).
