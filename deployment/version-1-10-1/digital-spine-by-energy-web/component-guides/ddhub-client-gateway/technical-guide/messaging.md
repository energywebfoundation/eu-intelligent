# Messaging

## Overview

The Client Gateway supports the transmission and reception of messages and large files. Alternatively, participants can exchange messages through the Message Box when the `Message Forms` option is enabled. In this case, users can leverage a dynamically generated form, automatically populated based on the structure defined in the uploaded JSON schema.

***

## User Guide

### Pre-requisites

* Authorization to Client Gateway
* Subcribe/publish channels
* Topics

### Simple Messaging

A message can be sent by uploading a JSON file that defines the desired channel and topic in Data Messaging File Upload and vice versa.

#### Send a Message

1. Navigate to `Data Messaging`  > `File Upload`. Choose channel name, topic and version before uploading a json file that matches the selected topic schema. Click `Save` to send the message

<figure><img src="../../../../../.gitbook/assets/Screenshot 2025-05-08 at 10.45.14 AM.png" alt=""><figcaption><p>Send message</p></figcaption></figure>

2. Success message will be shown, click `Close` to close modal or `View recipients` to see the recipient list and delivery status

<figure><img src="../../../../../.gitbook/assets/Screenshot 2025-05-08 at 11.08.25 AM.png" alt="" width="375"><figcaption><p>Successfully send message</p></figcaption></figure>

<figure><img src="../../../../../.gitbook/assets/Screenshot 2025-05-08 at 11.10.06 AM.png" alt=""><figcaption><p>Recipient list</p></figcaption></figure>

#### Receive a Message

1. Navigate to `Data Messaging`  > `File Download` and choose a channel by clicking on it

<figure><img src="../../../../../.gitbook/assets/Screenshot 2025-05-08 at 11.14.04 AM.png" alt=""><figcaption><p>File download subscribe channel list</p></figcaption></figure>

2. You will be redirected to topic list page, click on a topic to proceed

<figure><img src="../../../../../.gitbook/assets/Screenshot 2025-05-08 at 11.17.17 AM.png" alt=""><figcaption><p>File download topic list</p></figcaption></figure>

3. The message will be displayed, click on `View details` to see message content

<figure><img src="../../../../../.gitbook/assets/Screenshot 2025-05-08 at 11.20.10 AM.png" alt=""><figcaption><p>Received message</p></figcaption></figure>

4. Click `Download` to save the message as JSON file&#x20;

<figure><img src="../../../../../.gitbook/assets/Screenshot 2025-05-08 at 11.22.37 AM.png" alt="" width="375"><figcaption><p>Message preview</p></figcaption></figure>

### Large Data Messaging

Schema types such as XML, TSV and CSV are classified as large data types and are being handled under Large Data Messaging within the Client Gateway.

#### Uploading a File

1. Navigate to `Large Data Messaging`  > `File Upload`. Choose channel name, topic and version before uploading a file that matches the selected topic schema. Click `Save` to send the message

<figure><img src="../../../../../.gitbook/assets/Screenshot 2025-05-08 at 2.26.51 PM.png" alt=""><figcaption><p>Send large data file</p></figcaption></figure>

2. Success message will be shown, click `Close` to close modal or `View recipients` to see the recipient list and delivery status

<figure><img src="../../../../../.gitbook/assets/image (246).png" alt="" width="375"><figcaption><p>Successfully sent a message</p></figcaption></figure>

<figure><img src="../../../../../.gitbook/assets/image (247).png" alt=""><figcaption><p>Recipient list</p></figcaption></figure>

#### Downloading a File

1. Navigate to `Large Data Messaging`  > `File Download` and choose a channel by clicking on it

<figure><img src="../../../../../.gitbook/assets/Screenshot 2025-05-08 at 2.30.54 PM.png" alt=""><figcaption><p>Large Data Messaging subscribe channels</p></figcaption></figure>

2. You will be redirected to topic list page, click on a topic to proceed

<figure><img src="../../../../../.gitbook/assets/image (248).png" alt=""><figcaption><p>Large Data Messaging topics</p></figcaption></figure>

3. The message will be displayed, click on download button to download the received file

<figure><img src="../../../../../.gitbook/assets/Screenshot 2025-05-08 at 2.36.06 PM.png" alt=""><figcaption><p>Received large data message</p></figcaption></figure>

### Messaging UI

An alternative method for sending and receiving messages is through the Messaging UI. Instead of uploading a JSON file containing the message content, users can use the dynamic form to complete required and optional fields as defined by the selected topic's schema.

#### Sending a message

1. Navigate to `Message Box` > `New Message` &#x20;

<figure><img src="../../../../../.gitbook/assets/Screenshot 2025-05-08 at 3.06.25 PM.png" alt=""><figcaption><p>Message Box > New Message menu</p></figcaption></figure>

2. Select a channel, topic name and version. Click `Next` to proceed

<figure><img src="../../../../../.gitbook/assets/Screenshot 2025-05-08 at 3.03.18 PM.png" alt=""><figcaption><p>Select channel and topic</p></figcaption></figure>

3. Fill the form and click `Next`

<figure><img src="../../../../../.gitbook/assets/Screenshot 2025-05-08 at 3.04.34 PM.png" alt=""><figcaption><p>New message form</p></figcaption></figure>

4. Review the JSON generated based on your form input in the previous step. Click `Send Message` to proceed

<figure><img src="../../../../../.gitbook/assets/Screenshot 2025-05-08 at 3.05.16 PM.png" alt=""><figcaption><p>Review message</p></figcaption></figure>

5. Success message will be shown, click `Dismiss` to close modal

<figure><img src="../../../../../.gitbook/assets/Screenshot 2025-05-08 at 3.05.59 PM.png" alt="" width="375"><figcaption><p>Successfully sent a message</p></figcaption></figure>

#### Receiving a message

1. Navigate to `Message Box` > `My Messages`  and click on the channel you would like to view message from

<figure><img src="../../../../../.gitbook/assets/Screenshot 2025-05-08 at 3.23.18 PM.png" alt=""><figcaption><p>My messages channel list</p></figcaption></figure>

2. Click on `View Message` to see the message content

<figure><img src="../../../../../.gitbook/assets/Screenshot 2025-05-08 at 3.24.09 PM.png" alt=""><figcaption><p>Received messages list</p></figcaption></figure>

3. Entry view will be shown by default, you may also switch to JSON view to see the received message. Refer to the next section for replying a message

<figure><img src="../../../../../.gitbook/assets/Screenshot 2025-05-08 at 3.26.14 PM.png" alt=""><figcaption><p>View message</p></figcaption></figure>

#### Replying a message

1. Click `Reply`  directly in the view message modal or in the received messages list

<figure><img src="../../../../../.gitbook/assets/Screenshot 2025-05-08 at 3.24.27 PM.png" alt=""><figcaption><p>Reply message action</p></figcaption></figure>

2. Select a channel, topic name and version before clicking `Next`

<figure><img src="../../../../../.gitbook/assets/Screenshot 2025-05-08 at 3.26.33 PM.png" alt=""><figcaption><p>Select channel and topic</p></figcaption></figure>

3. Fill in the reply form and click `Next`

<figure><img src="../../../../../.gitbook/assets/Screenshot 2025-05-08 at 3.44.44 PM.png" alt=""><figcaption><p>Reply form</p></figcaption></figure>

4. Review the JSON generated based on your form input in the previous step. Click `Send Message` to proceed

<figure><img src="../../../../../.gitbook/assets/Screenshot 2025-05-08 at 3.27.34 PM.png" alt=""><figcaption><p>Review message</p></figcaption></figure>

5. Success message will be shown, click `Dismiss` to close modal

<figure><img src="../../../../../.gitbook/assets/Screenshot 2025-05-08 at 3.28.22 PM.png" alt="" width="375"><figcaption><p>Successfully sent a message</p></figcaption></figure>

#### Viewing sent messages

1. Navigate to `Message Box` > `Sent`  and click on the channel you would like to view messages that you have sent to

<figure><img src="../../../../../.gitbook/assets/Screenshot 2025-05-08 at 3.48.30 PM.png" alt=""><figcaption><p>Sent messages channel list</p></figcaption></figure>

2. Click on `View message`&#x20;

<figure><img src="../../../../../.gitbook/assets/Screenshot 2025-05-08 at 3.49.23 PM.png" alt=""><figcaption><p>Sent message list</p></figcaption></figure>

3. The message will be displayed. You may also switch between entry or JSON view. Refer to the next section for viewing recipients

<figure><img src="../../../../../.gitbook/assets/Screenshot 2025-05-08 at 3.50.25 PM.png" alt=""><figcaption><p>View Message</p></figcaption></figure>

#### Viewing sent messages recipients

1. Click on `View recipients` in the sent messages page

<figure><img src="../../../../../.gitbook/assets/Screenshot 2025-05-08 at 3.49.23 PM copy.png" alt=""><figcaption><p>View recipients action</p></figcaption></figure>

2. The recipient list will be displayed. Click `x` to close modal

<figure><img src="../../../../../.gitbook/assets/Screenshot 2025-05-08 at 3.50.38 PM.png" alt=""><figcaption><p>Message recipient list</p></figcaption></figure>
