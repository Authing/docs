# 设置用户所在部门

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

通过用户 ID，设置用户所在部门，可以选择指定用户 ID 类型等。

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 | 示例值 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| departments | <a href="#SetUserDepartmentDto">SetUserDepartmentDto[]</a> | 是 | - | 部门信息。 数组长度限制：10。  | `[{"departmentId":"60b49eb83fd80adb96f26e68","isLeader":true,"isMainDepartment":true}]` |
| userId | string | 是 | - | 用户 ID。   | `6229ffaxxxxxxxxcade3e3d9` |
| options | <a href="#SetUserDepartmentsOptionsDto">SetUserDepartmentsOptionsDto</a> | 否 | - | 可选参数。   |  |


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
        
          IsSuccessRespDto  result = await managementClient.SetUserDepartments
          (  new SetUserDepartmentsDto{                  UserId= "6229ffaxxxxxxxxcade3e3d9" ,
                Departments= new List<SetUserDepartmentDto>
                {
                    new SetUserDepartmentDto
                    {
                     DepartmentId= "60b49eb83fd80adb96f26e68" ,
            IsLeader= true ,
            IsMainDepartment= true ,
                }
                  },
                Options= new SetUserDepartmentsOptionsDto
                {
                          UserIdType= SetUserDepartmentsOptionsDto.userIdType.USER_ID ,
        },
            }
          );
        }
    }
}

```



## 请求响应

类型： `IsSuccessRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| data | <a href="#IsSuccessDto">IsSuccessDto</a> | 操作是否成功 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "apiCode": 20001,
  "data": {
    "success": true
  }
}
```

## 数据结构


### <a id="SetUserDepartmentDto"></a> SetUserDepartmentDto

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| departmentId | string | 是 | 部门 id。 示例值： `60b49eb83fd80adb96f26e68`  |
| isLeader | boolean | 否 | 是否是部门 leader。 示例值： `true`  |
| isMainDepartment | boolean | 否 | 是否是主部门。 示例值： `true`  |


### <a id="SetUserDepartmentsOptionsDto"></a> SetUserDepartmentsOptionsDto

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| userIdType | string | 否 | 用户 ID 类型，可以指定为用户 ID、手机号、邮箱、用户名和 externalId。。 枚举值：`user_id`,`external_id`,`phone`,`email`,`username`  |


### <a id="IsSuccessDto"></a> IsSuccessDto

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| success | boolean | 是 | 操作是否成功。 示例值： `true`  |


