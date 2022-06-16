# 分配角色

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

分配角色，被分配者可以是用户，可以是部门

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 |
| ---- | ---- | ---- | ---- | ---- |
| code | string | 是 |  | 权限分组内角色的唯一标识符。 示例值： `code1` |
| namespace | string | 否 |  | 所属权限分组的 code。 示例值： `60b49eb83fd80adb96f26e68` |
| targets | <a href="#TargetDto">TargetDto[]</a> | 是 |  | 目标对象。 示例值： `[{"targetIdentifier":"60b49eb83fd80adb96f26e68","targetType":"USER"}]` |


## 示例代码

```py
from authing import ManagementClient

management_client = ManagementClient(
    access_key_id="AUTHING_USERPOOL_ID",
    access_key_secret="AUTHING_USERPOOL_SECRET",
)

data = management_client.assign_role(
     code: "code1",
     namespace: "60b49eb83fd80adb96f26e68",
     targets: [{
           target_type: "DEPARTMENT",
         target_identifier: "60b49eb83fd80adb96f26e68",
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


### <a id="TargetDto"></a> TargetDto

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| targetType | string | 是 | 目标类型，接受用户，部门。 枚举值：`USER`,`ROLE`,`GROUP`,`DEPARTMENT`  |
| targetIdentifier | string | 是 | 目标的 ID。 示例值： `60b49eb83fd80adb96f26e68`  |


### <a id="IsSuccessDto"></a> IsSuccessDto

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| success | boolean | 是 | 操作是否成功。 示例值： `true`  |


