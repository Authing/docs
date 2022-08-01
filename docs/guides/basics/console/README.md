---
meta:
  - name: description
    content: 控制台概览
---

# 控制台概览

<LastUpdated/>

控制台是你管理和配置所有 Authing 资源的地方，这篇文章会帮助你学会使用 Authing 控制台提升生产力！

在 [Authing 控制台](https://console.authing.cn/console/userpool)中你可以对 Authing 的资源、用户等信息进行配置和修改。

![](./images/overview.png)

::: img-description
控制台概览
:::

以下会**从上往下**介绍控制台每个模块：

<table>
  <thead>
    <tr>
      <th style="text-align:left">模块名</th>
      <th style="text-align:left">我能在这里做什么？</th>
    </tr>
  </thead>
  <tbody>
   <tr>
      <td style="text-align:left"><b>概览</b></td>
      <td style="text-align:left">
        <p>包含系统和用户的多种统计信息，比如：</p>
        <ol>
            <li>总应用数量</li>
            <li>总用户数量</li>
            <li>登录和新增用户统计</li>
        </ol>
        <p>还可以热点图和折线图的方式查看一段时间内用户的登录次数和数量变化。</p>
      </td>
    </tr>
        <tr>
      <td style="text-align:left"><b>应用</b></td>
      <td style="text-align:left">
        <p>在此可以创建和管理应用，比如：</p>
        <ol>
          <li>为应用集成 OIDC 协议</li>
          <li>为应用集成 OAuth 2.0 协议</li>
          <li>为应用集成 SAML 协议</li>
          <li>修改默认页面显示配置、添加自定义 CSS</li>
          <li>配置多因素认证</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="text-align:left"><b>身份源管理</b></td>
      <td style="text-align:left">
        <p>在这里可以连接第三方的身份源，比如：</p>
        <ol>
          <li>连接企业身份源（OIDC、SAML、办公应用如钉钉企业微信）</li>
          <li>配置社会化登录</li>
          <li>自定义数据库</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="text-align:left"><b>组织架构</b></td>
      <td style="text-align:left">
        <p>在这里可以管理系统中的所有组织和用户，比如：</p>
        <ol>
          <li>创建组织机构</li>
          <li>查看/修改用户的基础资料</li>
          <li>查看登录历史、登录地点和原始 JSON 数据</li>
          <li>设置用户组和用户角色</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="text-align:left"><b>权限管理</b></td>
      <td style="text-align:left">
        <p>在这里可以围绕资源、基于 PBAC（策略模型）进行精细化的权限管理，比如：</p>
        <ol>
          <li>查看和添加资源</li>
          <li>查看和添加策略</li>
          <li>为用户、角色、分组、组织机构授权策略</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="text-align:left"><b>安全设置</b></td>
      <td style="text-align:left">
        <p>配置开发过程和密码设置所涉及的安全设置，比如：</p>
        <ol>
          <li>CORS</li>
          <li>Token 有效时间</li>
          <li>密码位数</li>
          <li>密码复杂度</li>
          <li>密码轮换时间</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="text-align:left"><b>品牌化</b></td>
      <td style="text-align:left">
        <p>根据公司和品牌自定义登录页样式、LOGO 等</p>
        <ol>
          <li>配置登录框样式</li>
          <li>上传自定义 CSS</li>
          <li>配置登录注册用户协议</li>
          <li>消息邮件和短信提醒</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="text-align:left"><b>自动化</b></td>
      <td style="text-align:left">
        <p>Pipeline、Webhook提升认证过程的灵活性和可扩展性</p>
        <ol>
          <li>Pipeline</li>
          <li>Webhook</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="text-align:left"><b>审计日志</b></td>
      <td style="text-align:left">
        <p>在此可以查看用户操作日志和管理员日志。</p>
      </td>
    </tr>
     <tr>
      <td style="text-align:left"><b>费用管理</b></td>
      <td style="text-align:left">
      <p>在此可以服务升级以及查看订单详情。</p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left"><b>设置</b>
      </td>
      <td style="text-align:left">
      <p>编辑或删除用户池，修改开发环境变量等</p>
      <ol>
        <li>用户池基础信息设置</li>
        <li>扩展字段</li>
        <li>环境变量</li>
        <li>协作管理员</li>
      </ol>
      </td>
    </tr>
  </tbody>
</table>

## 应用

### 应用列表

![](./images/app-list.png)
::: img-description
应用列表
:::

### 应用详情

在此可以配置 OIDC 协议、配置 OAuth2.0 协议、配置 SAML 协议，修改应用显示配置等：

![](./images/app-detail.png)
::: img-description
应用详情
:::

### 连接社会化登录

::: page-ref /guides/connections/social.md
:::

## 身份源管理

Authing 可以连接社会化登录、企业身份源、自定义数据库。

### 企业身份源

![](./images/source-enterprise.png)
::: img-description
企业身份源
:::

### 社会化身份源

![](./images/source-social.png)
::: img-description
社会化身份源
:::

### 自定义数据库

![](./images/source-custom.png)
::: img-description
自定义数据库
:::

## 组织架构

## 组织管理

![](./images/org.png)
::: img-description
组织管理
:::

### 用户列表

![](./images/member.png)

::: img-description
用户列表
:::

### 用户详情

![](./images/member-detail.png)
::: img-description
用户详情
:::

## 分组管理

![](./images/group.png)

::: img-description
分组管理
:::

### 同步中心

![](./images/sync-center.png)

::: img-description
同步中心
:::

### LDAP

![](./images/ldap.png)

::: img-description
LDAP
:::

## 权限管理

![](./images/permission.png)
::: img-description
权限管理
:::

## 安全设置

### 基础设置

安全域（Allowed Origins） 是允许从 JavaScript 向 Authing API 发出请求的 URL（通常与 CORS 一起使用）。 默认情况下，系统会允许你使用所有网址（\*）。 如果需要，此字段允许你输入其他来源。 你可以通过逐行分隔多个有效 URL，并在子域级别使用通配符（例如：[https://\*.sample.com）。](https://*.sample.com）。) 验证这些 URL 时不考虑查询字符串和哈希信息，如果带上了查询字符串和哈希信息系统会自动忽略整个域名。

![](./images/security-basic.png)

::: img-description
基础设置
:::

### 密码设置

![](./images/security-password.png)

::: img-description
密码设置
:::

## 品牌化

可根据不同企业品牌需求定制 LOGO、登录框样式等。

### 全局登录框

![](./images/login-form.png)
::: img-description
全局登录框
:::

### 消息设置

#### 使用邮件模版

在邮件模版中可以配置四种类型的邮件模版，分别是：

1. **欢迎邮件** ：若用户使用邮箱注册会发送此邮件；
2. **验证邮件** ：若用户使用邮箱注册会发送一封验证邮件给用户用来验证邮箱，用户点击邮箱中的链接即可完成验证；
3. **修改密码** ：每当用户要求更改密码时，都会发送此电子邮件，邮件中附带一个验证码，用户需要填写此验证码完成密码修改；
4. **重置密码** ：当用户忘记密码时系统将发送此重置密码的邮件，邮件中附带一个验证码，用户提交验证码和新密码后将可以重置密码。

![](./images/message-custom-mail.png)

::: img-description
邮件模版
:::

#### 使用第三方邮件服务

我们自带的邮件发送服务器使用阿里云企业邮箱，若你想自定义邮件服务器可在此页面中设置（目前支持阿里企业邮箱和腾讯企业邮箱）。

![](./images/message-thirdparty-mail.png)

::: img-description
第三方邮件服务
:::

更多用法请参考：

::: page-ref /guides/userpool-config/email/
:::

#### 查看短信登录模版

短信验证让用户能够使用以短信形式发送到其手机上的一次性密码登录，目前不支持短信模版修改。

![](./images/message-sms.png)

::: img-description
短信验证
:::

## 自动化

Authing 的 Pipeline、 Webhook、自定义密码函数极大地提升了认证过程中的灵活性，赋能用户自动化处理复杂场景。

### Pipeline

![](./images/pipeline.png)
::: img-description
Pipeline
:::

### Webhook

![](./images/webhooks.png)
::: img-description
Webhook
:::

## 审计日志

你可以查看最近的用户行为日志和管理员操作日志。

### 用户行为日志

![](./images/audit-user.png)
::: img-description
用户行为日志
:::

### 管理员操作日志

![](./images/audit-admin.png)
::: img-description
管理员操作日志
:::

## 费用管理

![](./images/fee.png)
::: img-description
费用管理
:::

## 设置

### 基本设置

![](./images/setting-basic.png)
::: img-description
基本设置
:::

### 字段管理

![](./images/setting-column.png)
::: img-description
字段管理
:::

### 开发者

环境变量就是一组 Key-Value 键值对（类似于操作系统的环境变量），你可以在环境变量中统一管理一些常量值，以便在 Pipeline、SAML 字段 Mapping、自定义数据等场景下使用。

![](./images/setting-developer.png)
::: img-description
开发者
:::

### 邀请管理员

邀请用户池中的用户或 Authing 的官方用户池中的开发者，帮你管理该用户池，被授权的开发者将会在用户池列表页面中看到该用户池。

![](./images/setting-invite.png)
::: img-description
邀请管理员
:::
<ConsoleBanner />
