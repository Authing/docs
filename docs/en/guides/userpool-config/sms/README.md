---
meta:
  - name: description
    content: Configure SMS Service
---

# Configure SMS Service

SMS verification allows users to log in using a one-time password sent to their mobile phone as a text message. Approw uses the SMS service provided by the platform by default. At the same time, we also support the configuration of custom Chuanglan SMS and Alibaba Cloud SMS.

## Use default SMS service

- The default SMS service template is: "verification code ${1}, the verification code is valid within ${2} minutes, please do not disclose it to others."
- The verification code is valid for 5 minutes.
- The SMS interface QPS is 100.
- It is recommended to use small login on the web side(opens new window)Get a mobile phone number for free.
## Configure user-defined SMS service provider

We currently support the following SMS service providers:
- Alibaba Cloud SMS Service
- Chuanglan 253 SMS Service

Choose SMS service provider Ali Cloud

<StackSelector snippet="config-sms-provider" selectLabel="选择短信服务商" :order="['aliyun', '253']"/>
