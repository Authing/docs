# 获取身份源列表

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

获取身份源列表

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 |
| ---- | ---- | ---- | ---- | ---- |
| tenantId  string  | 否 |  | 租户 ID。 示例值： `60b49eb83fd80adb96f26e68` |


## 示例代码

```php
<?php

require 'vendor/autoload.php';

use Authing\ManagementClient;

$management = new ManagementClient(
    "AUTHING_USERPOOL_ID",
    "AUTHING_USERPOOL_SECRET"
);

$data = $management->listExtIdp(array(
  
    "tenantId" => "60b49eb83fd80adb96f26e68",

));
```


## 请求响应

类型： `ExtIdpListPaginatedRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| data | <a href="#ExtIdpListPagingDto">ExtIdpListPagingDto</a> | 数据 |



示例结果：

```js
{
  "statusCode": 200,
  "message": "操作成功",
  "apiCode": 20001,
  "data": {
    "list": {
      "id": "60b49eb83fd80adb96f26e68",
      "name": "default",
      "tenantId": "60b49eb83fd80adb96f26e68",
      "type": "wechat"
    }
  }
}
```

## 数据结构


### <a id="ExtIdpListPagingDto"></a> ExtIdpListPagingDto

| 名称 | 类型 | 必填 |默认值| 描述 |
| ---- |  ---- | ---- | --- | ---- |
| totalCount | number | 是 |  | 记录总数。   |
| list | array | 是 |  | 响应数据。嵌套类型：<a href="#ExtIdpDto">ExtIdpDto</a>。   |


### <a id="ExtIdpDto"></a> ExtIdpDto

| 名称 | 类型 | 必填 |默认值| 描述 |
| ---- |  ---- | ---- | --- | ---- |
| id | string | 是 |  | 身份源 id。 示例值： `60b49eb83fd80adb96f26e68`  |
| name | string | 是 |  | 身份源名称。 示例值： `default`  |
| tenantId | string | 否 |  | 租户 ID。 示例值： `60b49eb83fd80adb96f26e68`  |
| type | string | 是 |  | 身份源类型。 示例值： `wechat`  |


