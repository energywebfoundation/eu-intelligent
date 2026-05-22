# Billing: Stripe

## Overview

The `Stripe` class models the payment provider integration record for transactions processed via the Stripe platform. It captures Stripe-specific transaction identifiers, lifecycle status, and KYC-relevant actor data required by the payment service provider.

**Partners:** BLOOO

---

## Stripe

**Contributing partners:** BLOOO
**Standard mappings:** No standard ontology mapping; Stripe is a commercial payment service provider (PSP) integration record.

`Stripe` represents the external payment transaction record as maintained by Stripe, augmented with the actor identity data required for Stripe's KYC and compliance checks. It is linked to `Payment` (the platform-level payment record) and `Invoice` (the payable document).

### Attributes

| Attribute | Type | Required | Description | Notes |
|-----------|------|----------|-------------|-------|
| `customerFullName` | string | Yes | Full name of the customer as presented to Stripe | GDPR-sensitive |
| `customerEmail` | string | Yes | Email address associated with the Stripe customer | GDPR-sensitive |
| `customerPhone` | string | No | Phone number in E.164 format | GDPR-sensitive |
| `billingAddress` | Address | Yes | Billing address for this transaction | References `Address` class |
| `stripeInvoiceId` | string | Yes | Stripe's internal invoice identifier | Distinct from `Invoice.invoiceId`; see ADR-007 |
| `stripeInvoiceStatus` | string | Yes | Invoice status per Stripe's lifecycle | Stripe-defined |
| `stripeInvoiceAmountDue` | number | Yes | Amount due per Stripe (in smallest currency unit, e.g. cents) | |
| `stripeInvoiceCurrency` | string | Yes | ISO 4217 currency code | e.g. `eur` (Stripe uses lowercase) |
| `chargeAmount` | number | No | Amount actually charged in this transaction | |
| `billingCurrency` | string | No | Currency of the charge (may differ from invoice currency in rare cases) | ISO 4217 |
| `stripePaymentIntentId` | string | No | Stripe PaymentIntent reference for tracking the charge lifecycle | |
| `paymentStatus` | string | Yes | Status of the payment per Stripe | Stripe-defined |
| `receiptDeliveryStatus` | string | No | Whether a receipt was sent to the customer | |
| `billingEmail` | string | No | Email address receipts are sent to (may differ from `customerEmail`) | GDPR-sensitive |
| `transactionDescription` | string | No | Human-readable transaction description shown on the receipt | |
| `paymentMethodTypes` | string | No | Payment method(s) allowed for this transaction | e.g. `card`, `sepa_debit` |
| `createdAt` | timestamp | Yes | Timestamp when the Stripe record was created | OGC Time `Instant` |
| `updatedAt` | timestamp | Yes | Timestamp of last update to this Stripe record | OGC Time `Instant` |
| `latestCharge` | number | No | Amount of the most recent charge attempt | |
| `failureReason` | string | No | Reason for payment failure if applicable | |
| `legalEntityName` | string | No | Legal entity name for invoice / KYC purposes | GDPR-sensitive |
| `actorType` | string | No | Actor type (individual or organisation) passed to Stripe | Mirrors `Actor.actorType` |
| `taxId` | string | No | Tax identification number for Stripe's tax compliance | GDPR-sensitive |
| `businessAddress` | Address | No | Business address for organisations | References `Address` class |
| `ownershipInformation` | TBD | No | Ultimate beneficial ownership data required by Stripe | GDPR-sensitive; see ADR-013 |

### `stripeInvoiceStatus` Values (Stripe-defined)

| Value | Description |
|-------|-------------|
| `draft` | Invoice created but not yet finalised |
| `open` | Invoice finalised and awaiting payment |
| `paid` | Invoice paid |
| `uncollectible` | Payment could not be collected |
| `void` | Invoice voided |

### `paymentStatus` Values (Stripe-defined)

| Value | Description |
|-------|-------------|
| `requires_payment_method` | No payment method attached |
| `requires_confirmation` | Awaiting customer confirmation |
| `requires_action` | 3D Secure or other action required |
| `processing` | Payment being processed |
| `succeeded` | Payment successful |
| `canceled` | Payment intent cancelled |

### Relationships

| Relationship | Target | Cardinality | Description |
|-------------|--------|-------------|-------------|
| `settles` | Invoice | 0 to many | INTELLIGENT invoice(s) this Stripe record relates to |
| `part of` | Payment | many to 1 | Platform-level payment record |
| `billing address` | Address | 1 to 1 | Billing address for this transaction |
| `business address` | Address | 0 to 1 | Business address (organisations) |

### Validation Rules

- `customerEmail` must conform to RFC 5321 format.
- `customerPhone` must be in E.164 format when present.
- `stripeInvoiceCurrency` and `billingCurrency` must be valid ISO 4217 codes in lowercase (Stripe convention).
- `createdAt` must be before or equal to `updatedAt`.
- `stripeInvoiceAmountDue` is in the smallest currency unit (e.g. cents for EUR); consuming services must divide by 100 for display.

### GDPR Notes

`Stripe` records contain a high density of personal and sensitive data. Access must be restricted to the BLOOO Billing module only. Specifically:
- `customerFullName`, `customerEmail`, `customerPhone`, `billingEmail`, `legalEntityName`, `taxId`, and `ownershipInformation` are personal data under GDPR Article 4.
- These fields must not be transmitted through EWDS or exposed via any API unless explicitly required and consented by the data subject.
- Retention periods must comply with EU financial regulation (minimum 5 years for payment records) and GDPR right-to-erasure provisions (personal data erasure upon request, subject to legal retention requirements).

### Open Questions

- ADR-007: `stripeInvoiceId` is Stripe's internal reference and is explicitly distinct from `Invoice.invoiceId`. This is confirmed as by design.
- ADR-013: `ownershipInformation` type and GDPR handling TBD (BLOOO action).
