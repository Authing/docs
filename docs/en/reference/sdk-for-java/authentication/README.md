---
meta:
  - name: description
    content: AuthenticationClient
---

# AuthenticationClient

<LastUpdated/>

> This client contains methods such as registeration and login, resetting the phone number and email, and modifying account information. These methods need to be requested by end users after they have been verified.

## Register by email

AuthenticationClient().registerByEmail(email, password, profile, options)

> Use email registration, this interface does not require the user to verify the email, the emailVerified field will be false after the user registers. If you want users with unauthenticated email to be unable to log in, you can use the pipeline to intercept such requests.

#### Parameters:

- `email` \<string\> Email
- `password` \<string\> Password
- `profile` \<RegisterProfile\> User profile
- `options` \<Object\>
- `options.forceLogin` \<boolean\> Whether to go through the complete login process. The pipeline function before and after login and the login event webhook will be triggered.The cumulative login times of the user will be increased by 1. The default value is false.
- `options.generateToken` \<boolean\> Whether to generate a token for the user. It will not trigger the complete process after login. The user's cumulative login times will not increase by 1. The default value is false.
- `options.clientIp` \<string\> The real IP of the client. If you call this interface on the server side, be sure to set this parameter to the real IP of the end user.

#### Example:

```java
String email = "test@example.com";
String password = "123456";
User user = authenticationClient.registerByEmail(new RegisterByEmailInput(email, password)).execute();
```

## Register by username

AuthenticationClient().registerByUsername(username, password, profile, options)

> Register by username

#### Parameters

- `username` \<string\> Username
- `password` \<string\> Password
- `profile` \<RegisterProfile\> User profile
- `options` \<Object\>
- `options.forceLogin` \<boolean\> Whether to go through the complete login process. The pipeline function before and after login and the login event webhook will be triggered.The cumulative login times of the user will be increased by 1. The default value is false.
- `options.generateToken` \<boolean\> Whether to generate a token for the user. It will not trigger the complete process after login. The user's cumulative login times will not increase by 1. The default value is false.
- `options.clientIp` \<string\> The real IP of the client. If you call this interface on the server side, be sure to set this parameter to the real IP of the end user.

#### Example:

```java
String username = "test";
String password = "123456";
User user = authenticationClient.registerByUsername(new RegisterByUsernameInput(username, password)).execute();
```

## Register by phone number

AuthenticationClient().registerByPhoneCode(phone, code, password, profile, options)

> Register with your mobile phone number, and you can set the initial password of the account. You can find the send SMS interface in sendSmsCode.

#### Parameters:

- `phone` \<string\> Phone number
- `code` \<string\> SMS verification code
- `password` \<string\> Initial password
- `profile` \<RegisterProfile\> User profile
- `options` \<Object\>
- `options.forceLogin` \<boolean\> Whether to go through the complete login process. The pipeline function before and after login and the login event webhook will be triggered.The cumulative login times of the user will be increased by 1. The default value is false.
- `options.generateToken` \<boolean\> Whether to generate a token for the user. It will not trigger the complete process after login. The user's cumulative login times will not increase by 1. The default value is false.
- `options.clientIp` \<string\> The real IP of the client. If you call this interface on the server side, be sure to set this parameter to the real IP of the end user.

#### Example:

```java
String phone = "phone number";
String code = "1234";
String pasword = "123456"
User user = authenticationClient.registerByPhoneCode(new RegisterByPhoneCodeInput(phone, code).withPassword(password)).execute();
```

## Send SMS code

AuthenticationClient().sendSmsCode(phone)

> Send SMS verification code, the validity time of SMS verification code is 60 s.。

#### Parameter:

- `phone` \<string\>

#### Example:

```java
String phone = "phone number";
authenticationClient.sendSmsCode(phone).execute();
```

## Login by email

AuthenticationClient().loginByEmail(email, password, options)

> Login by email. By default, this interface does not restrict logins to unverified emails. If you want users with unverified emails to not be able to log in, you can use the pipeline to intercept such requests.

If your user pool is configured with login failure detection, the user will be asked to enter a CAPTCHA code (code 2000) when the login fails multiple times under the same IP.

#### Parameters:

- `email` \<string\> Email
- `password` \<string\> Password
- `options` \<Object\>
- `options.autoRegister` \<boolean\> Whether to register automatically. If it detects that the user does not exist, an account will be automatically created based on the login account password.
- `options.captchaCode` \<string\> CAPTCHA
- `options.clientIp` \<string\> The real IP of the client. If you call this interface on the server side, be sure to set this parameter to the real IP of the end user.

#### Example:

```java
String email = "test@example.com";
String password = "123456";
User user = authenticationClient.loginByEmail(new LoginByEmailInput(email, password)).execute();
```

## Login by username

AuthenticationClient().loginByUsername(username, password, options)

> Login by username

If your user pool is configured with login failure detection, the user will be asked to enter a CAPTCHA verification code (code 2000) when the login fails multiple times under the same IP.

#### Parameters:

- `email` \<string\> Email
- `password` \<string\> Password
- `options` \<Object\>
- `options.autoRegister` \<boolean\> Whether to register automatically. If it detects that the user does not exist, an account will be automatically created based on the login account password.
- `options.captchaCode` \<string\> CAPTCHA
- `options.clientIp` \<string\> The real IP of the client. If you call this interface on the server side, be sure to set this parameter to the real IP of the end user.

#### Example:

```java
String username = "username";
String password = "123456";
User user = authenticationClient.loginByUsername(new LoginByUsernameInput(username, password)).execute();
```

## Login by SMS code

AuthenticationClient().loginByPhoneCode(phone, code)

> Login by SMS code.

#### Parameters:

- `phone` \<string\> Phone number
- `code` \<string\> SMS verification code
- `options.clientIp` \<string\> The real IP of the client. If you call this interface on the server side, be sure to set this parameter to the real IP of the end user

#### Example:

```java
String phone = "phone number";
String code = "1234";
User user = authenticationClient.loginByPhoneCode(new LoginByPhoneCodeInput(phone, code)).execute();
```

## Login by phone number and password

AuthenticationClient().loginByPhonePassword(phone, password, options)

> Login by phone number and password.

#### Parameters:

- `phone` \<string\> Phone number
- `password` \<string\> Password
- `options` \<Object\>
- `options.captchaCode` \<string\> CAPTCHA code
- `options.clientIp` \<string\> The real IP of the client. If you call this interface on the server side, be sure to set this parameter to the real IP of the end user

#### Example:

```java
String phone = "phone number";
String password = "123456";
User user = authenticationClient.loginByPhonePassword(new LoginByPhonePasswordInput(phone, password)).execute();
```

## Check Token and login status

AuthenticationClient().checkLoginStatus(token)

> Check Token and login status

#### Parameter:

- `token` \<string\> The user's login credentials token

#### Example:

```java
JwtTokenStatus status = authenticationClient.checkLoginStatus().execute();
```

## Send email

AuthenticationClient().sendEmail(email, scene)

> Send email

#### Parameters:

- `email` \<string\> Email
- `scene` \<EmailScene\> Sending scene, optional values are RESET_PASSWORD (send a reset password email, the email contains the verification code), VerifyEmail (send the email to verify it), ChangeEmail (send the modified email, the email contains the verification code)

#### Example:

```java
authenticationClient.sendEmail("test@example.com", EmailScene.RESET_PASSWORD).execute();
```

## Reset password by SMS code

AuthenticationClient().resetPasswordByPhoneCode(phone, code, newPassword)

> To reset the password via SMS verification code, you need to call the sendSmsCode interface to send the reset password email

#### Parameters:

- `phone` \<string\> Phone number
- `code` \<string\> Verification code
- `newPassword` \<string\> New password

#### Example:

```java
String phone = "phone number";
String code = "1234";
String password = "123456";
authenticationClient.resetPasswordByPhoneCode(phone, code, password).execute();
```

## Reset password by email

AuthenticationClient().resetPasswordByEmailCode(phone, code, newPassword)

> To reset the password through the email, you need to call the sendEmail interface to send the reset password email.

#### Parameters:

- `phone` \<string\> Phone number
- `code` \<string\> Verification code
- `newPassword` \<string\> New password

#### Example:

```java
String email = "test@example.com";
String code = "1234";
String password = "123456";
authenticationClient.resetPasswordByEmailCode(email, code, password).execute();
```

## Update user profile

AuthenticationClient().updateProfile(updates)

> Update user information. This interface cannot be used to update the phone number, email address, and password. If necessary, please call the updatePhone, updateEmail, and updatePassword interfaces.

#### Parameters:

- `updates` \<UpdateUserInput> Modified user information
- `updates.username` \<string> Username
- `updates.nickname` \<string> Nickname
- `updates.photo` \<string> Avatar
- `updates.company` \<string> Company
- `updates.browser` \<string> Browser
- `updates.device` \<string> Device
- `updates.lastIP` \<string> Last logged in IP
- `updates.name` \<string> Name
- `updates.givenName` \<string> Given Name
- `updates.familyName` \<string> Family Name
- `updates.middleName` \<string> Middle Name
- `updates.profile` \<string> Profile Url
- `updates.preferredUsername` \<string> Preferred Name
- `updates.website` \<string> Personal website
- `updates.gender` \<string> Gender, M means male, F means female, U means unknown.
- `updates.birthdate` \<string> Birthday
- `updates.zoneinfo` \<string> Time zone
- `updates.locale` \<string> Language
- `updates.address` \<string> Address
- `updates.streetAddress` \<string> Street address
- `updates.locality` \<string>
- `updates.region` \<string> Region
- `updates.postalCode` \<string> Zip code
- `updates.city` \<string> City
- `updates.province` \<string> Province
- `updates.country` \<string> Country

#### Example:

```java
User user = authenticationClient.updateProfile(new UpdateUserInput().withNickname("nickname")).execute();
```

## Update password

AuthenticationClient().updatePassword(newPassword, oldPassword)

> Update password

#### Parameters:

- `newPassword` \<string\> New password
- `oldPassword` \<string\> Old password, if the user has not set a password, it can be left blank.。

#### Example:

```java
String oldPassword = "111111";
String newPassword = "123456";
User user = authenticationClient.updatePassword(newPassword, oldPassword).execute();
```

## Update phone number

AuthenticationClient().updatePhone(phone, phoneCode, oldPhone, oldPhoneCode)

> Update the user's phone number. Same as update the email, by default, if the user has already bound a phone number, the original phone number (the phone number bound to the current account) and the current email (the phone number to be bound) need to be verified at the same time. In other words, the phone number currently bound to user A is 15888888888, and if you want to change it to 15899999999, you need to verify both phone numbers at the same time. Developers can also choose not to turn on "Verify original phone number", which can be turned off in the security information client under the settings directory of the Authing console. To bind a phone number for the first time, please use bindPhone interface.

#### Parameters:

- `phone` \<string\> New phone number
- `phoneCode` \<string\> The verification code of the new phone number
- `oldPhone` \<string\> Old phone number
- `oldPhoneCode` \<string\> The verification code of the old phone number

#### Example:

```java
User user = authenticationClient.updatePhone("phone number", "1234").execute();
```

## Update email

AuthenticationClient().updateEmail(email, emailCode, oldEmail, oldEmailCode)

> If the user has already bound the email, by default, the original email (the email bound to the current account) and the current email (the email to be bound) need to be verified at the same time. If the currently email bound to user A is 123456@gmail.com, and user A wants to change it to 1234567@gmail.com, then both email need to be verified at the same time. Developers can also choose not to turn on "Verify original mailbox", which can be turned off in the security information client under the settings directory of the Authing console. To bind an email for the first time, please use the bindEmail interface.

#### Parameters:

- `email` \<string\> New email
- `emailCode` \<string\> The verification code of the new email
- `oldEmail` \<string\> old email
- `oldEmailCode` \<string\> The verification code of the old email

#### Example:

```java
String newEmail = "new@example.com";
String emailCode = "1234"
User user = authenticationClient.updateEmail(newEmail, emailCode).execute();
```

## Refresh token

AuthenticationClient().refreshToken()

> Refresh the token of the current user.Login is required when calling this interface.

#### Parameter:

#### Example:

```java
RefreshToken token = authenticationClient.refreshToken().execute();
```

## Bind phone

AuthenticationClient().bindPhone(phone, phoneCode)

> The user binds the phone number for the first time. If you need to update the phone number, please use the updatePhone interface.

#### Parameters:

- `phone` \<string\>
- `phoneCode` \<string\>

#### Example:

```java
User user = authenticationClient.bindPhone("phone number", "1234").execute();
```

## Unbind phone number

AuthenticationClient().unbindPhone()

> User unbind phone number

#### Example:

```java
User user = authenticationClient.unbindPhone().execute();
```

## Unbind email

AuthenticationClient().unbindEmail()

> User unbind email

#### Example:

```java
User user = authenticationClient.unbindEmail().execute();
```

## Get current user information

AuthenticationClient().getCurrentUser()

> Get the information of the current user

#### Example:

```
User user = authenticationClient.getCurrentUser().execute();
```

## Logout

AuthenticationClient().logout()

> Logout, clear user and token in localStorage

#### Example:

```java
authenticationClient.logout().execute();
```

## Link social account

AuthenticationClient().linkAccount(primaryUserToken, secondaryUserToken)

> Link a social account to a main account (phone number, email account).

#### Parameters:

- `primaryUserToken` \<string\> Primary account Token
- `secondaryUserToken` \<string\> Social account Token

#### Example:

```java
String primaryUserToken = "test";
String secondaryUserToken = "test";
CommonMessage message = authenticationClient.linkAccount(primaryUserToken, secondaryUserToken).execute();
```

## Login with LDAP username

AuthenticationClient().loginByLdap(loginByLdapParam)

> Login with LDAP username

#### Parameters:

- `username` \<string> Username
- `password` \<string> Password
- `options` \<LoginByLdapParamOptions>
- `options.autoRegister` \<boolean> Whether to register automatically. If it detects that the user does not exist, an account will be automatically created based on the login account and password.
- `options.captchaCode` \<string> CAPTCHA verification code
- `options.clientIp` \<string> The real IP of the client. If you call this interface on the server side, be sure to set this parameter to the real IP of the end user.

#### Example:

```java
String username = "test";
String password = "test";
LoginByLdapParam loginByLdapParam = new LoginByLdapParam(username, password);
User user = authenticationClient.loginByLdap(loginByLdapParam).execute();
```

## Login by Ad

AuthenticationClient().loginByAd(username, password)

> Login with AD username

#### Parameters:

- `username` \<string\> Username
- `password` \<string\> Password

#### Example:

```java
String username = "test";
String password = "test";
User user = authenticationClient.loginByAd(username, password).execute();
```

## Check password strength

AuthenticationClient().checkPasswordStrength(password)

> Check the password strength,[ click here for details.](/guides/security/config-password.md)。

#### Parameter:

- `password` \<string\> password

#### Example:

```java
String password = "test";
CheckPasswordStrengthResult result = authenticationClient.checkPasswordStrength(password).execute();
```

## Get user-defined value

AuthenticationClient().listUdv()

> Get user-defined value

#### Example:

```java
authenticationClient.setAppId("authing_APP_ID");
authenticationClient.setAccessToken("ACCESS_TOKEN");

List<UserDefinedData> list = authenticationClient.listUdv().execute();
```

#### Return value:

- `Promise<UserDefinedData>`

#### Sample data:

```json
[
  {
    "key": "school",
    "dataType": "STRING",
    "value": "Huazhong Institute of Technology",
    "label": "school"
  }
]
```

## Set user-defined value

AuthenticationClient().setUdv(key, value)

> A user-defined field can only be set after the user pool is configured with the field, and the type of the incoming value must match the defined type.

#### Parameters:

- `key` \<string\> The key of the user-defined field.
- `value` \<string\> The value set, the type of the incoming value must match the defined type.

#### Example:

```java
authenticationClient.setAppId("authing_APP_ID");
authenticationClient.setAccessToken("ACCESS_TOKEN");

List<UserDefinedData> list = authenticationClient.setUdv('school', 'Huazhong Institute of Technology').execute();
```

## Delete user-defined value

AuthenticationClient().removeUdv(key)

> Delete user-defined value.

#### Parameter:

- `key` \<string\> The key of the user-defined field.

#### Example:

```java
authenticationClient.setAppId("authing_APP_ID");
authenticationClient.setAccessToken("ACCESS_TOKEN");

List<UserDefinedData> list = authenticationClient.removeUdv('school').execute();
```
