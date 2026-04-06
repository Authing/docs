# 成为 CAS 身份源

<LastUpdated/>

本文介绍如何让 Authing 成为 CAS 身份源，其他系统可以通过 CAS 协议接入 Authing 作为身份提供商。

目前 Authing 实现了 CAS 1.0 的 `/login`，`/validate`，`/logout` 端点。

你可以在[这里](https://apereo.github.io/cas/6.6.x/protocol/CAS-Protocol-Specification.html)深入理解 CAS 协议。

## 创建应用

为了让你的应用具备身份认证能力，你需要在 Authing 创建一个应用，名称建议填写你的实际应用项目的名称，进入**控制台** > **应用** > **应用列表**，点击创建应用：

![](~@imagesZhCn/guides/federation/oidc/1-1.png)

填写你的**应用名称**，例如：网络笔记项目，为你的项目指定一个**认证地址**，将来你的用户会在这个地址完成认证。**回调链接**填写你的项目**后端路由**，Authing 会将 Ticket 发送到这个地址。最后点击创建。

![](~@imagesZhCn/guides/federation/oidc/1-2.png)

找到你的应用，进入「启用身份提供商」选项卡。

![](~@imagesZhCn/guides/federation/oauth/1-1.png)

在下方的「CAS 身份提供商」卡片中，打开启用 CAS IdP 开关，然后点击保存。

![](~@imagesZhCn/guides/federation/cas/1-1.png)

## Web flow

在 Web flow 中，整体有以下流程：

1. 用户首次访问 App1。
2. 用户与 App1 未建立会话，被重定向到认证页面。
3. 用户未认证，用户在 CAS Server 完成身份认证。
4. 用户被重定向到 App1 的回调地址，携带 Ticket。
5. App1 到 CAS Server 查验 Ticket 合法性。
6. App1 与用户建立会话，返回受保护资源。
7. 用户访问应用 App2。
8. 用户与 App2 未建立会话，被重定向到认证页面。
9. CAS Server 发现用户已认证，用户被重定向到 App2 的回调地址，携带 Ticket。
10. App2 到 CAS Server 查验 Ticket 合法性。
11. App2 与用户建立会话，返回受保护资源。

流程图如下：

![](~@imagesZhCn/guides/federation/cas/cas-flow.png)

[查看接入 CAS 1.0 文档](/federation/cas/cas10/)。

[查看接入 CAS 2.0 文档](/federation/cas/cas20/)。
