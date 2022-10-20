# 判断用户是否对某个资源的某个操作有权限

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

判断用户是否对某个资源的某个操作有权限。

## 请求参数

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:60px">默认值</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- | ---- | ---- | ---- | ---- | ---- |
| action | string | 是 | - | 资源对应的操作  | `ecs:Start` |
| resource | string | 是 | - | 资源标识符  | `ecs:1` |
| userId | string | 是 | - | 用户 ID  | `userId1` |
| namespace | string | 否 | - | 所属权限分组的 code  | `default` |


<!-- 暂时不显示示例代码 -->
<!-- ## 示例代码
```py
from authing import ManagementClient

management_client = ManagementClient(
    access_key_id="AUTHING_USERPOOL_ID",
    access_key_secret="AUTHING_USERPOOL_SECRET",
)

data = management_client.is_action_allowed(
     namespace: "default",
     user_id: "userId1",
     resource: "ecs:1",
     action: "ecs:Start",
  
)
```
 -->


## 请求响应

类型： `IsActionAllowedRespDtp`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| requestId | string | 请求 ID。当请求失败时会返回。 |
| data | <a href="#IsActionAllowedDataDto">IsActionAllowedDataDto</a> | 返回数据 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "requestId": "934108e5-9fbf-4d24-8da1-c330328abd6c",
  "data": {
    "allowed": true
  }
}
```

## 数据结构


### <a id="IsActionAllowedDataDto"></a> IsActionAllowedDataDto

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |
| allowed | boolean | 是 | 是否允许   |  `true` |


