# Billing Domain: Billing

---

## int:Billing

**IRI:** `int:Billing`

**Subclass of:** `owl:Thing`

**Standard mapping:** `cim:CustomerAccount`

The aggregate billing record for an `Actor` over a defined billing period. One `Billing` record groups all `Invoice` instances issued within that period. Fields originally placed on `Billing` that belong semantically to `Invoice` (`invoiceNumber`, `invoiceTotal`, `issueDate`, `issuingParty`, `numberOfTrades`, `calculationTimestamp`) have been moved to `int:Invoice`.

### Datatype Properties

| Property | IRI | Range | Description |
|----------|-----|-------|-------------|
| billingId | `int:billingId` | `xsd:string` | Unique identifier. RFC 4122 UUID v4. |
| billingPeriodFrom | `int:billingPeriodFrom` | `xsd:date` | Start of the billing period. ISO 8601 date (YYYY-MM-DD). |
| billingPeriodUntil | `int:billingPeriodUntil` | `xsd:date` | End of the billing period. ISO 8601 date (YYYY-MM-DD). |
| billingStatus | `int:billingStatus` | `owl:oneOf` | Billing-record-level lifecycle status across all invoices for the period. |
| overdueDate | `int:overdueDate` | `xsd:date` | Final settlement deadline. ISO 8601 date (YYYY-MM-DD). |
| totalAmountDue | `int:totalAmountDue` | `xsd:float` | Total gross amount charged for the period across all invoices, before any payments applied. |
| totalAmountPaid | `int:totalAmountPaid` | `xsd:float` | Cumulative amount paid. `totalAmountDue` minus `totalAmountPaid` equals `outstandingAmount`. |
| outstandingAmount | `int:outstandingAmount` | `xsd:float` | Remaining unpaid amount. |
| totalEnergyAmount | `int:totalEnergyAmount` | `xsd:float` | Cumulative energy component across all invoices in the period. |
| totalGridFeeAmount | `int:totalGridFeeAmount` | `xsd:float` | Cumulative grid fee component across all invoices in the period. |
| totalTaxAmount | `int:totalTaxAmount` | `xsd:float` | Cumulative tax component across all invoices in the period. |
| currency | `int:currency` | `xsd:string` | ISO 4217 currency code. One billing record has one currency. |
| createdAt | `int:createdAt` | `xsd:dateTime` | Timestamp when this record was created. ISO 8601 with timezone. |
| updatedAt | `int:updatedAt` | `xsd:dateTime` | Timestamp when this record was last updated. ISO 8601 with timezone. |

### Object Properties

| Property | IRI | Range | Cardinality | Description |
|----------|-----|-------|-------------|-------------|
| billedInCommunity | `int:billedInCommunity` | [`int:EnergyCommUnit`](../spatial/community.md#intenergycommunity) | `owl:exactly 1` | Community context for this billing record. |
| billedInSite | `int:billedInSite` | [`int:Site`](../spatial/community.md#intsite) | `owl:maxCardinality 1` | Site context. Required when an Actor owns multiple sites and billing is site-specific. |
| billedTo | `int:billedTo` | [`int:Actor`](../participants/participant.md#intactor) | `owl:exactly 1` | Actor this billing record belongs to. |
| hasIssuedInvoices | `int:hasIssuedInvoices` | [`int:Invoice`](invoice.md#intinvoice) | `owl:minCardinality 0` | Invoices issued within this billing period. |

### Enumeration Values

#### int:billingStatus

| Value | Description |
|-------|-------------|
| `Open` | Billing period in progress or invoices outstanding. |
| `PartiallyPaid` | Some invoices paid but balance remains. |
| `Paid` | All invoices settled. |
| `Overdue` | Payment not received by `overdueDate`. |
| `Void` | Billing record voided. |
| `Disputed` | Actor has raised a dispute. |
