# 什么是联邦认证

<LastUpdated/>

在互联网早期，你的各类账号信息分散在不同的站点和应用，这存在以下问题：

1. 每次访问一个新的站点都要注册一个新的用户名和密码账号。
2. 这个账户就仅仅被存储在这个站点。
3. 你无法在不同的站点下保持登录，用户的信息在不同的站点间也无法互通。

联邦认证通过**标准协议**将不同的身份提供商**联合起来**对用户进行认证。**联邦**是一种身份提供商之间的**信任关系**，建立联邦关系的身份提供商之间可以通过**标准协议**互相拉取用户信息。

![](~@imagesZhCn/concepts/federation/1-1.png)

## 为什么需要联邦认证

联邦认证是一种**分布式**的身份认证，当用户在**身份提供商**登录时，用户可以选择到当前身份提供商**信任**的联邦身份提供商登录。用户可以通过联邦认证登录一个新的系统，而不必每次在新的系统中注册账号。例如现在许多网站有自己的**账密注册**登录方式，也有微信扫码直接登录的方式，其中的微信就是这个网站的**身份联邦**，用户**不必填写**信息注册账号，**直接使用微信**就可以登录。

使用联邦认证有以下好处：

1. 用户不必每次都要创建一个全新的账号。
2. 接入联邦认证后用户可以在不同的组织和站点中畅游。

## 联邦认证原理

以下是联邦认证的过程，用户被重定向到身份联邦进行认证，用户先在身份联邦认证，身份联邦认证向 Authing 发送身份断言，等价于用户在 Authing 完成认证，Authing 再向业务系统发送身份断言，业务系统完成登录。

![](~@imagesZhCn/concepts/federation/1-2.png)

## Authing 的联邦认证能力

Authing 支持多种标准协议进行联邦认证，你可以[使用此应用快速体验](https://federation-poc.authing.cn/)。

![](~@imagesZhCn/concepts/federation/1-3.png)

## OAuth2

Authing 支持丰富的[社会化登录](/guides/connections/social.md)服务商，还可以[自定义 OAuth2 社会化登录](/connections/custom-social-provider/)。

![](~@imagesZhCn/concepts/federation/1-4.png)

## OpenID Connect

Authing 支持使用 OIDC 协议进行联邦认证，详情请查看文档[连接 OIDC 身份源](/connections/oidc/)。

![](~@imagesZhCn/concepts/federation/1-5.png)

## SAML2

Authing 支持使用 SAML2 协议进行联邦认证，详情请查看文档[连接 SAML 身份源](/connections/saml/)。

![](~@imagesZhCn/concepts/federation/1-6.png)

## CAS

Authing 支持使用 CAS 协议进行联邦认证，详情请查看文档[连接 CAS 身份源](/connections/cas/)。

![](~@imagesZhCn/concepts/federation/1-7.png)

## 在线体验联邦认证

可以访问[这里](https://federation-poc.authing.cn)在线体验 Authing 的联邦认证能力。
