使用[应用 ID（AppID）](/guides/faqs/get-app-id-and-secret.md) 初始化 [JavaScript/Node.js SDK](/reference-new/web/sdk-for-node/) 的 `AuthenticationClient`:

```javascript
import { AuthenticationClient } from 'authing-js-sdk'
const authenticationClient = new AuthenticationClient({
  appId: 'YOUR_APP_ID',
  appHost: 'https://xxx.authing.cn',
})
```
