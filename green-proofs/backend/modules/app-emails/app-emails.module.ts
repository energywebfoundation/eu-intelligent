import {
  ConfigModule,
  EmailHtmlTemplateProvider,
  MailModule,
} from '@energywebfoundation/generic-green-proofs-api';
import {
  Global,
  Module,
} from '@nestjs/common';
import type { Provider } from '@nestjs/common/interfaces/modules/provider.interface.js';

import { AppEmailHtmlTemplateProvider } from './app-email-html-template.provider.js';
import { EmailFactories } from './factories/index.js';

const emailFactoryProviders = EmailFactories.map((factory): Provider => ({
  provide: factory,
  useClass: factory,
}));

@Global()
@Module({
  imports: [
    ConfigModule,
    MailModule,
  ],
  providers: [
    {
      provide: EmailHtmlTemplateProvider,
      useClass: AppEmailHtmlTemplateProvider,
    },
    AppEmailHtmlTemplateProvider,
    ...emailFactoryProviders,
  ],
  exports: [EmailHtmlTemplateProvider],
})
export class AppEmailsModule {}
