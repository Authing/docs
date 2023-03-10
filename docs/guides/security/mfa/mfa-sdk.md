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

[参考认证侧 API 文档](https://api-explorer.authing.cn?tag=tag/MFA%20要素管理/API%20列表/operation/FactorsV3Controller_sendEnrollFactorRequest)

[参考管理侧 API 文档](https://api-explorer.authing.cn?tag=tag/管理用户/API%20列表/operation/UsersManagementController_getUserMfaInfo)

## 多因素认证（MFA）SDK

[参考 SDK v2 文档](https://docs.authing.cn/v2/reference/sdk-for-node/authentication/MfaAuthenticationClient.html)
