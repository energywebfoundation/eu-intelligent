# Self-Sovereign Identities

## Overview

Self-sovereign identity (SSI) is a growing paradigm that promotes an individual’s control over their identity and their data. This is in contrast to the current paradigm where most official identifiers (driver’s license, birth certificate, usernames, etc.) are given to users and maintained by a central authority, and where user data can be shared without their knowledge or consent (especially in the event of a cybersecurity breach) and where roles, access, and permissions can be centrally revoked without user knowledge.

### Core Concepts

#### Decentralized Identifiers (DID)

A DID is an identifier that can be generated and controlled by individuals or organizations without an external authority. It can be used to identify any subject, such as a non-tangible asset, a customer, or an organization. A user can create a DID for themselves or an asset using cryptographic or other means. A DID for a given system resides in a verifiable DID registry, which are typically implemented on a decentralized ledger to ensure no one party can unilaterally change its parameters. They may also be hosted in conventional servers or networks.

Each DID can be resolved to a DID Document, a JSON-LD object containing several attributes:

* the owner of the DID
* a list of valid cryptographic keys
* a list of ways that can be used to authenticate
* a list of service endpoints associated with the DID

These attributes help a third party to verify control for a given DID.

```json
// Example DID Document
{
  "@context": "https://www.w3.org/ns/did/v1",
  "id": "did:example:123456789abcdefghi",
  "authentication": [{
    //used to authenticate as did ...fghi
    "id": "did:example:123456789abcdefghi#keys-1",
    "type": "RsaVerificationKey2018",
    "controller": "did:example:123456789abcdefghi",
    "publicKeyPem": "-----BEGIN PUBLIC KEY...END PUBLIC KEY-----\r\n"
  }],
  "service": [{
    // used to retrieve Verifiable Credentials associated with the DID
    "id":"did:example:123456789abcdefghi#vcs",
    "type": "VerifiableCredentialService",
    "serviceEndpoint": "https://example.com/vc/"
  }]
}
```

#### Verifiable Credentials (VC)

A Verifiable Credential is a secure and machine-verifiable digital credential which respects a standard data model. The use of digital signatures makes verifiable credentials more tamper-evident and more trustworthy than many conventional role-based digital identifiers.&#x20;

Much like a physical credential (e.g. a passport, or driver’s license), a VC typically contains:

1. Information related to identifying the subject of the credential (unique identifier)
2. Information related to the issuing authority
3. Information related to the type of credential it is&#x20;
4. Information related to specific attributes or properties being asserted by the issuing authority about the subject
5. Evidence related to how the credential was derived
6. Information related to constraints on the credential (for example, expiration date, or terms of use).

Together DIDs and VCs can be used to implement Identity and Access Management solutions that provide users and organizations with greater control over their identities and associated data.
