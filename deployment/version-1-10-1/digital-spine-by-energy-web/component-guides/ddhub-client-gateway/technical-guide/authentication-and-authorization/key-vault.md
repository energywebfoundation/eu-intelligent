# Key Vault

## Overview

User credentials must be configured in the secrets engine manually by the client gateway admin during the initial gateway deployment. Most secrets engines provide a user interface to manage such values.

{% hint style="warning" %}
The client gateway has no UI to enable user registration or password recovery/reset. These must be done through the secrets engine manually by person/team deploying the client gateway.
{% endhint %}

{% hint style="success" %}
Each user represents a secret record in the selected secret engine.
{% endhint %}

### Supported Secrets Engine <a href="#supported-secrets-engine" id="supported-secrets-engine"></a>

1. HashiCorp Key Vault
2. Azure Key Vault
3. AWS Secrets Manager

### Secret Record Field <a href="#secret-record-field" id="secret-record-field"></a>

| **Field Name** | **Description**                                  | **Remarks**                                                      |
| -------------- | ------------------------------------------------ | ---------------------------------------------------------------- |
| username       | identifies the user with access to the system    |                                                                  |
| password       | a secret used to verify the user’s identity      |                                                                  |
| role           | defines the user’s level of access in the system | <p>Possible Values:</p><ul><li>admin</li><li>messaging</li></ul> |

### Secret engine accessibility check <a href="#secret-engine-accessibility-check" id="secret-engine-accessibility-check"></a>

In most cases, your secret engine will be on a private network. Please be sure that the client gateway can access the secret engine if they are not in the same network.

## User Guide

### Pre-requisites

* Access credentials to the selected secret engines

#### Get Azure Key Vault access credentials <a href="#get-azure-key-vault-access-credentials" id="get-azure-key-vault-access-credentials"></a>

* You should have a Key Vault resource created. You may follow [https://docs.microsoft.com/en-us/azure/key-vault/general/quick-create-portal](https://docs.microsoft.com/en-us/azure/key-vault/general/quick-create-portal)
* You need a `Service Principle` which has **Read\&Write** access to the Key Vault resource.
  * To create a service principle and retrieve the access credentials, please follow this guide (make sure to follow Password-based authentication): [https://docs.microsoft.com/en-us/cli/azure/create-an-azure-service-principal-azure-cli?view=azure-cli-latest#password-based-authentication](https://docs.microsoft.com/en-us/cli/azure/create-an-azure-service-principal-azure-cli?view=azure-cli-latest#password-based-authentication)
* After the service principle is created, follow this guide to create an access policy for the service principle (_recommend to use 'Secret Management' template as shown on the official guide_): [https://docs.microsoft.com/en-us/azure/key-vault/general/assign-access-policy?tabs=azure-portal#assign-an-access-policy](https://docs.microsoft.com/en-us/azure/key-vault/general/assign-access-policy?tabs=azure-portal#assign-an-access-policy)

Your output may look like below. All you need for DDHub Client GW are:

* `clientId`
* `clientSecret`
* `tenantId`
* `Vault URI`(on your Key Vaults resource overview page)

```json
{
  "clientId": "dcb*****-5**d-455b-93df-27*******a",
  "clientSecret": "ABy******************UBT",
  "subscriptionId": "3e0778884f-****-3433-5555-4d770DFGSFGDf",
  "tenantId": "778884f-fd1f-****-5e33-4a945d770D56",
  "activeDirectoryEndpointUrl": "https://login.microsoftonline.com",
  "resourceManagerEndpointUrl": "https://management.azure.com/",
  "activeDirectoryGraphResourceId": "https://graph.windows.net/",
  "sqlManagementEndpointUrl": "https://management.core.windows.net:8443/",
  "galleryEndpointUrl": "https://gallery.azure.com/",
  "managementEndpointUrl": "https://management.core.windows.net/"
}
```

#### Get AWS Secrets Manager access credentials <a href="#get-aws-secrets-manager-access-credentials" id="get-aws-secrets-manager-access-credentials"></a>

You'll need the access keys for IAM user / root user, which has privilege to **Read\&Write** into the Secrets Manager in the chosen region.

Please follow this guide if you are not familiar with AWS access keys: [https://docs.aws.amazon.com/IAM/latest/UserGuide/id\_credentials\_access-keys.html](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html)

All you need for DDHub Client GW are:

* `Access Key ID`
* `SECRET ACCESS KEY`
* `Region` for the secrets manager

#### Get HashiCorp Key Vault access token <a href="#get-hashicorp-key-vault-access-token" id="get-hashicorp-key-vault-access-token"></a>

Please check below scenarios and choose the one suits your use case:

<details>

<summary>Scenario-1: Existing Hashicorp vault service</summary>

1. `token` for accessing the existing vault service. Please contact your vault admin for access token.
2. `vault service address` of the existing vault service
3. Complete \`ddhub\` secret engine creation. You can follow [**How to create ddhub secret engine**](../../deployment-guide/key-vault/deploy-with-hashicorp-key-vault.md) step below to do that.

</details>

<details>

<summary>Scenario-2: Deploy new HashiCorp vault service and obtain token - run a single container</summary>

Please follow below steps to run HashiCorp vault service in a docker container.

In a terminal:

1.  Clone git repository [ddhub-client-gateway](https://github.com/energywebfoundation/ddhub-client-gateway)

    `git clone https://github.com/energywebfoundation/ddhub-client-gateway.git`
2.  Change directory to example directory

    `cd ddhub-client-gateway && cd get-started`
3.  Start the vault service

    `docker compose up vault_demo`
4. You should have the vault service and UI available at port 8200.
5. On a web browser, enter `http://127.0.0.1:8200/ui` in the address bar. Follow [https://learn.hashicorp.com/tutorials/vault/getting-started-ui?in=vault/getting-started#start-web-ui](https://learn.hashicorp.com/tutorials/vault/getting-started-ui?in=vault/getting-started#start-web-ui) starting from step 5. Then, you should have the `root_token`. The `vault server address` is http://localhost:8200
6. Complete \`ddhub\` secret engine creation. You can follow [**How to create ddhub secret engine**](../../deployment-guide/key-vault/deploy-with-hashicorp-key-vault.md) step below to do that.

</details>

<details>

<summary>Scenario-3: Deploy new HashiCorp vault service and obtain token - Kubernetes</summary>

Please follow the steps below:

1. Follow this [guide](https://www.vaultproject.io/docs/platform/k8s/helm#using-the-helm-chart) to deploy a HashiCorp vault service in kubernetes.
2. Once your vault service is up and running, on a web browser, enter `http(s)://YOUR_VAULT_ADDRESS/ui` in the address bar. Follow [https://learn.hashicorp.com/tutorials/vault/getting-started-ui?in=vault/getting-started#start-web-ui](https://learn.hashicorp.com/tutorials/vault/getting-started-ui?in=vault/getting-started#start-web-ui) starting from step 5. Then, you should have the `root_token`. The `vault server address` is [http://YOUR\_VAULT\_ADDRESS](http://your_vault_address/)
3. Complete \`ddhub\` secret engine creation. You can follow [**How to create ddhub secret engine**](../../deployment-guide/key-vault/deploy-with-hashicorp-key-vault.md) step below to do that.

</details>
