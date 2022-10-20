# 发起忘记密码请求

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

当用户忘记密码时，可以通过此端点找回密码。用户需要使用相关验证手段进行验证，目前支持**邮箱验证码**和**手机号验证码**两种验证手段。

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 | 示例值 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| verifyMethod | string | 是 | - | 忘记密码请求使用的验证手段：
- `EMAIL_PASSCODE`: 通过邮箱验证码进行验证，当前只支持这种验证方式。
    。  枚举值：`EMAIL_PASSCODE`,`PHONE_PASSCODE` | `EMAIL_PASSCODE` |
| phonePassCodePayload | <a href="#ResetPasswordByPhonePassCodeDto">ResetPasswordByPhonePassCodeDto</a> | 否 | - | 使用手机号验证码验证的数据。   |  |
| emailPassCodePayload | <a href="#ResetPasswordByEmailPassCodeDto">ResetPasswordByEmailPassCodeDto</a> | 否 | - | 使用邮箱验证码验证的数据。   |  |


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

    response := client.verifyResetPasswordRequest(
      dto.VerifyResetPasswordRequestDto {
          VerifyMethod: VerifyResetPasswordRequestDto.verifyMethod.EMAIL_PASSCODE,
        PhonePassCodePayload: dto.ResetPasswordByPhonePassCodeDto {
                          PhoneNumber: "188xxxx8888",
          PassCode: "123456",
          PhoneCountryCode: "+86",
        },
        EmailPassCodePayload: dto.ResetPasswordByEmailPassCodeDto {
                          Email: "undefined",
          PassCode: "undefined",
        },
    }
  )
}
```



## 请求响应

类型： `PasswordResetVerifyResp`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| requestId | string | 请求 ID。当请求失败时会返回。 |
| data | <a href="#ResetPasswordVerify">ResetPasswordVerify</a> | 响应数据 |



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


### <a id="ResetPasswordByPhonePassCodeDto"></a> ResetPasswordByPhonePassCodeDto

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| phoneNumber | string | 是 | 此账号绑定的手机号，不带区号。如果是国外手机号，请在 phoneCountryCode 参数中指定区号。。  |  `188xxxx8888` |
| passCode | string | 是 | 短信验证码，一个短信验证码只能使用一次，有效时间为一分钟。你需要通过**发送短信**接口获取。。  |  `123456` |
| phoneCountryCode | string | 否 | 手机区号，中国大陆手机号可不填。Authing 短信服务暂不内置支持国际手机号，你需要在 Authing 控制台配置对应的国际短信服务。完整的手机区号列表可参阅 https://en.wikipedia.org/wiki/List_of_country_calling_codes。。  |  `+86` |


### <a id="ResetPasswordByEmailPassCodeDto"></a> ResetPasswordByEmailPassCodeDto

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| email | string | 否 | 此账号绑定的邮箱，不区分大小写。。  |  |
| passCode | string | 是 | 邮箱验证码，一个短信验证码只能使用一次，默认有效时间为无分钟。你需要通过**发送邮件**接口获取。。  |  |


### <a id="ResetPasswordVerify"></a> ResetPasswordVerify

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| passwordResetToken | string | 是 | 用于重置密码 token。  |  |
| tokenExpiresIn | number | 是 | 过期时间。  |  |


