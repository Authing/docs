---
 ##noToc: true
 lastUpdated: true
 ##sidebarType: page
 noPageNav: true
---

# Express 集成 Passport OpenIdConnect 单点登录指南

## Express 简述
本文以基于 Node.js 平台 Express 框架为例，以及集成 Node.js 身份认证中间件 Passport.js，详细介绍 Express 如何集成 Authing OIDC 单点登录。

OIDC 协议：OIDC（OpenID Connect）是一个基于 OAuth2 协议的身份认证标准协议。OIDC 使用 OAuth2 的授权服务器来为第三方客户端提供用户的身份认证，并把对应的身份认证信息传递给客户端，且可以适用于各种类型的客户端。

Passport ：Passport 是 Node.js 的认证中间件，特别灵活和模块化。可非常方便的植入任意基于 Express 的 Web 应用。支持用户名密码、Facebook 和 Twitter 等认证。

## 配置 Authing OIDC 应用
从 authing.cn 注册并进入 Authing 控制台，创建 OIDC 应用，配置应用信息。

详细配置如下：
- 应用名: <应用名称>
- 认证地址：https://<应用域名>.authing.cn
- 回调 URL：应用登录后回调地址，例如：http://localhost:3004/auth/cb
- 授权模式：默认 authorization_code、refresh_token、authing Token
- 返回类型：默认 code
- token 换取时认证方式：默认 client_secret_post
- id_token 签名算法：默认 HS256

配置后，同时保存 OIDC 有效信息，便于后文 Express 集成使用。

- App ID：5f34e94bece50b891729e345
- App Secret：8226514d6740e5a9cd94fad4991e02e9
- Issuer：https://aj00.authing.cn/oauth/oidc
- 配置信息：https://aj00.authing.cn/oauth/oidc/.well-known/openid-configuration
- 回调地址：http://localhost:3004/auth/cb

<img src="@imagesZhCn/integration/express/step.png" height=400 style="display:block;margin:50px auto;">


## 集成 Authing OIDC 应用

TodoMVC 示例项目： https://github.com/Authing/todos-express-openidconnect

### 1. 安装依赖

```bash
npm install --save passport passport-openidconnect
```

### 2. 配置 Passport
参考示例项目的 `routes/auth.js`：

```js
// FIXME: 修改配置，保持与 Authing 控制台中配置一致
passport.use(new OpenIDConnectStrategy({
  // 将二级域名前缀 passport-authing 改为你自己的应用域名
  issuer: 'https://passport-authing.authing.cn/oidc',
  authorizationURL: 'https://passport-authing.authing.cn/oidc/auth',
  tokenURL: 'https://passport-authing.authing.cn/oidc/token',
  userInfoURL: 'https://passport-authing.authing.cn/oidc/me',
  // 可以将 App ID 和 App Secret 放到 .env 文件中或环境变量中
  clientID: '6205d4e5dd728952be979ca1',
  clientSecret: 'eb578704fdc0273dd78d4ea38995ea27',
  // 这里忽略了域名， Authing 控制台中需要配置完整的 URL 
  callbackURL: '/oauth2/redirect',
  scope: [ 'profile' ],
  state: true
},
function verify(issuer, profile, cb) {
  // 可以在此处校验用户是否存在并插入到你的应用数据库中
  return cb(null, profile);
}));
```

### 3. 配置会话

参考示例项目的 `app.js`：

```js
// FIXME: Passport 会话存储在 Session 中，可以替换其他
app.use(passport.authenticate('session'));
```

### 4. 配置路由

参考示例项目的 `routes/auth.js`：

```js
router.get('/login', passport.authenticate('openidconnect'));

router.get('/oauth2/redirect', passport.authenticate('openidconnect', {
  successReturnToOrRedirect: '/',
  failureRedirect: '/login'
}));

router.post('/logout', function(req, res, next) {
  req.logout();
  // 注意这里是 SSO 退出所有应用，如果没有需要，可以直接返回 `/`
  res.redirect('https://passport-authing.authing.cn/login/profile/logout?redirect_uri=' + encodeURIComponent('http://localhost:3000/'));
});
```

### 5. 可选：序列化用户数据

可以根据你的数据库字段做匹配的序列化操作：

```js
passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    // 详细字段参考： https://docs.authing.cn/v2/guides/user/user-profile.html
    cb(null, { id: user.id, username: user.username, name: user.nickname });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});
```

详细用户字段参考
::: page-ref /guides/user/user-profile.md
:::

## 参考资料

- https://www.passportjs.org/docs/
- https://www.passportjs.org/packages/passport-openidconnect/


## 你可能还需要

使用 OIDC Client 集成
::: page-ref /frameworks/express-oidc-client/
:::
