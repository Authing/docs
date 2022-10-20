# 获取用户授权的应用

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

通过用户 ID，获取用户授权的应用，可以选择指定用户 ID 类型等。

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 | 示例值 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| userId | string  | 是 | - | 用户唯一标志，可以是用户 ID、用户名、邮箱、手机号、外部 ID、在外部身份源的 ID。。  | `6229ffaxxxxxxxxcade3e3d9` |
| userIdType | string  | 否 | user_id | 用户 ID 类型，默认值为 `user_id`，可选值为：
- `user_id`: Authing 用户 ID，如 `6319a1504f3xxxxf214dd5b7`
- `phone`: 用户手机号
- `email`: 用户邮箱
- `username`: 用户名
- `external_id`: 用户在外部系统的 ID，对应 Authing 用户信息的 `externalId` 字段
- `identity`: 用户的外部身份源信息，格式为 `<extIdpId>:<userIdInIdp>`，其中 `<extIdpId>` 为 Authing 身份源的 ID，`<userIdInIdp>` 为用户在外部身份源的 ID。
示例值：`62f20932716fbcc10d966ee5:ou_8bae746eac07cd2564654140d2a9ac61`。
。 枚举值：`user_id`,`external_id`,`phone`,`email`,`username`,`identity` | `user_id` |


## 示例代码

```py
from authing import ManagementClient

management_client = ManagementClient(
    access_key_id="AUTHING_USERPOOL_ID",
    access_key_secret="AUTHING_USERPOOL_SECRET",
)

data = management_client.get_user_authorized_apps(
  
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

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| appId | string | 是 | App ID。  |  `app1` |
| appName | string | 是 | App 名称。  |  `App Name` |
| appLogo | string | 是 | App Logo。  |  `https://example.com/logo.png` |
| appLoginUrl | string | 是 | App 登录地址。  |  `https://example.com/login` |
| appDefaultLoginStrategy | string | 是 | App 默认的登录策略。  | 可选枚举值：`ALLOW_ALL`,`DENY_ALL` |


