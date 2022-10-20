# 注册

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />


此端点目前支持以下几种基于的注册方式：

1. 基于密码（PASSWORD）：用户名 + 密码，邮箱 + 密码。
2. 基于一次性临时验证码（PASSCODE）：手机号 + 验证码，邮箱 + 验证码。你需要先调用发送短信或者发送邮件接口获取验证码。

社会化登录等使用外部身份源“注册”请直接使用**登录**接口，我们会在其第一次登录的时候为其创建一个新账号。


## 请求参数

| 名称 | 类型 | <div style="width:80px">是否必填</div> | 默认值 | <div style="width:300px">描述</div> | <div style="width:200px"></div>示例值</div> |
| ---- | ---- | ---- | ---- | ---- | ---- |
| connection | string | 是 | - | 注册方式：<br>- `PASSWORD`: 邮箱密码方式<br>- `PASSCODE`: 邮箱/手机号验证码方式<br>      | `PASSWORD` |
| passwordPayload | <a href="#SignUpByPasswordDto">SignUpByPasswordDto</a> | 否 | - | 当主持方式为 `PASSWORD` 时此参数必填。  | `{"email":"test@example.com","password":"passw0rd"}` |
| passCodePayload | <a href="#SignUpByPassCodeDto">SignUpByPassCodeDto</a> | 否 | - | 当认证方式为 `PASSCODE` 时此参数必填  | `{"email":"test@example.com","passCode":"passw0rd"}` |
| profile | <a href="#SignUpProfileDto">SignUpProfileDto</a> | 否 | - | 用户资料  |  |
| options | <a href="#SignUpOptionsDto">SignUpOptionsDto</a> | 否 | - | 可选参数  |  |


<!-- 暂时不显示示例代码 -->
<!-- ## 示例代码
```csharp

using Authing.CSharp.SDK.Models;
using Authing.CSharp.SDK.Services;
using Authing.CSharp.SDK.Utils;
using Authing.CSharp.SDK.UtilsImpl;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Example
{
    class Program
    {
      private static ManagementClientOptions options;
      private static string ACCESS_Key_ID = "AUTHING_USERPOOL_ID";
      private static string ACCESS_KEY_SECRET = "AUTHING_USERPOOL_SECRET";

      static void Main(string[] args)
      {
          MainAsync().GetAwaiter().GetResult();
      }

      private static async Task MainAsync()
      {
          options = new ManagementClientOptions()
          {
              AccessKeyId = ACCESS_Key_ID,
              AccessKeySecret = ACCESS_KEY_SECRET,
          };

          ManagementClient managementClient = new ManagementClient(options);
        
          UserSingleRespDto  result = await managementClient.Signup
          (  new SignUpDto{                  Connection= SignUpDto.connection.PASSWORD ,
                PasswordPayload= new SignUpByPasswordDto
                {
                          Password= "passw0rd" ,
          Username= "test" ,
          Email= "test@example.com" ,
        },
                PassCodePayload= new SignUpByPassCodeDto
                {
                          PassCode= "123456" ,
          Email= "114114" ,
          Phone= "188xxxx8888" ,
          PhoneCountryCode= "+86" ,
        },
                Profile= new SignUpProfileDto
                {
                          Nickname= "" ,
          Company= "Authing .Inc" ,
          Photo= "https://authing.cn/demo.jpg" ,
          Device= "iOS" ,
          Browser= "Edge" ,
          Name= "Mike" ,
          GivenName= "Zhou" ,
          FamilyName= "Jay" ,
          MiddleName= "Jane" ,
          Profile= "this is my profile" ,
          PreferredUsername= "Mike" ,
          Website= "https://authing.cn" ,
          Gender= SignUpProfileDto.gender.M ,
          Birthdate= "2020.2.2" ,
          Zoneinfo= "HongKong" ,
          Locale= "EN-US" ,
          Address= "Hai Dian XX" ,
          Formatted= "" ,
          StreetAddress= "Hai Dian Street 1" ,
          Locality= "BeiJing HaiDian" ,
          Region= "china" ,
          PostalCode= "3500000" ,
          Country= "china" ,
          Email= "help@authing.cn" ,
          Phone= "114114114" ,
          CustomData= new SignUpProfileDto{    name="H",} ,
        },
                Options= new SignUpOptionsDto
                {
                          ClientIp= "192.168.0.1" ,
          PhonePassCodeForInformationCompletion= "1234" ,
          EmailPassCodeForInformationCompletion= "1234" ,
          Context= new SignUpOptionsDto{    phoneNumber="188xxxx8888",    phoneCountryCode="+86",} ,
          PasswordEncryptType= SignUpOptionsDto.passwordEncryptType.NONE ,
        },
            }
          );
        }
    }
}

```
 -->

## 请求响应

类型： `UserSingleRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| requestId | string | 请求 ID。当请求失败时会返回。 |
| data | <a href="#UserDto">UserDto</a> | 响应数据 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "requestId": "934108e5-9fbf-4d24-8da1-c330328abd6c",
  "data": {
    "userId": "6229ffaxxxxxxxxcade3e3d9",
    "createdAt": "2022-07-03T02:20:30.000Z",
    "updatedAt": "2022-07-03T02:20:30.000Z",
    "status": "Activated",
    "externalId": "10010",
    "email": "test@example.com",
    "phone": "188xxxx8888",
    "phoneCountryCode": "+86",
    "username": "bob",
    "name": "张三",
    "nickname": "张三",
    "photo": "https://files.authing.co/authing-console/default-user-avatar.png",
    "loginsCount": 3,
    "lastLogin": "2022-07-03T02:20:30.000Z",
    "lastIp": "127.0.0.1",
    "gender": "M",
    "emailVerified": true,
    "phoneVerified": true,
    "passwordLastSetAt": "2022-07-03T02:20:30.000Z",
    "birthdate": "2022-06-03",
    "country": "CN",
    "province": "BJ",
    "city": "BJ",
    "address": "北京朝阳",
    "streetAddress": "北京朝阳区 xxx 街道",
    "postalCode": "438100",
    "company": "steamory",
    "browser": "Mozilla/5.0 (Linux; Android 10; V2001A; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/87.0.4280.141 Mobile Safari/537.36 VivoBrowser/10.2.10.0",
    "device": "iOS",
    "givenName": "三",
    "familyName": "张",
    "userSourceType": "register",
    "passwordSecurityLevel": 1,
    "departmentIds": "[\"624d930c3xxxx5c08dd4986e\",\"624d93102xxxx012f33cd2fe\"]",
    "identities": {
      "identityId": "62299d8b866d2dab79a89dc4",
      "extIdpId": "6076bacxxxxxxxxd80d993b5",
      "provider": "wechat",
      "type": "openid",
      "userIdInIdp": "oj7Nq05R-RRaqak0_YlMLnnIwsvg",
      "originConnIds": "[\"605492ac41xxxxe0362f0707\"]"
    },
    "customData": {
      "school": "北京大学",
      "age": 22
    },
    "statusChangedAt": "2022-07-03T02:20:30.000Z"
  }
}
```

## 数据结构


### <a id="SignUpByPasswordDto"></a> SignUpByPasswordDto

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |
| password | string | 是 | 用户密码，默认不加密。Authing 所有 API 均通过 HTTPS 协议对密码进行安全传输，可以在一定程度上保证安全性。<br>如果你还需要更高级别的安全性，我们还支持 `RSA256` 和国密 `SM2` 的密码加密方式。详情见可选参数 `options.passwordEncryptType`。<br>   |  `passw0rd` |
| username | string | 否 | 用户名   |  `test` |
| email | string | 否 | 邮箱，不区分大小写。   |  `test@example.com` |


### <a id="SignUpByPassCodeDto"></a> SignUpByPassCodeDto

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |
| passCode | string | 是 | 一次性临时验证码，你需要先调用发送短信或者发送邮件接口获取验证码。   |  `123456` |
| email | string | 否 | 邮箱，不区分大小写。   |  `114114` |
| phone | string | 否 | 手机号   |  `188xxxx8888` |
| phoneCountryCode | string | 否 | 手机区号，中国大陆手机号可不填。Authing 短信服务暂不内置支持国际手机号，你需要在 Authing 控制台配置对应的国际短信服务。完整的手机区号列表可参阅 https://en.wikipedia.org/wiki/List_of_country_calling_codes。   |  `+86` |


### <a id="SignUpProfileDto"></a> SignUpProfileDto

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |
| nickname | string | 否 | 昵称   |  |
| company | string | 否 | 公司   |  `Authing .Inc` |
| photo | string | 否 | 头像   |  `https://authing.cn/demo.jpg` |
| device | string | 否 | 设备   |  `iOS` |
| browser | string | 否 | 浏览器   |  `Edge` |
| name | string | 否 | 名称   |  `Mike` |
| givenName | string | 否 | 名   |  `Zhou` |
| familyName | string | 否 | 姓   |  `Jay` |
| middleName | string | 否 | 中间名   |  `Jane` |
| profile | string | 否 | 资料   |  `this is my profile` |
| preferredUsername | string | 否 | 希望称呼的用户名   |  `Mike` |
| website | string | 否 | 网站   |  `https://authing.cn` |
| gender | string | 否 | 性别 W : 女性; M : 男性   | M |
| birthdate | string | 否 | 生日   |  `2020.2.2` |
| zoneinfo | string | 否 | 地区   |  `HongKong` |
| locale | string | 否 | 语言地区   |  `EN-US` |
| address | string | 否 | 地址   |  `Hai Dian XX` |
| formatted | string | 否 | 格式   |  |
| streetAddress | string | 否 | 街道地址   |  `Hai Dian Street 1` |
| locality | string | 否 | 位置   |  `BeiJing HaiDian` |
| region | string | 否 | 地区   |  `china` |
| postalCode | string | 否 | 邮政编码   |  `3500000` |
| country | string | 否 | 国家   |  `china` |
| email | string | 否 | 邮箱   |  `help@authing.cn` |
| phone | string | 否 | 手机号   |  `114114114` |
| customData | object | 否 | 用户自定义字段   |  `{"name":"H"}` |


### <a id="SignUpOptionsDto"></a> SignUpOptionsDto

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |
| clientIp | string | 否 | 客户端 IP   |  `192.168.0.1` |
| phonePassCodeForInformationCompletion | string | 否 | 用于注册时补全用户信息的短信验证码   |  `1234` |
| emailPassCodeForInformationCompletion | string | 否 | 用于注册时补全用户信息的短信验证码   |  `1234` |
| context | object | 是 | 登录/注册时传的额外参数，会存到用户自定义字段里面   |  `{"phoneNumber":"188xxxx8888","phoneCountryCode":"+86"}` |
| passwordEncryptType | string | 否 | 密码加密类型，支持 sm2 和 rsa。默认可以不加密。<br>- `none`: 不对密码进行加密，使用明文进行传输。<br>- `rsa`: 使用 RSA256 算法对密码进行加密，需要使用 Authing 服务的 RSA 公钥进行加密，请阅读**介绍**部分了解如何获取 Authing 服务的 RSA256 公钥。<br>- `sm2`: 使用 [国密 SM2 算法](https://baike.baidu.com/item/SM2/15081831) 对密码进行加密，需要使用 Authing 服务的 SM2 公钥进行加密，请阅读**介绍**部分了解如何获取 Authing 服务的 SM2 公钥。<br>     | sm2 |


### <a id="UserDto"></a> UserDto

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |
| userId | string | 是 | 用户唯一标志，可以是用户 ID、用户名、邮箱、手机号、外部 ID、在外部身份源的 ID。   |  `6229ffaxxxxxxxxcade3e3d9` |
| createdAt | string | 是 | 创建时间   |  `2022-07-03T02:20:30.000Z` |
| updatedAt | string | 是 | 更新时间   |  `2022-07-03T02:20:30.000Z` |
| status | string | 是 | 账户当前状态   | Suspended |
| externalId | string | 否 | 第三方外部 ID   |  `10010` |
| email | string | 否 | 邮箱，不区分大小写   |  `test@example.com` |
| phone | string | 否 | 手机号，不带区号。如果是国外手机号，请在 phoneCountryCode 参数中指定区号。   |  `188xxxx8888` |
| phoneCountryCode | string | 否 | 手机区号，中国大陆手机号可不填。Authing 短信服务暂不内置支持国际手机号，你需要在 Authing 控制台配置对应的国际短信服务。完整的手机区号列表可参阅 https://en.wikipedia.org/wiki/List_of_country_calling_codes。   |  `+86` |
| username | string | 否 | 用户名，用户池内唯一   |  `bob` |
| name | string | 否 | 用户真实名称，不具备唯一性   |  `张三` |
| nickname | string | 否 | 昵称   |  `张三` |
| photo | string | 否 | 头像链接   |  `https://files.authing.co/authing-console/default-user-avatar.png` |
| loginsCount | number | 否 | 历史总登录次数   |  `3` |
| lastLogin | string | 否 | 上次登录时间   |  `2022-07-03T02:20:30.000Z` |
| lastIp | string | 否 | 上次登录 IP   |  `127.0.0.1` |
| gender | string | 是 | 性别:<br>- `M`: 男性，`male`<br>- `F`: 女性，`female`<br>- `U`: 未知，`unknown`<br>     | M |
| emailVerified | boolean | 是 | 邮箱是否验证   |  `true` |
| phoneVerified | boolean | 是 | 手机号是否验证   |  `true` |
| passwordLastSetAt | string | 否 | 用户上次密码修改时间   |  `2022-07-03T02:20:30.000Z` |
| birthdate | string | 否 | 出生日期   |  `2022-06-03` |
| country | string | 否 | 所在国家   |  `CN` |
| province | string | 否 | 所在省份   |  `BJ` |
| city | string | 否 | 所在城市   |  `BJ` |
| address | string | 否 | 所处地址   |  `北京朝阳` |
| streetAddress | string | 否 | 所处街道地址   |  `北京朝阳区 xxx 街道` |
| postalCode | string | 否 | 邮政编码号   |  `438100` |
| company | string | 否 | 所在公司   |  `steamory` |
| browser | string | 否 | 最近一次登录时使用的浏览器 UA   |  `Mozilla/5.0 (Linux; Android 10; V2001A; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/87.0.4280.141 Mobile Safari/537.36 VivoBrowser/10.2.10.0` |
| device | string | 否 | 最近一次登录时使用的设备   |  `iOS` |
| givenName | string | 否 | 名   |  `三` |
| familyName | string | 否 | 姓   |  `张` |
| middleName | string | 否 | 中间名   |  |
| profile | string | 否 | Preferred Username   |  |
| preferredUsername | string | 否 | Preferred Username   |  |
| website | string | 否 | 用户个人网页   |  |
| zoneinfo | string | 否 | 用户时区信息   |  |
| locale | string | 否 | Locale   |  |
| formatted | string | 否 | 标准的完整地址   |  |
| region | string | 否 | 用户所在区域   |  |
| userSourceType | string | 是 | 来源类型:<br>- `excel`: 通过 excel 导入<br>- `register`: 用户自主注册<br>- `adminCreated`: 管理员后台手动创建（包含使用管理 API 创建用户 ）<br>- `syncTask`: 同步中心的同步任务  <br>   | excel |
| userSourceId | string | 否 | 应用 ID 或者同步任务 ID   |  |
| lastLoginApp | string | 否 | 用户上次登录的应用 ID   |  |
| mainDepartmentId | string | 否 | 用户主部门 ID   |  |
| lastMfaTime | string | 否 | 用户上次进行 MFA 认证的时间   |  |
| passwordSecurityLevel | number | 否 | 用户密码安全强度等级   |  `1` |
| resetPasswordOnNextLogin | boolean | 否 | 下次登录要求重置密码   |  |
| departmentIds | array | 否 | 用户所属部门 ID 列表   |  `["624d930c3xxxx5c08dd4986e","624d93102xxxx012f33cd2fe"]` |
| identities | array | 否 | 外部身份源 嵌套类型：<a href="#IdentityDto">IdentityDto</a>。  |  |
| customData | object | 否 | 用户的扩展字段数据   |  `{"school":"北京大学","age":22}` |
| statusChangedAt | string | 否 | 用户状态上次修改时间   |  `2022-07-03T02:20:30.000Z` |


### <a id="IdentityDto"></a> IdentityDto

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |
| identityId | string | 是 | 身份源 ID   |  `62299d8b866d2dab79a89dc4` |
| extIdpId | string | 是 | 身份源连接 ID   |  `6076bacxxxxxxxxd80d993b5` |
| provider | string | 是 | 外部身份源类型：<br>- `wechat`: 微信<br>- `qq`: QQ<br>- `wechatwork`: 企业微信<br>- `dingtalk`: 钉钉<br>- `weibo`: 微博<br>- `github`: GitHub<br>- `alipay`: 支付宝<br>- `baidu`: 百度<br>- `lark`: 飞书<br>- `welink`: Welink<br>- `yidun`: 网易易盾<br>- `qingcloud`: 青云<br>- `google`: Google<br>- `gitlab`: GitLab<br>- `gitee`: Gitee<br>- `twitter`: Twitter<br>- `facebook`: Facebook<br>- `slack`: Slack<br>- `linkedin`: Linkedin<br>- `instagram`: Instagram<br>- `oidc`: OIDC 型企业身份源<br>- `oauth2`: OAuth2 型企业身份源<br>- `saml`: SAML 型企业身份源<br>- `ldap`: LDAP 型企业身份源<br>- `ad`: AD 型企业身份源<br>- `cas`: CAS 型企业身份源<br>- `azure-ad`: Azure AD 型企业身份源<br>       | oidc |
| type | string | 是 | Identity 类型，如 unionid, openid, primary   |  `openid` |
| userIdInIdp | string | 是 | 在外部身份源中的 ID   |  `oj7Nq05R-RRaqak0_YlMLnnIwsvg` |
| originConnIds | array | 是 | 身份来自的身份源连接 ID 列表   |  `["605492ac41xxxxe0362f0707"]` |


