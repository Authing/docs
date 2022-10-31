---
meta:
  - name: description
    content: Node.js/JavaScript SDK
---

# Authing - Node.js/JavaScript

<LastUpdated/>

Authing JavaScript/Node SDK consists of two parts: `ManagementClient` and `AuthenticationClient`. `AuthenticationClient` includes methods such as registering and logging in, resetting mobile phone number email, modifying account information, etc. It sends requests based on end user and is suitable for browsers and back-end use. `ManagementClient` is suitable for use in a back-end or **trusted** front-end environment.Generally speaking, all the operations you can do in the [Authing console](https://console.authing.cn/console/userpool) can be done with this SDK.

## Install

Use `npm`:

```
npm install authing-js-sdk
```

Use `yarn`:

```
yarn add authing-js-sdk
```

> If you want to use it in the React Native environment, you need to first run this command in the RN project root directory:

```
npx rn-nodeify --install "crypto,stream"
```

After that, a `shim.js` file will be generated in the project root directory. Then import shim.js in the first line of App.js.

```
import './shim.js'
```

Use CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/authing-js-sdk/build/browser/index.min.js"></script>

<script>
  /** You can use global variable Authing to acquire AuthenticationClient and ManagementClient */
  var authing = new Authing.AuthenticationClient({
    appId: "AUTHING_APP_ID"
  });
</script>
```

## Use authentication client

### Initialization

Initialization of `AuthenticationClient` needs `AppId`：

> You can check your application list in **Applications** on your console.

```js
import { AuthenticationClient } from "authing-js-sdk";

const authing = new AuthenticationClient({
  appId: "AUTHING_APP_ID",
  appHost: "https://xxx.authing.cn"
});
```

The complete parameter list is as follows:

- `appId`: Authing application ID (required);
- `token`: Initialize the SDK through the user's `id_token` (optional, you can cache the user `id_token` in the front-end localStorage to implement remember the login).
- `timeout`: Request timeout time, in milliseconds, the default is 10000 (10 seconds).
- `onError`: Error handling function, you can use it to globally catch all exceptions requested by the Authing client.See [this document](/reference/error-code.md) for the complete error code. The function is defined as:

```js
(code: number, message: string, data: any) => void
```

- `host`: Authing server address.If you are using the public cloud version, please ignore the parameter. If you are using a privatized deployment version, this parameter is required.The format is as follows: `https://authing-api.mydomain.com` (without / at the end).
- `preflight`: Precheck of whether the network status enabled or not, the default is false.This parameter is suitable for checking whether the Authing server domain name is blocked on the user's network (some companies' intranets will block third-party websites). If the check is successful, it won't send any notification. The error handling function will be called if the check fails. After performing the pre-check, the SDK initialization speed will slow down. Please use it with caution.
- `cdnPreflight`: Precheck of whether the network status enabled or not, the default is false. This parameter is suitable for checking whether the user's network can connect to Qiniu Cloud CDN (it is not accessible in some scenarios such as using proxy). If the check is successful, it won't send any notification. The error handling function will be called if the check fails. After performing the CDN pre-check, the SDK initialization speed will slow down. Please use it with caution.

### Instrcutions:

If you use the SDK in a browser environment, after the user logs in, the SDK will write the user's `token` to `localStorage`, and subsequent requests will carry the `token` for access.

```js
const email = "test@example.com";
const password = "passw0rd";
const user = await authing.loginByEmail(email, password); // store the token in localStorage after successfully logging in

// this operation can be performed after logging in
await authing.updateProfile((nickname: "Bob"));
```

### Social login

Send an authorized login request through `authenticationClient.social.authorize`. This method will directly open a new window and redirect to the login authorization page of a third-party social login service provider (such as GitHub etc.). After the user completes the authorization,this window will be automatically closed, and the `onSuccess` callback function will be triggered. Through this function, you can get user information.

Example:

```javascript
const authenticationClient = new AuthenticationClient({
  appId: "AUTHING_APP_ID",
  appHost: "https://xxx.authing.cn"
});

await authenticationClient.social.authorize("github", {
  onSuccess: user => {
    console.log(user);
  },
  onError: (code, message) => {},
  // customize the postion where the window pop up
  position: {
    w: 100,
    h: 100
  }
});
```

<details><summary><b>View the list of supported social logins and introducing procedures:</b></summary>

Authing currently supports more than 20 social logins around the world, such as GitHub, Sign in with Apple, Google, etc. The following is a complete list:

!!!include(en/common/social-connections-table.md)!!!

</details>

### App QR code login

App QR code login refers to use your own App scan QR code to log in to the website, [click here to learn more](/guides/authentication/qrcode/use-self-build-app/).

You can use 5 lines of code to implement a complete scan code login form:

```js
authenticationClient.qrcode.startScanning("qrcode", {
  onSuccess: (userInfo, ticket) => {
    console.log(userInfo, ticket);
  }
});
```

### ClientList

- [AuthenticationClient](./authentication/AuthenticationClient.md)
- [QrCodeAuthenticationClient](./authentication/QrCodeAuthenticationClient.md)
- [MfaAuthenticationClient](./authentication/MfaAuthenticationClient.md)
- [SocialAuthenticationClient](./authentication/SocialAuthenticationClient.md)

## Use ManageClient

### Initialization

`ManagementClient` initialization needs to pass in the user pool ID `userPoolId` and the user pool key `secret`：

> You can learn [how to get userPoolId and secret here](/guides/faqs/get-userpool-id-and-secret.md).

```js
import { ManagementClient } from "authing-js-sdk";

const managementClient = new ManagementClient({
  userPoolId: "YOUR_USERPOOL_ID",
  secret: "YOUR_USERPOOL_SECRET"
});
```

The complete parameter list is as follows:

- `userPoolId`: User pool ID.
- `secret`: the secret of user pool.
- `accessToken`: Initialize the SDK with the administrator's token. (Optional, **one of secret and accessToken must be filled in**.)
- `timeout`: Request timeout time, in milliseconds, the default is 10000 (10 seconds).
- `onError`: Error handling function, you can use it to globally catch all exceptions requested by the Authing client. The function is defined as:

```js
(code: number, message: string, data: any) => void
```

> See [this document](/reference/error-code.md) for the complete error code.

- `host`: Authing server address.If you are using the public cloud version, please ignore the parameter. If you are using a privatized deployment version, this parameter is required.The format is as follows: https://authing-api.mydomain.com (without / at the end).
- `preflight`: Precheck of whether the network status enabled or not, the default is false.This parameter is suitable for checking whether the Authing server domain name is blocked on the user's network (some companies' intranets will block third-party websites). If the check is successful, it won't send any notification. The error handling function will be called if the check fails. After performing the pre-check, the SDK initialization speed will slow down. Please use it with caution.
- `cdnPreflight`: Precheck of whether the network status enabled or not, the default is false. This parameter is suitable for checking whether the user's network can connect to Qiniu Cloud CDN (it is not accessible in some scenarios such as using proxy). If the check is successful, it won't send any notification. The error handling function will be called if the check fails. After performing the CDN pre-check, the SDK initialization speed will slow down. Please use it with caution.

### Instrcutions

`ManagementClient` can be used to manage users, roles, policies, groups, organizations, and user pool configuration. In theory, any operation you can do in the [Authing console](https://console.authing.cn/console/userpool) can be done with this SDK.

Get a list of user directories:

```js
// list of the users in current page
// totalCount of users
const { list, totalCount } = await managementClient.users.list();
```

create roles:

```js
const role = await managementClient.roles.create("code", "role name");
```

Modify the user pool configuration:

```js
const userpool = await managementClient.userpool.update({
  registerDisabled: true // disable the register function of user pool
});
```

### Client list

- [UsersManagementClient](./management/UsersManagementClient.md)
- [RolesManagementClient](./management/RolesManagementClient.md)
- [GroupsManagementClient](./management/GroupsManagementClient.md)
- [OrgManagementClient](./management/OrgManagementClient.md)
- [PoliciesManagementClient](./management/PoliciesManagementClient.md)
- [AclManagementClient](./management/AclManagementClient.md)
- [UdfManagementClient](./management/UdfManagementClient.md)
- [WhitelistManagementClient](./management/WhitelistManagementClient.md)
- [UserPoolManagementClient](./management/UserpoolManagementClient.md)

## Error handling

You can use `try catch` for error handling:

```js
try {
  const user = await authing.loginByEmail("test@example.com", "passw0rd");
} catch (error) {
  console.log(error.code); // 2004
  console.log(error.message); // user does not exist
}
```

> You can find the whole error code document [here](/reference/error-code.md).

You can also specify `onError` to uniformly capture all Authing request exceptions, such as using front-end components like `antd` to display error prompts.

```js
import { message } from "antd";
const authing = new AuthenticationClient({
  appId: "xxxxxxxx",
  appHost: "https://xxx.authing.cn",
  onError: (code, msg: any) => {
    message.error(msg);
  }
});
```

## Privatization deployment

The **privatization deployment** scenario needs to specify the GraphQL endpoint of your privatized Authing service (**without protocol header and Path**). If you are not sure about it, you can contact the Authing IDaaS service administrator.

```js
import { AuthenticationClient, ManagementClient } from "authing-js-sdk";

const authenticationClient = new AuthenticationClient({
  appId: "AUTHING_APP_ID",
  host: "https://core.you-authing-service.com"
});

const managementClient = new ManagementClient({
  userPoolId: "YOUR_USERPOOL_ID",
  secret: "YOUR_USERPOOL_SECRET",
  host: "https://core.you-authing-service.com"
});
```

## Interface index

Authentication clients：

::: page-ref /reference/sdk-for-node/authentication/AuthenticationClient.md
:::

::: page-ref /reference/sdk-for-node/authentication/QrCodeAuthenticationClient.md
:::

::: page-ref /reference/sdk-for-node/authentication/MfaAuthenticationClient.md
:::

::: page-ref /reference/sdk-for-node/authentication/SocialAuthenticationClient.md
:::

Management clients：

::: page-ref /reference/sdk-for-node/management/UsersManagementClient.md
:::

::: page-ref /reference/sdk-for-node/management/RolesManagementClient.md
:::

::: page-ref /reference/sdk-for-node/management/PoliciesManagementClient.md
:::

::: page-ref /reference/sdk-for-node/management/AclManagementClient.md
:::

::: page-ref /reference/sdk-for-node/management/GroupsManagementClient.md
:::

::: page-ref /reference/sdk-for-node/management/OrgManagementClient.md
:::

::: page-ref /reference/sdk-for-node/management/UdfManagementClient.md
:::

::: page-ref /reference/sdk-for-node/management/WhitelistManagementClient.md
:::

::: page-ref /reference/sdk-for-node/management/UserpoolManagementClient.md
:::

## Get Help

Join us on forum: [#authing-chat](https://forum.authing.cn/)
