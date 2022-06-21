## 认证你的用户

认证模块基于 OIDC 标准协议实现，支持获取认证地址、认证、处理认证结果，获取令牌、检查令牌、刷新用户登录态，登出等方法。本模块只支持在服务端调用。

使用方法：

```c#
// 使用 AppId 、APP_SECRET 、 appHost、redirectUri 进行初始化
using Authing.CSharp.SDK.Models.Authentication;
using Authing.CSharp.SDK.Services;

const authentication = new AuthenticationClient(new AuthenticationClientInitOptions{
  host: "APP_HOST",
  appId: "APP_ID",
  appSecret: "APP_SECRET",
  redirectUri: "redirectUri",
});
```

```c#
authenticationClient.LoginWithRedirect; // 将用户浏览器重定向到 Authing 的认证发起 URL 进行认证
authenticationClient.BuildAuthUrl; // 构造前端登录链接
authenticationClient.HandleRedirectCallback; // 在应用回调端点处理认证返回结果
authenticationClient.GetLoginStateByAuthCode; // 用授权码获取用户登录态
authenticationClient.GetLoginStateByAuthCode; // 用 Access Token 获取用户身份信息
authenticationClient.RefreshLoginState; // 用 Refresh Token 刷新用户的登录态，延长过期时间
authenticationClient.LogoutWithRedirect; // 将浏览器重定向到 Authing 的登出发起 URL 进行登出
authenticationClient.BuildLogoutUrl; // 生成登出 URL
authenticationClient.ParseAccessToken; // 验证并解析 Access Token
authenticationClient.ParseIDToken; // 验证并解析 ID Token
```

### 初始化

初始化 AuthenticationClient 时的参数：

- `appId` \<String\> Authing 应用 ID ;
- `appSecret` \<String\> Authing 应用 Secret;
- `host` \<String\> 应用对应的用户池域名，例如 pool.authing.cn;
- `redirectUri` \<String\> 认证完成后的重定向目标 URL, 认证时会进行校验，需要和控制台的设置保持一致。
- `logoutRedirectUri` \<String\> 登出完成后的重定向目标 URL。
- `scope` \<String\> 应用侧向 Authing 请求的权限，以空格分隔，默认为 'openid profile'，成功获取的权限会出现在 Access Token 的 scope 字段中。
- `serverJWKS` \<JwkSet\> 服务端的 JWKS 公钥，用于验证 Token 签名，默认会通过网络请求从服务端的 JWKS 端点自动获取。
- `cookieKey` \<String\> 存储认证上下文的 Cookie 名称。

```c#
// 使用 AppId、 AppSecret、AppHost、redirectUri 进行初始化
AuthenticationClient authingClient = new AuthenticationClient(new AuthenticationClientInitOptions{
  host: "APP_HOST",
  appId: "APP_ID",
  appSecret: "APP_SECRET",
  redirectUri: "redirectUri",
});

```

### 将用户浏览器重定向到 Authing 的认证发起 URL 进行认证

authenticationClient.LoginWithRedirect(res,scope,nonce,state,redirectUri,forced)

> 用户发起认证请求，你可以在服务端直接调用这个方法，通过操作请求的 response 对象，把用户的浏览器重定向到 Authing 的认证发起 URL 进行认证

#### 参数

- `res` \<HttpResponse\> 通过操作 response 对象，直接将用户的浏览器 302 重定向到 Authing 的认证发起 URL。
- `scope` \<String\> 应用侧向 Authing 请求的权限，覆盖初始化参数中的对应设置。
- `nonce` \<String\> 随机字符串，选填，默认自动生成。
- `state` \<String\> 随机字符串，选填，默认自动生成。
- `redirectUri` \<String\> 回调地址，覆盖初始化参数中的对应设置。
- `forced` \<Boolean\> 即便用户已经登录也强制显示登录页。

### 生成用户登录链接

authenticationClient.BuildAuthUrl(scope,nonce,state,redirectUrl,forced)

> 调用方法，生成用户登录链接返回给客户端，在合适的时机触发登录认证流程

#### 参数

- `scope` \<String\> 应用侧向 Authing 请求的权限，覆盖初始化参数中的对应设置。
- `nonce` \<String\> 随机字符串，选填，默认自动生成。
- `state` \<String\> 随机字符串，选填，默认自动生成。
- `redirectUri` \<String\> 回调地址，覆盖初始化参数中的对应设置。
- `forced` \<Boolean\> 即便用户已经登录也强制显示登录页。

#### 示例

```c#
// 生成认证地址，用户通过认证地址进行登录，并携带 Code 和 state 跳转到指定的 redirectUri
string authUrl = authenticationClient.BuildAuthUrl(
  scope: "openid profile",
  state: "随机字符串",
  nonce: "随机字符串",
  redirectUri: "www.authing.cn",
  forced: false,
);
```

#### 示例数据

```c#
 AuthUrlResult(){
    Url= "https://core.authing.cn/oidc/auth?redirect_uri=https%3A%2F%2Fbaidu.com&response_mode=query&response_type=code&client_id=625fa4682e45fc2546331f25&scope=openid%20profile&state=AHyb4cXlwYbYtuFP&nonce=0BChaRhqezrMup1D",
    State= "随机字符串",
    Nonce= "随机字符串"
  }
```



### 用授权码获取用户登录态

authenticationClient.GetLoginStateByAuthCode(code, redirectUri)

> 使用授权码 Code 获取用户的登录态信息。

#### 参数

- `code` \<String\> 授权码 Code，用户在认证成功后，Authing 会将授权码 Code 发送到回调地址，每个 Code 只能使用一次。
- `redirectUri` \<String\> 发起认证时传入的回调地址。

#### 示例

```c#
LoginState result = authenticationClient.GetLoginStateByAuthCode(code, redirectUri);
```

#### 示例数据

```c#
LoginState(){
  AccessToken= "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InVlTVFVSDI1Ny1DWXQzOUFoblZNVXY2TUZrVjd1Q2xTWVU3T0VMZ1lzNzAifQ.eyJqdGkiOiJpbFFCczNmSVRpSlR5UHpQWDdYdFIiLCJzdWIiOiI2MmEyZmU2NTg4NTMzNTM0N2IwY2IwOWUiLCJpYXQiOjE2NTUyMDgyMDEsImV4cCI6MTY1NjQxNzgwMSwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSIsImlzcyI6Imh0dHBzOi8vdGVzdC5teXNxbC5hdXRoaW5nLWluYy5jby9vaWRjIiwiYXVkIjoiNjI1ZmE0NjgyZTQ1ZmMyNTQ2MzMxZjI1In0.G0yT6ipreRco4LNmJmSoV3753MMmrnNaLe4Vikw4zEPDLHwAEtsxO2C92R3natBTo6SUrGES8l_rknjAnVC0GjxDWhmt28TrXe0OEnafcsFLWbT2Q_qXJS3QcW_eeDpqIgibGY8fmHNydQ3WqC69mOvhW20YXmKLdhxBpgxzn9g95tbEadV9_y1e-5n_HCjBd6BRJn2-X_uIGgkKwNQFrzOhQ5GlFZH7ejoajvIQcx8gZhJDU-3dUi2g_xWwBkvvTSwXvXzP_rFvpaXxlHj75amgS0YPNm61lawChNzWhuJtucY4XNmFiTOwb1DTKsZNGsRUiFnzfxZffpgPZT89lA",
  IdToken= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MmEyZmU2NTg4NTMzNTM0N2IwY2IwOWUiLCJiaXJ0aGRhdGUiOm51bGwsImZhbWlseV9uYW1lIjpudWxsLCJnZW5kZXIiOiJVIiwiZ2l2ZW5fbmFtZSI6bnVsbCwibG9jYWxlIjpudWxsLCJtaWRkbGVfbmFtZSI6bnVsbCwibmFtZSI6bnVsbCwibmlja25hbWUiOm51bGwsInBpY3R1cmUiOiJodHRwczovL3MzLWltZmlsZS5mZWlzaHVjZG4uY29tL3N0YXRpYy1yZXNvdXJjZS92MS92Ml83NjAxMjk3MC01YjgxLTQ3YWUtODRlNy0wYjFkNGVkMjAwYWd-P2ltYWdlX3NpemU9NzJ4NzImY3V0X3R5cGU9JnF1YWxpdHk9JmZvcm1hdD1pbWFnZSZzdGlja2VyX2Zvcm1hdD0ud2VicCIsInByZWZlcnJlZF91c2VybmFtZSI6bnVsbCwicHJvZmlsZSI6bnVsbCwidXBkYXRlZF9hdCI6IjIwMjItMDYtMTRUMTE6MzE6MDYuNzA3WiIsIndlYnNpdGUiOm51bGwsInpvbmVpbmZvIjpudWxsLCJub25jZSI6IlJ3UVNZWENVdE5ZZTl0NEsiLCJhdF9oYXNoIjoiWjhiOEJNOUYtQTJLMVc3dHVLT1ZxdyIsImF1ZCI6IjYyNWZhNDY4MmU0NWZjMjU0NjMzMWYyNSIsImV4cCI6MTY1NjQxNzgwMSwiaWF0IjoxNjU1MjA4MjAxLCJpc3MiOiJodHRwczovL3Rlc3QubXlzcWwuYXV0aGluZy1pbmMuY28vb2lkYyJ9.psojXChTqdr2S_TeFm1Tq9qoV-AZHVFj3X0pIGqcuwM",
  ExpireAt= 1209600,
  ParsedIDToken= {
    Sub= "62a2fe65885335347b0cb09e",
    Birthdate= null,
    FamilyName= null,
    Gender= Gender.U,
    GivenName= null,
    Locale= null,
    Name= null,
    NickName= null,
    Picture= "https://s3-imfile.feishucdn.com/static-resource/v1/v2_76012970-5b81-47ae-84e7-0b1d4ed200ag~?image_size=72x72&cut_type=&quality=&format=image&sticker_format=.webp",
    PreferredUsername= null,
    Profile= null,
    UpdatedAt= "2022-06-14T11:31:06.707Z",
    Website= null,
    ZoneInfo= null,
    Nonce= "RwQSYXCUtNYe9t4K",
    AtHase= "Z8b8BM9F-A2K1W7tuKOVqw",
    Aud= "625fa4682e45fc2546331f2",
    Exp= 1656417801,
    Iat= 1655208201,
    Iss= "https://core.authing.cn/oidc"
  },
  ParsedAccessToken= {
    Jti= "ilQBs3fITiJTyPzPX7XtR",
    Sub= "62a2fe65885335347b0cb09e",
    Iat= 1655208201,
    Exp= 1656417801,
    Scope= "openid profile",
    Iss= "https://core.authing.cn/oidc",
    Aud= "625fa4682e45fc2546331f25"
  }
}
```

### Token 换用户信息

authenticationClient.GetUserInfo(accessToken)

> 使用 Access token 获取用户信息。

#### 参数

- `access_token` \<String\> Access token，使用授权码 Code 换取的 Access token 的内容。详情请见[使用 OIDC 授权码模式](/federation/oidc/authorization-code/)。

#### 示例

```c#
UserInfo result = authenticationClient.GetUserInfo('accessToken');
```

#### 示例数据

```c#
UserInfo(){
      Sub= "62a2fe65885335347b0cb09e",
      Birthdate= null,
      FamilyName= null,
      Gender= Gender.U,
      GivenName= null,
      Locale= null,
      Name= null,
      NickName= null,
      Picture= "https://s3-imfile.feishucdn.com/static-resource/v1/v2_76012970-5b81-47ae-84e7-0b1d4ed200ag~?image_size=72x72&cut_type=&quality=&format=image&sticker_format=.webp",
      PreferredUsername= null,
      Profile= null,
      UpdatedAt= "2022-06-14T11:31:06.707Z",
      Website= null,
      ZoneInfo= null,
    }
```

字段解释：

| 字段名            | 翻译                                    |
| :---------------- | :-------------------------------------- |
| Sub               | subject 的缩写，唯一标识，一般为用户 ID |
| Name              | 姓名                                    |
| GivenName         | 名字                                    |
| FamilyName        | 姓氏                                    |
| NickName          | 昵称                                    |
| PreferredUsername | 希望被称呼的名字                        |
| Profile           | 基础资料                                |
| Picture           | 头像                                    |
| Website           | 网站链接                                |
| Gender            | 性别                                    |
| Birthdate         | 生日                                    |
| Zoneinfo          | 时区                                    |
| Locale            | 区域                                    |
| Updatedat         | 信息更新时间                            |

### 刷新登录态

authenticationClient.RefreshLoginState(refreshToken)

> 使用 Refresh token 刷新登录态，并延长 accessToken 有效时间。

#### 参数

- `refreshToken` \<String\> Refresh token，为了获取 Refresh Token，需要在 scope 参数中加入 offline_access, 然后从 authenticationClient.GetLoginStateByAuthCode 方法的返回值中获得 refresh_token 。

#### 示例

```c#
const result = authenticationClient.RefreshLoginState(refreshToken);
```

#### 示例数据

```c#
LoginState(){
  AccessToken= "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InVlTVFVSDI1Ny1DWXQzOUFoblZNVXY2TUZrVjd1Q2xTWVU3T0VMZ1lzNzAifQ.eyJqdGkiOiJpbFFCczNmSVRpSlR5UHpQWDdYdFIiLCJzdWIiOiI2MmEyZmU2NTg4NTMzNTM0N2IwY2IwOWUiLCJpYXQiOjE2NTUyMDgyMDEsImV4cCI6MTY1NjQxNzgwMSwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSIsImlzcyI6Imh0dHBzOi8vdGVzdC5teXNxbC5hdXRoaW5nLWluYy5jby9vaWRjIiwiYXVkIjoiNjI1ZmE0NjgyZTQ1ZmMyNTQ2MzMxZjI1In0.G0yT6ipreRco4LNmJmSoV3753MMmrnNaLe4Vikw4zEPDLHwAEtsxO2C92R3natBTo6SUrGES8l_rknjAnVC0GjxDWhmt28TrXe0OEnafcsFLWbT2Q_qXJS3QcW_eeDpqIgibGY8fmHNydQ3WqC69mOvhW20YXmKLdhxBpgxzn9g95tbEadV9_y1e-5n_HCjBd6BRJn2-X_uIGgkKwNQFrzOhQ5GlFZH7ejoajvIQcx8gZhJDU-3dUi2g_xWwBkvvTSwXvXzP_rFvpaXxlHj75amgS0YPNm61lawChNzWhuJtucY4XNmFiTOwb1DTKsZNGsRUiFnzfxZffpgPZT89lA",
  IdToken= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MmEyZmU2NTg4NTMzNTM0N2IwY2IwOWUiLCJiaXJ0aGRhdGUiOm51bGwsImZhbWlseV9uYW1lIjpudWxsLCJnZW5kZXIiOiJVIiwiZ2l2ZW5fbmFtZSI6bnVsbCwibG9jYWxlIjpudWxsLCJtaWRkbGVfbmFtZSI6bnVsbCwibmFtZSI6bnVsbCwibmlja25hbWUiOm51bGwsInBpY3R1cmUiOiJodHRwczovL3MzLWltZmlsZS5mZWlzaHVjZG4uY29tL3N0YXRpYy1yZXNvdXJjZS92MS92Ml83NjAxMjk3MC01YjgxLTQ3YWUtODRlNy0wYjFkNGVkMjAwYWd-P2ltYWdlX3NpemU9NzJ4NzImY3V0X3R5cGU9JnF1YWxpdHk9JmZvcm1hdD1pbWFnZSZzdGlja2VyX2Zvcm1hdD0ud2VicCIsInByZWZlcnJlZF91c2VybmFtZSI6bnVsbCwicHJvZmlsZSI6bnVsbCwidXBkYXRlZF9hdCI6IjIwMjItMDYtMTRUMTE6MzE6MDYuNzA3WiIsIndlYnNpdGUiOm51bGwsInpvbmVpbmZvIjpudWxsLCJub25jZSI6IlJ3UVNZWENVdE5ZZTl0NEsiLCJhdF9oYXNoIjoiWjhiOEJNOUYtQTJLMVc3dHVLT1ZxdyIsImF1ZCI6IjYyNWZhNDY4MmU0NWZjMjU0NjMzMWYyNSIsImV4cCI6MTY1NjQxNzgwMSwiaWF0IjoxNjU1MjA4MjAxLCJpc3MiOiJodHRwczovL3Rlc3QubXlzcWwuYXV0aGluZy1pbmMuY28vb2lkYyJ9.psojXChTqdr2S_TeFm1Tq9qoV-AZHVFj3X0pIGqcuwM",
  ExpireAt= 1209600,
  ParsedIDToken= {
    Sub= "62a2fe65885335347b0cb09e",
    Birthdate= null,
    FamilyName= null,
    Gender= Gender.U,
    GivenName= null,
    Locale= null,
    Name= null,
    NickName= null,
    Picture= "https://s3-imfile.feishucdn.com/static-resource/v1/v2_76012970-5b81-47ae-84e7-0b1d4ed200ag~?image_size=72x72&cut_type=&quality=&format=image&sticker_format=.webp",
    PreferredUsername= null,
    Profile= null,
    UpdatedAt= "2022-06-14T11:31:06.707Z",
    Website= null,
    ZoneInfo= null,
    Nonce= "RwQSYXCUtNYe9t4K",
    AtHase= "Z8b8BM9F-A2K1W7tuKOVqw",
    Aud= "625fa4682e45fc2546331f2",
    Exp= 1656417801,
    Iat= 1655208201,
    Iss= "https://core.authing.cn/oidc"
  },
  ParsedAccessToken= {
    Jti= "ilQBs3fITiJTyPzPX7XtR",
    Sub= "62a2fe65885335347b0cb09e",
    Iat= 1655208201,
    Exp= 1656417801,
    Scope= "openid profile",
    Iss= "https://core.authing.cn/oidc",
    Aud= "625fa4682e45fc2546331f25"
  }
}
```



### 生成登出 URL

authenticationClient.BuildLogoutUrl(options)

> 生成登出 URL。

#### 参数

- `idToken` \<String\> 用户登录时获取的 ID Token，用于无效化用户 Token，建议传入。
- `state` \<String\> 传递到目标 URL 的中间状态标识符。
- `redirectUri` \<String\> 登出完成后的重定向目标 URL，覆盖初始化参数中的对应设置。

#### 示例

```c#
string result = authenticationClient.BuildLogoutUrl({
  idToken: "idToken",
  redirectUri: "www.authing.cn",
  state: "随机生成的中间标识"
});
```

#### 示例数据

```c#
authing.cn/oidc/session/end?/oidc/session/end?post_logout_redirect_uri=https%3A%2F%2Fbaidu.com&state=state&id_token_hint=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InVlTVFVSDI1Ny1DWXQzOUFoblZNVXY2TUZrVjd1Q2xTWVU3T0VMZ1lzNzAifQ.eyJqdGkiOiJpbFFCczNmSVRpSlR5UHpQWDdYdFIiLCJzdWIiOiI2MmEyZmU2NTg4NTMzNTM0N2IwY2IwOWUiLCJpYXQiOjE2NTUyMDgyMDEsImV4cCI6MTY1NjQxNzgwMSwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSIsImlzcyI6Imh0dHBzOi8vdGVzdC5teXNxbC5hdXRoaW5nLWluYy5jby9vaWRjIiwiYXVkIjoiNjI1ZmE0NjgyZTQ1ZmMyNTQ2MzMxZjI1In0.G0yT6ipreRco4LNmJmSoV3753MMmrnNaLe4Vikw4zEPDLHwAEtsxO2C92R3natBTo6SUrGES8l_rknjAnVC0GjxDWhmt28TrXe0OEnafcsFLWbT2Q_qXJS3QcW_eeDpqIgibGY8fmHNydQ3WqC69mOvhW20YXmKLdhxBpgxzn9g95tbEadV9_y1e-5n_HCjBd6BRJn2-X_uIGgkKwNQFrzOhQ5GlFZH7ejoajvIQcx8gZhJDU-3dUi2g_xWwBkvvTSwXvXzP_rFvpaXxlHj75amgS0YPNm61lawChNzWhuJtucY4XNmFiTOwb1DTKsZNGsRUiFnzfxZffpgPZT89lA
```

### 验证并解析 ID Token

authenticationClient.ParseIDToken(IDToken)

> 验证并解析 ID Token, 获取部分用户信息。

#### 参数

- `IDToken` \<string\> 用户登录时获取的 ID Token。

#### 示例

```c#
authenticationClient.ParseIDToken(IDToken);
```

#### 示例数据

```c#
IDToken() {
    Sub= "62a2fe65885335347b0cb09e",
    Birthdate= null,
    FamilyName= null,
    Gender= Gender.U,
    GivenName= null,
    Locale= null,
    Name= null,
    NickName= null,
    Picture= "https://s3-imfile.feishucdn.com/static-resource/v1/v2_76012970-5b81-47ae-84e7-0b1d4ed200ag~?image_size=72x72&cut_type=&quality=&format=image&sticker_format=.webp",
    PreferredUsername= null,
    Profile= null,
    UpdatedAt= "2022-06-14T11:31:06.707Z",
    Website= null,
    ZoneInfo= null,
    Nonce= "RwQSYXCUtNYe9t4K",
    AtHase= "Z8b8BM9F-A2K1W7tuKOVqw",
    Aud= "625fa4682e45fc2546331f2",
    Exp= 1656417801,
    Iat= 1655208201,
    Iss= "https://core.authing.cn/oidc"
  }
```

字段解释：

| 字段名            | 翻译                                                         |
| :---------------- | :----------------------------------------------------------- |
| Sub               | subject 的缩写，唯一标识，一般为用户 ID                      |
| Name              | 姓名                                                         |
| GivenName         | 名字                                                         |
| FamiltName        | 姓氏                                                         |
| MiddleName        | 中间名                                                       |
| NickName          | 昵称                                                         |
| PreferredUsername | 希望被称呼的名字                                             |
| Profile           | 基础资料                                                     |
| Picture           | 头像                                                         |
| Website           | 网站链接                                                     |
| Gender            | 性别                                                         |
| Birthdate         | 生日                                                         |
| Zoneinfo          | 时区                                                         |
| Locale            | 区域                                                         |
| UpdatedAt         | 信息更新时间                                                 |
| Nonce             | 发起认证时携带的随机字符串                                   |
| Aud               | 标识令牌的目标接收方                                         |
| Exp               | “exp”（过期时间）声明指定只能在哪个时间（含）之前接受 JWT 的处理。 |
| Iat               | “Issued At”表示针对此令牌进行身份验证的时间。                |
| Iss               | 标识构造并返回令牌的安全令牌服务 (STS)。                     |

### 验证并解析 Access Token

authenticationClient.parseAccessToken(accessToken)

> 验证并解析 Access Token

#### 参数

- `accessToken` \<string\> Authing 颁发的 Access token

#### 示例

```c#
authenticationClient.ParseAccessToken(accessToken);
```

#### 示例数据

```c#
AccessToken {
    Jti= "ilQBs3fITiJTyPzPX7XtR",
    Sub= "62a2fe65885335347b0cb09e",
    Iat= 1655208201,
    Exp= 1656417801,
    Scope= "openid profile",
    Iss= "https://core.authing.cn/oidc",
    Aud= "625fa4682e45fc2546331f25"
  }
```

字段解释：

| 字段名 | 翻译                                                         |
| :----- | :----------------------------------------------------------- |
| Jti    | 令牌标识符声明                                               |
| Sub    | subject 的缩写，唯一标识，一般为用户 ID                      |
| Iat    | “Issued At”表示针对此令牌进行身份验证的时间。                |
| Exp    | “exp”（过期时间）声明指定只能在哪个时间（含）之前接受 JWT 的处理。 |
| Scope  | 应用侧向 Authing 请求的权限                                  |
| Iss    | 标识构造并返回令牌的安全令牌服务 (STS)。                     |
| Aud    | 标识令牌的目标接收方                                         |

