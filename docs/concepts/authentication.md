# 什么是认证

<LastUpdated/>

不管你在开发什么类型的应用 —— 内部员工 IT 系统、toC 账号体系或者是给其他开发者暴露的 API，用户认证都是其中至关重要的一环，{{$localeConfig.brandName}} 都将为你提供合适的认证方式支持。

> 注意：部分浏览器已经开始默认禁用第三方 Cookie，这会影响到 {{$localeConfig.brandName}} 在某些场景下的部分功能。详细说明请见：[FAQ：浏览器禁用第三方 Cookie 将如何影响 {{$localeConfig.brandName}} 功能？](/guides/faqs/block-third-party-cookie-impact.md)

登录体验是软件开发者需要考虑的最重要的用户体验之一，为用户提供一个无缝、便捷而又安全的认证体验不是一件很容易的事。一般而言，登录逻辑同时关联着注册、重置密码、关联账号等逻辑。更重要的是，在登录过程中以强健和自适应身份验证的形式增强安全性通常对于许多实现至关重要。

{{$localeConfig.brandName}} 提供了非常多的认证方式给开发者选择、组合，密码策略、登录频繁检测、自定义认证流程等都可以通过管理控制台轻松完成（这些操作基本上也可以通过 Management API 来完成）。

## OIDC / OAuth2.0 / SAML / AD / LDAP / 社会化登录

{{$localeConfig.brandName}} 支持通过 OIDC、OAuth2.0、SAML、LDAP 等标准协议访问你的应用和用户数据，你可以放心地将 {{$localeConfig.brandName}} 作为你的 Identity Provider（身份提供商）。如果你使用 {{$localeConfig.brandName}} 作为 Identity Provider，你可以连接其他第三方 Service Provider，诸如登录阿里云、AWS、Azure、Jira 等。

{{$localeConfig.brandName}} 也可以作为 Service Provider，通过 OIDC、OAuth2.0、SAML、LDAP、AD 等标准协议去连接第三方 Identity Provider。比如你可以通过 Azure AD、本地的 Windows AD 登录你的应用。
{{$localeConfig.brandName}} 还可以使用第三方社会化登录，自动拉取社会化登录用户的用户资料到你的用户目录。

你可以分别了解 [OIDC、OAuth2.0](/concepts/oidc/oidc-overview.md)、[SAML](/concepts/saml/saml-overview.md)、[LDAP](/concepts/ldap.md)、AD 的实现原理。

## 托管登录页认证

{{$localeConfig.brandName}} 中每个用户池都拥有一个独立的二级域名，以及配备了在线的登录页，访问 `https://YOUR_DOMAIN.authing.cn/login`
即可访问此登录页面。你不需要编写一行代码来维护该登录页，你可以通过控制台的应用配置做一些定制化配置。

## 嵌入登录表单认证

{{$localeConfig.brandName}} 内嵌登录组件是 {{$localeConfig.brandName}} 提供的轻量、现代化、高扩展性的前端登录组件，支持原生 JavaScript 以及 React、Vue、Angular 三大前端框架。此内嵌登录组件和 {{$localeConfig.brandName}} 托管的登录页功能基本保持一致，同时具备很强的自定义能力。该组件内置了重置密码、MFA、社会化登录、扫码登录等功能，这些功能都是高配置化的。

详情查看[使用内嵌登录组件完成认证](/guides/basics/authenticate-first-user/use-embeded-login-component/)。

## Auth SDK

{{$localeConfig.brandName}} 为前端开发者提供了轻量级、开发者友好的 Auth SDK（支持 JavaScript/Node、Java、Python、PHP、C# 等语言），能够让你更灵活、快捷、安全地实现你的认证逻辑。该 Auth SDK 支持 {{$localeConfig.brandName}} 所有的认证相关功能，包含基础认证、重置密码、绑定账号等所有功能。你可以通过此 SDK 得到用户的 `id_token`，作为该用户的身份凭证，传递给下游应用。

!!!include(common/sdk-list.md)!!!

## Authentication API

前面提到的托管登录页、嵌入登录组件、Auth SDK 底层能力都是 Authentication API 提供支持的。{{$localeConfig.brandName}} Authentication API 支持两种调用方式：RESTful 和 GraphQL（端点为 https://core.authing.cn/graphql/v2），你也可以直接调用 Authentication API 实现认证逻辑。

## 单点登录

单点登录（Single Sign On），简称为 SSO，是比较流行的企业业务整合的解决方案之一。SSO 的定义是在多个应用系统中，用户只需要登录一次就可以访问所有相互信任的应用系统。我们提供了专门的 [SSO SDK](/reference-new/sdk-for-sso.md) 开发者可以基于此快速实现应用间的单点登录。
