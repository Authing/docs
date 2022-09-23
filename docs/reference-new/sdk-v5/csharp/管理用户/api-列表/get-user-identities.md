# 获取用户的外部身份源

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

通过用户 ID，获取用户的外部身份源、选择指定用户 ID 类型。

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 | 示例值 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| userId | string  | 是 | - | 用户 ID。  | `6229ffaxxxxxxxxcade3e3d9` |
| userIdType | string  | 否 | user_id | 用户 ID 类型，可以指定为用户 ID、手机号、邮箱、用户名和 externalId。。 枚举值：`user_id`,`external_id`,`phone`,`email`,`username` | `user_id` |


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
        
          IdentityListRespDto  result = await managementClient.GetUserIdentities
          (             
                userId: "6229ffaxxxxxxxxcade3e3d9", 
                userIdType: "user_id"
          );
        }
    }
}

```



## 请求响应

类型： `IdentityListRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| data | array | 响应数据 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "data": {
    "identityId": "62299d8b866d2dab79a89dc4",
    "extIdpId": "6076bacxxxxxxxxd80d993b5",
    "provider": "wechat",
    "type": "openid",
    "userIdInIdp": "oj7Nq05R-RRaqak0_YlMLnnIwsvg",
    "originConnIds": "[\"605492ac41xxxxe0362f0707\"]"
  }
}
```

## 数据结构


### <a id="IdentityDto"></a> IdentityDto

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| identityId | string | 是 | 身份源 ID。 示例值： `62299d8b866d2dab79a89dc4`  |
| extIdpId | string | 是 | 身份源连接 ID。 示例值： `6076bacxxxxxxxxd80d993b5`  |
| provider | string | 是 | 外部身份源类型：
- `wechat`: 微信
- `qq`: QQ
- `wechatwork`: 企业微信
- `dingtalk`: 钉钉
- `weibo`: 微博
- `github`: GitHub
- `alipay`: 支付宝
- `baidu`: 百度
- `lark`: 飞书
- `welink`: Welink
- `yidun`: 网易易盾
- `qingcloud`: 青云
- `google`: Google
- `gitlab`: GitLab
- `gitee`: Gitee
- `twitter`: Twitter
- `facebook`: Facebook
- `slack`: Slack
- `linkedin`: Linkedin
- `instagram`: Instagram
- `oidc`: OIDC 型企业身份源
- `oauth2`: OAuth2 型企业身份源
- `saml`: SAML 型企业身份源
- `ldap`: LDAP 型企业身份源
- `ad`: AD 型企业身份源
- `cas`: CAS 型企业身份源
- `azure-ad`: Azure AD 型企业身份源
    。 枚举值：`oidc`,`oauth2`,`saml`,`ldap`,`ad`,`cas`,`azure-ad`,`wechat`,`google`,`qq`,`wechatwork`,`dingtalk`,`weibo`,`github`,`alipay`,`apple`,`baidu`,`lark`,`gitlab`,`twitter`,`facebook`,`slack`,`linkedin`,`yidun`,`qingcloud`,`gitee`,`instagram`,`welink`  |
| type | string | 是 | Identity 类型，如 unionid, openid, primary。 示例值： `openid`  |
| userIdInIdp | string | 是 | 在外部身份源中的 ID。 示例值： `oj7Nq05R-RRaqak0_YlMLnnIwsvg`  |
| originConnIds | array | 是 | 身份来自的身份源连接 ID 列表。 示例值： `["605492ac41xxxxe0362f0707"]`  |


