# Assets Domain: BatteryUnit

---

## int:BatteryUnit

**IRI:** `int:BatteryUnit`
**Subclass of:** `int:Asset`, `cim:BatteryUnit`
**Standard mapping:** `cim:BatteryUnit`, `IEC 61850 ZBAT`

A battery energy storage system (BESS). Inherits all properties of `int:Asset`. Carries static capacity and technology parameters as datatype properties. Dynamic measurements (instantaneous power, voltage, current, temperature) are expressed as `sosa:Observation` instances. Dynamic state values (operating state, state of charge, state of health) are expressed in `int:AssetState`.

### Datatype Properties

| Property | IRI | Range | Description |
|----------|-----|-------|-------------|
| maxChargePower | `cim:maxChargePower` | `xsd:float` | Maximum charge power rating in watts. Maps to `ZBAT.MaxChaRte`. |
| maxDischargePower | `cim:maxDischargePower` | `xsd:float` | Maximum discharge power rating in watts. Maps to `ZBAT.MaxDsRte`. |
| ratedEnergy | `cim:ratedE` | `xsd:float` | Nominal energy storage capacity in kilowatt-hours (manufacturer datasheet value). Maps to `cim:BatteryUnit.ratedE`. |
| minStateOfCharge | `int:minStateOfCharge` | `xsd:float` | Minimum allowable state of charge as a percentage (0–100). |
| maxStateOfCharge | `int:maxStateOfCharge` | `xsd:float` | Maximum allowable state of charge as a percentage (0–100). |
| batteryTechnology | `int:batteryTechnology` | `owl:oneOf` | Battery cell chemistry or technology type. |

### Object Properties

| Property | IRI | Range | Cardinality | Description |
|----------|-----|-------|-------------|-------------|
| hasState | `int:hasState` | `int:AssetState` | `owl:maxCardinality 1` | Inherited from `int:Asset`. State includes `batteryState`, `stateOfCharge`, `stateOfHealth`, `storedEnergy`. |

### Enumeration Values

#### int:batteryTechnology

| Value | Description |
|-------|-------------|
| `Li-Ion` | Lithium-ion. |
| `LiFePO4` | Lithium iron phosphate (LFP). |
| `NaNiCl2` | Sodium nickel chloride (ZEBRA). |
| `LeadAcid` | Lead-acid. |
| `FlowBattery` | Flow battery (e.g. vanadium redox). |
| `NiMH` | Nickel-metal hydride. |
| `Other` | Other battery technology. |

---

## AssetState fields applicable to int:BatteryUnit

The following fields are present on `int:AssetState` instances where `isAssetStateOf` references a `BatteryUnit`.

| Property | IRI | Range | Description |
|----------|-----|-------|-------------|
| batteryState | `cim:batteryState` | `owl:oneOf` | Current battery operating state per `cim:BatteryStateKind`. |
| storedEnergy | `cim:storedE` | `xsd:float` | Energy currently stored in kilowatt-hours. Distinct from `ratedEnergy` and `stateOfCharge`. |
| stateOfCharge | `int:stateOfCharge` | `xsd:float` | State of charge as a percentage (0–100). Maps to `ZBAT.SoC`. |
| stateOfHealth | `int:stateOfHealth` | `xsd:float` | State of health as a percentage (0–100). Maps to `ZBAT.SoH`. |

### Enumeration Values for cim:batteryState

| Value | Description |
|-------|-------------|
| `chargingStored` | Stored energy is increasing. |
| `discharging` | Stored energy is decreasing. |
| `waiting` | Neither charging nor discharging; ready to do so. |
| `full` | Unable to charge; not discharging. |
| `empty` | Unable to discharge; not charging. |
| `unknown` | Battery state cannot be determined. |

---

## AssetMeasurement fields applicable to int:BatteryUnit

The following `observedProperty` named individuals apply when the `featureOfInterest` of a `sosa:Observation` is a `BatteryUnit`.

| Observable Property | IRI | Unit | Description |
|--------------------|-----|------|-------------|
| Power | `int:Power` | W | Instantaneous battery power (signed; positive = charging). |
| ChargePower | `int:ChargePower` | W | Instantaneous power flowing into the battery. |
| DischargePower | `int:DischargePower` | W | Instantaneous power flowing out of the battery. |
| ChargeEnergy | `int:ChargeEnergy` | kWh | Cumulative energy charged into the battery. |
| DischargeEnergy | `int:DischargeEnergy` | kWh | Cumulative energy discharged from the battery. |
| Temperature | `int:Temperature` | °C | Battery cell or pack temperature. |
| Voltage | `int:Voltage` | V | Battery terminal voltage. |
| Current | `int:Current` | A | Battery terminal current. |
