# PC 网站使用微信扫码登录

<LastUpdated/>

PC 微信扫码登录可以让用户使用微信身份安全登录第三方应用或网站，在 {{$localeConfig.brandName}} 中开启微信扫码登录之后，可实现通过 {{$localeConfig.brandName}} 快速获取微信用户基本开放信息和帮助用户实现基础开放功能。

- 应用场景：PC 网站；
- 概述：在 PC 网站应用中跳转到微信二维码页面，然后使用微信扫码登录应用；
- 查看[微信官方文档](https://developers.weixin.qq.com/doc/oplatform/Website_App/WeChat_Login/Wechat_Login.html)。

<img src="../images/wechat-pc-scan-login.png" height="400px" style="display:block;margin: 0 auto;"/>

## 示例代码

你可以在此获取示例代码：[https://github.com/Authing/wechat-eco-solution](https://github.com/Authing/wechat-eco-solution)。

## 第一步：在微信开放平台创建一个网站应用

请在 [微信开放平台](https://open.weixin.qq.com/cgi-bin/frame?t=home/web_tmpl&lang=zh_CN)指引创建一个微信网站应用，你需要记录下该应用的 **App ID** 和 **App Secret**，后面需要用到。请确保该应用获取到了**微信登录**的权限，并将授权回调域设置为 `core.authing.cn`。

## 第二步：在 {{$localeConfig.brandName}} 控制台配置微信扫码应用

在控制台的社会化登录配置页面，找到 **PC 微信扫码登录** 应用，填入以下配置：

- `App ID`: 微信应用 ID；
- `App Secret`: 微信应用密钥；
- `Callback URL`：**这是你的业务回调域名，和自建应用配置的回调链接不是一个概念，也和第三方社会化登录控制台的回调地址配置无关**。比如你的网站域名是 `https://example.com` ， 处理 {{$localeConfig.brandName}} 回调请求的 url 为 `/auth/callback` ， 那么你应该填写为 `https://example.com/auth/callback`。这个参数已经不推荐使用，建议在应用中单独配置回调链接，此处地址可填入 `#``。

## 第三步：开始开发接入

{{$localeConfig.brandName}} 社会化登录支持四种接入方式：**使用 JavaScript SDK**、**使用嵌入登录组件**、 **使用托管登录页** 和 **手动调用社会化登录接口**。每种不同的接入方式各有优劣点，你可以根据自己的业务需求来选择合适的方式。

以下是各种方式的优劣对比：

| 接入方式               | 优势                                                                              | 劣势                                                | <span style="white-space: nowrap;">是否推荐</span> |
| ---------------------- | --------------------------------------------------------------------------------- | --------------------------------------------------- | -------------------------------------------------- |
| 使用 JavaScript SDK    | 接入简单，只需要几行代码。可自定义程度最高。                                      |                                                     | 是                                                 |
| 使用嵌入登录组件       | 接入简单，只需要几行代码。可以将该组件集成到你的应用。自定义程度相对较高          |                                                     | 是                                                 |
| 使用托管登录页         | 运维简单，由 {{$localeConfig.brandName}} 负责运维。每个用户池有一个独立的二级域名。 | 如果需要嵌入到你的应用，需要使用弹窗模式登录，即：点击登录按钮后，会弹出一个窗口，内容是 Authing 托管的登录页面，或者将浏览器重定向到 Authing 托管的登录页。                                | 是                                                 |
| 手动调用社会化登录接口 |                                                                                   | 需要手动从 URL 解析用户信息。接入相对较为复杂麻烦。 | 不推荐                                             |

<StackSelector snippet="social-login" selectLabel="选择接入方式" :order="['sdk', 'embeded-component', 'hosted-page', 'manually']"/>

## 接下来

!!!include(common/what-to-do-when-you-get-userinfo.md)!!!
