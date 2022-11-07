实现 PC 微信扫码登录，你只需要实现以下几行代码：

- 通过应用 ID 初始化 `AuthenticationClient`，你可以在控制台的应用列表页查看应用 ID。
- 调用 `authenticationClient.social.authorize` 方法，第一个参数传入 `wechat:pc`, 第二个参数指定 onSuccess 和 onError 回调函数。
- 用户成功登录之后，你可以在 `onSuccess` 回调函数中得到用户信息；如果登录失败，可以在 `onError` 回调函数中获取到错误码和错误信息。完整的错误码请见: 错误码列表。

```javascript
import { AuthenticationClient } from "authing-js-sdk";

const authenticationClient = new AuthenticationClient({
  appId: "AUTHING_APP_ID",
  appHost: 'https://xxx.authing.cn',
});

// 使用 GitHub 登录
await authenticationClient.social.authorize("wechat:pc", {
  onSuccess: (user) => {
    console.log(user);
  },
  onError: (code, message) => {},
});
```
