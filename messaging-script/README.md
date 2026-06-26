# Messaging Script

Minimal Node.js script that publishes a message to the Client Gateway (CGW) and then polls for messages on a subscription channel. It demonstrates the EW Data Spine messaging flow over the CGW REST API (`/api/v2/messages`).

Swagger docs for the gateway are available at `<GATEWAY_URL>/docs`.

## Requirements

- Node.js 18+
- Access to a running Client Gateway and a valid API key

## Install

```bash
npm install
```

## Environment variables (script)

The script reads its configuration from two environment variables:

| Variable      | Required | Description                                                                 | Example                                  |
| ------------- | -------- | --------------------------------------------------------------------------- | ---------------------------------------- |
| `GATEWAY_URL` | Yes      | Base URL of the Client Gateway. Used as the axios `baseURL`.                | `https://cgw.example.energyweb.org`      |
| `API_KEY`     | Yes      | Gateway API key. Sent on every request as the `x-api-key` header.           | `blabla`                                 |

Both must be set or requests will fail (missing `GATEWAY_URL` makes the base URL undefined; missing `API_KEY` makes the gateway reject the request).
CGW needs to have configured `API_KEY` internally (as a secure string).
## Usage

Inline, as a single command:

```bash
GATEWAY_URL=https://cgw.example.energyweb.org API_KEY=some_api_key node main.js
```

## What it does

On each run the script:

1. Publishes one message to the channel `helloworld.pub` (`POST /api/v2/messages`) with a random `transactionId`.
2. Polls the channel `helloworld.sub` (`GET /api/v2/messages`) up to 5 times, 5 seconds apart, until a message is returned or attempts are exhausted.

### Configuration constants

These are hardcoded in `main.js` and can be edited there if your topic/channels differ:

| Constant        | Value                                          |
| --------------- | ---------------------------------------------- |
| `TOPIC_NAME`    | `helloWorld`                                   |
| `TOPIC_OWNER`   | `integration.apps.intelligent.auth.ewc`        |
| `TOPIC_VERSION` | `1.0.0`                                         |
| `PUB_FQCN`      | `helloworld.pub` (publish channel)             |
| `SUB_FQCN`      | `helloworld.sub` (read channel)                |
| `CLIENT_ID`     | `intelligent-ew-client`                        |
| `MAX_RETRIES`   | `5`                                            |
| `RETRY_INTERVAL_MS` | `5000`                                     |

