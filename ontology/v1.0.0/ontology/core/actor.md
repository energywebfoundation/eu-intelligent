# Core: Actor, Address, ContactDetails

## Overview

This module defines the legal identity and contact information entities used for KYC verification and billing purposes in the INTELLIGENT platform. These classes are defined by BLOOO as part of the Billing and Payments service.

**Partners:** BLOOO

---

## Actor

**Contributing partners:** BLOOO
**Standard mappings:** CIM `Organisation`, IDSA `Participant`

An `Actor` represents the legal or natural person behind a `Member`. While `Member` is the operational identity within the platform (community participation, asset ownership), `Actor` captures the legal identity required for KYC verification before financial transactions can be processed through the Billing and Payments module.

Every `Member` has exactly one corresponding `Actor`.

### Attributes

| Attribute | Type | Required | Description | Standard Mapping | GDPR Notes |
|-----------|------|----------|-------------|-----------------|------------|
| `actorName` | string | Yes | Full legal name | CIM `IdentifiedObject.name` | Personal data |
| `actorType` | string | Yes | Entity type | CIM `OrganisationRole.kind` | e.g. `individual`, `organisation` |
| `legalEntity` | string | No | Registered legal entity name (for organisations) | IDSA `legalName` | |
| `taxId` | string | No | VAT or tax identification number | Jurisdiction-specific | Sensitive |
| `dateOfBirth` | date | No | Date of birth (individuals only) | ISO 8601 date | Sensitive personal data |
| `ownershipInformation` | TBD | No | Ultimate beneficial ownership data | IDSA `legalOwner` | Sensitive; see ADR-013 |

### Relationships

| Relationship | Target | Cardinality | Description |
|-------------|--------|-------------|-------------|
| `is` | Member | 1 to 1 | The platform member this actor represents |
| `has` | Address | 1 to many | One or more addresses (billing, business) |
| `has` | ContactDetails | 1 to many | Contact information records |

### Validation Rules

- `actorName` must be non-empty.
- `actorType` must be one of: `individual`, `organisation`.
- `dateOfBirth` must be present if `actorType` is `individual` and KYC verification is required.
- `taxId` format is jurisdiction-dependent; no universal validation.
- `ownershipInformation` must not be transmitted through EWDS without explicit consent; see ADR-013.

### Open Questions

- ADR-013: `ownershipInformation` structure and GDPR handling TBD (BLOOO action).

---

## Address

**Contributing partners:** BLOOO
**Standard mappings:** vCard, ISO 3166-1 / ISO 3166-2

A structured postal address used for billing, business, and correspondence purposes.

### Attributes

| Attribute | Type | Required | Description | Standard Mapping |
|-----------|------|----------|-------------|-----------------|
| `line1` | string | Yes | Primary street address | vCard `street-address` |
| `line2` | string | No | Secondary address line (apartment, unit, etc.) | vCard `extended-address` |
| `city` | string | Yes | City or municipality | vCard `locality` |
| `postalCode` | string | Yes | Postal or ZIP code | vCard `postal-code` |
| `country` | string | Yes | Country code (ISO 3166-1 alpha-2) | ISO 3166-1 |
| `state` | string | No | State, province, or region | ISO 3166-2 |

### Relationships

| Relationship | Target | Cardinality | Description |
|-------------|--------|-------------|-------------|
| `belongs to` | Actor | many to 1 | The actor who holds this address |
| `locates` | Invoice | 0 to many | Invoices associated with this address |
| `locates` | Stripe | 0 to many | Stripe payment records associated with this address |

### Validation Rules

- `country` must be a valid ISO 3166-1 alpha-2 code (e.g. `CH`, `IE`, `PT`, `FR`).
- `postalCode` format varies by country; basic non-empty validation required.
- `line1` must be non-empty.

### Notes

- The INTELLIGENT project pilots are located in Switzerland (CH), Ireland (IE), and Portugal (PT). Address validation should account for these jurisdictions' postal formats.
- `Member` contains flattened address sub-fields that mirror this class. ADR-002 proposes refactoring `Member` to reference `Address` directly.

---

## ContactDetails

**Contributing partners:** BLOOO
**Standard mappings:** vCard RFC 6350, E.164

Contact information record associated with an Actor.

### Attributes

| Attribute | Type | Required | Description | Standard Mapping |
|-----------|------|----------|-------------|-----------------|
| `email` | string | Yes | Primary email address | vCard `email`, RFC 5321 |
| `phoneNumber` | string | No | Landline phone number in E.164 format | E.164, vCard `tel` |
| `mobileNumber` | string | No | Mobile phone number in E.164 format | E.164, vCard `tel;type=cell` |

### Relationships

| Relationship | Target | Cardinality | Description |
|-------------|--------|-------------|-------------|
| `belongs to` | Actor | many to 1 | The actor who holds these contact details |

### Validation Rules

- `email` must conform to RFC 5321 format.
- `phoneNumber` and `mobileNumber`, when provided, must be in E.164 international format (e.g. `+41791234567`).
- At least one of `email`, `phoneNumber`, or `mobileNumber` must be present.

### GDPR Notes

All attributes in `ContactDetails` constitute personal data under GDPR. Access must be restricted to authorised services (Billing module, Community Manager interface) and must not be included in data exchanged through EWDS unless explicitly required and consented.
