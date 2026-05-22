# Optimisation: PilotState, AssetState, ControlAssetCommand

## Overview

This module defines the TUM-specified entities for real-time state monitoring and asset control as used by the Flexibility and Optimisation Service (FOS).

**Partners:** TUM

---

## PilotState

**Contributing partners:** TUM
**Standard mappings:** IEC 61850 measurement logical nodes, SAREF4BLDG occupancy, SEAS `Evaluation`

A time-stamped snapshot of aggregate conditions at a pilot site. Used by FOS to build a site-level view for optimisation scheduling decisions. Updated at each FOS control interval (typically 15 minutes).

### Attributes

| Attribute | Type | Unit | Required | Description | Standard Mapping |
|-----------|------|------|----------|-------------|-----------------|
| `pilotId` | UUID | - | Yes | Reference to the Pilot | CIM `IdentifiedObject.mRID` |
| `ts` | timestamp | - | Yes | Observation timestamp | OGC Time `Instant` |
| `tIndoorC` | number | °C | No | Average indoor air temperature across pilot buildings | IEC 61850 `STMP.Tmp` |
| `avgLoad` | number | kW | No | Average aggregate electrical load across the pilot | IEC 61850 `MMXU.W` |
| `avgGrid` | number | kW | No | Average grid exchange power (positive = import) | IEC 61850 `MMXU.W` |
| `occupancy` | bool | - | No | Aggregate building occupancy flag (true = at least one building occupied) | SAREF4BLDG `occupancy` |

### Relationships

| Relationship | Target | Cardinality | Description |
|-------------|--------|-------------|-------------|
| `describes` | Pilot | many to 1 | The pilot site this state snapshot covers |

### Validation Rules

- `pilotId` must reference an existing `Pilot.pilotId`.
- `ts` must not be in the future.
- `tIndoorC` is expected in range [0, 50] °C under normal building operation; values outside this range should be flagged.

---

## AssetState

See [`ontology/assets/asset.md`](../assets/asset.md) for the full `AssetState` definition. It is listed in the assets module because it describes the physical state of an individual `Asset`, but it is also a key input to the FOS optimisation pipeline.

---

## ControlAssetCommand

**Contributing partners:** TUM
**Standard mappings:** IEC 61850 `GGIO` (Generic Process I/O), SAREF `Actuator`, SEAS `Actuator`

A command issued by the FOS optimisation module to a controllable asset. `ControlAssetCommand` records are only generated for assets where `Asset.isControlled = true`. The command specifies the desired operating setpoint for the next control interval.

### Attributes

| Attribute | Type | Unit | Required | Description | Standard Mapping |
|-----------|------|------|----------|-------------|-----------------|
| `assetId` | UUID | - | Yes | Target asset | CIM `IdentifiedObject.mRID` |
| `assetType` | string | - | Yes | Asset type (discriminates which setpoint fields are relevant) | CIM `Equipment.type` |
| `controlMode` | string | - | Yes | Control mode for this command | IEC 61850 `Beh.stVal` |
| `powerSetpointKw` | number | kW | No | Desired active power setpoint | IEC 61850 `GGIO.AnOut` |
| `fracSetpoint` | number | 0-1 | No | Fractional setpoint (alternative to absolute power; e.g. 0.5 = 50% of rated capacity) | IEC 61850 `GGIO.AnOut` |
| `on` | bool | - | No | On/off command (overrides power setpoints when false) | IEC 61850 `SPCSO.Oper` |
| `tempHeatSetpointC` | number | °C | No | Heating temperature setpoint (heat pumps) | IEC 61850 `STMP.Tmp` |
| `tempCoolSetpointC` | number | °C | No | Cooling temperature setpoint (heat pumps, AC) | IEC 61850 `STMP.Tmp` |
| `tempWaterHeaterSetpointC` | number | °C | No | Domestic hot water setpoint (water heaters) | IEC 61850 `STMP.Tmp` |
| `timeStep` | timestamp | - | Yes | Command is valid from this timestamp onwards | OGC Time `Instant` |

### `controlMode` Values

| Value | Description |
|-------|-------------|
| `auto` | FOS automated control; setpoints from this command apply |
| `manual` | Manual override; FOS setpoints are ignored |
| `off` | Asset disabled; equivalent to `on=false` |
| `eco` | Economy mode; FOS targets minimum energy use |

### Relationships

| Relationship | Target | Cardinality | Description |
|-------------|--------|-------------|-------------|
| `targets` | Asset | many to 1 | Asset receiving this command |

### Validation Rules

- `assetId` must reference an existing `Asset.assetId` where `isControlled = true`.
- `assetType` must match `Asset.assetType` for the referenced asset.
- `controlMode` must be one of the enumerated values above.
- `fracSetpoint`, when present, must be in range [0, 1].
- Temperature setpoints are only relevant for thermal assets (`assetType` in `heat_pump`, `water_heater`, `boiler`). They must be within safe operating ranges defined per asset.
- `timeStep` must not be in the past at time of command generation.
- `powerSetpointKw` and `fracSetpoint` should not both be present; use one or the other.

### Notes

- Commands are recorded against the `Asset` entity (`Asset ||--o{ ControlAssetCommand`). This provides a full audit trail of all commands issued to each asset.
- The FOS module communicates commands via EWDS client gateways using the topic-addressed envelope protocol described in D4.4.
- Thermal assets (heat pumps, boilers, water heaters) are present at the LIC pilot: 16 heat pumps (59.8 kW combined) and 14 boilers.
