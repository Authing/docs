# 批量创建角色

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

批量创建角色，可以选择权限分组、角色描述等。

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 | 示例值 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| list | <a href="#RoleListItem">RoleListItem[]</a> | 是 | - | 角色列表。 数组长度限制：50。  | `[{"code":"my-role-code","namespace":"default","description":"this is  description"}]` |


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

    response := client.createRolesBatch(
      dto.CreateRolesBatch {
        List: []RoleListItem{
                    dto.RoleListItem
                    {
                     Code: "my-role-code",
            Description: "this is a description about the role",
            Namespace: "default",
                }
                  },
    }
  )
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


### <a id="RoleListItem"></a> RoleListItem

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| code | string | 是 | 权限分组内角色的唯一标识符。 示例值： `my-role-code`  |
| description | string | 否 | 角色描述。 示例值： `this is a description about the role`  |
| namespace | string | 否 | 所属权限分组的 code。 示例值： `default`  |


### <a id="IsSuccessDto"></a> IsSuccessDto

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| success | boolean | 是 | 操作是否成功。 示例值： `true`  |


