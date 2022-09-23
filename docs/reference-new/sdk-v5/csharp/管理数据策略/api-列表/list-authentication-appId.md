# 用户权限应用下所属权限

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

根据用户id,权限应用列表获取所有资源的权限

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 | 示例值 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| appIds | string[] | 是 | - | 权限应用列表。   | `["6301ceaad4677b9255f27478","6301ceaad4677b9255f27478"]` |
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
        
          UserAuthenticationResponseDto  result = await managementClient.ListAuthenticationAppId
          (  new UserAuthenticationApplicationDto{                  UserId= "6301ceaad4677b9255f27478" ,
                  AppIds= new List<string>{"6301ceaad4677b9255f27478","6301ceaad4677b9255f27478",} ,
            }
          );
        }
    }
}

```



## 请求响应

类型： `UserAuthenticationResponseDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| data | <a href="#UserAuthenticationRespDto">UserAuthenticationRespDto</a> | 响应数据 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "apiCode": 20001,
  "data": {
    "appId": "6301ceXXXXXXXXXXXXXXXXX78",
    "resourceList": {
      "resourceCode": "code",
      "resourceActionList": {
        "path": "/1/2/3"
      }
    }
  }
}
```

## 数据结构


### <a id="UserAuthenticationRespDto"></a> UserAuthenticationRespDto

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| appId | string | 是 | 授权应用id。 示例值： `6301ceXXXXXXXXXXXXXXXXX78`  |
| resourceList | array | 是 | 资源列表。嵌套类型：<a href="#resourceDto">resourceDto</a>。   |


### <a id="resourceDto"></a> resourceDto

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| resourceCode | string | 是 | 资源code。 示例值： `code`  |
| resourceActionList | array | 是 | 资源操作。嵌套类型：<a href="#PathActionDto">PathActionDto</a>。   |


### <a id="PathActionDto"></a> PathActionDto

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| path | string | 是 | 资源路径。 示例值： `/1/2/3`  |
| actionList | array | 是 | 资源操作。   |


