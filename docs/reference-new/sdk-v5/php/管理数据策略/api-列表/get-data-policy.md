# 获取数据策略详情

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

通过数据策略 ID 获取对应数据策略的详细信息,包含数据策略名称、描述等基本信息。

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 | 示例值 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| policyId | string  | 是 | - | 数据策略 ID。  | `60b49XXXXXXXXXXXX6e68` |


## 示例代码

```php
<?php

require 'vendor/autoload.php';

use Authing\ManagementClient;

$management = new ManagementClient(
    "AUTHING_USERPOOL_ID",
    "AUTHING_USERPOOL_SECRET"
);

$data = $management->getDataPolicy(array(
  
    "policyId" => "60b49XXXXXXXXXXXX6e68",

));
```


## 请求响应

类型： `GetDataPolicyResponseDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| data | <a href="#GetDataPolicyRespDto">GetDataPolicyRespDto</a> | 数据 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "data": {
    "policyId": "60b49XXXXXXXXXXXX6e68",
    "policyName": "数据资源",
    "description": "这个是一个示例数据策略源",
    "createdAt": "2022-07-03T02:20:30.000Z",
    "updatedAt": "2022-07-03T02:20:30.000Z",
    "dataPermissionList": {
      "policyName": "数据资源",
      "description": "这个是一个示例数据策略源",
      "dataPermissionList": {
        "resourceId": "6301ceaad4677b9255f27478",
        "resourceName": "资源1"
      }
    }
  }
}
```

## 数据结构


### <a id="GetDataPolicyRespDto"></a> GetDataPolicyRespDto

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| policyId | string | 是 | 数据策略 ID。 示例值： `60b49XXXXXXXXXXXX6e68`  |
| policyName | string | 是 | 数据策略名称应用内唯一,限长 50 字符。 示例值： `数据资源`  |
| description | string | 是 | 数据策略描述， 限长 200 字符。 示例值： `这个是一个示例数据策略源`  |
| createdAt | string | 是 | 数据策略创建时间。 示例值： `2022-07-03T02:20:30.000Z`  |
| updatedAt | string | 是 | 数据策略更新时间。 示例值： `2022-07-03T02:20:30.000Z`  |
| dataPermissionList | array | 是 | 数据权限列表，每个策略下所有的数据资源。嵌套类型：<a href="#DataPolicySimpleRespDto">DataPolicySimpleRespDto</a>。   |


### <a id="DataPolicySimpleRespDto"></a> DataPolicySimpleRespDto

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| policyName | string | 是 | 数据策略名称应用内唯一,限长 50 字符。 示例值： `数据资源`  |
| description | string | 是 | 数据策略描述， 限长 200 字符。 示例值： `这个是一个示例数据策略源`  |
| dataPermissionList | array | 是 | 数据权限列表，每个策略下所有的数据资源。嵌套类型：<a href="#DataResourceSimpleRespDto">DataResourceSimpleRespDto</a>。   |


### <a id="DataResourceSimpleRespDto"></a> DataResourceSimpleRespDto

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| resourceId | string | 是 | 数据权限所属的数据资源 id。 示例值： `6301ceaad4677b9255f27478`  |
| resourceName | string | 是 | 数据权限所属的数据资源名称。 示例值： `资源1`  |


