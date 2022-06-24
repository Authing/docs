# 获取用户 MFA 绑定信息

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

获取用户 MFA 绑定信息

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 |
| ---- | ---- | ---- | ---- | ---- |
| userId | string  | 是 |  | 用户 ID。 示例值： `6229ffaxxxxxxxxcade3e3d9` |


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
        
          UserMfaSingleRespDto  result = await managementClient.GetUserMfaInfo
          (             
                userId: "6229ffaxxxxxxxxcade3e3d9"
          );
        }
    }
}

```



## 请求响应

类型： `UserMfaSingleRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| data | <a href="#UserMfaRespDto">UserMfaRespDto</a> | 响应数据 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "apiCode": 20001,
  "data": {
    "totpStatus": true,
    "faceMfaStatus": true
  }
}
```

## 数据结构


### <a id="UserMfaRespDto"></a> UserMfaRespDto

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| totpStatus | string | 是 | 是否绑定了 TOTP，可选值 enabled, disabled。 示例值： `true`  |
| faceMfaStatus | string | 是 | 是否绑定了人脸 MFA，可选值 enabled, disabled。 示例值： `true`  |


