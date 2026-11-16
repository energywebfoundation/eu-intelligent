import os
import sys
import time
import uuid
import json
import requests

# Retrieve configuration from environment variables
BASE_URL = os.environ.get("GATEWAY_URL")
API_KEY = os.environ.get("API_KEY")

# Guard check to ensure required environment variables are set
if not BASE_URL:
    print("Error: GATEWAY_URL environment variable is not set.", file=sys.stderr)
    sys.exit(1)
# if not API_KEY:
#     print("Error: API_KEY environment variable is not set.", file=sys.stderr)
#     sys.exit(1)

TOPIC_NAME = "assetMeasurement"
TOPIC_OWNER = "integration.apps.intelligent.auth.ewc"
TOPIC_VERSION = "2.0.0"

PUB_FQCN = "assetmeasurement.pub"  # channel we publish to
SUB_FQCN = "assetmeasurement.sub"  # channel we read from
CLIENT_ID = "intelligentewclient"

MAX_RETRIES = 5
RETRY_INTERVAL_SECONDS = 5.0  # Polling interval

JSON_FILE_NAME = "assetMeasurement.json"  # File containing the JSON payload to send

# Configure a requests Session
session = requests.Session()
session.headers.update({
    "Content-Type": "application/json"
    # "x-api-key": API_KEY
})


def send_message():
    transaction_id = str(uuid.uuid4())

    # define json payload, insert content from file content.json
    with open(JSON_FILE_NAME, "r") as f:
        content = json.load(f)

    # Construct request payload
    body = {
        "fqcn": PUB_FQCN,
        "topicName": TOPIC_NAME,
        "topicOwner": TOPIC_OWNER,
        "topicVersion": TOPIC_VERSION,
        "transactionId": transaction_id,
        "payload": json.dumps(content),
        # "payload": json.dumps({"vendorName": "EW", "email": "test@energyweb.org"}),
        "anonymousRecipient": []
    }

    # print payload for debugging
    print("Request payload:\n", json.dumps(body, indent=2))
    
    print(f"Publishing to fqcn \"{PUB_FQCN}\" (transactionId={transaction_id})...")
    
    url = f"{BASE_URL}/api/v2/messages"
    print(repr(url))
    response = session.post(url, json=body)
    response.raise_for_status()
    
    data = response.json()
    print("Message sent:\n", json.dumps(data, indent=2))
    
    return transaction_id


def receive_message():
    params = {
        "fqcn": SUB_FQCN,
        "clientId": CLIENT_ID,
        "topicName": TOPIC_NAME,
        "topicOwner": TOPIC_OWNER,
        "amount": 1
    }
    
    url = f"{BASE_URL}/api/v2/messages"
    
    for attempt in range(1, MAX_RETRIES + 1):
        print(f"Fetching from fqcn \"{SUB_FQCN}\" (attempt {attempt}/{MAX_RETRIES})...")
        try:
            response = session.get(url, params=params)
            response.raise_for_status()
            
            data = response.json()
            
            if isinstance(data, list) and len(data) > 0:
                print("Message(s) received:\n", json.dumps(data, indent=2))
                return data
            
            print("No messages yet.")
        except requests.exceptions.RequestException as err:
            error_detail = err.response.text if err.response else str(err)
            print(f"Fetch error: {error_detail}", file=sys.stderr)
        
        if attempt < MAX_RETRIES:
            time.sleep(RETRY_INTERVAL_SECONDS)
            
    print(f"No messages after {MAX_RETRIES} attempts.")
    return []


if __name__ == "__main__":
    try:
        send_message()
        receive_message()
    except requests.exceptions.RequestException as err:
        error_detail = err.response.text if err.response else str(err)
        print(f"Fatal error: {error_detail}", file=sys.stderr)
        sys.exit(1)
    except Exception as err:
        print(f"Fatal error: {str(err)}", file=sys.stderr)
        sys.exit(1)