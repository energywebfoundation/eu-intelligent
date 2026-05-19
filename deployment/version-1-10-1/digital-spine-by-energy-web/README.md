# Digital Spine by Energy Web

## Background

<figure><img src="../../.gitbook/assets/image (129).png" alt="" width="563"><figcaption><p>The Digital Spine Ecosystem</p></figcaption></figure>

Decarbonizing electric grids around the world is the single most impactful step we can take to mitigate climate change. Luckily, we are headed in the right direction: renewables and small scale clean energy assets called distributed energy resources or DERs—assets like electric vehicles, rooftop solar systems, batteries, and other flexible electric loads—are being deployed at an unprecedented rate. Unfortunately, it’s not fast enough: to achieve net-zero emissions by 2050, annual clean energy [deployment needs to be three times higher than it is today](https://assets.bbhub.io/professional/sites/24/energy-transition-investment-trends-2023.pdf) through at least 2030. And if we want to get there, we have to overcome a serious obstacle: today’s electric utilities are not equipped with the tools needed to manage a renewable grid populated with millions upon millions of DERs.&#x20;

\
The grid works by maintaining a precise balance between supply and demand. Today, utilities achieve this via a century-old model: generate power in large, centralized stations and feed it one-way to customers. This model assumes 1) utilities have direct visibility and control over power plants and 2) customer demand for electricity is fixed and predictable. These axioms are no longer valid: renewable energy output is variable and largely a function of weather while demand for electricity from customers—who now own DERs capable of storing electricity, shifting when it’s used, or even injecting power back into the grid— is anything but fixed and predictable. A grid composed of vast amounts of renewables and DERs presents a complete paradigm shift for electric utilities. <br>

Utilities have never faced a challenge like this before, nor are they equipped with the tools needed to manage this new paradigm. We aim to change this with a Digital Spine.&#x20;

## Digital Spine Overview

<figure><img src="../../.gitbook/assets/image (130).png" alt=""><figcaption><p>DIGITAL SPINE: Conceptual Diagram</p></figcaption></figure>

In its simplest form, a Digital Spine is a thin layer of interoperability that connects and communicates information between all of the hardware, software, and organizational systems comprising a grid in near real time. In contrast to the existing information technology landscape that utilities rely on today (which features limited information sharing between isolated and fragmented systems) a Digital Spine offers an open-access, cohesive infrastructure that is jointly governed and operated as a public good.&#x20;

Today the concept of a Digital Spine  - a common digital layer for transactions and interoperability for all actors and processes in an energy system - is being developed in multiple energy markets globally.&#x20;

Energy Web's Digital Spine toolkit includes four elements:

* **Identity and Access Management (IAM):**  this component implements a unified authentication and authorization framework using self-managed, sovereign digital identities. This gives utilities and other grid participants the ability to mutually authenticate each other’s identity and authorize selective disclosure or communication of information based on their respective roles and responsibilities. A key benefit of this approach, in contrast to existing piecemeal systems, is delivering a “single sign on” user experience that improves interoperability and streamlines trusted integrations between devices, systems, and organizations without relying on a central administrator.&#x20;
* **Data and Message Exchange Module:** this component is a secure, open-access messaging infrastructure that 1) allows market participants to send, receive, and authenticate messages based on the roles that have been issued to and associated with their self-managed identity; 2) allows market participants to exchange diverse datasets, ranging from real-time telemetry to bulk file uploads; and 3) requires only a single integration mechanism with a central infrastructure in order to communicate via one:one (unicast), one:many (broadcast), and many:many (multicast) channels.&#x20;
* **Data Hub Client Gateway**: this component is an independent application that Digital Spine participants deploy in order to access the shared message broker. The Client Gateway provides a standardized interface to read and write messages in specific channels within the message broker.&#x20;
* **Joint Business Processing:** for DERs to be fully utilized, in many instances information needs to be transmitted amongst three or more parties in a way that does not reveal all data to all parties. In these instances, Energy Web has developed an open source, decentralized technology called “[Worker Nodes](../../ewx-ecosystem/worker-nodes/)” that ingest data from external sources, execute custom workflows based on predefined business logic, and vote on results in order to establish consensus without revealing or modifying the underlying data. This technology borrows concepts from public distributed ledger solutions, namely distributed consensus protocols which use cryptographic techniques to establish provably correct and timely results.&#x20;

