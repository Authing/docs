# 获取应用简单信息列表

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

获取应用简单信息列表

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 | 示例值 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| page | number  | 否 | 1 | 当前页数，从 1 开始。  | `1` |
| limit | number  | 否 | 10 | 每页数目，最大不能超过 50，默认为 10。  | `10` |
| isIntegrateApp | boolean  | 否 | - | 是否为集成应用。  |  |
| isSelfBuiltApp | boolean  | 否 | - | 是否为自建应用。  |  |
| ssoEnabled | boolean  | 否 | - | 是否开启单点登录。  |  |
| keyword | boolean  | 否 | - | 模糊搜索字符串。  | `test` |


## 示例代码

```php
<?php

require 'vendor/autoload.php';

use Authing\ManagementClient;

$management = new ManagementClient(
    "AUTHING_USERPOOL_ID",
    "AUTHING_USERPOOL_SECRET"
);

$data = $management->listApplicationSimpleInfo(array(
  
    "page" => 1,

    "limit" => 10,

    "isIntegrateApp" => false,

    "isSelfBuiltApp" => false,

    "ssoEnabled" => false,

    "keyword" => test,

));
```


## 请求响应

类型： `ApplicationSimpleInfoSingleRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| data | <a href="#ApplicationSimpleInfoDto">ApplicationSimpleInfoDto</a> | 响应数据 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "data": {
    "appId": "62eaa95fe0xxxx9a5295bf7c",
    "appIdentifier": "example",
    "appName": "示例应用",
    "appLogo": "示例应用",
    "appDescription": "示例描述信息",
    "appType": "web"
  }
}
```

## 数据结构


### <a id="ApplicationSimpleInfoDto"></a> ApplicationSimpleInfoDto

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| appId | string | 是 | 应用 ID。  |  `62eaa95fe0xxxx9a5295bf7c` |
| appIdentifier | string | 是 | 应用唯一标志。  |  `example` |
| appName | string | 是 | 应用名称。  |  `示例应用` |
| appLogo | string | 是 | 应用 Logo 链接。  |  `示例应用` |
| appDescription | string | 否 | 应用描述信息。  |  `示例描述信息` |
| appType | string | 是 | 应用类型。  | 可选枚举值：`web`,`spa`,`native`,`api` |
| isIntegrateApp | boolean | 是 | 是否为集成应用。  |  |


