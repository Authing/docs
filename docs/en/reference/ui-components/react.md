# React Login Component

<LastUpdated/>

The Approw login component (Guard) is an embeddable login form that can be configured according to your needs and is recommended for single-page applications. It allows you to easily add various social login methods so that your users can log in seamlessly and have a consistent login experience on different platforms. Guard shields many implementation details of low-level authentication for developers, as well as cumbersome UI development.

Guard can be integrated into your React project in a componentized form, and you can use this component to quickly implement the login authentication process.

## Quick start

### Installation

```bash
$ yarn add @approw/react-ui-components

# OR

$ npm install @approw/react-ui-components --save
```

### Initialization

Initialize in React project:

```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import { approwGuard } from '@approw/react-ui-components'
// import css files
import '@approw/react-ui-components/lib/index.min.css'

const App = () => {
  const appId = 'APPROW_APP_ID'
  const onLogin = (userInfo) => {
    console.log(userInfo)
  }
  return <approwGuard appId={appId} onLogin={onLogin} />
}

ReactDOM.render(<App />, root)
```

<details><summary><b>How to initialize in an HTML file?</b></summary>

#### Import by CDN

```html
<!-- JavaScript -->
<script src="https://cdn.jsdelivr.net/npm/@approw/react-ui-components"></script>

<!-- CSS -->
<link href="https://cdn.jsdelivr.net/npm/@approw/react-ui-components/lib/index.min.css" rel="stylesheet"></link>
```

#### Initialize in Script code block

```html
<script>
  var App = () => {
    const appId = 'approw\_APP\_ID'
    const onLogin = (userInfo) => {
      console.log(userInfo)
    }
    return <approwReactUIComponents.approwGuard appId={appId} />
  }

  ReactDOM.render(<App />, root)
</script>
```

</details>

### Monitor login events

approw-guard`Component Callback function for`onLogin` event，which is called when the user successfully logs in, and you can get the user information of the current user here.[View the complete list of events](#完整参数).

```javascript
import { approwGuard } from '@approw/react-ui-components'
import '@approw/react-ui-components/lib/index.min.css'

function App() {
  return (
    <div className="App">
      <approwGuard
        appId="APPROW_APP_ID"
        onLogin={(userInfo) => {
          console.log(userInfo)
        }}
      />
    </div>
  )
}
```

<details><summary><b>What should we do after understanding user information?</b></summary>

!!!include(common/what-to-do-when-you-get-userinfo.md)!!!

</details>

### Add social login

Pass in the `socialConnections` list in the initialization parameter `config` to specify the social logins that need to be displayed([all social logins configured by the application](/guides/app/config-login-methods.md#添加社会化登录)are displayed by default).

```javascript
import { approwGuard, SocialConnections } from '@approw/react-ui-components'

function App() {
  return (
    <div className="App">
      <approwGuard
        appId="APPROW_APP_ID"
        onLogin={(userinfo) => {
          console.log(userinfo)
        }}
        config={{
          socialConnections: [SocialConnections.Github],
        }}
      />
    </div>
  )
}
```

<details><summary><b>View the list of supported social logins and access procedures</b></summary>

{{$localeConfig.brandName}} currently supports 4 social logins around the world, such as GitHub, Apple, etc. The following is a complete list:

!!!include(common/social-connections-table.md)!!!

</details>

### Log out

1. Initialize the [AuthenticationClient](/reference/sdk-for-node/#使用认证模块)in the project entry file.

```js
import { initAuthClient } from '@approw/react-ui-components'

initAuthClient({
  appId: 'YOUR_APP_ID',
})
```

2. Add a `button` to log out and bind the click event to `getAuthClient().logout()`.

```js
import React from 'react'
import { getAuthClient } from '@approw/react-ui-components'

const LogoutButton = () => {
  return <button onClick={() => getAuthClient().logout()}>Log out</button>
}

export default LogoutButton
```

<!-- ### 在多应用间实现单点登录 -->

### Implement single sign-on

To use Guard for single sign-on, you need to set `isSSO` to `true` during initialization and pass in `appHost` (application domain name):

```javascript
const guard = new approwGuard('APPROW_APP_ID', {
  appHost: 'https://xxx.approw.cn',
  isSSO: true,
})
```

## Use React Hooks

Guard provides `useApprow` to facilitate user management.

```js
import React, { useEffect } from 'react'
import { useapprow, initAuthClient } from '@approw/react-ui-components'
// Initialize authClient before using useApprow
initAuthClient({
  appId: 'APPROW_APP_ID',
})

export const useInfo = () => {
  const { authClient } = useapprow()
  const [user, setUser] = useState()

  useEffect(() => {
    authClient.getCurrent().then((user) => setUser(user))
  }, [])

  return <div>Username: {user && user.username}</div>
}
```

## Export `approw-js-sdk`

The Guard components are packaged based on the [approw JavaScript SDK](../sdk-for-node/). When you need to perform some more advanced operations (such as managing user-defined data, modifying user information, logging out):

1. Call `initAuthClient` to initialize [AuthenticationClient](/reference/sdk-for-node/authentication/AuthenticationClient.md). Calling this function multiple times will only initialize it once.

```js
import { initAuthClient } from '@approw/react-ui-components'

initAuthClient({
  appId: 'YOUR_APP_ID',
})
```

2. Then use `getAuthClient` to get the `AuthenticationClient` instance.

```js
import { getAuthClient } from '@approw/react-ui-components'

const authClient = getAuthClient()
```

3. Call the method of the `AuthenticationClient` instance. For a complete list of methods, please see the [AuthenticationClient method list](/reference/sdk-for-node/authentication/AuthenticationClient.md).

```js
authClient.getCurrentUser().then((user) => console.log(user))
```

## Complete parameter

The Approw login component (Guard) provides many advanced configurations, such as customizing the UI and using specific login methods. See the [complete parameter list](./parameters.md).

## Event list

::: hint-info
Note that in React, event listeners should be named with small camels, such as: `onLogin`, `onLoginError`.
:::

| <p>Event name</p><p></p>                    | <p>Event Introduction</p><p></p>                                                       | <p>Event parameter</p><p></p>         | <p>Event parameter introduction</p><p></p>                                                                                             |
| :------------------------------------------ | :------------------------------------------------------------------------------------- | :------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------- |
| <p>load</p><p></p><p></p>                   | <p>{{$localeConfig.brandName}} appId authenticate success，loading complete</p><p></p> | <p>authClient</p><p></p>              | <p>AuthenticationClient object，can directly operate login， register，details in [approw-js-sdk](/reference/sdk-for-node/)</p><p></p> |
| <p>load-error</p><p></p>                    | <p>{{$localeConfig.brandName}} appId authenticate failed，loading failed</p><p></p>    | <p>error</p><p></p><p></p>            | <p>Error information</p><p></p>                                                                                                        |
| <p>login</p><p></p>                         | <p>User login success</p><p></p>                                                       | <p>user, authClient</p><p></p>        | <p>user: user information authClient same as before</p><p></p><p></p>                                                                  |
| <p>login-error</p><p></p>                   | <p>User login failed</p><p></p>                                                        | <p>error</p><p></p>                   | <p>Error information，including information such as missing/illegal fields or server errors</p><p></p>                                 |
| <p>register</p><p></p>                      | <p>User login success</p><p></p>                                                       | <p>user, authClient</p><p></p>        | <p>user: user information authClient same as before</p><p></p>                                                                         |
| <p>register-error</p><p></p>                | <p>User login failed</p><p></p>                                                        | <p>error</p><p></p>                   | <p>Error information，including information such as missing/illegal fields or server errors</p><p></p>                                 |
| <p>pwd-email-send</p><p></p>                | <p>Forgot password email sending success</p><p></p>                                    | <p>-</p><p></p>                       | <p>-</p><p></p>                                                                                                                        |
| <p>pwd-email-send-error</p><p></p>          | <p>Forgot password email sending failed</p><p></p>                                     | <p>error</p><p></p>                   | <p>Error information</p><p></p>                                                                                                        |
| <p>pwd-phone-send</p><p></p>                | <p>Forgot password mobile verification code sending success</p><p></p>                 | <p>-</p><p></p>                       | <p>-</p><p></p>                                                                                                                        |
| <p>pwd-phone-send-error</p><p></p>          | <p>Forgot password mobile verification code sending failed</p><p></p>                  | <p>error</p><p></p>                   | <p>Error information</p><p></p>                                                                                                        |
| <p>pwd-reset</p><p></p>                     | <p>Reset password success</p><p></p>                                                   | <p>-</p><p></p>                       | <p>-</p><p></p>                                                                                                                        |
| <p>pwd-reset-error</p><p></p>               | <p>Reset password failed</p><p></p>                                                    | <p>error</p><p></p>                   | <p>Error information</p><p></p>                                                                                                        |
| <p>close</p><p></p>                         | <p>guard close event in modal mode</p><p></p>                                          | <p>-</p><p></p>                       | <p>-</p><p></p>                                                                                                                        |
| <p>login-tab-change</p><p></p>              | <p>Login tab switching event</p><p></p>                                                | <p>activeTab</p><p></p>               | <p>Tab after switching</p><p></p>                                                                                                      |
| <p>register-tab-change</p><p></p>           | <p>Register tab switching event</p><p></p>                                             | <p>activeTab</p><p></p>               | <p>Tab after switching</p><p></p>                                                                                                      |
| <p>register-tab-change</p><p></p>           | <p>Register tab switching event</p><p></p>                                             | <p>activeTab</p><p></p>               | <p>Tab after switching</p><p></p>                                                                                                      |
| <p>register-info-completed</p><p></p>       | <p>Register Supplemental Success Event</p><p></p><p></p>                               | <p>user, udfs, authClient</p><p></p>  | <p>user: user information udfs: Supplementary custom field information</p><p>authClient same as before</p><p></p>                      |
| <p>register-info-completed-error</p><p></p> | <p>Register Supplemental Failure Event</p><p></p>                                      | <p>error, udfs, authClient</p><p></p> | <p>error: error information udfs: Supplementary custom field information </p><p>authClient same as before</p><p></p>                   |

## Privatization deployment

**The privatization deployment**scenario needs to specify the GraphQL endpoint of your privatized Approw service(**without protocol header and Path**).If you are not sure, you can contact the Approw IDaaS service administrator.

```javascript
import React from 'react'
import { approwGuard } from '@approw/react-ui-components'
import '@approw/react-ui-components/lib/index.min.css'

const App = () => {
  const appId = 'APPROW_APP_ID'
  const config = {
    apiHost: 'https://core.you-approw-service.com',
  }
  return <approwGuard appId={appId} />
}
```

## Online experience

<br>
<iframe src="https://codesandbox.io/embed/red-microservice-6613h?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="approw-react-guard"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

## Get help

Join us on forum: [#approw-chat](https://forum.authing.cn/)
