# Node.js/Javascript

<LastUpdated/>

以下指南将逐步引导你如何使用 Authing Node.js/Javascript SDK 为你提供的基础认证与用户管理能力。

<AppDetailSiderBar />

## 安装


使用 `npm`:

```
npm install authing-js-sdk
```

使用 `yarn`:

```
yarn add authing-js-sdk
```

> 如果你要在 React Native 环境中使用，需要先在 RN 项目根目录运行：`npx rn-nodeify --install "crypto,stream"`，之后会在项目根目录生成一个 `shim.js` 文件，然后在 App.js 第一行引入 `import './shim.js'`。

使用 CDN:

```html
<script src="https://cdn.authing.co/packages/authing-js-sdk/4.23.4/umd/index.js"></script>

<script>
  /** 你可以通过全局变量 Authing 获取 AuthenticationClient 和 ManagementClient */
  var authing = new Authing.AuthenticationClient({
    appId: 'AUTHING_APP_ID',
    appHost: 'https://xxx.authing.cn',
  })
</script>
```

## 认证你的用户


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



## 管理你的用户


此模块可以进行用户目录增删改查、搜索用户、管理用户分组、管理用户角色、管理用户策略授权等操作。

请使用以下方式使用该模块：

```javascript
import { ManagementClient } from 'authing-js-sdk'
const managementClient = new ManagementClient({
  userPoolId: 'YOUR_USERPOOL_ID',
  secret: 'YOUR_USERPOOL_SECRET',
})

managementClient.users.list // 获取用户列表
managementClient.users.create // 创建用户
managementClient.users.listRoles // 获取用户角色列表
managementClient.users.search // 搜索用户
```


### 创建用户
>此接口将以管理员身份创建用户，不需要进行手机号验证码检验等安全检测。用户的手机号、邮箱、用户名、externalId 用户池内唯一。

```js
UsersManagementClient().create(userInfo, options)
```


#### 参数

- `userInfo` \<CreateUserInput\> 用户资料
- `userInfo.email` \<string\> 邮箱，用户池内唯一
- `userInfo.emailVerified` \<boolean\> 邮箱是否已验证
- `userInfo.phone` \<string\> 手机号
- `userInfo.phoneVerified` \<boolean\> 手机号是否验证
- `userInfo.unionid` \<string\> 以社会化登录的用户该字段为用户在第三方社会化登录服务商中的唯一 ID
- `userInfo.openid` \<string\> 微信登录返回的 openid
- `userInfo.password` \<string\> 密码
- `userInfo.registerSource` \<string\> 注册来源，可以多选
- `userInfo.username` \<string\> 用户名
- `userInfo.nickname` \<string\> 昵称
- `userInfo.photo` \<string\> 头像
- `userInfo.company` \<string\> 公司
- `userInfo.browser` \<string\> 浏览器
- `userInfo.loginsCount` \<number\> 登录次数，当你从原有用户系统迁移到 {{$localeConfig.brandName}} 时可以设置该字段。
- `userInfo.lastLogin` \<string\> 上次登录时间, 符合 [ISO8601](https://en.wikipedia.org/wiki/ISO_8601) 格式的时间字符串。(如 "2017-06-07T14:34:08.700Z", "2017-06-07T14:34:08.700 or "2017-06-07T14:34:08+0)

## 错误处理

你可以使用 `try catch` 进行错误处理:

```js
try {
  const user = await authing.loginByEmail('test@example.com', 'passw0rd')
} catch (error) {
  console.log(error.code) // 2004
  console.log(error.message) // 用户不存在
}
```


你还可以指定 `onError` 统一捕捉所有 {{$localeConfig.brandName}} 请求异常，如使用 `antd` 等前端组件显示错误提示。

```js
import { message } from 'antd'
const authing = new AuthenticationClient({
  appId: 'YOUR_APP_ID',
  appHost: 'https://core.you-authing-service.com',
  onError: (code, msg: any) => {
    message.error(msg)
  },
})
```