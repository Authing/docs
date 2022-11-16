你可以在控制台的 **设置->消息服务** 配置 [腾讯云短信服务](https://cloud.tencent.com/login?s_url=https%3A%2F%2Fconsole.cloud.tencent.com%2Fsmsv2)：

> 腾讯云短信服务官方文档请见 [腾讯云短信服务：API 参考](https://cloud.tencent.com/login?s_url=https%3A%2F%2Fconsole.cloud.tencent.com%2Fsmsv2)。

- **SecretId**、**SecretKey**：查询「https://console.cloud.tencent.com/cam/capi」。

- **SecretID**：用于标识 API 调用者的身份。​

- **SecretKey**：该密钥用于加密签名字符串和服务器端验证签名字符串。

- **SmsSdkAppId**：短信应用 ID，是在「短信控制台」添加应用后生成的实际 **SmsSdkAppId**，示例如「1400006666」。</br>可前往 [短信控制台](https://console.cloud.tencent.com/smsv2/app-manage) 查看 **应用 ID**​。

- **短信签名内容**: 使用 UTF-8 编码，必须填写已审核通过的签名。</br>可前往 [国内短信](https://console.cloud.tencent.com/smsv2/csms-sign) 或 [国际 / 港澳台短信](https://console.cloud.tencent.com/smsv2/isms-sign) 的 **签名管理** 查看​签名信息。

- **模板 ID**: 必须填写已审核通过的模板 ID。</br>可前往 [国内短信](https://console.cloud.tencent.com/smsv2/csms-template) 或 [国际/港澳台短信](https://console.cloud.tencent.com/smsv2/isms-template) 的 **正文模板管理** 查看模板 ID。