<p align="center">
  <a href="https://www.energyweb.org" target="blank"><img src="./images/EW.png" width="120" alt="Energy Web Foundation Logo" /></a>
</p>


# INTELLIGENT Project — Energy Web AG (EWAG) Repository

> EU Horizon Project | Grant Agreement No. 101160678 | Work Package 3 (Lead: EWAG)

This repository is maintained by **Energy Web AG (EWAG)** as the lead beneficiary of **WP3 — Data Integration and Interoperability Infrastructure** in the INTELLIGENT project. It serves as the central documentation and artefact store for EWAG's technical contributions, including the common data ontology, JSON Schema definitions, Digital Spine architecture and design documents, and deployment materials.

## About the INTELLIGENT Project
 
INTELLIGENT is an EU-funded Horizon Europe project (Grant No. 101160678) developing critical, cutting-edge technology to equip citizens organised in energy communities and their grid operators to deploy peer-to-peer (P2P) energy trading at scale.
 
The project builds on Grid Singularity's open-source P2P platform (GSY DEX), expanding its capabilities to support advanced trading mechanisms such as multi-attribute auctions, while connecting spot and flexibility markets. The **Energy Web Digital Spine (EWDS)** serves as the secure, interoperable data exchange middleware underpinning all platform services.

Four pilot sites demonstrate the platform in real-world conditions:
 
| Pilot | Location | Partner |
|-------|----------|---------|
| Pilot 1 | Living Lab, Switzerland (CELL) | HSLU |
| Pilot 2 | Lugaggia Innovation Community (LIC), Switzerland | AEM |
| Pilot 3 | Greenvolt Comunidades, Portugal | GV / ERE |
| Pilot 4 | Inis Mór, Aran Islands, Ireland | UG / CFA |

## EWAG's Role and Scope
 
EWAG participates as an **Associated Partner (AP)** and acts as the **WP3 Lead Beneficiary**. EWAG's core responsibilities in the project are:
 
- **T3.1** (Lead): Design, develop and deploy the **Energy Web Digital Spine 2.0 (EWDS 2.0)** — an interoperable, blockchain-based data exchange platform.
- **T3.2** (Participant): Customise the Off-Chain Storage worker to handle asset-level measurement storage, trades storage and order book storage, serving as an API gateway between off-chain data and on-chain processes.
- **T3.3** (Participant): Support ERE in middleware development for grid operator data exchange, ensuring seamless interconnection with the EWDS.
- **T3.4** (Lead): Deploy the **Green Proofs** open-source guarantee-of-origin solution to track and match renewable electricity generation and consumption at 30-minute granularity (24/7 renewables matching).
- **T3.5** (Lead): Develop **OCN 2.0** — an EV charging data integration service as an add-on to EWDS.
- **Cross-cutting**: Develop and maintain the **common data ontology** used across all INTELLIGENT platform services, and support API development for partner integrations.

## Repository Purpose
 
This repository documents and version-controls EWAG's technical deliverables and related artefacts. Specifically, it contains:
 
1. **Ontology documentation** — the final, versioned common ontology developed for the INTELLIGENT platform, covering all entity classes, attributes, validation rules, and standard mappings.
2. **JSON Schema definitions** — machine-readable schemas derived from the ontology, used for data validation and interoperability across services.
3. **Digital Spine architecture and design documents** — system architecture, integration patterns, and API specifications for EWDS 2.0.
4. **Deployment manuals** — step-by-step guides for deploying and configuring EWDS, Green Proofs, and OCN 2.0 components.
5. **Supporting documents** — working materials such as the ER diagram, ontology mapping references, and task tracking references.

## Key Deliverables (EWAG-led)
 
| Deliverable | Description | Due | Status |
|-------------|-------------|-----|--------|
| D3.1 — EWDS 2.0 | Client gateway service for asset and device data integration (GitHub + docs) | M18 | In Progress |
| D3.3 — OCN 2.0 | Service for EV charging data integration (GitHub + docs) | M18 | In Progress |
| D3.5 — Green Proofs | Guarantee-of-origin service to track energy source and use in LECs (GitHub + docs) | M18 | In Progress |
 
EWAG also contributes to D3.2 (off-chain storage, led by GSY) and D3.4 / D3.6 (grid operator API, led by ERE).

## Connect with Energy Web
- [Twitter](https://twitter.com/energywebx)
- [Discord](https://discord.com/channels/706103009205288990/843970822254362664)
- [Telegram](https://t.me/energyweb)

## Acknowledgement

<table>
  <tr>
    <td valign="middle" width="100">
      <img src="./images/EU.webp" alt="Funded by the European Union" width="80">
    </td>
    <td valign="middle">
      This work is carried out in the context of the INTELLIGENT project, funded by the European Union under the Horizon Europe programme (Grant Agreement No. 101160678). Views and opinions expressed are those of the authors only and do not necessarily reflect those of the European Union or CINEA. Neither the European Union nor the granting authority can be held responsible for them.
    </td>
  </tr>
</table>

## License

This project is licensed under the GNU General Public License v3.0 or later - see the [LICENSE](LICENSE) file for details

