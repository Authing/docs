# 批量创建分组

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

批量创建分组，一个分组必须包含分组名称与唯一标志符 code，且必须为一个合法的英文标志符，如 developers。

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 | 示例值 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| list | <a href="#CreateGroupReqDto">CreateGroupReqDto[]</a> | 是 | - | 批量分组。  |  |


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

    response := client.createGroupsBatch(
      dto.CreateGroupBatchReqDto {
        List: []CreateGroupReqDto{
                    dto.CreateGroupReqDto
                    {
                     Code: "developer",
            Name: "开发者",
            Description: "描述内容",
                }
                  },
    }
  )
}
```



## 请求响应

类型： `GroupListRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| data | array | 响应数据 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "apiCode": 20001,
  "data": {
    "code": "developer",
    "name": "开发者",
    "description": "描述内容"
  }
}
```

## 数据结构


### <a id="CreateGroupReqDto"></a> CreateGroupReqDto

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| code | string | 是 | 分组 code。 示例值： `developer`  |
| name | string | 是 | 分组名称。 示例值： `开发者`  |
| description | string | 是 | 分组描述。 示例值： `描述内容`  |


### <a id="GroupDto"></a> GroupDto

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| code | string | 是 | 分组 code。 示例值： `developer`  |
| name | string | 是 | 分组名称。 示例值： `开发者`  |
| description | string | 是 | 分组描述。 示例值： `描述内容`  |


