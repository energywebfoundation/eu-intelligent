# Deploy the Client Gateway

{% hint style="info" %}
This demonstration is based on a locally-hosted HashiCorp Key Vault. Hence, it is one of the demo services in the docker-compose file being used.
{% endhint %}

{% stepper %}
{% step %}
#### Clone the [ddhub-client-gateway](https://github.com/energywebfoundation/ddhub-client-gateway) GIT repository and change the working directory to `/get-started`

```sh
git clone https://github.com/energywebfoundation/ddhub-client-gateway.git && cd ddhub-client-gateway/get-started
```
{% endstep %}

{% step %}
#### Start the `ddhub-client-gateway` stack

The method of completing this depends on which of the three key vault services is being used:

{% tabs %}
{% tab title="Azure Key Vault" %}
Run the `docker compose up` command.

Replace the `AZURE_*` environment variables below with actual `azure access credentials` for accessing the Azure Key Vault obtained from [Azure Key Vault access credentials](../../preparing-to-set-up-a-client-gateway/obtaining-key-vault-access-credentials/azure-key-vault-access-credentials.md).&#x20;

Then run the command:

```sh
AZURE_VAULT_URL=key_vault_url AZURE_CLIENT_ID=client_id AZURE_CLIENT_SECRET=client_secret AZURE_TENANT_ID=tenant_id SECRETS_ENGINE=azure docker compose up
```
{% endtab %}

{% tab title="AWS Secrets Manager" %}
Run the `docker compose up` command.

Replace the `AWS_*` environment variables below with actual `azure access credentials` for accessing the Azure Key Vault obtained from [AWS Secrets manager access credentials](../../preparing-to-set-up-a-client-gateway/obtaining-key-vault-access-credentials/aws-secrets-manager-access-credentials.md).&#x20;

Then run the command:

```sh
AWS_REGION=aws_region AWS_ACCESS_KEY_ID=aws_access_key_id AWS_SECRET_ACCESS_KEY=aws_secret_access_key SECRETS_ENGINE=aws docker compose up
```
{% endtab %}

{% tab title="HashiCorp Vault" %}
{% hint style="info" %}
The docker compose file for Hashicorp Vault secret engine (1) initializes the vault, (2) auto-unseals it, and (3) passes the `vault_token` to the DDHub service.

\
Optionally, more details on what can be done manually are available here:\
[Scenario-2: Deploy new HashiCorp vault service and obtain token - run a single container](../../preparing-to-set-up-a-client-gateway/obtaining-key-vault-access-credentials/hashicorp-key-vault-access-token.md#scenario-2-deploy-new-hashicorp-vault-service-and-obtain-token-run-a-single-container)
{% endhint %}

```sh
docker compose -f ./docker-compose.vault.yml up
```
{% endtab %}
{% endtabs %}
{% endstep %}
{% endstepper %}
