---
noToc: true
lastUpdated: true
sidebarType: page
noPageNav: true
---

# Express integrated OIDC Single sign-in guide

## Express brief description

This article uses the Node.js platform Express framework as an example, and integrated Node.js authentication middleware Passport.js, how to integrate the authing oidc single sign-on.

OIDC protocol: OIDC (OpenID Connect) is an identity authentication standard protocol based on OAuth2 protocol. OIDC uses OAuth2 authorized servers to provide users' identity authentication for third-party clients, and pass the corresponding identity authentication information to the client, and can be applied to various types of clients.

Passport: Passport is the authentication middleware of Node.js, especially flexible and modular. It is very convenient to implant any Express-based web applications. Support authentication such as username password, Facebook and Twitter.

## Configure Authing OIDC application

Register from authing.cn and enter the Authing Console, create an OIDC application, configure application information.

The detailed configuration is as follows:

- Application name: <Application Name>
- Certified address: https://<Application domain name>.authing.cn
- Callback URL：Apply login post-callback address, for example：http://localhost:3004/auth/cb
- Authorized mode: default authorization_code、refresh_token、authing Token
- return Type: default code
- token Calculation mode: default client_secret_post
- id_token Signature algorithm: default HS256

After the configuration, the OIDC valid information is saved, which is Express to use.

- App ID：5f34e94bece50b891729e345
- App Secret：8226514d6740e5a9cd94fad4991e02e9
- Issuer：https://aj00.authing.cn/oauth/oidc
- Configuration information：https://aj00.authing.cn/oauth/oidc/.well-known/openid-configuration
- Callback address：http://localhost:3004/auth/cb

<img src="@imagesZhCn/integration/express/step.png" height=400 style="display:block;margin:50px auto;">

## integrated Authing OIDC application

1. Express building a local service
   ```javascript
   const express = require('express')
   var app = express()
   app.listen(3004, () => console.log(`Example app listening on port 3004!`))
   ```
2. Connect OIDC app, register 'oidc' strategy

   ```javascript
   const passport = require('passport')
   const { Strategy, Issuer } = require('openid-client')
   const config = {
     // oidc 配置信息
     appID: '5f34e94bece50b891729e345',
     appSecret: '8226514d6740e5a9cd94fad4991e02e9',
     issuer: 'https://aj00.authing.cn/oauth/oidc',
     configInfo:
       'https://aj00.authing.cn/oauth/oidc/.well-known/openid-configuration',
     callbackUrl: 'http://localhost:3004/auth/cb',
   }(async () => {
     const issuer = await Issuer.discover(config.configInfo) // 连接 oidc 应用
     const client = new issuer.Client({
       // 初始化 issuer 信息
       client_id: config.appID,
       client_secret: config.appSecret,
       id_token_signed_response_alg: 'HS256',
       token_endpoint_auth_method: 'client_secret_post',
     })
     const params = {
       redirect_uri: config.callbackUrl,
       scope: 'openid profile email phone',
       grant_type: 'authorization_code',
       response_type: 'code',
     }
     // possport register oidc strategy
     passport.use(
       'oidc',
       new Strategy({ client, params }, (tokenset, userinfo, done) => {
         return done(null, userinfo) // Return user information
       })
     )
   })()
   ```

3. Define OIDC access, callback, user information query and other interfaces

   ```javascript
   app.get('/auth', passport.authenticate('oidc'))
   app.get(
     '/auth/cb',
     passport.authenticate('oidc', {
       successRedirect: '/',
       failureRedirect: '/',
     })
   )
   app.get('/user', (req, res) => {
     res.send(req.user)
   })
   app.get('/', (req, res) => {
     res.send('home')
   })
   ```

4. In addition to the above core steps, store the sessions information, serialized user information, exit, etc., refer to the code files integrated with the complete expression of Express.

   ```javascript
   const express = require('express')
   const session = require('express-session')
   const passport = require('passport')
   const { Strategy, Issuer } = require('openid-client')
   const config = {
     appID: '5f34e94bece50b891729e345',
     appSecret: '8226514d6740e5a9cd94fad4991e02e9',
     issuer: 'https://aj00.authing.cn/oauth/oidc',
     configInfo:
       'https://aj00.authing.cn/oauth/oidc/.well-known/openid-configuration',
     callbackUrl: 'http://localhost:3004/auth/cb',
   }(async () => {
     const issuer = await Issuer.discover(config.configInfo)
     const client = new issuer.Client({
       client_id: config.appID,
       client_secret: config.appSecret,
       id_token_signed_response_alg: 'HS256',
       token_endpoint_auth_method: 'client_secret_post',
     })
     const params = {
       redirect_uri: config.callbackUrl,
       scope: 'openid profile email phone',
       grant_type: 'authorization_code',
       response_type: 'code',
     }
     var app = express()
     app.use(
       session({
         secret: 'keyboard cat',
         resave: true,
         saveUninitialized: true,
       })
     )
     app.use(passport.initialize())
     app.use(passport.session())
     passport.use(
       'oidc',
       new Strategy({ client, params }, (tokenset, userinfo, done) => {
         return done(null, userinfo)
       })
     )

     app.get('/auth', passport.authenticate('oidc'))
     app.get(
       '/auth/cb',
       passport.authenticate('oidc', {
         successRedirect: '/',
         failureRedirect: '/user',
       })
     )
     app.get('/user', (req, res) => {
       res.send(req.user)
     })
     app.get('/', (req, res) => {
       res.send('home')
     })
     app.get('/logout', (req, res) => {
       const logoutBaseURL = 'https://aj00.authing.cn/login/profile/logout'
       const appId = '5f17f5d6f64fb07b7094a41b'
       const logoutRedirectURL = 'http://localhost:3004'
       const logoutUrl = `${logoutBaseURL}?app_id=${appId}&redirect_uri=${logoutRedirectURL}`
       req.session.destroy()
       res.redirect(logoutUrl)
     })
     passport.serializeUser(function(user, done) {
       done(null, user)
     })
     passport.deserializeUser(function(id, done) {
       done(null, { client_id: id })
     })
     app.listen(3004, () => console.log(`Example app listening on port 3004!`))
   })()
   ```

## You may also need

Use passport-openidconnection
::: page-ref /en/frameworks/express-passport-openidconnection/
:::
