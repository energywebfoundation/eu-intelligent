# Request role using Switchboard

{% hint style="warning" %}
Before continuing with this section, please ensure that an [EWC Account](../creating-and-funding-an-ewc-account.md) has been prepared and that it has enough [EWT to fund](../creating-and-funding-an-ewc-account.md#funding-an-ewc-account) the on-chain transactions.
{% endhint %}

To acquire the application-level enterprise user roles, simply visit the [Switchboard](https://switchboard.energyweb.org/) web dApp and follow below steps:

1.  Connect your EWC Account using [Metamask](https://metamask.io/)

    <figure><img src="https://lh7-rt.googleusercontent.com/docsz/AD_4nXeg_zebR2slJ2JXZ1tzPg4A5WEusjUuDjiZU6UcCwP3iGDHTigTp-vkKsZ6cHfibJrUHF7Gucm9Vd57cCSVGypku_bcAlMvU0nrDT8hBfX82VZUYiekRtn1xzdfopy5QJ5-0OzN?key=mGFbmWWG1dkMmk1SuvbdKA" alt=""><figcaption></figcaption></figure>


2.  Confirm the sign-in request

    <figure><img src="https://lh7-rt.googleusercontent.com/docsz/AD_4nXdzwYdvyB6L9oQ26qNH7DjIlE9S_LOZ1h8IUW6ryyOWxXnTnjJffZTEeRw52HkCX4PiOTJrQBb6QtiV-A5J8n20xkPtYAz2jSGHRB-inif_5CzD3QUdng_e10svEMMISdycUrFJ?key=mGFbmWWG1dkMmk1SuvbdKA" alt=""><figcaption></figcaption></figure>


3.  Confirm the signature request

    <figure><img src="https://lh7-rt.googleusercontent.com/docsz/AD_4nXeYCZ0kayURtXKCITm2k5U3KwDLUHyD2-aVk5X6ZvLIkXKGjjwU0MNUkQD_f2KOnGLJ1XVyeP34EMC1HlHOoD-bkmjf6Oeocewv-DmO9Ive8EipaFTB5gnQOqbC2yeP2WsDKrSV?key=mGFbmWWG1dkMmk1SuvbdKA" alt=""><figcaption></figcaption></figure>


4.  The screen redirects to the dashboard where the DID of the enterprise user is displayed as highlighted in the red box

    <figure><img src="../../../../../../../.gitbook/assets/image (2) (1) (1).png" alt=""><figcaption></figcaption></figure>


5.  Search for the application namespace which contains the target role in the search bar provided. The search result will be displayed on a list. Click on the result item to view the application details including the list of available roles.\
    \
    :information\_source: :person\_tipping\_hand: \
    For this example, let's use the EW Digital Spine Message Broker application namespace (`dsmb.apps.ddhub.energyweb.auth.ewc`).\
    &#x20;&#x20;

    <figure><img src="../../../../../../../.gitbook/assets/image (3) (1) (1).png" alt=""><figcaption></figcaption></figure>


6.  The screen displays the application details including the list of available roles. Click on the "Enrol" icon as highlighted in the second screenshot below.\
    \
    :information\_source: :person\_tipping\_hand: \
    For this example, the EW Digital Spine Message Broker application has two available roles: `user` and `topiccreator`<br>

    <figure><img src="../../../../../../../.gitbook/assets/image (5) (1) (1).png" alt=""><figcaption></figcaption></figure>



    <figure><img src="../../../../../../../.gitbook/assets/image (6) (1) (1).png" alt=""><figcaption></figcaption></figure>


7.  The enrolment screen will be displayed. Input the target values to the enrolment fields provided. Then, click "Submit Request" button.

    <figure><img src="../../../../../../../.gitbook/assets/image (7) (1) (1).png" alt=""><figcaption></figcaption></figure>


8.  Confirm the requested transactions

    <figure><img src="../../../../../../../.gitbook/assets/image (8) (1) (1).png" alt=""><figcaption></figcaption></figure>



    <figure><img src="../../../../../../../.gitbook/assets/image (9) (1) (1).png" alt=""><figcaption></figcaption></figure>


9.  After successful confirmation of the enrolment request transactions, the screen redirects to "My Enrolments" page which shows the list of role requests together with their respective status.\
    \
    :information\_source: :person\_tipping\_hand: \
    Newly requested roles will have the <mark style="color:orange;">`Pending`</mark> status. This means that the role request is waiting for the approval from the verifiable credentials issuers who are typically the administrators of the application namespace.<br>

    <figure><img src="../../../../../../../.gitbook/assets/image (11) (1) (1).png" alt=""><figcaption></figcaption></figure>


10. Once the status has changed to <mark style="color:green;">`Approved`</mark>, the role is now ready to be published as a [VC](../../self-hosted/#self-sovereign-identities) in the DID Document of the enterprise user. Only the published VC is honoured in the Digital Spine ecosystem. To publish, simply click on the "Publish" icon as shown in the illustration below.<br>

    <figure><img src="../../../../../../../.gitbook/assets/image (12) (1) (1).png" alt=""><figcaption></figcaption></figure>


11. Confirm the action

    <figure><img src="../../../../../../../.gitbook/assets/image (13) (1) (1).png" alt=""><figcaption></figcaption></figure>


12. Confirm the transactions prompted in your wallet account

    <figure><img src="../../../../../../../.gitbook/assets/image (17) (1).png" alt=""><figcaption></figcaption></figure>


13. Once the transactions are confirmed, the "Publish" icon will disappear. This means that the VC has been published successfully.

    <figure><img src="../../../../../../../.gitbook/assets/image (16) (1) (1).png" alt=""><figcaption></figcaption></figure>
