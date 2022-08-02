# Csharp

本指南将从 Authing Csharp SDK 的安装开始逐步引导你如何快速为你已有或新开发的应用添加用户认证与管理能力。

<AppDetailSiderBar />

## 安装

### Nuget

```powershell
Install-Package Authing.CSharp.SDK
```

## 认证你的用户

认证模块基于 OIDC 标准协议实现，支持获取认证地址、认证、处理认证结果、获取令牌、检查令牌、刷新用户登录态、登出等方法。本模块只支持在服务端调用。

使用方法：

```c#
// 使用 AppId 、APP_SECRET 、 appHost、redirectUri 进行初始化
using Authing.CSharp.SDK.Models.Authentication;
using Authing.CSharp.SDK.Services;

AuthenticationClient authentication = new AuthenticationClient(new AuthenticationClientInitOptions{
				AppId = "AUTHING_APP_ID",
                AppSecret = "AUTHING_SECRET",
                Domain = "AUTHING_DOMAIN",
                RediretUri = "AUTHING_REDIRECTURI",
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
				AppId = "AUTHING_APP_ID",
                AppSecret = "AUTHING_SECRET",
                Domain = "AUTHING_DOMAIN",
                RediretUri = "AUTHING_REDIRECTURI",
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

- `access_token` \<String\> Access token，使用授权码 Code 换取的 Access token 的内容。详情请见[使用 OIDC 授权码模式](https://docs.authing.cn/v2/federation/oidc/authorization-code/)。

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



## 管理你的用户

### 初始化

初始化 `ManagementClient` 需要使用 `accessKeyId` 和 `accessKeySecret` 参数:

```c#
using Authing.CSharp.SDK.Models;
using Authing.CSharp.SDK.Services;

ManagementClientOptions options = new ManagementClientOptions()
{
	AccessKeyId = "AUTHING_USERPOOL_ID",
	AccessKeySecret = "AUTHING_USERPOOL_SECRET"
};

ManagementClient managementClient = new ManagementClient(options);
```

`ManagementClient` 会自动从 Authing 服务器获取 Management API Token，并通过返回的 Token 过期时间自动对 Token 进行缓存。

完整的参数和释义如下：

- `accessKeyId`: Authing 用户池 ID;
- `accessKeySecret`: Authing 用户池密钥;
- `timeout`: 超时时间，单位为 ms，默认为 10000 ms;
- `host`: Authing 服务器地址，默认为 `https://api.authing.cn`。
> 如果你使用的是 Authing 公有云版本，请忽略此参数。如果你使用的是私有化部署的版本，此参数必填，格式如下: https://authing-api.my-authing-service.com（最后不带斜杠 /）。
- `lang`: 接口 Message 返回语言格式（可选），可选值为 zh-CN 和 en-US，默认为 zh-CN。

初始化完成 `ManagementClient` 之后，你可以获取 `ManagementClient` 的实例，然后调用此实例上的方法。例如：

### 创建用户

创建用户，邮箱、手机号、用户名必须包含其中一个

#### 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 |
| ---- | ---- | ---- | ---- | ---- |
| status | string | 否 | Activated | 账户当前状态。 枚举值：`Deleted`,`Suspended`,`Resigned`,`Activated`,`Archived` |
| email | string | 否 |  | 邮箱。 示例值： `test@example.com` |
| passwordEncryptType | string | 否 | none | 加密类型。 枚举值：`sm2`,`rsa`,`none` |
| phone | string | 否 |  | 手机号。 示例值： `176xxxx6754` |
| phoneCountryCode | string | 否 |  | 手机区号。 示例值： `+86` |
| username | string | 否 |  | 用户名，用户池内唯一。 示例值： `bob` |
| name | string | 否 |  | 用户真实名称，不具备唯一性。 示例值： `张三` |
| nickname | string | 否 |  | 昵称。 示例值： `张三` |
| photo | string | 否 |  | 头像链接。 示例值： `https://files.authing.co/authing-console/default-user-avatar.png` |
| gender | string | 否 | U | 性别。 枚举值：`M`,`W`,`U` |
| emailVerified | boolean | 否 |  | 邮箱是否验证。 示例值： `true` |
| phoneVerified | boolean | 否 |  | 手机号是否验证。 示例值： `true` |
| birthdate | string | 否 |  | 出生日期。 示例值： `2022-06-08` |
| country | string | 否 |  | 所在国家。 示例值： `CN` |
| province | string | 否 |  | 所在省份。 示例值： `BJ` |
| city | string | 否 |  | 所在城市。 示例值： `BJ` |
| address | string | 否 |  | 所处地址。 示例值： `北京朝阳` |
| streetAddress | string | 否 |  | 所处街道地址。 示例值： `北京朝阳区 xxx 街道` |
| postalCode | string | 否 |  | 邮政编码号。 示例值： `438100` |
| externalId | string | 否 |  | 第三方外部 ID。 示例值： `10010` |
| departmentIds | array | 否 |  | 用户所属部门 ID 列表。 示例值： `["624d930c3xxxx5c08dd4986e","624d93102xxxx012f33cd2fe"]` |
| customData | object | 否 |  | 自定义数据，传入的对象中的 key 必须先在用户池定义相关自定义字段。 示例值： `[object Object]` |
| password | string | 否 |  | 密码。可选加密方式进行加密，默认为未加密。 示例值： `oqw5bhVmlDwF5qqeVA645bICyMVfFaV3sf3ZTrk5Npcm5dTOmBVo1anyZ5JLfHAz/P45r0QTPo8xS1YdKxIrshx4Ju+g04s9SQqW30ebdVdqcOntIJGAXU6arrkPvfcRFV3ZVTwBdgdRWHMkr5sTcnGNYdgL67P9/jHnzltkLbY=` |
| tenantIds | array | 否 |  | 租户 ID。  |
| identities | array | 否 |  | 第三方身份源（建议调用绑定接口进行绑定）。 示例值： `[object Object]` |
| options | <a href="#CreateUserOptionsDto">CreateUserOptionsDto</a> | 否 |  | 附加选项。  |


#### 示例代码

```csharp

using Authing.CSharp.SDK.Models;
using Authing.CSharp.SDK.Services;
using Authing.CSharp.SDK.Utils;
using Authing.CSharp.SDK.UtilsImpl;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Example
{
    class Program
    {
      private static ManagementClientOptions options;
      private static string ACCESS_Key_ID = "AUTHING_USERPOOL_ID";
      private static string ACCESS_KEY_SECRET = "AUTHING_USERPOOL_SECRET";

      static void Main(string[] args)
      {
          MainAsync().GetAwaiter().GetResult();
      }

      private static async Task MainAsync()
      {
          options = new ManagementClientOptions()
          {
              AccessKeyId = AUTHING_USERPOOL_ID,
              AccessKeySecret = AUTHING_USERPOOL_SECRET,
          };

          ManagementClient managementClient = new ManagementClient(options);
        
          UserSingleRespDto  result = await managementClient.CreateUser
          (  new CreateUserReqDto{                  Status= CreateUserReqDto.status.ACTIVATED ,
                  Email= "test@example.com" ,
                  PasswordEncryptType= CreateUserReqDto.passwordEncryptType.NONE ,
                  Phone= "176xxxx6754" ,
                  PhoneCountryCode= "+86" ,
                  Username= "bob" ,
                  Name= "张三" ,
                  Nickname= "张三" ,
                  Photo= "https://files.authing.co/authing-console/default-user-avatar.png" ,
                  Gender= CreateUserReqDto.gender.M ,
                  EmailVerified= true ,
                  PhoneVerified= true ,
                  Birthdate= "2022-06-08" ,
                  Country= "CN" ,
                  Province= "BJ" ,
                  City= "BJ" ,
                  Address= "北京朝阳" ,
                  StreetAddress= "北京朝阳区 xxx 街道" ,
                  PostalCode= "438100" ,
                  ExternalId= "10010" ,
                  DepartmentIds= new List<string>{"624d930c3xxxx5c08dd4986e","624d93102xxxx012f33cd2fe",} ,
                  CustomData= new {    school="北京大学",    age=22,} ,
                  Password= "oqw5bhVmlDwF5qqeVA645bICyMVfFaV3sf3ZTrk5Npcm5dTOmBVo1anyZ5JLfHAz/P45r0QTPo8xS1YdKxIrshx4Ju+g04s9SQqW30ebdVdqcOntIJGAXU6arrkPvfcRFV3ZVTwBdgdRWHMkr5sTcnGNYdgL67P9/jHnzltkLbY=" ,
                  TenantIds= new List<string>{} ,
                Identities= new List<CreateIdentityDto>
                {
                    new CreateIdentityDto
                    {
                     ExtIdpId= "6076bacxxxxxxxxd80d993b5" ,
            Provider= "wechat" ,
            Type= "openid" ,
            UserIdInIdp= "oj7Nq05R-RRaqak0_YlMLnnIwsvg" ,
                }
                  },
                Options= new CreateUserOptionsDto
                {
                          KeepPassword= false ,
          ResetPasswordOnFirstLogin= false ,
          DepartmentIdType= CreateUserOptionsDto.departmentIdType.DEPARTMENT_ID ,
        },
            }
          );
        }
    }
}

```



#### 请求响应

类型： `UserSingleRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| data | <a href="#UserDto">UserDto</a> | 响应数据 |



示例结果：

```js
{
  "statusCode": 200,
  "message": "操作成功",
  "apiCode": 20001,
  "data": {
    "userId": "6229ffaxxxxxxxxcade3e3d9",
    "status": "Activated",
    "email": "test@example.com",
    "phone": "176xxxx6754",
    "phoneCountryCode": "+86",
    "username": "bob",
    "name": "张三",
    "nickname": "张三",
    "photo": "https://files.authing.co/authing-console/default-user-avatar.png",
    "loginsCount": 3,
    "lastLogin": "2022-04-10T20:24:00.000Z",
    "lastIp": "127.0.0.1",
    "gender": "M",
    "emailVerified": true,
    "phoneVerified": true,
    "birthdate": "2022-06-08",
    "country": "CN",
    "province": "BJ",
    "city": "BJ",
    "address": "北京朝阳",
    "streetAddress": "北京朝阳区 xxx 街道",
    "postalCode": "438100",
    "externalId": "10010",
    "departmentIds": "[\"624d930c3xxxx5c08dd4986e\",\"624d93102xxxx012f33cd2fe\"]",
    "identities": {
      "identityId": "62299d8b866d2dab79a89dc4",
      "extIdpId": "6076bacxxxxxxxxd80d993b5",
      "provider": "wechat",
      "type": "openid",
      "userIdInIdp": "oj7Nq05R-RRaqak0_YlMLnnIwsvg"
    },
    "customData": {
      "school": "北京大学",
      "age": 22
    }
  }
}
```

#### 数据结构


#### <a id="CreateIdentityDto"></a> CreateIdentityDto

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| extIdpId | string | 是 | 外部身份源的 ID， 示例值： `6076bacxxxxxxxxd80d993b5`  |
| provider | string | 是 | 外部身份源类型，如 lark, wechat。 示例值： `wechat`  |
| type | string | 是 | Identity 类型，如 unionid、openid、primary。 示例值： `openid`  |
| userIdInIdp | string | 是 | 在外部身份源的 id， 示例值： `oj7Nq05R-RRaqak0_YlMLnnIwsvg`  |


#### <a id="CreateUserOptionsDto"></a> CreateUserOptionsDto

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| keepPassword | boolean | 否 | 该参数一般在迁移旧有用户数据到 Authing 的时候会设置。开启这个开关，password 字段会直接写入 Authing 数据库，Authing 不会再次加密此字段。如果你的密码不是明文存储，你应该保持开启，并编写密码函数计算。   |
| resetPasswordOnFirstLogin | boolean | 否 | 是否强制要求用户在第一次的时候重置密码。   |
| departmentIdType | string | 否 | 此次调用中使用的父部门 ID 的类型。 枚举值：`department_id`、`open_department_id`  |


#### <a id="UserDto"></a> UserDto

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| userId | string | 是 | 用户 ID。 示例值： `6229ffaxxxxxxxxcade3e3d9`  |
| createdAt | string | 是 | 账号创建时间。   |
| status | string | 是 | 账户当前状态。 枚举值：`Deleted`,`Suspended`,`Resigned`,`Activated`,`Archived`  |
| email | string | 否 | 邮箱。 示例值： `test@example.com`  |
| phone | string | 否 | 手机号。 示例值： `176xxxx6754`  |
| phoneCountryCode | string | 否 | 手机区号。 示例值： `+86`  |
| username | string | 否 | 用户名，用户池内唯一。 示例值： `bob`  |
| name | string | 否 | 用户真实名称，不具备唯一性。 示例值： `张三`  |
| nickname | string | 否 | 昵称。 示例值： `张三`  |
| photo | string | 否 | 头像链接。 示例值： `https://files.authing.co/authing-console/default-user-avatar.png`  |
| loginsCount | number | 否 | 历史总登录次数。 示例值： `3`  |
| lastLogin | string | 否 | 上次登录时间。 示例值： `2022-04-10T20:24:00.000Z`  |
| lastIp | string | 否 | 上次登录 IP。 示例值： `127.0.0.1`  |
| gender | string | 是 | 性别。 枚举值：`M`,`W`,`U`  |
| emailVerified | boolean | 是 | 邮箱是否验证。 示例值： `true`  |
| phoneVerified | boolean | 是 | 手机号是否验证。 示例值： `true`  |
| birthdate | string | 否 | 出生日期。 示例值： `2022-06-08`  |
| country | string | 否 | 所在国家。 示例值： `CN`  |
| province | string | 否 | 所在省份。 示例值： `BJ`  |
| city | string | 否 | 所在城市。 示例值： `BJ`  |
| address | string | 否 | 所处地址。 示例值： `北京朝阳`  |
| streetAddress | string | 否 | 所处街道地址。 示例值： `北京朝阳区 xxx 街道`  |
| postalCode | string | 否 | 邮政编码号。 示例值： `438100`  |
| externalId | string | 否 | 第三方外部 ID。 示例值： `10010`  |
| departmentIds | array | 否 | 用户所属部门 ID 列表。 示例值： `["624d930c3xxxx5c08dd4986e","624d93102xxxx012f33cd2fe"]`  |
| identities | array | 否 | 外部身份源。嵌套类型：<a href="#IdentityDto">IdentityDto</a>。   |
| customData | object | 否 | 自定义数据，传入的对象中的 key 必须先在用户池定义相关自定义字段。 示例值： `[object Object]`  |


#### <a id="IdentityDto"></a> IdentityDto

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| identityId | string | 是 | Identity ID。 示例值： `62299d8b866d2dab79a89dc4`  |
| extIdpId | string | 是 | 外部身份源的 ID。 示例值： `6076bacxxxxxxxxd80d993b5`  |
| provider | string | 是 | 外部身份源类型，如 lark, wechat。 示例值： `wechat`  |
| type | string | 是 | Identity 类型，如 unionid, openid, primary。 示例值： `openid`  |
| userIdInIdp | string | 是 | 在外部身份源的 id。 示例值： `oj7Nq05R-RRaqak0_YlMLnnIwsvg`  |

### 修改用户资料


#### 请求参数

| 名称                | 类型    | 必填 | 默认值    | 描述                                                         |
| ------------------- | ------- | ---- | --------- | ------------------------------------------------------------ |
| userId              | string  | 是   |           | 用户 ID。 示例值： `6229ffaxxxxxxxxcade3e3d9`                |
| phoneCountryCode    | string  | 否   |           | 手机区号。 示例值： `+86`                                    |
| name                | string  | 否   |           | 用户真实名称，不具备唯一性。 示例值： `张三`                 |
| nickname            | string  | 否   |           | 昵称。 示例值： `张三`                                       |
| photo               | string  | 否   |           | 头像链接。 示例值： `https://files.authing.co/authing-console/default-user-avatar.png` |
| externalId          | string  | 否   |           | 第三方外部 ID。 示例值： `10010`                             |
| status              | string  | 否   | Activated | 账户当前状态。 枚举值：`Deleted`,`Suspended`,`Resigned`,`Activated`,`Archived` |
| emailVerified       | boolean | 否   |           | 邮箱是否验证。 示例值： `true`                               |
| phoneVerified       | boolean | 否   |           | 手机号是否验证。 示例值： `true`                             |
| birthdate           | string  | 否   |           | 出生日期。 示例值： `2022-06-08`                             |
| country             | string  | 否   |           | 所在国家。 示例值： `CN`                                     |
| province            | string  | 否   |           | 所在省份。 示例值： `BJ`                                     |
| city                | string  | 否   |           | 所在城市。 示例值： `BJ`                                     |
| address             | string  | 否   |           | 所处地址。 示例值： `北京朝阳`                               |
| streetAddress       | string  | 否   |           | 所处街道地址。 示例值： `北京朝阳区 xxx 街道`                |
| postalCode          | string  | 否   |           | 邮政编码号。 示例值： `438100`                               |
| gender              | string  | 否   | U         | 性别。 枚举值：`M`,`W`,`U`                                   |
| username            | string  | 否   |           | 用户名，用户池内唯一。 示例值： `bob`                        |
| passwordEncryptType | string  | 否   | none      | 加密类型。 枚举值：`sm2`,`rsa`,`none`                        |
| email               | string  | 否   |           | 邮箱。 示例值： `test@example.com`                           |
| phone               | string  | 否   |           | 手机号。 示例值： `176xxxx6754`                              |
| password            | string  | 否   |           | 密码。可选加密方式进行加密，默认为未加密。 示例值： `oqw5bhVmlDwF5qqeVA645bICyMVfFaV3sf3ZTrk5Npcm5dTOmBVo1anyZ5JLfHAz/P45r0QTPo8xS1YdKxIrshx4Ju+g04s9SQqW30ebdVdqcOntIJGAXU6arrkPvfcRFV3ZVTwBdgdRWHMkr5sTcnGNYdgL67P9/jHnzltkLbY=` |
| customData          | object  | 否   |           | 自定义数据，传入的对象中的 key 必须先在用户池定义相关自定义字段。 示例值： `[object Object]` |


#### 示例代码

```csharp

using Authing.CSharp.SDK.Models;
using Authing.CSharp.SDK.Services;
using Authing.CSharp.SDK.Utils;
using Authing.CSharp.SDK.UtilsImpl;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Example
{
    class Program
    {
      private static ManagementClientOptions options;
      private static string ACCESS_Key_ID = "AUTHING_USERPOOL_ID";
      private static string ACCESS_KEY_SECRET = "AUTHING_USERPOOL_SECRET";

      static void Main(string[] args)
      {
          MainAsync().GetAwaiter().GetResult();
      }

      private static async Task MainAsync()
      {
          options = new ManagementClientOptions()
          {
              AccessKeyId = AUTHING_USERPOOL_ID,
              AccessKeySecret = AUTHING_USERPOOL_SECRET,
          };

          ManagementClient managementClient = new ManagementClient(options);
        
          UserSingleRespDto  result = await managementClient.UpdateUser
          (  new UpdateUserReqDto{                  UserId= "6229ffaxxxxxxxxcade3e3d9" ,
                  PhoneCountryCode= "+86" ,
                  Name= "张三" ,
                  Nickname= "张三" ,
                  Photo= "https://files.authing.co/authing-console/default-user-avatar.png" ,
                  ExternalId= "10010" ,
                  Status= UpdateUserReqDto.status.ACTIVATED ,
                  EmailVerified= true ,
                  PhoneVerified= true ,
                  Birthdate= "2022-06-08" ,
                  Country= "CN" ,
                  Province= "BJ" ,
                  City= "BJ" ,
                  Address= "北京朝阳" ,
                  StreetAddress= "北京朝阳区 xxx 街道" ,
                  PostalCode= "438100" ,
                  Gender= UpdateUserReqDto.gender.M ,
                  Username= "bob" ,
                  PasswordEncryptType= UpdateUserReqDto.passwordEncryptType.NONE ,
                  Email= "test@example.com" ,
                  Phone= "176xxxx6754" ,
                  Password= "oqw5bhVmlDwF5qqeVA645bICyMVfFaV3sf3ZTrk5Npcm5dTOmBVo1anyZ5JLfHAz/P45r0QTPo8xS1YdKxIrshx4Ju+g04s9SQqW30ebdVdqcOntIJGAXU6arrkPvfcRFV3ZVTwBdgdRWHMkr5sTcnGNYdgL67P9/jHnzltkLbY=" ,
                  CustomData= new {    school="北京大学",    age=22,} ,
            }
          );
        }
    }
}

```



#### 请求响应

类型： `UserSingleRespDto`

| 名称       | 类型                           | 描述                                                         |
| ---------- | ------------------------------ | ------------------------------------------------------------ |
| statusCode | number                         | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message    | string                         | 描述信息                                                     |
| apiCode    | number                         | 细分错误码，可通过此错误码得到具体的错误类型。               |
| data       | <a href="#UserDto">UserDto</a> | 响应数据                                                     |



示例结果：

```js
{
  "statusCode": 200,
  "message": "操作成功",
  "apiCode": 20001,
  "data": {
    "userId": "6229ffaxxxxxxxxcade3e3d9",
    "status": "Activated",
    "email": "test@example.com",
    "phone": "176xxxx6754",
    "phoneCountryCode": "+86",
    "username": "bob",
    "name": "张三",
    "nickname": "张三",
    "photo": "https://files.authing.co/authing-console/default-user-avatar.png",
    "loginsCount": 3,
    "lastLogin": "2022-04-10T20:24:00.000Z",
    "lastIp": "127.0.0.1",
    "gender": "M",
    "emailVerified": true,
    "phoneVerified": true,
    "birthdate": "2022-06-08",
    "country": "CN",
    "province": "BJ",
    "city": "BJ",
    "address": "北京朝阳",
    "streetAddress": "北京朝阳区 xxx 街道",
    "postalCode": "438100",
    "externalId": "10010",
    "departmentIds": "[\"624d930c3xxxx5c08dd4986e\",\"624d93102xxxx012f33cd2fe\"]",
    "identities": {
      "identityId": "62299d8b866d2dab79a89dc4",
      "extIdpId": "6076bacxxxxxxxxd80d993b5",
      "provider": "wechat",
      "type": "openid",
      "userIdInIdp": "oj7Nq05R-RRaqak0_YlMLnnIwsvg"
    },
    "customData": {
      "school": "北京大学",
      "age": 22
    }
  }
}
```

#### 数据结构


#### <a id="UserDto"></a> UserDto

| 名称             | 类型    | 必填 | 描述                                                         |
| ---------------- | ------- | ---- | ------------------------------------------------------------ |
| userId           | string  | 是   | 用户 ID。 示例值： `6229ffaxxxxxxxxcade3e3d9`                |
| createdAt        | string  | 是   | 账号创建时间。                                               |
| status           | string  | 是   | 账户当前状态。 枚举值：`Deleted`,`Suspended`,`Resigned`,`Activated`,`Archived` |
| email            | string  | 否   | 邮箱。 示例值： `test@example.com`                           |
| phone            | string  | 否   | 手机号。 示例值： `176xxxx6754`                              |
| phoneCountryCode | string  | 否   | 手机区号。 示例值： `+86`                                    |
| username         | string  | 否   | 用户名，用户池内唯一。 示例值： `bob`                        |
| name             | string  | 否   | 用户真实名称，不具备唯一性。 示例值： `张三`                 |
| nickname         | string  | 否   | 昵称。 示例值： `张三`                                       |
| photo            | string  | 否   | 头像链接。 示例值： `https://files.authing.co/authing-console/default-user-avatar.png` |
| loginsCount      | number  | 否   | 历史总登录次数。 示例值： `3`                                |
| lastLogin        | string  | 否   | 上次登录时间。 示例值： `2022-04-10T20:24:00.000Z`           |
| lastIp           | string  | 否   | 上次登录 IP。 示例值： `127.0.0.1`                           |
| gender           | string  | 是   | 性别。 枚举值：`M`,`W`,`U`                                   |
| emailVerified    | boolean | 是   | 邮箱是否验证。 示例值： `true`                               |
| phoneVerified    | boolean | 是   | 手机号是否验证。 示例值： `true`                             |
| birthdate        | string  | 否   | 出生日期。 示例值： `2022-06-08`                             |
| country          | string  | 否   | 所在国家。 示例值： `CN`                                     |
| province         | string  | 否   | 所在省份。 示例值： `BJ`                                     |
| city             | string  | 否   | 所在城市。 示例值： `BJ`                                     |
| address          | string  | 否   | 所处地址。 示例值： `北京朝阳`                               |
| streetAddress    | string  | 否   | 所处街道地址。 示例值： `北京朝阳区 xxx 街道`                |
| postalCode       | string  | 否   | 邮政编码号。 示例值： `438100`                               |
| externalId       | string  | 否   | 第三方外部 ID。 示例值： `10010`                             |
| departmentIds    | array   | 否   | 用户所属部门 ID 列表。 示例值： `["624d930c3xxxx5c08dd4986e","624d93102xxxx012f33cd2fe"]` |
| identities       | array   | 否   | 外部身份源。嵌套类型：<a href="#IdentityDto">IdentityDto</a>。 |
| customData       | object  | 否   | 自定义数据，传入的对象中的 key 必须先在用户池定义相关自定义字段。 示例值： `[object Object]` |


#### <a id="IdentityDto"></a> IdentityDto

| 名称        | 类型   | 必填 | 描述                                                         |
| ----------- | ------ | ---- | ------------------------------------------------------------ |
| identityId  | string | 是   | Identity ID。 示例值： `62299d8b866d2dab79a89dc4`            |
| extIdpId    | string | 是   | 外部身份源的 ID。 示例值： `6076bacxxxxxxxxd80d993b5`        |
| provider    | string | 是   | 外部身份源类型，如 lark, wechat。 示例值： `wechat`          |
| type        | string | 是   | Identity 类型，如 unionid, openid, primary。 示例值： `openid` |
| userIdInIdp | string | 是   | 在外部身份源的 id。 示例值： `oj7Nq05R-RRaqak0_YlMLnnIwsvg`  |

### 获取用户信息


通过 id、username、email、phone、email、externalId 获取用户详情

#### 请求参数

| 名称              | 类型    | 必填 | 默认值 | 描述                                          |
| ----------------- | ------- | ---- | ------ | --------------------------------------------- |
| withCustomData    | boolean | 否   | false  | 是否获取自定义数据。 示例值： `true`          |
| withIdentities    | boolean | 否   | false  | 是否获取 identities。 示例值： `true`         |
| withDepartmentIds | boolean | 否   | false  | 是否获取部门 ID 列表。 示例值： `true`        |
| userId            | string  | 是   |        | 用户 ID。 示例值： `6229ffaxxxxxxxxcade3e3d9` |
| phone             | string  | 否   |        | 手机号。 示例值： `176xxxx6754`               |
| email             | string  | 否   |        | 邮箱。 示例值： `test@example.com`            |
| username          | string  | 否   |        | 用户名。 示例值： `bob`                       |
| externalId        | string  | 否   |        | 原系统 ID。 示例值： `10010`                  |


#### 示例代码

```csharp

using Authing.CSharp.SDK.Models;
using Authing.CSharp.SDK.Services;
using Authing.CSharp.SDK.Utils;
using Authing.CSharp.SDK.UtilsImpl;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Example
{
    class Program
    {
      private static ManagementClientOptions options;
      private static string ACCESS_Key_ID = "AUTHING_USERPOOL_ID";
      private static string ACCESS_KEY_SECRET = "AUTHING_USERPOOL_SECRET";

      static void Main(string[] args)
      {
          MainAsync().GetAwaiter().GetResult();
      }

      private static async Task MainAsync()
      {
          options = new ManagementClientOptions()
          {
              AccessKeyId = AUTHING_USERPOOL_ID,
              AccessKeySecret = AUTHING_USERPOOL_SECRET,
          };

          ManagementClient managementClient = new ManagementClient(options);
        
          UserSingleRespDto  result = await managementClient.GetUser
          (             
                withCustomData: true, 
                withIdentities: true, 
                withDepartmentIds: true, 
                userId: "6229ffaxxxxxxxxcade3e3d9", 
                phone: "176xxxx6754", 
                email: "test@example.com", 
                username: "bob", 
                externalId: "10010"
          );
        }
    }
}

```



#### 请求响应

类型： `UserSingleRespDto`

| 名称       | 类型                           | 描述                                                         |
| ---------- | ------------------------------ | ------------------------------------------------------------ |
| statusCode | number                         | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message    | string                         | 描述信息                                                     |
| apiCode    | number                         | 细分错误码，可通过此错误码得到具体的错误类型。               |
| data       | <a href="#UserDto">UserDto</a> | 响应数据                                                     |



示例结果：

```js
{
  "statusCode": 200,
  "message": "操作成功",
  "apiCode": 20001,
  "data": {
    "userId": "6229ffaxxxxxxxxcade3e3d9",
    "status": "Activated",
    "email": "test@example.com",
    "phone": "176xxxx6754",
    "phoneCountryCode": "+86",
    "username": "bob",
    "name": "张三",
    "nickname": "张三",
    "photo": "https://files.authing.co/authing-console/default-user-avatar.png",
    "loginsCount": 3,
    "lastLogin": "2022-04-10T20:24:00.000Z",
    "lastIp": "127.0.0.1",
    "gender": "M",
    "emailVerified": true,
    "phoneVerified": true,
    "birthdate": "2022-06-08",
    "country": "CN",
    "province": "BJ",
    "city": "BJ",
    "address": "北京朝阳",
    "streetAddress": "北京朝阳区 xxx 街道",
    "postalCode": "438100",
    "externalId": "10010",
    "departmentIds": "[\"624d930c3xxxx5c08dd4986e\",\"624d93102xxxx012f33cd2fe\"]",
    "identities": {
      "identityId": "62299d8b866d2dab79a89dc4",
      "extIdpId": "6076bacxxxxxxxxd80d993b5",
      "provider": "wechat",
      "type": "openid",
      "userIdInIdp": "oj7Nq05R-RRaqak0_YlMLnnIwsvg"
    },
    "customData": {
      "school": "北京大学",
      "age": 22
    }
  }
}
```

#### 数据结构


#### <a id="UserDto"></a> UserDto

| 名称             | 类型    | 必填 | 描述                                                         |
| ---------------- | ------- | ---- | ------------------------------------------------------------ |
| userId           | string  | 是   | 用户 ID。 示例值： `6229ffaxxxxxxxxcade3e3d9`                |
| createdAt        | string  | 是   | 账号创建时间。                                               |
| status           | string  | 是   | 账户当前状态。 枚举值：`Deleted`,`Suspended`,`Resigned`,`Activated`,`Archived` |
| email            | string  | 否   | 邮箱。 示例值： `test@example.com`                           |
| phone            | string  | 否   | 手机号。 示例值： `176xxxx6754`                              |
| phoneCountryCode | string  | 否   | 手机区号。 示例值： `+86`                                    |
| username         | string  | 否   | 用户名，用户池内唯一。 示例值： `bob`                        |
| name             | string  | 否   | 用户真实名称，不具备唯一性。 示例值： `张三`                 |
| nickname         | string  | 否   | 昵称。 示例值： `张三`                                       |
| photo            | string  | 否   | 头像链接。 示例值： `https://files.authing.co/authing-console/default-user-avatar.png` |
| loginsCount      | number  | 否   | 历史总登录次数。 示例值： `3`                                |
| lastLogin        | string  | 否   | 上次登录时间。 示例值： `2022-04-10T20:24:00.000Z`           |
| lastIp           | string  | 否   | 上次登录 IP。 示例值： `127.0.0.1`                           |
| gender           | string  | 是   | 性别。 枚举值：`M`,`W`,`U`                                   |
| emailVerified    | boolean | 是   | 邮箱是否验证。 示例值： `true`                               |
| phoneVerified    | boolean | 是   | 手机号是否验证。 示例值： `true`                             |
| birthdate        | string  | 否   | 出生日期。 示例值： `2022-06-08`                             |
| country          | string  | 否   | 所在国家。 示例值： `CN`                                     |
| province         | string  | 否   | 所在省份。 示例值： `BJ`                                     |
| city             | string  | 否   | 所在城市。 示例值： `BJ`                                     |
| address          | string  | 否   | 所处地址。 示例值： `北京朝阳`                               |
| streetAddress    | string  | 否   | 所处街道地址。 示例值： `北京朝阳区 xxx 街道`                |
| postalCode       | string  | 否   | 邮政编码号。 示例值： `438100`                               |
| externalId       | string  | 否   | 第三方外部 ID。 示例值： `10010`                             |
| departmentIds    | array   | 否   | 用户所属部门 ID 列表。 示例值： `["624d930c3xxxx5c08dd4986e","624d93102xxxx012f33cd2fe"]` |
| identities       | array   | 否   | 外部身份源。嵌套类型：<a href="#IdentityDto">IdentityDto</a>。 |
| customData       | object  | 否   | 自定义数据，传入的对象中的 key 必须先在用户池定义相关自定义字段。 示例值： `[object Object]` |


#### <a id="IdentityDto"></a> IdentityDto

| 名称        | 类型   | 必填 | 描述                                                         |
| ----------- | ------ | ---- | ------------------------------------------------------------ |
| identityId  | string | 是   | Identity ID。 示例值： `62299d8b866d2dab79a89dc4`            |
| extIdpId    | string | 是   | 外部身份源的 ID。 示例值： `6076bacxxxxxxxxd80d993b5`        |
| provider    | string | 是   | 外部身份源类型，如 lark, wechat。 示例值： `wechat`          |
| type        | string | 是   | Identity 类型，如 unionid, openid, primary。 示例值： `openid` |
| userIdInIdp | string | 是   | 在外部身份源的 id。 示例值： `oj7Nq05R-RRaqak0_YlMLnnIwsvg`  |

### 删除用户

删除用户（支持批量删除）

#### 请求参数

| 名称    | 类型  | 必填 | 默认值 | 描述                                            |
| ------- | ----- | ---- | ------ | ----------------------------------------------- |
| userIds | array | 是   |        | 用户 ID 列表。 示例值： `["userId1","userId2"]` |


#### 示例代码

```csharp

using Authing.CSharp.SDK.Models;
using Authing.CSharp.SDK.Services;
using Authing.CSharp.SDK.Utils;
using Authing.CSharp.SDK.UtilsImpl;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Example
{
    class Program
    {
      private static ManagementClientOptions options;
      private static string ACCESS_Key_ID = "AUTHING_USERPOOL_ID";
      private static string ACCESS_KEY_SECRET = "AUTHING_USERPOOL_SECRET";

      static void Main(string[] args)
      {
          MainAsync().GetAwaiter().GetResult();
      }

      private static async Task MainAsync()
      {
          options = new ManagementClientOptions()
          {
              AccessKeyId = AUTHING_USERPOOL_ID,
              AccessKeySecret = AUTHING_USERPOOL_SECRET,
          };

          ManagementClient managementClient = new ManagementClient(options);
        
          IsSuccessRespDto  result = await managementClient.DeleteUsersBatch
          (  new DeleteUsersBatchDto{                  UserIds= new List<string>{"userId1","userId2",} ,
            }
          );
        }
    }
}

```



#### 请求响应

类型： `IsSuccessRespDto`

| 名称       | 类型                                     | 描述                                                         |
| ---------- | ---------------------------------------- | ------------------------------------------------------------ |
| statusCode | number                                   | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message    | string                                   | 描述信息                                                     |
| apiCode    | number                                   | 细分错误码，可通过此错误码得到具体的错误类型。               |
| data       | <a href="#IsSuccessDto">IsSuccessDto</a> | 操作是否成功                                                 |



示例结果：

```js
{
  "statusCode": 200,
  "message": "操作成功",
  "apiCode": 20001,
  "data": {
    "success": true
  }
}
```

#### 数据结构


#### <a id="IsSuccessDto"></a> IsSuccessDto

| 名称    | 类型    | 必填 | 描述                           |
| ------- | ------- | ---- | ------------------------------ |
| success | boolean | 是   | 操作是否成功。 示例值： `true` |

## 错误处理

`ManagementClient` 中的每个方法，遵循统一的返回结构：

- `statusCode`: 请求是否成功状态码，当 `statusCode` 为 200 时，表示操作成功，非 200 全部为失败。
- `apiCode`: 细分错误码，当 `apiCode` 非 200 时，可通过此错误码得到具体的错误类型。
- `message`: 具体的错误信息。
- `data`: 具体返回的接口数据。

一般情况下，如果你只需要判断操作是否成功，只需要对比一下 `code` 是否为 200。如果非 200，可以在代码中通抛出异常或者任何你项目中使用的异常处理方式。

```c#
UserSingleRespDto userSingleRespDto =await managementClient.GetUser("61c188ccfff26fef0ca6880d");

if (userSingleRespDto.StatusCode !== 200) 
{
	throw new Exception(userSingleRespDto.Message); // 抛出异常，由全局异常捕捉中间件进行异常捕捉
}
  // 继续你的业务逻辑 ...
```

