# ENS in Digital Spine Ecosystem

## **Namespaces**

Namespaces are essentially a way to organize and manage resources in the EW Digital Spine platform like organizations, applications, and roles on the blockchain. They provide a structured approach to handle different aspects of the platform, often with a focus on improving user experience, simplifying interactions, and grouping different business contexts.

<figure><img src="https://lh7-rt.googleusercontent.com/docsz/AD_4nXczJinLvcBzmRKuQuac7XdvSfIDjd2DY9UcIyQ9itin-3YQlilrNbZLgSf1rADHiVJfu3uW0wxnWTEAFCLuoOWc2SvIN2A6ukl6uIJy2zwLdfm8URpp0Kb-yPre-EDnogbwVnOg?key=mGFbmWWG1dkMmk1SuvbdKA" alt="EW Digital Spine Namespace Heirarchy"><figcaption><p>EW Digital Spine Namespace Hierarchy</p></figcaption></figure>

There are mainly 3 levels of namespaces:

* Organization/Sub-Organization Namespace
* Application Namespace
* Role Namespace

The base namespace in the EW Digital Spine platform is `auth.ewc`. It must be in lowercase alphanumeric format and must not start with a number.

The organization namespace must represent an organization or a project. It prefixes the base namespace of the platform. The organization namespace format follows the following syntax where sub-organization sections are deemed optional.

`{suborgx}.{suborg1}.{suborg0}.{orgname}.auth.ewc`

The application namespace must represent an application or service under an organization or sub-organization. It prefixes the organization namespace and is separated by the `apps` identifier. Application namespaces will be used to group data schemas in the platform.

`{appname}.apps.{suborgn}.{suborg1}.{suborg0}.{orgname}.auth.ewc`

The role namespace represents the roles under an organization, sub-organization, or application context. It is separated by the `roles` identifier.

**Organization Role Namespace Syntax**\
`{rolename}.roles.{suborgn}.{suborg1}.{suborg0}.{orgname}.auth.ewc`

**Application Role Namespace Syntax**\
`{rolename}.roles.{appname}.apps.{suborgn}.{suborg1}.{suborg0}.{orgname}.auth.ewc`

The roles under the application namespace are the most important within the EW Digital Spine ecosystem. They will be needed in acquiring access to the message broker and also to the application-level data schemas called topics.

It is best that these namespaces are known and are configured in advance before deploying the Client GW.

The creation of these namespaces are described in [Self-Sovereign Identities | Technical Guide](../self-sovereign-identities/technical-guide/).

## **EW Digital Spine Namespaces**

The EW Digital Spine Message Broker has its own set of namespaces as listed below:

### EW Digital Spine Message Broker - Application Namespace

* `mb.apps.ddhub.energyweb.auth.ewc`

### EW Digital Spine Message Broker - Role Namespaces

* `user.roles.mb.apps.ddhub.energyweb.auth.ewc`
* `topiccreator.roles.mb.apps.ddhub.energyweb.auth.ewc`

The `user` role on the message broker will be used by the Client GW to access the Message Broker APIs while the `topiccreator` role will be used by application owners to create data schemas under a specific application context provided they also have `topiccreator` role in that respective application context.

## Enterprise Namespaces

Enterprises can request from EWF the creation of their respective namespaces such as organizations, sub-organizations, applications, and roles.<br>
