# 配置密码强度

<LastUpdated/>

## 配置用户池密码强度方式

您可以在 **安全设置 -> 密码安全** 页面配置密码强度。系统会要求所有用户在注册、修改密码时，密码必须满足一定的复杂度。

系统提供  `用户登录密码强度检验 ` 开关（默认关闭）。开启后，在设置了高密码强度规则的情况下，登录低强度密码的账号，跳转进入密码修改页。
<center>
![](./images/pw-strength.png)
</center>
<center>
![](./images/prompt-pw-modify.png)
</center>

若用户在修改密码时，管理员同时提高了密码强度，页面会提示用户刷新页面重试。
<center>
![](./images/pw-strength-updated.png)
</center>
