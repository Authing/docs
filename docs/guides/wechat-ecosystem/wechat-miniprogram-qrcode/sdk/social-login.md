实现微信 PC 小程序扫码登录，你只需要实现以下几行代码：

- 通过应用 ID 初始化 `AuthenticationClient`，你可以在控制台的应用列表页查看应用 ID。
- 调用 `authenticationClient.wxqrcode.startScanning` 方法，第一个参数传入挂载的 DOM 元素节点 ID, 第二个参数指定 onSuccess 和 onError 回调函数。
- 用户成功登录之后，你可以在 onSuccess 回调函数中得到用户信息；如果登录失败，可以在 onError 回调函数中获取到错误码和错误信息。完整的错误码请见: 错误码列表。

```javascript
import { AuthenticationClient } from 'authing-js-sdk'

const authenticationClient = new AuthenticationClient({
  appId: 'AUTHING_APP_ID',
  appHost: 'https://xxx.authing.cn',
})

const onScanningSuccess = async (userInfo: any, ticket: string) => {
  const { token } = userInfo
  if (!token) {
    // 轮询接口不会返回完整用户信息，需要使用 ticket 换取
    userInfo = await authenticationClient.wxqrcode.exchangeUserInfo(ticket)
  }
}

authenticationClient.wxqrcode.startScanning('qrcode', {
  onSuccess: onScanningSuccess,
  onError: (message) => onFail && onFail(`${message}`),
})
```
