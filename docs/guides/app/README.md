# 自建应用综述

<LastUpdated/>

在 {{$localeConfig.brandName}} 中，[用户池](/concepts/user-pool.md)是租户隔离的最小单位，存储了用户系统中所有的用户数据；而应用则对应的是现实中创建的业务应用。一个用户池可能会有多个应用，比如一个学校所有的学生在一个用户池里，而学校会同时开发了选课应用、邮箱应用、师生服务中心等多个应用，这些应用会使用同一个用户系统。您可以在此了解更多[应用相关的介绍](/concepts/application.md)。

您可以在 **自建应用** 菜单创建单页应用、 标准 Web 应用、移动、客户端应用等。有关应用创建详情，请参阅[如何创建第一个应用](./create-app.md)。

以下内容不分先后顺序，您可以选择自己感兴趣的内容进行阅读：

- [配置登录注册方式](/guides/app-new/create-app/login-control.md)，可以为你的应用添加社会化登录、第三方身份源登录。
- [添加注册协议](/guides/app-new/create-app/customize-guard.md#登录注册协议)，可以让用户在注册前先阅读并同意注册协议，你可以自定义协议内容和链接。
- [自定义登录框样式](/guides/app-new/create-app/customize-guard.md#登录框样式)，{{$localeConfig.brandName}} 托管登录页支持通过自定义 CSS 的方式高度自定义页面样式。
- [成为联邦认证身份源](/guides/app-new/create-app/app-configuration.md)，{{$localeConfig.brandName}} 可以通过简单的配置快速成为 OIDC、OAuth2.0、SAML 身份提供商。
- [开启多因素认证](/guides/app-new/create-app/security-management.md#多因素认证)，为您的应用开启 MFA 多因素认证，支持短信验证码、邮件验证码、OTP、人脸识别等多种方式。

