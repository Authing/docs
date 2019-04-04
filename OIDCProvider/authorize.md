# OIDC 使用教程
## 术语
End-User 使用你的 Vue、React 应用前端的人

RP（Relying-Party） 你的服务器后端

AP（Authentication Provider） Authing 服务器
## 在 Authing 创建一个应用 A

## 在 A 应用第三方登录选项卡下创建 OIDC 应用
需要填写一些 OIDC 配置项，包括 token 获取方式，二级域名设置，启用授权模式，回调 url

此时 A 应用中的用户数据已经可以通过 OIDC 协议访问。

## Authorization Code Flow（授权码模式）
## 发起授权
End-User 发出 GET 请求，通过 query 的形式携带参数。（End-User 可以先 GET RP 下某个路由，然后 RP 返回 302，带上所需参数）其中 testapp 是你在控制台配置的 OIDC 应用二级域名。
```
GET http://testapp.authing.cn/oauth/oidc/auth?client_id=5c9b079883e333d55a101082&redirect_uri=http://www.example.cn/example&scope=openid profile&response_type=code&state=jacket
```
| 参数名 | 意义 |
| ----- | --- |
| client_id | OIDC 应用的 **app_id** |
| redirect_uri | 在控制台配置的 OIDC 回调 url 其中的一个值 |
| scope | 需要请求的权限 |
| response_type | OIDC 模式，可以为 code, id_token, id_token token, code id_token, code token, code id_token token [参考 OIDC 规范](https://openid.net/specs/openid-connect-core-1_0.html#AuthorizationExamples)|
| state | 一个随机字符串，用于防范 CSRF 攻击，如果 response 中的 state 值和发送请求之前设置的 state 值不同，说明受到攻击 |

## 用户登录
上一个 GET 请求，Authing 服务器会返回 302。End-User 会被重定向到 Authing 提供的登录框页面（Authing Guard）。此时 End-User 需要输入他的用户名密码，或者扫码登录。

以下部分由 Authing Guard 封装完成，这里只是讲一下原理

如果成功，AP 会返回一个登录凭证 token。End-User 会携带这个 token

```
POST http://testapp.authing.cn/oauth/oidc/interaction/5f322954-35db-45f5-956d-ae0cf4cfc2c8/login
```

获取权限列表，并进入确权界面。

End-User 此时会看到第三方要获取那些自己的个人信息，然后点击确认授权

之后 End-User 会被 Authing Guard 跳转到 redirect_uri，并且携带 code 参数

## 换取 token

如果你在控制台配置 OIDC 时，换取 token 方式设置的为 client_secret_post 

那么 RP 相关路由接收到 code 后，需要
```
POST http://testapp.authing.cn/oauth/oidc/token
```

Content-Type 需为 application/x-www-form-urlencoded

body 部分携带参数如下表

| 参数名 | 意义 |
| ----- | --- |
| client_id | OIDC 应用的 **app_id** |
| client_secret | OIDC 应用的 **app_secret** |
| grant_type | authorization_code |
| state | 一个随机字符串，用于防范 CSRF 攻击，如果 response 中的 state 值和发送请求之前设置的 state 值不同，说明受到攻击 |

返回示例
```json
{
    "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InIxTGtiQm8zOTI1UmIyWkZGckt5VTNNVmV4OVQyODE3S3gwdmJpNmlfS2MifQ.eyJqdGkiOiJFaV8wV3dWc0NUOFNBTVowUk9DaVkiLCJzdWIiOiI1Yzk1ZWJiMDVkY2EyMmJhNmYxNDgyZGUiLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjU1NTYiLCJpYXQiOjE1NTM4MzQxNjMsImV4cCI6MTU1MzgzNzc2Mywic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSIsImF1ZCI6IjVjOWIwNzk4ODNlMzMzZDU1YTEwMTA4MiJ9.c8xsXbvQm5gmDK0c9FmONa67mv2_dVHN3tNNim264Xxzr58NquEfOWXUjwSE-jA9WxPdG1V7yU4uo2J3SYOCOtJEfuK3DCHMletTOJ-gvv0WTqwL1V1g8F1i83ay2cmUY8PjLX0KeOIHvHG-rSfYAzCZlYI8LkmLgzBkOFDHoOfbqsY-Ax5SfzsJwtjet1Sn64rrQZsYYAtCZR64vUdJoYesDHr8HUhlMRS1sZ-PEH28iCGK41cpdrd5VaeBGAEOaWDFdWFuNKAhw3p8coZAdbk3EhQI7rugYrLv2iKd6MIq618HEcvoJhba4-eOBWYdVWMRyx6jSa-BCrqA5IGxsQ",
    "expires_in": 3600,
    "id_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InIxTGtiQm8zOTI1UmIyWkZGckt5VTNNVmV4OVQyODE3S3gwdmJpNmlfS2MifQ.eyJzdWIiOiI1Yzk1ZWJiMDVkY2EyMmJhNmYxNDgyZGUiLCJhdF9oYXNoIjoiVkRkOFpIUDV1Ni1iZWI2eTNTbE1UdyIsInNpZCI6Ijk2Y2U2OTBhLTllMGQtNGE2Zi05MjFkLTI1MTlmMDkwOTEyNyIsImF1ZCI6IjVjOWIwNzk4ODNlMzMzZDU1YTEwMTA4MiIsImV4cCI6MTU1MzgzNzc2MywiaWF0IjoxNTUzODM0MTYzLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjU1NTYifQ.FmuUikuBnGUvqfmUeSwdxIbGDl5zOjVmCUuxp_bYgI9CMqFwcNGhQDb1RDQAztF_x9okRIXJgrUA9oz2trYGvOykyfkiRkKM7F_L4fR_UiI1PbQCKd3pZtfcKhJK8iAUh86LTnWxhmQ6FaUzDhGL8h6DMh5XufA_YDWm61ZBzcIIneKv2NwvSZ_dBHOh8AWtrriboakvzTxjEYyDjdJy42p5JQAXnWNmIvod9vKvMRr6CA3tMBUtd1zVVJDncRqVsP5xltglACL4KTPrAoRI1E37zOQfOyJkU8_duCsQS0zxv4S8q9N9DFYmtoTwaCP3SCtIw-UMJLgmVKIRs6VBuw",
    "scope": "openid profile",
    "token_type": "Bearer"
}
```
其他方式参见 [OIDC 规范](https://openid.net/specs/openid-connect-core-1_0.html#ClientAuthentication)

## token 换取用户信息
RP 可以使用 token 换取用户信息。根据当初 scope 的不同，这里的返回信息也会有所不同。全部按照 [OIDC 规范](https://openid.net/specs/openid-connect-core-1_0.html#AuthorizationExamples)返回字段。

```
GET http://users.authing.cn/oauth/oidc/user/userinfo?access_token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InIxTGtiQm8zOTI1UmIyWkZGckt5VTNNVmV4OVQyODE3S3gwdmJpNmlfS2MifQ.eyJqdGkiOiJ3TU9FTHQ0NzhrNG53U295M21rZWsiLCJzdWIiOiI1YzlmNzVjN2NjZjg3YjA1YTkyMWU5YjAiLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjU1NTYiLCJpYXQiOjE1NTQyNzI2NDAsImV4cCI6MTU1NDI3NjI0MCwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSIsImF1ZCI6IjVjYTQ0ZmMyMzNiYjcyMDY0MmVjZmQ2NiJ9.rmrxj9Vqt-E-61wRezYwn3NbezL4EmWcb_-OUGI9Y_TfiVcKnDYEbwC0M51qTcDBHn27-4BBoo60gu8OGKQJdmSKRApkJ4Z550eUrFAWxXztvy76EWtjmAmOD41GAu_EzNB5MAPZAEsX8I3kOan6Ylv_GonrHuzOL-GV3qb0R_COuCb7xVKKG4vyaJxWLq_bfA9E1VqKIkbg484GJKDy6Cfa_iIlurE6sLMhhFL1ycYpzMvX8ELEpgzOzMWL9U9gtNhPad9PK1h3dAHJjFvXYr9veIYOzjPwEy5eIkBZvqH8Gp4iV1v4sM6oWZefeoaN2cmeYkDWOk-mpiqAzyhw6g
```

返回示例
```json
{
  "sub": "<用户在 Authing 的唯一标识>",
  "nickname": "Authing",
  "name": "张三",
  "locale": "en-US",
}
```