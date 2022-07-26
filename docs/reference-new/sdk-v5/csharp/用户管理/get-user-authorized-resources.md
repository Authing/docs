# 获取用户被授权的所有资源

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

通过用户 ID，获取用户被授权的所有资源，可以选择指定用户 ID 类型等，用户被授权的资源是用户自身被授予、通过分组继承、通过角色继承、通过组织机构继承的集合。

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 | 示例值 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| userId | string  | 是 | - | 用户 ID。  | `6229ffaxxxxxxxxcade3e3d9` |
| userIdType | string  | 否 | user_id | 用户 ID 类型，可以指定为用户 ID、手机号、邮箱、用户名和 externalId。。 枚举值：`user_id`,`external_id`,`phone`,`email`,`username` | `user_id` |
| namespace | string  | 否 | - | 所属权限分组的 code。  | `default` |
| resourceType | string  | 否 | - | 资源类型，如 数据、API、菜单、按钮。 枚举值：`DATA`,`API`,`MENU`,`BUTTON` |  |


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
        
          AuthorizedResourcePaginatedRespDto  result = await managementClient.GetUserAuthorizedResources
          (             
                userId: "6229ffaxxxxxxxxcade3e3d9", 
                userIdType: "user_id", 
                nameSpace: "default", 
                resourceType: "undefined"
          );
        }
    }
}

```



## 请求响应

类型： `AuthorizedResourcePaginatedRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| data | <a href="#AuthorizedResourcePagingDto">AuthorizedResourcePagingDto</a> | 响应数据 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "apiCode": 20001,
  "data": {
    "list": {
      "resourceCode": "ecs:1",
      "description": "服务器",
      "condition": {
        "param": "AppId",
        "operator": "StringEquals",
        "value": "1"
      },
      "resourceType": "API",
      "apiIdentifier": "/api/v1/example",
      "actions": "[\"ecs:Start\",\"ecs:Stop\"]",
      "effect": "ALLOW"
    }
  }
}
```

## 数据结构


### <a id="AuthorizedResourcePagingDto"></a> AuthorizedResourcePagingDto

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| totalCount | number | 是 | 记录总数。   |
| list | array | 是 | 响应数据。嵌套类型：<a href="#AuthorizedResourceDto">AuthorizedResourceDto</a>。   |


### <a id="AuthorizedResourceDto"></a> AuthorizedResourceDto

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| resourceCode | string | 是 | 资源描述符。 示例值： `ecs:1`  |
| description | string | 否 | 资源描述信息。 示例值： `服务器`  |
| condition | array | 否 | 策略 Condition。嵌套类型：<a href="#PolicyCondition">PolicyCondition</a>。   |
| resourceType | string | 是 | 资源类型。 枚举值：`DATA`,`API`,`MENU`,`BUTTON`  |
| apiIdentifier | string | 是 | API URL。 示例值： `/api/v1/example`  |
| actions | array | 是 | 授权的操作列表。 示例值： `["ecs:Start","ecs:Stop"]`  |
| effect | string | 是 | 允许还是拒绝。 枚举值：`ALLOW`,`DENY`  |


### <a id="PolicyCondition"></a> PolicyCondition

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| param | string | 是 | Condition Param。 枚举值：`UserPoolId`,`AppId`,`RequestFrom`,`UserId`,`UserArn`,`CurrentTime`,`EpochTime`,`SourceIp`,`User`,`MultiFactorAuthPresent`,`MultiFactorAuthAge`,`UserAgent`,`Referer`,`Device`,`OS`,`Country`,`Province`,`City`,`DeviceChanged`,`DeviceUntrusted`,`ProxyUntrusted`,`LoggedInApps`,`Namespace`  |
| operator | string | 是 | Condition Operator。 枚举值：`Bool`,`DateEquals`,`DateNotEquals`,`DateLessThan`,`DateLessThanEquals`,`DateGreaterThan`,`DateGreaterThanEquals`,`IpAddress`,`NotIpAddress`,`NumericEquals`,`NumericNotEquals`,`NumericLessThan`,`NumericLessThanEquals`,`NumericGreaterThan`,`NumericGreaterThanEquals`,`StringEquals`,`StringNotEquals`,`StringEqualsIgnoreCase`,`StringNotEqualsIgnoreCase`,`StringLike`,`StringNotLike`,`ListContains`  |
| value | string | 是 | Condition Value。 示例值： `1`  |


