---
meta:
  - name: description
    content: 单点登录（SSO）
---

# 单点登录（SSO）

<LastUpdated/>

::: hint-danger
从 13.1 版本开始，Safari 默认会**阻止第三方 Cookie**，会影响 Authing 的某些**单点登录功能**。其他类似的更新，从 Chrome 83 版本开始，**隐身模式**下默认禁用第三方 Cookie。其他浏览器也在慢慢进行此类更新以保护用户隐私，很多浏览器将禁用第三方 Cookie 作为了一个安全配置功能。

这可能会对此 SDK 产生影响，详情请见 [禁用第三方 Cookie 对 Authing 的影响](/guides/faqs/block-third-party-cookie-impact.md#tracksession)，你可以在此[查看解决方案](/guides/faqs/block-third-party-cookie-impact.md#如何解决)。
:::

## Authing SSO SDK

Authing SSO SDK 为开发者提供了简单易用的函数来实现 Web 端的单点登录效果，你可以通过调用 SDK 与 Authing 完成集成，为你的多个业务软件实现浏览器内的单点登录效果。
## 创建自建应用

> 参考 [创建应用](/guides/app-new/create-app/create-app.md)

## 配置单点登录

> 参考 [自建应用 SSO 方案](/guides/app-new/sso/create-app-sso.md)

## 修改配置

找到刚刚配置好的应用，进入**配置**页面

![](./images/sso-sdk01.png)

- 找到**应用配置**下的**认证配置**，配置登录回调 URL 并进行保存
- 授权配置中，授权模式开启 implicit
- 授权配置中，返回类型开启 ( id_token token，id_token )
- 授权配置中，不强制 implicit 模式回调链接为 https 进行开启
- 点击保存进行保存配置

如下图所示：

![](./images/sso-sdk02.png)

至此，配置完成

## 安装

Authing SSO SDK 支持通过包管理器安装、script 标签引入的方式集成到你的前端业务软件。

### 使用 NPM 安装

```shell
$ npm install @authing/sso
```

### 使用 Yarn 安装

```shell
$ yarn add @authing/sso
```

### 使用 script 标签直接引入

```html
示例：
<script src="https://cdn.authing.co/packages/authing-sso/2.1.2/umd/index.min.js"></script>

<script>
  var authingSSO = new AuthingSSO.AuthingSSO({
    appId: 'AUTHING_APP_ID',
    origin: 'https://{用户池域名}.authing.cn',
    redirectUri: '你的业务软件路由地址',
  })
</script>
```

## 初始化

### 应用 ID

如图所示：

![](~@imagesZhCn/reference/sdk-for-sso/README_3.png)

### 用户池域名

如图所示：

![](~@imagesZhCn/reference/sdk-for-sso/README_4.png)

### 回调地址

根据你自己的业务填写回调地址，如图所示：

![](~@imagesZhCn/reference/sdk-for-sso/README_6.png)

为了使用 Authing SSO SDK，你需要填写应用 ID、用户池域名、回调地址等参数，如下示例：

```js
import { AuthingSSO } from '@authing/sso'

const authing = new AuthingSSO({
  appId: 'AUTHING_APP_ID',
  origin: 'https://{用户池域名}.authing.cn',
  redirectUri: '你的业务软件路由地址',
})
```

如果你想兼容低版本浏览器，也可以

```js
import { AuthingSSO } from '@authing/sso/es5'
```

## 注册

如果你希望为用户展示 Authing 托管的注册页，可以按以下方式调用：

```js
import { AuthingSSO } from '@authing/sso'

const authing = new AuthingSSO({
  appId: 'AUTHING_APP_ID',
  origin: 'https://{用户池域名}.authing.cn',
  redirectUri: '你的业务软件路由地址',
})

authing.register()
```

## 登录

Authing SSO SDK 可以向 Authing 发起认证授权请求，目前支持两种形式：

1. 在当前窗口转到 Authing 托管的登录页；
2. 弹出一个窗口，在弹出的窗口中加载 Authing 托管的登录页。

### 跳转登录

运行下面的代码，浏览器会跳转到 Authing 托管的登录页：

```js
import { AuthingSSO } from '@authing/sso'

const authing = new AuthingSSO({
  appId: 'AUTHING_APP_ID',
  origin: 'https://{用户池域名}.authing.cn',
  redirectUri: '你的业务软件路由地址',
})

authing.login()
```

如果你想自定义参数，也可以对以下参数进行自定义传参，如不传参将使用默认参数

```js
authing.login({
  scope: 'openid profile email phone',
  responseMode: 'fragment',
  responseType: 'id_token token',
  state: Math.random().toString(),
  nonce: Math.random().toString(),
})
```

用户完成登录后，Authing 会将用户重定向到你的业务软件回调地址。 Id Token、Access Token 会以 URL hash 的形式发到回调地址。你可以在你的业务软件前端路由对应的页面使用 Authing SSO SDK 的方法将它们从 URL hash 中取出：

```js
import { AuthingSSO } from '@authing/sso'

const authing = new AuthingSSO({
  appId: 'AUTHING_APP_ID',
  origin: 'https://{用户池域名}.authing.cn',
  redirectUri: '你的业务软件路由地址',
})

// authing.cn/#id_token=123123&access_token=547567
// 返回 { id_token: 123123, access_token: 547567 }
const { access_token, id_token } = authing.getTokenSetFromUrlHash()

// 之后可以使用 Access Token 获取用户信息
const userInfo = await authing.getUserInfoByAccessToken(access_token)
```

### 弹出窗口登录

你可以在你的业务软件页面调用下面的方法，通过弹出一个新窗口的方式让用户在新窗口登录：

```js
import { AuthingSSO } from '@authing/sso'

const authing = new AuthingSSO({
  appId: 'AUTHING_APP_ID',
  origin: 'https://{用户池域名}.authing.cn',
  redirectUri: '你的业务软件路由地址',
})

authing.popUpLogin()

// 登录成功回调
authing.onPopUpLoginSuccess(async ({ access_token, id_token }) => {
  // 可以存储 token
  // 可以使用 token 获取用户的信息
  const userInfo = await authing.getUserInfoByAccessToken(access_token)
})
// 登录失败回调
authing.onPopUpLoginFail(async ({ error, error_description }) => {
  console.log(error, error_description)
})
// 登录取消回调
authing.onPopUpLoginCancel(async () => {
  // 可根据业务逻辑进行处理
})
```

### 高级使用

每次发起登录本质是访问一个 URL 地址，可以携带许多参数。AuthingSSO SDK 默认会使用缺省参数。如果你需要精细控制登录请求参数，可以参考本示例。

```js
import { AuthingSSO } from '@authing/sso'

const authing = new AuthingSSO({
  appId: 'AUTHING_APP_ID',
  origin: 'https://{用户池域名}.authing.cn',
  redirectUri: '你的业务软件路由地址',
})

// 发起认证请求
authing.login({
  scope: 'openid profile email phone',
  responseMode: 'fragment',
  responseType: 'id_token token',
  state: Math.random().toString(),
  nonce: Math.random().toString(),
  prompt: 'consent',
})

// 使用弹窗登录
authing.popUpLogin({
  scope: 'openid email phone profile',
  responseMode: 'web_message',
  responseType: 'id_token token',
  state: Math.random().toString(),
  nonce: Math.random().toString(),
  prompt: 'consent',
})
```

更多参数请参考 [文档](/federation/oidc/authorization-code/?build-url=curl) 。

## 检查登录态并获取 Token

如果你想检查用户的登录态，并获取用户的 Access Token、Id Token，可以按以下方式调用，如果用户没有在 Authing 登录，该方法会抛出错误：

```js
import {
  AuthingSSO,
  AuthenticationError,
  InvalidParamsError,
} from '@authing/sso'

const authing = new AuthingSSO({
  appId: 'AUTHING_APP_ID',
  origin: 'https://{用户池域名}.authing.cn',
  redirectUri: '你的业务软件路由地址',
})

async function main() {
  try {
    const { id_token, access_token } = await authing.getAccessTokenSilently()
    // 无需在前端验证 token，统一在资源服务器验证即可
    // 后续可以存储 token
  } catch (err) {
    if (err instanceof AuthenticationError) {
      // 用户未登录，引导用户去登录页
      authing.login()
    } else if (err instanceof InvalidParamsError) {
      // 可以根据自己的业务进行逻辑处理
    } else {
      // 发生未知错误
      throw err
    }
  }
}
main()
```

## 获取用户信息

你需要使用 Access Token 获取用户的个人信息：

1. 用户初次登录成功时可以在回调函数中拿到用户的 Access Token，然后使用 Access Token 获取用户信息；
2. 如果用户已经登录，你可以先获取用户的 Access Token 然后使用 Access Token 获取用户信息。

```js
import {
  AuthingSSO,
  AuthenticationError,
  InvalidParamsError,
} from '@authing/sso'

const authing = new AuthingSSO({
  appId: 'AUTHING_APP_ID',
  origin: 'https://{用户池域名}.authing.cn',
  redirectUri: '你的业务软件路由地址',
})

async function main() {
  try {
    // 获取用户的 token
    const { id_token, access_token } = await authing.getAccessTokenSilently()
    // 可以使用 token 获取用户的信息
    const userInfo = await authing.getUserInfoByAccessToken(access_token)
  } catch (err) {
    if (err instanceof AuthenticationError) {
      // 可以根据自己的业务进行逻辑处理
    } else if (err instanceof InvalidParamsError) {
      // 可以根据自己的业务进行逻辑处理
    } else {
      // 发生未知错误
      throw err
    }
  }
}
main()
```

## 退出登录

```js
import { AuthingSSO, AuthenticationError } from '@authing/sso'

const authing = new AuthingSSO({
  appId: 'AUTHING_APP_ID',
  origin: 'https://{用户池域名}.authing.cn',
  redirectUri: '你的业务软件路由地址',
})

await authing.logout()
// 需要业务软件清除本地保存的所有 token 和用户信息
```

## trackSession

跨域携带 cookie 访问 /cas/session 端点，获取当前登录的用户信息

示例：

```js
let res = await auth.trackSession()
/**
 * {
 *    session: { appId: 'xxx', type: 'oidc/oauth', userId: 'yyy'},
 *    userInfo: {
 *      "_id": "USER_ID",
 *      "email": "USER_EMAIL",
 *      "registerInClient": "CLIENT_ID",
 *      "token": "JWT_TOKEN",
 *      "tokenExpiredAt": "2019-10-28 10:15:32",
 *      "photo": "PICTURE",
 *      "company": "",
 *      "nickname": "NICKNAME",
 *      "username": "USERNAME",
 *   }
 * }
 *
 * 如果 session 不存在，返回：
 *
 * {
 *   session: null
 * }
 * */
```

## 获取帮助 <a id="get-help"></a>

1. 请访问 [Authing 论坛](https://forum.authing.cn/)。
