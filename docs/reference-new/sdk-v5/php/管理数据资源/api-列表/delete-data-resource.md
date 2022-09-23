# 删除数据资源

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

删除数据资源,通过数据资源 ID 进行删除

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 | 示例值 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| resourceId | string | 是 | - | 数据资源 Id,应用内唯一。   | `60b49eXXXXXXXXXXXXXXXXf26e68` |


## 示例代码

```php
<?php

require 'vendor/autoload.php';

use Authing\ManagementClient;

$management = new ManagementClient(
    "AUTHING_USERPOOL_ID",
    "AUTHING_USERPOOL_SECRET"
);

$data = $management->deleteDataResource(array(
      "resourceId" => "60b49eXXXXXXXXXXXXXXXXf26e68",

));
```


## 请求响应

类型： `CommonResponseDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功"
}
```

## 数据结构


