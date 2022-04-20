# 成为联邦认证身份源

<LastUpdated/>

联邦认证是一种**分布式**的身份认证，当用户在**身份提供商**登录时，用户可以选择到当前身份提供商**信任**的联邦身份提供商登录。用户可以通过联邦认证登录一个新的系统，而不必每次在新的系统中注册账号。例如现在许多网站有自己的**账密注册**登录方式，也有微信扫码直接登录的方式，其中的微信就是这个网站的**身份联邦**，用户**不必填写**信息注册账号，**直接使用微信**就可以登录。

Authing 支持通过简单配置，让你的应用成为一个支持标准协议（如 [OIDC](/guides/federation/oidc.md)、[OAuth2.0](/guides/federation/oauth.md)、[SAML](/guides/federation/saml.md)）的联邦认证身份源，实现使用 Authing 的用户目录登录第三方应用，如：

- [Jira](/integration/jira/)；
- [阿里云](/integration/ali-cloud/)；
- [AWS](/integration/aws/)；
- ... 完整应用列表请见 [应用集成](/integration/)。

