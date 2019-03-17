# OAuth 授权配置及使用说明

----------

将您的 Authing 应用作为 OAuth 服务提供商，使第三方应用可以读取你的用户数据，流程与 Github 基本一致。我们提供了 OAuth 认证流程的四种模式 `implicit 模式`、`authorization_code 模式`、`password 模式`和`client_credentials 模式`。

### 创建 OAuth 应用

![params][1]

创建成功之后就可以点击应用详情查看 `App ID` 和 `App Secret`，使用其进行 OAuth 认证并获取 `access_token` 来请求 API。

  [1]: https://usercontents.authing.cn/docs/oauth/new_oauth.jpg

具体流程请参考：

1. [OAuth 授权流程](https://docs.authing.cn/#/oauthProvider/authorize)
2. [检测 AccessToken](https://docs.authing.cn/#/oauthProvider/checkToken)