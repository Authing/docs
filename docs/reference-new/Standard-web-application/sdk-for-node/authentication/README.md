---
meta:
  - name: description
    content: 使用用户认证模块
---

# 使用用户认证模块

<LastUpdated/>

`AuthenticationClient` 以终端用户（End User）的身份进行请求，提供了登录、注册、登出、管理用户资料、获取授权资源等所有管理用户身份的方法；此模块还提供了各种身份协议的 SDK，如 [OpenID Connect](/guides/federation/oidc.md), [OAuth 2.0](/guides/federation/oauth.md), [SAML](/guides/federation/saml.md) 和 [CAS](/guides/federation/cas.md)。此模块适合用于非受信任的浏览器环境和纯后端交互的服务器环境。

如果你需要使用基础的登录注册、修改用户资料等方法，请使用：

::: page-ref /reference-new/Standard-web-application/sdk-for-node/authentication/AuthenticationClient.md
:::

如果你需要使用标准协议，如 [OpenID Connect](/guides/federation/oidc.md), [OAuth 2.0](/guides/federation/oauth.md), [SAML](/guides/federation/saml.md) 和 [CAS](/guides/federation/cas.md)，请使用：

::: page-ref /reference-new/Standard-web-application/sdk-for-node/authentication/StandardProtocol.md
:::

如果你需要使用小程序扫码登录或 APP 扫码登录，请使用：

::: page-ref /reference-new/Standard-web-application/sdk-for-node/authentication/QrCodeAuthenticationClient.md
:::

如果你需要使用 MFA，请使用：

::: page-ref /reference-new/Standard-web-application/sdk-for-node/authentication/MfaAuthenticationClient.md
:::

如果你需要使用社会化登录功能，请使用：

::: page-ref /reference-new/Standard-web-application/sdk-for-node/authentication/SocialAuthenticationClient.md
:::

如果你需要使用企业身份源登录功能，请使用：

::: page-ref /reference-new/Standard-web-application/sdk-for-node/authentication/EnterpriseAuthenticationClient.md
:::

如果你需要用户进行主体认证，请使用：

::: page-ref /reference-new/Standard-web-application/sdk-for-node/authentication/PrincipalAuthentication.md
:::
