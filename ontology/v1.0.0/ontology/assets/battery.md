# Assets: Battery

## Overview

The `Battery` class models a Battery Energy Storage System (BESS). It holds measurement attributes specific to battery operation. The corresponding `Asset` record holds identity, ownership, and lifecycle.

**Partners:** UG (University of Galway), HSLU (Hochschule Luzern)

---

## Battery

**Contributing partners:** UG, HSLU
**Standard mappings:** IEC 61850 `ZBAT` (Battery logical node), CIM `BatteryUnit`, SAREF4ENER `Battery`
**Relationship to Asset:** See ADR-004. Currently modelled as a companion class linked by `batteryId` = `Asset.assetId`.

### Attributes

| Attribute | Type | Unit | Required | Description | Contributing Partner | Standard Mapping |
|-----------|------|------|----------|-------------|---------------------|-----------------|
| `batteryId` | UUID | - | Yes | Unique identifier; matches `Asset.assetId` | UG, HSLU | CIM `IdentifiedObject.mRID` |
| `chargePower` | number | kW | No | Instantaneous charge power (positive = charging) | UG, HSLU | IEC 61850 `ZBAT.ChaPwr` |
| `dischargePower` | number | kW | No | Instantaneous discharge power (positive = discharging) | UG, HSLU | IEC 61850 `ZBAT.DisPwr` |
| `chargeEnergy` | number | kWh | No | Cumulative energy charged since installation or reset | UG, HSLU | IEC 61850 `ZBAT.ChaWh` |
| `dischargeEnergy` | number | kWh | No | Cumulative energy discharged since installation or reset | UG, HSLU | IEC 61850 `ZBAT.DisWh` |
| `stateOfCharge` | number | % | No | State of charge (0-100%) | UG, HSLU | IEC 61850 `ZBAT.SoC` |
| `stateOfHealth` | number | % | No | State of health; capacity relative to rated (0-100%) | UG | IEC 61850 `ZBAT.SoH` |
| `temperature` | number | °C | No | Battery cell or pack temperature | UG | IEC 61850 `STMP.Tmp` |
| `voltage` | number | V | No | Terminal voltage | UG | IEC 61850 `MMXU.PhV` |
| `current` | number | A | No | Terminal current (positive = charging) | UG | IEC 61850 `MMXU.A` |
| `cycleCount` | number | - | No | Full equivalent cycle count (degradation metric) | UG | IEC 61850 `ZBAT.NumCyc` |

### Relationships

| Relationship | Target | Cardinality | Description |
|-------------|--------|-------------|-------------|
| `extends` | Asset | 1 to 1 | Registry entry for this battery (identity, ownership, lifecycle) |

### Validation Rules

- `batteryId` must reference an existing `Asset.assetId` with `assetType = battery`.
- `stateOfCharge` must be in range [0, 100] when present.
- `stateOfHealth` must be in range [0, 100] when present.
- `temperature` is expected in the range [-40, 80] °C for lithium-ion cells; values outside this range should trigger an alert.
- `chargePower` and `dischargePower` must be non-negative.

### DLMS-COSEM Mapping

For batteries measured via smart meters or DLMS-enabled inverters:

| Attribute | DLMS-COSEM Object |
|-----------|------------------|
| `chargeEnergy` | `1.0.1.8.0.255` (Import active energy, Total) |
| `dischargeEnergy` | `1.0.2.8.0.255` (Export active energy, Total) |
| `stateOfCharge` | Manufacturer-specific register |

### Notes

- The distinction between `chargePower` and `dischargePower` as separate attributes (HSLU convention) vs. a single signed `power` value is a known divergence. The HSLU representation is adopted here for clarity; consuming services must handle the sign convention accordingly.
- `cycleCount` is a long-term degradation metric. It is expected to be updated infrequently (daily or weekly) rather than in real-time.
- BESS units present at INTELLIGENT pilot sites include a 70 kWh district-level BESS and two residential BESS units (24.5 kWh combined) at the LIC pilot (Switzerland).
