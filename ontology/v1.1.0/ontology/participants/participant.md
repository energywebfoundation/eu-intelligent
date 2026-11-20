# Participants Domain: Actor, Address, ContactDetails

---

## int:Actor

**IRI:** `int:Actor`

**Subclass of:** `foaf:Agent`

**Standard mapping:** `cim:Organisation`, `idsa:Participant`

The legal and domain identity of a person or organisation participating in the INTELLIGENT platform. `Actor` is the central identity record — all other participant-related classes (`Address`, `ContactDetails`, `DecentralizedIdentity`, `UserAccount`) reference it. The former flat address and contact sub-fields on `Member` have been replaced by object property references to `Address` and `ContactDetails`.

### Datatype Properties

| Property | IRI | Range | Description |
|----------|-----|-------|-------------|
| actorId | `int:actorId` | `xsd:string` | Unique identifier. RFC 4122 UUID v4. |
| name | `cim:name` | `xsd:string` | Legal name of the person or organisation. Maps to `cim:IdentifiedObject.name`. |
| type | `int:type` | `owl:oneOf` | Type of actor. |
| legalEntity | `int:legalEntity` | `xsd:string` | Registered legal entity name if different from `name`. |
| taxId | `int:taxId` | `xsd:string` | Tax identification number. GDPR-sensitive. |
| dateOfBirth | `int:dateOfBirth` | `xsd:date` | Date of birth. Applicable when `type = NaturalPerson`. ISO 8601 (YYYY-MM-DD). GDPR-sensitive. |
| ownershipPercentage | `int:ownershipPercentage` | `xsd:float` | Proportion of shares, voting rights, or capital held in a company (0–100). |
| isBeneficialOwner | `int:isBeneficialOwner` | `xsd:boolean` | True if the actor ultimately owns or controls a legal entity and reaps financial benefits even if not listed on official documents. |
| isControlPerson | `int:isControlPerson` | `xsd:boolean` | True if the actor exercises significant authority, control, or management over a legal entity. |
| nationality | `int:nationality` | `xsd:string` | Nationality of the actor. Applicable when `type = NaturalPerson`. |
| communityId | `int:communityId` | `xsd:string` | FK to `EnergyCommUnit`. The community this actor belongs to. |
| validFrom | `int:validFrom` | `xsd:dateTime` | Start of membership validity. ISO 8601 with timezone. |
| validUntil | `int:validUntil` | `xsd:dateTime` | End of membership validity. NULL if active. ISO 8601 with timezone. |
| role | `int:role` | `owl:oneOf` | Market participation role of this actor. |
| isActive | `int:isActive` | `xsd:boolean` | Whether the membership is currently active. |

### Object Properties

| Property | IRI | Range | Cardinality | Description |
|----------|-----|-------|-------------|-------------|
| hasCommunity | `int:hasCommunity` | [`int:EnergyCommUnit`](../spatial/community.md#intenergycommunity) | `owl:exactly 1` | Community this actor belongs to. |
| hasBillingAddress | `int:hasBillingAddress` | [`int:Address`](#intaddress) | `owl:maxCardinality 1` | Billing address. |
| hasResidentialAddress | `int:hasResidentialAddress` | [`int:Address`](#intaddress) | `owl:maxCardinality 1` | Residential address. |
| hasBusinessAddress | `int:hasBusinessAddress` | [`int:Address`](#intaddress) | `owl:maxCardinality 1` | Business or registered address. |
| hasContactDetails | `int:hasContactDetails` | [`int:ContactDetails`](#intcontactdetails) | `owl:minCardinality 1` | Contact record(s) for this actor. |
| hasDecentralizedIdentity | `int:hasDecentralizedIdentity` | [`int:DecentralizedIdentity`](identity.md#intdecentralizedidentity) | `owl:maxCardinality 1` | EWDS cryptographic identity. |
| hasUserAccount | `int:hasUserAccount` | [`int:UserAccount`](identity.md#intuseraccount) | `owl:maxCardinality 1` | Platform access account. |

### Enumeration Values

#### int:type

| Value | Description |
|-------|-------------|
| `NaturalPerson` | Individual person. |
| `LegalEntity` | Registered company or organisation. |
| `PublicBody` | Public sector body. |
| `Organisation` | Other formal organisation. |

#### int:role

| Value | Description |
|-------|-------------|
| `Consumer` | Energy consumer only. |
| `Prosumer` | Both produces and consumes energy. |
| `Producer` | Energy producer only. |
| `Aggregator` | Aggregates flexibility from multiple assets. |
| `CommunityManager` | Manages community operations. |
| `ProjectPartner` | INTELLIGENT consortium partner. |
| `Pilot` | Pilot site operator. |

---

## int:Address

**IRI:** `int:Address`

**Subclass of:** `owl:Thing`

**Standard mapping:** `vcard:Address`

A structured postal address associated with an `Actor`. One actor may have multiple address records distinguished by type (billing, residential, business), referenced from `int:Actor` via separate object properties.

### Datatype Properties

| Property | IRI | Range | Description |
|----------|-----|-------|-------------|
| addressId | `int:addressId` | `xsd:string` | Unique identifier. RFC 4122 UUID v4. |
| line1 | `int:line1` | `xsd:string` | First line of the street address. |
| line2 | `int:line2` | `xsd:string` | Second line (apartment, suite, etc.). |
| city | `int:city` | `xsd:string` | City name. |
| postalCode | `int:postalCode` | `xsd:string` | Postal or ZIP code. |
| country | `int:country` | `xsd:string` | ISO 3166-1 alpha-2 country code. |
| state | `int:state` | `xsd:string` | State, province, or region. ISO 3166-2. |

### Object Properties

| Property | IRI | Range | Cardinality | Description |
|----------|-----|-------|-------------|-------------|
| hasActor | `int:hasActor` | [`int:Actor`](#intactor) | `owl:exactly 1` | Actor this address belongs to. |

---

## int:ContactDetails

**IRI:** `int:ContactDetails`

**Subclass of:** `owl:Thing`

**Standard mapping:** `vcard:Kind`

A contact information record associated with an `Actor`. An actor may have multiple contact records of different types (primary, business, emergency).

### Datatype Properties

| Property | IRI | Range | Description |
|----------|-----|-------|-------------|
| contactDetailsId | `int:contactDetailsId` | `xsd:string` | Unique identifier. RFC 4122 UUID v4. |
| email | `int:email` | `xsd:string` | Email address. RFC 5321 format. |
| phoneNumber | `int:phoneNumber` | `xsd:string` | Landline telephone number. E.164 format. |
| mobileNumber | `int:mobileNumber` | `xsd:string` | Mobile phone number. E.164 format. |
| contactType | `int:contactType` | `owl:oneOf` | Type of contact record. |

### Object Properties

| Property | IRI | Range | Cardinality | Description |
|----------|-----|-------|-------------|-------------|
| hasActor | `int:hasActor` | [`int:Actor`](#intactor) | `owl:exactly 1` | Actor this contact record belongs to. |

### Enumeration Values

#### int:contactType

| Value | Description |
|-------|-------------|
| `Primary` | Primary contact. |
| `Business` | Business contact. |
| `Emergency` | Emergency contact. |
