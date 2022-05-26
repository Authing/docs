# 标准协议认证模块

<LastUpdated/>

此模块包含 OIDC、OAuth 2.0、SAML、CAS 标准协议的认证、获取令牌、检查令牌、登出等方法。其中发起认证的方法需要在前端使用，获取令牌、检查令牌等方法需要在后端使用。

使用方法：

```javascript
import { AuthenticationClient } from 'authing-js-sdk';
const authenticationClient = new AuthenticationClient({
  appId: '应用 ID',
  secret: '应用密钥',
  appHost: 'https://{YOUR_DOMAIN}.authing.cn',
  protocol: 'oidc',
});
authenticationClient.buildAuthorizeUrl; // 构造前端登录链接
authenticationClient.getAccessTokenByCode; // Code 换 Token
authenticationClient.getAccessTokenByClientCredentials; // 机器间授权获取 Access Token
authenticationClient.getUserInfoByAccessToken; // Token 换用户信息
authenticationClient.getNewAccessTokenByRefreshToken; // Refresh Token
authenticationClient.introspectToken; // 检验 Token 合法性
authenticationClient.revokeToken; // 撤回 Token
authenticationClient.validateTicketV1; // 检验 CAS 1.0 ticket
authenticationClient.buildLogoutUrl; // 构造前端登出链接
```

## OIDC

OpenID Connect 简称 OIDC，是 OAuth 2.0 的一个扩展，主要增加了语义化的用户信息字段。

### 初始化

初始化 AuthenticationClient 时的参数：

- `appId` \<string\> 应用 ID，必填。
- `secret` \<string\> 应用密钥，必填。
- `appHost` \<string\> 应用完整地址，如 https://sample-app.authing.cn，不带最后的斜线 '/'。
- `redirectUri` \<string\> 业务回调 URL，必填。详情请查看[文档](/guides/federation/oidc.html#授权码模式)。
- `protocol` \<string\> 协议类型，可选值为 `oidc`、`oauth`、`saml`、`cas`，此处填写 `oidc`。
- `tokenEndPointAuthMethod` \<string\> 获取 token 端点验证方式，可选值为 `client_secret_post`、`client_secret_basic`、`none`，默认为 `client_secret_post`。
- `introspectionEndPointAuthMethod` \<string\> 检验 token 端点验证方式，可选值为 `client_secret_post`、`client_secret_basic`、`none`，默认为 `client_secret_post`。
- `revocationEndPointAuthMethod` \<string\> 撤回 token 端点验证方式，可选值为 `client_secret_post`、`client_secret_basic`、`none`，默认为 `client_secret_post`。
- `encryption` \<object\> 密码传输加密。
- `encryption.type` \<string\> 加密类型，可选值为 `sm2`。
- `encryption.publicKey` \<string\> 加密公钥。

#### 示例

```js
const authenticationClient = new AuthenticationClient({
  appId: '应用 ID',
  secret: '应用密钥',
  appHost: 'https://{YOUR_DOMAIN}.authing.cn',
  redirectUri: '业务回调地址',
});
```

### 生成 OIDC 协议的用户登录链接
>生成 OIDC 协议的用户登录链接，用户可以通过此链接访问 Authing 的在线登录页面。

```js
AuthenticationClient().buildAuthorizeUrl(options)
```


#### 参数

- `options` \<object\> 发起授权登录时需要填写的参数。详情请见[使用 OIDC 授权码模式](/federation/oidc/authorization-code/)。
- `options.scope` \<string\> 请求的权限项目，选填，OIDC 协议默认为 `openid profile email phone address`，OAuth 2.0 协议默认为 `user`。
- `options.nonce` \<string\> 随机字符串，选填，默认自动生成。
- `options.state` \<string\> 随机字符串，选填，默认自动生成。
- `options.responseMode` \<string\> 响应类型，选填，可选值为 `query`、`fragment`、`form_post`；默认为 `query`，即通过浏览器重定向发送 code 到回调地址。
- `options.responseType` \<string\> 响应类型，选填，可选值为 `code`、`code id_token token`、`code id_token`、`code id_token`、`code token`、`id_token token`、`id_token`、`none`；默认为 `code`，授权码模式。
- `options.redirectUri` \<string\> 回调地址，必填，默认为 SDK 初始化时的 redirectUri 参数。
- `options.codeChallenge` \<string\> 一个长度大于等于 43 的字符串，作为 code_challenge 发送到 Authing。
- `options.codeChallengeMethod` \<string\> 可以为 plain、S256，表示计算 code_challenge 时使用的摘要算法，plain 表示不用任何算法，S256 表示 code_challenge 是使用 SHA256 计算的。

#### 示例

```javascript
// 拼接 OIDC 授权链接
const authenticationClient = new AuthenticationClient({
  appId: '应用 ID',
  appHost: 'https://{YOUR_DOMAIN}.authing.cn',
  redirectUri: '业务回调地址',
});
let url = client.buildAuthorizeUrl({ scope: 'openid profile offline_access' });

// PKCE 场景使用示例
// 生成一个 code_verifier
let codeChallenge = client.generateCodeChallenge()
// 计算 code_verifier 的 SHA256 摘要
let codeChallengeDigest = client.getCodeChallengeDigest({ codeChallenge, method: 'S256' })
// 构造 OIDC 授权码 + PKCE 模式登录 URL
let url2 = client.buildAuthorizeUrl({ codeChallenge: codeChallengeDigest, codeChallengeMethod: 'S256' });
```

#### 示例数据

```http
https://oidc1.authing.cn/oidc/auth?nonce=5485323897342262&state=7400704296715694&scope=openid+profile+offline_access&client_id=5f17a529f64fb009b794a2ff&response_mode=query&redirect_uri=https%3A%2F%2Fbaidu.com&response_type=code&prompt=consent
```

### Code 换 Token
>使用授权码 Code 获取用户的 Token 信息。

```js
AuthenticationClient().getAccessTokenByCode(code, options)
```


#### 参数

- `code` \<string\> 授权码 Code，用户在认证成功后，Authing 会将授权码 Code 发送到回调地址，详情请见[使用 OIDC 授权码模式](/federation/oidc/authorization-code/)，每个 Code 只能使用一次。
- `options` \<object\> 发起 PKCE 授权登录时需要填写此参数。详情请见[使用 OIDC 授权码 + PKCE 模式](/federation/oidc/pkce/)。
- `options.codeVerifier` \<string\> 校验码原始值，不是摘要值。

#### 示例

```javascript
const authenticationClient = new AuthenticationClient({
  appId: '应用 ID',
  secret: '应用密钥',
  appHost: 'https://{YOUR_DOMAIN}.authing.cn',
  redirectUri: '业务回调地址',
});
let res = await authenticationClient.getAccessTokenByCode('授权码 code');
let res2 = await authenticationClient.getAccessTokenByCode('授权码 code', {
  codeVerifier: 'code_challenge 原始值'
});
```

#### 示例数据

```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlRmTE90M0xibjhfYThwUk11ZXNzYW1xai1vM0RCQ3MxLW93SExRLVZNcVEifQ.eyJqdGkiOiJsdzg0NW5zdGcwS3EtMTlodVpQOHYiLCJzdWIiOiI1ZmY3MDFkODQ2YjkyMDNlMmY2YWM2ZjMiLCJpYXQiOjE2MTU4ODM1ODYsImV4cCI6MTYxNTg4NzE4Niwic2NvcGUiOiJlbWFpbCBvcGVuaWQgcHJvZmlsZSBwaG9uZSIsImlzcyI6Imh0dHBzOi8vb2lkYzEuYXV0aGluZy5jbi9vaWRjIiwiYXVkIjoiNWYxN2E1MjlmNjRmYjAwOWI3OTRhMmZmIn0.VvYKBcWcr8iIi1b37ugWQ9hsvog4_7EqDQyFqwhIuvM0NHlHH3Bhw83EQIKSNfbWV4nv3ihfeNGPLMzslbQr-wwjnWZTLMYl1bcn7IdVtD_kTN3Zz10MwF5td-VQ7UndU28wJ0HE1mo6E8QH93kYGckS5FSZXmCBa0M5H59Jec_a1MHI1MZrr_V9cZ9EfeF97V-PcqU8JVAwDZclCJ3mWY_Mb65RnMR9yEVqUZzJStmaXGMuRIzjkm2pklqt0CtQQJfzECXq_4USpwRXDiYLWILYPUCcO6hGxDjhMEd8IcxdG51TQP-w1UM6LyIRn61uSJvDsz8zg5dStDKyocypiA",
  "expires_in": 3600,
  "id_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QzQDEyMy5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsInN1YiI6IjVmZjcwMWQ4NDZiOTIwM2UyZjZhYzZmMyIsImJpcnRoZGF0ZSI6bnVsbCwiZmFtaWx5X25hbWUiOm51bGwsImdlbmRlciI6IlUiLCJnaXZlbl9uYW1lIjpudWxsLCJsb2NhbGUiOm51bGwsIm1pZGRsZV9uYW1lIjpudWxsLCJuYW1lIjpudWxsLCJuaWNrbmFtZSI6bnVsbCwicGljdHVyZSI6Imh0dHBzOi8vZmlsZXMuYXV0aGluZy5jby9hdXRoaW5nLWNvbnNvbGUvZGVmYXVsdC11c2VyLWF2YXRhci5wbmciLCJwcmVmZXJyZWRfdXNlcm5hbWUiOm51bGwsInByb2ZpbGUiOm51bGwsInVwZGF0ZWRfYXQiOiIyMDIxLTAzLTE1VDA1OjU0OjU0LjY4NVoiLCJ3ZWJzaXRlIjpudWxsLCJ6b25laW5mbyI6bnVsbCwicGhvbmVfbnVtYmVyIjpudWxsLCJwaG9uZV9udW1iZXJfdmVyaWZpZWQiOmZhbHNlLCJub25jZSI6IjcwVEU3eW9NVFEiLCJhdF9oYXNoIjoiUFNnOGw5eDRldGxmLXA4UDdjYnVoQSIsImlzcyI6Imh0dHBzOi8vb2lkYzEuYXV0aGluZy5jbi9vaWRjIiwiaXNzMiI6Imh0dHBzOi8vYmFpZHUuY29tIiwiYXVkIjoiNWYxN2E1MjlmNjRmYjAwOWI3OTRhMmZmIiwiZXhwIjoxNjE1ODg3MTg3LCJpYXQiOjE2MTU4ODM1ODh9.OlX-FP7znIEqx0YpnOQ8kxadMe1toHDj1KPVm0dbEVc",
  "scope": "email openid profile phone",
  "token_type": "Bearer"
}
```

字段解释：

| 字段名       | 含义                                      |
| ------------ | ----------------------------------------- |
| token_type   | Token 类型，固定值 Bearer                 |
| scope        | 授权范围，授权获取的用户权限项目          |
| id_token     | Id token，Authing 颁发的 Id token         |
| expires_in   | Access token 过期时间                     |
| access_token | Access token，Authing 颁发的 Access token |

### Token 换用户信息
>使用 Access token 获取用户信息。

```js
AuthenticationClient().getUserInfoByAccessToken('access_token')
```


#### 参数

- `access_token` \<string\> Access token，使用授权码 Code 换取的 Access token 的内容。详情请见[使用 OIDC 授权码模式](/federation/oidc/authorization-code/)。

#### 示例

```javascript
const authenticationClient = new AuthenticationClient({
  appId: '应用 ID',
  secret: '应用密钥',
  appHost: 'https://{YOUR_DOMAIN}.authing.cn',
  redirectUri: '业务回调地址',
});
let res = await authenticationClient.getUserInfoByAccessToken('Access token');
```

#### 示例数据

```json
{
  "address": {
    "country": null,
    "postal_code": null,
    "region": null,
    "formatted": null
  },
  "birthdate": null,
  "family_name": null,
  "gender": "U",
  "given_name": null,
  "locale": null,
  "middle_name": null,
  "name": null,
  "nickname": null,
  "picture": "https://files.authing.co/authing-console/default-user-avatar.png",
  "preferred_username": null,
  "profile": null,
  "updated_at": "2021-03-03T06:17:14.485Z",
  "website": null,
  "zoneinfo": null,
  "email": "test1@authing.cn",
  "email_verified": false,
  "sub": "603f184cec4505e2868431fc", // subject 的缩写，为用户 ID
  "phone_number": null,
  "phone_number_verified": false
}
```

字段解释：

| 字段名                 | 翻译                    |
| :--------------------- | :---------------------- |
| sub                    | subject 的缩写，唯一标识，一般为用户 ID |
| name                   | 姓名                    |
| given_name             | 名字                    |
| family_name            | 姓氏                    |
| middle_name            | 中间名                  |
| nickname               | 昵称                    |
| preferred_username     | 希望被称呼的名字        |
| profile                | 基础资料                |
| picture                | 头像                    |
| website                | 网站链接                |
| email                  | 电子邮箱                |
| email_verified         | 邮箱是否被认证          |
| gender                 | 性别                    |
| birthdate              | 生日                    |
| zoneinfo               | 时区                    |
| locale                 | 区域                    |
| phone_number           | 手机号                  |
| phone_number_verified  | 认证手机号              |
| address                | 地址对象                |
| address.formatted      | 详细地址                |
| address.street_address | 街道地址                |
| address.locality       | 城市                    |
| address.region         | 省                      |
| address.postal_code    | 邮编                    |
| address.country        | 国家                    |
| updated_at             | 信息更新时间            |

### 刷新 Access Token
>使用 Refresh token 获取新的 Access token。
```js
AuthenticationClient().getNewAccessTokenByRefreshToken(refreshToken)
```


#### 参数

- `refreshToken` \<string\> Refresh token，可以从 AuthenticationClient.getAccessTokenByCode 方法的返回值中的 refresh_token 获得。详情请见[刷新 Access token](/guides/federation/oidc.md#刷新-access-token)。

#### 示例

```javascript
const authenticationClient = new AuthenticationClient({
  appId: '应用 ID',
  secret: '应用密钥',
  appHost: 'https://{YOUR_DOMAIN}.authing.cn',
  redirectUri: '业务回调地址',
});
let res = await authenticationClient.getNewAccessTokenByRefreshToken('Access token');
```

#### 示例数据

```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlRmTE90M0xibjhfYThwUk11ZXNzYW1xai1vM0RCQ3MxLW93SExRLVZNcVEifQ.eyJqdGkiOiJZUHB4NUVEWGlQWVJvNUFQWXAzci0iLCJzdWIiOiI1ZmY3MDFkODQ2YjkyMDNlMmY2YWM2ZjMiLCJpYXQiOjE2MTQwOTE0OTksImV4cCI6MTYxNDA5NTA5OSwic2NvcGUiOiJvZmZsaW5lX2FjY2VzcyBwcm9maWxlIG9wZW5pZCIsImlzcyI6Imh0dHBzOi8vb2lkYzEuYXV0aGluZy5jbi9vaWRjIiwiYXVkIjoiNWYxN2E1MjlmNjRmYjAwOWI3OTRhMmZmIn0.ZN_SlfVg1oNMz7uAK-5K84dqqqmlZehmAPOLytOR9HnLHImKJ9VO5u1hRsAjGCob0kMUV5wVxQhX3EFks7FtMamiX2Jvn-NYh4V_5T6l3LFf4uoKF6AykAg483nG3EEENuGgQo15bBszsoCGqFnNmUd0T4Cgxx0zbxXPxMdp_dcE14KzmNz1w-Qg3yVeYmSTZFdcLtZA2BYnVEa7LYA2yA3DgawwAcRmrlyEfnvCO3uY2TcsTKEAfQ-QgVIGRWOfyUE5f-_X3TolliO1fXnwZBdxEKMXLGW5E2bPVcePyiV0upYbUnQ079UxBlEiWlgeW_rpkTPXDxHAgiE488gtlg",
  "expires_in": 3600,
  "id_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZmY3MDFkODQ2YjkyMDNlMmY2YWM2ZjMiLCJiaXJ0aGRhdGUiOm51bGwsImZhbWlseV9uYW1lIjpudWxsLCJnZW5kZXIiOiJVIiwiZ2l2ZW5fbmFtZSI6bnVsbCwibG9jYWxlIjpudWxsLCJtaWRkbGVfbmFtZSI6bnVsbCwibmFtZSI6bnVsbCwibmlja25hbWUiOm51bGwsInBpY3R1cmUiOiJodHRwczovL2ZpbGVzLmF1dGhpbmcuY28vYXV0aGluZy1jb25zb2xlL2RlZmF1bHQtdXNlci1hdmF0YXIucG5nIiwicHJlZmVycmVkX3VzZXJuYW1lIjpudWxsLCJwcm9maWxlIjpudWxsLCJ1cGRhdGVkX2F0IjoiMjAyMS0wMi0yM1QxNDo0NDoxOC4wODVaIiwid2Vic2l0ZSI6bnVsbCwiem9uZWluZm8iOm51bGwsImF0X2hhc2giOiIxaWRJSUxaWExpZkRscXJMY3ZNeV9BIiwiS0VZIjoiVkFMVUUiLCJhdWQiOiI1ZjE3YTUyOWY2NGZiMDA5Yjc5NGEyZmYiLCJleHAiOjE2MTQwOTUwOTgsImlhdCI6MTYxNDA5MTQ5OSwiaXNzIjoiaHR0cHM6Ly9vaWRjMS5hdXRoaW5nLmNuL29pZGMifQ._H59237sqpsY0OgyY_RM7CvuG6cFo1x03y-DBhd5hik",
  "refresh_token": "3T49f4Y48szoMmwBXragjqLwQZC4QhgnsM5Oy2WfmU-",
  "scope": "openid offline_access profile",
  "token_type": "Bearer"
}
```

### 检查 Access Token 或 Refresh token 的状态
>检查 Access token 或 Refresh token 的状态。

```js
AuthenticationClient().introspectToken(token)
```


#### 参数

- `token` \<string\> Access token 或 Refresh token，可以从 AuthenticationClient.getAccessTokenByCode 方法的返回值中的 access_token、refresh_token 获得。

#### 示例

```javascript
const authenticationClient = new AuthenticationClient({
  appId: '应用 ID',
  secret: '应用密钥',
  appHost: 'https://{YOUR_DOMAIN}.authing.cn',
  redirectUri: '业务回调地址',
});
let res = await authenticationClient.introspectToken('Access token 或 Refresh token');
```

#### 示例数据

Token 合法时返回：

```json
{
  "active": true,
  "sub": "60097f4d5bc08f75da104d18", // subject 的缩写，为用户 ID
  "client_id": "60097391b1358c17c5fb0f4e",
  "exp": 1612445888,
  "iat": 1611236288,
  "iss": "https://core.littleimp.cn/oidc",
  "jti": "TV4J0gAbe4KR4-8CtYcOa",
  "scope": "openid profile email phone offline_access",
  "token_type": "Bearer"
}
```

Token 不合法时返回：

```json
{
  "active": false
}
```

检验过程失败会抛出错误。

### 在线检验 Id Token 或 Access Token 的合法性
>通过 Authing 提供的在线接口验证 Id token 或 Access token。会产生网络请求。

```js
AuthenticationClient().validateToken(options)
```


#### 参数

- `options.idToken` \<string\> ID Token，可以从 AuthenticationClient.getAccessTokenByCode 方法的返回值中的 id_token 获得。
- `options.accessToken` \<string\> Access token，可以从 AuthenticationClient.getAccessTokenByCode 方法的返回值中的 access_token 获得。

#### 示例

```javascript
const authenticationClient = new AuthenticationClient({
  appId: '应用 ID',
});
let res = await authing.validateToken({ idToken: 'ID Token' });
```

#### 示例数据

id_token 验证合法时返回：

```json
{
  "sub": "5f64afd1ad501364e3b43c1e", // subject 的缩写，为用户 ID
  "birthdate": null,
  "family_name": null,
  "gender": "U",
  "given_name": null,
  "locale": null,
  "middle_name": null,
  "name": null,
  "nickname": null,
  "picture": "https://usercontents.authing.cn/authing-avatar.png",
  "preferred_username": "test1",
  "profile": null,
  "updated_at": "2020-09-27T06:06:29.853Z",
  "website": null,
  "zoneinfo": null,
  "email": "test1@123.com",
  "email_verified": false,
  "phone_number": null,
  "phone_number_verified": false,
  "nonce": "CQsguqUdl7",
  "at_hash": "10iOtwuTNtyQLzlNYXAHeg",
  "aud": "5f17a529f64fb009b794a2ff",
  "exp": 1601460494,
  "iat": 1601456894,
  "iss": "https://oidc1.authing.cn/oidc"
}
```

Id token 验证非法时返回：

```json
{ "code": 400, "message": "id_token 格式有误" }
```

```json
{ "code": 400, "message": "id_token 不合法" }
```

Access token 验证合法时返回：

```json
{
  "jti": "K5TYewNhvdGBdHiRifMyW",
  "sub": "5f64afd1ad501364e3b43c1e", // subject 的缩写，为用户 ID
  "iat": 1601456894,
  "exp": 1601460494,
  "scope": "openid profile email phone",
  "iss": "https://oidc1.authing.cn/oidc",
  "aud": "5f17a529f64fb009b794a2ff"
}
```

Access token 验证非法时返回：

```json
{ "code": 400, "message": "access_token 格式有误" }
```

```json
{ "code": 400, "message": "access_token 不合法" }
```

### 撤回 Access Token 或 Refresh token
>撤回 Access token 或 Refresh token。Access token 或 Refresh token 的持有者可以通知 Authing 已经不再需要令牌，希望 Authing 将其吊销。

```js
AuthenticationClient().revokeToken(token)
```


#### 参数

- `token` \<string\> Access token 或 Refresh token，可以从 AuthenticationClient.getAccessTokenByCode 方法的返回值中的 access_token、refresh_token 获得。

#### 示例

```javascript
const authenticationClient = new AuthenticationClient({
  appId: '应用 ID',
  secret: '应用密钥',
  appHost: 'https://{YOUR_DOMAIN}.authing.cn',
  redirectUri: '业务回调地址',
});
let res = await authenticationClient.revokeToken('Access token 或 Refresh token');
```

#### 示例数据

撤回成功时返回 true。

撤回失败时抛出错误。

### 拼接登出 URL
>拼接登出 URL。

```js
AuthenticationClient().buildLogoutUrl(options)
```


#### 参数

- `options` \<string\> 登出配置项。
- `expert` \<boolean\> 是否开启专家模式，默认为 `false`。
- `redirectUri` \<string\> 登出后的重定向地址。
- `idToken` \<string\> 用户的 idToken。

#### 示例

使用前端万能登出链接退出登录：

```javascript
// 拼接前端万能登出链接
const authenticationClient = new AuthenticationClient({
  appId: '应用 ID',
  appHost: 'https://{YOUR_DOMAIN}.authing.cn',
  redirectUri: '业务回调地址',
});
let url = authenticationClient.buildLogoutUrl({ redirectUri: 'https://authing.cn' });
```

使用 OIDC 协议标准链接退出登录，需要传入当前用户的 **Id token**，且登出回调地址**必须与控制台配置的一致**：

```js
// 拼接符合 OIDC 协议标准的登出链接
const authenticationClient = new AuthenticationClient({
  appId: '应用 ID',
  secret: '应用密钥',
  appHost: 'https://{YOUR_DOMAIN}.authing.cn',
  redirectUri: '业务回调地址',
  protocol: 'oidc',
});
let url = authenticationClient.buildLogoutUrl({ expert: true, idToken: '待退出用户的 idToken', redirectUri: 'https://authing.cn' });
```

### Client Credentials 模式获取 Access Token
>使用[编程访问账号](/guides/authorization/m2m-authz.html#m2m-授权)获取具备权限的 Access Token。

```js
AuthenticationClient().getAccessTokenByClientCredentials(scope, options)
```


#### 参数

- `scope` \<string\> 权限项目，空格分隔的字符串，每一项代表一个权限。详情请见[机器间（M2M）授权](/guides/authorization/m2m-authz.html#获取具备权限的-accesstoken)。
- `options`，编程访问账号的 AK 与 SK 信息。
- `options.accessKey`，编程访问账号 AccessKey。
- `options.secretKey`，编程访问账号 SecretKey。

#### 示例

```javascript
const authenticationClient = new AuthenticationClient({
  appId: '应用 ID',
  secret: '应用密钥',
  redirectUri: '业务回调地址',
});
let res = await authenticationClient.getAccessTokenByClientCredentials('email openid profile phone', { accessKey: '编程访问账号 AK', secretKey: '编程访问账号 SK' });
```

#### 示例数据

```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlRmTE90M0xibjhfYThwUk11ZXNzYW1xai1vM0RCQ3MxLW93SExRLVZNcVEifQ.eyJqdGkiOiJsdzg0NW5zdGcwS3EtMTlodVpQOHYiLCJzdWIiOiI1ZmY3MDFkODQ2YjkyMDNlMmY2YWM2ZjMiLCJpYXQiOjE2MTU4ODM1ODYsImV4cCI6MTYxNTg4NzE4Niwic2NvcGUiOiJlbWFpbCBvcGVuaWQgcHJvZmlsZSBwaG9uZSIsImlzcyI6Imh0dHBzOi8vb2lkYzEuYXV0aGluZy5jbi9vaWRjIiwiYXVkIjoiNWYxN2E1MjlmNjRmYjAwOWI3OTRhMmZmIn0.VvYKBcWcr8iIi1b37ugWQ9hsvog4_7EqDQyFqwhIuvM0NHlHH3Bhw83EQIKSNfbWV4nv3ihfeNGPLMzslbQr-wwjnWZTLMYl1bcn7IdVtD_kTN3Zz10MwF5td-VQ7UndU28wJ0HE1mo6E8QH93kYGckS5FSZXmCBa0M5H59Jec_a1MHI1MZrr_V9cZ9EfeF97V-PcqU8JVAwDZclCJ3mWY_Mb65RnMR9yEVqUZzJStmaXGMuRIzjkm2pklqt0CtQQJfzECXq_4USpwRXDiYLWILYPUCcO6hGxDjhMEd8IcxdG51TQP-w1UM6LyIRn61uSJvDsz8zg5dStDKyocypiA",
  "expires_in": 3600,
  "scope": "email openid profile phone",
  "token_type": "Bearer"
}
```

### 生成 PKCE 校验码
>生成一个 PKCE 校验码。

```js
AuthenticationClient().generateCodeChallenge()
```


#### 示例

```javascript
let codeChallenge = client.generateCodeChallenge()
```

#### 示例数据

```
VrpGRU_3FQ5au1TqCvzeh1nTij7HkcnpP1qWzJMGX_Y
```

### 生成 PKCE 校验码摘要值
>生成一个 PKCE 校验码。

```js
AuthenticationClient().getCodeChallengeDigest(options)
```


#### 参数

- `options`，PKCE 校验码、摘要算法参数。
- `options.codeChallenge`，待生成摘要值的 code_challenge 原始值，一个长度大于等于 43 的随机字符串。
- `options.method`，可以为 plain、S256，表示计算 code_challenge 时使用的摘要算法，plain 表示不用任何算法原样返回，S256 表示使用 SHA256 计算 code_challenge 摘要。

#### 示例

```javascript
// 生成一个 code_verifier
let codeChallenge = client.generateCodeChallenge()
// 计算 code_verifier 的 SHA256 摘要
let codeChallengeDigest = client.getCodeChallengeDigest({ codeChallenge, method: 'S256' })
```

#### 示例数据

```
Bu6RP796BBiAwGwdUpHpKfhmQqahszBcGep8qT31XOy
```

## OAuth 2.0

OAuth 是一个关于授权（Authorization）的开放网络标准，目前的版本是 2.0 版。

### 初始化

初始化 AuthenticationClient 时的参数：

- `appId` \<string\> 应用 ID，必填。
- `secret` \<string\> 应用密钥，必填。
- `appHost` \<string\> 应用完整地址，如 https://sample-app.authing.cn，不带最后的斜线 '/'。
- `redirectUri` \<string\> 业务回调 URL，必填。详情请查看[文档](/guides/federation/oauth.html#授权码模式)。
- `protocol` \<string\> 协议类型，可选值为 `oidc`、`oauth`、`saml`、`cas`，此处填写 `oauth`。
- `tokenEndPointAuthMethod` \<string\> 获取 token 端点验证方式，可选值为 `client_secret_post`、`client_secret_basic`、`none`，默认为 `client_secret_post`。
- `introspectionEndPointAuthMethod` \<string\> 检验 token 端点验证方式，可选值为 `client_secret_post`、`client_secret_basic`、`none`，默认为 `client_secret_post`。
- `revocationEndPointAuthMethod` \<string\> 撤回 token 端点验证方式，可选值为 `client_secret_post`、`client_secret_basic`、`none`，默认为 `client_secret_post`。

#### 示例

```js
const authenticationClient = new AuthenticationClient({
  appId: '应用 ID',
  secret: '应用密钥',
  appHost: 'https://{YOUR_DOMAIN}.authing.cn',
  redirectUri: '业务回调地址',
  protocol: 'oauth',
});
```

### 生成 OAuth 2.0 协议的用户登录链接
>生成 OAuth 2.0 协议的用户登录链接，用户可以通过此链接访问 Authing 的在线登录页面。

```js
AuthenticationClient().buildAuthorizeUrl(options)
```


#### 参数

- `options` \<object\> 发起授权登录时需要填写的参数。详情请见[使用 OAuth2.0 授权码模式](/federation/oauth2/authorization-code/)。
- `options.scope` \<string\> 请求的权限项目，选填，OAuth 2.0 协议默认为 `user`。
- `options.state` \<string\> 随机字符串，选填，默认自动生成。
- `options.responseType` \<string\> 响应类型，选填，可选值为 `code`、`token` 默认为 `code`，授权码模式。
- `options.redirectUri` \<string\> 回调地址，必填，默认为 SDK 初始化时的 redirectUri 参数。

#### 示例

```javascript
// 拼接 OAuth 2.0 授权链接
const authenticationClient = new AuthenticationClient({
  appId: '应用 ID',
  secret: '应用密钥',
  appHost: 'https://{YOUR_DOMAIN}.authing.cn',
  redirectUri: '业务回调地址',
  protocol: 'oauth',
});
let url = authenticationClient.buildAuthorizeUrl({ scope: 'user' });
```

#### 示例数据

```http
https://oidc1.authing.cn/oauth/auth?state=7400704296715694&scope=user&client_id=5f17a529f64fb009b794a2ff&redirect_uri=https%3A%2F%2Fbaidu.com&response_type=code
```

### Code 换 Token
>使用授权码 Code 获取用户的 Token 信息。

```js
AuthenticationClient().getAccessTokenByCode(code)
```


#### 参数

- `code` \<string\> 授权码 Code，用户在认证成功后，Authing 会将授权码 Code 发送到回调地址，详情请见[使用 OAuth 2.0 授权码模式](/federation/oauth2/authorization-code/)，每个 Code 只能使用一次。

#### 示例

```javascript
const authenticationClient = new AuthenticationClient({
  appId: '应用 ID',
  secret: '应用密钥',
  appHost: 'https://{YOUR_DOMAIN}.authing.cn',
  redirectUri: '业务回调地址',
});
let res = await authenticationClient.getAccessTokenByCode('授权码 code');
```

#### 示例数据

```json
{
  "access_token": "fa9d2bdd914ea01aa4e434c12d4f919d749fc75c",
  "token_type": "Bearer",
  "expires_in": 1209599,
  "refresh_token": "b5e0e1afe793c6634495434afc262b88ddee9af3",
  "scope": "user"
}
```

字段解释：

| 字段名       | 含义                                      |
| ------------ | ----------------------------------------- |
| token_type   | Token 类型，固定值 Bearer                 |
| scope        | 授权范围，授权获取的用户权限项目          |
| expires_in   | Access token 过期时间                     |
| access_token | Access token，Authing 颁发的 Access token |

### Token 换用户信息
>使用 Access token 获取用户信息。

```js
AuthenticationClient().getUserInfoByAccessToken('access_token')
```


#### 参数

- `access_token` \<string\> Access token，使用授权码 Code 换取的 Access token 的内容。详情请见[使用 OAuth 2.0 授权码模式](/federation/oauth2/authorization-code/)。

#### 示例

```javascript
const authenticationClient = new AuthenticationClient({
  appId: '应用 ID',
  secret: '应用密钥',
  appHost: 'https://{YOUR_DOMAIN}.authing.cn',
  redirectUri: '业务回调地址',
});
let res = await authenticationClient.getUserInfoByAccessToken('Access token');
```

#### 示例数据

```json
{
  "address": {
    "country": null,
    "postal_code": null,
    "region": null,
    "formatted": null
  },
  "birthdate": null,
  "family_name": null,
  "gender": "U",
  "given_name": null,
  "locale": null,
  "middle_name": null,
  "name": null,
  "nickname": null,
  "picture": "https://files.authing.co/authing-console/default-user-avatar.png",
  "preferred_username": null,
  "profile": null,
  "updated_at": "2021-03-03T06:17:14.485Z",
  "website": null,
  "zoneinfo": null,
  "email": "test1@authing.cn",
  "email_verified": false,
  "sub": "603f184cec4505e2868431fc", // subject 的缩写，为用户 ID
  "phone_number": null,
  "phone_number_verified": false
}
```

字段解释：

| 字段名                 | 翻译                    |
| :--------------------- | :---------------------- |
| sub                    | subject 的缩写，唯一标识，一般为用户 ID |
| name                   | 姓名                    |
| given_name             | 名字                    |
| family_name            | 姓氏                    |
| middle_name            | 中间名                  |
| nickname               | 昵称                    |
| preferred_username     | 希望被称呼的名字        |
| profile                | 基础资料                |
| picture                | 头像                    |
| website                | 网站链接                |
| email                  | 电子邮箱                |
| email_verified         | 邮箱是否被认证          |
| gender                 | 性别                    |
| birthdate              | 生日                    |
| zoneinfo               | 时区                    |
| locale                 | 区域                    |
| phone_number           | 手机号                  |
| phone_number_verified  | 认证手机号              |
| address                | 地址对象                |
| address.formatted      | 详细地址                |
| address.street_address | 街道地址                |
| address.locality       | 城市                    |
| address.region         | 省                      |
| address.postal_code    | 邮编                    |
| address.country        | 国家                    |
| updated_at             | 信息更新时间            |

### 刷新 Access Token
>使用 Refresh token 获取新的 Access token。

```js
AuthenticationClient().getNewAccessTokenByRefreshToken(refreshToken)
```


#### 参数

- `refreshToken` \<string\> Refresh token，可以从 AuthenticationClient.getAccessTokenByCode 方法的返回值中的 refresh_token 获得。

#### 示例

```javascript
const authenticationClient = new AuthenticationClient({
  appId: '应用 ID',
  secret: '应用密钥',
  appHost: 'https://{YOUR_DOMAIN}.authing.cn',
  redirectUri: '业务回调地址',
});
let res = await authenticationClient.getNewAccessTokenByRefreshToken('Access token');
```

#### 示例数据

```json
{
  "access_token": "fa9d2bdd914ea01aa4e434c12d4f919d749fc75c",
  "token_type": "Bearer",
  "expires_in": 1209599,
  "refresh_token": "b5e0e1afe793c6634495434afc262b88ddee9af3",
  "scope": "user"
}
```

### 检查 Access Token 或 Refresh Token
>检查 Access token 或 Refresh token 的状态。

```js
AuthenticationClient().introspectToken(token)
```


#### 参数

- `token` \<string\> Access token 或 Refresh token，可以从 AuthenticationClient.getAccessTokenByCode 方法的返回值中的 access_token、refresh_token 获得。

#### 示例

```javascript
const authenticationClient = new AuthenticationClient({
  appId: '应用 ID',
  secret: '应用密钥',
  appHost: 'https://{YOUR_DOMAIN}.authing.cn',
  redirectUri: '业务回调地址',
});
let res = await authenticationClient.introspectToken('Access token 或 Refresh token');
```

#### 示例数据

Token 合法时返回：

```json
{
  "active": true,
  "sub": "5f719946524ee1099229496b", // subject 的缩写，为用户 ID
  "client_id": "5f17a529f64fb009b794a2ff",
  "exp": 1619083024,
  "iat": 1617873424,
  "iss": "https://core.authing.cn/oauth",
  "jti": "qbovGK-HZL0O_20wY7uXj",
  "scope": "user",
  "token_type": "Bearer"
}
```

Token 不合法时返回：

```json
{
  "active": false
}
```

检验过程失败会抛出错误。

### 撤回 Access Token 或 Refresh token
>撤回 Access token 或 Refresh token。Access token 或 Refresh token 的持有者可以通知 Authing 已经不再需要令牌，希望 Authing 将其吊销。

```js
AuthenticationClient().revokeToken(token)
```


#### 参数

- `token` \<string\> Access token 或 Refresh token，可以从 AuthenticationClient.getAccessTokenByCode 方法的返回值中的 access_token、refresh_token 获得。

#### 示例

```javascript
const authenticationClient = new AuthenticationClient({
  appId: '应用 ID',
  secret: '应用密钥',
  appHost: 'https://{YOUR_DOMAIN}.authing.cn',
  redirectUri: '业务回调地址',
});
let res = await authenticationClient.revokeToken('Access token 或 Refresh token');
```

#### 示例数据

撤回成功时返回 true。

撤回失败时抛出错误。

### 拼接登出 URL
>拼接登出 URL。

```js
AuthenticationClient().buildLogoutUrl(options)
```


#### 参数

- `options` \<string\> 登出配置项。
- `options.redirectUri` \<string\> 登出后的重定向地址。

#### 示例

```javascript
// 拼接前端万能登出链接
const authenticationClient = new AuthenticationClient({
  appId: '应用 ID',
  appHost: 'https://{YOUR_DOMAIN}.authing.cn',
  redirectUri: '业务回调地址',
  protocol: 'oauth',
});
let url = authenticationClient.buildLogoutUrl({ redirectUri: 'https://authing.cn' });
```

## SAML2

安全断言标记语言（英语：Security Assertion Markup Language，简称 SAML，发音 sam-el）是一个基于 XML 的开源标准数据格式，它在当事方之间交换身份验证和授权数据，尤其是在身份提供者和服务提供者之间交换。

### 初始化

初始化 AuthenticationClient 时的参数：

- `appId` \<string\> 应用 ID，必填。
- `appHost` \<string\> 应用完整地址，如 https://sample-app.authing.cn，不带最后的斜线 '/'。
- `protocol` \<string\> 协议类型，可选值为 `oidc`、`oauth`、`saml`、`cas`，此处填写 `saml`。

#### 示例

```js
const authenticationClient = new AuthenticationClient({
  appId: '应用 ID',
  appHost: 'https://{YOUR_DOMAIN}.authing.cn',
  protocol: 'saml',
});
```

### 生成 SAML2 协议的用户登录链接
>生成 SAML2 协议的用户登录链接

```js
AuthenticationClient().buildAuthorizeUrl(options)
```

#### 示例

```javascript
// 拼接 SAML2 登录链接
const authenticationClient = new AuthenticationClient({
  appId: '应用 ID',
  appHost: 'https://{YOUR_DOMAIN}.authing.cn',
  protocol: 'saml',
});
let url = authenticationClient.buildAuthorizeUrl();
```

#### 示例数据

```http
https://oidc1.authing.cn/api/v2/saml-idp/5f17a529f64fb009b794a2ff
```

### 拼接登出 URL
>拼接登出 URL。

```js
AuthenticationClient().buildLogoutUrl(options)
```

#### 参数

- `options` \<string\> 登出配置项。
- `options.redirectUri` \<string\> 登出后的重定向地址。

#### 示例

```javascript
// 拼接前端万能登出链接
const authenticationClient = new AuthenticationClient({
  appId: '应用 ID',
  appHost: 'https://{YOUR_DOMAIN}.authing.cn',
  redirectUri: '业务回调地址',
  protocol: 'saml',
});
let url = authenticationClient.buildLogoutUrl({ redirectUri: 'https://authing.cn' });
```

#### 示例数据

```http
https://oidc1.authing.cn/login/profile/logout?redirect_uri=https://authing.cn
```

## CAS

CAS 是 Central Authentication Service 的缩写，中央认证服务，一种独立开放指令协议。

### 初始化

初始化 AuthenticationClient 时的参数：

- `appId` \<string\> 应用 ID，必填。
- `appHost` \<string\> 应用完整地址，如 https://sample-app.authing.cn，不带最后的斜线 '/'。
- `protocol` \<string\> 协议类型，可选值为 `oidc`、`oauth`、`saml`、`cas`，此处填写 `cas`。

#### 示例

```js
const authenticationClient = new AuthenticationClient({
  appId: '应用 ID',
  appHost: 'https://{YOUR_DOMAIN}.authing.cn',
  protocol: 'cas',
});
```

### 生成 CAS 协议的用户登录链接
>生成 CAS 协议的用户登录链接

```js
AuthenticationClient().buildAuthorizeUrl(options)
```


#### 参数

- `options` \<object\> 发起授权登录时需要填写的参数。
- `options.service` \<string\> CAS 协议中的业务回调地址。

#### 示例

```js
// 拼接 CAS 登录链接
const authenticationClient = new AuthenticationClient({
  appId: '应用 ID',
  appHost: 'https://{YOUR_DOMAIN}.authing.cn',
  protocol: 'cas',
});
let url = authenticationClient.buildAuthorizeUrl({ service: 'service 地址' });
```

#### 示例数据

```http
https://oidc1.authing.cn/cas-idp/5f17a529f64fb009b794a2ff/login?service=https://example.com
```

### 检验 CAS 1.0 Ticket 合法性
>检验 CAS 1.0 Ticket 合法性。

```js
AuthenticationClient().validateTicketV1(ticket, service)
```


#### 参数

- `ticket` \<string\> CAS 认证成功后，Authing 颁发的 ticket。
- `service` \<string\> CAS 回调地址。

#### 示例

```javascript
const authenticationClient = new AuthenticationClient({
  appId: '应用 ID',
  appHost: 'https://{YOUR_DOMAIN}.authing.cn',
});
let res = await authenticationClient.validateTicketV1('ticket 内容', 'service 地址');
```

#### 示例数据

ticket 合法时返回：

```json
{
  "valid": true,
}
```

ticket 不合法时返回：

```json
{
  "valid": false,
  "message": "ticket 不合法"
}
```

### 检验 CAS 2.0 Ticket 合法性
>检验 CAS 2.0 Ticket 合法性，同时返回用户属性，数据格式默认为 JSON，可以选择 XML。

```js
AuthenticationClient().validateTicketV2(ticket, service, format)
```


#### 参数

- `ticket` \<string\> CAS 认证成功后，Authing 颁发的 ticket。
- `service` \<string\> CAS 回调地址。
- `format` \<string\> 返回数据格式，可选值为 XML、JSON，默认为 JSON。

#### 示例

```javascript
const authenticationClient = new AuthenticationClient({
  appId: '应用 ID',
  appHost: 'https://{YOUR_DOMAIN}.authing.cn',
});
let res = await authenticationClient.validateTicketV2('ticket 内容', 'service 地址');
```

#### 示例数据

ticket 合法时返回，JSON 格式：

```json
{
  "serviceResponse": {
    "authenticationSuccess": {
      "user": "test1@123.com",
      "attributes": {
        "updated_at": "2021-06-16T14:03:17.358Z",
        "address": {
          "country": null,
          "postal_code": null,
          "region": null,
          "formatted": null
        },
        "phone_number_verified": false,
        "phone_number": null,
        "locale": null,
        "zoneinfo": null,
        "birthdate": null,
        "gender": "U",
        "email_verified": true,
        "email": "test1@123.com",
        "website": null,
        "picture": "https://files.authing.co/user-contents/photos/9a9dc4d7-e756-45b1-81d8-095a28e476c6.jpg",
        "profile": null,
        "preferred_username": "test1@123.com",
        "nickname": null,
        "middle_name": null,
        "family_name": null,
        "given_name": "AAA",
        "name": null,
        "sub": "5f719946524ee1099229496b",
        "external_id": null,
        "unionid": "ldap:f63ed82a-ab77-40da-97bd-defd910d2afd:uid=5fa0354af2c5d2f5c377c991,ou=users,o=5fa029ac692f1d4b55a87623,dc=authing,dc=cn"
      }
    }
  }
}
```

XML 格式：

```xml
<cas:serviceResponse xmlns:cas="http://www.yale.edu/tp/cas">
  <cas:authenticationSuccess>
    <cas:user>test1@123.com</cas:user>
    <cas:attributes>
      <cas:authenticationDate>2021-06-16T13:12:29.369Z</cas:authenticationDate>
      <cas:longTermAuthenticationRequestTokenUsed>false</cas:longTermAuthenticationRequestTokenUsed>
      <cas:updated_at/>
      <cas:address>
        <cas:locality/>
        <cas:street_address/>
      </cas:address>
      <cas:phone_number_verified>false</cas:phone_number_verified>
      <cas:gender>U</cas:gender>
      <cas:email_verified>false</cas:email_verified>
      <cas:email>test1@123.com</cas:email>
      <cas:picture>https://files.authing.co/authing-console/default-user-avatar.png</cas:picture>
      <cas:nickname>aaa</cas:nickname>
      <cas:sub>6063fcd01d0d2e39d4596904</cas:sub>
      <cas:external_id>046bb9d1-8501-11e9-bfaa-7cd30abeb5de</cas:external_id>
    </cas:attributes>
  </cas:authenticationSuccess>
</cas:serviceResponse>
```

ticket 不合法时返回，JSON 格式：

```json
{
  "serviceResponse": {
    "authenticationFailure": {
      "code": "INVALID_TICKET",
      "description": "Ticket 不合法"
    }
  }
}
```

XML 格式：

```xml
<cas:serviceResponse xmlns:cas='http://www.yale.edu/tp/cas'>
    <cas:authenticationFailure code="INVALID_TICKET">
        Ticket 不合法
    </cas:authenticationFailure>
</cas:serviceResponse>
```

### 拼接登出 URL
>拼接登出 URL。

```js
AuthenticationClient().buildLogoutUrl(options)
```


#### 参数

- `options` \<string\> 登出配置项。
- `options.redirectUri` \<string\> 登出后的重定向地址。

#### 示例

```javascript
// 拼接 cas 登出链接
const authenticationClient = new AuthenticationClient({
  appId: '应用 ID',
  appHost: 'https://{YOUR_DOMAIN}.authing.cn',
  protocol: 'cas',
});
let url = authenticationClient.buildLogoutUrl({ redirectUri: 'https://authing.cn' });
```

#### 示例数据

```http
https://oidc1.authing.cn/cas-idp/5f17a529f64fb009b794a2ff/logout?service=https://example.com
```
