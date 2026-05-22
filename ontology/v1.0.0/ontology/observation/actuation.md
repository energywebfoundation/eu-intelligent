# Observation Domain: Command, ActuatableProperty

---

## int:Command

**IRI:** `int:Command`

**Subclass of:** `owl:Thing`

**Standard mapping:** `sosa:Actuation`, `IEC 61850 GGIO`

A control signal issued to a controllable asset (`int:Asset` where `isControllable = true`). The `Command` class mirrors the `sosa:Observation` pattern: `commandType` points to an `int:ActuatableProperty` named individual identifying what aspect of the asset is being commanded, and `commandValue` carries the setpoint value. This replaces the former flat `ControlAssetCommand` class, which carried one field per controllable property type.

### Datatype Properties

| Property | IRI | Range | Description |
|----------|-----|-------|-------------|
| commandValue | `int:commandValue` | `xsd:float` | Numeric value of the command setpoint. Interpretation depends on `commandType` (e.g. watts for `PowerSetpoint`, degrees Celsius for `TemperatureSetpoint`, 0–1 for `FractionalSetpoint`). |
| on | `int:on` | `xsd:boolean` | On/off state command. Used when `commandType = OnOffState`. |
| validFrom | `int:validFrom` | `xsd:dateTime` | Timestamp from which this command is valid. ISO 8601 with timezone. |
| controlMode | `int:controlMode` | `owl:oneOf` | Operating mode context for this command. |

### Object Properties

| Property | IRI | Range | Cardinality | Description |
|----------|-----|-------|-------------|-------------|
| hasActuatableProperty | `sosa:actsOnProperty` | [`sosa:ActuatableProperty`](#sosaactuatableProperty) | `owl:exactly 1` | The actuatable property this command targets. Must be an instance from the named individual vocabulary. |
| targetsAsset | `int:targetsAsset` | [`int:Asset`](../assets/asset.md#intasset) | `owl:exactly 1` | The asset receiving this command. Must have `isControllable = true`. |

### Enumeration Values

#### int:controlMode

| Value | Description |
|-------|-------------|
| `Auto` | FOS automated control; setpoint from this command applies. |
| `Manual` | Manual override; FOS setpoints are ignored. |
| `Off` | Asset disabled. Equivalent to `on = false`. |
| `Eco` | Economy mode; FOS targets minimum energy consumption. |

---

## sosa:ActuatableProperty

**IRI:** `sosa:ActuatableProperty`

**Standard mapping:** `sosa:ActuatableProperty`, `ssn:Property`

An actuatable property is a quality of a feature of interest that can be controlled by issuing a command. In the INTELLIGENT ontology, actuatable properties are represented as `owl:NamedIndividual` instances of `sosa:ActuatableProperty`. The vocabulary below covers all command types required by the FOS trading module (TUM, D4.4).

## Named Individuals

| Individual | IRI | Unit | Description | Standard Mapping |
|-----------|-----|------|-------------|-----------------|
| PowerSetpoint | `int:PowerSetpoint` | W (kW) | Desired active power output or consumption in kilowatts. Positive = generation/discharge; negative = consumption/charge. | `IEC 61850 GGIO.AnOut` |
| FractionalSetpoint | `int:FractionalSetpoint` | 0–1 | Fractional setpoint as a proportion of the asset's rated capacity (e.g. 0.5 = 50% of `nominalPower`). Alternative to `PowerSetpoint`. | `IEC 61850 GGIO.AnOut` |
| OnOffState | `int:OnOffState` | boolean | Binary on/off control. Used with `int:Command.on`. | `IEC 61850 SPCSO.Oper` |
| HeatSetpoint | `int:HeatSetpoint` | °C | Heating temperature setpoint in degrees Celsius. Applicable to `HeatPump`. | `IEC 61850 STMP.Tmp` |
| CoolSetpoint | `int:CoolSetpoint` | °C | Cooling temperature setpoint in degrees Celsius. Applicable to `HeatPump`. | `IEC 61850 STMP.Tmp` |
| WaterHeaterSetpoint | `int:WaterHeaterSetpoint` | °C | Domestic hot water temperature setpoint in degrees Celsius. Applicable to `HeatPump` and `ElectricBoiler`. | `IEC 61850 STMP.Tmp` |
