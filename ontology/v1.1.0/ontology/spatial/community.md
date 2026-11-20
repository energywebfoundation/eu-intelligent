# Spatial Domain: Community, Site, Facility, Pilot

---

## int:EnergyCommUnit

**IRI:** `int:EnergyCommUnit`

**Subclass of:** `cim:EnergyArea`

**Standard mapping:** `cim:EnergyArea`

A Local Energy Community (LEC) — the top-level organisational and contractual grouping of participants, sites, assets, and markets. All market activity, billing, and metering within the INTELLIGENT platform is scoped to an `EnergyCommUnit`. One community may span multiple sites.

### Datatype Properties

| Property | IRI | Range | Description |
|----------|-----|-------|-------------|
| communityId | `int:communityId` | `xsd:string` | Unique identifier. RFC 4122 UUID v4. |
| communityName | `int:communityName` | `xsd:string` | Human-readable name of the energy community. |
| communityType | `int:communityType` | `owl:oneOf` | Legal organisational type per EU energy community legislation. |
| legalStructure | `int:legalStructure` | `xsd:string` | Official legal structure of the community (e.g. ZEV, CSC scheme). |
| country | `int:country` | `xsd:string` | ISO 3166-1 alpha-2 country code of the community location. |
| latitude | `int:latitude` | `xsd:float` | Anonymised representative latitude coordinate in decimal degrees. |
| longitude | `int:longitude` | `xsd:float` | Anonymised representative longitude coordinate in decimal degrees. |
| gridConnectionVoltageLevel | `cim:BaseVoltage` | `xsd:float` | Nominal voltage at which the community connects to the distribution grid, in volts. |
| currency | `int:currency` | `xsd:string` | ISO 4217 currency code used for billing and trading within this community. |
| marketMechanism | `int:marketMechanism` | `xsd:string` | Type of energy sharing or trading mechanism permitted (e.g. P2P trading, collective self-consumption). |
| co2EmissionFactor | `int:co2EmissionFactor` | `xsd:float` | Grid CO2 emission factor for this community's grid mix, in gCO2/kWh. |
| yearEstablished | `int:yearEstablished` | `xsd:integer` | Year the community was formally established. |
| totalMembers | `int:totalMembers` | `xsd:integer` | Total number of members currently enrolled in this community. |
| totalSites | `int:totalSites` | `xsd:integer` | Total number of sites associated with this community. |
| validFrom | `int:validFrom` | `xsd:dateTime` | Start of the community's operational validity period. ISO 8601 with timezone. |
| validUntil | `int:validUntil` | `xsd:dateTime` | End of the community's operational validity period. NULL if still active. ISO 8601 with timezone. |

### Object Properties

| Property | IRI | Range | Cardinality | Description |
|----------|-----|-------|-------------|-------------|
| hasSite | `int:hasSite` | [`int:Site`](#intsite) | `owl:minCardinality 1` | Sites belonging to this community. |
| hasOperator | `int:hasOperator` | [`int:Actor`](../participants/participant.md#intactor) | `owl:maxCardinality 1` | Actor who acts as community manager or operator. |

### Enumeration Values

#### int:communityType

| Value | Description |
|-------|-------------|
| `CollectiveSelfConsumption` | Collective self-consumption scheme (e.g. ZEV in Switzerland). |
| `RenewableEnergyCommunity` | Renewable energy community under EU RED II (Directive 2018/2001). |
| `CitizenEnergyCommunity` | Citizen energy community under EU IEM Directive (2019/944). |
| `EnergyCooperative` | Formal cooperative legal structure. |
| `VirtualNetMetering` | Virtual net metering arrangement. |
| `Other` | Other legal form not covered by the above. |

---

## int:Site

**IRI:** `int:Site`

**Subclass of:** `cim:ServiceLocation`

**Standard mapping:** `cim:ServiceLocation`

A single physical building within an energy community. Confirmed by the May 2026 ontology workshop as the canonical building-level concept. A `Site` contains zero or more `Facility` instances; when a site has no sub-unit structure, it acts as its own facility. Sites are the primary location reference for asset installation and metering.

### Datatype Properties

| Property | IRI | Range | Description |
|----------|-----|-------|-------------|
| siteId | `int:siteId` | `xsd:string` | Unique identifier. RFC 4122 UUID v4. |
| siteName | `cim:name` | `xsd:string` | Human-readable site name. Maps to `cim:IdentifiedObject.name`. |
| description | `int:description` | `xsd:string` | General description of the site. |
| latitude | `int:latitude` | `xsd:float` | Anonymised representative latitude in decimal degrees. |
| longitude | `int:longitude` | `xsd:float` | Anonymised representative longitude in decimal degrees. |
| buildingCategory | `s4bldg:buildingCategory` | `owl:oneOf` | Category of the building. |
| marketMechanism | `int:marketMechanism` | `xsd:string` | Energy sharing or trading mechanism applicable at this site. |
| co2EmissionFactor | `int:co2EmissionFactor` | `xsd:float` | Local grid CO2 emission factor in gCO2/kWh. |
| phaseConfiguration | `int:phaseConfiguration` | `xsd:string` | Phase configuration of the site's internal network (e.g. SinglePhase, ThreePhase). |
| lineConductance | `int:lineConductance` | `xsd:float` | Line conductance parameter for Y-bus power flow formulation, in siemens (S). |
| lineSusceptance | `int:lineSusceptance` | `xsd:float` | Line susceptance parameter for Y-bus power flow formulation, in siemens (S). |
| transformerReactance | `cim:transformerReactance` | `xsd:float` | Distribution transformer impedance used in power flow calculations, in ohms. |
| minNodeVoltage | `int:minNodeVoltage` | `xsd:float` | Minimum allowable nodal voltage magnitude within the site network, in volts (or per unit). |
| maxNodeVoltage | `int:maxNodeVoltage` | `xsd:float` | Maximum allowable nodal voltage magnitude within the site network, in volts (or per unit). |
| maxLineFlow | `int:maxLineFlow` | `xsd:float` | Maximum allowable apparent power flow through site line segments, in VA (or per unit). |
| fromNodeId | `int:fromNodeId` | `xsd:string` | Origin connectivity node of the line segment within the site network topology. |
| toNodeId | `int:toNodeId` | `xsd:string` | Destination connectivity node of the line segment within the site network topology. |
| lineId | `int:lineId` | `xsd:string` | Identifier of the line segment connecting two nodes within the site network. |
| createdAt | `int:createdAt` | `xsd:dateTime` | Timestamp when the record was created. ISO 8601 with timezone. |
| updatedAt | `int:updatedAt` | `xsd:dateTime` | Timestamp when the record was last updated. ISO 8601 with timezone. |
| isSingleFacilitySite | `int:isSingleFacilitySite` | `xsd:boolean` | True if this site has no sub-unit structure and acts as its own facility. When true, no `int:Facility` instances are expected under this site. |

### Object Properties

| Property | IRI | Range | Cardinality | Description |
|----------|-----|-------|-------------|-------------|
| hasCommunity | `int:hasCommunity` | [`int:EnergyCommUnit`](#intenergycommunity) | `owl:exactly 1` | Community this site belongs to. |
| hasFacility | `int:hasFacility` | [`int:Facility`](#intfacility) | `owl:minCardinality 0` | Facilities within this site. Absent when the site itself is the facility. |
| hasOwner | `int:hasOwner` | [`int:Actor`](../participants/participant.md#intactor) | `owl:minCardinality 0` | Actor(s) who own this site. Null if publicly or community owned. |
| hasOperator | `int:hasOperator` | [`int:Actor`](../participants/participant.md#intactor) | `owl:maxCardinality 1` | Actor who operates this site (e.g. household or prosumer). |

### Enumeration Values

#### s4bldg:buildingCategory

| Value | Description |
|-------|-------------|
| `Residential` | Residential building (house, apartment block). |
| `Commercial` | Commercial premises. |
| `Industrial` | Industrial facility. |
| `PublicBuilding` | Public building (school, kindergarten, community centre). |
| `Other` | Other building type. |

---

## int:Facility

**IRI:** `int:Facility`

**Subclass of:** `cim:EnergyConsumer`

**Standard mapping:** `cim:EnergyConsumer`

A single apartment, unit, or group of units within a `Site`. A `Facility` is the lowest level of the spatial hierarchy and the entity that directly owns or operates assets and participates in the energy market. `Facility` is optional within the hierarchy: when a site has no sub-unit structure (e.g. a single-building pilot), the site itself acts as the facility and no separate `Facility` instance is required.

### Datatype Properties

| Property | IRI | Range | Description |
|----------|-----|-------|-------------|
| facilityId | `int:facilityId` | `xsd:string` | Unique identifier. RFC 4122 UUID v4. |
| name | `cim:name` | `xsd:string` | Human-readable name of the facility. Maps to `cim:IdentifiedObject.name`. |
| facilityType | `int:facilityType` | `xsd:string` | Type of facility (e.g. apartment, unit, group of apartments). |
| numApartmentUnits | `int:numApartmentUnits` | `xsd:integer` | Number of apartment units represented by this facility. |
| p | `cim:p` | `xsd:float` | Steady-state active power demand in watts, used for load-flow calculations. Planning value, not a real-time measurement. |
| q | `cim:q` | `xsd:float` | Steady-state reactive power demand in volt-amperes reactive (VAr). Planning value. |
| phaseConnection | `cim:phaseConnection` | `owl:oneOf` | Phase connection type per CIM `PhaseShuntConnectionKind`. |
| healthStatus | `int:healthStatus` | `owl:oneOf` | Connectivity and operational health of the metering interface for this facility. |

### Object Properties

| Property | IRI | Range | Cardinality | Description |
|----------|-----|-------|-------------|-------------|
| isFacilityOf | `int:isFacilityOf` | [`int:Site`](#intsite) | `owl:maxCardinality 1` | Site this facility belongs to. Nullable for facilities not yet assigned to a site. |
| hasOwner | `int:hasOwner` | [`int:Actor`](../participants/participant.md#intactor) | `owl:minCardinality 0` | Actor(s) who own this facility. Null if publicly or community owned. |
| hasLoadModel | `int:hasLoadModel` | `cim:EnergyConsumer` | `owl:maxCardinality 1` | CIM load model representing this facility in the distribution network topology. |

### Enumeration Values

#### cim:phaseConnection

| Value | Description |
|-------|-------------|
| `Y` | Wye (star) connection, ungrounded. |
| `Yn` | Wye (star) connection, grounded neutral. |
| `D` | Delta connection. |
| `Ii` | Independent single-phase connection. |

#### int:healthStatus

| Value | Description |
|-------|-------------|
| `Ok` | Metering interface is operational. |
| `Warning` | Non-critical issue; metering may have reduced reliability. |
| `Alarm` | Critical fault; metering data unavailable or unreliable. |

---

## int:Pilot

**IRI:** `int:Pilot`

**Subclass of:** `owl:Thing`

**Standard mapping:** None. INTELLIGENT project-specific concept.

A project-level grouping of one or more `Site` instances representing one of the four INTELLIGENT demonstration sites. `Pilot` is used to scope FOS optimisation and project reporting. It is not part of the spatial containment hierarchy (`EnergyCommUnit` → `Site` → `Facility`) and does not carry metering or market semantics.

### Datatype Properties

| Property | IRI | Range | Description |
|----------|-----|-------|-------------|
| pilotId | `int:pilotId` | `xsd:string` | Unique identifier. RFC 4122 UUID v4. |
| pilotName | `int:pilotName` | `xsd:string` | Human-readable name of the pilot (e.g. "LIC", "CELL", "Greenvolt Comunidades", "Aran Islands"). |

### Object Properties

| Property | IRI | Range | Cardinality | Description |
|----------|-----|-------|-------------|-------------|
| groupsSite | `int:groupsSite` | [`int:Site`](#intsite) | `owl:minCardinality 1` | Sites grouped under this pilot for project-level scoping. |

---

## int:SiteState

**IRI:** `int:SiteState`

**Subclass of:** `owl:Thing`

**Standard mapping:** `sosa:ObservationCollection`

A time-stamped snapshot of aggregate measured conditions across a site, capturing environmental and electrical measurements at the site level. `SiteState` records are produced at regular intervals and consumed by FOS for site-level optimisation input.

### Datatype Properties

| Property | IRI | Range | Description |
|----------|-----|-------|-------------|
| timestamp | `int:timestamp` | `xsd:dateTime` | Timestamp when the measurements are recorded. ISO 8601 with timezone. |
| tIndoorC | `seas:temperature` | `xsd:float` | Indoor air temperature in degrees Celsius. Available only where a sensor is installed. |
| humidity | `seas:humidity` | `xsd:float` | Average site humidity per interval. |
| powerIn | `int:powerIn` | `xsd:float` | Average active power consumed at the site per interval, in watts. |
| powerOut | `int:powerOut` | `xsd:float` | Average active power exported from the site per interval, in watts. |
| current | `saref4ener:current` | `xsd:float` | Average site current per interval, in amperes. |
| voltage | `saref4ener:voltage` | `xsd:float` | Instantaneous site voltage, in volts. |
| frequency | `cim:frequency` | `xsd:float` | Site AC frequency, in hertz. |
| energyIn | `int:energyIn` | `xsd:float` | Average energy imported per interval, in watt-hours. |
| energyOut | `int:energyOut` | `xsd:float` | Average energy exported per interval, in watt-hours. |

### Object Properties

| Property | IRI | Range | Cardinality | Description |
|----------|-----|-------|-------------|-------------|
| measuresSite | `int:measuresSite` | [`int:Site`](#intsite) | `owl:exactly 1` | Site whose aggregate conditions this record describes. |

---

## int:FacilityState

**IRI:** `int:FacilityState`

**Subclass of:** `owl:Thing`

**Standard mapping:** `sosa:ObservationCollection`

A time-stamped snapshot of the operational state of a facility, capturing occupancy and operating mode at a point in time. Distinct from `FacilityMeasurement` which captures electrical measurements; `FacilityState` captures the condition of the facility itself.

### Datatype Properties

| Property | IRI | Range | Description |
|----------|-----|-------|-------------|
| timestamp | `int:timestamp` | `xsd:dateTime` | Timestamp when the state is recorded. ISO 8601 with timezone. |
| occupancy | `seas:occupancy` | `xsd:integer` | Number of occupants currently present in the facility. |
| operationalMode | `int:operationalMode` | `owl:oneOf` | Current operational mode of the facility. |

### Object Properties

| Property | IRI | Range | Cardinality | Description |
|----------|-----|-------|-------------|-------------|
| isFacilityStateOf | `int:isFacilityStateOf` | [`int:Facility`](#intfacility) | `owl:exactly 1` | Facility whose state this record describes. |

### Enumeration Values

#### int:operationalMode

| Value | Description |
|-------|-------------|
| `Normal` | Facility operating under standard comfort and scheduling settings. |
| `Away` | Occupants absent; comfort targets relaxed. |
| `Setback` | Reduced comfort targets active (e.g. night setback). |
| `Emergency` | Emergency operating mode. |

---

## int:FacilityMeasurement

**IRI:** `int:FacilityMeasurement`

**Subclass of:** `owl:Thing`

**Standard mapping:** `sosa:ObservationCollection`

A time-stamped collection of electrical and environmental measurements at a facility boundary. Captures the aggregate energy flows and environmental conditions at the metering point of a facility per interval.

### Datatype Properties

| Property | IRI | Range | Description |
|----------|-----|-------|-------------|
| timestamp | `int:timestamp` | `xsd:dateTime` | Timestamp when the measurements are recorded. ISO 8601 with timezone. |
| tIndoorC | `seas:temperature` | `xsd:float` | Indoor air temperature in degrees Celsius. |
| humidity | `seas:humidity` | `xsd:float` | Average facility humidity per interval. |
| powerIn | `int:powerIn` | `xsd:float` | Average active power consumed by the facility per interval, in watts. |
| powerOut | `int:powerOut` | `xsd:float` | Average active power exported by the facility per interval, in watts. |
| current | `saref4ener:current` | `xsd:float` | Average facility current per interval, in amperes. |
| voltage | `saref4ener:voltage` | `xsd:float` | Instantaneous facility voltage, in volts. |
| frequency | `cim:frequency` | `xsd:float` | Facility AC frequency, in hertz. |
| energyIn | `int:energyIn` | `xsd:float` | Average energy imported per interval, in watt-hours. |
| energyOut | `int:energyOut` | `xsd:float` | Average energy exported per interval, in watt-hours. |

### Object Properties

| Property | IRI | Range | Cardinality | Description |
|----------|-----|-------|-------------|-------------|
| measuresFacility | `int:measuresFacility` | [`int:Facility`](#intfacility) | `owl:exactly 1` | Facility whose boundary measurements this record captures. |
