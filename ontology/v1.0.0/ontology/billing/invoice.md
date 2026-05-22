# Billing: Invoice

## Overview

The `Invoice` class is the BLOOO-defined payable document derived from a `Billing` record, presenting a detailed breakdown of energy, grid fee, and tax charges for a billing period.

**Partners:** BLOOO

---

## Invoice

**Contributing partners:** BLOOO
**Standard mappings:** CIM financial model, SAREF4ENER billing model

An `Invoice` is a formal payable document issued to an `Actor` (the legal identity behind a `Member`) detailing the charges incurred during a billing period. It itemises the energy component, grid use-of-system fee, and applicable taxes. One `Billing` record may produce one or more `Invoice` records (e.g. if a revised invoice is issued).

### Attributes

| Attribute | Type | Required | Description | Standard Mapping |
|-----------|------|----------|-------------|-----------------|
| `invoiceId` | string | Yes | Unique identifier for this invoice | CIM `IdentifiedObject.mRID` |
| `invoiceStatus` | string | Yes | Lifecycle status of the invoice | - |
| `invoiceIssueDate` | timestamp | Yes | Date the invoice was issued | OGC Time `Instant` |
| `invoiceDueDate` | timestamp | Yes | Date payment is due | OGC Time `Instant` |
| `billingPeriod` | string | Yes | Human-readable billing period description (e.g. "January 2026") | OGC Time `Interval` |
| `actorId` | UUID | Yes | Actor (legal identity) this invoice is addressed to | CIM `IdentifiedObject.mRID` |
| `energyAmountEur` | number (EUR) | Yes | Energy charge component | SAREF4ENER energy cost |
| `gridFeeAmountEur` | number (EUR) | Yes | Grid use-of-system fee component | CIM grid tariff model |
| `taxAmountEur` | number (EUR) | Yes | Tax component (VAT and levies) | - |
| `totalAmountEur` | number (EUR) | Yes | Total amount due (sum of above components) | - |
| `numberOfTrades` | number | Yes | Number of trades included in this invoice | - |
| `calculationTimestamp` | timestamp | Yes | Timestamp when the invoice was calculated | OGC Time `Instant` |

### `invoiceStatus` Values

| Value | Description |
|-------|-------------|
| `draft` | Calculated but not yet sent to the actor |
| `issued` | Sent to the actor |
| `paid` | Fully settled |
| `overdue` | Payment not received by `invoiceDueDate` |
| `disputed` | Actor has raised a query or dispute |
| `cancelled` | Invoice cancelled (e.g. replaced by a revised invoice) |

### Relationships

| Relationship | Target | Cardinality | Description |
|-------------|--------|-------------|-------------|
| `issued under` | Billing | many to 1 | Parent billing record |
| `addressed to` | Actor | many to 1 | Legal identity receiving this invoice |
| `located at` | Address | 0 to many | Billing and business addresses |
| `settled by` | Payment | 0 to many | Payments against this invoice |
| `processed via` | Stripe | 0 to many | Stripe payment provider records |

### Validation Rules

- `invoiceId` must be unique within the platform instance.
- `actorId` must reference an existing `Actor`.
- `invoiceIssueDate` must be before `invoiceDueDate`.
- `energyAmountEur`, `gridFeeAmountEur`, `taxAmountEur` must each be non-negative.
- `totalAmountEur` must equal `energyAmountEur + gridFeeAmountEur + taxAmountEur` (within rounding tolerance of 0.01 EUR).
- `numberOfTrades` must be greater than or equal to 0.
- `invoiceStatus` must be one of the enumerated values above.

### GDPR Notes

`Invoice` records contain personal financial data and are subject to GDPR. Specifically:
- `actorId` links to personal identity data.
- Invoice records must be retained for the legally required accounting period (minimum 10 years in most EU jurisdictions) even after a member leaves the community.
- Access must be restricted to the billing module and authorised community managers.

### Open Questions

- ADR-006: `Invoice.invoiceId` and `Billing.invoiceNumber` may represent the same concept. Resolution: `Billing.invoiceNumber` is the human-readable reference; `Invoice.invoiceId` is the system identifier. They should coexist but must be cross-referenced.
- ADR-007: `Invoice.invoiceId` vs `Stripe.stripeInvoiceId` — confirmed as distinct identifiers from different systems.
