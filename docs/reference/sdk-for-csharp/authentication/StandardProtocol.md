---
meta:
- name: description
  content: 标准协议认证模块
---

# 标准协议认证模块

<LastUpdated/>

此模块包含 OIDC、OAuth 2.0、SAML、CAS 标准协议的认证、获取令牌、检查令牌、登出等方法。其中发起认证的方法需要在前端使用，获取令牌、检查令牌等方法需要在后端使用。

使用方法：

```csharp
// 使用 AppId 和 appHost 进行初始化
managementClient authentication = new managementClient(string AppId, string Host);
```

## OIDC

OpenID Connect 简称 OIDC，是 OAuth 2.0 的一个扩展，主要增加了语义化的用户信息字段。

### 初始化

初始化 managementClient 时的参数：

- `AppId` \<string\> 应用 ID，必填。
- `Secret` \<string\> 应用密钥，必填。
- `Host` \<string\> 应用完整地址，如 https://sample-app.authing.cn，不带最后的斜线 "/"。
- `RedirectUri` \<string\> 业务回调 URL，必填。详情请查看[文档](/guides/federation/oidc.html#授权码模式)。
- `protocol` \<ProtocolEnum\> 协议类型，可选值为 `OIDC`、`OAUTH`、`SAML`、`CAS`，默认为 `OIDC`。
- `tokenEndPointAuthMethod` \<AuthMethodEnum\> 获取 token 端点验证方式，可选值为 `CLIENT_SECRET_POST`、`CLIENT_SECRET_BASIC`、`NONE`，默认为 `CLIENT_SECRET_POST`。
- `introspectionEndPointAuthMethod` \<AuthMethodEnum\> 检验 token 端点验证方式，可选值为 `CLIENT_SECRET_POST`、`CLIENT_SECRET_BASIC`、`NONE`，默认为 `CLIENT_SECRET_POST`。
- `revocationEndPointAuthMethod` \<AuthMethodEnum\> 撤回 token 端点验证方式，可选值为 `CLIENT_SECRET_POST`、`CLIENT_SECRET_BASIC`、`NONE`，默认为 `CLIENT_SECRET_POST`。

#### 示例

```csharp
// 使用 AppId 和 appHost 进行初始化
var authentication = await new managementClient("APP_ID", "APP_HOST");
```


### 生成 OIDC 协议的用户登录链接
```csharp
managementClient.BuildOidcAuthorizeUrl(Oidcoptions options)
```
> 生成 OIDC 协议的用户登录链接

#### 参数

- `options` \<Oidcoptions\> 发起授权登录时需要填写的参数。详情请见[使用 OIDC 授权码模式](/federation/oidc/authorization-code/)。
- `options.Scope` \<string\> 请求的权限项目，选填，OIDC 协议默认为 `openid profile email phone address`，OAuth 2.0 协议默认为 `user`。
- `options.Nonce` \<string\> 随机字符串，选填，默认自动生成。
- `options.State` \<string\> 随机字符串，选填，默认自动生成。
- `options.ResponseMode` \<string\> 响应类型，选填，可选值为 `query`、`fragment`、`form_post`；默认为 `query`，即通过浏览器重定向发送 code 到回调地址。
- `options.ResponseType` \<string\> 响应类型，选填，可选值为 `code`、`code id_token token`、`code id_token`、`code id_token`、`code token`、`id_token token`、`id_token`、`none`；默认为 `code`，授权码模式。
- `options.RedirectUri` \<string\> 回调地址，必填，默认为 SDK 初始化时的 redirectUri 参数。

#### 示例

```csharp
var iOidcParams = new Oidcoptions(){
  RedirectUri="www.xxxxxxx.com",
  Nonce="nonce test"
};
var oidcstring = await managementClient.BuildOidcAuthorizeUrl(iOidcParams);
```

#### 示例数据

```http
https://oidc1.authing.cn/oidc/auth?nonce=5485323897342262&state=7400704296715694&scope=openid+profile+offline_access&client_id=5f17a529f64fb009b794a2ff&response_mode=query&redirect_uri=https%3A%2F%2Fbaidu.com&response_type=code&prompt=consent
```

### Code 换 Token
```csharp
managementClient.GetAccessTokenByCode(string code)
```
> 使用授权码 Code 获取用户的 Token 信息。

#### 参数

- `code` \<string\> 授权码 Code，用户在认证成功后，Authing 会将授权码 Code 发送到回调地址，详情请见[使用 OIDC 授权码模式](/federation/oidc/authorization-code/)。

#### 示例

```csharp
var result = await managementClient.GetAccessTokenByCode("empower_code");
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
```csharp
managementClient.GetUserInfoByAccessToken(string token)
```
> 使用 Access token 获取用户信息。

#### 参数

- `token` \<string\> Access token，使用授权码 Code 换取的 Access token 的内容。详情请见[使用 OIDC 授权码模式](/federation/oidc/authorization-code/)。

#### 示例

```csharp
var result  = await managementClient.GetUserInfoByAccessToken("accessToken");
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
```csharp
managementClient.GetNewAccessTokenByRefreshToken(string refreshToken)
```
> 使用 Refresh token 获取新的 Access token。

#### 参数

- `refreshToken` \<string\> Refresh token，可以从 managementClient.getAccessTokenByCode 方法的返回值中的 refresh_token 获得。详情请见[刷新 Access token](/guides/federation/oidc.md#刷新-access-token)。

#### 示例

```csharp
var result =  await managementClient.GetNewAccessTokenByRefreshToken("accessToken");
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

### 检查 Access Token
```csharp
managementClient.IntrospectToken(string token)
```
> 检查 Access token 或 Refresh token 的状态。

#### 参数

- `token` \<string\> Access token 或 Refresh token，可以从 managementClient.getAccessTokenByCode 方法的返回值中的 access_token、refresh_token 获得。

#### 示例

```csharp
var result = await managementClient.IntrospectToken("accessToken or refreshToken");
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

### 检验 Id Token 合法性

```csharp
managementClient.ValidateToken(ValidateTokenParams param)
```
> 通过 Authing 提供的在线接口验证 Id token 或 Access token，会产生网络请求。

#### 参数

- `param` \<ValidateTokenParams\>
- `param.IdToken` \<string\> Access token 或 Refresh token，可以从 managementClient.getAccessTokenByCode 方法的返回值中的 id_token 获得。
- `param.AccessToken` \<string\> Access token，可以从 managementClient.getAccessTokenByCode 方法的返回值中的 access_token 获得。

#### 示例

```csharp
var param = new ValidateTokenParams(){
  IdToken="IdToken",
  AccessToken="AccessToken"
};
var result = managementClient.ValidateToken(params);
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

### 拼接登出 URL
```csharp
managementClient.BuildLogoutUrl(LogoutParams options)
```
> 拼接登出 URL。

#### 参数

- `params` \<LogoutParams\> 登出配置项
- `params.Expert` \<bool\> 是否开启专家模式，默认为 `false`。
- `params.RedirectUri` \<string\> 登出后的重定向地址
- `params.IdToken` \<string\> 用户的 idToken

#### 示例


```csharp
var params = new LogoutParams(){
  RedirectUri = "https://authing.cn"
};
var url = await managementClient.BuildLogoutUrl(params);
```

使用 OIDC 协议标准链接退出登录，需要传入当前用户的 **Id token**，且登出回调地址**必须与控制台配置的一致**：

```csharp
 var params = new LogoutParams(){
  RedirectUri = "https://authing.cn"
  IdToken = "待退出用户的 idToken"
  Expert = true
};
var url = await managementClient.BuildLogoutUrl(params);
```

### Client Credentials 模式获取 Access Token
```csharp
managementClient.GetAccessTokenByClientCredentials(string scope  GetAccessTokenByClientCredentialsoptions options) 
```
> 使用[编程访问账号](/guides/authorization/m2m-authz.html#m2m-授权)获取具备权限的 Access Token。

#### 参数

- `scope` \<string\> 权限项目，空格分隔的字符串，每一项代表一个权限。详情请见[机器间（M2M）授权](/guides/authorization/m2m-authz.html#获取具备权限的-accesstoken)。
- `options` \<GetAccessTokenByClientCredentialsoptions\> 编程访问账号的 AK 与 SK 信息
- `options.AccessKey` \<string\> 编程访问账号 AccessKey
- `options.SecretKey` \<string\> 编程访问账号 SecretKey

#### 示例

```csharp
 var clientCredentialInput = new ClientCredentialInput()
    {
      AccessKey = "accessKey",
      SecretKey = "secretKey",
    };

var result = await managementClient.getAccessTokenByClientCredentials("testr2", clientCredentialInput);
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

## OAuth 2.0

OAuth 是一个关于授权（Authorization）的开放网络标准，目前的版本是 2.0 版。

### 初始化

初始化 managementClient 时的参数：

- `appId` \<string\> 应用 ID，必填。
- `secret` \<string\> 应用密钥，必填。
- `host` \<string\> 应用完整地址，如 https://sample-app.authing.cn，不带最后的斜线 "/"。
- `redirectUri` \<string\> 业务回调 URL，必填。详情请查看[文档](/guides/federation/oidc.html#授权码模式)。
- `protocol` \<ProtocolEnum\> 协议类型，可选值为 `OIDC`、`OAUTH`、`SAML`、`CAS`，默认为 `OIDC`。
- `tokenEndPointAuthMethod` \<AuthMethodEnum\> 获取 token 端点验证方式，可选值为 `CLIENT_SECRET_POST`、`CLIENT_SECRET_BASIC`、`NONE`，默认为 `CLIENT_SECRET_POST`。
- `introspectionEndPointAuthMethod` \<AuthMethodEnum\> 检验 token 端点验证方式，可选值为 `CLIENT_SECRET_POST`、`CLIENT_SECRET_BASIC`、`NONE`，默认为 `CLIENT_SECRET_POST`。
- `revocationEndPointAuthMethod` \<AuthMethodEnum\> 撤回 token 端点验证方式，可选值为 `CLIENT_SECRET_POST`、`CLIENT_SECRET_BASIC`、`NONE`，默认为 `CLIENT_SECRET_POST`。

#### 示例

```csharp
// 使用 AppId 和 appHost 进行初始化
var authentication = new managementClient("APP_ID", "APP_HOST");
```

### 拼接 OIDC、OAuth 2.0、SAML、CAS 协议授权链接
```csharp
managementClient.BuildAuthorizeUrl(IProtocolInterface options)
```
> 生成 OAuth 2.0 协议的用户登录链接

#### 参数

- `options` \<IProtocolInterface\> 发起授权登录时需要填写的参数。详情请见[使用 OAuth2.0 授权码模式](/federation/oauth2/authorization-code/)。
- `options.Scope` \<string\> 请求的权限项目，选填，OIDC 协议默认为 `openid profile email phone address`，OAuth 2.0 协议默认为 `user`。
- `options.State` \<string\> 随机字符串，选填，默认自动生成。
- `options.ResponseType` \<string\> 响应类型，选填，可选值为 `code`、`token` 默认为 `code`，授权码模式。
- `options.RedirectUri` \<string\> 回调地址，选填，默认为 SDK 初始化时的 redirectUri 参数。

#### 示例

```csharp
var iOauthParams = new IProtocolInterface(){
  Scope = "Scope",
  State = "random toString",
  ResponseType = "token",
  RedirectUri = "https://authing.cn"
};
var result = await managementClient.BuildAuthorizeUrl(iOauthParams);
```

#### 示例数据

```http
https://oidc1.authing.cn/oauth/auth?state=7400704296715694&scope=user&client_id=5f17a529f64fb009b794a2ff&redirect_uri=https%3A%2F%2Fbaidu.com&response_type=code
```

### Code 换 Token
```csharp
managementClient.GetAccessTokenByCode(string code)
```
> 使用授权码 Code 获取用户的 Token 信息。

#### 参数

- `code` \<string\> 授权码 Code，用户在认证成功后，Authing 会将授权码 Code 发送到回调地址，详情请见[使用 OAuth 2.0 授权码模式](/federation/oauth2/authorization-code/)。

#### 示例

```csharp
var result = await managementClient.GetAccessTokenByCode("授权码 code");
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
```csharp
managementClient.GetUserInfoByAccessToken(string token)
```
> 使用 Access token 获取用户信息。

#### 参数

- `token` \<string\> Access token，使用授权码 Code 换取的 Access token 的内容。详情请见[使用 OAuth 2.0 授权码模式](/federation/oauth2/authorization-code/)。

#### 示例

```csharp
var result = await managementClient.GetUserInfoByAccessToken("Access token");
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
```csharp
managementClient.GetNewAccessTokenByRefreshToken(string refreshToken)
```
> 使用 Refresh token 获取新的 Access token。

#### 参数

- `refreshToken` \<string\> Refresh token，可以从 managementClient.getAccessTokenByCode 方法的返回值中的 refresh_token 获得。

#### 示例

```csharp
var result = await managementClient.GetNewAccessTokenByRefreshToken("Access token");
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

### 检查 Access Token
```csharp
managementClient.IntrospectToken(string token)
```
> 检查 Access token 或 Refresh token 的状态。

#### 参数

- `token` \<string\> Access token 或 Refresh token，可以从 managementClient.getAccessTokenByCode 方法的返回值中的 access_token、refresh_token 获得。

#### 示例

```csharp
var result = await managementClient.introspectToken("accessToken or refreshToken");
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

## SAML2

安全断言标记语言（英语：Security Assertion Markup Language，简称 SAML，发音 sam-el）是一个基于 XML 的开源标准数据格式，它在当事方之间交换身份验证和授权数据，尤其是在身份提供者和服务提供者之间交换。

### 初始化

初始化 managementClient 时的参数：

- `appId` \<string\> 应用 ID，必填。
- `appHost` \<string\> 应用完整地址，如 https://sample-app.authing.cn，不带最后的斜线 "/"。
- `protocol` \<ProtocolEnum\> 协议类型，可选值为 `OIDC`、`OAUTH`、`SAML`、`CAS`，默认为 `OIDC`。


### 生成 SAML2 协议的用户登录链接
```csharp
managementClient.BuildAuthorizeUrl()
```
> 生成 SAML2 协议的用户登录链接

#### 参数

无

#### 示例

```csharp
// 拼接 SAML2 登录链接
var samlstring = await managementClient.BuildAuthorizeUrl();
```

#### 示例数据

```http
https://oidc1.authing.cn/api/v2/saml-idp/5f17a529f64fb009b794a2ff
```

## CAS

CAS 是 Central Authentication Service 的缩写，中央认证服务，一种独立开放指令协议。

### 初始化

初始化 managementClient 时的参数：

- `appId` \<string\> 应用 ID，必填。
- `appHost` \<string\> 应用完整地址，如 https://sample-app.authing.cn，不带最后的斜线 "/"。
- `protocol` \<ProtocolEnum\> 协议类型，可选值为 `OIDC`、`OAUTH`、`SAML`、`CAS`，默认为 `OIDC`。

#### 示例


### 生成 CAS 协议的用户登录链接
```csharp
managementClient.BuildAuthorizeUrl(options)
```
> 生成 CAS 协议的用户登录链接

#### 参数

- `options` \<IOidcParams\> 发起授权登录时需要填写的参数
- `options.service` \<string\> CAS 协议中的业务回调地址

#### 示例

```csharp
ICasParams iCasParams = new ICasParams(){
  Service = "service txt",  
};
var result = await managementClient.BuildAuthorizeUrl(iCasParams);
```

#### 示例数据

```http
https://oidc1.authing.cn/cas-idp/5f17a529f64fb009b794a2ff/login?service=https://example.com
```


### 生成 CAS 协议的用户登录链接
```csharp
managementClient.BuildOauthAuthorizeUrl(Oauthoptions options)
```
> 生成 CAS 协议的用户登录链接
#### 参数

- `options` \<Oauthoptions\> 发起授权登录时需要填写的参数。
- `options.AppId` \<string\> App Id
- `options.BuildOauthAuthorizeUrl` \<string\> 请求的权限项目，选填，OIDC 协议默认为 `openid profile email phone address`，OAuth 2.0 协议默认为 `user`。
- `options.State` \<string\> 随机字符串，选填，默认自动生成。
- `options.ResponseType` \<string\> 响应类型，选填，可选值为 `code`、`token` 默认为 `code`，授权码模式。
- `options.RedirectUri` \<string\> 回调地址，选填，默认为 SDK 初始化时的 redirectUri 参数。

#### 示例

```csharp
// 拼接 CAS 登录链接
var iCasParams = new Oauthoptions(){
  AppId = "app id",  
};
var rersult = await managementClient.BuildOauthAuthorizeUrl(iCasParams);
```




### 撤回 Access token 或 Refresh token
```csharp
managementClient.RevokeToken(string token)
```

#### 参数

- `token` \<string\> Access token 或 Refresh token

#### 示例

```csharp
var result = await managementClient.BuildAuthorizeUrl("Access token or Refresh token");
```


### 撤回 Access token 或 Refresh token
```csharp
managementClient.ValidateTicketV1(string ticket, string service)
```
#### 参数

- `ticket` \<string\> 
- `service` \<string\> 

#### 示例

```csharp
var result = await managementClient.ValidateTicketV1("ticket","service");
```

### 获取合法票据
```csharp
managementClient.GetCodeChallengeDigest(CodeChallengeDigestoptions options)
```
#### 参数

- `options` \<CodeChallengeDigestoptions\>
- `options.CodeChallenge` \<string\> 
- `options.Method` \<CodeChallengeDigestMethod\> 

#### 示例

```csharp
var options = new CodeChallengeDigestoptions(){
  CodeChallenge = "CodeChallenge"
}
var result = await managementClient.GetCodeChallengeDigest(options);
```

### 生成合法票据
```csharp
managementClient.GenerateCodeChallenge()
```
#### 参数

无

#### 示例

```csharp
var result = await managementClient.GenerateCodeChallenge();
```

### 通过远端服务验证票据合法性
```csharp
managementClient.ValidateTicketV2(string ticket, string service,ValidateTicketFormat validateTicketFormat)
```
#### 参数

- `ticket` \<string\> 
- `service` \<string\> 

#### 示例

```csharp
var result = await managementClient.ValidateTicketV2("ticket","service");
```



