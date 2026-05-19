# Acquiring an enterprise user role

{% hint style="warning" %}
Before continuing with this section, please ensure that an [EWC Account](../creating-and-funding-an-ewc-account.md) has been prepared and that it has enough [EWT to fund](../creating-and-funding-an-ewc-account.md#funding-an-ewc-account) the on-chain transactions.
{% endhint %}

It is important to identify in advance which roles are actually required when setting-up the DDHub Client GW.

<figure><img src="../../../../../../../.gitbook/assets/image (229).png" alt="" width="563"><figcaption><p>Enterprise User Role Categories</p></figcaption></figure>

There will be two (2) enterprise user role categories to keep in mind:

1. DDHub Message Broker Role
2. Application-level Enterprise User Role

## DDHub Message Broker Role

In order to gain basic access to the DDHub Message Broker, the following roles are needed:

* `user.roles.mb.apps.ddhub.energyweb.auth.ewc` - basic role requirement in order to gain access to the message broker
* `topiccreator.roles.mb.apps.ddhub.energyweb.auth.ewc` - _<mark style="color:purple;">optional</mark>_ role in order to gain write access to the topic management APIs of the message broker

## Application-level Enterprise User Role

{% hint style="info" %}
The enterprise user must acquire first the DDHub Message Broker role for these application-level enterprise user roles to take effect in the Digital Spine ecosystem.
{% endhint %}

Application-level enterprise user roles are necessary to gain access to the data schemas of the target applications or projects. These roles must be identified in advance and must be created by the application or project owner/s.

Please refer to [ENS in Digital Spine Ecosystem](../../../../energy-web-name-service-ens/ens-in-digital-spine-ecosystem.md#enterprise-namespaces) for more details on the creation of these roles.

## Acquiring enterprise user roles

To acquire enterprise user roles, there are two (2) options available:

1. [Request via DDHub Client GW UI using the Role Management module](request-role-using-ddhub-client-gateway-ui.md)
2. [Request via Switchboard](request-role-using-switchboard.md)

{% hint style="success" %}
For DDHub Message Broker `user` role, the DDHub Client GW Admin can request it right [after setting-up the private key](request-user-role-after-setting-up-the-private-key.md) using the DDHub Client GW UI.
{% endhint %}
