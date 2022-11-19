# 单点登录（SSO）

## 什么是单点登录

我们通过一个例子来说明，假设有一所大学，内部有两个系统，一个是邮箱系统，一个是课表查询系统。现在想实现这样的效果：在邮箱系统中登录一遍，然后此时进入课表系统的网站，无需再次登录，课表网站系统直接跳转到个人课表页面，反之亦然。比较专业的定义如下：

**[单点登录](/guides/app-new/sso/)**（Single Sign On），简称为 **[SSO](/guides/app-new/sso/)**，是目前比较流行的企业业务整合的解决方案之一。 [SSO](/guides/app-new/sso/) 的定义是在多个应用系统中，**用户只需要登录一次**就可以**访问所有**相互信任的应用系统。

## 集成 SDK 实现单点登录

目前 Authing 提供以下两款 SDK 帮助你在 Web 端实现单点登录效果，推荐使用 **@authing/web**：

|SDK 包名|说明|快速开始|
  |-----|----|----|
  |@authing/web|未来将陆续从 [authing-js-sdk](https://docs.authing.cn/v2/reference/sdk-for-node/authentication/) 中迁移所有可在浏览器中运行的 Authing 大部分认证类功能|[文档](/reference/sdk-for-sso-spa.html)|
  |@authing/sso|集成 V2 版认证 API，只提供登录、退出、获取用户信息等基本功能|[文档](/reference/sdk-for-sso.html)|

## 获取帮助

- Authing 社区论坛

  如果你对使用 Authing JS SDK 有疑问，请访问 [Authing 论坛](https://forum.authing.cn/)。

- 提交 Bug 或新特性

  如果你发现 Authing JS SDK 有 bug，或者想提交新特性，请通过 Github 提交 issue 或 PR。

  |SDK 包名|代码仓库|
  |-----|----|
  |@authing/web|[GitHub](https://github.com/Authing/authing-js-sdk)|
  |@authing/sso|[GitHub](https://github.com/authing/AuthingSSO)|