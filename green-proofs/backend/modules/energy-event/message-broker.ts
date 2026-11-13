import { inspect } from 'node:util';

import {
  ConfigFacade,
  prepareAnyError,
} from '@energywebfoundation/generic-green-proofs-api';
import {
  type JSONValue,
  retry,
} from '@energywebfoundation/generic-green-proofs-common';
import { Logger } from '@energywebfoundation/generic-green-proofs-logger';
import {
  Injectable,
  type OnApplicationShutdown,
} from '@nestjs/common';
import z from 'zod';

import { AppConfig } from '../app-config/app-config.js';

export abstract class MessageBroker {
  abstract send(params: { payload: JSONValue; requestId: string }): Promise<void>;
  abstract readUntil<T>(params: {
    clientId: string;
    /** Parse can throw an error - in that case a retry happens */
    parse: (payloads: unknown[]) => T;
  }): Promise<T>;
}

@Injectable()
export class DigitalSpineMessageBroker extends MessageBroker implements OnApplicationShutdown {
  private readLocalOriginRecordsAbortController = new AbortController();

  constructor(
    private appConfig: AppConfig,
    private configFacade: ConfigFacade,
    private loggerService: Logger,
  ) {
    super();
  }

  public onApplicationShutdown() {
    this.readLocalOriginRecordsAbortController.abort();
  }

  /** We first need to ask GSY to send local origin records to Digital Spine - after that we can .readLocalOriginRecordMessages */
  public async send({ payload, requestId }: { payload: JSONValue; requestId: string }): Promise<void> {
    const headers = {
      'Content-Type': 'application/json',
      'x-api-key': this.appConfig.config.dsClientGatewayApiKey,
      'CF-Access-Client-Id': this.appConfig.config.dsClientGatewayCfAccessId,
      'CF-Access-Client-Secret': this.appConfig.config.dsClientGatewayCfAccessSecret,
    };

    const body = {
      fqcn: this.appConfig.config.dsClientGatewayFqcnSend,
      topicName: this.appConfig.config.dsClientGatewayTopicRequestGsyData,
      topicVersion: '1.0.0',
      topicOwner: this.appConfig.config.dsClientGatewayTopicOwner,
      transactionId: requestId,
      anonymousRecipient: [],
      payload: JSON.stringify(payload),
    };

    const response = await this.fetchWithParser({
      fetchPromise: fetch(`${this.appConfig.config.dsClientGatewayUrl}/api/v2/messages`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers,
      }),
      parser: DSSendMessageResponse,
      errorDescription: '[DigitalSpineMessageBroker] Error when sending message',
    });

    if (response.recipients.failed !== 0 || response.recipients.sent !== 1) {
      throw new Error(`[DigitalSpineMessageBroker] Error when sending message: invalid response: ${JSON.stringify(response)}`);
    }
  }

  /** We need to wait for requestId to appear in retrieved messages, or otherwise timeout waiting */
  public async readUntil<T>({ clientId, parse }: { clientId: string; parse: (payloads: unknown[]) => T }): Promise<T> {
    const headers = {
      'Content-Type': 'application/json',
      'x-api-key': this.appConfig.config.dsClientGatewayApiKey,
      'CF-Access-Client-Id': this.appConfig.config.dsClientGatewayCfAccessId,
      'CF-Access-Client-Secret': this.appConfig.config.dsClientGatewayCfAccessSecret,
    };

    const url = new URL(`${this.appConfig.config.dsClientGatewayUrl}/api/v2/messages`);
    url.searchParams.set('fqcn', this.appConfig.config.dsClientGatewayFqcnRead);
    url.searchParams.set('topicName', this.appConfig.config.dsClientGatewayTopicReadGsyData);
    url.searchParams.set('topicOwner', this.appConfig.config.dsClientGatewayTopicOwner);
    url.searchParams.set('clientId', clientId);

    const localOriginRecords = await retry(async () => {
      try {
        const messages = await this.fetchWithParser({
          fetchPromise: fetch(url.href, {
            method: 'GET',
            headers,
          }),
          parser: DSGetLocalOriginRecordsResponse,
          errorDescription: 'Error when reading messages from Digital Spine',
        });

        const filteredMessages = messages.filter(m => m.signatureValid === 'SUCCESS');

        return parse(filteredMessages.map(m => m.payload));
      } catch (error) {
        this.loggerService.logInfo(`[DigitalSpineMessageBroker] failed reading message: ${inspect(error)}`);

        throw error;
      }
    }, {
      delay: 5_000, // 5 seconds
      retries: 18, // 90 seconds total
      signal: this.readLocalOriginRecordsAbortController.signal,
    });

    return localOriginRecords;
  }

  private async fetchWithParser<T extends z.ZodType>({
    fetchPromise,
    parser,
    errorDescription,
  }: { fetchPromise: Promise<Response>; parser: T; errorDescription: string }): Promise<z.infer<T>> {
    try {
      const response = await fetchPromise;

      if (response.ok === false) {
        throw new Error(`[${response.status}] - ${await response.text()}`);
      }

      const data = await response.json();

      return parser.parse(data);
    } catch (anyError: unknown) {
      const error = prepareAnyError(anyError, { translationEngine: this.configFacade.getErrorTranslationEngine() });

      throw new Error(`${errorDescription}: ${error.message}`, { cause: anyError });
    }
  }
}

const DSSendMessageResponse = z.object({ // we ignore some currently existing fields we don't need in case they change - to not fail validation
  // clientGatewayMessageId: z.string(),
  recipients: z.object({
    failed: z.number(),
    sent: z.number(),
    total: z.number(),
  }),
  // status: z.array(z.object({
  // details: z.array(z.object({
  // did: z.string(),
  // messageId: z.string(),
  // statusCode: z.number(),
  // })),
  // name: z.string(),
  // })),
});

const DSGetLocalOriginRecordsResponse = z.array(z.object({ // we ignore some currently existing fields we don't need in case they change - to not fail validation
  id: z.string(),
  // topicVersion: z.string(),
  topicName: z.string(),
  topicOwner: z.string(),
  // topicSchemaType: z.string(),
  // signature: z.string(),
  // sender: z.string(),
  // timestampNanos: z.number(),
  // timestampISO: z.string(),
  // transactionId: z.string(),
  // payloadEncryption: z.boolean(),
  // clientGatewayMessageId: z.string(),
  // topicId: z.string(),
  signatureValid: z.string(),
  // decryption: z.object({
  // status: z.string(),
  // }),
  payload: z.preprocess((value) => {
    if (typeof value === 'string') {
      return JSON.parse(value);
    } else {
      return value;
    }
  }, z.any()),
}));
