# Optimisation: GridParameter, GridTopology, FeederPara, TransfPara

## Overview

This module defines the grid topology and electrical parameter classes used for network-aware market operations in the GSY DEX. These classes are specified by GSY and UoC.

**Status: Pending full specification.** All four classes are present in the ER diagram but have no attributes defined. This file documents the expected content based on IEC 61850 and CIM standards, pending partner input. See ADR-010.

**Partners:** GSY, UoC

---

## GridParameter

**Contributing partners:** GSY, UoC
**Standard mappings:** CIM `OperationalLimitSet`, `BaseVoltage`
**Status:** Placeholder - attributes TBD by GSY/UoC

A container entity for all grid electrical parameters associated with a community or pilot site. Acts as the parent record linking `FeederPara`, `TransfPara`, and `GridTopology` records.

### Attributes

| Attribute | Type | Required | Description | Notes |
|-----------|------|----------|-------------|-------|
| TBD | - | - | - | Awaiting GSY/UoC input (ADR-010) |

### Relationships

| Relationship | Target | Cardinality | Description |
|-------------|--------|-------------|-------------|
| `records` | FeederPara | 1 to many | Feeder electrical parameters |
| `records` | TransfPara | 1 to many | Transformer electrical parameters |
| `records` | GridTopology | 1 to many | Grid topology records |

### Expected Attributes (from CIM / IEC 61850)

Based on CIM and IEC 61850 standards, the following attributes are anticipated pending formal specification:

| Expected Attribute | Type | Unit | CIM Mapping | IEC 61850 Mapping |
|-------------------|------|------|-------------|------------------|
| `gridParameterId` | UUID | - | `IdentifiedObject.mRID` | - |
| `communityId` | UUID | - | `IdentifiedObject.mRID` | - |
| `baseVoltage` | number | kV | `BaseVoltage.nominalVoltage` | `ZVVR.VVal` |
| `validFrom` | timestamp | - | OGC Time | - |

---

## FeederPara

**Contributing partners:** GSY, UoC
**Standard mappings:** CIM `ACLineSegment`, IEC 61850 `ZLIN` (line impedance logical node)
**Status:** Placeholder - attributes TBD by GSY/UoC

Electrical parameters for a distribution feeder. Used by the GSY DEX to apply network constraints during market clearing, ensuring trades do not violate feeder capacity limits.

### Attributes

| Attribute | Type | Required | Description | Notes |
|-----------|------|----------|-------------|-------|
| TBD | - | - | - | Awaiting GSY/UoC input (ADR-010) |

### Expected Attributes (from CIM `ACLineSegment`)

| Expected Attribute | Type | Unit | CIM Mapping | IEC 61850 Mapping |
|-------------------|------|------|-------------|------------------|
| `feederParaId` | UUID | - | `IdentifiedObject.mRID` | - |
| `gridParameterId` | UUID | - | FK to GridParameter | - |
| `resistance` | number | Ohm/km | `ACLineSegment.r` | `ZLIN.Res` |
| `reactance` | number | Ohm/km | `ACLineSegment.x` | `ZLIN.Rct` |
| `susceptance` | number | S/km | `ACLineSegment.bch` | - |
| `ratedCurrent` | number | A | `CurrentLimit.value` | `XCBR.Amp` |
| `length` | number | km | `Conductor.length` | - |
| `name` | string | - | `IdentifiedObject.name` | - |

---

## TransfPara

**Contributing partners:** GSY, UoC
**Standard mappings:** CIM `PowerTransformer`, `TransformerEnd`, IEC 61850 `ZTCN` (transformer logical node), `YLTC` (tap changer)
**Status:** Placeholder - attributes TBD by GSY/UoC

Electrical parameters for a distribution transformer. Supports network-aware market operations by providing capacity and impedance data.

### Attributes

| Attribute | Type | Required | Description | Notes |
|-----------|------|----------|-------------|-------|
| TBD | - | - | - | Awaiting GSY/UoC input (ADR-010) |

### Expected Attributes (from CIM `PowerTransformer`)

| Expected Attribute | Type | Unit | CIM Mapping | IEC 61850 Mapping |
|-------------------|------|------|-------------|------------------|
| `transfParaId` | UUID | - | `IdentifiedObject.mRID` | - |
| `gridParameterId` | UUID | - | FK to GridParameter | - |
| `ratedPower` | number | kVA | `TransformerEnd.ratedS` | `ZTCN.VARtg` |
| `primaryVoltage` | number | kV | `TransformerEnd.ratedU` (primary) | `ZTCN.VHiRtg` |
| `secondaryVoltage` | number | kV | `TransformerEnd.ratedU` (secondary) | `ZTCN.VLoRtg` |
| `impedance` | number | % | `TransformerEnd.r` + `.x` | `ZTCN.Imp` |
| `tapChangerPosition` | number | - | `TapChanger.step` | `YLTC.TapPos` |
| `name` | string | - | `IdentifiedObject.name` | - |

---

## GridTopology

**Contributing partners:** GSY, UoC
**Standard mappings:** CIM `Topology`, `ConnectivityNode`, `TopologicalNode`, IEC 61850 `LPHD`
**Status:** Placeholder - attributes TBD by GSY/UoC

Describes the connectivity structure of the local grid. Used by the GSY DEX to build the network graph for constraint-aware market operations.

### Attributes

| Attribute | Type | Required | Description | Notes |
|-----------|------|----------|-------------|-------|
| TBD | - | - | - | Awaiting GSY/UoC input (ADR-010) |

### Expected Attributes (from CIM Topology)

| Expected Attribute | Type | CIM Mapping | Notes |
|-------------------|------|-------------|-------|
| `gridTopologyId` | UUID | `IdentifiedObject.mRID` | |
| `gridParameterId` | UUID | FK to GridParameter | |
| `nodes` | Node[] | `ConnectivityNode` | List of electrical nodes |
| `branches` | Branch[] | `ACLineSegment` / `PowerTransformer` | List of network branches with from/to nodes |
| `version` | string | - | Topology version for change management |
| `validFrom` | timestamp | OGC Time `hasBeginning` | Topology validity start |

---

## Action Required

All four classes in this module require attribute specification from GSY and UoC. A GitHub Issue should be raised for ADR-010 and assigned to the relevant partners with a target completion date aligned to the D3.4 (Grid Operator API) milestone.
