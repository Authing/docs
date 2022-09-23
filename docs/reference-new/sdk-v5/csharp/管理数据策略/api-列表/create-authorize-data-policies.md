# 数据策略创建主体授权

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

数据策略创建主体授权,通过授权主体和数据策略进行互相授权

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 | 示例值 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| targetList | <a href="#SubjectDto">SubjectDto[]</a> | 是 | - | 数据权限列表，每个策略下所有的数据权限。   |  |
| policyIdList | string[] | 是 | - | 数据策略 id 列表。   | `["6301ceaad4677b9255f27478","6301ceaad4677b9255f27478"]` |


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
        
          CommonResponseDto  result = await managementClient.CreateAuthorizeDataPolicies
          (  new CreateAuthorizeDataPolicyDto{                  PolicyIdList= new List<string>{"6301ceaad4677b9255f27478","6301ceaad4677b9255f27478",} ,
                TargetList= new List<SubjectDto>
                {
                    new SubjectDto
                    {
                     Id= "6301ceXXXXXXXXXXXXXXXXX78" ,
            Type= SubjectDto.type.USER ,
            Name= "test" ,
                }
                  },
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


### <a id="SubjectDto"></a> SubjectDto

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| id | string | 是 | 主体 ID ，包含用户 ID、用户组 ID、角色 ID、组织机构 ID。 示例值： `6301ceXXXXXXXXXXXXXXXXX78`  |
| type | string | 是 | 主体类型,包括 USER、GROUP、ROLE、ORG 四种类型。 枚举值：`USER`,`ORG`,`GROUP`,`ROLE`  |
| name | string | 否 | 主体名称，包含用户名称、用户组名称、角色名称、组织机构名称。 示例值： `test`  |


