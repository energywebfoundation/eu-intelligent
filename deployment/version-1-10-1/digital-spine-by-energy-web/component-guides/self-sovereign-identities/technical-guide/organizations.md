# Organizations

## Overview

Organizations are the root object in the hierarchy of the Digital Spine IAM solution. They are administrators that govern the creation and management of [Applications ](applications.md)and [Roles](roles-and-iam.md), and by extension Topics and Channels - all of these objects are nested under the Organization object.

Organizations are identified by a namespace using the pattern `organization.iam.ewc`.

### Hierarchy Diagram (placeholder)

<figure><img src="../../../../../.gitbook/assets/image (1) (1) (1) (1).png" alt=""><figcaption></figcaption></figure>

***



## User Guide

### Pre-requisites

* User logged into Switchboard

#### Create an Organization

{% hint style="info" %}
The “Create Organization” button allows creating only one organization per a wallet. After using, the button is hidden from UI.
{% endhint %}

1. In the home page, click on the `Governance` menu

<figure><img src="../../../../../.gitbook/assets/Screenshot 2025-06-12 at 11.27.47 AM.png" alt=""><figcaption><p>Governance menu</p></figcaption></figure>

2. Click on `Create Organization` button

<figure><img src="../../../../../.gitbook/assets/Screenshot 2025-06-12 at 11.29.24 AM.png" alt=""><figcaption><p>Create organization button</p></figcaption></figure>

3. Fill in the form and submit the request

<figure><img src="../../../../../.gitbook/assets/image (250).png" alt=""><figcaption><p>Create organization form</p></figcaption></figure>

#### Modify an Organization

1. In the Organization Management page, click on the action button right next to the organization that you want to edit

<figure><img src="../../../../../.gitbook/assets/Screenshot 2025-06-12 at 11.55.18 AM.png" alt=""><figcaption><p>Edit organization</p></figcaption></figure>

2. Update organization and scroll down to click `Next` and confirm your changes

<figure><img src="../../../../../.gitbook/assets/Screenshot 2025-06-12 at 11.59.14 AM.png" alt="" width="375"><figcaption><p>Update organization</p></figcaption></figure>

3. Confirm the details and click `Next`

<figure><img src="../../../../../.gitbook/assets/Screenshot 2025-06-12 at 12.04.35 PM.png" alt="" width="375"><figcaption><p>Confirm details</p></figcaption></figure>

4. Organization updated

#### Remove an Organization

1. In the Organization Management page, click on the action button right next to the organization that you want to delete

<figure><img src="../../../../../.gitbook/assets/Screenshot 2025-06-12 at 12.06.34 PM.png" alt=""><figcaption><p>Delete organization</p></figcaption></figure>

***

#### Organization options

Assume that you already own an organization, on the Organization management tab you can perform several options related to your organization and its EWNS namespace, each using the options under the three vertical dots button (next to an organization namespace in the list).

<table data-header-hidden><thead><tr><th width="139.99609375">Symbol</th><th width="187.3359375">Name</th><th>Description</th></tr></thead><tbody><tr><td><strong>Symbol</strong></td><td><strong>Name</strong></td><td><strong>Description</strong></td></tr><tr><td><div><figure><img src="../../../../../.gitbook/assets/image (251).png" alt=""><figcaption></figcaption></figure></div></td><td>View Details</td><td>View the basic details of your organization, including the logo, namespace, organization name, website, description, and other data.</td></tr><tr><td><div><figure><img src="../../../../../.gitbook/assets/image (252).png" alt=""><figcaption></figcaption></figure></div></td><td>Create Sub-Organization</td><td>Create a new sub-organization owned by the organization. This allows you to define applications and roles for specific subsidiaries or business units within your organizational umbrella. For example, you might create “subsidiary1.exampleco.iam.ewc” and “subsidiary2.exampleco.iam.ewc” so that you can define applications and roles specific to those subsidiaries (as described in the following sections of this document).</td></tr><tr><td><div><figure><img src="../../../../../.gitbook/assets/image (253).png" alt=""><figcaption></figcaption></figure></div></td><td>View Applications</td><td>View the applications owned by this organization (i.e., go to <em>application management</em> tab).</td></tr><tr><td><div><figure><img src="../../../../../.gitbook/assets/image (254).png" alt=""><figcaption></figcaption></figure></div></td><td>View Roles</td><td><p>View the roles associated with this organization or with any application owned by this organization (i.e., go to <em>role governance</em> tab).</p><p>Note that that are two kinds of roles:</p><ol start="1"><li>Roles associated with an organization - these roles are independent of any particular application. For example, you might create the role “global dApp admin” to manage all of your organization’s applications.</li><li>Roles associated with an application - these roles are specific to a particular application. For example, you might create the role “installer” or “renewable energy buyer” in an application that you own. These roles are not necessarily part of your organization.</li></ol></td></tr><tr><td><div><figure><img src="../../../../../.gitbook/assets/image (255).png" alt=""><figcaption></figcaption></figure></div></td><td>Create Application</td><td>Create a new application owned by the organization.</td></tr><tr><td><div><figure><img src="../../../../../.gitbook/assets/image (256).png" alt=""><figcaption></figcaption></figure></div></td><td>Create Role</td><td>Create a new role associated with either this organization or a specific application owned by this organization.</td></tr><tr><td><div><figure><img src="../../../../../.gitbook/assets/image (257).png" alt=""><figcaption></figcaption></figure></div></td><td>Edit</td><td><p>Change the details of your organization. Please note that <strong>it is not possible to </strong><em><strong>change</strong></em><strong> the root namespace of an organization</strong>. For example, after you have defined “<code>exampleco.iam.ewc</code>" as your namespace, you could define subdomains (e.g., "<code>roles.exampleco.iam.ewc</code>" or "<code>applications.exampleco.iam.ewc</code>"), or you could define a new root namespace (e.g., "<code>exampleorg.iam.ewc</code>"), but you are not able to change the root namespace "<code>exampleco.iam.ewc</code>" into something different.</p><p>The “others (JSON)” field allows you to specify formatting-related details (e.g., color scheme) that should be applied, so that when you integrate the system into your decentralized applications the branding is consistent. For example, you could add into this field the text:</p><p><code>{"bgcolor":"CDD3FF","txtcolor":"FF0000"}</code></p><p>The above text will set the background color for the system in your application to be the light blue color with hex code <code>CDD3FF</code> and the text color to be red with hex code <code>FF0000</code>. You can experiment with different formatting options.</p></td></tr><tr><td><div><figure><img src="../../../../../.gitbook/assets/image (258).png" alt=""><figcaption></figcaption></figure></div></td><td>Transfer Ownership</td><td>Transfer ownership of your organization and its root namespace to another address.</td></tr><tr><td><div><figure><img src="../../../../../.gitbook/assets/image (259).png" alt=""><figcaption></figcaption></figure></div></td><td>Delete</td><td>Delete your organization.</td></tr></tbody></table>
