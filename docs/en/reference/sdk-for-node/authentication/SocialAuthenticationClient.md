
# SocialAuthenticationClient

<LastUpdated/>


> This module encapsulates the function of social login, and you can quickly use social login to obtain user information through a simple API.

Initiate a social login authorization request:

```javascript
import { AuthenticationClient } from "authing-js-sdk"
const authenticationClient = new AuthenticationClient({
   appId: "YOUR_APP_ID",
   appHost: 'https://xxx.authing.cn',
})
await authenticationClient.social.authorize("github", {
   onSuccess: (user) => { console.log(user) },
   onError: (code, message) => {  }
})
```





## Send authorization login request

SocialAuthenticationClient().authorize(provider, options)

> Send an authorization login request. This method will directly open a new window and redirect to the login authorization page of a third-party social login service provider (such as GitHub). After the user completes the authorization, this window will be automatically closed. And trigger the `onSuccess` callback function, from which you can get user information.


#### Parameters

- `provider` \<string\> The logo of the social login service provider. 
- `options` \<object\>  
- `options.popup` \<boolean\> Whether to open the social login window through a pop-up window, if set to false, a new browser tab will be opened in the form of window.open. The default value is: `true`.
- `options.onSuccess` \<Function\> The user agrees to the authorization event callback function. The first parameter is user information. 
- `options.onError` \<Function\> The callback function of the social login failure event, the first parameter code is the error code, and the second parameter message is the Error message. For details, please see:[{{$localeConfig.brandName}} error code list](/reference/error-code.md).
- `options.position` \<object\> It is valid only when options.popup is true. The position of the pop-up window is { w: 585, h: 649 } by default.

#### Example

```javascript
// Log in with GitHub

const authenticationClient = new AuthenticationClient({
   appId: "YOUR_APP_ID",
   appHost: 'https://xxx.authing.cn',
})

await authenticationClient.social.authorize("github", {
   onSuccess: (user) => { console.log(user) },
   onError: (code, message) => {  },
   // position of the pop-up window
   position: {
     w: 100,
     h: 100
   }
})
```
```javascript
// Use the new browser tab to open the social login page

const authenticationClient = new AuthenticationClient({
   appId: "YOUR_APP_ID",
   appHost: 'https://xxx.authing.cn',
})

await authenticationClient.social.authorize("github", {
   popup: false,
   onSuccess: (user) => { console.log(user) },
   onError: (code, message) => {  },
})
```

#### Return value




      
