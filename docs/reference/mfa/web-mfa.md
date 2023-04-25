# Authing MFA 多因素认证组件

## 说明

Authing MFA 是一种安全认证技术，它使用多个身份验证因素来确保用户的身份。

现在开始跟随引导将 Authing MFA 组件接入到你的项目中吧！

| 条目     | 说明                                             |
| -------- | ------------------------------------------------ |
| 最新版本 | 1.0.0-alpha.14                                   |
| 仓库地址 | https://github.com/authing/authing-mfa-component |

## 第一步：在 Authing 控制台创建应用

**首先，你需要将你的应用接入 Authing 控制台**。如果你还没有创建，请先[在 Authing 控制台创建一个应用](https://docs.authing.cn/v2/guides/app-new/create-app/create-app.html)。

从 Authing 控制台左侧导航进入 **自建应用** 功能区，点击右上角的 **创建自建应用** 按钮，填入以下信息：

- 应用名称：填入你的应用名称；
- 应用类型：选择 **MFA 应用**。

![create-mfa-application.png](./images/create-mfa-application.png)

创建完成！接下来你将正式开始 Authing MFA 组件的接入和配置。


## 第二步：安装并初始化

有两种方式可以供你选择：**安装 Authing library** 或 **直接通过浏览器加载**。

无论使用哪一种安装方式，你都需要用到应用的 **APP ID**，请先 [前往控制台获取](https://console.authing.cn)。关于 **APP ID** 所在位置，请参阅 [应用配置](https://docs.authing.cn/v2/guides/app-new/create-app/app-configuration.html)。

### 方法一：安装 Authing library

::: hint-info
推荐使用 npm 或 yarn，它们能更好的与 `Webpack`、`Rollup` 等打包工具进行配合，也可放心地在生产环境打包部署使用，享受整个生态圈和工具链带来的诸多好处。
:::

首先，通过 npm / yarn 安装 Authing library。

:::: tabs :options="{ useUrlFragment: false }"
::: tab React

```shell
# 兼容 React 16/17
npm install --save @authing/mfa-component-react
# OR
yarn add @authing/mfa-component-react

# 兼容 React 18
npm install --save @authing/mfa-component-react18
# OR
yarn add @authing/mfa-component-react18
```

:::

::: tab Vue2

```shell
# 兼容 Vue 2
npm install --save @authing/mfa-component-vue2

# OR

yarn add @authing/mfa-component-vue2
```

:::

::: tab Vue3

```shell
# 兼容 Vue 3
npm install --save @authing/mfa-component-vue3

# OR

yarn add @authing/mfa-component-vue3
```

:::
::: tab Angular

```shell
# 兼容 Angular 14
npm install --save @authing/mfa-component-angular

# OR

yarn add @authing/mfa-component-angular
```

:::
::::

:::: tabs :options="{ useUrlFragment: false }"
::: tab React

```tsx
// App.tsx

// React 16 / 17
// 代码示例：https://github.com/Authing/authing-mfa-component/blob/master/examples/mfa-component-react/src/App.tsx
import { AuthingMFAProvider } from '@authing/mfa-component-react'
import '@authing/mfa-component-react/dist/index.min.css'

// React 18
// 代码示例：https://github.com/Authing/authing-mfa-component/blob/master/examples/mfa-component-react18/src/App.tsx
// import { AuthingMFAProvider } from '@authing/mfa-component-react18'
// import '@authing/mfa-component-react18/dist/index.min.css'

import React from 'react'

// 你的业务代码根组件
import RouterComponent from './router'

function App() {
  return (
    <AuthingMFAProvider
      appId="AUTHING_APP_ID"

      // 可选值：normal 或 modal，对应普通模式和模态框模式
      // mode="modal"
      
      // 如果你使用的是私有化部署的 Authing 服务，需要传入自定义 host，如:
      // host="https://my-authing-app.example.com"
    >
      <RouterComponent></RouterComponent>
    </AuthingMFAProvider>
  );
}
```

:::

::: tab Vue2

```javascript
// main.js
// 代码示例：https://github.com/Authing/authing-mfa-component/blob/master/examples/mfa-component-vue2/src/main.js
import Vue from 'vue'
import { AuthingMFAPlugin } from '@authing/mfa-component-vue2'
import '@authing/mfa-component-vue2/dist/index.min.css'

Vue.use(AuthingMFAPlugin, {
  appId: "AUTHING_APP_ID",

  // 可选值：normal 或 modal，对应普通模式和模态框模式
  // mode: "modal"

  // 如果你使用的是私有化部署的 Authing 服务，需要传入自定义 host，如:
  // host: 'https://my-authing-app.example.com'
});
```

:::

::: tab Vue3

```typescript
// main.ts
// 代码示例：https://github.com/Authing/authing-mfa-component/blob/master/examples/mfa-component-vue3/src/main.ts
import { createApp } from 'vue'
import { createAuthingMFA } from '@authing/mfa-component-vue3'
import '@authing/mfa-component-vue3/dist/index.min.css'

// 你的业务代码根组件
import App from './App.vue'

const app = createApp(App)

app.use(
  createAuthingMFA({
    appId: "AUTHING_APP_ID",

    // 可选值：normal 或 modal，对应普通模式和模态框模式
    // mode: "modal"

    // 如果你使用的是私有化部署的 Authing 服务，需要传入自定义 host，如:
    // host: 'https://my-authing-app.example.com'
  })
);
```

:::

::: tab Angular

```json
// 代码示例：https://github.com/Authing/authing-mfa-component/blob/master/examples/mfa-component-angular/angular.json
// angular.json
{
  "projects": {
    "architect": {
      "build": {
        "styles": ["node_modules/@authing/mfa-component-angular/dist/index.min.css"]
      }
    }
  }
}
```

```typescript
// 代码示例：https://github.com/Authing/authing-mfa-component/blob/master/examples/mfa-component-angular/src/app/app.module.ts
// app.module.ts
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { AuthingMFAModule } from '@authing/mfa-component-angular'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthingMFAModule.forRoot({
      appId: "AUTHING_APP_ID",

      // 可选值：normal 或 modal，对应普通模式和模态框模式
      // mode: "modal"
      
      // 如果你使用的是私有化部署的 Authing 服务，需要传入自定义 host，如:
      // host: 'https://my-authing-app.example.com'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

:::
::::

调试成功后，即完成 Authing library 的初始化加载。

### 方法二：直接通过浏览器加载

首先，在你的 HTML 文件中使用 `script` 和 `link` 标签直接引入文件，并使用全局变量 `AuthingMFAFactory`。

```html
<!-- 代码示例：https://github.com/Authing/authing-mfa-component/blob/master/examples/mfa-component-native/index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Authing MFA Demo</title>
  <!-- 替换你自己的 React、React DOM CDN -->
  <script src="xxxxxxxxxx"></script>
  
  <script src="https://cdn.authing.co/packages/authing-mfa-component/1.0.0-alpha.11/index.min.js"></script>
  
  <link rel="stylesheet" type="text/css" href="https://cdn.authing.co/packages/authing-mfa-component/1.0.0-alpha.11/index.min.css" />
</head>
<body>
  <div id="authing-mfa-container"></div>

  <script>
    ;(function (window, document, AuthingMFAFactory) {
      const authingMFA = new AuthingMFAFactory.AuthingMFA({
        appId: 'AUTHING_APP_ID',
        // 可选值：normal 或 modal，对应普通模式和模态框模式
        // mode: "modal"
      })

      authingMFA.start({
        el: document.querySelector('#authing-mfa-container'),
        mfaTriggerData: {
          mfaToken: 'xxxxxx',
          // .....
        }
      })
    })(window, document, AuthingMFAFactory);
  </script>
</body>
</html>
```

无论通过哪一种方式，你都可以完成 Authing MFA 组件在你项目中的安装和初始化。

接下来，你可以根据实际的需要，直接阅读对应的使用指南和代码示例。

## 第三步：获取 Authing MFA 实例

:::: tabs :options="{ useUrlFragment: false }"

::: tab React

```tsx
// React 16 / 17
// 代码示例：https://github.com/Authing/authing-mfa-component/blob/master/examples/mfa-component-react/src/pages/MFA.tsx
import { useAuthingMFA } from '@authing/mfa-component-react'

// React 18
// 代码示例：https://github.com/Authing/authing-mfa-component/blob/master/examples/mfa-component-react18/src/pages/MFA.tsx
// import { useAuthingMFA } from '@authing/mfa-component-react18'

export default function MFA() {
  const authingMFA = useAuthingMFA()

  console.log("authing mfa instance: ", authingMFA)

  return <div></div>
}
```

:::

::: tab Vue2

```javascript
// 代码示例：https://github.com/Authing/authing-mfa-component/blob/master/examples/mfa-component-vue2/src/views/MFA.vue
export default {
  created() {
    console.log("authing mfa instance: ", this.$authingMFA);
  },
};
```

:::

::: tab Vue3

```javascript
// 代码示例：https://github.com/Authing/authing-mfa-component/blob/master/examples/mfa-component-vue3/src/views/MFA.vue
import { useAuthingMFA } from '@authing/mfa-component-vue3'

const authingMFA = useAuthingMFA()

console.log('authingMFA instance: ', authingMFA)
```

:::

::: tab Angular

```typescript
// Angular 组件中使用 Authing MFA API
// 代码示例：https://github.com/Authing/authing-mfa-component/blob/master/examples/mfa-component-angular/src/app/pages/mfa/mfa.component.ts
import { Component } from '@angular/core'
import { AuthingMFAService } from '@authing/mfa-component-angular'

@Component({
  selector: "mfa-container",
  templateUrl: "./mfa.component.html",
  styleUrls: ["./mfa.component.css"],
})
export class MFAComponent {
  constructor(
    // 使用 Angular 依赖注入，获取 Authing MFA 实例
    private authingMFA: AuthingMFAService
  ) {}

  ngOnInit() {
    console.log("authing mfa instance: ", this.authingMFA.client);
  }
}
```

:::

::: tab CDN

```javascript
// 代码示例：https://github.com/Authing/authing-mfa-component/blob/master/examples/mfa-component-native/index.html
const authingMFA = new AuthingMFAFactory.AuthingMFA({
  appId: 'AUTHING_APP_ID'
})

console.log("authing mfa instance: ", authingMFA)
```

:::
::::

## 第四步：获取 MFA `mfaTriggerData`

你可以使用 Authing 『基础 MFA』能力，在服务端通过 [SDK](https://docs.authing.cn/v3/reference/sdk/node/install.html) 获取 `mfaTriggerData` 返回给客户端。
 以下是一个 `mfaTriggerData` 示例：

``` json
{
    "mfaToken": "xxxxxx", 
    "nickname": null, 
    "email": null, 
    "phone": null, 
    "phoneCountryCode": null, 
    "mfaPhone": null, 
    "mfaEmail": null, 
    "mfaPhoneCountryCode": null, 
    "username": "aaa", 
    "avatar": "https://files.authing.co/authing-console/default-user-avatar.png", 
    "faceMfaEnabled": false, 
    "totpMfaEnabled": false, 
    "applicationMfa": [
        {
            "mfaPolicy": "SMS", 
            "status": 1, 
            "sort": 1
        }, 
        {
            "mfaPolicy": "EMAIL", 
            "status": 1, 
            "sort": 2
        }, 
        {
            "mfaPolicy": "OTP", 
            "status": 1, 
            "sort": 3
        }, 
        {
            "mfaPolicy": "FACE", 
            "status": 1, 
            "sort": 4
        }
    ]
}
```

## 第五步：渲染 Authing MFA 组件

:::: tabs :options="{ useUrlFragment: false }"

::: tab React

```tsx
import { useEffect } from 'react'

// React 16 / 17
// 代码示例：https://github.com/Authing/authing-mfa-component/blob/master/examples/mfa-component-react/src/pages/MFA.tsx
import { useAuthingMFA } from '@authing/mfa-component-react'

// React 18
// 代码示例：https://github.com/Authing/authing-mfa-component/blob/master/examples/mfa-component-react18/src/pages/MFA.tsx
// import { useAuthingMFA } from '@authing/mfa-component-react18'

export default function MFA() {
  const authingMFA = useAuthingMFA()

  useEffect(() => {
    authingMFA.start({
      el: document.querySelector('#authing-mfa-container') as Element,
      mfaTriggerData: {}
    })

    // 监听 MFA 认证成功的事件
    // 认证成功后，执行自定义操作
    authingMFA.on('success', function (code, data) {
      console.log('Authing MFA success: ', code, data)
      // ..... more actions
    })
  }, [])

  return <div id="authing-mfa-container"></div>
}
```

:::

::: tab Vue2

```javascript
// 代码示例：https://github.com/Authing/authing-mfa-component/blob/master/examples/mfa-component-vue2/src/views/MFA.vue
export default {
  mounted() {
    this.$authingMFA.start({
      el: document.querySelector('#authing-mfa-container'),
      mfaTriggerData: {}
    })

    // 监听 MFA 认证成功的事件
    // 认证成功后，执行自定义操作
    this.$authingMFA.on('success', function (code, data) {
      console.log('Authing MFA success: ', code, data)
      // ..... more actions
    })
  },
};
```

:::

::: tab Vue3

```javascript
// 代码示例：https://github.com/Authing/authing-mfa-component/blob/master/examples/mfa-component-vue3/src/views/MFA.vue
import { onMounted } from 'vue'
import { useAuthingMFA } from '@authing/mfa-component-vue3'

const authingMFA = useAuthingMFA()

onMounted(() => {
  authingMFA.start({
    el: document.querySelector('#authing-mfa-container'),
    mfaTriggerData: {}
  })

  // 监听 MFA 认证成功的事件
  // 认证成功后，执行自定义操作
  authingMFA.on('success', function (code, data) {
    console.log('Authing MFA success: ', code, data)
    // ..... more actions
  })
})
```

:::

::: tab Angular

```typescript
// Angular 组件中使用 Authing MFA API
// 代码示例：https://github.com/Authing/authing-mfa-component/blob/master/examples/mfa-component-angular/src/app/pages/mfa/mfa.component.ts
import { Component } from '@angular/core'
import { AuthingMFAService } from '@authing/mfa-component-angular'

@Component({
  selector: "mfa-container",
  templateUrl: "./mfa.component.html",
  styleUrls: ["./mfa.component.css"],
})
export class MFAComponent {
  constructor(
    // 使用 Angular 依赖注入，获取 Authing MFA 实例
    private authingMFA: AuthingMFAService
  ) {}

  ngOnInit() {
    this.authingMFA.client.start({
      el: document.querySelector('#authing-mfa-container') as Element,
      mfaTriggerData: {}
    })

    // 监听 MFA 认证成功的事件
    // 认证成功后，执行自定义操作
    this.authingMFA.client.on('success', function (code, data) {
      console.log('Authing MFA success: ', code, data)
      // ..... more actions
    })
  }
}
```

:::

::: tab CDN

```javascript
// 代码示例：https://github.com/Authing/authing-mfa-component/blob/master/examples/mfa-component-native/index.html
const authingMFA = new AuthingMFAFactory.AuthingMFA({
  appId: 'AUTHING_APP_ID'
})

authingMFA.start({
  el: document.querySelector('#authing-mfa-container'),
  mfaTriggerData: {}
})
```

:::
::::

如果初始化 Authing MFA 组件时配置了参数 `mode="modal"`，则可以使用 `show` 和 `hide` 方法操作模态框的显隐。

:::: tabs :options="{ useUrlFragment: false }"

::: tab React

```tsx
import { useEffect } from 'react'

// React 16 / 17
// 代码示例：https://github.com/Authing/authing-mfa-component/blob/master/examples/mfa-component-react/src/pages/MFA.tsx
import { useAuthingMFA } from '@authing/mfa-component-react'

// React 18
// 代码示例：https://github.com/Authing/authing-mfa-component/blob/master/examples/mfa-component-react18/src/pages/MFA.tsx
// import { useAuthingMFA } from '@authing/mfa-component-react18'

export default function MFA() {
  const authingMFA = useAuthingMFA()

  const showModal = () => authingMFA.show()
  const hideModal = () => authingMFA.hide()

  useEffect(() => {
    authingMFA.start({
      el: document.querySelector('#authing-mfa-container') as Element,
      mfaTriggerData: {}
    })

    // 监听 MFA 认证成功的事件
    // 认证成功后，执行自定义操作
    authingMFA.on('success', function (code, data) {
      console.log('Authing MFA success: ', code, data)
      // ..... more actions
    })
  }, [])

  return (
    <div>
      <button onClick={showModal}>Show Modal</button>
      <button onClick={hideModal}>Hide Modal</button>
      <div id="authing-mfa-container"></div>
    </div>
  )
}
```

:::

::: tab Vue2

``` html
<div class="mfa-container">
  <button @click="showModal">Show Modal</button>
  <button @click="hideModal">Hide Modal</button>
  <div id="authing-mfa-container"></div>
</div>
```

```javascript
// 代码示例：https://github.com/Authing/authing-mfa-component/blob/master/examples/mfa-component-vue2/src/views/MFA.vue
export default {
  mounted() {
    this.$authingMFA.start({
      el: document.querySelector('#authing-mfa-container'),
      mfaTriggerData: {}
    })

    // 监听 MFA 认证成功的事件
    // 认证成功后，执行自定义操作
    this.$authingMFA.on('success', function (code, data) {
      console.log('Authing MFA success: ', code, data)
      // ..... more actions
    })
  },

  methods: {
    showModal () {
      this.$authingMFA.show()
    },
    hideModal () {
      this.$authingMFA.hide()
    }
  }
};
```

:::

::: tab Vue3


``` html
<div class="mfa-container">
  <button @click="showModal">Show Modal</button>
  <button @click="hideModal">Hide Modal</button>
  <div id="authing-mfa-container"></div>
</div>
```

```javascript
// 代码示例：https://github.com/Authing/authing-mfa-component/blob/master/examples/mfa-component-vue3/src/views/MFA.vue
import { onMounted } from 'vue'
import { useAuthingMFA } from '@authing/mfa-component-vue3'

const authingMFA = useAuthingMFA()

onMounted(() => {
  authingMFA.start({
    el: document.querySelector('#authing-mfa-container'),
    mfaTriggerData: {}
  })

  // 监听 MFA 认证成功的事件
  // 认证成功后，执行自定义操作
  authingMFA.on('success', function (code, data) {
    console.log('Authing MFA success: ', code, data)
    // ..... more actions
  })
})

const showModal = () => authingMFA.show()
const hideModal = () => authingMFA.hide()
```

:::

::: tab Angular

``` html
<div class="mfa-container">
  <button (click)="showModal()">Show Modal</button>
  <button (click)="hideModal()">Hide Modal</button>
  <div id="authing-mfa-container"></div>
</div>

```

```typescript
// Angular 组件中使用 Authing MFA API
// 代码示例：https://github.com/Authing/authing-mfa-component/blob/master/examples/mfa-component-angular/src/app/pages/mfa/mfa.component.ts
import { Component } from '@angular/core'
import { AuthingMFAService } from '@authing/mfa-component-angular'

@Component({
  selector: "mfa-container",
  templateUrl: "./mfa.component.html",
  styleUrls: ["./mfa.component.css"],
})
export class MFAComponent {
  constructor(
    // 使用 Angular 依赖注入，获取 Authing MFA 实例
    private authingMFA: AuthingMFAService
  ) {}

  ngOnInit() {
    this.authingMFA.client.start({
      el: document.querySelector('#authing-mfa-container') as Element,
      mfaTriggerData: {}
    })

    // 监听 MFA 认证成功的事件
    // 认证成功后，执行自定义操作
    this.authingMFA.client.on('success', function (code, data) {
      console.log('Authing MFA success: ', code, data)
      // ..... more actions
    })
  }

  showModal () {
    this.authingMFA.client.show()
  }

  hideModal () {
    this.authingMFA.client.hide()
  }
}
```

:::

::: tab CDN

``` html
<button id="show-modal">Show Modal</button>
<button id="hide-modal">Hide Modal</button>
<div id="authing-mfa-container"></div>
```

```javascript
// 代码示例：https://github.com/Authing/authing-mfa-component/blob/master/examples/mfa-component-native/index.html
const authingMFA = new AuthingMFAFactory.AuthingMFA({
  appId: 'AUTHING_APP_ID'
})

authingMFA.start({
  el: document.querySelector('#authing-mfa-container'),
  mfaTriggerData: {}
})

document.querySelector('#show-modal').onclick = function () {
  authingMFA.show()
}

document.querySelector('#hide-modal').onclick = function () {
  authingMFA.hide()
}
```

:::
::::

## Authing MFA 初始化参数列表

<p id="IMFAInitOptions"></p>

| 参数名 | 参数说明                                 | 类型                                                  | 是否必传 | 默认值 |
| ------ | ---------------------------------------- | ----------------------------------------------------- | -------- | ------ |
| appId  | Authing 自建应用 APP ID                  | String                                                | 是       | -      |
| mode   | MFA 组件展示形式：普通模式 或 模态框模式 | [IAuthingMFAComponentMode](#IAuthingMFAComponentMode) | 否       | normal |
| host   | 私有化部署地址                           | String                                                | 否       | -      |
| style  | 自定义 CSS 样式                          | CSSProperties                                         | 否       | -      |
| lang   | 多语言配置                               | [Lang](#Lang)                                         | 否       | -      |

## 事件列表

使用 Authing 提供的 `on` 方法可以对 Authing MFA 支持的事件进行监听：

| 事件名称         | 说明                                   | 回调参数                |
| ---------------- | -------------------------------------- | ----------------------- |
| load             | Authing MFA 基本数据加载完毕，尚未渲染 | -                       |
| mount            | Authing MFA 组件渲染完毕，可访问 DOM   | -                       |
| unmount          | Authing MFA 组件销毁                   | -                       |
| success          | 认证成功                               | <p>code</p> <p>data</p> |
| fail             | 认证失败                               | <p>message</p>          |
| saveRecoveryCode | 恢复码保存成功                         | -                       |

## 类型定义

### 多语言

<p id="Lang"></p>

| 值    | 描述 |
| ----- | ---- |
| zh-CN | 中文 |
| en-US | 英文 |
| zh-TW | 繁体 |
| ja-JP | 日语 |

### 组件展示形式

<p id="IAuthingMFAComponentMode"></p>

| 值     | 描述       |
| ------ | ---------- |
| normal | 普通模式   |
| modal  | 模态框模式 |