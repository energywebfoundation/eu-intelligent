# Ontology Overview

## Purpose

The INTELLIGENT ontology defines the canonical data model shared across all platform services. Its primary role is to enable the Energy Web Digital Spine (EWDS) to act as a semantically coherent integration layer: any service that pushes or pulls data through EWDS uses the classes and attributes defined here as the common language.

Without a shared ontology, each bilateral integration between services (GSY DEX, FOS, Billing, Pilot monitoring) would require its own bespoke mapping. The ontology replaces that with a single, versioned, partner-agreed model.

## Scope

The ontology covers five functional domains:

| Domain | Key Classes | Primary Partners |
|--------|------------|-----------------|
| **Core** | Community, Site, Pilot, Member, Actor | R2M, BLOOO, TUM |
| **Assets** | Asset, Battery, PvSystem, Grid, Load, EVChargingStation, HydroPowerPlant | R2M, TUM, UG, HSLU |
| **Market** | Market, Order, Bid, Offer, Trade, ClearingResult, Tariff | R2M, GSY, UoC, TUM, BLOOO |
| **Billing** | Billing, Payment, Invoice, Stripe | R2M, BLOOO |
| **Optimisation** | PilotState, AssetState, ControlAssetCommand, HistoricalData, GridTopology | TUM, GSY, UoC |
| **Measurement** | Production, Consumption, AssetMeasurement | R2M, GSY, UoC |

## Relationship to EWDS

EWAG deploys a customised instance of the Energy Web Digital Spine (EWDS) as the interoperability backbone for the INTELLIGENT platform. EWDS is protocol and data-model agnostic, but the ontology defined here provides the semantic layer that makes data exchanged through EWDS interpretable by all consuming services.

Concretely:
- FOS reads real-time `AssetMeasurement`, `AssetState`, and `PilotState` records from EWDS and writes back forecasts and `ControlAssetCommand` signals.
- GSY DEX reads `Order`, `Bid`, `Offer`, and `Market` records and writes back `Trade` and `ClearingResult` records.
- The Billing module reads consolidated `Trade` and `Tariff` records from EWDS and produces `Invoice` and `Payment` records.
- Pilot operators push `Production`, `Consumption`, and device-level measurements through EWDS client gateways.

## Design Principles

1. **Partner traceability** - Every class and attribute is annotated with the partner(s) who specified it. This ensures accountability and simplifies conflict resolution.
2. **Standards alignment** - Where a canonical class exists in IEC 61850, CIM, DLMS-COSEM, or SAREF, the INTELLIGENT class maps to it rather than reinventing it.
3. **Open questions are explicit** - Rather than silently papering over ambiguities, unresolved questions (e.g. whether `Site` and `Pilot` are the same entity) are captured in `docs/design-decisions.md` and tracked as GitHub Issues.
4. **Modularity** - Domains are independently navigable. A billing engineer need not read the optimisation module to understand `Invoice`.
5. **FAIR compliance** - The ontology is published openly in line with the Horizon Europe FAIR data principles (Findable, Accessible, Interoperable, Reusable).

## Versioning

The ontology uses semantic versioning (`MAJOR.MINOR.PATCH`). Breaking changes to existing classes increment MAJOR. New classes or attributes increment MINOR. Corrections and documentation updates increment PATCH. All changes are recorded in `CHANGELOG.md`.
