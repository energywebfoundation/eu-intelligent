# Deploy the Client Gateway

The information below assumes, as an example, that the user has selected the Azure Kubernetes service.

{% hint style="success" %}
The Helm repository is available at:<br>

[https://ewfcontainerregistry.azurecr.io/helm/v1/repo](https://ewfcontainerregistry.azurecr.io/helm/v1/repo)
{% endhint %}

{% stepper %}
{% step %}
#### Helm chart

The source code for the helm chart repo is located at (_make sure the version is 'v1.3.0-ewc'_)

```
https://github.com/energywebfoundation/ddhub-client-gateway-helm/tree/v.1.3.0-ewc
```

Helm chart is available at

```
oci://ewfcontainerregistry.azurecr.io/helm/ddhub-client-gateway-api
```

{% hint style="info" %}
For h[elm chart with ewc chain default values, only '1.3.0-ewc' is available.](#user-content-fn-1)[^1]
{% endhint %}
{% endstep %}

{% step %}
#### Create a namespace in the cluster

As an example, you might select `ddhub-demo` as the namespace in the cluster for this release. This namespace will be used throughout this document.

```sh
kubectl create namespace ddhub-demo
```
{% endstep %}

{% step %}
#### Create a Kubernetes secret

Depending on your secret engine choice, please run below command to create a secret, **Replace the placeholder with your values or set them in your terminal environment.**

{% hint style="info" %}
Make sure the secret name matches the ‘nameOverride' in your helm `overwrite-values.yaml`, '-secret' is expected suffix.
{% endhint %}

{% tabs %}
{% tab title="AWS Secrets Manager" %}
**AWS Secrets Manager - Secret Creation Command**

```sh
/kubectl create secret generic ddhub-client-gateway-demo-secret --from-literal=AWS_REGION=$AWS_REGION --from-literal=AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID --from-literal=AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY --from-literal=DB_NAME=$DB_NAME -n $namespace
```
{% endtab %}

{% tab title="Azure Key Vault" %}
**Azure Key Vault - Secret Creation Command**

```sh
kubectl create secret generic ddhub-client-gateway-demo-secret --from-literal=AZURE_VAULT_URL=$AZURE_VAULT_URL --from-literal=AZURE_CLIENT_ID=$AZURE_CLIENT_ID --from-literal=AZURE_CLIENT_SECRET=$AZURE_CLIENT_SECRET --from-literal=AZURE_TENANT_ID=$AZURE_TENANT_ID --from-literal=DB_NAME=$DB_NAME -n $namespace
```
{% endtab %}

{% tab title="HashiCorp Vault Engine" %}
**HashiCorp Vault Engine - Secret Creation Command**

```sh
kubectl create secret generic ddhub-client-gateway-demo-secret --from-literal=VAULT_TOKEN=$VAULT_TOKEN --from-literal=DB_NAME=$DB_NAME -n $namespace
```
{% endtab %}
{% endtabs %}
{% endstep %}

{% step %}
#### Overwrite default helm values

Before running the installation command, please overwrite some default helm values accordingly.

In order to do so, create `overwrite-values.yaml` file. Copy and paste below snippet in to `overwrite-values.yaml`.

{% hint style="info" %}
Please refer to [GitHub - energywebfoundation/ddhub-client-gateway-helm](https://github.com/energywebfoundation/ddhub-client-gateway-helm) for more helm chart values
{% endhint %}

{% code lineNumbers="true" %}
```
clientgateway:
  config:
    websocket: NONE # Options: SERVER, CLIENT, NONE
    secret_engine: vault
    secret_engine_endpoint: http://demo-vault.ddhub-demo.svc:8200
    mtls_enabled: true
    dsb_base_url: https://ddhub-ewc.energyweb.org
    parent_namespace: dsmb.apps.ddhub.energyweb.auth.ewc
  scheduler:
    enabled: true
    image:
      tag: intelligent-canary
    appConfig:
      USER_AUTH_ENABLED: "false"
      FETCH_MESSAGES_CRON_ENABLED: "true"
      CLEANUP_MESSAGES_CRON_ENABLED: "true"
      FETCH_MESSAGES_CRON_SCHEDULE: "* * * * *"
      CLEANUP_MESSAGES_CRON_SCHEDULE: "*/15 * * * *"
  ui:
    image:
      tag: intelligent-canary
    
image:
  tag: intelligent-canary
    
nameOverride: "ddhub-client-gateway-demo"
fullnameOverride: "ddhub-client-gateway-demo"
  
ingress:
  enabled: true
  annotations:
      kubernetes.io/ingress.class: azure/application-gateway
      appgw.ingress.kubernetes.io/ssl-redirect: "true"
  hosts:
    - host: ddhub-gateway-demo.YOURS.org
      paths:
      - path: /docs
        pathType: Prefix
        backend:
          serviceName: ddhub-client-gateway-demo
          servicePort: 80
      - path: /api
        pathType: Prefix
        backend:
          serviceName: ddhub-client-gateway-demo
          servicePort: 80
      - path: /docs-json
        pathType: Prefix
        backend:
          serviceName: ddhub-client-gateway-demo
          servicePort: 80
      - path: /events
        pathType: Prefix
        backend:
          serviceName: ddhub-client-gateway-demo
          servicePort: 80
      - path: /
        pathType: Prefix
        backend:
          serviceName: ddhub-client-gateway-demo-ui
          servicePort: 80
  tls:
    - secretName: your-tls-secret
      hosts:
        - ddhub-gateway-demo.YOURS.org
```
{% endcode %}

{% hint style="warning" %}
Before changing other values below, please note that, on line 32 in the sample above, `azure/application-gateway` is chosen `ingress.class`. This can be any equivalent ingress controller class (example: alb); simply update the ingress annotation accordingly.

If you want to run websocket mode, change Line 3 to \[`SERVER` | `CLIENT`] [read more](https://github.com/energywebfoundation/ddhub-client-gateway-helm/blob/v1.3.0/values.yaml#L12-L16)
{% endhint %}



Change the values as described below:

* Line 4 (`secret_engine`) - Update to the secret engine of choice: \[`vault` | `aws` | `azure`]
* Line 5 (`secret_engine_endpoint`)- If secret of choice is `vault`, update this value to your `vault server address`. Otherwise, skip this.
* Line 13, the extra environment variables you can set for the API and Scheduler containers. \`FETCH\_MESSAGES\_CRON\_ENABLED\` needs to be true _(The appConfig will be merged with app’s Secret)_
* Line 35(`host`) and 59 - Replace these values with the hostname you have for this application.
* Line 63 - _(Optional for this demo)_ Create a [TLS secret](https://kubernetes.io/docs/concepts/configuration/secret/#tls-secrets) in the `ddhub-demo` namespace and replace this with the TLS secret name.
{% endstep %}

{% step %}
#### Install ddhub-client-gateway (based on gateway helm chart version 1.3.0)

After updating `overwrite-values.yaml`, simply run the below command at the same directory where the yaml file is located.

{% code overflow="wrap" %}
```sh
helm install ddhub-gateway-demo -f ./overwrite-values.yaml oci://ewfcontainerregistry.azurecr.io/helm/ddhub-client-gateway-api --version 1.3.0-ewc -n ddhub-demo
```
{% endcode %}

After executing the command, please check the deployed pods by running the command below.

```sh
kubectl get all -n ddhub-demo
```

<figure><img src="../../../../../../../.gitbook/assets/image (18) (1).png" alt=""><figcaption><p>Sample result from above command</p></figcaption></figure>
{% endstep %}

{% step %}
#### Configure Ingress (IP) address on the DNS provider

Run the below command to get the ingress (IP) address and set it accordingly on your DNS provider.

```sh
kubectl get ingress -n ddhub-demo
```

<figure><img src="../../../../../../../.gitbook/assets/image (21) (1).png" alt=""><figcaption><p>Sample result from above command</p></figcaption></figure>
{% endstep %}
{% endstepper %}

[^1]: 
