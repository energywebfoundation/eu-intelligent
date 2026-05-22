# Measurement: AssetMeasurement

## Overview

`AssetMeasurement` is a real-time or near-real-time observation associated with an `Area` and `Community`, used by the GSY DEX for market operations. For the full class definition, see [`ontology/market/trade.md`](../market/trade.md).

This file exists as a navigation entry point. The `AssetMeasurement` class is defined in the market module because it is primarily produced and consumed by the GSY DEX trading engine, where it is linked to `Area` and `Community` for market scoping.

---

## Quick Reference

| Property | Value |
|----------|-------|
| Defined in | [`ontology/market/trade.md`](../market/trade.md) |
| Contributing partners | GSY, UoC |
| Standard mappings | SOSA `Observation`, SAREF `Measurement` |
| Primary key | (areaId, communityId, timestamp) composite |
| Relationships | `Area ||--o{ AssetMeasurement`, `Community ||--o{ AssetMeasurement` |

---

## Distinction from Production / Consumption

| | AssetMeasurement | Production / Consumption |
|---|---|---|
| **Granularity** | Instantaneous or short-interval real-time | Aggregated over a defined period |
| **Primary use** | Real-time market operations (GSY DEX) | Billing, settlement, FOS historical training |
| **Scoped to** | Area + Community | Asset |
| **Unit** | Implicit from context | Explicit (`unit` attribute) |
| **Defined by** | GSY, UoC | R2M |
