# Federation Authentication

<LastUpdated/>

## What is Federation Authentication?

In the early days of the Internet, your different type of account information was separated in different sites and applications, this has the following problems:

1. You need to register a new username and password every time you visit a new site.
2. This account is only stored on this site.
3. You cannot keep logging in under different sites. User’s information cannot be communicated between different sites.

Federation authentication **unites** different identity providers through **standard protocols** to authenticate users. **Federation** is a **trust relationship** between identity providers, identity providers that have established federation relationships can trigger user information from each other through **standard protocols**.

![](~@imagesZhCn/concepts/federation/1-1.png)

## Why We Need Federation Authentication?

Federation authentication is a **distributed** identity authentication, when the user login into the **identity provider**, the user can select to log in to federal identity providers **trusted** by the current identity provider. Users can log in to a new system through federation authentication without having to register an account in the new system every time.

Using federation authentication has the following benefits:

1. Users don’t need to create a new account every time.
2. Users can freely access different organizations and sites after accessing federation authentication. 

## The Federation Authentication Principle

The following is the process of federation authentication, the user is redirected to the identity federation for authentication, the user first authenticates in the identity federation, and the identity federation authentication sends an assertion to Approw, which is equivalent to the user completing the authentication in Approw, Approw then sends the assertion to the business system, and the business system completes the login.

![](~@imagesZhCn/concepts/federation/1-2.png)

## Approw’s Federation Authentication Abilities

Approw supports multiple standard protocols for federation authentication. You can use [this application](https://federation-poc.authing.cn/) to quickly experience.

![](~@imagesZhCn/concepts/federation/1-3.png)

## OAuth2

Approw supports rich social login and custom OAuth2 identity federation.

![](~@imagesZhCn/concepts/federation/1-4.png)

## OpenID Connect

Approw supports federation authentication using OIDC protocol.

![](~@imagesZhCn/concepts/federation/1-5.png)

## SAML2

Approw supports federation authentication using SAML2 protocol.

![](~@imagesZhCn/concepts/federation/1-6.png)

## CAS

Approw supports federation authentication using CAS protocol.

![](~@imagesZhCn/concepts/federation/1-7.png)
