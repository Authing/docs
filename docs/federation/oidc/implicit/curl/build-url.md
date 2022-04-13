
<ApiMethodSpec method="get" host="https://<你的应用域名>.authing.cn" path="/oidc/auth" summary="拼接一个链接并让终端用户在浏览器中访问，发起 OIDC 授权登录请求。" description="发起授权需要拼接一个用来授权的 URL，并让终端用户在浏览器中访问，具体参数如下：">
<template slot="queryParams">
<ApiMethodParam name="client_id" type="string" required description="应用 ID" />
<ApiMethodParam name="redirect_uri" type="string" required>

回调链接，用户在 OP 认证成功后，OP 会将 id_token、access_token 以 URL hash 的形式发送到这个地址。这个值**必须**出现在控制台配置的**回调地址**中，否则 OP 不允许向该地址回调。启用隐式模式时，**控制台配置的所有** redirect_uri **建议使用 https 地址**，否则 access_token 将会在明文状态下传输，造成安全隐患。如果你要使用 http 地址，请在控制台打开「**不强制 implicit 模式回调链接为 https**」开关。

</ApiMethodParam>
<ApiMethodParam name="scope" type="string" required>

需要请求的权限，必须包含 **openid**。如果需要**获取手机号**和 **email** 需要包含 phone email；多个 scope 请用**空格分隔**。同时 id_token 中会包含相关的字段。**隐式模式不支持返回 refresh_token**，所以 offline_access 字段无效。

</ApiMethodParam>
<ApiMethodParam name="response_type" type="string" required>

返回类型，可选值为 id_token, id_token token。含义为认证成功后，OP 返回 id_token 和 access_token。[参考 OIDC 规范](https://openid.net/specs/openid-connect-core-1_0.html#AuthorizationExamples)。

</ApiMethodParam>
<ApiMethodParam name="state" type="string" required description="一个随机字符串，用于防范 CSRF 攻击，如果 response 中的 state 值和发送请求之前设置的 state 值不同，说明受到攻击。" />
<ApiMethodParam name="nonce" type="string" required>

一个随机字符串，用于防范 Replay 攻击，**implicit 模式下必填**。

</ApiMethodParam>
<ApiMethodParam name="prompt" type="string">

可以为 none，login，consent 或 select_account，指定 OP 与 End-User 的交互方式。[参考 OIDC 规范](https://openid.net/specs/openid-connect-core-1_0.html#AuthRequest)。

</ApiMethodParam>
</template>

</ApiMethodSpec>

假设你创建了一个域名为 `example` 的 OIDC 应用，那么发起隐式模式 OIDC 授权登录的网址是：

```
GET https://example.authing.cn/oidc/auth?client_id=5ca765e393194d5891db1927&redirect_uri=https://example.com&scope=openid profile&response_type=id_token token&state=6223573295&nonce=1831289
```