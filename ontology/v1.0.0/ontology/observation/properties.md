# Observation Domain: ObservableProperty Named Individuals

This file defines the controlled vocabulary of `owl:NamedIndividual` instances of `sosa:ObservableProperty` used in the INTELLIGENT ontology. Every `sosa:Observation` in the platform must have its `observedProperty` set to one of these named individuals.

The vocabulary is derived from the measurement fields defined across all asset type sheets in the working spreadsheet. Each individual is listed with its IRI, physical unit, applicable asset types, and standard mapping.

---

## Electrical Power

| Individual | IRI | Unit | Applicable To | Standard Mapping |
|-----------|-----|------|---------------|-----------------|
| ActivePower | `int:ActivePower` | W | All asset types, MeteringPoint, Feeder | `IEC 61850 MMXU.W` |
| ReactivePower | `int:ReactivePower` | VAr | Grid-connected assets, MeteringPoint, Feeder | `IEC 61850 MMXU.VAr` |
| ApparentPower | `int:ApparentPower` | VA | MeteringPoint (per-phase, AEM) | `IEC 61850 MMXU.VA` |
| Power | `int:Power` | W | BatteryUnit, EnergyConsumer, HeatPump, ElectricBoiler, EVChargingStation, HydroGeneratingUnit | `IEC 61850 MMXU.W` |
| ChargePower | `int:ChargePower` | W | BatteryUnit | `IEC 61850 ZBAT.ChaPwr` |
| DischargePower | `int:DischargePower` | W | BatteryUnit | `IEC 61850 ZBAT.DisPwr` |
| DCPower | `int:DCPower` | kW | PhotovoltaicUnit | `IEC 61850 MMXU.W (DC side)` |
| MPPPower | `int:MPPPower` | kW | PhotovoltaicUnit | — |
| PowerFactor | `int:PowerFactor` | — | MeteringPoint, Feeder, EVChargingStation | `IEC 61850 MMXU.PF` |

## Electrical Energy

| Individual | IRI | Unit | Applicable To | Standard Mapping |
|-----------|-----|------|---------------|-----------------|
| ChargeEnergy | `int:ChargeEnergy` | kWh | BatteryUnit | `IEC 61850 ZBAT.ChaWh` |
| DischargeEnergy | `int:DischargeEnergy` | kWh | BatteryUnit | `IEC 61850 ZBAT.DisWh` |
| EnergyYield | `int:EnergyYield` | kWh | PhotovoltaicUnit, HydroGeneratingUnit | `DLMS-COSEM 1.0.2.8.0.255` |
| MPPEnergy | `int:MPPEnergy` | kWh | PhotovoltaicUnit | — |
| ImportEnergy | `int:ImportEnergy` | Wh | EVChargingStation, MeteringPoint | `DLMS-COSEM 1.0.1.8.0.255` |
| ExportEnergy | `int:ExportEnergy` | Wh | EVChargingStation, MeteringPoint | `DLMS-COSEM 1.0.2.8.0.255` |
| EnergyIn | `int:EnergyIn` | Wh | MeteringPoint, Site, Facility | `DLMS-COSEM 1.0.1.8.0.255` |
| EnergyOut | `int:EnergyOut` | Wh | MeteringPoint, Site, Facility | `DLMS-COSEM 1.0.2.8.0.255` |
| CumulativeEnergyConsumed | `int:CumulativeEnergyConsumed` | Wh | HeatPump, ElectricBoiler | — |

## Voltage, Current, Frequency

| Individual | IRI | Unit | Applicable To | Standard Mapping |
|-----------|-----|------|---------------|-----------------|
| Voltage | `int:Voltage` | V | BatteryUnit, EnergyConsumer, MeteringPoint, Feeder, EVChargingStation | `IEC 61850 MMXU.PhV` |
| DCVoltage | `int:DCVoltage` | V | PhotovoltaicUnit | `IEC 61850 MMXU.PhV (DC)` |
| Current | `int:Current` | A | BatteryUnit, EnergyConsumer, MeteringPoint, Feeder, EVChargingStation | `IEC 61850 MMXU.A` |
| DCCurrent | `int:DCCurrent` | A | PhotovoltaicUnit | `IEC 61850 MMXU.A (DC)` |
| Frequency | `int:Frequency` | Hz | EnergyConsumer, MeteringPoint, Feeder, EVChargingStation | `IEC 61850 MMXU.Hz` |

## Temperature

| Individual | IRI | Unit | Applicable To | Standard Mapping |
|-----------|-----|------|---------------|-----------------|
| Temperature | `int:Temperature` | °C | BatteryUnit | `IEC 61850 STMP.Tmp` |
| SupplyTemperature | `int:SupplyTemperature` | °C | HeatPump | `s4bldg:hasTemperature` |
| ReturnTemperature | `int:ReturnTemperature` | °C | HeatPump | — |
| DHWTemperature | `int:DHWTemperature` | °C | ElectricBoiler, HeatPump | `IEC 61850 STMP.Tmp` |
| IndoorTemperature | `int:IndoorTemperature` | °C | Facility, Site | `seas:temperature`, `s4bldg:hasTemperature` |

## Battery and Storage State

| Individual | IRI | Unit | Applicable To | Standard Mapping |
|-----------|-----|------|---------------|-----------------|
| StateOfCharge | `int:StateOfCharge` | % | BatteryUnit, EVChargingStation | `IEC 61850 ZBAT.SoC` |
| StateOfHealth | `int:StateOfHealth` | % | BatteryUnit | `IEC 61850 ZBAT.SoH` |

## Per-Phase Electrical (Feeder and MeteringPoint)

These named individuals are used primarily by `int:FeederMeasurement` observations (e.g. AEM SGIM at LIC) where per-phase values are available. They follow the same `sosa:Observation` pattern as all other measurements; no structural changes to any class are required.

| Individual | IRI | Unit | Applicable To | Standard Mapping |
|-----------|-----|------|---------------|-----------------|
| PhaseAActivePower | `int:PhaseAActivePower` | W | Feeder, MeteringPoint | `IEC 61850 MMXU.W.phsA` |
| PhaseBActivePower | `int:PhaseBActivePower` | W | Feeder, MeteringPoint | `IEC 61850 MMXU.W.phsB` |
| PhaseCActivePower | `int:PhaseCActivePower` | W | Feeder, MeteringPoint | `IEC 61850 MMXU.W.phsC` |
| PhaseAVoltage | `int:PhaseAVoltage` | V | Feeder, MeteringPoint | `IEC 61850 MMXU.PhV.phsA` |
| PhaseBVoltage | `int:PhaseBVoltage` | V | Feeder, MeteringPoint | `IEC 61850 MMXU.PhV.phsB` |
| PhaseCVoltage | `int:PhaseCVoltage` | V | Feeder, MeteringPoint | `IEC 61850 MMXU.PhV.phsC` |
| PhaseACurrent | `int:PhaseACurrent` | A | Feeder, MeteringPoint | `IEC 61850 MMXU.A.phsA` |
| PhaseBCurrent | `int:PhaseBCurrent` | A | Feeder, MeteringPoint | `IEC 61850 MMXU.A.phsB` |
| PhaseCCurrent | `int:PhaseCCurrent` | A | Feeder, MeteringPoint | `IEC 61850 MMXU.A.phsC` |
| PhaseAPowerFactor | `int:PhaseAPowerFactor` | — | Feeder, MeteringPoint | `IEC 61850 MMXU.PF.phsA` |
| PhaseBPowerFactor | `int:PhaseBPowerFactor` | — | Feeder, MeteringPoint | `IEC 61850 MMXU.PF.phsB` |
| PhaseCPowerFactor | `int:PhaseCPowerFactor` | — | Feeder, MeteringPoint | `IEC 61850 MMXU.PF.phsC` |
| PhaseAFrequency | `int:PhaseAFrequency` | Hz | Feeder, MeteringPoint | `IEC 61850 MMXU.Hz.phsA` |
| PhaseBFrequency | `int:PhaseBFrequency` | Hz | Feeder, MeteringPoint | `IEC 61850 MMXU.Hz.phsB` |
| PhaseCFrequency | `int:PhaseCFrequency` | Hz | Feeder, MeteringPoint | `IEC 61850 MMXU.Hz.phsC` |

## Environmental

| Individual | IRI | Unit | Applicable To | Standard Mapping |
|-----------|-----|------|---------------|-----------------|
| Humidity | `int:Humidity` | % | Facility, Site | `seas:humidity` |
