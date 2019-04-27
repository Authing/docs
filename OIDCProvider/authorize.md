# OIDC 使用教程

## 术语

End-User 使用你的 Vue、React 应用前端的人

RP（Relying-Party） 你的服务器后端

AP（Authentication Provider） Authing 服务器

文中 testapp.authing.cn，example.authing.cn，testapp、example 是你在控制台配置的应用二级域名

## 在 Authing 创建一个应用 A
[如何创建应用？](http://docs.authing.cn/#/quick_start/howto?id=%E6%96%B0%E5%BB%BA%E4%B8%80%E4%B8%AA%E5%BA%94%E7%94%A8)
## 在 A 应用第三方登录选项卡下创建 OIDC 应用

需要填写一些 OIDC 配置项，包括 code 换 token 时的认证方式，二级域名设置，启用授权模式，回调 url
### 如何验证 access_token 签名，id_token 签名？
如果签名算法设置的是 HS256 等 Hash 类算法，那么 Authing 使用 OIDC 应用的 app_secret 当作 key 进行签名，RP 需要用 app_secret 作为 HS256 签名参数来计算签名和 JWT 中的签名进行对比
```
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  "1133fd20c14e4cc29b6ecb71fb8eb952"// app_secret
)
```
如果是 RS256 等非对称加密算法，需要使用公钥验证签名。你可以在创建 OIDC 应用时提供自己的 jwks_uri 或 jwks。如不提供，Authing 将使用默认的私钥进行签名，请使用 Authing 的公钥来验证签名
```
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxRijj2seoesv5K0Z+ymR
K7DSDPxdsM2sGQD2ZVhLjLsxZWJtXUXh7ERdUU6OT3BqYZZf7CLIhN6yyNtTOgfg
pLG9HVJd7ZSKzuy2dS7mo8jD8YRtptAJmNFqw6z8tQp5MNG1ZHqp9isKqJmx/CFY
kRdXBmjjj8PMVSP757pkC3jCq7fsi0drSSg4lIxrSsGzL0++Ra9Du71Qe/ODQKU0
brxaI1OKILtfcVPTHTaheV+0dw4eYkSDtyaLBG3jqsQbdncNg8PCEWchNzdO6aaj
Uq4wbOzy/Ctp399mz0SGKfuC5S8gqAFABFT3DH3UD21ZztQZwFEV2AlvF+bcGEst
cwIDAQAB
-----END PUBLIC KEY-----
```
jwks [参考规范](https://openid.net/specs/openid-connect-registration-1_0.html#ClientMetadata)

可以检验 jwt 的签名的 playground https://jwt.io

RSA 的 pem 格式 与 jwk 格式互转 https://8gwifi.org/jwkconvertfunctions.jsp

生成 jwk https://mkjwk.org/

### code 换 token 时的认证方式 —— POST 请求该怎么发？

**client_secret_basic**
使用 HTTP Basic authentication 模式进行认证

```
POST https://testapp.authing.cn/oauth/oidc/token
```

请求头

```
Content-Type: application/x-www-form-urlencoded
Authorization: Basic NWNhNzY1ZTM5MzE5NGQ1ODkxZGIxOTI3OmJmNGQ0ZTI4ZTg4NWQ4NjBlZWM5YmIzNzEwYjAyMDY1
```

其中 Basic<空格> 后面的一长串字符 = base64(&lt;client_id&gt;:&lt;client_secret&gt;)

上述示例字符串序列用 base64 解密之后为 5ca765e393194d5891db1927:bf4d4e28e885d860eec9bb3710b02065

body 参数

| 参数名       | 意义                                      |
| ------------ | ----------------------------------------- |
| code         | 授权码                                    |
| redirect_uri | 在控制台配置的 OIDC 回调 url 其中的一个值 |
| grant_type   | 授权类型，可以填 authorization_code       |

**client_secret_post**

```
POST https://testapp.authing.cn/oauth/oidc/token
```

body 参数

| 参数名        | 意义                                      |
| ------------- | ----------------------------------------- |
| client_id     | OIDC 应用的 **app_id**                    |
| client_secret | OIDC 应用的 **app_secret**                |
| code          | 授权码                                    |
| redirect_uri  | 在控制台配置的 OIDC 回调 url 其中的一个值 |
| grant_type    | 授权类型，可以填 authorization_code       |

**其他方式**

[参考 OIDC 规范](https://openid.net/specs/openid-connect-core-1_0.html#ClientAuthentication)

此时 A 应用中的用户数据已经可以通过 OIDC 协议访问。

## Authorization Code Flow（授权码模式）
本教程 code 换取 token 使用的方式是 client_secret_post，选用其他方式，code 换取 token 过程需要做对应调整
## 发起授权

| 参数名 | 意义 |
| ----- | --- |
| client_id | OIDC 应用的 **app_id** |
| redirect_uri | 在控制台配置的 OIDC 回调 url 其中的一个值 |
| scope | 需要请求的权限 |
| response_type | OIDC 模式，可以为 code, id_token, id_token token, code id_token, code token, code id_token token [参考 OIDC 规范](https://openid.net/specs/openid-connect-core-1_0.html#AuthorizationExamples)|
| prompt | 可以为 none，login，consent 或 select_account，指定 AP 与 End-User 的交互方式，如需 refresh_token，必须为 consent [参考 OIDC 规范](https://openid.net/specs/openid-connect-core-1_0.html#AuthRequest) |
| state | 一个随机字符串，用于防范 CSRF 攻击，如果 response 中的 state 值和发送请求之前设置的 state 值不同，说明受到攻击 |
| nonce | 一个随机字符串，用于防范 Replay 攻击 |

End-User 发出 GET 请求，通过 query 的形式携带参数。（End-User 可以先 GET RP 下某个路由，然后 RP 返回 302，带上所需参数）其中 testapp 是你在控制台配置的 OIDC 应用二级域名。

```
GET https://testapp.authing.cn/oauth/oidc/auth?client_id=5c9b079883e333d55a101082&redirect_uri=https://www.example.cn/example&scope=openid profile&response_type=code&state=jacket
```

## 用户登录

上一个 GET 请求，Authing 服务器会返回 302。End-User 会被重定向到 Authing 提供的登录框页面（Authing Guard）。此时 End-User 需要输入他的用户名密码，或者扫码登录。

以下部分由 Authing Guard 封装完成，这里只是讲一下原理

如果成功，AP 会返回一个登录凭证 token。End-User 会携带这个 token

```
POST https://testapp.authing.cn/oauth/oidc/interaction/5f322954-35db-45f5-956d-ae0cf4cfc2c8/login
```

获取权限列表，并进入确权界面。

End-User 此时会看到第三方要获取那些自己的个人信息，然后点击确认授权

之后 End-User 会被 Authing Guard 跳转到 redirect_uri，并且携带 code 参数

## 换取 token

如果你在控制台配置 OIDC 时，换取 token 方式设置的为 client_secret_post

那么 RP 相关路由接收到 code 后，需要

```
POST https://testapp.authing.cn/oauth/oidc/token
```

Content-Type 需为 application/x-www-form-urlencoded

body 部分携带参数如下表

| 参数名        | 意义                       |
| ------------- | -------------------------- |
| code          | 授权码                     |
| client_id     | OIDC 应用的 **app_id**     |
| client_secret | OIDC 应用的 **app_secret** |
| grant_type    | authorization_code         |
| redirect_uri  | 回调地址                   |

返回示例

```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InIxTGtiQm8zOTI1UmIyWkZGckt5VTNNVmV4OVQyODE3S3gwdmJpNmlfS2MifQ.eyJqdGkiOiJ4R01uczd5cmNFckxiakNRVW9US1MiLCJzdWIiOiI1YzlmNzVjN2NjZjg3YjA1YTkyMWU5YjAiLCJpc3MiOiJodHRwczovL2F1dGhpbmcuY24iLCJpYXQiOjE1NTQ1Mzc4NjksImV4cCI6MTU1NDU0MTQ2OSwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBvZmZsaW5lX2FjY2VzcyBwaG9uZSBlbWFpbCIsImF1ZCI6IjVjYTc2NWUzOTMxOTRkNTg5MWRiMTkyNyJ9.wX05OAgYuXeYM7zCxhrkvTO_taqxrCTG_L2ImDmQjMml6E3GXjYA9EFK0NfWquUI2mdSMAqohX-ndffN0fa5cChdcMJEm3XS9tt6-_zzhoOojK-q9MHF7huZg4O1587xhSofxs-KS7BeYxEHKn_10tAkjEIo9QtYUE7zD7JXwGUsvfMMjOqEVW6KuY3ZOmIq_ncKlB4jvbdrduxy1pbky_kvzHWlE9El_N5qveQXyuvNZVMSIEpw8_y5iSxPxKfrVwGY7hBaF40Oph-d2PO7AzKvxEVMamzLvMGBMaRAP_WttBPAUSqTU5uMXwMafryhGdIcQVsDPcGNgMX6E1jzLA",
  "expires_in": 3600,
  "id_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InIxTGtiQm8zOTI1UmIyWkZGckt5VTNNVmV4OVQyODE3S3gwdmJpNmlfS2MifQ.eyJzdWIiOiI1YzlmNzVjN2NjZjg3YjA1YTkyMWU5YjAiLCJub25jZSI6IjIyMTIxIiwiYXRfaGFzaCI6Ik5kbW9iZVBZOEFFaWQ2T216MzIyOXciLCJzaWQiOiI1ODM2NzllNC1lYWM5LTRjNDEtOGQxMS1jZWFkMmE5OWQzZWIiLCJhdWQiOiI1Y2E3NjVlMzkzMTk0ZDU4OTFkYjE5MjciLCJleHAiOjE1NTQ1NDE0NjksImlhdCI6MTU1NDUzNzg2OSwiaXNzIjoiaHR0cHM6Ly9hdXRoaW5nLmNuIn0.IQi5FRHO756e_eAmdAs3OnFMU7QuP-XtrbwCZC1gJntevYJTltEg1CLkG7eVhdi_g5MJV1c0pNZ_xHmwS0R-E4lAXcc1QveYKptnMroKpBWs5mXwoOiqbrjKEmLMaPgRzCOdLiSdoZuQNw_z-gVhFiMNxI055TyFJdXTNtExt1O3KmwqanPNUi6XyW43bUl29v_kAvKgiOB28f3I0fB4EsiZjxp1uxHQBaDeBMSPaRVWQJcIjAJ9JLgkaDt1j7HZ2a1daWZ4HPzifDuDfi6_Ob1ZL40tWEC7xdxHlCEWJ4pUIsDjvScdQsez9aV_xMwumw3X4tgUIxFOCNVEvr73Fg",
  "refresh_token": "WPsGJbvpBjqXz6IJIr1UHKyrdVF",
  "scope": "openid profile offline_access phone email",
  "token_type": "Bearer"
}
```

其他方式参见 [OIDC 规范](https://openid.net/specs/openid-connect-core-1_0.html#ClientAuthentication)

## token 换取用户信息

RP 可以使用 token 换取用户信息。根据当初 scope 的不同，这里的返回信息也会有所不同。全部按照 [OIDC 规范](https://openid.net/specs/openid-connect-core-1_0.html#AuthorizationExamples)返回字段。

```
GET https://users.authing.cn/oauth/oidc/user/userinfo?access_token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InIxTGtiQm8zOTI1UmIyWkZGckt5VTNNVmV4OVQyODE3S3gwdmJpNmlfS2MifQ.eyJqdGkiOiJ3TU9FTHQ0NzhrNG53U295M21rZWsiLCJzdWIiOiI1YzlmNzVjN2NjZjg3YjA1YTkyMWU5YjAiLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjU1NTYiLCJpYXQiOjE1NTQyNzI2NDAsImV4cCI6MTU1NDI3NjI0MCwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSIsImF1ZCI6IjVjYTQ0ZmMyMzNiYjcyMDY0MmVjZmQ2NiJ9.rmrxj9Vqt-E-61wRezYwn3NbezL4EmWcb_-OUGI9Y_TfiVcKnDYEbwC0M51qTcDBHn27-4BBoo60gu8OGKQJdmSKRApkJ4Z550eUrFAWxXztvy76EWtjmAmOD41GAu_EzNB5MAPZAEsX8I3kOan6Ylv_GonrHuzOL-GV3qb0R_COuCb7xVKKG4vyaJxWLq_bfA9E1VqKIkbg484GJKDy6Cfa_iIlurE6sLMhhFL1ycYpzMvX8ELEpgzOzMWL9U9gtNhPad9PK1h3dAHJjFvXYr9veIYOzjPwEy5eIkBZvqH8Gp4iV1v4sM6oWZefeoaN2cmeYkDWOk-mpiqAzyhw6g
```

返回示例

```json
{
  "sub": "<用户在 Authing 的唯一标识>",
  "nickname": "Authing",
  "name": "张三",
  "locale": "en-US"
}
```

## 刷新 token

可以利用 token 接口返回的 refresh_token，在后续刷新 token

```
POST https://example.authing.cn/oauth/oidc/token
```

Content-Type 需为 application/x-www-form-urlencoded

body 部分携带参数如下表

| 参数名        | 意义                                                                    |
| ------------- | ----------------------------------------------------------------------- |
| client_id     | OIDC 应用的 **app_id**                                                  |
| client_secret | OIDC 应用的 **app_secret**                                              |
| grant_type    | refresh_token                                                           |
| refresh_token | code 换 token 接口返回的 refresh_token。例：WPsGJbvpBjqXz6IJIr1UHKyrdVF |

返回示例

```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InIxTGtiQm8zOTI1UmIyWkZGckt5VTNNVmV4OVQyODE3S3gwdmJpNmlfS2MifQ.eyJqdGkiOiJ4MjlRNnIzWkpndVViWHB5RGR0ZVciLCJzdWIiOiI1YzlmNzVjN2NjZjg3YjA1YTkyMWU5YjAiLCJpc3MiOiJodHRwczovL2F1dGhpbmcuY24iLCJpYXQiOjE1NTQ2MTI0NjQsImV4cCI6MTU1NDYxNjA2NCwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBvZmZsaW5lX2FjY2VzcyBwaG9uZSBlbWFpbCIsImF1ZCI6IjVjYTc2NWUzOTMxOTRkNTg5MWRiMTkyNyJ9.VgrdtZRCbapS0hCe5BiV-8rUTXd4x-ZMoFPHV5Zh_HCw-OsJoYN0mVwB1UQ0ZkrA4ojpcZ3MrLnKzRC81BgEnfvaInTqXW8qP36TvR-vl7JkVT-ThkBr0Xdilk0hCfWaMbX9qtCjWYT0b9zxDAdkBKygjztZ74TwKbxNI83vdKSj9A6OfwX9MG4k-Q3ZbKAj1fwncBAp2DEsv1Bd_-4y_n_w-2QtbzZf3409UEotKuU_wGLoVE3DLxJFvEtmunbxQOkqxOGS_JaIvFdhpTZ6I3H_DC5KO8xOR2A6nZGFOhYOZZfnr6tmY_EnOIEsnp4glgTCOqHhd1xoBoDcnEmWEA",
  "expires_in": 3600,
  "id_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InIxTGtiQm8zOTI1UmIyWkZGckt5VTNNVmV4OVQyODE3S3gwdmJpNmlfS2MifQ.eyJzdWIiOiI1YzlmNzVjN2NjZjg3YjA1YTkyMWU5YjAiLCJub25jZSI6IjIyMTIxIiwiYXRfaGFzaCI6InVySTYzZ3hyeU01UzNqejRLMmpWeGciLCJzaWQiOiIxOTdlOGExMy0wMzE4LTRkZDEtYjQ3Mi0xZjI0MDk5ZTUzOWYiLCJhdWQiOiI1Y2E3NjVlMzkzMTk0ZDU4OTFkYjE5MjciLCJleHAiOjE1NTQ2MTYwNjQsImlhdCI6MTU1NDYxMjQ2NCwiaXNzIjoiaHR0cHM6Ly9hdXRoaW5nLmNuIn0.wh3kCIGyu7IHvkbqCeu9OHg9mdLg-wSbU-1UBLPcNxl5MeXsGxtxjPyM6aONxLt_ZXfBFNZM7FWfGpV_qGSNmeGp0UYV_bK-N0wgB5ZkTN1O4EMECqy7qCExwK3kjsOa-o0KkkJxxcDkfEJ3Icn2Nr3q5ozMz_3oGJWqSt0KxQaR_rCtjbLV6dIpPL1MTpWElORXjsoKb1RVOHF0Qpfq8iuGVJAw828tq4cyLH9-IkE9TGX2L6dWmPaY1xd0ho0N1mqnWJrqacljrvX8qPTfGAB9-9rDk2EvFrZkFY6O6bKlMqdyX4ktxYMlku4-H74wxOqkQ_ZWlI3SUG_m-DNDWg",
  "refresh_token": "wlfsGj5oSm5xmdUV_HqS9FTQpaj",
  "scope": "openid profile offline_access phone email",
  "token_type": "Bearer"
}
```

## Implicit Flow（隐式流程）

## 发起授权

```
GET https://example.authing.cn/oauth/oidc/auth?client_id=5ca765e393194d5891db1927&redirect_uri=https://example.com&scope=openid profile&response_type=id_token token&state=jazz&nonce=1831289
```

| 参数名        | 意义                                                                                                                                                               |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| client_id     | OIDC 应用的 **app_id**                                                                                                                                             |
| redirect_uri  | 在控制台配置的 OIDC 回调 url 其中的一个值。启用隐式模式时，**控制台配置的所有** redirect_uri 必须都为 https 协议                                                   |
| scope         | 需要请求的权限                                                                                                                                                     |
| response_type | OIDC 模式，可以为 id_token, id_token token [参考 OIDC 规范](https://openid.net/specs/openid-connect-core-1_0.html#AuthorizationExamples)                           |
| prompt        | 可以为 none，login，consent 或 select_account，指定 AP 与 End-User 的交互方式。[参考 OIDC 规范](https://openid.net/specs/openid-connect-core-1_0.html#AuthRequest) |
| state         | 一个随机字符串，用于防范 CSRF 攻击，如果 response 中的 state 值和发送请求之前设置的 state 值不同，说明受到攻击                                                     |
| nonce         | 一个随机字符串，用于防范 Replay 攻击，implicit 模式下必须填                                                                                                        |

## 直接跳转到 redirect_uri

id_token、access_token 会以 url **hash** 的形式传递

跳转后链接示例

```
https://example.com/#code=_~BbC5~NQ0L1JfcTHnxgPYByuA3&id_token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InIxTGtiQm8zOTI1UmIyWkZGckt5VTNNVmV4OVQyODE3S3gwdmJpNmlfS2MifQ.eyJzdWIiOiI1YzlmNzVjN2NjZjg3YjA1YTkyMWU5YjAiLCJub25jZSI6IjE4MzEyODkiLCJzaWQiOiIxOTdlOGExMy0wMzE4LTRkZDEtYjQ3Mi0xZjI0MDk5ZTUzOWYiLCJhdF9oYXNoIjoiZTZTajJuU3JZSXdzV0hVZzJKb1hxUSIsImNfaGFzaCI6ImoxTFlQMEsyNHhaWEc5XzdQWHJjV1EiLCJzX2hhc2giOiJ3d0gzV3JVdm9IYklKeU1lWVR1OGx3IiwiYXVkIjoiNWNhNzY1ZTM5MzE5NGQ1ODkxZGIxOTI3IiwiZXhwIjoxNTU0NTQ2MTkxLCJpYXQiOjE1NTQ1NDI1OTEsImlzcyI6Imh0dHBzOi8vYXV0aGluZy5jbiJ9.AijNpK9yJD2jWBmfdMjSKjNkN3R4gN6gUuldHzt1EsW_NtFreklEzNwLyK5rF1zeijQRCyu7gRNyWDoihLTJFz6KHvt3ZwkvhWYCo6F8Ek86rk7GxQBkIsoBj7X9Z_BdJGahsiLJiK5CuSqH60iu7OdDlcXF_PjvcR_9HapB2NozF9SjhImmux9B64FYzEDCuY5Zw_AgpztKJmzPB-FSssSGCPqJ-sgmuIb9x6_fuajxpk9mm6PnstnlOHkN4ImatLnWtN1s69HMrz5RjC6GNd4A3-0QSrwmHqlq3KxEwQ4vo6Mv21gqcb4Z3QOoTU3WUmTlmWVc_W7hCngECEkznQ&access_token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InIxTGtiQm8zOTI1UmIyWkZGckt5VTNNVmV4OVQyODE3S3gwdmJpNmlfS2MifQ.eyJqdGkiOiJ5bWt2dW5MRERoMjRNTVp2dG1Xc3oiLCJzdWIiOiI1YzlmNzVjN2NjZjg3YjA1YTkyMWU5YjAiLCJpc3MiOiJodHRwczovL2F1dGhpbmcuY24iLCJpYXQiOjE1NTQ1NDI1OTEsImV4cCI6MTU1NDU0NjE5MSwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSIsImF1ZCI6IjVjYTc2NWUzOTMxOTRkNTg5MWRiMTkyNyJ9.Q3aTiM4Pzu5czVE0nyHB_Jazrn-nmMcli0JRLm1_7wjp4LZmvd_1zZY4503mR3YWtUG0ApVlC15yFwRuJjDCXG1bl4gCBFSDC46Nb2Mq7d2Njp04CfekC8uYllI1RDJccA-6kKtI9pZjEnfmtMa3xw_YjNgVQ1bQ5HtfikWxwwQwcEW1owBME6DWTW4GD1c1l_9OOfHubTIiT8d-SX-95XbHo9BTVPRaX9oL_GyX5bBBtmtnXj3U648TER_yhENmnSVlvhCW7P_H_Yqb4erAXUPwtaE7kvqF07qL2POsG6PljE6qNPBnXyUZyPRLyrokE0E916IB8e2mn_AWkMip3w&expires_in=3600&token_type=Bearer&state=jazz&session_state=938739ce36795eb334cf3c93d7e9d48a16616aa291ad3ed38671fe2fc4a9e4f6
```

## Hybrid Flow（混合模式）

## 发起授权

```
GET https://example.authing.cn/oauth/oidc/auth?client_id=5ca765e393194d5891db1927&redirect_uri=https://example.com&scope=openid profile&response_type=id_token token&state=jazz&nonce=1831289
```

混合模式下，code id_token、access_token 会以 url **hash** 的形式传递

跳转后链接示例

```
https://example.com/#code=pIY83Jl_bcerNN9Wt57Sq0TAjTr&id_token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InIxTGtiQm8zOTI1UmIyWkZGckt5VTNNVmV4OVQyODE3S3gwdmJpNmlfS2MifQ.eyJzdWIiOiI1YzlmNzVjN2NjZjg3YjA1YTkyMWU5YjAiLCJub25jZSI6IjE4MzEyODkiLCJzaWQiOiIxOTdlOGExMy0wMzE4LTRkZDEtYjQ3Mi0xZjI0MDk5ZTUzOWYiLCJhdF9oYXNoIjoiUFlXaTFER29jRlotYmlYd0d5WXlpZyIsImNfaGFzaCI6Ik4yUmkyUFpidktYdXRmdGhZbUhrM2ciLCJzX2hhc2giOiJ3d0gzV3JVdm9IYklKeU1lWVR1OGx3IiwiYXVkIjoiNWNhNzY1ZTM5MzE5NGQ1ODkxZGIxOTI3IiwiZXhwIjoxNTU0NjE1NjcyLCJpYXQiOjE1NTQ2MTIwNzIsImlzcyI6Imh0dHBzOi8vYXV0aGluZy5jbiJ9.a--JC_6CyUi0Z7z3DCKT51wJkKT7MmtlVHhrNujhxHCfgQqzqS3wMxVj6oEe_cfjVQNgJ-Xe1oiL8uMAxVN-cM1Ra1JQcavUujua2IxxtG4Nkh84rTukqsrPfuNhNO7MRP6Fa9qIIdKeKkQKyh1zBKE6322zK_ECdfGd2sWdqqXiQyJXg6ODhPZDidsGuluV3bZiAY3brMSMmh6QC99StOP5ZwSKtlRMyYE3MIRWsQ4W2HkHBrk67T_scQ6XN6mdBKi2OZW-E7fXeyVwH-ibWDzlUpmFSaj3a-WbkDe3nfCv8MHj439aJNU-AXfIgLsckvCO5_dJOUWGHg6hemT9bw&access_token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InIxTGtiQm8zOTI1UmIyWkZGckt5VTNNVmV4OVQyODE3S3gwdmJpNmlfS2MifQ.eyJqdGkiOiIxUzgyaUtSdXFlWW1DUmFrMFl1S0kiLCJzdWIiOiI1YzlmNzVjN2NjZjg3YjA1YTkyMWU5YjAiLCJpc3MiOiJodHRwczovL2F1dGhpbmcuY24iLCJpYXQiOjE1NTQ2MTIwNzIsImV4cCI6MTU1NDYxNTY3Miwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSIsImF1ZCI6IjVjYTc2NWUzOTMxOTRkNTg5MWRiMTkyNyJ9.tHwxiH5QXXA46Y4mIwcBck3uDArMj5TMGEBAQ8Eeln6oFbwBY3aS5cSV6e3anZDwKZrdgrdFlyj9-Bl1T5V1rNJK-Xz_aFnM6XxyO1jSHcn-6KXGwmz68D50VIHior39cuoj9OXbNCei5RVghjh2cRT3SenYki7UeJBgmfQA6l2aZZpBrn9aphXr9OoPS47T59I0Ynn2yMIYIMDOX7hh8E5oV1hrK3hyjAvp3ghmzyRfj2BlG9rBo1hd_d5E8x6OIzNdvPKXwVASJZRxov2Dx0ma36zxzSObyXgCloUv2KlbmL9-Wj8d3H6FhHC75DLfJYx-uRgNqW7CFKGeRkPjkQ&expires_in=3600&token_type=Bearer&state=jazz&session_state=101666b6b70cfb4406ad9c0c906039de39776140e66e48acdb63ab8acb309701
```
