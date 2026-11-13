import { z } from 'zod';

import { DomainTypes } from '../../generated-types.js';

export const CertificateStatus = z.enum(['issued', 'transferred', 'retired']);
export type CertificateStatus = z.infer<typeof CertificateStatus>;

export const LocalOriginUnitMetadata = z.strictObject({
  version: z.literal(1),
  localOriginRecord: DomainTypes.LocalOriginRecord,
  status: CertificateStatus,
});
export type LocalOriginUnitMetadata = z.infer<typeof LocalOriginUnitMetadata>;

export const SelfConsumptionUnitMetadata = z.strictObject({
  version: z.literal(1),
  selfConsumptionRecord: DomainTypes.SelfConsumptionRecord,
  status: CertificateStatus,
});
export type SelfConsumptionUnitMetadata = z.infer<typeof SelfConsumptionUnitMetadata>;

/** Unit contains either local origin record or self consumption record (never both) */
export const UnitMetadata = z.union([LocalOriginUnitMetadata, SelfConsumptionUnitMetadata]);
export type UnitMetadata = z.infer<typeof UnitMetadata>;

export const isLocalOriginUnitMetadata = (metadata: UnitMetadata): metadata is LocalOriginUnitMetadata => 'localOriginRecord' in metadata;
export const isSelfConsumptionUnitMetadata = (metadata: UnitMetadata): metadata is SelfConsumptionUnitMetadata => 'selfConsumptionRecord' in metadata;

/**
 * Unit certificate is a type build on top of unit metadata in unit-view-builder and exposed in certificate API.
 * It has to follow documentation on which fields are present
 */
export const UnitCertificate = z.object({
  schema_version: z.number().describe('Certificate schema version'),
  reference_data: z.union([DomainTypes.LocalOriginRecord, DomainTypes.SelfConsumptionRecord]).describe('GSY DEX original reference data (local origin record or self consumption record)'),
  status: CertificateStatus.describe('Current state of the certificate'),

  // Info about this certificate
  status_timestamp: z.iso.datetime().describe('Timestamp when certificate entered status'),
  record_id: z.uuid().describe('Digital Certificate record identifier'),
  owner_id: z.string().describe('Identifier of this Digital Certificate holder'),
  energy_quantity: z.number().describe('Energy quantity of this Digital Certificate in kWh'),

  // Info about this certificate retirement
  retirement_timestamp: z.iso.datetime().nullable().describe('Timestamp of certificate retirement'),
  claim_holder_id: z.string().nullable().describe('Identifier of certificate retirement holder'),

  // Info about issuance
  issuance_record_id: z.uuid().describe('Digital Certificate record identifier - points to original production Digital Certificate'),
  issuance_owner_id: z.string().describe('Identifier of Digital Certificate holder - points to original production Digital Certificate owner'),
  issuance_timestamp: z.iso.datetime().describe('Digital Certificate issuance date - points at original production Digital Certificate issuance date'),

  // Other fields
  claim_permitted: z.boolean(),
  attribute_mode: z.enum(['not_marketed', 'retired_official', 'sold_external']),
  permitted_claim_text_id: z.string().describe('Reason for claim_permitted status'),
  bundling_status: z.enum(['bundled', 'unbundled']).describe('Unbundled indicates that the attribute was transferred separately from the electricity'),

  content_hash: z.string().describe('SHA256 hash of certificate\'s canonicalized data'),
});
export type UnitCertificate = z.infer<typeof UnitCertificate>;
