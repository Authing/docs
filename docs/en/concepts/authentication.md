# What is Authentication

<LastUpdated/>

No matter what type of application you are, developing-internal employee IT system, customer account system or API exposed to other developers. User authentication is a vital part of it and {{$localeConfig.brandName}} will provide you with a suitable authentication method stand by.

> Note: Some browsers have begun to disable third-party cookies by default, which will affect some functions of {{$localeConfig.brandName}} in certain scenarios. For further details, please see: 
[FAQ：How will the browser's disabling of third-party cookies affect the {{$localeConfig.brandName}} function?](/guides/faqs/block-third-party-cookie-impact.md)

The login experience is one of the most important user experiences that software developers need to consider. It is not easy to provide users with a seamless, convenient and secure authentication experience. Generally speaking, the login is also associated with the logic of registration, password reset, and account association. More importantly, enhancing security in the form of robust and adaptive authentication during the login process is often critical to many implementations.

{{$localeConfig.brandName}} provides a lot of authentication methods for developers to choose and combine. Password policies, frequent login checks, custom authentication procedures, etc. can be easily completed through the management console (basically, these operations can also be completed through the Management API).

## OIDC / OAuth2.0 / SAML / AD / LDAP / Social Login

{{$localeConfig.brandName}} supports access to your application and user data through standard protocols such as OIDC, OAuth2.0, SAML, LDAP, etc. You can safely use {{$localeConfig.brandName}} as your Identity Provider. If you use {{$localeConfig.brandName}} as an Identity Provider, you can also connect to other third-party Service Providers, such as logging in to Alibaba Cloud, AWS, Azure, Jira, etc.

For example, you can log in to your application through Azure AD or local Windows AD. It can also use third-party social login to automatically pull the user information of the social login user to your user directory.

You can understand the implementation principles of [OIDC, OAuth2.0](/concepts/oidc/oidc-overview.md), [SAML](/concepts/saml/saml-overview.md), [LDAP](/concepts/ldap.md), and AD respectively.


## Hosted login page authentication

Each application in {{$localeConfig.brandName}} has an independent second-level domain name and is equipped with an online login page, which can be accessed by visiting: `https://YOUR_DOMAIN.{{$localeConfig.brandName}}.cn/login`. 
You don't need to write a line of code to maintain the login page. You can do some customized 
configuration through the application configuration of the console.

## Embedded login form authentication

The {{$localeConfig.brandName}} embedded login component is a lightweight, modern, and highly extensible front-end login component. It supports native JavaScript and the three front-end frameworks of React, Vue, and Angular. This embedded login component is basically the same as the login page hosted by {{$localeConfig.brandName}}, and has strong customization capabilities. The component has built-in functions such as password reset, MFA, social login, and scan code login, all of which are highly configurable.

For further details, please use the [embedded login component to complete the authentication](/guides/basics/authenticate-first-user/use-embeded-login-component/).

## Auth SDK

{{$localeConfig.brandName}} provides front-end developers with a lightweight, developer-friendly Auth SDK (supports JavaScript/Node, Java, Python, PHP, C# and other languages). This allows you to implement your authentication logic more flexibly, quickly, and safely. The Auth SDK supports all authentication-related functions of {{$localeConfig.brandName}}, including basic authentication, password reset, and account binding. You can get the user's `id_token` through this SDK, as the user's identity credential, and pass it to downstream applications.

{{$localeConfig.brandName}} also supports SDKs in multiple languages such as Java, JavaScript/Node.js, Python, PHP, C#, Swift, Go, Ruby, etc. You can choose the SDK you are familiar with:

- Java/Kotlin
- JavaScript/Node.js
- Python
- PHP
- C#
- Swift
- Go
- Ruby
- WeChat Mini Program

## Authentication API

The aforementioned managed login page, embedded login component, and the underlying capabilities of the Auth SDK are all supported by the Authentication API. {{$localeConfig.brandName}} Authentication API supports two calling methods: RESTful and GraphQL (endpoint is `https://core.{{$localeConfig.brandName}}.cn/graphql/v2`), you can also directly call Authentication API to implement authentication logic.

## Single Sign On

Single Sign On (SSO) is one of the more popular solutions for enterprise business integration. The definition of SSO is that in multiple application systems, users only need to log in once to access all mutually trusted application systems. We provide [SSO SDK](/reference/sdk-for-sso.md) for developers to quickly implement single sign-on between applications.
