---
noToc: true
lastUpdated: true
sidebarType: page
noPageNav: true
downloadDemo:
  title: 本页资源
  description: 下载一个 Node.js Express Web App 快速开始的示例程序或在 GitHub 查看。
  downloadUrl: https://github.com/Authing/mvc-demo-express/archive/refs/heads/master.zip
  jumpUrl: https://github.com/Authing/mvc-demo-express
---

# Express Web App 快速开始

本教程讲述在 Express 框架下处理用户登录、检查登录状态、获取用户信息、登出的方式。

环境要求：Express 4+

## 配置 Authing

你需要先在 Authing 创建一个应用。进入[**控制台**](https://console.authing.cn) > **应用**，点击右上角的「添加应用」。

![](~@imagesZhCn/quickstarts/create-app.png)

**认证地址**填写一个域名，作为这个应用在 Authing 的唯一标识。

![](~@imagesZhCn/quickstarts/webApp/create-app-2.png)

在应用列表找到你的应用，进入应用详情。在右方的「高级配置」模块中，**id_token 签名算法**选择 **RS256**，然后点击保存。

### 配置登录回调地址

当用户在 Authing 完成认证后，Authing 会将用户重定向到回调地址。必须在这里**配置回调地址白名单**，否则用户会遇到回调地址不匹配的错误信息。本教程需要用到的回调地址是 `http://localhost:5000/callback` 请在「应用配置」模块下方「URL设置」卡片的登录回调地址中粘贴此链接。

![](~@imagesZhCn/quickstarts/set-url-1.png)
![](~@imagesZhCn/quickstarts/set-url.png)

### 配置登出回调地址

当用户在 Authing 完成退出后，Authing 会将用户重定向到登出回调地址。必须在这里**配置登出回调地址白名单**，否则用户会遇到登出回调地址不匹配的错误信息。本教程需要用到的回调地址是 `http://localhost:5000` 请在「应用配置」模块下方「URL设置」卡片的登出回调地址中粘贴此链接。

![](~@imagesZhCn/quickstarts/set-url-1.png)
![](~@imagesZhCn/quickstarts/set-url.png)

### 记录应用信息

记录以下信息：

- 应用 ID
- 应用密钥
- 应用域名

![](~@imagesZhCn/quickstarts/save-app-info.png)

## 集成 Authing

### 修改 Demo 配置

如果你下载了[示例 Demo 代码](https://github.com/Authing/mvc-demo-express)，需要修改 app.js 第 7 行，修改配置为你的应用配置。
> 该示例代码环境为 Linux/Mac OS，Windows 环境无法直接使用

```js
const authing = new AuthenticationClient({
  appId: 'AUHTING_APP_ID',
  secret: 'AUHTING_APP_SECRET',
  appHost: 'https://{AUHTING_APP_HOST}.authing.cn',
  redirectUri: 'AUTHING_APP_REDIRECTURI'
});
```

然后运行：

```bash
$ npm install
$ npm start
```

### 安装 SDK

在你的应用项目中安装 authing-js-sdk 包。然后初始化一个 SDK 实例。

```bash
$ npm install authing-js-sdk
```

```js
const { AuthenticationClient } = require('authing-js-sdk');
const authing = new AuthenticationClient({
  appId: 'AUHTING_APP_ID',
  secret: 'AUHTING_APP_SECRET',
  appHost: 'https://{AUHTING_APP_HOST}.authing.cn',
  redirectUri: 'AUTHING_APP_REDIRECTURI'
});
```

Authing JS SDK 接收以下参数：

- appId，应用 ID，可以在应用详情页面获得。
- secret，应用密钥，可以在应用详情页面获得。
- appHost：应用认证地址，将 应用域名 替换为你的应用实际的域名。
- redirectUri：应用回调地址，在 Authing 完成认证后跳回的地址。必须在控制台回调地址白名单提前配置，**随意填写一定会报错！**

### 安装 Session 包

本教程使用 express-session 维护应用自身的登录态。

```bash
$ npm install express-session
```

在应用项目中启用 session。

```js
app.use(
  session({
    secret: 'a very long random string',
    resave: true,
    saveUninitialized: false,
  })
);
```

### 配置路由

为了给应用添加认证能力，需要监听三个路由：**登录**、**回调**、**登出路由**。

#### 发起登录

监听 /login 端点，当用户访问 http://localhost:5000/login 时，将用户重定向到 Authing 完成认证。

```js
app.get('/login', async (req, res) => {
  const url = authing.buildAuthorizeUrl();
  res.redirect(url);
});
```

#### 处理回调

监听 /callback 端点，当用户在 Authing 完成认证后，Authing 会将用户重定向到回调地址。在回调地址可以获取用户信息，并将用户重定向到应用的其他页面。

```js
app.get('/callback', async (req, res) => {
  const { code } = req.query;
  const tokenSet = await authing.getAccessTokenByCode(code);
  const { access_token, id_token } = tokenSet;
  const userInfo = await authing.getUserInfoByAccessToken(access_token);
  req.session.user = { ...userInfo, tokenSet };
  res.redirect('/');
});
```

#### 登出

监听 /logout 端点，用户访问 http://localhost:5000/logout 时，将用户从当前应用退出，将用户从 Authing 退出。

```js
app.get('/logout', async (req, res) => {
  const url = authing.buildLogoutUrl({ expert: true, idToken: req.session.user.tokenSet.id_token, redirectUri: 'http://localhost:5000' });
  req.session.destroy();
  res.redirect(url);
});
```

## 登录

用户可以通过访问 http://localhost:5000/login 登录。

## 展示用户信息

为了能够展示用户信息，你的应用需要一个受保护的路由。只有登录的用户可以访问，并看到自己的信息。

```js
app.get('/profile', async (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  res.send(JSON.stringify(req.session.user, null, 4));
});
```

## 登出

用户可以访问 http://localhost:5000/logout 从你的应用登出，并从 Authing 登出。

## 接下来你可能需要

调用其他资源 API：
::: page-ref /quickstarts/apiServer/nodeJsExpress/
:::

自建应用 SSO 方案：
::: page-ref /guides/app-new/sso/
:::
