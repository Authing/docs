# 获取 Authing 服务器缓存的微信小程序、公众号 Access Token

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />



## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 | 示例值 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| appSecret | string | 是 | - | 微信小程序或微信公众号的 AppSecret。   |  |
| appId | string | 是 | - | 微信小程序或微信公众号的 AppId。   |  |


## 示例代码

```php
<?php

require 'vendor/autoload.php';

use Authing\ManagementClient;

$management = new ManagementClient(
    "AUTHING_USERPOOL_ID",
    "AUTHING_USERPOOL_SECRET"
);

$data = $management->getWechatAccessToken(array(
      "appId" => "",
    "appSecret" => "",

));
```


## 请求响应

类型： `GetWechatAccessTokenRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| requestId | string | 请求 ID。当请求失败时会返回。 |
| data | <a href="#GetWechatAccessTokenDataDto">GetWechatAccessTokenDataDto</a> | 响应数据 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "requestId": "934108e5-9fbf-4d24-8da1-c330328abd6c",
  "data": {}
}
```

## 数据结构


### <a id="GetWechatAccessTokenDataDto"></a> GetWechatAccessTokenDataDto

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| accessToken | string | 是 | Authing 服务器缓存的微信 Access Token。  |  |
| expiresAt | number | 是 | Access Token 到期时间，为单位为秒的时间戳。  |  |


