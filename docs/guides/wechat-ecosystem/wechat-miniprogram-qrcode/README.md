## PC 网站使用小程序扫码登录

<LastUpdated/>

这是 {{$localeConfig.brandName}} 的一个开创性的设计，在 {{$localeConfig.brandName}} 中开启扫描小登录二维码登录后可以获得微信官方的实名用户信息， 用户一键授权即可以真实号码完成注册或者登录，为开发者建立以手机号码为基础的账号体系。

- 应用场景：PC 网站；
- 概述：在 PC 网站应用中展示小程序二维码，然后使用微信扫码登录应用；
- 优势：可以获取到微信用户的手机号与实名信息；

你可以[点击此处体验小程序扫码登录](https://authing.cn/developer/)。

![Sample](../images/wxapp-scaning-demo.gif)

## 示例代码

你可以在此获取示例代码：[https://github.com/authing/wechat-eco-solution](https://github.com/authing/wechat-eco-solution)。

## 第一步：在微信公众平台创建一个小程序（可选）

默认情况下，小程序扫码登录会使用 {{$localeConfig.brandName}} 提供的默认小程序，如果你需要有更强的品牌定制能力，或者想让通过小程序扫码登录的用户微信账号和自己的其他微信公众平台打通，你需要申请自己的小程序。如果你属于这两种场景的一种：

请前往 [微信公众平台](https://mp.weixin.qq.com/wxopen/waregister?action=step1&token=&lang=zh_CN)指引创建一个微信小程序，你需要记录下该应用的 **App ID** 和 **App Secret**，后面需要用到。

同时你需要联系我们获取小登录的源码，详情请咨询 <a href="mailto:csm@authing.cn">Authing 售后服务人员</a>。

## 第二步：在 {{$localeConfig.brandName}} 控制台配置微信 PC 小程序扫码应用

在控制台的社会化登录配置页面，找到**微信 PC 小程序扫码登录**，填入以下配置：

- Logo: 上传后的 Logo，将作为小程序二维码中央的 Logo；
- 登录后回调链接: 此链接一般填你的业务地址，如果配置了这个链接，用户在完成登录之后，浏览器将会携带用户信息跳转到该页面；
- AppID: 小程序的 AppID，选择私有化小程序的用户填；
- AppSecret: 小程序的 AppSecret，选择私有化小程序的用户填。

## 第三步：开始开发接入

小程序扫码登录支持三种接入方式：使用 JavaScript SDK、使用嵌入登录组件、 使用托管登录页。每种不同的接入方式各有优劣点，你可以根据自己的业务需求来选择合适的方式。

以下是各种方式的优劣对比：

| 接入方式            | 优势                                                                              | 劣势                 |
| ------------------- | --------------------------------------------------------------------------------- | -------------------- |
| 使用 JavaScript SDK | 接入简单，只需要几行代码。可自定义程度最高。                                      |                      |
| 使用嵌入登录组件    | 接入简单，只需要几行代码。可以将该组件集成到你的应用。自定义程度相对较高          |                      |
| 使用托管登录页      | 运维简单，由 {{$localeConfig.brandName}} 负责运维。每个用户池有一个独立的二级域名。 | 如果需要嵌入到你的应用，需要使用弹窗模式登录，即：点击登录按钮后，会弹出一个窗口，内容是 Authing 托管的登录页面，或者将浏览器重定向到 Authing 托管的登录页。 |

<StackSelector snippet="social-login" selectLabel="选择接入方式" :order="['sdk', 'embeded-component', 'hosted-page']"/>

## 接下来

!!!include(common/what-to-do-when-you-get-userinfo.md)!!!
