# Flutter

本指南将从 Authing Flutter SDK 的安装开始逐步引导你如何快速为你已有或新开发的应用添加用户认证能力。

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

>如果使用 WebView，需要调用 [生成 OIDC 协议的用户登录链接](#https://docs.authing.cn/v2/reference/sdk-for-flutter/protocol/#生成-oidc-协议的用户登录链接) 获取到授权码，然后调用 [code 换 token](#https://docs.authing.cn/v2/reference/sdk-for-flutter/protocol/#code-换-token) 获取 Token。


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
AuthResult result = await OIDCClient.loginByAccount("your account", "your password");
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

