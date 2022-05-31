To implement WeChat applet scan code login, you only need to implement the following lines of code:

- Initialize the `AuthenticationClient` with the application ID, you can view the application ID on the application list page of the console.
- Call the `authenticationClient.wxqrcode.startScanning` method, the first parameter passes in the mounted DOM element node ID, and the second parameter specifies the `onSuccess` and `onError` callback functions.
- After the user successfully logs in, you can get the user information in the `onSuccess` callback function; if the login fails, you can get the error code and error information in the `onError` callback function. For a complete list of error codes, see: Error Code List.

```javascript
import { AuthenticationClient } from "authing-js-sdk";

const authenticationClient = new AuthenticationClient({
  appId: "YOUR_APP_ID"
});

const onScanningSuccess = async (userInfo: any, ticket: string) => {
  const { token } = userInfo;
  if (!token) {
    // The polling interface will not return complete user information, you need to use ticket in exchange
    userInfo = await authenticationClient.wxqrcode.exchangeUserInfo(ticket);
  }
};

authenticationClient.wxqrcode.startScanning("qrcode", {
  onSuccess: onScanningSuccess,
  onError: message => onFail && onFail(`${message}`)
});
```
