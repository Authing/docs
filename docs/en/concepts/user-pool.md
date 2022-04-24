# What is User Pool

<LastUpdated/>

When you start to build an application, oftentimes the first thing is to build a user system. Building a user system always involves complicated authentication procedures and security issues. Using {{$localeConfig.brandName}} can relieve you of these worries.

The first step in using {{$localeConfig.brandName}} is to create a user pool. A user pool is the smallest unit of isolation of your user system. You can divide users in different scenarios into different user pools. Each user pool has its own users and applications, permissions, applications, and organizations. Between different user pools are completely isolated.

<!-- （建议此处加一个用户池和多应用的架构图） -->

<img src="~@imagesZhCn/concepts/userpool.png" alt="drawing"/>

You can create users in {{$localeConfig.brandName}}'s user pool, import users through directory integration, or import users through application integration. Applications under the user pool are connections to public applications (such as Office365) or proprietary applications (such as your own applications). Through this connection, your users can quickly and efficiently complete authentication and authorization between different applications through an identity.

## URL address of the user pool

When creating an {{$localeConfig.brandName}} user pool, a URL is assigned to each user pool. The typical organization URL is the tenant name (subdomain), followed by the domain name (such as 'you-tenant-domain.{{$localeConfig.brandName}}.cn'). You can customize the URL of the {{$localeConfig.brandName}} user pool by replacing the {{$localeConfig.brandName}} domain name with your own domain name. Please check this document for details. [Learn more](/guides/deployment/custom-domain.md)。

## Admin console

The administrator console (or management console) is where you manage the {{$localeConfig.brandName}} user pool. As an administrator, you need to log in to the administrator console through the domain name:
[https://console.{{$localeConfig.brandName}}.cn] (opens new window). 
In the administrator console, you can create a new user pool or switch between different user pools.

Enter a user pool in the management console to manage user data and application connection information in the user pool.

## Cross user pool

The user pool is a hard boundary between users or application resources, so user and application data cannot be shared between user pools. You can use [federated authentication](/guides/federation/) to allow users to log in across user pools, but the users still exist separately in each organization.

## Multiple user pools

In most cases, your company or project has only one user pool. A single user pool provides a standard resource management entry for the entire user group, provides an integration point for applications, and has low complexity. However, in more complex situations, you may need multiple user pools. For example, your company is a large organization with more than 10,000 employees, and there are many upstream and downstream suppliers. You need to coordinate employees and suppliers to complete a certain business process in an ERP application. At this time, two user pools can be established, the internal employees belong to one user pool, and external suppliers belong to another user pool. By connecting to the external identity sources, suppliers are allowed to access internal ERP applications. This achieves segmented management and collaborative work between the company's internal and external organizations. Multiple user pools allow complete isolation of internal and external users, and applications and changes of internal or external organizations will not affect each other. However, multiple user pools add complexity in terms of the number of environments to be managed. We recommend reducing the number of user pools as much as possible to reduce system complexity.

## Fee collection

In {{$localeConfig.brandName}}, we use the user pool as the dimension for service management, and each user pool can have an independent service plan. It is divided into 「Developer 」Edition, 「Developer Pro」Edition and 「Enterprise」 Edition. The "Developer Edition" is suitable for CIAM scenarios for external customers. It has a larger monthly usage and provides a low price. The "Enterprise Edition" is suitable In complex scenarios within the enterprise, there are rich user directory synchronization and application connection solutions. You can choose freely according to the usage scenario, or you can contact a business consultant (telephone 176-0250-2507) for consultation.

### Function comparison of different versions

The following is a detailed comparison of the functions and services of the 「Developer 」Edition, 「Developer Pro」Edition and 「Enterprise」 Edition. For more details, please see 
https://{{$localeConfig.brandName}}.cm/pricing (opens new window).

#### Authentication Solutions

| Authentication Solutions | Developer | Developer Pro | Enterprise  |
| ------------ | ---------------------- | ------------------- | ---------- |
| Customer Identity  | Up to 50K MAU    | Up to 50K MAU       | Contact Us |
| Social Connections | Unlimited        | Unlimited           | Unlimited  |
| Employee Identity  |      /           | Up to 50K employees | Contact Us |
| Enterprise Connections|      /        | 2 connections       | Unlimited  |

#### User Management 

| User Management    | Developer | Developer Pro | Enterprise  |
| -------------- | --------- | ---------- | ---------- |
| Log Retention                 | Up to 3 Days  | Up to 10 Days  | Up to 30 Days |
| User Management Dashboard     | Includedd     | Included       | Included      |
| Role and Access Management    | Included      | Included       | Included      |
| Delegated Admin               | /             | Included       | Included      |

#### Security

| Security         | Developer | Developer Pro | Enterprise  |
| ------------------ | -------------------------------- | ---------------------------------- | ----------------------------------- |
| SMS One-time Passwords       | Free 300 SMS Messages / month, Add-On 0.079 RMB / message | Includedd 1,500 条/月，增购 0.079 元/条 | Includedd 12,000 条/月，增购 0.079 元/条 |
| Multi-factor Authentication  | /        | Included       | Included       |

#### Enterprise Customization

| Enterprise Customization   | Developer | Developer Pro | Enterprise  |
| -------------------------- | -------- | -------------------------- | ------------- |
| Customizable sign-in widgets, domains and email templates | Includedd     | Includedd   | Includedd   |
| Email Customizations                                      | Includedd     | Includedd   | Includedd   |
| Private Cloud Service (annual contract required)          | /         | 可加购（38,199 人民币/年）    | 已包括        |
| Workforce Single Sign-On Integration                      | /         | Includedd                     | Includedd     |
| Custom Development Support Engineer                       | /         | 799 RMB/人时                  | 高级版的 8 折 |
| Single Sign On Launchpad                                  | /         | /                             | Includedd     |

#### Enterprise Support

| 企业支持服务       | Developer | Developer Pro | Enterprise  |
| ------------------ | ------------------- | ------------------ | ------------------- |
| Customer Support              | Working days          | Working days          | 24*7      |
| Support Availability          | Response in 24 Hours  | Response in 1 Hour    | Response in 30 Minutes |
| SLA                           |                       | 99.90%                | 99.99%           |
| Training / Support Engineer   | /                     | 699 RMB/人时          | 高级版的 8 折       |
| Phone / Meeting Support       | /                     | /                     | Includedd                |
| Customer Support Manager      | /                     | /                     | Includedd                |

## Next

After understanding the concept of user pool, you can continue to learn the concept of [Application](./application.md).
