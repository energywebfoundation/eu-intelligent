# Assets: Load, EVChargingStation, HydroPowerPlant

## Overview

This module defines three additional asset measurement classes: generic electrical loads, EV charging stations, and hydroelectric generation. Each is a companion class to `Asset`.

---

## Load

**Contributing partners:** UG (University of Galway)
**Standard mappings:** CIM `EnergyConsumer`, IEC 61850 `MMXU`, SAREF4ENER `ElectricalLoad`
**Relationship to Asset:** Companion class linked by `loadId` = `Asset.assetId`. See ADR-004.

A generic measured electrical load. Used where a consuming device is monitored but does not fall into a more specific category (heat pump, water heater, etc.).

### Attributes

| Attribute | Type | Unit | Required | Description | Standard Mapping |
|-----------|------|------|----------|-------------|-----------------|
| `loadId` | UUID | - | Yes | Unique identifier; matches `Asset.assetId` | CIM `IdentifiedObject.mRID` |
| `power` | number | kW | No | Instantaneous active power demand | IEC 61850 `MMXU.W` |
| `current` | number | A | No | RMS current | IEC 61850 `MMXU.A` |
| `voltage` | number | V | No | Voltage at load terminals | IEC 61850 `MMXU.PhV` |
| `frequency` | number | Hz | No | Supply frequency | IEC 61850 `MMXU.Hz` |

### Relationships

| Relationship | Target | Cardinality | Description |
|-------------|--------|-------------|-------------|
| `extends` | Asset | 1 to 1 | Registry entry for this load |

### Validation Rules

- `loadId` must reference an existing `Asset.assetId` with `assetType = load`.
- `power` must be non-negative (loads consume energy).
- `frequency` expected in range [47.5, 52.5] Hz for European grids.

### Notes

- The LIC pilot has 19 measured loads (consumers). These are the primary `Load` instances in the current INTELLIGENT deployment.

---

## EVChargingStation

**Contributing partners:** HSLU (Hochschule Luzern)
**Standard mappings:** CIM `PowerElectronicsUnit`, OCPP (Open Charge Point Protocol), OCN 2.0 (Open Charge Network)
**Relationship to Asset:** Companion class linked by `evChargingStationId` = `Asset.assetId`. See ADR-004.

An electric vehicle charging point. EWDS includes OCN 2.0 (Open Charge Network) integration for EV network communication, developed as part of T3.1.

### Attributes

| Attribute | Type | Unit | Required | Description | Standard Mapping |
|-----------|------|------|----------|-------------|-----------------|
| `evChargingStationId` | UUID | - | Yes | Unique identifier; matches `Asset.assetId` | CIM `IdentifiedObject.mRID` |
| `power` | number | kW | No | Instantaneous active charging power | IEC 61850 `MMXU.W` |

### Relationships

| Relationship | Target | Cardinality | Description |
|-------------|--------|-------------|-------------|
| `extends` | Asset | 1 to 1 | Registry entry for this EV charging station |

### Validation Rules

- `evChargingStationId` must reference an existing `Asset.assetId` with `assetType = ev_charging_station`.
- `power` must be non-negative.

### Notes

- The LIC pilot (Switzerland) has 2 EV chargers rated at 11 kW each.
- OCPP is the communication standard used between EVSE (Electric Vehicle Supply Equipment) and charge point management systems. EWDS integrates via OCN 2.0.
- Extended attributes (session energy, connector status, OCPP transaction ID) are expected to be specified in a future ontology version as OCN 2.0 integration matures.

---

## HydroPowerPlant

**Contributing partners:** HSLU (Hochschule Luzern)
**Standard mappings:** CIM `HydroGeneratingUnit`, IEC 61850 `MMXU`
**Relationship to Asset:** Companion class linked by `hydroPowerPlantId` = `Asset.assetId`. See ADR-004.

A hydroelectric generation unit. Present at the HSLU Lucerne pilot site.

### Attributes

| Attribute | Type | Unit | Required | Description | Standard Mapping |
|-----------|------|------|----------|-------------|-----------------|
| `hydroPowerPlantId` | UUID | - | Yes | Unique identifier; matches `Asset.assetId` | CIM `IdentifiedObject.mRID` |
| `power` | number | kW | No | Instantaneous active power output | IEC 61850 `MMXU.W` |

### Relationships

| Relationship | Target | Cardinality | Description |
|-------------|--------|-------------|-------------|
| `extends` | Asset | 1 to 1 | Registry entry for this hydro plant |

### Validation Rules

- `hydroPowerPlantId` must reference an existing `Asset.assetId` with `assetType = hydro_power_plant`.
- `power` must be non-negative (generation only).

### Notes

- Further attributes (head, flow rate, efficiency, turbine type) are standard CIM `HydroGeneratingUnit` fields and may be added in a future version if HSLU requires them for FOS modelling.
