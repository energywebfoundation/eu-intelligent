# Assets: Asset, AssetStatus, AssetState

## Overview

This module defines the core asset identity and status entities. `Asset` is the canonical registry entry for any energy device in the INTELLIGENT platform. `AssetStatus` captures operational health. `AssetState` (TUM) captures a real-time physical state snapshot used by the FOS optimisation module.

**Partners:** R2M (Asset, AssetStatus), TUM (Asset.assetParam, AssetState)

---

## Asset

**Contributing partners:** R2M, TUM
**Standard mappings:** CIM `Equipment`, SAREF `Device`, SEAS `System`

The canonical identity and lifecycle record for an energy asset. Every physical device (battery, PV system, EV charger, etc.) has exactly one `Asset` record as its registry entry. Device-specific measurement attributes are held in specialised classes (`Battery`, `PvSystem`, etc.) linked by `assetId`.

### Attributes

| Attribute | Type | Required | Description | Contributing Partner | Standard Mapping |
|-----------|------|----------|-------------|---------------------|-----------------|
| `assetId` | UUID | Yes | Unique identifier | R2M, TUM | CIM `IdentifiedObject.mRID` |
| `memberId` | UUID | Yes | Owner (Member) reference | R2M | CIM `IdentifiedObject.mRID` |
| `siteId` | UUID | Yes | Site location reference | R2M | CIM `IdentifiedObject.mRID` |
| `name` | string | Yes | Human-readable asset name | R2M | CIM `IdentifiedObject.name` |
| `assetType` | string | Yes | Device type discriminator | R2M, TUM | CIM `Equipment.type`, SAREF `Device.type` |
| `validFrom` | timestamp | Yes | Start of asset registration validity | R2M | OGC Time `hasBeginning` |
| `validUntil` | timestamp | No | End of asset registration validity (null = active) | R2M | OGC Time `hasEnd` |
| `isControlled` | bool | Yes | Whether FOS/TUM can send control signals to this asset | R2M | SAREF `isControlledByDevice` |
| `category` | string | No | Grouping category for UI / aggregation | R2M | CIM `EquipmentContainer` |
| `assetParam` | TBD | No | TUM-specific extended technical parameters | TUM | TBD (see ADR-011) |

### `assetType` Enumeration

| Value | Device Class | Description |
|-------|-------------|-------------|
| `battery` | Battery | Battery energy storage system |
| `pv_system` | PvSystem | Photovoltaic generation system |
| `grid` | Grid | Grid connection point |
| `load` | Load | Generic electrical load |
| `ev_charging_station` | EVChargingStation | Electric vehicle charger |
| `hydro_power_plant` | HydroPowerPlant | Hydroelectric generation |
| `grid_building` | GridBuilding | Building-level grid aggregate |

### Relationships

| Relationship | Target | Cardinality | Description |
|-------------|--------|-------------|-------------|
| `owned by` | Member | many to 1 | Member who owns this asset |
| `located in` | Site | many to 1 | Physical site |
| `governed by` | Pilot | many to 1 | TUM pilot scope |
| `has` | AssetStatus | many to 1 | Current operational health |
| `has` | AssetState | 1 to 1 | Current physical state snapshot (TUM) |
| `has` | Production | 1 to many | Production measurement records |
| `has` | Consumption | 1 to many | Consumption measurement records |
| `records` | ControlAssetCommand | 1 to many | Commands sent to this asset |

### Validation Rules

- `assetId` must be a valid RFC 4122 UUID.
- `memberId` must reference an existing `Member.memberId`.
- `siteId` must reference an existing `Site.siteId`.
- `assetType` must be one of the enumerated values above.
- `validFrom` must be before `validUntil` if `validUntil` is set.

### Open Questions

- ADR-004: Whether device classes (`Battery`, `PvSystem`, etc.) should be explicit subtypes or remain as associated measurement classes.
- ADR-011: `assetParam` structure (TUM action).

---

## AssetStatus

**Contributing partners:** R2M
**Standard mappings:** IEC 61850 `LLN0.Health`, CIM `OperationalLimitSet`

An operational health record for an asset. Captures whether the asset is functional and any fault or warning codes. Updated by the asset management system as devices report their condition.

### Attributes

| Attribute | Type | Required | Description | Standard Mapping |
|-----------|------|----------|-------------|-----------------|
| `assetStatusId` | UUID | Yes | Unique identifier | CIM `IdentifiedObject.mRID` |
| `assetId` | UUID | Yes | Asset this status belongs to | CIM `IdentifiedObject.mRID` |
| `code` | string | Yes | Status / fault code | IEC 61850 `Health.stVal` |
| `message` | string | No | Human-readable status message | IEC 61850 `Beh` (Behaviour) |
| `isHealthy` | bool | Yes | Derived boolean: true if the asset is fully operational | IEC 61850 `Health.stVal` |

### `code` Values (Recommended)

Aligned with IEC 61850 `Health` data object values:

| Code | `isHealthy` | Meaning |
|------|-------------|---------|
| `Ok` | true | Asset is fully operational |
| `Warning` | false | Non-critical issue; asset may operate with limitations |
| `Alarm` | false | Critical fault; asset is degraded or offline |
| `Unknown` | false | Status cannot be determined |

### Relationships

| Relationship | Target | Cardinality | Description |
|-------------|--------|-------------|-------------|
| `belongs to` | Asset | many to 1 | The asset this status describes |

### Validation Rules

- `assetStatusId` must be a valid RFC 4122 UUID.
- `assetId` must reference an existing `Asset.assetId`.
- `isHealthy` must be consistent with `code` (e.g. `isHealthy=true` only when `code=Ok`).

### Open Questions

- ADR-003: Relationship to `AssetState` — these are distinct classes with distinct purposes; the ER diagram's "the same?" annotation is recommended to be resolved as "no, they are different".

---

## AssetState

**Contributing partners:** TUM
**Standard mappings:** IEC 61850 logical node data objects, SEAS `Evaluation`

A time-series snapshot of the physical state of an asset at a given point in time. Used by the FOS optimisation module (TUM) to build a real-time picture of community-wide energy state for scheduling and control decisions.

`AssetState` is distinct from `AssetStatus`: `AssetStatus` models operational health; `AssetState` models physical measured quantities.

### Attributes

| Attribute | Type | Unit | Required | Description | Standard Mapping |
|-----------|------|------|----------|-------------|-----------------|
| `assetId` | UUID | - | Yes | Asset reference | CIM `IdentifiedObject.mRID` |
| `assetType` | string | - | Yes | Asset type (mirrors `Asset.assetType`) | CIM `Equipment.type` |
| `soeBESkwh` | number | kWh | No | State of energy, battery energy storage | IEC 61850 `ZBAT.Wh` |
| `socBES` | number | 0-1 | No | State of charge, battery energy storage | IEC 61850 `ZBAT.SoC` |
| `soeEVkwh` | number | kWh | No | State of energy, EV battery | IEC 61850 `ZBAT.Wh` (EV) |
| `socEV` | number | 0-1 | No | State of charge, EV battery | IEC 61850 `ZBAT.SoC` (EV) |
| `avgPvPower` | number | kW | No | Average PV active power over last interval | IEC 61850 `MMXU.W` |
| `avgBES` | number | kW | No | Average BESS active power (positive=discharge) | IEC 61850 `MMXU.W` |
| `avgEV` | number | kW | No | Average EV charging power | IEC 61850 `MMXU.W` |
| `tDwhC` | number | °C | No | Domestic hot water temperature | IEC 61850 `STMP.Tmp` |
| `avgHpPower` | number | kW | No | Average heat pump power | IEC 61850 `MMXU.W` |
| `avgWhPower` | number | kW | No | Average water heater power | IEC 61850 `MMXU.W` |

### Relationships

| Relationship | Target | Cardinality | Description |
|-------------|--------|-------------|-------------|
| `belongs to` | Asset | 1 to 1 | The asset this state describes |

### Validation Rules

- `socBES` and `socEV`, when present, must be in range [0, 1].
- `tDwhC` and `avgHpPower` are only meaningful when the asset is a heat pump or water heater.
- Null/absent fields indicate the measurement is not available for that asset type (e.g. `soeBESkwh` is irrelevant for a PV system).

### Open Questions

- ADR-003: The ER diagram annotates `AssetState ||--|| AssetStatus : "the same?"`. These are confirmed as distinct; the annotation should be resolved.
- ADR-004: Whether `AssetState` should be a subtype of `Asset` or remain a separate associated class.
