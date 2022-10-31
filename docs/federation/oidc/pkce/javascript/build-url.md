```js
// 初始化 authing-js-sdk
const authenticationClient = new AuthenticationClient({
  appId: 'AUTHING_APP_ID',
  appHost: 'https://{YOUR_DOMAIN}.authing.cn',
  redirectUri: '业务回调地址',
});
// 生成一个 code_verifier
let codeChallenge = client.generateCodeChallenge()
// 计算 code_verifier 的 SHA256 摘要
let codeChallengeDigest = client.getCodeChallengeDigest({ codeChallenge, method: 'S256' })
// 构造 OIDC 授权码 + PKCE 模式登录 URL
let url = client.buildAuthorizeUrl({ codeChallenge: codeChallengeDigest, codeChallengeMethod: 'S256' });
// 如果需要获取 Refresh token，请在 scope 中加入 offline_access 项
let url2 = client.buildAuthorizeUrl({ codeChallenge: codeChallengeDigest, codeChallengeMethod: 'S256', scope: 'openid profile offline_access' });
```

示例数据：

```http
https://oidc1.authing.cn/oidc/auth?nonce=5485323897342262&state=7400704296715694&scope=openid+profile+offline_access&client_id=5f17a529f64fb009b794a2ff&response_mode=query&code_challenge=E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM&code_challenge_method=S256&redirect_uri=https%3A%2F%2Fbaidu.com&response_type=code&prompt=consent
```

详情查看[文档](/reference/sdk-for-node/authentication/StandardProtocol.html#生成-oidc-协议的用户登录链接)。
