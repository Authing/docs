# 在某个已有身份源下创建新连接

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

在某个已有身份源下创建新连接，可以设置身份源图标、是否只支持登录等。

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 | 示例值 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| fields | object | 是 | - | 连接的自定义配置信息。  | `{"clientId":"身份源上的 clientId","clientSecret":"身份源上的 clientSecret"}` |
| displayName | string | 是 | - | 连接在登录页的显示名称。  | `登录页` |
| identifier | string | 是 | - | 身份源连接标识。  | `60b49eb83fd80adb96f26e68` |
| type | string | 是 | - | 身份源连接类型。 枚举值：`oidc`,`oauth`,`saml`,`ldap`,`ad`,`cas`,`azure-ad`,`alipay`,`facebook`,`twitter`,`google`,`wechat:pc`,`wechat:mobile`,`wechat:webpage-authorization`,`wechatmp-qrcode`,`wechat:miniprogram:default`,`wechat:miniprogram:qrconnect`,`wechat:miniprogram:app-launch`,`github`,`qq`,`wechatwork:corp:qrconnect`,`wechatwork:agency:qrconnect`,`wechatwork:service-provider:qrconnect`,`wechatwork:mobile`,`dingtalk`,`dingtalk:provider`,`weibo`,`apple`,`apple:web`,`baidu`,`lark-internal`,`lark-public`,`gitlab`,`linkedin`,`slack`,`yidun`,`qingcloud`,`gitee`,`instagram`,`welink` | `ad` |
| extIdpId | string | 是 | - | 身份源连接 ID。  | `60b49eb83fd80adb96f26e68` |
| loginOnly | boolean | 否 | - | 是否只支持登录。  |  |
| logo | string | 否 | - | 身份源图标。  | `https://files.authing.co/authing-console/social-connections/icon_xiaochengxu@2x.png` |


## 示例代码

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
        
          ExtIdpConnDetailSingleRespDto  result = await managementClient.CreateExtIdpConn
          (  new CreateExtIdpConnDto{                  ExtIdpId= "60b49eb83fd80adb96f26e68" ,
                  Type= CreateExtIdpConnDto.type.AD ,
                  Identifier= "60b49eb83fd80adb96f26e68" ,
                  LoginOnly= false ,
                  Logo= "https://files.authing.co/authing-console/social-connections/icon_xiaochengxu@2x.png" ,
                  DisplayName= "登录页" ,
                  Fields= new CreateExtIdpConnDto{    clientId="身份源上的 clientId",    clientSecret="身份源上的 clientSecret",} ,
            }
          );
        }
    }
}

```



## 请求响应

类型： `ExtIdpConnDetailSingleRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| data | <a href="#ExtIdpConnDetail">ExtIdpConnDetail</a> | 响应数据 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "apiCode": 20001,
  "data": {
    "id": "60b49eb83fd80adb96f26e68",
    "type": "default",
    "logo": "https://files.authing.co/authing-console/social-connections/icon_xiaochengxu@2x.png",
    "identifier": "60b49eb83fd80adb96f26e68",
    "displayName": "登录页",
    "loginOnly": true,
    "associationMode": "challenge",
    "challengeBindingMethods": "[\"email-password\"]",
    "fields": "60b49eb83fd80adb96f26e68"
  }
}
```

## 数据结构


### <a id="ExtIdpConnDetail"></a> ExtIdpConnDetail

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| id | string | 是 | 身份源连接 id。 示例值： `60b49eb83fd80adb96f26e68`  |
| type | string | 是 | 身份源连接类型。 枚举值：`oidc`,`oauth`,`saml`,`ldap`,`ad`,`cas`,`azure-ad`,`alipay`,`facebook`,`twitter`,`google`,`wechat:pc`,`wechat:mobile`,`wechat:webpage-authorization`,`wechatmp-qrcode`,`wechat:miniprogram:default`,`wechat:miniprogram:qrconnect`,`wechat:miniprogram:app-launch`,`github`,`qq`,`wechatwork:corp:qrconnect`,`wechatwork:agency:qrconnect`,`wechatwork:service-provider:qrconnect`,`wechatwork:mobile`,`dingtalk`,`dingtalk:provider`,`weibo`,`apple`,`apple:web`,`baidu`,`lark-internal`,`lark-public`,`gitlab`,`linkedin`,`slack`,`yidun`,`qingcloud`,`gitee`,`instagram`,`welink`  |
| logo | string | 是 | 身份源图标。 示例值： `https://files.authing.co/authing-console/social-connections/icon_xiaochengxu@2x.png`  |
| identifier | string | 否 | 身份源连接标识。 示例值： `60b49eb83fd80adb96f26e68`  |
| displayName | string | 否 | 身份源连接在登录页的显示名称。 示例值： `登录页`  |
| loginOnly | boolean | 是 | 是否只支持登录。 示例值： `true`  |
| associationMode | string | 是 | 账号关联模式。 枚举值：`none`,`field`,`challenge`  |
| challengeBindingMethods | array | 是 | 账号绑定方式。 示例值： `["email-password"]`  |
| fields | object | 是 | 自定义参数。 示例值： `60b49eb83fd80adb96f26e68`  |


