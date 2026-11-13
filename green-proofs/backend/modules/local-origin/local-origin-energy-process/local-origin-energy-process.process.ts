import {
  EnergyEvent,
  type EnergyEventBuyer,
  type EnergyEventSeller,
} from '@backend/domain.js';
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
import { runLocalOriginValidators } from '../local-origin-validation.js';
import { makeLocalOriginEnergyProcessCreator } from './local-origin-energy-process.creator.js';
import { LocalOriginEnergyProcessResolver } from './local-origin-energy-process.resolver.js';

export interface LocalOriginEnergyProcessContext {
  seller: EnergyEventSeller; // contains real account id
  buyer: EnergyEventBuyer; // contains real account id
  localOriginEnergyKwh: number;
  /** Used for deduplication */
  mergedTradeHashes: string;
  /** Original local origin record that initiated the process */
  localOriginRecord: DomainTypes.LocalOriginRecord;

  error?: string;
  // this state means that not entire local origin energy was matched
  // (usually it means battery discharged more than available)
  // should not happen in practice, but this a code path to be handled anyway
  leftoverEnergyKwh?: number;
}

export type LocalOriginEnergyProcessState
  = | 'created'
    | 'failed' // failed because of other technical reason
    | 'rejected' // rejected due to validation
    | 'succeededWithLeftover'
    | 'succeeded';
export const LocalOriginEnergyProcessType = 'LocalOriginEnergyProcess';

@Process()
@ProcessType(IsUnitProcess)
export class LocalOriginEnergyProcess
  extends BaseProcess<
    LocalOriginEnergyProcessContext,
    ProcessCategory.Custom,
    LocalOriginEnergyProcessState
  >
  implements
  IsUnitProcess {
  public static $category = ProcessCategory.Custom as const;
  public static $getProcessTypeName = () => 'Local origin energy';
  public static $type = LocalOriginEnergyProcessType;

  @ProcessDep() private energyEventIntegrationService!: EnergyEventIntegrationService;
  @ProcessDep() private configFacade!: ConfigFacade;
  @ProcessDep() private moduleRef!: ModuleRef;

  public static $getCreatorCommand(
    @ProcessDep() siteService: SiteService,
  ) {
    return makeLocalOriginEnergyProcessCreator({
      siteService,
    });
  }

  public $states() {
    return [
      ProcessState.initial(
        this.s('created'),
      ).onEnter(async () => {
        const logger = await this.getLogger();
        const validationResult = runLocalOriginValidators(this.context.localOriginRecord);

        if (validationResult.valid === false) {
          this.context.error = validationResult.reason;
          return ProcessTransition.redirected({ nextState: this.s('rejected') });
        }

        try {
          const localOrigin = new EnergyEvent({
            energyKwh: this.context.localOriginEnergyKwh,
            buyer: this.context.buyer,
            seller: this.context.seller,
            record: { localOriginRecord: this.context.localOriginRecord },
          });

          // Gandalf facade ensures it is in transaction (because it falls under process creation)
          const { leftoverEnergy } = await localOrigin.processTransactions(
            this.energyEventIntegrationService.getProcessTransactionsIntegration({
              processId: this.id,
            }),
          );

          if (leftoverEnergy.eq(0)) {
            return ProcessTransition.redirected({ nextState: this.s('succeeded') });
          } else {
            this.context.leftoverEnergyKwh = leftoverEnergy.tokWh();
            return ProcessTransition.redirected({ nextState: this.s('succeededWithLeftover') });
          }
        } catch (rawError: unknown) {
          const error = prepareAnyError(
            rawError,
            { translationEngine: this.configFacade.getErrorTranslationEngine() },
          );

          this.context.error = `(${error.name}) ${error.message}`;
          logger.logError({ message: `Failed to process local origin energy in process "${this.id}" due to and error`, error });

          return ProcessTransition.redirected({ nextState: this.s('failed') });
        }
      }),
      ProcessState.final(this.s('succeeded')),
      ProcessState.final(this.s('succeededWithLeftover')),
      ProcessState.final(this.s('failed')),
      ProcessState.final(this.s('rejected')),
    ];
  }

  public getParticipants() {
    return [
      this.context.buyer.id,
      this.context.seller.id,
    ];
  }

  public $canViewProcess({ actorCheck }: CanViewProcessPayload) {
    return ActorCheck
      .some(this.getParticipants(), (actorCheck, accountId) => actorCheck.isAccountMember(accountId, { active: false }))
      .or(actorCheck.isRegistryAdmin());
  }

  public migrateSchema() { }

  public getResolver(_payload: ProcessResolverPayload) {
    return LocalOriginEnergyProcessResolver();
  }

  private async getLogger() {
    const logger = await this.moduleRef.resolve(Logger, undefined, { strict: false });

    return logger;
  }
}
