<ApiMethodSpec method="get" host="https://<你的应用域名>.authing.cn" path="/oidc/auth" summary="拼接一个链接并让终端用户在浏览器中访问，发起 OIDC 授权登录请求。" description="发起授权需要拼接一个用来授权的 URL，并让终端用户在浏览器中访问，具体参数如下：">

<template slot="queryParams">

<ApiMethodParam name="client_id" type="string" required description="应用 ID" />

<ApiMethodParam name="redirect_uri" type="string" required>

回调链接，用户在 OP 认证成功后，OP 会将授权码以 URL query 的形式发送到这个地址。这个值**必须**出现在控制台配置的**回调地址**中，否则 OP 不允许向该地址回调。

</ApiMethodParam>

<ApiMethodParam name="scope" type="string" required>

需要请求的权限，必须包含 **openid**。如果需要**获取手机号**和 **email** 需要包含 phone email；如果需要 refresh_token 需要包含 offline_access。多个 scope 请用**空格分隔**。**id_token** 解码后的内容中会包含这些 scope 对应的用户信息相关的字段。

</ApiMethodParam>

<ApiMethodParam name="response_type" type="string" required description="返回类型，填写 code。含义为登录成功后 OP 要返回授权码 code。" />

<ApiMethodParam name="state" type="string" required description="一个随机字符串，用于防范 CSRF 攻击，如果 response 中的 state 值和发送请求之前设置的 state 值不同，说明受到攻击。" />

<ApiMethodParam name="prompt" type="string">

可以为 none，login，consent 或 select_account，指定 OP 与 End-User 的交互方式，**如需 refresh_token**，**必须为 consent**。

</ApiMethodParam>

</template>

</ApiMethodSpec>

请求示例：

```
https://<你的应用域名>.authing.cn/oidc/auth?client_id=5c9b079883e333d55a101082&redirect_uri=https://www.example.cn/example&scope=openid profile&response_type=code&state=52378542395
```

**如需后续刷新 access_token**，请按照以下方式拼接登录链接

带刷新 token 功能的登录请求示例：

```
https://<你的应用域名>.authing.cn/oidc/auth?client_id=5c9b079883e333d55a101082&redirect_uri=https://example.com&scope=openid profile offline_access&response_type=code&prompt=consent&state=235345
```
