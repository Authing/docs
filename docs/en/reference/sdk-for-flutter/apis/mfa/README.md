# MFA API 

<LastUpdated/>

## MFA check 

Checks if a given phone or email can be used for MFA

```dart
static Future<bool> mfaCheck(String? phone, String? email) async
```

**params**

- *phone* phone number to check. Can be null
- *email* email address to check. Can be null

**example**

```dart
bool r1 = await AuthClient.mfaCheck("188xxxx8888", null);
bool r2 = await AuthClient.mfaCheck(null, "abc@gmail.com");
```



## MFA verify by phone 

MFA by SMS verification code sent to phone

```dart
static Future<AuthResult> mfaVerifyByPhone(String phone, String code) async
```

**params**

- *phone* phone number
- *code* SMS verification code

**example**

```dart
AuthResult result = await AuthClient.mfaVerifyByPhone("188xxxx8888", "1234");
```



## MFA verify by email 

MFA by email verification code

```dart
static Future<AuthResult> mfaVerifyByEmail(String email, String code) async
```

**params**

- *email* email address
- *code* email verification code

**example**

```dart
AuthResult result = await AuthClient.mfaVerifyByEmail("1@gmail.com", "1234");
```



## MFA verify by TOTP 

MFA by TOTP (Time-based One Time Password) code. User must firstly bound with TOTP.

```dart
static Future<AuthResult> mfaVerifyByTOTP(String code) async
```

**params**

- *code* TOTP code

**example**

```dart
AuthResult result = await AuthClient.mfaVerifyByTOTP("1234");
```



## MFA verify by recovery code 

MFA by recovery code which should be safely stored after first time bound with TOTP. Note after successful MFA via this method, the recovery code will be refreshed and returned by this method. User should again safely store the new recovery code.

```dart
static Future<AuthResult> mfaVerifyByRecoveryCode(String code) async
```

**params**

- *code* recovery code

**example**

```dart
AuthResult result = await AuthClient.mfaVerifyByRecoveryCode("1234");
```

<br>