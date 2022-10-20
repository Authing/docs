# 获取资源被授权的主体

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

获取资源被授权的主体

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 | 示例值 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| resource | string | 是 | - | 资源。   | `ecs:1` |
| namespace | string | 否 | default | 权限分组。   |  |
| targetType | string | 否 | - | 目标对象类型：
- `USER`: 用户
- `ROLE`: 角色
- `GROUP`: 分组
- `DEPARTMENT`: 部门
    。  枚举值：`USER`,`ROLE`,`GROUP`,`DEPARTMENT` | `USER` |
| page | number | 否 | 1 | 当前页数，从 1 开始。   | `1` |
| limit | number | 否 | 10 | 每页数目，最大不能超过 50，默认为 10。   | `10` |


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
        
          GetResourceAuthorizedTargetRespDto  result = await managementClient.GetResourceAuthorizedTargets
          (  new GetResourceAuthorizedTargetsDto{                  Resource= "ecs:1" ,
                  Namespace= "undefined" ,
                  TargetType= GetResourceAuthorizedTargetsDto.targetType.USER ,
                  Page= 1 ,
                  Limit= 10 ,
            }
          );
        }
    }
}

```



## 请求响应

类型： `GetResourceAuthorizedTargetRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| requestId | string | 请求 ID。当请求失败时会返回。 |
| data | <a href="#GetResourceAuthorizedTargetDataDto">GetResourceAuthorizedTargetDataDto</a> | 响应数据 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "requestId": "934108e5-9fbf-4d24-8da1-c330328abd6c",
  "data": {
    "totalCount": 10,
    "list": {
      "targetType": "USER",
      "targetIdentifier": "code",
      "actions": "[\"ecs:Start\",\"ecs:Stop\"]"
    }
  }
}
```

## 数据结构


### <a id="GetResourceAuthorizedTargetDataDto"></a> GetResourceAuthorizedTargetDataDto

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| totalCount | number | 是 | 总数。  |  `10` |
| list | array | 是 | 元素列表。嵌套类型：<a href="#ResourceAuthorizedTargetDto">ResourceAuthorizedTargetDto</a>。  |  |


### <a id="ResourceAuthorizedTargetDto"></a> ResourceAuthorizedTargetDto

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| targetType | string | 是 | 主体类型。  | 可选枚举值：`USER`,`ROLE`,`GROUP`,`DEPARTMENT` |
| targetIdentifier | string | 是 | 主体唯一标志符。  |  `code` |
| actions | array | 是 | 操作列表。  |  `["ecs:Start","ecs:Stop"]` |


