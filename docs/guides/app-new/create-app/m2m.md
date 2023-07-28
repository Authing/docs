# M2M 使用手册

<LastUpdated/>

## 整体流程

### 概念与定义

M2M（Machine to Machine）授权是**无用户参与**的应用间授权。当你想要将自己的业务 API 部分地开放给其他人，例如你的外包商，外包商需要先进行 M2M 授权，然后才能访问你的业务 API。假如你的公司希望开发一些数据的大屏展示，并有几个外包商参与其中。你希望将某些非核心数据的 API 访问权限授权给外包商，让外包商完成这部分的非核心开发。此时需要 **M2M 授权**，因为这个过程中不需要用户参与，我们只需要确定来访者是哪个外包商，以及他有哪些接口的访问权限。
以下是该场景的架构图，外包商先到 Authing 获取 AccessToken，然后携带 AccessToken 访问你公司服务的 API 接口：
![Construct](./images/construct.png)

### 总体交互图

![Mutual](./images/mutual.png)

**Authing：**
::: hint-info
作为权限控制中台以及对调用方进行认证并颁发 AccessToken
:::

**资源方：**
::: hint-info
资源所有者，利用 Authing 对调用方授权，并在资源处对调用方的请求进行鉴权然后返回对应的资源
:::

**调用方：**
::: hint-info
资源请求者，利用资源方分配给他的唯一标识，先去 Authing 进行认证后获得 AccessToken，然后利用 AccessToken 到资源服务器请求资源
:::

（1）资源方首先需要在 Authing 控制台进行如下管理操作

- 创建应用，并配置应用的授权模式为 OIDC 的客户端证书模式，即 M2M 授权模式
- 创建编程访问账号，此账号用于唯一标识调用方
- 根据实际业务情况，创建资源如数据资源、API 资源等等
- 对编程访问账号进行授权，即允许不同的调用方访问不同的资源

（2）资源方将编程访问账号根据业务实际情况分配给对应的调用方，注意：

- 此账号唯一标识对应的调用方
- 账号中的密钥不可泄露
- 不同的账号你可以分配不同的权限
- 你可在 Authing 控制台实时改变账号权限或者停用

（3）调用方通过 HTTP 协议或者利用 Authing 提供的 SDK，携带要求的参数到 Authing 处认证，注意：

- 需要向请求地址发送 POST 请求
- 参数需要为 application/x-www-form-urlencoded 格式
- 调用方要请求的权限要列举在 scope 中

（4）Authing 认证通过后返回具有响应权限的 AccessToken，注意：

- 对于调用方申请的权限，只有资源方在 Authing 控制台已经配置的才会被允许，并写入到 AccessToken 中
- 资源方获取到 AccessToken 后，要谨慎保存以用于后续向资源服务器进行资源请求

（5）调用方携带 AccessToken 向资源服务器请求资源

- 调用方请求资源方的 API 时，将 AccessToken 通过 HTTP Header 携带

（6）资源服务器进行鉴权，通过后向调用方返回对应的资源

- 资源方的拦截器或中间件收到请求后，通过 JTW 将 AccessToken 解码并进行验证

## 具体实现方式详解

### 资源方在 Authing 控制台中的管理操作

#### 创建应用

（1）创建应用
点击 控制台 - 应用 - 自建应用 - 创建应用：

![Create-application](./images/create-application.png)

按提示输入「应用名称」、「认证地址」、选择「M2M 应用」类型、点击创建即可

如：

- 应用名称：M2M
- 认证地址您只需要填写域名即可，如本例中：authing-m2m
- 应用类型：M2M 应用

![Application](./images/application.png)

配置完成之后，即可看到配置界面：

![Config](./images/config.png)

（2）配置授权模式
切换至「协议配置」页签，可查看授权相关协议。请务必保持授权模式配置为「client_credentials」，id_token 签名算法配置为「RS256」。

![Protocol](./images/protocol.png)

（3）记录 AccessToken 的请求地址
保存后，仍然在此页面，将下图中的 Token 端点地址记录下来。
业务调用方为了能够访问资源方受保护的数据等资源，必须先在 Authing **获取一个具备权限的 AccessToken**。为此，调用方需要向该地址发送 POST 请求。
![Access-token](./images/access-token.png)

#### 创建编程访问账号

概念说明：
编程访问账号是在刚才的应用里创建的，每一个编程访问账号包含着一对 AccessKey、SecretKey，用于唯一标识一个调用方。你需要把编程访问账号交给调用方，然后调用方用编程访问账号来获取资源授权。当然，不同的调用方，你需要为他们创建不同的编程访问账号。

（1）切换至「权限管理」页签
![Permission](./images/permission.png)

（2）创建编程访问账号
点击【添加】
![Add-permission](./images/add-permission.png)
即可看到创建面板：
![Create-account](./images/create-account.png)
输入备注信息点击保存后即可，利用同样的操作我们可以创建多个编程访问账号，比如 A 公司、B 公司、C 公司，他们利用各自被授予的编程访问账号，就可以实现在自己的服务器在 Authing 完成授权后前往资源服务器访问资源
![Resource](./images/resource.png)
注意事项：

- AccessToken 过期时间：当你创建编程访问账号时，需要指定 AccessToken 过期时间。Authing 在颁发 AccessToken 时使用 RS256 签名算法进行签名，以确保 AccessToken 不会被篡改。RS256 是一种非对称签名算法，Authing 持有私钥对 Token 进行签名，JWT 的消费者使用公钥来验证签名。
- 每一个编程访问账号都有一对 AccessKey、SecretKey，后续调用方在获取 AccessToken 时需要携带这两个参数
- <font color="red">编程访问账号的 SecretKey 要谨慎保存，谨防泄漏</font>

#### 创建资源

（1）「权限管理」页签下翻至资源部门
![Resource-department](./images/resource-department.png)
（2）添加资源
点击【添加资源】
![Add-resource](./images/add-resource.png)
可以看到资源创建面板：
![Resource-panel](./images/resource-panel.png)
资源可以是数据、API、菜单、按钮等等，你可以结合自身业务情况定义资源。
如本例中定义一个数据资源：

- 资源名称：revenue
- 资源描述：营收

![Data-resource](./images/data-resource.png)

操作类型指的是可以对资源进行的行为动作，如本例中我们定义了对营收数据的增、删、改、查四种操作类型：

![Operation-type](./images/operation-type.png)

点击保存后即可看到刚才创建的资源：

![Resource-list](./images/resource-list.png)

当然，你可以根据需求创建多种资源用于调用方调用，比如利用同样的步骤我们又创建了客户（customer）资源：

![Customer-resource](./images/customer-resource.png)

#### 将资源授权给编程访问账号

仍然在权限面板，在我们创建好资源和编程访问账号后，现在就可以决定，哪些账号拥有哪些资源以及哪些操作了。

（1）找到授权面板

点击 授权 - 添加授权

![Authorization-panel](./images/authorization-panel.png)

即可看到授权面板：

![Add-authorization](./images/add-authorization.png)

（2）进行授权
首先我们要选择为哪一个编程访问账号进行授权：选择【编写访问账号】，并选择具体的账号

![Authorization](./images/authorization.png)

然后我们需要添加授权规则：比如我们只允许 A 公司对营收资源有读取权利

![Authorization-rule](./images/authorization-rule.png)

点击保存后即可看到完成的授权：

![Authorization-list](./images/authorization-list.png)

![Authorization-detail](./images/authorization-detail.png)

按照相同的步骤即可完成对不同调用方的授权操作，实现他们对不同资源有着不同的权限。

#### 将编程访问账号对应的 AK、SK 交给调用方（即调用资源方）

为了让调用方进行访问，资源方需要进行以下两个交接：

（1） 将 AccessToken 的请求地址告诉调用方
这个地址是统一的，不同的调用方都需要从这个地址进行请求，以获取 AccessToken。
本例中 AccessToken 的请求地址为：https://openresource.authing.cn/oidc/token

（2）将编程访问账号告诉调用方
编程访问账号用于唯一标识调用方，且不同的编程访问账号可能被授予了不同的权限，你可以根据需求进行编程访问账号的创建、授权然后分配。

### 调用方到 Authing 获取 AccessToken 后去资源方请求资源

**OIDC** 授权框架提供了许多种授权模式。在本场景中，获取营收记录属于 **M2M**（机器对机器）授权，没有用户的参与，调用方以自己的身份去访问资源服务器的 API 接口，这里需要使用 **OIDC ClientCredentials** 模式。

通过 OIDC ClientCredentials 授权模式，调用方需要向 Authing 提供他的 ClientCredentials（也就是**编程访问账号**的 Key 和 Secret）和需要请求的权限 scope（也就是**资源标识符**）来直接获得一个具有该 资源权限的 AccessToken。然后调用方携带着这个 AccessToken 请求资源服务器，通过后即可获得对应的资源。

![OIDC-permission](./images/oidc-permission.png)

交互流程如下：

- 调用方发送编程访问账号的 Key、Secret 和需要请求的权限项目 scope 到 Authing。
- Authing 验证编程访问账号 Key 和 Secret。
- Authing 根据管理员配置的权限规则校验 scope 权限项目，签发一个具备访问资源权限的 AccessToken，被拒绝的权限 scope 不会出现在 AccessToken 里。
- 调用方携带 AccessToken 访问资源服务器。
- 资源服务器返回受保护资源。

#### 到 Authing 进行认证授权，获取 AccessToken

（1）集成 Authing SDK ，利用 Client Credentials 模式获取 AccessToken

以 Authing 官网开发文档 里提供的 JavaScript/Node SDK 为例：（详情请访问：[Authing - Node.js/JavaScript | Authing 文档](/reference/sdk-for-node/)）

Authing JavaScript/Node SDK 由两部分组成：`ManagementClient` 和 `AuthenticationClient`。
`AuthenticationClient` 以终端用户（End User）的身份进行请求，提供了登录、注册、登出、管理用户资料、获取授权资源等所有管理用户身份的方法；此模块还提供了各种身份协议的 SDK，如 [OpenID Connect](/guides/federation/oidc.md), [OAuth 2.0](/guides/federation/oauth.md), [SAML](/guides/federation/saml.md) 和 [CAS](/guides/federation/cas.md)。此模块适合用于非受信任的浏览器环境和纯后端交互的服务器环境。
`ManagementClient` 以管理员（Administrator）的身份进行请求，用于管理用户池资源和执行管理任务，提供了管理用户、角色、应用、资源等方法；一般来说，你在 Authing 控制台 (opens new window)中能做的所有操作，都能用此模块完成。此模块适合在后端或者可信任的前端环境下使用。

你应该将初始化过后的 `ManagementClient` 实例设置为一个全局变量（只初始化一次），而 `AuthenticationClient` 应该每次请求初始化一个。

1）使用标准协议认证模块
详情见：[标准协议认证模块 | Authing 文档](/reference/sdk-for-node/authentication/StandardProtocol.md)
此模块包含 OIDC、OAuth 2.0、SAML、CAS 标准协议的认证、获取令牌、检查令牌、登出等方法。其中发起认证的方法需要在前端使用，获取令牌、检查令牌等方法需要在后端使用。

使用方法：

```javascript
import { AuthenticationClient } from "authing-js-sdk";
const authenticationClient = new AuthenticationClient({
  appId: "应用 ID",
  secret: "应用密钥",
  appHost: "https://{YOUR_DOMAIN}.authing.cn",
  protocol: "oidc",
});
authenticationClient.getAccessTokenByClientCredentials; // 机器间授权获取 Access Token
```

参数

- appId: '应用 ID'，可以在控制台自己创建的应用 - 应用配置 - 基本信息 中查看
- secret: '应用密钥'，可以在控制台自己创建的应用 - 应用配置 - 基本信息 中查看

2）Client Credentials 模式获取 AccessToken

使用编程访问账号获取具备权限的 AccessToken。

```javascript
AuthenticationClient().getAccessTokenByClientCredentials(scope, options);
```

参数

- scope <string\> 权限项目，空格分隔的字符串，每一项代表一个权限。
- options，编程访问账号的 AK 与 SK 信息。
- options.accessKey，编程访问账号 AccessKey。
- options.secretKey，编程访问账号 SecretKey。

示例

```javascript
const authenticationClient = new AuthenticationClient({
  appId: "应用 ID",
  secret: "应用密钥",
  redirectUri: "业务回调地址",
});
let res = await authenticationClient.getAccessTokenByClientCredentials(
  "email openid profile phone",
  { accessKey: "编程访问账号 AK", secretKey: "编程访问账号 SK" }
);
```

返回数据

```javascript
{
  "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlRmTE90M0xibjhfYThwUk11ZXNzYW1xai1vM0RCQ3MxLW93SExRLVZNcVEifQ.eyJqdGkiOiJsdzg0NW5zdGcwS3EtMTlodVpQOHYiLCJzdWIiOiI1ZmY3MDFkODQ2YjkyMDNlMmY2YWM2ZjMiLCJpYXQiOjE2MTU4ODM1ODYsImV4cCI6MTYxNTg4NzE4Niwic2NvcGUiOiJlbWFpbCBvcGVuaWQgcHJvZmlsZSBwaG9uZSIsImlzcyI6Imh0dHBzOi8vb2lkYzEuYXV0aGluZy5jbi9vaWRjIiwiYXVkIjoiNWYxN2E1MjlmNjRmYjAwOWI3OTRhMmZmIn0.VvYKBcWcr8iIi1b37ugWQ9hsvog4_7EqDQyFqwhIuvM0NHlHH3Bhw83EQIKSNfbWV4nv3ihfeNGPLMzslbQr-wwjnWZTLMYl1bcn7IdVtD_kTN3Zz10MwF5td-VQ7UndU28wJ0HE1mo6E8QH93kYGckS5FSZXmCBa0M5H59Jec_a1MHI1MZrr_V9cZ9EfeF97V-PcqU8JVAwDZclCJ3mWY_Mb65RnMR9yEVqUZzJStmaXGMuRIzjkm2pklqt0CtQQJfzECXq_4USpwRXDiYLWILYPUCcO6hGxDjhMEd8IcxdG51TQP-w1UM6LyIRn61uSJvDsz8zg5dStDKyocypiA",
  "expires_in": 3600,
  "scope": "email openid profile phone",
  "token_type": "Bearer"
}
```

（2）Postman 演示测试

调用方需要向 AccessToken 的请求地址发送 **POST** 请求，具体地址由资源方提供。
请求地址：`https://{应用域名}.authing.cn/oidc/token`

参数说明：
| 参数 | 说明 | 是否必填 |
| ---- | ---- | ---- |
|client_id |编程访问账号的 AccessKey|是|
|client_secret|编程访问账号的 SecretKey|是|
|grant_type|授权模式，Client Credentials 模式中必须为 client_credentials 字符串|是|
|scope|授权范围，格式为 resourceName:resourceScope:action，如所有书籍的阅读权限标识为 book:\*:read，多个范围用空格分隔|是|
上文中的应用 AccessToken 的请求地址为：https://openresource.authing.cn/oidc/token

以 A 公司为例，A 公司希望能够读取资源服务器中营收记录，应该携带的参数为参数为：

![Postman](./images/postman.png)

响应结果：

```javascript
  {
    "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ino0cVlVdWUwbDRPT3JyRHJUclJLYkRlTkRnRFkwYkdROGlmVmtZbmd6dHMifQ.eyJqdGkiOiI5QWRmU2d0TExkZEhWWVFqVzJ3LUkiLCJpYXQiOjE2NTM0OTU5MzMsImV4cCI6MTY1MzQ5NjUzMywic2NvcGUiOiJyZXZlbnVlOio6cmVhZCIsImlzcyI6Imh0dHBzOi8vb3BlbnJlc291cmNlLmF1dGhpbmcuY24vb2lkYyIsImF1ZCI6IjYyOGU0OWNiYjdjZWU2ZWY2OGQ2OTRhNiIsImF6cCI6IjYyOGUzZGNhOGMwOTE3MjYxZDE1MjUyNiJ9.cKoEPNqycqk7OIiQwBxqF4WpqF8djATDM2kZSMahF5IlPts8bIKKZy92BMKmV-N_BkunKnCo8u2BnAg__PH59PBhkMF7_IqtZr9YLaN4Nx1ouMZZNaFdGBWRU-Ha1GAvECFBPBp0uItPtwlMV_jFkSciTozyLBrbwlQdZ0rkiYEcgGjBEdXrvvbo5N1-2p4ruQ5HS5LUH5nUN0on5JG4uDvQpDcYMG-XUpdWmTng3NAaOr0bt3yFkmAKLrwqdNWiLZmCG4j5Sj-xEsMNhjQbfARL6hoZ8jmn-H1bXfVWm0t89_u3ss-joqhG3zSJ9oMXbDcfW9JLXJ79OZIujopdlA",
    "expires_in": 600,
    "token_type": "Bearer",
    "scope": "revenue:*:read",
    "rejected_scope": ""
}
```

可以看到返回结果中有 access_token 以及获取的权限 "scope": "revenue:\*:read"
当然， access_token 中包含着权限：

![Jwt](./images/jwt.png)

如果我们申请本身不具有的权限，比如 A 公司不仅要读取还要删除营收记录，携带的参数如下：

![Request-params](./images/request-params.png)

响应结果：

```javascript
{
 "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ino0cVlVdWUwbDRPT3JyRHJUclJLYkRlTkRnRFkwYkdROGlmVmtZbmd6dHMifQ.eyJqdGkiOiJkbzVVQ28wWldrN3l0VTBJMUppUVQiLCJpYXQiOjE2NTM0OTYyODAsImV4cCI6MTY1MzQ5Njg4MCwic2NvcGUiOiJyZXZlbnVlOio6cmVhZCIsImlzcyI6Imh0dHBzOi8vb3BlbnJlc291cmNlLmF1dGhpbmcuY24vb2lkYyIsImF1ZCI6IjYyOGU0OWNiYjdjZWU2ZWY2OGQ2OTRhNiIsImF6cCI6IjYyOGUzZGNhOGMwOTE3MjYxZDE1MjUyNiJ9.KxBxjQhR90OrOuyRQVJZOiBNiw5ajmj5fi0a3G6vkV_raVrgdCcej1k0yu6Te4Y2EW9gxfo1pgEjgKyr4fShhpfJddfy7elxGuf-552Mgg8bWMYklTHVmlxp7Fc6q-ATS-kK1ZntfmiCEmTaXa0uywrpqpsTNEfTgJUF9OnSZRj8sqOkmb9FmUb-uSWWv9etH1yWoJhu2UV0YVl8qS4OkJ_eU9OimUmO1oSTpDKJQmQXoZOIhnKJAvVruQsNaWEVPtDQUv9MQtOokTk_R6R3tAXdX8DwSGu1CSCgmTfHWMzKfbHpDDjdnUuRLPMpVdQC_hoEoskm1LPY5KX_ssFriQ",
 "expires_in": 600,
 "token_type": "Bearer",
 "scope": "revenue::read",
 "rejected_scope": "revenue::delete"
}
```

可以看到：只有读取获得了申请，删除被拒绝了，这是因为资源方在对 A 公司编程访问账号授权时没有授予对应的权限。

（3）注意事项

- 要以 application/x-www-form-urlencoded 格式携带上参数请求 token 端点
- Scope 中格式为 resourceName:resourceScope:action，其中 resourceName 表示资源名称，resourceScope 表示资源范围，\_ 表示所有，action 表示操作。如所有书籍的阅读权限标识为 book:\*:read，多个范围用空格分隔 Authing 的 scope 权限项目以空格分隔，每一项的格式是资源标识符:资源操作。
  以下是 Authing 支持的所有 scope 格式：
  - book:1:read 含义为编号为 1 的书籍资源的读取权限
  - book:\*:read 含义为所有书籍资源的读取权限
  - book:read 含义为所有书籍资源的读取权限
  - book:\*: \_ 含义为所有书籍资源的所有操作权限
  - book:\* 含义为所有书籍资源的所有操作权限
  - book 含义为所有书籍资源的所有操作权
    \*: \*: \* 含义为所有资源的所有操作权限
    \*: \* 含义为所有资源的所有操作权限
    `*` 含义为所有资源的所有操作权限

#### 利用 AccessToken 到资源服务器获取资源

此后，调用方每次与资源服务器通信时，都要带上这个 AccessToken ，从而进行身份认证。推荐的做法是把 AccessToken 放在 HTTP 请求头的 Authorization 字段中，格式如下:

::: hint-info
Authorization: AccessToken
:::

### 资源方处理调用方的资源请求

#### 资源方添加访问鉴权拦截器

在 Authing 定义了资源之后，你需要在你的实际业务资源侧增加访问鉴权拦截器，对于受保护的资源，只放行携带了合法的 AccessToken 且具备所需权限的来访者。 代码示例如下：

```javascript
var express = require("express");
var app = express();
var jwt = require("express-jwt");
var jwks = require("jwks-rsa");
var port = process.env.PORT || 8080;
var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://{应用域名}.authing.cn/oidc/.well-known/jwks.json",
  }),
  audience: "{编程访问账号 ID}",
  issuer: "https://{应用域名}.authing.cn/oidc",
  algorithms: ["RS256"],
});
// 检验 AccessToken 合法性
app.use(jwtCheck);

app.post("/article", function (req, res) {
  // 检验 AccessToken 是否具备所需要的权限项目
  if (!req.user.scope.split(" ").incldues("write:article")) {
    return res.status(401).json({ code: 401, message: "Unauthorized" });
  }
  res.send("Secured Resource");
});

app.listen(port);
```

#### 资源方返回相关资源

如果调用方的请求通过了访问鉴权拦截器，那么资源方正常返回资源方请求的资源即可。
