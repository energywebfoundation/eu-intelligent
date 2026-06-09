# Deployment

This folder contains deployment artefacts for the **EW Digital Spine (EWDS) Client Gateway** across all INTELLIGENT project partners. It holds per-partner configuration, deployment notes, integration evidence, and version-specific files used to operate each Client Gateway instance.

The Client Gateway is the partner-side component of EWDS. Each INTELLIGENT partner runs its own instance to publish and subscribe to channels on the shared Message Broker, using EW DIDs and Verifiable Credentials for authentication and authorisation.

## Reference Documentation

Before standing up a partner instance, follow the canonical Energy Web deployment guide. The artefacts in this folder complement (rather than replace) the official documentation.

- **Client Gateway Deployment Guide (canonical):** https://docs.energyweb.org/energy-solutions/digital-spine-by-energy-web/component-guides/ddhub-client-gateway/deployment-guide
- **Inbound and Outbound Connections (firewall, ports, networking):** https://docs-launchpad.energyweb.org/energy-solutions/digital-spine-by-energy-web/component-guides/ddhub-client-gateway/deployment-guide/preparing-to-set-up-a-client-gateway/inbound-and-outbound-connections

Note: upstream docs use the legacy naming convention (ddhub-client-gateway) in URLs and headings. Energy Web Digital Spine was formerly known as Energy Web Data Hub (DDHub). The product and code are identical.

## Project Partners and Client Gateway Deployment Status

The table below tracks the deployment progress of the Client Gateway for each partner: whether the partner has been onboarded (DIDs issued, roles assigned), whether their gateway is configured (topics, channels, credentials loaded), and whether their end-to-end integration with EWDS has been verified in a working data exchange.

| Partner | Role / Pilot | Folder | Onboarded | Configured | Verified |
| --- | --- | --- | --- | --- | --- |
| R2M | User Interfaces (GUI) | [r2m/](./r2m/) | Yes | Yes | Yes |
| UoC | Optimization (AMM) | [uoc/](./uoc/) | Yes | No | No |
| TUM | Forecasting (FOS) | [tum/](./tum/) | Yes | Yes | No |
| GSY | Decentralized Energy Exchange (GSY DEX) | [gsy/](./gsy/) | Yes | No | No |
| BLOOO | Billing and Payments | [blooo/](./blooo/) | Yes | No | No |
| Greenvolt | Pilot 3: Industrial Communities (Portugal) | [greenvolt/](./greenvolt/) | Yes | No | No |
| ERE | Pilot 3: Industrial Communities (Portugal) | [ere/](./ere/) | Yes | No | No |
| UG | Pilot 4: Aran Islands (Ireland) | [ug/](./ug/) | Yes | Yes | Yes |
| CFA | Pilot 4: Aran Islands (Ireland) | [cfa/](./cfa/) | Yes | Yes | Yes |
| EWAG | Decentralized Data Exchange (host) | [ewag/](./ewag/) | Host | Host | Host |
| HSLU | Pilot 1: CELL (Switzerland) | [hslu/](./hslu/) | Yes | Yes | No |
| AEM | Pilot 2: LIC (Switzerland) | [aem/](./aem/) | Yes | Yes | No |

Source: `EWDS Client Gateway Participant Deployment Progress` overview (snapshot as of May 2026).

### Deployment Stages

1. **Onboarded**: the partner has been issued an EW DID, assigned the relevant roles, and registered against the EWDS namespace for INTELLIGENT.
2. **Configured**: the partner's Client Gateway instance is installed, credentials are loaded, and the relevant topics and channels are subscribed.
3. **Verified**: an end-to-end data exchange (publish and subscribe) has been demonstrated through the partner's Client Gateway against the EWDS Message Broker.

## Client Gateway Versions

Each partner sub-folder holds the configuration, manifests, and deployment notes for the version of the Client Gateway they currently run. The table below lists the Client Gateway releases in use across the project and maps them to the partner folders that hold the related files. Every partner sub-folder also contains a `version.md` that records the exact version deployed at that site.

| Version | Status | Related Sub-Folders | Notes |
| --- | --- | --- | --- |
| `1.10.1` | Current baseline across all partners | All per-partner sub-folders listed above (see each folder's `version.md`) | Baseline release used for INTELLIGENT integration. Manifests, .env templates, and verification logs in each partner folder refer to this release unless their `version.md` says otherwise. |

## Folder Layout

```
deployment/
  README.md
  r2m/        (.gitkeep, version.md)
  uoc/        (.gitkeep, version.md)
  tum/        (.gitkeep, version.md)
  gsy/        (.gitkeep, version.md)
  blooo/      (.gitkeep, version.md)
  greenvolt/  (.gitkeep, version.md)
  ere/        (.gitkeep, version.md)
  ug/         (.gitkeep, version.md)
  cfa/        (.gitkeep, version.md)
  ewag/       (.gitkeep, version.md)
  hslu/       (.gitkeep, version.md)
  aem/        (.gitkeep, version.md)
```

Each partner sub-folder currently contains a `.gitkeep` placeholder and a `version.md` documenting the deployed Client Gateway release (currently `1.10.1`). Folders will be populated with manifests, configuration, and verification evidence as each partner progresses through onboarding, configuration, and verification.

## Post-Deployment Checkup 

> **Disclaimer.** The items below are **suggestions only** and are offered as a courtesy starting point. They are not a project mandate, a security certification, or a substitute for the operating partner's own policies. Each partner is solely responsible for the configuration, hardening, operation, security, availability, and compliance of the Client Gateway instance they host. Neither Energy Web nor the INTELLIGENT consortium warrants that following this list will make a deployment fit for any particular purpose. Partners are free to adopt, adapt, replace, or skip any of the items below based on their own environment and risk appetite.

For authoritative network-level guidance (ports, protocols, ingress and egress endpoints), partners should consult the [Inbound and Outbound Connections](https://docs-launchpad.energyweb.org/energy-solutions/digital-spine-by-energy-web/component-guides/ddhub-client-gateway/deployment-guide/preparing-to-set-up-a-client-gateway/inbound-and-outbound-connections) page directly.

### Functional checks 

1. **End-to-end test message exchange.** Partners may wish to publish a test message on a dedicated test topic and confirm it is received by the counterpart Client Gateway, in both directions where applicable.
2. **Application health.** It can be useful to check that the gateway, scheduler, and any worker processes report a healthy state, that `/health` endpoints return success, and that startup logs do not contain fatal errors, reconnect loops, or missing-credential warnings.
3. **Dependencies operable.** Partners may want to verify that the secrets backend they chose (for example HashiCorp Vault, AWS SSM Parameter Store, AWS Secrets Manager, or Azure Key Vault) is reachable and unlocked, and that the PostgreSQL database is reachable, migrated to the expected schema version, and writable.
4. **DID and credentials valid.** Confirming that the partner DID resolves on the EWC chain, that assigned roles and Verifiable Credentials are present and not expired, and that the gateway can sign and verify messages against the EWDS namespace is generally a worthwhile check.

### Network and access controls 

5. **Firewall posture.** Aligning ingress and egress with the inbound/outbound matrix from the docs, and adopting a default-deny posture so only the documented protocols and ports are open, is commonly considered a good baseline.
6. **IP allowlist.** Restricting inbound traffic to known source ranges (for example the operating partner's admin VPN or application subnets) rather than 0.0.0.0/0 is a frequent hardening choice.
7. **UI Gateway access.** Many operators choose to front the Client Gateway UI with an authenticated reverse proxy or identity provider so it is only reachable by a named set of operators, rather than being exposed anonymously.
8. **CGW API and Scheduler exposure.** Keeping the REST API and scheduler endpoints off the public internet (bound to an internal interface, or behind a private load balancer) is a common practice.
9. **TLS.** Using valid certificates for all HTTPS listeners, retiring plain HTTP, and tracking certificate expiry is a sensible default.

### Secrets, identity, and permissions 

10. **API key handling.** Setting the `API_KEY` (and any peer-side equivalent) via environment variable or the secrets backend, keeping it out of source control, and rotating it on a schedule defined by the operating partner is a typical recommendation.
11. **Secrets via the secrets engine.** Pulling database passwords, signing keys, and integration credentials from the configured secrets engine at runtime, and reserving `.env` for non-sensitive configuration, is a common pattern.
12. **Least privilege.** Scoping cloud IAM roles (AWS IAM, Azure RBAC, GCP IAM) for the gateway, scheduler, and database to the minimum required actions and resources, and avoiding wildcard policies or shared service accounts across partners, is broadly considered good practice.

### Observability and operations 

13. **Log review.** Partners may want to scan logs for indications that the application is not operational (connection refused, panic, crash-loop, repeated authentication failures) and forward logs to their own central logging system.
14. **Monitoring and alerting.** Wiring up liveness, readiness, queue depth, message throughput, and database connection-pool metrics, with dashboards and alerts for gateway-down, broker disconnect, and certificate expiry, is a common operational baseline.
15. **Backups and disaster recovery.** Scheduled, restorable PostgreSQL backups together with a documented recovery procedure stored in the partner sub-folder is a typical recommendation.

