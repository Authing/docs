---
tags:
  - ServiceProvider
  - 服务提供方
  - IdentityProvider
  - 身份提供方
---
# 理解 SAML 流程

<LastUpdated/>

本文为读者讲述 SAML 中，SP、IdP、浏览器三个实体之间数据交互的流程。

## SAML 协议中涉及到的主体

使用 SAML 协议进行身份认证时，涉及到以下三个主体

浏览器：SP 和 IdP 借助浏览器互相通信

SP：资源提供方

IdP：身份认证提供方

## 发起 SAML 登录到登录成功的整个过程

![](~@imagesZhCn/concepts/saml/saml-flow-overview.png)

1. 用户试图登录 SP 提供的应用。
2. SP 生成 SAML Request，通过浏览器重定向，向 IdP 发送 SAML Request。
3. IdP 解析 SAML Request 并将用户重定向到认证页面。
4. 用户在认证页面完成登录。
5. IdP 生成 SAML Response，通过对浏览器重定向，向 SP 的 ACS 地址返回 SAML Response，其中包含 SAML Assertion 用于确定用户身份。
6. SP 对 SAML Response 的内容进行检验。
7. 用户成功登录到 SP 提供的应用。

## SP 与 IdP 之间通信方式

SP 与 IdP 之间的通信方式分为 HTTP Redirect Binding、HTTP POST Binding、HTTP Artifact Binding。每种方式在不同的阶段会用不同类型的 HTTP 与对方通信。

### HTTP Redirect Binding

SP 通过重定向 GET 请求把 SAML Request 发送到 IdP，IdP 通过立即提交的 Form 表单以 POST 请求的方式将 SAML Response 发到 SP。

![](~@imagesZhCn/concepts/saml/HTTP-Redirect-Binding.png)

### HTTP POST Binding

IdP 通过立即提交的 Form 表单以 POST 请求的方式将 SAML Request 发到 SP。IdP 通过立即提交的 Form 表单以 POST 请求的方式将 SAML Response 发到 SP。

![](~@imagesZhCn/concepts/saml/http-post-binding.png)

### HTTP Artifact Binding

SP、IdP 双方只通过浏览器交换 SAML Request、SAML Response 的索引编号，收到编号后，在后端请求对方的 Artifact Resolution Service 接口来获取真正的请求实体内容。从而避免 SAML Request、SAML Response 暴露在前端。

![](~@imagesZhCn/concepts/saml/HTTP-Artifact-Binding.png)
