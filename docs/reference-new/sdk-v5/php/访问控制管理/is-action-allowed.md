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

| 名称 | 类型 | 必填 | 默认值 | 描述 | 示例值 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| action | string | 是 | - | 资源对应的操作。   | `ecs:Start` |
| resource | string | 是 | - | 资源标识符。   | `ecs:1` |
| userId | string | 是 | - | 用户 ID。   | `userId1` |
| namespace | string | 否 | - | 所属权限分组的 code。   | `default` |


## 示例代码

```php
<?php

require 'vendor/autoload.php';

use Authing\ManagementClient;

$management = new ManagementClient(
    "AUTHING_USERPOOL_ID",
    "AUTHING_USERPOOL_SECRET"
);

$data = $management->isActionAllowed(array(
      "namespace" => "default",
    "userId" => "userId1",
    "resource" => "ecs:1",
    "action" => "ecs:Start",

));
```


## 请求响应

类型： `IsActionAllowedRespDtp`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| data | <a href="#IsActionAllowedDataDto">IsActionAllowedDataDto</a> | 返回数据 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "apiCode": 20001,
  "data": {
    "allowed": true
  }
}
```

## 数据结构


### <a id="IsActionAllowedDataDto"></a> IsActionAllowedDataDto

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| allowed | boolean | 是 | 是否允许。 示例值： `true`  |


