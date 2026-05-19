# Roles and IAM

## Overview

Identity and Access Management refers to the process of identifying, authorizing, and authenticating participants to interact with the data exchange hub.&#x20;

Role-based access control is implemented at two levels:

1. IAM for Client Gateways: Roles are used to govern each Client Gateway’s access to and permissions within a given application, including the gateway’s ability to interact with the Message Broker, access and read/write information within topics, and authenticating messages to ensure that both sender and recipients are known. IAM for Client Gateways is accomplished using a self-sovereign identity framework, in which each actor participating creates a unique identifier and uses it to enrol their gateway instance in one or more roles.
2. IAM for Users: Each actor participating can govern internal access to their respective Client Gateway by configuring two separate user types: Admin Users, who have permissions to the full suite of features including channel management, API management, and messaging, and Messaging Users, who only have permissions to send, view, and acknowledge messages in the Client Gateway UI. IAM for Users is accomplished with a conventional username/password framework.

***

### User Guide

### Pre-requisites

* User logged into Switchboard
* An organization was created
* An application was created

#### Create a Role

1. In the Application Management page, click on the action button right next to the application that you want to add a new role

<figure><img src="../../../../../.gitbook/assets/Screenshot 2025-06-13 at 11.26.12 AM.png" alt=""><figcaption><p>Create role</p></figcaption></figure>

2. Fill up the mandatory and optional fields in the Create Role pop-up form

<figure><img src="../../../../../.gitbook/assets/Screenshot 2025-06-13 at 11.29.32 AM.png" alt="" width="375"><figcaption><p>Step 1: New role</p></figcaption></figure>

<figure><img src="../../../../../.gitbook/assets/image (261).png" alt="" width="375"><figcaption><p>Step 2: Set role issuers</p></figcaption></figure>

<figure><img src="../../../../../.gitbook/assets/image (262).png" alt="" width="375"><figcaption><p>Step 3: Set role revokers</p></figcaption></figure>

<figure><img src="../../../../../.gitbook/assets/image (263).png" alt="" width="375"><figcaption><p>Step 4: Set restrictions</p></figcaption></figure>

<figure><img src="../../../../../.gitbook/assets/image (264).png" alt="" width="375"><figcaption><p>Step 5: Set validity period</p></figcaption></figure>

<figure><img src="../../../../../.gitbook/assets/image (265).png" alt="" width="375"><figcaption><p>Step 6: Set requestor fields</p></figcaption></figure>

<figure><img src="../../../../../.gitbook/assets/image (266).png" alt="" width="375"><figcaption><p>Step 7: Set issuer fields</p></figcaption></figure>

<figure><img src="../../../../../.gitbook/assets/image (267).png" alt="" width="375"><figcaption><p>Step 8: Confirm Details</p></figcaption></figure>

#### Modify a Role

1. In the Role Governance page, click on the action button right next to the role that you want to edit

<figure><img src="../../../../../.gitbook/assets/Screenshot 2025-06-13 at 11.51.01 AM.png" alt=""><figcaption><p>Edit role</p></figcaption></figure>

2. Proceed to update your role details, only role name is not allowed to be changed

<figure><img src="../../../../../.gitbook/assets/Screenshot 2025-06-13 at 11.55.19 AM.png" alt="" width="375"><figcaption><p>Update role</p></figcaption></figure>

#### Request a Role

1. Once a role has been set up, proceed to click on action to `Copy Role Enrolment URL` and share it with the new user that wishes to enrol
2. The user will be prompted to sign in using their wallet
3. Fill in the form and submit. The system then will send the enrolment request to the issuer(s) who had previously been specified to approve the role

<figure><img src="../../../../../.gitbook/assets/image (268).png" alt=""><figcaption><p>Enrolment form</p></figcaption></figure>

#### Approve/Reject a Role Request

1. Sign in to Switchboard as the issuer who can approve the requested role
2. Check the Task Manager located in the top navigation for notification

<figure><img src="../../../../../.gitbook/assets/image (269).png" alt="" width="350"><figcaption><p>Task Manager list</p></figcaption></figure>

3. Your enrolments screen should display the request from the new user

<figure><img src="../../../../../.gitbook/assets/image (270).png" alt=""><figcaption><p>Enrolment Requests</p></figcaption></figure>

4. `View Request` pop-up under the three vertical dots button contains information about the requestor, chosen role, and the fields from the enrolment form. If you approve this request, you have issued a _verified claim_ that the new user can add to that user’s DID document and thereby access your application in the appropriate role. Alternatively, you may also choose to Revoke the request

<figure><img src="../../../../../.gitbook/assets/image (271).png" alt="" width="375"><figcaption><p>“View Request” pop-up</p></figcaption></figure>

#### Revoke a Role

For approved roles, they may be revoked both onchain and offchain. This option is available in the Enrolment Requests tab. Click on "View Request" option under the three vertical dots button to review before revoke.&#x20;

<figure><img src="../../../../../.gitbook/assets/Screenshot 2025-08-08 at 12.28.39 PM.png" alt="" width="375"><figcaption><p>Revoke a role</p></figcaption></figure>

#### Sync Roles to Your DID

Once a role is approve, you should add this newly issued claim to your DID document, so that you have the credentials you need in order to access the application with the appropriate role. In My Enrolments tab, use the “Publish” option under the three vertical dots button or under Issuance Status to do this.

<figure><img src="../../../../../.gitbook/assets/image (272).png" alt="" width="375"><figcaption><p>Publish credential to DID document </p></figcaption></figure>
