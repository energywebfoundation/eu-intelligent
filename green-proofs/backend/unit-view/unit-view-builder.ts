import { createHash } from 'node:crypto';

import { Energy } from '@backend/domain.js';
import type {
  UnitGraph,
  UnitView,
} from '@energywebfoundation/generic-green-proofs-api';
import {
  type UnitViewBuilder,
  type UnitViewBuilderResolvedType,
} from '@energywebfoundation/generic-green-proofs-api';
import { assert } from '@energywebfoundation/generic-green-proofs-common';
import {
  isLocalOriginUnitMetadata,
  type UnitCertificate,
  type UnitMetadata,
} from '@shared/entities/unit/types.js';
import type { AccountMetadata } from '@shared/index.js';
import { canonicalize } from 'json-canonicalize';

const getUnitRoot = (p: { graph: UnitGraph; unit: UnitView }) => {
  const root = p.graph.getAbsoluteRoot();
  assert(root, `Cannot find root of ${p.unit.id}`);
  return root;
};

export const unitViewBuilder = (builder: UnitViewBuilder) =>
  builder.withFields(f => ({
    rootOwner: f.account(({ graph, unit }) => {
      return getUnitRoot({ graph, unit }).ownerId;
    }),
    owner: f.account(({ unit }) => unit.ownerId),
  })).map((computed, { unit, graph }) => {
    const metadata = unit.metadata as UnitMetadata;
    const rootOwnerMeta = computed.rootOwner.data as AccountMetadata;
    const ownerMeta = computed.owner.data as AccountMetadata;
    const root = getUnitRoot({ unit, graph });

    /**
     * We build "certificate" entry manually, because it has to meet project requirements,
     * and we need its content hash.
     */
    const certificate = {
      schema_version: metadata.version,
      reference_data: isLocalOriginUnitMetadata(metadata) ? metadata.localOriginRecord : metadata.selfConsumptionRecord,
      status: metadata.status,

      // Info about this certificate
      status_timestamp: unit.createdAt.toISOString(),
      record_id: unit.id,
      owner_id: ownerMeta.externalId,
      energy_quantity: Energy.fromVolume(unit.volume).tokWh(),

      // Info about this certificate retirement
      retirement_timestamp: unit.isFinal ? unit.createdAt.toISOString() : null,
      claim_holder_id: unit.isFinal ? ownerMeta.externalId : null,

      // Info about issuance
      issuance_record_id: root.id,
      issuance_owner_id: rootOwnerMeta.externalId,
      issuance_timestamp: root.createdAt.toISOString(),

      // Other fields
      claim_permitted: true,
      attribute_mode: 'not_marketed',
      permitted_claim_text_id: '',
      bundling_status: 'bundled',
    } satisfies Omit<UnitCertificate, 'content_hash'>;

    const normalizedCertificate = canonicalize(certificate);
    const certificateHash = createHash('sha256').update(JSON.stringify(normalizedCertificate), 'utf8').digest('hex');

    return {
      certificate: {
        ...certificate,
        content_hash: certificateHash,
      },
    };
  });

export type UnitComputed = UnitViewBuilderResolvedType<
  ReturnType<typeof unitViewBuilder>
>;
