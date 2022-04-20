---
meta:
  - name: description
    content: 应用场景
---

# 应用场景

<LastUpdated/>


::: hint-success
Pipeline 能够让开发者在认证过程中执行自定义代码，实现 Webhook 通知、扩展用户字段、访问控制等能力。如果你有好的 Idea 和应用场景，欢迎为我们[补充模版](https://github.com/authing/pipeline/blob/master/CONTRIBUTING.md)。
:::

## Webhook 通知

* [飞书群通知](https://github.com/Authing/pipeline/blob/master/src/templates/lark-notify.js)
* [Slack 群通知](https://github.com/Authing/pipeline/blob/master/src/templates/slack-notify.js)
* [钉钉群通知](https://github.com/Authing/pipeline/blob/master/src/templates/dingtalk-notify.js)

## 扩展用户字段

* [添加用户自定义字段](https://github.com/Authing/pipeline/blob/master/src/templates/persist-metadata.js)
* [修改默认头像](https://github.com/Authing/pipeline/blob/master/src/templates/change-default-avatar.js)
* [每次用户登录时将最新位置写入其 MetaData](https://github.com/Authing/pipeline/blob/master/src/templates/add-location-to-metadata.js)
* [使用 ui-avatars API 动态生成头像](https://github.com/Authing/pipeline/blob/master/src/templates/change-avatar-to-ui-avatars.js)
* [补充用户地理位置信息字段]( https://github.com/Authing/pipeline/blob/master/src/templates/fill-user-address-field.js)
* [通过 GitHub API 获取用户 repo 列表](https://github.com/Authing/pipeline/blob/master/src/templates/get-repos-from-github-api.js)

## 访问控制

* [注册邮箱后缀白名单](https://github.com/Authing/pipeline/blob/master/src/templates/email-domain-whitelist.js)
* [通过 API 动态加载白名单](https://github.com/Authing/pipeline/blob/master/src/templates/load-whitelist-on-cloud.js)
* [强制邮箱验证之后才能登录](https://github.com/Authing/pipeline/blob/master/src/templates/force-email-verified.js)
* [强制手机号验证之后才能登录](https://github.com/Authing/pipeline/blob/master/src/templates/force-phone-verifyed.js)
* [注册 IP 段白名单](https://github.com/Authing/pipeline/blob/master/src/templates/ip-range-whitelist.js)
* [根据 IP 风险评分屏蔽用户](https://github.com/Authing/pipeline/blob/master/src/templates/ip-risk-analysis.js)
* [注册手机号白名单](https://github.com/Authing/pipeline/blob/master/src/templates/phone-whitelist.js)
* [禁止特定方式注册/登录](https://github.com/Authing/pipeline/blob/master/src/templates/block-specific-connection.js)
* [每周日凌晨 3-6 点系统维护禁止注册/登录](https://github.com/Authing/pipeline/blob/master/src/templates/block-on-weekend.js)

## OIDC 认证流程

* [添加自定义 ID Token 字段](https://github.com/Authing/pipeline/blob/master/src/templates/add-custom-idtoken.js)
* [添加自定义 Access Token 字段](https://github.com/Authing/pipeline/blob/master/src/templates/add-custom-accesstoken.js)
