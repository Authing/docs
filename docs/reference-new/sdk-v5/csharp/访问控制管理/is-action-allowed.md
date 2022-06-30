# 判断用户是否对某个资源的某个操作有权限

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

判断用户是否对某个资源的某个操作有权限

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 |
| ---- | ---- | ---- | ---- | ---- |
| namespace | string | 否 |  | 所属权限分组的 code。 示例值： `default` |
| userId | string | 是 |  | 用户 ID。 示例值： `userId1` |
| resource | string | 是 |  | 资源标识符。 示例值： `ecs:1` |
| action | string | 是 |  | 资源对应的操作。 示例值： `ecs:Start` |


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
        
          IsActionAllowedRespDtp  result = await managementClient.IsActionAllowed
          (  new IsActionAllowedDto{                  Namespace= "default" ,
                  UserId= "userId1" ,
                  Resource= "ecs:1" ,
                  Action= "ecs:Start" ,
            }
          );
        }
    }
}

```



## 请求响应

类型： `IsActionAllowedRespDtp`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| data | <a href="#IsActionAllowedDataDto">IsActionAllowedDataDto</a> | 返回数据 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "apiCode": 20001,
  "data": {
    "allowed": true
  }
}
```

## 数据结构


### <a id="IsActionAllowedDataDto"></a> IsActionAllowedDataDto

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| allowed | boolean | 是 | 是否允许。 示例值： `true`  |


