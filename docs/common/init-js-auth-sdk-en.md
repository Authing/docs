Use the [AppID](/guides/faqs/get-app-id-and-secret.md) to initialize the `AuthenticationClient` of the [JavaScript/Node.js SDK](/reference/sdk-for-node/):

```javascript
import { AuthenticationClient } from "authing-js-sdk";
const authenticationClient = new AuthenticationClient({
  appId: "AUTHING_APP_ID",
  appHost: "https://xxxx.authing.cn"
});
```
