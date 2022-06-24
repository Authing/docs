---
meta:
  - name: description
    content: 配置短信服务
---

# 配置短信服务

<LastUpdated/>

短信验证让用户能够使用以短信形式发送到其手机上的一次性密码登录。{{$localeConfig.brandName}} 默认使用平台提供的短信服务，同时我们也支持配置自定义**创蓝短信服务**和**阿里云短信服务**。

## 国内短信服务
### 使用默认短信服务

- 默认短信服务模版为：验证码 ${1}，该验证码 {S2} 分钟内有效，请勿泄漏与他人。
- 验证码有效时间为 5 分钟。
- 短信接口 QPS 为 100。
- 在网页端建议使用[小登录](https://authing.cn/verify/)免费获取手机号。

### 配置自定义短信服务商

我们目前支持以下短信服务商：

- 阿里云短信服务
- 创蓝 253 短信服务

<StackSelector snippet="config-sms-provider" selectLabel="选择短信服务商" :order="['aliyun', '253']"/>



## 国际短信服务

国际短信服务主要是支持海外手机号短信验证。

### 配置自定义国际短信服务商

我们目前支持以下国际短信服务商：

- 阿里云
- 阿里云国际

<StackSelector snippet="config-int-sms-provider" selectLabel="选择国际短信服务商" :order="['aliyun', 'aliyunInt']"/>
