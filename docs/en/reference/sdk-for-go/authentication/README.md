---
meta:
  - name: description
    content: Use user authentication module
---

# Use user authentication module

<LastUpdated/>

`AuthenticationClient` , is requested by the end user (End User), providing a method of logging in, registration, logout, managing user data, access to all management user identity of authorized resources; this module also provides various identity protocol SDK Such as [OpenID Connect](/guides/federation/oidc.md), [OAuth 2.0](/guides/federation/oauth.md), [SAML](/guides/federation/saml.md) 和 [CAS](/guides/federation/cas.md).

If you need to use the basic login registration, modify user information, please use:

::: page-ref /en/reference/sdk-for-java/authentication/AuthenticationClient.md
:::

If you need a standard protocol, such as [OpenID Connect](/guides/federation/oidc.md), [OAuth 2.0](/guides/federation/oauth.md), [SAML](/guides/federation/saml.md) and [CAS](/guides/federation/cas.md), please use:

::: page-ref /en/reference/sdk-for-java/authentication/StandardProtocol.md
:::

<!--
如果你需要使用 MFA，请使用：

::: page-ref /reference/sdk-for-java/authentication/MfaAuthenticationClient.md
:::
-->
