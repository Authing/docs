# 登录组件（Guard）配置参数列表

<LastUpdated/>

Authing 登录组件（Guard）提供了很多高级配置，如自定义 UI，使用特定登录方式等。所有配置如下：

| 参数名                | 参数说明                                                                                                                                                                                                          | 类型                                      | 是否必传       | 默认值                                             |
| :-------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------- | :------------- | :------------------------------------------------- |
| target                | 指定 Guard 表单的挂载点，接受 [querySelector](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector) 能接受的所有参数或者 dom 元素，若未传入，Guard 会自动生成一个 div 标签放入 body 的最后面   | String                                    | HTMLElement    | 否                                                 | - |
| mode                  | Guard 展示模式                                                                                                                                                                                                    | [GuardMode](#guardmode)                   | 否             | GuardMode.Normal                                   |
| title                 | **产品名称**                                                                                                                                                                                                      | String                                    | 否             | {{$localeConfig.brandName}}                        |
| logo                  | **产品 logo**                                                                                                                                                                                                     | String                                    | 否             | [{{$localeConfig.brandName}} logo]                 |
| contentCss            | **自定义 CSS 样式**，如果指定了，会在 DOM 的 head 中插入一个 <style type="text/css"></style> 节点。如 body {background:#6699 !important;}。                                                                       | String                                    | 否             | -                                                  |
| loginMethods          | **需要使用的普通登录(包括 LDAP)方式列表**                                                                                                                                                                         | [LoginMethods](#loginmethods)[]           | 否             | [*LoginMethods.PhoneCode, LoginMethods.Password*]  |
| registerMethods       | **需要使用的注册方式**                                                                                                                                                                                            | [RegisterMethods](#registermethods)[]     | 否             | [*RegisterMethods.Email*, *RegisterMethods.Phone*] |
| defaultRegisterMethod | **默认展示的注册方式**                                                                                                                                                                                            | [RegisterMethods](#registermethods)       | 否             | \_RegisterMethods.Email\*                          |
| defaultScenes         | **打开组件时展示的界面**                                                                                                                                                                                          | [GuardScenes](#guardscenes)               | 否             | \_GuardScenes.Login\*                              |
| socialConnections     | **需要使用的社会化登录列表**                                                                                                                                                                                      | [SocialConnections](#socialconnections)[] | 否             | []                                                 |
| enterpriseConnections | **需要使用的企业身份源列表(不包括 LDAP)**，列表项值为配置的企业身份源唯一标识符，注意：企业身份源需要传入对应 appId 才能使用                                                                                      | Array                                     | 否             | []                                                 |
| defaultLoginMethod    | **默认显示的登录方式**。可选值为 options.loginMethods 中的某一项                                                                                                                                                  | <p>String</p><p></p>                      | 否             | _LoginMethods.Password_                            |
| autoRegister          | **是否将注册和登录合并**，合并后如果用户不存在将自动注册                                                                                                                                                          | Boolean                                   | 否             | false                                              |
| disableRegister       | **是否禁止注册**，禁止的话会隐藏「注册」入口                                                                                                                                                                      | Boolean                                   | 否             | false                                              |
| disableResetPwd       | **是否禁止重置密码**，禁止的话会隐藏「忘记密码」入口                                                                                                                                                              |                                           |                |                                                    |
| clickCloseable        | **Modal 模式时是否隐藏登录框右上角的关闭按钮**，如果隐藏，用户将不能通过点击按钮关闭登录框                                                                                                                        | Boolean                                   | 否             | true                                               |
| escCloseable          | **Modal 模式时是否可以通过键盘 ESC 键关闭登录框**                                                                                                                                                                 | Boolean                                   | 否             | true                                               |
| isSSO                 | 是否是单点登录                                                                                                                                                                                                    | Boolean                                   | 否             | false                                              |
| appHost               | 应用 host，如 https://xx.authing.cn                                                                                                                                                                               | String                                    | 是             | -                                                  |
| qrCodeScanOptions     | 扫码登录配置，详情请查看 [QrCodeAuthenticationClient().startScanning(domId, options)](https://docs.authing.cn/reference/sdk-for-node/authentication/QrCodeAuthenticationClient.html#一键开始扫码) 的 options 参数 | Objcect                                   | 否             | null                                               |
| lang                  | **使用语言**                                                                                                                                                                                                      | [Lang](#lang)                             | 否             | Lang.zhCn                                          |
| localesConfig         | **语言环境配置**                                                                                                                                                                                                  | [LocalesConfig](#localesconfig)           | 否             | -                                                  |
| ~~apiHost~~           | 自建应用的【认证地址】，如果是开启了单点登录，则应填写单点登录的【应用面板地址】                                                                                                                                                                                        | String                                    | 私有部署时必传 | [{{$localeConfig.brandName}} 官方 api 地址]        |

以下为高级配置中可能用到的所有枚举值的说明：

## GuardMode

Guard 目前有两种展示方式 `modal | normal`，`normal` 方式会将表单插入指定的 dom 节点，适合将登录作为单独页面的场景，`modal` 模式会以模态框形式展示表单，适合在已有页面中弹出进行登录。默认展示方式为 `normal`，可通过传入 `mode` 参数配置展示方式：

```javascript
import { AuthingGuard, GuardMode } from '@authing/native-js-ui-components'
// 引入 css 文件
import '@authing/native-js-ui-components/lib/index.min.css'

const guard = new AuthingGuard('AUTHING_APP_ID', {
  mode: GuardMode.Modal,
})

// modal 模式需要调用 show 方法才会展示表单
guard.show()
```

::: hint-warning
**注意**：native js 版本的 `modal` 模式需要在初始化后手动调用 `guard.show()` 才会展示 Guard。
:::

通过传入 `isSSO` 就可开启 SSO 登录模式，Guard 会在 `load` 事件之后检测是否已有用户登录此应用，若有会直接触发 `login` 事件，方便你进行下一步操作。

| key    | value    | 说明       |
| :----- | :------- | :--------- |
| Modal  | 'modal'  | 模态框模式 |
| Normal | 'normal' | 正常模式   |

## LoginMethods

Guard 支持的普通登录方式

| key       | value                       | 说明                                                                                     |
| :-------- | :-------------------------- | :--------------------------------------------------------------------------------------- |
| LDAP      | 'ldap'                      | LDAP 身份目录登录(需要[配置 LDAP 服务](/connections/ldap/))                              |
| AppQr     | 'app-qrcode'                | APP 扫码登录(需要接入 [APP 扫码登录](/guides/authentication/qrcode/use-self-build-app/)) |
| Password  | 'password'                  | 账号密码登录(包括手机号 + 密码、邮箱 + 密码、用户名 + 密码。)                            |
| PhoneCode | 'phone-code'                | 手机验证码登录                                                                           |
| WxMinQr   | 'wechat-miniprogram-qrcode' | 微信 PC 小程序扫码登录                                                                       |
| AD        | 'ad'                        | AD 用户目录登录                                                                          |

## RegisterMethods

Guard 支持的注册方式

| key   | value   | 说明           |
| :---- | :------ | :------------- |
| Email | 'email' | 邮箱注册       |
| Phone | 'phone' | 手机验证码注册 |

## GuardScenes

Guard 可展示的界面

| key      | value      | 说明     |
| :------- | :--------- | :------- |
| Login    | 'login'    | 登录界面 |
| Register | 'register' | 注册界面 |

## ResetPwdMethods

Guard 支持的重置密码方式

| key   | value   | 说明               |
| :---- | :------ | :----------------- |
| Email | 'email' | 邮件验证码重置     |
| Phone | 'phone' | 手机短信验证码重置 |

## SocialConnections

Guard 支持的社会化登录方式

| key       | value                                       | 说明                           |
| :-------- | :------------------------------------------ | :----------------------------- |
| Qq        | 'qq'                                        | QQ 登录                        |
| Weibo     | 'weibo'                                     | 新浪微博登录                   |
| Github    | 'github'                                    | GitHub 登录                    |
| Google    | 'google'                                    | Google 账号登录                |
| WxPc      | 'wechat:pc'                                 | 微信 PC 端登录                 |
| Dingtalk  | 'dingtalk'                                  | 钉钉登录                       |
| WxWCorpQr | 'wechatwork:corp:qrconnect'                 | 企业微信二维码登录             |
| WxWSPQr   | 'wechatwork:service-provider:qrconnect'     | 企业微信第三方应用扫码授权登录 |
| WxWSPAuth | 'wechatwork:service-provider:authorization' | 企业微信第三方应用网页授权登录 |

## Lang

Guard 支持的语言

| key  | value   | 说明 |
| :--- | :------ | :--- |
| zhCn | 'zh-CN' | 中文 |
| enUs | 'en-US' | 英文 |

## LocalesConfig

Guard 语言环境配置

| 参数         | 说明                            | 类型           | 默认值    |
| :----------- | :------------------------------ | :------------- | :-------- |
| defaultLang  | 默认使用的语言                  | [Lang](#lang)  | Lang.zhCn |
| isShowChange | 在 Guard 中是否显示语言切换控件 | boolean        | false     |
| onChange     | 使用 Guard 控件切换语言时的回调 | function(lang) | -         |

## 获取帮助

Join us on forum: [#authing-chat](https://forum.authing.cn/)
