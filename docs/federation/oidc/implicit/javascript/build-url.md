```js
// 初始化 authing-js-sdk
const authenticationClient = new AuthenticationClient({
  appId: '应用 ID',
  appHost: 'https://{YOUR_DOMAIN}.authing.cn',
  redirectUri: '业务回调地址',
});
// 获取 Id token 和 Access token
let url = authing.buildAuthorizeUrl({ responseType: 'id_token token' });
// 获取 Id token
let url2 = authing.buildAuthorizeUrl({ responseType: 'id_token' });
// 获取 Access token
let url3 = authing.buildAuthorizeUrl({ responseType: 'token' });
```

示例数据：

```http
https://example.authing.cn/oidc/auth?client_id=5ca765e393194d5891db1927&redirect_uri=https://example.com&scope=openid profile&response_type=id_token token&state=6223573295&nonce=1831289
```
