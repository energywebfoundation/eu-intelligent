# Metering Domain: MeteringPoint, SmartMeter, Feeder

---

## int:MeteringPoint

**IRI:** `int:MeteringPoint`

**Subclass of:** `cim:UsagePoint`

**Standard mapping:** `cim:UsagePoint`

The location where a meter is installed and the boundary at which energy flows are measured and recorded. A `MeteringPoint` is `locatedAt` one level of the INTELLIGENT topology — community (PCC), feeder, site (building), facility (apartment), or individual asset — and its associated observations describe energy flows at that topological level.

This class replaces the former `Grid` class, which conflated several distinct metering configurations. The `meterLevel` property identifies which topological level this metering point represents.

### Datatype Properties

| Property | IRI | Range | Description |
|----------|-----|-------|-------------|
| meteringPointId | `int:meteringPointId` | `xsd:string` | Unique identifier. RFC 4122 UUID v4. |
| meterLevel | `int:meterLevel` | `owl:oneOf` | Topological level at which this metering point is installed. |
| phaseConfiguration | `int:phaseConfiguration` | `owl:oneOf` | Phase configuration at this metering point. |
| connectionVoltageLevel | `cim:BaseVoltage` | `xsd:float` | Nominal connection voltage in volts (e.g. 230 V single-phase LV, 400 V three-phase LV, 20000 V MV). |
| basePower | `cim:BasePower` | `xsd:float` | Base apparent power (Sbase) in volt-amperes used for per-unit normalisation in power flow calculations. |
| meterHealthStatus | `int:meterHealthStatus` | `owl:oneOf` | Communication and operational health of the meter at this point. |

### Object Properties

| Property | IRI | Range | Cardinality | Description |
|----------|-----|-------|-------------|-------------|
| locatedAtCommunity | `int:locatedAtCommunity` | [`int:EnergyCommUnit`](community.md#intenergycommunity) | `owl:maxCardinality 1` | Community-level PCC metering point. Populated when `meterLevel = Community`. |
| locatedAtFeeder | `int:locatedAtFeeder` | [`int:Feeder`](#intfeeder) | `owl:maxCardinality 1` | Feeder-level metering point. Populated when `meterLevel = Feeder`. |
| locatedAtSite | `int:locatedAtSite` | [`int:Site`](community.md#intsite) | `owl:maxCardinality 1` | Site (building) level metering point. Populated when `meterLevel = Site`. |
| locatedAtFacility | `int:locatedAtFacility` | [`int:Facility`](community.md#intfacility) | `owl:maxCardinality 1` | Facility (apartment/unit) level metering point. Populated when `meterLevel = Facility`. |
| locatedAtAsset | `int:locatedAtAsset` | [`int:Asset`](../assets/asset.md#intasset) | `owl:maxCardinality 1` | Asset-level sub-metering point. Populated when `meterLevel = Asset`. |
| hasTariff | `int:hasTariff` | `int:Tariff` | `owl:maxCardinality 1` | Applicable tariff for this metering point. |
| installedMeter | `int:installedMeter` | [`int:SmartMeter`](#intsmartmeter) | `owl:maxCardinality 1` | Physical meter device installed at this point. |

### Enumeration Values

#### int:meterLevel

| Value | Description |
|-------|-------------|
| `Community` | Community-level Point of Common Coupling (PCC) — net exchange between the LEC and the public grid. |
| `Feeder` | Feeder-level measurement at the LV side of the MV/LV transformer (e.g. AEM SGIM at LIC). |
| `Site` | Building-level measurement (e.g. HSLU per-building meters at CELL). |
| `Facility` | Apartment or unit level measurement (e.g. HSLU Seebuchtstrasse, UG Aran Islands household meters). |
| `Asset` | Asset-level sub-metering (e.g. Shelly sub-meters at LIC, inverter meters at Aran Islands). |

#### int:phaseConfiguration

| Value | Description |
|-------|-------------|
| `SinglePhase` | Single-phase connection. |
| `ThreePhase` | Three-phase connection. |

#### int:meterHealthStatus

| Value | Description |
|-------|-------------|
| `Ok` | Meter communicating normally. |
| `Warning` | Non-critical communication issue; data may be degraded. |
| `Alarm` | Critical fault; meter data unavailable. |
| `Disconnected` | Meter physically disconnected or offline. |

---

## int:SmartMeter

**IRI:** `int:SmartMeter`

**Subclass of:** [`int:Asset`](../assets/asset.md#intasset), `cim:Meter`

**Standard mapping:** `cim:Meter`, `cim:EndDevice`

A physical metering device installed at a `MeteringPoint`. As a subclass of `int:Asset`, a `SmartMeter` carries the full asset identity and lifecycle properties. Its observations have `featureOfInterest` pointing to the topological entity that the metering point describes — not to the meter itself.

### Datatype Properties

| Property | IRI | Range | Description |
|----------|-----|-------|-------------|
| mRID | `cim:mRID` | `xsd:string` | IEC CIM master resource identifier. Links to the IEC 61968-9 `EndDevice` record. |
| deviceType | `int:deviceType` | `owl:oneOf` | Type of metering device. |

### Object Properties

| Property | IRI | Range | Cardinality | Description |
|----------|-----|-------|-------------|-------------|
| installedAt | `int:installedAt` | [`int:MeteringPoint`](#intmeteringpoint) | `owl:exactly 1` | MeteringPoint where this meter is physically installed. |

### Enumeration Values

#### int:deviceType

| Value | Description |
|-------|-------------|
| `GridMeter` | Grid interface meter (e.g. AEM SGIM at the MV/LV transformer feeder level). |
| `SmartMeter` | Advanced metering infrastructure (AMI) smart meter (e.g. Landis+Gyr at PCC or household level). |

---

## int:Feeder

**IRI:** `int:Feeder`

**Subclass of:** `cim:ACLineSegment`

**Standard mapping:** `cim:ACLineSegment`

A segment of the low-voltage distribution network connecting a transformer to one or more `Site` instances. `Feeder` is part of the grid topology domain and is not part of the spatial containment hierarchy (`EnergyCommUnit` → `Site` → `Facility`). Feeder-level `MeteringPoint` instances (e.g. AEM's SGIM at LIC) produce observations whose `featureOfInterest` is a `Feeder` instance, capturing per-phase electrical parameters at the LV transformer — grid topology data serving a different analytical purpose from community-level PCC measurements.

### Datatype Properties

| Property | IRI | Range | Description |
|----------|-----|-------|-------------|
| feederId | `int:feederId` | `xsd:string` | Unique identifier. RFC 4122 UUID v4. |
| feederName | `cim:name` | `xsd:string` | Human-readable feeder name. |
| resistance | `cim:r` | `xsd:float` | AC resistance per unit length in ohms per kilometre. |
| reactance | `cim:x` | `xsd:float` | AC reactance per unit length in ohms per kilometre. |
| susceptance | `cim:bch` | `xsd:float` | Shunt susceptance per unit length in siemens per kilometre. |
| ratedCurrent | `cim:ratedCurrent` | `xsd:float` | Thermal rated current in amperes. |
| length | `cim:length` | `xsd:float` | Length of the feeder segment in kilometres. |

### Object Properties

| Property | IRI | Range | Cardinality | Description |
|----------|-----|-------|-------------|-------------|
| servesSite | `int:servesSite` | [`int:Site`](community.md#intsite) | `owl:minCardinality 1` | Sites electrically connected to this feeder. |
| partOfCommunity | `int:partOfCommunity` | [`int:EnergyCommUnit`](community.md#intenergycommunity) | `owl:exactly 1` | Community whose distribution network this feeder belongs to. |

---

## int:MeteringPointMeasurement

**IRI:** `int:MeteringPointMeasurement`

**Subclass of:** `owl:Thing`

**Standard mapping:** `sosa:ObservationCollection`

A time-stamped collection of electrical measurements at a `MeteringPoint`. Captures the instantaneous and cumulative energy flows observed at the metering boundary regardless of which topological level the metering point represents. The `featureOfInterest` — whether community, feeder, site, facility, or asset — is established by the `MeteringPoint` itself.

Confirmed by the May 2026 workshop: signed `power` (positive = import, negative = export) is the canonical representation, replacing the earlier split `powerIn`/`powerOut` fields which have been removed.

### Datatype Properties

| Property | IRI | Range | Description |
|----------|-----|-------|-------------|
| timestamp | `int:timestamp` | `xsd:dateTime` | Timestamp of the measurement. ISO 8601 with timezone. |
| power | `int:power` | `xsd:float` | Signed instantaneous active power in watts. Positive = import from grid; negative = export to grid. IEC 61850 MMXU sign convention. |
| reactivePower | `int:reactivePower` | `xsd:float` | Instantaneous reactive power in volt-amperes reactive (VAr). |
| current | `int:current` | `xsd:float` | Instantaneous current in amperes. |
| voltage | `int:voltage` | `xsd:float` | Instantaneous voltage in volts. |
| frequency | `int:frequency` | `xsd:float` | AC frequency in hertz. |
| energyIn | `int:energyIn` | `xsd:float` | Cumulative or interval energy imported in watt-hours. |
| energyOut | `int:energyOut` | `xsd:float` | Cumulative or interval energy exported in watt-hours. |

### Object Properties

| Property | IRI | Range | Cardinality | Description |
|----------|-----|-------|-------------|-------------|
| measuredAt | `int:measuredAt` | [`int:MeteringPoint`](#intmeteringpoint) | `owl:exactly 1` | MeteringPoint at which these measurements were recorded. |

---

## int:CommunityMeasurement

**IRI:** `int:CommunityMeasurement`

**Subclass of:** [`int:MeteringPointMeasurement`](#intmeteringpointmeasurement)

**Standard mapping:** `sosa:ObservationCollection`

A specialisation of `MeteringPointMeasurement` scoped to a community-level metering point (PCC). Inherits all measurement properties and adds a direct reference to the community for query convenience.

### Object Properties

| Property | IRI | Range | Cardinality | Description |
|----------|-----|-------|-------------|-------------|
| measuresCommunity | `int:measuresCommunity` | [`int:EnergyCommUnit`](community.md#intenergycommunity) | `owl:exactly 1` | Community whose PCC boundary this measurement describes. |

---

## int:FeederMeasurement

**IRI:** `int:FeederMeasurement`

**Subclass of:** [`int:MeteringPointMeasurement`](#intmeteringpointmeasurement)

**Standard mapping:** `sosa:ObservationCollection`

A specialisation of `MeteringPointMeasurement` scoped to a feeder-level metering point. Captures per-phase electrical parameters at the LV distribution feeder. Used by AEM (LIC pilot) via the SGIM at the MV/LV transformer.

### Object Properties

| Property | IRI | Range | Cardinality | Description |
|----------|-----|-------|-------------|-------------|
| measuresFeeder | `int:measuresFeeder` | [`int:Feeder`](#intfeeder) | `owl:exactly 1` | Feeder whose electrical state this measurement describes. |
