# Preparing to set up a Client Gateway

Below describes the recommended steps to complete before deploying a Client GW.

1. Before deploying the Client GW, it is very important to be familiar with the [core concepts](../self-hosted/#core-concepts), terms, and [high level architecture](../../#architecture) of this component.
2. Ensure that there is a dedicated host environment ([cloud virtual machine or on-premise service](../self-hosted/#target-deployment-environment)) that can support the deployment via helm charts or docker compose. In addition, ensure that there is administrator-level access to the selected host environment for deployment purposes.
3. Obtain [mTLS certificate](../self-hosted/#mtls-certificate) from EWF (if this is enabled in the target environment)
4. Create an [EWC account](creating-and-funding-an-ewc-account.md) and [pump in](creating-and-funding-an-ewc-account.md#funding-an-ewc-account) at least 1 EWT in order to get started
5. [Acquire enterprise user roles](acquiring-an-enterprise-user-role/) for the EW Digital Spine Message Broker and respective target applications or projects
6. [Deploy the PostgreSQL database](deploying-the-postgresql-database/)
7. Configure the [secrets engine or key vault](obtaining-key-vault-access-credentials/)
8. Determine which individuals or systems within the organisation will send messages via the Client GW. Currently, a Client GW typically should be deployed and configured for either humans to send messages manually (using the Client GW UI) or systems to send messages automatically (using an API integration), but not both. Therefore, it is important to determine in advance which situation applies for your organisation’s deployment.
9. Evaluate access control. Once deployed, the Client GW by default will be accessible to anyone with access to the deployment environment, until an authentication mechanism for individual users (or APIs) has been configured. Organisations deploying a Client GW should consider implementing additional access control to reduce the risk of unauthorised use of the Client GW prior to the deployment of an authentication mechanism. Any proxy server with access control can be placed in front of the Client GW; one example is to implement access control at the DNS provider level that governs who is able to access the Client GW.
