# Obtaining key vault access credentials

The following describes how to obtain access credentials for Azure Key Vault, AWS Secrets Manager, and HashiCorp Key Vault. It comprises the following:

1. [Secret engine accessibility check](./#secret-engine-accessibility-check)
2. [Environment variables](./#environment-variables)
3. [Azure Key Vault access credentials](azure-key-vault-access-credentials.md)
4. [AWS Secrets Manager access credentials](aws-secrets-manager-access-credentials.md)
5. [HashiCorp Key Vault access token](hashicorp-key-vault-access-token.md)

## Secret engine accessibility check

In most cases, the secret engine will be on a private network. Please ensure that the Client GW can access the secret engine if they are not in the same network.

## Environment Variables

Below is the complete list of environment variables to enable secrets engine in DDHub Client GW. Only one of its kind is needed depending on the vault of choice.

### Common Environment Variables

<table><thead><tr><th width="172.76171875">Key</th><th width="80.01171875">Type</th><th width="105.859375">Default</th><th width="96.90625">Values</th><th width="233.2421875">Description</th><th>Dependency</th></tr></thead><tbody><tr><td>SECRETS_ENGINE</td><td>String</td><td>vault</td><td><p>vault</p><p>aws</p><p>azure</p></td><td>Key Vault to be used to store secrets</td><td>None</td></tr><tr><td>SECRET_PREFIX</td><td>String</td><td>ddhub/</td><td><br></td><td>Prefix to identify DDHub secrets from other secrets</td><td>None</td></tr></tbody></table>

### HashiCorp Environment Variables

{% hint style="info" %}
If `SECRETS_ENGINE` value above is `vault`, use the following environment variables.
{% endhint %}

<table><thead><tr><th width="172.0234375">Key</th><th width="82.515625">Type</th><th width="270.0390625">Description</th><th width="230.08203125">Dependency</th></tr></thead><tbody><tr><td>VAULT_ENDPOINT</td><td>String</td><td>URL of the key vault service</td><td>SECRETS_ENGINE = vault</td></tr><tr><td>VAULT_TOKEN</td><td>String</td><td>Auth Token to be able to access endpoints of the key vault service</td><td>SECRETS_ENGINE = vault</td></tr></tbody></table>

### Azure Key Vault Environment Variables

{% hint style="info" %}
If `SECRETS_ENGINE` value above is `azure`, use the following environment variables.
{% endhint %}

<table><thead><tr><th width="218.98828125">Key</th><th width="93.21484375">Type</th><th width="311.2109375">Description</th><th width="237.359375">Dependency</th></tr></thead><tbody><tr><td>AZURE_VAULT_URL</td><td>String</td><td>Vault URI for the Azure key vault resource</td><td>SECRETS_ENGINE = azure</td></tr><tr><td>AZURE_CLIENT_ID</td><td><br>String</td><td>Client ID for Azure Service Principal with access to the key vault resource</td><td>SECRETS_ENGINE = azure</td></tr><tr><td>AZURE_CLIENT_SECRET</td><td>String<br></td><td>Client Secret key for Azure Service Principal with access to the key vault resource</td><td>SECRETS_ENGINE = azure</td></tr><tr><td>AZURE_TENANT_ID</td><td>String<br></td><td>Tenant ID for Azure Service Principal </td><td>SECRETS_ENGINE = azure</td></tr></tbody></table>

### AWS Key Manager Environment Variables

{% hint style="info" %}
If `SECRETS_ENGINE` value above is `aws`, use the following environment variables.
{% endhint %}

<table><thead><tr><th width="219.09765625">Key</th><th width="92.8828125">Type</th><th width="311.12890625">Description</th><th width="218.16796875">Dependency</th></tr></thead><tbody><tr><td>AWS_REGION</td><td>String</td><td>Region for AWS Secrets Manager resource</td><td>SECRETS_ENGINE = aws</td></tr><tr><td>AWS_ACCESS_KEY_ID</td><td>String</td><td>Access Key ID of IAM user with access to the secret manager</td><td>SECRETS_ENGINE = aws</td></tr><tr><td>AWS_SECRET_ACCESS_KEY</td><td>String</td><td>Secret Access Key of IAM user with access to the secret manager</td><td>SECRETS_ENGINE = aws</td></tr></tbody></table>
