<!-- 初始化 SDK -->
```js
import { Authing } from '@authing/web';

const sdk = new Authing({
  // 应用的认证地址，例如：https://domain.authing.cn
  domain: '认证地址',
  appId: '应用 ID',
  // 登录回调地址，需要在控制台『应用配置 - 登录回调 URL』中指定
  redirectUri: '登录回调地址',
});
```