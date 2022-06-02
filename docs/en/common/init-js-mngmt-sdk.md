Use [用户池 ID（`userPoolId`）和用户池密钥（`secret`）](/guides/faqs/get-userpool-id-and-secret.md)初始化 [Node.js SDK](/en/reference/sdk-for-node/) 的 `ManagementClient`:

```js
import { ManagementClient } from "authing-js-sdk";

const managementClient = new ManagementClient({
  userPoolId: "YOUR_USERPOOL_ID",
  secret: "YOUR_USERPOOL_SECRET"
});
```
