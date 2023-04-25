# Use Guide Overview

<LastUpdated/>

Welcome to the guide, here will officially open your development tour in {{$localeConfig.brandName}}!

Here, you will primarily learn two things:

1. Integrated authentication, we will guide you to quickly integrate authentication functions in your application step by step by step.
2. Manage resources, how to manage resources in {{$localeConfig.brandName}}, such as applications, roles, user directory, configuration, and more.

Before you officially start development, we recommend you to understand [{{$localeConfig.brandName}}](/concepts/), and {{$localeConfig.brandName}} A few core concepts:[UserPool](/concepts/user-pool.md)、[Application](/concepts/application.md)、[Certification and Authority Differences](/concepts/authentication-vs-authorization.md).

## Integrated certification into your application

Recommended first reading [Quick Start: Certified Your First User](/guides/basics/authenticate-first-user/), you will learn about integration {{$localeConfig.brandName}}, help you quickly get started.

After that, you can read the guidelines in accordance with the subject:

1. Certification for users
   - the most basic[Account password authentication](./authentication/basic/password/README.md)、[Mobile phone number verification code authentication](./authentication/basic/sms/README.md)
   - [How to access social login certification](/guides/authentication/social/)
   - [How to access scan code login authentication](/guides/authentication/qrcode/use-self-build-app/overview.md)
   - [How to verify in a small program](/guides/authentication/wechat-mini-program/)
   - [Realize single sign-on (SSO)](/guides/authentication/sso/)
   - [Implement single sign-on on the mobile](/guides/authentication/mobile-sso/)
   - [How to integrate multi-factor authentication](/guides/authentication/mfa/)
   - Extend the certification process:
     - [Add user custom fields](/guides/authentication/extensibility/user-defined-field/)
     - [IdToken adds custom fields](/guides/authentication/extensibility/customize-id-token.md)
     - [Certification using custom databases](/guides/authentication/extensibility/database-connection.md)
     - [Use Pipeline to expand the authentication process](/guides/authentication/extensibility/pipeline.md)
     - [Use WebHook to listen to authentication events](/guides/authentication/extensibility/webhook.md)
2. Permission management
   - [Select the appropriate permissions model](/guides/access-control/choose-the-right-access-control-model.md)
   - [Integrated RBAC permission model to your application](/guides/access-control/rbac.md)
   - [Integrated ABAC permission model to your application](/guides/access-control/abac.md)
   - [Use rights group management privilege resources](/guides/access-control/resource-group.md)
   - [Manage resource rights](/guides/access-control/resource-acl.md)
3. Authorize

   - [User license resource authorization](/guides/authorization/user-consent-authz.md)
   - [Machinery (M2M) Authorization](/guides/authorization/m2m-authz.md)

4. Manage user account

   - [Understand the interpretation of all fields](/guides/user/user-profile.md)
   - [Understand how administrator creates an account](/guides/user/create-user/)
   - [Learn how to manage user accounts](/guides/user/manage-profile.md), such as modifying user information, binding MFA, etc .
   - [Learn how to bind accounts](/guides/user/bind-social-account.md)
   - ...

5. [Call the WeChat Ecological Account System](/guides/wechat-ecosystem/), call the WeChat Ecological Account System.

## Manage your resources in {{$localeConfig.brandName}}

Recommended first reading [Console overview](/guides/basics/console/),You will find it quickly {{$localeConfig.brandName}} what functions have a console that helps you generally understand {{$localeConfig.brandName}}.

After that, you can read the guidelines in accordance with the subject:

1. [Manage user directory](/guides/users/)

   - [Learn what the user directory configuration items](/guides/users/settings.md)；
   - [Learn how to add custom user fields](/guides/users/user-defined-field/)；
   - [Learn how to search for a user](/guides/users/search.md)；
   - [Learn how to use LDAP user directory](/guides/users/ldap-user-directory.md)。

2. [Management Applications](/guides/app/)
3. [Become a federal identity authentication source](/guides/federation/)
4. [Connect an external source identity（Identity Provider）](/guides/connections/)

   - [Configuring socialization Login](/guides/connections/social.md)
   - [Configuration standard protocol identity provider](/guides/connections/enterprise.md)
   - [Use custom databases](/guides/database-connection/overview.md)

5. [Management organization](/guides/org/)

   - [Create or import organization](/guides/org/create-or-import-org/README.md)；
   - [Management organization](/guides/org/manage-org/README.md)；
   - [Management member life cycle](/guides/org/staff-life-cycle-management/README.md)；

6. [View audit log](/guides/audit/)
7. Configuring Security Information

   - [Configure Web security zone](/guides/security/config-domain.md)
   - [Configuring password strength](/guides/security/config-password.md)

8. Configuring user pool information
   - [Modify Userpool information](/guides/userpool-config/basic-config.md)
   - [Configuring your mail service and templates](/guides/userpool-config/email/)
   - [Configuring short message service](/guides/userpool-config/sms/)

## Learn privatization deployment scenarios

If you need privatization deployment {{$localeConfig.brandName}}, please read the following guidelines:

- [Basic deployment mode](/guides/deployment/bare-metal.md);
- [Docker deployment mode](/guides/deployment/docker-compose.md);
- [Kubernetes deployment mode](/guides/deployment/kubernetes.md).
