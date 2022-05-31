# WeChat login in the mini program

<LastUpdated/>

{{$localeConfig.brandName}} The developer provides the developer with a method of obtaining user information in a small program and completing the login. By {{$localeConfig.brandName}} SDK can easily obtain the user identity identifier provided by WeChat, quickly establish an account system based on the mobile phone number.

- Application scenario: mini program;
- Overview: Used in WeChat applets, pop-up WeChat Authorization boxes, and you can get information on the current user after authorization;
- View [WeChat official document](https://developers.weixin.qq.com/miniprogram/en/dev/framework/open-ability/login.html)

<img src="./images/wechat-mini-program-login.png" height="400px" style="display:block;margin: 0 auto;"/>

## Step 1: Create a small program at the WeChat public platform

Please go to the [WeChat public platform](https://mp.weixin.qq.com/wxopen/waregister?action=step1&token=&lang=zh_CN)Guide creates a WeChat applet, you need to record the application **App ID** and **App Secret**, it needs to be used later. **If you need to get the user's mobile phone number, you need to pass WeChat certification.** and `core.authing.cn` add WeChat `request` legal domain name.

<img src="~@imagesZhCn/reference/config-request-valid-domain.png" height="400px" style="display:block;margin: 0 auto;">

## Step 2: In the {{$localeConfig.brandName}} console configuration WeChat applet application

In the console's social login configuration page, find **WeChat applet** app, fill in the following configuration:

- App ID: Appliance application ID；
- App Secret: A small program application key.

Click "OK" to save information after the configuration is complete.

## Step 3: Start development access

From the small program base library version 2.2.1 or more, and the developer tool 1.02.1808300 or above, the applet supports the use of NPM to install a third party package, please see: Please see:
From the small program base library version 2.2.1 or more, and the developer tool 1.02.1808300 or above, the applet supports the use of NPM to install a third party package, please see: [npm support | WeChat open document](https://developers.weixin.qq.com/miniprogram/en/dev/devtools/npm.html).

### Install npm package

Use npm:

```
npm install authing-wxapp-sdk
```

or use yarn:

```
yarn add authing-wxapp-sdk
```

Click on the menu bar in the developer tool: Tool -> Build NPM:

<img src="~@imagesEnUs/reference/build-npm.jpg" height="400px">
<!-- 
现在新版的微信开发者工具已经没有“使用 NPM 模块”的选项了
Check the npm module option:

![](~@imagesZhCn/reference/wxmp-npm2.png)
-->

### initialization SDK

`AuthenticationClient` Initialization needs to be introduced `AppId` （Application ID）：

> You can view your own application list in the console's **application**.

```js
const { AuthenticationClient } = require("authing-wxapp-sdk");

const authing = new AuthenticationClient({
  appId: "YOUR_APP_ID"
});
```

### Call login method

`AuthenticationClient` provides the`loginByCode` method, you can complete the silent login through WeChat authorization:

```javascript
const { code } = await wx.login();
// No user authorization
const user = await authing.loginByCode(code); // Successfully logged in, write token to WeChat Storage

// You can do this after logging in
await authing.updateProfile((nickname: "Bob"));
```

After the user completes the login, the SDK writes the user's token into the WeChat's Storage, and subsequent requests will automatically carry token access.

![](~@imagesZhCn/reference/20201112165637.png)

Subsequent users open the applet, if the user's token is saved in the Storage of the applet, access the authing request will automatically bring the token.

```javascript
// This request can be successful because the user is out of the login state.
await authing.updateProfile((nickname: "Mick"));
```

For details, please see the documentation: [Apprentrate SDK](/en/reference/sdk-for-wxapp.md)。

## Next

!!!include(en/common/what-to-do-when-you-get-userinfo.md)!!!
