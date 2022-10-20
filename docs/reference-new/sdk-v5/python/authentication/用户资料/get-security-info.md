# 获取密码强度和账号安全等级评分

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

获取用户的密码强度和账号安全等级评分，需要在请求头中带上用户的 `access_token`。

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

data = management_client.get_security_info(
  
)
```



## 请求响应

类型： `GetSecurityInfoRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| requestId | string | 请求 ID。当请求失败时会返回。 |
| data | <a href="#GetSecurityInfoDto">GetSecurityInfoDto</a> | 响应数据 |



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


### <a id="GetSecurityInfoDto"></a> GetSecurityInfoDto

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| passwordSecurityLevel | number | 是 | 密码强度等级。  |  |
| mfaEnrolled | boolean | 是 | 是否绑定了 MFA。  |  |
| passwordSet | boolean | 是 | 是否设置了密码。  |  |
| emailBinded | boolean | 是 | 是否绑定了邮箱。  |  |
| phoneBinded | boolean | 是 | 是否绑定了手机号。  |  |
| securityScore | number | 是 | 账号等级评分。  |  |


