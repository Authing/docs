# 获取用户部门列表

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

获取用户部门列表

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 |
| ---- | ---- | ---- | ---- | ---- |
| userId | string  | 是 |  | 用户 ID。 示例值： `6229ffaxxxxxxxxcade3e3d9` |


## 示例代码

```go
package main

import (
    "authing-go-sdk/management"
    "authing-go-sdk/dto"

    "fmt"
)

func main() {
    options := client.ClientOptions {
        AccessKeyId:     "AUTHING_USERPOOL_ID",
        AccessKeySecret: "AUTHING_USERPOOL_SECRET",
    }

    client, err := management.NewClient(&options)
    if err != nil {
        // The exception needs to be handled by the developer.
    }

    response := client.getUserDepartments(
    
     
        userId: "6229ffaxxxxxxxxcade3e3d9"        
  )
}
```



## 请求响应

类型： `UserDepartmentPaginatedRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| data | <a href="#UserDepartmentPagingDto">UserDepartmentPagingDto</a> | 响应数据 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "apiCode": 20001,
  "data": {
    "list": {
      "departmentId": "60b49eb83fd80adb96f26e68",
      "name": "dd8d7stf44",
      "description": "dd8d7stf44",
      "isLeader": true,
      "code": "6229c4deb3e4d8a20b6021ff",
      "isMainDepartment": true
    }
  }
}
```

## 数据结构


### <a id="UserDepartmentPagingDto"></a> UserDepartmentPagingDto

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| totalCount | number | 是 | 记录总数。   |
| list | array | 是 | 响应数据。嵌套类型：<a href="#UserDepartmentRespDto">UserDepartmentRespDto</a>。   |


### <a id="UserDepartmentRespDto"></a> UserDepartmentRespDto

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| departmentId | string | 是 | 部门 ID。 示例值： `60b49eb83fd80adb96f26e68`  |
| name | string | 是 | 部门名称。 示例值： `dd8d7stf44`  |
| description | string | 是 | 部门描述。 示例值： `dd8d7stf44`  |
| isLeader | boolean | 是 | 是否是部门 Leader。 示例值： `true`  |
| code | string | 是 | 部门识别码。 示例值： `6229c4deb3e4d8a20b6021ff`  |
| isMainDepartment | boolean | 是 | 是否是主部门。 示例值： `true`  |


