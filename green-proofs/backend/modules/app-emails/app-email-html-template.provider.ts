import {
  ConfigFacade,
  createHTMLTemplate,
  EmailHtmlTemplateProvider as GGPEmailHtmlTemplateProvider,
} from '@energywebfoundation/generic-green-proofs-api';
import { Injectable } from '@nestjs/common';

import {
  type EmailBuilderParams,
  getEmailTemplate,
} from './html-template/email-html-shared.js';
import type { GlobalTemplateParams } from './html-template/email-template-params.js';

export type EmailHTMLTemplate = ReturnType<typeof createHTMLTemplate<GlobalTemplateParams>>;
@Injectable()
export class AppEmailHtmlTemplateProvider extends GGPEmailHtmlTemplateProvider {
  private readonly emailTemplate: EmailHTMLTemplate;
  public constructor(
    private readonly configFacade: ConfigFacade,
  ) {
    super();
    this.emailTemplate = createHTMLTemplate<GlobalTemplateParams, EmailBuilderParams>({
      buildHtml: getEmailTemplate(),
      builderParams: {
        appName: this.configFacade.appName,
        assetsUrl: this.configFacade.urls.frontendUrl,
      },
    });
  }

  public get template(): EmailHTMLTemplate {
    return this.emailTemplate;
  }
}
