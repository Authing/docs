---
meta:
  - name: description
    content: AuthenticationClient
---

# AuthenticationClient

<LastUpdated/>

> This client contains methods such as registeration and login, resetting the phone number and email, and modifying account information. These methods need to be requested by end users after they have been verified.

## Register by email

AuthenticationClient().register_by_email(email, password, profile, options)

> Use email registration, this interface does not require the user to verify the email, the `emailVerified` field will be `false` after the user registers. If you want users with unauthenticated email to be unable to log in, you can use the pipeline to intercept such requests.

#### Parameter

- `email` \<string\> Email
- `password` \<string\> Password
- `profile` \<RegisterProfile\> User profile
- `options` \<Object\>
- `options.forceLogin` \<boolean\> Whether to go through the complete login process. The pipeline function before and after login and the login event webhook will be triggered.The cumulative login times of the user will be increased by 1. The default value is `false`.
- `options.generateToken` \<boolean\> Whether to generate a token for the user. It will not trigger the complete process after login. The user's cumulative login times will not increase by 1. The default is `false`.
- `options.clientIp` \<string\> The real IP of the client. If you call this interface on the server side, be sure to set this parameter to the real IP of the end user.

#### Example

```python
email = 'test@example.com'
user = authentication_client.register_by_email(
    email=email,
    password='passw0rd',
    profile={
      'nickname': 'Nick'
    }
)
```

## Register by username

AuthenticationClient().register_by_username(username, password, profile, options)

> Register by username

#### Parameter

- `username` \<string\> Username
- `password` \<string\> Password
- `profile` \<RegisterProfile\> User profile
- `options` \<Object\>
- `options.forceLogin` \<boolean\> Whether to go through the complete login process. The pipeline function before and after login and the login event webhook will be triggered.The cumulative login times of the user will be increased by 1. The default is `false`.
- `options.generateToken` \<boolean\> Whether to generate a token for the user. It will not trigger the complete process after login. The user's cumulative login times will not increase by 1. The default is `false`.
- `options.clientIp` \<string\> The real IP of the client. If you call this interface on the server side, be sure to set this parameter to the real IP of the end user.

#### Example

```python
username = 'bob'
user = authentication_client.register_by_username(
    username=username,
    password='passw0rd',
    profile={
      'nickname': 'Nick'
    }
)
```

## Register by phone number

AuthenticationClient().register_by_phone_code(phone, code, password, profile, options)

> Register with your mobile phone number, and you can set the initial password of the account. You can find the send SMS interface in sendSmsCode.

#### Parameter

- `phone` \<string\> Phone number
- `code` \<string\> SMS verification code
- `password` \<string\> Initial password
- `profile` \<RegisterProfile\> User profile
- `options` \<Object\>
- `options.forceLogin` \<boolean\> Whether to go through the complete login process. The pipeline function before and after login and the login event webhook will be triggered.The cumulative login times of the user will be increased by 1. The default value is `false`.
- `options.generateToken` \<boolean\> Whether to generate a token for the user. It will not trigger the complete process after login. The user's cumulative login times will not increase by 1. The default value is `false`.
- `options.clientIp` \<string\> The real IP of the client. If you call this interface on the server side, be sure to set this parameter to the real IP of the end user.

#### Example

```python
phone = '188xxxx8888'
user = authentication_client.register_by_phone_code(
    phone=phone,
    code='1234',
    password='passw0rd',
    profile={
      'nickname': 'Nick'
    }
)
```

## Send SMS code

AuthenticationClient().send_sms_code(phone)

> Send SMS verification code, the validity time of SMS verification code is 60 s.

#### Parameter

- `phone` \<string\> Phone number

#### Example

```python
authentication_client.send_sms_code(
  phone="188xxxx8888",
)
```

## Login by email

AuthenticationClient().login_by_email(email, password, options)

> Users with unverified emails to not be able to log in, you can use the pipeline to intercept such requests.

If your user pool is configured with login failure detection, the user will be asked to enter a CAPTCHA code (code 2000) when the login fails multiple times under the same IP.

#### Parameter

- `email` \<string\> Email
- `password` \<string\> Password
- `options` \<Object\>
- `options.autoRegister` \<boolean\> Whether to register automatically.If it detects that the user does not exist, an account will be automatically created based on the login account password.
- `options.captchaCode` \<string\> CAPTCHA code
- `options.clientIp` \<string\> The real IP of the client. If you call this interface on the server side, be sure to set this parameter to the real IP of the end user.

#### Example

```python
email = 'test@example.com'
user = authentication_client.login_by_email(
    email=email,
    password='passw0rd',
)
```

## Login by username

AuthenticationClient().login_by_username(username, password, options)

> Login by username.

If your user pool is configured with login failure detection, the user will be asked to enter a CAPTCHA verification code (code 2000) when the login fails multiple times under the same IP.

#### Parameter

- `username` \<string\> Username
- `password` \<string\> Password
- `options` \<Object\>
- `options.autoRegister` \<boolean\> Whether to register automatically.If it detects that the user does not exist, an account will be automatically created based on the login account password.
- `options.captchaCode` \<string\> CAPTCHA code
- `options.clientIp` \<string\> The real IP of the client. If you call this interface on the server side, be sure to set this parameter to the real IP of the end user.

#### Example

```python
username = 'bob'
user = authentication_client.register_by_username(
    username=username,
    password='passw0rd',
    auto_register=True, # whether to register if user doesn't exist
)
```

## Login by SMS code

AuthenticationClient().login_by_phone_code(phone, code)

> Login by phone number and SMS code.

#### Parameter

- `phone` \<string\> Phone number
- `code` \<string\> SMS verification code
- `options.clientIp` \<string\> The real IP of the client. If you call this interface on the server side, be sure to set this parameter to the real IP of the end user.

#### Example

```python
phone = '188xxxx8888'
# log in by SMS code, if user doesn't exist, it will automatically register a new account
user = authentication_client.login_by_phone_code(
    phone=phone,
    code='1234',
)
```

## Login by phone number and password

AuthenticationClient().login_by_phone_password(phone, password, options)

> Login by phone number and password.

#### Parameter

- `phone` \<string\> Phone number
- `password` \<string\> Password
- `options` \<Object\>
- `options.captchaCode` \<string\> CAPTCHA code
- `options.clientIp` \<string\> The real IP of the client. If you call this interface on the server side, be sure to set this parameter to the real IP of the end user.

#### Example

```python
phone = '188xxxx8888'
user = authentication_client.login_by_phone_password(
    phone=phone,
    password='passw0rd',
)
```

## Check Token and login status

AuthenticationClient().check_login_status(token)

> Check Token and login status.

#### Parameter

- `token` \<string\> The user's login credentials token

#### Example

```python
# check any token's status to see if it is valid
data = authentication.check_login_status(token="TOKEN")

# called registeration before or initialize through access_token
# check the login status of the current user
data = authentication.check_login_status()
```

## Send email

AuthenticationClient().send_email(email, scene)

> Send email.

#### Parameter

- `email` \<string\> Email
- `scene` \<EmailScene\> Sending scene, optional values are RESET_PASSWORD (send a reset password email, the email contains the verification code), VerifyEmail (send the email to verify the mailbox), ChangeEmail (send the modified email, the email contains the verification code)

#### Example

```python
authentication_client.send_email(
  email="test@example.com",
  scene="RESET_PASSWORD",
)
```

## Reset password by SMS code

AuthenticationClient().reset_password_by_phone_code(phone, code, newPassword)

> To reset the password via SMS verification code, you need to call the sendSmsCode interface to send the reset password email.

#### Parameter

- `phone` \<string\> Phone number
- `code` \<string\> Verification code
- `newPassword` \<string\> New password

#### Example

```python
authentication_client.reset_password_by_phone_code(
  phone="188xxxx8888",
  code="1234",
  new_password="passw0rd"
)
```

## Reset password by email

AuthenticationClient().reset_password_by_email_code(phone, code, newPassword)

> To reset password by email, you need to call sendEmail API to send password reset email.

#### Parameter

- `phone` \<string\> Phone number
- `code` \<string\> Verification code
- `newPassword` \<string\> New password

#### Example

```python
authentication_client.reset_password_by_email_code(
  email="test@example.com",
  code="1234",
  new_password="passw0rd"
)
```

## Update user profile

AuthenticationClient().update_profile(updates)

> Update user information. This interface cannot be used to update the phone number, email address, and password. If necessary, please call the updatePhone, updateEmail, and updatePassword interfaces.

#### Parameter

- `updates` \<UpdateUserInput\> Modified user profile
- `updates.username` \<string\> Username
- `updates.nickname` \<string\> Nickname
- `updates.photo` \<string\> Avtar
- `updates.company` \<string\> Company
- `updates.browser` \<string\> Browser
- `updates.device` \<string\> Device
- `updates.lastIP` \<string\> Last logged in IP
- `updates.name` \<string\> Name
- `updates.givenName` \<string\> Given Name
- `updates.familyName` \<string\> Family Name
- `updates.middleName` \<string\> Middle Name
- `updates.profile` \<string\> Profile Url
- `updates.preferredUsername` \<string\> Preferred Name
- `updates.website` \<string\> personal website
- `updates.gender` \<string\> Gender, M means male, F means female, U means unknown.
- `updates.birthdate` \<string\> Birthday
- `updates.zoneinfo` \<string\> Timezone
- `updates.locale` \<string\> Language
- `updates.address` \<string\> Address
- `updates.streetAddress` \<string\> Street address
- `updates.locality` \<string\>
- `updates.region` \<string\> Region
- `updates.postalCode` \<string\> Zipcode
- `updates.city` \<string\> City
- `updates.province` \<string\> Province
- `updates.country` \<string\> Country

#### Example

```python
user = authentication_client.update_profile({
    'nickname': 'Nick'
})
```

## Update password

AuthenticationClient().update_password(newPassword, oldPassword)

> Update password.

#### Parameter

- `newPassword` \<string\> New password
- `oldPassword` \<string\> Old password, if the user has not set a password, it can be left blank.

#### Example

```python
# old_password is left empty for those accounts registered by phone or social registration
authentication_client.update_password(
  new_password="passw0rd",
)

# user had a password before
authentication_client.update_password(
  new_password="passw0rd",
  old_password="123456!"
)
```

## Update phone number

AuthenticationClient().update_phone(phone, phoneCode, oldPhone, oldPhoneCode)

> Update the user's phone number. Same as update the email, by default, if the user has already bound a phone number, the original phone number (the phone number bound to the current account) and the current email (the phone number to be bound) need to be verified at the same time. In other words, the phone number currently bound to user A is 15888888888, and if you want to change it to 15899999999, you need to verify both phone numbers at the same time. Developers can also choose not to turn on "Verify original phone number", which can be turned off in the security information client under the settings directory of the Authing console. To bind a phone number for the first time, please use bindPhone interface.

#### Parameter

- `phone` \<string\> New phone number
- `phoneCode` \<string\> The verification code of the new phone number
- `oldPhone` \<string\> Old phone number
- `oldPhoneCode` \<string\> The verification code of the old phone number

#### Example

```python
# verifyOldPhone function disabled
authentication_client.update_email(
  phone="test1@example.com",
  phoneCode="1234",
)

# verifyOldPhone function enabled
authentication_client.update_email(
  phone="test1@example.com",
  phoneCode="1234",
  oldPhone="test2@exmaple.com",
  oldPhoneCode="1234"
)
```

## Update email

AuthenticationClient().update_email(email, emailCode, oldEmail, oldEmailCode)

> If the user has already bound the email, by default, the original email (the email bound to the current account) and the current email (the email to be bound) need to be verified at the same time. If the currently email bound to user A is 123456@gmail.com, and user A wants to change it to 1234567@gmail.com, then both email need to be verified at the same time. Developers can also choose not to turn on "Verify original mailbox", which can be turned off in the security information client under the settings directory of the Authing console. To bind an email for the first time, please use the bindEmail interface.

#### Parameter

- `email` \<string\> New email address
- `emailCode` \<string\> The verification code of the new phone email address
- `oldEmail` \<string\> Old email address
- `oldEmailCode` \<string\> The verification code of the old phone email address

#### Example

```python
# verifyOldEmail function disabled
authentication_client.update_email(
  email="test1@example.com",
  emailCode="1234",
)

# verifyOldEmail function enabled
authentication_client.update_email(
  email="test1@example.com",
  emailCode="1234",
  oldEmail="test2@exmaple.com",
  oldEmailCode="1234"
)
```

## Refresh token

AuthenticationClient().refresh_token()

> Refresh the token of the current user.Login is required when calling this interface.

#### Parameter

#### Example

```python
authentication_client.refresh_token()
```

## Bind phone number

AuthenticationClient().bind_phone(phone, phoneCode)

> The user binds the phone number for the first time. If you need to update the phone number, please use the updatePhone interface.

#### Parameter

- `phone` \<string\>
- `phoneCode` \<string\>

#### Example

```python
phone = '188xxxx8888'
user = authentication_client.bind_phone(
    phone=phone,
    phoneCode='1234',
)
```

## Unbind phone number

AuthenticationClient().unbind_phone()

> User unbinds phone number

#### Parameter

#### Example

```python
user = authentication_client.unbind_phone()
```

## Get current user information

AuthenticationClient().get_current_user()

> Get the information of the current user

#### Parameter

#### Example

## Logout

AuthenticationClient().logout()

> Logout, clear user information and token in localStorage.

#### Parameter

#### Example

```python
authentication_client.logout()
```

## Get current user's user-defined data list

AuthenticationClient().list_udv()

> Get current user's user-defined data list

#### Parameter

#### Example

```python
udvs = authentication_client.list_udv()
```

## Add user-defined data

AuthenticationClient().set_udv(key, value)

> Add user-defined data

#### Parameter

- `key` \<string\> The key of the user-defined data.
- `value` \<any\> The value of user-defined data. The type of value must match the one defined in user pool.

#### Example

```python
# set int data
authentication_client.set_udv(
  key="age",
  value=15
)

# set boolen data
authentication_client.set_udv(
  key="is_ok",
  value=True
)
```

## Delete user-defined data

AuthenticationClient().remove_udv(key)

> Delete user-defined data.

#### Parameter

- `key` \<null\> The key of the user-defined field.

#### Example

```python
authentication_client.remove_udv(
  key="age"
)
```
