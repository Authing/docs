# 导入用户的 OTP

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

导入用户的 OTP

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 | 示例值 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| list | <a href="#ImportOtpItemDto">ImportOtpItemDto[]</a> | 是 | - | 参数列表。   |  |


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

    response := client.importOtp(
      dto.ImportOtpReqDto {
        List: []ImportOtpItemDto{
                    dto.ImportOtpItemDto
                    {
                     UserId: "xxxx",
          Otp: dto.ImportOtpItemDataDto {
                          Secret: "HZ2F6J3AGNAVSOTV",
          RecoveryCode: "b471-8ec0-874a-087f-bccb-cd54",
        },
                }
                  },
    }
  )
}
```



## 请求响应

类型： `CommonResponseDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功"
}
```

## 数据结构


### <a id="ImportOtpItemDto"></a> ImportOtpItemDto

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| userId | string | 是 | 用户 ID。  |  `xxxx` |
| otp |  | 是 | OTP 数据。嵌套类型：<a href="#ImportOtpItemDataDto">ImportOtpItemDataDto</a>。  |  |


### <a id="ImportOtpItemDataDto"></a> ImportOtpItemDataDto

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| secret | string | 是 | OTP 密钥。  |  `HZ2F6J3AGNAVSOTV` |
| recoveryCode | string | 否 | OTP Recovery Code。  |  `b471-8ec0-874a-087f-bccb-cd54` |


