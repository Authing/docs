# 用户是否拥有某个资源的权限

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

根据用户id,权限应用id,资源路径查询是否有该资源path的权限

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 | 示例值 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| pathList | string[] | 是 | - | 资源路径列表。   | `["code/1/2/3"]` |
| appId | string | 是 | - | 权限应用id。   | `6301ceaad4677b9255f27478` |
| action | string | 是 | - | 资源操作。   | `read` |
| userId | string | 是 | - | 用户id。   | `6301ceaad4677b9255f27478` |


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
        
          UserAuthenticationActionResponseDto  result = await managementClient.CheckPathAuthentication
          (  new UserAuthenticationActionDto{                  UserId= "6301ceaad4677b9255f27478" ,
                  Action= "read" ,
                  AppId= "6301ceaad4677b9255f27478" ,
                  PathList= new List<string>{"code/1/2/3",} ,
            }
          );
        }
    }
}

```



## 请求响应

类型： `UserAuthenticationActionResponseDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| data | <a href="#UserAuthenticationActionRespDto">UserAuthenticationActionRespDto</a> | 响应数据 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "apiCode": 20001,
  "data": {
    "path": "code/1/2/3",
    "action": "read",
    "enabled": true
  }
}
```

## 数据结构


### <a id="UserAuthenticationActionRespDto"></a> UserAuthenticationActionRespDto

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| path | string | 是 | 资源路径。 示例值： `code/1/2/3`  |
| action | string | 是 | 操作。 示例值： `read`  |
| enabled | boolean | 是 | 是否有该资源的权限。 示例值： `true`  |


