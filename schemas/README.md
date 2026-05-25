# INTELLIGENT Project — Energy Web Digital Spine Topic Schemas

**EU Horizon Innovation Action | Grant Agreement No. 101160678**

---

## Table of Contents

1. [What This Repository Is](#what-this-repository-is)
2. [How the Energy Web Digital Spine Uses These Schemas](#how-the-energy-web-digital-spine-uses-these-schemas)
3. [Schema Design Conventions](#schema-design-conventions)
4. [Versioning](#versioning)
5. [Relationship to the INTELLIGENT Ontology](#relationship-to-the-intelligent-ontology)
6. [Licence](#licence)

---

## What This Repository Is

This repository contains the **JSON Schema definitions used to configure Topics on the Energy Web Digital Spine (EWDS)** for the INTELLIGENT project.

In EWDS, a **Topic** is a schema-defined, versioned data interface. Every message sent or received through the Digital Spine must conform to the JSON Schema associated with its Topic. The Client Gateway validates all messages against their Topic schema on both the send and receive paths — this is how data integrity, interoperability, and access control are enforced across project partners.

These schema files are **operational configuration artefacts**. They are not documentation of the ontology. They are the actual payload definitions that partners configure in their Client Gateway instances to publish or subscribe to data flows within the INTELLIGENT platform.

---

## How the Energy Web Digital Spine Uses These Schemas

The Digital Spine information model has seven entities: DID, VC, ENS namespace, Application, Topic, Channel, Message. Topics and Channels are the two entities this repository is directly concerned with.

**A Topic** specifies the structure and semantics of a class of messages. Topics are versioned. A schema file in this repository corresponds to one Topic version. The Client Gateway validates every inbound and outbound message against the schema for its Topic.

**A Channel** is the governed pipe through which messages flow. Each Channel is bound to one or more Topics and configured with a direction (publish or subscribe), access restrictions (DID constraints and role-based VC requirements), and a protocol (messaging or file transfer).

The workflow for using these schemas is:

1. A partner registers their DID and obtains the relevant Verifiable Credentials (role claims) from the EWDS governance layer.
2. The partner configures their Client Gateway with the Channels they need — specifying direction, topic binding, and access rules.
3. When publishing, the partner constructs a message whose payload conforms to the JSON Schema for the relevant Topic. The Client Gateway validates the payload before forwarding it to the Message Broker.
4. When subscribing, the Client Gateway delivers incoming messages and validates them against the Topic schema before making them available to the partner's application.

The schema files in this repository are the authoritative source for step 3 and 4. Partners building integrations against EWDS must use these schemas to construct and validate payloads.

---

## Schema Design Conventions

**JSON Schema Draft 2020-12.** All schema files use `"$schema": "https://json-schema.org/draft/2020-12/schema"`.

**`$id` as Topic IRI.** Every schema carries a `$id` in the format `https://intelligent-project.eu/schema/{version}/{domain}/{TopicName}`. This IRI is the stable identifier for the Topic and is used when configuring Topic bindings in the Client Gateway.

**`additionalProperties: false`.** All schemas use strict validation. A message payload that contains fields not declared in the schema will be rejected by the Client Gateway. This prevents silent data loss and schema drift.

**Nullable fields.** Optional fields that may be absent in some messages are typed as `["string", "null"]` (or the appropriate base type with `null`) and carry `"default": null`. Required fields are listed in the `required` array.

**Enum fields.** Properties accepting a fixed set of values use `"enum": [...]`. This is the JSON Schema equivalent of the `owl:oneOf` constraint in the ontology layer and is directly enforced by the Client Gateway validator.

**UUID v4 foreign keys.** All inter-entity references are expressed as `string` with `"format": "uuid"`. These are not enforced by the schema itself but are validated at the application layer.

**ISO 8601 timestamps.** All datetime fields use `"format": "date-time"` and carry timezone offsets. Date-only fields use `"format": "date"`.

**Units in descriptions.** Measurement unit information (W, kWh, V, A, °C, etc.) is recorded in each property's `description` field. It is not enforced by the schema but is visible to any tooling that reads the schema.

**Asset subclass inheritance.** Asset subclass schemas (`BatteryUnit.json`, `PhotoVoltaicUnit.json`, etc.) use `"allOf": [{"$ref": "Asset.json"}]` to inherit all base `Asset` properties. A valid subclass message payload must satisfy both the base `Asset` schema and the subclass-specific constraints.

---

## Versioning

Topic schemas are versioned under `schema/v{major}.{minor}.{patch}/`. The versioning policy is:

- **Patch** (`v1.0.x`): non-breaking corrections — typo fixes in descriptions, adding optional nullable fields, tightening enum lists where all current values are retained.
- **Minor** (`v1.x.0`): backwards-compatible additions — new optional fields, new enum values, new Topic schemas.
- **Major** (`vx.0.0`): breaking changes — removing required fields, changing field types, renaming fields, removing enum values. Major version bumps require coordination with all affected partners before release.

All Topic schemas in a version directory are released together. Mixed-version deployments (e.g. a partner running `v1.0.0` Asset schemas alongside `v1.1.0` Market schemas) are supported by the Digital Spine's per-Topic versioning capability but must be explicitly agreed and documented in `CHANGELOG.md`.

---

## Relationship to the INTELLIGENT Ontology

This repository is separate from the INTELLIGENT ontology documentation repository. The two are related but serve different purposes:

| | Ontology Repository | This Repository (EWDS Schemas) |
|---|---|---|
| **Purpose** | Shared semantic understanding of the domain | Operational message payload definitions for EWDS |
| **Format** | Markdown class files, OWL/RDF annotations | JSON Schema Draft 2020-12 |
| **Audience** | All project partners, standards bodies, future reusers | Partner engineering teams integrating with EWDS |
| **Enforced by** | Not enforced — reference documentation | Enforced at runtime by the Client Gateway validator |
| **Change process** | Ontology workshop, spreadsheet consensus | Partner engineering review, CHANGELOG entry |
| **Versioning** | Semantic versioning of the ontology model | Per-Topic schema versioning in EWDS |

The schemas in this repository are **derived from** the ontology. Field names, types, and enum values here should be consistent with the canonical ontology definitions. Where the two conflict, raise an issue in the ontology repository. The ontology is the upstream authority; this repository is the downstream operational implementation.

---

## Licence

Apache 2.0. Published open-source in compliance with the INTELLIGENT project's Horizon Europe Open Access commitment (FAIR principles).