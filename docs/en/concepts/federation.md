# What is Federated Authentication

<LastUpdated/>

In the early generation of the Internet, users’ with various accounts hold private information that would be scattered across different sites and applications. This have lead the following problems:
1. Every time a user visits a new site, they must register an account with a new username and password.
2. This account is only stored on this site.
3. The end user is unable to save the logged in on different sites. User information cannot be shared between these sites.
The Federated Authentication unites different identity providers to authenticate users through standard protocols. Federated Authentication has a strong  trust relationship between these organizations. Identity providers can establish a federated relationship and can get user information from each other through standard protocols.

![](~@imagesZhCn/concepts/federation/1-1.png)

## Why do you need Federated Identity Authentication

Federated Authentication is a decentralized authentication. When a user logs in at an identity provider, the user can choose to log in to a federal identity provider trusted by the current identity provider. Users can log in to a new system through Federated Authentication without registering an account in the new organization. For example, many websites now have their registration and login methods; One way to log in is the app WeChat, it can scan codes to login directly. Among them, WeChat is the identity provider of this website. End users do not need to fill in the information to register an account and log in directly using WeChat.

Using Federated Authentication has the following benefits:
1. Users do not have to create a new account.
2. After accessing federation, users can switch between different organizations and sites without extra authentication.

## Principles of Federated Authentication

The following is the process of Federated Authentication. The end user is redirected to the federated identity for Authentication. First, the end user authenticates in the federated identity. Then, the federated identity sends an assertion to Approw, which is equivalent to the user completing the Authentication in Approw. Approw sends the assertion to the business system, and the login completes.

![](~@imagesZhCn/concepts/federation/1-2.png)

## Approw's Federated Authentication capabilities

Approw supports multiple [standard protocols](https://federation-poc.approw.com/) for Federated Authentication.

![](~@imagesZhCn/concepts/federation/1-3.png)

## OAuth2

Approw supports a variety of [social login](/guides/connections/social.md) services, and [customize OAuth2 social login](/connections/custom-social-provider/).

![](~@imagesZhCn/concepts/federation/1-4.png)

## OpenID Connect

Approw supports federated authentication using [OIDC](/connections/oidc/)。

![](~@imagesZhCn/concepts/federation/1-5.png)

## SAML2

Approw supports federated authentication using [SAML2](/connections/saml/).

![](~@imagesZhCn/concepts/federation/1-6.png)

## CAS

Approw supports the use of [CAS](/connections/cas/) for federated authentication.

![](~@imagesZhCn/concepts/federation/1-7.png)
