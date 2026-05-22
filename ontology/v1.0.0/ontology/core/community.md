# Core: Community, Site, Pilot, Member

## Overview

This module defines the top-level organisational entities in the INTELLIGENT ontology. A `Community` is the primary grouping of energy participants. `Member` records represent registered participants within a community. `Site` and `Pilot` describe physical locations hosting energy assets.

**Partners:** R2M (Community, Site, Member), TUM (Pilot), BLOOO (Actor — see `actor.md`)

---

## Community

**Contributing partners:** R2M
**Standard mappings:** CIM `EnergyConsumer` aggregate, SAREF4ENER `EnergySystem`

A Local Energy Community (LEC): the root organisational container. All Members, Assets, Markets, and Billing records are scoped to a Community.

### Attributes

| Attribute | Type | Required | Description | Standard Mapping |
|-----------|------|----------|-------------|-----------------|
| `communityId` | UUID | Yes | Unique identifier | CIM `IdentifiedObject.mRID` |
| `communityName` | string | Yes | Human-readable name of the community | CIM `IdentifiedObject.name` |

### Relationships

| Relationship | Target | Cardinality | Description |
|-------------|--------|-------------|-------------|
| `has members` | Member | 1 to many | Members belonging to this community |
| `records` | MarketSlotInfo | 1 to many | Market time-slot records for this community |
| `records` | AssetMeasurement | 1 to many | Community-level asset measurements |

### Validation Rules

- `communityId` must be a valid RFC 4122 UUID.
- `communityName` must be non-empty and unique within the platform instance.

---

## Site

**Contributing partners:** R2M
**Standard mappings:** CIM `ServiceLocation`, `SubGeographicalRegion`

A physical or logical location where energy assets are installed. See ADR-001 for the open question regarding the relationship between `Site` and `Pilot`.

### Attributes

| Attribute | Type | Required | Description | Standard Mapping |
|-----------|------|----------|-------------|-----------------|
| `siteId` | UUID | Yes | Unique identifier | CIM `IdentifiedObject.mRID` |
| `name` | string | Yes | Location name | CIM `IdentifiedObject.name` |

### Relationships

| Relationship | Target | Cardinality | Description |
|-------------|--------|-------------|-------------|
| `locates` | Asset | 1 to many | Assets physically installed at this site |

### Open Questions

- ADR-001: Is `Site` equivalent to `Pilot`? Resolution pending between R2M and TUM.

---

## Pilot

**Contributing partners:** TUM
**Standard mappings:** No direct CIM equivalent. Loosely maps to CIM `Bay` or `VoltageLevel` at site scale.

A TUM-defined entity representing one of the four INTELLIGENT demonstration sites. Used as the context entity for FOS optimisation, state snapshots, and historical data aggregation. Governs a set of Assets.

### Attributes

| Attribute | Type | Required | Description | Standard Mapping |
|-----------|------|----------|-------------|-----------------|
| `pilotId` | UUID | Yes | Unique identifier | CIM `IdentifiedObject.mRID` |
| `latitude` | number | Yes | Representative latitude of the pilot site (anonymised to a single value) | WGS84 |
| `longitude` | number | Yes | Representative longitude of the pilot site (anonymised) | WGS84 |
| `buildingEnvelope` | TBD | No | Building geometry or thermal envelope parameters for FOS | TBD (IFC / ISO 13790) |

### Relationships

| Relationship | Target | Cardinality | Description |
|-------------|--------|-------------|-------------|
| `has` | PilotState | 1 to 1 (current) | Current aggregate state of the pilot |
| `governs` | Asset | 0 to many | Assets under this pilot's operational scope |

### Validation Rules

- `latitude` must be in the range [-90, 90].
- `longitude` must be in the range [-180, 180].
- Coordinates are anonymised to a single representative value per pilot per the INTELLIGENT data privacy policy.

### Open Questions

- ADR-012: `buildingEnvelope` type and structure TBD (TUM action).
- ADR-001: Relationship to `Site` unresolved.

### Known Pilot Instances

| Pilot | Country | Lead Partner |
|-------|---------|--------------|
| LIC (Lugaggia Innovation Community) | Switzerland | AEM |
| Aran Islands | Ireland | UG, CFA |
| Lucerne (CELL) | Switzerland | HSLU |
| Bicesse / Feirense | Portugal | ERE |

---

## Member

**Contributing partners:** R2M
**Standard mappings:** CIM `Customer`, SAREF `User`

A registered participant in a Community. A Member owns or operates Assets, submits Orders to Markets, and receives Billing records. Each Member is associated with exactly one `Actor` record (managed by BLOOO) for KYC and legal identity purposes.

### Attributes

| Attribute | Type | Required | Description | Standard Mapping |
|-----------|------|----------|-------------|-----------------|
| `memberId` | UUID | Yes | Unique identifier | CIM `IdentifiedObject.mRID` |
| `communityId` | UUID | Yes | Community this member belongs to | CIM `IdentifiedObject.mRID` |
| `validFrom` | timestamp | Yes | Start of membership validity | OGC Time `hasBeginning` |
| `validUntil` | timestamp | No | End of membership validity (null = active) | OGC Time `hasEnd` |
| `name` | string | Yes | Member display name | CIM `IdentifiedObject.name` |
| `role` | string | Yes | Member role in the community | CIM `OrganisationRole.kind` |
| `address_address1` | string | Yes | Primary address line | vCard `street-address` |
| `address_address2` | string | No | Secondary address line | vCard `extended-address` |
| `address_city` | string | Yes | City | vCard `locality` |
| `address_province` | string | No | Province | ISO 3166-2 |
| `address_region` | string | No | Region | - |
| `address_state` | string | No | State | ISO 3166-2 |
| `address_zipCode` | string | Yes | Postal / ZIP code | vCard `postal-code` |
| `address_country` | string | Yes | Country (ISO 3166-1 alpha-2) | ISO 3166-1 |
| `contact_mobileNo` | string | No | Mobile phone number (E.164 format) | E.164 |
| `contact_telephoneNo` | string | No | Landline phone number (E.164 format) | E.164 |
| `contact_emailAddress` | string | Yes | Email address | RFC 5321 |

### Relationships

| Relationship | Target | Cardinality | Description |
|-------------|--------|-------------|-------------|
| `belongs to` | Community | many to 1 | The community this member is part of |
| `owns` | Asset | 0 to many | Assets registered to this member |
| `has` | Billing | many to 1 | Billing record for this member |
| `offers` | Trade | 0 to many | Trades where this member is the seller |
| `buys` | Trade | 0 to many | Trades where this member is the buyer |
| `is an` | Actor | 1 to 1 | Corresponding KYC/legal identity record |

### Validation Rules

- `memberId` must be a valid RFC 4122 UUID.
- `communityId` must reference an existing `Community.communityId`.
- `validFrom` must be before `validUntil` if `validUntil` is set.
- `address_country` must be a valid ISO 3166-1 alpha-2 code.
- `contact_emailAddress` must conform to RFC 5321 format.
- `role` must be one of: `prosumer`, `consumer`, `producer`, `aggregator`, `community_manager`, `grid_operator` (pending ADR-009 finalisation).

### Open Questions

- ADR-002: Address fields may be refactored to reference the BLOOO `Address` class directly.
- ADR-009: `role` enumeration to be finalised.

### Notes

- Address sub-fields in `Member` duplicate the BLOOO `Address` class structure. ADR-002 tracks the proposed refactoring.
- Phone numbers should be stored in E.164 international format (e.g. `+353871234567`).
