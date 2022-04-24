# 成为 OAuth 2.0 身份源

<LastUpdated/>

本文介绍如何让 Authing 成为 OAuth2.0 身份源，其他系统可以通过 OAuth2.0 协议接入 Authing 作为身份提供商。

OAuth2.0 协议有以下几种授权模式，分别是**授权码模式**、**隐式模式**、**密码模式**。成为 OAuth2.0 身份源后，其他应用可以使用相应模式的流程完成用户的认证与授权。

你可以在[这里](/concepts/oidc/oidc-overview.md)深入理解 OAuth 2.0 协议。

## 创建应用

为了让你的应用具备身份认证能力，你需要在 Authing 创建一个应用，名称建议填写你的实际应用项目的名称，进入**控制台** > **应用** > **应用列表**，点击创建应用：

![](~@imagesZhCn/guides/federation/oidc/1-1.png)

填写你的**应用名称**，例如：网络笔记项目，为你的项目指定一个**认证地址**，将来你的用户会在这个地址完成认证。**回调链接**填写你的项目**后端路由**，Authing 会将用户信息（确切地说是一个授权码 code）发送到这个地址。最后点击创建。

![](~@imagesZhCn/guides/federation/oidc/1-2.png)

找到你的应用，进入「启用身份提供商」选项卡。

![](~@imagesZhCn/guides/federation/oauth/1-1.png)

在下方的「OAuth2.0 身份提供商」卡片中，打开启用 OAuth2.0 Provider 开关，然后点击保存。

![](~@imagesZhCn/guides/federation/oauth/1-2.png)

## 授权码模式

如果你的应用项目有**后端服务**，能够安全存储密钥，建议使用**授权码模式**。

首先在**控制台** > **应用**，找到你的应用，进入应用详情，进入「启用身份提供商」选项卡，在下方的「OAuth2.0 身份提供商」卡片中，授权模式勾选 `authorization_code`，然后点击保存。

![](~@imagesZhCn/guides/federation/oauth/1-3.png)

整体上，有以下流程。

1. 在你的应用中，让用户访问登录链接，浏览器跳转到 Authing，用户在 Authing 完成**认证**。
2. 浏览器接收到一个从 Authing 服务器发来的**授权码**。
3. 浏览器通过重定向将**授权码**发送到你的应用**后端**。
4. 你的应用服务将**授权码**发送到 Authing 获取 **AccessToken**，如果需要，还会返回 refresh token。
5. 你的应用后端现在知道了用户的身份，后续可以保存用户信息，重定向到前端其他页面，使用 AccessToken 调用资源方的其他 API 等等。

流程图如下：

![](~@imagesZhCn/guides/federation/oauth/authorization-code-flow.png)

[查看接入文档](/federation/oauth2/authorization-code/)。

## 隐式模式

如果你的应用是一个 **SPA 前端应用**，不具备后端服务，建议使用**隐式模式**来完成用户的认证和授权。隐式模式**适合不能安全存储密钥的场景**（例如前端浏览器）。在**隐式模式**中，应用不需要使用 code 换 token，无需请求 `/token` 端点，AccessToken 会直接从**认证端点**返回。

首先在**控制台** > **应用**，找到你的应用，进入应用详情，进入「启用身份提供商」选项卡，在下方的「OAuth2.0 身份提供商」卡片中，授权模式勾选 `implicit`，然后点击保存。

![](~@imagesZhCn/guides/federation/oauth/1-4.png)

整体上，有以下流程。

1. 在你的应用中，让用户访问登录链接，浏览器跳转到 Authing，用户在 Authing 完成**认证**。
2. Authing 将浏览器重定向到你的应用回调地址，AccessToken 作为 **URL hash** 传递。
3. 你的应用从 URL 中取出 token。
4. 你的应用可以将 AccessToken 保存，以便后续使用，例如使用 AccessToken 获取用户信息，携带 AccessToken 访问资源服务器。

流程图如下：

![](~@imagesZhCn/guides/federation/oauth/implicit-flow.png)

[查看接入文档](/federation/oauth2/implicit/)。

## 密码模式

不推荐使用此模式，尽量使用其他模式。只有其他模式都无法解决问题时才会考虑使用**密码模式**。如果使用密码模式，请确保你的应用代码逻辑非常安全，不会被黑客攻击，否则将会**直接泄露用户的账密**。一般用于改造集成非常古老的应用，否则**绝对不要**把它作为你的第一选择。

首先在**控制台** > **应用**，找到你的应用，进入应用详情，进入「启用身份提供商」选项卡，在下方的「OAuth2.0 身份提供商」卡片中，授权模式勾选 `password`，然后点击保存。

![](~@imagesZhCn/guides/federation/oauth/1-5.png)

整体上，有以下流程。

1. 你的应用让用户输入账密信息。
2. 你的应用将用户账密发送到 Authing。
3. 如果账密正确，Authing 返回 token。

流程图如下：

![](~@imagesZhCn/guides/federation/oauth/password-flow.png)

[查看接入文档](/federation/oauth2/password)。
