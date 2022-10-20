用户认证模块（`AuthenticationClient`） 以终端用户（End User）的身份进行请求，提供了登录、注册、登出、管理用户资料、获取授权资源等所有管理用户身份的方法；此模块还提供了各种身份协议的 SDK，如 [OpenID Connect](/guides/federation/oidc.md), [OAuth 2.0](/guides/federation/oauth.md), [SAML](/guides/federation/saml.md) 和 [CAS](/guides/federation/cas.md)。

如果你需要使用基础的手机号验证码登录、修改用户资料、发生短信验证码等方法，请使用：

::: page-ref /reference-new/sdk-v5/node/authentication/common.md
:::

如果你需要使用[OpenID Connect](/guides/federation/oidc.md), [OAuth 2.0](/guides/federation/oauth.md), [SAML](/guides/federation/saml.md) 和 [CAS](/guides/federation/cas.md)标准协议，请分别阅读：

::: page-ref /reference-new/sdk-v5/node/authentication/oidc.md
:::

::: page-ref /reference-new/sdk-v5/node/authentication/oauth.md
:::

::: page-ref /reference-new/sdk-v5/node/authentication/saml.md
:::

::: page-ref /reference-new/sdk-v5/node/authentication/cas.md
:::
