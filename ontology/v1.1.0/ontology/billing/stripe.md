# Billing Domain: Payment, StripePayment

---

## int:Payment

**IRI:** `int:Payment`

**Subclass of:** `owl:Thing`

**Standard mapping:** None. Platform-level payment transaction record.

A financial transaction that (partially or fully) settles an `Invoice`. Stripe-specific fields that were previously embedded on `Payment` have been removed and moved to `int:StripePayment`, which `Payment` references via `hasStripePayments`. The `residual` field has been removed — outstanding balance after a payment is applied belongs on `Invoice.outstandingAmount`.

### Datatype Properties

| Property | IRI | Range | Description |
|----------|-----|-------|-------------|
| paymentId | `int:paymentId` | `xsd:string` | Unique identifier. RFC 4122 UUID v4. |
| paymentDate | `int:paymentDate` | `xsd:dateTime` | Date and time the payment was made. ISO 8601 with timezone. |
| paymentAmount | `int:paymentAmount` | `xsd:float` | Amount paid in this transaction. |
| currency | `int:currency` | `xsd:string` | ISO 4217 currency code. |
| paymentMethod | `int:paymentMethod` | `owl:oneOf` | Payment method used. |
| paymentProvider | `int:paymentProvider` | `owl:oneOf` | Payment service provider. |
| paymentStatus | `int:paymentStatus` | `owl:oneOf` | Lifecycle status of the payment. |
| createdAt | `int:createdAt` | `xsd:dateTime` | Timestamp when this record was created. ISO 8601 with timezone. |
| updatedAt | `int:updatedAt` | `xsd:dateTime` | Timestamp when this record was last updated. ISO 8601 with timezone. |

### Object Properties

| Property | IRI | Range | Cardinality | Description |
|----------|-----|-------|-------------|-------------|
| hasInvoice | `int:hasInvoice` | [`int:Invoice`](invoice.md#intinvoice) | `owl:exactly 1` | Invoice being settled by this payment. |
| hasStripePayments | `int:hasStripePayments` | [`int:StripePayment`](#intstripepayment) | `owl:minCardinality 0` | Stripe-level payment records for this transaction. |

### Enumeration Values

#### int:paymentMethod

| Value | Description |
|-------|-------------|
| `bank_transfer` | Direct bank transfer. |
| `card` | Credit or debit card. |
| `sepa_debit` | SEPA direct debit. |

#### int:paymentProvider

| Value | Description |
|-------|-------------|
| `stripe` | Stripe payment platform. |
| `crypto` | Cryptocurrency payment per Grant Agreement IP9. |

#### int:paymentStatus

| Value | Description |
|-------|-------------|
| `pending` | Payment initiated but not yet completed. |
| `succeeded` | Payment successful. |
| `failed` | Payment failed. |
| `cancelled` | Payment cancelled. |
| `refunded` | Payment refunded. |

---

## int:StripePayment

**IRI:** `int:StripePayment`

**Subclass of:** `owl:Thing`

**Standard mapping:** None. Stripe payment provider integration record.

The Stripe-platform-level record for a payment transaction. Carries Stripe-specific identifiers and lifecycle status. Personal identity fields (`customerFullName`, `customerEmail`, `customerPhone`, `billingAddress`, `businessAddress`, `legalEntityName`, `actorType`, `taxId`, `ownershipInformation`) have been removed — all are already available via the associated `Actor` record through `hasCustomer` and `hasLegalEntity`.

### Datatype Properties

| Property | IRI | Range | Description |
|----------|-----|-------|-------------|
| stripeInvoiceId | `int:stripeInvoiceId` | `xsd:string` | Stripe's internal invoice identifier. Distinct from `int:Invoice.invoiceId`. |
| billingEmail | `int:billingEmail` | `xsd:string` | Email address to send payment receipt. |
| stripePaymentIntentId | `int:stripePaymentIntentId` | `xsd:string` | Stripe PaymentIntent identifier. |
| stripeInvoiceStatus | `int:stripeInvoiceStatus` | `owl:oneOf` | Stripe invoice lifecycle status. |
| stripeInvoiceAmountDue | `int:stripeInvoiceAmountDue` | `xsd:float` | Amount due per Stripe, in smallest currency unit (e.g. cents). |
| stripeInvoiceCurrency | `int:stripeInvoiceCurrency` | `xsd:string` | ISO 4217 currency code in lowercase (Stripe convention). |
| chargeAmount | `int:chargeAmount` | `xsd:float` | Amount charged, in smallest currency unit. |
| latestChargeId | `int:latestChargeId` | `xsd:string` | Stripe Charge identifier for the latest charge attempt. |
| paymentMethodTypes | `int:paymentMethodTypes` | `owl:oneOf` | Supported payment method(s) configured for this transaction. |
| paymentStatus | `int:paymentStatus` | `owl:oneOf` | Stripe payment lifecycle status. |
| receiptDeliveryStatus | `int:receiptDeliveryStatus` | `owl:oneOf` | Status of receipt delivery to the customer. |
| transactionDescription | `int:transactionDescription` | `xsd:string` | Free-text transaction description shown on the receipt. |
| failureReason | `int:failureReason` | `xsd:string` | Simplified reason explaining why the payment failed. NULL on success. |
| createdAt | `int:createdAt` | `xsd:dateTime` | Timestamp when the Stripe record was created. ISO 8601 with timezone. |
| updatedAt | `int:updatedAt` | `xsd:dateTime` | Timestamp when this record was last updated. ISO 8601 with timezone. |

### Object Properties

| Property | IRI | Range | Cardinality | Description |
|----------|-----|-------|-------------|-------------|
| hasGenericPaymentDetails | `int:hasGenericPaymentDetails` | [`int:Payment`](#intpayment) | `owl:exactly 1` | Platform-level payment record this Stripe record belongs to. |
| hasCustomer | `int:hasCustomer` | [`int:Actor`](../participants/participant.md#intactor) | `owl:exactly 1` | Actor representing the customer. |
| hasLegalEntity | `int:hasLegalEntity` | [`int:Actor`](../participants/participant.md#intactor) | `owl:maxCardinality 1` | Actor representing the legal entity, if different from the customer. |

### Enumeration Values

#### int:stripeInvoiceStatus / int:paymentStatus

| Value | Description |
|-------|-------------|
| `draft` | Not yet finalised. |
| `open` | Awaiting payment. |
| `paid` | Payment received. |
| `void` | Voided. |
| `uncollectible` | Could not be collected. |

#### int:paymentMethodTypes

| Value | Description |
|-------|-------------|
| `card` | Credit or debit card. |
| `sepa_debit` | SEPA direct debit. |
| `ideal` | iDEAL (Netherlands). |
| `bancontact` | Bancontact (Belgium). |
| `eps` | EPS (Austria). |
| `giropay` | Giropay (Germany). |
| `twint` | TWINT (Switzerland). |
| `customer_balance` | Bank transfer via Stripe customer balance. |
| `crypto` | Cryptocurrency per Grant Agreement IP9. |

#### int:receiptDeliveryStatus

| Value | Description |
|-------|-------------|
| `not_applicable` | Receipt not applicable for this transaction type. |
| `pending` | Queued for delivery. |
| `sent` | Sent to billing email. |
| `delivered` | Confirmed delivered. |
| `failed` | Delivery failed. |
| `bounced` | Email bounced. |
