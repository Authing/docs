---
tags:
  - OAuth 
  - Opaque_Access_Token
  - openIDConnect
  - OpenID_Connect
---
# OIDC 与 OAuth2.0 综述

<LastUpdated />

在选择一种**认证授权模式**前，建议先理解 **OAuth 2.0** 和 **OpenID Connect** 协议，有助于选择最适合你的应用的授权模式。

## 基本认证 vs OAuth 2.0 vs OpenID Connect

目前 Authing 有三种可以选择的认证方式：

- **基本认证**是基于 API 接口，通过发送账密、手机验证码到 Authing 后端的方式直接完成用户认证。提供 MFA、忘记密码等功能。Authing 的 [Guard 组件](/reference-new/guard)以及 [SDK](/reference-new/Standard-web-application/sdk-for-node) 都基于这些 API。

- **OAuth 2.0** 协议主要用于资源授权。

- **OpenID Connect** 协议，简称 **OIDC**，是 OAuth 2.0 协议的超集，能够**认证**用户并完成资源**授权**。在可以选择 OIDC 的情况下，**应该选择 OIDC**。

如果你希望通过 API 的方式直接认证你的用户，你可以查看[开发集成](/reference-new/)部分的接口文档和 SDK 文档。

如果你希望实现**单点登录**或先**鉴权**用户再返回资源，建议使用 **OIDC 协议**。

## OAuth 2.0

**OAuth 2.0** 是一个授权标准协议。如果你希望将自己应用的数据安全地授权给调用方，建议使用 OAuth 2.0。

根据 OAuth 2.0 协议规范，主要有**四个主体**：

- **授权服务器**，负责颁发 Access Token，Authing 是授权服务器。
- **资源所有者**，你的应用的用户是资源的所有者，授权其他人访问他的资源。
- **调用方**，调用方请求获取 Access Token，经过用户授权后，Authing 为其颁发 Access Token。调用方可以携带 Access Token 到资源服务器访问用户的资源。
- **资源服务器**，接受 Access Token，然后验证它的被赋予的权限项目，最后返回资源。

其他重要概念：

- 一次 OAuth 2.0 授权是指用户**授权调用方**相关的权限。
- **Code 授权码**是由授权服务器 Authing 颁发的，用于调用方使用 Code 换取 Token。
- **Access Token** 由授权服务器 Authing 颁发，持有 Access Token 说明完成了用户授权。
- **Refresh Token** 是一个可选的 Token，用于在 Access Token 过期后获取一个新的 Access Token。

常见的 OAuth 2.0 授权流程如下：

1. 在你的应用中，让用户访问登录链接，浏览器跳转到 Authing，用户在 Authing 完成**认证**。
2. 浏览器接收到一个从 Authing 服务器发来的**授权码**。
3. 浏览器通过重定向将**授权码**发送到你的应用**后端**。
4. 你的应用服务将**授权码**发送到 Authing 获取 **AccessToken**，如果需要，还会返回 refresh token。
5. 你的应用后端现在知道了用户的身份，后续可以保存用户信息，重定向到前端其他页面，使用 AccessToken 调用资源方的其他 API 等等。

::: hint-info
如果你想了解更多的 OAuth 2.0 内容，可以阅读[协议规范](https://tools.ietf.org/html/rfc6749)。
:::

OAuth 2.0 以及 OIDC 的核心就是**授权服务器**。授权服务器用于**签发 Access Token**。每个授权服务器都有一个唯一的 **Issuer URI** 和*签名密钥**。Authing 中**每个应用**都是一个授权服务器。

## OpenID Connect

OpenID Connect 是基于 OAuth 2.0 的身份认证协议，增加了 **Id Token**。OIDC 也制定了 OAuth 2.0 中未定义部分的规范，例如 scope，服务发现，用户信息字段等。Authing 支持 OIDC。

在 [OIDC 规范](https://openid.net/connect/)中，有些名词与 OAuth 2.0 有区别：

- **OpenID Provider**，指授权服务器，负责签发 Id Token。Authing 是 OpenID Provider。
- **终端用户**，Id Token 的信息中会包含终端用户的信息。
- **调用方**，请求 Id Token 的应用。
- **Id Token** 由 OpenID Provider 颁发，包含关于终端用户的信息字段。
- **Claim** 指终端用户信息字段。

OIDC 的授权流程与 OAuth 2.0 一样，主要区别在于 OIDC 授权流程中会额外返回 Id Token。

