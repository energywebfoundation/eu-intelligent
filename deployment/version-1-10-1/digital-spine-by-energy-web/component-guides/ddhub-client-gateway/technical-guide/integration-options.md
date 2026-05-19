# Integration Options

## Overview

Client Gateway offers a user interface for managing topics and channels, as well as for sending and receiving data; however, these functions can also be performed using REST APIs. Additionally, two-way interactive communication between senders and receivers can also be achieved using the WebSocket APIs.

***

## User Guide

### Pre-requisites

* Authorization to Client Gateway

### HTTP API

Navigate to Client Gateway Swagger to see the available REST API collection

<figure><img src="../../../../../.gitbook/assets/Screenshot 2025-05-09 at 11.05.13 AM.png" alt=""><figcaption><p>Integration APIs</p></figcaption></figure>

<figure><img src="../../../../../.gitbook/assets/image (244).png" alt=""><figcaption><p>Client Gateway Swagger</p></figcaption></figure>

#### Sending Requests and Consuming Data (example)

{% hint style="info" %}
This example uses `axios` library to demonstrate requests.
{% endhint %}

```typescript
import axios from 'axios';

axios.get('https://{the-client-gw-api-here}/api/v2/identity', {
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': '{the-api-key-here}'
  }
})
.then(response => {
  console.log(response.data);
})
.catch(error => {
  console.error('Error fetching data:', error);
});
```

### WebSocket API

Unlike REST APIs, which require separate requests for each interaction, WebSockets allow continuous, two-way communication — ideal for real-time messaging. Navigate to Web Socket API for DDHub Gateway Web Socket API 1.0.0

<figure><img src="../../../../../.gitbook/assets/Screenshot 2025-05-09 at 11.06.00 AM.png" alt=""><figcaption><p>Integration APIs</p></figcaption></figure>

<figure><img src="../../../../../.gitbook/assets/image (245).png" alt=""><figcaption><p>WebSocket API documentation</p></figcaption></figure>

#### Connecting

Please ensure to use `Sec-WebSocket-Protocol` : `ddhub-protocol` in the header

```javascript
// Connect websocket
const socket = new WebSocket('wss:{ddhub-wss-url}', ['ddhub-protocol']);

socket.onopen = () => {
  console.log('Connected with subprotocol:', socket.protocol);
};
```

#### Sending a WS Message (example)

```javascript
// send message
socket.send(JSON.stringify({
  "fqcn": "test.pub.chnl",
  "topicName": "test_topic",
  "topicVersion": "1.0.1",
  "topicOwner": "ddhub.test",
  "transactionId": "45d5a89f-7c2c-48b0-ae9a-54f4128e818",
  "payload": "{ data: 70 }"
}));
```

#### Consuming a WS Message

```javascript
// set up a listener for incoming messages
socket.onmessage = function (event) {
  const data = JSON.parse(event.data);
  console.log('Received:', data);
};
```
