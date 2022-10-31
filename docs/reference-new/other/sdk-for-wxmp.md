# 微信网页授权登录 SDK

> Authing 微信网页授权 SDK，五分钟接入微信网页授权登录。

## 开发准备

- 微信公众号：前往[微信公众平台](https://mp.weixin.qq.com/) 注册
- **必须为服务号**
- **必须通过微信认证**

在微信公众平台后台的 开发 -> 基本配置 页面获取开发者 ID (AppID) 和开发者密码(AppSecret)。

在微信公众平台后台的 设置 -> 公众号设置 -> 功能设置 页面设置 **网页授权域名**。

域名填写 Authing 的统一回调域名：`core.authing.cn`。

![](./images/mpverify.jpg)

出于安全验证考虑，微信服务器需要和 Authing 服务器做一次请求验证，开发者需要下载 txt 文件，并记录 **文件名** 和 **文本内容**。

最后在 Authing 控制台 **连接身份源** -> **社会化登录** 创建一个**微信社会化身份源**：

![](./images/wechatmp2.png)

![](./images/wechatmp3.png)

选择**登录方式**为**微信网页授权登录**，并填入以下信息：

![](./images/wechatmp4.png)

- 唯一标识: 这是此连接的唯一标识，设置之后不能修改。
- 显示名称: Authing 登录表单将会显示一个“{Display Name} 登录”的按钮。
- AppID：微信提供的 AppID
- AppSecret：微信提供的 AppSecret
- Txt Filename：前面记录的 txt 文件名
- Txt Content：前面记录的 txt 文本内容
- Redirect：你的业务回调链接，必填。配置的回调地址支持使用通配符，例如你配置的回调地址为 `https://*.example.com/*`，下面的回调地址也是允许的： `https://forum.example.com/t/topic/1234`。

## 安装

使用 CDN：

```javascript
<script src="https://cdn.authing.co/packages/authing-wxmp-sdk/1.2.0/authing-wxmp-sdk.min.js"></script>
```

接着就可以在浏览器环境下引用 `AuthingWxmp` 了。

使用 npm / yarn：

```
npm install --save @authing/wxmp
```

或者

```
yarn add @authing/wxmp
```

然后通过以下方式引入：

```javascript
import AuthingWxmp from "@authing/wxmp";
```

## 初始化

初始化一共需要四个参数：

- `identifier`: 此社会化身份源的唯一标志，你在 Authing 控制台创建微信身份源的时候填写的；
- `appId`: Authing 应用 ID；
- `host`: Authing 应用域名，如 `https://my-awesome-app.authing.cn`；
- `redirectUrl`: 指定的回调链接，选填，默认使用控制台配置的回调地址。配置的回调地址支持使用通配符，例如你在 Authing 控制台中配置的回调地址为 `https://*.example.com/*`，这里可以指定回调地址为 `https://forum.example.com/t/topic/1234`。


示例：

```javascript
const authingWx = new AuthingWxmp({
    identifier: "wechat-mp-service",
    appId: "AUTHING_APP_ID",
    host: "https://my-awesome-app.authing.cn",
    redirectUrl: 'http://localhost:8080'
})
```

## 发起微信授权

```javascript
const authingWx = new AuthingWxmp({
    identifier: "",
    appId: "AUTHING_APP_ID",
    host: "https://my-awesome-app.authing.cn",
    redirectUrl: 'http://localhost:8080'
})

// 跳转到微信授权页面
window.location = authingWx.getAuthorizationUrl();
```

## 获取用户信息

```javascript
// 跳回业务回调链接之后获取用户信息
// 若在回调页面 authingWx 未初始化，需要先初始化，具体初始化方式参考上文

const { ok, userinfo, message } = authingWx.getUserInfo();
if (ok) {
  // do with userinfo
  console.log(userinfo);
} else if (message) {
  // message 中包含了错误提示
  alert(message);
}
```

## 完整 API 列表

- checkWechatUA
- getAuthorizationUrl
- getUserInfo

### checkWechatUA

> 判断当前环境是否为微信客户端。

示例：

```javascript
if (!authingWx.checkWechatUA()) {
  alert("请在微信客户端中打开！");
}
```

### getAuthorizationUrl

> 获取微信授权链接

示例：

```javascript
// 点击登录按钮之后跳转到微信网页授权页面
loginBtn.onclick = function () {
  window.location = authingWx.getAuthorizationUrl();
};
```

### getUserInfo

> 从当前页面 url 的 search 部分获取用户信息

参数：

- search：浏览器页面链接的 search 部分，可选，默认为 `window.location.search`。

示例：

```javascript
const { ok, userinfo, message } = authingWx.getUserInfo();
if (ok) {
  // do with userinfo
  console.log(userinfo);
} else if (message) {
  // message 中包含了错误提示
  alert(message);
}
```

## 授权流程

1. 开发者引导用户跳转到 Authing 设置的授权链接

- 当用户通过微信客户端网页打开时，让浏览器自动跳转。
- 当用户通过微信客户端网页打开时，点击登录按钮之后跳转

2. Authing 和微信服务器完成 OAuth 认证授权

- Authing 为开发者省去了其中复杂的获取 authorization_code、获取 access_token、换取用户信息的流程，真正的零行代码接入。
- 详细的过程请看[微信的官方文档](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_webpage_authorization.html)。

3. Authing 携带用户信息跳转回开发者在 **Authing 后台** 设置的**业务跳转链接**，携带的数据有 `code`、`message`、`data`：

- `code`
  - 200：获取用户信息成功
  - 其他：获取用户信息失败
- `message`: 错误提示信息（获取用户信息失败时候有）
- `data`: 用户信息（获取用户信息成功时候有）

4. 开发者使用 token 维持登录状态

用户信息中返回的 `token` 是登录凭证，开发者应当妥善保存，并且**后续的请求需要携带上此 token**：

设置 Authorization 请求头为 "Bearer " + token, 例如：

```
Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVuaW9uaWQiOiJvaVBiRHVHNFM3bXNyS0hQS0RjOE1FQ1NlOGpNIiwiaWQiOiI1ZGMxMGJjYjZmOTRjMTc4YzZmZmZmYjkiLCJjbGllbnRJZCI6IjVkYTdlZGFiNTAzOTZjMWFkOTYyMzc4YSJ9LCJpYXQiOjE1NzI5NTY0MjUsImV4cCI6MTU3NDI1MjQyNX0.OTgl72WZS8So3R5DbWCJ7I_Bd0LaZa4S0TAVMg9qaYQ"
```

如果你使用的是 NodeJS 的 [axios](https://github.com/axios/axios)，可以这样写：

```javascript
axios.get(SOME_SERVICE_URL, {
  headers: {
    Authorization: `Bearer ${userinfo.token}`,
  },
});
```

当终端用户携带此 Toekn 访问开发者的接口时，**开发者需要判断这个 Token 是否合法且处于登录状态**，Authing 为此提供了几个方法：[验证用户 Token](https://docs.authing.cn/v2/guides/faqs/how-to-validate-user-token.html)。Authing 返回的数据中包含了用户是否登录、登录情况下的用户 ID 等信息，之后开发者可以根据具体业务的需要对请求进行处理。

1. 总结一下以上流程

- 开发者引导用户跳转到微信授权页面。
- 终端用户同意授权。
- Authing 和微信根据 OAuth 协议完成用户信息交互。
- Authing 将用户信息（包含 token）发送到开发者自定义的业务回调链接
- 终端用户后续的请求将 token 携带上。
- 开发者在后端调用 [Authing 提供的方法](https://docs.authing.cn/v2/guides/faqs/how-to-validate-user-token.html) 检验 token 的合法性以及登录状态。
- 根据 Authing 返回的登录状态和开发者自己的业务逻辑，对请求进行相应处理。
