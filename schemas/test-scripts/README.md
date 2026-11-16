# Example file

This folder contains test scripts to send/receive messages on the Energy Web Digital Spine (EWDS) using the EWDS Client Gateway APIs.

It reads a JSON payload from a local file, publishes it to a specific topic channel (e.g. `assetmeasurement.pub`), and then polls a subscription channel (e.g. `assetmeasurement.sub`) to retrieve any new messages.
