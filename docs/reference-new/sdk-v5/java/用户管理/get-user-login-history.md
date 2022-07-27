# 获取用户的登录历史记录

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

通过用户 ID，获取用户登录历史记录，支持分页，可以选择指定用户 ID 类型、应用 ID、开始与结束时间戳等。

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 | 示例值 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| userId | string  | 是 | - | 用户 ID。  | `6229ffaxxxxxxxxcade3e3d9` |
| userIdType | string  | 否 | user_id | 用户 ID 类型，可以指定为用户 ID、手机号、邮箱、用户名和 externalId。。 枚举值：`user_id`,`external_id`,`phone`,`email`,`username` | `user_id` |
| appId | string  | 否 | - | 应用 ID。  |  |
| clientIp | string  | 否 | - | 客户端 IP。  | `127.0.0.1` |
| start | number  | 否 | - | 开始时间戳（毫秒）。  | `1647360000000` |
| end | number  | 否 | - | 结束时间戳（毫秒）。  | `1648051199000` |
| page | number  | 否 | 1 | 当前页数，从 1 开始。  | `1` |
| limit | number  | 否 | 10 | 每页数目，最大不能超过 50，默认为 10。  | `10` |


## 示例代码

```java
import cn.authing.sdk.java.dto.*;
import cn.authing.sdk.java.client.ManagementClient;
import cn.authing.sdk.java.model.ManagementClientOptions;

class ManagementClientTest {
    private static String ACCESS_KEY_ID = "AUTHING_USERPOOL_ID";
    private static String ACCESS_KEY_SECRET = "AUTHING_USERPOOL_SECRET";

    public static void main(String[] args) {
        ManagementClientOptions clientOptions = new ManagementClientOptions(ACCESS_KEY_ID, ACCESS_KEY_SECRET);
        ManagementClient managementClient = new ManagementClient(clientOptions);
    
        
         
        request.setUserId("6229ffaxxxxxxxxcade3e3d9"); 
        request.setUserIdType("user_id"); 
        request.setAppId("undefined"); 
        request.setClientIp("127.0.0.1"); 
        request.setStart(1647360000000); 
        request.setEnd(1648051199000); 
        request.setPage(1); 
        request.setLimit(10);
        UserLoginHistoryPaginatedRespDto response = managementClient.getUserLoginHistory(request);
        System.out.println(response);
    }
}
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

```json
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

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| totalCount | number | 是 | 记录总数。   |
| list | array | 是 | 响应数据。嵌套类型：<a href="#UserLoginHistoryDto">UserLoginHistoryDto</a>。   |


### <a id="UserLoginHistoryDto"></a> UserLoginHistoryDto

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| appId | string | 是 | App ID。 示例值： `app1`  |
| appName | string | 是 | App 名称。 示例值： `App Name`  |
| appLogo | string | 是 | App Logo。 示例值： `https://example.com/logo.png`  |
| appLoginUrl | string | 是 | App 登录地址。 示例值： `https://example.com/login`  |
| clientIp | string | 是 | 客户端 IP。 示例值： `127.0.0.1`  |
| userAgent | string | 否 | 登录时使用的 user agent。 示例值： `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36`  |
| time | string | 是 | 登录时间。   |


