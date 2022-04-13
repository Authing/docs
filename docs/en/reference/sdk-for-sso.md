---
meta:
  - name: description
    content: Single Sign-On
---

# Single Sign-On

<LastUpdated/>

**Single sign-on (SSO)** is one of the popular solutions for enterprise business integration. The definition of SSO is that in multiple application systems, users only need to log in once to access all mutually trusted application systems. You can read [this guide](/guides/authentication/sso/) to learn how to quickly implement single sign-on in your application.

## Installation <a id="install"></a>

### Install via NPM <a id="npm-install"></a>

```bash
$ npm install @authing/sso --save
```

Then it can be used in the following way

```js
import AuthingSSO from '@authing/sso'
```

### Install via CDN <a id="cdn-install"></a>

```html
<script src="https://cdn.jsdelivr.net/npm/@authing/sso/dist/AuthingSSO.umd.min.js"></script>
<script>
  console.log(AuthingSSO)
</script>
```

## Quick Start <a id="getting-started"></a>

Before starting, you need to [create an application](/guides/app/create-app.md)。

### Initialization

To initialize the AuthingSSO SDK, you need to pass in the [application ID](/faqs/get-app-id-and-secret.md) and application domain name. The format of the application domain name is `example-app.authing.cn` **without the protocol header and Path**. See the [initialization constructor](#初始化构造函数) for detailed parameters.

```js
import AuthingSSO from '@authing/sso'

let auth = new AuthingSSO({
  appId: 'APP_ID',
  appDomain: 'example-app.authing.cn',
})
```

::: hint-info
**The privatization deployment** scenario needs to specify the GraphQL endpoint of your privatized Authing service. If you are not sure, you can contact the Authing IDaaS service administrator.

```js
let auth = new AuthingSSO({
  appId: 'APP_ID',
  appDomain: 'example-app.you-authing-service.cn',
  host: {
    oauth: 'https://core.you-authing-service.com/graphql',
  },
})
```

:::

### Login

#### Redirect login

Initiating single sign-on, it will redirect to the login page. The relevant application needs to open the authorization code mode if use [authorization code mode](/guides/federation/oidc.html#%E6%8E%88%E6%9D%83%E7%A0%81%E6%A8%A1%E5%BC%8F).

```js
auth.login()
```

#### Window login

Initiate single sign-on, a window will pop up,and the login page in it. The relevant application needs to open the authorization code mode if use authorization code mode.

```js
auth.windowLogin()
```

The business domain name callback address needs to host an html file, which is used to send the obtained `code` `access_token` `id_token` and other parameters to the parent window by `postMessage`, and then close the window.

For example, the callback address is [https://example.com/handle.html](https://example.com/handle.html. This html needs a piece of code to send `postMessage`, which is responsible for taking out relevant parameters from the `url` and passing them to the parent window.

GitHub reference code: [https://github.com/Authing/oidc-window](https://github.com/Authing/oidc-window)。

### Redirect to registration page

Sometimes you may want to allow users to redirect to the registration page, an example of use is as follows:

```js
// Call this function to redirect directly to the registration page
auth.register()
```

### Check login status <a id="check-login-status"></a>

After the user logs in and returns to your business address, you can use this method to query the user's login status in this application. If the user is logged in, the user information of the user can be obtained, and you can understand the definitions of[all fields of user information](/guides/user/user-profile.md).

::: hint-danger
After version 13.1, Safari will **block third-party cookies** by default, which will affect certain **single sign-on features** of Authing. In other similar updates, after Chrome 83, third-party cookies are disabled by default in **incognito mode**. Other browsers are also slowly making such updates to protect user privacy. Many browsers will disable third-party cookies as a security configuration feature.

This may have an impact on this method. For details, see the [impact of disabling third-party cookies on Authing](/guides/faqs/block-third-party-cookie-impact.md#tracksession)，You can [view the solution](/guides/faqs/block-third-party-cookie-impact.md#如何解决).
:::

```js
let res = await auth.trackSession()
/**
 * {
 *    session: { appId: 'xxx', type: 'oidc/oauth', userId: 'yyy'},
 *    userInfo: {
 *      "_id": "USER_ID",
 *      "email": "USER_EMAIL",
 *      "registerInClient": "CLIENT_ID",
 *      "token": "JTW_TOKEN",
 *      "tokenExpiredAt": "2019-10-28 10:15:32",
 *      "photo": "PICTURE",
 *      "company": "",
 *      "nickname": "NICKNAME",
 *      "username": "USERNAME",
 *   },
 *   urlParams: {
 *      code: 'xxx', // These parameters are obtained from the url and need to be stored by the developer for use
 *      id_token: 'ID_TOKEN',
 *      access_token: 'ACCESS_TOKEN'
 *   }
 * }
 *
 * if session not exist，return：
 *
 * {
 *   session: null
 * }
 * */
```

!!!include(common/what-to-do-when-you-get-userinfo.md)!!!

### Sign out <a id="logout"></a>

**This method is an asynchronous function, please make sure to use `await` to wait for the return before proceeding to the next step.**

```js
let res = await auth.logout()
/**
 * {
 *    message: "Single Sign out success",
 *    code: 200
 * }
 * */
```

## API

### Initialize constructor

The constructor accepts an object as a parameter. The list of parameters in the object is as follows:

<table>
  <thead>
    <tr>
      <th style="text-align:left">Parameter name</th>
      <th style="text-align:left; width:60px">Required</th>
      <th style="text-align:left">Descrption</th>
      <th style="text-align:left">Default</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left">appId</td>
      <td style="text-align:left">yes</td>
      <td style="text-align:left">application ID</td>
      <td style="text-align:left">-</td>
    </tr>
    <tr>
      <td style="text-align:left">appDomain</td>
      <td style="text-align:left">yes</td>
      <td style="text-align:left">Application domain name，E.g. <code>app1.authing.cn</code>
      </td>
      <td style="text-align:left">-</td>
    </tr>
    <tr>
      <td style="text-align:left">appType</td>
      <td style="text-align:left">no</td>
      <td style="text-align:left">Application type, optional values are oidc, oauth.<code>oidc</code>，<code>oauth</code>。
      </td>
      <td style="text-align:left"><code>oidc</code>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">scope</td>
      <td style="text-align:left">no</td>
      <td style="text-align:left">Authorized domain</td>
      <td style="text-align:left">'openid profile email phone',<router-link to="/concepts/oidc-common-questions.html#scope-参数对应的用户信息">View the list of supported scopes</router-link>。</a>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">state</td>
      <td style="text-align:left">no</td>
      <td style="text-align:left">Custom string, callback address will receive this parameter, the content is the same, can be used to pass custom information.</td>
      <td
      style="text-align:left">Random string</td>
    </tr>
    <tr>
      <td style="text-align:left">host</td>
      <td style="text-align:left">no</td>
      <td style="text-align:left">An object that specifies the GraphQL address. <b>The privatization deployment scenario needs to specify the GraphQL endpoint of your privatized Authing service. If you are not sure, you can contact the Authing IDaaS service administrator.</b></td>
      <td style="text-align:left">
        GraphQL endpoint using Authing public cloud
      </td>
    </tr>
    <tr>
      <td style="text-align:left">host.oauth</td>
      <td style="text-align:left">no</td>
      <td style="text-align:left">GraphQL &#x901A;&#x4FE1;&#x5730;&#x5740;</td>
      <td style="text-align:left">https://core.authing.cn/graphql</td>
    </tr>
    <tr>
      <td style="text-align:left">responseType</td>
      <td style="text-align:left">no</td>
      <td style="text-align:left">Application authorization process, optional value is code <code>code</code>&#xFF0C;<code>implicit</code>
      </td>
      <td style="text-align:left"><code>code</code>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">redirectUrl</td>
      <td style="text-align:left">no</td>
      <td style="text-align:left">Application callback address</td>
      <td style="text-align:left"><router-link to="/guides/app/create-app">The business domain name filled in when creating the application</router-link> in the Authing console. </td>
    </tr>
    <tr>
      <td style="text-align:left">nonce</td>
      <td style="text-align:left">no</td>
      <td style="text-align:left">Random number</td>
      <td style="text-align:left">Random number </td>
    </tr>
    <tr>
      <td style="text-align:left">timestamp</td>
      <td style="text-align:left">no</td>
      <td style="text-align:left">Timestamp	</td>
      <td style="text-align:left">Current timestamp</td>
    </tr>
  </tbody>
</table>

Example:

```js
let auth = new AuthingSSO({
  appId: 'APP_ID',
  appDomain: 'example-app.authing.cn',
})
```

### login

Request the authorized address of the application to log in.

Parameter list:

| Parameter name | Required | Descrption                                        | Default                      |
| -------------- | -------- | ------------------------------------------------- | ---------------------------- |
| lang           | no       | Language, optional values are `zh-CN` and `en-US` | Depend on the browser locale |

Example:

```js
auth.login()
```

### register

Call this function to redirect directly to the registration page.

Parameter list:

| Parameter name | Required | Descrption                                        | Default                      |
| -------------- | -------- | ------------------------------------------------- | ---------------------------- |
| lang           | no       | Language, optional values are `zh-CN` and `en-US` | Depend on the browser locale |

Example:

```js
auth.register()
```

### trackSession

Example:

```js
let res = await auth.trackSession()
/**
 * {
 *    session: { appId: 'xxx', type: 'oidc/oauth', userId: 'yyy'},
 *    userInfo: {
 *      "_id": "USER_ID",
 *      "email": "USER_EMAIL",
 *      "registerInClient": "CLIENT_ID",
 *      "token": "JTW_TOKEN",
 *      "tokenExpiredAt": "2019-10-28 10:15:32",
 *      "photo": "PICTURE",
 *      "company": "",
 *      "nickname": "NICKNAME",
 *      "username": "USERNAME",
 *   },
 *   urlParams: {
 *      code: 'xxx', // hese parameters are obtained from the url and need to be stored by the developer for use
 *      id_token: 'ID_TOKEN',
 *      access_token: 'ACCESS_TOKEN'
 *   }
 * }
 *
 * if session not exist，return：
 *
 * {
 *   session: null
 * }
 * */
```

### logout

**This method is an asynchronous function, please make sure to use await to wait for the return before proceeding to the next step.**

Example:

```js
let res = await auth.logout()
/**
 * {
 *    message: "Single Sign out success",
 *    code: 200
 * }
 * */
```

## Get help <a id="get-help"></a>

1. Join us on forum: [\#authing-chat](https://forum.authing.cn/)
