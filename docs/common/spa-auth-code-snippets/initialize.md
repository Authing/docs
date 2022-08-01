<!-- 初始化 SDK -->
```js
import { AuthingSPA } from '@authing/spa-auth-sdk';

const sdk = new AuthingSPA({
  // 应用的认证地址，例如：https://domain.authing.cn
  domain: '认证地址',
  appId: '应用 ID',
  // 登录回调地址，需要在控制台『应用配置 - 登录回调 URL』中指定
  redirectUri: '登录回调地址',
});
```