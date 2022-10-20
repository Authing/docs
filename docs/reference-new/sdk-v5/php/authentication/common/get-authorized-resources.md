# 获取被授权的资源列表

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

此接口用于获取用户被授权的资源列表。

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 | 示例值 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| namespace | string  | 否 | - | 所属权限分组的 code。  | `default` |
| resourceType | string  | 否 | - | 资源类型，如 数据、API、菜单、按钮。 枚举值：`DATA`,`API`,`MENU`,`BUTTON`,`UI` |  |


## 示例代码

```php
<?php

require 'vendor/autoload.php';

use Authing\ManagementClient;

$management = new ManagementClient(
    "AUTHING_USERPOOL_ID",
    "AUTHING_USERPOOL_SECRET"
);

$data = $management->getAuthorizedResources(array(
  
    "namespace" => "default",

    "resourceType" => "undefined",

));
```


## 请求响应

类型： `AuthorizedResourcePaginatedRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| requestId | string | 请求 ID。当请求失败时会返回。 |
| data | <a href="#AuthorizedResourcePagingDto">AuthorizedResourcePagingDto</a> | 响应数据 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "requestId": "934108e5-9fbf-4d24-8da1-c330328abd6c",
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

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| totalCount | number | 是 | 记录总数。  |  |
| list | array | 是 | 响应数据。嵌套类型：<a href="#AuthorizedResourceDto">AuthorizedResourceDto</a>。  |  |


### <a id="AuthorizedResourceDto"></a> AuthorizedResourceDto

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| resourceCode | string | 是 | 资源描述符。  |  `ecs:1` |
| description | string | 否 | 资源描述信息。  |  `服务器` |
| condition | array | 否 | 策略 Condition。嵌套类型：<a href="#PolicyCondition">PolicyCondition</a>。  |  |
| resourceType | string | 是 | 资源类型。  | 可选枚举值：`DATA`,`API`,`MENU`,`BUTTON`,`UI` |
| apiIdentifier | string | 是 | API URL。  |  `/api/v1/example` |
| actions | array | 是 | 授权的操作列表。  |  `["ecs:Start","ecs:Stop"]` |
| effect | string | 是 | 允许还是拒绝。  | 可选枚举值：`ALLOW`,`DENY` |


### <a id="PolicyCondition"></a> PolicyCondition

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| param | string | 是 | Condition Param。  | 可选枚举值：`UserPoolId`,`AppId`,`RequestFrom`,`UserId`,`UserArn`,`CurrentTime`,`EpochTime`,`SourceIp`,`User`,`MultiFactorAuthPresent`,`MultiFactorAuthAge`,`UserAgent`,`Referer`,`Device`,`OS`,`Country`,`Province`,`City`,`DeviceChanged`,`DeviceUntrusted`,`ProxyUntrusted`,`LoggedInApps`,`Namespace` |
| operator | string | 是 | Condition Operator。  | 可选枚举值：`Bool`,`DateEquals`,`DateNotEquals`,`DateLessThan`,`DateLessThanEquals`,`DateGreaterThan`,`DateGreaterThanEquals`,`IpAddress`,`NotIpAddress`,`NumericEquals`,`NumericNotEquals`,`NumericLessThan`,`NumericLessThanEquals`,`NumericGreaterThan`,`NumericGreaterThanEquals`,`StringEquals`,`StringNotEquals`,`StringEqualsIgnoreCase`,`StringNotEqualsIgnoreCase`,`StringLike`,`StringNotLike`,`ListContains` |
| value | string | 是 | Condition Value。  |  `1` |


