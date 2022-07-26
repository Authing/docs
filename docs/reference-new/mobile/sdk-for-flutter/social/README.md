# 社会化登录 API

<LastUpdated/>

## 微信登录

通过微信 auth code 登录

```dart
static Future<AuthResult> loginByWechat(String connId, String code) async
```

**参数**

- *connId* 在 Authing 的控制台获取的 social connection 配置
- *code* auth 微信返回的 auth code

**示例**

```dart
AuthResult result = await AuthClient.loginByAccount("connId", "code");
```



## 支付宝登录

通过支付宝 auth code 登录

```dart
static Future<AuthResult> loginByAlipay(String connId, String code) async
```

**参数**

- *connId* 在 Authing 的控制台获取的 social connection 配置
- *code* 支付宝返回的 auth code

**示例**

```dart
AuthResult result = await AuthClient.loginByAlipay("connId", "code");
```



## 苹果登录

通过苹果 auth code 登录

```dart
static Future<AuthResult> loginByApple(String code) async
```

**参数**

- *code* auth 苹果返回的 auth code

**示例**

```dart
AuthResult result = await AuthClient.loginByApple("code");
```