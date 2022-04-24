---
meta:
  - name: description
    content: Implement single sign-on
---

# Implement single sign-on

<LastUpdated/>

This article describes how to use {{$localeConfig.brandName}} to implement application account integration and single sign-on.

## What is single sign-on

Single sign on(SSO) is a popular solution for enterprise business integration. The definition of SSO is that in multiple application systems, users only need to log in once to access all mutually trusted application systems.

## Before the start

### Prerequisite

1. Basic HTML and CSS knowledge.
2. Intermediate JavaScript skills.

### Tools

1. Your favorite text editor.
2. A web server that can be run locally (for example: `npm install http-server -g`).

## Create an authorized application

::: hint-info
If it is the first time to register for {{$localeConfig.brandName}}, you can skip this step. This step is automatically completed when you register for the first time.
:::

Go to **Console** &gt; **Applications** &gt; **Application List**, and click the "Create Application" button.

![](https://cdn.authing.cn/blog/20200927174331.png)

::: img-description
Create application
:::

In the pop-up dialog box, you only need to fill in the **application name**, **authentication address** and **callback address**. Keep the other parameters as default, and then click "Create".

**Parameter explanation**

**App name**, please give your app a name.

**Authentication address**, a secondary domain name of authing.cn, users will log in at this website.

**Callback URL**, after successful login, call back to the address of the developer's own business. This tutorial is a demonstration. The address is http://localhost:8080. Please fill in your business address in the actual scenario.
Click the newly created application in the application list, and record the AppID and the second-level domain name for future use.

## Quickly integrate single sign-on

When the web application is started, how to determine that it is currently logged in? The key is that **when the web application starts, you need to ask {{$localeConfig.brandName}}: Is anyone currently logged in?**

Suppose our business logic is very simple: if it is **not logged in**, it needs to display the **login button** and prompt the user to log in; if it is already **logged in**, it is necessary to **display the user's personal information and logout button**. Let's start coding and implementation.

### Develop web applications <a id="add-empty-html"></a>

This tutorial is just for demonstration, so we did not choose an advanced framework, which allows us to focus on {{$localeConfig.brandName}} itself. We use the [AuthingSSO SDK](https://github.com/authing/AuthingSSO) to quickly integrate single sign-on capabilities for the application.

### Create a new HTML file

Create an HTML file, start coding our first web application, first introduce the [AuthingSSO SDK](https://github.com/authing/AuthingSSO.git), so that we can quickly ask Authing: **Is anyone currently logged in?**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>The first app</title>
  </head>
  <body>
    <script src="https://cdn.jsdelivr.net/npm/@authing/sso/dist/AuthingSSO.umd.min.js"></script>
  </body>
</html>
```

### Initialize the AuthingSSO SDK

Perform the initialization in the following way, fill in the AppId and authentication address of the OIDC application recorded earlier, and complete the initialization of the SDK.

```html
<body>
  <script src="https://cdn.jsdelivr.net/npm/@authing/sso/dist/AuthingSSO.umd.min.js"></script>
  <script>
    let auth = new AuthingSSO({
      // OIDC app ID
      appId: '5e7343597f905c025e99e660',
      // OIDC app address 
      appDomain: 'first-oidc-app.authing.cn'
    });
  </script>
</body>
```

### Set basic HTML controls to implement business logic

When the web application starts, if no one is logged in, the login button is displayed; if it is already logged in, the user's personal information will be displayed.Set the following controls to complete our business logic.

```html
<body>
  <h1 id="h1-login" style="display: none;">please login</h1>
  <input type="button" value="登录" id="btn-login" style="display: none;" />
  <h1 id="h1-user-info" style="display: none;">user information</h1>
  <input type="button" value="登出" id="btn-logout" style="display: none;" />
  <pre id="user-info"></pre>
  <script src="https://cdn.jsdelivr.net/npm/@authing/sso/dist/AuthingSSO.umd.min.js"></script>
  <script>
    let auth = new AuthingSSO({
      // OIDC app ID 
      appId: '5e7343597f905c025e99e660',
      // OIDC app address
      appDomain: 'first-oidc-app.authing.cn'
    });
  </script>
</body>
```

### Check login status

In order to check login status from {{$localeConfig.brandName}} before the web application is started, add the following code which can help execute the business logic of the logged-in or unlogged-in status:

```html
<script>
  let auth = new AuthingSSO({
    appId: '5cded9bf4efab36f02fa666a',
    appDomain: 'first-oidc-app.authing.cn',
  });
  window.onload = async function () {
    let res = await auth.trackSession();
    if (res.session !== null) {
      document.getElementById('h1-user-info').style.display = 'block';
      document.getElementById('user-info').innerHTML = JSON.stringify(res.userInfo, null, 4);
      document.getElementById('btn-logout').style.display = 'inline';
    } else {
      document.getElementById('h1-login').style.display = 'block';
      document.getElementById('btn-login').style.display = 'inline';
    }
  };
  document.getElementById('btn-login').addEventListener('click', function () {
    auth.login();
  });
  document.getElementById('btn-logout').addEventListener('click', function () {
    auth.logout().then((res) => {
      alert(JSON.stringify(res));
      location.reload();
    });
  });
</script>
```

### Complete code <a id="full-code"></a>

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>The first app</title>
  </head>
  <body>
    <h1 id="h1-login" style="display: none;">please login</h1>
    <input type="button" value="登录" id="btn-login" style="display: none;" />
    <h1 id="h1-user-info" style="display: none;">user information</h1>
    <input type="button" value="登出" id="btn-logout" style="display: none;" />
    <pre id="user-info"></pre>
    <script src="https://cdn.jsdelivr.net/npm/@authing/sso/dist/AuthingSSO.umd.min.js"></script>
    <script>
      let auth = new AuthingSSO({
        appId: '5cded9bf4efab36f02fa666a',
        appDomain: 'first-oidc-app.authing.cn',
      });
      window.onload = async function () {
        let res = await auth.trackSession();
        if (res.session !== null) {
          document.getElementById('h1-user-info').style.display = 'block';
          document.getElementById('user-info').innerHTML = JSON.stringify(res.userInfo, null, 4);
          document.getElementById('btn-logout').style.display = 'inline';
        } else {
          document.getElementById('h1-login').style.display = 'block';
          document.getElementById('btn-login').style.display = 'inline';
        }
      };
      document.getElementById('btn-login').addEventListener('click', function () {
        auth.login();
      });
      document.getElementById('btn-logout').addEventListener('click', function () {
        auth.logout().then((res) => {
          alert(JSON.stringify(res));
          location.reload();
        });
      });
    </script>
  </body>
</html>

```

The sample code can be found on [GitHub](https://github.com/authing/authing-sso-demo). It is recommended to download and run the code on GitHub.
Please [see here](/reference/sdk-for-sso.md) for the complete parameter list of ApprowSSO single sign-on SDK.

### **Operation method** <a id="run-the-demo"></a>

Run the following command in the terminal

```bash
$ git clone https://github.com/authing/authing-sso-demo
$ cd authing-sso-demo
$ npm install -g http-server
$ http-server
```

Then visit http://localhost:8080 in the browser.

::: hint-warning
If the local port 8080 is already occupied, the application may run on other ports such as 8081 and 8082.
:::

### Running result <a id="demo-result"></a>

Open the web application written by us, the current is not logged in, the page prompts the user to log in, and displays the login button. We click "Login".

![未登录](https://cdn.authing.cn/docs/20200405180101.png)
::: img-description
Log entry
:::

The browser will redirect to the user authentication page of the OIDC application, and input the user name and password to log in.

![](https://cdn.authing.cn/blog/20200927174427.png)

::: img-description
Login in
:::

The browser is redirected to the callback link we set up earlier. This example still calls back to localhost:8080.

![已登录](https://cdn.authing.cn/docs/20200405180354.png)
::: img-description
User Info
:::

After logging in, we obtain user information by the `trackSession` function of the ApprowSSO SDK and display it on the page. The format of `trackSession` return data is as follows:

```json
{
    "session": {
        "_id": "mbC_oeqTz0WPaspPAxpXEGXSDqlCo5i4",
        "__v": 0,
        "appId": "5cded9bf4efab36f02fa666a",
        "cookie": {
            "originalMaxAge": 86400000,
            "expires": "2020-04-04T14:55:22.397Z",
            "secure": true,
            "httpOnly": true,
            "path": "/cas",
            "sameSite": "none"
        },
        "type": "oidc",
        "userId": "5e71a7ec3e494a56f5f4d03b"
    },
    "userInfo": {
        {
          "id": "5f702fcc913544c358cb2123",
          "arn": "arn:cn:authing:59f86b4832eb28071bdd9214:user:5f702fcc913544c358cb2123",
          "userPoolId": "59f86b4832eb28071bdd9214",
          "username": "xxx",
          "email": null,
          "emailVerified": false,
          "phone": null,
          "phoneVerified": false,
          "unionid": "35447896",
          "openid": "35447896",
          "identities": [
          ],
          "nickname": "xxxx",
          "registerSource": [
              "social:github"
          ],
          "photo": "https://avatars2.githubusercontent.com/u/35447896?v=4",
          "password": null,
          "oauth": "",
          "token": "",
          "tokenExpiredAt": "1602484037172",
          "loginsCount": 4,
          "lastLogin": "1601188037190",
          "lastIP": null,
          "signedUp": "2020-09-27T14:23:08+08:00",
          "blocked": false,
          "isDeleted": false,
          "device": null,
          "browser": null,
          "company": "{{$localeConfig.brandName}}",
          "name": null,
          "givenName": null,
          "familyName": null,
          "middleName": null,
          "profile": "",
          "preferredUsername": null,
          "website": null,
          "gender": "U",
          "birthdate": null,
          "zoneinfo": null,
          "locale": null,
          "address": null,
          "formatted": null,
          "streetAddress": null,
          "locality": null,
          "region": null,
          "postalCode": null,
          "country": null,
          "createdAt": "2020-09-27T14:23:08+08:00",
          "updatedAt": "2020-09-27T14:27:17+08:00",
          "customData": "",
    },
    "urlParams": {
        "code": "N_J4aPRa6vIJUQyeO8NNJlozO4E",
    }
}
```

You can refresh this page some times, because you are currently logged in and the browser will always display user information. Next, we click the "Logout" button to single sign out.

![](https://cdn.authing.cn/docs/20200405180656.png)
::: img-description
Logout button
:::

## Visit user's personal center page

In the SSO application, there is an independent user center page where users can modify their own information.

Your end users can visit the following link to enter the profile modification page:

```
https://<appDomain>.authing.cn/u
```

`<appDomain>` is the second-level domain name of your SSO application.

If the user is not logged in, the user will be required to log in before entering the personal center; for the logged-in user, it will directly enter the personal center.

![](https://cdn.authing.cn/blog/20200927174731.png)

::: img-description
Personal center
:::

## Verify the validity of the token

After a successful login, the user information you get contains a token field,whose value is an IdToken, this is the credential used for login, which can be used in the backend to determine the user's identity. You may need to know how to verify the validity of the token, please click [here](../../basics/authenticate-first-user/how-to-validate-user-token.md) for details.

### What is id_token?

**id_token** is equivalent to the terminal user's ID card, used to authenticate the user's identity, and is issued after OIDC authorization. When you need to request resources from your **own server**, you should carry **id_token**. At the same time, your server should [verify the validity of this token](../../basics/authenticate-first-user/how-to-validate-user-token.md), and then return the corresponding resources. Please see the difference between id_token and access_token [here](/concepts/oidc-common-questions#idtoken-与-accesstoken-的区别).

## Then

You can carry this `id_token` in the request sent by the client to the back-end server. Take `axios` as an example:

```js
const axios = require('axios');
axios.get({
  url: 'https://yourdomain.com/api/v1/your/resources',
  headers: {
    'Authorization': 'Bearer ID_TOKEN'
  }
}).then((res) => {
 // custom codes
})
```

The validity of this `token` needs to be verified in the back-end interface to verify the user's identity. For details of the verification method, please refer to [verifying user identity credentials (token)](/guides/faqs/how-to-validate-user-token). After identifying the user, you may also need to [perform permission management on the user](/guides/access-control/) to determine whether the user has operating permissions for this API.
