# OCN 2.0 — EV Charging Data Integration

This folder contains all materials for **OCN 2.0**, the EV charging data integration component developed by Energy Web AG (EWAG) under Task 3.1 of the [INTELLIGENT project](https://intelligent-project.eu) (Grant Agreement 101160678).

OCN 2.0 extends the Energy Web Digital Spine (EWDS) 2.0 Client Gateway (CGW) to ingest, normalise, and publish EV charging installation data to the shared INTELLIGENT messaging layer. It is documented in project deliverable **D3.3 — OCN 2.0 (EWDS 2.0)**.

---

## Overview

OCN 2.0 acts as the bridge between EV charging infrastructure at INTELLIGENT pilot sites and the platform services that consume charging data: the Flexibility and Energy Optimisation Service (FOS) in WP4 and the Grid Singularity Decentralised Energy Exchange (GSY DEX) and billing/payment services in WP5.

**Important scope note:** At the INTELLIGENT pilot sites, EV chargers are not under direct control of the pilot operators. Pilots collect power and energy measurement data only, via smart meters or metering APIs operated by the local grid or utility partner. OCN 2.0 is therefore a **read-only data integration service** at this stage. It polls metering endpoints, normalises the retrieved values, and publishes them to EWDS. No write-path or control signal capability is included in the current implementation (see the roadmap section of D3.3 for the planned smart charging extension, conditional on pilot site support).

---

## Functional Modules

OCN 2.0 comprises four modules deployed within or alongside a CGW instance at each pilot site.

**Data acquisition module** — Connects to the pilot site metering endpoint (e.g. the AEM REST API at LIC) and retrieves active power readings and charger identification parameters at a configured polling interval. Abstracts site-specific connection details behind a common internal interface.

**Normalisation module** — Validates retrieved values against the charger's physical capacity bounds, resolves timestamps to UTC in ISO 8601 format, and confirms required identification fields are present. Where a retrieval attempt fails or returns an out-of-range value, the module carries the last valid reading forward, sets the `estimated` flag in the message metadata, and logs the event.

**Message mapper** — Constructs EWDS-format messages from normalised data, assigning the CSDM asset URI and facility URI, selecting the appropriate message type (`EV_CHARGER_POWER` or `EV_CHARGER_SPEC`), and attaching schema version metadata.

**Publisher interface** — Dispatches constructed messages to the designated EWDS topic channels using credentials and channel configuration established during CGW deployment. Operates asynchronously with a local message queue; retries on transient connectivity failures up to a configurable maximum retry count.

---

## Message Types

| Message type | Publication trigger | Primary consumers |
|---|---|---|
| `EV_CHARGER_POWER` | Each measurement interval (15 min at LIC; TBC at CELL) | FOS Task 4.1 (prediction), FOS Task 4.3 (flexibility estimation) |
| `EV_CHARGER_SPEC` | Initial CGW deployment; on asset configuration change | FOS Task 4.3, GSY DEX Task 5.2 (settlement) |

Both schemas are versioned at `v1.0` and located in `ontology/data-schemas/`. They are extensible: additional fields (e.g. `sessionEnergy_kWh`, `connectorStatus`) can be added in future schema versions without breaking backwards compatibility.

---

## Ontology and Semantic Data Model

OCN 2.0 contributes EV-charging-specific extensions to the shared INTELLIGENT Common Semantic Data Model (CSDM) at version 1.0. All classes and properties use the `int:` namespace.

Detailed documentation: [`ontology/README.md`](ontology/README.md).

CSDM instance data is maintained in Turtle RDF format. The LIC instance file (`lic_ev_charger.ttl`) is present at M18. The CELL equivalent will be added following confirmation of the CELL charger asset inventory in WP6 Task 6.1.

---

## Pilot Site Deployments

### Lugaggia Innovation Community (LIC), Switzerland
Pilot lead: AEM (Azienda Elettrica di Massagno)

LIC hosts one EV charging point with an installed capacity of 11 kW, located within the LIC distribution network in Capriasca, Canton Ticino. AEM's smart metering infrastructure (Landis+Gyr S650, PLC/RF network) provides active power readings at 15-minute resolution via REST API. The EV charger is one of several flexible assets at LIC, alongside 77 kWp of photovoltaics, 26 kW of heat pumps and electric boilers, and a 60 kWh / 50 kW district battery.

AEM operates and meters the charger; the pilot does not have direct control of the charging station. OCN 2.0 reads power output data only.

The OCN 2.0 deployment at LIC is complete and verified at M18. End-to-end data flow from the AEM REST API to the EWDS messaging layer has been confirmed, including receipt by the FOS prediction and flexibility estimation module prototypes.

### Collaborative Energy Living Lab (CELL), Switzerland
Pilot lead: HSLU (Hochschule Luzern)

CELL operates across three buildings in Buochs (canton of Nidwalden), accommodating 23 residential apartments and commercial office space. The site hosts 109 kW of photovoltaic generation, a 260 kWh battery system, a district heating connection, and one EV charger with 11 kW maximum power. There is no direct communication with the charging station; a smart meter conveys power and energy measurements.

The OCN 2.0 configuration for CELL is prepared as a template in `config/cell/`. Deployment will be finalised and executed following confirmation of the CELL charger asset inventory and data access interface in WP6 Task 6.1 (target: M24).

---

## Dependencies

OCN 2.0 requires the following components from the wider INTELLIGENT repository:

- **EWDS CGW client library** — available at [`/digital-spine/`](../digital-spine/)
- **CSDM ontology tooling** — available at [`/ontology/`](../ontology/)
- **Standard HTTP client library** — for REST API access (see `requirements.txt`)

OCN 2.0 installs alongside an existing CGW instance and does not require any modification to the shared EWDS infrastructure.

---

## Configuration

Site-specific deployment configurations are located in `config/lic/` and `config/cell/`. Full configuration parameter reference: [`docs/configuration.md`](docs/configuration.md).

Key parameters per site:

- Metering endpoint URL and authentication credentials
- Polling interval (aligned to metering resolution)
- Valid power range for the normalisation module (0 kW to installed capacity)
- CSDM asset URI and facility URI
- EWDS topic channel names for power and specification messages

---

## Deployment

Step-by-step deployment instructions: [`docs/deployment.md`](docs/deployment.md).

---

## Roadmap

| Activity | Partners | Start | End | Related tasks |
|---|---|---|---|---|
| CELL deployment and verification | HSLU | M19 | M24 | T6.1 |
| EV availability status field (conditional on site data) | AEM, HSLU | M19 | M24 | T4.1, T4.3 |
| Session-level energy data (conditional on metering capability) | AEM, HSLU | M21 | M28 | T5.2, T5.6 |
| Smart charging control signal propagation (conditional on pilot site support) | AEM, HSLU, TUM | M25 | M30 | T4.3, T6.3 |
| WP6 monitoring data support | HSLU, AEM | M25 | M36 | T6.5, D6.2 |

---

## References

- D3.3 — OCN 2.0 (EWDS 2.0), Energy Web AG, May 2026 (this deliverable)
- D3.1 — Energy Web Digital Spine — EWDS 2.0, Energy Web AG, May 2026
- INTELLIGENT project repository: https://github.com/energywebfoundation/eu-intelligent
- CORDIS project page: https://cordis.europa.eu/project/id/101160678

---

*Funded by the European Union. Views and opinions expressed are those of the author(s) only and do not necessarily reflect those of the European Union or CINEA.*
