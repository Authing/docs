
# Express integrated Passport OpenIdConnect Single sign-in guide

## Express brief description

This article uses the Node.js platform Express framework as an example, and integrated Node.js authentication middleware Passport.js, how to integrate the authing oidc single sign-on.

OIDC protocol: OIDC (OpenID Connect) is an identity authentication standard protocol based on OAuth2 protocol. OIDC uses OAuth2 authorized servers to provide users' identity authentication for third-party clients, and pass the corresponding identity authentication information to the client, and can be applied to various types of clients.

Passport: Passport is the authentication middleware of Node.js, especially flexible and modular. It is very convenient to implant any Express-based web applications. Support authentication such as username password, Facebook and Twitter.

## Configure Authing OIDC application

Register from authing.cn and enter the Authing Console, create an OIDC application, configure application information.

The detailed configuration is as follows:

- Application name: Application Name
- Certified address: https://App_Domain_Name.authing.cn
- Callback URL: Apply login post-callback address, for example: http://localhost:3004/auth/cb
- Authorized mode: default authorization_code、refresh_token、authing Token
- return Type: default code
- token Calculation mode: default client_secret_post
- id_token Signature algorithm: default HS256

After the configuration, the OIDC valid information is saved, which is Express to use.

- App ID: 5f34e94bece50b891729e345
- App Secret: 8226514d6740e5a9cd94fad4991e02e9
- Issuer: https://aj00.authing.cn/oauth/oidc
- Configuration information: https://aj00.authing.cn/oauth/oidc/.well-known/openid-configuration
- Callback address: http://localhost:3004/auth/cb

<img src="@imagesZhCn/integration/express/step.png" height=400 style="display:block;margin:50px auto;">

## integrated Authing OIDC application

TodoMVC Demo Project: https://github.com/Authing/todos-express-openidconnect

### 1. Install Deps

```bash
npm install --save passport passport-openidconnect
```

### 2. Config Passport
ref `routes/auth.js`: 

```js
passport.use(new OpenIDConnectStrategy({
  issuer: 'https://passport-authing.authing.cn/oidc',
  authorizationURL: 'https://passport-authing.authing.cn/oidc/auth',
  tokenURL: 'https://passport-authing.authing.cn/oidc/token',
  userInfoURL: 'https://passport-authing.authing.cn/oidc/me',
  clientID: '6205d4e5dd728952be979ca1',
  clientSecret: 'eb578704fdc0273dd78d4ea38995ea27',
  // needs FULL URL in Authing console.
  callbackURL: '/oauth2/redirect',
  scope: [ 'profile' ],
  state: true
},
function verify(issuer, profile, cb) {
  // you can verify and insert user into your database
  return cb(null, profile);
}));
```

### 3. Config session

ref `app.js`: 

```js
// FIXME: Passport session config
app.use(passport.authenticate('session'));
```

### 4. Config routes

ref `routes/auth.js`: 

```js
router.get('/login', passport.authenticate('openidconnect'));

router.get('/oauth2/redirect', passport.authenticate('openidconnect', {
  successReturnToOrRedirect: '/',
  failureRedirect: '/login'
}));

router.post('/logout', function(req, res, next) {
  req.logout();
  // for sso, or just `/`
  res.redirect('https://passport-authing.authing.cn/login/profile/logout?redirect_uri=' + encodeURIComponent('http://localhost:3000/'));
});
```

### 5. optional 

serializeUser:

```js
passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    // Field reference:  https://docs.authing.cn/v2/guides/user/user-profile.html
    cb(null, { id: user.id, username: user.username, name: user.nickname });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});
```

User Profile fields:
::: page-ref /en/guides/user/user-profile/
:::

## Docs reference

- https://www.passportjs.org/docs/
- https://www.passportjs.org/packages/passport-openidconnect/


## You may also need

Use OIDC Client 
::: page-ref /en/frameworks/express-oidc-client/
:::
