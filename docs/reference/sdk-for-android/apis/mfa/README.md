# 多因素认证 API

<LastUpdated/>

## MFA 检测

检测手机号或者邮箱是否可以被用作 MFA

```java
public static void mfaCheck(String phone, String email, @NotNull AuthCallback<JSONObject> callback)
```

**参数**

* `phone` 被检测的手机号。可以为空
* `email` 被检测的邮箱。可以为空

**示例**

```java
AuthClient.mfaCheck("188xxxx8888", null, (code, message, ok) -> {
    if (code == 200) {
        if (ok) {
            
        }
    }
});

AuthClient.mfaCheck(null, "test@example.com", (code, message, ok) -> {
    if (code == 200) {
        if (ok) {
            
        }
    }
});
```

<br>

## 短信验证

通过短信进行多因素认证

```java
public static void mfaVerifyByPhone(String phone, String code, @NotNull AuthCallback<UserInfo> callback)
```

**参数**

* `phone` 手机号码
* `code` 短信验证码

**示例**

```java
AuthClient.mfaVerifyByPhone("188xxxx8888", "1234", (code, message, userInfo)->{
    // userInfo 用户信息
});
```

<br>

## 邮箱验证

通过邮件验证码进行多因素认证

```java
public static void mfaVerifyByEmail(String email, String code, @NotNull AuthCallback<UserInfo> callback)
```

**参数**

* `email` 邮箱地址
* `code` 邮件验证码

**示例**

```java
AuthClient.mfaVerifyByEmail("test@example.com", "1234", (code, message, userInfo)->{
    // userInfo 用户信息
});
```

<br>

## TOTP 验证

通过一次性密码 TOTP (Time-based One Time Password) 进行多因素认证

```java
public static void mfaVerifyByTOTP(String code, @NotNull AuthCallback<UserInfo> callback)
```

**参数**

* `code` TOTP code

**示例**

```java
AuthClient.mfaVerifyByTOTP("1234", (code, message, userInfo)->{
    // userInfo 用户信息
});
```

<br>

## 恢复码验证

用户在绑定 TOTP 时会得到一个恢复码，用户需要安全保存该恢复码，在调用此 API 时，将其作为参数传入。

注意，恢复码验证成功后，会生成新的恢复码，旧的恢复码失效

```java
public static void mfaVerifyByRecoveryCode(String code, @NotNull AuthCallback<UserInfo> callback)
```

**参数**

* `code` 恢复码

**示例**

```java
AuthClient.mfaVerifyByRecoveryCode("1234", (code, message, userInfo)->{
    // 新的恢复码
    String newCode = userInfo.getRecoveryCode();
});
```

<br>

## 解绑 MFA 手机号

解除 MFA 绑定手机号。

```java
public static void unBindMfaPhone(@NotNull AuthCallback<JSONObject> callback)
```

**示例**

```java
AuthClient.unBindMfaPhone((code, message, data)->{
    if (code == 200) {
      //请求成功
    }
});
```

<br>

## 解绑 MFA 邮箱

解除 MFA 绑定邮箱。

```java
public static void unBindMfaEmail(@NotNull AuthCallback<JSONObject> callback)
```

**示例**

```java
AuthClient.unBindMfaEmail((code, message, data)->{
    if (code == 200) {
      //请求成功
    }
});
```

<br>
