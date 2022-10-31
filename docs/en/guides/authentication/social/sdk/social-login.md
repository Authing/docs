Taking GitHub social login as an example, only the following lines of code need to be implemented:

- Initialize the `AuthenticationClient` by application ID, and you can view the application ID on the application list page of the console.
- Call the `authenticationClient.social.authorize` method, pass the first parameter into `github`, and the second parameter specifies the `onSuccess` and `onError` callback functions.
- After the user successfully logs in, you can get the user information in the `onSuccess` callback function; if the login fails, you can get the error code and error information in the `onError` callback function. For complete error codes, please see: Error Code List.

```javascript
import { AuthenticationClient } from 'authing-js-sdk'

const authenticationClient = new AuthenticationClient({
  appId: 'AUTHING_APP_ID',
  appHost: 'https://xxx.authing.cn',
})

// Log in with GitHub
await authenticationClient.social.authorize('github', {
  onSuccess: (user) => {
    console.log(user)
  },
  onError: (code, message) => {},
})
```
