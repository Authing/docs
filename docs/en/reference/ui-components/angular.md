# Angular Login Component

<LastUpdated/>

The Authing login component (Guard) is an embeddable login form that can be configured according to your needs and is recommended for single-page applications. It allows you to easily add various social login methods so that your users can log in seamlessly and have a consistent login experience on different platforms. Guard shields many implementation details of low-level authentication for developers, as well as cumbersome UI development.

Guard can be integrated into your Angular projects. You can use this component to quickly implement the login authentication process.

## Quick start

### Installation

```bash
$ yarn add @authing/ng-ui-components

# OR

$ npm install @authing/ng-ui-components --save
```

### Initialization

Initialize in the Angular project:

1. `app.module.ts`

```javascript
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { authingGuardModule } from "@authing/ng-ui-components";
import { AppComponent } from "./app.component";
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, authingGuardModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

2. `app.component.ts`

```javascript
//
import { Component } from "@angular/core";
import { CommonMessage, AuthenticationClient } from "ng-ui-components";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  appId = "AUTHING_APP_ID";
  onLoad([e]: [AuthenticationClient]) {
    console.log("ffffff", e);
  }
}
```

3. `app.component.html`

```javascript
<authing-guard [appId]="appId" (onLoad)="onLoad($event)"></authing-guard>
```

<details><summary><b>How to initialize in an HTML file?</b></summary>

#### Import by CDN

```html
<script src="https://cdn.jsdelivr.net/npm/@authing/ng-ui-components"></script>
```

#### Initialize in Script code block

```html
<div ng-app="">
  <authing-guard [appId]="AUTHING_APP_ID"></authing-guard>
</div>
```

</details>

### Monitor login events

`authing-guard` Component Callback function for `onLogin` event，which is called when the user successfully logs in, and you can get the user information of the current user here.[View the complete list of events](#完整参数).

```html
<authing-guard [appId]="appId" (onLogin)="onLoad($event)"></authing-guard>
```

```javascript
export class AppComponent {
  appId = "AUTHING_APP_ID";
  onLogin([user]) {
    console.log("userInfo: ", user);
  }
}
```

<details><summary><b>What should we do after understanding user information?</b></summary>

!!!include(en/common/what-to-do-when-you-get-userinfo.md)!!!

</details>

### Add social login

Pass in the `socialConnections` list in the initialization parameter `config` to specify the social logins that need to be displayed([all social logins configured by the application](/guides/app/config-login-methods.md#添加社会化登录)are displayed by default).

```html
<authing-guard [appId]="appId" [config]="config"></authing-guard>
```

```javascript
export class AppComponent {
  appId = "AUTHING_APP_ID";
  config = {
    socialConnections: ["github"]
  };
}
```

<details><summary><b>View the list of supported social logins and access procedures</b></summary>

{{$localeConfig.brandName}} currently supports 4 social logins around the world, such as GitHub, Apple, etc. The following is a complete list:

!!!include(en/common/social-connections-table.md)!!!

</details>

### Log out

1. Initialize the [AuthenticationClient](/reference/sdk-for-node/#Use 认证模块)in the project entry file.

```js
import { initAuthClient } from "@authing/ng-ui-components";

initAuthClient({
  appId: "AUTHING_APP_ID"
});
```

2. Add a `button` to log out and bind the click event to `getAuthClient().logout()`.

```html
<button (click)="logout()">Log out</button>
```

```javascript
import { initAuthClient } from "@authing/react-ui-components";

export class AppComponent {
  logout() {
    getAuthClient().logout();
  }
}
```

### Implement single sign-on

To use Guard for single sign-on, you need to set `isSSO` to `true` during initialization.

```html
<authing-guard [appId]="appId" [config]="config"></authing-guard>
```

```javascript
export class AppComponent {
  appId = "AUTHING_APP_ID";
  config = {
    isSSO: true
  };
}
```

## Export `authing-js-sdk`

The Guard component itself is packaged based on the [authing JavaScript SDK](../sdk-for-node/). When you need to perform some more advanced operations (such as managing user-defined data, modifying user information, logging out):

1. Call `initAuthClient` to initialize [AuthenticationClient](/reference/sdk-for-node/authentication/AuthenticationClient). Calling this function multiple times will only initialize it once.

```js
import { initAuthClient } from "@authing/ng-ui-components";

initAuthClient({
  appId: "AUTHING_APP_ID"
});
```

2. Then use `getAuthClient` to get `AuthenticationClient` instance.

```js
import { getAuthClient } from "@authing/ng-ui-components";

const authClient = getAuthClient();
```

3. Call the method of `AuthenticationClient` instance. For a complete list of methods, please see the [AuthenticationClient method list](/reference/sdk-for-node/authentication/AuthenticationClient).

```js
authClient.getCurrentUser().then(user => console.log(user));
```

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
<authing-guard [appId]="appId" [config]="config"></authing-guard>
```

```javascript
export class AppComponent {
  appId = "AUTHING_APP_ID";
  config = {
    apiHost: "https://core.you-authing-service.com"
  };
}
```

## Online experience

<br>
<iframe src="https://codesandbox.io/embed/authi-0w6nh?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="authing-ng-guard"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

## Get help

Join us on forum: [#authing-chat](https://forum.authing.cn/)
