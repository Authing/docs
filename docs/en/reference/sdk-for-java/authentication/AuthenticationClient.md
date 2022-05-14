# Certified core module

<LastUpdated/>

This module contains registration, resetting the phone number mailbox, modifying account information, etc., is requested by your end user (End user), suitable for use in the case where you need to verify user identity.

```java
// Initialize using AppId and appHost
AuthenticationClient authentication = new AuthenticationClient(APP_ID, APP_HOST);
```

## Use email registration

authenticationClient.registerByEmail(param)

> Use the email registration, the mailbox is not case sensitive and the only userpool is unique. This interface does not require the user to verify the mailbox, and the emailVerified field will be false after the user registration. If you want the user who does not verify the mailbox cannot be logged in,you can open **setting** - **security information** in the userpool**Users who have not verified mailboxes from logging in** option:

![](../../images/20210414145613.png)

#### parameter

- `param` \<RegisterByEmailInput\>
- `param.email` \<String\> email
- `param.password` \<String\> password
- `param.profile` \<RegisterProfileInput\> user information
- `param.forceLogin` \<Boolean\> Whether to take a complete login, it will trigger the Pipeline function before and after login and the login event Webhook, and the number of cumulative logins of the user will add 1. Default is false.
- `param.clientIp` \<String\> The client is real IP. If you call this interface in the server, you must set this parameter as the real IP of the end user.
- `param.context` \<String\> Request context, set here `context` you can get [pipeline context](/guides/pipeline/context-object.md).

#### Example

```java
String email = "test@example.com";
String password = "123456";

User user = authenticationClient.registerByEmail(new RegisterByEmailInput(email, password)).execute();
```

## Register using username

authenticationClient.registerByUsername(param)

> User name is registered, the username is case sensitive and the only user pool.

#### parameter

- `param` \<RegisterByUsernameInput\>
- `param.username` \<String\> username
- `param.password` \<String\> password
- `param.profile` \<RegisterProfileInput\> user information
- `param.forceLogin` \<Boolean\> Whether to take a complete login, it will trigger the Pipeline function before and after login and the login event Webhook, and the number of cumulative logins of the user will add 1. Default is false.
- `param.clientIp` \<String\> The client is real IP. If you call this interface in the server, you must set this parameter as the real IP of the end user.
- `param.context` \<String\> Request context, set here `context` you can get [pipeline context](/guides/pipeline/context-object.md).

#### Example

```java
String username = "test";
String password = "123456";
User user = authenticationClient.registerByUsername(new RegisterByUsernameInput(username, password)).execute();
```

## Use mobile phone number registration

authenticationClient.registerByPhoneCode(param)

> Use your mobile phone number to register, you can set the initial password of the account at the same time. See the interface to send a text message.[sendSmsCode](#发送短信验证码)

#### parameter

- `param` \<RegisterByPhoneCodeInput\>
- `param.code` \<String\> SMS verification code
- `param.phone` \<String\> phone
- `param.password` \<String\> Initial password
- `param.profile` \<RegisterProfileInput\> user information
- `param.forceLogin` \<Boolean\> Whether to take a complete login, it will trigger the Pipeline function before and after login and the login event Webhook, and the number of cumulative logins of the user will add 1. Default is false.
- `param.clientIp` \<String\> The client is real IP. If you call this interface in the server, you must set this parameter as the real IP of the end user.
- `param.context` \<String\> Request context, set here `context` you can get [pipeline context](/guides/pipeline/context-object.md).

#### Example

```java
String phone = "phone number";
String code = "1234";
String password = "123456";

RegisterByPhoneCodeInput param = new RegisterByPhoneCodeInput(phone, code).withPassword(password);
User user = authenticationClient.registerByPhoneCode(param).execute();
```

## Use the email login

authenticationClient.loginByEmail(param)

> Use the email to log in, the interface does not limit the unprecedented mailbox by default, if you want the user who does not authenticate the mailbox, you can use pipeline to intercept this kind of request.

![](../../images/20210414145613.png)

If your user pool is configured with login failure detection, the user will be required to enter graphic verification code (2000) when logging in multiple times in IP.

#### parameter

- `param` \<LoginByEmailInput\>
- `param.email` \<String\> email
- `param.password` \<String\> password
- `param.autoRegister` \<Boolean\> Whether it is automatically registered. If the user does not exist, an account is automatically created according to the login book.
- `param.captchaCode` \<String\> Captcha
- `param.clientIp` \<String\> The client is real IP. If you call this interface in the server, you must set this parameter as the real IP of the end user.
- `param.autoRegister` \<Boolean\> Whether it is automatically registered. If the user does not exist, an account is automatically created according to the login book.
- `param.captchaCode` \<String\> Captcha
- `param.clientIp` \<String\> The client is real IP. If you call this interface in the server, you must set this parameter as the real IP of the end user.
- `param.context` \<String\> Request context, set here `context` you can get [pipeline context](/guides/pipeline/context-object.md) .

#### Example

```java
String email = "test@example.com";
String password = "123456";
User user = authenticationClient.loginByEmail(new LoginByEmailInput(email, password)).execute();
```

## Use the username to log in

authenticationClient.loginByUsername(param)

> Use the username to log in. If your user pool is opened [login failed detection](/guides/security/config-login-fail-limit.md)，When the login is logged in, the user will be required to enter graphic verification code (error code 2000)。

#### parameter

- `param` \<LoginByUsernameInput\>
- `param.username` \<String\> username
- `param.password` \<String\> password
- `param.autoRegister` \<Boolean\> Whether it is automatically registered. If the user does not exist, an account is automatically created according to the login book.
- `param.captchaCode` \<String\> Captcha
- `param.clientIp` \<String\> The client is real IP. If you call this interface in the server, you must set this parameter as the real IP of the end user.
- `param.context` \<String\> Request context, set here `context` you can get [pipeline context](/guides/pipeline/context-object.md).

#### Example

```java
String username = "username";
String password = "123456";
User user = authenticationClient.loginByUsername(new LoginByUsernameInput(username, password)).execute();
```

## Use the mobile phone number verification code to log in

authenticationClient.loginByPhoneCode(param)

> Use the mobile phone number verification code to log in. You need to use it first [sendSmsCode](#发送短信验证码)sends a SMS verification code.

#### parameter

- `param` \<LoginByPhoneCodeInput\>
- `param.phone` \<String\> phone number;
- `param.code` \<String\> SMS verification code, you can pass [sendSmsCode](#发送短信验证码) Method sends a SMS verification code;
- `param.clientIp` \<String\> The client is real IP. If you call this interface in the server, you must set this parameter as the real IP of the end user.
- `param.context` \<String\> Request context, set here `context` you can get [pipeline context](/guides/pipeline/context-object.md).

#### Example

```java
String phone = "phone number";
String code = "1234";
User user = authenticationClient.loginByPhoneCode(new LoginByPhoneCodeInput(phone, code)).execute();
```

## Use the mobile phone number password to log in

authenticationClient.loginByPhonePassword(param)

> If the user is bound to the phone number and set the password, you can log in to the phone number + password. If your userpool opens [Login Failed Detection](/guides/security/config-login-fail-limit.md), when logging in the same IP multiple times, the user will be required to enter graphical verification code (error code is 2000).

#### parameter

- `param` \<LoginByPhonePasswordInput\>
- `param.phone` \<String\> phone
- `param.password` \<String\> password
- `param.captchaCode` \<String\> Captcha
- `param.clientIp` \<String\> The client is real IP. If you call this interface in the server, you must set this parameter as the real IP of the end user.
- `param.context` \<String\> Request context, set here `context` you can get [pipeline context](/guides/pipeline/context-object.md).

#### Example

```java
String phone = "phone number";
String password = "123456";
User user = authenticationClient.loginByPhonePassword(new LoginByPhonePasswordInput(phone, password)).execute();
```

## Sub-account login

authenticationClient.loginBySubAccount(param)

> If the user enables the sub-account login, you can use the sub-account to log in. If your user pool is opened [login failed detection](/guides/security/config-login-fail-limit.md), When logins in the same IP will require the user to enter the graphic verification code (error code 2000).

#### parameter

- `param` \<LoginBySubAccountParam\>
- `param.account` \<String\> Child account
- `param.password` \<String\> password
- `param.captchaCode` \<String\> Captcha
- `param.clientIp` \<String\> The client is real IP. If you call this interface in the server, you must set this parameter as the real IP of the end user.

#### Example

```java
String account = "account number";
String password = "123456";
User user = authenticationClient.loginByPhonePassword(new LoginByPhonePasswordInput(account, password)).execute();
```

## Log in with an LDAP username

authenticationClient.loginByLdap(param)

> Login with an account password using the LDAP identity source. If this account is logged in, it will import its user information into the user directory of the user pool; after logging in again, the user information of this account will be updated based on the latest account information obtained. Click here to view the [Connection LDAP Original](/connections/ldap/) document.

#### parameter

- `param` \<LoginByLdapParam\>
- `param.username` \<String\> username
- `param.password` \<string\> password

#### Example

```java
String username = "test";
String password = "test";
LoginByLdapParam loginByLdapParam = new LoginByLdapParam(username, password);
User user = authenticationClient.loginByLdap(loginByLdapParam).execute();
```

## Login with an AD username

authenticationClient.loginByAd(username, password)

> Log in with an account using the AD domain. If this account is logged in, it will import its user information into the user directory of the user pool; after logging in again, the user information of this account will be updated based on the latest account information obtained.
> Click here to view [Connection Active Directory Original Source](/connections/windows-active-directory/).

#### parameter

- `username` \<String\> username
- `password` \<String\> password

#### Example

```java
String username = "test";
String password = "test";
User user = authenticationClient.loginByAd(username, password).execute();
```

## Get the user information of current login

authenticationClient.getCurrentUser()

> Get the user information of the current login user, you need AuthenticationClient that is currently logged in to get it. You can set the login status of AuthenticationClient in two ways:

1. After calling the login interface (such as password login, mobile phone number verification code login, social login), AuthenticationClient caches users [id_token](/concepts/id-token.md), to remember the login status;
2. By user [id_token](/concepts/id-token.md) initialization AuthenticationClient。

#### Example

```java
User user = authenticationClient.getCurrentUser().execute();
```

## Determine if you login

authenticationClient.checkLoggedIn()

> Determine if you login

1. After calling the login interface (such as password login, mobile phone number verification code login, social login), AuthenticationClient caches users. [id_token](/concepts/id-token.md), to remember the login status;
2. By user [id_token](/concepts/id-token.md) initialization AuthenticationClient。
3. Determine if the user's login status has been cached.

#### Example

```java
Boolean b = authenticationClient.checkLoggedIn();
```

## sign out

authenticationClient.logout()

> Used for users to quit login

1. Empty the user's session session information under the current application;
2. Use the user's current `id_token` marked as failed, use this `id_token` Call {{$localeConfig.brandName}} interface cannot get relevant data.

#### Example

```java
authenticationClient.logout().execute();
```

## Get custom data lists for current users

authenticationClient.listUdv()

> Get the current user's custom data list requires users to log in first

#### Example

```java
authenticationClient.listUdv().execute();
```

## Add user custom data

authenticationClient.listUdv()

> Adding a user-defined data requires a user to log in first?

#### Example

```java
authenticationClient.setUdv("key", "value").execute();
```

## Get list of data data in users

authenticationClient.listOrgs()

> Get the list of organizations where the user is located is required to log in first

#### Example

```java
authenticationClient.listOrgs().execute();
```

## sending text verify code

authenticationClient.sendSmsCode(phone)

> Send SMS verification code, currently only support domestic mobile phone number; this interface has interface frequency limitations, please do not request frequent frequent.

#### parameter

- `phone` \<String\>

#### Example

```java
String phone = "phone number";
authenticationClient.sendSmsCode(phone).execute();
```

## send email

authenticationClient.sendEmail(email, scene)

> Actively send mail to users, currently supported 4 types of messages contain: reset password mail, verify mailbox email, modify mailbox verification code mail, MFA verification email. At the same time you can[Custom email template and configuration third party mail service provider](/guides/userpool-config/email/)。

#### parameter

- `email` \<String\> email
- `scene` \<EmailScene\> Send a scene, optional value is RESET_PASSWORD（send a reset password mail, including the verification code）、VERIFY_EMAIL（send verification mailbox）、CHANGE_EMAIL（send modification mailbox mail, including the verification code）
  - `RESET_PASSWORD`: Send a reset password message, including the verification code;
  - `VERIFY_EMAIL`: Send a message to verify the mailbox;
  - `CHANGE_EMAIL`: Send a modified mailbox message, including the verification code;
  - `MFA_VERIFY`: Send MFA verification email.

#### Example

```java
authenticationClient.sendEmail("test@example.com", EmailScene.RESET_PASSWORD).execute();
```

## Get custom data

authenticationClient.getUdfValue()

> Get all custom data for the user. You need to be in the user pool[Define user-defined data meta information](/guides/users/user-defined-field/)。

#### Example

```java

Map resu = authenticationClient.getUdfValue().execute();
```

## Set custom data

authenticationClient.setUdfValue(data)

> Set the user's custom field. You need to be in the userpool[Define user-defined data meta information](/guides/users/user-defined-field/), and the type of incoming value must match the defined type. If the setting fails, an exception will be thrown, you need to capture an exception.

#### parameter

- `data` Map\<String, String\> Enter data, type as an object, please see the example for details.

#### Example

```java
 Map<String, String> p = new HashMap();
p.put("dnum", "234");
List<UserDefinedData> result = this.authenticationClient.setUdfValue(p).execute();
```

## Delete custom data

authenticationClient.removeUdfValue(key)

> Delete custom data.

#### parameter

- `key` \<String\> Custom field key .

#### Example

```java
List<UserDefinedData> result = this.authenticationClient.removeUdfValue("URF_KEY").execute();
```

## Detect Token login status

authenticationClient.checkLoginStatus()

#### parameter

#### Example

```java
JwtTokenStatus status = authenticationClient.checkLoginStatus().execute();
```

#### Sample data

- Successful example

```json
{
  "code": 200,
  "message": "logged",
  "status": true,
  "exp": 1620732833,
  "iat": 1619523233
}
```

- Failed example

```json
{
  "code": 2206,
  "message": "Login information has expired",
  "status": false,
  "exp": null,
  "iat": null
}
```

## Reset password via SMS verification code

authenticationClient.resetPasswordByPhoneCode(phone, code, newPassword)

> Reset your password by SMS verification code, you can send SMS verification code by [sendSmsCode](#发送短信验证码) method.

#### parameter

- `phone` \<String\> phone
- `code` \<String\> Verification code
- `newPassword` \<String\> New password

#### Example

```java
String phone = "phone number";
String code = "1234";
String password = "123456";
authenticationClient.resetPasswordByPhoneCode(phone, code, password).execute();
```

## Reset password via mail verification code

authenticationClient.resetPasswordByEmailCode(email, code, newPassword)

> eset password by email verification code, you need to call [sendEmail](#发送邮件) interface to send a reset password message（the scene value `RESET_PASSWORD`）.

#### parameter

- `email` \<String\> Email
- `code` \<String\> Verification code
- `newPassword` \<String\> New password

#### Example

```java
String email = "test@example.com";
String code = "1234";
String password = "123456";
authenticationClient.resetPasswordByEmailCode(email, code, password).execute();
```

## Modify user profile

authenticationClient.updateProfile(updates)

> Modify user information, this interface cannot be used to modify the mobile phone number, email, password, if you need to call [updatePhone](#更新用户手机号)、[updateEmail](#更新用户邮箱)、[updatePassword](#更新用户密码).

#### parameter

- `updates` \<UpdateUserInput\> Modified user profile
- `updates.username` \<String\> username
- `updates.nickname` \<String\> nickname
- `updates.photo` \<String\> Avatar
- `updates.company` \<String\> company
- `updates.browser` \<String\> browser
- `updates.device` \<String\> device
- `updates.lastIP` \<String\> Recently logged in IP
- `updates.name` \<String\> Name
- `updates.givenName` \<String\> Given Name
- `updates.familyName` \<String\> Family Name
- `updates.formatted` \<String\> Address
- `updates.middleName` \<String\> Middle Name
- `updates.profile` \<String\> Profile Url
- `updates.preferredUsername` \<String\> Preferred Name
- `updates.website` \<String\> website
- `updates.gender` \<String\> gender, M（Man）means male, F（Female）means famale, U（Unknown）means unknown.
- `updates.birthdate` \<String\> birthdate
- `updates.zoneinfo` \<String\> Time zone
- `updates.locale` \<String\> Language
- `updates.address` \<String\> address
- `updates.streetAddress` \<String\> Street address
- `updates.locality` \<String\>
- `updates.region` \<String\> region
- `updates.postalCode` \<String\> postal code
- `updates.city` \<String\> city
- `updates.province` \<String\> province
- `updates.country` \<String\> country

#### Example

```java
User user = authenticationClient.updateProfile(new UpdateUserInput().withNickname("nickname")).execute();
```

## Update user password

authenticationClient.updatePassword(newPassword, oldPassword)

> Update user password

#### parameter

- `newPassword` \<String\> new password
- `oldPassword` \<String\> Old password, if the user does not set a password, you can not fill.

#### Example

```java
String oldPassword = "111111";
String newPassword = "123456";
User user = authenticationClient.updatePassword(newPassword, oldPassword).execute();
```

## Binding mobile phone number

authenticationClient.bindPhone(phone, phoneCode)

> The user is bound to bind the mobile phone number, if you need to modify your mobile phone number, please use it [updatePhone](#更新用户手机号). If the phone number has been bound, it will be bound to fail. Send verification code, please use [sendSmsCode](#发送短信验证码).

> Terminal users can also[Bind mobile phone number in personal center buffet](/guides/user/manage-profile.md#绑定手机号)：

![](../../images/20201019200112.png)

#### parameter

- `phone` \<String\>
- `phoneCode` \<String\>

#### Example

```java
User user = authenticationClient.bindPhone("phone number", "1234").execute();
```

## Solution to the mobile number

authenticationClient.unbindPhone()

> The user solves the mobile phone number. If the user does not bind other login mode (mailbox, social login account), it will not be able to decompose the mobile phone number, will prompt the error.

> End users can also [in the personal center self-service mobile phone number](/guides/user/manage-profile.md#绑定手机号)：

![](../../images/20201019200112.png)

#### Example

```java
User user = authenticationClient.unbindPhone().execute();
```

## Update user mobile phone number

authenticationClient.updatePhone(phone, phoneCode, oldPhone, oldPhoneCode)

> Update the user mobile phone number. As with the modification of the mailbox, by default, if the user is currently bound to the mobile phone number, you need to verify the original mobile phone number (current account binding mobile phone number) and the current mailbox (the mobile phone number to be bound). User A currently binding mobile phone number is 15888888888, want to modify to 1589999999, then you need to verify the two mobile phone numbers at the same time. Developers can also choose to "verify the original mobile number", you can turn of **setting** - **security information** in {{$localeConfig.brandName}} console.

![](../../images/20210414110024.png)

Users bind the mobile phone number for the first time, please use the[bindPhone](#绑定手机号) interface.

#### parameter

- `phone` \<String\> New mobile phone number
- `phoneCode` \<String\> New mobile phone number verification code
- `oldPhone` \<String\> Old mobile phone number
- `oldPhoneCode` \<String\> Old mobile phone number verification code

#### Example

```java
User user = authenticationClient.updatePhone("phone number", "1234").execute();
```

## Binding mailbox

authenticationClient.bindEmail(email, emailCode)

> Used for the user's first binding mailbox, you need to verify the mailbox verification code. If you need to modify the mailbox, please use it[updateEmail](#更新用户邮箱). If the mailbox has been bound, it will bind failed. Send an email verification code, please use [sendEmail](#发送邮件).
> Terminal users can also[Binding mailbox in personal center buffet](/guides/user/manage-profile.md#绑定邮箱)：

![](../../images/20201019200112.png)

#### parameter

- `email` \<String\> EMail
- `emailCode` \<String\>Mail verification code, can pass[sendEmail](#发送邮件) method is obtained,EmailScene is CHANGE_EMAIL。

#### Example

```java
User user = authenticationClient.bindEmail("demo@authing.cn", "1234").execute();
```

## Menned mailbox

authenticationClient.unbindEmail()

> The user solves the mobile phone number. If the user does not bind other login mode (mobile phone number, social login account), it will not be able to decompose the mailbox, will prompt the error.

> End users can also [in personal center self-help mailbox](/guides/user/manage-profile.md#绑定邮箱)：

![](../../images/20201019200112.png)

#### Example

```java
User user = authenticationClient.unbindEmail().execute();
```

## Update user mailbox

authenticationClient.updateEmail(email, emailCode, oldEmail, oldEmailCode)

> AuthenticationClient().updateEmail(email, emailCode, oldEmail, oldEmailCode)If the user has bind the mailbox, by default, you need to verify the original mailbox (current account binding mailbox) and the current mailbox (the mailbox to be bound).User A The currently bound mailbox is 123456@qq.com, want to modify to 1234567@qq.com, then you need to verify these two mailboxes. Developers can also choose to "verify the original mailbox", you can turn off **setting** - **Security Information** in {{$localeConfig.brandName}} console.

![](../../images/20210414105928.png)

Users bind the mailbox for the first time please use [bindEmail](#绑定邮箱).

#### parameter

- `email` \<String\> new mail box
- `emailCode` \<String\> New mailbox verification code
- `oldEmail` \<String\> Old mailbox
- `oldEmailCode` \<String\> Old mailbox verification code

#### Example

```java
String newEmail = "new@example.com";
String emailCode = "1234"
User user = authenticationClient.updateEmail(newEmail, emailCode).execute();
```

<!--## 刷新当前用户的 token

authenticationClient.refreshToken()

> 刷新当前用户的 token，调用此接口要求先登录。

#### Example

```java
RefreshToken token = authenticationClient.refreshToken().execute();
```-->

## Bind social account

authenticationClient.linkAccount(primaryUserToken, secondaryUserToken)

> Bind a social account (such as WeChat account, Github account) to a primary account (mobile number, email account).

#### parameter

- `primaryUserToken` \<String\> main account Token
- `secondaryUserToken` \<String\> Social account Token

#### Example

```java
String primaryUserToken = "test";
String secondaryUserToken = "test";
authenticationClient.linkAccount(primaryUserToken, secondaryUserToken).execute();
```

## Solidning the social account

authenticationClient.unLinkAccount(options)

The primary account is tied to the socialized login account.

#### parameter

- `options.primaryUserToken` \<String\> Main account user `id_token`；
- `options.provider` \<ProviderType\> You can [View all social login types supported here](/guides/authentication/social/)。

#### Example

```java
authenticationClient.unLinkAccount(
    new UnLinkAccountParam("primaryUserToken", ProviderType.QQ)
)
```

#### return value

```json
{
  "code": 200,
  "data": true,
  "message": "Binding success"
}
```

## Check password strength

authenticationClient.checkPasswordStrength(password)

> Check password strength, [click here to view details](/guides/security/config-password.md)。

Determine if the password meets the password strength requirements. {{$localeConfig.brandName}} middle code intensity level is divided into the following:

- Any non-empty string;
- At least 6 characters;
- At least 6 characters, and must contain two types in English, numbers and symbols;
- At least 6 characters, and the password must contain English, numbers and symbols.

#### parameter

- `password` \<String\> password

#### Example

```java
String password = "test";
CheckPasswordStrengthResult result = authenticationClient.checkPasswordStrength(password).execute();
```

## Calculate password security level

authenticationClient.computedPasswordSecurityLevel(password)

> Calculate the password security level.

#### parameter

- `password`: The password (clear text format) that needs to be calculated must be `String` type;

#### Example

```java

PasswordSecurityLevel securityLevel = authenticationClient.computedPasswordSecurityLevel(
  'xxxxxxxx'
)
```

## Get user account security level

authenticationClient.getSecurityLevel()

> Get user account security level

#### Example

```java
SecurityLevel result = authenticationClient.getSecurityLevel().execute();
Assert.assertNotNull(result !=null);
```

<!--## Code 换 Token

authenticationClient.getAccessTokenByCode(code)

> Use 授权码 Code 获取用户的 Token 信息。

#### parameter

- `code` \<String\> 授权码 Code，用户在认证成功后，Authing 会将授权码 Code 发送到回调地址，详情请见[Use  OIDC 授权码模式](/federation/oidc/authorization-code)。

初始化 AuthenticationClient 时的参数：

- `appId` \<String\> 应用 ID，必填。
- `secret` \<String\> 应用密钥，必填。
- `appHost` \<String\> {{$localeConfig.brandName}} 应用 Host 地址（必填），如 `https://my-awesome-app.authing.cn`。
- `redirectUri` \<String\> 业务回调 URL，必填。
- `protocol` \<String\> 协议类型，可选值为 `oidc`、`oauth`。
- `tokenEndPointAuthMethod` \<String\> 获取 token 端点验证方式，可选值为 `client_secret_post`、`client_secret_basic`、`none`，默认为 `client_secret_post`。
- `introspectionEndPointAuthMethod` \<String\> 检验 token 端点验证方式，可选值为 `client_secret_post`、`client_secret_basic`、`none`，默认为 `client_secret_post`。
- `revocationEndPointAuthMethod` \<String\> 撤回 token 端点验证方式，可选值为 `client_secret_post`、`client_secret_basic`、`none`，默认为 `client_secret_post`。

#### Example

```java
// Use  AppId 和 appHost 进行初始化
AuthenticationClient authentication = new AuthenticationClient(APP_ID, APP_HOST);

// 你在 Authing 控制台配置的回调链接
authenticationClient.setRedirectUri("https://baidu.com");

Object result = authenticationClient.getAccessTokenByCode("CODE").execute();
Assert.assertNotNull(result !=null);
```

#### Example数据

```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlRmTE90M0xibjhfYThwUk11ZXNzYW1xai1vM0RCQ3MxLW93SExRLVZNcVEifQ.eyJqdGkiOiJsdzg0NW5zdGcwS3EtMTlodVpQOHYiLCJzdWIiOiI1ZmY3MDFkODQ2YjkyMDNlMmY2YWM2ZjMiLCJpYXQiOjE2MTU4ODM1ODYsImV4cCI6MTYxNTg4NzE4Niwic2NvcGUiOiJlbWFpbCBvcGVuaWQgcHJvZmlsZSBwaG9uZSIsImlzcyI6Imh0dHBzOi8vb2lkYzEuYXV0aGluZy5jbi9vaWRjIiwiYXVkIjoiNWYxN2E1MjlmNjRmYjAwOWI3OTRhMmZmIn0.VvYKBcWcr8iIi1b37ugWQ9hsvog4_7EqDQyFqwhIuvM0NHlHH3Bhw83EQIKSNfbWV4nv3ihfeNGPLMzslbQr-wwjnWZTLMYl1bcn7IdVtD_kTN3Zz10MwF5td-VQ7UndU28wJ0HE1mo6E8QH93kYGckS5FSZXmCBa0M5H59Jec_a1MHI1MZrr_V9cZ9EfeF97V-PcqU8JVAwDZclCJ3mWY_Mb65RnMR9yEVqUZzJStmaXGMuRIzjkm2pklqt0CtQQJfzECXq_4USpwRXDiYLWILYPUCcO6hGxDjhMEd8IcxdG51TQP-w1UM6LyIRn61uSJvDsz8zg5dStDKyocypiA",
  "expires_in": 3600,
  "id_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QzQDEyMy5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsInN1YiI6IjVmZjcwMWQ4NDZiOTIwM2UyZjZhYzZmMyIsImJpcnRoZGF0ZSI6bnVsbCwiZmFtaWx5X25hbWUiOm51bGwsImdlbmRlciI6IlUiLCJnaXZlbl9uYW1lIjpudWxsLCJsb2NhbGUiOm51bGwsIm1pZGRsZV9uYW1lIjpudWxsLCJuYW1lIjpudWxsLCJuaWNrbmFtZSI6bnVsbCwicGljdHVyZSI6Imh0dHBzOi8vZmlsZXMuYXV0aGluZy5jby9hdXRoaW5nLWNvbnNvbGUvZGVmYXVsdC11c2VyLWF2YXRhci5wbmciLCJwcmVmZXJyZWRfdXNlcm5hbWUiOm51bGwsInByb2ZpbGUiOm51bGwsInVwZGF0ZWRfYXQiOiIyMDIxLTAzLTE1VDA1OjU0OjU0LjY4NVoiLCJ3ZWJzaXRlIjpudWxsLCJ6b25laW5mbyI6bnVsbCwicGhvbmVfbnVtYmVyIjpudWxsLCJwaG9uZV9udW1iZXJfdmVyaWZpZWQiOmZhbHNlLCJub25jZSI6IjcwVEU3eW9NVFEiLCJhdF9oYXNoIjoiUFNnOGw5eDRldGxmLXA4UDdjYnVoQSIsImlzcyI6Imh0dHBzOi8vb2lkYzEuYXV0aGluZy5jbi9vaWRjIiwiaXNzMiI6Imh0dHBzOi8vYmFpZHUuY29tIiwiYXVkIjoiNWYxN2E1MjlmNjRmYjAwOWI3OTRhMmZmIiwiZXhwIjoxNjE1ODg3MTg3LCJpYXQiOjE2MTU4ODM1ODh9.OlX-FP7znIEqx0YpnOQ8kxadMe1toHDj1KPVm0dbEVc",
  "scope": "email openid profile phone",
  "token_type": "Bearer"
}
```

## Token 换用户信息

authenticationClient.getUserInfoByAccessToken('access_token')

> Use  Access token 获取用户信息。

#### parameter

- `access_token` \<String\> Access token，Use 授权码 Code 换取的 Access token 的内容。详情请见[Use  OIDC 授权码模式](/federation/oidc/authorization-code)。

初始化 AuthenticationClient 时的参数：

- `appId` \<String\> 应用 ID，必填。
- `secret` \<String\> 应用密钥，必填。
- `appHost` \<String\> {{$localeConfig.brandName}} 应用 Host 地址（必填），如 `https://my-awesome-app.authing.cn`。
- `redirectUri` \<String\> 业务回调 URL，必填。
- `protocol` \<String\> 协议类型，可选值为 `oidc`、`oauth`。
- `tokenEndPointAuthMethod` \<String\> 获取 token 端点验证方式，可选值为 `client_secret_post`、`client_secret_basic`、`none`，默认为 `client_secret_post`。
- `introspectionEndPointAuthMethod` \<String\> 检验 token 端点验证方式，可选值为 `client_secret_post`、`client_secret_basic`、`none`，默认为 `client_secret_post`。
- `revocationEndPointAuthMethod` \<String\> 撤回 token 端点验证方式，可选值为 `client_secret_post`、`client_secret_basic`、`none`，默认为 `client_secret_post`。

#### Example

```java
// Use  AppId 和 appHost 进行初始化
AuthenticationClient authentication = new AuthenticationClient(APP_ID, APP_HOST);

authenticationClient.setSecret("AUTHING_APP_SECRET");
// 你在 Authing 控制台配置的回调链接
authenticationClient.setRedirectUri("https://baidu.com");


Object result = testAC.getUserInfoByAccessToken("ACCESS_TOKEN").execute();
Assert.assertNotNull(result !=null);
```

#### Example数据

```json
{
  "address": {
    "country": null,
    "postal_code": null,
    "region": null,
    "formatted": null
  },
  "birthdate": null,
  "family_name": null,
  "gender": "U",
  "given_name": null,
  "locale": null,
  "middle_name": null,
  "name": null,
  "nickname": null,
  "picture": "https://files.authing.co/authing-console/default-user-avatar.png",
  "preferred_username": null,
  "profile": null,
  "updated_at": "2021-03-03T06:17:14.485Z",
  "website": null,
  "zoneinfo": null,
  "email": "test1@authing.cn",
  "email_verified": false,
  "sub": "603f184cec4505e2868431fc",
  "phone_number": null,
  "phone_number_verified": false
}
```

## Client Credentials 模式获取 Access Token

authenticationClient.getAccessTokenByClientCredentials(scope, options)

> Use 编程访问账号获取具备权限的 Access Token。

#### parameter

- `scope` \<String\> 权限项目，空格分隔的字符串，每一项代表一个权限。详情请见[机器间（M2M）授权](/guides/authorization/m2m-authz.html#获取具备权限的-accesstoken)。
- `options`，编程访问账号的 AK 与 SK 信息。
- `options.accessKey`，编程访问账号 AccessKey。
- `options.secretKey`，编程访问账号 SecretKey。

初始化 AuthenticationClient 时的参数：

- `appId` \<String\> 应用 ID，必填。
- `secret` \<String\> 应用密钥，必填。
- `appHost` \<String\> {{$localeConfig.brandName}} 应用 Host 地址（必填），如 `https://my-awesome-app.authing.cn`。
- `redirectUri` \<String\> 业务回调 URL，必填。
- `protocol` \<String\> 协议类型，可选值为 `oidc`、`oauth`。
- `tokenEndPointAuthMethod` \<String\> 获取 token 端点验证方式，可选值为 `client_secret_post`、`client_secret_basic`、`none`，默认为 `client_secret_post`。
- `introspectionEndPointAuthMethod` \<String\> 检验 token 端点验证方式，可选值为 `client_secret_post`、`client_secret_basic`、`none`，默认为 `client_secret_post`。
- `revocationEndPointAuthMethod` \<String\> 撤回 token 端点验证方式，可选值为 `client_secret_post`、`client_secret_basic`、`none`，默认为 `client_secret_post`。

#### Example

```java
// Use  AppId 和 appHost 进行初始化
AuthenticationClient authentication = new AuthenticationClient(APP_ID, APP_HOST);

authenticationClient.setSecret("AUTHING_APP_SECRET");
// 你在 Authing 控制台配置的回调链接
authenticationClient.setRedirectUri("https://baidu.com");

ClientCredentialInput clientCredentialInput = new ClientCredentialInput("AUTHING_APP_ID", "AUTHING_APP_SECRET");
Object result = testAC.getAccessTokenByClientCredentials("testr2",clientCredentialInput).execute();
Assert.assertNotNull(result !=null);
```

#### Example数据

```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlRmTE90M0xibjhfYThwUk11ZXNzYW1xai1vM0RCQ3MxLW93SExRLVZNcVEifQ.eyJqdGkiOiJsdzg0NW5zdGcwS3EtMTlodVpQOHYiLCJzdWIiOiI1ZmY3MDFkODQ2YjkyMDNlMmY2YWM2ZjMiLCJpYXQiOjE2MTU4ODM1ODYsImV4cCI6MTYxNTg4NzE4Niwic2NvcGUiOiJlbWFpbCBvcGVuaWQgcHJvZmlsZSBwaG9uZSIsImlzcyI6Imh0dHBzOi8vb2lkYzEuYXV0aGluZy5jbi9vaWRjIiwiYXVkIjoiNWYxN2E1MjlmNjRmYjAwOWI3OTRhMmZmIn0.VvYKBcWcr8iIi1b37ugWQ9hsvog4_7EqDQyFqwhIuvM0NHlHH3Bhw83EQIKSNfbWV4nv3ihfeNGPLMzslbQr-wwjnWZTLMYl1bcn7IdVtD_kTN3Zz10MwF5td-VQ7UndU28wJ0HE1mo6E8QH93kYGckS5FSZXmCBa0M5H59Jec_a1MHI1MZrr_V9cZ9EfeF97V-PcqU8JVAwDZclCJ3mWY_Mb65RnMR9yEVqUZzJStmaXGMuRIzjkm2pklqt0CtQQJfzECXq_4USpwRXDiYLWILYPUCcO6hGxDjhMEd8IcxdG51TQP-w1UM6LyIRn61uSJvDsz8zg5dStDKyocypiA",
  "expires_in": 3600,
  "scope": "email openid profile phone",
  "token_type": "Bearer"
}
```
-->

## Get applications that current users can access

authenticationClient.listApplications(options)

> Get the application that the current user can access.

#### parameter

- `options`\<object\>, Optional
- `options.page` \<number\> Page serial number, default is `1`.
- `options.limit` \<number\> The number of times returned per page, the default is `10`

#### Example

```java
Pagination<ApplicationPublicDetail> resData = authenticationClient.listApplications({
  page: 1,
  limit: 10,
})
```

## Get all the list of users authorized to be authorized

authenticationClient.listAuthorizedResources(namespace)

> Gets all resources authorized by users, and users are authorized to include resources that are inherited from roles, packets, and organizational institutions.

#### parameter

- `namespace` \<String\> Code of permission grouping, please see[Use rights group management privilege resources](/guides/access-control/resource-group.md).

#### Example

```java
PaginatedAuthorizedResources res = authenticationClient.listAuthorizedResources(namespace).execute();
```

## Generate a PKCE check code

authenticationClient.listAuthorizedResources(namespace)

> Generate a PKCE check code, the length must be greater than or equal to 43

#### Example

```java
String res = authenticationClient.generateCodeChallenge();
```

## Generate a PKCE check code summary value

authenticationClient.getCodeChallengeDigest(param)

> Generate a PKCE check code summary value

#### parameter

- `param` \<CodeChallengeDigestParam\> PKCE check code, summary algorithm parameters
- `param.codeChallenge` \<String\> The code_challenge original value of the abstract value is generated, and a random string having a length greater than or equal to 43.
- `param.method` \<String\> You can use the summary algorithm used when calculating code_challenge can be used for plain, S256. plain indicates that no algorithm is returned, S256 represents the use of SHA256 to calculate the code_challenge summary.

#### Example

```java
PaginatedAuthorizedResources res = authenticationClient.getCodeChallengeDigest(new CodeChallengeDigestParam("codeChallenge","S256")).execute();
```

## Judging whether the current user has a role

authenticationClient.hasRole(roleCode, namespace)

> Judging whether the current user has a role

#### parameter

- `roleCode` \<String\> Role Code
- `namespace` \<String\> Code of permission group, please see [Use rights group management privilege resources](/guides/access-control/resource-group.md).

#### Example

```java
Boolean res = authenticationClient.hasRole("roleCode", "default").execute();
```

## Determine if the user exists

authenticationClient.isUserExists(username, email, phone, externalId)

> Determine if the user exists

#### parameter

- `username` \<String\> username
- `email` \<String\> User mailbox
- `phone` \<String\> User mobile phone number
- `externalId` \<String\> Outside user Id

#### Example

```java
Boolean res = authenticationClient.isUserExists("username", "email", "phone", "externalId").execute();
```

## Get all user departments

authenticationClient.listDepartments()

> Get all user departments

#### Example

```java
PaginatedDepartments res = authenticationClient.listDepartments().execute();
```

## Reset password through the first login Token

authenticationClient.resetPasswordByFirstLoginToken(token, password)

> Reset password through the first login Token

#### parameter

- `token` \<String\> First login Token
- `password` \<String\> Reset password

#### Example

```java
Boolean res = authenticationClient.resetPasswordByFirstLoginToken("token", "password").execute();
```

## Force with temporary Token to change password by password

authenticationClient.resetPasswordByForceResetToken(token, oldPassword, newPassword)

> Force with temporary Token to change password by password

#### parameter

- `token` \<String\> Temporary login Token
- `oldPassword` \<String\> Cryptography before modify
- `newPassword` \<String\> Reset password

#### Example

```java
Boolean res = authenticationClient.resetPasswordByForceResetToken("token", "password").execute();
```

## Detect whether the password is legal

authenticationClient.isPasswordValid(token, oldPassword, newPassword)

> Detect whether the password is legal

#### parameter

- `password` \<String\> Checked password

#### Example

```java
CommonMessage res = authenticationClient.isPasswordValid("password").execute();
```

## SSO Detecting

authenticationClient.trackSession()

> SSO Detecting

#### Example

```java
CommonMessage res = authenticationClient.trackSession().execute();
```

## Test CAS 1.0 Ticket legality

authenticationClient.validateTicketV1(ticket, service)

> Test CAS 1.0 Ticket legality

#### parameter

- `ticket` \<String\> After the CAS certification is successful, Authing issued Ticket.
- `service` \<String\> CAS callback address

#### Example

```java
ValidateTicketV1Response res = authenticationClient.validateTicketV1("ticket", "service").execute();
```

## Verify ticket through remote service

authenticationClient.validateTicketV2(ticket, service)

> Verify ticket through remote service

#### parameter

- `ticket` \<String\> After the CAS certification is successful, Authing issued Ticket.
- `service` \<String\> CAS callback address
- `format` \<String\> Return to the message formulation, support XML | JSON.

#### Example

```java
Sting res = authenticationClient.validateTicketV2("ticket", "service", "JSON").execute();
```
