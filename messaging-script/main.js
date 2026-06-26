// All Swagger docs are available on `<CGW_URL>/docs

const axios = require("axios");
const crypto = require("crypto");

const BASE_URL = process.env.GATEWAY_URL;

const TOPIC_NAME = "helloWorld";
const TOPIC_OWNER = "integration.apps.intelligent.auth.ewc";
const TOPIC_VERSION = "1.0.0";

const PUB_FQCN = "helloworld.pub"; // channel we publish to
const SUB_FQCN = "helloworld.sub"; // channel we read from
const CLIENT_ID = "intelligent-ew-client";

const MAX_RETRIES = 5;
const RETRY_INTERVAL_MS = 5000;

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json", "x-api-key": process.env.API_KEY },
});

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function sendMessage() {
  const transactionId = crypto.randomUUID();
  const body = {
    fqcn: PUB_FQCN,
    topicName: TOPIC_NAME,
    topicOwner: TOPIC_OWNER,
    topicVersion: TOPIC_VERSION,
    transactionId,
    payload: JSON.stringify({ vendorName: "EW", email: "test@energyweb.org" }),
    anonymousRecipient: [],
  };

  console.log(`Publishing to fqcn "${PUB_FQCN}" (transactionId=${transactionId})...`);

  const { data } = await api.post("/api/v2/messages", body);
  
  console.log("Message sent:", JSON.stringify(data, null, 2));

  return transactionId;
}

async function receiveMessage() {
  const params = {
    fqcn: SUB_FQCN,
    clientId: CLIENT_ID,
    topicName: TOPIC_NAME,
    topicOwner: TOPIC_OWNER,
    amount: 1,
  };

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    console.log(`Fetching from fqcn "${SUB_FQCN}" (attempt ${attempt}/${MAX_RETRIES})...`);
    try {
      const { data } = await api.get("/api/v2/messages", { params });

      if (Array.isArray(data) && data.length > 0) {
        console.log("Message(s) received:", JSON.stringify(data, null, 2));
        return data;
      }

      console.log("No messages yet.");
    } catch (err) {
      console.error("Fetch error:", err.response?.data || err.message);
    }

    if (attempt < MAX_RETRIES) {
      await sleep(RETRY_INTERVAL_MS);
    }
  }

  console.log(`No messages after ${MAX_RETRIES} attempts.`);

  return [];
}

(async () => {
  try {
    await sendMessage();
    await receiveMessage();
  } catch (err) {
    console.error("Fatal error:", err.response?.data || err.message);
    process.exit(1);
  }
})();
