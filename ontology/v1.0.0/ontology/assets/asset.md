# Assets Domain: Asset, AssetState

---

## int:Asset

**IRI:** `int:Asset`
**Subclass of:** `saref:Device`, `cim:Equipment`
**Standard mapping:** `saref:Device`, `cim:Equipment`, `cim:PowerSystemResource`

The abstract base class for all energy devices in the INTELLIGENT platform. Carries identity, type, lifecycle, and controllability. Carries no measurement fields — measurements are expressed as `sosa:Observation` instances with the asset as `featureOfInterest`. Specific device types are defined as subclasses.

### Datatype Properties

| Property | IRI | Range | Description |
|----------|-----|-------|-------------|
| assetId | `int:assetId` | `xsd:string` | Unique identifier. RFC 4122 UUID v4. |
| assetName | `cim:name` | `xsd:string` | Human-readable name of the asset. Maps to `cim:IdentifiedObject.name`. |
| assetType | `int:assetType` | `owl:oneOf` | Controlled enumeration identifying the asset subtype. The class hierarchy is the primary typing mechanism; this property supports queries without subclass traversal. |
| validFrom | `int:validFrom` | `xsd:dateTime` | Start of the asset registration validity period. ISO 8601 with timezone. |
| validUntil | `int:validUntil` | `xsd:dateTime` | End of the asset registration validity period. NULL if currently active. ISO 8601 with timezone. |
| isControllable | `saref:isControllable` | `xsd:boolean` | True if the asset exposes an actuator interface that can receive `int:Command` instances. |
| commissioningDate | `cim:commissionedDate` | `xsd:date` | Date the asset was commissioned. ISO 8601 date (YYYY-MM-DD). |
| manufacturer | `cim:manufacturer` | `xsd:string` | Asset manufacturer name. |
| model | `cim:model` | `xsd:string` | Asset model or product name. |
| serialNumber | `cim:serialNumber` | `xsd:string` | Manufacturer serial number. |
| nominalPower | `cim:nominalP` | `xsd:float` | Rated nominal active power capacity in watts. |
| protocol | `int:communicationProtocol` | `owl:oneOf` | Communication protocol used by the asset. |

### Object Properties

| Property | IRI | Range | Cardinality | Description |
|----------|-----|-------|-------------|-------------|
| hasOwner | `int:hasOwner` | `int:Actor` | `owl:exactly 1` | Actor who owns this asset. |
| locatedAtSite | `int:locatedAtSite` | `int:Site` | `owl:exactly 1` | Site where this asset is physically installed. |
| installedAtFacility | `int:installedAtFacility` | `int:Facility` | `owl:maxCardinality 1` | Facility within the site where this asset is installed. Optional when no facility sub-division exists. |
| hasState | `int:hasState` | `int:AssetState` | `owl:maxCardinality 1` | Current operational state snapshot for this asset. |

### Enumeration Values

#### int:assetType

| Value | Description |
|-------|-------------|
| `BatteryUnit` | Battery energy storage system. |
| `PhotovoltaicUnit` | Photovoltaic solar generation system. |
| `GridConnectionPoint` | Smart meter or metering point (replaces the former `Grid` class). |
| `EnergyConsumer` | Generic electrical load. |
| `HydroGeneratingUnit` | Hydroelectric generation unit. |
| `EVChargingStation` | Electric vehicle charging station. |
| `HeatPump` | Heat pump (air, ground, or water source). |
| `ElectricBoiler` | Electric water heating boiler. |

#### int:communicationProtocol

| Value | Description |
|-------|-------------|
| `MQTT` | MQTT message broker protocol. |
| `REST` | RESTful HTTP API. |
| `RS485` | RS-485 serial communication. |
| `Modbus` | Modbus protocol (RTU or TCP). |
| `VE.Bus` | Victron Energy VE.Bus proprietary protocol. |
| `OCPP` | Open Charge Point Protocol (EV chargers). |
| `MBUS` | M-Bus wired metering protocol. |
| `Proprietary` | Manufacturer-specific proprietary protocol. |

---

## int:AssetState

**IRI:** `int:AssetState`
**Subclass of:** `owl:Thing`
**Standard mapping:** `sosa:ObservationCollection`

A time-stamped snapshot of the current operational condition of an asset. `AssetState` captures the *state* of an asset — what it is doing or its current condition — as distinct from raw instantaneous measurements, which are expressed as `sosa:Observation` instances. The specific state fields applicable depend on the asset subtype and are defined in the individual asset type class files.

`AssetState` is the single class for all asset condition information, replacing the former `AssetStatus` class which has been removed.

### Datatype Properties

| Property | IRI | Range | Description |
|----------|-----|-------|-------------|
| timestamp | `int:timestamp` | `xsd:dateTime` | Timestamp when this state snapshot was recorded. ISO 8601 with timezone. |

### Object Properties

| Property | IRI | Range | Cardinality | Description |
|----------|-----|-------|-------------|-------------|
| isAssetStateOf | `int:isAssetStateOf` | `int:Asset` | `owl:exactly 1` | Asset whose operational state this record describes. |
