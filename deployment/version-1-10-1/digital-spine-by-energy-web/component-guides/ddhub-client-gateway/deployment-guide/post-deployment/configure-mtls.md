# Configure mTLS

mTLS is required in establishing a connection with EWF-hosted Digital Spine Message Broker. An error like below may be encountered when accessing the DDHub Client GW.

<figure><img src="../../../../../../.gitbook/assets/image (227).png" alt=""><figcaption></figcaption></figure>

The mTLS certificate needs to be requested from EWF. Ideally, the participant will provide a CSR file then EWF creates the client certificate.

Once the certificate is obtained, confirm that your outbound IP is whitelisted by EWF.

Then, configure the certificate using the endpoint '/api/v2/certificate' on the `http://localhost:3009/docs` page.

('caCertificate' is not needed when the other 2 fields are provided), a status 201/200 will be returned.

<figure><img src="../../../../../../.gitbook/assets/image (23) (1).png" alt=""><figcaption></figcaption></figure>
