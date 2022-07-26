# 授权资源

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

将一个/多个资源授权给用户、角色、分组、组织机构等主体，且可以分别指定不同的操作权限。

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 | 示例值 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| list | <a href="#AuthorizeResourceItem">AuthorizeResourceItem[]</a> | 是 | - | 授权资源列表。  |  |
| namespace | string | 否 | - | 所属权限分组的 code。  | `default` |


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

    response := client.authorizeResources(
      dto.AuthorizeResourcesDto {
          Namespace: "default",
        List: []AuthorizeResourceItem{
                    dto.AuthorizeResourceItem
                    {
                     TargetType: AuthorizeResourceItem.targetType.USER,
            TargetIdentifiers: []string{"userId1","userId2",},
          Resources: []ResourceItemDto{
                    dto.ResourceItemDto
                    {
                     Code: "ecs",
            Actions: []string{"ecs:Stop","ecs:Start",},
            ResourceType: ResourceItemDto.resourceType.DATA,
                }
                  },
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


### <a id="AuthorizeResourceItem"></a> AuthorizeResourceItem

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| targetType | string | 是 | 目标对象类型。 枚举值：`USER`,`ROLE`,`GROUP`,`DEPARTMENT`  |
| targetIdentifiers | array | 是 | 目标对象唯一标志符。 示例值： `["userId1","userId2"]`  |
| resources | array | 是 | 授权的资源列表。嵌套类型：<a href="#ResourceItemDto">ResourceItemDto</a>。   |


### <a id="ResourceItemDto"></a> ResourceItemDto

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| code | string | 是 | 资源唯一标志符。 示例值： `ecs`  |
| actions | array | 是 | 资源定义的操作类型。 示例值： `["ecs:Stop","ecs:Start"]`  |
| resourceType | string | 是 | 资源类型，如数据、API、按钮、菜单。 枚举值：`DATA`,`API`,`MENU`,`BUTTON`  |


### <a id="IsSuccessDto"></a> IsSuccessDto

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| success | boolean | 是 | 操作是否成功。 示例值： `true`  |


