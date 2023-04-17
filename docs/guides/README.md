# 使用指南概览

<LastUpdated/>

欢迎来到使用指南，这里将会正式开启你在 {{$localeConfig.brandName}} 的开发之旅！

在这里，你将主要学会两件事：

1. 集成认证，我们将一步一步地通过示例和代码引导你如何快速集成认证功能到你的应用系统中；
2. 管理资源，如何管理你在 {{$localeConfig.brandName}} 中的资源，如应用、角色、用户目录、配置等。

在你正式开始进行开发之前，我们推荐你先了解 [什么是 {{$localeConfig.brandName}}](/concepts/)，以及 {{$localeConfig.brandName}} 中几个最核心的概念：[认证和授权的区别](/concepts/authentication-vs-authorization.md)、[用户池](/concepts/user-pool.md) 及 [应用](/concepts/application.md)。

## 集成认证到你的应用中

推荐首先阅读 [快速开始：认证你的第一个用户](/guides/basics/authenticate-first-user/)，你将了解集成 {{$localeConfig.brandName}} 的完整步骤，帮助你快速上手。

之后你可以按照主题来阅读指引：

1. 对用户进行认证
   - 最基础的 [账号密码认证](./authentication/basic/password/README.md)、[手机号验证码认证](./authentication/basic/sms/README.md) 手段；
   - [如何接入社会化登录认证](/guides/authentication/social/)；
   - [如何接入扫码登录认证](/guides/authentication/qrcode/use-self-build-app/overview.md)；
   - [如何在小程序中进行认证](/guides/authentication/wechat-mini-program/)；
   - [实现单点登录（SSO）](/guides/app-new/sso/)；
   - [在移动端实现单点登录](/guides/authentication/mobile-sso/)；
   - [如何集成多因素认证](/guides/security/mfa/)
   - 对认证流程进行扩展：
     - [添加用户自定义字段](/guides/authentication/extensibility/user-defined-field/)
     - [添加部门自定义字段](/guides/authentication/extensibility/depart`ment-extend/)
     - [IdToken 添加扩展字段](/guides/authentication/extensibility/customize-id-token.md)
     - [使用自定义数据库对用户进行认证](/guides/authentication/extensibility/database-connection.md)
     - [使用 Pipeline 对认证流程进行扩展](/guides/authentication/extensibility/pipeline.md)
     - [使用 Webhook 监听认证事件](/guides/authentication/extensibility/webhook.md)
2. 对用户进行权限管理
   - [选择合适的权限模型](/guides/access-control/choose-the-right-access-control-model.md)
   - [集成 RBAC 权限模型到你的应用系统](/guides/access-control/rbac.md)
   - [集成 ABAC 权限模型到你的应用系统](/guides/access-control/abac.md)
   - [使用权限分组管理权限资源](/guides/access-control/resource-group.md)
   - [管理资源权限](/guides/access-control/resource-acl.md)
3. 授权

   - [用户许可的资源授权](/guides/authorization/user-consent-authz.md)
   - [机器间（M2M）授权](/guides/authorization/m2m-authz.md)

4. 管理用户账号

   - [了解用户资料所有字段的释义](/guides/user/user-profile.md)；
   - [了解管理员如何创建账号](/guides/user/create-user/)；
   - [了解如何管理用户账号](/guides/user/manage-profile.md)，如修改用户资料、绑定 MFA 等；
   - [了解如何绑定账号](/guides/user/bind-social-account.md)；
   - ...

5. [打通微信生态账号体系](/guides/wechat-ecosystem/)的详细指引。

## 管理你在 {{$localeConfig.brandName}} 中的资源

推荐首先阅读[控制台概览](/guides/basics/console/)，你将快速了解 {{$localeConfig.brandName}} 控制台有哪些功能，能够帮助你大致了解 {{$localeConfig.brandName}} 的全貌。

之后你可以按照主题来阅读指引：

1. [管理用户目录](/guides/users/)

   - [了解用户目录有哪些配置项](/guides/users/settings.md)；
   - [了解如何添加自定义用户字段](/guides/users/user-defined-field/)；
   - [了解如何搜索用户](/guides/users/search.md)；
   - [了解如何使用 LDAP 用户目录](/guides/users/ldap-user-directory.md)。
2. [管理自建应用](/guides/app-new/)
3. [管理多租户](/tenant/)
4. [成为联邦认证身份源](/guides/federation/)
5. [连接外部身份源（Identity Provider）](/guides/connections/)

   - [配置社会化登录](/guides/connections/social.md)
   - [配置标准协议身份提供商](/guides/connections/enterprise.md)
   - [使用自定义数据库](/guides/database-connection/overview.md)
6. [管理组织机构](/guides/org/)

   - [创建或导入组织机构](/guides/org/create-or-import-org/README.md)；
   - [管理组织机构](/guides/org/manage-org/README.md)；
   - [管理成员生命周期](/guides/org/staff-life-cycle-management/README.md)；
   - [使用 LDAP 协议对外开放组织机构数据](/guides/org/ldap-user-directory/README.md)。
7. [查看审计日志](/guides/audit/)
8. 配置安全信息

   - [配置 Web 安全域](/guides/security/config-domain.md)
   - [配置密码安全](/guides/security/pw-security/)
9. 配置用户池信息
   - [修改用户池基础信息](/guides/userpool-config/basic-config.md)
   - [配置邮件服务和模版](/guides/userpool-config/email/)
   - [配置短信服务](/guides/userpool-config/sms/)

## 了解私有化部署方案

如果你需要私有化部署 {{$localeConfig.brandName}}，请阅读以下指引：

- [基础部署模式](/guides/deployment/bare-metal.md)；
- [Docker 部署模式](/guides/deployment/docker-compose.md)；
- [Kubernetes 部署模式](/guides/deployment/kubernetes.md)。
