# 删除数据策略相关的主体授权

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

删除数据策略相关的主体授权,通过授权主体 ID、授权主体类型和数据策略 ID 进行删除

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 | 示例值 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| policyId | string | 是 | - | 数据策略 ID。   | `60b49XXXXXXXXXXXX6e68` |
| targetType | string | 是 | - | 主体类型,包括 USER、GROUP、ROLE、ORG 四种类型。  枚举值：`USER`,`ORG`,`GROUP`,`ROLE` | `USER` |
| targetIdentifier | string | 是 | - | 主体 ID ，包含用户 ID、用户组 ID、角色 ID、组织机构 ID。   | `6301ceXXXXXXXXXXXXXXXXX78` |


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
        
          CommonResponseDto  result = await managementClient.RevokeAuthorizeDataPolicy
          (  new DeleteAuthorizeDataPolicyDto{                  TargetIdentifier= "6301ceXXXXXXXXXXXXXXXXX78" ,
                  TargetType= DeleteAuthorizeDataPolicyDto.targetType.USER ,
                  PolicyId= "60b49XXXXXXXXXXXX6e68" ,
            }
          );
        }
    }
}

```



## 请求响应

类型： `CommonResponseDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功"
}
```

## 数据结构


