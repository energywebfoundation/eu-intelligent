# Energy Web Green Proofs - Intelligent

This directory contains configuration used to adapt Energy Web Green Proofs to Intelligent project needs.
Energy Web Green Proofs itself is not public, and the code in this directory cannot be run without it.

Additionally, the content of this repository might change in future when needed (bugfixes, integration adjustments etc).

## About Energy Web Green Proofs

Energy Web Green Proofs is a framework for building customizable solutions for registering and tracking low-carbon products and their attributes throughout complex supply chains. It provides primitives and default business logic that can be further customized and extended (via code) in the **application configuration**.

### Energy Web Green Proofs primitives

All of the application's business requirements should be mapped to these primitives.

1. Unit - a read-only certificate containing metadata (per application), volume, and an owner. A unit can link to other units, creating a unit graph. Each operation on the unit creates new children unit(s) with modified data, which effectively allows tracking of certificate history.
2. IAM
  a. Account - owner of units, can have metadata (per application)
  b. Company - owner of accounts, can have metadata
  c. User - an actual user of the application, has separate memberships in accounts and companies, and has metadata (per application). Additionally, a user can be a *registry admin* (administrator); this additional role allows applications to have users with higher privileges than normal.
3. Process - a stateful and persistent entity that describes the operation being performed. Although some processes start and finish immediately, some might require collecting data over time (like participants' approvals). Not all possible actions are modeled using the process, but it is the main way to add custom behavior to the application.
4. Task - periodic job executing at a given time

### Deployment and configuration

It consists of two primary services deployed as three deployment units:

1. Backend - code running on the server, includes two modes of operation (deployed as individual units):
  a. API - responsible for exposing a read/write HTTP API to web and programmatic clients, managing permissions, and fulfilling requests for the clients.
  b. Tasker - responsible for processing application events, running periodic jobs, sending emails, etc.
2. Frontend - application's web UI interacting with backend HTTP API (deployed as a single unit)

Both backend and frontend are configurable through their respective configs.

## Intelligent configuration

### Frontend 

As for this proof of concept, the frontend is not configured in any way.

### Backend

The backend's job is to read trade records and self-consumption measurement from GSY DEX Off-Chain Storage (through Energy Web Digital Spine), process them, and create proper digital certificates.

This configuration uses the concept of *Energy Local Origin*, which indicates energy being transferred between participants based on a trade record from GSY DEX; and *Energy Self Consumption*, which indicates energy being issued and immediately retired for the same asset.

#### Reading trade records

Tasker periodically sends a message to EWDS to query information from GSY DEX. This message contains incremental time window. GSY DEX reads that message, and puts measurements and trade records for given time window back to EWDS. Tasker waits for those records to arrive.

Received records contains detailed information about [the participants, the energy traded, and the trade event itself] or about [self-consumption event]. After validating that the data is correct, records are split by type and each type is sorted by date separately. Trade records are sent to the queue as `LocalOriginReceived` events, and self-consumption records as `SelfConsumptionReceived` events, for further processing.

The period to query is divided into smaller 15-minute windows to avoid overloading the systems.

#### Trade record processing

Trade records are processed in order by initiating `LocalOriginEnergyProcess` for every one of them.

Because there is no onboarding, the process ensures that participants' accounts (certificate owners) exist, and creates them if they do not.

Then, it sends the trade record to the `EnergyEvent` class, which determines who the trade is between:

1. When the producer is non-storage, a certificate is issued.
2. When the consumer is non-storage, a certificate is retired for the consumer.
3. When the consumer is storage, the certificate is transferred (not retired) from the producer to the storage (retaining information about the producer).
4. When the producer is storage, certificates, instead of being issued, are selected (FIFO) from the list of certificates transferred to storage in case 3 above. These certificates are then retired for the consumer.

After that, the process finishes, leaving a historical entry of the event.

If the measurement for the storage producer's discharge is greater than the energy available in all certificates owned by the storage, the certificates are retired completely, and the excess energy is saved in the process record indicating the event.

If there is any problem (for example validation error), the information about encountered problem is saved in the process, and the process finishes with error state: the operation is aborted.

#### Self-consumption processing

Self-consumption records are processed in order by initiating `SelfConsumptionEnergyProcess` for each measurement.

Because there is no onboarding, the process ensures that participants' accounts (certificate owners) exist, and creates them if they do not.

Then, it sends the self-consumption record to the `EnergyEvent` class, with the site acting as both seller and buyer (never a battery): a certificate is issued to the site and retired for it.

After that, the process finishes, leaving a historical entry of the event.

If there is any problem (for example validation error), the information about encountered problem is saved in the process, and the process finishes with error state: the operation is aborted.

#### Reading certificates

Certificates can be read through a dedicated HTTP API, whose documentation is exposed under the `/api/swagger` endpoint.

The endpoint contains both Green Proofs endpoints and application configuration endpoints; Intelligent project endpoints can be found under the `INTELLIGENT` category.

The HTTP API documentation is built automatically from DTOs describing the endpoints.

For this proof of concept purpose the application is configured to work with special hardcoded JWT token.
This token should be send to `POST /api/auth/exchange` with JSON body: `{ "token": "<intelligentJwtToken>" }`.
The response will contain short-lived authorization token to be used with further requests (named: `authToken` later on).

Consult `/api/swagger` (section: INTELLIGENT) for endpoints documentation.

Example: `GET /api/intelligent/certificates?ownerId=<consumption_or_production_asset_id>` with headers: `Authorization: Bearer <authToken>` (auth token from the exchange).

#### Deployment configuration

The application can be additionally configured through enviromental variables per deployment. See `AppConfig` for more details.
