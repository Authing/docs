# Flutter

本指南将从  Authing Flutter SDK 的安装开始逐步引导你如何快速为你已有或新开发的应用添加用户认证能力。

<AppDetailSiderBar />

## 安装

### 代码地址

| 条目     | 说明                                                         |
| -------- | ------------------------------------------------------------ |
| 支持平台 | Android, iOS                                                 |
| 仓库地址 | [https://pub.dev/packages/authing_sdk](https://pub.dev/packages/authing_sdk) |


### 添加依赖


```yaml
#在工程的 pubspec.yaml 中，添加以下依赖：
authing_sdk: ^1.0.0
```

### 初始化


```dart
import 'package:authing_sdk/authing.dart';

Authing.init(String userPoolId, String appId)
```

## 认证你的用户

### 注册


```dart
//使用 OIDC 邮箱注册帐号，邮箱不区分大小写且用户池内唯一。
AuthResult result = await OIDCClient.registerByEmail("邮箱", "密码");
User user = result.user; // get user info
```


### 登录

```dart
//通过 OIDC 账号密码登录
AuthResult result = await OIDCClient.loginByAccount("账号", "密码");
User user = result.user; // user info
```


## 错误处理



```dart
AuthResult result = await OIDCClient.getNewAccessTokenByRefreshToken("refreshToken");
    if (result.code == 200) {
        //当 code 不为 200 时，错误信息将通过 result.message 返回
    } else {
        //error
    }
}
```

