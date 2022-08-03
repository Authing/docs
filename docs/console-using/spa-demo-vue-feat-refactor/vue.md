# Vue 

本指南将从 Authing Browser SDK 的安装开始逐步引导你如何快速为你已有或新开发的 Vue 应用添加用户认证能力。

<AppDetailSiderBar />

## 安装

```bash
# 使用 Yarn 安装
$ yarn add @authing/browser
```


## 认证你的用户

### 初始化

```js
import { Authing } from '@authing/browser';

const sdk = new Authing({
  domain: 'AUTHING_DOMAIN',// 应用的认证地址
  appId: 'AUTHING_APP_ID',// 应用 ID
  redirectUri: 'AUTHING_REDIRECTURI',// 登录回调地址
});
```

### 简单认证用户

```js
import { Authing } from '@authing/browser';

export default {
  name: 'App',
  data() {
    return {
      sdk: null,
      loginState: null,
    };
  },
  created() {
    this.sdk = new Authing({
      domain: 'AUTHING_DOMAIN',
      appId: 'AUTHING_APP_ID',
      redirectUri: 'AUTHING_REDIRECTURI',
    });
  },
  mounted() {
    // 判断当前 URL 是否为 Authing 登录回调 URL
    if (this.sdk.isRedirectCallback()) {
      console.log('redirect');

      /**
       * 以跳转方式打开 Authing 托管的登录页，认证成功后，
       * 需要配合 handleRedirectCallback 方法，在回调端点处理 Authing 发送
       * 的授权码或 token，获取用户登录态
       */
      this.sdk.handleRedirectCallback().then((res) => {
        this.loginState = res;
        window.location.replace('/');
      });
    } else {
      this.getLoginState();
    }
  },
  methods: {
    
    // 以跳转方式打开 Authing 托管的登录页
    
    login() {
      this.sdk.loginWithRedirect();
    },
    
    // 获取用户的登录状态
    
    async getLoginState() {
      try {
        const state = await this.sdk.getLoginState();
        this.loginState = state;
      } catche(error) {
        console.log(error);
      }
    },
  },
};
```


## 错误处理


```js
async getLoginState() {
  try {
    const state = await this.sdk.getLoginState();
    this.loginState = state;
  } catche(error) {
    console.log(error);
  }
},
```
