# 获取顶层组织机构列表

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

获取顶层组织机构列表

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 | 示例值 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| page | number  | 否 | 1 | 当前页数，从 1 开始。  | `1` |
| limit | number  | 否 | 10 | 每页数目，最大不能超过 50，默认为 10。  | `10` |
| fetchAll | boolean  | 否 | false | 拉取所有。  |  |


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

    response := client.listOrganizations(
    
     
        page: 1        , 
        limit: 10        , 
        fetchAll: false        
  )
}
```



## 请求响应

类型： `OrganizationPaginatedRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| data | <a href="#OrganizationPagingDto">OrganizationPagingDto</a> | 响应数据 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "apiCode": 20001,
  "data": {
    "list": {
      "organizationCode": "steamory",
      "organizationName": "蒸汽记忆",
      "description": "组织描述信息",
      "departmentId": "60b49eb83fd80adb96f26e68",
      "openDepartmentId": "60b49eb83fd80adb96f26e68",
      "hasChildren": true,
      "leaderUserIds": "[\"60b49eb83fd80adb96f26e68\"]",
      "membersCount": 150,
      "i18n": {
        "organizationName": {
          "zh-CN": {
            "enabled": false,
            "value": "中文"
          },
          "en-US": {
            "enabled": false,
            "value": "English"
          }
        }
      }
    }
  }
}
```

## 数据结构


### <a id="OrganizationPagingDto"></a> OrganizationPagingDto

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| totalCount | number | 是 | 记录总数。   |
| list | array | 是 | 响应数据。嵌套类型：<a href="#OrganizationDto">OrganizationDto</a>。   |


### <a id="OrganizationDto"></a> OrganizationDto

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| organizationCode | string | 是 | 组织 code。 示例值： `steamory`  |
| organizationName | string | 是 | 组织名称。 示例值： `蒸汽记忆`  |
| description | string | 否 | 组织描述信息。 示例值： `组织描述信息`  |
| departmentId | string | 是 | 根节点 ID。 示例值： `60b49eb83fd80adb96f26e68`  |
| openDepartmentId | string | 否 | 根节点自定义 ID。 示例值： `60b49eb83fd80adb96f26e68`  |
| hasChildren | boolean | 是 | 是否包含子节点。 示例值： `true`  |
| leaderUserIds | array | 否 | 部门负责人 ID。 示例值： `["60b49eb83fd80adb96f26e68"]`  |
| membersCount | number | 是 | 部门人数。 示例值： `150`  |
| isVirtualNode | boolean | 是 | 是否是虚拟部门。   |
| i18n |  | 否 | 多语言设置。嵌套类型：<a href="#OrganizationNameI18nDto">OrganizationNameI18nDto</a>。 示例值： `[object Object]`  |


### <a id="OrganizationNameI18nDto"></a> OrganizationNameI18nDto

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| organizationName |  | 是 | 支持多语言的字段。嵌套类型：<a href="#LangObject">LangObject</a>。 示例值： `[object Object]`  |


### <a id="LangObject"></a> LangObject

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| zh-CN |  | 是 | 多语言的中文内容。嵌套类型：<a href="#LangUnit">LangUnit</a>。 示例值： `[object Object]`  |
| en-US |  | 是 | 多语言的英文内容。嵌套类型：<a href="#LangUnit">LangUnit</a>。 示例值： `[object Object]`  |


### <a id="LangUnit"></a> LangUnit

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| enabled | boolean | 是 | 是否已开启。若开启，且控制台选择该语言，则展示该内容。（默认关闭）。   |
| value | boolean | 是 | 多语言内容。   |


