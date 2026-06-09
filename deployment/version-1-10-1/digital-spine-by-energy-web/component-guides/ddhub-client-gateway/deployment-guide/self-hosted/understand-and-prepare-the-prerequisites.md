# Understand and prepare the prerequisites

The following prerequisites are required to successfully deploy a client gateway:

1. [A Postgres database](understand-and-prepare-the-prerequisites.md#a-kubernetes-cluster-containing-a-postgres-database)
2. [A key vault service](understand-and-prepare-the-prerequisites.md#a-key-vault-service)

[Familiarity with Helm CLI installation](understand-and-prepare-the-prerequisites.md#familiarity-with-helm-installation) is also required when opting to [deploy with Kubernetes](deploy-with-kubernetes/).

For [deployment with Docker](deploy-with-docker/), a machine with below items installed is required:

1. GIT CLI - please refer to the official [guide](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) for installation
2. Docker - please refer the official [guide](https://docs.docker.com/get-started/#download-and-install-docker) for installation

## A Postgres database <a href="#a-kubernetes-cluster-containing-a-postgres-database" id="a-kubernetes-cluster-containing-a-postgres-database"></a>

{% hint style="info" %}
For deployment with Kubernetes, a Kubernetes cluster containing a Posgres database may be required.
{% endhint %}

A postgres database and user (with **read and write** access) credentials are required. They are crucial environment variables for the client gateway application.

The postgres database connection string is required. It may look like something like:

> _postgresql://USER:PASSWORD@POSTGRES\_HOST:5432/DATABASE\_NAME_

If you need help with deploy a self-hosted postgres server, please refer to the [Postgres deployment guide](../preparing-to-set-up-a-client-gateway/deploying-the-postgresql-database/).

{% hint style="info" %}
If you opt out using the postgres in the guide’s docker-compose file, you can remove the '`postgres`' service and update the places depending on it.

Also replace other services' environment variable '**DB\_NAME**' with your own postgres db connection string.
{% endhint %}

## A key vault service <a href="#a-key-vault-service" id="a-key-vault-service"></a>

The key vault service could be any one of the following options.

* [Azure Key Vault](https://learn.microsoft.com/en-us/azure/key-vault/general/basic-concepts)
* [AWS Secrets Manager](https://aws.amazon.com/secrets-manager/)
* [Vault secrets engine](https://developer.hashicorp.com/vault/tutorials/getting-started/getting-started-intro?in=vault%2Fgetting-started)

Whichever option is chosen, please see further guidance on [how to obtain key vault access credentials](../preparing-to-set-up-a-client-gateway/obtaining-key-vault-access-credentials/) for your chosen service.

Please use the values in the appropriate table below (click to expand) to [configure the environment variables](../preparing-to-set-up-a-client-gateway/obtaining-key-vault-access-credentials/#environment-variables).

<details>

<summary>Azure Key Vault</summary>

<table><thead><tr><th width="220.4453125">Key</th><th width="85.6875">Type</th><th width="106.9453125">Required</th><th>Value</th></tr></thead><tbody><tr><td>SECRETS_ENGINE</td><td>String</td><td>true</td><td>azure</td></tr><tr><td>SECRET_PREFIX</td><td>String</td><td>false</td><td>ddhub/</td></tr><tr><td>AZURE_VAULT_URL</td><td>String</td><td>true</td><td>the key vault url, e.g. <code>https://&#x3C;VAULT NAME>.vault.azure.net</code></td></tr><tr><td>AZURE_CLIENT_ID</td><td>String</td><td>true</td><td>‘clientId’ of the service principle</td></tr><tr><td>AZURE_CLIENT_SECRET</td><td>String</td><td>true</td><td>'clientSecret' of the service principle</td></tr><tr><td>AZURE_TENANT_ID</td><td>String</td><td>true</td><td>'tenantId' of the service principle</td></tr></tbody></table>

</details>

<details>

<summary>AWS Secrets Manager</summary>

<table><thead><tr><th width="243.00390625">Key</th><th width="83.9921875">Type</th><th width="108.23828125">Required</th><th>Value</th></tr></thead><tbody><tr><td>SECRETS_ENGINE</td><td>String</td><td>true</td><td>aws</td></tr><tr><td>SECRET_PREFIX</td><td>String</td><td>false</td><td>ddhub/</td></tr><tr><td>AWS_REGION</td><td>String</td><td>true</td><td>ap-southeast-2 (recommended)</td></tr><tr><td>AWS_ACCESS_KEY_ID</td><td>String</td><td>true</td><td>user’s access key id</td></tr><tr><td>AWS_SECRET_ACCESS_KEY</td><td>String</td><td>true</td><td>user’s secret access key</td></tr></tbody></table>

</details>

<details>

<summary>Vault Secrets Engine</summary>

<table><thead><tr><th width="180.73828125">Key</th><th width="96.3359375">Type</th><th width="119.21875">Required</th><th>Value</th></tr></thead><tbody><tr><td>SECRETS_ENGINE</td><td>String</td><td>true</td><td>vault</td></tr><tr><td>SECRET_PREFIX</td><td>String</td><td>false</td><td>ddhub/</td></tr><tr><td>VAULT_ENDPOINT</td><td>String</td><td>true</td><td>vault server address</td></tr><tr><td>VAULT_TOKEN</td><td>String</td><td>true</td><td>vault server access token</td></tr></tbody></table>

</details>

## Familiarity with Helm installation <a href="#familiarity-with-helm-installation" id="familiarity-with-helm-installation"></a>

Please refer to [Helm’s guide to installing the Helm CLI](https://helm.sh/docs/intro/install/) and [prerequisites](https://helm.sh/docs/intro/quickstart/#prerequisites).
