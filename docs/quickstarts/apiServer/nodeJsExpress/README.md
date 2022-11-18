---
noToc: true
lastUpdated: true
sidebarType: page
noPageNav: true
downloadDemo:
  title: 本页资源
  description: 下载一个 Node.js Express API Server 快速开始的示例程序或在 GitHub 查看。
  downloadUrl: https://github.com/Authing/m2m-demo-express/archive/refs/heads/master.zip
  jumpUrl: https://github.com/Authing/m2m-demo-express
---

# Node.js Express API Server 快速开始

本教程会引导你使用 Authing 保护你的应用 API 端点。

环境要求：Express 4+

## 配置 Authing

你需要在 Authing 中定义你的 API **权限项目**。API **权限项目**是**调用者**调用你的实际业务应用接口时必须具备的权限。调用者可以是另**一台服务器**，或者是**某个用户**。然后创建一对 AK、SK 密钥，并将权限项目赋予这对密钥。谁有这对密钥谁就具备了相应 API 的调用权限。

例如一个订单系统，调用者通过接口读取订单列表，他必须具备**订单的读取权限**，所以就应该创建一个**读取订单**的权限项目，然后创建一对**密钥**，并将这个权限赋予这个密钥，再将密钥交给调用方。

### 创建应用

首先需要创建一个应用。

![](~@imagesZhCn/quickstarts/create-app.png)

**认证地址**填写一个域名，作为这个应用在 Authing 的唯一标识。

![](~@imagesZhCn/quickstarts/spa/create-app-2.png)

在应用列表找到你的应用，进入应用详情。在下方的「其他配置」模块中，**id_token 签名算法**选择 **RS256**，然后点击保存。

![](~@imagesZhCn/quickstarts/webApp/config-RS256.png)


### 创建权限项目

在应用详情页面，点击「访问授权」选项卡，在下方「API 资源」卡片点击添加。

![](~@imagesZhCn/quickstarts/apiServer/create-resource-1.png)

填写资源名称：order，资源描述：订单，API 接口的 URL 地址：`http://localhost:5000/api/protected`，为资源定义一个**操作**，本教程为**订单资源**定义一个**读取操作**，点击添加操作，操作类型填 `read`，描述填读取订单。最后点击保存。

![](~@imagesZhCn/quickstarts/apiServer/create-resource-2.png)

### 创建 AK、SK

在下一个卡片，点击**编程访问**，点击右侧的「添加」。

![](~@imagesZhCn/quickstarts/apiServer/create-ak-sk-1.png)

在弹出的窗口点击「创建」，之后会生成一对密钥。

![](~@imagesZhCn/quickstarts/apiServer/create-ak-sk-2.png)

### 定义 AK、SK 具备的权限项目

在「资源授权」选项卡点击右侧的「添加」。

![](~@imagesZhCn/quickstarts/apiServer/authz-1.png)

**被授权主体类型**选择**编程访问账号**，**被授权主体**下拉菜单选择刚刚创建的密钥，**授权作用**选择允许，**资源类型**选择刚刚定义的订单资源，**资源标识符**保留默认，**操作**选择特定操作，选择读取订单操作。最后点击确定。

![](~@imagesZhCn/quickstarts/apiServer/authz-2.png)

到此完成了为 AK、SK 密钥赋予权限的操作。接下来可以将这对密钥交给**调用方**，这样他就有了访问订单列表接口的权限。

## 保护 API 端点

为了保护业务应用的接口，显然只在 Authing 定义一番接口权限而不改造系统是没有效果的，必须在业务应用里面添加代码。我们基于这样的思路保护 API 接口：调用者**找 Authing 签发 Access token**，然后调用者**携带 Access token 访问业务系统接口**，业务系统接口**检验 Access token 合法性**，并**验证其中的权限项目**，通过后再返回数据。

整体的序列图如下：

![](~@imagesZhCn/quickstarts/apiServer/sequence.png)

### 修改 Demo 配置

如果你下载了[示例 Demo 代码](https://github.com/Authing/m2m-demo-express)，需要修改 app.js，修改配置为你的应用配置：

```js
// 授权中间件，Access token 必须存在，并且能被 Authing 应用公钥验签
const checkJwt = jwt({
  // 从 Authing 应用服务发现地址动态获取验签公钥
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://{AUTHING_APP_HOST}.authing.cn/oidc/.well-known/jwks.json`
  }),

  // 验证受众和颁发者
  audience: 'APP_ID',
  issuer: [`https://{AUTHING_APP_HOST}.authing.cn/oidc`],
  algorithms: ['RS256']
});
```

然后运行以下命令启动项目：

```bash
$ npm install
$ npm start
```



### 安装依赖包

这一节讲解如何使用 [express-jwt](https://github.com/auth0/express-jwt) 中间件验证 Access token 合法性，以及如何使用 [express-jwt-authz](https://github.com/auth0/express-jwt-authz) 中间件检查 Access token 的权限项目。
为了使用应用的公钥验证 Access token，你可以使用 [jwks-rsa](https://github.com/auth0/node-jwks-rsa) 包从 Authing 拉取应用公钥。
运行以下命令，安装依赖：

```bash
$ npm install --save express-jwt jwks-rsa express-jwt-authz
```

### 验证 Access token

配置 [express-jwt](https://github.com/auth0/express-jwt) 中间件使用你的**应用公钥**来验证 Access token 合法性。

```js
const express = require('express');
const app = express();
const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');

// 认证中间件，为路由添加后，访问者必须携带 Access token，且可以被 Authing 应用公钥验签
const checkJwt = jwt({
  // 动态从 Authing 获取验签公钥
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://{AUTHING_APP_HOST}.authing.cn/.well-known/jwks.json`,
  }),

  // 验证受众和颁发者
  audience: '编程访问账号 AK',
  issuer: [`https://{AUTHING_APP_HOST}.authng.cn/oidc`],
  algorithms: ['RS256'],
});
```

checkJwt 中间件会检验请求中携带的 Access token 合法性，如果不合法会返回 401 错误。checkJwt 中间件不会检验 Access token 中的权限项目，下面我们看如何检验 Access token 中的权限项目。

### 验证权限项目

checkJwt 中间件会检验请求中携带的 Access token 合法性，但光知道了调用者是谁还不够，还需要看**调用者有没有访问接口的权限**。
我们在 checkJwt 中间件之后再检验 Access token 中的权限项目，此处我们检查调用者是否具有 `order:read` 权限项目，如果没有，就拒绝请求。

```js
const checkScopes = jwtAuthz(['order:read']);

app.get('/api/private-scoped', checkJwt, checkScopes, async (req, res)  => {
  res.json({
    message: '受保护的接口',
  });
});
```

恭喜 🎉，现在你的应用接口安全了，每次会检验来访者的 Access token 合法性和权限项目。接下来我们从调用者的角度访问这个 API 端点。

## 调用 API 端点

调用 API 端点时，需要考虑一件事：这个接口只要知道调用者是来自哪个服务器的请求就可以了，还是需要知道调用者具体是哪个用户。



### 获取 Access token

在发起 API 调用之前，需要 **先获取 Access token**。如果你在单页 Web 应用或客户端应用中完成登录，会得到一个 Access token，可以携带这个 Access token 调用 API。详情请查看：

- [React 单页 Web 应用快速开始](../../spa/react.md#调用资源-api)

如果你要在命令行工具或其他服务端应用请求 API 端点，你需要使用上文提到的 AK、SK 密钥对，通过 OIDC Client Credentials 模式获取 Access token。以下是获取 token 的方式：

<StackSelector snippet="get-access-token" selectLabel="选择语言" :order="['curl', 'javascript']"/>


### 携带 Access token 请求 API

首先我们不带任何 token 访问 API，会得到 401 错误信息。

![](~@imagesZhCn/quickstarts/apiServer/res-1.png)

如果我们携带 Access token，但 Access token 中不包括 API 所需的全部权限项目，会收到 403 错误信息。

```bash
$ curl -i --request GET \
  --url http://localhost:5000/api/protected \
  --header 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlRmTE90M0xibjhfYThwUk11ZXNzYW1xai1vM0RCQ3MxLW93SExRLVZNcVEifQ.eyJqdGkiOiJTUWxFSGRzTk54MDc4TThwT1R6djMiLCJpYXQiOjE2MTk1MzA4MzQsImV4cCI6MTYxOTUzNDQzNCwic2NvcGUiOiJvcGVuaWQiLCJpc3MiOiJodHRwczovL29pZGMxLmF1dGhpbmcuY24vb2lkYyIsImF1ZCI6IjYwNTA3NTFhZWQwZjI5YmY3NzIzYzdhOCIsImF6cCI6IjVmMTdhNTI5ZjY0ZmIwMDliNzk0YTJmZiJ9.QsthJdDM5TNtfQOAzy6EwuedK9r03SzkgE2GQkQCLv8SZJhg-tOIKzHqjDDUmRTkJPLl3HHQTUAzfS3UUYwOiah3smiYF7ynx6jukaoGyHTIgXXwavUVmD5j-mnD3kZrLAo-dh5BLBQfLiiE_WlOkQvnKC160K9ETuwQlhx1TGJts0-sMsjsiRx28EJvdrdWw8CVHGiQVzvCE6kHkYmkO6VTkgEnHNqpRpdB0IysIeKUOWezgGZE-Dmtyam6c8nXW_lr798B194zVyjSOuwGt1tqEfRpBDYiD_ER29aWjH2UbI0pjko_15Ldqno9RgehTJXv5suQ6zdfrER-6b5Bmg'
```

![](~@imagesZhCn/quickstarts/apiServer/res-2.png)

只有当我们携带**具备 API 所需的全部权限项目的 Access token** 访问接口时，才能通过检验，收到服务器的返回数据。

![](~@imagesZhCn/quickstarts/apiServer/res-3.png)

接下来你可能需要

了解 Authing 资源权限模型：
::: page-ref /guides/access-control/
:::

学习 Token 验签原理：
::: page-ref /guides/faqs/how-to-validate-user-token.md
:::

在 React 单页 Web 应用调用 API：
::: page-ref /quickstarts/spa/react.md
:::