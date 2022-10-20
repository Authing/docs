---
meta:
  - name: description
    content: C# SDK
---

<LastUpdated/>

# {{$localeConfig.brandName}} - C# SDK CSA 模块

CAS 是 Central Authentication Service 的缩写，中央认证服务，一种独立开放指令协议。

## 初始化

初始化 authenticationClient 时的参数：

- `appId` \<string\> 应用 ID，必填。
- `appHost` \<string\> 应用完整地址，如 https://sample-app.authing.cn，不带最后的斜线 "/"。
- `protocol` \<ProtocolEnum\> 协议类型，可选值为 `OIDC`、`OAUTH`、`SAML`、`CAS`，默认为 `OIDC`。

### 示例

## 生成 CAS 协议的用户登录链接

```csharp
authenticationClient.BuildAuthorizeUrl(options)
```

> 生成 CAS 协议的用户登录链接

### 参数

- `options` \<IOidcParams\> 发起授权登录时需要填写的参数
- `options.service` \<string\> CAS 协议中的业务回调地址

### 示例

```csharp
ICasParams iCasParams = new ICasParams(){
  Service = "service txt",
};
var result = await authenticationClient.BuildAuthorizeUrl(iCasParams);
```

### 示例数据

```http
https://oidc1.authing.cn/cas-idp/5f17a529f64fb009b794a2ff/login?service=https://example.com
```

## 生成 CAS 协议的用户登录链接

```csharp
authenticationClient.BuildOauthAuthorizeUrl(Oauthoptions options)
```

> 生成 CAS 协议的用户登录链接

### 参数

- `options` \<Oauthoptions\> 发起授权登录时需要填写的参数。
- `options.AppId` \<string\> App Id
- `options.BuildOauthAuthorizeUrl` \<string\> 请求的权限项目，选填，OIDC 协议默认为 `openid profile email phone address`，OAuth 2.0 协议默认为 `user`。
- `options.State` \<string\> 随机字符串，选填，默认自动生成。
- `options.ResponseType` \<string\> 响应类型，选填，可选值为 `code`、`token` 默认为 `code`，授权码模式。
- `options.RedirectUri` \<string\> 回调地址，选填，默认为 SDK 初始化时的 redirectUri 参数。

### 示例

```csharp
// 拼接 CAS 登录链接
var iCasParams = new Oauthoptions(){
  AppId = "app id",
};
var rersult = await authenticationClient.BuildOauthAuthorizeUrl(iCasParams);
```

## 撤回 Access token 或 Refresh token

```csharp
authenticationClient.RevokeToken(string token)
```

### 参数

- `token` \<string\> Access token 或 Refresh token

### 示例

```csharp
var result = await authenticationClient.BuildAuthorizeUrl("Access token or Refresh token");
```

## 撤回 Access token 或 Refresh token

```csharp
authenticationClient.ValidateTicketV1(string ticket, string service)
```

### 参数

- `ticket` \<string\>
- `service` \<string\>

### 示例

```csharp
var result = await authenticationClient.ValidateTicketV1("ticket","service");
```

## 获取合法票据

```csharp
authenticationClient.GetCodeChallengeDigest(CodeChallengeDigestoptions options)
```

### 参数

- `options` \<CodeChallengeDigestoptions\>
- `options.CodeChallenge` \<string\>
- `options.Method` \<CodeChallengeDigestMethod\>

### 示例

```csharp
var options = new CodeChallengeDigestoptions(){
  CodeChallenge = "CodeChallenge"
}
var result = await authenticationClient.GetCodeChallengeDigest(options);
```

## 生成合法票据

```csharp
authenticationClient.GenerateCodeChallenge()
```

### 参数

无

### 示例

```csharp
var result = await authenticationClient.GenerateCodeChallenge();
```

## 通过远端服务验证票据合法性

```csharp
authenticationClient.ValidateTicketV2(string ticket, string service,ValidateTicketFormat validateTicketFormat)
```

### 参数

- `ticket` \<string\>
- `service` \<string\>

### 示例

```csharp
var result = await authenticationClient.ValidateTicketV2("ticket","service");
```
