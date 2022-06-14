# 认证模块

此模块是基于 OIDC 标准协议进行认证的，支持获取认证地址、认证、获取令牌、检查令牌、登出等方法。本模块只支持在服务端调用。

使用方法：

```javascript
// 使用 AppId 、APP_SECRET 、 appHost、redirectUri 进行初始化
import { AuthenticationClient } from "authing-node-sdk";

const authentication = new AuthenticationClient(
  APP_ID,
  APP_SECRET,
  APP_HOST,
  redirectUri
);
```

```javascript
authenticationClient.loginWithRedirect; // 将用户浏览器重定向到 Authing 的认证发起 URL 进行认证
authenticationClient.buildAuthUrl; // 构造前端登录链接
authenticationClient.handleRedirectCallback; // 在应用回调端点处理认证返回结果
authenticationClient.getLoginStateByAuthCode; // 用授权码获取用户登录态
authenticationClient.getUserInfo; // 用 Access Token 获取用户身份信息
authenticationClient.refreshLoginState; // 用 Refresh Token 刷新用户的登录态，延长过期时间
authenticationClient.logoutWithRedirect; // 将浏览器重定向到 Authing 的登出发起 URL 进行登出
authenticationClient.buildLogoutUrl; // 生成登出 URL
authenticationClient.parseAccessToken; // 验证并解析 Access Token
authenticationClient.parseIDToken; // 验证并解析 ID Token
```

### 初始化

初始化 AuthenticationClient 时的参数：

- `appId` \<String\> Authing 应用 ID ;
- `appSecret` \<String\> Authing 应用 Secret;
- `host` \<String\> 应用对应的用户池域名，例如 pool.authing.cn;
- `redirectUri` \<String\> 认证完成后的重定向目标 URL, 认证时会进行校验，需要和控制台的设置保持一致。
- `logoutRedirectUri` \<String\> 登出完成后的重定向目标 URL。
- `scope` \<String\> 应用侧向 Authing 请求的权限，以空格分隔，默认为 'openid profile'，成功获取的权限会出现在 Access Token 的 scope 字段中。
- `serverJWKS` \<String\> 服务端的 JWKS 公钥，用于验证 Token 签名，默认会通过网络请求从服务端的 JWKS 端点自动获取。
- `cookieKey` \<String\> 存储认证上下文的 Cookie 名称。

#### 示例

```javascript
// 使用 AppId、 AppSecret、AppHost、redirectUri 进行初始化
const authingClient = new AuthenticationClient(
  APP_ID,
  APP_SECRET,
  APP_HOST,
  redirectUri
);
```

### 将用户浏览器重定向到 Authing 的认证发起 URL 进行认证

```js
authenticationClient.loginWithRedirect(options);
```

> 用户发起认证请求，你可以在服务端直接调用这个方法，通过操作请求的 response 对象，把用户的浏览器重定向到 Authing 的认证发起 URL 进行认证

#### 参数

- `res` \<ServerResponse\> 通过操作 response 对象，直接将用户的浏览器 302 重定向到 Authing 的认证发起 URL。
- `options` \<options\> 发起授权登录时需要填写的参数。
- `options.scope` \<String\> 应用侧向 Authing 请求的权限，覆盖初始化参数中的对应设置。
- `options.nonce` \<String\> 随机字符串，选填，默认自动生成。
- `options.state` \<String\> 随机字符串，选填，默认自动生成。
- `options.redirectUri` \<String\> 回调地址，覆盖初始化参数中的对应设置。
- `options.forced` \<Boolean\> 即便用户已经登录也强制显示登录页。

### 生成用户登录链接

authenticationClient.buildAuthUrl(options)

> 调用方法，生成用户登录链接返回给客户端，在合适的时机触发登录认证流程

#### 参数

- `options` \<options\> 发起授权登录时需要填写的参数。
- `options.scope` \<String\> 应用侧向 Authing 请求的权限，覆盖初始化参数中的对应设置。
- `options.nonce` \<String\> 随机字符串，选填，默认自动生成。
- `options.state` \<String\> 随机字符串，选填，默认自动生成。
- `options.redirectUri` \<String\> 回调地址，覆盖初始化参数中的对应设置。
- `options.forced` \<Boolean\> 即便用户已经登录也强制显示登录页。

#### 示例

```javascript
// 生成认证地址，用户通过认证地址进行登录，并携带 Code 和 state 跳转到指定的 redirectUri
const authUrl = authenticationClient.buildAuthUrl({
  scope: "openid profile",
  state: "随机字符串",
  nonce: "随机字符串",
  redirectUri: "www.authing.cn",
  forced: false
});
```

#### 示例数据

```js
 {
    url: 'https://core.authing.cn/oidc/auth?redirect_uri=https%3A%2F%2Fbaidu.com&response_mode=query&response_type=code&client_id=625fa4682e45fc2546331f25&scope=openid%20profile&state=AHyb4cXlwYbYtuFP&nonce=0BChaRhqezrMup1D',
    state:  "随机字符串",
    nonce:  "随机字符串"
  }
```

### 应用回调端点处理认证返回结果

```js
authenticationClient.handleRedirectCallback(req， res)
```

> 用户完成认证后，跳转到回调地址，通过调用本方法，校验 state 值，并消费 code 获取相应的登录信息

#### 参数

- `req` \<IncomingMessage\> IncomingMessage 对象由 Server 或 ClientRequest 创建，并作为第一个参数分别传递给 “request” 和 “response” 事件。它可用于访问响应状态、标题和数据，在这里，我们用它来获取 request 对象，用于获取认证结果和上下文 Cookie。
- `res` \<ServerResponse\> response 对象，用于清除上下文 Cookie。

#### 示例

```javascript
const result = authenticationClient.handleRedirectCallback(req, res);
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
    "iss": "https://test.mysql.authing-inc.co/oidc"
  },
  "parsedAccessToken": {
    "jti": "ilQBs3fITiJTyPzPX7XtR",
    "sub": "62a2fe65885335347b0cb09e",
    "iat": 1655208201,
    "exp": 1656417801,
    "scope": "openid profile",
    "iss": "https://test.mysql.authing-inc.co/oidc",
    "aud": "625fa4682e45fc2546331f25"
  }
}
```

字段解释：

| 字段名            | 含义                                                                       |
| ----------------- | -------------------------------------------------------------------------- |
| accessToken       | Access token，Authing 颁发的 Access token                                  |
| idToken           | ID token，Authing 颁发的用户的身份凭证，通过解密，可以获取到一部分用户信息 |
| refreshToken      | 用来刷新用户的登录态，延长过期时间                                         |
| expireAt          | 过期时间                                                                   |
| parsedIDToken     | 解析 id token 的结果，具体字段在下面有解释                                 |
| parsedAccessToken | 解析 access token 的结果，具体字段在下面有解释                             |

### 用授权码获取用户登录态

authenticationClient.getLoginStateByAuthCode(code, redirectUri)

> 使用授权码 Code 获取用户的登录态信息。

#### 参数

- `code` \<String\> 授权码 Code，用户在认证成功后，Authing 会将授权码 Code 发送到回调地址，每个 Code 只能使用一次。
- `redirectUri` \<String\> 发起认证时传入的回调地址。

#### 示例

```javascript
const res = authenticationClient.getLoginStateByAuthCode(code, redirectUri);
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
    "iss": "https://test.mysql.authing-inc.co/oidc"
  },
  "parsedAccessToken": {
    "jti": "ilQBs3fITiJTyPzPX7XtR",
    "sub": "62a2fe65885335347b0cb09e",
    "iat": 1655208201,
    "exp": 1656417801,
    "scope": "openid profile",
    "iss": "https://test.mysql.authing-inc.co/oidc",
    "aud": "625fa4682e45fc2546331f25"
  }
}
```

### Token 换用户信息

authenticationClient.getUserInfo(accessToken)

> 使用 Access token 获取用户信息。

#### 参数

- `access_token` \<String\> Access token，使用授权码 Code 换取的 Access token 的内容。详情请见[使用 OIDC 授权码模式](/federation/oidc/authorization-code/)。

#### 示例

```javascript
const res = authenticationClient.getUserInfo("Access token");
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
| birthdate          | 生日                                    |
| zoneinfo           | 时区                                    |
| locale             | 区域                                    |
| updated_at         | 信息更新时间                            |

### 刷新登录态

authenticationClient.refreshLoginState(refreshToken)

> 使用 Refresh token 刷新登录态，并延长 accessToken 有效时间。

#### 参数

- `refreshToken` \<String\> Refresh token，为了获取 Refresh Token，需要在 scope 参数中加入 offline_access, 然后可以从 authenticationClient.getLoginStateByAuthCode 方法的返回值中获得 refresh_token 。

#### 示例

```javascript
const res = authenticationClient.refreshLoginState(refreshToken);
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
    "iss": "https://test.mysql.authing-inc.co/oidc"
  },
  "parsedAccessToken": {
    "jti": "ilQBs3fITiJTyPzPX7XtR",
    "sub": "62a2fe65885335347b0cb09e",
    "iat": 1655208201,
    "exp": 1656417801,
    "scope": "openid profile",
    "iss": "https://test.mysql.authing-inc.co/oidc",
    "aud": "625fa4682e45fc2546331f25"
  }
}
```

### 将浏览器重定向到 Authing 的登出发起 URL 进行登出

authenticationClient.logoutWithRedirect(res, options)

> 将浏览器重定向到 Authing 的登出发起 URL 进行登出。

#### 参数

- `res` \<ServerResponse\> 通过操作 response 对象，直接将用户的浏览器 302 重定向到 Authing 的认证发起 URL。
- `options` \<options\> 发起授权登录时需要填写的参数。
- `options.idToken` \<String\> 用户登录时获取的 ID Token，用于无效化用户 Token，建议传入。
- `options.state` \<String\> 传递到目标 URL 的中间状态标识符。
- `options.redirectUri` \<String\> 登出完成后的重定向目标 URL，覆盖初始化参数中的对应设置。

#### 示例

```javascript
const res = authenticationClient.logoutWithRedirect(res, {
  idToken: "",
  redirectUri: "www.authing.cn",
  state: "随机生成的中间标识"
});
```

### 生成登出 URL

authenticationClient.buildLogoutUrl(options)

> 生成登出 URL。

#### 参数

- `options` \<options\> 发起授权登录时需要填写的参数。
- `options.idToken` \<String\> 用户登录时获取的 ID Token，用于无效化用户 Token，建议传入。
- `options.state` \<String\> 传递到目标 URL 的中间状态标识符。
- `options.redirectUri` \<String\> 登出完成后的重定向目标 URL，覆盖初始化参数中的对应设置。

#### 示例

```javascript
const res = authenticationClient.buildLogoutUrl({
  idToken: "",
  redirectUri: "www.authing.cn",
  state: "随机生成的中间标识"
});
```

#### 示例数据

```json
authing.cn/oidc/session/end?${createQueryParams(params)}
```

### 验证并解析 ID Token

authenticationClient.parseIDToken(IDToken)

> 验证并解析 ID Token, 获取部分用户信息。

#### 参数

- `IDToken` \<string\> 用户登录时获取的 ID Token。

#### 示例

```javascript
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
}
```

字段解释：

| 字段名             | 翻译                                                                             |
| :----------------- | :------------------------------------------------------------------------------- |
| sub                | subject 的缩写，唯一标识，一般为用户 ID                                          |
| name               | 姓名                                                                             |
| given_name         | 名字                                                                             |
| family_name        | 姓氏                                                                             |
| middle_name        | 中间名                                                                           |
| nickname           | 昵称                                                                             |
| preferred_username | 希望被称呼的名字                                                                 |
| profile            | 基础资料                                                                         |
| picture            | 头像                                                                             |
| website            | 网站链接                                                                         |
| gender             | 性别                                                                             |
| birthdate          | 生日                                                                             |
| zoneinfo           | 时区                                                                             |
| locale             | 区域                                                                             |
| updated_at         | 信息更新时间                                                                     |
| nonce              | 发起认证时携带的随机字符串                                                       |
| aud                | 标识令牌的目标接收方                                                             |
| exp                | “exp”（过期时间）声明指定只能在哪个时间（含）之前接受 JWT 的处理。               |
| iat                | “Issued At”表示针对此令牌进行身份验证的时间。                                    |
| iss                | 标识构造并返回令牌的安全令牌服务 (STS)，以及对用户进行身份验证的 Azure AD 租户。 |

### 验证并解析 Access Token

authenticationClient.parseAccessToken(accessToken)

> 验证并解析 Access Token

#### 参数

- `accessToken` \<string\> Authing 颁发的 Access token

#### 示例

```javascript
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
  "iss": "https://test.mysql.authing-inc.co/oidc",
  "aud": "625fa4682e45fc2546331f25"
}
```

字段解释：

| 字段名 | 翻译                                                                             |
| :----- | :------------------------------------------------------------------------------- |
| jti    | 令牌标识符声明                                                                   |
| sub    | subject 的缩写，唯一标识，一般为用户 ID                                          |
| iat    | “Issued At”表示针对此令牌进行身份验证的时间。                                    |
| exp    | “exp”（过期时间）声明指定只能在哪个时间（含）之前接受 JWT 的处理。               |
| scope  | 应用侧向 Authing 请求的权限                                                      |
| iss    | 标识构造并返回令牌的安全令牌服务 (STS)，以及对用户进行身份验证的 Azure AD 租户。 |
| aud    | 标识令牌的目标接收方                                                             |
