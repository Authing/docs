# 获取角色详情

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

通过权限分组内角色 code，获取角色详情。

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 | 示例值 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| code | string  | 是 | - | 权限分组内角色的唯一标识符。  | `manager` |
| namespace | string  | 否 | - | 所属权限分组的 code。  | `default` |


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

    response := client.getRole(
    
     
        code: "manager"        , 
        namespace: "default"        
  )
}
```



## 请求响应

类型： `RoleSingleRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| data | <a href="#RoleDto">RoleDto</a> | 响应数据 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "apiCode": 20001,
  "data": {
    "code": "role1",
    "description": "this is description",
    "namespace": "default"
  }
}
```

## 数据结构


### <a id="RoleDto"></a> RoleDto

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| code | string | 是 | 权限分组内角色的唯一标识符。 示例值： `role1`  |
| description | string | 是 | 角色描述。 示例值： `this is description`  |
| namespace | string | 是 | 所属权限分组的 code。 示例值： `default`  |


