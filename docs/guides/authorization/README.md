# 授权

<LastUpdated/>

在前面的部分我们分别介绍了[**认证**](../authentication/README.md) 和[**权限管理**](../access-control/README.md)，认证是识别请求方身份的过程，权限管理则是决定谁具备哪些操作权限的过程，在确定了用户身份以及该用户具备的权限之后，接下来我们要做的就是安全地授予用户权限。

## 授权的含义

在**通用领域**内，授权是领导者通过为员工和下属提供更多的自主权，以达到组织目标的过程。

在**计算机领域**内，授权是由信息系统指定批准机构授予某实体处理、存储或传送信息的权力。

而在**身份认证领域**内，授权是指当客户端经过身份认证后，能够有限的访问服务端资源的一种机制。

## 为什么要进行「授权」？

在已经构建起的用户系统中，当你的 API 需要判断当前访问用户是否能访问当前资源时，就需要你构建自己的权限系统了。授权是权限系统中一个很重要的概念，是指判断用户具备哪些权限的过程，这与认证完全不同。

对于企业来说，授权能够明确组织成员之间的关系，使职责和边界变得更加清晰，方便公司管理；同时，授权能够保障数据安全、防控风险，不同的权限准许不同的操作，可防止用户人为破坏、数据泄漏、误操作等事故的发生；授权能够提高决策的效率，优秀的授权和权限管理使系统更易操作，使员工的工作效率得到提升。

而从产品角度出发，授权可以保障产品系统的使用安全和数据安全，防止违规操作和数据泄漏；授权也可以提高系统的可操作性，提升用户体验；此外，好的授权功能会提升产品价值，使其在市场上更具有竞争力。

## 授权模式

授权模式主要为两种，分别是通过基于 OIDC 流程中的授权码模式，以及通过 API 接口到授权中心对用户授权进行集中验证。

### 基于 OIDC 框架的授权模式

OIDC 框架是一种安全、轻量、标准的授权体系，用于帮助资源方、调用方、资源所有者之间的完成授权流程。如果授权过程中不涉及到资源所有者，可以使用 client_credentials 模式。这种模式一般用于后端服务器的 M2M 模式。你可以在应用详情页获取创建编程访问账号，获取一对 AK 和 SK。你需要将其交给调用方。

你可以使用 OIDC 的 client_credentials 模式请求具备特定 scope 权限的 access_token：

```shell
curl --request POST \
  --url https://${YOUR_AUTHING_DOMAIN}/oidc/token \
  --header 'accept: application/json' \
  --header 'cache-control: no-cache' \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data 'grant_type=client_credentials&scope=customScope&client_id=AK&client_secret=SK'
```

{{$localeConfig.brandName}} 会根据调用方请求的资源和上下文环境，动态的决定颁发具备哪些权限的 AccessToken。并返回被拒绝的 scope：

```json
{
  "access_token": "...",
  "token_type": "Bearer",
  "expires_in": 3599,
  "scope": "user",
  "scope_rejected": "xxx yyy"
}
```

其中 scope 为该 access_token 具备的权限列表，用空格分割。你可以在后端通过 scope 判断用户具备哪些权限。

当授权流程中涉及到需要资源所有者参与授权时，可以使用 OIDC 框架中的授权码模式。你需要将权限项目放在发起授权的链接的 scope 参数中，例如：

```sh
https://${YOUR_AUTHING_DOMAIN}/oidc/auth?client_id={编程访问账号 AK}&scope=openid book:read book:delete&redirect_uri={你的业务回调地址}&state={随机字符串}&response_type=code
```

需要让资源所有者点击链接，之后会转到登录页面，资源持有者认证自己的身份，并将资源授权授权给调用方。
完成认证授权后，浏览器将跳转到业务回调地址，并通过 URL 传递 code 授权码。调用者可以使用这个 code 授权码到 {{$localeConfig.brandName}} 换取一个具备权限的 AccessToken，用于获取资源方的资源。

Code 换取 Token 的代码如下：

```sh
curl --request POST \
  --url https://${YOUR_AUTHING_DOMAIN}/oidc/token \
  --header 'Content-Type: application/x-www-form-urlencoded' \
  --data client_id={编程访问账号 AK} \
  --data client_secret={编程访问账号 SK} \
  --data grant_type=authorization_code \
  --data redirect_uri={回调地址} \
  --data code={授权码}
```

同样，{{$localeConfig.brandName}} 会根据调用方请求的资源和上下文环境，动态的决定颁发具备哪些权限的 AccessToken。被拒绝的权限不会出现在 scope 中：

```json
{
  "access_token": "...",
  "token_type": "Bearer",
  "expires_in": 3599,
  "scope": "openid book:read",
}
```

当然，资源方必须在返回资源前，验证调用者是否携带了具备权限的 AccessToken，当一切检验通过，就可以安全地返回资源。

## 使用权限 API

除了使用 OIDC 的 client_credentials 模式，还可以使用通用的权限 API，通过权限 API 创建角色、给角色授权角色、判断用户是否具备某个权限等。我们支持 Node.js、Python、Java、PHP、C# 等语言的 SDK，[点此查看详情](/guides/access-control/)。
