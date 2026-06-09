# Deploying the PostgreSQL database

There are multiple ways to deploy a Postgres database server. The following describes how to do so using either Docker containers or Helm charts.

Before starting the deployment, please be informed of the following:

* You can use your existing Postgres DB.
* It is recommended to use Postgres version 14 or above.
* The user must have read and write privileges to the dedicated database.

There are 2 recommended ways to deploy the Postgres DB

1. [Deploy Postgres by running a single Docker container](deploy-postgres-by-running-a-single-docker-container.md)
2. [Deploy Postgres using a Helm chart](deploy-postgres-using-a-helm-chart.md)
