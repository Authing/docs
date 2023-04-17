# 概述

<LastUpdated/>

当使用 {{$localeConfig.brandName}} 进行用户认证时，你不需要自己实现用户管理逻辑，所有的相关操作（如创建删除用户、配置登录流程、重置密码等）都可以通过 {{$localeConfig.brandName}} 控制台托管登录页、API & SDK 完成。用户资料将被安全地存储在 {{$localeConfig.brandName}} 云上的数据库中，你不需要额外保存一份用户资料，而是直接使用 {{$localeConfig.brandName}} 中存储的用户信息实现你的业务需求。为此，需要先 [将你的业务数据与 Authing 用户联表](/guides/faqs/how-to-join-authing-user-with-your-business-data.md)。

使用 {{$localeConfig.brandName}} 接入用户认证流程，一共有以下几种方式：

1. [使用 {{$localeConfig.brandName}} 托管登录页](../use-hosted-login-page.md)。
2. [使用 {{$localeConfig.brandName}} 提供的内嵌登录组件](../use-embeded-login-component/)，可以集成到你的 Web 和移动端项目中，你不需要自己实现登录表单 UI。
3. [使用 API & SDK](./use-api-sdk/)，{{$localeConfig.brandName}} 提供 RESTFul 和 GraphQL 两种形式的 API 以及 10 余种语言或框架的 SDK，你可以基于此自定义 UI 和认证流程。

{{$localeConfig.brandName}} 可以集成到标准 Web 应用、单页 Web 应用、客户端应用以及后端应用等各种场景中，你可以分别阅读不同场景的接入方式：

1. [在标准 Web 应用中接入 {{$localeConfig.brandName}} ？](../../platform-guide/integrate-with-regular-web-app.md)
2. [在单页 Web 应用中接入 {{$localeConfig.brandName}} ？](../../platform-guide/integrate-with-spa.md)
3. [在客户端应用中接入 {{$localeConfig.brandName}} ？](../../platform-guide/integrate-with-mobile-app.md)

当用户成功登录之后，你还需要：

1. [了解如何在后端鉴别当前用户的身份？](../how-to-validate-user-token.md)
2. [了解如何给用户授权角色、权限，以进行细粒度的权限控制？](../how-to-implement-access-control.md)
3. [了解如何实现退出操作？](../how-to-logout-user.md)
