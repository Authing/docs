# 成为 OpenID Connect 身份源

<LastUpdated/>

本文介绍如何让 Authing 成为 OIDC 身份源，其他系统可以通过 OIDC 协议接入 Authing 作为身份提供商。

OpenID Connect 协议简称 OIDC，是一种轻量、安全的身份认证和授权协议。OIDC 是 OAuth 2.0 协议的超集。

OpenID Connect 协议有以下几种授权模式，分别是

- [授权码模式](#授权码模式)
- [隐式模式](#隐式模式)
- [混合模式](#混合模式)
- [Client Credentials 模式](#client-credentials-模式)
- [密码模式](#密码模式)

成为 OpenID Connect 身份源后，其他应用可以使用相应模式的流程完成用户的认证与授权。

你可以在[这里](/concepts/oidc/oidc-overview.md)深入理解 OIDC 协议。

## 创建应用

为了让你的应用具备身份认证能力，你需要在 Authing 创建一个应用，名称建议填写你的实际应用项目的名称，进入**控制台** > **应用** > **应用列表**，点击创建应用：

![](~@imagesZhCn/guides/federation/oidc/1-1.png)

填写你的**应用名称**，例如：网络笔记项目，为你的项目指定一个**认证地址**，将来你的用户会在这个地址完成认证。

**回调链接**填写你的项目**后端路由**，Authing 会将用户信息（确切地说是一个授权码 code）发送到这个地址。最后点击创建。

![](~@imagesZhCn/guides/federation/oidc/1-2.png)

## 授权码模式

如果你的应用项目有**后端服务**，能够安全存储密钥，建议使用**授权码模式**。

首先在**控制台** > **应用**，找到你的应用，进入应用详情，在下方的「授权」卡片中，授权模式中勾选 `authorization_code`，返回类型中勾选 `code`，然后点击保存。

![](~@imagesZhCn/guides/federation/oidc/1-3.png)

整体上，有以下流程：

1. 在你的应用中，让用户访问登录链接，浏览器跳转到 Authing，用户在 Authing 完成**认证**。
2. 浏览器接收到一个从 Authing 服务器发来的**授权码**。
3. 浏览器通过重定向将**授权码**发送到你的应用**后端**。
4. 你的应用服务将**授权码**发送到 Authing 获取 **AccessToken** 和 **IdToken**，如果需要，还会返回 refresh token。
5. 你的应用后端现在知道了用户的身份，后续可以保存用户信息，重定向到前端其他页面，使用 AccessToken 调用资源方的其他 API 等等。

流程图如下：

![](~@imagesZhCn/guides/federation/oidc/authorization-code-flow.png)

[查看接入文档](/federation/oidc/authorization-code/)。

## 授权码 + PKCE 模式

如果你的应用是一个 **SPA 前端应用或移动端 App**，建议使用**授权码 + PKCE 模式**来完成用户的认证和授权。授权码 + PKCE 模式**适合不能安全存储密钥的场景**（例如前端浏览器）。

首先在**控制台** > **应用**，找到你的应用，进入应用详情，在下方的「授权」卡片中，授权模式中勾选 `authorization_code`，返回类型中勾选 `code`，点击保存。在「安全性」卡片中，换取 token 身份验证方式、检验 token 身份验证方式、撤回 token 身份验证方式选择 `none` 然后点击保存。

![](~@imagesZhCn/guides/federation/oidc/pkce-1.png)

整体上，有以下流程。

1. 在你的应用中，让用户访问登录链接，浏览器跳转到 Authing，用户在 Authing 完成**认证**。
2. 浏览器接收到一个从 Authing 服务器发来的**授权码**。
3. 浏览器通过重定向将**授权码**发送到你的应用**前端**。
4. 你的应用将**授权码**和**校验码**发送到 Authing 获取 **AccessToken** 和 **IdToken**，如果需要，还会返回 Refresh token。
5. 你的应用前端现在知道了用户的身份，后续使用 Access token 换取用户信息，重定向到前端其他页面，使用 AccessToken 调用资源方的其他 API 等等。

流程图如下：

![](~@imagesZhCn/guides/federation/oidc/pkce-2.png)

[查看接入文档](/federation/oidc/pkce/)。

## 隐式模式

如果你的应用是一个 **SPA 前端应用**，不具备后端服务，建议使用**隐式模式**来完成用户的认证和授权。隐式模式**适合不能安全存储密钥的场景**（例如前端浏览器）。在**隐式模式**中，应用不需要使用 code 换 token，无需请求 `/token` 端点，AccessToken 和 IdToken 会直接从**认证端点**返回。

:::hint-info
因为隐式模式用于**不能安全存储密钥的场景**，所以隐式模式不支持获取 Refresh Token。
:::

首先在**控制台** > **应用**，找到你的应用，进入应用详情，在下方的「授权」卡片中，授权模式中勾选 `implicit`，返回类型中勾选 `id_token token` 和 `id_token`，然后点击保存。

![](~@imagesZhCn/guides/federation/oidc/1-4.png)

整体上，有以下流程。

1. 在你的应用中，让用户访问登录链接，浏览器跳转到 Authing，用户在 Authing 完成**认证**。
2. Authing 将浏览器重定向到你的应用回调地址，AccessToken 和 IdToken 作为 **URL hash** 传递。
3. 你的应用从 URL 中取出 token。
4. 你的应用可以将 AccessToken 与 IdToken 保存，以便后续使用，例如携带 AccessToken 访问资源服务器，携带 IdToken 请求服务端从而服务端能够辨别用户身份。

流程图如下：

![](~@imagesZhCn/guides/federation/oidc/implicit-flow.png)

[查看接入文档](/federation/oidc/implicit/)。

## 混合模式

在某些场景你可能既希望直接从认证端点获取 token，又能获取授权码 code 用于后续获取 refresh token，建议使用**混合模式**。在**混合模式**中，应用会收到 token 与 code。应用可以选择将 code 发送给后端服务，用于从 `/token` 端点获取用户的 AccessToken、IdToken、refresh token。

首先在**控制台** > **应用**，找到你的应用，进入应用详情，在下方的「授权」卡片中，授权模式中勾选 `authorization_code` 和 `implicit`，返回类型中勾选 `code id_token token`、`code id_token` 和 `code token`，然后点击保存。

![](~@imagesZhCn/guides/federation/oidc/1-5.png)

整体上，有以下流程。

1. 在你的应用中，让用户访问登录链接，浏览器跳转到 Authing，用户在 Authing 完成**认证**。
2. Authing 将浏览器重定向到你的应用回调地址，code、AccessToken、IdToken 作为 **URL hash** 传递。
3. 你的应用从 URL 中取出 code 和 token。
4. 你的应用可以将 AccessToken 与 IdToken 保存，以便后续使用，例如携带 AccessToken 访问资源服务器，携带 IdToken 请求服务端从而服务端能够辨别用户身份。
5. 你的应用可以将 code 发送给后端。
6. 应用后端可以利用 code 获取用户的 AccessToken、IdToken 以及 refresh token。之后可以保存用户信息，使用 AccessToken 调用资源方的其他 API 等等。

流程图如下：

![](~@imagesZhCn/guides/federation/oidc/hybrid-flow.png)

[查看接入文档](/federation/oidc/hybrid/)。

## Client Credentials 模式

Client Credentials 模式用于进行服务器对服务器间的授权（M2M 授权），期间没有用户的参与。你需要创建编程访问账号，并将 AK、SK 密钥对交给你的资源调用方。

首先在**控制台** > **应用**，找到你的应用，进入应用详情，在下方的「授权」卡片中，id_token 签名算法
选择 `RS256`，授权模式中勾选 `client_credentials` 然后点击保存。

![](~@imagesZhCn/guides/federation/oidc/1-6.png)

整体上，有以下流程。

1. 资源调用方将他的凭证 AK、SK 以及需要请求的权限 scope 发送到 Authing 授权端点。
2. 如果凭证正确，并且调用方具备资源权限，Authing 为其颁发 AccessToken。

流程图如下：

![](~@imagesZhCn/guides/federation/oidc/client-credentials-flow.png)

[查看接入文档](/federation/oidc/client-credentials/)。

## 密码模式

不推荐使用此模式，尽量使用其他模式。只有其他模式都无法解决问题时才会考虑使用**密码模式**。如果使用密码模式，请确保你的应用代码逻辑非常安全，不会被黑客攻击，否则将会**直接泄露用户的账密**。一般用于改造集成非常古老的应用，否则**绝对不要**把它作为你的第一选择。

首先在**控制台** > **应用**，找到你的应用，进入应用详情，在下方的「授权」卡片中，授权模式中勾选 `password` 然后点击保存。

![](~@imagesZhCn/guides/federation/oidc/1-7.png)

整体上，有以下流程。

1. 你的应用让用户输入账密信息。
2. 你的应用将用户账密发送到 Authing。
3. 如果账密正确，Authing 返回 token。

流程图如下：

![](~@imagesZhCn/guides/federation/oidc/password-flow.png)

[查看接入文档](/federation/oidc/password/)。

## 刷新 Access Token

刷新 Access Token 需要用到 Refresh Token，你可以在[这里](/concepts/refresh-token.md)学习 Refresh Token 相关的内容。Refresh Token 用于获取新的 Access Token，保持用户登录态。

### 获取 Refresh Token

如果你想获取 [Refresh Token](/concepts/refresh-token.md) ，你需要发送请求到 Authing 获取 [Refresh Token](/concepts/refresh-token.md)。

只有**授权码模式**和**密码模式**支持 [Refresh Token](/concepts/refresh-token.md)。

下表中展示的授权模式与 Scope 参数组合发送到 Token 端点时，Authing 会返回 Refresh Token。

| 授权模式      | Scope          |
| ------------- | -------------- |
| refresh_token | offline_access |
| password      | offline_access |

::: hint-warning
注意 ⚠️⚠️⚠️：使用**授权码模式**时必须在请求**授权端点**（`/oidc/auth`） 时携带 scope 参数，值**必须**包含 `offline_access`，还**必须**携带 prompt 参数，值必须为 `consent`。否则 Authing **不会返回任何 Refresh Token**。
:::

#### 在授权码模式中获取 Refresh Token

在使用授权码模式时，首先需要访问**授权端点**（`/oidc/auth`），携带 scope 参数，值**必须**包含 `offline_access`，还**必须**携带 prompt 参数，值必须为 `consent`，获取一个授权码 Code。然后将授权码发送到 **Token 端点**，Authing 会返回 Access Token、Id Token 和 Refresh Token。查看[使用 OIDC 授权码模式](/federation/oidc/authorization-code/)了解更多信息。

#### 获取授权码和 Refresh Token 的例子

下面的请求示例可以获取授权码和 Refresh Token，注意 scope 参数中的 `offline_access` 内容。

```http
https://{你的应用域名}/oidc/auth?client_id={应用ID}
&response_type=code
&scope=openid%20profile%20email%20phone%20address%20offline_access
&redirect_uri={回调地址}
&state=4756806
```

#### 获取 Access Token、Id Token 和 Refresh Token 的例子

下面的请求示例可以从 Token 端点获取到 Access Token、Id Token 和 Refresh Token。`code` 参数的值是上一步从认证端点返回的**授权码**。

```http
POST https://${你的应用域名}/oidc/token?grant_type=authorization_code
&redirect_uri={回调地址}
&code={授权码}
&client_id={应用ID}
&client_secret={应用密钥}
```

#### 响应示例

```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlRmTE90M0xibjhfYThwUk11ZXNzYW1xai1vM0RCQ3MxLW93SExRLVZNcVEifQ.eyJqdGkiOiJZUHB4NUVEWGlQWVJvNUFQWXAzci0iLCJzdWIiOiI1ZmY3MDFkODQ2YjkyMDNlMmY2YWM2ZjMiLCJpYXQiOjE2MTQwOTE0OTksImV4cCI6MTYxNDA5NTA5OSwic2NvcGUiOiJvZmZsaW5lX2FjY2VzcyBwcm9maWxlIG9wZW5pZCIsImlzcyI6Imh0dHBzOi8vb2lkYzEuYXV0aGluZy5jbi9vaWRjIiwiYXVkIjoiNWYxN2E1MjlmNjRmYjAwOWI3OTRhMmZmIn0.ZN_SlfVg1oNMz7uAK-5K84dqqqmlZehmAPOLytOR9HnLHImKJ9VO5u1hRsAjGCob0kMUV5wVxQhX3EFks7FtMamiX2Jvn-NYh4V_5T6l3LFf4uoKF6AykAg483nG3EEENuGgQo15bBszsoCGqFnNmUd0T4Cgxx0zbxXPxMdp_dcE14KzmNz1w-Qg3yVeYmSTZFdcLtZA2BYnVEa7LYA2yA3DgawwAcRmrlyEfnvCO3uY2TcsTKEAfQ-QgVIGRWOfyUE5f-_X3TolliO1fXnwZBdxEKMXLGW5E2bPVcePyiV0upYbUnQ079UxBlEiWlgeW_rpkTPXDxHAgiE488gtlg",
  "expires_in": 3600,
  "id_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZmY3MDFkODQ2YjkyMDNlMmY2YWM2ZjMiLCJiaXJ0aGRhdGUiOm51bGwsImZhbWlseV9uYW1lIjpudWxsLCJnZW5kZXIiOiJVIiwiZ2l2ZW5fbmFtZSI6bnVsbCwibG9jYWxlIjpudWxsLCJtaWRkbGVfbmFtZSI6bnVsbCwibmFtZSI6bnVsbCwibmlja25hbWUiOm51bGwsInBpY3R1cmUiOiJodHRwczovL2ZpbGVzLmF1dGhpbmcuY28vYXV0aGluZy1jb25zb2xlL2RlZmF1bHQtdXNlci1hdmF0YXIucG5nIiwicHJlZmVycmVkX3VzZXJuYW1lIjpudWxsLCJwcm9maWxlIjpudWxsLCJ1cGRhdGVkX2F0IjoiMjAyMS0wMi0yM1QxNDo0NDoxOC4wODVaIiwid2Vic2l0ZSI6bnVsbCwiem9uZWluZm8iOm51bGwsImF0X2hhc2giOiIxaWRJSUxaWExpZkRscXJMY3ZNeV9BIiwiS0VZIjoiVkFMVUUiLCJhdWQiOiI1ZjE3YTUyOWY2NGZiMDA5Yjc5NGEyZmYiLCJleHAiOjE2MTQwOTUwOTgsImlhdCI6MTYxNDA5MTQ5OSwiaXNzIjoiaHR0cHM6Ly9vaWRjMS5hdXRoaW5nLmNuL29pZGMifQ._H59237sqpsY0OgyY_RM7CvuG6cFo1x03y-DBhd5hik",
  "refresh_token": "3T49f4Y48szoMmwBXragjqLwQZC4QhgnsM5Oy2WfmU-",
  "scope": "openid offline_access profile",
  "token_type": "Bearer"
}
```

#### 在密码模式中获取 Refresh Token

在密码模式中，你只会用到 **Token 端点**。查看[使用密码模式](/federation/oidc/password)了解更多信息。

在密码模式的请求参数 scope 中包含 `offline_access`。

```http
POST https://${你的应用域名}/oidc/token?grant_type=password
&client_id={应用ID}
&client_secret={应用密钥}
&username={用户名}
&password={密码}
&scope=openid%20offline_access
```

#### 响应示例

```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlRmTE90M0xibjhfYThwUk11ZXNzYW1xai1vM0RCQ3MxLW93SExRLVZNcVEifQ.eyJqdGkiOiJZUHB4NUVEWGlQWVJvNUFQWXAzci0iLCJzdWIiOiI1ZmY3MDFkODQ2YjkyMDNlMmY2YWM2ZjMiLCJpYXQiOjE2MTQwOTE0OTksImV4cCI6MTYxNDA5NTA5OSwic2NvcGUiOiJvZmZsaW5lX2FjY2VzcyBwcm9maWxlIG9wZW5pZCIsImlzcyI6Imh0dHBzOi8vb2lkYzEuYXV0aGluZy5jbi9vaWRjIiwiYXVkIjoiNWYxN2E1MjlmNjRmYjAwOWI3OTRhMmZmIn0.ZN_SlfVg1oNMz7uAK-5K84dqqqmlZehmAPOLytOR9HnLHImKJ9VO5u1hRsAjGCob0kMUV5wVxQhX3EFks7FtMamiX2Jvn-NYh4V_5T6l3LFf4uoKF6AykAg483nG3EEENuGgQo15bBszsoCGqFnNmUd0T4Cgxx0zbxXPxMdp_dcE14KzmNz1w-Qg3yVeYmSTZFdcLtZA2BYnVEa7LYA2yA3DgawwAcRmrlyEfnvCO3uY2TcsTKEAfQ-QgVIGRWOfyUE5f-_X3TolliO1fXnwZBdxEKMXLGW5E2bPVcePyiV0upYbUnQ079UxBlEiWlgeW_rpkTPXDxHAgiE488gtlg",
  "expires_in": 3600,
  "id_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZmY3MDFkODQ2YjkyMDNlMmY2YWM2ZjMiLCJiaXJ0aGRhdGUiOm51bGwsImZhbWlseV9uYW1lIjpudWxsLCJnZW5kZXIiOiJVIiwiZ2l2ZW5fbmFtZSI6bnVsbCwibG9jYWxlIjpudWxsLCJtaWRkbGVfbmFtZSI6bnVsbCwibmFtZSI6bnVsbCwibmlja25hbWUiOm51bGwsInBpY3R1cmUiOiJodHRwczovL2ZpbGVzLmF1dGhpbmcuY28vYXV0aGluZy1jb25zb2xlL2RlZmF1bHQtdXNlci1hdmF0YXIucG5nIiwicHJlZmVycmVkX3VzZXJuYW1lIjpudWxsLCJwcm9maWxlIjpudWxsLCJ1cGRhdGVkX2F0IjoiMjAyMS0wMi0yM1QxNDo0NDoxOC4wODVaIiwid2Vic2l0ZSI6bnVsbCwiem9uZWluZm8iOm51bGwsImF0X2hhc2giOiIxaWRJSUxaWExpZkRscXJMY3ZNeV9BIiwiS0VZIjoiVkFMVUUiLCJhdWQiOiI1ZjE3YTUyOWY2NGZiMDA5Yjc5NGEyZmYiLCJleHAiOjE2MTQwOTUwOTgsImlhdCI6MTYxNDA5MTQ5OSwiaXNzIjoiaHR0cHM6Ly9vaWRjMS5hdXRoaW5nLmNuL29pZGMifQ._H59237sqpsY0OgyY_RM7CvuG6cFo1x03y-DBhd5hik",
  "refresh_token": "3T49f4Y48szoMmwBXragjqLwQZC4QhgnsM5Oy2WfmU-",
  "scope": "openid offline_access profile",
  "token_type": "Bearer"
}
```
