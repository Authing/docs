

调用方需要向以下地址发送 POST 请求。

请求地址：`https://{AUTHING_APP_HOST}.authing.cn/oidc/token`

参数说明：

| 参数名        | 描述    |
| ------ | ------------- |
| grant_type    | 填写 client_credentials。  |
| client_id     | 编程访问账号 Key。    |
| client_secret | 编程访问账号 Secret。   |
| scope   | 请求的权限项目，每个权限项目的格式为 `资源标识符:操作` 以空格分隔。具体的 scope 请参考：https://docs.authing.cn/v2/guides/authorization/m2m-authz.html#scope-%E6%9D%83%E9%99%90%E9%A1%B9%E7%9B%AE%E8%A7%84%E8%8C%83 |


```bash
$ curl --request POST \
  --url https://core.authing.cn/oidc/token \
  --header 'Content-Type: application/x-www-form-urlencoded' \
  --data client_id=6050751aed0f29bf7723c7a8 \
  --data client_secret=2642d21bc1f21c9c03b11ca8ebf18486 \
  --data grant_type=client_credentials \
  --data 'scope=order:read'
```

响应结果：

```json
{
    "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlRmTE90M0xibjhfYThwUk11ZXNzYW1xai1vM0RCQ3MxLW93SExRLVZNcVEifQ.eyJqdGkiOiJJdlk0MWhNV3FxMmRvQlNVVXlwQWwiLCJpYXQiOjE2MjAyOTE4MjgsImV4cCI6MTYyMDI5NTQyOCwic2NvcGUiOiJvcmRlcjpyZWFkIiwiaXNzIjoiaHR0cHM6Ly9vaWRjMS5hdXRoaW5nLmNuL29pZGMiLCJhdWQiOiI2MDUwNzUxYWVkMGYyOWJmNzcyM2M3YTgiLCJhenAiOiI1ZjE3YTUyOWY2NGZiMDA5Yjc5NGEyZmYifQ.dTBBNwQQ7B-gnC3X1NBtk10dJ86nUZ7HlqcCzWTGd7qE0mDhEVmc2hqpySZpjfYuILurO1V73ZaAAcNNHoJqsV90OpSYRIWzJWyHD0u4fDEdbXgP7irYbGaeNz3uPrPzFKYrVwS024KSbURjMRDQZPPNSsdWg3AoYVNz7eXYFfu9BdBU2zdQzxv7XdA_TRa6gJjFDbVJxfHhkwPZ1deTyUj9r9Tct5usb55QuUeVHrKTg91iL77yPgEvQQQoffeCEbtDnLJblx-25rbTYzSfFWuohG7uKpjJsHUjaMn6GjH1bLOgp-pFdoP7Zdc3kamvdobCKqHH2o29-R9lTjXbkg",
    "expires_in": 3600,
    "token_type": "Bearer",
    "scope": "order:read",
    "rejected_scope": ""
}
```