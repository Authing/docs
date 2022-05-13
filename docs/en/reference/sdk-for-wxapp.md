---
meta:
  - name: description
    content: SDK for WeChat applet
---

# SDK for WeChat applet

<LastUpdated/>

> GitHub source address:[https://github.com/authing/authing-wxapp-sdk](https://github.com/authing/authing-wxapp-sdk)

{{$localeConfig.brandName}} small procedure SDK（`authing-wxapp-sdk`）suitable for use in WeChat applets [authing-js-sdk](https://github.com/authing/authing.js) based on the WeChat applet environment. you can use `authing-js-sdk` [AuthenticationClient](/reference/sdk-for-node/authentication/AuthenticationClient.html) all methods in the middle, such as Get, modify user information, add user custom fields, and so on. Specially used in a small program environment **Get the user's mobile phone number through WeChat**、 **Use WeChat Authorized Login**、**Login with the mobile phone number authorized by WeChat** methods.

## Configuring a small program login in {{$localeConfig.brandName}}

In order to use {{$localeConfig.brandName}} small program SDK in a small program, you need to apply for a small program in [WeChat open platform](https://mp.weixin.qq.com/), at the same time [{{$localeConfig.brandName}} console](https://console.authing.cn/console/userpool) fill in the configuration of the applet.

<details>
<summary><strong>Configure a small program login</strong></summary>

1. Before head to [WeChat Open Platform](https://mp.weixin.qq.com/) to register a WeChat applet development account

- **If you need to get the user's mobile phone number, you need to pass WeChat certification.**
- Add the `core.authing.cn` Add WeChat's **Request legal domain**:

![](https://cdn.authing.cn/blog/20201112142753.png)

2. In [{{$localeConfig.brandName}} console](https://console.authing.cn/console/userpool)Enable WeChat small program socialized login.

- Get WeChat applet AppId and AppSecretGet

![](https://cdn.authing.cn/blog/20201112143117.png)

- Go to [{{$localeConfig.brandName}} console](https://console.authing.cn/console/userpool) **Connection Identity** - **Social Sign in** - **Derber Log in**:

![](https://cdn.authing.cn/blog/20201112143302.png)

- Fill in the applet AppId and AppSecret, click Save.

![](https://cdn.authing.cn/blog/20201112143351.png)

</details>

## Install

From the small program base library version 2.2.1 or more, and the developer tool 1.02.1808300 or above, the applet supports the use of NPM to install a third party package, please see: Please see:[NPM support | WeChat open document](https://developers.weixin.qq.com/miniprogram/dev/devtools/npm.html) 。

### install npm

use npm:

```
npm install authing-wxapp-sdk
```

use yarn:

```
yarn add authing-wxapp-sdk
```

### Build in a small program developer tool npm

Click on the menu bar in the developer tool: Tool --> build npm:

<img src="https://cdn.authing.cn/blog/20201112141931.png" height="400px"></img>

Check **Use npm modules** option:

![](https://cdn.authing.cn/blog/20201112142118.png)

## initialization

`AuthenticationClient` Initialization Need to pass the `AppId` (Applications ID):

> You can view your own application list in the console's **Application**.

```js
const { AuthenticationClient } = require("authing-wxapp-sdk");

const authing = new AuthenticationClient({
  appId: "YOUR_APP_ID"
});
```

The full parameter list is as follows:

- `appId`: {{$localeConfig.brandName}} application ID（required）；
- `accessToken`: Through the user's token initialization SDK (optional, you can cache the user token in the front-end localStorage, remember the purpose of logging in).
- `timeout`: Request timeout, units in milliseconds, default is 10,000 (10 seconds).
- `onError`: Error handler, you can use it globally capture all anomalies for the {{$localeConfig.brandName}} client request. The function is defined as:

```js
(code: number, message: string, data: any) => void
```

> Complete error code, please see [this document](/reference/error-code.md)。

- `host`: {{$localeConfig.brandName}} optional, ignore for cloud users. For private users, it's required in this format: `https://authing-api.mydomain.com` without ending with `/`.

## Instructions

After the user completes the login, the SDK will write the user's `token` to WeChat's Storage, follow-up requests will automatically carry the `token`.

![](https://cdn.authing.cn/blog/20201112165637.png)

```js
const { code } = await wx.login();
// No user authorization
const user = await authing.loginByCode(code); // Successfully logged in, write token to WeChat Storage

// You can do this after logging in
await authing.updateProfile((nickname: "Bob"));
```

Subsequent users open the applet, if the user's token is saved in the Storage of the applet, access the Authing request will automatically bring the token.

```javascript
// This request can be successful because the user is out of the login state.
await authing.updateProfile((nickname: "Mick"));
```

## API Reference

> you can use `authing-js-sdk` [AuthenticationClient](./sdk-for-node/README.md) all methods in the middle, Calling method and `authing-js-sdk` perfect match.

### loginByCode

> Log in by using WeChat authorization.

- If the user logs in in a small program, and the user does not use the WeChat app log in to the same body to bind the same body, a new account will be created.
- If the user logs in in the applet in the applet, the user uses the WeChat app log in to the same body to bind the same body, and will return the corresponding WeChat account.

#### parameter

- `code`: transfer [wx.login()](https://developers.weixin.qq.com/miniprogram/dev/api/open-api/login/wx.login.html) Get the `code`, no user authorization is required. Required.
- `options`: Optional.
- `options.iv`: `open-type` is `getUserInfo` [WeChat Button Components](https://developers.weixin.qq.com/miniprogram/dev/component/button.html) click on the event to return `iv`. `iv` and `encryptedData` must be passed at the same time,{{$localeConfig.brandName}} Server will try `iv` and `encryptedData` Sino-Adding User Information. The first time you need to manually authorize. Optional.
- `options.encryptedData`: `open-type` is `getUserInfo` [WeChat Button Components](https://developers.weixin.qq.com/miniprogram/dev/component/button.html) click on the event to return `encryptedData`. `iv` and `encryptedData` must be passed at the same time,{{$localeConfig.brandName}} Server will try `iv` and `encryptedData` Sino-Adding User Information. The first time you need to manually authorize. Optional.
- `options.rawData`: `open-type` is `getUserInfo` [WeChat Button Components](https://developers.weixin.qq.com/miniprogram/dev/component/button.html) click on the event to return `rawData`. and `iv` + `encryptedData` Two choices, if you pass `rawData`, {{$localeConfig.brandName}} Server will use this data directly as a user profile. The first time you need to manually authorize. Optional.

#### Example

1. Silent authorization

The Nickname in the profile of the user's registered users, Avatar will be empty because the user's avatar and nickname are not obtained.

```javascript
const { code } = await wx.login();
const data = await authing.loginByCode(code);
```

2. User manually authorizes to get nickname avatar

> Only the first time you need to authorize, you can use the `wx.getUserInfo` to directly get the avatar nickname directly.

- First request user manual authorization

```html
<button open-type="getUserInfo" bindgetuserinfo="getUserInfo">
  Get an avatar nickname
</button>
```

```javascript
getUserInfo: async function (e) {
  const { code } = await wx.login()
  const { rawData } = e.detail
  const user = await authing.loginByCode(code, { rawData })

  // or pass in iv encryptedData
  // const { iv, encryptedData } = e.detail
  // const user = await authing.loginByCode(code, { iv, encryptedData })

  console.log(user)
}
```

- can then be automatically obtained by `wx.getUserInfo`

```javascript
const { rawData } = await wx.getUserInfo();
const user = await authing.loginByCode(code, { rawData });
// or iv encryptedData
// const { iv, encryptedData } = e.detail
// const user = await authing.loginByCode(code, { iv, encryptedData })
```

### loginByPhone

> Log in by WeChat mobile phone number. You need to manually authorize each time you call.

- If the mobile phone number is registered for the first time, the mobile phone number is bound to the WeChat account (there is no existence).
- If the mobile phone number is registered, the account number corresponding to the mobile phone number will be returned, and the mobile phone number is bound to the current WeChat account.

#### parameter

- `code`: Call [wx.login()](https://developers.weixin.qq.com/miniprogram/dev/api/open-api/login/wx.login.html) get `code`. No user authorization is required. Required.
- `iv`: `open-type` is `getPhoneNumber` [WeChat Button Components](https://developers.weixin.qq.com/miniprogram/dev/component/button.html) Click on the `iv`. Required.
- `encryptedData`: `open-type` is `getPhoneNumber` [WeChat Button Components](https://developers.weixin.qq.com/miniprogram/dev/component/button.html) Click on the `encryptedData`. Required.

#### Example

```html
<button open-type="getPhoneNumber" bindgetphonenumber="getPhone">
  Get your phone number
</button>
```

```javascript
getPhone: async function(e) {
  const { code } = await wx.login()
  const { iv, encryptedData } = e.detail
  const data = await authing.loginByPhone(code, iv, encryptedData)
  console.log(data)
}
```

### getPhone

> Get the mobile phone number of the current user (will not use the mobile phone number to register or bind account)

#### parameter

- `code`: transfer [wx.login()](https://developers.weixin.qq.com/miniprogram/dev/api/open-api/login/wx.login.html) Get the `code`, no user authorization is required. Required.
- `iv`: `open-type` is `getPhoneNumber` [WeChat Button Components](https://developers.weixin.qq.com/miniprogram/dev/component/button.html) clicking on the event back `iv`. Required.
- `encryptedData`: `open-type` is `getPhoneNumber`[WeChat Button Components](https://developers.weixin.qq.com/miniprogram/dev/component/button.html) clicking on the event back `encryptedData`. Required.

#### Example

```html
<button open-type="getPhoneNumber" bindgetphonenumber="getPhone">
  Get your phone number
</button>
```

```javascript
getPhone: async function(e) {
  const { code } = await wx.login()
  const { iv, encryptedData } = e.detail
  const data = await authing.getPhone(code, iv, encryptedData)
  console.log(data)
}
```

Returned Data example:

```json
{
  "countryCode": "86",
  "phoneNumber": "176xxxx6754",
  "purePhoneNumber": "176xxxx6754",
  "openid": "o1p9H4wAgb9uTqpxG5Z1g0pIr3FE",
  "unionid": "o0pqE6Fbr5M-exSu_PeL_sjwN44U"
}
```

### updateAvatar

> Update the user avatar, the method automatically calls the `wx.chooseImage` to get the picture and upload the CDN of {{$localeConfig.brandName}}, only one line of code calls.

#### Example

```javascript
const { photo } = await authing.updateAvatar();
console.log(photo);
```

## Best Practices

We recommend that the user uses a small program for the first time, use the `loginByCode` to get the {{$localeConfig.brandName}} account corresponding to the small program account, if the account is bound to the mobile phone number, there is no need to request the user to authorize the mobile phone again. No. If the account does not bind the phone number, then call the `loginByPhone` method to request the user to authorize the mobile phone number.

After the user logs in, `authing-wxapp-sdk`, you can call the`token`, you can call `authing.checkLoginStatus()` Judging whether the user's token is valid, when token invalidates again Log in.

## Error handling

You can use `try catch`

```js
try {
  const user = await authing.loginByEmail("test@example.com", "passw0rd");
} catch (error) {
  console.log(error.code); // 2004
  console.log(error.message); // User does not exist
}
```

> Complete error code, please see [document](/reference/error-code.md)。

You can also specify `onError` unified capture all {{$localeConfig.brandName}} request exception, such as the WeChat component displaying an error message using the `wx.showModal`.

```js
const authing = new AuthenticationClient({
  userPoolId,
  onError: (code, message) => {
    wx.showModal({
      content: message,
      showCancel: false
    });
  }
});
```

## Get help

Join us on forum: [#authing-chat](https://forum.authing.cn/)
