---
home: true
noSidebar: true
mainTitle: "文档中心"
subTitle: "在这里，开启激动人心的第一步！学习如何使用 {{$localeConfig.brandName}} 及 {{$localeConfig.brandName}} 提供的 API。"
searchPlaceholder: 请输入关键词搜索产品文档
hotSearchText: 热门搜索
exploreUse: 探索使用 {{$localeConfig.brandName}}
hotSearch:
  - text: 如何对用户进行认证
    link: /guides/authentication/
  - text: 如何对用户进行授权
    link: /guides/authorization/
  - text: 快速实现单点登录
    link: /guides/authentication/sso/
  - text: 添加社会化登录
    link: /guides/authentication/social/
  - text: 如何验证 token
    link: /guides/faqs/how-to-validate-user-token.html
sdkConfig:
  ios:
    name: iOS Swift
    link: /reference/sdk-for-ios/
    icon: iOS
  android:
    name: Android
    link: /reference/sdk-for-android/
    icon: Android
  flutter:
    name: Flutter
    link: /reference/sdk-for-flutter/
    icon: Flutter
  javascript:
    name: JavaScript
    link: /reference/sdk-for-node/
    icon: JavaScript
  reactNative:
    name: React Native
    link: /reference/sdk-for-react-native/
    icon: React-Native
  cSharp:
    name: C Sharp
    link: /reference/sdk-for-csharp/
    icon: csharp
  react:
    name: React
    link: /reference/guard/v2/react
    icon: React-Native
  angular:
    name: Angular
    link: /reference/guard/v2/angular
    icon: Angular
  vue:
    name: Vue
    link: /reference/guard/v2/vue
    icon: Vue
  python:
    name: Python
    link: /reference/sdk-for-python/
    icon: Python
  nodeJs:
    name: Node.js
    link: /reference/sdk-for-node/
    icon: Nodejs

  ruby:
    name: Ruby
    link: /reference/sdk-for-ruby.html
    icon: Ruby
  ruby-api:
    name: Ruby
    link: /reference/sdk-for-ruby.html
    icon: Ruby
  java:
    name: Java
    link: /reference/sdk-for-java/
    icon: Java

  golang:
    name: Golang
    link: /reference/sdk-for-go/
    icon: Go

  php:
    name: PHP
    link: /reference/sdk-for-php/
    icon: php

applicationSdks:
  - title: 客户端应用
    description: 在手机、桌面和其他智能设备上运行的本地应用
    color: "#396AFF"
    sdks:
      - ios
      - android
      - flutter
      - react-Native
      - cSharp
  - title: 单页应用
    description: 只有单个页面的纯前端网页应用
    color: "#75A3FF"
    sdks:
      - javascript
      - react
      - angular
      - vue
  - title: 标准 Web 应用
    description: 多页面并支持跳转的网页应用
    color: "#28B1B0"
    sdks:
      - javascript
      - python
      - cSharp
      - nodeJs
      - ruby
      - java
      - golang
      - php
  - title: 后端 / API 服务
    description: 无前端界面，只提供后端服务的应用
    color: "#F8BC00"
    sdks:
      - javascript
      - python
      - cSharp
      - nodeJs
      - ruby
      - java
      - golang
      - php
sections:
  - title: 概念
    description: 了解 {{$localeConfig.brandName}} 体系结构基础
    links:
      - text: 什么是用户池
        link: /concepts/user-pool
      - text: 什么是认证
        link: /concepts/authentication.html
      - text: 什么是授权
        link: /concepts/authorization.html
    knowMore:
      link: /concepts/
  - title: 快速开始
    description: 了解如何按照我们的分步说明构建解决方案。
    links:
      - text: 使用托管登录页面
        link: /guides/basics/authenticate-first-user/use-hosted-login-page
      - text: 使用登录表单组件
        link: /guides/basics/authenticate-first-user/use-embeded-login-component/
      - text: 使用 API & SDK
        link: /guides/basics/authenticate-first-user/use-api-sdk/
    knowMore:
      link: /guides/basics/authenticate-first-user/
  - title: 应用集成
    description: 将现有或本地应用集成到 Authing。
    links:
      - text: 通过 {{$localeConfig.brandName}} 登录阿里云
        link: /integration/ali-cloud/
      - text: 通过 {{$localeConfig.brandName}} 登录腾讯云
        link: /integration/tencent-cloud/
      - text: 通过 {{$localeConfig.brandName}} 登录华为云
        link: /integration/huawei-cloud/
    knowMore:
      link: /integration/
  # - title: 加入 APN
  #   description: 加入由 Authing 提供的应用合作网络
  #   links:
  #     - text: 什么是 APN
  #       link: /apn/
  #     - text: 将你的应用集成 OIDC
  #       link: /apn/integrated-oidc/
  #     - text: 基于 {{$localeConfig.brandName}} 测试 OIDC 能力
  #       link: /apn/test-oidc/
  #   knowMore:
  #     link: /apn/
explores:
  - title: 对用户进行认证
    links:
      - icon: authing-login-password
        link: /guides/authentication/basic/password/
        text: 使用账号密码认证
      - icon: authing-xingzhuangjiehe1
        link: /guides/authentication/basic/sms/
        text: 使用短信验证码认证
      - icon: authing-wechat-mobile
        link: /guides/authentication/social/
        text: 使用社会化登录认证
    knowMore:
      link: /guides/authentication/
  - title: 对用户进行权限管理
    links:
      - icon: authing-certification
        link: /guides/access-control/choose-the-right-access-control-model.html
        text: 选择合适的权限模型
      - icon: authing-genggaimima
        link: /guides/access-control/rbac.html
        text: 集成 RBAC 权限模型到你的应用系统
      - icon: authing-Token-2
        link: /guides/access-control/abac.html
        text: 集成 ABAC 权限模型到你的应用系统
    knowMore:
      link: /guides/access-control/
  - title: 管理用户目录
    links:
      - icon: authing-sousuo
        link: /guides/users/search.html
        text: 搜索用户
      - icon: authing-zidingyiziduan-3
        link: /guides/users/user-defined-field/
        text: 添加自定义用户字段
      - icon: authing-bianzu3
        link: /guides/users/ldap-user-directory.html
        text: 使用 {{$localeConfig.brandName}} 的 LDAP 用户目录
    knowMore:
      link: /guides/users/
  - title: 管理用户账号
    links:
      - icon: authing-login
        link: /guides/user/create-user/
        text: 创建用户账号
      - icon: authing-xiangqing
        link: /guides/user/user-profile
        text: 查看用户详细信息
      - icon: authing-port-kz
        link: /guides/users/user-defined-field/
        text: 扩展用户属性
    knowMore:
      link: /guides/user/
  - title: 连接外部身份源（IdP）
    links:
      - icon: authing-wechat-mobile
        link: /guides/connections/social.html
        text: 社会化登录配置文档
      - icon: authing-oidc_logo
        link: /guides/connections/enterprise.html
        text: 企业身份源配置文档
      - icon: authing-database
        link: /guides/database-connection/overview.html
        text: 使用自定义数据库
    knowMore:
      link: /guides/connections/
  - title: FAQ
    links:
      - icon: authing-ID1
        link: /guides/faqs/get-userpool-id-and-secret.html
        text: 如何获取用户池 ID
      - icon: authing-anquanyuguanlibeifen
        link: /guides/security/config-domain.html
        text: 如何配置 Web 安全域
      - icon: authing-token-3
        link: /guides/faqs/how-to-validate-user-token.html
        text: 验证用户身份凭证（token）
    knowMore:
      link: /guides/faqs/get-userpool-id-and-secret.html
---
