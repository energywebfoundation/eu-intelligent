# Assets Domain: EnergyConsumer

---

## int:EnergyConsumer

**IRI:** `int:EnergyConsumer`

**Subclass of:** [`int:Asset`](asset.md#intasset), `cim:EnergyConsumer`

**Standard mapping:** `cim:EnergyConsumer`, `cim:ConformLoad`, `cim:NonConformLoad`

A generic measured electrical load — a consuming device or aggregate load that does not fall into a more specific asset subtype. Inherits all properties of `int:Asset`. Used at the Aran Islands pilot (UG) for measured residential loads, and at LIC for the 19 measured consumer households.

---

## AssetMeasurement fields applicable to int:EnergyConsumer

| Observable Property | IRI | Unit | Description |
|--------------------|-----|------|-------------|
| Power | `int:Power` | W | Instantaneous active power demand in watts. |
| Voltage | `int:Voltage` | V | Voltage at the load connection point in volts. |
| Current | `int:Current` | A | Current at the load connection point in amperes. |
| Frequency | `int:Frequency` | Hz | Supply frequency in hertz. |
