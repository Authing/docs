# 选择 OIDC 授权模式

<LastUpdated/>

你需要根据你的场景和你开发的应用类型选择一种合适的认证授权模式。本文将协助你选择合适的 OIDC 授权模式。

## 推荐的授权模式

不同类型的应用，需要选择不同的授权模式。下面的表格中是我们推荐的模式：

| 应用类型    | 授权模式           |
| ----------- | ------------------ |
| 有后端场景  | 授权码模式         |
| SPA，无后端 | 隐式模式           |
| 服务器之间  | Client Credentials |

## 你的应用是否需要 Id Token？

| 授权模式                | Access Token | Id Token |
| ----------------------- | ------------ | -------- |
| 授权码模式              | ✅           | ✅       |
| 隐式模式                | ✅           | ✅       |
| 密码模式                | ✅           | ✅       |
| Client Credentials 模式 | ✅           | ❌       |

## 你的应用是什么类型？

如何选择 OIDC 授权模式取决于你在开发哪种类型的应用。参考以下流程图来选择你需要的授权模式：

![](~@imagesZhCn/concepts/oidc/choose-flow.png)

## 你的应用代码是否能被公开访问

如果你的终端用户能够看到并修改你的应用代码，那么这个应用就是公开访问的。包括 SPA（单页 Web 应用）和移动端应用。这种场景下，应用无法安全地存储密钥。

## 你的应用是 SPA 还是原生应用？

如果你的应用是一个单页 Web 应用，运行在新版本的浏览器中，并且浏览器支持 Web Crypto，你应该使用 PKCE + 授权码模式。如果你的应用运行在老旧版本的浏览器中，浏览器不支持 Web Crypto，你应该使用隐式模式。隐式模式仅适用于应用无法安全存储密钥的场景，如果其他模式不可用时你才应该考虑用隐式模式。

如果你的应用是原生应用，你应该使用 PKCE + 授权码模式。

## 有没有终端用户在使用你的应用？

如果你的应用运行在服务器端，没有直接给终端用户使用，只是在进行服务器之间的交互，你应该使用 Client Credentials 模式。

## 应用和资源是否都被同一方持有？

如果你的应用以及应用需要访问的资源都是由你掌握，而且你的应用可以安全地存储用户账密，代码逻辑足够安全。当其他授权模式都不合适时，你可以选择密码模式。

## 授权码模式

授权码模式适合应用具备后端服务器的场景。授权码模式要求应用必须能够安全存储密钥，用于后续使用授权码换 Access Token。授权码模式需要通过浏览器与终端用户交互完成认证授权，然后通过浏览器重定向将授权码发送到后端服务，之后进行授权码换 Token 以及 Token 换用户信息。

![](~@imagesZhCn/guides/federation/oidc/authorization-code-flow.png)

了解更多信息，请参考[使用授权码模式](/federation/oidc/authorization-code/)。

## 隐式模式

隐式模式**适合不能安全存储密钥的场景**（例如前端浏览器）。在**隐式模式**中，应用不需要使用 code 换 token，无需请求 `/token` 端点，AccessToken 和 IdToken 会直接从**认证端点**返回。

:::hint-info
因为隐式模式用于**不能安全存储密钥的场景**，所以隐式模式不支持获取 Refresh Token。
:::

![](~@imagesZhCn/guides/federation/oidc/implicit-flow.png)

了解更多信息，请参考[使用隐式模式](/federation/oidc/implicit/)。

## 密码模式

密码模式适用于你既掌握应用程序又掌握应用所需资源的场景。密码模式要求应用能够安全存储密钥，并且能够被信任地存储资源所有者的账密。一般常见于自家应用使用自家的资源。密码模式不需要重定向跳转，只需要携带用户账密访问 Token 端点。

![](~@imagesZhCn/guides/federation/oidc/password-flow.png)

了解更多信息，请参考[使用密码模式](/federation/oidc/password/)。

## Client Credentials 模式

Client Credentials 模式用于进行服务器对服务器间的授权（M2M 授权），期间没有用户的参与。你需要创建编程访问账号，并将 AK、SK 密钥对交给你的资源调用方。

::: hint-info
Client Credentials 模式不支持 Refresh Token。
:::

![](~@imagesZhCn/guides/federation/oidc/client-credentials-flow.png)

了解更多信息，请参考[使用 Client Credentials 模式](/federation/oidc/client-credentials/)。
