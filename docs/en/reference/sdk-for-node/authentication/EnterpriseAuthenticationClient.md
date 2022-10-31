# Corporate identity source login module

<LastUpdated/>

> This module encapsulates the functionality of the corporate identity source, which can quickly use the corporate identity source to log in to obtain user information through a simple API.

Running a corporate identity source login authorization request:

```javascript
import { AuthenticationClient } from 'authing-js-sdk'
const authenticationClient = new AuthenticationClient({
  appId: 'AUTHING_APP_ID',
  appHost: 'https://xxx.authing.cn',
})
await authenticationClient.enterprise.authorize('oidc', 'xxxx', {
  onSuccess: (user) => {
    console.log(user)
  },
  onError: (code, message) => {},
})
```

## Send an authorized login request

EnterpriseAuthenticationClient().authorize(provider, identifier, options)

> Send an authorized login request, this method will open a new window directly, jump to the login authorization page of the corporate identity source provider (such as OIDC, SAML service provider, etc.), after the user completes the authorization, and triggered `onSuccess` Running function, through this function, you can get user information.

#### parameter

- `provider` \<string\> Corporate logo identity source service providers.
- `identifier` \<string\> The unique identifier of the corporate identity configured in {{$localeConfig.brandName}}.
- `options` \<object\> Window.Open.
- `options.popup` \<boolean\> Whether to open the corporate identity source login window by pop-up, if set to false, a new browser Tab will be opened in window.open, the default is: `true`.
- `options.onSuccess` \<Function\>The user agrees to authorize the event callback function, the first parameter is user information.
- `options.onError` \<Function\> Social login failed event callback function, the first parameter code is an error code, the second parameter message is an error message. See the detailed error code list: See you detailed: See you:[{{$localeConfig.brandName}} Error code list](/reference/error-code.md)
- `options.position` \<object\> Only when options.popup is time, the location of the window is popped up, default{ w: 585, h: 649 } .

#### Example

```javascript
// Log in with SAML service provider

const authenticationClient = new AuthenticationClient({
  appId: 'AUTHING_APP_ID',
  appHost: 'https://xxx.authing.cn',
})

await authenticationClient.enterprise.authorize('saml', 'xxxx', {
  onSuccess: (user) => {
    console.log(user)
  },
  onError: (code, message) => {},
  // Customize the location of the pop-up window
  position: {
    w: 100,
    h: 100,
  },
})
```

```javascript
// Use the form of the new browser tab open source enterprise identity login page

const authenticationClient = new AuthenticationClient({
  appId: 'AUTHING_APP_ID',
  appHost: 'https://xxx.authing.cn',
})

await authenticationClient.enterprise.authorize('saml', 'xxxxx', {
  popup: false,
  onSuccess: (user) => {
    console.log(user)
  },
  onError: (code, message) => {},
})
```
