# 创建分组

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

创建分组，一个分组必须包含一个用户池全局唯一的标志符（code），此标志符必须为一个合法的英文标志符，如 developers；以及分组名称

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 |
| ---- | ---- | ---- | ---- | ---- |
| code | string | 是 |  | 分组 code。 示例值： `developer` |
| name | string | 是 |  | 分组名称。 示例值： `开发者` |
| description | string | 是 |  | 分组描述。 示例值： `描述内容` |


## 示例代码

```php
<?php

require 'vendor/autoload.php';

use Authing\ManagementClient;

$management = new ManagementClient(
    "AUTHING_USERPOOL_ID",
    "AUTHING_USERPOOL_SECRET"
);

$data = $management->createGroup(array(
      "code" => "developer",
    "name" => "开发者",
    "description" => "描述内容",

));
```


## 请求响应

类型： `GroupSingleRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| data | <a href="#GroupDto">GroupDto</a> | 响应数据 |



示例结果：

```js
{
  "statusCode": 200,
  "message": "操作成功",
  "apiCode": 20001,
  "data": {
    "code": "developer",
    "name": "开发者",
    "description": "描述内容"
  }
}
```

## 数据结构


### <a id="GroupDto"></a> GroupDto

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| code | string | 是 | 分组 code。 示例值： `developer`  |
| name | string | 是 | 分组名称。 示例值： `开发者`  |
| description | string | 是 | 分组描述。 示例值： `描述内容`  |


