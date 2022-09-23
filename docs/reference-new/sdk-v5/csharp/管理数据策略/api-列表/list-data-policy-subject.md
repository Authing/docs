# 分页获取数据策略下所有的授权主体的信息

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

分页获取数据策略下所有的授权主体的信息,通过授权主体类型、数据策略 ID 和数据资源 ID 针对性查找授权主体列表

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 | 示例值 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| policyId | string  | 是 | - | 数据策略 ID。  | `60b49XXXXXXXXXXXX6e68` |
| page | number  | 否 | 1 | 当前页数，从 1 开始。  | `1` |
| limit | number  | 否 | 10 | 每页数目，最大不能超过 50，默认为 10。  | `10` |
| query | string  | 否 | - | 关键字搜索，可以是策略名称或者策略 Code,限制 50 字符以内。  | `示例1` |
| targetType | string[]  | 否 | - | 主体类型，默认。  | `[USER]` |


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
        
          ListDataPolicySubjectPaginatedRespDto  result = await managementClient.ListDataPolicySubject
          (             
                policyId: "60b49XXXXXXXXXXXX6e68", 
                page: 1, 
                limit: 10, 
                query: "示例1", 
                targetType: "[USER]"
          );
        }
    }
}

```



## 请求响应

类型： `ListDataPolicySubjectPaginatedRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| data | <a href="#ListDataPolicySubjectPageDto">ListDataPolicySubjectPageDto</a> | 响应数据 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "data": {
    "totalCount": 20,
    "list": {
      "targetIdentifier": "6301ceXXXXXXXXXXXXXXXXX78",
      "targetType": "USER",
      "targetName": "test",
      "authorizationTime": "2022-07-03T02:20:30.000Z"
    }
  }
}
```

## 数据结构


### <a id="ListDataPolicySubjectPageDto"></a> ListDataPolicySubjectPageDto

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| totalCount | number | 否 | 记录总数。 示例值： `20`  |
| list | array | 是 | 主体列表。嵌套类型：<a href="#DataSubjectRespDto">DataSubjectRespDto</a>。   |


### <a id="DataSubjectRespDto"></a> DataSubjectRespDto

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| targetIdentifier | string | 是 | 主体 ID ，包含用户 ID、用户组 ID、角色 ID、组织机构 ID。 示例值： `6301ceXXXXXXXXXXXXXXXXX78`  |
| targetType | string | 是 | 主体类型,包括 USER、GROUP、ROLE、ORG 四种类型。 枚举值：`USER`,`ORG`,`GROUP`,`ROLE`  |
| targetName | string | 是 | 主体名称，包含用户名称、用户组名称、角色名称、组织机构名称。 示例值： `test`  |
| authorizationTime | string | 是 | 主体对象被授权时间。 示例值： `2022-07-03T02:20:30.000Z`  |


