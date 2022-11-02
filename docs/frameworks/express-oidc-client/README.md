---
 noToc: true
 lastUpdated: true
 sidebarType: page
 noPageNav: true
---

# Express 集成 OIDC 单点登录指南

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

- App ID：如 63478e2xxxxd84e7
- App Secret：如 266206xxxx079d96c0e46
- Issuer：如 http://api-test.authing.localhost:3000/oidc
- 服务发现地址：如 http://api-test.authing.localhost:3000/oidc/.well-known/openid-configuration
- 回调地址：如 http://localhost:3004/auth/cb

<img src="@imagesZhCn/integration/express/step.png" height=400 style="display:block;margin:50px auto;">

## 集成 Authing OIDC 应用
**示例项目**：https://jihulab.com/authing/developer/wangzhilin/express-oidc-client-demo

1. 安装依赖。

    ```yaml
    yarn add express passport openid-client express-session
    ```
2. 在 src 目录下创建 index.js 文件，Express 搭建本地服务。
    ```javascript
    const express = require('express');
    var app = express();
    app.listen(3004, () => console.log(`Example app listening on port 3004!`))
    ```
3. 连接 OIDC 应用，注册 'oidc' 策略。

    ```javascript
    const passport = require('passport');
    const { Strategy, Issuer } = require('openid-client');
    const config = { // oidc 配置信息
            appID:'{替换成你的 App ID: 如 5f34e94bexxxxx29e34}',
            appSecret:'{替换成你的 App Secret: 如 8226514dxxxxxxad4991e02e9}',
            issuer:'{替换成你的 issuer: 如 https://aj00.authing.cn/oauth/oidc}',
            configInfo:'{替换成你的服务发现地址: 如 https://aj00.authing.cn/oauth/oidc/.well-known/openid-configuration}',
            callbackUrl:'{替换成你的回调地址: 如 http://localhost:3004/auth/cb}'
    };
    
    (async () => {
        const issuer = await Issuer.discover(config.configInfo) // 连接 oidc 应用
        const client = new issuer.Client({ // 初始化 issuer 信息
            client_id: config.appID,
            client_secret: config.appSecret,
            id_token_signed_response_alg: 'HS256',
            token_endpoint_auth_method: 'client_secret_post',
        });
        const params = {
            redirect_uri: config.callbackUrl,
            scope: 'openid profile email phone',
            grant_type: 'authorization_code',
            response_type: 'code',
        }
        // possport 注册 oidc 策略
        passport.use('oidc', new Strategy({ client, params }, (tokenset, userinfo, done) => {
            return done(null, userinfo); // 返回用户信息
        }));
    })()
    
    ```

4. 定义 OIDC 访问、回调、用户信息查询等接口。

    ```javascript
    app.get('/auth', passport.authenticate('oidc'));
    app.get('/auth/cb', passport.authenticate('oidc', {
        successRedirect: '/',
        failureRedirect: '/',
    }));
    app.get('/user', (req, res) => {
        res.send(req.user)
    })
    app.get('/', (req, res) => {
        res.send("home")
    })
    
    ```

5. 除了以上核心步骤，存储 sesssion 信息、序列化用户信息、退出等内容，请参考以下本文完整的 Express 集成 Authing OIDC 的代码文件。

    ```javascript
    const express = require('express');
    const session = require('express-session');
    const passport = require('passport');
    const { Strategy, Issuer } = require('openid-client');
    const config = {
            appID:'{替换成你的 App ID: 如 5f34e94bexxxxx29e34}',
            appSecret:'{替换成你的 App Secret: 如 8226514dxxxxxxad4991e02e9}',
            issuer:'{替换成你的 issuer: 如 https://aj00.authing.cn/oauth/oidc}',
            configInfo:'{替换成你的服务发现地址: 如 https://aj00.authing.cn/oauth/oidc/.well-known/openid-configuration}',
            callbackUrl:'{替换成你的回调地址: 如 http://localhost:3004/auth/cb}'
    };
    
    (async () => {
    
     const issuer = await Issuer.discover(config.configInfo)
        const client = new issuer.Client({
            client_id: config.appID,
            client_secret: config. appSecret,
            id_token_signed_response_alg: 'HS256',
            token_endpoint_auth_method: 'client_secret_post',
        });
        const params = {
            redirect_uri: config.callbackUrl,
            scope: 'openid profile email phone',
            grant_type: 'authorization_code',
            response_type: 'code',
        }
        var app = express();
        app.use(session({
            secret: 'keyboard cat',
            resave: true,
            saveUninitialized: true}));
        app.use(passport.initialize());
        app.use(passport.session());
        passport.use('oidc', new Strategy({ client, params }, (tokenset, userinfo, done) => {
            return done(null, userinfo);
        }));
    
        app.get('/auth', passport.authenticate('oidc'));
        app.get('/auth/cb', passport.authenticate('oidc', {
            successRedirect: '/',
            failureRedirect: '/user',
        }));
        app.get('/user', (req, res) => {
            res.send(req.user)
        })
        app.get('/', (req, res) => {
            res.send("home")
        })
        app.get('/logout', (req, res) => {
            const logoutBaseURL = 'https://aj00.authing.cn/login/profile/logout'
            const appId = '5f17f5d6f64fb07b7094a41b'
            const logoutRedirectURL = 'http://localhost:3004'
            const logoutUrl = `${logoutBaseURL}?app_id=${appId}&redirect_uri=${logoutRedirectURL}`
            req.session.destroy();
            res.redirect(logoutUrl)
        })
        passport.serializeUser(function (user, done) {
            done(null, user);
        });
        passport.deserializeUser(function (id, done) {
            done(null, { client_id: id });
        });
        app.listen(3004, () => console.log(`Example app listening on port 3004!`))
    })()
    
    ```

## 启动测试验证
1. 控制台输入 node src/index.js 启动项目。
2. 启动后访问 3004 端口， http://localhost:3004/ 显示 home 表示启动成功。
- 登录： http://localhost:3004/auth，跳转 Authing 登录组件，登录认证成功后跳转到 home 页面，否则跳转到用户信息页面（认证失败时核对下 Authing 配置是否与上述相符）。
- 查看用户信息： http://localhost:3004/user，未登录认证成功或退出登录后显示为空白，已登录显示为 json 格式用户数据。
- 退出登录： http://localhost:3004/logout，退出登录后跳转到 home 页面。
## 你可能还需要

使用 passport-openidconnect 集成
::: page-ref /frameworks/express-passport-openidconnect/
:::
