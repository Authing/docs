# 获取用户、分组、角色、组织机构的自定义字段值

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

通过筛选条件，获取用户、分组、角色、组织机构的自定义字段值。

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 | 示例值 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| targetType | string  | 是 | - | 主体类型，目前支持用户、角色、分组、部门。 枚举值：`USER`,`ROLE`,`GROUP`,`DEPARTMENT` | `USER` |
| targetIdentifier | string  | 是 | - | 目标对象唯一标志符。  | `userId1` |
| namespace | string  | 否 | - | 所属权限分组的 code，当 targetType 为角色的时候需要填写，否则可以忽略。  | `default` |


## 示例代码

```py
from authing import ManagementClient

management_client = ManagementClient(
    access_key_id="AUTHING_USERPOOL_ID",
    access_key_secret="AUTHING_USERPOOL_SECRET",
)

data = management_client.get_custom_data(
  
      target_type: "USER",
  
      target_identifier: "userId1",
  
      namespace: "default",
  
)
```



## 请求响应

类型： `GetCustomDataRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| data | object | 具体的自定义数据值 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "data": {
    "age": 18,
    "school": "pku"
  }
}
```

## 数据结构


