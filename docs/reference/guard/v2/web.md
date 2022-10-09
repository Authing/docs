# 将 Guard 接入到 WEB 应用

## 说明

[Guard 5.0](https://github.com/authing/guard) 于 2022 年 8 月 17 日发布，推荐使用 Guard 5.0 及以上版本，低于 5.0 的版本将不再维护！

如果你正在使用之前的版本 [Guard 3.x](https://github.com/Authing/authing-ui-components/tree/v3.1.25) 或 [Guard 4.x](https://github.com/authing/authing-ui-components)，仍然可以参考：

- [将 Guard 接入到 React 项目(4.x)](https://docs.authing.cn/v2/reference/guard/v2/react.html)
- [将 Guard 接入到 Vue 项目(4.x)](https://docs.authing.cn/v2/reference/guard/v2/vue.html)
- [将 Guard 接入到 Angular 项目(4.x)](https://docs.authing.cn/v2/reference/guard/v2/angular.html)
- [将 Guard 接入到原生 JS 项目(4.x)](https://docs.authing.cn/v2/reference/guard/v2/native-javascript.html)

Guard 是 Authing 提供的一种轻便的认证组件，你可以把它嵌入在你任何的通过浏览器进行用户交互的应用中，一站式处理复杂的用户认证流程。

现在开始跟随引导将 Authing Guard 接入到你的项目中吧！

## STEP 1: 在 Authing 控制台创建应用

**首先，你需要将你的应用接入 Authing 控制台**。如果你还没有创建，请先[在 Authing 控制台创建一个应用](https://docs.authing.cn/v2/guides/app/create-app.html)。

从 Authing 控制台左侧导航进入「自建应用」功能区，点击右上角的**创建自建应用**按钮，填入以下信息：

- 应用名称：填入你的应用名称；
- 认证地址：选择一个二级域名，必须为合法的域名格式，例如 `my-awesome-app`；
- 应用类型：选择「标准 Web 应用」或「单页 Web 应用」；

![guard-create-application.png](./images/guard-create-application.png)

创建完成！接下来你将正式开始 Authing Guard (v5.0） 的接入和配置。

## STEP 2:  安装、初始化并获取 Guard 实例

### 安装并初始化

有两种方式可以供你选择：**「安装 Authing library」** 或 **「直接通过浏览器加载」**。

无论使用哪一种安装方式，你都需要用到应用的 `appid`，请先[前往控制台获取](https://docs.authing.cn/v2/guides/faqs/get-app-id-and-secret.html)

#### 方法一：安装 Authing library

**首先，通过 npm/yarn 安装 Authing library.**

推荐使用 npm 或 yarn，它们能更好的和 webpack 打包工具进行配合，也可放心地在生产环境打包部署使用，享受整个生态圈和工具链带来的诸多好处。

:::: tabs :options="{ useUrlFragment: false }"
::: tab React
``` shell
# 兼容 React 16 / 17
npm install --save @authing/guard-react
```
:::

::: tab Vue2
``` shell
# 兼容 Vue 2
npm install --save @authing/guard-vue2
```
:::

::: tab Vue3
``` shell
# 兼容 Vue 3
npm install --save @authing/guard-vue3
```
:::

::: tab Angular
``` shell
# 兼容 Angular 14
npm install --save @authing/guard-angular
```
:::
::::

:::: tabs :options="{ useUrlFragment: false }"
::: tab React
``` tsx
// 完整的代码示例请参考：https://github.com/Authing/Guard/blob/master/examples/guard-react/src/App.tsx
// App.tsx
import React from 'react'
import { GuardProvider } from '@authing/guard-react'
import '@authing/guard-react/dist/esm/guard.min.css'
// 你的业务代码根组件
import RouterComponent from './router'

function App() {
  return (
    <GuardProvider
      appId="AUTHING_APP_ID",
      
      // 如果你使用的是私有化部署的 Authing 服务，需要传入自定义 host，如 
      // host="https://my-authing-app.example.com"
    >
      <RouterComponent></RouterComponent>
    </GuardProvider>
  )
}
```
:::

::: tab Vue2
``` javascript
// 完整的代码示例请参考：https://github.com/Authing/Guard/blob/master/examples/guard-vue2/src/main.js
// main.js
import Vue from 'vue'
import { GuardPlugin } from '@authing/guard-vue2'
import '@authing/guard-vue2/dist/esm/guard.min.css'

Vue.use(GuardPlugin, {
  appId: 'AUTHING_APP_ID',
  // 如果你使用的是私有化部署的 Authing 服务，需要传入自定义 host，如 
  // host: 'https://my-authing-app.example.com'
})
```
:::

::: tab Vue3
``` typescript
// 完整的代码示例请参考：https://github.com/Authing/Guard/blob/master/examples/guard-vue3/src/main.ts
// main.ts
import { createApp } from 'vue'
import { createGuard } from '@authing/guard-vue3'
import '@authing/guard-vue3/dist/esm/guard.min.css'
import App from './App.vue'

const app = createApp(App)

app.use(
  createGuard({
    appId: 'AUTHING_APP_ID',
    // 如果你使用的是私有化部署的 Authing 服务，需要传入自定义 host，如 
    // host: 'https://my-authing-app.example.com'
  })
)
```
:::

::: tab Angular
``` json
// angular.json
{
  "projects": {
    "architect": {
      "build": {
        "styles": [
          "node_modules/@authing/guard-angular/dist/guard.min.css"
        ]
      }
    }
  }
}
```
``` typescript
// 完整的代码示例请参考：https://github.com/Authing/Guard/blob/master/examples/guard-angular/src/app/app.module.ts
// app.module.ts
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { GuardModule } from '@authing/guard-angular'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GuardModule.forRoot({
      appId: 'AUTHING_APP_ID',
      // 如果你使用的是私有化部署的 Authing 服务，需要传入自定义 host，如 
      // host: 'https://my-authing-app.example.com'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
```
:::
::::

调试成功后，即完成 Authing library 的初始化加载。

#### 方法二：直接通过浏览器加载

**首先，在你的 HTML 文件中使用 `script` 和 `link` 标签直接引入文件，并使用全局变量 `GuardFactory`。**

``` html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Authing Guard Demo</title>
  <script src="https://cdn.authing.co/packages/guard/5.0.5/guard.min.js"></script>
  <link rel="stylesheet" href="https://cdn.authing.co/packages/guard/5.0.5/guard.min.css" />
</head>
<body>
  <div id="authing-guard-container"></div>

  <script>
    const guard = new GuardFactory.Guard({
      // 你可以前往 Authing 控制台的本应用详情页查看你的 appId
      appId: "AUTHING_APP_ID",

      // 如果你使用的是私有化部署的 Authing 服务，需要传入自定义 host，如 
      // host: 'https://my-authing-app.example.com'
    })

    // 挂载 Authing Guard
    guard.start('#authing-guard-container')
  </script>
</body>
</html>
```

**无论通过哪一种方式，你都可以完成 Authing Guard 在你项目中的安装和初始化。**

接下来，你可以根据实际的需要，直接阅读对应的使用指南和代码示例。

### 获取 Guard 实例

安装完成后，你可以获取 Guard 实例并将 Guard 挂载到 DOM 中：

:::: tabs :options="{ useUrlFragment: false }"
::: tab React
``` tsx
// 完整的代码示例请参考：https://github.com/Authing/Guard/blob/master/examples/guard-react/src/pages/Home.tsx
import { useGuard } from '@authing/guard-react'

export default function Login () {
  const guard = useGuard()

  console.log('guard instance: ', guard)

  return <div></div>
}
```
:::

::: tab Vue2
``` javascript
// 完整的代码示例请参考：https://github.com/Authing/Guard/blob/master/examples/guard-vue2/src/views/Home.vue
export default {
  created () {
    console.log('guard instance: ', this.$guard)
  }
}
```
:::

::: tab Vue3
``` javascript
// Composition API 
// 完整的代码示例请参考：https://github.com/Authing/Guard/blob/master/examples/guard-vue3/src/views/Home.vue
import { useGuard } from '@authing/guard-vue3'

const guard = useGuard()

console.log('guard instance: ', guard)
```
:::

::: tab Angular
``` typescript
// Angular 组件中使用 Guard API
// 完整的代码示例请参考：https://github.com/Authing/Guard/blob/master/examples/guard-angular/src/app/pages/home/home.component.ts
import { Component } from '@angular/core'
import { GuardService } from '@authing/guard-angular'

@Component({
  selector: 'home-container',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor (
    // 使用 Angular 依赖注入，获取 Guard 实例
    private guard: GuardService
  ) {}

  ngOnInit () {
    console.log('guard instance: ', this.guard.client)
  }
}
```
:::
::::

## STPE 3: 常用操作

### 托管模式 & 内嵌模式

**托管模式：** 指跳转到 Authing 提供的托管登录页。Authing 默认使用 OIDC 标准协议认证，你的用户在登录时将始终由 Authing 提供的认证最佳实践保驾护航。

- 安全性：你的业务系统将用户重定向到 Authing，在此用户进行身份验证，然后重定向回在控制台配置的应用回调连接。

- 样式丰富性：托管模式提供了中等程度的登录注册表单自定义配置，可通过控制台配置和 CSS 进行界面自定义。

- 集成便利性：你不需要额外运维登录页面，Authing 将负责此页面的维护和升级，当 Authing 有新功能发布之后，你不需要做任何操作即可获取最新能力。

**内嵌模式：** 指的是将 Authing 提供的登录组件（Guard）嵌入到你的 Web 应用中。仅需要几行 JavaScript 代码即可，该模式包含两种形态：

- 普通形态：样式与托管模式一致，但灵活之处在于你可以将它嵌入到你的任意的 DOM 节点。

- 模态框形态：和普通形态类似，只不过通过模态框（Modal）的样式进行展示。

**对于大多数登录认证场景，我们推荐使用「托管模式」进行集成。这是最简便、最安全、最通用的 Authing 认证最佳实践。**

### 托管模式

托管模式将跳转到 Authing 提供的托管登录页。由于此模式 Authing 默认使用 OIDC 标准协议认证，你需要进行以下额外配置：

- 在 [Authing 控制台](https://console.authing.cn) 的`应用` - `自建应用` - `应用详情`中配置`登录回调 URL`，回调地址为下述示例代码中 Callback 页面地址，此处以 `http://localhost:3000/callback` 为例：

![guard-console-login-redirect-url](./images/guard-console-login-redirect-url.png)

- 在应用详情的`应用配置` - `其他配置` - `授权配置`中，请确保应用的「换取 token 身份验证方式」设置为了 `none`（如果你的应用类型为单页 Web 应用，此次选项会被隐藏，为正常情况）。

![guard-console-identify-verify-mode](./images/guard-console-identify-verify-mode.png)


// ......... startWithRedirect 的说明和参数配置

### 内嵌模式

#### 普通形态

:::: tabs :options="{ useUrlFragment: false }"
::: tab React
``` tsx
import React, { useEffect } from 'react'

import { useGuard } from '@authing/guard-react'

export default function Login() {
  // 获取 Guard 实例
  const guard = useGuard()

  useEffect(() => {
    // 使用 start 方法挂载 Guard 组件到你指定的 DOM 节点，登录成功后返回 userInfo
    guard.start('#authing-guard-container').then(userInfo => {
      console.log(userInfo)
    })
  }, [])

  return <div>
    <div id="authing-guard-container"></div>
  </div>
}
```
:::

::: tab Vue2
``` javascript
export default {
  mounted () {
    // 使用 start 方法挂载 Guard 组件到你指定的 DOM 节点，登录成功后返回 userInfo
    this.$guard.start('#authing-guard-container').then(userInfo => {
      console.log(userInfo)
    })
  }
}
```
:::

::: tab Vue3
``` javascript
import { onMounted } from 'vue'
import { useGuard } from '@authing/guard-vue3'

const guard = useGuard()

const unmountGuard = () => guard.unmount()

onMounted(() => {
  // 使用 start 方法挂载 Guard 组件到你指定的 DOM 节点，登录成功后返回 userInfo
  guard.start('#authing-guard-container').then(userInfo => {
    console.log(userInfo)
  })
})
```
:::

::: tab Angular
``` typescript
import { Component } from '@angular/core'

import { GuardService } from '@authing/guard-angular'

@Component({
  selector: 'login-container',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor (
    private guard: GuardService
  ) {}

  ngOnInit () {
    // 使用 start 方法挂载 Guard 组件到你指定的 DOM 节点，登录成功后返回 userInfo
    this.guard.client.start('#authing-guard-container').then(userInfo => {
      console.log(userInfo)
    })
  }
}
```
:::
::::

#### 模态框形态

初始化时，你需要将初始化参数的 `mode` 设置成 `modal`：

:::: tabs :options="{ useUrlFragment: false }"
::: tab React
``` tsx
// App.tsx
import React from 'react'
import { GuardProvider, GuardMode } from '@authing/guard-react'
import '@authing/guard-react/dist/esm/guard.min.css'
import RouterComponent from './router'

function App() {
  return (
    <GuardProvider
      appId="AUTHING_APP_ID",
      config={{
        mode: GuardMode.Modal
      }},

      // 如果你使用的是私有化部署的 Authing 服务，需要传入自定义 host，如 
      // host="https://my-authing-app.example.com"
    >
      <RouterComponent></RouterComponent>
    </GuardProvider>
  )
}
```
:::

::: tab Vue2
``` javascript
import Vue from 'vue'
import { GuardPlugin } from '@authing/guard-vue2'
import '@authing/guard-vue2/dist/esm/guard.min.css'

Vue.use(GuardPlugin, {
  appId: 'AUTHING_APP_ID',
  config: {
    mode: 'modal'
  }
})
```
:::

::: tab Vue3
``` javascript
import { createApp } from 'vue'
import { createGuard } from '@authing/guard-vue3'
import '@authing/guard-vue3/dist/esm/guard.min.css'

const app = createApp(App)

app.use(
  createGuard({
    appId: 'AUTHING_APP_ID',
    config: {
      mode: 'modal'
    },
    // 如果你使用的是私有化部署的 Authing 服务，需要传入自定义 host，如 
    // host: 'https://my-authing-app.example.com'
  })
)

```
:::

::: tab Angular
``` typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { GuardModule } from '@authing/guard-angular'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GuardModule.forRoot({
      appId: 'AUTHING_APP_ID',
      config: {
        mode: 'modal'
      },
      // 如果你使用的是私有化部署的 Authing 服务，需要传入自定义 host，如 
      // host: 'https://my-authing-app.example.com'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
:::
::::

你可以通过 `guard` 实例 `start` 方法对**模态框**进行渲染，同时可以通过 `show` 和 `hide` 控制**模态框**的显示和隐藏：

:::: tabs :options="{ useUrlFragment: false }"
::: tab React
``` tsx
export function Login () {
  const guard = useGuard()

  // 展示 Guard 弹窗
  const showGuard = () => guard.show()

  // 隐藏 Guard 弹窗
  const hideGuard = () => guard.hide()

  useEffect(() => {
    // 挂载模态框，当用户完成登录之后，你可以获取到用户信息
    guard.start('#authing-guard-container').then(userInfo => {
      console.log(userInfo)
    })
  }, [])

  return <>
    <button onClick={showGuard}>Show Guard</button>
    <button onClick={hideGuard}>Hide Guard</button>
    <div id="authing-guard-container"></div>
  </>
}
```
:::

::: tab Vue2
``` javascript
export default {
  mounted () {
    // 挂载模态框，当用户完成登录之后，你可以获取到用户信息
    this.$guard.start('#authing-guard-container').then(userInfo => {
      console.log(userInfo)
    })
  },
  methods: {
    showGuard () {
      // 展示 Guard 弹窗
      this.$guard.show()
    },
    hideGuard () {
      // 隐藏 Guard 弹窗
      this.$guard.hide()
    }
  }
}
```
:::

::: tab Vue3
``` javascript
import { onMounted } from 'vue'
import { useGuard } from '@authing/guard-vue3'

const guard = useGuard()

// 展示 Guard 弹窗
const showGuard = () => guard.show()

// 隐藏 Guard 弹窗
const hideGuard = () => guard.hide()

onMounted(() => {
  // 挂载模态框，当用户完成登录之后，你可以获取到用户信息
  this.$guard.start('#authing-guard-container').then(userInfo => {
    console.log(userInfo)
  })
})
```
:::

::: tab Angular
``` typescript
import { Component } from '@angular/core'
import { GuardService } from '@authing/guard-angular'

@Component({
  selector: 'login-container',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor (
    private router: Router,
    // 使用 Angular 依赖注入，获取 Guard 实例
    private guard: GuardService
  ) {}

  ngOnInit () {
    // 挂载模态框，当用户完成登录之后，你可以获取到用户信息
    this.guard.client.start('#authing-guard-container').then(userInfo => {
      console.log(userInfo)
    })
  }

  showGuard () {
    this.guard.client.show()
  }

  hideGuard () {
    this.guard.client.hide()
  }
}
```
:::
::::

单点登录能让用户能够在所有接入 Authing 的应用之间单点登录，即：一次登录，即可使用所有应用。

想要实现单点登录，你需要先将此应用`添加到单点登录`：

![guard-sso](./images/guard-sso.png)

之后在初始化 Authing Guard 时，需要将 `isSSO` 设置为 `true`。

具体详情请参考：[单点登录（SSO）](https://docs.authing.co/v2/reference/sdk-for-sso-spa.html)。

:::: tabs :options="{ useUrlFragment: false }"
::: tab React
``` tsx
// App.tsx
import React from 'react'
import { GuardProvider, GuardMode } from '@authing/guard-react'
import '@authing/guard-react/dist/esm/guard.min.css'
// 项目根组件
import RouterComponent from './router'

function App() {
  return (
    <GuardProvider
      appId="AUTHING_APP_ID",
      isSSO={true}
    >
      <RouterComponent></RouterComponent>
    </GuardProvider>
  )
}
```
:::

::: tab Vue2
``` javascript
import Vue from 'vue'
import { GuardPlugin } from '@authing/guard-vue2'
import '@authing/guard-vue2/dist/esm/guard.min.css'

Vue.use(GuardPlugin, {
  appId: 'AUTHING_APP_ID',
  isSSO: true
})
```
:::

::: tab Vue3
``` javascript
import { createApp } from 'vue'
import { createGuard } from '@authing/guard-vue3'
import '@authing/guard-vue3/dist/esm/guard.min.css'

const app = createApp(App)

app.use(
  createGuard({
    appId: 'AUTHING_APP_ID',
    isSSO: true
  })
)

```
:::

::: tab Angular
``` typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { GuardModule } from '@authing/guard-angular'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GuardModule.forRoot({
      appId: 'AUTHING_APP_ID',
      isSSO: true
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
:::
::::

### 登出

根据你的具体使用场景，退出登录分为单应用登出和 SSO 单点登出两种。

#### 单应用登出

:::: tabs :options="{ useUrlFragment: false }"
::: tab React
``` tsx
import React from 'react'
import { useGuard } from '@authing/guard-react'

export default function Logout() {
  const guard = useGuard()
  const onLogout = () => guard.logout()

  return (
    <div>
      <div>
        <button onClick={onLogout}>登出</button>
      </div>
    </div>
  )
}
```
:::

::: tab Vue2
``` javascript
export default {
  methods: {
    logout () {
      this.$guard.logout()
    }
  }
}
```
:::

::: tab Vue3
``` typescript
import { useGuard } from '@authing/guard-vue3'

const guard = useGuard()

const logout = () => guard.logout()
```
:::

::: tab Angular
``` typescript
import { Component } from '@angular/core'
import { GuardService } from '@authing/guard-angular'

@Component({
  selector: 'login-container',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor (
    private guard: GuardService
  ) {}

  onLogout () {
    this.guard.client.logout()
  }
}
```
:::
::::

#### SSO 单点登出

要实现单点登出，只需在初始化 Authing Guard 时，设置 `isSSO` 为 `true` 即可：

:::: tabs :options="{ useUrlFragment: false }"
::: tab React
``` tsx
// App.tsx
import React from 'react'
import { GuardProvider, GuardMode } from '@authing/guard-react'
import '@authing/guard-react/dist/esm/guard.min.css'
// 项目根组件
import RouterComponent from './router'

function App() {
  return (
    <GuardProvider
      appId="AUTHING_APP_ID",
      isSSO={true}
    >
      <RouterComponent></RouterComponent>
    </GuardProvider>
  )
}
```

``` tsx
// Logout.tsx
import React from 'react'
import { useGuard } from '@authing/guard-react'

export default function Logout() {
  const guard = useGuard()
  const onLogout = () => guard.logout()

  return (
    <div>
      <div>
        <button onClick={onLogout}>登出</button>
      </div>
    </div>
  )
}
```
:::

::: tab Vue2
``` javascript
// main.js
import Vue from 'vue'
import { GuardPlugin } from '@authing/guard-vue2'
import '@authing/guard-vue2/dist/esm/guard.min.css'

Vue.use(GuardPlugin, {
  appId: 'AUTHING_APP_ID',
  isSSO: true
})
```

``` javascript
// logout.js
export default {
  methods: {
    logout () {
      this.$guard.logout()
    }
  }
}
```
:::

::: tab Vue3
``` typescript
// main.ts
import { createApp } from 'vue'
import { createGuard } from '@authing/guard-vue3'
import '@authing/guard-vue3/dist/esm/guard.min.css'

const app = createApp(App)

app.use(
  createGuard({
    appId: 'AUTHING_APP_ID',
    isSSO: true
  })
)
```
``` typescript
// Logout.vue
import { useGuard } from '@authing/guard-vue3'

const guard = useGuard()

const logout = () => guard.logout()
```
:::

::: tab Angular
``` typescript
// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { GuardModule } from '@authing/guard-angular'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GuardModule.forRoot({
      appId: 'AUTHING_APP_ID',
      isSSO: true
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

``` typescript
// logout.component.ts
import { Component } from '@angular/core'
import { GuardService } from '@authing/guard-angular'

@Component({
  selector: 'logout-container',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LoginComponent {
  constructor (
    private guard: GuardService
  ) {}

  onLogout () {
    this.guard.client.logout()
  }
}
```
:::
::::

### 注册

你可以通过 `startRegister` 方法将 Authing Guard 切换到注册 Tab 页：

:::: tabs :options="{ useUrlFragment: false }"
::: tab React
``` tsx
// Register.tsx
import React from 'react'
import { useGuard } from '@authing/guard-react'

export default function Logout() {
  const guard = useGuard()
  const startRegister = () => guard.startRegister()

  return (
    <div>
      <div>
        <button onClick={startRegister}>startRegister</button>
      </div>
    </div>
  )
}
```
:::

::: tab Vue2
``` javascript
export default {
  methods: {
    startRegister () {
      this.$guard.startRegister()
    }
  }
}
```
:::

::: tab Vue3
``` typescript
import { useGuard } from '@authing/guard-vue3'

const guard = useGuard()

const startRegister = () => guard.startRegister()
```
:::

::: tab Angular
``` typescript
import { Component } from '@angular/core'
import { GuardService } from '@authing/guard-angular'

@Component({
  selector: 'register-container',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class LoginComponent {
  constructor (
    private guard: GuardService
  ) {}

  startRegister () {
    this.guard.client.startRegister()
  }
}
```
:::
::::

### 第三方身份源登录

**Authing 目前支持 20+ 种第三方身份源登录方式，基本囊括所有常用的身份源：**

- [社会化身份源](https://docs.authing.cn/v2/guides/authentication/social/)： Google、GitHub、微信、QQ、微博、 飞书、企业微信、钉钉、AD、Azure AD...
- [基于认证协议的身份服务](https://docs.authing.cn/v2/connections/custom-social-provider/)： OIDC、OAuth2.0、SAML、CAS...

你可以点击上面的链接查看 Authing 支持的所有第三方身份源，并根据你的实际需要进行选择。选好你需要使用的身份源后，请根据下面的引导完成接入。

**首先**，你需要根据在 Authing 控制台完成你所需的身份源的配置。

**然后**，使用下面的方法来控制配置完成的身份源的展示与隐藏。

此处以 Github 身份源为例：

:::: tabs :options="{ useUrlFragment: false }"
::: tab React
``` tsx
import React from 'react'

import { GuardProvider } from '@authing/guard-react'

import '@authing/guard-react/dist/esm/guard.min.css'

// 用户业务根组件
import RouterComponent from './router'

export default function App() {
  return (
    <GuardProvider
      appId="6322ef4c06b1a01036695b33"
      config={{
        socialConnections: ['github']
      }}
    >
      <RouterComponent></RouterComponent>
    </GuardProvider>
  )
}
```
:::

::: tab Vue2
``` javascript

```
:::

::: tab Vue3
``` typescript

```
:::

::: tab Angular
``` typescript

```
:::
::::

### 获取用户信息

你也可以通过 `trackSession` 方法获取用户信息：

:::: tabs :options="{ useUrlFragment: false }"
::: tab React
``` tsx
// GetUserInfo.tsx
import React from 'react'
import { useGuard } from '@authing/guard-react'

export default function GetUserInfo() {
  const guard = useGuard()

  const getUserInfo = async () => {
    // 获取用户信息
    const userInfo = await guard.trackSession()
    console.log(userInfo)
  }

  return (
    <div>
      <div>
        <button onClick={getUserInfo}>Get User Info</button>
      </div>
    </div>
  )
}
```
:::

::: tab Vue2
``` javascript
// GetUserInfo.vue
export default {
  methods: {
    getUserInfo () {
      this.$guard.trackSession()
    }
  }
}
```
:::

::: tab Vue3
``` typescript
import { useGuard } from '@authing/guard-vue3'

const guard = useGuard()

const getUserInfo = () => guard.trackSession()
```
:::

::: tab Angular
``` typescript
// GetUserInfo.component.ts
import { Component } from '@angular/core'
import { GuardService } from '@authing/guard-angular'

@Component({
  selector: 'get-user-info-container',
  templateUrl: './get-user-info.component.html',
  styleUrls: ['./get-user-info.component.css']
})
export class GetUserInfoComponent {
  constructor (
    private guard: GuardService
  ) {}

  getUserInfo () {
    this.guard.client.trackSession()
  }
}
```
:::
::::

### 切换语言

默认情况下，Guard 会展示你在 Authing 控制台中配置的默认语言，你也可以通过 `changeLang` 修改 Authing Gaurd 显示的语言，目前共支持以下四种：

- zh-CN：中文简体
- zh-TW：中文繁体
- en-US：英文
- ja-JP：日文

如果用户的浏览器语言 Authing Guard 暂未支持，Guard 默认将会展示为配置的默认语言。

Authing Guard 会持续新增对不同语言的支持，详情请参见 Authing 目前支持的语言列表。

:::: tabs :options="{ useUrlFragment: false }"
::: tab React
``` tsx
// ChangeLang.tsx
import React, { useEffect } from 'react'

import { useGuard, Lang } from '@authing/guard-react'

export default function ChangeLanguage() {
  const guard = useGuard()

  useEffect(() => {
    guard.start('#authing-guard-container').then(userInfo => {
      console.log('userInfo: ', userInfo)
    })
  }, [])

  const changeLang = (e) => {
    guard.changeLang(e.target.value)
  }

  return (
    <div>
      <select id="lang" onChange={changeLang}>
          <option value="zh-CN">zh-CN</option>
          <option value="en-US">en-US</option>
          <option value="zh-TW">zh-TW</option>
          <option value="ja-JP">ja-JP</option>
      </select>
      <div id="authing-guard-container"></div>
    </div>
  )
}
```
:::

::: tab Vue2
``` javascript
// ChangeLang.vue
export default {
  methods: {
    // ......... 需要从 example 代码中复制一部分过来
    changeLang (lang) {
      this.$guard.changeLang()
    }
  }
}
```
:::

::: tab Vue3
``` typescript
// ChangeLang.vue
import { useGuard } from '@authing/guard-vue3'

const guard = useGuard()

// ......... 需要从 example 代码中复制一部分过来
const changeLang = () => guard.changeLang(lang)
```
:::

::: tab Angular
``` typescript
// ChangeLang.component.ts
import { Component } from '@angular/core'
import { GuardService } from '@authing/guard-angular'

@Component({
  selector: 'change-lang-container',
  templateUrl: './change-lang.component.html',
  styleUrls: ['./change-lang.component.css']
})
export class GetUserInfoComponent {
  constructor (
    private guard: GuardService
  ) {}

  changeLang () {
    // ......... 需要从 example 代码中复制一部分过来
    this.guard.client.changeLang(lang)
  }
}
```
:::
::::

### 自定义样式

默认情况下，Guard 会使用你在 Authing 控制台中配置的自定义 CSS 内容，你也可以通过 `changeContentCSS` 方法手动设置自定义 CSS 样式：

> 注：此方法只应该被调用一次，多次调用会覆盖之前设置的 CSS 内容。

:::: tabs :options="{ useUrlFragment: false }"
::: tab React
``` tsx
// changeContentCSS.tsx
import React, { useEffect } from 'react'
import { useGuard } from '@authing/guard-react'

export default function ChangeContentCSS() {
  const guard = useGuard()

  useEffect(() => {
    guard.start('#guard').then(userInfo => {
      console.log('userInfo: ', userInfo)
    })
  }, [])

  // 设置自定义样式
  const changeContentCSS = () => guard.changeContentCSS('body {background: red}')

  return (
    <div>
      <button onClick={changeContentCSS}>Change Content CSS</button>
      <div id="guard"></div>
    </div>
  )
}
```
:::

::: tab Vue2
``` javascript
// ChangeContentCSS.vue
export default {
  methods: {
    changeContentCSS () {
      this.$guard.changeContentCSS('body {background: red}')
    }
  }
}
```
:::

::: tab Vue3
``` typescript
// ChangeContentCSS.vue
import { useGuard } from '@authing/guard-vue3'

const guard = useGuard()

// ......... 需要从 example 代码中复制一部分过来
const changeContentCSS = () => guard.changeContentCSS('body {background: red}')
```
:::

::: tab Angular
``` typescript
// ChangeContentCSS.component.ts
import { Component } from '@angular/core'
import { GuardService } from '@authing/guard-angular'

@Component({
  selector: 'change-content-css-container',
  templateUrl: './change-content-css.component.html',
  styleUrls: ['./change-content-css.component.css']
})
export class GetUserInfoComponent {
  constructor (
    private guard: GuardService
  ) {}

  changeLang () {
    // ......... 需要从 example 代码中复制一部分过来
    this.guard.client.ChangeContentCSS('body {background: red}')
  }
}
```
:::
::::

### 使用 Guard 内置的 Authing JS SDK

Authing Guard 中集成了 [authing-js-sdk 的 AuthenticationClient](https://docs.authing.cn/v2/reference/sdk-for-node/authentication/)（`AuthenticationClient` 以终端用户（End User）的身份进行请求，提供了登录、注册、登出、管理用户资料、获取授权资源等所有管理用户身份的方法；此模块还提供了各种身份协议的 SDK，如 [OpenID Connect](https://docs.authing.cn/v2/guides/federation/oidc.html), [OAuth 2.0](https://docs.authing.cn/v2/guides/federation/oauth.html), [SAML](https://docs.authing.cn/v2/guides/federation/saml.html) 和 [CAS](https://docs.authing.cn/v2/guides/federation/cas.html)）。

你可以通过 `getAuthClient` 获取 `AuthenticationClient` 实例，之后可调用 AuthenticationClient 的所有方法。

:::: tabs :options="{ useUrlFragment: false }"
::: tab React
``` tsx
// Personal.tsx
import { useEffect } from 'react'
import { useGuard } from '@authing/guard-react'

export default function Personal () {
  const guard = useGuard()

  useEffect(() => {
    guard.getAuthClient().then(authenticationClient => {
      // 获取到 AuthenticationClient 实例之后，可以调用其提供的所有方法
      // 比如更新用户昵称
      authenticationClient.updateProfile({
        nickname: 'Nick'
      })
      // 更多 AuthenticationClient 的方法，请见 authing-js-sdk 文档介绍。
    })
  })

  return <div></div>
}
```
:::

::: tab Vue2
``` javascript
// Personal.vue
export default {
  
}
```
:::

::: tab Vue3
``` typescript
// Personal.vue
```
:::

::: tab Angular
``` typescript
// personal.component.ts
```
:::
::::

### 附录

此附录中的「初始化参数列表」及「Config 参数列表」都会作为 Guard 初始化的配置项，例如：

:::: tabs :options="{ useUrlFragment: false }"
::: tab React
``` tsx
// App.tsx
import React from 'react'
import { GuardProvider } from '@authing/guard-react'
import '@authing/guard-react/dist/esm/guard.min.css'
// 你的业务代码根组件
import RouterComponent from './router'

function App() {
  return (
    <GuardProvider
      appId="AUTHING_APP_ID",
      
      // 如果你使用的是私有化部署的 Authing 服务，需要传入自定义 host，如 
      // host="https://my-authing-app.example.com",

      scope="openid"
    >
      <RouterComponent></RouterComponent>
    </GuardProvider>
  )
}
```
:::

::: tab Vue2
``` javascript
// main.js
import Vue from 'vue'
import { GuardPlugin } from '@authing/guard-vue2'
import '@authing/guard-vue2/dist/esm/guard.min.css'

Vue.use(GuardPlugin, {
  appId: 'AUTHING_APP_ID',

  // 如果你使用的是私有化部署的 Authing 服务，需要传入自定义 host，如 
  // host: 'https://my-authing-app.example.com',

  scope: 'openid'
})
```
:::

::: tab Vue3
``` typescript
// main.ts
import { createApp } from 'vue'
import { createGuard } from '@authing/guard-vue3'
import '@authing/guard-vue3/dist/esm/guard.min.css'
import App from './App.vue'

const app = createApp(App)

app.use(
  createGuard({
    appId: 'AUTHING_APP_ID',

    // 如果你使用的是私有化部署的 Authing 服务，需要传入自定义 host，如 
    // host: 'https://my-authing-app.example.com',

    scope: 'openid'
  })
)
```
:::

::: tab Angular
``` json
// angular.json
{
  "projects": {
    "architect": {
      "build": {
        "styles": [
          "node_modules/@authing/guard-angular/dist/guard.min.css"
        ]
      }
    }
  }
}
```
``` typescript
// app.module.ts
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { GuardModule } from '@authing/guard-angular'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GuardModule.forRoot({
      appId: 'AUTHING_APP_ID',

      // 如果你使用的是私有化部署的 Authing 服务，需要传入自定义 host，如 
      // host: 'https://my-authing-app.example.com',

      scope: 'openid'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
```
:::
::::