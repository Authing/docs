# 删除应用访问授权记录

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

取消给用户、分组、组织或角色的应用访问权限授权

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 | 示例值 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| list | <a href="#DeleteApplicationPermissionRecordItem">DeleteApplicationPermissionRecordItem[]</a> | 是 | - | 授权主体列表，最多 10 条。   |  |
| appId | string | 是 | - | 应用 ID。   | `6229ffaxxxxxxxxcade3e3d9` |


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

    response := client.deleteApplicationPermissionRecord(
      dto.DeleteApplicationPermissionRecord {
          AppId: "6229ffaxxxxxxxxcade3e3d9",
        List: []DeleteApplicationPermissionRecordItem{
                    dto.DeleteApplicationPermissionRecordItem
                    {
                     TargetType: DeleteApplicationPermissionRecordItem.targetType.USER,
            NamespaceCode: "code1",
            TargetIdentifier: []string{"6229ffaxxxxxxxxcade3e3d9",},
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
  "data": {
    "success": true
  }
}
```

## 数据结构


### <a id="DeleteApplicationPermissionRecordItem"></a> DeleteApplicationPermissionRecordItem

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| targetType | string | 是 | 主体类型。  | 可选枚举值：`USER`,`ROLE`,`GROUP`,`ORG` |
| namespaceCode | string | 否 | 权限分组 code，当主体类型为 "ROLE" 时必传。  |  `code1` |
| targetIdentifier | array | 是 | 主体标识列表，当主体类型为 "USER" 时，值应为用户 ID；当主体类型为 "GROUP" 时，值应为分组 code；当主体类型为 "ROLE" 时，值应为角色 code；当主体类型为 "ORG" 时，值应为组织节点 ID。最多 50 条。。  |  `["6229ffaxxxxxxxxcade3e3d9"]` |


### <a id="IsSuccessDto"></a> IsSuccessDto

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| success | boolean | 是 | 操作是否成功。  |  `true` |


