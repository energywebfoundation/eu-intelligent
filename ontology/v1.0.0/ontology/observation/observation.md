# Observation Domain: Observation, ObservableProperty, QuantityValue

---

## sosa:Observation

**IRI:** `sosa:Observation`

**Subclass of:** `owl:Thing`

**Standard mapping:** `sosa:Observation`, `ssn:Observation`

A single act of observing a property of a feature of interest at a point in time. Every measurement in the INTELLIGENT platform — whether a battery's state of charge, a PV system's DC power output, a feeder's voltage, or a facility's indoor temperature — is represented as an instance of `sosa:Observation`. No measurement field is placed directly on a device or location class; all measured values are observations.

The `featureOfInterest` identifies *what* is being observed (an asset, a metering point, a facility, a feeder). The `observedProperty` identifies *which aspect* is being measured, drawn from the `int:ObservableProperty` named individual vocabulary defined in [`properties.md`](properties.md).

### Datatype Properties

| Property | IRI | Range | Description |
|----------|-----|-------|-------------|
| resultTime | `sosa:resultTime` | `xsd:dateTime` | Time at which the result was produced. ISO 8601 with timezone. |
| phenomenonTime | `sosa:phenomenonTime` | `xsd:dateTime` | Time at which the phenomenon being observed occurred or was sampled. ISO 8601 with timezone. |

### Object Properties

| Property | IRI | Range | Cardinality | Description |
|----------|-----|-------|-------------|-------------|
| hasFeatureOfInterest | `sosa:hasFeatureOfInterest` | `owl:Thing` | `owl:exactly 1` | The entity whose property is being observed. May be an [`int:Asset`](../assets/asset.md#intasset), [`int:MeteringPoint`](../spatial/metering.md#intmeteringpoint), [`int:Feeder`](../spatial/metering.md#intfeeder), [`int:Site`](../spatial/community.md#intsite), or [`int:Facility`](../spatial/community.md#intfacility). |
| observedProperty | `sosa:observedProperty` | [`sosa:ObservableProperty`](#sosaobservableproperty) | `owl:exactly 1` | The property being observed. Must be an instance from the `int:ObservableProperty` named individual vocabulary. |
| hasResult | `sosa:hasResult` | [`int:QuantityValue`](#intquantityvalue) | `owl:exactly 1` | The result of the observation, carrying the numeric value and its unit. |
| madeBySensor | `sosa:madeBySensor` | [`int:SmartMeter`](../spatial/metering.md#intsmartmeter) | `owl:maxCardinality 1` | The sensor or meter that made this observation. Optional when the observation is derived rather than directly sensed. |

---

## sosa:ObservableProperty

**IRI:** `sosa:ObservableProperty`

**Standard mapping:** `sosa:ObservableProperty`, `ssn:Property`

An observable property is a quality of a feature of interest that can be observed and measured. In the INTELLIGENT ontology, observable properties are represented as `owl:NamedIndividual` instances of `sosa:ObservableProperty`, defined in [`properties.md`](properties.md). They are not classes and are not fields on device classes. A `BatteryUnit` does not have a `voltage` field; instead, observations of a `BatteryUnit` may have `observedProperty = int:Voltage`.

---

## int:QuantityValue

**IRI:** `int:QuantityValue`

**Subclass of:** `owl:Thing`

**Standard mapping:** `qudt:QuantityValue`

The result of an observation, carrying the numeric value and its physical unit of measure.

### Datatype Properties

| Property | IRI | Range | Description |
|----------|-----|-------|-------------|
| numericValue | `qudt:numericValue` | `xsd:float` | The numeric value of the measurement. |
| unit | `qudt:unit` | `xsd:anyURI` | The unit of measure, expressed as a QUDT unit IRI (e.g. `unit:W`, `unit:KiloW-HR`, `unit:DEG_C`, `unit:V`, `unit:A`, `unit:HZ`, `unit:PERCENT`). |
