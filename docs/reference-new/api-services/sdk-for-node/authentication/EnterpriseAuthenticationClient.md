# 企业身份源登录模块

<LastUpdated/>

> 此模块封装了企业身份源登录的功能，可以通过简洁的 API 快速使用企业身份源登录获取用户信息。

发起企业身份源登录授权请求：

```javascript
import { AuthenticationClient } from 'authing-js-sdk'
const authenticationClient = new AuthenticationClient({
  appId: 'YOUR_APP_ID',
  appHost: 'https://xxx.authing.cn',
})
await authenticationClient.enterprise.authorize('oidc', 'xxxx', {
  onSuccess: (user) => {
    console.log(user)
  },
  onError: (code, message) => {},
})
```

## 发送授权登录请求
> 发送授权登录请求，该方法会直接打开一个新窗口，跳转到企业身份源服务商（如 OIDC、SAML 服务提供商等）的登录授权页面，用户完成授权之后，会自动关闭此窗口，并触发 `onSuccess` 回调函数，通过此函数，你可以获取到用户信息。

```js
EnterpriseAuthenticationClient().authorize(provider, identifier, options)
```


#### 参数

- `provider` \<string\> 企业身份源服务商的标志。
- `identifier` \<string\> 在 {{$localeConfig.brandName}} 中配置的企业身份源的唯一标识符。
- `options` \<object\>
- `options.popup` \<boolean\> 是否通过弹窗的方式打开企业身份源登录窗口，如果设置为 false，将会以 window.open 的方式打开一个新的浏览器 tab 。 默认值为 : `true`。
- `options.onSuccess` \<Function\> 用户同意授权事件回调函数，第一个参数为用户信息。
- `options.onError` \<Function\> 社会化登录失败事件回调函数，第一个参数 code 为错误码，第二个参数 message 为错误提示。详细的错误码列表请见：详细说明请见：[{{$localeConfig.brandName}} 错误代码列表](/reference/error-code.md)
- `options.position` \<object\> 只有当 options.popup 为 ture 的时候有效，弹出窗口的位置，默认为 { w: 585, h: 649 } 。

#### 示例

```javascript
// 使用 SAML 服务提供商登录

const authenticationClient = new AuthenticationClient({
  appId: 'YOUR_APP_ID',
  appHost: 'https://xxx.authing.cn',
})

await authenticationClient.enterprise.authorize('saml', 'xxxx', {
  onSuccess: (user) => {
    console.log(user)
  },
  onError: (code, message) => {},
  // 自定义弹出窗口的位置
  position: {
    w: 100,
    h: 100,
  },
})
```

```javascript
// 使用新建浏览器 tab 的形式打开企业身份源登录页面

const authenticationClient = new AuthenticationClient({
  appId: 'YOUR_APP_ID',
  appHost: 'https://xxx.authing.cn',
})

await authenticationClient.enterprise.authorize('saml', 'xxxxx', {
  popup: false,
  onSuccess: (user) => {
    console.log(user)
  },
  onError: (code, message) => {},
})
```
