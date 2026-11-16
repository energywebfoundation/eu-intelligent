import { EnergyEvent } from '@backend/domain.js';
import {
  ActorCheck,
  BaseProcess,
  type CanViewProcessPayload,
  ConfigFacade,
  IsUnitProcess,
  prepareAnyError,
  Process,
  ProcessCategory,
  ProcessDep,
  type ProcessResolverPayload,
  ProcessState,
  ProcessTransition,
  ProcessType,
} from '@energywebfoundation/generic-green-proofs-api';
import { Logger } from '@energywebfoundation/generic-green-proofs-logger';
import { ModuleRef } from '@nestjs/core';
import type { DomainTypes } from '@shared/generated-types.js';

import { EnergyEventIntegrationService } from '../../energy-event/energy-event-integration.service.js';
import { SiteService } from '../../iam-intelligent/site.service.js';
import { runSelfConsumptionValidators } from '../self-consumption-validation.js';
import { makeSelfConsumptionEnergyProcessCreator } from './self-consumption-energy-process.creator.js';
import { SelfConsumptionEnergyProcessResolver } from './self-consumption-energy-process.resolver.js';

export interface SelfConsumptionEnergyProcessContext {
  consumer: { id: string }; // contains real account id
  selfConsumptionEnergyKwh: number;
  /** Used for deduplication */
  selfConsumptionEventReference: string;
  /** Original self consumption record that initiated the process */
  selfConsumptionRecord: DomainTypes.SelfConsumptionRecord;

  error?: string;
}

export type SelfConsumptionEnergyProcessState
  = | 'created'
    | 'failed' // failed because of other technical reason
    | 'rejected' // rejected due to validation
    | 'succeeded';
export const SelfConsumptionEnergyProcessType = 'SelfConsumptionEnergyProcess';

@Process()
@ProcessType(IsUnitProcess)
export class SelfConsumptionEnergyProcess
  extends BaseProcess<
    SelfConsumptionEnergyProcessContext,
    ProcessCategory.Custom,
    SelfConsumptionEnergyProcessState
  >
  implements
  IsUnitProcess {
  public static $category = ProcessCategory.Custom as const;
  public static $getProcessTypeName = () => 'Self consumption energy';
  public static $type = SelfConsumptionEnergyProcessType;

  @ProcessDep() private energyEventIntegrationService!: EnergyEventIntegrationService;
  @ProcessDep() private configFacade!: ConfigFacade;
  @ProcessDep() private moduleRef!: ModuleRef;

  public static $getCreatorCommand(
    @ProcessDep() siteService: SiteService,
  ) {
    return makeSelfConsumptionEnergyProcessCreator({
      siteService,
    });
  }

  public $states() {
    return [
      ProcessState.initial(
        this.s('created'),
      ).onEnter(async () => {
        const logger = await this.getLogger();
        const validationResult = runSelfConsumptionValidators(this.context.selfConsumptionRecord);

        if (validationResult.valid === false) {
          this.context.error = validationResult.reason;
          return ProcessTransition.redirected({ nextState: this.s('rejected') });
        }

        try {
          // Self consumed energy is produced and consumed by the same site,
          // so the site is both seller and buyer. Battery consumers are rejected by validation.
          const site = { id: this.context.consumer.id, isBattery: false };
          const selfConsumption = new EnergyEvent({
            energyKwh: this.context.selfConsumptionEnergyKwh,
            seller: site,
            buyer: site,
            record: { selfConsumptionRecord: this.context.selfConsumptionRecord },
          });

          // Gandalf facade ensures it is in transaction (because it falls under process creation)
          await selfConsumption.processTransactions(
            this.energyEventIntegrationService.getProcessTransactionsIntegration({
              processId: this.id,
            }),
          );

          return ProcessTransition.redirected({ nextState: this.s('succeeded') });
        } catch (rawError: unknown) {
          const error = prepareAnyError(
            rawError,
            { translationEngine: this.configFacade.getErrorTranslationEngine() },
          );

          this.context.error = `(${error.name}) ${error.message}`;
          logger.logError({ message: `Failed to process self consumption energy in process "${this.id}" due to and error`, error });

          return ProcessTransition.redirected({ nextState: this.s('failed') });
        }
      }),
      ProcessState.final(this.s('succeeded')),
      ProcessState.final(this.s('failed')),
      ProcessState.final(this.s('rejected')),
    ];
  }

  public getParticipants() {
    return [
      this.context.consumer.id,
    ];
  }

  public $canViewProcess({ actorCheck }: CanViewProcessPayload) {
    return ActorCheck
      .some(this.getParticipants(), (actorCheck, accountId) => actorCheck.isAccountMember(accountId, { active: false }))
      .or(actorCheck.isRegistryAdmin());
  }

  public migrateSchema() { }

  public getResolver(_payload: ProcessResolverPayload) {
    return SelfConsumptionEnergyProcessResolver();
  }

  private async getLogger() {
    const logger = await this.moduleRef.resolve(Logger, undefined, { strict: false });

    return logger;
  }
}
