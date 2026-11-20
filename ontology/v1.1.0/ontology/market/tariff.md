# Market Domain: Tariff

---

## int:Tariff

**IRI:** `int:Tariff`

**Subclass of:** `owl:Thing`

**Standard mapping:** `saref4ener:Tariff`, `cim:PricingStructure`

A set of price and charge values that governs energy exchange within an `EnergyCommUnit` at a defined point in time. A tariff is community-scoped and time-bounded — a community may have successive tariffs as regulatory rates change. It defines the cost structure that applies to all energy transactions within that community during its validity period.

Tariff components are individually itemised per OQ-012: different regulatory frameworks across the pilot jurisdictions (Switzerland, Ireland, Portugal) apply different combinations of network charges, levies, and taxes.

### Datatype Properties

| Property | IRI | Range | Description |
|----------|-----|-------|-------------|
| tariffId | `int:tariffId` | `xsd:string` | Unique identifier. RFC 4122 UUID v4. |
| energyPrice | `saref4ener:price` | `xsd:float` | Price per unit of energy exchanged within the community, in currency/kWh. The base cost of the energy itself, independent of network and regulatory charges. |
| networkTariff | `cim:TransmissionReliabilityMargin` | `xsd:float` | Distribution network use-of-system charge in currency/kWh. Set by the DSO and passed through to community members. |
| levies | `int:levies` | `xsd:float` | Mandatory regulatory levies and surcharges in currency/kWh. Jurisdiction-specific (e.g. renewable energy surcharge, system services levy). |
| taxes | `cim:taxAmount` | `xsd:float` | Applicable taxes in currency/kWh (e.g. VAT, energy tax). Rate and applicability are jurisdiction-specific. |
| currency | `int:currency` | `xsd:string` | ISO 4217 currency code applicable to all monetary values in this tariff. |
| validFrom | `int:validFrom` | `xsd:dateTime` | Start of the period during which this tariff is in effect. ISO 8601 with timezone. |
| validUntil | `int:validUntil` | `xsd:dateTime` | End of the period during which this tariff is in effect. NULL if currently active. ISO 8601 with timezone. |

### Object Properties

| Property | IRI | Range | Cardinality | Description |
|----------|-----|-------|-------------|-------------|
| appliesInCommunity | `int:appliesInCommunity` | [`int:EnergyCommUnit`](../spatial/community.md#intenergycommunity) | `owl:exactly 1` | The community to which this tariff applies. |
