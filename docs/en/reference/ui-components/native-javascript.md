# Native JavaScript Login Component

<LastUpdated/>

The Authing login component (Guard) is an embeddable login form that can be configured according to your needs and is recommended for single-page applications. It allows you to easily add various social login methods so that your users can log in seamlessly and have a consistent login experience on different platforms. Guard shields many implementation details of low-level authentication for developers, as well as cumbersome UI development.

Guard can be integrated into your Native JavaScript project. You can use this component to quickly implement the login authentication process.

## Quick start

### Installation

```bash
$ yarn add @authing/native-js-ui-components

# OR

$ npm install @authing/native-js-ui-components --save
```

### Initialization

Initialize in the native JavaScript project:

```javascript
import { authingGuard } from "@authing/native-js-ui-components";
// import css file
import "@authing/native-js-ui-components/lib/index.min.css";

const guard = new authingGuard("AUTHING_APP_ID");

// Event monitoring
guard.on("load", authClient => console.log(authClient));
```

<details><summary><b>How to initialize in an HTML file?</b></summary>

#### Import by CDN

```html
<!-- JavaScript -->
<script src="https://cdn.jsdelivr.net/npm/@authing/native-js-ui-components"></script>

<!-- CSS -->
<link href="https://cdn.jsdelivr.net/npm/@authing/native-js-ui-components/lib/index.min.css" rel="stylesheet"></link>
```

#### Initialize in Script code block

```html
<script>
  var guard = new authingNativeJsUIComponents.authingGuard("AUTHING_APP_ID");

  // Event monitoring
  guard.on("load", authClient => console.log(authClient));
</script>
```

</details>

### Monitor login events

You can monitor login events through `guard.on("login", callback)`:

```javascript
guard.on("login", user => {
  console.log(user);
});
```

<details><summary><b>What should we do after understanding user information?</b></summary>

!!!include(en/common/what-to-do-when-you-get-userinfo.md)!!!

</details>

### Add social login

Pass in the `socialConnections` list in the initialization parameter `config` to specify the social logins that need to be displayed([all social logins configured by the application](/guides/app/config-login-methods.md#添加社会化登录)are displayed by default).

```html
<script>
  var guard = new authingNativeJsUIComponents.authingGuard("AUTHING_APP_ID", {
    socialConnections: ["github"]
  });
</script>
```

<details><summary><b>View the list of supported social logins and access procedures</b></summary>

{{$localeConfig.brandName}} currently supports 4 social logins around the world, such as GitHub, Apple, etc. The following is a complete list:

!!!include(en/common/social-connections-table.md)!!!

</details>

### Implement single sign-on

To use Guard for single sign-on, you need to set `isSSO` to `true` during initialization.

```html
<script>
  var guard = new authingNativeJsUIComponents.authingGuard("AUTHING_APP_ID", {
    isSSO: true
  });
</script>
```

## Instance method

The Guard instance provides three methods:

| Method name | Method parameters                                                                                                                        | Function                       |
| :---------- | :--------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------- |
| on          | <p>evtName:Event name,Please check the[event list](/reference/guard/#事件列表)</p><p>Handler:Corresponding event processing function</p> | Monitor an event               |
| show        | -                                                                                                                                        | Display the form in modal mode |
| hide        | -                                                                                                                                        | Hide the form in modal mode    |

## Complete parameter

The Authing login component (Guard) provides many advanced configurations, such as customizing the UI and using specific login methods. See the [complete parameter list](./parameters.md).

## Event list

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
<script>
  var guard = new authingNativeJsUIComponents.authingGuard("AUTHING_APP_ID", {
    apiHost: "https://core.you-authing-service.com"
  });
</script>
```

## Online experience

<br>
<iframe src="https://codesandbox.io/embed/authing-native-js-guard-o2o1e?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="authing-native-js-guard"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

## Get help

Join us on forum: [#authing-chat](https://forum.authing.cn/)
