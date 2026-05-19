---
hidden: true
---

# DDHub Message Broker

## Overview

The Message Broker is a server that provides message routing, persistence, and delivery for a seamless data exchange between an organization and its participants via their respective Client Gateways.

### Architecture (placeholder)

<figure><img src="../../../../.gitbook/assets/MB_architecture (1).png" alt=""><figcaption></figcaption></figure>

### Components

#### DID Auth Proxy

The DID auth proxy provides an authorization server and an `nginx` instance to allow applications to integrate the Energy Web DID solution into any RESTful API service without changing its source code.

#### Master Data and Message Metadata Storage

#### Large File Storage

#### NATS JetStream

JetStream is a built-in persistence engine for NATS which enables messages to be stored and replayed at a later time. Messages can be captured and replayed to consumers as needed.











