# HashiCorp Key Vault access token

Please check below scenarios and choose the one suits your user case.

## Scenario-1: Existing Hashicorp vault service <a href="#scenario-1-existing-hashicorp-vault-service" id="scenario-1-existing-hashicorp-vault-service"></a>

1. `token` for accessing the existing vault service. Please contact your vault admin for access token.
2. `vault service address` of the existing vault service
3. Complete \`ddhub\` secret engine creation. You can follow [**How to create ddhub secret engine**](hashicorp-key-vault-access-token.md#how-to-create-ddhub-secret-engine) step below to do that.

## Scenario-2: Deploy new HashiCorp vault service and obtain token - run a single container <a href="#scenario-2-deploy-new-hashicorp-vault-service-and-obtain-token-run-a-single-container" id="scenario-2-deploy-new-hashicorp-vault-service-and-obtain-token-run-a-single-container"></a>

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
6. Complete \`ddhub\` secret engine creation. You can follow [**How to create ddhub secret engine**](hashicorp-key-vault-access-token.md#how-to-create-ddhub-secret-engine) step below to do that.

## Scenario-3: Deploy new HashiCorp vault service and obtain token - Kubernetes <a href="#scenario-3-deploy-new-hashicorp-vault-service-and-obtain-token-kubernetes" id="scenario-3-deploy-new-hashicorp-vault-service-and-obtain-token-kubernetes"></a>

Please follow the steps below:

1. Follow [Helm chart | Vault | HashiCorp Developer](https://www.vaultproject.io/docs/platform/k8s/helm#using-the-helm-chart) to deploy a HashiCorp vault service in kubernetes.
2. Once your vault service is up and running, on a web browser, enter `http(s)://YOUR_VAULT_ADDRESS/ui` in the address bar. Follow [https://learn.hashicorp.com/tutorials/vault/getting-started-ui?in=vault/getting-started#start-web-ui](https://learn.hashicorp.com/tutorials/vault/getting-started-ui?in=vault/getting-started#start-web-ui) starting from step 5. Then, you should have the `root_token`. The `vault server address` is [http://YOUR\_VAULT\_ADDRESS](http://your_vault_address/)
3. Complete \`ddhub\` secret engine creation. You can follow [**How to create ddhub secret engine**](hashicorp-key-vault-access-token.md#how-to-create-ddhub-secret-engine) step below to do that.

## Creating the `ddhub` secret engine <a href="#how-to-create-ddhub-secret-engine" id="how-to-create-ddhub-secret-engine"></a>

`ddhub` secret engine name needs to align with the value for \`SECRET\_PREFIX\`

There are two options in creating the secret engine:

1. [Creating from CLI Command](hashicorp-key-vault-access-token.md#creating-the-ddhub-secret-engine-from-cli-command)
2. [Creating from UI](hashicorp-key-vault-access-token.md#creating-the-ddhub-secret-engine-from-ui)

### **Creating the `ddhub` secret engine from CLI command**&#x20;

Use the following CLI command to create the `ddhub` secret engine:

`vault secrets enable -version=1 -path=ddhub -address="http://127.0.0.1:8200" kv`

### **Creating the `ddhub` secret engine from UI**&#x20;

Below guide is based on vault UI which is accessible at local port 8200. Please follow your vault service’s UI address.

1\. Visit the vault service UI at [http://localhost:8200](http://localhost:8200/). Key in your token and below screen will be displayed.

<figure><img src="../../../../../../../.gitbook/assets/image (24) (1).png" alt=""><figcaption></figcaption></figure>

2\. Click on `Enable new engine` button and select `KV` from the list of generic secrets engine options.

<figure><img src="../../../../../../../.gitbook/assets/image (25) (1).png" alt=""><figcaption></figcaption></figure>

3\. Click on `Next` button. Put `ddhub` as value on _Path_ field and expand the method options, select _Version_ `1`.

<figure><img src="../../../../../../../.gitbook/assets/image (26) (1).png" alt=""><figcaption></figcaption></figure>

4\. Scroll down and click on `Enable the engine` button. Finally, on the secret page, the new `ddhub` secret engine is created and listed as illustrated below.

<figure><img src="../../../../../../../.gitbook/assets/image (27) (1).png" alt=""><figcaption></figcaption></figure>

### HashiCorp References <a href="#hashicorp-references" id="hashicorp-references"></a>

* [Concepts | Vault | HashiCorp Developer](https://www.vaultproject.io/docs/concepts)
* [Vault foundations | Vault | HashiCorp Developer](https://learn.hashicorp.com/collections/vault/getting-started)
* [Seal/Unseal | Vault | HashiCorp Developer](https://www.vaultproject.io/docs/concepts/seal)
