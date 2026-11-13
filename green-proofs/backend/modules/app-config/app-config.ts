import { Injectable } from '@nestjs/common';
import z from 'zod';

// every 10 minutes - we'll get 15-minute ranges
// but running it more often seems better (we have always some time to catch up on some missed ranges) as long as we don't query twice for same time ranges.
// If it is 12:20 we'll query for 12:00:01-12:15:00 and store 12:15 as last timestamp. If we query twice for the same range, then
// redudancy mechanism on issue process should kick in
const defaultCron = '0 */10 * * * *';
const clearEmptyString = (value: unknown) => {
  return (typeof value === 'string' && value === '') ? undefined : value;
};

const configSchema = z.object({
  /** Access key identifier used to bypass cloudflare protection */
  DS_CLIENT_GATEWAY_CF_ACCESS_ID: z.string(),
  /** Access key secret used to bypass cloudflare protection */
  DS_CLIENT_GATEWAY_CF_ACCESS_SECRET: z.string(),
  /** Digital Spine API key - identifying our application and access */
  DS_CLIENT_GATEWAY_API_KEY: z.string(),
  /** Digital Spine Client Gateway URL */
  DS_CLIENT_GATEWAY_URL: z.string(),
  /** Parameter for sending messages to Digital Spine */
  DS_CLIENT_GATEWAY_FQCN_SEND: z.string(),
  /** Parameter for reading messages from Digital Spine */
  DS_CLIENT_GATEWAY_FQCN_READ: z.string(),
  /** Parameter for requesting local origin records from GSY through Digital Spine */
  DS_CLIENT_GATEWAY_TOPIC_REQUEST_GSY_DATA: z.string(),
  /** Parameter for reading local origin records requested from GSY through Digital Spine */
  DS_CLIENT_GATEWAY_TOPIC_READ_GSY_DATA: z.string(),
  /** Parameter for reading messages from Digital Spine */
  DS_CLIENT_GATEWAY_TOPIC_SEND: z.string(),
  /** Parameter for requesting and reading local origin records from GSY through Digital Spine */
  DS_CLIENT_GATEWAY_TOPIC_OWNER: z.string(),
  /** Cron schedule of the task retrieving energy records */
  RETRIEVE_ENERGY_RECORDS_CRON: z.preprocess(clearEmptyString, z.string().optional().default(defaultCron)),
  /** Initial time since which energy records should be queried. Used only once after entire application launch, and if not provided - uses current time of deployment */
  RETRIEVE_ENERGY_RECORDS_INITIAL_TIMESTAMP: z.preprocess(clearEmptyString, z.iso.datetime({ offset: true }).optional()),
  INTELLIGENT_API_TOKEN: z.string(),
});

@Injectable()
export class AppConfig {
  private _config: z.infer<typeof configSchema> = configSchema.parse(process.env);

  public get config() {
    return {
      retrieveEnergyRecordsInitialTimestamp: this._config.RETRIEVE_ENERGY_RECORDS_INITIAL_TIMESTAMP,
      retrieveEnergyRecordsCron: this._config.RETRIEVE_ENERGY_RECORDS_CRON,
      dsClientGatewayCfAccessId: this._config.DS_CLIENT_GATEWAY_CF_ACCESS_ID,
      dsClientGatewayCfAccessSecret: this._config.DS_CLIENT_GATEWAY_CF_ACCESS_SECRET,
      dsClientGatewayApiKey: this._config.DS_CLIENT_GATEWAY_API_KEY,
      dsClientGatewayUrl: this._config.DS_CLIENT_GATEWAY_URL,
      dsClientGatewayFqcnSend: this._config.DS_CLIENT_GATEWAY_FQCN_SEND,
      dsClientGatewayFqcnRead: this._config.DS_CLIENT_GATEWAY_FQCN_READ,
      dsClientGatewayTopicRequestGsyData: this._config.DS_CLIENT_GATEWAY_TOPIC_REQUEST_GSY_DATA,
      dsClientGatewayTopicReadGsyData: this._config.DS_CLIENT_GATEWAY_TOPIC_READ_GSY_DATA,
      dsClientGatewayTopicOwner: this._config.DS_CLIENT_GATEWAY_TOPIC_OWNER,
      intelligentApiToken: this._config.INTELLIGENT_API_TOKEN,
    };
  }
}
