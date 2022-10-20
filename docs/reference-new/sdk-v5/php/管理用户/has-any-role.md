# 判断用户是否有某个角色

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

通过用户 ID，判断用户是否有某个角色，支持传入多个角色，可以选择指定用户 ID 类型等。

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 | 示例值 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| roles | <a href="#HasRoleRolesDto">HasRoleRolesDto[]</a> | 是 | - | 角色列表。   |  |
| userId | string | 是 | - | 用户唯一标志，可以是用户 ID、用户名、邮箱、手机号、外部 ID、在外部身份源的 ID。。   | `6229ffaxxxxxxxxcade3e3d9` |
| options | <a href="#HasAnyRoleOptionsDto">HasAnyRoleOptionsDto</a> | 否 | - | 可选参数。   |  |


## 示例代码

```php
<?php

require 'vendor/autoload.php';

use Authing\ManagementClient;

$management = new ManagementClient(
    "AUTHING_USERPOOL_ID",
    "AUTHING_USERPOOL_SECRET"
);

$data = $management->hasAnyRole(array(
      "userId" => "6229ffaxxxxxxxxcade3e3d9",
    "roles" => array(
      array(
            "namespace" => "default",
          "code" => "admin",
      
      )
    ),
    "options" => array(
          "userIdType" => "user_id",
    ),

));
```


## 请求响应

类型： `HasAnyRoleRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| data | <a href="#HasAnyRoleDto">HasAnyRoleDto</a> | 响应数据 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "data": {
    "hasAnyRole": true
  }
}
```

## 数据结构


### <a id="HasRoleRolesDto"></a> HasRoleRolesDto

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| namespace | string | 否 | 所属权限分组的 code。  |  `default` |
| code | string | 是 | 角色 code。  |  `admin` |


### <a id="HasAnyRoleOptionsDto"></a> HasAnyRoleOptionsDto

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| userIdType | string | 否 | 用户 ID 类型，默认值为 `user_id`，可选值为：<br>- `user_id`: Authing 用户 ID，如 `6319a1504f3xxxxf214dd5b7`<br>- `phone`: 用户手机号<br>- `email`: 用户邮箱<br>- `username`: 用户名<br>- `external_id`: 用户在外部系统的 ID，对应 Authing 用户信息的 `externalId` 字段<br>- `identity`: 用户的外部身份源信息，格式为 `<extIdpId>:<userIdInIdp>`，其中 `<extIdpId>` 为 Authing 身份源的 ID，`<userIdInIdp>` 为用户在外部身份源的 ID。<br>示例值：`62f20932716fbcc10d966ee5:ou_8bae746eac07cd2564654140d2a9ac61`。<br>。  | 可选枚举值：`user_id`,`external_id`,`phone`,`email`,`username`,`identity` |


### <a id="HasAnyRoleDto"></a> HasAnyRoleDto

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| hasAnyRole | boolean | 是 | 是否拥有其中某一个角色。  |  `true` |


