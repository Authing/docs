# 获取父部门信息

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

获取父部门信息

## 请求参数

| 名称 | 位置 | 类型 | 必填 | 默认值 | 描述 |
| ---- | --- | ---- | ---- | ---- | ---- |
| organizationCode | query | string  | \* |  | 组织 code。 示例值： `steamory` |
| departmentId | query | string  | \* |  | 部门 id。 示例值： `root` |
| departmentIdType | query | string  |  | department_id | 此次调用中使用的部门 ID 的类型。 枚举值：`department_id`,`open_department_id` |


## 示例代码

```py
from authing import ManagementClient

management_client = ManagementClient(
    access_key_id="AUTHING_USERPOOL_ID",
    access_key_secret="AUTHING_USERPOOL_SECRET",
)

data = management_client.get_parent_department(
  
      organization_code: "steamory",
  
      department_id: "root",
  
      department_id_type: "department_id",
  
)
```



## 请求响应

类型： `DepartmentSingleRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| data | <a href="#DepartmentDto">DepartmentDto</a> | 响应数据 |



示例结果：

```js
{
  "statusCode": 200,
  "message": "操作成功",
  "apiCode": 20001,
  "data": {
    "departmentId": "60b49eb83fd80adb96f26e68",
    "openDepartmentId": "ou_7dab8a3d3cdccxxxxxx777c7ad535d62",
    "name": "开发部",
    "description": "技术研发部门",
    "parentDepartmentId": "6229c4deb3e4d8a20b6021ff",
    "code": "6229c4deb3e4d8a20b6021ff",
    "leaderUserId": "60b49eb83fd80adb96f26e68",
    "membersCount": 11,
    "hasChildren": true
  }
}
```

## 数据结构


### <a id="DepartmentDto"></a> DepartmentDto

| 名称 | 类型 | 必填 |默认值| 描述 |
| ---- |  ---- | ---- | --- | ---- |
| departmentId | string | \* |  | 部门系统 ID（为 Authing 系统自动生成，不可修改）。 示例值： `60b49eb83fd80adb96f26e68`  |
  | openDepartmentId | string |  |  | 自定义部门 ID，用于存储自定义的 ID。 示例值： `ou_7dab8a3d3cdccxxxxxx777c7ad535d62`  |
  | name | string | \* |  | 部门名称。 示例值： `开发部`  |
  | description | string |  |  | 部门描述。 示例值： `技术研发部门`  |
  | parentDepartmentId | string | \* |  | 父部门 id。 示例值： `6229c4deb3e4d8a20b6021ff`  |
  | code | string |  |  | 部门识别码。 示例值： `6229c4deb3e4d8a20b6021ff`  |
  | leaderUserId | string |  |  | 部门负责人 ID。 示例值： `60b49eb83fd80adb96f26e68`  |
  | membersCount | number | \* |  | 部门人数。 示例值： `11`  |
  | hasChildren | boolean | \* |  | 是否包含子部门。 示例值： `true`  |
  

