# Assets Domain: EVChargingStation

---

## int:EVChargingStation

**IRI:** `int:EVChargingStation`
**Subclass of:** `int:Asset`
**Standard mapping:** `int:EVChargingStation`, `cim:PowerElectronicsUnit`, OCPP `ChargingStation`

An electric vehicle charging station. Inherits all properties of `int:Asset`. Supports grid-to-vehicle (G2V) charging and optionally vehicle-to-grid (V2G) discharge. Present at LIC (Switzerland) and CELL (Switzerland) pilot sites.

### Datatype Properties

| Property | IRI | Range | Description |
|----------|-----|-------|-------------|
| maxChargePower | `cim:maxChargePower` | `xsd:float` | Maximum charge power in watts. |
| maxDischargePower | `cim:maxDischargePower` | `xsd:float` | Maximum discharge power in watts (V2G capable units only). |
| powerFlowCapability | `int:powerFlowCapability` | `owl:oneOf` | Whether the station supports G2V only or also V2G. |
| connectorStandard | `int:connectorStandard` | `owl:oneOf` | Physical connector standard. |
| chargingMode | `int:chargingMode` | `owl:oneOf` | AC or DC charging mode. |
| numberOfConnectors | `int:numberOfConnectors` | `xsd:integer` | Number of physical connector outlets. |

### Object Properties

| Property | IRI | Range | Cardinality | Description |
|----------|-----|-------|-------------|-------------|
| hasState | `int:hasState` | `int:AssetState` | `owl:maxCardinality 1` | Inherited from `int:Asset`. State includes `evConnected` and `stateOfCharge`. |

### Enumeration Values

#### int:powerFlowCapability

| Value | Description |
|-------|-------------|
| `G2V` | Grid-to-vehicle only. |
| `V2G` | Bidirectional vehicle-to-grid capable. |

#### int:connectorStandard

| Value | Description |
|-------|-------------|
| `Type2` | IEC 62196 Type 2 (Mennekes) AC connector. |
| `CCS` | Combined Charging System CCS1. |
| `CHAdeMO` | CHAdeMO DC fast charge connector. |
| `CCS2` | Combined Charging System Type 2 (CCS2). EU standard. |

#### int:chargingMode

| Value | Description |
|-------|-------------|
| `AC` | Alternating current charging. |
| `DC` | Direct current fast charging. |

---

## AssetState fields applicable to int:EVChargingStation

| Property | IRI | Range | Description |
|----------|-----|-------|-------------|
| evConnected | `int:evConnected` | `xsd:boolean` | True if an EV is currently physically connected. |
| stateOfCharge | `int:stateOfCharge` | `xsd:float` | State of charge of the connected EV battery as a percentage (0–100). |

---

## AssetMeasurement fields applicable to int:EVChargingStation

| Observable Property | IRI | Unit | Description |
|--------------------|-----|------|-------------|
| Power | `int:Power` | W | Instantaneous power in watts. Positive = G2V, negative = V2G. |
| ImportEnergy | `int:ImportEnergy` | Wh | Cumulative energy delivered to EVs in watt-hours. |
| ExportEnergy | `int:ExportEnergy` | Wh | Cumulative energy returned via V2G in watt-hours. |
| Voltage | `int:Voltage` | V | Phase voltage at the station connection point. |
| Current | `int:Current` | A | Current at the station connection point. |
| Frequency | `int:Frequency` | Hz | AC supply frequency. |
| ActivePower | `int:ActivePower` | W | Per-phase active power. |
| ApparentPower | `int:ApparentPower` | VA | Per-phase apparent power. |
| PowerFactor | `int:PowerFactor` | — | Per-phase power factor. |
