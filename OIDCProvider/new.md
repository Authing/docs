# OIDC 授权配置及使用说明

----------

OIDC 可以将你的 Authing 用户池作为 OIDC 服务提供商，使第三方应用可以读取你的用户数据，流程与 Github 基本一致。我们提供了 OIDC 认证流程的四种模式 `implicit 模式`、`authorization_code 模式`、`password 模式`和 `client_credentials 模式`。

如果你想直观的体验 OIDC 认证流程，请[点击这里查看我们提供的示例](http://oidc-test.authing.cn)或[点击这里可视化的理解 OIDC](https://openidconnect.net/)。

### 接下来你可能需要

1. [使用 Authing 实现 OIDC 授权流程](https://docs.authing.cn/#/OIDCProvider/authorize)
2. [检测 access_token 或 id_token 是否可用](https://docs.authing.cn/#/OIDCProvider/checkToken)