# 发起注销账号请求

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

当用户希望注销账号时，需提供相应凭证，当前支持**使用邮箱验证码**、使用**手机验证码**、**使用密码**三种验证方式。

## 请求参数

| 名称 | 类型 | <div style="width:80px">是否必填</div> | 默认值 | <div style="width:300px">描述</div> | <div style="width:200px"></div>示例值</div> |
| ---- | ---- | ---- | ---- | ---- | ---- |
| verifyMethod | string | 是 | - | 注销账号的验证手段：<br>- `PHONE_PASSCODE`: 使用手机号验证码方式进行验证。<br>- `EMAIL_PASSCODE`: 使用邮箱验证码方式进行验证。<br>- `PASSWORD`: 如果用户既没有绑定手机号又没有绑定邮箱，可以使用密码作为验证手段。<br>      | `PHONE_PASSCODE` |
| phonePassCodePayload | <a href="#DeleteAccountByPhonePassCodeDto">DeleteAccountByPhonePassCodeDto</a> | 否 | - | 使用手机号验证码验证的数据  |  |
| emailPassCodePayload | <a href="#DeleteAccountByEmailPassCodeDto">DeleteAccountByEmailPassCodeDto</a> | 否 | - | 使用邮箱验证码验证的数据  |  |
| passwordPayload | <a href="#DeleteAccountByPasswordDto">DeleteAccountByPasswordDto</a> | 否 | - | 使用密码验证的数据  |  |


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
        
          VerifyDeleteAccountRequestRespDto  result = await managementClient.VerifyDeleteAccountRequest
          (  new VerifyDeleteAccountRequestDto{                  VerifyMethod= VerifyDeleteAccountRequestDto.verifyMethod.PHONE_PASSCODE ,
                PhonePassCodePayload= new DeleteAccountByPhonePassCodeDto
                {
                          PhoneNumber= "188xxxx8888" ,
          PassCode= "123456" ,
          PhoneCountryCode= "+86" ,
        },
                EmailPassCodePayload= new DeleteAccountByEmailPassCodeDto
                {
                          Email= "undefined" ,
          PassCode= "undefined" ,
        },
                PasswordPayload= new DeleteAccountByPasswordDto
                {
                          Password= "undefined" ,
          PasswordEncryptType= DeleteAccountByPasswordDto.passwordEncryptType.NONE ,
        },
            }
          );
        }
    }
}

```
 -->

## 请求响应

类型： `VerifyDeleteAccountRequestRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| requestId | string | 请求 ID。当请求失败时会返回。 |
| data | <a href="#VerifyDeleteAccountRequestDataDto">VerifyDeleteAccountRequestDataDto</a> | 响应数据 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "requestId": "934108e5-9fbf-4d24-8da1-c330328abd6c",
  "data": {
    "deleteAccountToken": "xxxx",
    "tokenExpiresIn": 60
  }
}
```

## 数据结构


### <a id="DeleteAccountByPhonePassCodeDto"></a> DeleteAccountByPhonePassCodeDto

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |
| phoneNumber | string | 是 | 此账号绑定的手机号，不带区号。如果是国外手机号，请在 phoneCountryCode 参数中指定区号。   |  `188xxxx8888` |
| passCode | string | 是 | 短信验证码，一个短信验证码只能使用一次，有效时间为一分钟。你需要通过**发送短信**接口获取。   |  `123456` |
| phoneCountryCode | string | 否 | 手机区号   |  `+86` |


### <a id="DeleteAccountByEmailPassCodeDto"></a> DeleteAccountByEmailPassCodeDto

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |
| email | string | 否 | 此账号绑定的邮箱，不区分大小写。   |  |
| passCode | string | 是 | 邮箱验证码，一个短信验证码只能使用一次，默认有效时间为 5 分钟。你需要通过**发送邮件**接口获取。   |  |


### <a id="DeleteAccountByPasswordDto"></a> DeleteAccountByPasswordDto

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |
| password | string | 是 | 用户密码   |  |
| passwordEncryptType | string | 否 | 密码加密类型，支持 sm2 和 rsa。默认可以不加密。<br>- `none`: 不对密码进行加密，使用明文进行传输。<br>- `rsa`: 使用 RSA256 算法对密码进行加密，需要使用 Authing 服务的 RSA 公钥进行加密，请阅读**介绍**部分了解如何获取 Authing 服务的 RSA256 公钥。<br>- `sm2`: 使用 [国密 SM2 算法](https://baike.baidu.com/item/SM2/15081831) 对密码进行加密，需要使用 Authing 服务的 SM2 公钥进行加密，请阅读**介绍**部分了解如何获取 Authing 服务的 SM2 公钥。<br>     | sm2 |


### <a id="VerifyDeleteAccountRequestDataDto"></a> VerifyDeleteAccountRequestDataDto

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |
| deleteAccountToken | string | 是 | 用于注销账号的临时 Token，你需要调用**注销账号**接口执行实际注销账号操作。   |  `xxxx` |
| tokenExpiresIn | number | 是 | Token 有效时间，默认为 60 秒。   |  `60` |


