# 发起修改邮箱的验证请求

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

终端用户自主修改邮箱时，需要提供相应的验证手段。此接口用于验证用户的修改邮箱请求是否合法。当前支持通过**邮箱验证码**的方式进行验证，你需要先调用发送邮件接口发送对应的邮件验证码。

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 | 示例值 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| emailPasscodePayload | <a href="#UpdateEmailByEmailPassCodeDto">UpdateEmailByEmailPassCodeDto</a> | 是 | - | 使用邮箱验证码方式验证的数据。   |  |
| verifyMethod | string | 是 | - | 修改当前邮箱使用的验证手段：
- `EMAIL_PASSCODE`: 通过邮箱验证码进行验证，当前只支持这种验证方式。
    。  枚举值：`EMAIL_PASSCODE` | `EMAIL_PASSCODE` |


## 示例代码

```go
package main

import (
    "github.com/Authing/authing-golang-sdk/management"
    "github.com/Authing/authing-golang-sdk/dto"

    "fmt"
)

func main() {
    options := management.ClientOptions {
        AccessKeyId:     "AUTHING_USERPOOL_ID",
        AccessKeySecret: "AUTHING_USERPOOL_SECRET",
    }

    client, err := management.NewClient(&options)
    if err != nil {
        // The exception needs to be handled by the developer.
    }

    response := client.verifyUpdateEmailRequest(
      dto.VerifyUpdateEmailRequestDto {
          VerifyMethod: VerifyUpdateEmailRequestDto.verifyMethod.EMAIL_PASSCODE,
        EmailPasscodePayload: dto.UpdateEmailByEmailPassCodeDto {
                          NewEmail: "new@example.com",
          NewEmailPassCode: "123456",
          OldEmail: "old@example.com",
          OldEmailPassCode: "123456",
        },
    }
  )
}
```



## 请求响应

类型： `VerifyUpdateEmailRequestRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| requestId | string | 请求 ID。当请求失败时会返回。 |
| data | <a href="#VerifyUpdateEmailRequestData">VerifyUpdateEmailRequestData</a> | 响应数据 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "requestId": "934108e5-9fbf-4d24-8da1-c330328abd6c",
  "data": {
    "tokenExpiresIn": 60
  }
}
```

## 数据结构


### <a id="UpdateEmailByEmailPassCodeDto"></a> UpdateEmailByEmailPassCodeDto

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| newEmail | string | 是 | 新邮箱。  |  `new@example.com` |
| newEmailPassCode | string | 是 | 新邮箱验证码。  |  `123456` |
| oldEmail | string | 否 | 旧邮箱，如果用户池开启了修改邮箱需要验证之前的邮箱，此参数必填。。  |  `old@example.com` |
| oldEmailPassCode | string | 否 | 旧邮箱验证码，如果用户池开启了修改邮箱需要验证之前的邮箱，此参数必填。。  |  `123456` |


### <a id="VerifyUpdateEmailRequestData"></a> VerifyUpdateEmailRequestData

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| updateEmailToken | string | 是 | 用于修改当前邮箱的 token，你需要使用此 token 调用**修改邮箱**接口。。  |  |
| tokenExpiresIn | number | 是 | Token 有效时间，时间为 60 秒。。  |  `60` |


