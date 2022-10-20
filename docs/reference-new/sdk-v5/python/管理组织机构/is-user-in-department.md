# 判断用户是否在某个部门下

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

通过组织 code、部门 ID，判断用户是否在某个部门下，可以选择包含子部门。

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 | 示例值 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| userId | string  | 是 | - | 用户唯一标志，可以是用户 ID、用户名、邮箱、手机号、外部 ID、在外部身份源的 ID。。  | `6229ffaxxxxxxxxcade3e3d9` |
| organizationCode | string  | 是 | - | 组织 code。  | `steamory` |
| departmentId | string  | 是 | - | 部门 ID，根部门传 `root`。departmentId 和 departmentCode 必传其一。。  | `root` |
| departmentIdType | string  | 否 | department_id | 此次调用中使用的部门 ID 的类型。 枚举值：`department_id`,`open_department_id` | `department_id` |
| includeChildrenDepartments | boolean  | 否 | - | 是否包含子部门。  |  |


## 示例代码

```py
from authing import ManagementClient

management_client = ManagementClient(
    access_key_id="AUTHING_USERPOOL_ID",
    access_key_secret="AUTHING_USERPOOL_SECRET",
)

data = management_client.is_user_in_department(
  
      user_id: "6229ffaxxxxxxxxcade3e3d9",
  
      organization_code: "steamory",
  
      department_id: "root",
  
      department_id_type: "department_id",
  
      include_children_departments: false,
  
)
```



## 请求响应

类型： `IsUserInDepartmentRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| data | <a href="#IsUserInDepartmentDataDto">IsUserInDepartmentDataDto</a> | 数据 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "data": {
    "inDepartment": true
  }
}
```

## 数据结构


### <a id="IsUserInDepartmentDataDto"></a> IsUserInDepartmentDataDto

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| inDepartment | boolean | 是 | 是否在此部门内。  |  `true` |


