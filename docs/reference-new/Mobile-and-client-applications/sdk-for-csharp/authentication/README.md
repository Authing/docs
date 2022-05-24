---
meta:
- name: description
  content: 使用用户认证模块
---

# 使用用户认证模块

<LastUpdated/>


`AuthenticationClient` 以终端用户（End User）的身份进行请求，提供了登录、注册、登出、管理用户资料、获取授权资源等所有管理用户身份的方法；此模块还提供了各种身份协议的 SDK，如 [OpenID Connect](/guides/federation/oidc.md), [OAuth 2.0](/guides/federation/oauth.md), [SAML](/guides/federation/saml.md) 和 [CAS](/guides/federation/cas.md)。

如果你需要使用基础的登录注册、修改用户资料等方法，请使用：

::: page-ref /reference-new/Mobile-and-client-applications/sdk-for-csharp/authentication/AuthenticationClient.md
:::

<!-- 如果你需要使用标准协议，如 [OpenID Connect](/guides/federation/oidc.md), [OAuth 2.0](/guides/federation/oauth.md), [SAML](/guides/federation/saml.md) 和 [CAS](/guides/federation/cas.md)，请使用：

::: page-ref /reference/sdk-for-csharp/authentication/StandardProtocol.md
::: -->

<!--
如果你需要使用 MFA，请使用：

::: page-ref /reference/sdk-for-java/authentication/MfaAuthenticationClient.md
:::
-->