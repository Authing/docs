# 自建应用综述

<LastUpdated/>

在 {{$localeConfig.brandName}} 中，[用户池](/concepts/user-pool.md)是租户隔离的最小单位，存储了你用户系统中所有的用户数据；而应用则对应的是你现实中创建的业务应用。一个用户池可能会有多个应用，比如一个学校所有的学生在一个用户池里，而学校会同时开发了选课应用、邮箱应用、师生服务中心等多个应用，这些应用会使用同一个用户系统。你可以在此了解更多[应用相关的介绍](/concepts/application.md)。

如果你还没有创建过应用，可以了解[如何创建第一个应用](./create-app.md)。

以下内容不分先后顺序，你可以选择自己感兴趣的内容进行阅读：

- [配置登录注册方式](./config-login-methods.md)，可以为你的应用添加社会化登录、第三方身份源登录。
- [添加注册协议](./agreements.md)，可以让用户在注册前先阅读并同意注册协议，你可以自定义协议内容和链接。
- [自定义登录框样式](./custom-styles.md)，{{$localeConfig.brandName}} 托管登录页支持通过自定义 CSS 的方式高度自定义页面样式。
- [成为联邦认证身份源](./identity-provider.md)，{{$localeConfig.brandName}} 可以通过简单的配置快速成为 OIDC、OAuth2.0、SAML 身份提供商。
- [开启多因素认证](./mfa.md)，为你的应用开启 MFA 多因素认证，支持短信验证码、邮箱验证码、OTP、人脸识别、指纹等多种方式。

