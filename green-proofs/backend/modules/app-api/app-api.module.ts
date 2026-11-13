import {
  IamModule,
  UnitViewModule,
} from '@energywebfoundation/generic-green-proofs-api';
import {
  AuthFacade,
  AuthToken,
} from '@energywebfoundation/generic-green-proofs-auth';
import {
  type DynamicModule,
  Module,
  type OnApplicationBootstrap,
  type Type,
} from '@nestjs/common';

import { AppConfig } from '../app-config/app-config.js';
import { AppConfigModule } from '../app-config/app-config.module.js';
import { CertificatesController } from './certificates.controller.js';
import { IntelligentAuthTokenClaim } from './intelligent-auth.guard.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const controllers: Type<any>[] = [
  CertificatesController,
];

@Module({})
export class AppApiModule implements OnApplicationBootstrap {
  constructor(
    private authFacade: AuthFacade,
    private appConfig: AppConfig,
  ) { }

  onApplicationBootstrap() {
    this.authFacade.registerExchangeStrategy({
      shouldApply: ({ tokenString }) => tokenString === this.appConfig.config.intelligentApiToken,
      exchange: ({ currentAuthToken }) => {
        return {
          authToken: currentAuthToken.exchangeWithAnything(() => {
            return {
              claims: AuthToken.createClaim(IntelligentAuthTokenClaim, true),
              origin: {
                type: 'intelligent',
              },
            };
          }),
          redirectTo: null,
        };
      },
    });
  }

  public static register(): DynamicModule {
    return {
      module: AppApiModule,
      controllers,
      imports: [
        IamModule,
        UnitViewModule,
        AppConfigModule,
      ],
    };
  }

  public static registerControllersOnly(): DynamicModule {
    return {
      module: AppApiModule,
      controllers,
    };
  }
}
