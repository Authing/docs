This article describes how to use {{$localeConfig.brandName}} to achieve application account access and single sign-on.

## What is Single Sign-On

Let's illustrate with an example. Suppose there is a university with two internal systems, one is the mailbox system, and the other is the timetable query system. Now I want to achieve this effect: log in once in the mailbox system, and then enter the website of the curriculum system at this time, without logging in again, the curriculum website system directly jumps to the personal curriculum page, and vice versa. The more professional definitions are as follows:

**Single Sign-On**, referred to as **SSO**, is one of the more popular solutions for enterprise business integration. The definition of SSO is that in multiple application systems, **users only need to log in once** to **access all** mutually trusted application systems.

## Authing Browser SDK

Based on the OIDC standard web application authentication SDK, you can complete the integration with Authing by calling the SDK, and realize the cross-main domain single sign-on effect in the browser for your multiple business software.

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

{{$localeConfig.brandName}} Browser SDK supports integration into your front-end business software through package manager installation and script tag introduction.

### Use NPM

```shell
$ npm install @authing/browser
```

### Use Yarn

```shell
$ yarn add @authing/browser
```

### Use script tag

```html
<script src="https://cdn.jsdelivr.net/npm/@authing/browser"></script>
<script>
  const sdk = new Authing({
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

In order to use the Authing Browser SDK, you need to fill in the `App ID`, `domain`, `callback url` and other parameters, as shown in the following example:

```js
import { Authing } from "@authing/browser";

const sdk = new Authing({
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

The Authing Browser SDK can initiate authentication and authorization requests to Authing. Currently, three forms are supported:

1. Redirect to the login page hosted by Authing in the current window;
2. A pop-up window loads the Authing-hosted login page in the pop-up window.
3. silent login

### Redirect login

:::: tabs :options="{ useUrlFragment: false }"
::: tab React
```tsx{21-26}
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Authing } from '@authing/browser';
import type { LoginState } from '@authing/browser/dist/types/global';

function App() {
  const sdk = useMemo(() => {
    return new Authing({
      // Very important, please fill in carefully!
      // If the application enables SSO, you must write the "App Panel Address" 
      // for SSO here; otherwise, fill in the application's "Subdomain".
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
       * the `handleRedirectCallback` method to process the authorization code 
       * or token sent by Authing at the callback endpoint to obtain the 
       * user's login status.
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
:::

::: tab Vue2
```html{53-58}
<template>
  <div id="app">
    <p>
      <button @click="login">loginWithRedirect</button>
    </p>
    <p v-if="loginState">
      <textarea
        cols="100"
        rows="20"
        readOnly
        :value="JSON.stringify(loginState, null, 2)"
      ></textarea>
    </p>
  </div>
</template>

<script>
import { Authing } from "@authing/browser";

export default {
  name: "App",
  data() {
    return {
      sdk: null,
      loginState: null,
    };
  },
  created() {
    this.sdk = new Authing({
      // Very important, please fill in carefully!
      // If the application enables SSO, you must write the "App Panel Address" 
      // for SSO here; otherwise, fill in the application's "Subdomain".
      domain: "SSO App Panel Address",
      appId: "App ID",
      // The login callback address needs to be specified in the console
      // "Configuration - Authentication Configuration - Login Callback URL"
      redirectUri: "Login Callback URL",
    });
  },
  mounted() {
    // Determine whether the current URL is the Authing login callback URL
    if (this.sdk.isRedirectCallback()) {
      console.log("redirect");
      this.sdk.handleRedirectCallback().then((res) => {
        this.loginState = res;
        window.location.replace("/");
      });
    } else {
      this.getLoginState();
    }
  },
  methods: {
    /**
     * Redirect to the Authing-hosted login page
     */
    login() {
      this.sdk.loginWithRedirect();
    },
    /**
     * Get the user's login status
     */
    async getLoginState() {
      const state = await this.sdk.getLoginState();
      this.loginState = state;
    },
  },
};
</script>
```
:::

::: tab Vue3
```html{47-52}
<template>
  <div>
    <p>
      <button @click="login">loginWithRedirect</button>
    </p>
    <p v-if="loginState">
      <textarea
        cols="100"
        rows="20"
        readOnly
        :value="JSON.stringify(loginState, null, 2)"
      ></textarea>
    </p>
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import { Authing } from "@authing/browser";

export default defineComponent({
  name: "App",
  setup() {
    const sdk = new Authing({
      // Very important, please fill in carefully!
      // If the application enables SSO, you must write the "App Panel Address" 
      // for SSO here; otherwise, fill in the application's "Subdomain".
      domain: "SSO App Panel Address",
      appId: "App ID",
      // The login callback address needs to be specified in the console
      // "Configuration - Authentication Configuration - Login Callback URL"
      redirectUri: "Login Callback URL",
    });

    const state = reactive({
      loginState: null,
    });

    /**
     * Get the user's login status
     */
    const getLoginState = async () => {
      const res = await sdk.getLoginState();
      state.loginState = res;
    };

    /**
     * Redirect to the Authing-hosted login page
     */
    const login = () => {
      sdk.loginWithRedirect();
    };

    onMounted(() => {
      // Determine whether the current URL is the Authing login callback URL
      if (sdk.isRedirectCallback()) {
        console.log("redirect");

        /**
         * Open the login page hosted by Authing in a redirect mode.
         * After the authentication is successful, you need to cooperate with
         * the `handleRedirectCallback` method to process the authorization code 
         * or token sent by Authing at the callback endpoint to obtain the 
         * user's login status.
         */
        sdk.handleRedirectCallback().then((res) => {
          state.loginState = res;
          window.location.replace("/");
        });
      } else {
        getLoginState();
      }
    });

    return {
      ...toRefs(state),
      login,
    };
  },
});
</script>
```
:::

::: tab Angular
```html
<!-- src/app/app.component.html -->

<div>
  <p>
    <button (click)="login()">loginWithRedirect</button>
  </p>
  <p *ngIf="loginState">
    <textarea cols="100" rows="20" readOnly>{{ loginState | json }}</textarea>
  </p>
</div>
```

```ts{48-53}
// <!-- src/app/app.component.ts -->

import { Component } from '@angular/core';
import { Authing } from '@authing/browser';
import type { LoginState } from '@authing/browser/dist/types/global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  loginState: LoginState | null = null;

  private sdk = new Authing({
    // Very important, please fill in carefully!
    // If the application enables SSO, you must write the "App Panel Address" 
    // for SSO here; otherwise, fill in the application's "Subdomain".
    domain: 'SSO App Panel Address',
    appId: 'App ID',
    // The login callback address needs to be specified in the console
    // "Configuration - Authentication Configuration - Login Callback URL"
    redirectUri: 'Login Callback URL',
  });

  ngOnInit() {
    // Determine whether the current URL is the Authing login callback URL
    if (this.sdk.isRedirectCallback()) {
      console.log('redirect');

      /**
       * Open the login page hosted by Authing in a redirect mode.
       * After the authentication is successful, you need to cooperate with
       * the `handleRedirectCallback` method to process the authorization code 
       * or token sent by Authing at the callback endpoint to obtain 
       * the user's login status.
       */
      this.sdk.handleRedirectCallback().then((res) => {
        this.loginState = res;
        window.location.replace('/');
      });
    } else {
      this.getLoginState();
    }
  }

  /**
   * Redirect to the Authing-hosted login page
   */
  login() {
    this.sdk.loginWithRedirect();
  }

  /**
   * Get the user's login status
   */
  async getLoginState() {
    const state = await this.sdk.getLoginState();
    this.loginState = state;
  }
}
```
:::
::::


If you want to customize the parameters, you can also customize the following parameters. If you do not pass the parameters, the default parameters will be used.

:::: tabs :options="{ useUrlFragment: false }"
::: tab React
```ts
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
    redirectUri: 'Login Callback URL',
    originalUri: 'URL to initiate login',
    forced: false,
    customState: {},
  };
  sdk.loginWithRedirect(params);
};
```
:::

::: tab Vue2
```js
export default {
  ...
  methods: {
    /**
     * Redirect to the Authing-hosted login page
     */
    login() {
      const params = {
        // The callback url, the default is redirectUri in the initialization parameter
        redirectUri: "Login Callback URL";

        // The URL that initiates the login.
        // If redirectToOriginalUri is set, it will be redirected back to this page 
        // after the login. The default is the current URL
        originalUri: "URL to initiate login";

        // Prompt the user to log in again even if the user is already logged in
        forced: false;

        // Custom intermediate state, which will be passed to the callback endpoint
        customState: {};
      };
      this.sdk.loginWithRedirect(params);
    },
    ...
  },
  ...
}
```
:::

::: tab Vue3
```js
export default {
  ...
  setup() {
    /**
     * Redirect to the Authing-hosted login page
     */
    const login = () => {
      const params = {
        // The callback url, the default is redirectUri in the initialization parameter
        redirectUri: "Login Callback URL";

        // The URL that initiates the login.
        // If redirectToOriginalUri is set, it will be redirected back to this page 
        // after the login. The default is the current URL
        originalUri: "URL to initiate login";

        // Prompt the user to log in again even if the user is already logged in
        forced: false;

        // Custom intermediate state, which will be passed to the callback endpoint
        customState: {};
      };
      sdk.loginWithRedirect(params);
    }

    return {
      login
    }
  }
  ...
}
```
:::

::: tab Angular
```ts
export class AppComponent {
  ...
  /**
   * Redirect to the Authing-hosted login page
   */
  login() {
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
      redirectUri: 'Login Callback URL',
      originalUri: 'URL to initiate login',
      forced: false,
      customState: {},
    };
    this.sdk.loginWithRedirect(params);
  }
  ...
}
```
:::
::::


### Popup login

You can also use the following method on your business software page to let users log in in a new window by popping up a new window:

:::: tabs :options="{ useUrlFragment: false }"
::: tab React
```tsx{21-27}
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Authing } from '@authing/browser';
import type { LoginState } from '@authing/browser/dist/types/global';

function App() {
  const sdk = useMemo(() => {
    return new Authing({
      // Very important, please fill in carefully!
      // If the application enables SSO, you must write the "App Panel Address" 
      // for SSO here; otherwise, fill in the application's "Subdomain".
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
:::

::: tab Vue2
```html{43-49}
<template>
  <div id="app">
    <p>
      <button @click="login">loginWithPopup</button>
    </p>
    <p v-if="loginState">
      <textarea
        cols="100"
        rows="20"
        readOnly
        :value="JSON.stringify(loginState, null, 2)"
      ></textarea>
    </p>
  </div>
</template>
<script>
import { Authing } from "@authing/browser";

export default {
  name: "App",
  data() {
    return {
      sdk: null,
      loginState: null,
    };
  },
  created() {
    this.sdk = new Authing({
      // Very important, please fill in carefully!
      // If the application enables SSO, you must write the "App Panel Address" 
      // for SSO here; otherwise, fill in the application's "Subdomain".
      domain: "SSO App Panel Address",
      appId: "App ID",
      // The login callback address needs to be specified in the console
      // "Configuration - Authentication Configuration - Login Callback URL"
      redirectUri: "Login Callback URL",
    });
  },
  mounted() {
    this.getLoginState();
  },
  methods: {
    /**
     * Open Authing-hosted login page as a popup
     */
    async login() {
      const res = await this.sdk.loginWithPopup();
      this.loginState = res;
    },
    /**
     * Get the user's login status
     */
    async getLoginState() {
      const state = await this.sdk.getLoginState();
      this.loginState = state;
    },
  },
};
</script>
```
:::

::: tab Vue3
```html{47-53}
<template>
  <div>
    <p>
      <button @click="login">loginWithPopup</button>
    </p>
    <p v-if="loginState">
      <textarea
        cols="100"
        rows="20"
        readOnly
        :value="JSON.stringify(loginState, null, 2)"
      ></textarea>
    </p>
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import { Authing } from "@authing/browser";

export default defineComponent({
  name: "App",
  setup() {
    const sdk = new Authing({
      // Very important, please fill in carefully!
      // If the application enables SSO, you must write the "App Panel Address" 
      // for SSO here; otherwise, fill in the application's "Subdomain".
      domain: "SSO App Panel Address",
      appId: "App ID",
      // The login callback address needs to be specified in the console
      // "Configuration - Authentication Configuration - Login Callback URL"
      redirectUri: "Login Callback URL",
    });

    const state = reactive({
      loginState: null,
    });

    /**
     * Get the user's login status
     */
    const getLoginState = async () => {
      const res = await sdk.getLoginState();
      state.loginState = res;
    };

    /**
     * Open Authing-hosted login page as a popup
     */
    const login = async () => {
      const res = await sdk.loginWithPopup();
      state.loginState = res;
    };

    onMounted(getLoginState);

    return {
      ...toRefs(state),
      login,
    };
  },
});
</script>
```
:::

::: tab Angular
```html
<!-- src/app/app.component.html -->

<div>
  <p>
    <button (click)="login()">loginWithPopup</button>
  </p>
  <p *ngIf="loginState">
    <textarea cols="100" rows="20" readOnly>{{ loginState | json }}</textarea>
  </p>
</div>
```

```ts{31-37}
// <!-- src/app/app.component.ts -->

import { Component } from '@angular/core';
import { Authing } from '@authing/browser';
import type { LoginState } from '@authing/browser/dist/types/global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  loginState: LoginState | null = null;

  private sdk = new Authing({
    // Very important, please fill in carefully!
    // If the application enables SSO, you must write the "App Panel Address" 
    // for SSO here; otherwise, fill in the application's "Subdomain".
    domain: 'SSO App Panel Address',
    appId: 'App ID',
    // The login callback address needs to be specified in the console
    // "Configuration - Authentication Configuration - Login Callback URL"
    redirectUri: 'Login Callback URL',
  });

  ngOnInit() {
    this.getLoginState();
  }

  /**
   * Open Authing-hosted login page as a popup
   */
  async login() {
    const res = await this.sdk.loginWithPopup();
    this.loginState = res;
  }

  /**
   * Get the user's login status
   */
  async getLoginState() {
    const state = await this.sdk.getLoginState();
    this.loginState = state;
  }
}
```
:::
::::


If you want to customize the parameters, you can also customize the following parameters. If you do not pass the parameters, the default parameters will be used.

:::: tabs :options="{ useUrlFragment: false }"
::: tab React
```ts
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
:::

::: tab Vue2
```js
export default {
  ...
  data() {
    return {
      sdk: null,
      loginState: null,
    }
  },
  methods: {
    /**
     * Open Authing-hosted login page as a popup
     */
    async login() {
      const params = {
        // The callback url, the default is redirectUri in the initialization parameter
        redirectUri: "Login Callback URL";

        // Prompt the user to log in again even if the user is already logged in
        forced: false;
      };
      const res = await this.sdk.loginWithPopup(params);
      this.loginState = res;
    },
    ...
  },
  ...
}
```
:::

::: tab Vue3
```js
export default {
  ...
  setup() {
    /**
     * Open Authing-hosted login page as a popup
     */
    const login = async () => {
      const params = {
        // The callback url, the default is redirectUri in the initialization parameter
        redirectUri: "Login Callback URL";

        // Prompt the user to log in again even if the user is already logged in
        forced: false;
      };
      const res = await sdk.loginWithPopup(params);
      state.loginState = res;
    };

    return {
      login
    }
  }
  ...
}
```
:::

::: tab Angular
```ts
export class AppComponent {
  ...
  /**
   * Open Authing-hosted login page as a popup
   */
  async login() {
    const params: {
    // The callback url, the default is redirectUri in the initialization parameter
    redirectUri?: string,

    // Prompt the user to log in again even if the user is already logged in
    forced?: boolean,
  } = {
    redirectUri: 'Login Callback URL',
    forced: false,
  };
    const res = await this.sdk.loginWithPopup(params);
    this.loginState = res;
  };
  ...
}
```
:::
::::


### Silent login

As mentioned in the article [Self-built App SSO solution](/en/guides/app/sso.md), multiple self-built applications can be added to the **SSO** panel. If the user has already logged in to one of the applications, he can access other applications in another tab of the same browser. When the application is used, it can realize silent login, directly obtain user information, and realize the effect of single sign-on.

:::: tabs :options="{ useUrlFragment: false }"
::: tab React
```tsx{22-45}
import React, { useEffect, useMemo, useState } from 'react';
import { Authing } from '@authing/browser';
import type { LoginState } from '@authing/browser/dist/types/global';

function App() {
  const sdk = useMemo(() => {
    return new Authing({
      // Very important, please fill in carefully!
      // If the application enables SSO, you must write the "App Panel Address" 
      // for SSO here; otherwise, fill in the application's "Subdomain".
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
       * the `handleRedirectCallback` method to process the authorization code 
       * or token sent by Authing at the callback endpoint to obtain the 
       * user's login status.
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
:::

::: tab Vue2
```html{38-64}
<template>
  <div id="app">
    <p v-if="loginState">
      <textarea
        cols="100"
        rows="20"
        readOnly
        :value="JSON.stringify(loginState, null, 2)"
      ></textarea>
    </p>
  </div>
</template>

<script>
import { Authing } from "@authing/browser";

export default {
  name: "App",
  data() {
    return {
      sdk: null,
      loginState: null,
    };
  },
  created() {
    this.sdk = new Authing({
      // Very important, please fill in carefully!
      // If the application enables SSO, you must write the "App Panel Address" 
      // for SSO here; otherwise, fill in the application's "Subdomain".
      domain: "SSO App Panel Address",
      appId: "App ID",
      // The login callback address needs to be specified in the console
      // "Configuration - Authentication Configuration - Login Callback URL"
      redirectUri: "Login Callback URL",
    });
  },
  mounted() {
    // Determine whether the current URL is the Authing login callback URL
    if (this.sdk.isRedirectCallback()) {
      console.log("redirect");

      /**
       * Open the login page hosted by Authing in a redirect mode.
       * After the authentication is successful, you need to cooperate with
       * the `handleRedirectCallback` method to process the authorization code 
       * or token sent by Authing at the callback endpoint to obtain 
       * the user's login status.
       */
      this.sdk.handleRedirectCallback().then((res) => {
        this.loginState = res;
        window.location.replace("/");
      });
    } else {
      console.log("normal");

      this.sdk.getLoginState().then((res) => {
        if (res) {
          this.loginState = res;
        } else {
          // If the user is not logged in, redirect to the authentication center
          this.sdk.loginWithRedirect();
        }
      });
    }
  },
};
</script>
```
:::

::: tab Vue3
```html{47-66}
<template>
  <p v-if="loginState">
    <textarea
      cols="100"
      rows="20"
      readOnly
      :value="JSON.stringify(loginState, null, 2)"
    ></textarea>
  </p>
</template>

<script>
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import { Authing } from "@authing/browser";

export default defineComponent({
  name: "App",
  setup() {
    const sdk = new Authing({
      // Very important, please fill in carefully!
      // If the application enables SSO, you must write the "App Panel Address" 
      // for SSO here; otherwise, fill in the application's "Subdomain".
      domain: "SSO App Panel Address",
      appId: "App ID",
      // The login callback address needs to be specified in the console
      // "Configuration - Authentication Configuration - Login Callback URL"
      redirectUri: "Login Callback URL",
    });

    const state = reactive({
      loginState: null,
    });

    /**
     * Get the user's login status
     */
    const getLoginState = async () => {
      const res = await sdk.getLoginState();
      state.loginState = res;

      if (!res) {
        sdk.loginWithRedirect();
      }
    };

    onMounted(() => {
      // Determine whether the current URL is the Authing login callback URL
      if (sdk.isRedirectCallback()) {
        console.log("redirect");

        /**
         * Open the login page hosted by Authing in a redirect mode.
         * After the authentication is successful, you need to cooperate with
         * the `handleRedirectCallback` method to process the authorization code 
         * or token sent by Authing at the callback endpoint to obtain the 
         * user's login status.
         */
        sdk.handleRedirectCallback().then((res) => {
          state.loginState = res;
          window.location.replace("/");
        });
      } else {
        console.log("normal");

        getLoginState();
      }
    });

    return {
      ...toRefs(state),
    };
  },
});
</script>
```
:::

::: tab Angular
```html
<div>
  <p *ngIf="loginState">
    <textarea cols="100" rows="20" readOnly>{{ loginState | json }}</textarea>
  </p>
</div>
```

```ts{26-45}
import { Component } from '@angular/core';
import { Authing } from '@authing/browser';
import type { LoginState } from '@authing/browser/dist/types/global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  loginState: LoginState | null = null;

  private sdk = new Authing({
    // Very important, please fill in carefully!
    // If the application enables SSO, you must write the "App Panel Address" 
    // for SSO here; otherwise, fill in the application's "Subdomain".
    domain: 'SSO App Panel Address',
    appId: 'App ID',
    // The login callback address needs to be specified in the console
    // "Configuration - Authentication Configuration - Login Callback URL"
    redirectUri: 'Login Callback URL',
  });

  ngOnInit() {
    // Determine whether the current URL is the Authing login callback URL
    if (this.sdk.isRedirectCallback()) {
      console.log('redirect');

      /**
       * Open the login page hosted by Authing in a redirect mode.
       * After the authentication is successful, you need to cooperate with
       * the `handleRedirectCallback` method to process the authorization code 
       * or token sent by Authing at the callback endpoint to obtain 
       * the user's login status.
       */
      this.sdk.handleRedirectCallback().then((res) => {
        this.loginState = res;
        window.location.replace('/');
      });
    } else {
      console.log('normal');

      this.getLoginState();
    }
  }

  /**
   * Get the user's login status
   */
  async getLoginState() {
    const res = await this.sdk.getLoginState();
    if (res) {
      this.loginState = res;
    } else {
      // If the user is not logged in, redirect to the authentication center
      this.sdk.loginWithRedirect();
    }
  }
}
```
:::
::::


### Advanced usage

The essence of each login is to access a URL, which can carry many parameters. The Authing Browser SDK uses default parameters by default. If you need fine-grained control over login request parameters, you can refer to this example.

```js
import { Authing } from "@authing/browser";

const sdk = new Authing({
  // Very important, please fill in carefully!
  // If the application enables SSO, you must write the "App Panel Address" 
  // for SSO here; otherwise, fill in the application's "Subdomain".
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

  // Whether to request Authing to check the validity of the Access Token every time 
  // the login status is obtained, it can be used in a single sign-out scenario, 
  // default is false If set to true, you need to set "Configuration" - 
  // "Other Configuration" - "Client Verification Method for Validating Token" 
  // to none in the console
  introspectAccessToken: false,

  // width of the popup window
  popupWidth: 500,

  // height of the popup window
  popupHeight: 600,
});
```

## Check login status and get Token

If you want to check the user's login state and get the user's `Access Token`, `ID Token`, you can call the `getLoginState` method. If the user is not logged in at Authing, this method will throw an error:

:::: tabs :options="{ useUrlFragment: false }"
::: tab React
```tsx{28-34}
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Authing } from '@authing/browser';
import type { LoginState } from '@authing/browser/dist/types/global';

function App() {
  const sdk = useMemo(() => {
    return new Authing({
      // Very important, please fill in carefully!
      // If the application enables SSO, you must write the "App Panel Address" 
      // for SSO here; otherwise, fill in the application's "Subdomain".
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
       * the `handleRedirectCallback` method to process the authorization code 
       * or token sent by Authing at the callback endpoint to obtain the 
       * user's login status.
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
:::

::: tab Vue2
```html{63-69}
<template>
  <div id="app">
    <p>
      <button @click="login">loginWithRedirect</button>
    </p>
    <p v-if="loginState">
      <textarea
        cols="100"
        rows="20"
        readOnly
        :value="JSON.stringify(loginState, null, 2)"
      ></textarea>
    </p>
  </div>
</template>

<script>
import { Authing } from "@authing/browser";

export default {
  name: "App",
  data() {
    return {
      sdk: null,
      loginState: null,
    };
  },
  created() {
    this.sdk = new Authing({
      // Very important, please fill in carefully!
      // If the application enables SSO, you must write the "App Panel Address" 
      // for SSO here; otherwise, fill in the application's "Subdomain".
      domain: "SSO App Panel Address",
      appId: "App ID",
      // The login callback address needs to be specified in the console
      // "Configuration - Authentication Configuration - Login Callback URL"
      redirectUri: "Login Callback URL",
    });
  },
  mounted() {
    // Determine whether the current URL is the Authing login callback URL
    if (this.sdk.isRedirectCallback()) {
      console.log("redirect");

      /**
       * Open the login page hosted by Authing in a redirect mode.
       * After the authentication is successful, you need to cooperate with
       * the `handleRedirectCallback` method to process the authorization code 
       * or token sent by Authing at the callback endpoint to obtain 
       * the user's login status.
       */
      this.sdk.handleRedirectCallback().then((res) => {
        this.loginState = res;
        window.location.replace("/");
      });
    } else {
      console.log("normal");

      this.getLoginState();
    }
  },
  methods: {
    /**
     * Get the user's login status
     */
    async getLoginState() {
      const state = await this.sdk.getLoginState();
      this.loginState = state;
    },
    /**
     * Redirect to the Authing-hosted login page
     */
    login() {
      this.sdk.loginWithRedirect();
    },
  },
};
</script>
```
:::

::: tab Vue3
```html{39-49}
<template>
  <div>
    <p>
      <button @click="login">loginWithRedirect</button>
    </p>
    <p v-if="loginState">
      <textarea
        cols="100"
        rows="20"
        readOnly
        :value="JSON.stringify(loginState, null, 2)"
      ></textarea>
    </p>
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import { Authing } from "@authing/browser";

export default defineComponent({
  name: "App",
  setup() {
    const sdk = new Authing({
      // Very important, please fill in carefully!
      // If the application enables SSO, you must write the "App Panel Address" 
      // for SSO here; otherwise, fill in the application's "Subdomain".
      domain: "SSO App Panel Address",
      appId: "App ID",
      // The login callback address needs to be specified in the console
      // "Configuration - Authentication Configuration - Login Callback URL"
      redirectUri: "Login Callback URL",
    });

    const state = reactive({
      loginState: null,
    });

    /**
     * Get the user's login status
     */
    const getLoginState = async () => {
      const res = await sdk.getLoginState();
      state.loginState = res;

      if (!res) {
        sdk.loginWithRedirect();
      }
    };

    /**
     * Redirect to the Authing-hosted login page
     */
    const login = () => {
      sdk.loginWithRedirect();
    };

    onMounted(() => {
      // Determine whether the current URL is the Authing login callback URL
      if (sdk.isRedirectCallback()) {
        console.log("redirect");

        /**
         * Open the login page hosted by Authing in a redirect mode.
         * After the authentication is successful, you need to cooperate with
         * the `handleRedirectCallback` method to process the authorization code 
         * or token sent by Authing at the callback endpoint to obtain the 
         * user's login status.
         */
        sdk.handleRedirectCallback().then((res) => {
          state.loginState = res;
          window.location.replace("/");
        });
      } else {
        console.log("normal");

        getLoginState();
      }
    });

    return {
      ...toRefs(state),
      login,
    };
  },
});
</script>
```
:::

::: tab Angular
```html
<!-- src/app/app.component.html -->

<div>
  <p>
    <button (click)="login()">loginWithRedirect</button>
  </p>
  <p *ngIf="loginState">
    <textarea cols="100" rows="20" readOnly>{{ loginState | json }}</textarea>
  </p>
</div>
```

```ts{55-61}
// <!-- src/app/app.component.ts -->

import { Component } from '@angular/core';
import { Authing } from '@authing/browser';
import type { LoginState } from '@authing/browser/dist/types/global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  loginState: LoginState | null = null;

  private sdk = new Authing({
    // Very important, please fill in carefully!
    // If the application enables SSO, you must write the "App Panel Address" 
    // for SSO here; otherwise, fill in the application's "Subdomain".
    domain: 'SSO App Panel Address',
    appId: 'App ID',
    // The login callback address needs to be specified in the console
    // "Configuration - Authentication Configuration - Login Callback URL"
    redirectUri: 'Login Callback URL',
  });

  ngOnInit() {
    // Determine whether the current URL is the Authing login callback URL
    if (this.sdk.isRedirectCallback()) {
      console.log('redirect');

      /**
       * Open the login page hosted by Authing in a redirect mode.
       * After the authentication is successful, you need to cooperate with
       * the `handleRedirectCallback` method to process the authorization code 
       * or token sent by Authing at the callback endpoint to obtain 
       * the user's login status.
       */
      this.sdk.handleRedirectCallback().then((res) => {
        this.loginState = res;
        window.location.replace('/');
      });
    } else {
      this.getLoginState();
    }
  }

  /**
   * Redirect to the Authing-hosted login page
   */
  login() {
    this.sdk.loginWithRedirect();
  }

  /**
   * Get the user's login status
   */
  async getLoginState() {
    const state = await this.sdk.getLoginState();
    this.loginState = state;
  }
}
```
:::
::::


## Get user information

You need to use the Access Token to get the user's personal information:

1. When the user logs in successfully for the first time, they can get the user's Access Token in the callback function, and then use the Access Token to obtain user information;
2. If the user is already logged in, you can first obtain the user's Access Token and then use the Access Token to obtain user information.

:::: tabs :options="{ useUrlFragment: false }"
::: tab React
```tsx{37-49}
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Authing } from '@authing/browser';
import type { LoginState, UserInfo } from '@authing/browser/dist/types/global';

function App() {
  const sdk = useMemo(() => {
    return new Authing({
      // Very important, please fill in carefully!
      // If the application enables SSO, you must write the "App Panel Address" 
      // for SSO here; otherwise, fill in the application's "Subdomain".
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
       * the `handleRedirectCallback` method to process the authorization code 
       * or token sent by Authing at the callback endpoint to obtain the 
       * user's login status.
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
:::
  
::: tab Vue2
```html{73-85}
<template>
  <div id="app">
    <p>
      <button @click="login">loginWithRedirect</button>
      <button @click="getUserInfo">getUserInfo</button>
    </p>
    <p v-if="loginState">
      <textarea
        cols="100"
        rows="20"
        readOnly
        :value="JSON.stringify(loginState, null, 2)"
      ></textarea>
    </p>
    <p v-if="userInfo">
      <textarea
        cols="100"
        rows="20"
        readOnly
        :value="JSON.stringify(userInfo, null, 2)"
      ></textarea>
    </p>
  </div>
</template>

<script>
import { Authing } from "@authing/browser";

export default {
  name: "App",
  data() {
    return {
      sdk: null,
      loginState: null,
      userInfo: null,
    };
  },
  created() {
    this.sdk = new Authing({
      // Very important, please fill in carefully!
      // If the application enables SSO, you must write the "App Panel Address" 
      // for SSO here; otherwise, fill in the application's "Subdomain".
      domain: "SSO App Panel Address",
      appId: "App ID",
      // The login callback address needs to be specified in the console
      // "Configuration - Authentication Configuration - Login Callback URL"
      redirectUri: "Login Callback URL",
    });
  },
  mounted() {
    // Determine whether the current URL is the Authing login callback URL
    if (this.sdk.isRedirectCallback()) {
      console.log("redirect");

      /**
       * Open the login page hosted by Authing in a redirect mode.
       * After the authentication is successful, you need to cooperate with
       * the `handleRedirectCallback` method to process the authorization code 
       * or token sent by Authing at the callback endpoint to obtain the 
       * user's login status.
       */
      this.sdk.handleRedirectCallback().then((res) => {
        this.loginState = res;
        window.location.replace("/");
      });
    } else {
      console.log("normal");

      this.getLoginState();
    }
  },
  methods: {
    /**
     * Obtain user identity information with Access Token
     */
    async getUserInfo() {
      if (!this.loginState) {
        alert("not logged in");
        return;
      }
      const userInfo = await this.sdk.getUserInfo({
        accessToken: this.loginState.accessToken,
      });
      this.userInfo = userInfo;
    },
    /**
     * Get the user's login status
     */
    async getLoginState() {
      const state = await this.sdk.getLoginState();
      this.loginState = state;
    },
    /**
     * Redirect to the Authing-hosted login page
     */
    login() {
      this.sdk.loginWithRedirect();
    },
  },
};
</script>
```
:::

::: tab Vue3
```html{70-82}
<template>
  <div>
    <p>
      <button @click="login">loginWithRedirect</button>
    </p>
    <p v-if="loginState">
      <textarea
        cols="100"
        rows="20"
        readOnly
        :value="JSON.stringify(loginState, null, 2)"
      ></textarea>
    </p>
    <p>
      <button @click="getUserInfo">getUserInfo</button>
    </p>
    <p v-if="userInfo">
      <textarea
        cols="100"
        rows="15"
        readOnly
        :value="JSON.stringify(userInfo, null, 2)"
      ></textarea>
    </p>
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import { Authing } from "@authing/browser";

export default defineComponent({
  name: "App",
  setup() {
    const sdk = new Authing({
      // Very important, please fill in carefully!
      // If the application enables SSO, you must write the "App Panel Address" 
      // for SSO here; otherwise, fill in the application's "Subdomain".
      domain: "SSO App Panel Address",
      appId: "App ID",
      // The login callback address needs to be specified in the console
      // "Configuration - Authentication Configuration - Login Callback URL"
      redirectUri: "Login Callback URL",
    });

    const state = reactive({
      loginState: null,
      userInfo: null,
    });

    /**
     * Get the user's login status
     */
    const getLoginState = async () => {
      const res = await sdk.getLoginState();
      state.loginState = res;

      if (!res) {
        sdk.loginWithRedirect();
      }
    };

    /**
     * Redirect to the Authing-hosted login page
     */
    const login = () => {
      sdk.loginWithRedirect();
    };

    /**
     * Obtain user identity information with Access Token
     */
    const getUserInfo = async () => {
      if (!state.loginState) {
        alert("not logged in");
        return;
      }
      const userInfo = await sdk.getUserInfo({
        accessToken: state.loginState.accessToken,
      });
      state.userInfo = userInfo;
    };

    onMounted(() => {
      // Determine whether the current URL is the Authing login callback URL
      if (sdk.isRedirectCallback()) {
        console.log("redirect");

        /**
         * Open the login page hosted by Authing in a redirect mode.
         * After the authentication is successful, you need to cooperate with
         * the `handleRedirectCallback` method to process the authorization code 
         * or token sent by Authing at the callback endpoint to obtain the 
         * user's login status.
         */
        sdk.handleRedirectCallback().then((res) => {
          state.loginState = res;
          window.location.replace("/");
        });
      } else {
        console.log("normal");

        getLoginState();
      }
    });

    return {
      ...toRefs(state),
      login,
      getUserInfo,
    };
  },
});
</script>
```
:::

::: tab Angular
```html
<!-- src/app/app.component.html -->

<div>
  <p>
    <button (click)="login()">loginWithRedirect</button>
    <button (click)="getUserInfo()">getUserInfo</button>
  </p>
  <p *ngIf="loginState">
    <textarea cols="100" rows="20" readOnly>{{ loginState | json }}</textarea>
  </p>
  <p *ngIf="userInfo">
    <textarea cols="100" rows="20" readOnly>{{ userInfo | json }}</textarea>
  </p>
</div>
```

```ts{49-61}
// <!-- src/app/app.component.ts -->

import { Component } from '@angular/core';
import { Authing } from '@authing/browser';
import type { LoginState, UserInfo } from '@authing/browser/dist/types/global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  loginState: LoginState | null = null;
  userInfo: UserInfo | null = null;

  private sdk = new Authing({
    // Very important, please fill in carefully!
    // If the application enables SSO, you must write the "App Panel Address" 
    // for SSO here; otherwise, fill in the application's "Subdomain".
    domain: 'SSO App Panel Address',
    appId: 'App ID',
    // The login callback address needs to be specified in the console
    // "Configuration - Authentication Configuration - Login Callback URL"
    redirectUri: 'Login Callback URL',
  });

  ngOnInit() {
    // Determine whether the current URL is the Authing login callback URL
    if (this.sdk.isRedirectCallback()) {
      console.log('redirect');

      /**
       * Open the login page hosted by Authing in a redirect mode.
       * After the authentication is successful, you need to cooperate with
       * the `handleRedirectCallback` method to process the authorization code 
       * or token sent by Authing at the callback endpoint to obtain 
       * the user's login status.
       */
      this.sdk.handleRedirectCallback().then((res) => {
        this.loginState = res;
        window.location.replace('/');
      });
    } else {
      this.getLoginState();
    }
  }

  /**
   * Obtain user identity information with Access Token
   */
  async getUserInfo() {
    if (!this.loginState) {
      alert('not logged in');
      return;
    }
    const userInfo = await this.sdk.getUserInfo({
      accessToken: this.loginState.accessToken,
    });
    this.userInfo = userInfo;
  }

  /**
   * Redirect to the Authing-hosted login page
   */
  login() {
    this.sdk.loginWithRedirect();
  }

  /**
   * Get the user's login status
   */
  async getLoginState() {
    const state = await this.sdk.getLoginState();
    this.loginState = state;
  }
}
```
:::
::::


## Sign out

You can call the `logoutWithRedirect` method of the SDK to log out

:::: tabs :options="{ useUrlFragment: false }"
::: tab React
```tsx{36-41}
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Authing } from '@authing/browser';
import type { LoginState } from '@authing/browser/dist/types/global';

function App() {
  const sdk = useMemo(() => {
    return new Authing({
      // Very important, please fill in carefully!
      // If the application enables SSO, you must write the "App Panel Address" 
      // for SSO here; otherwise, fill in the application's "Subdomain".
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
       * the `handleRedirectCallback` method to process the authorization code 
       * or token sent by Authing at the callback endpoint to obtain 
       * the user's login status.
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
:::

::: tab Vue2
```html{68-73}
<template>
  <div id="app">
    <p>
      <button @click="login">loginWithRedirect</button>
      <button @click="logout">logout</button>
    </p>
    <p v-if="loginState">
      <textarea
        cols="100"
        rows="20"
        readOnly
        :value="JSON.stringify(loginState, null, 2)"
      ></textarea>
    </p>
  </div>
</template>

<script>
import { Authing } from "@authing/browser";

export default {
  name: "App",
  data() {
    return {
      sdk: null,
      loginState: null,
    };
  },
  created() {
    this.sdk = new Authing({
      // Very important, please fill in carefully!
      // If the application enables SSO, you must write the "App Panel Address" 
      // for SSO here; otherwise, fill in the application's "Subdomain".
      domain: "SSO App Panel Address",
      appId: "App ID",
      // The login callback address needs to be specified in the console
      // "Configuration - Authentication Configuration - Login Callback URL"
      redirectUri: "Login Callback URL",
    });
  },
  mounted() {
    // Determine whether the current URL is the Authing login callback URL
    if (this.sdk.isRedirectCallback()) {
      console.log("redirect");

      /**
       * Open the login page hosted by Authing in a redirect mode.
       * After the authentication is successful, you need to cooperate with
       * the `handleRedirectCallback` method to process the authorization code 
       * or token sent by Authing at the callback endpoint to obtain 
       * the user's login status.
       */
      this.sdk.handleRedirectCallback().then((res) => {
        this.loginState = res;
        window.location.replace("/");
      });
    } else {
      this.getLoginState();
    }
  },
  methods: {
    /**
     * Redirect to the Authing-hosted login page
     */
    login() {
      this.sdk.loginWithRedirect();
    },
    /**
     * Sign out
     */
    logout() {
      this.sdk.logoutWithRedirect();
    },
    /**
     * Get the user's login status
     */
    async getLoginState() {
      const state = await this.sdk.getLoginState();
      this.loginState = state;
    },
  },
};
</script>
```
:::

::: tab Vue3
```html{24-31}
<template>
  <div>
    <button @click="logout">logout</button>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { Authing } from "@authing/browser";

export default defineComponent({
  name: "App",
  setup() {
    const sdk = new Authing({
      // Very important, please fill in carefully!
      // If the application enables SSO, you must write the "App Panel Address" 
      // for SSO here; otherwise, fill in the application's "Subdomain".
      domain: "SSO App Panel Address",
      appId: "App ID",
      // The login callback address needs to be specified in the console
      // "Configuration - Authentication Configuration - Login Callback URL"
      redirectUri: "Login Callback URL",
    });

    /**
     * Sign out
     */
    const logout = () => {
      sdk.logoutWithRedirect();
    };

    return {
      logout,
    };
  },
});
</script>
```
:::

::: tab Angular
```html
<!-- src/app/app.component.html -->

<div>
  <p>
    <button (click)="login()">loginWithRedirect</button>
    <button (click)="logout()">logout</button>
  </p>
  <p *ngIf="loginState">
    <textarea cols="100" rows="20" readOnly>{{ loginState | json }}</textarea>
  </p>
</div>
```

```ts{54-61}
// <!-- src/app/app.component.ts -->

import { Component } from '@angular/core';
import { Authing } from '@authing/browser';
import type { LoginState } from '@authing/browser/dist/types/global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  loginState: LoginState | null = null;

  private sdk = new Authing({
    // Very important, please fill in carefully!
    // If the application enables SSO, you must write the "App Panel Address" 
    // for SSO here; otherwise, fill in the application's "Subdomain".
    domain: 'SSO App Panel Address',
    appId: 'App ID',
    // The login callback address needs to be specified in the console
    // "Configuration - Authentication Configuration - Login Callback URL"
    redirectUri: 'Login Callback URL',
  });

  ngOnInit() {
    // Determine whether the current URL is the Authing login callback URL
    if (this.sdk.isRedirectCallback()) {
      console.log('redirect');

      /**
       * Open the login page hosted by Authing in a redirect mode.
       * After the authentication is successful, you need to cooperate with
       * the `handleRedirectCallback` method to process the authorization code 
       * or token sent by Authing at the callback endpoint to obtain the 
       * user's login status.
       */
      this.sdk.handleRedirectCallback().then((res) => {
        this.loginState = res;
        window.location.replace('/');
      });
    } else {
      this.getLoginState();
    }
  }

  /**
   * Redirect to the Authing-hosted login page
   */
  login() {
    this.sdk.loginWithRedirect();
  }

  /**
   * Sign out
   */
  logout() {
    this.sdk.logoutWithRedirect();
  }

  /**
   * Get the user's login status
   */
  async getLoginState() {
    const state = await this.sdk.getLoginState();
    this.loginState = state;
  }
}
```
:::
::::


## Code reference

- [Demo](https://github.com/Authing/authing-browser-sdk/tree/main/example/sso/)


## Get help <a id="get-help"></a>

1. Join us on Gitter: [\#authing-chat](https://forum.authing.cn/)
