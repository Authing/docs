# 自建应用综述
​
<LastUpdated/>

路径：**应用->自建应用**

在 {{$localeConfig.brandName}} 中，[用户池](/concepts/user-pool.md) 是租户隔离的最小单位，存储了用户系统中所有的用户数据；而应用则对应的是现实中创建的业务应用。一个用户池可能会有多个应用，比如一个学校所有的学生在一个用户池里，而学校会同时开发了选课应用、邮箱应用、师生服务中心等多个应用，这些应用会使用同一个用户系统。你可以在此了解更多 [应用相关的介绍](/concepts/application.md)。

要管理租户的应用资源，你可以作以下几件事：

1. [创建一个用户池](/guides/basics/authenticate-first-user/use-hosted-login-page.md#创建一个用户池)。

2. 将所有的应用资源集成至你的 Authing 用户池，为此需要逐一 [创建自建应用](/guides/app-new/create-app/create-app.md)。</br>**自建应用** 页展示当前用户池所有自建应用列表。

3. 配置登录界面和登录方式：
    * [快速开始](/guides/app-new/create-app/quick-start.md)
    * [应用配置](/guides/app-new/create-app/app-configuration.md)
    * [登录控制](/guides/app-new/create-app/login-control.md)
    * [访问授权](/guides/app-new/create-app/application-access-control.md)
    * [品牌化](/guides/app-new/create-app/customize-guard.md)
    * [安全管理](/guides/app-new/create-app/security-management.md)
    * [高级配置](/guides/app-new/create-app/advanced-settings.md)
    * [租户配置](/guides/app-new/create-app/tenant-config.md)
​
4. 完成配置后，你还可以进行如下操作：​
    * **数据概览**：展示访问当前应用的登录和用户统计数据。​
    * **接入教程**：链接至 **开发集成** 文档，帮助用户了解 {{$localeConfig.brandName}} 如何通过各语言 SDK 集成当前应用。​
    * **体验登录**：管理员在完成应用相关的配置后可以点击此按钮模拟用户的登录流程，以验证配置效果。