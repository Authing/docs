# Core Authentication API

<LastUpdated/>

## Use email and password registration

Use the email registration, the mailbox is not case sensitive and the only userpool is unique. This interface does not require the user to verify the mailbox, after the user registration, the emailVerified field will be false.

```swift
func registerByEmail(email: String, password: String, _ context: String? = nil, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**Parameter**

* `email` email address
* `password` password
* `context` Request context, set here `context` you can get [pipeline context](/guides/pipeline/context-object.md) .


**Example**

```swift
AuthClient().registerByEmail(email: "me@gmail.com", password: "strong") { code, message, userInfo in
    if (code == 200) {
        // userInfo
    }
}
```

**Error Code**

* `2003` Illegal email address
* `2026` Registered mailbox

<br>

## Use email and verification code registration

Use the email registration, the mailbox is not case sensitive and the only userpool is unique, you need to call [sendEmail](#Send-email) interface to send a reset password message (the scene value `VERIFY_CODE`).

```swift
func registerByEmailCode(email: String, code: String, _ context: String? = nil, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**Parameter**

* `email` email address
* `code` code
* `context` Request context, set here `context` you can get [pipeline context](/guides/pipeline/context-object.md) .
  
**Example**

```swift
AuthClient().registerByEmailCode(email: "me@gmail.com", code: "code") { code, message, userInfo in
    if (code == 200) {
        // userInfo
    }
}
```

**Error Code**

* `2003` Illegal email address
* `2026` Registered mailbox

<br>

## Register using username

Use the username to register, the username is case sensitive and the only user pool.

```swift
func registerByUserName(username: String, password: String, _ context: String? = nil, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**Parameter**

* `username` username
* `password` password
* `context` Request context, set here `context` you can get [pipeline context](/guides/pipeline/context-object.md) .
  
**Example**

```swift
AuthClient().registerByUserName(username: "username", password: "strong") { code, message, userInfo in
    if (code == 200) {
        // userInfo
    }
}
```

**Error Code**

* `2026` The user name already exists

<br>

## Use mobile phone number registration

Use your mobile phone number to register, you can set the initial password of the account at the same time. You can pass [sendSmsCode](#Send-verification-code) method sends SMS verification code.

```swift
func registerByPhoneCode(phone: String, code: String, password: String, _ context: String? = nil, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**Parameter**

* `phone` The phone number
* `code` SMS verification code
* `password` initial password, it can be null
* `context` Request context, set here `context` you can get [pipeline context](/guides/pipeline/context-object.md) .

**Example**

```swift
AuthClient().registerByPhoneCode(phone: "188xxxx8888", code: "1234", password: "strong") { code, message, userInfo in
    if (code == 200) {
        // userInfo
    }
}
```

**Error Code**

* `2001` SMS verification code error
* `2026` Cell phone number registered

<br>

## Use the email to login

```swift
func loginByEmail(email: String, code: String, _ autoRegister: Bool = false, _ context: String? = nil, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**Parameter**

* `email`  email address
* `code` email verification code
* `autoRegister` Whether to register automatically.If it detects that the user does not exist, an account will be automatically created based on the login account password.
* `context` Request context, set here `context` you can get [pipeline context](/guides/pipeline/context-object.md) .

**Example**

```swift
AuthClient().loginByEmail(email: "email", code: "code") { code, message, userInfo in
    if (code == 200) {
        // userInfo
    }
}
```

**Error Code**

* `2001` email verification code error

<br>

## Use the username to login

```swift
func loginByAccount(account: String, password: String, _ autoRegister: Bool = false, _ context: String? = nil, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**Parameter**

* `account` The phone number / email address / username
* `password` password
* `autoRegister` Whether to register automatically.If it detects that the user does not exist, an account will be automatically created based on the login account password.
* `context` Request context, set here `context` you can get [pipeline context](/guides/pipeline/context-object.md) .

**Example**

```swift
AuthClient().loginByAccount(account: "account", password: "strong") { code, message, userInfo in
    if (code == 200) {
        // userInfo
    }
}
```

**Error Code**

* `2333` The account or password is incorrect

<br>

## Use the mobile phone number verification code to login

Use the mobile phone number verification code to log in. You need to use it first [sendSmsCode](#Send-verification-code) sends a SMS verification code.

```swift
func loginByPhoneCode(phone: String, code: String, _ autoRegister: Bool = false, _ context: String? = nil, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**Parameter**

* `phone` The phone number
* `code` SMS verification code
* `autoRegister` Whether to register automatically.If it detects that the user does not exist, an account will be automatically created based on the login account password.
* `context` Request context, set here `context` you can get [pipeline context](/guides/pipeline/context-object.md) .

**Example**

```swift
AuthClient().loginByPhoneCode(phone: "188xxxx8888", code: "1234") { code, message, userInfo in
    if (code == 200) {
        // userInfo
    }
}
```

**Error Code**

* `2001` SMS verification code error

<br>

## Mobile Fast Auth

```swift
func loginByOneAuth(token: String, accessToken: String, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**Parameter**

* `token` Operators return
* `accessToken` Operators return

**Example**

```swift
AuthClient().loginByOneAuth(token: "token", accessToken: "accessToken") { code, message, userInfo in
    if (code == 200) {
        // userInfo
    }
}
```

**Error Code**

* `2333` The account or password is incorrect

<br>

## Get the user information of current login

Get the user information of the current login user, you need that is currently logged in to get it.

```swift
func getCurrentUser(completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**Example**

```swift
AuthClient().getCurrentUser { code, message, userInfo in
    if (code == 200) {
        // userInfo
    }
}
```

**Error Code**

* `2020` Not logged in

<br>

## Sign out

Log out. Clear token and user information for both memory and local persistence. Authing.getcurrentuser () returns empty after logging out.

```swift
func logout(completion: @escaping(Int, String?) -> Void)
```

**Example**

```swift
AuthClient().logout { code, message in
}
```

**Error Code**

* `1010001` If the user id token is invalid or expired

<br>

## Send verification code

Sends an SMS verification code to the specified mobile phone.

```swift
func sendSms(phone: String, phoneCountryCode: String? = nil, completion: @escaping(Int, String?) -> Void)
```

**Parameter**

* `phoneCountryCode` Telephone country code, If null, the default value is +86
* `phone` The phone number

**Example**

```swift
AuthClient().sendSms(phone: "188xxxx8888", phoneCountryCode: "+86") { code, message in
}
```

**Error Code**

* `500` The mobile phone number format is invalid

<br>

## Send email

Sends an email to the specified mailbox.

```swift
func sendEmail(email: String, scene: String, completion: @escaping(Int, String?) -> Void)
```

**Parameter**

* `email` email address
* `scene` Send a scene, optional value is ：
  - `RESET_PASSWORD`: Send a reset password message, including the verification code.
  - `CHANGE_EMAIL`: Send a modified mailbox message, including the verification code.
  - `MFA_VERIFY`: Send MFA verification email.
  - `VERIFY_CODE`: Send verification email.

**Example**

```swift
AuthClient().sendEmail(email: "cool@gmail.com", scene: "RESET_PASSWORD") { code, message in
    if (code == 200) {
        // success
    }
}
```

**Error Code**

* `1020017` Invalid email address

<br>

## Reset password via SMS verification code

Reset your password by SMS verification code, you can send SMS verification code by [sendSmsCode](#Send-verification-code) method.

```swift
func resetPasswordByPhone(phone: String, code: String, newPassword: String, completion: @escaping(Int, String?) -> Void)
```

**Parameter**

* `phone` The phone number
* `code` SMS Verification code
* `password` New password

**Example**

```swift
AuthClient().resetPasswordByPhone(phone: "188xxxx8888", code: "1234", newPassword: "strong") { code, message in
    if (code == 200) {

    }
}
```

**Error Code**

* `2004` User does not exist

<br>

## Reset password via mail verification code

Reset password by email verification code, you need to call [sendEmail](#Send-email) interface to send a reset password message (the scene value `RESET_PASSWORD`).

```swift
func resetPasswordByEmail(email: String, code: String, newPassword: String, completion: @escaping(Int, String?) -> Void)
```

**Parameter**

* `email` Email address
* `code` Verification code
* `password` New password

**Example**

```swift
AuthClient().resetPasswordByEmailCode(email: "me@gmail.com", code: "1234", newPassword: "strong") { code, message, in
    if (code == 200) {

    }
}
```

**Error Code**

* `2004` User does not exist

<br>

## Reset password through the first login Token

Reset password through the first login Token. You need to set Force User to change password at first login when creating a user.

```swift
func resetPasswordByFirstTimeLoginToken(token: String, password: String, completion: @escaping(Int, String?) -> Void)
```

**参数**

* *token* token
* *password* password

**示例**

```swift
AuthClient().resetPasswordByFirstTimeLoginToken(token: "token", password: "strong") { code, message in
    if (code == 200) {

    }
}
```

<br>

## Update user password

Update the user password. If the user does not set a password, such as SMS verification code, social login, etc., oldPassword is left blank.

```swift
func updatePassword(newPassword: String, oldPassword: String? = nil, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**Parameter**

* `newPassword` New password
* `oldPassword` Old password, if the user does not set a password, you can not fill

**Example**

```swift
AuthClient().updatePassword(newPassword: "newStrong", oldPassword: "oldStrong") { code, message, userInfo in
    if (code == 200) {

    }
}
```

**Error Code**

* `2020` Not logged in
* `1320011` The old password is incorrect

<br>

## Binding mobile phone number

Bind the mobile phone number of the current login user.  you can send SMS verification code by [sendSmsCode](#Send-verification-code) method.

```swift
func bindPhone(phone: String, code: String, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**Parameter**

* `phone` Thie phone number
* `code` SMS Verification code

**Example**

```swift
AuthClient().bindPhone(phone: "188xxxx8888", code: "1234") { code, message, userInfo in
    if (code == 200) {

    }
}
```

**Error Code**

* `2020` Not logged in

<br>

## Solution to the mobile number

The user unbinds the mobile phone number. If the user does not bind other login methods (such as email or social login account), the mobile phone number cannot be unbound and an error message is displayed.

```swift
func unbindPhone(completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**Example**

```swift
AuthClient().unbindPhone { code, message, userInfo in
    if (code == 200) {

    }
}
```

**Error Code**

* `2020` Not logged in
* `1320005` The current user is not bound to any other login mode

<br>

## Binding mailbox

The mailbox is bound to the current login user. call [Send emai](#Send email) to get the verification code.

```swift
func bindEmail(email: String, code: String, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**Parameter**

* `email` Email address
* `code` Email  verification code

**Example**

```swift
AuthClient().bindEmail(email: "me@gmail.com", code: "1234") { code, message, userInfo in
    if (code == 200) {

    }
}
```

**Error Code**

* `2020`  Not logged in

<br>

##  Menned mailbox

The user solves the mobile phone number. If the user does not bind other login mode (mobile phone number, social login account), it will not be able to decompose the mailbox, will prompt the error.

```swift
func unbindEmail(completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**Example**

```swift
AuthClient().unbindEmail { code, message, userInfo in
    if (code == 200) {

    }
}
```

**Error Code**

* `2020` Not logged in
* `1320005` The current user is not bound to a mailbox

<br>


