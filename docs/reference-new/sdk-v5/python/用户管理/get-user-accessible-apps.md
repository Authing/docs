# 获取用户可访问的应用

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

获取用户可访问的应用

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 | 示例值 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| userId | string  | 是 | - | 用户 ID。  | `6229ffaxxxxxxxxcade3e3d9` |
| userIdType | string  | 否 | user_id | 用户 ID 类型，可以指定为用户 ID、手机号、邮箱、用户名和 externalId。。 枚举值：`user_id`,`external_id`,`phone`,`email`,`username` | `user_id` |


## 示例代码

```py
from authing import ManagementClient

management_client = ManagementClient(
    access_key_id="AUTHING_USERPOOL_ID",
    access_key_secret="AUTHING_USERPOOL_SECRET",
)

data = management_client.get_user_accessible_apps(
  
      user_id: "6229ffaxxxxxxxxcade3e3d9",
  
      user_id_type: "user_id",
  
)
```



## 请求响应

类型： `AppListRespDto`

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
    "appId": "app1",
    "appName": "App Name",
    "appLogo": "https://example.com/logo.png",
    "appLoginUrl": "https://example.com/login",
    "appDefaultLoginStrategy": "ALLOW_ALL"
  }
}
```

## 数据结构


### <a id="AppDto"></a> AppDto

| 名称 | 类型 | 必填 | 描述 |
| ---- |  ---- | ---- | ---- |
| appId | string | 是 | App ID。 示例值： `app1`  |
| appName | string | 是 | App 名称。 示例值： `App Name`  |
| appLogo | string | 是 | App Logo。 示例值： `https://example.com/logo.png`  |
| appLoginUrl | string | 是 | App 登录地址。 示例值： `https://example.com/login`  |
| appDefaultLoginStrategy | string | 是 | App 默认的登录策略。 枚举值：`ALLOW_ALL`,`DENY_ALL`  |


