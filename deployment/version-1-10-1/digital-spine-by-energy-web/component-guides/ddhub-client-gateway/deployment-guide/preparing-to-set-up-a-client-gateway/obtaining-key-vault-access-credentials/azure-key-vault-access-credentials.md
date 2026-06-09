# Azure Key Vault access credentials

* You should have a Key Vault resource created. You may follow [Quickstart - Create an Azure Key Vault with the Azure portal](https://docs.microsoft.com/en-us/azure/key-vault/general/quick-create-portal)
* You need a `Service Principle` which has **Read\&Write** access to the Key Vault resource.

To create a service principle and retrieve the access credentials, please follow this [Create Azure service principals using the Azure CLI](https://docs.microsoft.com/en-us/cli/azure/create-an-azure-service-principal-azure-cli?view=azure-cli-latest#password-based-authentication) (make sure to follow Password-based authentication)

After the service principle is created, follow [Assign an Azure Key Vault access policy (CLI)](https://docs.microsoft.com/en-us/azure/key-vault/general/assign-access-policy?tabs=azure-portal#assign-an-access-policy) to create an access policy for the service principle (_recommend to use 'Secret Management' template as shown on the official guide_).

Your output may look like below. All you need for DDHub Client GW are:

* `clientId`
* `clientSecret`
* `tenantId`
* `Vault URI` (on your Key Vaults resource overview page)

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
