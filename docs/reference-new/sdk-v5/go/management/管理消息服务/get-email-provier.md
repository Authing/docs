# 获取第三方邮件服务配置

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

获取第三方邮件服务配置

## 请求参数

| 名称 | 类型 | 必填 | 默认值 | 描述 | 示例值 |
| ---- | ---- | ---- | ---- | ---- | ---- |


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

    response := client.getEmailProvier(
    
    
  )
}
```



## 请求响应

类型： `EmailProviderDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| enabled | boolean | 是否启用，如果不启用，将默认使用 Authing 内置的邮件服务 |
| type | string | 第三方邮件服务商类型:
- `smtp`: 标准 SMTP 邮件服务
- `ali`: [阿里企业邮箱](https://www.ali-exmail.cn/Land/)
- `tencent`: [腾讯企业邮箱](https://work.weixin.qq.com/mail/)
- `sendgrid`: [SendGrid 邮件服务](https://sendgrid.com/)
     |
| smtpConfig | <a href="#SMTPEmailProviderConfig">SMTPEmailProviderConfig</a> | SMTP 邮件服务配置 |
| sendGridConfig | <a href="#SendGridEmailProviderConfig">SendGridEmailProviderConfig</a> | SendGrid 邮件服务配置 |
| aliExmailConfig | <a href="#AliExmailEmailProviderConfig">AliExmailEmailProviderConfig</a> | 阿里企业邮件服务配置 |
| tencentExmailConfig | <a href="#TencentExmailEmailProviderConfig">TencentExmailEmailProviderConfig</a> | 腾讯企业邮件服务配置 |



示例结果：

```json
{
  "enabled": true,
  "type": "smtp",
  "smtpConfig": {
    "smtpHost": "smtp.example.com",
    "smtpPort": 465,
    "sender": "test",
    "senderPass": "passw0rd",
    "enableSSL": true
  },
  "sendGridConfig": {
    "sender": "test",
    "apikey": "xxxxxxxxxx"
  },
  "aliExmailConfig": {
    "sender": "test",
    "senderPass": "passw0rd"
  },
  "tencentExmailConfig": {
    "sender": "test",
    "senderPass": "passw0rd"
  }
}
```

## 数据结构


### <a id="SMTPEmailProviderConfig"></a> SMTPEmailProviderConfig

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| smtpHost | string | 是 | SMTP 地址。  |  `smtp.example.com` |
| smtpPort | number | 是 | SMTP 端口。  |  `465` |
| sender | string | 是 | 用户名。  |  `test` |
| senderPass | string | 是 | 密码。  |  `passw0rd` |
| enableSSL | boolean | 是 | 是否启用 SSL。  |  `true` |


### <a id="SendGridEmailProviderConfig"></a> SendGridEmailProviderConfig

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| sender | string | 是 | 用户名。  |  `test` |
| apikey | string | 是 | SendGrid API Key，详情请见 [SendGrid 文档](https://docs.sendgrid.com/ui/account-and-settings/api-keys)。。  |  `xxxxxxxxxx` |


### <a id="AliExmailEmailProviderConfig"></a> AliExmailEmailProviderConfig

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| sender | string | 是 | 用户名。  |  `test` |
| senderPass | string | 是 | 密码。  |  `passw0rd` |


### <a id="TencentExmailEmailProviderConfig"></a> TencentExmailEmailProviderConfig

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| sender | string | 是 | 用户名。  |  `test` |
| senderPass | string | 是 | 密码。  |  `passw0rd` |


