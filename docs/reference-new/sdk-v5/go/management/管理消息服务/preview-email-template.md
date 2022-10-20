# 预览邮件模版

<!--
  警告⚠️：
  不要直接修改该文档，
  https://github.com/Authing/authing-docs-factory
  使用该项目进行生成
-->

<LastUpdated />

预览邮件模版

## 请求参数

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:60px">默认值</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- | ---- | ---- | ---- | ---- | ---- |
| sender | string | 是 | - | 邮件发件人名称，可选，如果不传默认使用用户池配置的邮件模版进行渲染。  | `{{client_name}}` |
| type | string | 是 | - | 模版类型:<br>- `WELCOME_EMAIL`: 欢迎邮件<br>- `FIRST_CREATED_USER`: 首次创建用户通知<br>- `REGISTER_VERIFY_CODE`: 注册验证码<br>- `LOGIN_VERIFY_CODE`: 登录验证码<br>- `MFA_VERIFY_CODE`: MFA 验证码<br>- `INFORMATION_COMPLETION_VERIFY_CODE`: 注册信息补全验证码<br>- `FIRST_EMAIL_LOGIN_VERIFY`: 首次邮箱登录验证<br>- `CONSOLE_CONDUCTED_VERIFY`: 在控制台发起邮件验证<br>- `USER_PASSWORD_UPDATE_REMIND`: 用户到期提醒<br>- `ADMIN_RESET_USER_PASSWORD_NOTIFICATION`: 管理员重置用户密码成功通知<br>- `USER_PASSWORD_RESET_NOTIFICATION`: 用户密码重置成功通知<br>- `RESET_PASSWORD_VERIFY_CODE`: 重置密码验证码<br>- `SELF_UNLOCKING_VERIFY_CODE`: 自助解锁验证码<br>- `EMAIL_BIND_VERIFY_CODE`: 绑定邮箱验证码<br>- `EMAIL_UNBIND_VERIFY_CODE`: 解绑邮箱验证码<br>      | `WELCOME_EMAIL` |
| content | string | 否 | - | 邮件内容模版，可选，如果不传默认使用用户池配置的邮件模版进行渲染。  | `xxx` |
| subject | string | 否 | - | 邮件主题，可选，如果不传默认使用用户池配置的邮件模版进行渲染。  | `欢迎加入 {{app_name}}` |
| expiresIn | number | 否 | - | 验证码/邮件有效时间，只有验证类邮件才有有效时间。可选，如果不传默认使用用户池配置的邮件模版进行渲染。  | `300` |
| tplEngine | string | 否 | handlebar | 模版渲染引擎。Authing 邮件模版目前支持两种渲染引擎：<br>- `handlebar`: 详细使用方法请见：[handlebars 官方文档](https://handlebarsjs.com/)<br>- `ejs`: 详细使用方法请见：[ejs 官方文档](https://ejs.co/)<br><br>默认将使用 `handlerbar` 作为膜拜渲染引擎。<br>      | `handlebar` |


<!-- 暂时不显示示例代码 -->
<!-- ## 示例代码
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

    response := client.previewEmailTemplate(
      dto.PreviewEmailTemplateDto {
          Type: PreviewEmailTemplateDto.type.WELCOME_EMAIL,
          Content: "xxx",
          Subject: "欢迎加入 {{app_name}}",
          Sender: "{{client_name}}",
          ExpiresIn: 300,
          TplEngine: PreviewEmailTemplateDto.tplEngine.HANDLEBAR,
    }
  )
}
```
 -->


## 请求响应

类型： `PreviewEmailTemplateRespDto`

| 名称 | 类型 | 描述 |
| ---- | ---- | ---- |
| data | <a href="#PreviewEmailTemplateDataDto">PreviewEmailTemplateDataDto</a> | 响应数据 |



示例结果：

```json
{
  "data": {
    "content": "xxx",
    "subject": "欢迎加入 Authing",
    "sender": "test@example.com"
  }
}
```

## 数据结构


### <a id="PreviewEmailTemplateDataDto"></a> PreviewEmailTemplateDataDto

| 名称 | 类型 | <div style="width:80px">是否必填</div> | <div style="width:300px">描述</div> | <div style="width:200px">示例值</div> |
| ---- |  ---- | ---- | ---- | ---- |
| content | string | 是 | 预览的邮件主体内容，为 html 格式文本   |  `xxx` |
| subject | string | 是 | 预览的邮件主题内容   |  `欢迎加入 Authing` |
| sender | string | 是 | 预览的邮件发件人内容   |  `test@example.com` |


