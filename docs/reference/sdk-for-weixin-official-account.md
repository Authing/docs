# 微信网页授权登录 SDK

> Authing 微信网页授权 SDK，五分钟接入微信网页授权登录。

## 说明

[Authing 微信网页授权 SDK 5.0](https://github.com/Authing/authing-js-sdk/tree/master/packages/weixin-official-account) 于 2022 年 9 月 7 日发布，如果你正在使用之前的版本 [authing-wxmp-sdk](https://github.com/Authing/authing-wxmp-sdk)，可参考：[微信网页授权](./sdk-for-wxmp.md)

SDK 5.0 主要升级：

- 完整的 TS 类型提示。
- 修复 `checkWechatUA` 函数 bug。
- 未来我们将继续优化 `getUserInfo` 函数。

## STEP 1：创建应用

1. 使用 Authing 创建一个应用：

<ul style="padding-left: 50px">
  <li>进入<a href="https://console.authing.cn/" target="blank">控制台</a></li>
  <li>展开左侧<strong>应用</strong>菜单，点击<strong>自建应用</strong>菜单</li>
  <li>点击右上角<strong>创建自建应用</strong>按钮</li>
  <li>填写<strong>应用名称</strong>和<strong>认证地址</strong>、选择<strong>标准 Web 应用</strong></li>
  <li>点击创建</li>
</ul>

<img src="./images/sdk-for-app-1.png" width="650" style="margin-left: 50px" />

2. 以下身份验证方式选择 <strong>none</strong>

<img src="./images/sdk-for-app-2.png" width="650" style="margin-left: 50px" />

<br />

3. 保存当前配置

## STEP 2：创建社会化身份源

- 前往[微信公众平台](https://mp.weixin.qq.com/) 注册
- **必须为服务号**
- **必须通过微信认证**
- 在微信公众平台后台的`设置与开发` -> `基本配置`页面获取开发者 ID (AppID) 和开发者密码（AppSecret）。
- 在微信公众平台后台的`设置与开发` -> `公众号设置` -> `功能设置`页面添加`网页授权域名`。

  **域名填写 Authing 的统一回调域名：`core.authing.cn`**。

  **出于安全验证考虑，微信服务器需要和 Authing 服务器做一次请求验证，开发者需要下载`txt 文件`，并记录`文件名`和`文本内容`**。

<img src="./images/sdk-for-weixin-official-account-1.png" width="650" style="margin-left: 40px" />

- 最后在 Authing 控制台`身份源管理` -> `社会化身份源` -> `创建社会化身份源` -> `微信` -> `微信网页授权`创建一个微信社会化身份源。

|字段|说明|
|----|----|
|唯一标识|这是此连接的唯一标识，设置之后不能修改|
|显示名称|Authing 登录表单将会显示一个“{Display Name} 登录”的按钮|
|开发者ID|微信提供的 AppID|
|开发者密码|微信提供的 AppSecret|
|域名校验文件名|前面记录的 txt 文件名|
|域名校验文件内容|前面记录的 txt 文本内容|
|Callback URL|你的业务回调链接，必填。配置的回调地址支持使用通配符，例如你配置的回调地址为`https://*.example.com/*`，下面的回调地址也是允许的：`https://forum.example.com/t/topic/1234`|

## STEP 3：安装 SDK

:::: tabs :options="{ useUrlFragment: false }"
::: tab NPM
``` shell
npm install --save @authing/weixin-official-account
```
:::

::: tab CDN
```html
<script src="https://cdn.authing.co/packages/weixin-official-account/5.0.2/weixin-official-account.min.js"></script>
```
:::
::::

## STEP 4：初始化 SDK

:::: tabs :options="{ useUrlFragment: false }"
::: tab NPM
``` typescript
import { AuthingWxmp } from '@authing/weixin-official-account'

const authingWx = new AuthingWxmp({
  // 此社会化身份源的唯一标志，你在 Authing 控制台创建微信身份源的时候填写的
  identifier: "",
  // Authing 应用 ID
  appId: "",
  // Authing 应用域名，如 https://my-awesome-app.authing.cn
  host: "",
  // 指定的回调链接，选填，默认使用控制台配置的回调地址
  redirectUrl: ''
})
```
:::

::: tab CDN
``` typescript
const authingWx = new AuthingFactory.AuthingWxmp({
  // 此社会化身份源的唯一标志，你在 Authing 控制台创建微信身份源的时候填写的
  identifier: "",
  // Authing 应用 ID
  appId: "",
  // Authing 应用域名，如 https://my-awesome-app.authing.cn
  host: "",
  // 指定的回调链接，选填，默认使用控制台配置的回调地址
  redirectUrl: ''
})
```
:::
::::

## STEP 5：使用 SDK
### 判断当前环境是否为微信客户端
``` typescript
const isWeixin = authingWx.checkWechatUA()
```

### 发起微信授权

``` typescript
// login.js
window.location = authingWx.getAuthorizationUrl()
```

### 获取用户信息
``` typescript
// callback.js
const { ok, userInfo, message } = authingWx.getUserInfo()

if (ok) {
  console.log('userInfo: ', userInfo)
} else if (message) {
  console.log(message)
}
```
