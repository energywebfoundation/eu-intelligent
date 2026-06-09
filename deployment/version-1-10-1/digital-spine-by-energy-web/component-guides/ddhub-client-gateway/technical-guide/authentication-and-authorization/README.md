# Authentication and Authorization

## Overview

The Client Gateway offers **flexible user authentication**, allowing enterprises to decide whether to enable or bypass user-specific authentication based on their operational requirements.

For organizations choosing to implement user authentication, the Client Gateway supports two primary user scopes:

1. **Admin Scope**
   * Provides full access to the configuration and management of the Client Gateway.
   * Admins can define message topics, manage storage, monitor scheduled tasks, and configure security settings.
   * They are responsible for maintaining the overall operation and performance of the CGW.
2. **Message Scope**
   * Limited to sending, receiving, and processing messages through the Client Gateway.
   * Users with this scope can interact with defined message topics but do not have access to system configuration or administrative tasks.

The Client Gateway uses a [**Self-Sovereign Identity (SSI)**](../../../self-sovereign-identities/ssi-hub.md) key called a [**DID (Decentralized Identifier)**](../../../../../../core-concepts/decentralized-identifiers-dids.md) to securely represent the gateway itself rather than individual users. Operational roles for the gateway are directly encoded in the DID.

***

## User Guide

### Pre-requisites

* An environment suitable to deploy a fresh Client Gateway
* A DID with roles assigned through [deploy-switchboard.md](../../../self-sovereign-identities/deployment-guide/deploy-switchboard.md "mention")
* A deployed [key-vault](../../deployment-guide/key-vault/ "mention") to store secrets

### Setting up user authentication

To enable user authentication, the Client Gateway must be deployed with the following environment variables:

```
ENV_1=
ENV_2=
```

User credentials can then be stored manually in the deployed Key Vault.

### Assigning a DID

Once an `Admin` scoped user logs into a fresh Client Gateway, there will be a form field to assign a DID to it. Once submitted, the backend service will sync all roles for the identity.

<figure><img src="../../../../../../.gitbook/assets/image (230).png" alt="" width="375"><figcaption><p>Enter private key</p></figcaption></figure>

<figure><img src="../../../../../../.gitbook/assets/image (231).png" alt="" width="375"><figcaption><p>Checking identity</p></figcaption></figure>

### Re-assigning a new DID

In the overview section of the Client Gateway, there is a section to manage the currently assigned DID. Press the button as shown below to clear the current DID in order to assign a new one.

<figure><img src="../../../../../../.gitbook/assets/image (232).png" alt=""><figcaption><p>Update DID</p></figcaption></figure>

<figure><img src="../../../../../../.gitbook/assets/image (233).png" alt="" width="375"><figcaption><p>Confirm reset private key</p></figcaption></figure>
