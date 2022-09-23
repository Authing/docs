# 获取角色的部门列表

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

通过权限分组内角色 code，获取角色的部门列表，支持分页。

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 | 示例值 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| code | string  | 是 | - | 权限分组内角色的唯一标识符。  | `manager` |
| namespace | string  | 否 | - | 所属权限分组的 code。  | `default` |
| page | number  | 否 | 1 | 当前页数，从 1 开始。  | `1` |
| limit | number  | 否 | 10 | 每页数目，最大不能超过 50，默认为 10。  | `10` |


## 示例代码

```php
<?php

require 'vendor/autoload.php';

use Authing\ManagementClient;

$management = new ManagementClient(
    "AUTHING_USERPOOL_ID",
    "AUTHING_USERPOOL_SECRET"
);

$data = $management->listRoleDepartments(array(
  
    "code" => "manager",

    "namespace" => "default",

    "page" => 1,

    "limit" => 10,

));
```


## 请求响应

类型： `RoleDepartmentListPaginatedRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| data | <a href="#RoleDepartmentListPagingDto">RoleDepartmentListPagingDto</a> | 数据 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "data": {
    "list": {
      "id": "60b49eb83fd80adb96f26e68",
      "code": "code",
      "name": "departmentName",
      "description": "dd8d7stf44"
    }
  }
}
```

## 数据结构


### <a id="RoleDepartmentListPagingDto"></a> RoleDepartmentListPagingDto

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| totalCount | number | 是 | 记录总数。   |
| list | array | 是 | 数据。嵌套类型：<a href="#RoleDepartmentRespDto">RoleDepartmentRespDto</a>。   |


### <a id="RoleDepartmentRespDto"></a> RoleDepartmentRespDto

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| id | string | 是 | 部门 ID。 示例值： `60b49eb83fd80adb96f26e68`  |
| code | string | 是 | 部门 code。 示例值： `code`  |
| name | string | 是 | 部门名称。 示例值： `departmentName`  |
| description | string | 是 | 部门描述信息。 示例值： `dd8d7stf44`  |


