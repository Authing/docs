# 部门下删除成员

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

通过部门 ID、组织 code，删除部门下成员。

## 请求参数

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:60px">默认值</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- | ---- | ---- | ---- | ---- | ---- |
| userIds | string[] | 是 | - | 用户 ID 列表  | `["623c20b2a062aaaaf41b17da"]` |
| organizationCode | string | 是 | - | 组织 code  | `steamory` |
| departmentId | string | 是 | - | 部门系统 ID（为 Authing 系统自动生成，不可修改）  | `60b49eb83fd80adb96f26e68` |
| departmentIdType | string | 否 | department_id | 此次调用中使用的部门 ID 的类型  | `department_id` |


<!-- 暂时不显示示例代码 -->
<!-- ## 示例代码
```py
from authing import ManagementClient

management_client = ManagementClient(
    access_key_id="AUTHING_USERPOOL_ID",
    access_key_secret="AUTHING_USERPOOL_SECRET",
)

data = management_client.remove_department_members(
     department_id: "60b49eb83fd80adb96f26e68",
     organization_code: "steamory",
     department_id_type: "department_id",
     user_ids: "["623c20b2a062aaaaf41b17da"]",
  
)
```
 -->


## 请求响应

类型： `IsSuccessRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| requestId | string | 请求 ID。当请求失败时会返回。 |
| data | <a href="#IsSuccessDto">IsSuccessDto</a> | 操作是否成功 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "requestId": "934108e5-9fbf-4d24-8da1-c330328abd6c",
  "data": {
    "success": true
  }
}
```

## 数据结构


### <a id="IsSuccessDto"></a> IsSuccessDto

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |
| success | boolean | 是 | 操作是否成功   |  `true` |


