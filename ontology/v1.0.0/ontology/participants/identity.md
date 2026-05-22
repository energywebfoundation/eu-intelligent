# Participants Domain: DecentralizedIdentity, IdentityCredential, UserAccount, UserPreferences

---

## int:DecentralizedIdentity

**IRI:** `int:DecentralizedIdentity`

**Subclass of:** `owl:Thing`

**Standard mapping:** W3C DID Core 1.0

A W3C Decentralised Identifier (DID) record for an `Actor`. Used as the cryptographic identity anchor within the Energy Web Digital Spine (EWDS) ecosystem. Required for EWDS integration (D6.1 §3.3, D3.2 User Onboarding).

### Datatype Properties

| Property | IRI | Range | Description |
|----------|-----|-------|-------------|
| did | `int:decentralizedId` | `xsd:string` | The DID string (e.g. `did:ethr:0xabcd...`). W3C DID Core 1.0 format. |

### Object Properties

| Property | IRI | Range | Cardinality | Description |
|----------|-----|-------|-------------|-------------|
| hasActor | `int:hasActor` | [`int:Actor`](participant.md#intactor) | `owl:exactly 1` | Actor this DID belongs to. |
| holdsCredential | `int:holdsCredential` | [`int:IdentityCredential`](#intidentitycredential) | `owl:minCardinality 0` | Credentials issued to this DID. |

---

## int:IdentityCredential

**IRI:** `int:IdentityCredential`

**Subclass of:** `owl:Thing`

**Standard mapping:** W3C Verifiable Credentials Data Model v2.0

A Verifiable Credential (VC) issued to a `DecentralizedIdentity`. Used for KYC verification and Green Proof issuance within EWDS. Managed by the Energy Web Self-Sovereign Identity Hub (SSI-Hub).

### Datatype Properties

| Property | IRI | Range | Description |
|----------|-----|-------|-------------|
| credentialId | `int:credentialId` | `xsd:string` | Unique identifier. RFC 4122 UUID v4. |
| credentialNamespace | `int:credentialNamespace` | `xsd:string` | Dot-separated namespace representing the VC (e.g. `user.roles.integration.apps.intelligent.auth.ewc`). |
| credentialType | `int:credentialType` | `xsd:string` | The credential type issued to the EWDS client gateway user (e.g. `user`). |
| issuedTo | `int:issuedTo` | `xsd:string` | DID of the credential recipient. |
| issuedBy | `int:issuedBy` | `xsd:string` | DID of the credential issuer. |
| credentialStatus | `int:credentialStatus` | `owl:oneOf` | Whether the credential is active or revoked. |
| validFrom | `int:validFrom` | `xsd:dateTime` | Start of credential validity. ISO 8601 with timezone. |
| validUntil | `int:validUntil` | `xsd:dateTime` | End of credential validity. NULL if no expiry. ISO 8601 with timezone. |

### Object Properties

| Property | IRI | Range | Cardinality | Description |
|----------|-----|-------|-------------|-------------|
| hasCredentialOwner | `int:hasCredentialOwner` | [`int:DecentralizedIdentity`](#intdecentralizedidentity) | `owl:exactly 1` | DID this credential is issued to. |
| hasCredentialIssuer | `int:hasCredentialIssuer` | [`int:DecentralizedIdentity`](#intdecentralizedidentity) | `owl:exactly 1` | DID of the issuing authority. |

### Enumeration Values

#### int:credentialStatus

| Value | Description |
|-------|-------------|
| `Active` | Credential is valid and in use. |
| `Revoked` | Credential has been revoked. Revocation is applied automatically by the SSI-Hub when the credential expires. |

---

## int:UserAccount

**IRI:** `int:UserAccount`

**Subclass of:** `owl:Thing`

**Standard mapping:** `foaf:OnlineAccount`

The platform access layer for an `Actor`. One `UserAccount` per `Actor`. Created automatically during the D3.2 User Onboarding and Credential Issuance workflow. The `kycVerified` flag gates activation of financial transactions — the billing service will not generate invoices or process payments until it is `true`.

### Datatype Properties

| Property | IRI | Range | Description |
|----------|-----|-------|-------------|
| accountId | `foaf:accountId` | `xsd:string` | Unique identifier. RFC 4122 UUID v4. |
| username | `int:username` | `xsd:string` | Unique login identifier. Case-insensitive. Typically the actor's primary email but stored separately so the email can change independently. |
| authProvider | `int:authProvider` | `owl:oneOf` | Authentication mechanism used by this account. |
| accountStatus | `int:accountStatus` | `owl:oneOf` | Current operational status of the platform account. |
| kycVerified | `int:kycVerified` | `xsd:boolean` | True when KYC verification is complete. Set by the BLOOO billing service after PSP verification. Default `false`. |
| createdAt | `int:createdAt` | `xsd:dateTime` | Timestamp when the account was created. ISO 8601 with timezone. |
| lastLoginAt | `int:lastLoginAt` | `xsd:dateTime` | Timestamp of the most recent successful login. NULL until first login. ISO 8601 with timezone. |
| updatedAt | `int:updatedAt` | `xsd:dateTime` | Timestamp of the last modification to this record. ISO 8601 with timezone. |

### Object Properties

| Property | IRI | Range | Cardinality | Description |
|----------|-----|-------|-------------|-------------|
| hasActor | `int:hasActor` | [`int:Actor`](participant.md#intactor) | `owl:exactly 1` | Actor who owns this account. |

### Enumeration Values

#### int:authProvider

| Value | Description |
|-------|-------------|
| `Local` | Username and password stored in the auth service. |
| `EWDS-DID` | W3C DID-based authentication via the Energy Web Digital Spine (D6.1 §3.3). |
| `eIDAS` | EU digital identity wallet per eIDAS V2 (Grant Agreement IP9). |
| `APIKey` | Machine-to-machine with SHA-256 hashed key, used by FOS Trading Module (D4.4 M18). |
| `Token` | Token-based authentication as used at Greenvolt and HSLU pilot data APIs (D6.1 §5). |

#### int:accountStatus

| Value | Description |
|-------|-------------|
| `PendingVerification` | Account created; KYC not yet complete. Cannot execute financial transactions. |
| `Active` | Fully onboarded, KYC complete, able to trade and receive invoices. |
| `Suspended` | Temporarily disabled (e.g. outstanding invoice or community operator action). |
| `Locked` | Security lock after repeated failed login attempts. |
| `Deactivated` | Actor has exited the community. Account closed but retained for audit/GDPR requirements. |

---

## int:UserPreferences

**IRI:** `int:UserPreferences`

**Subclass of:** `owl:Thing`

**Standard mapping:** None. Platform UX and FOS optimisation preference record.

User-configurable preferences governing both UI display and FOS trading behaviour. One record per `UserAccount`.

### Datatype Properties

| Property | IRI | Range | Description |
|----------|-----|-------|-------------|
| language | `int:language` | `xsd:string` | Preferred UI language. IETF BCP 47 tag (e.g. `en`, `de-CH`, `fr`, `pt-PT`). |
| timezone | `int:timezone` | `xsd:string` | Preferred timezone for displaying timestamps. IANA TZ database name (e.g. `Europe/Zurich`). |
| currencyDisplay | `int:currencyDisplay` | `xsd:string` | Preferred display currency. ISO 4217. Display only — actual billing currency is set on `EnergyCommUnit`. |
| dashboardLayout | `int:dashboardLayout` | `owl:oneOf` | Preferred dashboard layout mode. |
| notificationsEnabled | `int:notificationsEnabled` | `xsd:boolean` | Master switch for platform notifications. GDPR consent flag. |
| notificationChannel | `int:notificationChannel` | `owl:oneOf` | Preferred notification delivery channel. |
| tradeAlerts | `int:tradeAlerts` | `xsd:boolean` | Receive alerts when a trade is matched or settled. |
| billingAlerts | `int:billingAlerts` | `xsd:boolean` | Receive notifications when a new invoice is generated or payment is due. |
| FOSObjective | `int:FOSObjective` | `owl:oneOf` | High-level trading objective for the FOS Trading Module. |
| dataShareConsent | `int:dataShareConsent` | `xsd:boolean` | GDPR consent to share anonymised data with consortium research partners. Default `false`. |
| comfortPriority | `int:comfortPriority` | `owl:oneOf` | Preference for thermal comfort vs. energy cost trade-off in FOS optimisation. |
| riskAversion | `int:riskAversion` | `owl:oneOf` | Actor preference for risk-taking while trading under uncertainty. |
| energySourcePreference | `int:energySourcePreference` | `xsd:string` | Preferred energy source types for trade matching. |
| tradingPartnerPreference | `int:tradingPartnerPreference` | `xsd:string` | Preferred trading partner identifiers. |
| targetIndoorTemperature | `int:targetIndoorTemperature` | `xsd:float` | Target indoor temperature setpoint in °C. |
| maxIndoorTemperature | `int:maxIndoorTemperature` | `xsd:float` | Maximum allowable indoor temperature in °C. |
| minIndoorTemperature | `int:minIndoorTemperature` | `xsd:float` | Minimum allowable indoor temperature in °C. |
| targetDepartureEVSOC | `int:targetDepartureEVSOC` | `xsd:float` | Desired EV state of charge at departure time (0–1). |
| minimumEVSOC | `int:minimumEVSOC` | `xsd:float` | Minimum EV state of charge to maintain at all times (0–1). |
| targetDepartureTime | `int:targetDepartureTime` | `xsd:dateTime` | Expected next EV departure time. ISO 8601 with timezone. |
| updatedAt | `int:updatedAt` | `xsd:dateTime` | Timestamp of the last update to this preferences record. ISO 8601 with timezone. |

### Object Properties

| Property | IRI | Range | Cardinality | Description |
|----------|-----|-------|-------------|-------------|
| hasActor | `int:hasActor` | [`int:Actor`](participant.md#intactor) | `owl:exactly 1` | Actor whose preferences this record captures. |

### Enumeration Values

#### int:dashboardLayout

| Value | Description |
|-------|-------------|
| `Overview` | High-level summary cards. |
| `Detailed` | Full charts and data tables. |
| `Compact` | Minimal view optimised for mobile. |

#### int:notificationChannel

| Value | Description |
|-------|-------------|
| `Email` | Sent to `ContactDetails.email`. |
| `InApp` | Shown in the UI notification panel. |
| `Push` | Mobile push notification. |
| `SMS` | Sent to `ContactDetails.mobileNumber`. |

#### int:FOSObjective

| Value | Description |
|-------|-------------|
| `MinimiseCost` | Prioritise lowest energy purchase price. |
| `MaximiseGreenEnergy` | Prefer trades with renewable energy sources. |
| `MaximiseSelfConsumption` | Maximise use of locally generated energy before buying. |
| `Balanced` | FOS default weighted combination. |

#### int:comfortPriority / int:riskAversion

| Value | Description |
|-------|-------------|
| `Low` | Low priority/aversion. |
| `Medium` | Balanced. |
| `High` | High priority/aversion. |
