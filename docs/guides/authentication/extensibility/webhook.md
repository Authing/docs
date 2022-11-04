# 使用 Webhook 监听认证事件

<LastUpdated/>

[Webhooks](/guides/webhook/) 允许你对用户注册、登录等行为进行监听，从而对其做一些自定义处理。当你的用户登录、注册、修改密码、验证 MFA （详细的事件列表请见 [Webhook 支持的事件列表](/guides/webhook/#支持的事件)）之后，都会给你配置的远程 HTTP URL 发送一个 HTTP POST 请求，你可以在这里完成相关的事件处理，比如：

- 用户在 {{$localeConfig.brandName}} 注册之后，将用户信息同步到 OA 系统；
- 用户修改用户信息之后，将用户信息的变动同步到 OA 系统；
- 当用户的邮箱验证之后，给该用户添加相应的积分等。

有关详情，请参阅 [Webhooks](/guides/webhook/)。
