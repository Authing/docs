# 创建应用

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

创建应用

## 请求参数

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:60px">默认值</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- | ---- | ---- | ---- | ---- | ---- |
| appName | string | 是 | - | 应用名称  | `示例应用` |
| template | string | 否 | - | 集成应用模版类型，**集成应用必填**。集成应用只需要填 `template` 和 `templateData` 两个字段，其他的字段将被忽略。  | `github` |
| templateData | string | 否 | - | 集成应用配置信息，**集成应用必填**。  | `github` |
| appIdentifier | string | 否 | - | 应用唯一标志，**自建应用必填**。  | `example` |
| appLogo | string | 否 | - | 应用 Logo 链接  | `示例应用` |
| appDescription | string | 否 | - | 应用描述信息  | `示例描述信息` |
| appType | string | 否 | web | 应用类型  | `web` |
| defaultProtocol | string | 否 | - | 默认应用协议类型  | `oidc` |
| redirectUris | string[] | 否 | - | 应用登录回调地址  | `["https://example.com/callback"]` |
| logoutRedirectUris | string[] | 否 | - | 应用退出登录回调地址  | `["https://example.com/logout-callback"]` |
| initLoginUri | string | 否 | - | 发起登录地址：在 Authing 应用详情点击「体验登录」或在应用面板点击该应用图标时，会跳转到此 URL，默认为 Authing 登录页。  | `["https://example.com/login"]` |
| ssoEnabled | boolean | 否 | - | 是否开启 SSO 单点登录  |  |
| oidcConfig | <a href="#OIDCConfig">OIDCConfig</a> | 否 | [object Object] | OIDC 协议配置  |  |
| samlProviderEnabled | boolean | 否 | - | 是否开启 SAML 身份提供商  |  |
| samlConfig | <a href="#SamlIdpConfig">SamlIdpConfig</a> | 否 | [object Object] | SAML 协议配置  |  |
| oauthProviderEnabled | boolean | 否 | - | 是否开启 OAuth 身份提供商  |  |
| oauthConfig | <a href="#OauthIdpConfig">OauthIdpConfig</a> | 否 | - | OAuth2.0 协议配置。【重要提示】不再推荐使用 OAuth2.0，建议切换到 OIDC。  | `{"grants":["authorization_code"],"access_token_lifetime":1209600,"refresh_token_lifetime":2592000,"introspection_endpoint_auth_method":"client_secret_post","revocation_endpoint_auth_method":"client_secret_post","id":"635105b267de3f03c58547eb","client_secret":"eac1620f9180a8f4041f01f23b215c37","redirect_uris":[]}` |
| casProviderEnabled | boolean | 否 | - | 是否开启 CAS 身份提供商  |  |
| casConfig | <a href="#CasIdPConfig">CasIdPConfig</a> | 否 | - | CAS 协议配置  | `{"casUserIdentifier":"${user.username}","customAttributes":{"customAttr1":"123"},"stLifetime":300}` |
| loginConfig | <a href="#ApplicationLoginConfigInputDto">ApplicationLoginConfigInputDto</a> | 否 | - | 登录配置  |  |
| registerConfig | <a href="#ApplicationRegisterConfigInputDto">ApplicationRegisterConfigInputDto</a> | 否 | - | 注册配置  |  |
| brandingConfig | <a href="#ApplicationBrandingConfigInputDto">ApplicationBrandingConfigInputDto</a> | 否 | - | 品牌化配置  |  |


<!-- 暂时不显示示例代码 -->
<!-- ## 示例代码
```java
import cn.authing.sdk.java.dto.*;
import cn.authing.sdk.java.client.ManagementClient;
import cn.authing.sdk.java.model.ManagementClientOptions;

class Test {
    private static String ACCESS_KEY_ID = "AUTHING_USERPOOL_ID";
    private static String ACCESS_KEY_SECRET = "AUTHING_USERPOOL_SECRET";

    public static void main(String[] args) {
        ManagementClientOptions clientOptions = new ManagementClientOptions(ACCESS_KEY_ID, ACCESS_KEY_SECRET);
        ManagementClient managementClient = new ManagementClient(clientOptions);
    
        CreateApplicationDto request = new CreateApplicationDto();
        request.setAppName("示例应用");
        request.setTemplate("github");
        request.setTemplateData("github");
        request.setAppIdentifier("example");
        request.setAppLogo("示例应用");
        request.setAppDescription("示例描述信息");
        request.setAppType(CreateApplicationDto.appType.WEB);
        request.setDefaultProtocol(CreateApplicationDto.defaultProtocol.OIDC);
        request.setRedirectUris(new List<String>("https://example.com/callback",));
        request.setLogoutRedirectUris(new List<String>("https://example.com/logout-callback",));
        request.setInitLoginUri("["https://example.com/login"]");
        request.setSsoEnabled(false);
            OidcConfig= new OIDCConfig(
                        ),
        request.setSamlProviderEnabled(false);
            SamlConfig= new SamlIdpConfig(
                        ),
        request.setOauthProviderEnabled(false);
            OauthConfig= new OauthIdpConfig(
                        ),
        request.setCasProviderEnabled(false);
            CasConfig= new CasIdPConfig(
                        ),
            LoginConfig= new ApplicationLoginConfigInputDto(
                    request.setMergeLoginAndRegisterPage(false);
    request.setEnabledBasicLoginMethods(new List<String>());
        DefaultLoginMethod= new ApplicationDefaultLoginMethodInput(
                    request.setConnectionType(ApplicationDefaultLoginMethodInput.connectionType.PASSCODE);
    request.setQrcodeType(ApplicationDefaultLoginMethodInput.qrcodeType.WECHAT_OFFICIAL_ACCOUNT);
    request.setQrcodeExtIdpConnId("6303a2bf2xxxxx7f665f01bf1");
    request.setAdExtIdpConnId("6303a2bf2xxxxx7f665f01bf1");
    request.setLdapExtIdpConnId("6303a2bf2xxxxx7f665f01bf1");
        ),
        EnabledExtIdpConnIds= new List<ApplicationEnabledExtIdpConnInputDto>(
                    new ApplicationEnabledExtIdpConnInputDto().set

               request.setExtIdpConnId("6303a2bf2xxxxx7f665f01bf1");
      
                  ),
    request.setEnabledAllExtIdpConns(false);
    request.setShowAuthorizationPage(false);
        ),
            RegisterConfig= new ApplicationRegisterConfigInputDto(
                    request.setEnabledBasicRegisterMethods(new List<String>("EMAIL_CODE","PHONE_CODE",));
    request.setDefaultRegisterMethod(ApplicationRegisterConfigInputDto.defaultRegisterMethod.PASSWORD);
        ),
            BrandingConfig= new ApplicationBrandingConfigInputDto(
                    request.setCustomCSSEnabled(false);
    request.setCustomCSS("/* 
Edit login page css
eg：
.authing-guard-layout {
  background: black !important;
}
Change the background color
*/");
    request.setGuardVersion(ApplicationBrandingConfigInputDto.guardVersion.ADVANCED);
    request.setCustomLoadingImage("https://files.authing.co/user-contents/photos/cbd51df7-efb1-4b50-b38c-d8e5a04b1830.png");
    request.setCustomBackground("https://files.authing.co/user-contents/photos/cbd51df7-efb1-4b50-b38c-d8e5a04b1830.png");
    request.setShowChangeLanguageButton(false);
    request.setDefaultLanguage(ApplicationBrandingConfigInputDto.defaultLanguage.ZH-CN);
    request.setShowForgetPasswordButton(true);
    request.setShowEnterpriseConnections(true);
    request.setShowSocialConnections(true);
        ),
        
        ApplicationPaginatedRespDto response = managementClient.createApplication(request);
        System.out.println(response);
    }
}
```
 -->


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


### <a id="OIDCConfig"></a> OIDCConfig

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |


### <a id="SamlIdpConfig"></a> SamlIdpConfig

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |


### <a id="OauthIdpConfig"></a> OauthIdpConfig

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |


### <a id="CasIdPConfig"></a> CasIdPConfig

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |


### <a id="ApplicationLoginConfigInputDto"></a> ApplicationLoginConfigInputDto

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |
| mergeLoginAndRegisterPage | boolean | 否 | 是否开启登录注册合并   |  |
| enabledBasicLoginMethods | array | 否 | 开启的基础登录方式   |  |
| defaultLoginMethod |  | 否 | 应用默认登录方式（不包含社会化登录和企业身份源登录） 嵌套类型：<a href="#ApplicationDefaultLoginMethodInput">ApplicationDefaultLoginMethodInput</a>。  |  `{"connectionType":"QRCODE","qrcodeExtIdpConnId":"6303a2bf2xxxxx7f665f01bf1"}` |
| enabledExtIdpConnIds | array | 否 | 开启的外部身份源连接 嵌套类型：<a href="#ApplicationEnabledExtIdpConnInputDto">ApplicationEnabledExtIdpConnInputDto</a>。  |  `[{"extIdpConnId":"xxx"}]` |
| enabledAllExtIdpConns | boolean | 否 | 开启所有的外部身份源连接   |  |
| showAuthorizationPage | boolean | 是 | 是否展示用户授权页面   |  |


### <a id="ApplicationDefaultLoginMethodInput"></a> ApplicationDefaultLoginMethodInput

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |
| connectionType | string | 是 | 默认的登录类型<br>  - `PASSWORD`: 密码类型，取决于你开启的基础登录方式，支持手机号/邮箱/用户名 + 密码进行登录<br>  - `PASSCODE`: 验证码类型，取决于你开启的基础登录方式，支持手机号/邮箱 + 验证码进行登录<br>  - `QRCODE`: 扫码登录类型，目前包含自建 APP 扫码登录、关注微信公众号扫码登录、微信小程序扫码登录三种类型<br>         | PASSCODE |
| qrcodeType | string | 否 | 当 `connectionType` 为 `QRCODE` 时，此参数表示二维码类型。<br>- `SELF_BUILT_APP`: 自建 APP 扫码<br>- `WECHAT_OFFICIAL_ACCOUNT`: 扫码关注微信公众号登录<br>- `WECHAT_MINI_PROGRAM`: 微信小程序扫码登录<br>       | SELF_BUILT_APP |
| qrcodeExtIdpConnId | string | 否 | 当 `connectionType` 为 `QRCODE` 时，你需要通过此参数指定具体的扫码登录身份源连接的 ID。   |  `6303a2bf2xxxxx7f665f01bf1` |
| adExtIdpConnId | string | 否 | 当 `connectionType` 为 `AD` 时，你需要通过此参数指定具体的 AD 身份源连接的 ID。   |  `6303a2bf2xxxxx7f665f01bf1` |
| ldapExtIdpConnId | string | 否 | 当 `connectionType` 为 `LDAP` 时，你需要通过此参数指定具体的 LDAP 身份源连接的 ID。   |  `6303a2bf2xxxxx7f665f01bf1` |


### <a id="ApplicationEnabledExtIdpConnInputDto"></a> ApplicationEnabledExtIdpConnInputDto

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |
| extIdpConnId | string | 是 | 身份源连接 ID   |  `6303a2bf2xxxxx7f665f01bf1` |


### <a id="ApplicationRegisterConfigInputDto"></a> ApplicationRegisterConfigInputDto

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |
| enabledBasicRegisterMethods | array | 是 | 开启的注册方式   |  `["EMAIL_CODE","PHONE_CODE"]` |
| defaultRegisterMethod | string | 是 | 默认的注册类型<br>- `PASSWORD`: 密码类型，支持邮箱 + 密码进行登录<br>- `PASSCODE`: 验证码类型，取决于你开启的注册方式，支持手机号/邮箱 + 验证码进行登录<br>           | PASSCODE |


### <a id="ApplicationBrandingConfigInputDto"></a> ApplicationBrandingConfigInputDto

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |
| customCSSEnabled | boolean | 否 | 是否开启自定义 CSS   |  |
| customCSS | string | 否 | 自定义 CSS 内容   |  `/* 
Edit login page css
eg：
.authing-guard-layout {
  background: black !important;
}
Change the background color
*/` |
| guardVersion | string | 否 | Guard 版本：<br>- `Advanced`: 高级版<br>- `Classical`: 经典版<br>       | Advanced |
| customLoadingImage | string | 否 | 自定义加载图标，当登录框加载时会展示   |  `https://files.authing.co/user-contents/photos/cbd51df7-efb1-4b50-b38c-d8e5a04b1830.png` |
| customBackground | string | 否 | 自定义登录页背景，示例：<br>- 图片背景：`url(https://files.authing.co/user-contents/photos/6c6b3726-4a04-4ba7-b686-1a275f81a47a.png) center/cover`<br>- 纯色背景：`rgba(37,49,122,1)`<br>       |  `https://files.authing.co/user-contents/photos/cbd51df7-efb1-4b50-b38c-d8e5a04b1830.png` |
| showChangeLanguageButton | boolean | 否 | 是否显示切换语言按钮   |  |
| defaultLanguage | string | 否 | 展示的默认语言：<br>- `zh-CN`: 简体中文<br>- `zh-TW`: 繁体中文<br>- `en-US`: 英文<br>- `ja-JP`: 日语<br><br>默认情况下，Authing 登录页会根据用户浏览器语言自动渲染。<br>       | zh-CN |
| showForgetPasswordButton | boolean | 否 | 是否显示忘记密码按钮   |  `true` |
| showEnterpriseConnections | boolean | 否 | 是否显示企业身份源登录方式   |  `true` |
| showSocialConnections | boolean | 否 | 是否显示社会化登录方式   |  `true` |


### <a id="ApplicationPaginatedDataDto"></a> ApplicationPaginatedDataDto

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |
| list | array | 是 | 列表数据 嵌套类型：<a href="#ApplicationDto">ApplicationDto</a>。  |  |
| totalCount | number | 是 | 记录总数   |  `10` |


### <a id="ApplicationDto"></a> ApplicationDto

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |
| appId | string | 是 | 应用 ID   |  `62eaa95fe0xxxx9a5295bf7c` |
| appIdentifier | string | 是 | 应用唯一标志   |  `example` |
| appName | string | 是 | 应用名称   |  `示例应用` |
| appLogo | string | 是 | 应用 Logo 链接   |  `示例应用` |
| appDescription | string | 否 | 应用描述信息   |  `示例描述信息` |
| appType | string | 是 | 应用类型   | web |
| userPoolId | string | 是 | 用户池 ID   |  |
| isIntegrateApp | boolean | 是 | 是否为集成应用   |  |
| defaultProtocol | string | 是 | 默认应用协议类型   | oidc |
| redirectUris | array | 是 | 应用登录回调地址   |  `["https://example.com/callback"]` |
| logoutRedirectUris | array | 是 | 应用退出登录回调地址   |  `["https://example.com/logout-callback"]` |
| initLoginUri | string | 是 | 发起登录地址：在 Authing 应用详情点击「体验登录」或在应用面板点击该应用图标时，会跳转到此 URL，默认为 Authing 登录页。   |  `["https://example.com/login"]` |
| ssoEnabled | boolean | 是 | 是否开启 SSO 单点登录   |  `true` |
| ssoEnabledAt | string | 否 | 开启 SSO 单点登录的时间   |  `2022-07-03T02:20:30.000Z` |
| loginConfig |  | 是 | 登录配置 嵌套类型：<a href="#ApplicationLoginConfigDto">ApplicationLoginConfigDto</a>。  |  |
| registerConfig |  | 是 | 注册配置 嵌套类型：<a href="#ApplicationRegisterConfig">ApplicationRegisterConfig</a>。  |  |
| brandingConfig |  | 是 | 品牌化配置 嵌套类型：<a href="#ApplicationBrandingConfig">ApplicationBrandingConfig</a>。  |  |
| oidcConfig |  | 是 | OIDC 协议配置 嵌套类型：<a href="#OIDCConfig">OIDCConfig</a>。  |  |
| samlProviderEnabled | boolean | 是 | 是否开启 SAML 身份提供商   |  |
| samlConfig |  | 否 | SAML 协议配置 嵌套类型：<a href="#SamlIdpConfig">SamlIdpConfig</a>。  |  |
| oauthProviderEnabled | boolean | 是 | 是否开启 OAuth 身份提供商   |  |
| oauthConfig |  | 否 | OAuth2.0 协议配置 嵌套类型：<a href="#OauthIdpConfig">OauthIdpConfig</a>。  |  |
| casProviderEnabled | boolean | 是 | 是否开启 CAS 身份提供商   |  |
| casConfig |  | 否 | CAS 协议配置 嵌套类型：<a href="#CasIdPConfig">CasIdPConfig</a>。  |  |
| customBrandingEnabled | boolean | 是 | 是否自定义本应用的登录框，默认走全局的登录框配置。   |  |
| customSecurityEnabled | boolean | 是 | 是否自定义本应用的安全规则，默认走全局的安全配置。   |  |
| template | string | 否 | 集成应用的模版类型   |  `github` |


### <a id="ApplicationLoginConfigDto"></a> ApplicationLoginConfigDto

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |
| mergeLoginAndRegisterPage | boolean | 是 | 是否开启登录注册合并   |  |
| enabledBasicLoginMethods | array | 是 | 开启的基础登录方式   |  `["EMAIL_CODE","EMAIL_PASSWORD"]` |
| defaultLoginMethod |  | 是 | 应用默认登录方式（不包含社会化登录和企业身份源登录） 嵌套类型：<a href="#ApplicationDefaultLoginMethod">ApplicationDefaultLoginMethod</a>。  |  `{"connectionType":"QRCODE","qrcodeExtIdpConnId":"6303a2bf2xxxxx7f665f01bf1"}` |
| enabledExtIdpConns | array | 是 | 开启的外部身份源连接 嵌套类型：<a href="#ApplicationEnabledExtIdpConnDto">ApplicationEnabledExtIdpConnDto</a>。  |  `["6303a2bf2xxxx7f665f01bf1","6321397b6xxxx1b8481ccfc0"]` |
| showAuthorizationPage | boolean | 是 | 是否展示用户授权页面   |  |


### <a id="ApplicationDefaultLoginMethod"></a> ApplicationDefaultLoginMethod

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |
| connectionType | string | 是 | 默认的登录类型<br>  - `PASSWORD`: 密码类型，取决于你开启的基础登录方式，支持手机号/邮箱/用户名 + 密码进行登录<br>  - `PASSCODE`: 验证码类型，取决于你开启的基础登录方式，支持手机号/邮箱 + 验证码进行登录<br>  - `QRCODE`: 扫码登录类型，目前包含自建 APP 扫码登录、关注微信公众号扫码登录、微信小程序扫码登录三种类型<br>         | PASSCODE |
| qrcodeType | string | 是 | 当 `connectionType` 为 `QRCODE` 时，此参数表示二维码类型。<br>- `SELF_BUILT_APP`: 自建 APP 扫码<br>- `WECHAT_OFFICIAL_ACCOUNT`: 扫码关注微信公众号登录<br>- `WECHAT_MINI_PROGRAM`: 微信小程序扫码登录<br>       | SELF_BUILT_APP |
| qrcodeExtIdpConnId | string | 是 | 当 `connectionType` 为 `QRCODE` 时，你需要通过此参数指定具体的扫码登录身份源连接的 ID。   |  `6303a2bf2xxxxx7f665f01bf1` |
| adExtIdpConnId | string | 是 | 当 `connectionType` 为 `AD` 时，你需要通过此参数指定具体的 AD 身份源连接的 ID。   |  `6303a2bf2xxxxx7f665f01bf1` |
| ldapExtIdpConnId | string | 是 | 当 `connectionType` 为 `LDAP` 时，你需要通过此参数指定具体的 LDAP 身份源连接的 ID。   |  `6303a2bf2xxxxx7f665f01bf1` |


### <a id="ApplicationEnabledExtIdpConnDto"></a> ApplicationEnabledExtIdpConnDto

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |
| isSocial | boolean | 是 | 是否为社会化登录身份源连接   |  `true` |
| extIdpId | string | 是 | 身份源 ID   |  `6303a2bf2xxxxx7f665f01bf1` |
| extIdpType | string | 是 | 身份源类型   | oidc |
| extIdpConnId | string | 是 | 身份源连接 ID   |  `6303a2bf2xxxxx7f665f01bf1` |
| extIdpConnType | string | 是 | 身份源连接类型   | oidc |
| extIdpConnIdentifier | string | 是 | 身份源连接可读唯一标志   |  `6303a2bf2xxxxx7f665f01bf1` |
| extIdpConnDisplayName | string | 是 | 微信   |  `6303a2bf2xxxxx7f665f01bf1` |
| extIdpConnLogo | string | 是 | 身份源连接 Logo   |  `https://files.authing.co/authing-console/social-connections/wechatBrowser.svg` |


### <a id="ApplicationRegisterConfig"></a> ApplicationRegisterConfig

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |
| enabledBasicRegisterMethods | array | 是 | 开启的注册方式   |  `["EMAIL_CODE","PHONE_CODE"]` |
| defaultRegisterMethod | string | 是 | 默认的注册类型<br>    - `PASSWORD`: 密码类型，支持邮箱 + 密码进行登录<br>    - `PASSCODE`: 验证码类型，取决于你开启的注册方式，支持手机号/邮箱 + 验证码进行登录<br>           | PASSCODE |


### <a id="ApplicationBrandingConfig"></a> ApplicationBrandingConfig

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |
| customCSSEnabled | boolean | 是 | 是否开启自定义 CSS   |  |
| customCSS | string | 否 | 自定义 CSS 内容   |  `/* 
Edit login page css
eg：
.authing-guard-layout {
  background: black !important;
}
Change the background color
*/` |
| guardVersion | string | 是 | Guard 版本：<br>- `Advanced`: 高级版<br>- `Classical`: 经典版<br>       | Advanced |
| customLoadingImage | string | 否 | 自定义加载图标，当登录框加载时会展示   |  `https://files.authing.co/user-contents/photos/cbd51df7-efb1-4b50-b38c-d8e5a04b1830.png` |
| customBackground | string | 否 | 自定义登录页背景，示例：<br>- 图片背景：`url(https://files.authing.co/user-contents/photos/6c6b3726-4a04-4ba7-b686-1a275f81a47a.png) center/cover`<br>- 纯色背景：`rgba(37,49,122,1)`<br>       |  `https://files.authing.co/user-contents/photos/cbd51df7-efb1-4b50-b38c-d8e5a04b1830.png` |
| showChangeLanguageButton | boolean | 是 | 是否显示切换语言按钮   |  |
| defaultLanguage | string | 是 | 默认语言:<br>- `zh-CN`: 简体中文<br>- `zh-TW`: 繁体中文<br>- `en-US`: 英文<br>- `ja-JP`: 日语<br>       | zh-CN |
| showForgetPasswordButton | boolean | 是 | 是否显示忘记密码按钮   |  `true` |
| showEnterpriseConnections | boolean | 是 | 是否显示企业身份源登录方式   |  `true` |
| showSocialConnections | boolean | 是 | 是否显示社会化登录方式   |  `true` |
| showAgreement | boolean | 是 | 是否展示登录注册协议   |  |
| agreements |  | 是 | 展示的登录注册协议列表 嵌套类型：<a href="#ApplicationAgreementDto">ApplicationAgreementDto</a>。  |  |


### <a id="ApplicationAgreementDto"></a> ApplicationAgreementDto

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |
| displayAt | array | 是 | 展示的页面（可多选）：<br>- `LoginPage`: 登录页面<br>- `RegisterPage`: 注册页面<br>       |  `["LoginPage","RegisterPage"]` |
| isRequired | boolean | 是 | 是否要求必须勾选   |  `true` |
| lang | string | 是 | 此协议针对什么语言有效:<br>- `zh-CN`: 简体中文<br>- `zh-TW`: 繁体中文<br>- `en-US`: 英文<br>- `ja-JP`: 日语<br>       | zh-CN |
| content | string | 是 | 此协议针对什么语言有效   |  `我已阅读并同意隐私协议与服务条款` |


### <a id="OIDCConfig"></a> OIDCConfig

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |


### <a id="SamlIdpConfig"></a> SamlIdpConfig

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |


### <a id="OauthIdpConfig"></a> OauthIdpConfig

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |


### <a id="CasIdPConfig"></a> CasIdPConfig

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |


