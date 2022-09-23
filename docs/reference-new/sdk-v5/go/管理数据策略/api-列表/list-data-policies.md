# 分页获取数据策略详细信息详情列表

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

分页获取数据策略详细信息详情列表,可以通过关键字搜索数据策略名称或者数据策略 Code 进行针对戏查找，也可以通过数据资源 ID 查找资源下所有数据策略。

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 | 示例值 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| page | number  | 否 | 1 | 当前页数，从 1 开始。  | `1` |
| limit | number  | 否 | 10 | 每页数目，最大不能超过 50，默认为 10。  | `10` |
| query | string  | 否 | - | 关键字搜索，可以是策略名称或者策略 Code,限制 50 字符以内。  | `示例1` |


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

    response := client.listDataPolicies(
    
     
        page: 1        , 
        limit: 10        , 
        query: "示例1"        
  )
}
```



## 请求响应

类型： `ListDataPoliciesPaginatedRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| data | <a href="#DataPoliciesPaginatedRespDto">DataPoliciesPaginatedRespDto</a> | 响应数据 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "data": {
    "totalCount": 20,
    "list": {
      "policyName": "数据资源",
      "description": "这个是一个示例数据策略源",
      "dataPermissionList": {
        "resourceId": "6301ceaad4677b9255f27478",
        "resourceName": "资源1"
      },
      "policyId": "60b49XXXXXXXXXXXX6e68",
      "targetList": {
        "id": "6301ceXXXXXXXXXXXXXXXXX78",
        "type": "USER",
        "name": "test"
      },
      "updatedAt": "2022-07-03T02:20:30.000Z"
    }
  }
}
```

## 数据结构


### <a id="DataPoliciesPaginatedRespDto"></a> DataPoliciesPaginatedRespDto

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| totalCount | number | 否 | 记录总数。 示例值： `20`  |
| list | array | 是 | 数据。嵌套类型：<a href="#ListDataPoliciesRespDto">ListDataPoliciesRespDto</a>。   |


### <a id="ListDataPoliciesRespDto"></a> ListDataPoliciesRespDto

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| policyName | string | 是 | 数据策略名称应用内唯一,限长 50 字符。 示例值： `数据资源`  |
| description | string | 是 | 数据策略描述， 限长 200 字符。 示例值： `这个是一个示例数据策略源`  |
| dataPermissionList | array | 是 | 数据权限列表，每个策略下所有的数据资源。嵌套类型：<a href="#DataResourceSimpleRespDto">DataResourceSimpleRespDto</a>。   |
| policyId | string | 是 | 数据策略 ID。 示例值： `60b49XXXXXXXXXXXX6e68`  |
| targetList | array | 是 | 主体对象列表,包含数据策略下所有的主体对象。嵌套类型：<a href="#SubjectRespDto">SubjectRespDto</a>。   |
| updatedAt | string | 是 | 数据策略更新时间。 示例值： `2022-07-03T02:20:30.000Z`  |


### <a id="DataResourceSimpleRespDto"></a> DataResourceSimpleRespDto

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| resourceId | string | 是 | 数据权限所属的数据资源 id。 示例值： `6301ceaad4677b9255f27478`  |
| resourceName | string | 是 | 数据权限所属的数据资源名称。 示例值： `资源1`  |


### <a id="SubjectRespDto"></a> SubjectRespDto

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| id | string | 是 | 主体 ID ，包含用户 ID、用户组 ID、角色 ID、组织机构 ID。 示例值： `6301ceXXXXXXXXXXXXXXXXX78`  |
| type | string | 是 | 主体类型,包括 USER、GROUP、ROLE、ORG 四种类型。 枚举值：`USER`,`ORG`,`GROUP`,`ROLE`  |
| name | string | 是 | 主体名称，包含用户名称、用户组名称、角色名称、组织机构名称。 示例值： `test`  |


