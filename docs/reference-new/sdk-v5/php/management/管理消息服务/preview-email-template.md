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

| 名称 | 类型 | 必填 | 默认值 | 描述 | 示例值 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| sender | string | 是 | - | 邮件发件人名称，可选，如果不传默认使用用户池配置的邮件模版进行渲染。。   | `{{client_name}}` |
| type | string | 是 | - | 模版类型:
- `WELCOME_EMAIL`: 欢迎邮件
- `FIRST_CREATED_USER`: 首次创建用户通知
- `REGISTER_VERIFY_CODE`: 注册验证码
- `LOGIN_VERIFY_CODE`: 登录验证码
- `MFA_VERIFY_CODE`: MFA 验证码
- `INFORMATION_COMPLETION_VERIFY_CODE`: 注册信息补全验证码
- `FIRST_EMAIL_LOGIN_VERIFY`: 首次邮箱登录验证
- `CONSOLE_CONDUCTED_VERIFY`: 在控制台发起邮件验证
- `USER_PASSWORD_UPDATE_REMIND`: 用户到期提醒
- `ADMIN_RESET_USER_PASSWORD_NOTIFICATION`: 管理员重置用户密码成功通知
- `USER_PASSWORD_RESET_NOTIFICATION`: 用户密码重置成功通知
- `RESET_PASSWORD_VERIFY_CODE`: 重置密码验证码
- `SELF_UNLOCKING_VERIFY_CODE`: 自助解锁验证码
- `EMAIL_BIND_VERIFY_CODE`: 绑定邮箱验证码
- `EMAIL_UNBIND_VERIFY_CODE`: 解绑邮箱验证码
    。  枚举值：`WELCOME_EMAIL`,`FIRST_CREATED_USER`,`REGISTER_VERIFY_CODE`,`LOGIN_VERIFY_CODE`,`MFA_VERIFY_CODE`,`INFORMATION_COMPLETION_VERIFY_CODE`,`FIRST_EMAIL_LOGIN_VERIFY`,`CONSOLE_CONDUCTED_VERIFY`,`USER_PASSWORD_UPDATE_REMIND`,`ADMIN_RESET_USER_PASSWORD_NOTIFICATION`,`USER_PASSWORD_RESET_NOTIFICATION`,`RESET_PASSWORD_VERIFY_CODE`,`SELF_UNLOCKING_VERIFY_CODE`,`EMAIL_BIND_VERIFY_CODE`,`EMAIL_UNBIND_VERIFY_CODE` | `WELCOME_EMAIL` |
| content | string | 否 | - | 邮件内容模版，可选，如果不传默认使用用户池配置的邮件模版进行渲染。。   | `xxx` |
| subject | string | 否 | - | 邮件主题，可选，如果不传默认使用用户池配置的邮件模版进行渲染。。   | `欢迎加入 {{app_name}}` |
| expiresIn | number | 否 | - | 验证码/邮件有效时间，只有验证类邮件才有有效时间。可选，如果不传默认使用用户池配置的邮件模版进行渲染。。   | `300` |
| tplEngine | string | 否 | handlebar | 模版渲染引擎。Authing 邮件模版目前支持两种渲染引擎：
- `handlebar`: 详细使用方法请见：[handlebars 官方文档](https://handlebarsjs.com/)
- `ejs`: 详细使用方法请见：[ejs 官方文档](https://ejs.co/)

默认将使用 `handlerbar` 作为膜拜渲染引擎。
    。  枚举值：`handlebar`,`ejs` | `handlebar` |


## 示例代码

```php
<?php

require 'vendor/autoload.php';

use Authing\ManagementClient;

$management = new ManagementClient(
    "AUTHING_USERPOOL_ID",
    "AUTHING_USERPOOL_SECRET"
);

$data = $management->previewEmailTemplate(array(
      "type" => "WELCOME_EMAIL",
    "content" => "xxx",
    "subject" => "欢迎加入 {{app_name}}",
    "sender" => "{{client_name}}",
    "expiresIn" => 300,
    "tplEngine" => "handlebar",

));
```


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

| 名称 | 类型 | 必填 | 描述 | 示例值 |
| ---- |  ---- | ---- | ---- | ---- |
| content | string | 是 | 预览的邮件主体内容，为 html 格式文本。  |  `xxx` |
| subject | string | 是 | 预览的邮件主题内容。  |  `欢迎加入 Authing` |
| sender | string | 是 | 预览的邮件发件人内容。  |  `test@example.com` |


