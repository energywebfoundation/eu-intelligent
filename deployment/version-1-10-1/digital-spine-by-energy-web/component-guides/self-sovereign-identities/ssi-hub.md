# SSI-Hub

## Overview

An Asset must be ‘owned’ by another entity that has a DID on the Energy Web Chain. Asset owners can transfer ownership of an asset to other identities on the Energy Web Chain. Once the transfer is initiated, the new owner must accept the transfer for it to be complete.

The Asset’s chain of custody is recorded on the blockchain so that all historical and current owners of an Asset are tracked. A user’s current and formerly owned assets can be retrieved by using their DID to query the IAM cache server for their Assets.

### Architecture (Application details)

<figure><img src="../../../../.gitbook/assets/image (249).png" alt=""><figcaption><p>IAM architecture</p></figcaption></figure>

### Components

#### DID Cache Server

The SSI-Hub aims to be a server application to provide SSI and IAM functionality as a part of an SSI wallet system. It performs the following functions:

* Facilitates the credentials exchange between credential requesters and issuers.
* Account multi-tenancy. Multiple users can store their data and data access is authorized appropriately.
* Caches smart contract data such DID documents in order to improve read-query performance.

#### IAM Client Library

IAM Client Library is a TypeScript library to be used in decentralized applications for authentication and authorization using Decentralized Identifiers (DIDs) and Verifiable Credentials (VCs).

#### Switchboard

The Switchboard dApp is a decentralized application that provides a user interface to interact with the IAM client library.

Switchboard allows users to:

* Create self-sovereign Decentralized Identifiers (DID) for users and assets using a connection with a crypto wallet such as MetaMask. DIDs are anchored in a smart contract on the Energy Web Chain.
* Define hierarchical, role-based structures for organizations, applications and assets that participate in grid activities.
* Request and issue Verifiable Credentials that are required to take on roles within an organization or application that is registered on Switchboard.

