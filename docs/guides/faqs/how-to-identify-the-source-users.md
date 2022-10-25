---
meta:
  - name: description
    content: 如何识别用户来源
---

# 如何识别用户来源

<LastUpdated/>

如果你使用[托管登录页](/guides/basics/authenticate-first-user/use-hosted-login-page.md)或者[嵌入登录组件](/reference/guard/v2/)，{{BRAND_NAME}} 支持自动识别请求参数将用户来源写入到用户的自定义字段；同时 {{BRAND_NAME}} 提供的 SDK 也可以在登录注册时将注册来源信息写入到用户的自定义字段，从而达到识别用户来源的目的。

## 使用托管登录页面

[Authing 托管登录页](/guides/basics/authenticate-first-user/use-hosted-login-page.md)模式被认为是最简单，最安全的集成方式。这是因为登录流程由 Authing 维护，并由 Authing 保持安全。对于大多数集成，建议使用 Authing 托管的登录流程。你的业务系统将用户重定向到 Authing，在此用户进行身份验证，然后重定向回在控制台配置的应用回调连接。

在托管登录页面中识别用户来源，可以分为以下几步。

1. 在 Authing 控制台定义一个用户自定义字段（如 `source`），用于存储用户的来源数据，详情请见[添加自定义用户字段](/guides/users/user-defined-field/)；
2. 访问应用域名的时候带上指定的 `query` 参数，如 `https://your-app.authing.cn?source=someWhere`；
3. 当用户登录注册的时候，{{BRAND_NAME}} 将会将此数据写入到用户的自定义字段中；
4. 之后你可以使用 Authing 提供的 SDK 管理用户的自定义字段，详情请见 [SDK - 管理自定义数据](/reference/sdk-for-node/management/UsersManagementClient.md#获取自定义数据)。

## 使用嵌入登录组件

[Authing 登录组件（Guard）](/reference/guard/v2/)是一种可嵌入的登录表单，可根据你的需求进行配置，建议用于单页面应用程序。Guard 可以集成到你的 React、Vue.js、Angular 以及原生 JavaScript 项目中，你可以借助此组件快速实现登录认证流程。

在嵌入登录组件中识别用户来源，可以分为以下几步。

1. 在 Authing 控制台定义一个用户自定义字段（如 `source`），用于存储用户的来源数据，详情请见[添加自定义用户字段](/guides/users/user-defined-field/)；
2. 在 Guard 组件所在页面的 URL 上添加同样的 Query 参数，如 `?source=someWhere`。当用户使用 Guard 组件注册时，将会将这个参数写入到用户的自定义字段中；
3. 之后你可以使用 Authing 提供的 SDK 管理用户的自定义字段，详情请见 [SDK - 管理自定义数据](/reference/sdk-for-node/management/UsersManagementClient.md#获取自定义数据)。

## 使用 SDK

1. 在 Authing 控制台定义一个用户自定义字段（如 `source`），用于存储用户的来源数据，详情请见[添加自定义用户字段](/guides/users/user-defined-field/)；
2. 在调用登录函数的时候传递自定义数据，如：

- 使用邮箱密码注册：

```javascript
const { AuthenticationClient } = require('authing-js-sdk')

const authing = new AuthenticationClient({
  appId: 'AUTHING_APP_ID',
  appHost: 'YOUR_APP_HOST',
});
const email = 'test@example.com'
const password = 'passw0rd'
const user = await authing.registerByEmail(email, password, null, {
  customData: {
    source: 'google'
  }
});
```

- 使用社会化登录：

```javascript
const { AuthenticationClient } = require('authing-js-sdk')

const authing = new AuthenticationClient({
  appId: 'AUTHING_APP_ID',
  appHost: 'YOUR_APP_HOST',
});
authing.social.authorize('google', {
  onSuccess: (userinfo) => {
    console.log(userinfo)
  },
  customData: {
    source: 'someWhere'
  }
})
```

- 使用小程序扫码登录：

```javascript
const { AuthenticationClient } = require('authing-js-sdk')

const authing = new AuthenticationClient({
  appId: 'AUTHING_APP_ID',
  appHost: 'YOUR_APP_HOST',
});
authing.wxqrcode.startScanning('domId', {
  onSuccess: (userinfo) => {
    console.log(userinfo)
  },
  customData: {
    source: 'someWhere'
  }
})
```

3. 用户完成登录注册之后，{{BRAND_NAME}} 将会将此数据写入到用户的自定义字段中；
4. 之后你可以使用 Authing 提供的 SDK 管理用户的自定义字段，详情请见 [SDK - 管理自定义数据](/reference/sdk-for-node/management/UsersManagementClient.md#获取自定义数据)。

