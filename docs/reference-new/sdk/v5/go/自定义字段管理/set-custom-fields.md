# 创建/修改自定义字段定义

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

创建/修改自定义字段定义，如果传入的 key 不存在则创建，存在则更新。

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 |
| ---- | ---- | ---- | ---- | ---- |
| list | <a href="#SetCustomFieldDto">SetCustomFieldDto[]</a> | 是 |  | 自定义字段列表。  |


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

    response := client.setCustomFields(
      dto.SetCustomFieldsReqDto {
        List: []SetCustomFieldDto{
                    dto.SetCustomFieldDto
                    {
                     TargetType: SetCustomFieldDto.targetType.USER,
            DataType: SetCustomFieldDto.dataType.STRING,
            Key: "school",
            Label: "学校",
            Description: "学校",
            Encrypted: false,
          Options: []CustomFieldSelectOption{
                    dto.CustomFieldSelectOption
                    {
                     Value: "hust",
            Label: "华中科技大学",
                }
                  },
                }
                  },
    }
  )
}
```



## 请求响应

类型： `CustomFieldListRespDto`

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
    "targetType": "USER",
    "createdAt": "2022-03-17T05:23:01.567Z",
    "dataType": "STRING",
    "key": "school",
    "label": "学校",
    "description": "学校",
    "options": "[{\"value\":\"pku\",\"label\":\"北京大学\"}]"
  }
}
```

## 数据结构


### <a id="SetCustomFieldDto"></a> SetCustomFieldDto

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| targetType | string | 是 | 主体类型，目前支持用户、角色、分组和部门。 枚举值：`USER`,`ROLE`,`GROUP`,`DEPARTMENT`  |
| dataType | string | 是 | 数据类型。 枚举值：`STRING`,`NUMBER`,`DATETIME`,`BOOLEAN`,`SELECT`  |
| key | string | 是 | 字段 key，不能和内置字段的 key 冲突。 示例值： `school`  |
| label | string | 是 | 前端表单展示名称。 示例值： `学校`  |
| description | string | 否 | 详细描述信息。 示例值： `学校`  |
| encrypted | boolean | 否 | 是否加密存储。   |
| options | array | 否 | 枚举值类型选择项。嵌套类型：<a href="#CustomFieldSelectOption">CustomFieldSelectOption</a>。 示例值： `[{"value":"pku","label":"北京大学"}]`  |


### <a id="CustomFieldSelectOption"></a> CustomFieldSelectOption

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| value | string | 是 | 枚举值 value。 示例值： `hust`  |
| label | string | 是 | 枚举值 label。 示例值： `华中科技大学`  |


### <a id="CustomFieldDto"></a> CustomFieldDto

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| targetType | string | 是 | 主体类型，目前支持用户、角色、分组和部门。 枚举值：`USER`,`ROLE`,`GROUP`,`DEPARTMENT`  |
| createdAt | string | 是 | 创建时间。 示例值： `2022-03-17T05:23:01.567Z`  |
| dataType | string | 是 | 数据类型。 枚举值：`STRING`,`NUMBER`,`DATETIME`,`BOOLEAN`,`SELECT`  |
| key | string | 是 | 字段 key，不能和内置字段的 key 冲突。 示例值： `school`  |
| label | string | 是 | 前端表单展示名称。 示例值： `学校`  |
| description | string | 否 | 详细描述信息。 示例值： `学校`  |
| encrypted | boolean | 否 | 是否加密存储。   |
| options | array | 否 | 枚举值类型选择项。嵌套类型：<a href="#CustomFieldSelectOption">CustomFieldSelectOption</a>。 示例值： `[{"value":"pku","label":"北京大学"}]`  |


### <a id="CustomFieldSelectOption"></a> CustomFieldSelectOption

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| value | string | 是 | 枚举值 value。 示例值： `hust`  |
| label | string | 是 | 枚举值 label。 示例值： `华中科技大学`  |


