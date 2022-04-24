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

#### Parameter

- `email` \<string\> email
- `password` \<string\> password
- `profile` \<RegisterProfile\> user profile
- `options` \<Object\>
- `options.forceLogin` \<boolean\> Whether to go through the complete login process. The pipeline function before and after login and the login event webhook will be triggered.The cumulative login times of the user will be increased by 1. The default value is false.
- `options.generateToken` \<boolean\> Whether to generate a token for the user. It will not trigger the complete process after login. The user's cumulative login times will not increase by 1. The default value is false.
- `options.clientIp` \<string\> The real IP of the client. If you call this interface on the server side, be sure to set this parameter to the real IP of the end user.

#### Example

```csharp
var email = "test@example.com";
var password = "123456";
var user = await authenticationClient.RegisterByEmail(email, password);
Console.WriteLine(user.Email);
```

## Register by username

AuthenticationClient().registerByUsername(username, password, profile, options)

> Register with username.

#### Parameter

- `username` \<string\> username
- `password` \<string\> password
- `profile` \<RegisterProfile\> User profile
- `options` \<Object\>
- `options.forceLogin` \<boolean\> Whether to go through the complete login process. The pipeline function before and after login and the login event webhook will be triggered.The cumulative login times of the user will be increased by 1. The default value is false.
- `options.generateToken` \<boolean\> Whether to generate a token for the user. It will not trigger the complete process after login. The user's cumulative login times will not increase by 1. The default value is false.
- `options.clientIp` \<string\> The real IP of the client. If you call this interface on the server side, be sure to set this parameter to the real IP of the end user.

#### Example

```csharp
var username = "test";
var password = "123456";
var user = await authenticationClient.RegisterByUsername(email, password);
Console.WriteLine(user.Username);
```

## Register by phone number

AuthenticationClient().registerByPhoneCode(phone, code, password, profile, options)

> Register with your mobile phone number, and you can set the initial password of the account. You can find the send SMS interface in sendSmsCode.

#### Parameter

- `phone` \<string\> phone number
- `code` \<string\> SMS verification code
- `password` \<string\> initial password
- `profile` \<RegisterProfile\> user profile
- `options` \<Object\>
- `options.forceLogin` \<boolean\> Whether to go through the complete login process. The pipeline function before and after login and the login event webhook will be triggered.The cumulative login times of the user will be increased by 1. The default value is false.
- `options.generateToken` \<boolean\> Whether to generate a token for the user. It will not trigger the complete process after login. The user's cumulative login times will not increase by 1. The default value is false.
- `options.clientIp` \<string\> The real IP of the client. If you call this interface on the server side, be sure to set this parameter to the real IP of the end user.

#### Example

```csharp
var phone = "phone number";
var code = "1234";
var password = "123456";
var user = await authenticationClient.RegisterByPhoneCode(phone, code, password);
Console.WriteLine(user.Phone);
```

## Send SMS code

AuthenticationClient().sendSmsCode(phone)

> Send SMS verification code, the validity time of SMS verification code is 60 s.

#### Parameter

- `phone` \<string\>

#### Example

```csharp
var phone = "phone number";
await authenticationClient.SendSmsCode(phone);
```

## Login by email
AuthenticationClient().loginByEmail(email, password, options)

> Login by email. By default, this interface does not restrict logins to unverified emails. If you want users with unverified emails to not be able to log in, you can use the pipeline to intercept such requests.

If your user pool is configured with login failure detection, the user will be asked to enter a CAPTCHA code (code 2000) when the login fails multiple times under the same IP.

#### Parameter

- `email` \<string\> email
- `password` \<string\> password
- `options` \<Object\>
- `options.autoRegister` \<boolean\> Whether to register automatically.If it detects that the user does not exist, an account will be automatically created based on the login account password.
- `options.captchaCode` \<string\> CAPTCHA code
- `options.clientIp` \<string\> The real IP of the client. If you call this interface on the server side, be sure to set this parameter to the real IP of the end user.

#### Example

```csharp
var email = "test@example.com";
var password = "123456";
var user = await authenticationClient.LoginByEmail(email, password);
Console.WriteLine(user.Email);
```

## Login by username

AuthenticationClient().loginByUsername(username, password, options)

> Login by username.

If your user pool is configured with login failure detection, the user will be asked to enter a CAPTCHA verification code (code 2000) when the login fails multiple times under the same IP.

#### Parameter

- `username` \<string\> username
- `password` \<string\> password
- `options` \<Object\>
- `options.autoRegister` \<boolean\> Whether to register automatically.If it detects that the user does not exist, an account will be automatically created based on the login account password.
- `options.captchaCode` \<string\> CAPTCHA code
- `options.clientIp` \<string\> The real IP of the client. If you call this interface on the server side, be sure to set this parameter to the real IP of the end user.

#### Example

```csharp
var username = "username";
var password = "123456";
var user = await authenticationClient.LoginByUsername(username, password);
Console.WriteLine(user.Username);
```

## Login by SMS code

AuthenticationClient().loginByPhoneCode(phone, code)

> Login by phone number and SMS verification code.

#### Parameter

- `phone` \<string\> phone number
- `code` \<string\> SMS verification code
- `options.clientIp` \<string\> The real IP of the client. If you call this interface on the server side, be sure to set this parameter to the real IP of the end user.

#### Example

```csharp
var phone = "phone number";
var code = "1234";
var user = await authenticationClient.LoginByPhoneCode(phone, code);
Console.WriteLine(user.Phone);
```

## Login by phone number and password

AuthenticationClient().loginByPhonePassword(phone, password, options)

> Login by phone number and password.

#### Parameter

- `phone` \<string\> phone number
- `password` \<string\> password
- `options` \<Object\>
- `options.captchaCode` \<string\> CAPTCHA code
- `options.clientIp` \<string\> The real IP of the client. If you call this interface on the server side, be sure to set this parameter to the real IP of the end user.

#### Example

```csharp
var phone = "phone number";
var password = "123456";
var user = await authenticationClient.LoginByPhonePassword(phone, password);
Console.WriteLine(user.Phone);
```

## Check Token and login status

AuthenticationClient().checkLoginStatus(token)

> Check Token and login status.

#### Parameter

- `token` \<string\> the user's login credentials token

#### Example

```csharp
var status = await authenticationClient.CheckLoginStatus();
Console.WriteLine(status.code == 200);
```

## Send email

AuthenticationClient().sendEmail(email, scene)

> Send email.

#### Parameter

- `email` \<string\> email
- `scene` \<EmailScene\> Sending scene, optional values are RESET_PASSWORD (send a reset password email, the email contains the verification code), VerifyEmail (send the email to verify the mailbox), ChangeEmail (send the modified email, the email contains the verification code)

#### Example

```csharp
using Authing.ApiClient.Types;
var message = await authenticationClient.SendEmail("test@example.com", EmailScene.RESET_PASSWORD);
```

## Reset password by SMS code

AuthenticationClient().resetPasswordByPhoneCode(phone, code, newPassword)

> To reset the password via SMS verification code, you need to call the sendSmsCode interface to send the reset password email.

#### Parameter

- `phone` \<string\> phone number
- `code` \<string\> Verification code
- `newPassword` \<string\> new password

#### Example

```csharp
var phone = "phone number";
var code = "1234";
var password = "123456";
var message = await authenticationClient.ResetPasswordByPhoneCode(phone, code, password);
```

## Reset password by email

AuthenticationClient().resetPasswordByEmailCode(email, code, newPassword)

> To reset the password through the email, you need to call the sendEmail interface to send the reset password email.

#### Parameter

- `email` \<string\> email
- `code` \<string\> verification code
- `newPassword` \<string\> new password

#### Example

```csharp
var email = "test@example.com";
var code = "1234";
var password = "123456";
var message = await authenticationClient.ResetPasswordByEmailCode(email, code, password);
```

## Update user profile

AuthenticationClient().updateProfile(updates)

> Update user information. This interface cannot be used to update the phone number, email address, and password. If necessary, please call the updatePhone, updateEmail, and updatePassword interfaces.

#### Parameter

- `updates` \<UpdateUserInput\> modified user information
- `updates.username` \<string\> username
- `updates.nickname` \<string\> nickname
- `updates.photo` \<string\> avatar
- `updates.company` \<string\> company
- `updates.browser` \<string\> vrowser
- `updates.device` \<string\> device
- `updates.lastIP` \<string\> Last login IP
- `updates.name` \<string\> Name
- `updates.givenName` \<string\> Given Name
- `updates.familyName` \<string\> Family Name
- `updates.middleName` \<string\> Middle Name
- `updates.profile` \<string\> Profile Url
- `updates.preferredUsername` \<string\> Preferred Name
- `updates.website` \<string\> personal website
- `updates.gender` \<string\> Gender, M means male, F means female, U means unknown.
- `updates.birthdate` \<string\> birthday
- `updates.zoneinfo` \<string\> timezone
- `updates.locale` \<string\> language
- `updates.address` \<string\> address
- `updates.streetAddress` \<string\> street address
- `updates.locality` \<string\>
- `updates.region` \<string\> region
- `updates.postalCode` \<string\> zipcode
- `updates.city` \<string\> city
- `updates.province` \<string\> province
- `updates.country` \<string\> country

#### Example

```csharp
var user = await authenticationClient.UpdateProfile(new UpdateUserInput()
{
  Nickname = nickname,
});
```

## Update password

AuthenticationClient().updatePassword(newPassword, oldPassword)

> Update user password

#### Parameter

- `newPassword` \<string\> new password
- `oldPassword` \<string\> old password, if the user has not set a password, it can be left blank.

#### Example

```csharp
var oldPassword = "111111";
var newPassword = "123456";
await authenticationClient.UpdatePassword(newPassword, oldPassword);
```

## Update phone number

AuthenticationClient().updatePhone(phone, phoneCode, oldPhone, oldPhoneCode)

> Update the user's phone number. Same as update the email, by default, if the user has already bound a phone number, the original phone number (the phone number bound to the current account) and the current email (the phone number to be bound) need to be verified at the same time. In other words, the phone number currently bound to user A is 15888888888, and if you want to change it to 15899999999, you need to verify both phone numbers at the same time. Developers can also choose not to turn on "Verify original phone number", which can be turned off in the security information client under the settings directory of the Approw console. To bind a phone number for the first time, please use bindPhone interface.

#### Parameter

- `phone` \<string\> New phone number
- `phoneCode` \<string\> The verification code of the new phone number
- `oldPhone` \<string\> old phone number
- `oldPhoneCode` \<string\> The verification code of the old phone number

#### Example

```csharp
await authenticationClient.UpdatePhone("phone number", "1234");
```

## Update email

AuthenticationClient().updateEmail(email, emailCode, oldEmail, oldEmailCode)

> If the user has already bound the email, by default, the original email (the email bound to the current account) and the current email (the email to be bound) need to be verified at the same time. If the currently email bound to user A is 123456@gmail.com, and user A wants to change it to 1234567@gmail.com, then both email need to be verified at the same time. Developers can also choose not to turn on "Verify original mailbox", which can be turned off in the security information client under the settings directory of the Approw console. To bind an email for the first time, please use the bindEmail interface.

#### Parameter

- `email` \<string\> new email
- `emailCode` \<string\> The verification code of the new email
- `oldEmail` \<string\> old email
- `oldEmailCode` \<string\> The verification code of the old email

#### Example

```csharp
var newEmail = "new@example.com";
var emailCode = "1234"
await authenticationClient.UpdateEmail(newEmail, emailCode);
```

## Refresh token

AuthenticationClient().refreshToken()

> Refresh the token of the current user.Login is required when calling this interface.

#### Parameter

#### Example

```csharp
var refreshToken = await authenticationClient.RefreshToken();
Console.WriteLine(refreshToken.Token);
```

## Bind phone number

AuthenticationClient().bindPhone(phone, phoneCode)

> The user binds the phone number for the first time. If you need to update the phone number, please use the updatePhone interface.

#### Parameter

- `phone` \<string\>
- `phoneCode` \<string\>

#### Example

```csharp
var phone = "phone number";
var phoneCode = "1234"
await authenticationClient.BindPhone(phone, phoneCode);
```

## Unbind phone number

AuthenticationClient().unbindPhone()

> User unbinds phone number. 

#### Parameter

#### Example

```csharp
await authenticationClient.UnbindPhone();
```

## Get current user information

AuthenticationClient().getCurrentUser()

> Get the information of the current user.

#### Parameter

#### Example

## Logout

AuthenticationClient().logout()

> Logout, clear user and token in localStorage.

#### Parameter

#### Example

```csharp
await authenticationClient.Logout();
```

## Get current user's user-defined data list

AuthenticationClient().listUdv()

> Get the current user's user-defined data list.

#### Parameter

#### Example

```csharp
var list = await authenticationClient.ListUdv();
Console.WriteLine(list.Count());
```

## Add user-defined data

AuthenticationClient().setUdv(key, value)

> Add user-defined data.

#### Parameter

- `key` \<string\> The key of the user-defined data.
- `value` \<any\> The value of user-defined data. The type of value must match the one defined in user pool.

#### Example

```csharp
var key = "key";
var anyValue = "value";
var list = await authenticationClient.SetUdv(key, anyValue);
Console.WriteLine(list.Count());
```

## Delete user-defined data

AuthenticationClient().removeUdv(key)

> Delete user-defined data

#### Parameter

- `key` \<null\> The key of the user-defined field.

#### Example

```csharp
var key = "key";
var list = await authenticationClient.RemoveUdv(key);
Console.WriteLine(list.Count());
```
