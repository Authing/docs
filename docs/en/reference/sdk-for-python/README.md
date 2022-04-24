---
meta:
  - name: description
    content: Python SDK
---

# {{$localeConfig.brandName}} - Python

<LastUpdated/>

The {{$localeConfig.brandName}} Python SDK is comprised of two parts: `ManagementClient` and `AuthenticationClient`. All operations in `ManagementClient` are performed as an administrator, including managing users, managing roles, managing authority policies, and managing user pool configuration. All operations in `AuthenticationClient` are performed as the current terminal user, including login, registration, modification of user information, and logout.

You should set the initialized `ManagementClient` instance to a global variable (initialize only once), and the `AuthenticationClient` should be initialized for each request.

> {{$localeConfig.brandName}} Python SDK supports both `python2` and `python3`.

## Installation

```
pip install authing
```

## Use ManagementClient

Initialization of ManagementClient requires `userPoolId` and `secret`:

> You can [learn how to get UserPoolId and Secret](/guides/faqs/get-userpool-id-and-secret.md) here.

```python
from authing.v2.management import ManagementClient, ManagementClientOptions

management_client = ManagementClient(
  options=ManagementClientOptions(
    user_pool_id='AUTHING_USERPOOL_ID',
    secret='AUTHING_USERPOOL_SECRET',
))
```

Now the `managementClient()` instance is ready to be used. For example, you can get the list of users in the user pool:

```python
data = management_client.users.list()
```

The returned data is as follows:

```json
{
  "totalCount": 1,
  "list": [
    {
      "id": "5f7ddfe62ba819802422362e",
      "arn": "arn:cn:authing:5f7a993eb9b49dcd5c021e40:user:5f7ddfe62ba819802422362e",
      "userPoolId": "5f7a993eb9b49dcd5c021e40",
      "username": "nhxcpzmklk",
      "email": null,
      "emailVerified": false,
      "phone": null,
      "phoneVerified": false,
      "unionid": null,
      "openid": null,
      "nickname": null,
      "registerSource": ["import:manual"],
      "photo": "https://usercontents.authing.cn/authing-avatar.png",
      "password": "a56f21e5659428f9b353be4ed667fc05",
      "oauth": null,
      "token": null,
      "tokenExpiredAt": null,
      "loginsCount": 0,
      "lastLogin": null,
      "lastIP": null,
      "signedUp": "2020-10-07T23:33:58+08:00",
      "blocked": false,
      "isDeleted": false,
      "device": null,
      "browser": null,
      "company": null,
      "name": null,
      "givenName": null,
      "familyName": null,
      "middleName": null,
      "profile": null,
      "preferredUsername": null,
      "website": null,
      "gender": "U",
      "birthdate": null,
      "zoneinfo": null,
      "locale": null,
      "address": null,
      "formatted": null,
      "streetAddress": null,
      "locality": null,
      "region": null,
      "postalCode": null,
      "country": null,
      "createdAt": "2020-10-07T23:33:58+08:00",
      "updatedAt": "2020-10-07T23:33:58+08:00"
    }
  ]
}
```

## Use AuthenticationClient

Initialization of `AuthenticationClient` requires `app_id`:

> You can view your own **application** list in the application of the console.

```python
from authing.v2.authentication import AuthenticationClient, AuthenticationClientOptions

authentication_client = AuthenticationClient(
  options=AuthenticationClientOptions(
    app_id='AUTHING_APP_ID'
))
```

Then, you can perform operations such as registration and login:

```python
username = get_random_string(10)
password = get_random_string(10)
user = authentication_client.login_by_username(
    username=username,
    password=password,
)
```

After login,`update_profile` and the other methods that require users to log in are available:

```python
authentication_client.update_profile({
  'nickname': 'Nick'
})
```

You can also use the `access_token` parameter to initialize the `AuthenticationClient`, so that it is unnecessary to call the `login` method every time:

```python
from authing.v2.authentication import AuthenticationClient, AuthenticationClientOptions

authentication_client = AuthenticationClient(
  options=AuthenticationClientOptions(
    app_id='AUTHING_APP_ID',
    access_token='AUTHING_USER_TOKEN'
))
```

Executing the `update_profile` method can also succeed:

```python
user = authentication_client.update_profile({
  'nickname': 'Nick'
})
```

## Error handling

```python
from authing.v2.exceptions import AuthingException

try:
    authentication_client.login_by_username(
        username='bob',
        password='passw0rd',
    )
except AuthingException as e:
    print(e.code) # 2004
    print(e.message) # User does not exist
```

> See this [document](/reference/error-code.md) for the complete error code.

## Privatization deployment

**The privatization deployment** scenario needs to specify the GraphQL endpoint of your privatized Approw service (**without protocol header and Path**). If you are not sure, you can contact the Approw IDaaS service administrator.

```python
from authing.v2.management import ManagementClient, ManagementClientOptions

management_client = ManagementClient(
  options=ManagementClientOptions(
    user_pool_id='AUTHING_USERPOOL_ID',
    secret='AUTHING_USERPOOL_SECRET',
    host="https://core.you-authing-service.com"
))
```

## Interface index

Available Authentication methods

- Get the user profile of the current user: `getCurrentUser`
- Register with email: `registerByEmail`
- Register with username: `registerByUsername`
- Register with mobile phone number verification code: `registerByPhoneCode`
- Login with email: `loginByEmail`
- Login with username: `loginByUsername`
- Login with SMS code: `loginByPhoneCode`
- Login with mobile phone number password: `loginByPhonePassword`
- Send mail: `sendEmail`
- Send SMS verification code: `sendSmsCode`
- Check the valid status of the token: `checkLoginStatus`
- Use the phone number verification code to reset the password: `resetPasswordByPhoneCode`
- Use email verification code to reset password: `resetPasswordByEmailCode`
- Update user profile: `updateProfile`
- Update password: `updatePassword`
- Update phone number: `updatePhone`
- Update email: `updateEmail`
- Refresh token: `refreshToken`
- Bind mobile phone number: `bindPhone`
- Unbind phone number: `unbindPhone`

Learn more:

::: page-ref /reference/sdk-for-python/authentication/
:::

ManagementClient contains the following sub-modules:

::: page-ref /reference/sdk-for-python/management/UsersManagementClient.md
:::

::: page-ref /reference/sdk-for-python/management/RolesManagementClient.md
:::

::: page-ref /reference/sdk-for-python/management/PoliciesManagementClient.md
:::

::: page-ref /reference/sdk-for-python/management/AclManagementClient.md
:::

::: page-ref /reference/sdk-for-python/management/UdfManagementClient.md
:::

## Get help

Join us on forum: [#authing-chat](https://forum.authing.cn/)
