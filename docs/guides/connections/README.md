# 连接外部身份源（Identity Provider）

<LastUpdated/>

## IdP 概念

身份源提供商（Identity Provider，简称 IdP）指的是一个负责收集、存储用户身份信息，如用户名、密码等，在用户登录时负责认证用户的服务。使用外部身份服务商可以降低用户管理成本以及降低用户使用成本。

## IdP 连接流程

一个典型的 Web 端应用与 IdP 连接流程包含以下步骤：
- 跳转：用户在[{{$localeConfig.brandName}} 控制台](https://authing.cn/) 登录页面点击**第三方登录按钮**（比如 Google、GitHub），系统自动弹出其第三方的登录页面；
- 请求：用户在第三方的登录页面输入该账户的账号信息及密码；
- 验证：第三方 IdP 验证用户身份；
- 授权：验证用户身份之后，浏览器携带临时凭证从第三方 IdP 跳回 {{$localeConfig.brandName}}控制台，{{$localeConfig.brandName}} 使用此凭证从第三方 IdP 换取该用户的信息。

## Idp 分类

在 Authing 产品中，我们将身份源提供商分为以下几种：
- [社会化身份源](./social.md)
- [企业身份源](./enterprise.md)
- [自定义数据库](/guides/database-connection/overview.md)

## 获取帮助

如有任何问题，可在[Authing 论坛](https://forum.authing.cn/)进行反馈。
