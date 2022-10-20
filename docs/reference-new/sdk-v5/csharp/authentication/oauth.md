---
meta:
  - name: description
    content: C# SDK
---

<LastUpdated/>

# {{$localeConfig.brandName}} - C# SDK OAuth2.0 模块

OAuth 是一个关于授权（Authorization）的开放网络标准，目前的版本是 2.0 版。

## 初始化

初始化 authenticationClient 时的参数：

- `appId` \<string\> 应用 ID，必填。
- `secret` \<string\> 应用密钥，必填。
- `host` \<string\> 应用完整地址，如 https://sample-app.authing.cn，不带最后的斜线 "/"。
- `redirectUri` \<string\> 业务回调 URL，必填。详情请查看[文档](/guides/federation/oidc.html#授权码模式)。
- `protocol` \<ProtocolEnum\> 协议类型，可选值为 `OIDC`、`OAUTH`、`SAML`、`CAS`，默认为 `OIDC`。
- `tokenEndPointAuthMethod` \<AuthMethodEnum\> 获取 token 端点验证方式，可选值为 `CLIENT_SECRET_POST`、`CLIENT_SECRET_BASIC`、`NONE`，默认为 `CLIENT_SECRET_POST`。
- `introspectionEndPointAuthMethod` \<AuthMethodEnum\> 检验 token 端点验证方式，可选值为 `CLIENT_SECRET_POST`、`CLIENT_SECRET_BASIC`、`NONE`，默认为 `CLIENT_SECRET_POST`。
- `revocationEndPointAuthMethod` \<AuthMethodEnum\> 撤回 token 端点验证方式，可选值为 `CLIENT_SECRET_POST`、`CLIENT_SECRET_BASIC`、`NONE`，默认为 `CLIENT_SECRET_POST`。

### 示例

```csharp
// 使用 AppId 和 appHost 进行初始化
var authentication = new authenticationClient("APP_ID", "APP_HOST");
```

## 拼接 OIDC、OAuth 2.0、SAML、CAS 协议授权链接

```csharp
authenticationClient.BuildAuthorizeUrl(IProtocolInterface options)
```

> 生成 OAuth 2.0 协议的用户登录链接

### 参数

- `options` \<IProtocolInterface\> 发起授权登录时需要填写的参数。详情请见[使用 OAuth2.0 授权码模式](/federation/oauth2/authorization-code/)。
- `options.Scope` \<string\> 请求的权限项目，选填，OIDC 协议默认为 `openid profile email phone address`，OAuth 2.0 协议默认为 `user`。
- `options.State` \<string\> 随机字符串，选填，默认自动生成。
- `options.ResponseType` \<string\> 响应类型，选填，可选值为 `code`、`token` 默认为 `code`，授权码模式。
- `options.RedirectUri` \<string\> 回调地址，选填，默认为 SDK 初始化时的 redirectUri 参数。

### 示例

```csharp
var iOauthParams = new IProtocolInterface(){
  Scope = "Scope",
  State = "random toString",
  ResponseType = "token",
  RedirectUri = "https://authing.cn"
};
var result = await authenticationClient.BuildAuthorizeUrl(iOauthParams);
```

### 示例数据

```http
https://oidc1.authing.cn/oauth/auth?state=7400704296715694&scope=user&client_id=5f17a529f64fb009b794a2ff&redirect_uri=https%3A%2F%2Fbaidu.com&response_type=code
```

## Code 换 Token

```csharp
authenticationClient.GetAccessTokenByCode(string code)
```

> 使用授权码 Code 获取用户的 Token 信息。

### 参数

- `code` \<string\> 授权码 Code，用户在认证成功后，Authing 会将授权码 Code 发送到回调地址，详情请见[使用 OAuth 2.0 授权码模式](/federation/oauth2/authorization-code/)，每个 Code 只能使用一次。

### 示例

```csharp
var result = await authenticationClient.GetAccessTokenByCode("授权码 code");
```

### 示例数据

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

## Token 换用户信息

```csharp
authenticationClient.GetUserInfoByAccessToken(string token)
```

> 使用 Access token 获取用户信息。

### 参数

- `token` \<string\> Access token，使用授权码 Code 换取的 Access token 的内容。详情请见[使用 OAuth 2.0 授权码模式](/federation/oauth2/authorization-code/)。

### 示例

```csharp
var result = await authenticationClient.GetUserInfoByAccessToken("Access token");
```

### 示例数据

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

| 字段名                 | 翻译                                    |
| :--------------------- | :-------------------------------------- |
| sub                    | subject 的缩写，唯一标识，一般为用户 ID |
| name                   | 姓名                                    |
| given_name             | 名字                                    |
| family_name            | 姓氏                                    |
| middle_name            | 中间名                                  |
| nickname               | 昵称                                    |
| preferred_username     | 希望被称呼的名字                        |
| profile                | 基础资料                                |
| picture                | 头像                                    |
| website                | 网站链接                                |
| email                  | 电子邮箱                                |
| email_verified         | 邮箱是否被认证                          |
| gender                 | 性别                                    |
| birthdate              | 生日                                    |
| zoneinfo               | 时区                                    |
| locale                 | 区域                                    |
| phone_number           | 手机号                                  |
| phone_number_verified  | 认证手机号                              |
| address                | 地址对象                                |
| address.formatted      | 详细地址                                |
| address.street_address | 街道地址                                |
| address.locality       | 城市                                    |
| address.region         | 省                                      |
| address.postal_code    | 邮编                                    |
| address.country        | 国家                                    |
| updated_at             | 信息更新时间                            |

## 刷新 Access Token

```csharp
authenticationClient.GetNewAccessTokenByRefreshToken(string refreshToken)
```

> 使用 Refresh token 获取新的 Access token。

### 参数

- `refreshToken` \<string\> Refresh token，可以从 authenticationClient.getAccessTokenByCode 方法的返回值中的 refresh_token 获得。

### 示例

```csharp
var result = await authenticationClient.GetNewAccessTokenByRefreshToken("Access token");
```

### 示例数据

```json
{
  "access_token": "fa9d2bdd914ea01aa4e434c12d4f919d749fc75c",
  "token_type": "Bearer",
  "expires_in": 1209599,
  "refresh_token": "b5e0e1afe793c6634495434afc262b88ddee9af3",
  "scope": "user"
}
```

## 检查 Access Token

```csharp
authenticationClient.IntrospectToken(string token)
```

> 检查 Access token 或 Refresh token 的状态。

### 参数

- `token` \<string\> Access token 或 Refresh token，可以从 authenticationClient.getAccessTokenByCode 方法的返回值中的 access_token、refresh_token 获得。

### 示例

```csharp
var result = await authenticationClient.introspectToken("accessToken or refreshToken");
```

### 示例数据

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
