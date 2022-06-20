---
meta:
  - name: description
    content: Authing - PHP
---

# Authing - PHP

The Authing Python SDK is comprised of two parts: `ManagementClient` and `AuthenticationClient`. All operations in `ManagementClient` are performed as an administrator, including managing users, managing roles, managing authority policies, and managing user pool configuration. All operations in `AuthenticationClient` are performed as the current terminal user, including login, registration, modification of user information, and logout.

You should set the initialized `ManagementClient` instance to a global variable (initialize only once), and the `AuthenticationClient` should be initialized for each request.

## Installation

We recommend using `composer` for installation, it can work well with some module packaging tools.

```shell
# latest stable
$ composer require authing-sdk/php
```

## Use ManagementClient

Initialization of ManagementClient requires `userPoolId` and `secret`:

> You can [learn how to get UserPoolId and Secret](/guides/faqs/get-userpool-id-and-secret.md) here.

```php
use Authing\Mgmt\ManagementClient;

$management = new ManagementClient("AUTHING_USERPOOL_ID", "AUTHING_USERPOOL_SECRET");
// Get admin rights
$management->requestToken();
```

Now the `managementClient` instance is ready to be used. For example, you can get the list of users in the user pool:

```php
use Authing\Mgmt\ManagementClient;

$management = new ManagementClient("AUTHING_USERPOOL_ID", "AUTHING_USERPOOL_SECRET");
// Get admin rights
$management->requestToken();
$users = $management->users()->paginate();
```

## Use AuthenticationClient

Initialization of `AuthenticationClient` requires `userPoolId`:

> You can learn [how to get UserPoolId](/guides/faqs/get-userpool-id-and-secret.md) .

```php
use Authing\Auth\AuthenticationClient;

$authentication = new AuthenticationClient("AUTHING_USERPOOL_ID");
```

Then, you can perform operations such as registration and login:

```php
use Authing\Auth\AuthenticationClient;
use Authing\Types\LoginByEmailInput;

$authentication = new AuthenticationClient("AUTHING_USERPOOL_ID");
$user = $authentication->loginByEmail(new LoginByEmailInput("test@example.com", "123456"));
```

After login,`update_profile` and the other methods that require users to log in are available:

```php
use Authing\Auth\AuthenticationClient;
use Authing\Types\LoginByEmailInput;
use Authing\Types\UpdateUserInput;

$authentication = new AuthenticationClient("AUTHING_USERPOOL_ID");
$authentication->loginByEmail(new LoginByEmailInput("test@example.com", "123456"));

$user = $authentication->updateProfile((new UpdateUserInput())->withNickname("nickname"));
```

You can also set the `AccessToken` parameter after initialization, so that it is unnecessary to call the the `LoginByXXX` method every time:

```php
use Authing\Auth\AuthenticationClient;

$authentication = new AuthenticationClient("AUTHING_USERPOOL_ID");
$authentication->setAccessToken("ACCESS_TOKEN");
```

Executing the `UpdateProfile` method can also succeed:

```php
use Authing\Auth\AuthenticationClient;
use Authing\Types\UpdateUserInput;

$authentication = new AuthenticationClient("AUTHING_USERPOOL_ID");
$authentication->setAccessToken("ACCESS_TOKEN");

$user = $authentication->updateProfile((new UpdateUserInput())->withNickname("nickname"));
```

## Error handling

Use try catch to process:

```php
use Authing\Auth\AuthenticationClient;
use Authing\Types\UpdateUserInput;

$authentication = new AuthenticationClient("AUTHING_USERPOOL_ID");
$authentication->setAccessToken("ACCESS_TOKEN");

try {
    $user = $authentication->updateProfile((new UpdateUserInput())->withNickname("nickname"));
} catch (Exception $e) {
    print_r($e);
}
```

## Privatization deployment

**The privatization deployment** scenario needs to specify the GraphQL endpoint of your privatized Authing service (**without protocol header and Path**). If you are not sure, you can contact the Authing IDaaS service administrator.

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

::: page-ref /en/reference/sdk-for-php/authentication/
:::

ManagementClient contains the following sub-modules:

::: page-ref /en/reference/sdk-for-php/management/UsersManagementClient.md
:::

::: page-ref /en/reference/sdk-for-php/management/RolesManagementClient.md
:::

::: page-ref /en/reference/sdk-for-php/management/PoliciesManagementClient.md
:::

::: page-ref /en/reference/sdk-for-php/management/AclManagementClient.md
:::

::: page-ref /en/reference/sdk-for-php/management/UdfManagementClient.md
:::

## Get help

Join us on forum: [#authing-chat](https://forum.authing.cn/)
