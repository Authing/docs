# Node.js/Javascript

本指南将从 Authing Node.js/Javascript SDK 的安装开始逐步引导你如何快速为你已有或新开发的应用添加用户认证与管理能力。

<AppDetailSiderBar />

## 安装

```yarn
# 使用 `yarn` 进行安装
yarn add authing-js-sdk
```

## 认证你的用户

### 初始化

```js
const authenticationClient = new AuthenticationClient({
  appId: 'AUTHING_APP_ID', // 应用 ID
  secret: 'AUTHING_SECRET',// 应用 Secret
  appHost: 'AUTHING_DOMAIN',// 应用对应的用户池域名
  redirectUri: 'AUTHING_REDIRECTURI',// 认证完成后的重定向目标 URL
});
```

### 简单认证用户

```js
//生成 OIDC 协议的用户登录链接
const data = authenticationClient.buildAuthorizeUrl({
  scope: "openid profile offline_access"
})
```

## 管理你的用户


### 初始化

```javascript
import { ManagementClient } from 'authing-js-sdk'
const managementClient = new ManagementClient({
  userPoolId: 'AUTHING_USERPOOL_ID',// 用户池 ID
  secret: 'AUTHING_USERPOOL_SECRET',// 用户池密钥
})
```

### 简单管理用户

```js
//创建用户
const data = await managementClient.users.create({
  email: 'admin@test.com',
  password: 'password',
});
```


## 错误处理

```js
try {
  const user = await authing.loginByEmail('test@example.com', 'passw0rd')
} catch (error) {
  console.log(error.code) // 2004
  console.log(error.message) // 用户不存在
}
```
