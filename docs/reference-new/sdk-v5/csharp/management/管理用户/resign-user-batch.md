# 批量用户离职

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

通过用户 ID，对用户进行离职操作

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 | 示例值 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| userIds | array[] | 是 | - | 用户 ID 数组。 数组长度限制：50。  | `["6229ffaxxxxxxxxcade3e3d9"]` |
| userIdType | string | 否 | user_id | 用户 ID 类型，默认值为 `user_id`，可选值为：
- `user_id`: Authing 用户 ID，如 `6319a1504f3xxxxf214dd5b7`
- `phone`: 用户手机号
- `email`: 用户邮箱
- `username`: 用户名
- `external_id`: 用户在外部系统的 ID，对应 Authing 用户信息的 `externalId` 字段
- `identity`: 用户的外部身份源信息，格式为 `<extIdpId>:<userIdInIdp>`，其中 `<extIdpId>` 为 Authing 身份源的 ID，`<userIdInIdp>` 为用户在外部身份源的 ID。
示例值：`62f20932716fbcc10d966ee5:ou_8bae746eac07cd2564654140d2a9ac61`。
。  枚举值：`user_id`,`external_id`,`phone`,`email`,`username`,`identity` | `user_id` |


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
        
          ResignUserRespDto  result = await managementClient.ResignUserBatch
          (  new ResignUserBatchReqDto{                  UserIds= new List<string>{"6229ffaxxxxxxxxcade3e3d9",} ,
                  UserIdType= ResignUserBatchReqDto.userIdType.USER_ID ,
            }
          );
        }
    }
}

```



## 请求响应

类型： `ResignUserRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| requestId | string | 请求 ID。当请求失败时会返回。 |
| data | <a href="#ResignUserDataDto">ResignUserDataDto</a> | 响应数据 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "requestId": "934108e5-9fbf-4d24-8da1-c330328abd6c",
  "data": {
    "success": true
  }
}
```

## 数据结构


### <a id="ResignUserDataDto"></a> ResignUserDataDto

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| success | boolean | 是 | 操作是否成功。  |  `true` |


