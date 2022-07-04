# 认证模块

<LastUpdated/>

认证模块基于 OIDC 标准协议实现，支持获取认证地址、获取用户登录态，获取令牌、检查令牌、刷新用户登录态，登出等方法。本模块只支持在服务端调用。

使用方法：
使用 AppId 、APP_SECRET 、 appHost 、 redirectUri 初始化 AuthenticationClient，初始化完成后调用 buildAuthUrl 构造前端登录链接，用户完成登录后，调用 getLoginStateByAuthCode，校验 state 值，并通过 code 码换取 token（Access Token、 ID Token、 Refresh Token），获得用户登录态，登录结束后，可调用 buildLogoutUrl 生成登出 URL。用户点击后触发登出，完成整个登录登出流程。

<流程图>

```java
// 使用 AppId 、APP_SECRET 、 appHost、redirectUri 进行初始化
 AuthenticationClientOptions clientOptions = new AuthenticationClientOptions(ACCESS_KEY_ID, ACCESS_KEY_SECRET, HOST, REDIRECT_URI);
 AuthenticationClient authenticationClient = new AuthenticationClient(clientOptions);
```

```java
authenticationClient.buildAuthUrl; // 构造前端登录链接
authenticationClient.getLoginStateByAuthCode; // 用授权码获取用户登录态
authenticationClient.getUserInfo; // 用 Access Token 获取用户身份信息
authenticationClient.refreshLoginState; // 用 Refresh Token 刷新用户的登录态，延长过期时间
authenticationClient.buildLogoutUrl; // 生成登出 URL
authenticationClient.parseAccessToken; // 验证并解析 Access Token
authenticationClient.parseIDToken; // 验证并解析 ID Token
```

### 初始化

初始化 AuthenticationClient 时的参数：

- `appId` \<String\> Authing 应用 ID ;
- `appSecret` \<String\> Authing 应用 Secret;
- `host` \<String\> 用户池域名， Authing 应用所在的用户池域名，例如 https://pool.authing.cn;
- `redirectUri` \<String\> 认证完成后的重定向目标 URL, 认证时会进行校验，需要和 Authing 控制台中应用所设置的 登录回调 URL 保持一致。
- `logoutRedirectUri` \<String\> 登出完成后的重定向目标 URL。
- `scope` \<String\> 应用侧向 Authing 请求的权限，以空格分隔，默认为 'openid profile'，成功获取的权限会出现在 Access Token 的 scope 字段中。更多 scope 定义参见 Authing 相关[文档](https://docs.authing.cn/v2/concepts/oidc-common-questions.html#scope-%E5%8F%82%E6%95%B0%E5%AF%B9%E5%BA%94%E7%9A%84%E7%94%A8%E6%88%B7%E4%BF%A1%E6%81%AF)。
- `serverJWKS` \<String\> 服务端的 JWKS 公钥，用于验证 Token 签名，默认会通过网络请求从服务端的 JWKS 端点自动获取。

#### 示例

```java
// 使用 AppId、 AppSecret、AppHost、redirectUri 进行初始化
 AuthenticationClientOptions clientOptions = new AuthenticationClientOptions(ACCESS_KEY_ID, ACCESS_KEY_SECRET, HOST, REDIRECT_URI);
 AuthenticationClient authenticationClient = new AuthenticationClient(clientOptions);

```

### 生成用户登录链接

authenticationClient.buildAuthUrl

> 调用该方法，生成用户登录链接返回给前端，在合适的时机触发登录认证流程，注意：需要缓存 生成的 state 和 nonce 参数，在认证完成后进行校验，用户认证成功后，由认证地址跳转到回调地址，并在 URL 参数中携带 code 和 state 值；认证失败， URL 参数中会携带 error 字段，返回错误信息。

#### 参数

- `buildAuthUrlParams` \<buildAuthUrlParams\> 发起授权登录时需要填写的参数。
- `scope` \<String\> 应用侧向 Authing 请求的权限，覆盖初始化参数中的对应设置。
- `nonce` \<String\> 随机字符串，选填，默认自动生成。
- `state` \<String\> 随机字符串，选填，默认自动生成。
- `redirectUri` \<String\> 回调地址，覆盖初始化参数中的对应设置。
- `forced` \<Boolean\> 即便用户已经登录也强制显示登录页。

#### 示例

```java
// 生成认证地址，用户通过认证地址进行登录，并携带 Code 和 state 跳转到指定的 redirectUri
BuildAuthUrlParams buildAuthUrlParams = new BuildAuthUrlParams();

AuthUrlResult buildAuthUrl = authenticationClient.buildAuthUrl(buildAuthUrlParams)

```

#### 示例数据

```http
 {
    url: 'https://core.authing.cn/oidc/auth?redirect_uri=https%3A%2F%2Fbaidu.com&response_mode=query&response_type=code&client_id=625fa4682e45fc2546331f25&scope=openid%20profile&state=AHyb4cXlwYbYtuFP&nonce=0BChaRhqezrMup1D',
    state:  "随机字符串",
    nonce:  "随机字符串"
  }
```

### 用授权码获取用户登录态

authenticationClient.getLoginStateByAuthCode(code, redirectUri)

> 用户登录完成后，使用获得的授权码 Code 获取用户的登录态信息，如果初始化时 scope 字段中包含 profile ，登录流程到这里就可以结束了，用户信息包含在解析出来的 ID Token 中； 登录态信息包括 ID Token、 Access Token、 Refresh Token、Access Token 过期时间、 解析出来的 ID Token 中包含的（用户）信息，解析出来的 Access Token 中的信息。注意：1. 调用前需要对 认证完成后的 state 值进行比对校验。2. 获取到用户登录态信息后，需要比对解析出来的 ID Token 中的 nonce 值， 是否和本地缓存的保持一致。

#### 参数

- `code` \<String\> 授权码 Code，用户在认证成功后，Authing 会将授权码 Code 发送到回调地址，每个 Code 只能使用一次。
- `redirectUri` \<String\> 发起认证时传入的回调地址。

#### 示例

```java
 LoginState loginState =  client.getLoginStateByAuthCode(code, REDIRECT_URI);
```

#### 示例数据

```json
{
  "accessToken": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InVlTVFVSDI1Ny1DWXQzOUFoblZNVXY2TUZrVjd1Q2xTWVU3T0VMZ1lzNzAifQ.eyJqdGkiOiJpbFFCczNmSVRpSlR5UHpQWDdYdFIiLCJzdWIiOiI2MmEyZmU2NTg4NTMzNTM0N2IwY2IwOWUiLCJpYXQiOjE2NTUyMDgyMDEsImV4cCI6MTY1NjQxNzgwMSwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSIsImlzcyI6Imh0dHBzOi8vdGVzdC5teXNxbC5hdXRoaW5nLWluYy5jby9vaWRjIiwiYXVkIjoiNjI1ZmE0NjgyZTQ1ZmMyNTQ2MzMxZjI1In0.G0yT6ipreRco4LNmJmSoV3753MMmrnNaLe4Vikw4zEPDLHwAEtsxO2C92R3natBTo6SUrGES8l_rknjAnVC0GjxDWhmt28TrXe0OEnafcsFLWbT2Q_qXJS3QcW_eeDpqIgibGY8fmHNydQ3WqC69mOvhW20YXmKLdhxBpgxzn9g95tbEadV9_y1e-5n_HCjBd6BRJn2-X_uIGgkKwNQFrzOhQ5GlFZH7ejoajvIQcx8gZhJDU-3dUi2g_xWwBkvvTSwXvXzP_rFvpaXxlHj75amgS0YPNm61lawChNzWhuJtucY4XNmFiTOwb1DTKsZNGsRUiFnzfxZffpgPZT89lA",
  "idToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MmEyZmU2NTg4NTMzNTM0N2IwY2IwOWUiLCJiaXJ0aGRhdGUiOm51bGwsImZhbWlseV9uYW1lIjpudWxsLCJnZW5kZXIiOiJVIiwiZ2l2ZW5fbmFtZSI6bnVsbCwibG9jYWxlIjpudWxsLCJtaWRkbGVfbmFtZSI6bnVsbCwibmFtZSI6bnVsbCwibmlja25hbWUiOm51bGwsInBpY3R1cmUiOiJodHRwczovL3MzLWltZmlsZS5mZWlzaHVjZG4uY29tL3N0YXRpYy1yZXNvdXJjZS92MS92Ml83NjAxMjk3MC01YjgxLTQ3YWUtODRlNy0wYjFkNGVkMjAwYWd-P2ltYWdlX3NpemU9NzJ4NzImY3V0X3R5cGU9JnF1YWxpdHk9JmZvcm1hdD1pbWFnZSZzdGlja2VyX2Zvcm1hdD0ud2VicCIsInByZWZlcnJlZF91c2VybmFtZSI6bnVsbCwicHJvZmlsZSI6bnVsbCwidXBkYXRlZF9hdCI6IjIwMjItMDYtMTRUMTE6MzE6MDYuNzA3WiIsIndlYnNpdGUiOm51bGwsInpvbmVpbmZvIjpudWxsLCJub25jZSI6IlJ3UVNZWENVdE5ZZTl0NEsiLCJhdF9oYXNoIjoiWjhiOEJNOUYtQTJLMVc3dHVLT1ZxdyIsImF1ZCI6IjYyNWZhNDY4MmU0NWZjMjU0NjMzMWYyNSIsImV4cCI6MTY1NjQxNzgwMSwiaWF0IjoxNjU1MjA4MjAxLCJpc3MiOiJodHRwczovL3Rlc3QubXlzcWwuYXV0aGluZy1pbmMuY28vb2lkYyJ9.psojXChTqdr2S_TeFm1Tq9qoV-AZHVFj3X0pIGqcuwM",
  "refreshToken": undefined,
  "expireAt": 1209600,
  "parsedIDToken": {
    "sub": "62a2fe65885335347b0cb09e",
    "birthdate": null,
    "family_name": null,
    "gender": "U",
    "given_name": null,
    "locale": null,
    "middle_name": null,
    "name": null,
    "nickname": null,
    "picture": "https://s3-imfile.feishucdn.com/static-resource/v1/v2_76012970-5b81-47ae-84e7-0b1d4ed200ag~?image_size=72x72&cut_type=&quality=&format=image&sticker_format=.webp",
    "preferred_username": null,
    "profile": null,
    "updated_at": "2022-06-14T11:31:06.707Z",
    "website": null,
    "zoneinfo": null,
    "nonce": "RwQSYXCUtNYe9t4K",
    "at_hash": "Z8b8BM9F-A2K1W7tuKOVqw",
    "aud": "625fa4682e45fc2546331f2",
    "exp": 1656417801,
    "iat": 1655208201,
    "iss": "https://core.authing.cn/oidc"
  },
  "parsedAccessToken": {
    "jti": "ilQBs3fITiJTyPzPX7XtR",
    "sub": "62a2fe65885335347b0cb09e",
    "iat": 1655208201,
    "exp": 1656417801,
    "scope": "openid profile",
    "iss": "https://core.authing.cn/oidc",
    "aud": "625fa4682e45fc2546331f25"
  }
}
```

### Token 换用户信息

authenticationClient.getUserInfo(accessToken)

> 调用 getLoginStateByAuthCode 后可以获取到 Access Token ， 通过 getUserInfo 使用 Access Token 获取用户信息。

#### 参数

- `access_token` \<String\> Access Token，使用授权码 Code 换取的 Access Token 的内容。详情请见[使用 OIDC 授权码模式](/federation/oidc/authorization-code/)。

#### 示例

```java
UserInfo getUserInfo = authenticationClient.getUserInfo('accessToken');
```

#### 示例数据

```json
{
  "sub": "62a2fe65885335347b0cb09e",
  "birthdate": null,
  "family_name": null,
  "gender": "U",
  "given_name": null,
  "locale": null,
  "middle_name": null,
  "name": null,
  "nickname": null,
  "picture": "https://s3-imfile.feishucdn.com/static-resource/v1/v2_76012970-5b81-47ae-84e7-0b1d4ed200ag~?image_size=72x72&cut_type=&quality=&format=image&sticker_format=.webp",
  "preferred_username": null,
  "profile": null,
  "updated_at": "2022-06-14T11:31:06.707Z",
  "website": null,
  "zoneinfo": null
}
```

字段解释：

| 字段名             | 翻译                                    |
| :----------------- | :-------------------------------------- |
| sub                | subject 的缩写，唯一标识，一般为用户 ID |
| name               | 姓名                                    |
| given_name         | 名字                                    |
| family_name        | 姓氏                                    |
| middle_name        | 中间名                                  |
| nickname           | 昵称                                    |
| preferred_username | 希望被称呼的名字                        |
| profile            | 基础资料                                |
| picture            | 头像                                    |
| website            | 网站链接                                |
| gender             | 性别                                    |
| zoneinfo           | 时区                                    |
| locale             | 区域                                    |
| updated_at         | 信息更新时间                            |

### 刷新登录态

authenticationClient.refreshLoginState(refreshToken)

> 调用 getLoginStateByAuthCode 后可以获取到 Refresh Token ， 使用 Refresh Token 刷新登录态，并延长 Access Token 有效时间。

#### 参数

- `refreshToken` \<String\> Refresh Token，为了获取 Refresh Token，需要在 scope 参数中加入 offline_access。

#### 示例

```java
LoginState refreshLoginState = authenticationClient.refreshLoginState(refreshToken);
```

#### 示例数据

```json
{
  "accessToken": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InVlTVFVSDI1Ny1DWXQzOUFoblZNVXY2TUZrVjd1Q2xTWVU3T0VMZ1lzNzAifQ.eyJqdGkiOiJpbFFCczNmSVRpSlR5UHpQWDdYdFIiLCJzdWIiOiI2MmEyZmU2NTg4NTMzNTM0N2IwY2IwOWUiLCJpYXQiOjE2NTUyMDgyMDEsImV4cCI6MTY1NjQxNzgwMSwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSIsImlzcyI6Imh0dHBzOi8vdGVzdC5teXNxbC5hdXRoaW5nLWluYy5jby9vaWRjIiwiYXVkIjoiNjI1ZmE0NjgyZTQ1ZmMyNTQ2MzMxZjI1In0.G0yT6ipreRco4LNmJmSoV3753MMmrnNaLe4Vikw4zEPDLHwAEtsxO2C92R3natBTo6SUrGES8l_rknjAnVC0GjxDWhmt28TrXe0OEnafcsFLWbT2Q_qXJS3QcW_eeDpqIgibGY8fmHNydQ3WqC69mOvhW20YXmKLdhxBpgxzn9g95tbEadV9_y1e-5n_HCjBd6BRJn2-X_uIGgkKwNQFrzOhQ5GlFZH7ejoajvIQcx8gZhJDU-3dUi2g_xWwBkvvTSwXvXzP_rFvpaXxlHj75amgS0YPNm61lawChNzWhuJtucY4XNmFiTOwb1DTKsZNGsRUiFnzfxZffpgPZT89lA",
  "idToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MmEyZmU2NTg4NTMzNTM0N2IwY2IwOWUiLCJiaXJ0aGRhdGUiOm51bGwsImZhbWlseV9uYW1lIjpudWxsLCJnZW5kZXIiOiJVIiwiZ2l2ZW5fbmFtZSI6bnVsbCwibG9jYWxlIjpudWxsLCJtaWRkbGVfbmFtZSI6bnVsbCwibmFtZSI6bnVsbCwibmlja25hbWUiOm51bGwsInBpY3R1cmUiOiJodHRwczovL3MzLWltZmlsZS5mZWlzaHVjZG4uY29tL3N0YXRpYy1yZXNvdXJjZS92MS92Ml83NjAxMjk3MC01YjgxLTQ3YWUtODRlNy0wYjFkNGVkMjAwYWd-P2ltYWdlX3NpemU9NzJ4NzImY3V0X3R5cGU9JnF1YWxpdHk9JmZvcm1hdD1pbWFnZSZzdGlja2VyX2Zvcm1hdD0ud2VicCIsInByZWZlcnJlZF91c2VybmFtZSI6bnVsbCwicHJvZmlsZSI6bnVsbCwidXBkYXRlZF9hdCI6IjIwMjItMDYtMTRUMTE6MzE6MDYuNzA3WiIsIndlYnNpdGUiOm51bGwsInpvbmVpbmZvIjpudWxsLCJub25jZSI6IlJ3UVNZWENVdE5ZZTl0NEsiLCJhdF9oYXNoIjoiWjhiOEJNOUYtQTJLMVc3dHVLT1ZxdyIsImF1ZCI6IjYyNWZhNDY4MmU0NWZjMjU0NjMzMWYyNSIsImV4cCI6MTY1NjQxNzgwMSwiaWF0IjoxNjU1MjA4MjAxLCJpc3MiOiJodHRwczovL3Rlc3QubXlzcWwuYXV0aGluZy1pbmMuY28vb2lkYyJ9.psojXChTqdr2S_TeFm1Tq9qoV-AZHVFj3X0pIGqcuwM",
  "refreshToken": undefined,
  "expireAt": 1209600,
  "parsedIDToken": {
    "sub": "62a2fe65885335347b0cb09e",
    "birthdate": null,
    "family_name": null,
    "gender": "U",
    "given_name": null,
    "locale": null,
    "middle_name": null,
    "name": null,
    "nickname": null,
    "picture": "https://s3-imfile.authingcdn.com/static-resource/v1/v2_76012970-5b81-47ae-84e7-0b1d4ed200ag~?image_size=72x72&cut_type=&quality=&format=image&sticker_format=.webp",
    "preferred_username": null,
    "profile": null,
    "updated_at": "2022-06-14T11:31:06.707Z",
    "website": null,
    "zoneinfo": null,
    "nonce": "RwQSYXCUtNYe9t4K",
    "at_hash": "Z8b8BM9F-A2K1W7tuKOVqw",
    "aud": "625fa4682e45fc2546331f2",
    "exp": 1656417801,
    "iat": 1655208201,
    "iss": "https://core.authing.cn/oidc"
  },
  "parsedAccessToken": {
    "jti": "ilQBs3fITiJTyPzPX7XtR",
    "sub": "62a2fe65885335347b0cb09e",
    "iat": 1655208201,
    "exp": 1656417801,
    "scope": "openid profile",
    "iss": "https://core.authing.cn/oidc",
    "aud": "625fa4682e45fc2546331f25"
  }
}
```

### 生成登出 URL

authenticationClient.buildLogoutUrl(logoutUrlParams)

> 生成登出 URL。

#### 参数

- `logoutUrlParams` \<logoutUrlParams\> 发起授权登录时需要填写的参数。
- `idTokenHint` \<String\> 用户登录时获取的 ID Token，用于无效化用户 Token，建议传入。
- `state` \<String\> 传递到目标 URL 的中间状态标识符。
- `postLogoutRedirectUri` \<String\> 登出完成后的重定向目标 URL，覆盖初始化参数中的对应设置。

#### 示例

```java
LogoutUrlParams logoutUrlParams = new LogoutUrlParams();

String buildLogoutUrl = authenticationClient.buildLogoutUrl(logoutUrlParams);

```

#### 示例数据

```json
authing.cn/oidc/session/end?/oidc/session/end?post_logout_redirect_uri=https%3A%2F%2Fbaidu.com&state=state&id_token_hint=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InVlTVFVSDI1Ny1DWXQzOUFoblZNVXY2TUZrVjd1Q2xTWVU3T0VMZ1lzNzAifQ.eyJqdGkiOiJpbFFCczNmSVRpSlR5UHpQWDdYdFIiLCJzdWIiOiI2MmEyZmU2NTg4NTMzNTM0N2IwY2IwOWUiLCJpYXQiOjE2NTUyMDgyMDEsImV4cCI6MTY1NjQxNzgwMSwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSIsImlzcyI6Imh0dHBzOi8vdGVzdC5teXNxbC5hdXRoaW5nLWluYy5jby9vaWRjIiwiYXVkIjoiNjI1ZmE0NjgyZTQ1ZmMyNTQ2MzMxZjI1In0.G0yT6ipreRco4LNmJmSoV3753MMmrnNaLe4Vikw4zEPDLHwAEtsxO2C92R3natBTo6SUrGES8l_rknjAnVC0GjxDWhmt28TrXe0OEnafcsFLWbT2Q_qXJS3QcW_eeDpqIgibGY8fmHNydQ3WqC69mOvhW20YXmKLdhxBpgxzn9g95tbEadV9_y1e-5n_HCjBd6BRJn2-X_uIGgkKwNQFrzOhQ5GlFZH7ejoajvIQcx8gZhJDU-3dUi2g_xWwBkvvTSwXvXzP_rFvpaXxlHj75amgS0YPNm61lawChNzWhuJtucY4XNmFiTOwb1DTKsZNGsRUiFnzfxZffpgPZT89lA
```

### 验证并解析 ID Token

authenticationClient.parseIDToken(IDToken)

> 验证并解析 ID Token, 获取部分用户信息。

#### 参数

- `IDToken` \<string\> 用户登录时获取的 ID Token。

#### 示例

```java
authenticationClient.parseIDToken(IDToken);
```

#### 示例数据

```json
{
  "sub": "62a2fe65885335347b0cb09e",
  "birthdate": null,
  "family_name": null,
  "gender": "U",
  "given_name": null,
  "locale": null,
  "middle_name": null,
  "name": null,
  "nickname": null,
  "picture": "https://s3-imfile.authingcdn.com/static-resource/v1/v2_76012970-5b81-47ae-84e7-0b1d4ed200ag~?image_size=72x72&cut_type=&quality=&format=image&sticker_format=.webp",
  "preferred_username": null,
  "profile": null,
  "updated_at": "2022-06-14T11:31:06.707Z",
  "website": null,
  "zoneinfo": null,
  "nonce": "RwQSYXCUtNYe9t4K",
  "at_hash": "Z8b8BM9F-A2K1W7tuKOVqw",
  "aud": "625fa4682e45fc2546331f2",
  "exp": 1656417801,
  "iat": 1655208201,
  "iss": "https://core.authing.cn/oidc"
}
```

字段解释：

| 字段名             | 翻译                                                               |
| :----------------- | :----------------------------------------------------------------- |
| sub                | subject 的缩写，唯一标识，一般为用户 ID                            |
| name               | 姓名                                                               |
| given_name         | 名字                                                               |
| family_name        | 姓氏                                                               |
| middle_name        | 中间名                                                             |
| nickname           | 昵称                                                               |
| preferred_username | 希望被称呼的名字                                                   |
| profile            | 基础资料                                                           |
| picture            | 头像                                                               |
| website            | 网站链接                                                           |
| gender             | 性别                                                               |
| birthdate          | 生日                                                               |
| zoneinfo           | 时区                                                               |
| locale             | 区域                                                               |
| updated_at         | 信息更新时间                                                       |
| nonce              | 发起认证时携带的随机字符串                                         |
| aud                | 标识令牌的目标接收方，这里一般是你的 authing 应用 ID               |
| exp                | “exp”（过期时间）声明指定只能在哪个时间（含）之前接受 JWT 的处理。 |
| iat                | “Issued At”表示针对此令牌进行身份验证的时间。                      |
| iss                | OIDC 认证信息者的唯一标识。一般是一个 https 的 url。                           |
| at_hash            | Access Token 的 hash 值                                            |

### 验证并解析 Access Token

authenticationClient.parseAccessToken(accessToken)

> 验证并解析 Access Token

#### 参数

- `accessToken` \<string\> Authing 颁发的 Access Token

#### 示例

```java
authenticationClient.parseAccessToken(accessToken);
```

#### 示例数据

```json
{
  "jti": "ilQBs3fITiJTyPzPX7XtR",
  "sub": "62a2fe65885335347b0cb09e",
  "iat": 1655208201,
  "exp": 1656417801,
  "scope": "openid profile",
  "iss": "https://core.authing.cn/oidc",
  "aud": "625fa4682e45fc2546331f25"
}
```

字段解释：

| 字段名 | 翻译                                                               |
| :----- | :----------------------------------------------------------------- |
| jti    | 令牌标识符声明                                                     |
| sub    | subject 的缩写，唯一标识，一般为用户 ID                            |
| iat    | “Issued At”表示针对此令牌进行身份验证的时间。                      |
| exp    | “exp”（过期时间）声明指定只能在哪个时间（含）之前接受 JWT 的处理。 |
| scope  | 应用侧向 Authing 请求的权限                                        |
| iss    | OIDC 认证信息者的唯一标识。一般是一个 https 的 url。                                                                |
| aud    | 标识令牌的目标接收方，这里一般是你的 authing 应用 ID |

