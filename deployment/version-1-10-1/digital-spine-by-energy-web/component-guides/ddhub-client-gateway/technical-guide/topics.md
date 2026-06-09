# Topics

## Overview

Topics are data schemas that define and standardize the payload of messages sent between different actors in the platform. Topics are grouped under [Applications ](../../self-sovereign-identities/technical-guide/applications.md)and administered by Application owners (specifically Admin Users in the Client Gateway). They can be updated over time to accommodate changes in the data schema through versioning.

There are 4 types of data schema supported in the Client Gateway topics which are:

* JSD7
* XML
* CSV
* TSV

***

## User Guide

### Pre-requisites

* Authorization to Client Gateway
* `topiccreator` role

### Create a Topic

1. Navigate to `Topic Management` and select an application for your new topic

<figure><img src="../../../../../.gitbook/assets/Screenshot 2025-05-07 at 11.29.31 AM.png" alt=""><figcaption><p>Apps and Topics</p></figcaption></figure>

2. Click `Create`&#x20;

<figure><img src="../../../../../.gitbook/assets/Screenshot 2025-05-07 at 11.34.04 AM.png" alt=""><figcaption><p>Topic List</p></figcaption></figure>

3. Fill up the create topic form and click `Save`&#x20;

{% hint style="success" %}
Organize your topics effectively by using tags
{% endhint %}

<figure><img src="../../../../../.gitbook/assets/Screenshot 2025-05-07 at 11.41.33 AM.png" alt=""><figcaption><p>Create topic form</p></figcaption></figure>

4. Success message will be shown, click `Dismiss` to close modal and view the topic list

<figure><img src="../../../../../.gitbook/assets/Screenshot 2025-05-07 at 11.48.00 AM.png" alt="" width="375"><figcaption><p>Successfully created topic</p></figcaption></figure>

### Modify a Topic

1. Search for the topic that you would like to modify. Click on the `︙` button at the end of the record row and choose `View version history`&#x20;

<figure><img src="../../../../../.gitbook/assets/Screenshot 2025-05-07 at 11.55.49 AM.png" alt=""><figcaption><p>View version history</p></figcaption></figure>

2. Click on the `︙` button of the topic version you would like to update and choose  `Update`&#x20;

<figure><img src="../../../../../.gitbook/assets/Screenshot 2025-05-07 at 11.57.33 AM.png" alt=""><figcaption><p>Update topic</p></figcaption></figure>

3. Make changes to the schema, you may also bump the version and the older version will keep the original schema instead

<figure><img src="../../../../../.gitbook/assets/Screenshot 2025-05-07 at 12.00.21 PM.png" alt=""><figcaption><p>Update topic form</p></figcaption></figure>

4. Success message will be shown, click `Dismiss` to close modal and view the version history list

<figure><img src="../../../../../.gitbook/assets/image (239).png" alt="" width="375"><figcaption><p>Successfully updated topic</p></figcaption></figure>

### Remove a Version History

1. Click on the `︙` button of the topic version you would like to remove and choose  `Remove`&#x20;

<figure><img src="../../../../../.gitbook/assets/Screenshot 2025-05-07 at 12.10.04 PM.png" alt=""><figcaption><p>Remove a version history</p></figcaption></figure>

2. A confirmation modal will appear, click `Confirm` to remove the version history from topic or `Cancel`&#x20;

<figure><img src="../../../../../.gitbook/assets/image (240).png" alt="" width="375"><figcaption><p>Delete version history confirmation modal</p></figcaption></figure>

3. Success message will be shown, click `Dismiss` to close modal and view the version history list

<figure><img src="../../../../../.gitbook/assets/image (241).png" alt="" width="375"><figcaption><p>Successfully deleted version history</p></figcaption></figure>

### Remove a Topic

1. Search for the topic that you would like to remove. Click on the `︙` button at the end of the record row and choose `Remove`&#x20;

<figure><img src="../../../../../.gitbook/assets/Screenshot 2025-05-07 at 12.14.13 PM.png" alt=""><figcaption><p>Remove topic</p></figcaption></figure>

2. A confirmation modal will appear, click `Confirm` to remove the topic or `Cancel`&#x20;

<figure><img src="../../../../../.gitbook/assets/image (240).png" alt="" width="375"><figcaption><p>Delete topic confirmation modal</p></figcaption></figure>

3. Success message will be shown, click `Dismiss` to close modal and view the topics list

<figure><img src="../../../../../.gitbook/assets/image (241).png" alt="" width="375"><figcaption><p>Successfully deleted topics</p></figcaption></figure>
