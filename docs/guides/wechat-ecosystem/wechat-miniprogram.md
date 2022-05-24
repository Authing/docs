# 小程序内使用微信登录

<LastUpdated/>

{{$localeConfig.brandName}}  通过 SDK 为开发者提供了一种快速在小程序中获取用户信息并完成登录的方法。通过 {{$localeConfig.brandName}}  的 SDK 可以方便地获取微信提供的用户身份标识，快速建立以手机号码为基础的账号体系。

- 应用场景：小程序；
- 概述：在微信小程序内使用，弹出微信授权框，用户授权之后可以获取当前用户的信息；
- 查看[微信官方文档](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/login.html)

<img src="./images/wechat-mini-program-login.png" height="400px" style="display:block;margin: 0 auto;"/>

## 第一步：在微信公众平台创建一个小程序

请前往 [微信公众平台](https://mp.weixin.qq.com/wxopen/waregister?action=step1&token=&lang=zh_CN)指引创建一个微信小程序，你需要记录下该应用的 **App ID** 和 **App Secret**，后面需要用到。**如果你需要获取用户手机号，需要通过微信认证。** 并将 `core.authing.cn` 加入微信的 `request` 合法域名。

<img src="~@imagesZhCn/reference/config-request-valid-domain.png" height="400px" style="display:block;margin: 0 auto;">

## 第二步：在 {{$localeConfig.brandName}} 控制台配置微信小程序应用

在控制台的社会化登录配置页面，找到 **微信小程序** 应用，填入以下配置：

- App ID: 小程序应用 ID；
- App Secret: 小程序应用密钥。

配置完成后请点击「确定」保存信息。

## 第三步：开始开发接入

从小程序基础库版本 2.2.1 或以上、及开发者工具 1.02.1808300 或以上开始，小程序支持使用 npm 安装第三方包，详情请见: [npm 支持 | 微信开放文档](https://developers.weixin.qq.com/miniprogram/dev/devtools/npm.html)。

### 安装 npm 包

使用 npm:

```
npm install authing-wxapp-sdk
```
    
或者使用 yarn:

```
yarn add authing-wxapp-sdk
```

点击开发者工具中的菜单栏：工具 --> 构建 npm:

<img src="~@imagesZhCn/reference/wxmp-npm.png" height="400px">

勾选 使用 npm 模块 选项：

![](~@imagesZhCn/reference/wxmp-npm2.png)

### 初始化 SDK

`AuthenticationClient` 初始化需要传入`AppId` （应用 ID）：

> 你可以在控制台的 **应用** 中查看自己的应用列表。

```js
const { AuthenticationClient } = require("authing-wxapp-sdk")

const authing = new AuthenticationClient({
  appId: "YOUR_APP_ID",
});
```


### 调用登录方法

`AuthenticationClient` 提供了 `loginByCode` 方法，可以通过微信的授权完成静默登录：

```javascript
const { code } = await wx.login()
// 无需用户授权
const user = await authing.loginByCode(code); // 成功登录，将 token 写入微信 Storage

// 登录之后可以进行此操作
await authing.updateProfile({
  nickname: 'Bob'
})
```

在用户完成登录之后，SDK 会将用户的 token 写入到微信的 Storage 中，后续请求会自动携带 token 访问。

![](~@imagesZhCn/reference/20201112165637.png)

后续用户再次打开小程序，如果小程序的 Storage 中保存有用户的 token，访问 authing 的请求将会自动带上该 token。

```javascript
// 该请求可以成功，因为该用户出于登录状态。
await authing.updateProfile(
  nickname: 'Mick'
)
```

详细请查看文档：[小程序 SDK](/reference-new/sdk-for-wxapp.md)。

## 接下来

!!!include(common/what-to-do-when-you-get-userinfo.md)!!!
