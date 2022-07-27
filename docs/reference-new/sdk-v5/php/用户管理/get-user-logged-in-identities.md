# 通过用户 ID，获取用户曾经登录过的身份源，可以选择指定用户 ID 类型等。

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

获取用户曾经登录过的身份源

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 | 示例值 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| userId | string  | 是 | - | 用户 ID。  | `6229ffaxxxxxxxxcade3e3d9` |
| userIdType | string  | 否 | user_id | 用户 ID 类型，可以指定为用户 ID、手机号、邮箱、用户名和 externalId。。 枚举值：`user_id`,`external_id`,`phone`,`email`,`username` | `user_id` |


## 示例代码

```php
<?php

require 'vendor/autoload.php';

use Authing\ManagementClient;

$management = new ManagementClient(
    "AUTHING_USERPOOL_ID",
    "AUTHING_USERPOOL_SECRET"
);

$data = $management->getUserLoggedInIdentities(array(
  
    "userId" => "6229ffaxxxxxxxxcade3e3d9",

    "userIdType" => "user_id",

));
```


## 请求响应

类型： `UserLoggedInIdentitiesRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| data | array | 响应数据 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "apiCode": 20001,
  "data": {
    "identityId": "62299d8b866d2dab79a89dc4",
    "idpName": "微信",
    "idpNameEn": "wechat",
    "idpLogo": "https://example.com/logo.png"
  }
}
```

## 数据结构


### <a id="UserLoggedInIdentitiesDto"></a> UserLoggedInIdentitiesDto

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| identityId | string | 是 | Identity ID。 示例值： `62299d8b866d2dab79a89dc4`  |
| idpName | string | 是 | 身份源名称。 示例值： `微信`  |
| idpNameEn | string | 是 | Identity provider name。 示例值： `wechat`  |
| idpLogo | string | 是 | 身份源 logo。 示例值： `https://example.com/logo.png`  |


