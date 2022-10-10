# MFA API

<LastUpdated/>

## MFA check

Check if phone number or email address can be used for MFA

```java
public static void mfaCheck(String phone, String email, @NotNull AuthCallback<JSONObject> callback)
```

**param**

* `phone` phone number to be checked. can be null
* `email` email address to be checked. can be null

**example**

```java
AuthClient.mfaCheck("188xxxx8888", null, (code, message, ok) -> {
    if (code == 200) {
        if (ok) {
            
        }
    }
});

AuthClient.mfaCheck(null, "abc@gmail.com", (code, message, ok) -> {
    if (code == 200) {
        if (ok) {
            
        }
    }
});
```

<br>

## SMS

MFA by SMS

```java
public static void mfaVerifyByPhone(String phone, String code, @NotNull AuthCallback<UserInfo> callback)
```

**param**

* `phone` phone number
* `code` SMS verification code

**example**

```java
AuthClient.mfaVerifyByPhone("188xxxx8888", "1234", (code, message, userInfo)->{
});
```

<br>

## Email

MFA by email

```java
public static void mfaVerifyByEmail(String email, String code, @NotNull AuthCallback<UserInfo> callback)
```

**param**

* `email` email address
* `code` email verification code

**example**

```java
AuthClient.mfaVerifyByEmail("abc@gmail.com", "1234", (code, message, userInfo)->{
});
```

<br>

## TOTP

MFA by TOTP (Time-based One Time Password)

```java
public static void mfaVerifyByTOTP(String code, @NotNull AuthCallback<UserInfo> callback)
```

**param**

* `code` TOTP code

**example**

```java
AuthClient.mfaVerifyByTOTP("1234", (code, message, userInfo)->{
});
```

<br>

## Recovery code

MFA by recovery code. When user binds TOTP, a recovery code will be generated. User should save this code securely and pass it as parameter for this API

>When MFA succeed, a new recovery code will be generated, the old one becomes invalid

```java
public static void mfaVerifyByRecoveryCode(String code, @NotNull AuthCallback<UserInfo> callback)
```

**param**

* `code` recovery code

**example**

```java
AuthClient.mfaVerifyByRecoveryCode("1234", (code, message, userInfo)->{
    // new recovery code
    String newCode = userInfo.getRecoveryCode();
});
```

<br>
