# 获取安全配置

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

无需传参获取安全配置

## 请求参数

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:60px">默认值</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- | ---- | ---- | ---- | ---- | ---- |


<!-- 暂时不显示示例代码 -->
<!-- ## 示例代码
```ts
import { ManagementClient } from 'authing-node-sdk';
// 在 Node.js 中引用：
// const { ManagementClient } = require('authing-node-sdk');

const managementClient = new ManagementClient({
  accessKeyId: 'AUTHING_USERPOOL_ID',
  accessKeySecret: 'AUTHING_USERPOOL_SECRET',
});

(async () => {
  const result = await managementClient.updateSecuritySettings({
 });
})();
```
 -->


## 请求响应

类型： `SecuritySettingsRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| requestId | string | 请求 ID。当请求失败时会返回。 |
| data | <a href="#SecuritySettingsDto">SecuritySettingsDto</a> | 响应数据 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "requestId": "934108e5-9fbf-4d24-8da1-c330328abd6c",
  "data": {
    "allowedOrigins": "[\"https://example.com\"]",
    "authingTokenExpiresIn": 1296000,
    "verifyCodeLength": 6,
    "verifyCodeMaxAttempts": 1,
    "changeEmailStrategy": {
      "verifyOldEmail": true
    },
    "changePhoneStrategy": {
      "verifyOldPhone": true
    },
    "cookieSettings": {
      "cookieExpiresIn": 1209600
    },
    "registerAnomalyDetection": {
      "limit": 50,
      "timeInterval": 300
    },
    "loginAnomalyDetection": {
      "loginFailStrategy": "captcha",
      "loginFailCheck": {
        "limit": 50,
        "timeInterval": 300
      },
      "loginPasswordFailCheck": {
        "limit": 50,
        "timeInterval": 300
      }
    },
    "selfUnlockAccount": {
      "strategy": "captcha"
    },
    "qrcodeLoginStrategy": {
      "qrcodeExpiresIn": 120,
      "ticketExpiresIn": 300,
      "allowExchangeUserInfoFromBrowser": true,
      "returnFullUserInfo": true
    }
  }
}
```

## 数据结构


### <a id="SecuritySettingsDto"></a> SecuritySettingsDto

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |
| allowedOrigins | array | 否 | 安全域（CORS）   |  `["https://example.com"]` |
| authingTokenExpiresIn | number | 是 | Authing Token 有效时间（秒）   |  `1296000` |
| verifyCodeLength | number | 是 | 验证码长度。包含短信验证码、邮件验证码和图形验证码。   |  `6` |
| verifyCodeMaxAttempts | number | 是 | 验证码尝试次数。在一个验证码有效周期内（默认为 60 s），用户输入验证码错误次数超过此阈值之后，将会导致当前验证码失效，需要重新发送。   |  `1` |
| changeEmailStrategy |  | 是 | 用户修改邮箱的安全策略 嵌套类型：<a href="#ChangeEmailStrategyDto">ChangeEmailStrategyDto</a>。  |  `{"verifyOldEmail":true}` |
| changePhoneStrategy |  | 是 | 用户修改手机号的安全策略 嵌套类型：<a href="#ChangePhoneStrategyDto">ChangePhoneStrategyDto</a>。  |  `{"verifyOldPhone":true}` |
| cookieSettings |  | 否 | Cookie 过期时间设置 嵌套类型：<a href="#CookieSettingsDto">CookieSettingsDto</a>。  |  |
| registerDisabled | boolean | 是 | 是否禁止用户注册，开启之后，用户将无法自主注册，只能管理员为其创建账号。针对 B2B 和 B2E 类型用户池，默认开启。   |  |
| registerAnomalyDetection |  | 是 | 频繁注册检测配置 嵌套类型：<a href="#RegisterAnomalyDetectionConfigDto">RegisterAnomalyDetectionConfigDto</a>。  |  |
| completePasswordAfterPassCodeLogin | boolean | 是 | 验证码注册后是否要求用户设置密码（仅针对 Authing 登录页和 Guard 有效，不针对 API 调用）。   |  |
| loginAnomalyDetection |  | 是 | 登录防暴破配置 嵌套类型：<a href="#LoginAnomalyDetectionConfigDto">LoginAnomalyDetectionConfigDto</a>。  |  |
| loginRequireEmailVerified | boolean | 是 | 当使用邮箱登录时，未验证的邮箱登录时是否禁止登录并发送认证邮件。当用户收到邮件并完成验证之后，才能进行登录。   |  |
| selfUnlockAccount |  | 是 | 用户自助解锁配置。注：只有绑定了手机号/邮箱的用户才可以自助解锁 嵌套类型：<a href="#SelfUnlockAccountConfigDto">SelfUnlockAccountConfigDto</a>。  |  |
| enableLoginAccountSwitch | boolean | 是 | Authing 登录页面是否开启登录账号选择   |  |
| qrcodeLoginStrategy |  | 是 | APP 扫码登录安全配置 嵌套类型：<a href="#QrcodeLoginStrategyDto">QrcodeLoginStrategyDto</a>。  |  |


### <a id="ChangeEmailStrategyDto"></a> ChangeEmailStrategyDto

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |
| verifyOldEmail | boolean | 是 | 修改邮箱时是否验证旧邮箱   |  `true` |


### <a id="ChangePhoneStrategyDto"></a> ChangePhoneStrategyDto

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |
| verifyOldPhone | boolean | 是 | 修改手机号时是否验证旧手机号   |  `true` |


### <a id="CookieSettingsDto"></a> CookieSettingsDto

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |
| cookieExpiresIn | number | 是 | Cookie 有效时间：用户登录状态的有效时间（默认为 1209600 秒/ 14 天），过期后用户需要重新登录。对于应用面板及已加入应用面板的应用，将使用此 cookie  过期时间。   |  `1209600` |
| cookieExpiresOnBrowserSession | boolean | 是 | Cookie 过期时间基于浏览器会话：当前浏览器关闭后立即过期，下次打开需重新登录。   |  |


### <a id="RegisterAnomalyDetectionConfigDto"></a> RegisterAnomalyDetectionConfigDto

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |
| enabled | boolean | 是 | 是否开启频繁注册限制   |  |
| limit | number | 是 | 在一定时间周期内，对于同一个 IP，最多只能注册多少次。   |  `50` |
| timeInterval | number | 是 | 限定周期时间长度，单位为秒。   |  `300` |


### <a id="LoginAnomalyDetectionConfigDto"></a> LoginAnomalyDetectionConfigDto

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |
| loginFailStrategy | string | 是 | 登录安全策略。当用户触发登录失败频率检测时，采用什么策略。目前支持验证码和锁定账号两种策略。当选择账号锁定策略的时候，只可以开启「登录密码错误限制」。   | captcha |
| loginFailCheck |  | 是 | 登录失败次数限制：当用户登录输入信息错误的时候会被按照「登录安全策略」规则触发相对应的策略。 嵌套类型：<a href="#LoginFailCheckConfigDto">LoginFailCheckConfigDto</a>。  |  |
| loginPasswordFailCheck |  | 是 | 登录密码错误限制：当用户登录输入密码信息错误的时候会被按照「登录安全策略」规则触发相对应的策略。 嵌套类型：<a href="#LoginPassowrdFailCheckConfigDto">LoginPassowrdFailCheckConfigDto</a>。  |  |


### <a id="LoginFailCheckConfigDto"></a> LoginFailCheckConfigDto

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |
| enabled | boolean | 是 | 是否开启登录失败次数限制。   |  |
| limit | number | 是 | 在一定时间周期内，对于同一个 IP，最多登录失败多少次后会触发安全策略。   |  `50` |
| timeInterval | number | 是 | 限定周期时间长度，单位为秒。   |  `300` |


### <a id="LoginPassowrdFailCheckConfigDto"></a> LoginPassowrdFailCheckConfigDto

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |
| enabled | boolean | 是 | 是否开启登录失败次数限制。   |  |
| limit | number | 是 | 在一定时间周期内，对于同一个 IP，最多因为密码错误导致登录失败多少次后会触发安全策略。   |  `50` |
| timeInterval | number | 是 | 限定周期时间长度，单位为秒。   |  `300` |


### <a id="SelfUnlockAccountConfigDto"></a> SelfUnlockAccountConfigDto

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |
| enabled | boolean | 是 | 是否允许用户自助解锁账号。   |  |
| strategy | string | 是 | 自助解锁方式，目前支持原密码 + 验证码和验证码两种方式。   | captcha |


### <a id="QrcodeLoginStrategyDto"></a> QrcodeLoginStrategyDto

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |
| qrcodeExpiresIn | number | 是 | 二维码有效时间（秒）   |  `120` |
| ticketExpiresIn | number | 是 | ticket 有效时间（秒）   |  `300` |
| allowExchangeUserInfoFromBrowser | boolean | 是 | Web 轮询接口返回完整用户信息，详情见此文档：Web 轮询接口返回完整用户信息   |  `true` |
| returnFullUserInfo | boolean | 是 | 允许在浏览器使用 ticket 换取用户信息，详情见此文档：Web 轮询接口返回完整用户信息   |  `true` |


