---
home: true
noSidebar: true
mainTitle: Document
subTitle: Here, start an exciting first step! Learn how to use {{$localeConfig.brandName}} and the API provided by {{$localeConfig.brandName}}.
searchPlaceholder: Please enter keywords to search product documents
hotSearchText: Popular Searches
exploreUse: Explore the use of {{$localeConfig.brandName}}
hotSearch:
  - text: How to authenticate users
    link: /en/guides/authentication/
  - text: How to authorize users
    link: /en/guides/authorization/
  - text: Quickly implement single sign-on
    link: /en/guides/authentication/sso/
  - text: Add social login
    link: /en/guides/authentication/social/
  - text: How to verify token
    link: /en/guides/faqs/how-to-validate-user-token.html
sdkConfig:
  ios:
    name: iOS Swift
    link: /en/reference/sdk-for-ios/
    icon: iOS
  android:
    name: Android
    link: /en/reference/sdk-for-android/
    icon: Android
  flutter:
    name: Flutter
    link: /en/reference/sdk-for-flutter/
    icon: Flutter
  javascript:
    name: JavaScript
    link: /en/reference/sdk-for-node/
    icon: JavaScript
  reactNative:
    name: React Native
    link: /en/reference/sdk-for-react-native/
    icon: React-Native
  cSharp:
    name: C Sharp
    link: /en/reference/sdk-for-csharp/
    icon: csharp
  react:
    name: React
    link: /en/reference/guard/v2/react
    icon: React-Native
  angular:
    name: Angular
    link: /en/reference/guard/v2/angular
    icon: Angular
  vue:
    name: Vue
    link: /en/reference/guard/v2/vue
    icon: Vue
  python:
    name: Python
    link: /en/reference/sdk-for-python/
    icon: Python
  nodeJs:
    name: Node.js
    link: /en/reference/sdk-for-node/
    icon: Nodejs
  ruby:
    name: Ruby
    link: /en/reference/sdk-for-ruby.html
    icon: Ruby
  java:
    name: Java
    link: /en/reference/sdk-for-java/
    icon: Java
  golang:
    name: Golang
    link: /en/reference/sdk-for-go/
    icon: Go
applicationSdks:
  - title: Client Application
    description: Applications on mobile, destop and other smart devices
    color: "#396AFF"
    sdks:
      - ios
      - android
      - flutter
      - reactNative
      - cSharp
  - title: Single Page Application
    description: Modern Single-page Web Applications
    color: "#75A3FF"
    sdks:
      - javascript
      - react
      - angular
      - vue
  - title: Standard Web Application
    description: Traditional Multi-page Web Applications
    color: "#28B1B0"
    sdks:
      - javascript
      - python
      - cSharp
      - nodeJs
      - ruby
      - java
      - golang
  - title: Backend / API service
    description: Backend Services and Applications without Web UI
    color: "#F8BC00"
    sdks:
      - javascript
      - python
      - cSharp
      - nodeJs
      - ruby
      - java
      - golang
sections:
  - title: Concept
    description: Understand the basics of {{$localeConfig.brandName}} architecture
    links:
      - text: What is User Pool
        link: /en/concepts/user-pool
      - text: What is Certification
        link: /en/concepts/authentication.html
      - text: What is Authorization
        link: /en/concepts/authorization.html
    knowMore:
      link: /en/concepts/
  - title: Quick Start
    description: Learn how to build a solution following our step-by-step instructions.
    links:
      - text: Use hosted login page
        link: /en/guides/basics/authenticate-first-user/use-hosted-login-page
      - text: Use the login form component
        link: /en/guides/basics/authenticate-first-user/use-embeded-login-component/
      - text: Use API & SDK
        link: /en/guides/basics/authenticate-first-user/use-api-sdk/
    knowMore:
      link: /en/guides/basics/authenticate-first-user/
  - title: Application Integration
    description: Integrate existing or local applications into {{$localeConfig.brandName}}.
    links:
      - text: Log in to Alibaba Cloud through {{$localeConfig.brandName}}
        link: /en/integration/ali-cloud/
      - text: Log in to Tencent Cloud through {{$localeConfig.brandName}}
        link: /en/integration/tencent-cloud/
      - text: Log in to HUAWEI CLOUD via {{$localeConfig.brandName}}
        link: /en/integration/huawei-cloud/
    knowMore:
      link: /en/integration/
explores:
  - title: Authenticate Users
    links:
      - icon: authing-login-password
        link: /en/guides/authentication/basic/password/
        text: Use account password authentication
      - icon: authing-xingzhuangjiehe1
        link: /en/guides/authentication/basic/sms/
        text: Use SMS verification code to authenticate
      - icon: authing-wechat-webpage-authorization
        link: /en/guides/authentication/social/
        text: Use social login authentication
    knowMore:
      link: /guides/authentication/
  - title: Manage User Privilege
    links:
      - icon: authing-certification
        link: /en/guides/access-control/choose-the-right-access-control-model.html
        text: Choose the right permission model
      - icon: authing-genggaimima
        link: /en/guides/access-control/rbac.html
        text: Integrate the RBAC permission model into your application system
      - icon: authing-Token-2
        link: /en/guides/access-control/abac.html
        text: Integrate ABAC permission model into your application system
    knowMore:
      link: /en/guides/access-control/
  - title: Manage User Directories
    links:
      - icon: authing-sousuo
        link: /en/guides/users/search.html
        text: Search users
      - icon: authing-zidingyiziduan-3
        link: /en/guides/users/user-defined-field/
        text: Add custom user fields
      - icon: authing-bianzu3
        link: /en/guides/users/ldap-user-directory.html
        text: Use {{$localeConfig.brandName}} LDAP user directory
    knowMore:
      link: /en/guides/users/
  - title: Manage user accounts
    links:
      - icon: authing-login
        link: /en/guides/user/create-user/
        text: Create user account
      - icon: authing-xiangqing
        link: /en/guides/user/user-profile
        text: View user details
      - icon: authing-port-kz
        link: /en/guides/users/user-defined-field/
        text: Extended user attributes
    knowMore:
      link: /en/guides/user/
  - title: Connect to an external identity source (IdP)
    links:
      - icon: authing-wechat-mobile
        link: /en/guides/connections/social.html
        text: Social login configuration document
      - icon: authing-oidc_logo
        link: /en/guides/connections/enterprise.html
        text: Enterprise Identity Source Configuration Document
      - icon: authing-database
        link: /en/guides/database-connection/overview.html
        text: Use a custom database
    knowMore:
      link: /en/guides/connections/
  - title: FAQ
    links:
      - icon: authing-ID1
        link: /en/guides/faqs/get-userpool-id-and-secret.html
        text: How to get the user pool ID
      - icon: authing-anquanyuguanlibeifen
        link: /en/guides/security/config-domain.html
        text: How to configure a web security domain
      - icon: authing-token-3
        link: /en/guides/faqs/how-to-validate-user-token.html
        text: Verify user credentials (token)
    knowMore:
      link: /en/guides/faqs/get-userpool-id-and-secret.html
---
