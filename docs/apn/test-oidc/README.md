# 基于 Authing 测试 OIDC 能力

<LastUpdated/>

在你的应用完成 OIDC 集成后，Authing 可以帮助你快速验证是否已经具备完整的 OIDC 能力。Authing 给开发者提供了多种应用类型和开发语言的测试环境。

OIDC 有五种授权模式，分别为：

1. 授权码模式

2. 授权码 + PKCE 模式

3. 隐式模式

4. 密码模式

5. Client Credentials 模式

在开始测试之前你需要务必先了解一下以上授权模式和你应用之间的关系，这是为了方便你选择合适的授权模式进行测试，详情请参考文档： 选择 [OIDC 授权模式 | Authing 文档](/concepts/oidc/choose-flow.md)。

整个测试流程不管你用哪一种授权模式，都需要以下参数：

- App ID
- App Secret
- Issuer
- appHost
- 登录回调 URL
- scope
