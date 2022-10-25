# 多因素认证 API

<LastUpdated/>

## MFA 检测

检测手机号或者邮箱是否可以被用作 MFA。

```dart
static Future<bool> mfaCheck(String? phone, String? email) async
```

**参数**

* *phone* 被检测的手机号。可以为空
* *email* 被检测的邮箱。可以为空

**示例**

```dart
bool r1 = await AuthClient.mfaCheck("188xxxx8888", null);
bool r2 = await AuthClient.mfaCheck(null, "abc@gmail.com");
```

<br>

## 短信验证

通过短信进行多因素认证，调用此接口之前，需要先调用[发送短信验证码](https://docs.authing.cn/v2/reference/sdk-for-flutter/authentication/#发送短信验证码)接口以获取短信验证码。

```dart
static Future<AuthResult> mfaVerifyByPhone(String phone, String code) async
```

**参数**

* *phone* 手机号码
* *code* 短信验证码

**示例**

```dart
AuthResult result = await AuthClient.mfaVerifyByPhone("188xxxx8888", "1234");
```

<br>

## 邮箱验证

通过邮件验证码进行多因素认证，调用此接口之前，需要先调用[发送邮件](https://docs.authing.cn/v2/reference/sdk-for-flutter/authentication/#发送邮件)获取验证码。

```dart
static Future<AuthResult> mfaVerifyByEmail(String email, String code) async
```

**参数**

* *email* 邮箱地址
* *code* 邮件验证码

**示例**

```dart
AuthResult result = await AuthClient.mfaVerifyByEmail("1@gmail.com", "1234");
```

<br>

## TOTP 验证

通过一次性密码 TOTP (Time-based One Time Password) 进行多因素认证。

```dart
static Future<AuthResult> mfaVerifyByTOTP(String code) async
```

**参数**

* *code* TOTP code

**示例**

```dart
AuthResult result = await AuthClient.mfaVerifyByTOTP("1234");
```

<br>

## 恢复码验证

用户在绑定 TOTP 时会得到一个恢复码，用户需要安全保存该恢复码，在调用此 API 时，将其作为参数传入。

注意，恢复码验证成功后，会生成新的恢复码，旧的恢复码失效。

```dart
static Future<AuthResult> mfaVerifyByRecoveryCode(String code) async
```

**参数**

* *code* 恢复码

**示例**

```dart
AuthResult result = await AuthClient.mfaVerifyByRecoveryCode("1234");
```

<br>