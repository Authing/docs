# 获取用户的登录历史记录

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

获取用户登录历史记录

## 请求参数

| 名称 | 位置 | 类型 | 必填 | 默认值 | 描述 |
| ---- | --- | ---- | ---- | ---- | ---- |
| userId | query | string  | \* |  | 用户 ID。 示例值： `6229ffaxxxxxxxxcade3e3d9` |
| appId | query | string  |  |  | 应用 ID。  |
| clientIp | query | string  |  |  | 客户端 IP。 示例值： `127.0.0.1` |
| start | query | number  |  |  | 开始时间戳（毫秒）。 示例值： `1647360000000` |
| end | query | number  |  |  | 结束时间戳（毫秒）。 示例值： `1648051199000` |
| page | query | number  |  | 1 | 当前页数，从 1 开始。 示例值： `1` |
| limit | query | number  |  | 10 | 每页数目，最大不能超过 50，默认为 10。 示例值： `10` |


## 示例代码

```py
from authing import ManagementClient

management_client = ManagementClient(
    access_key_id="AUTHING_USERPOOL_ID",
    access_key_secret="AUTHING_USERPOOL_SECRET",
)

data = management_client.get_user_login_history(
  
      user_id: "6229ffaxxxxxxxxcade3e3d9",
  
      app_id: "undefined",
  
      client_ip: "127.0.0.1",
  
      start: 1647360000000,
  
      end: 1648051199000,
  
      page: 1,
  
      limit: 10,
  
)
```



## 请求响应

类型： `UserLoginHistoryPaginatedRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| data | <a href="#UserLoginHistoryPagingDto">UserLoginHistoryPagingDto</a> | 响应数据 |



示例结果：

```js
{
  "statusCode": 200,
  "message": "操作成功",
  "apiCode": 20001,
  "data": {
    "list": {
      "appId": "app1",
      "appName": "App Name",
      "appLogo": "https://example.com/logo.png",
      "appLoginUrl": "https://example.com/login",
      "clientIp": "127.0.0.1",
      "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
    }
  }
}
```

## 数据结构


### <a id="UserLoginHistoryPagingDto"></a> UserLoginHistoryPagingDto

| 名称 | 类型 | 必填 |默认值| 描述 |
| ---- |  ---- | ---- | --- | ---- |
| totalCount | number | \* |  | 记录总数。   |
  | list | array | \* |  | 响应数据。   |
  

### <a id="UserLoginHistoryDto"></a> UserLoginHistoryDto

| 名称 | 类型 | 必填 |默认值| 描述 |
| ---- |  ---- | ---- | --- | ---- |
| appId | string | \* |  | App ID。 示例值： `app1`  |
  | appName | string | \* |  | App 名称。 示例值： `App Name`  |
  | appLogo | string | \* |  | App Logo。 示例值： `https://example.com/logo.png`  |
  | appLoginUrl | string | \* |  | App 登录地址。 示例值： `https://example.com/login`  |
  | clientIp | string | \* |  | 客户端 IP。 示例值： `127.0.0.1`  |
  | userAgent | string |  |  | 登录时使用的 user agent。 示例值： `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36`  |
  | time | string | \* |  | 登录时间。   |
  

