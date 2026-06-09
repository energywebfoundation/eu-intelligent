# Client Gateway Identity and VCs

## Overview

This subsection describes how to acquire an organisational user role for the client gateway. The process consists of two steps:

1. Creating a decentralised identifier (DID) for the enterprise user in question, and
2. Using that DID to enroll the client gateway in the appropriate role(s).

***

## User Guide

### Pre-requisites

* A browser with [Metamask](https://metamask.io/) extension

### Creating a DID for the organisation <a href="#creating-a-did-for-the-organisation" id="creating-a-did-for-the-organisation"></a>

1. To create a DID, generate a new key Ethereum address (including a public key (address) and private key) using [![](https://vanity-eth.tk/favicon-16x16.png)Vanity-ETH](https://vanity-eth.tk/). **Keep your private key secure and secret.**
2. Take the public address of the key and fund it with a Volta token on the EWF testnet. Submit the public key (**not the private key**) to the Volta faucet site [here](https://voltafaucet.energyweb.org/).
3. If you have not already done so, install the Metamask browser extension and connect to the Volta test network. **Make sure to securely backup your secret recovery phrase.**
4. Once you have created your initial account, you can import the address you created in Step 1 above by following these instructions to [import using a private key](https://support.metamask.io/hc/en-us/articles/360015489331-How-to-import-an-account#h_01G01W07NV7Q94M7P1EBD5BYM4)
5. Take the **public** address of the key and fund it with a Volta token on the EWF testnet. Submit the public address (not the private key) to the Volta faucet site at [EWF Volta testnet faucet](https://voltafaucet.energyweb.org/).

### Using the DID to enroll the client gateway in the appropriate role(s) <a href="#using-the-did-to-enroll-the-client-gateway-in-the-appropriate-role-s" id="using-the-did-to-enroll-the-client-gateway-in-the-appropriate-role-s"></a>

After the DID is created:

1. Identify which roles your client gateway requires, and then login to Switchboard via Metamask with your address, then click "submit requests."
2. Once your request is submitted, please contact your project manager for approval.
3. When your enrolment request is approved, navigate to Switchboard to publish your approved role credential. After you log in with Metamask, you will see a notification for "Publish"; click the notification and publish the enrolment. To see an example of the enrolment publishing process, please refer to this short [video clip](https://youtu.be/s2gMIIftZbU?si=-neA52PAs9o1szwL).

{% hint style="info" %}
All participating organisations should request the `user` role by default.
{% endhint %}
