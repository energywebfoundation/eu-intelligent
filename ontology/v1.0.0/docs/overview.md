# Ontology Overview — v1.0.0

## Purpose

The INTELLIGENT ontology establishes a shared semantic understanding of the domain across all project partners. Its purpose is not to impose a common database schema or dictate API field names. It defines what things *mean* — what an energy community is, what an asset is, what it means to observe a measurement, what a trade represents — so that all partners reason about the same concepts even when their own systems use different names or structures internally.

The ontology is the reference from which downstream technical artefacts — JSON Schema definitions for EWDS topics, RESTful API payload contracts, database schemas — are derived. Those artefacts implement the ontology; they are not equivalent to it.

## Scope

Seven domains covering the full INTELLIGENT platform:

| Domain | Core Classes |
|--------|-------------|
| **Spatial and Organisational** | EnergyCommUnit, Site, Facility, Pilot, SiteState, FacilityState, FacilityMeasurement |
| **Metering** | MeteringPoint, SmartMeter, Feeder, MeteringPointMeasurement, CommunityMeasurement, FeederMeasurement |
| **Assets** | Asset, BatteryUnit, PhotovoltaicUnit, HeatPump, ElectricBoiler, EVChargingStation, HydroGeneratingUnit, EnergyConsumer, AssetState |
| **Observations and Actuation** | Observation, ObservableProperty, QuantityValue, Command, ActuatableProperty |
| **Energy Markets** | Market, MarketTimeSeries, EnergyOrder, EnergyTrade, ClearingResult, Tariff |
| **Billing and Financial** | Billing, Invoice, Payment, StripePayment |
| **Participants and Identity** | Actor, Address, ContactDetails, DecentralizedIdentity, IdentityCredential, UserAccount, UserPreferences |

## Relationship to EWDS

EWAG deploys the Energy Web Digital Spine (EWDS) as the interoperability backbone for the INTELLIGENT platform. The ontology provides the semantic layer that makes data exchanged through EWDS interpretable by all consuming services.

Concretely:
- FOS (TUM) reads `Observation` records and `AssetState` snapshots from EWDS and writes back `Command` signals targeting controllable assets.
- GSY DEX reads `EnergyOrder` records from EWDS and writes back `EnergyTrade` and `ClearingResult` records.
- The BLOOO Billing module reads consolidated `EnergyTrade` and `Tariff` records from EWDS and produces `Invoice` and `Payment` records.
- Pilot operators push device-level observations through EWDS client gateways, with `MeteringPoint` records anchoring measurements to the correct topological level.

## Key Design Decisions

**Measurements are Observations, not fields.** Every measurement — voltage, temperature, state of charge, power output — is a `sosa:Observation` instance with a `featureOfInterest` (the asset or location), an `observedProperty` (drawn from the `ObservableProperty` named individual vocabulary), and a `hasResult` (`QuantityValue`). No measurement field appears directly on an asset or location class.

**The Grid class is removed.** It conflated community-level PCC metering, feeder-level SGIM metering, building-level metering, and apartment-level metering. These are now correctly represented as `MeteringPoint` instances at different topological levels, with `Feeder` as a separate grid topology class.

**Spatial containment and grid topology are separate.** `EnergyCommUnit` → `Site` → `Facility` is the spatial hierarchy. `Feeder` is grid topology connecting transformer to sites. `MeteringPoint` bridges them.

**AssetStatus is removed.** `AssetState` is the single class for asset condition, with per-asset-type state fields defined in each asset class file.

**MarketSlotInfo is removed.** Each `Market` record is broadcast via EWDS directly; a mirroring class was unnecessary (May 2026 workshop decision with GSY and TUM).

**Tariff is community-scoped and time-bounded.** A `Tariff` defines price and charge values applicable to all energy transactions within an `EnergyCommUnit` during a validity period. It is not attached to individual trades or billing records.

## Versioning

The ontology uses semantic versioning (`MAJOR.MINOR.PATCH`). Breaking changes to existing classes increment MAJOR. New classes or properties increment MINOR. Corrections and documentation updates increment PATCH. All changes are recorded in `CHANGELOG.md` at the repository root.
