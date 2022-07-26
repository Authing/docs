# Angular 

以下指南将逐步引导你如何使用 Authing SDK 为你`已有`或`新开发`的 `Angular 应用`添加`登录`、`登出`、`展示用户信息`、`发起认证授权`等`一系列认证能力`。

系统要求：Angular >= 14.0

<AppDetailSiderBar />

## 配置 Authing

第一步：使用 Authing 创建一个应用：

- 进入<a href="https://console.authing.cn/" target="blank">控制台</a>
- 选择`应用`菜单
- 点击右上角`创建自建应用`按钮
- 填写`应用名称`和`认证地址`、选择`单页 Web 应用`
- 点击创建

![image](./doc-assets/1.png)

第二步：在`认证配置`处填写`登录回调 URL`和`登出回调 URL`

![image](./doc-assets/2.png)

第三步：保存当前配置。

## 集成 Authing SDK

### 安装 SDK

``` shell
npm install --save authing-js-sdk
```

### 初始化 SDK

参考 [Angular demo](./src/app/app.module.ts)，修改以下配置为你的应用配置：

``` typescript
import { AuthingModule } from '../enhance-authing-sdk/authing.module'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthingModule.forRoot({
      // appId：控制台 -> 端点信息 -> App ID
      appId: '',
      // appHost：应用认证地址，控制台 -> 应用详情 -> 认证配置 -> 认证地址
      appHost: 'https://{应用域名}.authing.cn',
      // redirectUri：应用回调地址，在 Authing 完成认证后跳回的地址。控制台 -> 应用详情 -> 认证配置 -> 登录回调 URL
      redirectUri: '通过 Authing 登录成功后的跳转地址',
      // 默认
      tokenEndPointAuthMethod: 'none',
      // 默认
      introspectionEndPointAuthMethod: 'none'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## 使用 Authing SDK 相关能力

我们在原有 SDK 基础上封装了 `enhancedLogin`、`enhancedLogout`、`enchancedLoginCallback` 等方法，只需一行代码即可实现`登录`、`登出`、`处理登录成功后的回调` 等能力。

### 登录、登出

调用 SDK 登录方法 `enhancedLogin`，让用户在 Authing 托管的登录页完成认证。登录成功后，Authing 会将用户重定向回你的应用。

调用 SDK 登出方法 `enhancedLogout`，默认将重定向到您当前应用的 Host 首页，你也可以传入参数来自定义重定向地址。

``` typescript
import { Component } from '@angular/core'

import { AuthingService } from '../../../enhance-authing-sdk/authing.service'

@Component({
  selector: 'login-container',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor (
    private authing: AuthingService
  ) {}

  userInfo = ''

  ngOnInit () {
    this.getCurrentUser()
  }

  onLogin () {
    this.authing.client.enhancedLogin()
  }

  onLogout () {
    this.authing.client.enhancedLogout()
  }

  async getCurrentUser () {
    const _userInfo = await this.authing.client.getCurrentUser()
    this.userInfo = _userInfo && JSON.stringify(_userInfo, null, 2) || ''
  }
}
```

### 处理登录成功后的回调

用户在 Authing 完成认证后跳转到业务应用。本来需要做以下几步操作：

- 从 query 中取出 code
- 从 localStorage 中取出发起登录时的 code_verifier
- 调用 getAccessTokenByCode 函数，获取 Access token
- 使用 Access token 调用 getUserInfoByAccessToken 函数
- 获取用户信息。

现在你只需要调用 `enchancedLoginCallback` 即可：

``` typescript
import { Component } from '@angular/core'
import { Router } from '@angular/router'

import { AuthingService } from '../../../enhance-authing-sdk/authing.service'

@Component({
  selector: 'callback-container',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent {
  constructor (
    private router: Router,
    private authing: AuthingService
  ) {}

  ngOnInit () {
    this.handleAuthingLoginCallback()
  }

  async handleAuthingLoginCallback () {
    await this.authing.client.enchancedLoginCallback()
    this.router.navigateByUrl('personal', {
      replaceUrl: true
    })
  }
}
```

### 展示用户信息

我们可以使用 SDK 提供的 getCurrentUser 方法获取用户信息。

``` typescript
import { Component } from '@angular/core'

import { AuthingService } from '../../../enhance-authing-sdk/authing.service'

@Component({
  selector: 'test-container',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {
  constructor (
    private authing: AuthingService
  ) {}

  userInfo = ''

  ngOnInit () {
    this.getCurrentUser()
  }

  async getCurrentUser () {
    const _userInfo = await this.authing.client.getCurrentUser()
    this.userInfo = _userInfo && JSON.stringify(_userInfo, null, 2) || ''
  }
}
```

## 资源

- [用户认证 SDK 所有功能](https://docs.authing.cn/v2/reference/sdk-for-node/authentication/)
- [论坛社区](https://forum.authing.cn/)
