---
tags:
  - vue组件
  - vue登录
---

# Vue.js 登录组件

<LastUpdated/>

Authing 登录组件（Guard）是一种可嵌入的登录表单，可根据你的需求进行配置，建议用于单页面应用程序。它使你可以轻松添加各种社会化登录方式，以便你的用户可以无缝登录，并且在不同平台拥有一致的登录体验。Guard 为开发者屏蔽了很多底层认证的实现细节，同时也包括繁琐的 UI 开发。

Guard 可以通过组件化的形式集成到你的 Vue.js 项目中，你可以借助此组件快速实现登录认证流程。

[查看旧版 vue 文档](../ui-components/vue.md)

## 版本

稳定版本：[![](https://img.shields.io/npm/v/@authing/vue-ui-components.svg?style=flat-square)](https://www.npmjs.com/package/@authing/vue-ui-components)

## 对于 Vue 的支持

我们对于 Vue2 与 Vue3 同时支持，可以在两种不同版本的 Vue 中直接引入并进行使用。

## 安装

### 使用 npm 或者 yarn 安装

我们这里推荐使用 npm 或 yarn，它们能更好的和 [webpack](https://webpack.js.org/) 打包工具进行配合，也可放心地在生产环境打包部署使用，享受整个生态圈和工具链带来的诸多好处。

```bash
$ npm install @authing/vue-ui-components --save
```

```bash
$ yarn add @authing/vue-ui-components
```

如果你的网络环境不佳，我们推荐你使用 [cnpm](https://github.com/cnpm/cnpm)。

### 浏览器引入

在浏览器中使用 `script` 和 `link` 标签直接引入文件，并使用全局变量 `AuthingVueUIComponents`。

我们在 npm 发布包内的 `@authing/vue-ui-components/lib` 目录下提供了 `index.min.css` 以及 `index.min.js`。

你也可以通过 [![](https://data.jsdelivr.com/v1/package/npm/@authing/vue-ui-components/badge)](https://www.jsdelivr.com/package/npm/@authing/vue-ui-components) 或者 [unpkg.com](https://unpkg.com/@authing/vue-ui-components) 进行下载 `index.min.css` 以及 `index.min.js`。


> 强烈不推荐使用已构建文件，这样无法按需加载，而且难以获得底层依赖模块的 bug 快速修复支持。

> 注意：vue-ui-components 依赖 Vue，请确保提前引入 Vue 文件。


## 示例

首先你要在 [Authing Console](https://console.authing.cn) 中获取你的 `应用 ID`。如果你不知道如何获取 `应用 ID`，可以[参考文档](../../guides/faqs/get-app-id-and-secret.md)

### 在 Vue 项目中引入

```html
<template>
  <Guard :appId="appId" />
</template>

<script>
  import { Guard } from "@authing/vue-ui-components";

  // 引入 CSS 文件
  import "@authing/vue-ui-components/lib/index.min.css";

  export default {
    components: {
      Guard,
    },
    data() {
      return {
        // 你的 AppId
        appId: "AUTHING_APP_ID",
      };
    },
  };
</script>
```

#### 初始化

在 Vue.js 项目中引入 `@authing/vue-ui-components` 并初始化。

```html
<template>
  <Guard :appId="appId" />
</template>

<script>
  import { Guard } from "@authing/vue-ui-components";
  import "@authing/vue-ui-components/lib/index.min.css";

  export default {
    components: {
      Guard,
    },
    data() {
      return {
        appId: "AUTHING_APP_ID",
      };
    },
  };
</script>
```

### 直接用 `<script>` 引入

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.js"></script>
    
    <script src="https://cdn.jsdelivr.net/npm/@authing/vue-ui-components/lib/index.min.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@authing/vue-ui-components/lib/index.min.css"></link>
  </head>

  <body>
    <div id="app"></div>
    <!-- built files will be auto injected -->

    <script>
      // 这可以替换你的 AppId
      const appId = '5d70d0e991fdd597019df70d'

      const config = {
        logo: 'https://usercontents.authing.cn/client/logo@2.png',
        title: 'Authing',
      }

      const app = new Vue({
        el: '#app',
        render: (h) => h(AuthingVueUIComponents.Guard, {
          props: {
            config,
            appId,
          },
        }),
      })

      window.app = app

    </script>
  </body>
</html>
```

### 完整体验

这是一个最简单的 Guard 组件的在线 [codepen](https://codepen.io/) 演示。可以将 `AppId` 修改为你自己的 ID 直接在这里展示。

<iframe height="760" style="width: 100%;" scrolling="no" title="Vue 2 Guard Demo" src="https://codepen.io/xuancaosu/embed/NWXxZYx?default-tab=html%2Cresult&editable=true&theme-id=light" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/xuancaosu/pen/NWXxZYx">
  Vue 2 Guard Demo</a> by Lucsun (<a href="https://codepen.io/xuancaosu">@xuancaosu</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

### 监听登录事件

`Guard` 组件可以使用 `@login` 事件回调函数，当用户成功登录时回调用此函数，你可以在此获取当前用户的用户信息。[查看完整事件列表](./parameters.md)。

```vue
<template>
  <Guard :appId="appId" @login="handleLogin" />
</template>

<script>
import { Guard } from "@authing/vue-ui-components";
import "@authing/vue-ui-components/lib/index.min.css";

export default {
  components: {
    Guard,
  },
  data() {
    return {
      appId: "AUTHING_APP_ID",
    };
  },
  methods: {
    handleLogin(userInfo) {
      console.log(userInfo);
    },
  },
};
</script>
```

<details><summary><b>了解获取用户信息之后该怎么做？</b></summary>

!!!include(common/what-to-do-when-you-get-userinfo.md)!!!

</details>

<details><summary><b>查看支持的社会化登录列表及接入流程</b></summary>

{{$localeConfig.brandName}} 目前一共支持国内外将近 20 余种社会化登录，如微信、GitHub、Sign in with Apple、支付宝等，以下是完整的列表：

!!!include(common/social-connections-table.md)!!!

</details>

### 退出登录

使用 `Guard` 组件，组件加载完成后回触发的 `onLoad` 事件与登录成功触发的 `onLogin` 事件都会返回 `AuthClient`。获取到 `AuthClient` 进行手动单例保存，可以在需要调用退出登录的时候使用。

```html
<template>
  <Guard :appId="appId" @load="onLoad" @login="onLogin"/>
  <button v-if="guardAuthClient" @clink="onLogout">退出</button>
</template>

<script>
  import { Guard } from "@authing/vue-ui-components";
  import "@authing/vue-ui-components/lib/index.min.css";

  export default {
    components: {
      Guard,
    },
    data() {
      return {
        appId: "AUTHING_APP_ID",
        guardAuthClient: null
      };
    },
    methods: {
      onLoad: (authClient) => {
        this.guardAuthClient = authClient
      },
      onLogin: (user, authClient) => {
        this.guardAuthClient = authClient
      },
      onLogout: () => {
        this.guardAuthClient.logout()
      }
    }
  };
</script>
```

### 实现单点登录

使用 Guard 进行单点登录只需要将属性 `isSSO` 设置为 `true` 即可：

```html
<template>
  <Guard :appId="AUTHING_APP_ID" :isSSO="true" />
</template>
```

### GuardMode

Guard 目前有两种展示方式 `modal | normal`，`normal` 方式会将表单插入指定的 dom 节点，适合将登录作为单独页面的场景，`modal` 模式会以模态框形式展示表单，适合在已有页面中弹出进行登录。默认展示方式为 `normal`，可通过传入 `mode` 参数配置展示方式。然后通过 `visible` 属性实现 Guard 是否可见。

```javascript
<Guard :appId="appId" :visible="visible" mode="modal"/>

data() {
  return {
    visible: false
  }
}

...

methods: {
  showLogin() {
    this.visible = true
  }
}
```

## 导出 `authing-js-sdk`

Guard 组件本身基于 [Authing JavaScript SDK](../web/sdk-for-node/) 进行封装，当你需要进行一些更高级的操作（如管理用户自定义数据、修改用户资料、退出登录）时：

1. 调用 `initAuthClient` 初始化 [AuthenticationClient](/reference/sdk-for-node/authentication/AuthenticationClient.md)，多次调用此函数只会初始化一次。

```js
import { initAuthClient } from "@authing/vue-ui-components";

initAuthClient({
  appId: "AUTHING_APP_ID",
});
```

2. 之后使用 `getAuthClient` 获取 `AuthenticationClient` 实例。

```js
import { getAuthClient } from "@authing/vue-ui-components";

const authClient = getAuthClient();
```

3. 调用 `AuthenticationClient` 实例的方法，完整方法列表请见 [AuthenticationClient 方法列表](/reference/sdk-for-node/authentication/AuthenticationClient.md)。

```js
authClient.getCurrentUser().then((user) => console.log(user));
```

## 属性列表

| 属性名称       | 描述                                                                                       | 类型    | 取值描述                             |
| -------------- | :----------------------------------------------------------------------------------------- | ------- | ------------------------------------ |
| appId          | 你的应用 ID                                                                                | String  |                                      |
| mode           | Guard 展示模式                                                                             | String  | modal：弹窗模式<br> normal：全屏模式 |  |
| autoRegister   | 如果为 true，登录时，用户不存在则自动注册账号                                              | Boolean | 默认为 false                         |
| isSSO          | 是否是单点登录                                                                             | Boolean | 默认为 false                         |
| clickCloseable | Modal 模式时是否隐藏登录框右上角的关闭按钮。<br>如果隐藏，用户将不能通过点击按钮关闭登录框 | Boolean | 默认为 true                          |
| escCloseable   | Modal 模式时是否可以通过键盘 ESC 键关闭登录框                                              | Boolean | 默认为 true                          |

## 事件列表

| 事件名                        | 事件说明                                             | 事件参数                | 事件参数说明                                                                                                  |
| :---------------------------- | :--------------------------------------------------- | :---------------------- | :------------------------------------------------------------------------------------------------------------ |
| load                          | {{$localeConfig.brandName}} appId 验证通过，加载完成 | authClient              | AuthenticationClient 对象，可直接操作 login， register，详情请查看 [authing-js-sdk](/reference/sdk-for-node/) |
| load-error                    | {{$localeConfig.brandName}} appId 验证失败，加载失败 | error                   | 错误信息                                                                                                      |
| login                         | 用户登录成功                                         | user, authClient        | <p>user: 用户信息</p><p>authClient 同上</p>                                                                   |
| login-error                   | 用户登录失败                                         | error                   | 错误信息，包含字段缺失／非法或服务器错误等信息                                                                |
| register                      | 用户注册成功                                         | user, authClient        | <p>user: 用户信息</p><p>authClient 同上</p>                                                                   |
| register-error                | 用户注册失败                                         | error                   | 错误信息，包含字段缺失／非法或服务器错误等信息                                                                |
| pwd-email-send                | 忘记密码邮件发送成功                                 | -                       | -                                                                                                             |
| pwd-email-send-error          | 忘记密码邮件发送失败                                 | error                   | 错误信息                                                                                                      |
| pwd-phone-send                | 忘记密码手机验证码发送成功                           | -                       | -                                                                                                             |
| pwd-phone-send-error          | 忘记密码手机验证码发送失败                           | error                   | 错误信息                                                                                                      |
| pwd-reset                     | 重置密码成功                                         | -                       | -                                                                                                             |
| pwd-reset-error               | 重置密码失败                                         | error                   | 错误信息                                                                                                      |
| close                         | modal 模式中 guard 关闭事件                          | -                       | -                                                                                                             |
| login-tab-change              | 登录 tab 切换事件                                    | activeTab               | 切换后的 tab                                                                                                  |
| register-tab-change           | 注册 tab 切换事件                                    | activeTab               | 切换后的 tab                                                                                                  |
| register-info-completed       | 注册补充成功事件                                     | user, udfs, authClient  | <p>user: 用户信息</p><p>udfs: 补充的自定义字段信息</p><p>authClient 同上</p>                                  |
| register-info-completed-error | 注册补充失败事件                                     | error, udfs, authClient | <p>error: 错误信息</p><p>udfs: 补充的自定义字段信息</p><p>authClient 同上</p>                                 |

## 私有化部署

**私有化部署**场景需要指定你私有化的 Authing 服务的 Host（**包含协议但不含 Path**），如果你不清楚可以联系 Authing IDaaS 服务管理员。

```html
<template>
  <Guard :appId="appId" :config="config" />
</template>

<script>
  import { Guard } from "@authing/vue-ui-components";
  import "@authing/vue-ui-components/lib/index.min.css";

  export default {
    components: {
      Guard,
    },
    data() {
      return {
        appId: "AUTHING_APP_ID",
        config: {
          host: "https://core.your-authing-service.com",
        },
      };
    },
  };
</script>
```

<!-- ## 在线体验

<br>

<iframe src="https://codesandbox.io/embed/authing-vue-guard-forked-yq8q2?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:800px; border:0; border-radius: 4px; overflow:hidden;"
     title="authing-vue-guard (forked)"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe> -->
<!-- <iframe src="https://codesandbox.io/embed/vibrant-beaver-s3gct?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:800px; border:0; border-radius: 4px; overflow:hidden;"
     title="authing-vue-guard"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe> -->

## 获取帮助

请访问 [Authing 论坛](https://forum.authing.cn/)。
