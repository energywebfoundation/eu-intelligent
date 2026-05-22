# Billing: Billing, Payment

## Overview

This module defines the billing account and payment records. `Billing` is the aggregate financial record for a Member over a billing period. `Payment` records individual financial transactions settling an Invoice.

**Partners:** R2M (Billing, Payment), BLOOO (Billing extension attributes)

---

## Billing

**Contributing partners:** R2M (primary), BLOOO (extension)
**Standard mappings:** CIM `Customer` financial model, SAREF4ENER billing model

A `Billing` record represents the aggregate financial account for a `Member` over a defined period. It is the top-level billing entity from which one or more `Invoice` records are generated. The Billing module receives consolidated `Trade` and `Tariff` data from EWDS and uses it to calculate the amounts owed.

### Attributes

| Attribute | Type | Required | Description | Contributing Partner | Standard Mapping |
|-----------|------|----------|-------------|---------------------|-----------------|
| `billingId` | UUID | Yes | Unique identifier | R2M | CIM `IdentifiedObject.mRID` |
| `memberId` | UUID | Yes | Member this billing record belongs to | R2M | CIM `IdentifiedObject.mRID` |
| `siteId` | UUID | Yes | Site context | R2M | CIM `IdentifiedObject.mRID` |
| `invoiceNumber` | string | Yes | Human-readable invoice reference number | R2M | - |
| `status` | string | Yes | Billing record lifecycle status | R2M | - |
| `invoiceTotal` | number (EUR) | Yes | Total amount due for this billing period | R2M | - |
| `outstandingAmount` | number (EUR) | Yes | Remaining unpaid amount | R2M | - |
| `billingPeriodFrom` | timestamp | Yes | Start of billing period | R2M | OGC Time `hasBeginning` |
| `billingPeriodUntil` | timestamp | Yes | End of billing period | R2M | OGC Time `hasEnd` |
| `issueDate` | timestamp | Yes | Date the billing record was issued | R2M | OGC Time `Instant` |
| `overdueDate` | timestamp | No | Date after which the invoice is considered overdue | R2M | OGC Time `Instant` |
| `issuingParty` | TBD | No | Organisation issuing the invoice | R2M | CIM `Organisation` |
| `numberOfTrades` | number | No | Total number of trades in this billing period | BLOOO | - |
| `calculationTimestamp` | timestamp | No | Timestamp when the billing calculation was last run | BLOOO | OGC Time `Instant` |

### `status` Values

| Value | Description |
|-------|-------------|
| `draft` | Billing calculated but not yet issued |
| `issued` | Invoice issued to the member |
| `paid` | Invoice fully settled |
| `overdue` | Payment not received by `overdueDate` |
| `disputed` | Member has raised a dispute |

### Relationships

| Relationship | Target | Cardinality | Description |
|-------------|--------|-------------|-------------|
| `belongs to` | Member | many to 1 | Member this billing record covers |
| `has` | Invoice | 1 to many | Invoices issued for this billing period |
| `has` | Payment | 1 to 0..1 | Payment record if settled |

### Validation Rules

- `billingId` must be a valid RFC 4122 UUID.
- `memberId` must reference an existing `Member.memberId`.
- `siteId` must reference an existing `Site.siteId`.
- `billingPeriodFrom` must be before `billingPeriodUntil`.
- `issueDate` must be on or after `billingPeriodUntil`.
- `outstandingAmount` must be in range [0, `invoiceTotal`].
- `status` must be one of the enumerated values above.

### Open Questions

- ADR-006: `issuingParty` type TBD (R2M action).
- ADR-006: Clarify the hierarchy between `Billing.billingId`, `Billing.invoiceNumber`, and `Invoice.invoiceId`.

---

## Payment

**Contributing partners:** R2M
**Standard mappings:** No direct CIM equivalent; maps to generic financial transaction record.

A `Payment` records an individual financial transaction that (partially or fully) settles an `Invoice`. A `Billing` record may have zero payments (if unpaid) or one or more (if settled in instalments or with adjustments).

### Attributes

| Attribute | Type | Required | Description | Standard Mapping |
|-----------|------|----------|-------------|-----------------|
| `paymentId` | UUID | Yes | Unique identifier | CIM `IdentifiedObject.mRID` |
| `invoiceId` | UUID | Yes | Invoice being settled by this payment | CIM `IdentifiedObject.mRID` |
| `date` | timestamp | Yes | Date and time the payment was made | OGC Time `Instant` |
| `amount` | number (EUR) | Yes | Amount paid in this transaction | - |
| `residual` | number (EUR) | Yes | Remaining unpaid balance after this payment | - |
| `paymentMethod` | string | Yes | Method used for this payment | - |
| `provider` | string | No | Payment service provider name | - |

### `paymentMethod` Values

| Value | Description |
|-------|-------------|
| `stripe` | Stripe payment (card or SEPA) |
| `bank_transfer` | Direct bank transfer |
| `direct_debit` | SEPA direct debit |
| `manual` | Manually recorded payment |

### Relationships

| Relationship | Target | Cardinality | Description |
|-------------|--------|-------------|-------------|
| `settles` | Invoice | many to 1 | Invoice being paid |
| `has type` | Stripe | 1 to many | Stripe payment provider record(s) |

### Validation Rules

- `paymentId` must be a valid RFC 4122 UUID.
- `invoiceId` must reference an existing `Invoice.invoiceId`.
- `amount` must be greater than 0.
- `residual` must be non-negative and less than or equal to the `Invoice.totalAmountEur`.
- `paymentMethod` must be one of the enumerated values above.
- `residual` must equal `Invoice.totalAmountEur` minus the sum of all `Payment.amount` records for that invoice.

### Open Questions

- ADR-006: `Payment.invoiceId` may need to reference `Billing.billingId` in some R2M implementations. The recommended resolution is that it always references `Invoice.invoiceId`.
