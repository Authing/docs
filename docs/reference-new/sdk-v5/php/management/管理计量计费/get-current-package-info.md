# 获取套餐详情

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

获取当前用户池套餐详情。

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

$data = $management->getCurrentPackageInfo(array(
  
));
```


## 请求响应

类型： `CostGetCurrentPackageRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| requestId | string | 请求 ID。当请求失败时会返回。 |
| data | <a href="#CostCurrentPackageInfo">CostCurrentPackageInfo</a> | 响应数据 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "requestId": "934108e5-9fbf-4d24-8da1-c330328abd6c",
  "data": {
    "code": "V4_B2C_Enterprise:1000",
    "endTime": "2022-09-09 00:00:00",
    "overdueDays": "0",
    "goodsPackage": "套餐包信息"
  }
}
```

## 数据结构


### <a id="CostCurrentPackageInfo"></a> CostCurrentPackageInfo

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| code | string | 是 | 套餐包编码。  |  `V4_B2C_Enterprise:1000` |
| endTime | string | 是 | 套餐结束时间。  |  `2022-09-09 00:00:00` |
| overdueDays | string | 是 | 套餐逾期天数。  |  `0` |
| goodsPackage |  | 是 | 套餐包信息。嵌套类型：<a href="#GoodsPackageDto">GoodsPackageDto</a>。  |  `套餐包信息` |


### <a id="GoodsPackageDto"></a> GoodsPackageDto

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| name | string | 是 | 套餐包名称 name。  |  `测试套餐包` |
| nameEn | string | 是 | 套餐包名称 nameEn。  |  `test package` |
| unitPrice | string | 是 | 套餐包单价。  |  `99.00` |
| code | string | 是 | 套餐包编码 code。  |  `V4_B2C_Enterprise:1000` |
| group | string | 是 | 套餐包版本。  |  `Enterprise` |
| sceneCode | string | 是 | 套餐包场景编码。  |  `B2C` |
| amount | string | 是 | 套餐包 MAU 数量。  |  `1000` |


