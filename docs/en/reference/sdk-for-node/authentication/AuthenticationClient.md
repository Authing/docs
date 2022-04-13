# AuthenticationClient: core functions

<LastUpdated/>

> This client contains methods such as registeration and login, resetting the phone number and email, and modifying account information. These methods need to be requested by end users after they have been verified.

How to use it:

```javascript
import { AuthenticationClient } from 'authing-js-sdk'
const authenticationClient = new AuthenticationClient({
  appId: 'YOUR_APP_ID',
  appHost: 'https://xxx.authing.cn',
})
authenticationClient.registerByEmail // register by email
authenticationClient.loginByEmail // login by email
```

## Register by email

AuthenticationClient().registerByEmail(email, password, profile, options)

> Use email registration, this interface does not require the user to verify the email, the emailVerified field will be false after the user registers. If you want users with unauthenticated email to be unable to log in, you can use the pipeline to intercept such requests.

#### Parameters

- `email` \<string\> email
- `password` \<string\> password
- `profile` \<RegisterProfile\> user profile
- `options` \<Object\>
- `options.forceLogin` \<boolean\> Whether to go through the complete login process. The pipeline function before and after login and the login event webhook will be triggered.The cumulative login times of the user will be increased by 1. The default value is false.
- `options.generateToken` \<boolean\> Whether to generate a token for the user. It will not trigger the complete process after login. The user's cumulative login times will not increase by 1. The default value is false.
- `options.clientIp` \<string\> The real IP of the client. If you call this interface on the server side, be sure to set this parameter to the real IP of the end user.

#### Example

```javascript
authenticationClient.registerByEmail(
  'test@example.com',
  'passw0rd',
  {
    nickname: 'Nick',
  },
  {
    generateToken: true,
  }
)
```

```javascript
authenticationClient.registerByEmail('test@example.com', 'passw0rd')
```

#### Return value

- [Promise\<User\>](/guides/user/user-profile.md)

## Register by username

AuthenticationClient().registerByUsername(username, password, profile, options)

> Register with username

#### Parameters

- `username` \<string\> username
- `password` \<string\> password
- `profile` \<RegisterProfile\> user profile
- `options` \<Object\>
- `options.forceLogin` \<boolean\> Whether to go through the complete login process. The pipeline function before and after login and the login event webhook will be triggered.The cumulative login times of the user will be increased by 1. The default value is false.
- `options.generateToken` \<boolean\> Whether to generate a token for the user. It will not trigger the complete process after login. The user's cumulative login times will not increase by 1. The default value is false.
- `options.clientIp` \<string\> The real IP of the client. If you call this interface on the server side, be sure to set this parameter to the real IP of the end user.

#### Example

```javascript
authenticationClient.registerByUsername(
  'bob',
  'passw0rd',
  {
    nickname: 'Nick',
  },
  {
    generateToken: true,
  }
)
```

```javascript
authenticationClient.registerByUsername('bob', 'passw0rd')
```

#### Return value

- [Promise\<User\>](/guides/user/user-profile.md)

## Register by phone number

AuthenticationClient().registerByPhoneCode(phone, code, password, profile, options)

> Register with your mobile phone number, and you can set the initial password of the account. You can find the send SMS interface in sendSmsCode.

#### Parameters

- `phone` \<string\> phone number
- `code` \<string\> SMS verification code
- `password` \<string\> initial password
- `profile` \<RegisterProfile\> user profile
- `options` \<Object\>
- `options.forceLogin` \<boolean\> Whether to go through the complete login process. The pipeline function before and after login and the login event webhook will be triggered.The cumulative login times of the user will be increased by 1. The default value is false.
- `options.generateToken` \<boolean\> Whether to generate a token for the user. It will not trigger the complete process after login. The user's cumulative login times will not increase by 1. The default value is false.
- `options.clientIp` \<string\> The real IP of the client. If you call this interface on the server side, be sure to set this parameter to the real IP of the end user.

#### Example

```javascript
authenticationClient.registerByPhoneCode(
  '176xxxx6754',
  '1234',
  'passw0rd',
  {
    nickname: 'Nick',
  },
  {
    generateToken: true,
  }
)
```

```javascript
authenticationClient.registerByPhoneCode('176xxxx6754', '1234')
```

#### Return value

- [Promise\<User\>](/guides/user/user-profile.md)

## Check password strength

AuthenticationClient().checkPasswordStrength(password)

> Check the strength of the password. [See more details here](/guides/security/config-password.md).

#### Parameter

- `password` \<string\>

#### Example

```javascript
authenticationClient.checkPasswordStrength('weak')
```

```javascript
authenticationClient.checkPasswordStrength('strongPassw0rd!')
```

#### Return value

- `Promise<CheckPasswordStrengthResult>`

## Send SMS code

AuthenticationClient().sendSmsCode(phone)

> Send SMS verification code, the validity time of SMS verification code is 60 s.

#### Parameter

- `phone` \<string\>

#### Example

```javascript
authenticationClient.sendSmsCode('176xxxx6754')
```

#### 返 Return value

- `Promise<CommonMessage>`

## Login by email

AuthenticationClient().loginByEmail(email, password, options)

> Login by email. By default, this interface does not restrict logins to unverified emails. If you want users with unverified emails to not be able to log in, you can use the pipeline to intercept such requests.

If your user pool is configured with login failure detection, the user will be asked to enter a CAPTCHA code (code 2000) when the login fails multiple times under the same IP.

#### Parameter

- `email` \<string\> email
- `password` \<string\> password
- `options` \<Object\>
- `options.autoRegister` \<boolean\> Whether to register automatically.If it detects that the user does not exist, an account will be automatically created based on the login account password.
- `options.captchaCode` \<string\> CAPTCHA code.
- `options.clientIp` \<string\> The real IP of the client. If you call this interface on the server side, be sure to set this parameter to the real IP of the end user.

#### Example

```javascript
authenticationClient.loginByEmail(
 'test@example.com',
 'passw0rd',
 {
   autoRegister: true，
   captchaCode: 'xj72'
 }
)
```

```javascript
authenticationClient.loginByEmail('test@example.com', 'passw0rd')
```

#### Return value

- [Promise\<User\>](/guides/user/user-profile.md)

## Login by username

AuthenticationClient().loginByUsername(username, password, options)

> Login by username.

If your user pool is configured with login failure detection, the user will be asked to enter a CAPTCHA verification code (code 2000) when the login fails multiple times under the same IP.

#### Parameter

- `username` \<string\> username
- `password` \<string\> password
- `options` \<Object\>
- `options.autoRegister` \<boolean\> Whether to register automatically.If it detects that the user does not exist, an account will be automatically created based on the login account password.
- `options.captchaCode` \<string\> CAPTCHA code.
- `options.clientIp` \<string\> The real IP of the client. If you call this interface on the server side, be sure to set this parameter to the real IP of the end user.

#### Example

```javascript
authenticationClient.loginByUsername(
 'test',
 'passw0rd',
 {
   autoRegister: true，
   captchaCode: 'xj72'
 }
)
```

```javascript
authenticationClient.loginByUsername('test', 'passw0rd')
```

#### Return value

- [Promise\<User\>](/guides/user/user-profile.md)

## Login by SMS code

AuthenticationClient().loginByPhoneCode(phone, code)

> Login by phonenumber and SMS code.

#### Parameter

- `phone` \<string\> phone number
- `code` \<string\> SMS verification code
- `options.clientIp` \<string\> The real IP of the client. If you call this interface on the server side, be sure to set this parameter to the real IP of the end user.

#### Example

```javascript
authenticationClient.loginByPhoneCode('176xxxx6754', '1234')
```

#### Return value

- [Promise\<User\>](/guides/user/user-profile.md)

## Login by phone number and password

AuthenticationClient().loginByPhonePassword(phone, password, options)

> Login by phone number and password.

#### Parameter

- `phone` \<string\> phone number
- `password` \<string\> SMS verification code
- `options` \<Object\>
- `options.captchaCode` \<string\> CAPTCHA code
- `options.clientIp` \<string\> The real IP of the client. If you call this interface on the server side, be sure to set this parameter to the real IP of the end user.

#### Example

```javascript
authenticationClient.loginByPhonePassword('176xxxx6754', 'passw0rd', {
  captchaCode: 'xj72',
})
```

```javascript
authenticationClient.loginByPhonePassword('176xxxx6754', 'passw0rd')
```

#### Return value

- [Promise\<User\>](/guides/user/user-profile.md)

## Get user-defined data

AuthenticationClient().getUdfValue()

> Get all defined data of a user. Before doing this, you need to [set user-defined field](/guides/users/user-defined-field/) in the user pool.

#### Example

```javascript
const authenticationClient = new AuthenticationClient({
  appId: 'APP_ID',
  appHost: 'https://xxx.authing.cn',
  token: 'ID_TOKEN', // use user's token to initialize SDK
})

const data = await authenticationClient.getUdfValue()
```

#### Sample data

```json
{
  "school": "Huazhong Institute of Techonology",
  "age": 20
}
```

## Set user-defined data

AuthenticationClient().setUdfValue(data)

> Set value for user-defined data field. Before you set a value, you need to [set user-defined field](/guides/users/user-defined-field/) in the user pool. Data type of the passed value must be the same as defined. If setting value failed, it will throw an exception and you need to capture it.

#### Parameter

- `data` \<string\> Input data. It is an object. See more details in the following example.

#### Example

```javascript
const authenticationClient = new AuthenticationClient({
  appId: 'APP_ID',
  appHost: 'https://xxx.authing.cn',
  token: 'ID_TOKEN', // use user's token to initialize SDK
})

await authenticationClient.setUdfValue({
  school: 'Huazhong Institute of Techonology',
  age: 20,
})
```

## Delete user-defined data

AuthenticationClient().removeUdfValue(key)

> Delete the user-defined data. Before doing so, you need to [set user-defined field](/guides/users/user-defined-field/) in the user pool. The type of passed value must be the same as defined.

#### Parameter

- `key` \<string\> the key of user-defined data field.

#### Example

```javascript
const authenticationClient = new AuthenticationClient({
  appId: 'APP_ID',
  appHost: 'https://xxx.authing.cn',
  token: 'ID_TOKEN', // use user's token to initialize SDK
})

await authenticationClient.removeUdfValue('school')
```

## Check Token and login status

AuthenticationClient().checkLoginStatus(token)

> Check Token and login status.

#### Parameter

- `token` \<string\> the user's login credentials token

#### Example

```javascript
authenticationClient.checkLoginStatus('TOKEN')
```

#### Return value

- `Promise<JwtTokenStatus>`

## Upload avatar

AuthenticationClient().uploadAvatar(options)

This method will automatically open an upload box dialog in browser. (Supported file format is `image/*`) It will also automatically upload the image to CDN and modify user's avatar.

If you need to use your own image storage service, or the image has already been uploaded, please use the `updateProfile` method, such as:

```javascript
authenticationClient.updateProfile({
  photo: 'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=bob',
})
```

#### Parameters

-options.accept: Supported image format, default is `image/*`

#### Code example

```javascript
const authenticationClient = new AuthenticationClient({
  appId: 'APP_ID',
  appHost: 'https://xxx.authing.cn',
  token: 'ID_TOKEN', // Use the user's token to initialize the SDK
})

const user = await authing.uploadAvatar()

// Only select pictures in png format
const user = await authing.uploadAvatar({
  accept: '.png',
})
```

#### Demo example

![](https://cdn.authing.cn/img/%E4%B8%8A%E4%BC%A0%E5%A4%B4%E5%83%8F.gif)

#### Return value

This method will return the user's latest personal information.

## Send email

AuthenticationClient().sendEmail(email, scene)

> Send email

#### Parameter

- `email` \<string\> email
- `scene` \<EmailScene\> Sending scene, optional values are RESET_PASSWORD (send a reset password email, the email contains the verification code), VerifyEmail (send the email to verify the mailbox), ChangeEmail (send the modified email, the email contains the verification code)

#### Example

```javascript
import { EmailScene } from 'authing-js-sdk'
authenticationClient.sendEmail('test@example.com', EmailScene.RESET_PASSWORD)
```

#### Return value

- `Promise<CommonMessage>`

## Reset password by SMS code

AuthenticationClient().resetPasswordByPhoneCode(phone, code, newPassword)

> To reset the password via SMS verification code, you need to call the sendSmsCode interface to send the reset password email.

#### Parameter

- `phone` \<string\> phone number
- `code` \<string\> verification code
- `newPassword` \<string\> new password

#### Example

```javascript
authenticationClient.resetPasswordByPhoneCode('176xxxx6754', '1234', 'passw0rd')
```

#### Return value

- `Promise<CommonMessage>`

## Reset password by email

AuthenticationClient().resetPasswordByEmailCode(phone, code, newPassword)

> To reset the password through the email, you need to call the sendEmail interface to send the reset password email.

#### Parameter

- `phone` \<string\> phone number
- `code` \<string\> verification code
- `newPassword` \<string\> new password

#### Example

```javascript
authenticationClient.resetPasswordByEmailCode(
  'test@example.com',
  '1234',
  'passw0rd'
)
```

#### Return value

- `Promise<CommonMessage>`

## Update user profile

AuthenticationClient().updateProfile(updates)

> Update user information. This interface cannot be used to update the phone number, email address, and password. If necessary, please call the updatePhone, updateEmail, and updatePassword interfaces.

#### Parameter

- `updates` \<UpdateUserInput\> modified user information
- `updates.username` \<string\> username
- `updates.nickname` \<string\> nickname
- `updates.photo` \<string\> avatar
- `updates.company` \<string\> company
- `updates.browser` \<string\> browser
- `updates.device` \<string\> device
- `updates.lastIP` \<string\> last logged in IP
- `updates.name` \<string\> Name
- `updates.givenName` \<string\> Given Name
- `updates.familyName` \<string\> Family Name
- `updates.middleName` \<string\> Middle Name
- `updates.profile` \<string\> Profile Url
- `updates.preferredUsername` \<string\> Preferred Name
- `updates.website` \<string\> personal website
- `updates.gender` \<string\> Gender, M (Man) means male, F (Female) means female, U (Unknown) means unknown.
- `updates.birthdate` \<string\> birthday
- `updates.zoneinfo` \<string\> Time zone
- `updates.locale` \<string\> language
- `updates.address` \<string\> address
- `updates.streetAddress` \<string\> Street address
- `updates.locality` \<string\>
- `updates.region` \<string\> region
- `updates.postalCode` \<string\> zipcode
- `updates.city` \<string\> city
- `updates.province` \<string\> province
- `updates.country` \<string\> country

#### Example

```javascript
authenticationClient.updateProfile({
  nickname: 'Nick',
  lastIp: '111.111.111.111',
})
```

#### Return value

- [Promise\<User\>](/guides/user/user-profile.md)

## Update password

AuthenticationClient().updatePassword(newPassword, oldPassword)

> Update user password.

#### Parameter

- `newPassword` \<string\> new password
- `oldPassword` \<string\> Old password, if the user has not set a password, it can be left blank.

#### Example

```javascript
authenticationClient.updatePassword('passw0rd') // oldPassword should be empty for those accounts registered by social login or phone number because they don't set password in first login
```

```javascript
authenticationClient.updatePassword('passw0rd', 'oldPassw0rd') // user set a password before
```

#### Return value

- [Promise\<User\>](/guides/user/user-profile.md)

## Update phone number

AuthenticationClient().updatePhone(phone, phoneCode, oldPhone, oldPhoneCode)

> Update the user's phone number. Same as update the email, by default, if the user has already bound a phone number, the original phone number (the phone number bound to the current account) and the current email (the phone number to be bound) need to be verified at the same time.
> In other words, the phone number currently bound to user A is 15888888888, and if you want to change it to 15899999999, you need to verify both phone numbers at the same time.
> Developers can also choose not to turn on "Verify original phone number", which can be turned off in the security information client under the settings directory of the Approw console.
> To bind a phone number for the first time, please use bindPhone interface.

#### Parameter

- `phone` \<string\> New phone number
- `phoneCode` \<string\> The verification code of the new phone number
- `oldPhone` \<string\> v
- `oldPhoneCode` \<string\> The verification code of the old phone number

#### Example

```javascript
authenticationClient.updatePhone('176xxxx6754', '1234') // verify old phone number function disabled
```

```javascript
authenticationClient.updatePhone('176xxxx6754', '1234', '156xxxx9876', '1234') // verify old phone number function enabled
```

#### Return value

- [Promise\<User\>](/guides/user/user-profile.md)

## Update email

AuthenticationClient().updateEmail(email, emailCode, oldEmail, oldEmailCode)

> If the user has already bound the email, by default, the original email (the email bound to the current account) and the current email (the email to be bound) need to be verified at the same time. If the currently email bound to user A is 123456@gmail.com, and user A wants to change it to 1234567@gmail.com, then both email need to be verified at the same time.
> Developers can also choose not to turn on "Verify original mailbox", which can be turned off in the security information client under the settings directory of the Authing console.
> To bind an email for the first time, please use the bindEmail interface.

#### Parameter

- `email` \<string\> New email address
- `emailCode` \<string\> The verification code of the new email address
- `oldEmail` \<string\> old email address
- `oldEmailCode` \<string\> The verification code of the old email address

#### Example

```javascript
authenticationClient.updateEmail('test@example.com', '1234') // verify old email disabled
```

```javascript
authenticationClient.updateEmail(
  'test@example.com',
  '1234',
  'test2@example.com',
  '1234'
) // verify old email enabled
```

#### Return value

- [Promise\<User\>](/guides/user/user-profile.md)

## Link social account

AuthenticationClient().linkAccount(options)

> Bind a social account to main account (phone number or email address).

#### Parameter

- `options.primaryUserToken` \<string\> main account Token
- `options.secondaryUserToken` \<string\> social account Token

#### Example

```javascript
authenticationClient.linkAccount({
  primaryUserToken: primaryUser.token,
  secondaryUserToken: secondaryUser.token,
})
```

#### Return value

```json
{
  "code": 200,
  "message": "binding success"
}
```

## Refresh token

AuthenticationClient().refreshToken()

> Refresh the token of the current user.Login is required when calling this interface.

#### Parameter

#### Example

```javascript
authenticationClient.updateEmail()
```

#### Return value

- `Promise<RefreshToken>`

## Bind phone number

AuthenticationClient().bindPhone(phone, phoneCode)

> The user binds the phone number for the first time. If you need to update the phone number, please use the updatePhone interface.

#### Parameter

- `phone` \<string\>
- `phoneCode` \<string\>

#### Example

```javascript
authenticationClient.bindPhone('176xxxx6754', '1234')
```

#### Return value

- [Promise\<User\>](/guides/user/user-profile.md)

## Unbind phone number

AuthenticationClient().unbindPhone()

> User unbind phone number

#### Parameter

#### Example

```javascript
authenticationClient.unbindPhone()
```

#### Return value

- [Promise\<User\>](/guides/user/user-profile.md)

## Get current user information

AuthenticationClient().getCurrentUser()

> Get the information of the current user

#### Parameter

#### Example

```javascript
authenticationClient.getCurrentUser()
```

#### Return value

- [Promise\<User\>](/guides/user/user-profile.md)

## Logout

AuthenticationClient().logout()

> Logout, clear user and token in localStorage.

#### Parameter

#### Example

```javascript
authenticationClient.logout()
```

#### Return value

- `null`

## Login by LDAP username

AuthenticationClient().loginByLdap(username, password, options)

> Login by LDAP username.

If your user pool is configured with login failure detection, the user will be asked to enter a CAPTCHA code (code 2000) when the login fails multiple times under the same IP.

#### Parameter

- `username` \<string\> username
- `password` \<string\> password
- `options` \<Object\>
- `options.autoRegister` \<boolean\> Whether to register automatically.If it detects that the user does not exist, an account will be automatically created based on the login account password.
- `options.captchaCode` \<string\> CAPTCHA code.
- `options.clientIp` \<string\> The real IP of the client. If you call this interface on the server side, be sure to set this parameter to the real IP of the end user.

#### Example

```javascript
const authenticationClient = new AuthenticationClient({
  appId: 'APP_ID',
  appHost: 'https://xxx.authing.cn',
})

authenticationClient.loginByLdap('admin', 'admin')
```

#### Return value

- [Promise\<User\>](/guides/user/user-profile.md)

## Login by AD username

AuthenticationClient().loginByAd(username, password)

> Login by AD username.

#### Parameter

- `username` \<string\> username
- `password` \<string\> password

#### Example

```javascript
const authenticationClient = new AuthenticationClient({
  appId: 'APP_ID',
  appHost: 'https://xxx.authing.cn',
})

authenticationClient.loginByAd('admin', 'admin')
```

#### Return value

- [Promise\<User\>](/guides/user/user-profile.md)

## Calculate the password security level

AuthenticationClient().computedPasswordSecurityLevel()

> Calculate the password security level

#### Parameter

`password`: the password needed to be calculated, must be in type of `string`

#### Example

```javascript
const authenticationClient = new AuthenticationClient({
  appId: 'APP_ID',
  appHost: 'https://xxx.authing.cn',
  token: 'ID_TOKEN', // use user's token to initialize SDK
})

const securityLevel = authenticationClient.computedPasswordSecurityLevel(
  'xxxxxxxx'
)
```

#### sample

- `1`: level low
- `2`: level medium
- `3`: level high

## Get security level of account

AuthenticationClient().getSecurityLevel()

> Get security level of account.

#### Parameter

null

#### Example

```javascript
const authenticationClient = new AuthenticationClient({
  appId: 'APP_ID',
  appHost: 'https://xxx.authing.cn',
  token: 'ID_TOKEN', // use user's token to initialize SDK
})

const securityLevel = await authenticationClient.getSecurityLevel()
```

#### sample data

- `email`: \<boolean\> whether bind a personal email
- `mfa`: \<boolean\> whether bind a MFA
- `password`: \<boolean\> whether set the password
- `phone`: \<boolean\> whether bind phone number
- `passwordSecurityLevel`: \<number\> password security level
  - `1`: low,
  - `2`: medium,
  - `3`: high,
- `score`: \<number\>，account security rating score, maximum is 100

## Get the list of all authorized resources of the user

AuthenticationClient.listAuthorizedResources(namespace)

> Get a list of all resources authorized for the user to access. This includes all resources that user inherits from roles, groups and organizations.

#### Parameter

- `namespace` \<string\> code of the privilege group. For more details, please refer to: [Use privilege groups to manage privileged resources](/guides/access-control/resource-group.md).

#### Example

```javascript
managementClient.users.listAuthorizedResources('namespace_code')
```

#### sample data

- `type` type is the type of resource, there are several different values that can be used:
  - `DATA`: data type；
  - `API`: interface type；
  - `MENU`: menu type；
  - `BUTTON`: button type；
- `code`: resource descriptor, if the resource is `DATA` type, the format should be: `resourceType: resourceId`, for example, `books:*` means all books, `books:1` means the book that has an id of 1.
- `actions`: actions that user authorized to operate on the resource.

```json
{
  "totalCount": 12,
  "list": [
    {
      "code": "menu_a",
      "type": "MENU"
    },
    {
      "code": "menu_b",
      "type": "MENU"
    },
    {
      "code": "books:1",
      "type": "DATA",
      "actions": ["books:delete", "books:update"]
    }
  ]
}
```
