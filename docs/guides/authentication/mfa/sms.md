# 基于短信验证码的 MFA

<LastUpdated/>

## 概述

多因素身份验证（MFA）是一种安全系统，是为了验证一项操作合法性而进行的二次身份验证。例如银行的 U 盾，异地登录要求手机短信验证。本文介绍的是基于短信验证码的多因素认证方式。

## 准备工作

1. <a :href="`${$themeConfig.consoleDomain}`">注册一个 {{$localeConfig.brandName}} 账号</a>
2. [完成用户池和应用的创建](/guides/basics/authenticate-first-user/use-hosted-login-page.md)

## 开启短信 MFA

**1. 选择需要开启短信 MFA 的应用**

![](./images/select-app.png)

::: img-description
选择应用
:::

**2. 进入应用详情，选择 `登录控制`，并开启 `多因素认证-短信验证码` 选项**

![](./images/mfa-sms-switch.png)

**3. 进入用户管理，创建一个用于短信 MFA 登录的用户**

![](./images/mfa-sms-user-create.png)

## 使用短信 MFA 登录

**1. 点击应用的体验登录按钮，使用上述创建的用户登录**

![](./images/mfa-sms-login.png)

::: img-description
使用手机号、密码登录
:::

**2. 点击发送验证码，并输入正确的验证码即可完成基于短信的 MFA 验证流程**

![](./images/mfa-sms-login-2.png)

::: img-description
二次认证成功
:::

## 关闭短信 MFA

**1. 进入应用详情，选择 `登录控制`，并关闭 `多因素认证-短信验证码` 选项**