# 检查角色 name 或者 code 是否重复

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

通过角色 name 和所属应用 applicationId,或者 code 和所属应用 applicationId 查询是否重复

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 | 示例值 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| appId | string  | 是 | - | 应用 id。  | `6076bacxxxxxxxxd80d993b` |
| roleName | string  | 是 | - | 角色名称，最多 50 字符。  | `测试用户` |
| roleCode | string  | 是 | - | 角色 code,只能使用字母、数字和 -_，最多 50 字符。  | `code_1` |


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
        
          RoleCheckParamsRespDto  result = await managementClient.PermissionCheckParamsRoleExists
          (             
                appId: "6076bacxxxxxxxxd80d993b", 
                roleName: "测试用户", 
                roleCode: "code_1"
          );
        }
    }
}

```



## 请求响应

类型： `RoleCheckParamsRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| data | <a href="#CheckParamsRoleRespDto">CheckParamsRoleRespDto</a> | 数据 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "data": {
    "isValid": " false",
    "message": " role name already exist"
  }
}
```

## 数据结构


### <a id="CheckParamsRoleRespDto"></a> CheckParamsRoleRespDto

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| isValid | boolean | 是 | 角色名称或者角色 Code 校验是否有效。 示例值： ` false`  |
| message | boolean | 是 | 角色名称或角色 Code 校验失败提示信息,如果校验成功, message 不返回。 示例值： ` role name already exist`  |


