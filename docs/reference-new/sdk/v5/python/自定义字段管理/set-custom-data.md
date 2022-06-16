# 设置自定义字段的值

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

给用户、角色、部门设置自定义字段的值，如果存在则更新，不存在则创建。

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 |
| ---- | ---- | ---- | ---- | ---- |
| targetType | string | 是 |  | 主体类型，目前支持用户、角色、分组和部门。 枚举值：`USER`,`ROLE`,`GROUP`,`DEPARTMENT` |
| targetIdentifier | string | 是 |  | 主体类型的唯一标志符。如果是用户则为用户 ID，角色为角色的 code，部门为部门的 ID。 示例值： `userId1` |
| namespace | string | 否 |  | 所属权限分组的 code，当 target_type 为角色的时候需要填写，否则可以忽略。。 示例值： `default` |
| list | <a href="#SetCustomDataDto">SetCustomDataDto[]</a> | 是 |  | 自定义数据列表。  |


## 示例代码

```py
from authing import ManagementClient

management_client = ManagementClient(
    access_key_id="AUTHING_USERPOOL_ID",
    access_key_secret="AUTHING_USERPOOL_SECRET",
)

data = management_client.set_custom_data(
     target_type: "USER",
     target_identifier: "userId1",
     namespace: "default",
     list: [{
           key: "school",
         value: "pku",
      }],
  
)
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


### <a id="SetCustomDataDto"></a> SetCustomDataDto

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| key | string | 是 | 字段 key，不能和内置字段的 key 冲突。 示例值： `school`  |
| value | string | 是 | 自定义数据，可以为任意类型，但是必须和创建时定义的自定义字段类型匹配，否则将设置失败。。 示例值： `pku`  |


### <a id="IsSuccessDto"></a> IsSuccessDto

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| success | boolean | 是 | 操作是否成功。 示例值： `true`  |


