# Certification in a small program

<LastUpdated/>

In the applet, in addition to obtaining, modifying user information, mailbox mobile phone number login, adding user custom fields, etc., you can also use the applet environment unique**Get the user's mobile phone number through WeChat**、 **Use WeChat Authorized Login**、**Log in with the mobile phone number authorized by WeChat** methods.

## In {{$localeConfig.brandName}} configuring a small program login

In order to use in a small program {{$localeConfig.brandName}} Applets SDK, you need to be in [WeChat open platform](https://mp.weixin.qq.com/) apply for a small program while [{{$localeConfig.brandName}} console](https://console.authing.cn/console/userpool) Fill in the configuration of the applet.

For details, please see:[In {{$localeConfig.brandName}} configuring a small program login](../../../reference/sdk-for-wxapp.md#在-localeconfig-brandName-中配置小程序登录).

## Introduce {{$localeConfig.brandName}} Applets SDK

For detailed installation processes, see:[Install a small program SDK](../../../reference/sdk-for-wxapp.md#安装).

First step first initialization `AuthenticationClient`, initialization requires incoming`AppId` （application ID）：

> You can be on the console **application** view your own application list.

```js
const { AuthenticationClient } = require('authing-wxapp-sdk')

const authing = new AuthenticationClient({
  appId: 'YOUR_APP_ID',
})
```

You can use it next `AuthenticationClient` method, such as [Use WeChat Authorized Login](../../../reference/sdk-for-wxapp.md#loginbycode)：

```javascript
const { code } = await wx.login()
const data = await authing.loginByCode(code)
```

- If the user logs in in a small program, and the user does not use the WeChat app log in to the same body to bind the same body, a new account will be created.
- If the user logs in in the applet in the applet, the user uses the WeChat app log in to the same body to bind the same body, and will return the corresponding WeChat account.

For details, please see:[Applets SDK](../../../reference/sdk-for-wxapp.md).
