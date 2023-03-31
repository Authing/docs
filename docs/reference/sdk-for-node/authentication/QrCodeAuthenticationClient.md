# 扫码登录模块

<LastUpdated/>

此模块用于进行扫码登录，扫码登录分为三种：[小程序扫码登录](/guides/authentication/qrcode/use-wechat-miniprogram/)（wxqrcode）、 [APP 扫码登录](/guides/authentication/qrcode/use-self-build-app/overview.md)（qrcode）和 [公众号扫码关注登录](/connections/wechatmp-qrcode/) 三种扫码登录方式 API 完全一致。

1. 使用小程序扫码登录：

```javascript
import { AuthenticationClient } from "authing-js-sdk"
const authenticationClient = new AuthenticationClient({
   appId: "AUTHING_APP_ID",
   appHost: 'https://xxx.authing.cn',
})
authenticationClient.wxqrcode.startScanning() // 开始扫码登录
```

2. 使用 APP 扫码登录

```javascript
import { AuthenticationClient } from "authing-js-sdk"
const authenticationClient = new AuthenticationClient({
   appId: "AUTHING_APP_ID",
   appHost: 'https://xxx.authing.cn',
})
authenticationClient.qrcode.startScanning() // 开始扫码登录
```

3. 使用公众号扫码关注登录

```javascript
import { AuthenticationClient } from "authing-js-sdk"
const authenticationClient = new AuthenticationClient({
   appId: "AUTHING_APP_ID",
   appHost: 'https://xxx.authing.cn',
})
authenticationClient.wechatmpqrcode.startScanning() // 开始扫码登录
```


## 一键开始扫码

QrCodeAuthenticationClient().startScanning(domId, options)

该方法封装了[生成二维码](#生成二维码)、[轮询二维码状态](#开始轮询二维码状态)、用户扫码之后监听扫码状态获取用户信息等逻辑，可以一键渲染一个完整的扫码登录组件：

<img src="https://usercontents.authing.cn/wxapp-scaning-demo.gif" style="display:block;margin: 0 auto;">

#### 参数

- `domId` \<string\> DOM 元素的 ID。
- `options` \<Object\>
- `options.interval` \<number\> 间隔时间，单位为毫秒，默认为 800 毫秒；
- `options.customData` \<Object\> 用户自定义数据，你需要先在用户池[定义用户自定义数据元信息](/guides/users/user-defined-field/)，且传入值的类型必须和定义的类型匹配。
- `options.context` \<Object\> 请求上下文，这里设置的 `context` 可以在 [pipeline 的 context](/guides/pipeline/context-object.md) 中获取到。
- `options.onStart` \<Function\> 开始轮询的事件回调函数, 第一个参数为 setInterval 返回的计时器，可以用 clearInterval 取消此计时器
- `options.onResult` \<Function\> 获取到二维码最新状态事件回调函数，第一个参数为的类型为 QRCodeStatus。
- `options.onScanned` \<Function\> 用户首次扫码事件回调函数。此时用户还没有授权，回调的用户信息中通仅包含昵称和头像，用作展示目的。
  出于安全性考虑，默认情况下，userInfo 只会包含昵称（nickname）和头像（photo）两个字段，开发者也可以在后台配置使其返回完整用户信息，
- `options.onSuccess` \<Function\> 用户同意授权事件回调函数。该函数只会回调一次，之后轮询结束。第一个参数为 userInfo 用户信息，第二个参数为 ticket，用于[换取用户的详细信息](#使用-ticket-交换用户信息)。
- `options.onCancel` \<Function\> 用户取消授权事件回调函数。该事件只会回调一次，之后轮询结束。
- `options.onError` \<Function\> 获取二维码状态失败事件回调函数。常见原因为网络失败等，每次查询失败时都会回调。回调参数 data 示例如 {"code": 2241,"message": "二维码不存在" }
- `options.onExpired` \<Function\> 二维码失效时被回调，只回调一次，之后轮询结束。
- `options.onCodeShow` \<Function\> 二维码首次成功显示的事件。
- `options.onCodeLoaded` \<Function\> 二维码首次成功 Load 的事件。
- `options.onCodeLoadFailed` \<Function\> 二维码加载失败的事件。
- `options.onCodeDestroyed` \<Function\> 二维码被销毁的事件。
- `options.size` \<Object\> 二维码图片大小，默认为 240 \* 240，单位为 px 。
- `options.size.height` \<number\> 高度
- `options.size.width` \<number\> 宽度
- `options.containerSize` \<Object\> DOM 容器大小，默认为 300 \* 300，单位为 px 。
- `options.containerSize.height` \<number\> 高度
- `options.containerSize.width` \<number\> 宽度
- `options.tips` \<Object\> 自定义提示信息
- `options.tips.title` \<number\>
- `options.tips.scanned` \<number\>
- `options.tips.succeed` \<Object\>
- `options.tips.canceled` \<number\>
- `options.tips.expired` \<number\>
- `options.tips.retry` \<number\>
- `options.tips.failed` \<number\>

#### 示例

HTML 示例：

```html
<!-- 创建一个 id 为 authing-qrcode-container 的 div 元素，用于挂载 Authing 扫码登录的二维码 -->
<div id="authing-qrcode-container"></div>
```

- 小程序扫码登录

```javascript
// 在调用 startScanning 时传入指定的 DOM 元素 ID，这里以 id 为 authing-qrcode-container 的 DOM 元素为例
authenticationClient.wxqrcode.startScanning('authing-qrcode-container', {
  customData: {
    source: 'google'
  },
  context: {
    referer: 'xxx'
  }
  onSuccess: (userInfo, ticket) => {
    console.log(userInfo, ticket)
  },
  onError: (message) => onFail && onFail(`${message}`),
})
```

- APP 扫码登录

```javascript
// 在调用 startScanning 时传入指定的 DOM 元素 ID，这里以 id 为 authing-qrcode-container 的 DOM 元素为例
authenticationClient.qrcode.startScanning('authing-qrcode-container', {
  customData: {
    source: 'google'
  },
  context: {
    referer: 'xxx'
  }
  onSuccess: (userInfo, ticket) => {
    console.log(userInfo, ticket)
  },
  onError: (message) => onFail && onFail(`${message}`),
})
```

## 生成二维码

QrCodeAuthenticationClient().geneCode(options)

生成小程序二维码获取 APP 扫码登录用的二维码。

#### 参数


- `options` \<Object\>
- `options.customData` \<Object\> 用户自定义数据，你需要先在用户池[定义用户自定义数据元信息](/guides/users/user-defined-field/)，且传入值的类型必须和定义的类型匹配。
- `options.context` \<Object\> 请求上下文，这里设置的 `context` 可以在 [pipeline 的 context](/guides/pipeline/context-object.md) 中获取到。

#### 示例

```javascript
const authenticationClient = new AuthenticationClient({
   appId: "AUTHING_APP_ID",
   appHost: 'https://xxx.authing.cn',
})

// random 二维码唯一 ID
// url 二维码链接
const { url, random } = await authenticationClient.wxqrcode.geneCode()
```

#### 示例数据

```js
{
  "url": "", // 二维码链接
  "random": "UNIQUE_ID" // 唯一 ID
}
```

## 检测扫码状态

QrCodeAuthenticationClient().checkStatus(random)

检测扫码状态。二维码一共分为以下几种状态：

- 0 - 未使用；
- 1 - 已扫码；
- 2 - 已授权；
- 3 - 取消授权；
- -1 - 已过期

#### 参数

- `random` \<string\> 二维码 ID。

#### 示例

```javascript
const authenticationClient = new AuthenticationClient({
   appId: "AUTHING_APP_ID",
})
const { random, status, ticket, userInfo } = await authenticationClient.wxqrcode.checkStatus('RANDOM')
```

#### 返回值

- `Promise<QRCodeStatus>`

## 使用 ticket 交换用户信息

QrCodeAuthenticationClient().exchangeUserInfo(ticket)

使用 ticket 换取用户信息。ticket 有效时间为两分钟。

#### 参数

- `ticket` \<string\> 在 [检测扫码状态](#检测扫码状态) 接口获取到的 ticket。

#### 示例

```javascript
const authenticationClient = new AuthenticationClient({
  appId: "AUTHING_APP_ID",
  appHost: 'https://xxx.authing.cn',
})

// user: 完整的用户信息，其中 user.token 为用户的登录凭证。
const user = await authenticationClient.wxqrcode.exchangeUserInfo('TICKET')
```

## 开始轮询二维码状态

QrCodeAuthenticationClient().startPolling(random, options)

开始轮询二维码状态，该接口封装了[检测扫码状态](#检测扫码状态)方法，会在二维码过期之后停止轮询。

#### 参数

- `random` \<string\> 二维码唯一 ID
- `options` \<Object\>
- `options.interval` \<number\> 间隔时间，单位为毫秒，默认为 800 毫秒
- `options.onStart` \<Function\> 开始轮询的事件回调函数, 第一个参数为 setInterval 返回的计时器，可以用 clearInterval 取消此计时器
- `options.onResult` \<Function\> 获取到二维码最新状态事件回调函数，第一个参数为的类型为 QRCodeStatus。
- `options.onScanned` \<Function\> 用户首次扫码事件回调函数。此时用户还没有授权，回调的用户信息中通仅包含昵称和头像，用作展示目的。
  出于安全性考虑，默认情况下，userInfo 只会包含昵称（nickname）和头像（photo）两个字段，开发者也可以在后台配置使其返回完整用户信息，
- `options.onSuccess` \<Function\> 用户同意授权事件回调函数。该函数只会回调一次，之后轮询结束。第一个参数为 userInfo 用户信息，第二个参数为 ticket，用于换取用户的详情。
  详情见 https://docs.authing.co/scan-qrcode/app-qrcode/customize.html。
  ticket 可以用来换取完整的用户信息，相关接口见 https://docs.authing.co/scan-qrcode/app-qrcode/full-api-list.html。
- `options.onCancel` \<Function\> 用户取消授权事件回调函数。该事件只会回调一次，之后轮询结束。
- `options.onError` \<Function\> 获取二维码状态失败事件回调函数。常见原因为网络失败等，每次查询失败时都会回调。回调参数 data 示例如 {"code": 2241,"message": "二维码不存在" }
- `options.onExpired` \<Function\> 二维码失效时被回调，只回调一次，之后轮询结束。

#### 示例

```javascript
// 调用 startPolling 方法时，传入二维码的唯一 ID
authenticationClient.wxqrcode.startPolling('ramdom', {
  onSuccess: (userInfo, ticket) => {
    console.log(userInfo, ticket)
  },
  onError: (message) => onFail && onFail(`${message}`),
})
```
