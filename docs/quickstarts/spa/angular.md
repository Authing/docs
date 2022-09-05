---
noToc: true
lastUpdated: true
sidebarType: page
noPageNav: true
downloadDemo:
  title: 本页资源
  description: 下载一个 Angular 快速开始的示例程序或在 GitHub 查看。
  downloadUrl: https://github.com/Authing/spa-demo-angular/archive/refs/heads/main.zip
  jumpUrl: https://github.com/Authing/spa-demo-angular
---

# Angular 快速开始

你可以使用 Authing 快速为新开发的或已有的 Angular 应用集成**认证能力**。本教程讲述如何使用 Authing Browser SDK 为你的 Angular 应用添加认证能力。

> 如果您只需登录组件，可参考 [**登录组件文档**](/reference/guard/v2/angular.md)

## 配置 Authing

### 创建自建应用

> 也可以使用现有应用

在控制台的「自建应用」页面，点击「创建自建应用」，应用类型选择「单页 Web 应用」，并填入以下信息：

- 应用名称：你的应用名称；
- 认证地址：选择一个二级域名，必须为合法的域名格式，例如 `my-spa-app`；

![](~@imagesZhCn/common/integrate-sso/sso-create-app-1.png)

![](~@imagesZhCn/common/integrate-sso/sso-create-app-2.png)


### 配置应用

在「自建应用」列表中，找到上一步创建好的应用，点击应用卡片进入「应用配置」页面，修改如下配置项并保存：

- **认证配置**：配置 `登录回调 URL`
- **授权配置**：`授权模式`开启 `authorization_code`、`refresh_token`
- **授权配置**：`返回类型`开启 `code`

![](~@imagesZhCn/common/integrate-sso/sso-callback.png)

![](~@imagesZhCn/common/integrate-sso/sso-authorization-configuration.png)

至此，配置完成。


### 记录应用信息

为了下面方便顺利地使用 Authing Browser SDK，你需要记下该应用的这几个信息：

- App ID
- 认证地址
- 登录回调 URL

![](~@imagesZhCn/quickstarts/spa/app-info.png)


## 集成 Authing

Authing Browser SDK 支持通过包管理器安装、script 标签引入的方式的方式集成到你的前端业务软件。

### 安装 SDK

#### 使用 NPM 安装

```bash
$ npm install @authing/web
```

#### 使用 Yarn 安装

```bash
$ yarn add @authing/web
```

#### 使用 script 标签直接引入

```html
<head>
  <script src="//cdn.jsdelivr.net/npm/@authing/web"></script>
</head>
```

### 初始化 SDK

可以根据上面步骤中记录的 `App ID`、`认证地址`、`登录回调 URL` 等信息，进行 SDK 的初始化，如下示例：

!!!include(common/spa-auth-code-snippets/initialize.md)!!!

### 发起登录

Authing Browser SDK 可以向 Authing 发起认证授权请求，目前支持下面两种登录方式：

- 在当前窗口转到 Authing 托管的登录页
- 弹出一个窗口，在弹出的窗口中加载 Authing 托管的登录页

#### 跳转登录

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

```ts{41-48}
// <!-- src/app/app.component.ts -->

import { Component } from '@angular/core';
import { Authing } from '@authing/web';
import type { LoginState } from '@authing/web/dist/typings/global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  loginState: LoginState | null = null;

  private sdk = new Authing({
    // 应用的认证地址，例如：https://domain.authing.cn
    domain: '认证地址',
    appId: '应用 ID',
    // 登录回调地址，需要在控制台『应用配置 - 登录回调 URL』中指定
    redirectUri: '登录回调地址',
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

  /**
   * 以跳转方式打开 Authing 托管的登录页
   */
  login() {
    this.sdk.loginWithRedirect();
  }

  /**
   * 获取用户的登录状态
   */
  async getLoginState() {
    const state = await this.sdk.getLoginState();
    this.loginState = state;
  }
}
```

如果你想自定义参数，也可以对以下参数进行自定义传参，如不传参将使用默认参数

```ts
export class AppComponent {
  ...
  /**
   * 以跳转方式打开 Authing 托管的登录页
   */
  login() {
    const params: {
      // 回调地址，默认为初始化参数中的 redirectUri
      redirectUri?: string;

      // 发起登录的 URL，若设置了 redirectToOriginalUri 会在登录结束后重定向
      // 回到此页面，默认为当前 URL
      originalUri?: string;

      // 即使在用户已登录时也提示用户再次登录
      forced?: boolean;

      // 自定义的中间状态，会被传递到回调端点
      customState?: any;
    } = {
      redirectUri: '回调地址',
      originalUri: '发起登录的 URL',
      forced: false,
      customState: {},
    }
    this.sdk.loginWithRedirect(params);
  }
  ...
}
```


#### 弹出窗口登录

你也可以在你的业务软件页面使用下面的方法，通过弹出一个新窗口的方式让用户在新窗口登录：

```html
<!-- src/app/app.component.html -->

<div>
  <p>
    <button (click)="login()">loginWithPopup</button>
  </p>
  <p *ngIf="loginState">
    <textarea cols="100" rows="20" readOnly>{{ loginState | json }}</textarea>
  </p>
</div>
```

```ts{26-34}
// <!-- src/app/app.component.ts -->

import { Component } from '@angular/core';
import { Authing } from '@authing/web';
import type { LoginState } from '@authing/web/dist/typings/global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  loginState: LoginState | null = null;

  private sdk = new Authing({
    // 应用的认证地址，例如：https://domain.authing.cn
    domain: "认证地址",
    appId: "应用 ID",
    // 登录回调地址，需要在控制台『应用配置 - 登录回调 URL』中指定
    redirectUri: "登录回调地址",
  });

  ngOnInit() {
    this.getLoginState();
  }

  /**
   * 以弹窗方式打开 Authing 托管的登录页
   */
  async login() {
    const res = await this.sdk.loginWithPopup();
    this.loginState = res;
  }

  /**
   * 获取用户的登录状态
   */
  async getLoginState() {
    const state = await this.sdk.getLoginState();
    this.loginState = state;
  }
}
```


如果你想自定义参数，也可以对以下参数进行自定义传参，如不传参将使用默认参数

```ts
export class AppComponent {
  ...
  /**
   * 以弹窗方式打开 Authing 托管的登录页
   */
  async login() {
    const params: {
      // 回调地址，默认为初始化参数中的 redirectUri
      redirectUri?: string;

      // 即使在用户已登录时也提示用户再次登录
      forced?: boolean;
    } = {
      redirectUri: '回调地址',
      forced: false,
    };
    const res = await this.sdk.loginWithPopup(params);
    this.loginState = res;
  };
  ...
}
```


#### 高级使用

每次发起登录本质是访问一个携带许多参数的 URL 地址，Authing Browser SDK 默认会使用缺省参数。如果你需要精细控制登录请求参数，可以参考本示例。

!!!include(common/spa-auth-code-snippets/advanced.md)!!!


### 检查登录态并获取 Token

如果你想检查用户的登录态，并获取用户的 `Access Token`、`ID Token`，可以调用 `getLoginState` 方法，如果用户没有在 Authing 登录，该方法会抛出错误：

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

```ts{49-55}
// <!-- src/app/app.component.ts -->

import { Component } from '@angular/core';
import { Authing } from '@authing/web';
import type { LoginState } from '@authing/web/dist/typings/global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  loginState: LoginState | null = null;

  private sdk = new Authing({
    // 应用的认证地址，例如：https://domain.authing.cn
    domain: '认证地址',
    appId: '应用 ID',
    // 登录回调地址，需要在控制台『应用配置 - 登录回调 URL』中指定
    redirectUri: '登录回调地址',
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

  /**
   * 以跳转方式打开 Authing 托管的登录页
   */
  login() {
    this.sdk.loginWithRedirect();
  }

  /**
   * 获取用户的登录状态
   */
  async getLoginState() {
    const state = await this.sdk.getLoginState();
    this.loginState = state;
  }
}
```


### 获取用户信息

你需要使用 `Access Token` 获取用户的个人信息：

- 用户初次登录成功时可以在回调函数中拿到用户的 Access Token，然后使用 Access Token 获取用户信息；
- 如果用户已经登录，你可以先获取用户的 Access Token 然后使用 Access Token 获取用户信息。

```html
<!-- src/app/app.component.html -->

<div>
  <p>
    <button (click)="login()">loginWithRedirect</button>
    <button (click)="getUserInfo()">getUserInfo</button>
  </p>
  <p *ngIf="loginState">
    <textarea cols="100" rows="20" readOnly>{{ loginState | json }}</textarea>
  </p>
  <p *ngIf="userInfo">
    <textarea cols="100" rows="20" readOnly>{{ userInfo | json }}</textarea>
  </p>
</div>
```

```ts{46-58}
// <!-- src/app/app.component.ts -->

import { Component } from '@angular/core';
import { Authing } from '@authing/web';
import type {
  LoginState,
  UserInfo
} from '@authing/web/dist/typings/global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  loginState: LoginState | null = null;
  userInfo: UserInfo | null = null;

  private sdk = new Authing({
    // 应用的认证地址，例如：https://domain.authing.cn
    domain: '认证地址',
    appId: '应用 ID',
    // 登录回调地址，需要在控制台『应用配置 - 登录回调 URL』中指定
    redirectUri: '登录回调地址',
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

  /**
   * 用 Access Token 获取用户身份信息
   */
  async getUserInfo() {
    if (!this.loginState) {
      alert('用户未登录');
      return;
    }
    const userInfo = await this.sdk.getUserInfo({
      accessToken: this.loginState.accessToken,
    });
    this.userInfo = userInfo;
  }

  /**
   * 以跳转方式打开 Authing 托管的登录页
   */
  login() {
    this.sdk.loginWithRedirect();
  }

  /**
   * 获取用户的登录状态
   */
  async getLoginState() {
    const state = await this.sdk.getLoginState();
    this.loginState = state;
  }
}
```



### 退出登录

可以调用 SDK 的 `logoutWithRedirect` 方法退出登录

```html
<!-- src/app/app.component.html -->

<div>
  <p>
    <button (click)="login()">loginWithRedirect</button>
    <button (click)="logout()">logout</button>
  </p>
  <p *ngIf="loginState">
    <textarea cols="100" rows="20" readOnly>{{ loginState | json }}</textarea>
  </p>
</div>
```

```ts{49-54}
// <!-- src/app/app.component.ts -->

import { Component } from '@angular/core';
import { Authing } from '@authing/web';
import type { LoginState } from '@authing/web/dist/typings/global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  loginState: LoginState | null = null;

  private sdk = new Authing({
    // 应用的认证地址，例如：https://domain.authing.cn
    domain: '认证地址',
    appId: '应用 ID',
    // 登录回调地址，需要在控制台『应用配置 - 登录回调 URL』中指定
    redirectUri: '登录回调地址',
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

  /**
   * 以跳转方式打开 Authing 托管的登录页
   */
  login() {
    this.sdk.loginWithRedirect();
  }

  /**
   * 登出
   */
  logout() {
    this.sdk.logoutWithRedirect();
  }

  /**
   * 获取用户的登录状态
   */
  async getLoginState() {
    const state = await this.sdk.getLoginState();
    this.loginState = state;
  }
}
```

如果你想自定义参数，也可以对以下参数进行自定义传参，如不传参将使用默认参数

```ts
export class AppComponent {
  ...
  /**
   * 登出
   */
  logout() {
    const options: {
      // 登出完成后的回调地址，默认为初始化参数中的 logoutRedirectUri
      // 登出回调地址，需要在控制台『应用配置 - 登出回调 URL』中指定
      redirectUri?: string | null;

      // 自定义中间状态
      state?: string;
    } = {
      redirectUri: 'https://localhost:3000/?logout'
    };
    this.sdk.logoutWithRedirect(options);
  }
  ...
}
```

## 调用资源 API

接下来讲述如何从 Angular 应用**请求外部资源服务器的 API**。

> 如果你跟随之前的步骤为你的 Angular 应用集成了认证功能，需要先**登出**，我们需要一个新的 Access Token。

### 搭建服务端 API

首先需要搭建服务端 API 接口，供 Angular 应用调用。本教程我们使用一个现成的 API Server。

克隆 API Server 仓库：

```bash
$ git clone git@github.com:Authing/m2m-demo-express.git
```

进入项目目录，安装依赖：

```bash
$ npm install
```

在 `/app.js` 第 12 行，修改配置为你的应用配置：

```js
// 授权中间件，Access Token 必须存在，并且能被 Authing 应用公钥验签
const checkJwt = jwt({
	// 从 Authing 应用服务发现地址动态获取验签公钥
	secret: jwksRsa.expressJwtSecret({
		cache: true,
		rateLimit: true,
		jwksRequestsPerMinute: 5,
		jwksUri: `https://{应用域名}.authing.cn/oidc/.well-known/jwks.json`
	}),

	// 验证受众和颁发者
	audience: 'APP_ID',
	issuer: [`https://{应用域名}.authing.cn/oidc`],
	algorithms: ['RS256']
});
```

启动 API Server：

```bash
$ npm start
```

更多详情请参考 [Node.js Express API Server 快速开始](/quickstarts/apiServer/nodeJsExpress/README.md)。


### 设置资源权限

为了获取一个具备资源权限的 Access Token，首先需要在 Authing 定义**谁具备什么资源的什么权限**。

#### 创建一个用户

在**用户管理** > **用户列表**，点击右侧的「创建」按钮。

创建一个测试用户。

![](~@imagesZhCn/quickstarts/spa/create-user.png)

#### 创建资源

在应用详情页面，点击「授权」选项卡，在「API 资源」卡片点击添加。

![](~@imagesZhCn/quickstarts/apiServer/create-resource-1.png)

填写资源名称：order，资源描述：订单，API 接口的 URL 地址：`http://localhost:5000/api/protected`，为资源定义一个**操作**，本教程为**订单资源**定义一个**读取操作**，点击添加操作，操作类型填 `read`，描述填读取订单。最后点击保存。

![](~@imagesZhCn/quickstarts/apiServer/create-resource-2.png)

#### 资源授权

在「资源授权」选项卡，点击添加。

![](~@imagesZhCn/quickstarts/spa/resource-acl.png)

「**被授权主体类型**」选择「**用户**」，「**被授权主体**」搜索刚才创建的测试用户，「**授权作用**」选择允许，「**资源类型**」选择刚刚定义的订单资源，「**资源标识符**」保留默认，「**操作**」选择特定操作，选择读取订单操作。最后点击确定。

![](~@imagesZhCn/quickstarts/spa/resource-authz-1.png)

![](~@imagesZhCn/quickstarts/spa/resource-authz-2.png)


### 使用 Access Token 调用资源 API

接下来我们在 Angular 应用中调用后端接口。你可以在**请求头中携带 Access Token**，API 服务器会检查 Access Token 合法性和具备的权限，然后返回数据。

> API 服务器 `http://localhost:5000/api/protected` 要求 order:read 权限 scope。

```html
<!-- src/app/app.component.html -->

<div>
  <p>
    <button (click)="login()">loginWithRedirect</button>
    <button (click)="handleResource()">handleResource</button>
  </p>
  <p *ngIf="loginState">
    <textarea cols="100" rows="20" readOnly>{{ loginState | json }}</textarea>
  </p>
  <p *ngIf="resource">
    <textarea cols="100" rows="5" readOnly>{{ resource | json }}</textarea>
  </p>
</div>
```

```ts{58-74}
// <!-- src/app/app.component.ts -->

import { Component } from '@angular/core';
import { Authing } from '@authing/web';
import type { LoginState } from '@authing/web/dist/typings/global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  loginState: LoginState | null = null;
  resource: object | null = null;

  private sdk = new Authing({
    // 应用的认证地址，例如：https://domain.authing.cn
    domain: '认证地址',
    appId: '应用 ID',
    // 登录回调地址，需要在控制台『应用配置 - 登录回调 URL』中指定
    redirectUri: '登录回调地址',
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

  /**
   * 以跳转方式打开 Authing 托管的登录页
   */
  login() {
    this.sdk.loginWithRedirect();
  }

  /**
   * 获取用户的登录状态
   */
  async getLoginState() {
    const state = await this.sdk.getLoginState();
    this.loginState = state;
  }

  /**
   * 使用 Access Token 调用资源 API
   */
  async handleResource() {
    try {
      let res = await fetch('http://localhost:5000/api/protected', {
        headers: {
          Authorization: `Bearer ${this.loginState?.accessToken}`,
        },
        method: "GET",
      });
      let data = await res.json();
      this.resource = data;
    } catch (err) {
      alert("无权访问接口");
    }
  }
}
```


恭喜 🎉，到此你学会了在 Angular 单页应用中集成 Authing 认证授权，并调用外部的资源服务器接口。

## 接下来你可能需要

使用 Authing 保护 API 接口：
::: page-ref /quickstarts/apiServer/nodeJsExpress/
:::

学习资源、角色、权限管理内容：
::: page-ref /guides/access-control/
:::

自建应用 SSO 方案：
::: page-ref /guides/authentication/sso/
:::
