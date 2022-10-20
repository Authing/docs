# 获取绑定的某个 MFA 认证要素

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

根据 Factor ID 获取用户绑定的某个 MFA Factor 详情。

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 | 示例值 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| factorId | string  | 是 | - | MFA Factor ID。  | `6229ffaxxxxxxxxcade3e3d9` |


## 示例代码

```py
from authing import ManagementClient

management_client = ManagementClient(
    access_key_id="AUTHING_USERPOOL_ID",
    access_key_secret="AUTHING_USERPOOL_SECRET",
)

data = management_client.get_factor(
  
      factor_id: "6229ffaxxxxxxxxcade3e3d9",
  
)
```



## 请求响应

类型： `GetFactorRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| requestId | string | 请求 ID。当请求失败时会返回。 |
| data | <a href="#FactorDto">FactorDto</a> | MFA Factor 详情 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "requestId": "934108e5-9fbf-4d24-8da1-c330328abd6c",
  "data": {
    "factorId": "6229ffaxxxxxxxxcade3e3d9",
    "factorType": "SMS",
    "profile": {
      "phoneNumber": "188xxxx8888",
      "phoneCountryCode": "+86"
    }
  }
}
```

## 数据结构


### <a id="FactorDto"></a> FactorDto

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| factorId | string | 是 | MFA 认证要素ID。  |  `6229ffaxxxxxxxxcade3e3d9` |
| factorType | string | 是 | MFA 认证要素类型。  | 可选枚举值：`OTP`,`SMS`,`EMAIL`,`FACE` |
| profile | object | 是 | MFA 认证要素信息。  |  `{"phoneNumber":"188xxxx8888","phoneCountryCode":"+86"}` |


