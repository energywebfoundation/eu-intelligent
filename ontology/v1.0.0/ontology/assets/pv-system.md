# Assets: PvSystem

## Overview

The `PvSystem` class models a photovoltaic solar generation system. It holds measurement attributes specific to PV operation and yield tracking. The corresponding `Asset` record holds identity, ownership, and lifecycle.

**Partners:** UG (University of Galway), HSLU (Hochschule Luzern)

---

## PvSystem

**Contributing partners:** UG, HSLU
**Standard mappings:** CIM `PhotovoltaicUnit`, IEC 61850 `MMXU` (measurement unit), SAREF4ENER `SolarPanel`
**Relationship to Asset:** See ADR-004. Currently modelled as a companion class linked by `pvSystemId` = `Asset.assetId`.

### Attributes

| Attribute | Type | Unit | Required | Description | Contributing Partner | Standard Mapping |
|-----------|------|------|----------|-------------|---------------------|-----------------|
| `pvSystemId` | UUID | - | Yes | Unique identifier; matches `Asset.assetId` | UG, HSLU | CIM `IdentifiedObject.mRID` |
| `power` | number | kW | No | Instantaneous AC active power output | UG, HSLU | IEC 61850 `MMXU.W` |
| `current` | number | A | No | Output current (AC or DC depending on measurement point) | UG | IEC 61850 `MMXU.A` |
| `voltage` | number | V | No | Output voltage (AC or DC depending on measurement point) | UG | IEC 61850 `MMXU.PhV` |
| `energyYield` | number | kWh | No | Cumulative total energy yield | UG | DLMS-COSEM `1.0.1.8.0.255` |
| `energyYieldYesterday` | number | kWh | No | Total energy yield for the previous calendar day | UG | DLMS-COSEM daily register |
| `mppEnergy` | number | kWh | No | Energy produced at maximum power point tracking conditions | UG | Manufacturer-specific |

### Relationships

| Relationship | Target | Cardinality | Description |
|-------------|--------|-------------|-------------|
| `extends` | Asset | 1 to 1 | Registry entry for this PV system (identity, ownership, lifecycle) |

### Validation Rules

- `pvSystemId` must reference an existing `Asset.assetId` with `assetType = pv_system`.
- `power` must be non-negative (PV systems only generate, not consume).
- `energyYield` must be monotonically increasing (cumulative register); a decrease indicates a meter reset and should be flagged.
- `energyYieldYesterday` must be non-negative.
- `voltage` and `current` context (AC or DC measurement point) should be documented per pilot.

### DLMS-COSEM Mapping

| Attribute | DLMS-COSEM Object |
|-----------|------------------|
| `energyYield` | `1.0.1.8.0.255` (Import active energy, Total — from inverter export meter perspective) |
| `energyYieldYesterday` | `1.0.1.8.0.255` with daily profile |

### Notes

- PV systems at INTELLIGENT pilot sites use inverter manufacturer APIs for data collection (token-based authentication over TLS). The `PvSystem` class attributes map to the data returned by these APIs.
- `mppEnergy` (Maximum Power Point energy) is a manufacturer-specific attribute available from some inverter APIs. It may not be available across all pilot installations.
- The LIC pilot (Switzerland) has 9 PV systems with a combined capacity of 98.7 kWp.
