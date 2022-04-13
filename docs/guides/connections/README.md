# 连接外部身份源（Identity Provider）

<LastUpdated/>

外部身份源（Identity Provider，简称 IdP）指的是一个存储和管理用户信息的外部服务，使用外部身份服务商可以降低用户管理成本以及降低用户使用成本。

一个典型的 IdP 流程包含以下步骤：

- 跳转：用户在 {{$localeConfig.brandName}} 登录页面点击**第三方登录**按钮，跳转到第三方的登录页面；
- 请求：用户在第三方（比如 Google、GitHub）的登录页面输入账号密码；
- 验证：第三方 IdP 验证用户身份；
- 授权：验证用户身份之后，浏览器携带临时凭证从第三方 IdP 跳回 {{$localeConfig.brandName}}，{{$localeConfig.brandName}} 使用此凭证从第三方 IdP 换取该用户的信息。

常见的身份服务商包括 Google、GitHub、微信、SAML 身份服务商等，在 Authing 中，我们将身份服务商分为以下几种：

- [社会化登录服务商](./social.md)，如 GitHub、微信、Apple 等；
- [企业身份源](./enterprise.md)，如 OIDC 身份源、SAML 身份源、CAS 身份源、LDAP 身份源、Windows 本地 AD、Azure AD 等；
- [身份源连接的账号匹配规则](./user-mapping.md)，身份源连接的账号匹配规则；
- [自定义数据库](/guides/database-connection/overview.md)，你可以通过编写自定义数据库脚本来连接自己的数据库，使用自己的数据库保存用户数据。

## 获取帮助

Join us on forum: [#authing-chat](https://forum.authing.cn/)
