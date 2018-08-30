# Authing 开发文档

----------

> Authing 是一个领先的身份认证云：[https://authing.cn][Authing_LINK].

Authing 让您7行代码接入用户系统成为可能，同时对 **JavaScript** 应用，仅[一行代码即可生成完整的登录表单](https://docs.authing.cn/#/quick_start/login-form)。

[点击体验](https://sample.authing.cn)。

<img width="400" height="400" src="https://cdn.authing.cn/sdk/guide/image/authing-login-form.png"/>

## 开发平台

目前我们已经支持了以下语言，更多语言的相关 SDK 正在开发中，相关文档请点击下面的链接查看:

 - [JavaScript][JavaScript_LINK]
   - [一行代码生成登录表单](https://docs.authing.cn/#/quick_start/login-form) 
   - [体验 Vue 版的 Demo](https://sample.authing.cn)
   - [Express 中间件](https://github.com/Authing/express-middleware)
 - [Python][Python_LINK]
 - [Go][GO_LINK]
 - [PHP][PHP_LINK]
 - [小程序接入][MINI_PROGEAM_LINK]
 - [小程序扫码登录][MINI_PROGEAM_SCAN_LINK] 

  [JavaScript_LINK]: https://docs.authing.cn/#/quick_start/javascript
  [PHP_LINK]: https://docs.authing.cn/#/quick_start/php
  [Java_LINK]: https://docs.authing.cn/#/quick_start/java
  [Python_LINK]: https://docs.authing.cn/#/quick_start/python
  [GO_LINK]: https://docs.authing.cn/#/quick_start/go
  [PHP_LINK]: https://docs.authing.cn/#/quick_start/php  
  [Authing_LINK]: https://authing.cn
  [MINI_PROGEAM_LINK]: https://docs.authing.cn/#/quick_start/wxapp
  [MINI_PROGEAM_SCAN_LINK]: https://docs.authing.cn/#/quick_start/wxapp_scan_login

## 功能特性

 - 第三方 OAuth 配置使用
 - 依托 Web UI 的用户管理系统
 - 跨平台多终端集成能力（即将支持Android、iOS）
 - 基于 HTTPS 和 JWT 的安全认证方式
 - 自定义邮件模版、自定义第三方邮件服务
 - Docker 微服务架构，拥有 99.9% 的服务可用性
 - 基于 GraphQL 的消息通信
 - 微信小程序扫码登录
 - JavaScirpt 一行代码集成登录表单（Login Form）

## 微信小程序扫码登录

小程序扫码登录指使用 Authing 小程序**身份管家**在网页端或其它客户端扫码微信登录，如需使用请参考文档：[小程序扫码登录][MINI_PROGEAM_SCAN_LINK]。

## Login Form

[Login-Form](https://github.com/Authing/login-form) 指一行代码生成表单，该功能仅适用于 **JavaScript** 客户端应用 ，使用方法请[点击这里](https://docs.authing.cn/#/quick_start/login-form)。

## 第三方登录

第三方登录指使用 Github、微信等方式进行登录，请参考 [第三方登录使用文档](https://docs.authing.cn/#/oauth/oauth)。

## 为 Authing 贡献 SDK

如果您想为 Authing 贡献 SDK，请参考：[SDK Guide](https://docs.authing.cn/#/sdk/sdk)。
