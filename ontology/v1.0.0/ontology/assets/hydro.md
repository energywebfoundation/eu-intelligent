# Assets Domain: HydroGeneratingUnit

---

## int:HydroGeneratingUnit

**IRI:** `int:HydroGeneratingUnit`
**Subclass of:** `int:Asset`, `cim:HydroGeneratingUnit`
**Standard mapping:** `cim:HydroGeneratingUnit`, `IEC 62256:2017`

A small hydroelectric generation unit. Inherits all properties of `int:Asset`. Present at the CELL pilot site (Lucerne, Switzerland, lead: HSLU) with a rated output of 85 kW.

### Datatype Properties

| Property | IRI | Range | Description |
|----------|-----|-------|-------------|
| turbineType | `cim:turbineType` | `owl:oneOf` | Hydraulic turbine classification per IEC 62256:2017. |

### Enumeration Values

#### cim:turbineType

| Value | Description |
|-------|-------------|
| `pelton` | Pelton wheel impulse turbine (high head). |
| `kaplan` | Kaplan propeller reaction turbine (low head, variable pitch). |
| `francis` | Francis mixed-flow reaction turbine (medium head). |
| `bulb` | Bulb (tubular) turbine (very low head). |
| `propeller` | Fixed-pitch propeller turbine. |
| `crossFlow` | Cross-flow (Banki-Michell) turbine. |
| `deriaz` | Deriaz diagonal-flow turbine. |
| `turgo` | Turgo impulse turbine. |

---

## AssetMeasurement fields applicable to int:HydroGeneratingUnit

| Observable Property | IRI | Unit | Description |
|--------------------|-----|------|-------------|
| Power | `int:Power` | W | Instantaneous active power output in watts. |
| EnergyYield | `int:EnergyYield` | kWh | Cumulative or daily hydro energy yield in kilowatt-hours. |
