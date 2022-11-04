# 通过 SDK 接入 MFA

<LastUpdated/>

## 概述

{{$localeConfig.brandName}} 不仅可以通过控制台来配置 MFA 认证流程，你还可以通过 SDK 的方式为 {{$localeConfig.brandName}} 的 MFA 认证流程进行定制化开发。

本文将以 [{{$localeConfig.brandName}} - Node/JavaScript SDK](/reference/sdk-for-node/) 为例，指引用户完成基于 SDK 的 MFA 自定义开发。

其中包含：绑定 MFA 认证器、解绑 MFA 认证器、用户二次认证等。

## 准备工作

1. <a :href="`${$themeConfig.consoleDomain}`">注册一个 {{$localeConfig.brandName}} 账号</a>。
2. [创建用户池和应用](/guides/basics/authenticate-first-user/use-hosted-login-page.md)。

## 多因素认证（MFA）API

[参考认证侧 API 文档](https://api.authing.cn/openapi/v3/authentication/#tag/MFA%20%E8%A6%81%E7%B4%A0%E7%AE%A1%E7%90%86/API%20%E5%88%97%E8%A1%A8)

[参考管理侧 API 文档](https://api.authing.cn/openapi/v3/management/#tag/%E7%AE%A1%E7%90%86%E7%94%A8%E6%88%B7/API%20%E5%88%97%E8%A1%A8/operation/UsersManagementController_getUserMfaInfo)

## 多因素认证（MFA）SDK

[参考 SDK v2 文档](https://docs.authing.cn/v2/reference/sdk-for-node/authentication/MfaAuthenticationClient.html)
