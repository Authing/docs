# Flutter

<LastUpdated/>

本指南将逐步引导你如何使用 Authing Flutter SDK 为你提供的基础认证能力。

<AppDetailSiderBar />

## 安装

### 代码地址

| 条目     | 说明                                                         |
| -------- | ------------------------------------------------------------ |
| 支持平台 | Android, iOS                                                 |
| 仓库地址 | [https://pub.dev/packages/authing_sdk](https://pub.dev/packages/authing_sdk) |

<br>

### 第一步：添加依赖

在工程的 pubspec.yaml 中，添加以下依赖：

```yaml
authing_sdk: ^1.0.0
```

### 第二步：初始化

App 启动时，初始化 Authing Flutter SDK

```dart
import 'package:authing_sdk/authing.dart';

Authing.init(String userPoolId, String appId)
```

`userPoolId` 为 Authing 控制台用户池 ID

 `appId` 为 Authing 控制台应用 ID



## 认证你的用户

>如果使用 Native 登录不使用 WebView，只需要调用 [OIDC 协议账号密码登录](#OIDC-协议账号密码登录) 即可登录。

### 生成 OIDC 协议的用户登录链接

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

### code 换 token

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

### 邮箱密码注册

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

### 账号密码登录

通过 OIDC 账号密码登录，返回的 User 里面包含用户信息以及 access token , id token 和 refresh token。

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

### 通过 refresh token 获取新的 access token 和 id token

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

## 错误处理

当 code 不为 200 时，错误信息将通过 result.message 返回

```dart
AuthResult result = await OIDCClient.getNewAccessTokenByRefreshToken("refreshToken");
    if (result.code == 200) {
    } else {
        //error
    }
}
    
```

