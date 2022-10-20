# 发送邮件

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

发送邮件时必须指定邮件 Channel，每个邮箱同一 Channel 在一分钟内只能发送一次。

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 | 示例值 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| channel | string | 是 | - | 短信通道，指定发送此短信的目的：
- `CHANNEL_LOGIN`: 用于用户登录
- `CHANNEL_REGISTER`: 用于用户注册
- `CHANNEL_RESET_PASSWORD`: 用于重置密码
- `CHANNEL_VERIFY_EMAIL_LINK`: 用于验证邮箱地址
- `CHANNEL_UPDATE_EMAIL`: 用于修改邮箱
- `CHANNEL_BIND_EMAIL`: 用于绑定邮箱
- `CHANNEL_UNBIND_EMAIL`: 用于解绑邮箱
- `CHANNEL_VERIFY_MFA`: 用于验证 MFA
- `CHANNEL_UNLOCK_ACCOUNT`: 用于自助解锁
- `CHANNEL_COMPLETE_EMAIL`: 用于注册/登录时补全邮箱信息   
- `CHANNEL_DELETE_ACCOUNT`: 用于注销账号
。  枚举值：`CHANNEL_LOGIN`,`CHANNEL_REGISTER`,`CHANNEL_RESET_PASSWORD`,`CHANNEL_VERIFY_EMAIL_LINK`,`CHANNEL_UPDATE_EMAIL`,`CHANNEL_BIND_EMAIL`,`CHANNEL_UNBIND_EMAIL`,`CHANNEL_VERIFY_MFA`,`CHANNEL_UNLOCK_ACCOUNT`,`CHANNEL_COMPLETE_EMAIL`,`CHANNEL_DELETE_ACCOUNT` | `CHANNEL_LOGIN` |
| email | string | 是 | - | 邮箱，不区分大小写。   | `test@example.com` |


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

    response := client.sendEmail(
      dto.SendEmailDto {
          Email: "test@example.com",
          Channel: SendEmailDto.channel.CHANNEL_LOGIN,
    }
  )
}
```



## 请求响应

类型： `SendEmailRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| requestId | string | 请求 ID。当请求失败时会返回。 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "requestId": "934108e5-9fbf-4d24-8da1-c330328abd6c"
}
```

## 数据结构


