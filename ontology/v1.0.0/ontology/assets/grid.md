# Assets: Grid, GridBuilding

## Overview

This module defines classes for grid connection point measurements. `Grid` models a site-level grid connection point; `GridBuilding` models a building-level aggregate grid interface.

**Partners:** UG (Grid), HSLU (Grid powerIn/powerOut, GridBuilding)

---

## Grid

**Contributing partners:** UG, HSLU
**Standard mappings:** IEC 61850 `MMXU` (measurement unit), CIM `Terminal`, `EnergyConsumer`, SAREF4GRID `GridMeasurement`
**Relationship to Asset:** See ADR-004. Companion class linked by `gridId` = `Asset.assetId`.

The `Grid` class represents the main grid connection point of a site or building, measuring the bidirectional flow of electrical energy between the local energy community and the upstream distribution grid. It is the primary data source for assessing import/export balance, grid fee calculation, and DSO reporting.

### Attributes

| Attribute | Type | Unit | Required | Description | Contributing Partner | Standard Mapping |
|-----------|------|------|----------|-------------|---------------------|-----------------|
| `gridId` | UUID | - | Yes | Unique identifier; matches `Asset.assetId` | UG, HSLU | CIM `IdentifiedObject.mRID` |
| `power` | number | kW | No | Net active power at the grid connection point (positive = import from grid) | UG | IEC 61850 `MMXU.W` |
| `powerIn` | number | kW | No | Active power imported from grid | HSLU | DLMS-COSEM import power |
| `powerOut` | number | kW | No | Active power exported to grid | HSLU | DLMS-COSEM export power |
| `reactivePower` | number | kVAR | No | Reactive power at connection point | UG | IEC 61850 `MMXU.VAr` |
| `current` | number | A | No | RMS current | UG | IEC 61850 `MMXU.A` |
| `voltage` | number | V | No | Phase-to-neutral voltage (or phase-to-phase if 3-phase) | UG | IEC 61850 `MMXU.PhV` |
| `frequency` | number | Hz | No | Grid frequency | UG | IEC 61850 `MMXU.Hz` |
| `importEnergy` | number | kWh | No | Cumulative energy imported from grid | UG | DLMS-COSEM `1.0.1.8.0.255` |
| `exportEnergy` | number | kWh | No | Cumulative energy exported to grid | UG | DLMS-COSEM `1.0.2.8.0.255` |

### Relationships

| Relationship | Target | Cardinality | Description |
|-------------|--------|-------------|-------------|
| `extends` | Asset | 1 to 1 | Registry entry for this grid connection point |

### Validation Rules

- `gridId` must reference an existing `Asset.assetId` with `assetType = grid`.
- `power` represents net flow: positive = import (consuming from grid), negative = export (feeding to grid). `powerIn` and `powerOut` are always non-negative.
- `frequency` is expected in range [47.5, 52.5] Hz for European grids (nominal 50 Hz, per EN 50160).
- `voltage` nominal values: 230 V (single-phase), 400 V (three-phase line-to-line) for low-voltage European grids.
- `importEnergy` and `exportEnergy` must be monotonically increasing (cumulative DLMS registers).

### DLMS-COSEM Mapping

| Attribute | DLMS-COSEM Object | Description |
|-----------|------------------|-------------|
| `importEnergy` | `1.0.1.8.0.255` | Active energy import, tariff-independent total |
| `exportEnergy` | `1.0.2.8.0.255` | Active energy export, tariff-independent total |
| `power` | `1.0.1.7.0.255` | Instantaneous active power, import |
| `reactivePower` | `1.0.3.7.0.255` | Instantaneous reactive power |

### Notes

- UG uses a single `power` attribute (signed); HSLU uses separate `powerIn` / `powerOut` attributes (unsigned). Both representations are included to accommodate both conventions.
- Communication between data loggers and EWDS is via manufacturer API using token-based authentication over TLS, as documented in the D6.1 pilot specifications.

---

## GridBuilding

**Contributing partners:** HSLU
**Standard mappings:** CIM `ServiceLocation`, `EnergyConsumer`

A building-level grid connection aggregate, distinct from the site-level `Grid`. Used at the HSLU Lucerne pilot where individual buildings have metered grid connections.

### Attributes

| Attribute | Type | Unit | Required | Description | Standard Mapping |
|-----------|------|------|----------|-------------|-----------------|
| `gridBuildingId` | UUID | - | Yes | Unique identifier; matches `Asset.assetId` | CIM `IdentifiedObject.mRID` |
| `powerIn` | number | kW | No | Active power imported from grid at building level | DLMS-COSEM import register |
| `powerOut` | number | kW | No | Active power exported to grid at building level | DLMS-COSEM export register |

### Relationships

| Relationship | Target | Cardinality | Description |
|-------------|--------|-------------|-------------|
| `extends` | Asset | 1 to 1 | Registry entry for this building grid connection |

### Validation Rules

- `gridBuildingId` must reference an existing `Asset.assetId` with `assetType = grid_building`.
- `powerIn` and `powerOut` must be non-negative.
