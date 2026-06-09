# DDHub Client Gateway

## Overview

The Energy Web Decentralized Data Hub (DDHub) Client Gateway is a suite of applications designed to facilitate seamless communication with the DDHub Message Broker. It provides both a user-friendly interface and an API, enabling organizations to efficiently send, receive, and validate messages within a shared messaging infrastructure.

The Client Gateway can be deployed on-premises or in a cloud environment. It has also been made available on platforms like Microsoft's Azure Marketplace, further simplifying deployment and integration for enterprises.

### Architecture

{% hint style="info" %}
The DDHub Client GW is not designed for public access (such as end-users) but for enterprise administrators to configure the data exchange channels and schemas for the seamless integration with enterprise systems/components, and be connected in the Digital Spine ecosystem.&#x20;

It must be deployed in a secured environment of the participating enterprise where access is controlled and well protected.
{% endhint %}

<figure><img src="https://lh7-rt.googleusercontent.com/docsz/AD_4nXcQcT1H0DATFb0M0D5V1Ffu9-iD7Otu7fKkxdzLqcDfrP1kgbZMCHA1RTA8V-pqX5adIPzMgKUxneXAizqXk1kYO35AbYfZBBXt1HeGNnoATRK8epREh7V7_0ssAk428dtrxhpy?key=mGFbmWWG1dkMmk1SuvbdKA" alt=""><figcaption></figcaption></figure>

Above illustrates the components and dependencies of the DDHub Client GW. The Client GW is mainly composed of the Client GW UI (React), Client GW API (NestJS), Client GW Scheduler (NestJS), Client GW Storage (PostgreSQL), Key Vault (default: HashiCorp Key Vault, other options: Azure Key Vault, AWS Key Management System).

The Client GW is uniquely identified by its decentralized identity (DID) and is granted with roles using verifiable credentials (VCs). DIDs and VCs are orchestrated using the EW Self-Sovereign Identities solution.

The communication between the DDHub Message Broker and the Client GW is secured with the mTLS protocol at the transport layer.

The Client GW Admins may access the Client GW UI with or without basic authentication. Participant Systems which integrate with the RESTful and WSS APIs of the Client GW may be required. Both authentication strategies are disabled by default and can be enabled through Client GW configuration during the deployment process.

### Components

The Client Gateway follows a standardized integration approach, simplifying data exchange among multiple independent organizations. By utilizing the Client Gateway, enterprises can streamline their interactions with the DDHub, reducing the complexity and resources typically required for such integrations.

#### Client Gateway UI

A user-friendly frontend application that allows `Admin` users to configure and manage the Client Gateway backend. `Message` users can interact the the application to send/view/acknowledge messages.

#### Client Gateway API

A robust API that directly interfaces with the DDHub Message Broker, facilitating the management of topics, message sending, and data retrieval. The API exposes RESTful and Websocket endpoints for seamless integration with other data sources, applications, and services.

#### Client Gateway Scheduler

A background service responsible for retrieving, caching, and managing scheduled tasks to optimize data processing and message handling.

#### Client Gateway Storage

A secure data storage solution that handles message caching, metadata management, and configuration data for efficient operation of the Client Gateway components.

#### Key Vault

A secure storage component for managing and protecting sensitive information such as encryption keys, credentials, and configuration secrets essential for the secure operation of the Client Gateway.













