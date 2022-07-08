This article describes how to use {{$localeConfig.brandName}} to achieve application account access and single sign-on.

## What is Single Sign-On

Let's illustrate with an example. Suppose there is a university with two internal systems, one is the mailbox system, and the other is the timetable query system. Now I want to achieve this effect: log in once in the mailbox system, and then enter the website of the curriculum system at this time, without logging in again, the curriculum website system directly jumps to the personal curriculum page, and vice versa. The more professional definitions are as follows:

**Single Sign-On**, referred to as **SSO**, is one of the more popular solutions for enterprise business integration. The definition of SSO is that in multiple application systems, **users only need to log in once** to **access all** mutually trusted application systems.

## Authing SPA SDK

Based on the OIDC standard Single Page App scenario authentication side SDK, you can complete the integration with {{$localeConfig.brandName}} by calling the SDK, and realize the cross-main domain single sign-on effect in the browser for your multiple business software.

## Create Self-built App

> You can also use existing apps

On the "**self-built application**" page of the [{{$localeConfig.brandName}} Console](https://console.authing.cn), click "**create**", select "**SPA**" for the application type, and fill in the following information:

- Application Name: your app name;
- Subdomain: select a second-level domain name, which must be in a legal domain name format, such as `my-spa-app`;

## Configure SSO

> Refer to the [Self-built App SSO solution](/en/guides/app/sso.md)

## Change Settings

Find the application you just configured, click to enter the **configuration** page, you need to update the following configuration items:

- **Authentication Configuration**: Configure your `Login Callback URL`
- **Authorization Configuration**: `Authorization Flow` enables `authorization_code`, `refresh_token`
- **Authorization Configuration**: `Return Type` enables `code`

Click **Save** to save the configuration, as shown in the following figure:

![](~@imagesEnUs/common/integrate-sso/sso-callback.png)

![](~@imagesEnUs/common/integrate-sso/sso-authorization-configuration.png)

## Install

{{$localeConfig.brandName}} SPA SDK supports integration into your front-end business software through package manager installation and script tag introduction.

### Use NPM

```shell
$ npm install @authing/spa-auth-sdk
```

### Use Yarn

```shell
$ yarn add @authing/spa-auth-sdk
```

### Use script tag

```html
<script src="https://cdn.jsdelivr.net/npm/@authing/spa-auth-sdk@0.0.1-alpha1/dist/index.umd.js"></script>
<script>
  const sdk = new AuthingSPA({
    // Very important, please fill in carefully!
    // If the application enables SSO, you must write the "App Panel Address" for SSO here;
    // otherwise, fill in the application's "Subdomain".
    domain: "SSO App Panel Address",
    appId: "App ID",
    // The login callback address needs to be specified in the console
    // "Configuration - Authentication Configuration - Login Callback URL"
    redirectUri: "Login Callback URL",
  });
</script>
```

## Initialize

### App ID

as the picture shows:

![](~@imagesEnUs/common/integrate-sso/sso-appid.png)

### Domain

as the picture shows:

![](~@imagesEnUs/common/integrate-sso/sso-app-panel-address.png)

### Callback URL

Fill in the callback address according to your own business, as shown in the figure:

![](~@imagesEnUs/common/integrate-sso/sso-callback.png)

In order to use the Authing SPA SDK, you need to fill in the `App ID`, `domain`, `callback url` and other parameters, as shown in the following example:

```js
import { AuthingSPA } from "@authing/spa-auth-sdk";

const sdk = new AuthingSPA({
  // Very important, please fill in carefully!
  // If the application enables SSO, you must write the "App Panel Address" for SSO here;
  // otherwise, fill in the application's "Subdomain".
  domain: "SSO App Panel Address",
  appId: "App ID",
  // The login callback address needs to be specified in the console
  // "Configuration - Authentication Configuration - Login Callback URL"
  redirectUri: "Login Callback URL",
});
```

## Log in

The Authing SPA SDK can initiate authentication and authorization requests to Authing. Currently, three forms are supported:

1. Redirect to the login page hosted by Authing in the current window;
2. A pop-up window loads the Authing-hosted login page in the pop-up window.
3. silent login

### Redirect login

Taking React as an example, the following code demonstrates how to use redirect login:

> The sample code scenarios below will use React && Typescript by default

```tsx{21-26}
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { AuthingSPA } from '@authing/spa-auth-sdk';
import type { LoginState } from '@authing/spa-auth-sdk/dist/types/global';

function App() {
  const sdk = useMemo(() => {
    return new AuthingSPA({
      // Very important, please fill in carefully!
      // If the application enables SSO, you must write the "App Panel Address" for SSO here;
      // otherwise, fill in the application's "Subdomain".
      domain: 'SSO App Panel Address',
      appId: 'App ID',
      // The login callback address needs to be specified in the console
      // "Configuration - Authentication Configuration - Login Callback URL"
      redirectUri: 'Login Callback URL',
    });
  }, []);

  const [loginState, setLoginState] = useState<LoginState | null>();

  /**
   * Redirect to the Authing-hosted login page
   */
  const login = () => {
    sdk.loginWithRedirect();
  };

  /**
   * Get the user's login status
   */
  const getLoginState = useCallback(async () => {
    const state = await sdk.getLoginState();
    setLoginState(state);
  }, [sdk]);

  useEffect(() => {
    // Determine whether the current URL is the Authing login callback URL
    if (sdk.isRedirectCallback()) {
      /**
       * Open the login page hosted by Authing in a redirect mode.
       * After the authentication is successful, you need to cooperate with
       * the `handleRedirectCallback` method to process the authorization code or token
       * sent by Authing at the callback endpoint to obtain the user's login status.
       */
      sdk.handleRedirectCallback().then((res) => setLoginState(res));
    } else {
      getLoginState();
    }
  }, [getLoginState, sdk]);

  return (
    <div className="App">
      <p>
        <button onClick={login}>login</button>
      </p>
      <p>
        <code>{JSON.stringify(loginState)}</code>
      </p>
    </div>
  );
}

export default App;
```

If you want to customize the parameters, you can also customize the following parameters. If you do not pass the parameters, the default parameters will be used.

```js
const login = () => {
  const params: {
    // The callback url, the default is redirectUri in the initialization parameter
    redirectUri?: string,

    // The URL that initiates the login.
    // If redirectToOriginalUri is set, it will be redirected back to this page after
    // the login. The default is the current URL
    originalUri?: string,

    // Prompt the user to log in again even if the user is already logged in
    forced?: boolean,

    // Custom intermediate state, which will be passed to the callback endpoint
    customState?: any,
  } = {
    redirectUri: "Login Callback URL",
    originalUri: "URL to initiate login",
    forced: false,
    customState: {},
  };
  sdk.loginWithRedirect(params);
};
```

### Popup login

You can also use the following method on your business software page to let users log in in a new window by popping up a new window:

```tsx{21-27}
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { AuthingSPA } from '@authing/spa-auth-sdk';
import type { LoginState } from '@authing/spa-auth-sdk/dist/types/global';

function App() {
  const sdk = useMemo(() => {
    return new AuthingSPA({
      // Very important, please fill in carefully!
      // If the application enables SSO, you must write the "App Panel Address" for SSO here;
      // otherwise, fill in the application's "Subdomain".
      domain: 'SSO App Panel Address',
      appId: 'App ID',
      // The login callback address needs to be specified in the console
      // "Configuration - Authentication Configuration - Login Callback URL"
      redirectUri: 'Login Callback URL',
    });
  }, []);

  const [loginState, setLoginState] = useState<LoginState | null>();

  /**
   * Open Authing-hosted login page as a popup
   */
  const login = async () => {
    const res = await sdk.loginWithPopup();
    setLoginState(res);
  };

  /**
   * Get the user's login status
   */
  const getLoginState = useCallback(async () => {
    const state = await sdk.getLoginState();
    setLoginState(state);
  }, [sdk]);

  useEffect(() => {
    getLoginState();
  }, [getLoginState]);

  return (
    <div className="App">
      <p>
        <button onClick={login}>login</button>
      </p>
      <p>
        <code>{JSON.stringify(loginState)}</code>
      </p>
    </div>
  );
}

export default App;
```

If you want to customize the parameters, you can also customize the following parameters. If you do not pass the parameters, the default parameters will be used.

```js
const login = async () => {
  const params: {
    // The callback url, the default is redirectUri in the initialization parameter
    redirectUri?: string,

    // Prompt the user to log in again even if the user is already logged in
    forced?: boolean,
  } = {
    redirectUri: "Login Callback URL",
    forced: false,
  };
  const res = await sdk.loginWithPopup(params);
  setLoginState(res);
};
```

### Silent login

As mentioned in the article [Self-built App SSO solution](/en/guides/app/sso.md), multiple self-built applications can be added to the **SSO** panel. If the user has already logged in to one of the applications, he can access other applications in another tab of the same browser. When the application is used, it can realize silent login, directly obtain user information, and realize the effect of single sign-on.

```tsx{21-45}
import React, { useEffect, useMemo, useState } from 'react';
import { AuthingSPA } from '@authing/spa-auth-sdk';
import type { LoginState } from '@authing/spa-auth-sdk/dist/types/global';

function App() {
  const sdk = useMemo(() => {
    return new AuthingSPA({
      // Very important, please fill in carefully!
      // If the application enables SSO, you must write the "App Panel Address" for SSO here;
      // otherwise, fill in the application's "Subdomain".
      domain: 'SSO App Panel Address',
      appId: 'App ID',
      // The login callback address needs to be specified in the console
      // "Configuration - Authentication Configuration - Login Callback URL"
      redirectUri: 'Login Callback URL',
    });
  }, []);

  const [loginState, setLoginState] = useState<LoginState | null>();

  useEffect(() => {
    // Determine whether the current URL is the Authing login callback URL
    if (sdk.isRedirectCallback()) {
      console.log('redirect');
      /**
       * Open the login page hosted by Authing in a redirect mode.
       * After the authentication is successful, you need to cooperate with
       * the `handleRedirectCallback` method to process the authorization code or token
       * sent by Authing at the callback endpoint to obtain the user's login status.
       */
      sdk.handleRedirectCallback().then((res) => setLoginState(res));
    } else {
      console.log('normal');

      // Get the user's login status
      sdk.getLoginState().then((res) => {
        if (res) {
          setLoginState(res);
        } else {
          // If the user is not logged in, redirect to the authentication center
          sdk.loginWithRedirect();
        }
      });
    }
  }, [sdk]);

  return (
    <div>
      <p>
        Access Token: <code>{loginState?.accessToken}</code>
      </p>
      <p>
        User Info: <code>{JSON.stringify(loginState?.parsedIdToken)}</code>
      </p>
      <p>
        Access Token Info:
        <code>{JSON.stringify(loginState?.parsedAccessToken)}</code>
      </p>
      <p>
        Expire At: <code>{loginState?.expireAt}</code>
      </p>
    </div>
  );
}

export default App;
```

### Advanced usage

The essence of each login is to access a URL, which can carry many parameters. The Authing SPA SDK uses default parameters by default. If you need fine-grained control over login request parameters, you can refer to this example.

```js
import { AuthingSPA } from "@authing/spa-auth-sdk";

const sdk = new AuthingSPA({
  // Very important, please fill in carefully!
  // If the application enables SSO, you must write the "App Panel Address" for SSO here;
  // otherwise, fill in the application's "Subdomain".
  domain: "SSO App Panel Address",

  appId: "App ID",

  // The login callback address needs to be specified in the
  // console "Configuration - Authentication Configuration - Login Callback URL"
  redirectUri: "Login Callback URL",

  // The permissions the app requests from Authing, separated by spaces,
  // defaults to 'openid profile'
  scope: "openid email phone profile",

  // Where to carry identity credentials when callback, default is fragment
  // fragment: carried in the URL hash
  // query: carried in query parameters
  responseMode: "fragment",

  // Whether to use OIDC implicit mode to replace the default PKCE mode
  // Due to the low security of implicit mode, it is not recommended to be used,
  // only for compatibility with browsers that do not support crypto
  useImplicitMode: false,

  // The type of credentials returned by implicit mode, the default is 'token id_token'
  // token: returns the Access Token
  // id_token: returns ID Token
  implicitResponseType: "token id_token",

  // Whether to request Authing to check the validity of the Access Token every time the
  // login status is obtained, it can be used in a single sign-out scenario, default is false
  // If set to true, you need to set "Configuration" - "Other Configuration" -
  // "Client Verification Method for Validating Token" to none in the console
  introspectAccessToken: false,

  // width of the popup window
  popupWidth: 500,

  // height of the popup window
  popupHeight: 600,
});
```

## Check login status and get Token

If you want to check the user's login state and get the user's `Access Token`, `ID Token`, you can call the `getLoginState` method. If the user is not logged in at Authing, this method will throw an error:

```tsx{28-34}
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { AuthingSPA } from '@authing/spa-auth-sdk';
import type { LoginState } from '@authing/spa-auth-sdk/dist/types/global';

function App() {
  const sdk = useMemo(() => {
    return new AuthingSPA({
      // Very important, please fill in carefully!
      // If the application enables SSO, you must write the "App Panel Address" for SSO here;
      // otherwise, fill in the application's "Subdomain".
      domain: 'SSO App Panel Address',
      appId: 'App ID',
      // The login callback address needs to be specified in the console
      // "Configuration - Authentication Configuration - Login Callback URL"
      redirectUri: 'Login Callback URL',
    });
  }, []);

  const [loginState, setLoginState] = useState<LoginState | null>();

  /**
   * Redirect to the Authing-hosted login page
   */
  const login = () => {
    sdk.loginWithRedirect();
  };

  /**
   * Get the user's login status
   */
  const getLoginState = useCallback(async () => {
    const state = await sdk.getLoginState();
    setLoginState(state);
  }, [sdk]);

  useEffect(() => {
    // Determine whether the current URL is the Authing login callback URL
    if (sdk.isRedirectCallback()) {
      /**
       * Open the login page hosted by Authing in a redirect mode.
       * After the authentication is successful, you need to cooperate with
       * the `handleRedirectCallback` method to process the authorization code or token
       * sent by Authing at the callback endpoint to obtain the user's login status.
       */
      sdk.handleRedirectCallback().then((res) => setLoginState(res));
    } else {
      getLoginState();
    }
  }, [getLoginState, sdk]);

  return (
    <div className="App">
      <p>
        <button onClick={login}>login</button>
      </p>
      <p>
        <code>{JSON.stringify(loginState)}</code>
      </p>
    </div>
  );
}

export default App;
```

## Get user information

You need to use the Access Token to get the user's personal information:

1. When the user logs in successfully for the first time, they can get the user's Access Token in the callback function, and then use the Access Token to obtain user information;
2. If the user is already logged in, you can first obtain the user's Access Token and then use the Access Token to obtain user information.

```tsx{37-49}
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { AuthingSPA } from '@authing/spa-auth-sdk';
import type { LoginState, UserInfo } from '@authing/spa-auth-sdk/dist/types/global';

function App() {
  const sdk = useMemo(() => {
    return new AuthingSPA({
      // Very important, please fill in carefully!
      // If the application enables SSO, you must write the "App Panel Address" for SSO here;
      // otherwise, fill in the application's "Subdomain".
      domain: 'SSO App Panel Address',
      appId: 'App ID',
      // The login callback address needs to be specified in the console
      // "Configuration - Authentication Configuration - Login Callback URL"
      redirectUri: 'Login Callback URL',
    });
  }, []);

  const [loginState, setLoginState] = useState<LoginState | null>();
  const [userInfo, setUserInfo] = useState<UserInfo | null>();

  /**
   * Redirect to the Authing-hosted login page
   */
  const login = () => {
    sdk.loginWithRedirect();
  };

  /**
   * Get the user's login status
   */
  const getLoginState = useCallback(async () => {
    const state = await sdk.getLoginState();
    setLoginState(state);
  }, [sdk]);

  /**
   * Obtain user identity information with Access Token
   */
  const getUserInfo = async () => {
    if (!loginState) {
      alert("not logged in");
      return;
    }
    const userInfo = await sdk.getUserInfo({
      accessToken: loginState?.accessToken,
    });
    setUserInfo(userInfo);
  };

  useEffect(() => {
    // Determine whether the current URL is the Authing login callback URL
    if (sdk.isRedirectCallback()) {
      /**
       * Open the login page hosted by Authing in a redirect mode.
       * After the authentication is successful, you need to cooperate with
       * the `handleRedirectCallback` method to process the authorization code or token
       * sent by Authing at the callback endpoint to obtain the user's login status.
       */
      sdk.handleRedirectCallback().then((res) => setLoginState(res));
    } else {
      getLoginState();
    }
  }, [getLoginState, sdk]);

  return (
    <div className="App">
      <p>
        <button onClick={login}>login</button>&nbsp;
        <button onClick={getUserInfo}>getUserInfo</button>&nbsp;
      </p>
      <p>
        loginState：
        <code>{JSON.stringify(loginState)}</code>
      </p>
      <p>
        userInfo：
        <code>{JSON.stringify(userInfo)}</code>
      </p>
    </div>
  );
}

export default App;
```

## Sign out

You can call the `logoutWithRedirect` method to log out

```tsx{36-41}
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { AuthingSPA } from '@authing/spa-auth-sdk';
import type { LoginState } from '@authing/spa-auth-sdk/dist/types/global';

function App() {
  const sdk = useMemo(() => {
    return new AuthingSPA({
      // Very important, please fill in carefully!
      // If the application enables SSO, you must write the "App Panel Address" for SSO here;
      // otherwise, fill in the application's "Subdomain".
      domain: 'SSO App Panel Address',
      appId: 'App ID',
      // The login callback address needs to be specified in the console
      // "Configuration - Authentication Configuration - Login Callback URL"
      redirectUri: 'Login Callback URL',
    });
  }, []);

  const [loginState, setLoginState] = useState<LoginState | null>();

  /**
   * Redirect to the Authing-hosted login page
   */
  const login = () => {
    sdk.loginWithRedirect();
  };

  /**
   * Get the user's login status
   */
  const getLoginState = useCallback(async () => {
    const state = await sdk.getLoginState();
    setLoginState(state);
  }, [sdk]);

  /**
   * Sign out
   */
  const logout = async () => {
    await sdk.logoutWithRedirect();
  };

  useEffect(() => {
    // Determine whether the current URL is the Authing login callback URL
    if (sdk.isRedirectCallback()) {
      /**
       * Open the login page hosted by Authing in a redirect mode.
       * After the authentication is successful, you need to cooperate with
       * the `handleRedirectCallback` method to process the authorization code or token
       * sent by Authing at the callback endpoint to obtain the user's login status.
       */
      sdk.handleRedirectCallback().then((res) => setLoginState(res));
    } else {
      getLoginState();
    }
  }, [getLoginState, sdk]);

  return (
    <div className="App">
      <p>
        <button onClick={login}>login</button>&nbsp;
        <button onClick={logout}>logout</button>&nbsp;
      </p>
      <p>
        loginState：
        <code>{JSON.stringify(loginState)}</code>
      </p>
    </div>
  );
}

export default App;
```

## Code reference

[Authing SPA SDK Demo](https://github.com/Authing/authing-sso-demo/tree/feat-sso-v3-demo)

## Get help <a id="get-help"></a>

1. Join us on Gitter: [\#authing-chat](https://forum.authing.cn/)
