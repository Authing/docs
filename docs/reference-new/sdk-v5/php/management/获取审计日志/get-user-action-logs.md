# 获取用户行为日志

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

可以选择请求 ID、客户端 IP、用户 ID、应用 ID、开始时间戳、请求是否成功、分页参数去获取用户行为日志

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 | 示例值 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| requestId | string | 否 | - | 请求 ID。   | `xxx` |
| clientIp | string | 否 | - | 客户端 IP。   | `xxx` |
| eventType | string | 否 | - | 事件类型。   | `login` |
| userId | string | 否 | - | 用户 ID。   | `xxx` |
| appId | string | 否 | - | 应用 ID。   | `xxx` |
| start | number | 否 | - | 开始时间戳。   | `11` |
| end | number | 否 | - | 结束时间戳。   | `111` |
| success | boolean | 否 | - | 请求是否成功。   | `true` |
| pagination | <a href="#ListWebhooksDto">ListWebhooksDto</a> | 否 | - | 分页。   |  |


## 示例代码

```php
<?php

require 'vendor/autoload.php';

use Authing\ManagementClient;

$management = new ManagementClient(
    "AUTHING_USERPOOL_ID",
    "AUTHING_USERPOOL_SECRET"
);

$data = $management->getUserActionLogs(array(
      "requestId" => "xxx",
    "clientIp" => "xxx",
    "eventType" => "login",
    "userId" => "xxx",
    "appId" => "xxx",
    "start" => 11,
    "end" => 111,
    "success" => true,
    "pagination" => array(
          "page" => 1,
        "limit" => 10,
    ),

));
```


## 请求响应

类型： `UserActionLogRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| requestId | string | 请求 ID。当请求失败时会返回。 |
| data | <a href="#UserActionLogRespData">UserActionLogRespData</a> | 响应数据 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "requestId": "934108e5-9fbf-4d24-8da1-c330328abd6c",
  "data": {
    "totalCount": 1,
    "list": {
      "userId": "xxx",
      "userAvatar": "https://files.authing.co/authing-console/default-app-logo.png",
      "userDisplayName": "张三",
      "userLoginsCount": 3,
      "appId": "xxx",
      "appName": "示例应用",
      "clientIp": "127.0.0.1",
      "eventType": "login",
      "eventDetail": "登录账户「 test@example.com 」",
      "success": true,
      "appLoginUrl": "https://example.authing.cn/login",
      "appLogo": "https://files.authing.co/authing-console/default-app-logo.png",
      "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36",
      "parsedUserAgent": {
        "device": "Desktop",
        "browser": "Chrome",
        "os": "Windows"
      },
      "geoip": {
        "location": {
          "lon": 116.3889,
          "lat": 39.9288
        },
        "country_name": "China",
        "country_code2": "CN",
        "country_code3": "CN",
        "region_name": "Beijing",
        "region_code": "BJ",
        "city_name": "Beijing",
        "continent_code": "AS",
        "timezone": "Asia/Shanghai"
      },
      "timestamp": "2022-09-20T08:55:00.188+0800",
      "requestId": "b63b9772-384c-4f2d-981b-01d1feed964d"
    }
  }
}
```

## 数据结构


### <a id="ListWebhooksDto"></a> ListWebhooksDto

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| page | number | 否 | 当前页数，从 1 开始。  |  `1` |
| limit | number | 否 | 每页数目，最大不能超过 50，默认为 10。  |  `10` |


### <a id="UserActionLogRespData"></a> UserActionLogRespData

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| totalCount | number | 是 | 记录总数。  |  `1` |
| list | array | 是 | 返回列表。嵌套类型：<a href="#UserActionLogDto">UserActionLogDto</a>。  |  |


### <a id="UserActionLogDto"></a> UserActionLogDto

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| userId | string | 是 | 用户 ID。  |  `xxx` |
| userAvatar | string | 是 | 用户头像。  |  `https://files.authing.co/authing-console/default-app-logo.png` |
| userDisplayName | string | 是 | 用户显示名称，按照以下用户字段顺序进行展示：nickname > username > name > givenName > familyName -> email -> phone -> id。  |  `张三` |
| userLoginsCount | number | 是 | 用户登录次数。  |  `3` |
| appId | string | 是 | 应用 ID。  |  `xxx` |
| appName | string | 是 | 应用名称。  |  `示例应用` |
| clientIp | string | 否 | 客户端 IP，可根据登录时的客户端 IP 进行筛选。默认不传获取所有登录 IP 的登录历史。。  |  `127.0.0.1` |
| eventType | string | 是 | 事件类型：<br>- `login`: 登录<br>- `logout`: 登出<br>- `register`: 注册<br>- `verifyMfa`: 验证 MFA<br>- `updateUserProfile`: 修改用户信息<br>- `updateUserPassword`: 修改密码<br>- `updateUserEmail`: 修改邮箱<br>- `updateUserPhone`: 修改手机号<br>- `bindMfa`: 绑定 MFA<br>- `bindEmail`: 绑定邮箱<br>- `bindPhone`: 绑定手机号<br>- `unbindPhone`: 解绑手机号<br>- `unbindEmail`: 解绑邮箱<br>- `unbindMFA`: 解绑 MFA<br>- `deleteAccount`: 注销账号<br>- `verifyFirstLogin`: 首次登录验证 <br>    。  | 可选枚举值：`login`,`logout`,`register`,`verifyMfa`,`updateUserPrefile`,`updateUserPassword`,`updateUserEmail`,`updateUserPhone`,`bindMfa`,`bindEmail`,`bindPhone`,`unbindPhone`,`unbindEmail`,`unbindMFA`,`refreshUserTokenBySelf`,`deleteAccount`,`verifyFirstLogin` |
| eventDetail | string | 否 | 事件详情。  |  `登录账户「 test@example.com 」` |
| success | boolean | 是 | 是否成功。  |  `true` |
| appLoginUrl | string | 是 | 应用登录地址。  |  `https://example.authing.cn/login` |
| appLogo | string | 是 | 应用 Logo。  |  `https://files.authing.co/authing-console/default-app-logo.png` |
| userAgent | string | 是 | User Agent。  |  `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36` |
| parsedUserAgent |  | 是 | 解析过后的 User Agent。嵌套类型：<a href="#ParsedUserAgent">ParsedUserAgent</a>。  |  |
| geoip |  | 是 | 地理位置。嵌套类型：<a href="#GeoIp">GeoIp</a>。  |  |
| timestamp | string | 是 | 时间。  |  `2022-09-20T08:55:00.188+0800` |
| requestId | string | 是 | 请求 ID。  |  `b63b9772-384c-4f2d-981b-01d1feed964d` |


### <a id="ParsedUserAgent"></a> ParsedUserAgent

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| device | string | 是 | 使用的设备类型。  |  `Desktop` |
| browser | string | 是 | 浏览器名称。  |  `Chrome` |
| os | string | 是 | 操作系统。  |  `Windows` |


### <a id="GeoIp"></a> GeoIp

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| location |  | 是 | 地理位置。嵌套类型：<a href="#GeoIpLocation">GeoIpLocation</a>。  |  |
| country_name | string | 是 | Country Name。  |  `China` |
| country_code2 | string | 是 | Country Code 2。  |  `CN` |
| country_code3 | string | 是 | Country Code 3。  |  `CN` |
| region_name | string | 是 | Region Name。  |  `Beijing` |
| region_code | string | 是 | Region Code。  |  `BJ` |
| city_name | string | 是 | 城市名称。  |  `Beijing` |
| continent_code | string | 是 | Continent Code。  |  `AS` |
| timezone | string | 是 | 时区。  |  `Asia/Shanghai` |


### <a id="GeoIpLocation"></a> GeoIpLocation

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| lon | number | 是 | 经度。  |  `116.3889` |
| lat | number | 是 | 纬度。  |  `39.9288` |


