# OIDC 授权流程

本文档将引导你结合 Authing 实现 OIDC 授权。

## 术语

1. `End-User`：终端用户，也可以理解为使用你软件的人
2. `RP（Relying-Party）`：服务器后端
3. `AP（Authentication Provider）`： Authing 服务器

P.S. 文档中出现的 `testapp.authing.cn` 和 `example.authing.cn` 两个域名是可以在控制台配置的二级域名。

## 在 Authing 创建一个应用

使用 OIDC 需要先[注册一个 Authing 账号](https://authing.cn/login)并[新建一个应用](http://docs.authing.cn/#/quick_start/howto?id=%E6%96%B0%E5%BB%BA%E4%B8%80%E4%B8%AA%E5%BA%94%E7%94%A8)。

## 创建 OIDC 应用

在完成了 Authing 应用的创建后相当于你拥有了一个用户池，接下来需要创建一个 OIDC 应用，这样你可以在其他第三方软件中读取用户池中的用户数据。

创建方式很简单，首先进入到刚刚创建好的 Authing 应用中，选择「第三方登录选项卡」，如下图所示：

![点击第三方登录选项卡](https://usercontents.authing.cn/docs/oidc/third-party.png)

接着选择「OIDC 应用」，点击「创建 OIDC 应用」，如下图所示：

![https://usercontents.authing.cn/docs/oidc/new.png](https://usercontents.authing.cn/docs/oidc/new.png)

在弹出的模态框中输入 OIDC 应用的基础信息，如下图所示：

![https://usercontents.authing.cn/docs/oidc/form.png](https://usercontents.authing.cn/docs/oidc/form.png)

**参数解释：**

这些参数解释假设你有 OIDC 的背景知识，如果你还不拥有背景知识，请[参考这篇文章了解 OIDC 的授权流程](https://www.cnblogs.com/linianhui/archive/2017/05/30/openid-connect-core.html)。

1. `应用 Logo`：应用的 Logo，用户登录时会在登录窗口中看到;
2. `应用名`：应用的名称，用户登录时会在登录窗口中看到；
3. `认证地址`：输入一个二级域名，作为终端用户进行登录的地址；
4. `回调 URL`：用户验证通过后回调的地址，在 OIDC 中必须使用 HTTPS，并且不可以为 localhost。这个值可以为多个，如需要多个，请用英文状态下的分号分割；
5. `返回类型`：指示该 OIDC 应用支持什么样的返回类型，不同返回类型的区别请参考：[不同返回类型对应的授权流程](https://doc.authing.cn/#/OIDCProvider/OIDCFeatures?id=%E4%B8%8D%E5%90%8C-response_type-%E5%AF%B9%E5%BA%94%E7%9A%84%E6%8E%88%E6%9D%83%E6%B5%81%E7%A8%8B)；
6. `token 换取方式`：指示换取 token 的方式，通常使用默认选项即可；
7. `id_token 签名算法`：签发 id_token 时的算法，如选择第一项则可以使用 OIDC 应用的 secret 验证 id_token 的合法性，其他请参考[验证 id_token 合法性]()。

填写完参数后就可以点击「确定」完成创建了，此时可以在详细信息中看到 secret 等值。

## OIDC 的基本流程

1. 用户执行登录
2. 登录成功后回调到开发者配置好的 redirect_uri 中并附带参数
3. 如果返回类型是 code，那么开发者需要在后端使用 code 和 secret（用户创建完 OIDC 应用后会得到）换取 access_token
4. 如果返回类型是 id_token token，那么在用户登录成功后的回调 URI 中会直接附带 id_token 和 access_token
5. 使用 access_token 可以换取用户信息（userInfo）

如果你想直观的体验 OIDC 认证流程，请[点击这里查看我们提供的示例](http://oidc-test.authing.cn)或[点击这里可视化的理解 OIDC](https://openidconnect.net/)。

## 使用授权码模式进行授权（Authorization Code Flow）

这个小节介绍如何使用 code （response_type 为 code）换取 access_token（access_token 可用来换取用户信息）。

### 发起授权

发起授权需要拼接一个用来授权的 URL，具体参数如下：

| 参数名 | 意义 |
| ----- | --- |
| client_id | OIDC 应用的 **app_id** |
| redirect_uri | 在控制台配置的 OIDC 回调 url 其中的一个值 |
| scope | 需要请求的权限，如果需要获取 email 和手机号需要有 phone email [参考 scope 表格](/OIDCProvider/OIDCFeatures.md) |
| response_type | OIDC 模式，可以为 code, id_token, id_token token, code id_token, code token, code id_token token [参考 OIDC 规范](https://openid.net/specs/openid-connect-core-1_0.html#AuthorizationExamples)|
| prompt | 可以为 none，login，consent 或 select_account，指定 AP 与 End-User 的交互方式，如需 refresh_token，必须为 consent [参考 OIDC 规范](https://openid.net/specs/openid-connect-core-1_0.html#AuthRequest) |
| state | 一个随机字符串，用于防范 CSRF 攻击，如果 response 中的 state 值和发送请求之前设置的 state 值不同，说明受到攻击 |
| nonce | 一个随机字符串，用于防范 Replay 攻击 |

假设你创建了一个域名为 `testapp` 的 OIDC 应用，那么授权网址是：

```
GET https://testapp.authing.cn/oauth/oidc/auth?client_id=5c9b079883e333d55a101082&redirect_uri=https://www.example.cn/example&scope=openid profile&response_type=code&state=jacket
```

### 用户登录

上一个请求验证通过后会重定向到 Authing 提供的登录框页面，此时用户需要输入他的用户名和密码进行登录。

此时 Authing 会验证此用户是否合法，如果合法则会跳到用户配置好的 redirect_uri 中并附带 code 参数。

### 使用 code 换取 token

如果你在控制台配置 OIDC 时，换取 token 方式设置的为 `client_secret_post`，那么按照下面第一种方法换取 token：

```
POST https://testapp.authing.cn/oauth/oidc/token
```

body 参数

| 参数名        | 意义                                      |
| ------------- | ----------------------------------------- |
| client_id     | OIDC 应用的 **app_id**                    |
| client_secret | OIDC 应用的 **app_secret**                |
| code          | 授权码，从 redirect_uri 中可直接读取                            |
| redirect_uri  | 在控制台配置的 OIDC 回调 url 其中的一个值 |
| grant_type    | 授权类型，此处填写为 authorization_code       |

如果你在控制台配置 OIDC 时，换取 token 方式设置的为 `client_secret_basic`，那么按照下面这种方法换取 token

> P.S. `client_secret_basic` 是使用 HTTP Basic authentication 模式进行认证。

```
POST https://testapp.authing.cn/oauth/oidc/token
```

**请求头**

```
Content-Type: application/x-www-form-urlencoded
Authorization: Basic NWNhNzY1ZTM5MzE5NGQ1ODkxZGIxOTI3OmJmNGQ0ZTI4ZTg4NWQ4NjBlZWM5YmIzNzEwYjAyMDY1
```

其中 `Basic<空格>` 后的值为 `code` 的值。

**body 参数**

| 参数名       | 意义                                      |
| ------------ | ----------------------------------------- |
| code         | 授权码                                    |
| redirect_uri | 在控制台配置的 OIDC 回调 url 其中的一个值 |
| grant_type   | 授权类型，此处填写 authorization_code       |

**其他方式**

如果你想了解其他换取 Token 的方式，请[参考 OIDC 规范](https://openid.net/specs/openid-connect-core-1_0.html#ClientAuthentication)。

### 返回示例

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

### 验证 access_token 和 id_token 的合法性

OIDC 默认使用 OIDC 应用的 secret 对 token 进行验证（也就是在创建应用时默认选择 `HS256` 算法）。

如果你使用 `javascript` 那么可以使用 jsonwebtoken 进行验证：

``` javascript
const jwt = require('jsonwebtoken');
let decoded = jwt.verify(token, <appSecret>);
```

如果是其他语言，那么你在服务端需要用 app_secret 作为 HS256 签名参数来计算签名和 JWT 中的签名进行对比，伪代码如下：
```
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  "1133fd20c14e4cc29b6ecb71fb8eb952"// app_secret
)
```

如果是 RS256 等非对称加密算法，需要使用公钥验证签名。Authing 将使用私钥进行签名，请使用 Authing 的公钥来验证签名：

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

#### 参考链接

1. jwks [参考规范](https://openid.net/specs/openid-connect-registration-1_0.html#ClientMetadata)
2. 可以检验 jwt 的签名的 playground：https://jwt.io
3. RSA 的 pem 格式 与 jwk 格式互转：https://8gwifi.org/jwkconvertfunctions.jsp
4. 生成 jwk：https://mkjwk.org/


## 使用 access_token 换取用户信息

开发者在自己的服务中可以使用 access_token 换取用户信息。根据 scope 的不同，这里的返回信息也会有所不同，字段符合 [OIDC 规范](https://openid.net/specs/openid-connect-core-1_0.html#AuthorizationExamples)，字段解释请参考[用户信息字段含义](https://docs.authing.cn/#/OIDCProvider/OIDCFeatures?id=%E7%94%A8%E6%88%B7%E4%BF%A1%E6%81%AF%E5%AD%97%E6%AE%B5%E5%90%AB%E4%B9%89)。

**请求链接**：

```
GET https://users.authing.cn/oauth/oidc/user/userinfo?access_token=<access_token>
```

**返回示例**：

```json
{
  "sub": "<用户在 Authing 的唯一标识>",
  "nickname": "Authing",
  "name": "张三",
  "locale": "en-US"
}
```

更多字段解释请参考[用户信息字段含义](https://docs.authing.cn/#/OIDCProvider/OIDCFeatures?id=%E7%94%A8%E6%88%B7%E4%BF%A1%E6%81%AF%E5%AD%97%E6%AE%B5%E5%90%AB%E4%B9%89)。

## 刷新 token

刷新 token 请使用 token 接口返回的 refresh_token.

**请求链接**：

```
POST https://example.authing.cn/oauth/oidc/token
```

其中 `Content-Type` 需为 `application/x-www-form-urlencoded`

**body 部分携带参数如下表**：

| 参数名        | 意义                                                                    |
| ------------- | ----------------------------------------------------------------------- |
| client_id     | OIDC 应用的 **app_id**                                                  |
| client_secret | OIDC 应用的 **app_secret**                                              |
| grant_type    | refresh_token                                                           |
| refresh_token | code 换 token 接口返回的 refresh_token。例：WPsGJbvpBjqXz6IJIr1UHKyrdVF |

**返回示例**：

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

## 使用隐式流程（Implicit Flow）

隐式流程将不获取 code，直接在回调地址中附带 `access_token` 和 `id_token`。

### 发起授权

发起授权需要拼接一个用来授权的 URL，具体参数如下：

| 参数名        | 意义                                                                                                                                                               |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| client_id     | OIDC 应用的 **app_id**                                                                                                                                             |
| redirect_uri  | 在控制台配置的 OIDC 回调 url 其中的一个值。启用隐式模式时，**控制台配置的所有** redirect_uri 必须都为 https 协议                                                   |
| scope         | 需要请求的权限                                                                                                                                                     |
| response_type | OIDC 模式，可以为 id_token, id_token token [参考 OIDC 规范](https://openid.net/specs/openid-connect-core-1_0.html#AuthorizationExamples)                           |
| prompt        | 可以为 none，login，consent 或 select_account，指定 AP 与 End-User 的交互方式。[参考 OIDC 规范](https://openid.net/specs/openid-connect-core-1_0.html#AuthRequest) |
| state         | 一个随机字符串，用于防范 CSRF 攻击，如果 response 中的 state 值和发送请求之前设置的 state 值不同，说明受到攻击                                                     |
| nonce         | 一个随机字符串，用于防范 Replay 攻击，implicit 模式下必须填                                                                                                        |

假设你创建了一个域名为 `example` 的 OIDC 应用，那么授权网址是：

```
GET https://example.authing.cn/oauth/oidc/auth?client_id=5ca765e393194d5891db1927&redirect_uri=https://example.com&scope=openid profile&response_type=id_token token&state=jazz&nonce=1831289
```


### 获取 id_token 和 access_token

id_token、access_token 会以 url **hash** 的形式传递，跳转后链接示例：

```
https://example.com/#code=_~BbC5~NQ0L1JfcTHnxgPYByuA3&id_token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InIxTGtiQm8zOTI1UmIyWkZGckt5VTNNVmV4OVQyODE3S3gwdmJpNmlfS2MifQ.eyJzdWIiOiI1YzlmNzVjN2NjZjg3YjA1YTkyMWU5YjAiLCJub25jZSI6IjE4MzEyODkiLCJzaWQiOiIxOTdlOGExMy0wMzE4LTRkZDEtYjQ3Mi0xZjI0MDk5ZTUzOWYiLCJhdF9oYXNoIjoiZTZTajJuU3JZSXdzV0hVZzJKb1hxUSIsImNfaGFzaCI6ImoxTFlQMEsyNHhaWEc5XzdQWHJjV1EiLCJzX2hhc2giOiJ3d0gzV3JVdm9IYklKeU1lWVR1OGx3IiwiYXVkIjoiNWNhNzY1ZTM5MzE5NGQ1ODkxZGIxOTI3IiwiZXhwIjoxNTU0NTQ2MTkxLCJpYXQiOjE1NTQ1NDI1OTEsImlzcyI6Imh0dHBzOi8vYXV0aGluZy5jbiJ9.AijNpK9yJD2jWBmfdMjSKjNkN3R4gN6gUuldHzt1EsW_NtFreklEzNwLyK5rF1zeijQRCyu7gRNyWDoihLTJFz6KHvt3ZwkvhWYCo6F8Ek86rk7GxQBkIsoBj7X9Z_BdJGahsiLJiK5CuSqH60iu7OdDlcXF_PjvcR_9HapB2NozF9SjhImmux9B64FYzEDCuY5Zw_AgpztKJmzPB-FSssSGCPqJ-sgmuIb9x6_fuajxpk9mm6PnstnlOHkN4ImatLnWtN1s69HMrz5RjC6GNd4A3-0QSrwmHqlq3KxEwQ4vo6Mv21gqcb4Z3QOoTU3WUmTlmWVc_W7hCngECEkznQ&access_token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InIxTGtiQm8zOTI1UmIyWkZGckt5VTNNVmV4OVQyODE3S3gwdmJpNmlfS2MifQ.eyJqdGkiOiJ5bWt2dW5MRERoMjRNTVp2dG1Xc3oiLCJzdWIiOiI1YzlmNzVjN2NjZjg3YjA1YTkyMWU5YjAiLCJpc3MiOiJodHRwczovL2F1dGhpbmcuY24iLCJpYXQiOjE1NTQ1NDI1OTEsImV4cCI6MTU1NDU0NjE5MSwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSIsImF1ZCI6IjVjYTc2NWUzOTMxOTRkNTg5MWRiMTkyNyJ9.Q3aTiM4Pzu5czVE0nyHB_Jazrn-nmMcli0JRLm1_7wjp4LZmvd_1zZY4503mR3YWtUG0ApVlC15yFwRuJjDCXG1bl4gCBFSDC46Nb2Mq7d2Njp04CfekC8uYllI1RDJccA-6kKtI9pZjEnfmtMa3xw_YjNgVQ1bQ5HtfikWxwwQwcEW1owBME6DWTW4GD1c1l_9OOfHubTIiT8d-SX-95XbHo9BTVPRaX9oL_GyX5bBBtmtnXj3U648TER_yhENmnSVlvhCW7P_H_Yqb4erAXUPwtaE7kvqF07qL2POsG6PljE6qNPBnXyUZyPRLyrokE0E916IB8e2mn_AWkMip3w&expires_in=3600&token_type=Bearer&state=jazz&session_state=938739ce36795eb334cf3c93d7e9d48a16616aa291ad3ed38671fe2fc4a9e4f6
```

换取用户信息的流程和授权码模式相同。

## 使用混合模式（Hybrid Flow）

隐式流程将不获取 code，直接在回调地址中附带 `code`、`access_token` 和 `id_token`，且都以 URL **Hash** 的形式传递。

### 发起授权

发起授权需要拼接一个用来授权的 URL，具体参数如下：

| 参数名        | 意义                                                                                                                                                               |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| client_id     | OIDC 应用的 **app_id**                                                                                                                                             |
| redirect_uri  | 在控制台配置的 OIDC 回调 url 其中的一个值。启用隐式模式时，**控制台配置的所有** redirect_uri 必须都为 https 协议                                                   |
| scope         | 需要请求的权限                                                                                                                                                     |
| response_type | OIDC 模式，此处为 code id_token token [参考 OIDC 规范](https://openid.net/specs/openid-connect-core-1_0.html#AuthorizationExamples)                           |
| prompt        | 可以为 none，login，consent 或 select_account，指定 AP 与 End-User 的交互方式。[参考 OIDC 规范](https://openid.net/specs/openid-connect-core-1_0.html#AuthRequest) |
| state         | 一个随机字符串，用于防范 CSRF 攻击，如果 response 中的 state 值和发送请求之前设置的 state 值不同，说明受到攻击                                                     |
| nonce         | 一个随机字符串，用于防范 Replay 攻击，混合模式下必填                                                                                                        |

假设你创建了一个域名为 `example` 的 OIDC 应用，那么授权网址是：

```
GET https://example.authing.cn/oauth/oidc/auth?client_id=5ca765e393194d5891db1927&redirect_uri=https://example.com&scope=openid profile&response_type=code id_token token&state=jazz&nonce=1831289
```

跳转后链接示例：

```
https://example.com/#code=pIY83Jl_bcerNN9Wt57Sq0TAjTr&id_token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InIxTGtiQm8zOTI1UmIyWkZGckt5VTNNVmV4OVQyODE3S3gwdmJpNmlfS2MifQ.eyJzdWIiOiI1YzlmNzVjN2NjZjg3YjA1YTkyMWU5YjAiLCJub25jZSI6IjE4MzEyODkiLCJzaWQiOiIxOTdlOGExMy0wMzE4LTRkZDEtYjQ3Mi0xZjI0MDk5ZTUzOWYiLCJhdF9oYXNoIjoiUFlXaTFER29jRlotYmlYd0d5WXlpZyIsImNfaGFzaCI6Ik4yUmkyUFpidktYdXRmdGhZbUhrM2ciLCJzX2hhc2giOiJ3d0gzV3JVdm9IYklKeU1lWVR1OGx3IiwiYXVkIjoiNWNhNzY1ZTM5MzE5NGQ1ODkxZGIxOTI3IiwiZXhwIjoxNTU0NjE1NjcyLCJpYXQiOjE1NTQ2MTIwNzIsImlzcyI6Imh0dHBzOi8vYXV0aGluZy5jbiJ9.a--JC_6CyUi0Z7z3DCKT51wJkKT7MmtlVHhrNujhxHCfgQqzqS3wMxVj6oEe_cfjVQNgJ-Xe1oiL8uMAxVN-cM1Ra1JQcavUujua2IxxtG4Nkh84rTukqsrPfuNhNO7MRP6Fa9qIIdKeKkQKyh1zBKE6322zK_ECdfGd2sWdqqXiQyJXg6ODhPZDidsGuluV3bZiAY3brMSMmh6QC99StOP5ZwSKtlRMyYE3MIRWsQ4W2HkHBrk67T_scQ6XN6mdBKi2OZW-E7fXeyVwH-ibWDzlUpmFSaj3a-WbkDe3nfCv8MHj439aJNU-AXfIgLsckvCO5_dJOUWGHg6hemT9bw&access_token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InIxTGtiQm8zOTI1UmIyWkZGckt5VTNNVmV4OVQyODE3S3gwdmJpNmlfS2MifQ.eyJqdGkiOiIxUzgyaUtSdXFlWW1DUmFrMFl1S0kiLCJzdWIiOiI1YzlmNzVjN2NjZjg3YjA1YTkyMWU5YjAiLCJpc3MiOiJodHRwczovL2F1dGhpbmcuY24iLCJpYXQiOjE1NTQ2MTIwNzIsImV4cCI6MTU1NDYxNTY3Miwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSIsImF1ZCI6IjVjYTc2NWUzOTMxOTRkNTg5MWRiMTkyNyJ9.tHwxiH5QXXA46Y4mIwcBck3uDArMj5TMGEBAQ8Eeln6oFbwBY3aS5cSV6e3anZDwKZrdgrdFlyj9-Bl1T5V1rNJK-Xz_aFnM6XxyO1jSHcn-6KXGwmz68D50VIHior39cuoj9OXbNCei5RVghjh2cRT3SenYki7UeJBgmfQA6l2aZZpBrn9aphXr9OoPS47T59I0Ynn2yMIYIMDOX7hh8E5oV1hrK3hyjAvp3ghmzyRfj2BlG9rBo1hd_d5E8x6OIzNdvPKXwVASJZRxov2Dx0ma36zxzSObyXgCloUv2KlbmL9-Wj8d3H6FhHC75DLfJYx-uRgNqW7CFKGeRkPjkQ&expires_in=3600&token_type=Bearer&state=jazz&session_state=101666b6b70cfb4406ad9c0c906039de39776140e66e48acdb63ab8acb309701
```

换取用户信息的流程和授权码模式相同。
