# M2M 授权

<LastUpdated/>

M2M（Machine to Machine）授权是**无用户参与**的应用间授权。当你想要将自己的业务 API 部分地开放给其他人，例如你的外包商，外包商需要先进行 **M2M 授权**，然后才能访问你的业务 API。假如你的公司希望开发一些数据的大屏展示，并有几个外包商参与其中。你希望将某些非核心数据的 API 访问权限授权给外包商，让外包商完成这部分的非核心开发。此时需要 M2M 授权，因为这个过程中不需要用户参与，我们只需要确定来访者是哪个外包商，以及他有哪些接口的访问权限。

以下是该场景的架构图，外包商先到 Authing 获取 Access Token，然后携带 Access Token 访问公司服务的 API 接口：
![](~@imagesZhCn/guides/authorization/m2m-arch.png)

## 权限管理与分配

在 Authing 创建一个应用，叫做「大屏展示」。

![](./images/create-screen-app.png)

在「大屏展示」应用下定义一些资源，每个资源对应「大屏展示」应用中实际的资源。这里我们添加一些资源，包括用户增长（user-growth）、客户（customer）、公告（announce）、营收（revenue）。这些资源的名称就是 **API scope**。

![](./images/add-resource.png)

![](./images/add-user-growth.png)

![](./images/add-customer.png)

![](./images/add-announce.png)

![](./images/add-revenue.png)

定义完资源和操作之后，接下来为应用添加**编程访问账号**，**编程访问账号**就是当前应用 API 接口的**调用方**。**编程访问账号**有一对 **AK 和 SK**，用于交给外包商调用「大屏展示」应用接口。我们可以将具备不同权限的 AK、SK 交给不同的外包商，这样他们就有不同的权限，能够访问不同的 API。

![](./images/create-programmatic-account-1.png)

创建两个编程访问账号，填写 AccessToken 过期时间和备注信息，点击确定。

![](./images/create-programmatic-account-2.png)

![](./images/create-programmatic-account-3.png)

如果将编程访问账号删除，调用方将会失去获取用户授权的能力。

### AccessToken 过期时间

当你创建编程访问账号时，需要指定 AccessToken 过期时间。Authing 在颁发 AccessToken 时使用 RS256 签名算法进行签名，以确保 AccessToken 不会被篡改。
> Token 签名是 JWT 中的一部分，更多内容请参考 [JWT 释义及使用](/concepts/jwt-token.md)。

RS256 是一种非对称签名算法，Authing 持有私钥对 Token 进行签名，JWT 的消费者使用公钥来验证签名。RS256 签名算法，有以下好处：

1. 任何人都可以使用应用公钥验证签名，签名方一定是 Authing。
2. 无私钥泄露风险，如果你使用 HS256 但泄露了应用密钥，需要刷新密钥并重新部署所有 API。

关于签名问题更多内容请参考[验证 Token](/guides/faqs/how-to-validate-user-token.md)。

我们刚刚创建了两个编程访问账号，将来需要交给外包商。

![](./images/ak-sk-res.png)

下面我们需要赋予他们资源权限。在资源授权选项卡，点击添加。

![](./images/add-acl-1.png)

被授权主体类型选择**编程访问账号**，然后选择甲外包公司的编程访问账号账号。

![](./images/m2m-acl-2.png)

授权规则中，**资源类型**选择公告信息，**资源标识符**填写 `*` 代表授权**所有公告资源**，操作选择**特定操作**，然后选择 announce:read 操作。最后点击确定。这条规则的作用是：将**所有**公告信息资源的**读取**权限授权给甲外包公司。

![](./images/m2m-acl-3.png)

接下来我们为乙外包商添加授权，首先选择乙外包商的编程访问账号。

![](./images/m2m-acl-4.png)

接下来，我们要添加三个规则：

1. 将 2019 年的用户增长数据所有操作权限授权给乙外包商。点击右上方的添加授权规则可以添加多条规则。

![](./images/m2m-acl-5.png)

2. 将所有营收记录的创建、读取、修改权限授权给乙外包商。

![](./images/m2m-acl-6.png)

3. 将所有客户记录的读取权限授权给乙外包商。

![](./images/m2m-acl-7.png)

到此管理员进行权限管理的操作就全部结束了，下面我们从**调用方**和**资源方**的角度进行 M2M 授权最佳实践。

## 获取具备权限的 AccessToken

**OIDC 授权框架**提供了许多种授权模式。在本场景中，获取用户的增长信息属于 **M2M**（机器对机器）授权，没有用户的参与，调用方以自己的身份去访问资源服务器的 API 接口，这里需要使用 **OIDC ClientCredentials 模式**。

通过 OIDC ClientCredentials 授权模式，调用方需要向 Authing 提供他的 ClientCredentials（也就是**编程访问账号**的 Key 和 Secret）和需要请求的权限 scope（也就是**资源标识符**）来直接获得一个具有该 API 权限的 AccessToken。

![](./images/m2m-flow.png)

1. 调用方发送**编程访问账号**的 Key、Secret 和需要请求的**权限项目 scope** 到 Authing。
2. Authing 验证**编程访问账号** Key 和 Secret。
3. Authing 根据管理员配置的权限规则校验 scope 权限项目，签发一个**具备访问资源权限**的 AccessToken，被拒绝的权限 scope **不会**出现在 AccessToken 里。
4. 调用方携带 AccessToken 访问资源服务器。
5. 资源服务器返回受保护资源。

调用方为了能够访问受保护的 API 接口，必须先**获取一个具备权限的 AccessToken**。为此，调用方需要向以下地址发送 POST 请求。

请求地址：`https://{应用域名}.authing.cn/oidc/token`

参数说明：

| 参数名        | 描述  |
| ------------- | ------------ |
| grant_type    | 填写 client_credentials。        |
| client_id     | 编程访问账号 Key。    |
| client_secret | 编程访问账号 Secret。   |
| scope         | 请求的权限项目，每个权限项目的格式为 `资源标识符:操作` 以空格分隔。 |

响应结果：

```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjF6aXlIVG15M184MDRDOU1jUENHVERmYWJCNThBNENlZG9Wa3VweXdVeU0ifQ.eyJqdGkiOiJ2S1ZGV3FKemltTm5MSTlYZy0zam0iLCJpYXQiOjE2MTI1MDA2OTgsImV4cCI6MTYxMjUwNDI5OCwic2NvcGUiOiJib29rIiwiaXNzIjoiaHR0cHM6Ly9zdGVhbS10YWxrLmF1dGhpbmcuY24vb2lkYyIsImF1ZCI6IjYwMWJmMzVhY2E1ZDM4NzVjNDY3NDgyYyIsImF6cCI6IjYwMTkzYzYxMGY5MTE3ZTdjYjA0OTE1OSJ9.DS0l6zdlr_bGLqmDQRxvHUL4fmyLS5je6bqUCSSo06OIWSfcDZMZAqH5aYXP7Hzm4SiT6sfOCP_IiPSOxJPgFPYAmQTPSvJ5e6zs9jNeZyep_O6NWjlOGbDirskZE1pSZO_16ceiFr3jprSp13ff6O6Fa9YkY-8b_L3ouDqKhtb_4051pWZif-VzgXSkmvflTmqauJul9b5PzaeGWL-PKOrHrUiHjJwf9wqtR-3C8voFmi9pmxrUJYGSJoxwcxxSEceUY3d9oJU3v7e6FOnT_EMxfQCrAgzXR21bOitsAutOVXg1N9H0QJiNBESorCcj6yi1fVePTeDI5nY6xj9oDw",
  "expires_in": 3600,
  "token_type": "Bearer",
  "scope": "book",
  "rejected_scope": "message table"
}
```

示例代码：

```js
const axios = require('axios').default;
const options = {
  method: 'POST',
  url: 'https://{应用域名}.authing.cn/oidc/token',
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  data: {
    grant_type: 'client_credentials',
    client_id: '{编程访问账号 Key}',
    client_secret: '{编程访问账号 Secret}',
    scope: '{权限项目，空格分隔}',
  },
};

axios
  .request(options)
  .then(function(response) {
    console.log(response.data);
  })
  .catch(function(error) {
    console.error(error);
  });
```

我们只将公告信息的读取权限授权给了 A 外包公司，如果 A 外包公司请求授权时，携带了其他 scope，例如：`announce:read announce:update revenue:read customer user-growth:read` 。Authing 会拒绝掉除了 `announce:read` 的所有权限。以下是 A 外包公司请求授权时的返回结果。被拒绝的权限在 `rejected_scope` 中。

![](~@imagesZhCn/guides/authorization/client-credentials-result.png)

AccessToken 的信息中包含权限 scope：

![](~@imagesZhCn/guides/authorization/client-credentials-token.png)

我们再来看 B 外包商的授权，如果 B 外包商想请求以下 scope：`user-growth:2020:read` `user-growth:2019:*` `user-growth:2019:read` `revenue:create` `revenue:*:read` `customer:read`

Authing 的返回结果如下：

![](~@imagesZhCn/guides/authorization/client-credentials-result-2.png)

需要注意的是，管理员只授权了 2019 年用户增长数据的所有权限给 B 外包公司，所以当请求 2020 年的用户增长数据的 scope 被拒绝。

### Scope 权限项目规范

Authing 的 scope 权限项目以**空格分隔**，每一项的格式是`资源标识符:资源操作`。

以下是 Authing 支持的所有 scope 格式：

`book:1:read` 含义为编号为 1 的书籍资源的读取权限

`book:*:read` 含义为所有书籍资源的读取权限

`book:read` 含义为所有书籍资源的读取权限

`book:*:*` 含义为所有书籍资源的所有操作权限

`book:*` 含义为所有书籍资源的所有操作权限

`book` 含义为所有书籍资源的所有操作权限

`*:*:*` 含义为所有资源的所有操作权限

`*:*` 含义为所有资源的所有操作权限

`*` 含义为所有资源的所有操作权限

## 添加 API 鉴权拦截器

在 Authing 定义了 API 之后，你需要在你的实际业务 API 接口增加 API 鉴权拦截器，对于受保护的资源，只放行携带了合法的 AccessToken 且具备所需权限的来访者。
代码示例如下：

```javascript
var express = require('express');
var app = express();
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');
var port = process.env.PORT || 8080;
var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://{应用域名}.authing.cn/oidc/.well-known/jwks.json',
  }),
  audience: '{编程访问账号 ID}',
  issuer: 'https://{应用域名}.authing.cn/oidc',
  algorithms: ['RS256'],
});
// 检验 AccessToken 合法性
app.use(jwtCheck);

app.post('/article', function(req, res) {
  // 检验 AccessToken 是否具备所需要的权限项目
  if (!req.user.scope.split(' ').incldues('write:article')) {
    return res.status(401).json({ code: 401, message: 'Unauthorized' });
  }
  res.send('Secured Resource');
});

app.listen(port);
```

有关 Token 检验的其他内容请参考[验证 Token](/guides/faqs/how-to-validate-user-token.md)。
