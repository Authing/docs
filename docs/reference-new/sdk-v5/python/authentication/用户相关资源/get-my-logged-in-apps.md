# 获取登录应用

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

获取登录应用

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 | 示例值 |
| ---- | ---- | ---- | ---- | ---- | ---- |


## 示例代码

```py
from authing import ManagementClient

management_client = ManagementClient(
    access_key_id="AUTHING_USERPOOL_ID",
    access_key_secret="AUTHING_USERPOOL_SECRET",
)

data = management_client.get_my_logged_in_apps(
  
)
```



## 请求响应

类型： `GetLoggedInAppsRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| requestId | string | 请求 ID。当请求失败时会返回。 |
| data | array | 响应数据 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "requestId": "934108e5-9fbf-4d24-8da1-c330328abd6c",
  "data": {
    "appId": "xxx",
    "appName": "示例应用",
    "appLoginUrl": "https://example.authing.cn/login",
    "appLogo": "https://files.authing.co/authing-console/default-app-logo.png",
    "active": true
  }
}
```

## 数据结构


### <a id="LoggedInAppsDto"></a> LoggedInAppsDto

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| appId | string | 是 | 应用 ID。  |  `xxx` |
| appName | string | 是 | 应用名称。  |  `示例应用` |
| appLoginUrl | string | 是 | 应用登录地址。  |  `https://example.authing.cn/login` |
| appLogo | string | 是 | 应用 Logo。  |  `https://files.authing.co/authing-console/default-app-logo.png` |
| active | boolean | 是 | 当前是否处于登录态。  |  `true` |


