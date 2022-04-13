# 使用 Authing 拓展能力实现自动化

<LastUpdated/>

Authing 一直以来都致力于提升平台的开放性和可扩展性，以满足不同客户对身份认证、权限管理各种个性化的需求。Authing 的扩展性体系目前包含以下形式：

- [WebHook](/guides/webhook/README.md) 允许你对用户注册、登录、密码重置、邮箱验证、用户信息更新等行为进行监听，系统会在触发特定事件后往你配置的自定义回调地址发送事件，从而对其做一些自定义处理。
- [Pipeline](/guides/pipeline/README.md) 是一组运行在云端的用户自定义 JavaScript 代码，可以让开发者在认证流程中执行自定义代码，实现添加自定义 id_token、非常灵活的访问控制等。
- [自定义数据库](/guides/database-connection/overview.md)能够让 Authing 与你自定义的数据库进行交互，也可以实现不停机的用户数据上云迁移。

