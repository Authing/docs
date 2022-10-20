# 修改 Pipeline 函数顺序

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

修改 Pipeline 函数顺序

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 | 示例值 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| order | string[] | 是 | - | 新的排序方式，按照函数 ID 的先后顺序进行排列。。   | `[]` |
| scene | string | 是 | - | 函数的触发场景：
- `PRE_REGISTER`: 注册前
- `POST_REGISTER`: 注册后
- `PRE_AUTHENTICATION`: 认证前
- `POST_AUTHENTICATION`: 认证后
- `PRE_OIDC_ID_TOKEN_ISSUED`: OIDC ID Token 签发前
- `PRE_OIDC_ACCESS_TOKEN_ISSUED`: OIDC Access Token 签发前
- `PRE_COMPLETE_USER_INFO`: 补全用户信息前
    。  枚举值：`PRE_REGISTER`,`POST_REGISTER`,`PRE_AUTHENTICATION`,`POST_AUTHENTICATION`,`PRE_OIDC_ID_TOKEN_ISSUED`,`PRE_OIDC_ACCESS_TOKEN_ISSUED`,`PRE_COMPLETE_USER_INFO` | `PRE_REGISTER` |


## 示例代码

```php
<?php

require 'vendor/autoload.php';

use Authing\ManagementClient;

$management = new ManagementClient(
    "AUTHING_USERPOOL_ID",
    "AUTHING_USERPOOL_SECRET"
);

$data = $management->updatePipelineOrder(array(
      "scene" => "PRE_REGISTER",
    "order" => array(),

));
```


## 请求响应

类型： `CommonResponseDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| requestId | string | 请求 ID。当请求失败时会返回。 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "requestId": "934108e5-9fbf-4d24-8da1-c330328abd6c"
}
```

## 数据结构


