# 创建角色

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

通过权限分组内角色 code，创建角色，可以选择权限分组、角色描述等。

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 | 示例值 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| code | string | 是 | - | 权限分组内角色的唯一标识符。  | `manager` |
| namespace | string | 否 | default | 所属权限分组的 code。  | `default` |
| description | string | 否 | - | 角色描述。  | `this is manager` |


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
        
          RoleSingleRespDto  result = await managementClient.CreateRole
          (  new CreateRoleDto{                  Code= "manager" ,
                  Namespace= "default" ,
                  Description= "this is manager" ,
            }
          );
        }
    }
}

```



## 请求响应

类型： `RoleSingleRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| data | <a href="#RoleDto">RoleDto</a> | 响应数据 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "apiCode": 20001,
  "data": {
    "code": "role1",
    "description": "this is description",
    "namespace": "default"
  }
}
```

## 数据结构


### <a id="RoleDto"></a> RoleDto

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| code | string | 是 | 权限分组内角色的唯一标识符。 示例值： `role1`  |
| description | string | 是 | 角色描述。 示例值： `this is description`  |
| namespace | string | 是 | 所属权限分组的 code。 示例值： `default`  |


