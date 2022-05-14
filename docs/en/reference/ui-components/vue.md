# Vue.js Login Component

<LastUpdated/>

The Authing login component (Guard) is an embeddable login form that can be configured according to your needs and is recommended for single-page applications. It allows you to easily add various social login methods so that your users can log in seamlessly and have a consistent login experience on different platforms. Guard shields many implementation details of low-level authentication for developers, as well as cumbersome UI development.

Guard can be integrated into your Vue.js projects. You can use this component to quickly implement the login authentication process.

## Quick start

### Installation

```bash
$ yarn add @authing/vue-ui-components

# OR

$ npm install @authing/vue-ui-components --save
```

### Initialization

Introduce `@authing/vue-ui-components` to the Vue.js project and initialize it.

```html
<template>
  <AuthingGuard :appId="appId" />
</template>

<script>
  import { AuthingGuard } from "@authing/vue-ui-components";
  import "@authing/vue-ui-components/lib/index.min.css";

  export default {
    components: {
      AuthingGuard
    },
    data() {
      return {
        appId: "AUTHING\_APP\_ID"
      };
    }
  };
</script>
```

<details><summary><b>How to initialize in an HTML file?</b></summary>

#### Import by CDN

```html
<script src="https://cdn.jsdelivr.net/npm/@authing/vue-ui-components"></script>

<link href="https://cdn.jsdelivr.net/npm/@authing/vue-ui-components/lib/index.min.css" rel="stylesheet"></link>
```

#### Initialize in Script code block

```vue
<script>
const appId = "AUTHING\_APP\_ID";
const config = {
  logo: "https://usercontents.authing.cn/client/logo@2.png",
  title: "{{$localeConfig.brandName}}",
  socialConnections: ["github"]
};

const app = new Vue({
  el: "#app",
  render: h =>
    h(AuthingVueUIComponents.AuthingGuard, {
      props: {
        appId,
        config
      }
    })
});
</script>
```

</details>

### Monitor login events

`AuthingGuard` Component Callback function for `@login` event, which is called when the user successfully logs in, and you can get the user information of the current user here. View the [complete list of events](#完整参数).

```vue
<template>
  <AuthingGuard :appId="appId" @login="handleLogin" />
</template>

<script>
import { AuthingGuard } from "@authing/vue-ui-components";
import "@authing/vue-ui-components/lib/index.min.css";

export default {
  components: {
    AuthingGuard
  },
  data() {
    return {
      appId: "AUTHING\_APP\_ID"
    };
  },
  methods: {
    handleLogin(userInfo) {
      console.log(userInfo);
    }
  }
};
</script>
```

<details><summary><b>What should we do after understanding user information?</b></summary>

!!!include(common/what-to-do-when-you-get-userinfo.md)!!!

</details>

### Add social login

Pass in the `socialConnections` list in the initialization parameter `config` to specify the social logins that need to be displayed([all social logins configured by the application](/guides/app/config-login-methods.md#添加社会化登录)are displayed by default).

```vue
<template>
  <AuthingGuard :appId="appId" :config="config" />
</template>

<script>
import { AuthingGuard } from "@authing/vue-ui-components";
import "@authing/vue-ui-components/lib/index.min.css";

export default {
  components: {
    AuthingGuard
  },
  data() {
    return {
      appId: "AUTHING\_APP\_ID",
      config: {
        socialConnections: ["github"]
      }
    };
  },
  methods: {
    handleLogin(userInfo) {
      console.log(userInfo);
    }
  }
};
</script>
```

<details><summary><b>View the list of supported social logins and access procedures</b></summary>

{{$localeConfig.brandName}} currently supports 4 social logins around the world, such as GitHub, Apple, etc. The following is a complete list:

!!!include(common/social-connections-table.md)!!!

</details>

### Log out

1. Initialize the [AuthenticationClient](/reference/sdk-for-node/#使用认证模块)in the project entry file.

```js
import { initAuthClient } from "@authing/vue-ui-components";

initAuthClient({
  appId: "YOUR_APP_ID"
});
```

2. Add a `button` to log out and bind the click event to `getAuthClient().logout()`.

```vue
<template>
  <button @click="handleLogout" />
</template>

<script>
import { getAuthClient } from "@authing/vue-ui-components";

export default {
  components: {
    AuthingGuard
  },
  methods: {
    handleLogout() {
      getAuthClient().logout();
    }
  }
};
</script>
```

### Implement single sign-on

To use Guard for single sign-on, you need to set `isSSO` to `true` during initialization.

```html
<template>
  <AuthingGuard :appId="appId" :config="config" />
</template>

<script>
  import { AuthingGuard } from "@authing/vue-ui-components";
  import "@authing/vue-ui-components/lib/index.min.css";

  export default {
    components: {
      AuthingGuard
    },
    data() {
      return {
        appId: "AUTHING\_APP\_ID",
        config: {
          isSSO: true
        }
      };
    }
  };
</script>
```

## Export `authing-js-sdk`

The Guard components are packaged based on the [authing JavaScript SDK](../sdk-for-node/). When you need to perform some more advanced operations (such as managing user-defined data, modifying user information, logging out):

1. Call `initAuthClient` to initialize [AuthenticationClient](/reference/sdk-for-node/authentication/AuthenticationClient.md). Calling this function multiple times will only initialize it once.

```js
import { initAuthClient } from "@authing/vue-ui-components";

initAuthClient({
  appId: "YOUR_APP_ID"
});
```

2. Then use `getAuthClient` to get the `AuthenticationClient` instance.

```js
import { getAuthClient } from "@authing/vue-ui-components";

const authClient = getAuthClient();
```

3. Call the method of the `AuthenticationClient` instance. For a complete list of methods, please see the [AuthenticationClient method list](/reference/sdk-for-node/authentication/AuthenticationClient.md).

```js
authClient.getCurrentUser().then(user => console.log(user));
```

## Complete parameter

The Authing login component (Guard) provides many advanced configurations, such as customizing the UI and using specific login methods. See the [complete parameter list](./parameters.md).

## Event list

::: hint-info
Note that in React, event listeners should be named with small camels, such as: `onLogin`, `onLoginError`.
:::

| <p>Event name</p><p></p>                    | <p>Event Introduction</p><p></p>                                                       | <p>Event parameter</p><p></p>         | <p>Event parameter introduction</p><p></p>                                                                                              |
| :------------------------------------------ | :------------------------------------------------------------------------------------- | :------------------------------------ | :-------------------------------------------------------------------------------------------------------------------------------------- |
| <p>load</p><p></p><p></p>                   | <p>{{$localeConfig.brandName}} appId authenticate success，loading complete</p><p></p> | <p>authClient</p><p></p>              | <p>AuthenticationClient object，can directly operate login， register，details in [authing-js-sdk](/reference/sdk-for-node/)</p><p></p> |
| <p>load-error</p><p></p>                    | <p>{{$localeConfig.brandName}} appId authenticate failed，loading failed</p><p></p>    | <p>error</p><p></p><p></p>            | <p>Error information</p><p></p>                                                                                                         |
| <p>login</p><p></p>                         | <p>User login success</p><p></p>                                                       | <p>user, authClient</p><p></p>        | <p>user: user information authClient same as before</p><p></p><p></p>                                                                   |
| <p>login-error</p><p></p>                   | <p>User login failed</p><p></p>                                                        | <p>error</p><p></p>                   | <p>Error information，including information such as missing/illegal fields or server errors</p><p></p>                                  |
| <p>register</p><p></p>                      | <p>User login success</p><p></p>                                                       | <p>user, authClient</p><p></p>        | <p>user: user information authClient same as before</p><p></p>                                                                          |
| <p>register-error</p><p></p>                | <p>User login failed</p><p></p>                                                        | <p>error</p><p></p>                   | <p>Error information，including information such as missing/illegal fields or server errors</p><p></p>                                  |
| <p>pwd-email-send</p><p></p>                | <p>Forgot password email sending success</p><p></p>                                    | <p>-</p><p></p>                       | <p>-</p><p></p>                                                                                                                         |
| <p>pwd-email-send-error</p><p></p>          | <p>Forgot password email sending failed</p><p></p>                                     | <p>error</p><p></p>                   | <p>Error information</p><p></p>                                                                                                         |
| <p>pwd-phone-send</p><p></p>                | <p>Forgot password mobile verification code sending success</p><p></p>                 | <p>-</p><p></p>                       | <p>-</p><p></p>                                                                                                                         |
| <p>pwd-phone-send-error</p><p></p>          | <p>Forgot password mobile verification code sending failed</p><p></p>                  | <p>error</p><p></p>                   | <p>Error information</p><p></p>                                                                                                         |
| <p>pwd-reset</p><p></p>                     | <p>Reset password success</p><p></p>                                                   | <p>-</p><p></p>                       | <p>-</p><p></p>                                                                                                                         |
| <p>pwd-reset-error</p><p></p>               | <p>Reset password failed</p><p></p>                                                    | <p>error</p><p></p>                   | <p>Error information</p><p></p>                                                                                                         |
| <p>close</p><p></p>                         | <p>guard close event in modal mode</p><p></p>                                          | <p>-</p><p></p>                       | <p>-</p><p></p>                                                                                                                         |
| <p>login-tab-change</p><p></p>              | <p>Login tab switching event</p><p></p>                                                | <p>activeTab</p><p></p>               | <p>Tab after switching</p><p></p>                                                                                                       |
| <p>register-tab-change</p><p></p>           | <p>Register tab switching event</p><p></p>                                             | <p>activeTab</p><p></p>               | <p>Tab after switching</p><p></p>                                                                                                       |
| <p>register-tab-change</p><p></p>           | <p>Register tab switching event</p><p></p>                                             | <p>activeTab</p><p></p>               | <p>Tab after switching</p><p></p>                                                                                                       |
| <p>register-info-completed</p><p></p>       | <p>Register Supplemental Success Event</p><p></p><p></p>                               | <p>user, udfs, authClient</p><p></p>  | <p>user: user information udfs: Supplementary custom field information</p><p>authClient same as before</p><p></p>                       |
| <p>register-info-completed-error</p><p></p> | <p>Register Supplemental Failure Event</p><p></p>                                      | <p>error, udfs, authClient</p><p></p> | <p>error: error information udfs: Supplementary custom field information </p><p>authClient same as before</p><p></p>                    |

## Privatization deployment

**The privatization deployment**scenario needs to specify the GraphQL endpoint of your privatized Authing service(**without protocol header and Path**).If you are not sure, you can contact the Authing IDaaS service administrator.

```html
<template>
  <AuthingGuard :appId="appId" :config="config" />
</template>

<script>
  import { AuthingGuard } from "@authing/vue-ui-components";
  import "@authing/vue-ui-components/lib/index.min.css";

  export default {
    components: {
      AuthingGuard
    },
    data() {
      return {
        appId: "AUTHING\_APP\_ID",
        config: {
          apiHost: "https://core.you-authing-service.com"
        }
      };
    }
  };
</script>
```

## Online experience

<br>

<iframe src="https://codesandbox.io/embed/vibrant-beaver-s3gct?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="authing-vue-guard"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

## Get help

Join us on forum: [#authing-chat](https://forum.authing.cn/)
