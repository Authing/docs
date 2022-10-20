# 获取用量详情

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

获取当前用户池用量详情。

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 | 示例值 |
| ---- | ---- | ---- | ---- | ---- | ---- |


## 示例代码

```php
<?php

require 'vendor/autoload.php';

use Authing\ManagementClient;

$management = new ManagementClient(
    "AUTHING_USERPOOL_ID",
    "AUTHING_USERPOOL_SECRET"
);

$data = $management->getUsageInfo(array(
  
));
```


## 请求响应

类型： `CostGetCurrentUsageRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| requestId | string | 请求 ID。当请求失败时会返回。 |
| data | <a href="#CurrentUsageRespDto">CurrentUsageRespDto</a> | 响应数据 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "requestId": "934108e5-9fbf-4d24-8da1-c330328abd6c",
  "data": {
    "usages": {
      "amount": "0",
      "current": "0",
      "experience": true,
      "modelCode": "SocialConnections",
      "modelName": "SocialConnections：社交账号链接"
    }
  }
}
```

## 数据结构


### <a id="CurrentUsageRespDto"></a> CurrentUsageRespDto

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| usages | array | 是 | 当前用量实体。嵌套类型：<a href="#CurrentUsageDto">CurrentUsageDto</a>。  |  |


### <a id="CurrentUsageDto"></a> CurrentUsageDto

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| amount | string | 是 | 权益总量。  |  `0` |
| current | string | 是 | 权益当前使用量。  |  `0` |
| experience | boolean | 是 | 是否是体验期权益。  |  `true` |
| modelCode | string | 是 | 权益编码。  |  `SocialConnections` |
| modelName | string | 是 | 权益名称。  |  `SocialConnections：社交账号链接` |


