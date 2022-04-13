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

<ApiMethodParam name="code_challenge" type="string">

一个长度大于等于 43 的字符串。

</ApiMethodParam>

<ApiMethodParam name="code_challenge_method" type="string">

可以为 plain、S256，表示计算 code_challenge 时使用的摘要算法，plain 表示不用任何算法，S256 表示 code_challenge 是使用 SHA256 计算的。

</ApiMethodParam>

</template>

</ApiMethodSpec>

code_challenge 的计算方法：

如果 `code_challenge_method` 是 `plain`，可以不用计算，直接明文传递一个长度大于等于 43 的字符串。

如果 `code_challenge_method` 是 `S256`，首先生成一个字符串 S，计算 SHA256(S) 得到一个二进制 Buffer，然后将其转为 base64 `编码，code_challenge` 传递这个值。

伪代码：`BASE64URL-ENCODE(SHA256(ASCII(S)))`

请求示例：

```
https://oidc1.authing.cn/oidc/auth?nonce=5485323897342262&state=7400704296715694&scope=openid+profile&client_id=5f17a529f64fb009b794a2ff&response_mode=query&code_challenge=E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM&code_challenge_method=S256&redirect_uri=https%3A%2F%2Fbaidu.com&response_type=code
```

**如需后续刷新 access_token**，请按照以下方式拼接登录链接

带刷新 token 功能的登录请求示例：

```
https://oidc1.authing.cn/oidc/auth?nonce=5485323897342262&state=7400704296715694&scope=openid+profile+offline_access&client_id=5f17a529f64fb009b794a2ff&response_mode=query&code_challenge=E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM&code_challenge_method=S256&redirect_uri=https%3A%2F%2Fbaidu.com&response_type=code&prompt=consent
```
