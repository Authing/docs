# 修改全局多因素认证配置

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

传入 MFA 认证因素列表进行修改

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 | 示例值 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| enabledFactors | array[] | 是 |  | 开启的 MFA 认证因素列表。   | `["SMS"]` |


## 示例代码

```py
from authing import ManagementClient

management_client = ManagementClient(
    access_key_id="AUTHING_USERPOOL_ID",
    access_key_secret="AUTHING_USERPOOL_SECRET",
)

data = management_client.update_global_mfa_settings(
     enabled_factors: ["SMS"],
  
)
```



## 请求响应

类型： `MFASettingsRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| data | <a href="#MFASettingsDto">MFASettingsDto</a> | 响应数据 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "data": {
    "enabledFactors": "[\"SMS\"]"
  }
}
```

## 数据结构


### <a id="MFASettingsDto"></a> MFASettingsDto

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| enabledFactors | array | 是 | 开启的 MFA 认证因素列表。  |  `["SMS"]` |


