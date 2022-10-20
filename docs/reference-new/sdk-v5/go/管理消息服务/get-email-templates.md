# 获取邮件模版列表

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

获取邮件模版列表

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

    response := client.getEmailTemplates(
    
    
  )
}
```



## 请求响应

类型： `GetEmailTemplatesRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| statusCode | number | 业务状态码，可以通过此状态码判断操作是否成功，200 表示成功。 |
| message | string | 描述信息 |
| apiCode | number | 细分错误码，可通过此错误码得到具体的错误类型。 |
| data | <a href="#GetEmailTemplatesDataDto">GetEmailTemplatesDataDto</a> | 响应数据 |



示例结果：

```json
{
  "statusCode": 200,
  "message": "操作成功",
  "data": {
    "templates": {
      "customizeEnabled": true,
      "type": "WELCOME_EMAIL",
      "name": "欢迎邮件",
      "subject": "欢迎加入 {{app_name}}",
      "sender": "{{client_name}}",
      "content": "xxx",
      "expiresIn": 300,
      "redirectTo": "https://example.com",
      "tplEngine": "handlebar"
    },
    "categories": {
      "title": "通知模版",
      "titleEn": "Notification Template",
      "desc": "支持欢迎邮件和首次创建用户通知的邮件内容",
      "descEn": "We support the content of the Welcome Email and First-Created Account Notification"
    }
  }
}
```

## 数据结构


### <a id="GetEmailTemplatesDataDto"></a> GetEmailTemplatesDataDto

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| templates | array | 是 | 模版列表。嵌套类型：<a href="#EmailTemplateDto">EmailTemplateDto</a>。  |  |
| categories | array | 是 | 模版类型列表。嵌套类型：<a href="#EmailTemplateCategoryDto">EmailTemplateCategoryDto</a>。  |  |


### <a id="EmailTemplateDto"></a> EmailTemplateDto

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| customizeEnabled | boolean | 是 | 是否启用自定义模版。  |  `true` |
| type | string | 是 | 模版类型:<br>- `WELCOME_EMAIL`: 欢迎邮件<br>- `FIRST_CREATED_USER`: 首次创建用户通知<br>- `REGISTER_VERIFY_CODE`: 注册验证码<br>- `LOGIN_VERIFY_CODE`: 登录验证码<br>- `MFA_VERIFY_CODE`: MFA 验证码<br>- `INFORMATION_COMPLETION_VERIFY_CODE`: 注册信息补全验证码<br>- `FIRST_EMAIL_LOGIN_VERIFY`: 首次邮箱登录验证<br>- `CONSOLE_CONDUCTED_VERIFY`: 在控制台发起邮件验证<br>- `USER_PASSWORD_UPDATE_REMIND`: 用户到期提醒<br>- `ADMIN_RESET_USER_PASSWORD_NOTIFICATION`: 管理员重置用户密码成功通知<br>- `USER_PASSWORD_RESET_NOTIFICATION`: 用户密码重置成功通知<br>- `RESET_PASSWORD_VERIFY_CODE`: 重置密码验证码<br>- `SELF_UNLOCKING_VERIFY_CODE`: 自助解锁验证码<br>- `EMAIL_BIND_VERIFY_CODE`: 绑定邮箱验证码<br>- `EMAIL_UNBIND_VERIFY_CODE`: 解绑邮箱验证码<br>    。  | 可选枚举值：`WELCOME_EMAIL`,`FIRST_CREATED_USER`,`REGISTER_VERIFY_CODE`,`LOGIN_VERIFY_CODE`,`MFA_VERIFY_CODE`,`INFORMATION_COMPLETION_VERIFY_CODE`,`FIRST_EMAIL_LOGIN_VERIFY`,`CONSOLE_CONDUCTED_VERIFY`,`USER_PASSWORD_UPDATE_REMIND`,`ADMIN_RESET_USER_PASSWORD_NOTIFICATION`,`USER_PASSWORD_RESET_NOTIFICATION`,`RESET_PASSWORD_VERIFY_CODE`,`SELF_UNLOCKING_VERIFY_CODE`,`EMAIL_BIND_VERIFY_CODE`,`EMAIL_UNBIND_VERIFY_CODE` |
| name | string | 是 | 邮件模版名称。  |  `欢迎邮件` |
| subject | string | 是 | 邮件主题。  |  `欢迎加入 {{app_name}}` |
| sender | string | 是 | 邮件发件人名称。  |  `{{client_name}}` |
| content | string | 是 | 邮件内容模版。  |  `xxx` |
| expiresIn | number | 否 | 验证码/邮件有效时间，只有验证类邮件才有有效时间。。  |  `300` |
| redirectTo | string | 否 | 完成邮件验证之后跳转到的地址，只针对 `FIRST_EMAIL_LOGIN_VERIFY` 和 `CONSOLE_CONDUCTED_VERIFY` 类型的模版有效。。  |  `https://example.com` |
| tplEngine | string | 否 | 模版渲染引擎。Authing 邮件模版目前支持两种渲染引擎：<br>- `handlebar`: 详细使用方法请见：[handlebars 官方文档](https://handlebarsjs.com/)<br>- `ejs`: 详细使用方法请见：[ejs 官方文档](https://ejs.co/)<br><br>默认将使用 `handlerbar` 作为膜拜渲染引擎。<br>。  | 可选枚举值：`handlebar`,`ejs` |


### <a id="EmailTemplateCategoryDto"></a> EmailTemplateCategoryDto

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| title | string | 是 | 类别名称。  |  `通知模版` |
| titleEn | string | 是 | 类别英文名称。  |  `Notification Template` |
| desc | string | 是 | 描述。  |  `支持欢迎邮件和首次创建用户通知的邮件内容` |
| descEn | string | 是 | 英文描述。  |  `We support the content of the Welcome Email and First-Created Account Notification` |


