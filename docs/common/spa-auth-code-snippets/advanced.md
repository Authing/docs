<!-- 高级使用 -->
```js
import { Authing } from '@authing/web';

const sdk = new Authing({
  // 很重要，请仔细填写！
  // 如果应用开启 SSO，这儿就要写单点登录的“应用面板地址”；否则填写应用的“认证地址”。
  domain: '认证域名',
  appId: '应用 ID',
  // 登录回调地址，需要在控制台『应用配置 - 登录回调 URL』中指定
  redirectUri: '登录回调地址',

  // 登出回调地址，需要在控制台『应用配置 - 登出回调 URL』中指定
  // 如果为空，登出流程会在 Authing 中止，不会进行后续的回调
  logoutRedirectUri: '',

  // 应用侧向 Authing 请求的权限，以空格分隔，默认为 'openid profile'
  scope: 'openid email phone profile',

  // 在回调端点处，是否重定向回最初发起登录的 URL
  redirectToOriginalUri: false,

  // 回调时在何处携带身份凭据，默认为 fragment
  // fragment: 在 URL hash 中携带
  // query: 在查询参数中携带
  redirectResponseMode: 'fragment',

  // 是否使用 OIDC implicit 模式替代默认的 PKCE 模式
  // 由于 implicit 模式安全性较低，不推荐使用，只用于兼容不支持 crypto 的浏览器
  useImplicitMode: false,

  // implicit 模式返回的凭据种类，默认为 'token id_token'
  // token: 返回 Access Token
  // id_token: 返回 ID Token
  implicitResponseType: 'token id_token',

  // 是否在每次获取登录态时请求 Authing 检查 Access Token 有效性，
  // 可用于单点登出场景，默认为 false 如果设为 true，需要在控制台中将
  // 『应用配置』-『其他配置』-『检验 token 身份验证方式』设为 none
  introspectAccessToken: false,

  // 弹出窗口的宽度
  popupWidth: 500,

  // 弹出窗口的高度
  popupHeight: 600,
});
```