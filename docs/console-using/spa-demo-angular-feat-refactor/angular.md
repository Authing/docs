# Angular 

本指南将从 Authing Browser SDK 的安装开始逐步引导你如何快速为你已有或新开发的 Angular 应用添加用户认证能力。

<AppDetailSiderBar />

## 安装

```bash
$ yarn add @authing/browser
```


## 认证你的用户

### 初始化

```js
import { Authing } from '@authing/browser';

const sdk = new Authing({
  domain: 'AUTHING_DOMAIN', // 应用的认证地址
  appId: 'AUTHING_APP_ID',// 应用 ID
  redirectUri: 'AUTHING_REDIRECTURI',// 登录回调地址
});
```

### 简单认证用户


```html
<!-- src/app/app.component.html -->

<div>
  <p>
    <button (click)="login()">loginWithRedirect</button>
  </p>
  <p *ngIf="loginState">
    <textarea cols="100" rows="20" readOnly>{{ loginState | json }}</textarea>
  </p>
</div>
```

```ts
// <!-- src/app/app.component.ts -->

import { Component } from '@angular/core';
import { Authing } from '@authing/browser';
import type { LoginState } from '@authing/browser/dist/types/global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  loginState: LoginState | null = null;

  private sdk = new Authing({
    domain: 'AUTHING_DOMAIN',
    appId: 'AUTHING_APP_ID',
    redirectUri: 'AUTHING_REDIRECTURI',
  });

  ngOnInit() {
    // 校验当前 url 是否是登录回调地址
    if (this.sdk.isRedirectCallback()) {
      console.log('redirect');
      /**
       * 以跳转方式打开 Authing 托管的登录页，认证成功后需要配合 
       * handleRedirectCallback 方法，在回调端点处理 Authing 发送的
       * 授权码或 token，获取用户登录态
       */
      this.sdk.handleRedirectCallback().then((res) => {
        this.loginState = res;
        window.location.replace('/');
      });
    } else {
      this.getLoginState();
    }
  }

  // 以跳转方式打开 Authing 托管的登录页
  
  login() {
    this.sdk.loginWithRedirect();
  }

  // 获取用户的登录状态
 
  async getLoginState() {
    try {
      const state = await this.sdk.getLoginState();
      this.loginState = state;
    } catch(error) {
      console.log(error);
    }
  }
}
```

## 错误处理


```ts
async getLoginState() {
  try {
    const state = await this.sdk.getLoginState();
    this.loginState = state;
  } catch(error) {
    console.log(error);
  }
}
```
