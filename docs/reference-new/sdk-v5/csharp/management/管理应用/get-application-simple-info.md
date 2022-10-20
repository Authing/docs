# 获取应用简单信息

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

通过应用 ID，获取应用简单信息。

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 | 示例值 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| appId | string  | 是 | - | 应用 ID。  | `6229ffaxxxxxxxxcade3e3d9` |


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
        
          ApplicationSimpleInfoSingleRespDto  result = await managementClient.GetApplicationSimpleInfo
          (             
                appId: "6229ffaxxxxxxxxcade3e3d9"
          );
        }
    }
}

```



## 请求响应

类型： `ApplicationSimpleInfoSingleRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| requestId | string | 请求 ID。当请求失败时会返回。 |
| data | <a href="#ApplicationSimpleInfoDto">ApplicationSimpleInfoDto</a> | 响应数据 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "requestId": "934108e5-9fbf-4d24-8da1-c330328abd6c",
  "data": {
    "appId": "62eaa95fe0xxxx9a5295bf7c",
    "appIdentifier": "example",
    "appName": "示例应用",
    "appLogo": "示例应用",
    "appDescription": "示例描述信息",
    "appType": "web"
  }
}
```

## 数据结构


### <a id="ApplicationSimpleInfoDto"></a> ApplicationSimpleInfoDto

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| appId | string | 是 | 应用 ID。  |  `62eaa95fe0xxxx9a5295bf7c` |
| appIdentifier | string | 是 | 应用唯一标志。  |  `example` |
| appName | string | 是 | 应用名称。  |  `示例应用` |
| appLogo | string | 是 | 应用 Logo 链接。  |  `示例应用` |
| appDescription | string | 否 | 应用描述信息。  |  `示例描述信息` |
| appType | string | 是 | 应用类型。  | 可选枚举值：`web`,`spa`,`native`,`api` |
| isIntegrateApp | boolean | 是 | 是否为集成应用。  |  |


