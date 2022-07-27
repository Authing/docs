# 获取部门直属成员 ID 列表

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

通过组织 code、部门 ID，获取部门直属成员 ID 列表。

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 | 示例值 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| departmentId | string  | 是 | - | 部门 ID，根部门传 `root`。  | `root` |
| organizationCode | string  | 是 | - | 组织 code。  | `steamory` |
| departmentIdType | string  | 否 | department_id | 此次调用中使用的部门 ID 的类型。 枚举值：`department_id`,`open_department_id` | `department_id` |


## 示例代码

```php
<?php

require 'vendor/autoload.php';

use Authing\ManagementClient;

$management = new ManagementClient(
    "AUTHING_USERPOOL_ID",
    "AUTHING_USERPOOL_SECRET"
);

$data = $management->listDepartmentMemberIds(array(
  
    "departmentId" => "root",

    "organizationCode" => "steamory",

    "departmentIdType" => "department_id",

));
```


## 请求响应

类型： `UserIdListRespDto`

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
  "apiCode": 20001
}
```

## 数据结构


