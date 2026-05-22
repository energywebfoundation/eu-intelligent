# Billing Domain: Invoice

---

## int:Invoice

**IRI:** `int:Invoice`

**Subclass of:** `owl:Thing`

**Standard mapping:** `cim:CustomerBillingInfo`

A formal payable document issued to an `Actor`, derived from a parent `Billing` record. One `Billing` period may produce multiple `Invoice` records. The `invoiceNumber` field has been removed per the May 2026 workshop agreement with BLOOO and R2M: `invoiceId` serves as the display identifier. `billingPeriod` is also removed as redundant — the parent `Billing` record carries `billingPeriodFrom` and `billingPeriodUntil`.

### Datatype Properties

| Property | IRI | Range | Description |
|----------|-----|-------|-------------|
| invoiceId | `int:invoiceId` | `xsd:string` | Unique identifier. RFC 4122 UUID v4. Used as the display invoice identifier. |
| billingId | `int:billingId` | `xsd:string` | FK to parent `Billing` record. |
| invoiceStatus | `int:invoiceStatus` | `owl:oneOf` | Lifecycle status of the invoice. |
| invoiceIssueDate | `int:invoiceIssueDate` | `xsd:date` | Date the invoice was issued. ISO 8601 with timezone. |
| invoiceDueDate | `int:invoiceDueDate` | `xsd:date` | Payment due date. ISO 8601 date (YYYY-MM-DD). |
| invoiceIssuedTo | `int:invoiceIssuedTo` | `xsd:string` | FK to `Actor.actorId` of the recipient. |
| invoiceIssuedBy | `int:invoiceIssuedBy` | `xsd:string` | FK to `Actor.actorId` of the issuing party. |
| totalAmount | `int:totalAmount` | `xsd:float` | Total invoice amount (energy + grid fee + tax). |
| outstandingAmount | `int:outstandingAmount` | `xsd:float` | Remaining unpaid amount if partially paid. |
| energyAmount | `int:energyAmount` | `xsd:float` | Energy cost component. |
| gridFeeAmount | `int:gridFeeAmount` | `xsd:float` | Grid fee component. |
| taxAmount | `int:taxAmount` | `xsd:float` | Tax component. |
| totalTaxAmount | `int:totalTaxAmount` | `xsd:float` | Cumulative tax amount computed for the invoice. |
| currency | `int:currency` | `xsd:string` | ISO 4217 currency code. One invoice has one currency. |
| createdAt | `int:createdAt` | `xsd:dateTime` | Timestamp when this record was created. ISO 8601 with timezone. |
| updatedAt | `int:updatedAt` | `xsd:dateTime` | Timestamp when this record was last updated. ISO 8601 with timezone. |

### Object Properties

| Property | IRI | Range | Cardinality | Description |
|----------|-----|-------|-------------|-------------|
| hasBilling | `int:hasBilling` | [`int:Billing`](billing.md#intbilling) | `owl:exactly 1` | Parent billing record. |
| hasInvoiceIssuedTo | `int:hasInvoiceIssuedTo` | `int:Actor` | `owl:exactly 1` | Actor receiving this invoice. |
| hasInvoiceIssuedBy | `int:hasInvoiceIssuedBy` | `int:Actor` | `owl:exactly 1` | Actor issuing this invoice. |
| hasTrades | `int:hasTrades` | [`int:EnergyTrade`](../market/trade.md#intenergytrade) | `owl:minCardinality 0` | Trades covered in this invoice. |
| hasPayments | `int:hasPayments` | [`int:Payment`](stripe.md#intpayment) | `owl:minCardinality 0` | Payments recorded against this invoice. |

### Enumeration Values

#### int:invoiceStatus

| Value | Description |
|-------|-------------|
| `Draft` | Calculated but not yet issued. |
| `Open` | Issued and awaiting payment. |
| `PartiallyPaid` | Partially settled. |
| `Paid` | Fully settled. |
| `Overdue` | Payment not received by `invoiceDueDate`. |
| `Void` | Invoice voided. |
| `Disputed` | Actor has raised a query or dispute. |
