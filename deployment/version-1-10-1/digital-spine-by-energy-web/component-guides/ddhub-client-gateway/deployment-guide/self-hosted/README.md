# Self-Hosted

## Overview

The DDHub Client Gateway (also known as Client GW) is the most essential component of the EW Digital Spine solution. It acts as a bridge for different systems and services to interact with the rest of the participants within the Digital Spine ecosystem. It provides user interfaces and APIs for sending, receiving, and authenticating messages within the shared infrastructure.

This section aims to give a step by step guide for a smooth and seamless deployment of the Client GW for participating entities who want to host it by themselves.

Before deploying the Client GW, it is important to be familiar with the following concepts, terms, and requirements.

## Core Concepts

Users of the Digital Spine platform should understand a few key concepts and terms:

1. The sender of a message will specify a channel through which the sender sends that message. The channel specifies the specific enterprise users, or types of enterprise users, that are able to receive that message. For example, a user could send a message to a channel that specifies that all aggregators may read any message sent to that channel.
2. The sender of a message will specify a topic for that message. The topic is the data schema that defines and standardises the payload of messages sent within the platform. For example, the topic “srcEvent” could specify, among other things, the date, time, vendor name, email address, equipment ID, start time, end time, and service type for Supplementary Reserve Capacity.
3. Each enterprise user of the platform is assigned a role. Roles are used to facilitate authentication (i.e., logging in) and to determine what messages the user can receive. For example, if one user creates a channel that allows messages to be received by any aggregator, then any user with the role “aggregator” can receive all messages sent to that channel.
4. Additionally, users may elect to configure their companies' Client GWs to support user types, which allow for different sets of permissions to be granted to individual users. User types are used to differentiate between administrators (who have access to a range of functionality relating to the configuration of channels and topics) and business operations users (who access only the functionality relating to sending and receiving messages).
5. Applications are spaces that contain sets of channels, topics, and roles.&#x20;

Organisations are the administrators that govern the creation of applications, roles, topics, and channels.

## **Self-sovereign Identities**

The Digital Spine platform leverages ‘self-sovereign identity’ (SSI), which is a growing paradigm that promotes an individual’s control over that individual’s identity and data. This is in contrast to the traditional paradigm in which most official identifiers (e.g., driver’s license, usernames) are maintained by a central authority, user data can be shared without knowledge or consent (especially in the event of a cybersecurity breach), and where roles, access, and permissions can be centrally revoked without user knowledge.

The two core elements of the SSI paradigm are:

1. Decentralised Identifiers ([DID](https://www.w3.org/TR/did-1.0/)): A DID is an identifier that can be generated and controlled by individuals or organizations without an external authority. It can be used to identify any subject, such as a non-tangible asset, a customer, or an organisation. Users can create DIDs for themselves or an asset using cryptographic or other means. DIDs are stored in registries, which are typically implemented on a decentralised ledger to ensure no one party can unilaterally change their parameters, but they can also be hosted in conventional servers or networks.
2. Verifiable Credentials ([VC](https://www.w3.org/TR/vc-data-model-2.0/)): A verifiable credential is a secure and machine-verifiable digital credential based on a standard data model. The use of digital signatures makes verifiable credentials more tamper-evident and more trustworthy than many conventional role-based digital identifiers. Much like a physical credential (e.g. a passport, or driver’s license), a VC typically contains:
3. Information related to identifying the subject of the credential (unique identifier)
4. Information related to the issuing authority (for example, Market Operator or another trusted party)
5. Information related to the type of credential represented (for example, a Retailer/Aggregator license, or a DNSP-specific credential)
6. Information related to specific attributes or properties being asserted by the issuing authority about the subject
7. Evidence related to how the credential was derived
8. Information related to constraints on the credential (for example, expiration date, or terms of use).

Together, DIDs and VCs can be used to implement identity and access management solutions that provide enterprise users of the platform with greater control over their identities and associated data.

## **EWC Account**

An EWC Account is an Ethereum-based wallet account connected to the Energy Web Chain network. The purpose of this account is to:

1. Hold EWTs for future chain-related transactions which are mainly to request roles known as VCs and publish them to the enterprise user’s [DID Document](https://www.w3.org/TR/did-1.0/#dfn-did-documents)
2. Acquire a unique public address used to construct a DID representing the enterprise user

To create an EWC Account, please refer to the [Creating an EWC Account](../preparing-to-set-up-a-client-gateway/creating-and-funding-an-ewc-account.md) section.

## **Energy Web Token (EWT)**

The Energy Web Token (EWT) is the main token used for chain-related transactions. EWC Accounts can hold EWTs.

To fund an EWC Account with EWTs, please refer to the [Funding an EWC Account](../preparing-to-set-up-a-client-gateway/creating-and-funding-an-ewc-account.md#funding-an-ewc-account) section.

## Namespaces

To understand how namespaces are created and used, please refer to ENS in [Digital Spine Ecosystem](../../../energy-web-name-service-ens/ens-in-digital-spine-ecosystem.md).

## **Target Deployment Environment**

Before deploying the Client GW, it is important to know and understand in advance in which environment it will be deployed to. It is best to identify if it will be deployed on premises or on cloud (e.g. AWS, Azure, etc), and which cloud provider to use in case of the latter.

## **Key Vault**

By default, [HashiCorp Key Vault](https://www.hashicorp.com/en/products/vault) is bundled with the deployment artifacts of the Client GW. However, integration with [AWS Key Manager](https://aws.amazon.com/secrets-manager/) or [Azure Key Vault](https://azure.microsoft.com/en-us/products/key-vault) is also possible. It is best to identify which key vault to use before deployment.&#x20;

## **mTLS Certificate**

The connection between the Client GW and the Message Broker may be protected with mTLS protocol. In such a case, the mTLS certificate needs to be requested from EWF.

Ideally, the participant will provide a CSR file then EWF creates the client certificate.

<br>



***





