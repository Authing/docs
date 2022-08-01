# 获取某个主体被授权的资源列表

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

根据筛选条件，获取某个主体被授权的资源列表。

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 | 示例值 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| targetType | string  | 是 | - | 目标对象类型。 枚举值：`USER`,`ROLE`,`GROUP`,`DEPARTMENT` | `USER` |
| targetIdentifier | string  | 是 | - | 目标对象唯一标志符。  | `userId1` |
| namespace | string  | 否 | - | 所属权限分组的 code。  | `default` |
| resourceType | string  | 否 | - | 限定资源类型，如数据、API、按钮、菜单。 枚举值：`DATA`,`API`,`MENU`,`BUTTON` | `DATA` |
| resourceList | string[]  | 否 | - | 限定查询的资源列表，如果指定，只会返回所指定的资源列表。。数组长度限制：50。  |  |
| withDenied | boolean  | 否 | - | 是否获取被拒绝的资源。  |  |


## 示例代码

```go
package main

import (
    "github.com/Authing/authing-golang-sdk/management"
    "github.com/Authing/authing-golang-sdk/dto"

    "fmt"
)

func main() {
    options := management.ClientOptions {
        AccessKeyId:     "AUTHING_USERPOOL_ID",
        AccessKeySecret: "AUTHING_USERPOOL_SECRET",
    }

    client, err := management.NewClient(&options)
    if err != nil {
        // The exception needs to be handled by the developer.
    }

    response := client.getAuthorizedResources(
    
     
        targetType: "USER"        , 
        targetIdentifier: "userId1"        , 
        namespace: "default"        , 
        resourceType: "DATA"        , 
        resourceList: "undefined"        , 
        withDenied: false        
  )
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


