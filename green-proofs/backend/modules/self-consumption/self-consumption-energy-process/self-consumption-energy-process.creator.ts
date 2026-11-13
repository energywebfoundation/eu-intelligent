import {
  assert,
  ProcessCommand,
  ProcessCommandKind,
  ProcessCommandSchema,
} from '@energywebfoundation/generic-green-proofs-api';
import { DomainTypes } from '@shared/generated-types.js';
import { z } from 'zod';

import type { SiteService } from '../../iam-intelligent/site.service.js';
import type { SelfConsumptionEnergyProcessContext } from './self-consumption-energy-process.process.js';

const registerSelfConsumptionPayloadSchema = z.object({
  selfConsumptionRecord: DomainTypes.SelfConsumptionRecord,
});
export type SelfConsumptionEnergyProcessPayload = z.infer<typeof registerSelfConsumptionPayloadSchema>;

export const makeSelfConsumptionEnergyProcessCreator = (deps: {
  siteService: SiteService;
}) => ProcessCommand.customCreator(
  'create',
  ({ actorCheck }) => ({
    check: actorCheck.allow(),
    kind: ProcessCommandKind.Create,
    name: 'Self consumption energy',
    schema: ProcessCommandSchema.fromZod(registerSelfConsumptionPayloadSchema),
    uiSchema: {},
  })).map(async (input) => {
  assert(input.selfConsumptionRecord.time_and_quantity.energy_unit === 'kWh');
  const selfConsumptionEnergyKwh = input.selfConsumptionRecord.time_and_quantity.energy_quantity;

  const { accountId: consumerAccountId } = await deps.siteService.ensureAccountAndCompany({
    metadata: {
      externalId: input.selfConsumptionRecord.consumption_asset.consumption_asset_id,
      asset_class: input.selfConsumptionRecord.consumption_asset.asset_class,
      asset_registry_reference: null, // not present in self consumption record
      metering_point_id: input.selfConsumptionRecord.consumption_asset.metering_point_id,
    },
  });

  return {
    consumer: {
      id: consumerAccountId,
    },
    selfConsumptionEnergyKwh,
    selfConsumptionRecord: input.selfConsumptionRecord,
    selfConsumptionEventReference: input.selfConsumptionRecord.trade_and_delivery.self_consumption_event_reference,
  } satisfies SelfConsumptionEnergyProcessContext;
});
