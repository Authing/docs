# 获取角色列表

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

获取角色列表

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 |
| ---- | ---- | ---- | ---- | ---- |
| namespace | string  | 否 | default | 所属权限分组的 code。 示例值： `default` |
| page | number  | 否 | 1 | 当前页数，从 1 开始。 示例值： `1` |
| limit | number  | 否 | 10 | 每页数目，最大不能超过 50，默认为 10。 示例值： `10` |


## 示例代码

```go
import (
    "authing-go-sdk/client"
    "authing-go-sdk/dto"

    "fmt"
)

func main() {
    options := client.ManagementClientOptions {
        AccessKeyId:     "AUTHING_USERPOOL_ID",
        AccessKeySecret: "AUTHING_USERPOOL_SECRET",
    }

    client, err := client.NewClient(&options)
    if err != nil {
        // The exception needs to be handled by the developer.
    }

    response := client.listRoles(
    
     
        namespace: "default"        , 
        page: 1        , 
        limit: 10        
  )
}
```



## 请求响应

类型： `RolePaginatedRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| data | <a href="#RolePagingDto">RolePagingDto</a> | 响应数据 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "apiCode": 20001,
  "data": {
    "list": {
      "code": "role1",
      "description": "this is description",
      "namespace": "default"
    }
  }
}
```

## 数据结构


### <a id="RolePagingDto"></a> RolePagingDto

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| totalCount | number | 是 | 记录总数。   |
| list | array | 是 | 响应数据。嵌套类型：<a href="#RoleDto">RoleDto</a>。   |


### <a id="RoleDto"></a> RoleDto

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| code | string | 是 | 权限分组内角色的唯一标识符。 示例值： `role1`  |
| description | string | 是 | 角色描述。 示例值： `this is description`  |
| namespace | string | 是 | 所属权限分组的 code。 示例值： `default`  |


