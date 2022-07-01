# 设置用户所在部门

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

设置用户所在部门

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 | 示例值 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| userId | string | 是 | - | 用户 ID。  | `6229ffaxxxxxxxxcade3e3d9` |
| departments | <a href="#SetUserDepartmentDto">SetUserDepartmentDto[]</a> | 是 | - | 部门信息。  | `[{"departmentId":"60b49eb83fd80adb96f26e68","isLeader":true,"isMainDepartment":true}]` |


## 示例代码

```php
<?php

require 'vendor/autoload.php';

use Authing\ManagementClient;

$management = new ManagementClient(
    "AUTHING_USERPOOL_ID",
    "AUTHING_USERPOOL_SECRET"
);

$data = $management->setUserDepartments(array(
      "userId" => "6229ffaxxxxxxxxcade3e3d9",
    "departments" => array(
      array(
            "departmentId" => "60b49eb83fd80adb96f26e68",
          "isLeader" => true,
          "isMainDepartment" => true,
      
      )
    ),

));
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


### <a id="SetUserDepartmentDto"></a> SetUserDepartmentDto

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| departmentId | string | 是 | 部门 id。 示例值： `60b49eb83fd80adb96f26e68`  |
| isLeader | boolean | 否 | 是否是部门 leader。 示例值： `true`  |
| isMainDepartment | boolean | 否 | 是否是主部门。 示例值： `true`  |


### <a id="IsSuccessDto"></a> IsSuccessDto

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| success | boolean | 是 | 操作是否成功。 示例值： `true`  |


