# Design and Architecture

## Overview

<figure><img src="../../.gitbook/assets/image (131).png" alt="" width="563"><figcaption><p>The Digital Spine Ecosystem</p></figcaption></figure>

The idea behind the design and architecture of Digital Spine is very simple: develop a trust-less, schema-agnostic data exchange between self-sovereign participants through a shared infrastructure, and enable consortia and/or industry-driven standards creation and adoption

The main goal of creating Digital Spine is to develop and deploy an open-source, globally applicable infrastructure that gives governments, regulators, and electricity market participants the ability to see, to interact with, to plan for, and to take full advantage of the flexibility and value which Distributed Energy Resources (such as electric vehicles and their charging stations, distributed solar systems, batteries, heat pumps, etc.) can provide.

## High Level Design

<figure><img src="../../.gitbook/assets/image (132).png" alt=""><figcaption><p>DIGITAL SPINE: High Level Design</p></figcaption></figure>

The Digital Spine is mainly composed of 5 major systems:

* **Self-Sovereign Identities Hub (SSI-Hub):** for [DID](https://www.w3.org/TR/did-core/)-based [verifiable credentials](https://www.w3.org/TR/vc-data-model/) management.
* **Energy Web Name Service (ENS):** for mapping human-readable names to their DID addresses.
* **Decentralized Data Hub Message Broker:** provides message routing, persistence, and delivery for seamless data exchange between 2 or more participants.
* **Decentralized Data Hub Client Gateway:** provides a user interface and API for administration and interaction with the message broker.
* **Participant System:** additional systems that integrate with the API provided by the client gateway.

