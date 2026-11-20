# Assets Domain: HeatPump, ElectricBoiler

---

## int:HeatPump

**IRI:** `int:HeatPump`

**Subclass of:** [`int:Asset`](asset.md#intasset)

**Standard mapping:** `int:HeatPump` (project-specific; no direct CIM equivalent)

A heat pump asset (air source, ground source, or water source). Inherits all properties of `int:Asset`. Used for space heating, cooling, and domestic hot water production. Present at LIC (Switzerland) and Aran Islands (Ireland) pilot sites.

### Datatype Properties

| Property | IRI | Range | Description |
|----------|-----|-------|-------------|
| heatSourceType | `int:heatSourceType` | `owl:oneOf` | Heat source type of the heat pump. |
| operatingMode | `int:operatingMode` | `owl:oneOf` | Heating and cooling capability of the heat pump. |
| maxPowerRating | `cim:maxP` | `xsd:float` | Maximum rated electrical power input in watts. |
| thermalStorageVolume | `int:thermalStorageVolume` | `xsd:float` | Volume of associated thermal storage tank in litres, if applicable. |

### Object Properties

| Property | IRI | Range | Cardinality | Description |
|----------|-----|-------|-------------|-------------|
| hasState | `int:hasState` | [`int:AssetState`](asset.md#intassetstate) | `owl:maxCardinality 1` | Inherited from `int:Asset`. State includes `dhwEnabled`. |

### Enumeration Values

#### int:heatSourceType

| Value | Description |
|-------|-------------|
| `AirSource` | Air source heat pump (ASHP). Most common type in INTELLIGENT pilots. |
| `GroundSource` | Ground source heat pump (GSHP). |
| `WaterSource` | Water source heat pump (WSHP). |

#### int:operatingMode

| Value | Description |
|-------|-------------|
| `HeatingOnly` | Heat pump configured for heating only. |
| `CoolingOnly` | Heat pump configured for cooling only. |
| `HeatingAndCooling` | Heat pump supports both heating and cooling. |

---

## AssetState fields applicable to int:HeatPump

| Property | IRI | Range | Description |
|----------|-----|-------|-------------|
| dhwEnabled | `int:hasDhw` | `xsd:boolean` | True if the heat pump is currently used for domestic hot water production. |

---

## AssetMeasurement fields applicable to int:HeatPump

| Observable Property | IRI | Unit | Description |
|--------------------|-----|------|-------------|
| Power | `int:Power` | W | Instantaneous electrical power consumption in watts. |
| SupplyTemperature | `int:SupplyTemperature` | °C | Hot water supply temperature in degrees Celsius. |
| ReturnTemperature | `int:ReturnTemperature` | °C | Return water temperature in degrees Celsius. |
| CumulativeEnergyConsumed | `int:CumulativeEnergyConsumed` | Wh | Cumulative electrical energy consumed in watt-hours. |

---

## int:ElectricBoiler

**IRI:** `int:ElectricBoiler`

**Subclass of:** [`int:Asset`](asset.md#intasset)

**Standard mapping:** `int:ElectricBoiler` (project-specific; no direct CIM equivalent)

An electric water heating boiler for domestic hot water (DHW) production. Inherits all properties of `int:Asset`. Present at LIC (Switzerland) and Greenvolt (Portugal) pilot sites.

### Datatype Properties

| Property | IRI | Range | Description |
|----------|-----|-------|-------------|
| storageVolume | `int:storageVolume` | `xsd:float` | Hot water storage tank volume in litres. |
| maxPowerRating | `cim:maxP` | `xsd:float` | Maximum rated electrical power in watts. |

---

## AssetMeasurement fields applicable to int:ElectricBoiler

| Observable Property | IRI | Unit | Description |
|--------------------|-----|------|-------------|
| Power | `int:Power` | W | Instantaneous electrical power consumption in watts. |
| DHWTemperature | `int:DHWTemperature` | °C | Domestic hot water temperature in degrees Celsius. Corresponds to `tDwhC` in TUM's original AssetState specification. |
| CumulativeEnergyConsumed | `int:CumulativeEnergyConsumed` | Wh | Cumulative electrical energy consumed in watt-hours. |
