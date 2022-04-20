---
meta:
  - name: description
    content: C# SDK
---

# {{$localeConfig.brandName}} - C

<LastUpdated/>

The {{$localeConfig.brandName}} Python SDK is comprised of two parts: `ManagementClient` and `AuthenticationClient`. All operations in `ManagementClient` are performed as an administrator, including managing users, managing roles, managing authority policies, and managing user pool configuration. All operations in `AuthenticationClient` are performed as the current terminal user, including login, registration, modification of user information, and logout.

You should set the initialized `ManagementClient` instance to a global variable (initialize only once), and the `AuthenticationClient` should be initialized for each request.

## Installation

Install via Nuget:

```
Install-Package Authing.ApiClient
```

## Use ManagementClient

Initialization of ManagementClient requires `userPoolId` and `secret`:

> You can [learn how to get UserPoolId and Secret](/guides/faqs/get-userpool-id-and-secret.md) here.

```csharp
using Authing.ApiClient;

var managementClient = new ManagementClient("AUTHING_USERPOOL_ID", "AUTHING_USERPOOL_SECRET");
```

Now the `managementClient()` instance is ready to be used. For example, you can get the list of users in the user pool:

```csharp
var managementClient = new ManagementClient("AUTHING_USERPOOL_ID", "AUTHING_USERPOOL_SECRET");
var data = await managementClient.Users.List();
```

## Use AuthenticationClient

Initialization of `AuthenticationClient` requires `AppId`:

> You can view your own **application** list in the application of the console.

```csharp
using Authing.ApiClient;

var authenticationClient = new AuthenticationClient(opt =>
            {
                opt.AppId = "AUTHING_APP_ID";
            });
```

Then, you can perform operations such as registration and login:

```csharp
var username = GetRandomString(10);
var password = GetRandomString(10);
var user = await authenticationClient.LoginByUsername(
    username,
    password,
)
```

After login,`update_profile` and the other methods that require users to log in are available:

```csharp
await authenticationClient.UpdateProfile(new UpdateUserInput() {
  Nickname = "Nick",
})
```

You can also set the `AccessToken` parameter after initialization, so that it is unnecessary to call the the `LoginByXXX` method every time:

```csharp
using Authing.ApiClient;

var authenticationClient = new AuthenticationClient(opt =>
            {
                opt.AppId = "AUTHING_APP_ID";
            });
authenticationClient.Token = "ID_TOKEN";
```

Executing the `UpdateProfile` method can also succeed:

```csharp
await authenticationClient.UpdateProfile(new UpdateUserInput() {
  Nickname = "Nick",
})
```

## Privatization deployment

**The privatization deployment** scenario needs to specify the GraphQL endpoint of your privatized Approw service (**without protocol header and Path**). If you are not sure, you can contact the Approw IDaaS service administrator.

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

::: page-ref /en/reference/sdk-for-csharp/authentication/
:::

ManagementClient contains the following sub-modules:

::: page-ref /en/reference/sdk-for-csharp/management/UsersManagementClient.md
:::

::: page-ref /en/reference/sdk-for-csharp/management/RolesManagementClient.md
:::

::: page-ref /en/reference/sdk-for-csharp/management/PoliciesManagementClient.md
:::

::: page-ref /en/reference/sdk-for-csharp/management/AclManagementClient.md
:::

::: page-ref /en/reference/sdk-for-csharp/management/GroupsManagementClient.md
:::

::: page-ref /en/reference/sdk-for-csharp/management/UdfManagementClient.md
:::

::: page-ref /en/reference/sdk-for-csharp/management/UserpoolManagementClient.md
:::

::: page-ref /en/reference/sdk-for-csharp/management/WhitelistManagementClient.md
:::

## Get help

Join us on forum: [#authing-chat](https://forum.authing.cn/)
