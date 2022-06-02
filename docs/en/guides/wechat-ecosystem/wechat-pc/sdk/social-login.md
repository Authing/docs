To implement WeChat PC scan code login, you only need to implement the following lines of code:

- Initialize the `AuthenticationClient` with the application ID, you can view the application ID on the application list page of the console.
- Call the `authenticationClient.social.authorize` method. The first parameter is passed to `wechat:pc`, and the second parameter specifies the `onSuccess` and `onError` callback functions.
- After the user successfully logs in, you can get the user information in the `onSuccess` callback function; if the login fails, you can get the error code and error information in the `onError` callback function. For a complete list of error codes, see: Error Code List.

```javascript
import { AuthenticationClient } from "authing-js-sdk";

const authenticationClient = new AuthenticationClient({
  appId: "YOUR_APP_ID",
  appHost: "https://xxx.authing.cn"
});

// Use  GitHub 登录
await authenticationClient.social.authorize("wechat:pc", {
  onSuccess: user => {
    console.log(user);
  },
  onError: (code, message) => {}
});
```
