import {
  assert,
  ProcessCommand,
  ProcessCommandKind,
  ProcessCommandSchema,
} from '@energywebfoundation/generic-green-proofs-api';
import { DomainTypes } from '@shared/generated-types.js';
import { z } from 'zod';

import type { SiteService } from '../../iam-intelligent/site.service.js';
import { mergeTradeHashes } from '../helpers.js';
import type { LocalOriginEnergyProcessContext } from './local-origin-energy-process.process.js';

const registerProductionPayloadSchema = z.object({
  localOriginRecord: DomainTypes.LocalOriginRecord,
});
export type LocalOriginEnergyProcessPayload = z.infer<typeof registerProductionPayloadSchema>;

export const makeLocalOriginEnergyProcessCreator = (deps: {
  siteService: SiteService;
}) => ProcessCommand.customCreator(
  'create',
  ({ actorCheck }) => ({
    check: actorCheck.allow(),
    kind: ProcessCommandKind.Create,
    name: 'Local origin energy',
    schema: ProcessCommandSchema.fromZod(registerProductionPayloadSchema),
    uiSchema: {},
  })).map(async (input) => {
  assert(input.localOriginRecord.time_and_quantity.energy_unit === 'kWh');
  const localOriginEnergyKwh = input.localOriginRecord.time_and_quantity.energy_quantity;

  const { accountId: sellerAccountId } = await deps.siteService.ensureAccountAndCompany({
    metadata: {
      externalId: input.localOriginRecord.production_asset.production_asset_id,
      asset_class: input.localOriginRecord.production_asset.asset_class,
      asset_registry_reference: input.localOriginRecord.production_asset.asset_registry_reference,
      metering_point_id: input.localOriginRecord.production_asset.metering_point_id,
    },
  });
  const { accountId: buyerAccountId } = await deps.siteService.ensureAccountAndCompany({
    metadata: {
      externalId: input.localOriginRecord.consumption_asset.consumption_asset_id,
      asset_class: input.localOriginRecord.consumption_asset.asset_class,
      asset_registry_reference: input.localOriginRecord.consumption_asset.asset_registry_reference,
      metering_point_id: input.localOriginRecord.consumption_asset.metering_point_id,
    },
  });

  return {
    seller: {
      id: sellerAccountId,
      isBattery: input.localOriginRecord.production_asset.asset_class === 'Battery',
    },
    buyer: {
      id: buyerAccountId,
      isBattery: input.localOriginRecord.consumption_asset.asset_class === 'Battery',
    },
    localOriginEnergyKwh,
    localOriginRecord: input.localOriginRecord,
    mergedTradeHashes: mergeTradeHashes(input.localOriginRecord.trade_and_delivery.trade_hash),
  } satisfies LocalOriginEnergyProcessContext;
});
