import {
  EmailFactory,
  type EmailFactoryBuildResult,
  EmailHtmlTemplateProvider,
  FrontendUrlResolver,
} from '@energywebfoundation/generic-green-proofs-api';
import { Injectable } from '@nestjs/common';

type BuildParams = {
  recipient: string;
  message: string;
};

@Injectable()
export class TestEmailFactory extends EmailFactory<BuildParams> {
  public constructor(
    protected readonly templateProvider: EmailHtmlTemplateProvider,
    protected readonly urlResolver: FrontendUrlResolver,
  ) {
    super();
  }

  public async build(params: BuildParams): EmailFactoryBuildResult {
    return {
      emails: [
        {
          recipient: params.recipient,
          subject: 'Test Email from Intelligent App',
          content: this.templateProvider.template.build<{
            message: string;
          }>`
            <h3 class="header">Test Email from Intelligent App</h3>

            <p>
              ${p => p.message}
            </p>
          `({
            message: params.message,
          }),
        },
      ],
    };
  }
}
