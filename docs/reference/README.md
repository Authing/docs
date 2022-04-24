# 开发集成概述

<LastUpdated/>

{{$localeConfig.brandName}} 提供 `RESTful` 和 `GraphQL` 两种风格的 API，并将 SDK 分成两大类：
- Management SDK: 供管理员使用，用于管理 {{$localeConfig.brandName}} 资源，如管理用户、角色、应用、组织机构、配置等；
- Authentication SDK: 供终端用户使用，已终端用户的身份进行操作，如登录注册、修改个人资料、重置密码等。

## 集成认证到你的应用中

我们推荐使用 {{$localeConfig.brandName}} 提供的 [前端登录组件 Guard](./guard/README.md) ，它为开发者屏蔽了很多底层认证的实现细节，同时也包括繁琐的 UI 开发；如果你需要自己实现登录界面 UI，可以使用我们为各语言提供的 `Authentication SDK`；在单点登录场景下，我们提供[单点登录 SDK](./sdk-for-sso.md) 帮助你快速实现单点登录。

一些场景的认证场景包括：

- 用户登录之后获取身份凭证 `id_token`；
- 使用用户的 `id_token` 获取用户信息；
- 使用多因素认证（MFA）作为额外认证手段。

## 管理你在 {{$localeConfig.brandName}} 中的资源

所有你在 {{$localeConfig.brandName}} 控制台进行的操作，基本上都可以使用 Management SDK 完成，从而实现自动化的运维管理。

一些典型的管理场景包括：

- 管理你在 Authing 中的角色；
- 查看审计日志和用户行为日志；
- 管理用户目录等。

## 支持的 SDK 种类

在此之上，{{$localeConfig.brandName}} 将 API 进一步封装为多语言的 SDK，目前共支持以下几种常见语言 / 场景：

- [Java](./sdk-for-java/README.md)
- [Node.js/JavaScript](./sdk-for-node/README.md)
- [Python](./sdk-for-python/README.md)
- [PHP](./sdk-for-php/README.md)
- [C#](./sdk-for-csharp/README.md)
- [Android](./sdk-for-android/README.md)
- [iOS](./sdk-for-ios/README.md)
- [Flutter](./sdk-for-flutter.md)
- [Swift](./sdk-for-swift.md)
- [小程序](./sdk-for-wxapp.md)
- [微信网页授权](./sdk-for-wxmp.md)
- [Go](./sdk-for-go.md)
- [Ruby](./sdk-for-ruby.md)

在此之上，我们又将 SDK 进一步封装成高度定制化、通用的登录表单组件，你可以快速集成到你的项目中，详情请见：[登录组件](./guard/README.md)。

除此之外，我们还提供了专门用于单点登录场景的 [JavaScript SSO SDK](./sdk-for-sso.md)，可以帮助你快速实现单点登录。

最后，我们还有[快速在 Web 框架中集成 {{$localeConfig.brandName}} 的指引流程](./frameworks.md)。

你可以结合自己的业务场景，选择合适的 API 或者 SDK。