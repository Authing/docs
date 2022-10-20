# 获取应用列表

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

获取应用列表

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 | 示例值 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| page | number  | 否 | 1 | 当前页数，从 1 开始。  | `1` |
| limit | number  | 否 | 10 | 每页数目，最大不能超过 50，默认为 10。  | `10` |
| isIntegrateApp | boolean  | 否 | - | 是否为集成应用。  |  |
| isSelfBuiltApp | boolean  | 否 | - | 是否为自建应用。  |  |
| ssoEnabled | boolean  | 否 | - | 是否开启单点登录。  |  |
| keyword | string  | 否 | - | 模糊搜索字符串。  | `test` |


## 示例代码

```go
package main

import (
    "github.com/Authing/authing-golang-sdk/management"
    "github.com/Authing/authing-golang-sdk/dto"

    "fmt"
)

func main() {
    options := management.ClientOptions {
        AccessKeyId:     "AUTHING_USERPOOL_ID",
        AccessKeySecret: "AUTHING_USERPOOL_SECRET",
    }

    client, err := management.NewClient(&options)
    if err != nil {
        // The exception needs to be handled by the developer.
    }

    response := client.listApplications(
    
     
        page: 1        , 
        limit: 10        , 
        isIntegrateApp: false        , 
        isSelfBuiltApp: false        , 
        ssoEnabled: false        , 
        keyword: "test"        
  )
}
```



## 请求响应

类型： `ApplicationPaginatedRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| requestId | string | 请求 ID。当请求失败时会返回。 |
| data | <a href="#ApplicationPaginatedDataDto">ApplicationPaginatedDataDto</a> | 响应数据 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "requestId": "934108e5-9fbf-4d24-8da1-c330328abd6c",
  "data": {
    "list": {
      "appId": "62eaa95fe0xxxx9a5295bf7c",
      "appIdentifier": "example",
      "appName": "示例应用",
      "appLogo": "示例应用",
      "appDescription": "示例描述信息",
      "appType": "web",
      "defaultProtocol": "oidc",
      "redirectUris": "[\"https://example.com/callback\"]",
      "logoutRedirectUris": "[\"https://example.com/logout-callback\"]",
      "initLoginUri": "[\"https://example.com/login\"]",
      "ssoEnabled": true,
      "ssoEnabledAt": "2022-07-03T02:20:30.000Z",
      "loginConfig": {
        "enabledBasicLoginMethods": "[\"EMAIL_CODE\",\"EMAIL_PASSWORD\"]",
        "defaultLoginMethod": {
          "connectionType": "QRCODE",
          "qrcodeExtIdpConnId": "6303a2bf2xxxxx7f665f01bf1"
        },
        "enabledExtIdpConns": "[\"6303a2bf2xxxx7f665f01bf1\",\"6321397b6xxxx1b8481ccfc0\"]"
      },
      "registerConfig": {
        "enabledBasicRegisterMethods": "[\"EMAIL_CODE\",\"PHONE_CODE\"]",
        "defaultRegisterMethod": {
          "connectionType": "PASSWORD"
        }
      },
      "brandingConfig": {
        "customCSS": "/* \nEdit login page css\neg：\n.authing-guard-layout {\n  background: black !important;\n}\nChange the background color\n*/",
        "guardVersion": "Advanced",
        "customLoadingImage": "https://files.authing.co/user-contents/photos/cbd51df7-efb1-4b50-b38c-d8e5a04b1830.png",
        "customBackground": "https://files.authing.co/user-contents/photos/cbd51df7-efb1-4b50-b38c-d8e5a04b1830.png",
        "defaultLanguage": "zh-CN",
        "showForgetPasswordButton": true,
        "showEnterpriseConnections": true,
        "showSocialConnections": true,
        "agreements": {
          "displayAt": "[\"LoginPage\",\"RegisterPage\"]",
          "isRequired": true,
          "lang": "zh-CN",
          "content": "我已阅读并同意隐私协议与服务条款"
        }
      },
      "oidcConfig": {},
      "samlConfig": {},
      "oauthConfig": {},
      "casConfig": {},
      "template": "github"
    },
    "totalCount": 10
  }
}
```

## 数据结构


### <a id="ApplicationPaginatedDataDto"></a> ApplicationPaginatedDataDto

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| list | array | 是 | 列表数据。嵌套类型：<a href="#ApplicationDto">ApplicationDto</a>。  |  |
| totalCount | number | 是 | 记录总数。  |  `10` |


### <a id="ApplicationDto"></a> ApplicationDto

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| appId | string | 是 | 应用 ID。  |  `62eaa95fe0xxxx9a5295bf7c` |
| appIdentifier | string | 是 | 应用唯一标志。  |  `example` |
| appName | string | 是 | 应用名称。  |  `示例应用` |
| appLogo | string | 是 | 应用 Logo 链接。  |  `示例应用` |
| appDescription | string | 否 | 应用描述信息。  |  `示例描述信息` |
| appType | string | 是 | 应用类型。  | 可选枚举值：`web`,`spa`,`native`,`api` |
| userPoolId | string | 是 | 用户池 ID。  |  |
| isIntegrateApp | boolean | 是 | 是否为集成应用。  |  |
| defaultProtocol | string | 是 | 默认应用协议类型。  | 可选枚举值：`oidc`,`oauth`,`saml`,`cas`,`asa` |
| redirectUris | array | 是 | 应用登录回调地址。  |  `["https://example.com/callback"]` |
| logoutRedirectUris | array | 是 | 应用退出登录回调地址。  |  `["https://example.com/logout-callback"]` |
| initLoginUri | string | 是 | 发起登录地址：在 Authing 应用详情点击「体验登录」或在应用面板点击该应用图标时，会跳转到此 URL，默认为 Authing 登录页。。  |  `["https://example.com/login"]` |
| ssoEnabled | boolean | 是 | 是否开启 SSO 单点登录。  |  `true` |
| ssoEnabledAt | string | 否 | 开启 SSO 单点登录的时间。  |  `2022-07-03T02:20:30.000Z` |
| loginConfig |  | 是 | 登录配置。嵌套类型：<a href="#ApplicationLoginConfigDto">ApplicationLoginConfigDto</a>。  |  |
| registerConfig |  | 是 | 注册配置。嵌套类型：<a href="#ApplicationRegisterConfig">ApplicationRegisterConfig</a>。  |  |
| brandingConfig |  | 是 | 品牌化配置。嵌套类型：<a href="#ApplicationBrandingConfig">ApplicationBrandingConfig</a>。  |  |
| oidcConfig |  | 是 | OIDC 协议配置。嵌套类型：<a href="#OIDCConfig">OIDCConfig</a>。  |  |
| samlProviderEnabled | boolean | 是 | 是否开启 SAML 身份提供商。  |  |
| samlConfig |  | 否 | SAML 协议配置。嵌套类型：<a href="#SamlIdpConfig">SamlIdpConfig</a>。  |  |
| oauthProviderEnabled | boolean | 是 | 是否开启 OAuth 身份提供商。  |  |
| oauthConfig |  | 否 | OAuth2.0 协议配置。嵌套类型：<a href="#OauthIdpConfig">OauthIdpConfig</a>。  |  |
| casProviderEnabled | boolean | 是 | 是否开启 CAS 身份提供商。  |  |
| casConfig |  | 否 | CAS 协议配置。嵌套类型：<a href="#CasIdPConfig">CasIdPConfig</a>。  |  |
| customBrandingEnabled | boolean | 是 | 是否自定义本应用的登录框，默认走全局的登录框配置。。  |  |
| customSecurityEnabled | boolean | 是 | 是否自定义本应用的安全规则，默认走全局的安全配置。。  |  |
| template | string | 否 | 集成应用的模版类型。  |  `github` |


### <a id="ApplicationLoginConfigDto"></a> ApplicationLoginConfigDto

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| mergeLoginAndRegisterPage | boolean | 是 | 是否开启登录注册合并。  |  |
| enabledBasicLoginMethods | array | 是 | 开启的基础登录方式。  |  `["EMAIL_CODE","EMAIL_PASSWORD"]` |
| defaultLoginMethod |  | 是 | 应用默认登录方式（不包含社会化登录和企业身份源登录）。嵌套类型：<a href="#ApplicationDefaultLoginMethod">ApplicationDefaultLoginMethod</a>。  |  `{"connectionType":"QRCODE","qrcodeExtIdpConnId":"6303a2bf2xxxxx7f665f01bf1"}` |
| enabledExtIdpConns | array | 是 | 开启的外部身份源连接。嵌套类型：<a href="#ApplicationEnabledExtIdpConnDto">ApplicationEnabledExtIdpConnDto</a>。  |  `["6303a2bf2xxxx7f665f01bf1","6321397b6xxxx1b8481ccfc0"]` |
| showAuthorizationPage | boolean | 是 | 是否展示用户授权页面。  |  |


### <a id="ApplicationDefaultLoginMethod"></a> ApplicationDefaultLoginMethod

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| connectionType | string | 是 | 默认的登录类型<br>  - `PASSWORD`: 密码类型，取决于你开启的基础登录方式，支持手机号/邮箱/用户名 + 密码进行登录<br>  - `PASSCODE`: 验证码类型，取决于你开启的基础登录方式，支持手机号/邮箱 + 验证码进行登录<br>  - `QRCODE`: 扫码登录类型，目前包含自建 APP 扫码登录、关注微信公众号扫码登录、微信小程序扫码登录三种类型<br>      。  | 可选枚举值：`PASSCODE`,`PASSWORD`,`QRCODE`,`LDAP`,`AD` |
| qrcodeType | string | 是 | 当 `connectionType` 为 `QRCODE` 时，此参数表示二维码类型。<br>- `SELF_BUILT_APP`: 自建 APP 扫码<br>- `WECHAT_OFFICIAL_ACCOUNT`: 扫码关注微信公众号登录<br>- `WECHAT_MINI_PROGRAM`: 微信小程序扫码登录<br>    。  | 可选枚举值：`SELF_BUILT_APP`,`WECHAT_OFFICIAL_ACCOUNT`,`WECHAT_MINI_PROGRAM` |
| qrcodeExtIdpConnId | string | 是 | 当 `connectionType` 为 `QRCODE` 时，你需要通过此参数指定具体的扫码登录身份源连接的 ID。。  |  `6303a2bf2xxxxx7f665f01bf1` |
| adExtIdpConnId | string | 是 | 当 `connectionType` 为 `AD` 时，你需要通过此参数指定具体的 AD 身份源连接的 ID。。  |  `6303a2bf2xxxxx7f665f01bf1` |
| ldapExtIdpConnId | string | 是 | 当 `connectionType` 为 `LDAP` 时，你需要通过此参数指定具体的 LDAP 身份源连接的 ID。。  |  `6303a2bf2xxxxx7f665f01bf1` |


### <a id="ApplicationEnabledExtIdpConnDto"></a> ApplicationEnabledExtIdpConnDto

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| isSocial | boolean | 是 | 是否为社会化登录身份源连接。  |  `true` |
| extIdpId | string | 是 | 身份源 ID。  |  `6303a2bf2xxxxx7f665f01bf1` |
| extIdpType | string | 是 | 身份源类型。  | 可选枚举值：`oidc`,`oauth2`,`saml`,`ldap`,`ad`,`cas`,`azure-ad`,`wechat`,`google`,`qq`,`wechatwork`,`dingtalk`,`weibo`,`github`,`alipay`,`apple`,`baidu`,`lark`,`gitlab`,`twitter`,`facebook`,`slack`,`linkedin`,`yidun`,`qingcloud`,`gitee`,`instagram`,`welink` |
| extIdpConnId | string | 是 | 身份源连接 ID。  |  `6303a2bf2xxxxx7f665f01bf1` |
| extIdpConnType | string | 是 | 身份源连接类型。  | 可选枚举值：`oidc`,`oauth`,`saml`,`ldap`,`ad`,`cas`,`azure-ad`,`alipay`,`facebook`,`twitter`,`google:mobile`,`google`,`wechat:pc`,`wechat:mobile`,`wechat:webpage-authorization`,`wechatmp-qrcode`,`wechat:miniprogram:default`,`wechat:miniprogram:qrconnect`,`wechat:miniprogram:app-launch`,`github`,`qq`,`wechatwork:corp:qrconnect`,`wechatwork:agency:qrconnect`,`wechatwork:service-provider:qrconnect`,`wechatwork:mobile`,`wechatwork:agency:mobile`,`dingtalk`,`dingtalk:provider`,`weibo`,`apple`,`apple:web`,`baidu`,`lark-internal`,`lark-public`,`gitlab`,`linkedin`,`slack`,`yidun`,`qingcloud`,`gitee`,`instagram`,`welink`,`ad-kerberos` |
| extIdpConnIdentifier | string | 是 | 身份源连接可读唯一标志。  |  `6303a2bf2xxxxx7f665f01bf1` |
| extIdpConnDisplayName | string | 是 | 微信。  |  `6303a2bf2xxxxx7f665f01bf1` |
| extIdpConnLogo | string | 是 | 身份源连接 Logo。  |  `https://files.authing.co/authing-console/social-connections/wechatBrowser.svg` |


### <a id="ApplicationRegisterConfig"></a> ApplicationRegisterConfig

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| enabledBasicRegisterMethods | array | 是 | 开启的注册方式。  |  `["EMAIL_CODE","PHONE_CODE"]` |
| defaultRegisterMethod | string | 是 | 默认的注册类型<br>    - `PASSWORD`: 密码类型，支持邮箱 + 密码进行登录<br>    - `PASSCODE`: 验证码类型，取决于你开启的注册方式，支持手机号/邮箱 + 验证码进行登录<br>        。  | 可选枚举值：`PASSCODE`,`PASSWORD` |


### <a id="ApplicationBrandingConfig"></a> ApplicationBrandingConfig

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| customCSSEnabled | boolean | 是 | 是否开启自定义 CSS。  |  |
| customCSS | string | 否 | 自定义 CSS 内容。  |  `/* 
Edit login page css
eg：
.authing-guard-layout {
  background: black !important;
}
Change the background color
*/` |
| guardVersion | string | 是 | Guard 版本：<br>- `Advanced`: 高级版<br>- `Classical`: 经典版<br>    。  | 可选枚举值：`Advanced`,`Classical` |
| customLoadingImage | string | 否 | 自定义加载图标，当登录框加载时会展示。  |  `https://files.authing.co/user-contents/photos/cbd51df7-efb1-4b50-b38c-d8e5a04b1830.png` |
| customBackground | string | 否 | 自定义登录页背景，示例：<br>- 图片背景：`url(https://files.authing.co/user-contents/photos/6c6b3726-4a04-4ba7-b686-1a275f81a47a.png) center/cover`<br>- 纯色背景：`rgba(37,49,122,1)`<br>    。  |  `https://files.authing.co/user-contents/photos/cbd51df7-efb1-4b50-b38c-d8e5a04b1830.png` |
| showChangeLanguageButton | boolean | 是 | 是否显示切换语言按钮。  |  |
| defaultLanguage | string | 是 | 默认语言:<br>- `zh-CN`: 简体中文<br>- `zh-TW`: 繁体中文<br>- `en-US`: 英文<br>- `ja-JP`: 日语<br>    。  | 可选枚举值：`zh-CN`,`en-US`,`zh-TW`,`ja-JP` |
| showForgetPasswordButton | boolean | 是 | 是否显示忘记密码按钮。  |  `true` |
| showEnterpriseConnections | boolean | 是 | 是否显示企业身份源登录方式。  |  `true` |
| showSocialConnections | boolean | 是 | 是否显示社会化登录方式。  |  `true` |
| showAgreement | boolean | 是 | 是否展示登录注册协议。  |  |
| agreements |  | 是 | 展示的登录注册协议列表。嵌套类型：<a href="#ApplicationAgreementDto">ApplicationAgreementDto</a>。  |  |


### <a id="ApplicationAgreementDto"></a> ApplicationAgreementDto

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| displayAt | array | 是 | 展示的页面（可多选）：<br>- `LoginPage`: 登录页面<br>- `RegisterPage`: 注册页面<br>    。  |  `["LoginPage","RegisterPage"]` |
| isRequired | boolean | 是 | 是否要求必须勾选。  |  `true` |
| lang | string | 是 | 此协议针对什么语言有效:<br>- `zh-CN`: 简体中文<br>- `zh-TW`: 繁体中文<br>- `en-US`: 英文<br>- `ja-JP`: 日语<br>    。  | 可选枚举值：`zh-CN`,`en-US`,`zh-TW`,`ja-JP` |
| content | string | 是 | 此协议针对什么语言有效。  |  `我已阅读并同意隐私协议与服务条款` |


### <a id="OIDCConfig"></a> OIDCConfig

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |


### <a id="SamlIdpConfig"></a> SamlIdpConfig

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |


### <a id="OauthIdpConfig"></a> OauthIdpConfig

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |


### <a id="CasIdPConfig"></a> CasIdPConfig

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |


