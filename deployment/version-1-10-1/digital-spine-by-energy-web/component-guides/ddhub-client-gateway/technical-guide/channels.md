# Channels

## Overview

Messages between participating gateways are structured and organized in distinct channels corresponding to specific use cases or business processes.

Channels are created and managed in the Client Gateway by Admin Users, and defined by the following properties:

* `Format`: Messaging (individual messages with payload structured as JSON objects) or File Transfer (bulk data transfer via .csv or .xml files)
* `Type`: Publish (send) or Subscribe (receive)
* `Namespace`: A unique, non-numeric name to identify the channel
* `Settings`: The following settings can be enable/disabled when creating a channel:
  * `Use Anonymous Channel`: Anonymizes the identities of recipients (for Publish channels) or senders (for Subscribe channels)
  * `Payload Encryption`: Encrypts the payload of messages using the public key of the Sender's client gateway and private key of the recipient's gateway.
  * `Form Builder`: Provides a dynamic form based on the topic schema for users to manually send messages in the gateway UI.
* `Restrictions`: A list of specific identities or roles who are authorized to receive messages (for Publish channels) or send messages (for Subscribe channels); restrictions can be defined by specific identities, or by role.
* `Topics`: One or more standardized data schemas.

In order to access certain channels and gain permissions to send and/or receive specific message types, participants must [acquire roles](../../self-sovereign-identities/technical-guide/roles-and-iam.md) that reflect their role within the market (or use case), using credentials attached to their self-sovereign identity. Credentials are granted by a platform governing body and determine the ability to send messages to other participants using channels (what messages are sent and received) and topics (data schemas that define the payload of a message).

***

## User Guide

### Pre-requisites

* Authorization to Client Gateway

### Create a Channel

1. Navigate to `Channel Management` and click `Create`

<figure><img src="../../../../../.gitbook/assets/Screenshot 2025-05-07 at 3.14.48 PM.png" alt=""><figcaption><p>Channel management</p></figcaption></figure>

2. Fill up the new channel details and click `Next`&#x20;

{% hint style="success" %}
For `Messaging`,  you can utilize the dynamic message form by enabling `Enable Message Form` option
{% endhint %}

<figure><img src="../../../../../.gitbook/assets/Screenshot 2025-05-07 at 4.25.06 PM.png" alt=""><figcaption><p>Channel details</p></figcaption></figure>

2. Add channel restrictions. DIDs can be entered manually or chosen from address book contacts. You can also define which roles are permitted to access the new channel. Click `Save` after adding each new DID or role to update the restriction list

<figure><img src="../../../../../.gitbook/assets/Screenshot 2025-05-07 at 4.55.15 PM.png" alt=""><figcaption><p>Add channel restriction</p></figcaption></figure>

3. Review the restriction list. Use the action buttons located at the end of each restriction to update or remove it. Click `Next` to proceed to the next step

<figure><img src="../../../../../.gitbook/assets/Screenshot 2025-05-07 at 4.56.56 PM.png" alt=""><figcaption><p>Restriction list</p></figcaption></figure>

4. Add topics by using the `Select Application` and `Select Topic` dropdowns. Review the list of added topics, then use the action buttons to select response topics, edit or remove topic, or expand section to view the added response topics. Click `Next` to proceed to the last step

<figure><img src="../../../../../.gitbook/assets/Screenshot 2025-05-07 at 5.06.21 PM.png" alt=""><figcaption><p>Add topics</p></figcaption></figure>

5. Review the channel details. Switch to `Topics` tab to see the topic list. Click `Back` to edit any of the details or `Submit` to create channel

<figure><img src="../../../../../.gitbook/assets/Screenshot 2025-05-07 at 5.08.14 PM.png" alt=""><figcaption><p>Review channel details</p></figcaption></figure>

6. Success message will be shown, click `Dismiss` to close modal and view the channel list

<figure><img src="../../../../../.gitbook/assets/Screenshot 2025-05-07 at 5.11.01 PM.png" alt="" width="375"><figcaption><p>Successfully created channel</p></figcaption></figure>

### Modify a Channel

1. Search for the channel that you would like to modify. Click on the `︙` button at the end of the record row and choose `Update`&#x20;

<figure><img src="../../../../../.gitbook/assets/Screenshot 2025-05-07 at 5.12.36 PM.png" alt=""><figcaption><p>Update channel action</p></figcaption></figure>

2. Add or update restrictions and click `Next` to go to the next step

<figure><img src="../../../../../.gitbook/assets/Screenshot 2025-05-07 at 5.19.25 PM.png" alt=""><figcaption><p>Update restrictions</p></figcaption></figure>

3. Add or update topics and then click `Save` to update channel

<figure><img src="../../../../../.gitbook/assets/Screenshot 2025-05-07 at 5.22.08 PM.png" alt=""><figcaption><p>Update topics</p></figcaption></figure>

4. Success message will be shown, click `Dismiss` to close modal and view the channel list

<figure><img src="../../../../../.gitbook/assets/Screenshot 2025-05-07 at 5.24.14 PM.png" alt="" width="375"><figcaption><p>Successfully updated channel</p></figcaption></figure>

### Remove a Channel

1. Search for the channel that you would like to remove. Click on the `︙` button at the end of the record row and choose `Remove`&#x20;

<figure><img src="../../../../../.gitbook/assets/Screenshot 2025-05-07 at 5.25.44 PM.png" alt=""><figcaption><p>Remove channel action</p></figcaption></figure>

2. A confirmation modal will appear, click `Confirm` to remove the channel or `Cancel`&#x20;

<figure><img src="../../../../../.gitbook/assets/image (242).png" alt="" width="375"><figcaption><p>Delete channel confirmation</p></figcaption></figure>

3. Success message will be shown, click `Dismiss` to close modal and view the channel list

<figure><img src="../../../../../.gitbook/assets/image (243).png" alt="" width="375"><figcaption><p>Successfully deleted channel</p></figcaption></figure>
