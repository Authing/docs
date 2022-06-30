# 打通微信生态账号体系

<LastUpdated/>

当你基于微信生态开始开发一个激动人心的应用时，如何利用好微信多场景的开放能力、如何处理复杂的 [OpenID、UnionID 机制](https://developers.weixin.qq.com/doc/offiaccount/User_Management/Get_users_basic_information_UnionID.html)将会是你需要去考虑的问题。微信生态非常庞大，登录场景就有好几个（如 PC 网站扫码、公众号网页授权、小程序内授权等等），其需要调用完全不同的接口，对于开发者而言，无疑加大了理解和开发成本。

{{$localeConfig.brandName}} 针对微信生态的复杂场景，在前端为开发者提供了简洁、统一的 SDK，在后端基于 OpenID、UnionID、手机号三个维度自动处理同一身份识别、账号合并等逻辑。开发者只需要调用前端 SDK，而无需操心各种复杂的身份识别逻辑，{{$localeConfig.brandName}} 最终会返回[标准化过后的用户信息](/guides/user/user-profile.md)。

## 关注公众号登录

「关注公众号登录」指的是在 PC 网站上生成微信公众号的二维码，用户使用微信 APP 扫码，关注公众号之后实现自动登录的过程。使用「关注公众号登录」可以快速为公众号引流，提升品牌粘性。借助 Authing 的「关注公众号登录」，你几乎不需要开发任何代码，只需简单的配置，几分钟就能完成。[查看详情](/guides/connections/social/wechatmp-qrcode/)。

> 受微信平台要求限制，只有**服务号**具备[生成带参数的二维码](https://developers.weixin.qq.com/doc/offiaccount/Account_Management/Generating_a_Parametric_QR_Code.html) API 能力，请确保你的公众号是**服务号**类型。

- 应用场景：PC 网站；
- 概述：PC 网站上生成微信公众号的二维码，用户使用微信 APP 扫码，关注公众号之后实现自动登录；
- 查看[微信官方文档](https://developers.weixin.qq.com/doc/offiaccount/Account_Management/Generating_a_Parametric_QR_Code.html)。

<img src="https://cdn.authing.cn/img/20220314121523.png" height="400px" style="display:block;margin: 0 auto;"/>

## PC 网站使用微信扫码登录

微信 PC 扫码登录可以让用户使用微信身份安全登录第三方应用或网站，在 {{$localeConfig.brandName}} 中开启微信扫码登录之后，可实现通过 {{$localeConfig.brandName}} 快速获取微信用户基本开放信息和帮助用户实现基础开放功能。[查看详情](/guides/connections/social/wechat-pc/)。

- 应用场景：PC 网站；
- 概述：在 PC 网站应用中跳转到微信二维码页面，然后使用微信扫码登录应用；
- 查看[微信官方文档](https://developers.weixin.qq.com/doc/oplatform/Website_App/WeChat_Login/Wechat_Login.html)。

<img src="./images/wechat-pc-scan-login.png" height="400px" style="display:block;margin: 0 auto;"/>

## PC 网站使用小程序扫码登录

这是 {{$localeConfig.brandName}} 的一个开创性的设计，在 {{$localeConfig.brandName}} 中开启扫描小登录二维码登录后可以获得微信官方的实名用户信息， 用户一键授权即可以真实号码完成注册或者登录，为开发者建立以手机号码为基础的账号体系。[查看详情](/guides/connections/social/wechat-miniprogram-qrconnect/)。

- 应用场景：PC 网站；
- 概述：在 PC 网站应用中展示小程序二维码，然后使用微信扫码登录应用；

<img src="./images/wechat-mini-login-scan.png" height="400px" style="display:block;margin: 0 auto;"/>

## 微信内网页使用微信授权登录

{{$localeConfig.brandName}} 通过 SDK 为开发者提供了一种快速在微信网页中获取用户信息并完成登录的方法。如果用户在微信客户端中访问第三方网页、公众号可以通过微信网页授权机制，来获取用户基本信息，进而实现业务逻辑。[查看详情](/guides/connections/social/wechat-mp/)。

- 应用场景：微信网页、公众号；
- 概述：在微信 APP 内的网页内弹出微信授权框，用户授权之后可以获取当前用户的信息；
- 查看[微信官方文档](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_webpage_authorization.html)

<img src="./images/wechat-web-authorize.png" height="400px" style="display:block;margin: 0 auto;"/>

## 小程序内使用微信登录

{{$localeConfig.brandName}} 通过 SDK 为开发者提供了一种快速在小程序中获取用户信息并完成登录的方法。通过 {{$localeConfig.brandName}} 的 SDK 可以方便地获取微信提供的用户身份标识，快速建立以手机号码为基础的账号体系。[查看详情](/guides/connections/social/wechat-miniprogram/)。

- 应用场景：小程序；
- 概述：在微信小程序内使用，弹出微信授权框，用户授权之后可以获取当前用户的信息；
- 查看[微信官方文档](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/login.html)

<img src="./images/wechat-mini-program-login.png" height="400px" style="display:block;margin: 0 auto;"/>

## 移动 APP 使用微信登录

{{$localeConfig.brandName}} 为开发者提供了一种在移动端（iOS or 安卓）应用中快速跳转微信登录获取用户信息的方式，通过简单的调用 {{$localeConfig.brandName}} 移动端 SDK 可以完成微信账号接入。[查看详情](/guides/connections/social/wechat-mobile/)。

- 应用场景：移动 APP；
- 概述：在移动应用中拉起微信 APP 进行登录；
- 查看[微信官方文档](https://developers.weixin.qq.com/doc/oplatform/Mobile_App/WeChat_Login/Development_Guide.html)

<img src="./images/wechat-mobile-login.png" height="400px" style="display:block;margin: 0 auto;"/>

## 移动 APP 使用小程序登录

移动端拉起小程序登录是建立移动端以手机号为中心用户体系的关键方式，{{$localeConfig.brandName}} 通过 SDK 为开发者大大降低了开发的复杂度，一行代码即可通过移动端获取用户在小程序中授权的手机号，建立以手机号码为基础的账号体系。[查看详情](/guides/connections/social/wechat-miniprogram-applaunch/)。

- 应用场景：移动 APP；
- 概述：在移动应用中拉起微信小程序进行登录。
- 查看[微信官方文档](https://developers.weixin.qq.com/doc/oplatform/Mobile_App/WeChat_Login/Development_Guide.html)

<img src="./images/wechat-mobile-mini-program-login.png" height="400px" style="display:block;margin: 0 auto;"/>

## 总结对比

| 名称                       | 使用场景         | 能够直接获取手机号 | 是否为 {{$localeConfig.brandName}} 独创 |
| -------------------------- | ---------------- | ------------------ | --------------------------------------- |
| 关注公众号登录             | PC 网站          | 否                 | 否                                      |
| PC 网站使用微信扫码登录    | PC 网站          | 否                 | 否                                      |
| PC 网站使用小程序扫码登录  | PC 网站          | 是                 | 是                                      |
| 微信内网页使用微信授权登录 | 微信网页、公众号 | 否                 | 否                                      |
| 小程序内使用微信登录       | 小程序           | 是                 | 否                                      |
| 移动 APP 使用微信登录      | 移动 APP         | 否                 | 否                                      |
| 移动 APP 使用小程序登录    | 移动 APP         | 是                 | 是                                      |
