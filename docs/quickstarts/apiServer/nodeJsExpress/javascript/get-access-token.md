调用方可以使用 SDK 从 Authing 获取 Access token。

```js
const authenticationClient = new AuthenticationClient({
  appId: 'AUTHING_APP_ID',
  secret: 'AUTHING_APP_SECRET',
  redirectUri: '业务回调地址',
});
let res = await authenticationClient.getAccessTokenByClientCredentials('order:read', { accessKey: '编程访问账号 AK', secretKey: '编程访问账号 SK' });
```

示例数据：

```json
{
    "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlRmTE90M0xibjhfYThwUk11ZXNzYW1xai1vM0RCQ3MxLW93SExRLVZNcVEifQ.eyJqdGkiOiJJdlk0MWhNV3FxMmRvQlNVVXlwQWwiLCJpYXQiOjE2MjAyOTE4MjgsImV4cCI6MTYyMDI5NTQyOCwic2NvcGUiOiJvcmRlcjpyZWFkIiwiaXNzIjoiaHR0cHM6Ly9vaWRjMS5hdXRoaW5nLmNuL29pZGMiLCJhdWQiOiI2MDUwNzUxYWVkMGYyOWJmNzcyM2M3YTgiLCJhenAiOiI1ZjE3YTUyOWY2NGZiMDA5Yjc5NGEyZmYifQ.dTBBNwQQ7B-gnC3X1NBtk10dJ86nUZ7HlqcCzWTGd7qE0mDhEVmc2hqpySZpjfYuILurO1V73ZaAAcNNHoJqsV90OpSYRIWzJWyHD0u4fDEdbXgP7irYbGaeNz3uPrPzFKYrVwS024KSbURjMRDQZPPNSsdWg3AoYVNz7eXYFfu9BdBU2zdQzxv7XdA_TRa6gJjFDbVJxfHhkwPZ1deTyUj9r9Tct5usb55QuUeVHrKTg91iL77yPgEvQQQoffeCEbtDnLJblx-25rbTYzSfFWuohG7uKpjJsHUjaMn6GjH1bLOgp-pFdoP7Zdc3kamvdobCKqHH2o29-R9lTjXbkg",
    "expires_in": 3600,
    "token_type": "Bearer",
    "scope": "order:read",
    "rejected_scope": ""
}
```

详情请查看[文档](/reference/sdk-for-node/authentication/StandardProtocol.html#client-credentials-模式获取-access-token)。
