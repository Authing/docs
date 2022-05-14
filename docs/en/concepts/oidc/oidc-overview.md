# Overview of OIDC and OAuth2.0

<LastUpdated />

Before choosing **a mode for authentication and authorization**, it is recommended to understand the **OAuth 2.0** and **OpenID Connect** protocols first, which will help you choose the authorization mode that is most suitable for your application.

## Basic Authentication vs OAuth 2.0 vs OpenID Connect

Currently, Authing has three authentication methods that can be selected:

- **Basic authentication** is based on the API interface, which directly completes user authentication by sending account, password, and mobile phone verification codes to the Authing backend, which also provide functions such as MFA and forgetten password. The [Guard Component](/reference/guard) and [SDK](/reference/sdk-for-node) of Authing are both based on these APIs.

- The **OAuth 2.0** protocol is mainly used for resource authorization.

- The **OpenID Connect** protocol, as known as **OIDC**, is a superset of the OAuth 2.0 protocol, which can **authenticate** users and complete resource **authorization**. If OIDC can be selected, **OIDC should be selected**.

If you want to directly authenticate your users through API, you can check the [interface documentation](/reference/) and SDK documentation in the development integration section.

If you want to implement **single sign-on** or **authenticate** users first and then return to resources, it is recommended to use the **OIDC protocol**.

## OAuth 2.0

**OAuth 2.0** is an authorization standard protocol. If you want to securely authorize your application’s data to the client, OAuth 2.0 is recommended.

According to the OAuth 2.0 protocol specification, there are **four main subjects**:

- **Authorization server**, responsible for issuing Access Token. Authing is the authorization server.
- **Resource owner**, the user of your application, is the owner of the resource and authorizes others to access his resource.
- **Client**, requests to obtain an Access Token, and Authing issues an Access Token for the client after user authorizes it. Client can carry the Access Token to the resource server to access the user's resources.
- **Resource server** accepts the Access Token, then verifies its assigned permissions, and finally returns the resource.

Other important concepts:

- One-time OAuth 2.0 authorization means that the user **authorizes** the related permissions to the **client**.
- **Authorization Code** is issued by the authorization server Authing and is used by the client to exchange the Code for Token.
- **Access Token** is issued by the authorization server Authing. Holding the Access Token indicates that the user authorization has been completed.
- **Refresh Token** is an optional Token used to obtain a new Access Token after the Access Token expires.

The common OAuth 2.0 authorization process is as follows:

1. In your application, let the user access the login link, the browser jumps to Authing, and the user completes the **authentication** in Authing.
2. The browser receives an **authorization code** sent from the Authing server.
3. The browser sends the **authorization code** to your application **backend** through redirection.
4. Your application service will send the **authorization code** to Authing to get the **AccessToken**, and if necessary, it will also return the refresh token.
5. Your application backend knows the user's identity now. The following operations can include saving user information, redirecting to other front-end pages, using AccessToken to call other APIs of the resource party, and so on.

::: hint-info
If you want to learn more about OAuth 2.0, you can read the [protocol specification](https://tools.ietf.org/html/rfc6749).
:::

The core of OAuth 2.0 and OIDC is the **authorization server**. The authorization server is used to issue Access Token. Each authorization server has a unique **Issuer URI** and Signing Key. **Each application** in Authing is an authorization server.

## OpenID Connect

OpenID Connect is an identity authentication protocol based on OAuth 2.0 with the addition of **Id Token**. OIDC has also formulated specifications for the undefined parts of OAuth 2.0, such as scope, discovery, user information fields, etc. Authing supports OIDC.

In the [OIDC specification](https://openid.net/connect/), some terms are different from OAuth 2.0:

- **OpenID Provider** refers to the authorization server, responsible for issuing ID Tokens. Authing is an OpenID Provider.
- **End user**, the information of the end user will be included in the ID Token information.
- **Client**, the application requesting the ID Token.
- **ID Token** is issued by OpenID Provider and contains information about end users.
- **Claim** refers to the end user information field.

The authorization process of OIDC is the same as OAuth 2.0, the main difference is that an additional ID Token will be returned in the OIDC authorization process.
