# 标准协议 API

<LastUpdated/>

## 生成 OIDC 协议的用户登录链接

生成登录 URL，传给 WebView 加载

```dart
static Future<AuthResult> buildAuthorizeUrl(AuthRequest authRequest) async
```

**参数**

* *authRequest* 请求参数

**示例**

```dart
AuthRequest authRequest = AuthRequest();
authRequest.createAuthRequest();
String url = await OIDCClient.buildAuthorizeUrl(authRequest);
```

**设置 scope 参数**

默认值为 openid profile email phone username address offline_access role extended_fields

```dart
authRequest.scope = "openid"
```

**设置回调参数**

SDK 会自动获取控制台默认回调。如果在控制台修改了回调，则需要设置 authRequest 回调地址。

```dart
authRequest.redirectUrl = "your_uri"
```

<br>

## code 换 token

通过 OIDC 授权码认证，返回的 User 里面包含 access token 和 id token。如果登录 url 的 scope 里面包含 offline_access，则该接口也会返回 refresh token

```dart
static Future<AuthResult> authByCode(String code, String codeVerifier, String redirectUrl) async
```

**参数**

* *code* OIDC 授权码。
* *codeVerifier* PKCE 验证码
* *redirectUrl* 回调 Url

**示例**

```dart
AuthResult result = await AuthClient.authByCode("P6FENDfGSH72PxgJQk17FoGMWY3oL1G0D2PQ1AfyDeo",
        "fu6IivbcEb7DFCytjLmoAICRtFLbG9zkk5QdDbNd0gG",
        "https://guard.authing/redirect");
String ak = result.user?.accessToken;
String idToken = result.user?.token;
```

<br>

## OIDC 邮箱密码注册

使用 OIDC 邮箱注册帐号，邮箱不区分大小写且用户池内唯一。此接口不要求用户对邮箱进行验证，用户注册之后 emailVerified 字段会为 false 。

```dart
static Future<AuthResult> registerByEmail(String email, String password) async
```

**参数**

* *email* 邮箱
* *password* 密码

**示例**

```dart
AuthResult result = await OIDCClient.registerByEmail("email", "password");
User user = result.user; // get user info
```

**错误码**

* 2003 非法邮箱地址
* 2026 邮箱已注册

<br>

## OIDC 用户名注册

通过 OIDC 用户名注册帐号。用户名区分大小写且用户池内唯一。

```dart
static Future<AuthResult> registerByUserName(String username, String password) async
```

**参数**

* *username* 用户名
* *password* 明文密码

**示例**

```dart
AuthResult result = await OIDCClient.registerByUserName("username", "password");
User user = result.user; // get user info
```

**错误码**

* 2026 用户名已存在

<br>

## OIDC 短信验证码注册

通过 OIDC 手机号和短信验证码注册帐号。手机号需要在用户池内唯一。调用此接口之前，需要先调用 [发送短信验证码](hhttps://docs.authing.cn/v2/reference/sdk-for-flutter/authentication/#发送短信验证码) 接口以获取短信验证码

```dart
  static Future<AuthResult> registerByPhoneCode(String phone, String code, String password) async
```

**参数**

* *phone* 手机号
* *code* 短信验证码
* *password* 明文密码

**示例**

```dart
AuthResult result = await OIDCClient.registerByPhoneCode("phone", "code", "password");
User user = result.user; // get user info
```

**错误码**

* 2001 验证码错误
* 2026 手机号已注册

<br>

## OIDC 协议账号密码登录

通过 OIDC 账号密码登录，返回的 User 里面包含 access token , id token 和 refresh token。

```dart
static Future<AuthResult> loginByAccount(String account, String password) async
```

**参数**

* *account* 账号
* *password* 密码

**示例**

```dart
AuthResult results = await OIDCClient.loginByAccount("your account", "your password");
User user = result.user; // user info
```

<br>

## OIDC 协议手机号验证码登录

通过 OIDC 手机号验证码登录，需要先调用 [发送短信验证码](hhttps://docs.authing.cn/v2/reference/sdk-for-flutter/authentication/#发送短信验证码) 接口。返回的 User 里面包含 access token , id token 和 refresh token。

```dart
static Future<AuthResult> loginByPhoneCode(String phone, String code) async
```

**参数**

* *phone* 手机号
* *code* 验证码

**示例**

```dart
AuthResult result = await OIDCClient.loginByPhoneCode("phone", "code");
User user = result.user; // get user info
```

<br>

## 获取用户信息

通过 access token 获取用户信息。返回的 User 对像和参数传入的是同一个 User 对象

```dart
static Future<AuthResult> getUserByAccessToken(String accessToken, [Map? data]) async
```

**参数**

* *User* 包含 access token 的用户信息

**示例**

```dart
AuthResult result = await OIDCClient.getUserByAccessToken("accessToken");
User user = result.user; // get user info
```

<br>

## 通过 refresh token 获取新的 access token 和 id token

access token 的有效期通常较短，比如几个小时或者 1 天。当 access token 过期后，App 不能频繁的弹出登录界面让用户认证，那样体验比较糟糕。所以通常的做法是通过代码，用一个有效期比较长的 refresh token 去刷新 access token，从而保持登录状态。只有当 refresh token 过期才弹出登录界面。

```dart
static Future<AuthResult> getNewAccessTokenByRefreshToken(String refreshToken) async
```

**参数**

* *refreshToken* 刷新凭证。注意登录 URL 里面的参数配置，请参考 “生成 OIDC 协议的用户登录链接”

**示例**

```dart
AuthResult result = await OIDCClient.getNewAccessTokenByRefreshToken("refreshToken");
User user = result.user; // get user info
```

>注意，每次调用会得到新的 refresh token

<br>