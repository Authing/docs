# Authentication

<LastUpdated/>

No matter what type of application you are developing - internal employee IT system, toC account system or API exposed to other developers, user authentication is a vital part of it, and Authing will provide you with the most suitable authentication method.

::: hint-warning
Some browsers have begun to disable third-party cookies by default, which will affect some functions of Authing in certain scenarios. For details, please see: [FAQ: How will the browser's disabling of third-party cookies affect the Authing function?](/guides/faqs/block-third-party-cookie-impact.md)
:::

The login experience is one of the most important user experiences that software developers need to consider. It is not easy to provide users with a seamless, convenient and secure authentication experience. Generally speaking, the login logic is also associated with the logic of registration, password reset, and account association. More importantly, enhancing security in the form of robust and adaptive authentication during the login process is often critical to many implementations.

Authing provides a lot of authentication methods for developers to choose and combine. Password policies, frequent login checks, custom authentication procedures, etc. can all be done easily through the management console (basically, these operations can also be done through the Management API)

## OIDC / OAuth2.0 / SAML / AD / LDAP / social login

Authing supports access to your application and user data through standard protocols such as OIDC, OAuth2.0, SAML, LDAP, etc. You can safely use Authing as your Identity Provider. If you use Authing as the Identity Provider, you can connect to other third-party Service Providers, such as logging in to AWS, Azure, Jira, etc.

Authing can also be used as a Service Provider to connect to a third-party Identity Provider through standard protocols such as OIDC, OAuth2.0, SAML, LDAP, and AD. For example, you can log in to your application through Azure AD or local Windows AD. Authing can also use a third-party social login to automatically pull the user information of the social login user to your user directory.

You can understand the implementation principles of [OIDC & OAuth2.0](/concepts/oidc/oidc-overview.md), [SAML](/concepts/saml/saml-overview.md), [LDAP](/concepts/ldap.md), and AD here.

## Hosted login page authentication

Each application in Authing has an independent second-level domain name and is equipped with an online login page, which can be accessed by visiting `https://YOUR_DOMAIN.authing.cn/login`. You don't need to write one line of code to maintain the login page, you can do some customized configuration through the application configuration of the console.

## Embedded login form authentication

The Authing embedded login component is a lightweight, modern, and highly extensible front-end login component provided by Authing. It supports native JavaScript and the three front-end frameworks of React, Vue, and Angular. This built-in login component is basically the same as the login page hosted by Authing, and has strong customization capabilities. The component has built-in functions such as password reset, MFA, social login, and scan code login, all of which are highly configurable.

For more details, please see [use embedded login component](/guides/basics/authenticate-first-user/use-embeded-login-component/).

## Auth SDK

Authing provides front-end developers with a lightweight, developer-friendly Auth SDK (supports JavaScript/Node, Java, Python, PHP, C# and other languages), which allows you to implement your authentication logic more flexibly, quickly, and safely. The Auth SDK supports all authentication-related functions of Authing, including basic authentication, password reset, and account binding. You can get the user's `id_token` through this SDK, as the user's identity credential, and pass it to downstream applications.

Authing also supports SDKs in multiple languages such as Java, JavaScript/Node.js, Python, PHP, C#, Swift, Go, Ruby, etc. You can choose the SDK you are familiar with:

!!!include(en/common/sdk-list.md)!!!

## Authentication API

The hosted login page mentioned before, embedded login component, and the underlying capabilities of the Auth SDK are all supported by the Authentication API. Authing Authentication API supports two calling methods: RESTful and GraphQL (endpoint is https://core.authing.cn/graphql/v2), you can also directly call Authentication API to implement authentication logic.

## Single Sign On

Single Sign On (SSO) is one of the more popular solutions for enterprise business integration. The definition of SSO is that in multiple application systems, users only need to log in once to access all mutually trusted application systems. We provide a dedicated [SSO SDK](/en/reference/sdk-for-sso.md) for developers to quickly implement single sign-on between applications.
