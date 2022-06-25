# 在小程序中进行认证

<LastUpdated/>

在小程序中，除了获取、修改用户资料，邮箱手机号登录，添加用户自定义字段等基础操作之外，你还可以使用小程序环境独有的**通过微信授权获取用户手机号**、 **使用微信授权登录**、**使用微信授权的手机号登录** 等方法。

## 在 {{$localeConfig.brandName}} 中配置小程序登录

为了在小程序中使用 {{$localeConfig.brandName}} 小程序 SDK，你需要先在[微信开放平台](https://mp.weixin.qq.com/)申请一个小程序，同时在 [{{$localeConfig.brandName}} 控制台](https://console.authing.cn/console/userpool)内填入该小程序的配置。

详情请见：[在 {{$localeConfig.brandName}} 中配置小程序登录](/reference/sdk-for-wxapp.md#在-localeConfig-brandName-中配置小程序登录)。

## 引入 {{$localeConfig.brandName}} 小程序 SDK

详细的安装流程请见：[安装小程序 SDK](/reference/sdk-for-wxapp.md#安装)。

第一步先初始化 `AuthenticationClient`，初始化需要传入`AppId` （应用 ID）：

> 你可以在控制台的 **应用** 中查看自己的应用列表。

```js
const { AuthenticationClient } = require("authing-wxapp-sdk");

const authing = new AuthenticationClient({
  appId: "YOUR_APP_ID",
});
```

接下来就可以使用 `AuthenticationClient` 的方法了，如[使用微信授权登录](/reference/sdk-for-wxapp.md#loginbycode)：

```javascript
const { code } = await wx.login();
const data = await authing.loginByCode(code);
```

- 如果用户第一次在小程序中登录，且用户没有使用和该小程序绑定同一主体的微信应用登录过，将会创建一个新账号。
- 如果用户第一次在小程序中登录，但是该用户使用和该小程序绑定同一主体的微信应用登录过，将会返回对应的微信账号。

详情请见：[小程序 SDK](/reference/sdk-for-wxapp.md)。