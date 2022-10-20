初始化用户认证模块（AuthenticationClient）需要获取 Authing 应用的相关配置信息，如应用 ID、应用密钥和应用域名等。

<details>
<summary>点此展开详情</summary>

首先你需要在 [Authing 控制台](https://console.authing.cn) 创建一个 **标准 Web 应用** 或者 **后端应用**：

![](~@imagesZhCn/reference-new/create-app-for-sdk.jpg)

创建完成之后，你可以在此应用的**应用详情**页面中获取到相关信息。下面是你会经常使用到的几个配置项：

- 应用 ID（App ID）：应用的唯一标志。
- 应用密钥（App Secret）：用于验证客户端请求的合法性。
- 应用域名（App Host）：应用域名，如 https://example.authing.cn 。
- 登录回调 URL（Redirect Uri）：当用户使用 Authing 的托管登录页进行认证，认证完成之后，会通过浏览器 `302` 重定向回调到此地址。可以配置多个地址，发起登录时可以选择任意一个。
- 退出登录回调 URL（Logout Redirect Uri）：当用户在浏览器端退出登录时，可以通过浏览器 `302` 重定向回调到此地址。可以配置多个地址，发起退出登录时可以选择任意一个。
- 换取 token 身份验证方式（Token Endpoint Auth Method）：调用 OIDC 获取 Token 接口或者 Signin 接口时客户端需要提供的校验方式。
- 检验 token 身份验证方式（Introspection Endpoint Auth Method）：调用 OIDC 校验 Token 合法性时客户端需要提供的校验方式。
- 撤回 token 身份验证方式（Revoke Endpoint Auth Method）：调用 OIDC 校验 Token 合法性时客户端需要提供的校验方式。

</details>
