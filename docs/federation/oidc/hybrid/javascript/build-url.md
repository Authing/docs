```js
// 初始化 authing-js-sdk
const authenticationClient = new AuthenticationClient({
  appId: 'AUTHING_APP_ID',
  appHost: 'https://{YOUR_DOMAIN}.authing.cn',
  redirectUri: '业务回调地址',
});
// 构造 OIDC 授权登录 URL
// 获取 code 和 Access token
let url = client.buildAuthorizeUrl({ responseType: 'code token' });
// 获取 code 和 Id token
let url2 = client.buildAuthorizeUrl({ responseType: 'code id_token' });
// 获取 code、Id token 和 Access token
let url3 = client.buildAuthorizeUrl({ responseType: 'code id_token token' });
// 如果需要获取 Refresh token，请在 scope 中加入 offline_access 项
let url4 = client.buildAuthorizeUrl({ responseType: 'code id_token token', scope: 'openid profile offline_access' });
```

示例数据：

```http
https://oidc1.authing.cn/oidc/auth?nonce=5485323897342262&state=7400704296715694&scope=openid+profile+offline_access&client_id=5f17a529f64fb009b794a2ff&response_mode=query&redirect_uri=https%3A%2F%2Fbaidu.com&response_type=code+id_token+token&prompt=consent
```

详情查看[文档](/reference/sdk-for-node/authentication/StandardProtocol.html#生成-oidc-协议的用户登录链接)。
