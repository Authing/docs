---
meta:
  - name: description
    content: 管理用户账号
---

# 管理用户账号

<LastUpdated/>

::: hint-info
有关支持「用户管理」功能各项权益的 {{$localeConfig.brandName}} 用户池版本信息，请查看 [官网「价格」页](https://authing.cn/pricing)。如你的版本不支持此权益，且想试用，可开通体验期。有关体验期介绍及开通方式，请查看 [体验期](/guides/basics/trial/README.md)。
::: 

此章节主要介绍管理单个用户的操作，如绑定邮箱、关联账号、禁用账号等，如果你想了解如何管理用户目录，请见[管理用户目录](../users/README.md)。

用户账号管理可以通过控制台、用户个人中心可视化管理，也可以借助 SDK & API，你可以根据自己的业务需求选择适合自己的方式。

用户账号管理分为管理员操作和用户自助操作两种方式，用户自助操作需要通过手机号验证码、MFA 等方式验证用户身份，管理员操作只需要提供 Management Token 即可（如果使用 SDK 的话，只需提供[用户池密钥](/guides/faqs/get-userpool-id-and-secret.md)）。

以下内容不分先后顺序，你可以选择自己感兴趣的内容进行阅读：

- [了解用户资料所有字段的释义](./user-profile.md)；
- [了解管理员如何创建账号](./create-user/)；
- [了解如何管理用户账号](./manage-profile.md)，如修改用户资料、绑定 MFA 等；
<!-- - [了解如何给用户添加角色、分配权限](./role-and-permission.md)； -->
- [了解如何绑定账号](./bind-social-account.md)；
- [了解如何管理用户的自定义数据](/guides/users/user-defined-field/)；
- [了解如何查看用户的登录历史记录](./login-history.md)；
- [了解如何增强用户账号的安全性](./security.md)；
- [了解如何管理用户的登录状态](./login-state.md)；
- [了解如何控制用户能访问哪些应用](./application-access.md)。
