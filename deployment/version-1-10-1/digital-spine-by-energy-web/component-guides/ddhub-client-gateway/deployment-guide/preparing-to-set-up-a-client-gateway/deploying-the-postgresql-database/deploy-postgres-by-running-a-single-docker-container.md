# Deploy Postgres by running a single Docker container

The following steps describe how to run the Postgres server in a Docker container.

In a terminal:&#x20;

{% stepper %}
{% step %}
Clone the git repository ddhub-client-gateway

```
git clone https://github.com/energywebfoundation/ddhub-client-gateway.git
```
{% endstep %}

{% step %}
Change the directory to the example directory

```
cd ddhub-client-gateway && cd get-started
```
{% endstep %}

{% step %}
Start the Postgres servicedocker compose up postgres

```
docker compose up postgres
```

The example Postgres will have the user `ddhub` with password `password123` and database `ddhub` created
{% endstep %}

{% step %}
Access the database via the connection string

`postgresql://ddhub:password123@localhost:5432/ddhub`
{% endstep %}
{% endstepper %}
