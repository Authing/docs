# Vue.js 登录组件

<LastUpdated/>

::: hint-info
本文对应 {{$localeConfig.brandName}} 老版本产品。如需了解最新功能说明，请查看 [接入 Authing Guard](https://docs.authing.cn/v2/reference/guard/v2/)。
::: 

Authing 登录组件（Guard）是一种可嵌入的登录表单，可根据你的需求进行配置，建议用于单页面应用程序。它使你可以轻松添加各种社会化登录方式，以便你的用户可以无缝登录，并且在不同平台拥有一致的登录体验。Guard 为开发者屏蔽了很多底层认证的实现细节，同时也包括繁琐的 UI 开发。

Guard 可以通过组件化的形式集成到你的 Vue.js 项目中，你可以借助此组件快速实现登录认证流程。

## 快速开始

### 使用 npm

#### 安装

```bash
$ yarn add @authing/vue-ui-components

# OR

$ npm install @authing/vue-ui-components --save
```

#### 初始化

在 Vue.js 项目中引入 `@authing/vue-ui-components` 并初始化。

```html
<template>
  <AuthingGuard :appId="appId" />
</template>

<script>
  import { AuthingGuard } from "@authing/vue-ui-components";
  import "@authing/vue-ui-components/lib/index.min.css";

  export default {
    components: {
      AuthingGuard,
    },
    data() {
      return {
        appId: "AUTHING\_APP\_ID",
      };
    },
  };
</script>
```

### 使用 CDN

#### 使用 CDN 引入

```html
<script src="https://cdn.authing.co/packages/vue-ui-components/{LATEST_VERSION}/index.min.js"></script>

<link href="https://cdn.authing.co/packages/vue-ui-components/{LATEST_VERSION}/index.min.css" rel="stylesheet"></link>
```

注意检查最新版本号，格式如：`3.1.21`。

#### 在 Script 代码块中初始化

```vue
<script>
const appId = "AUTHING\_APP\_ID";
const config = {
  logo: "https://usercontents.authing.cn/client/logo@2.png",
};

const app = new Vue({
  el: "#app",
  render: (h) =>
    h(AuthingVueUIComponents.AuthingGuard, {
      props: {
        appId,
      },
    }),
});
</script>
```

### 监听登录事件

`AuthingGuard` 组件可以使用 `@login` 事件回调函数，当用户成功登录时回调用此函数，你可以在此获取当前用户的用户信息。[查看完整事件列表](#完整参数)。

```vue
<template>
  <AuthingGuard :appId="appId" @login="handleLogin" />
</template>

<script>
import { AuthingGuard } from "@authing/vue-ui-components";
import "@authing/vue-ui-components/lib/index.min.css";

export default {
  components: {
    AuthingGuard,
  },
  data() {
    return {
      appId: "AUTHING\_APP\_ID",
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

1. 在项目入口文件中初始化 [AuthenticationClient](/reference/sdk-for-node/#使用认证模块)。

```js
import { initAuthClient } from "@authing/vue-ui-components";

initAuthClient({
  appId: "YOUR_APP_ID",
});
```

2. 添加一个退出登录的 `Button` 组件，并绑定点击事件为 `getAuthClient().logout()`。

```vue
<template>
  <button @click="handleLogout" />
</template>

<script>
import { getAuthClient } from "@authing/vue-ui-components";

export default {
  components: {
    AuthingGuard,
  },
  methods: {
    handleLogout() {
      getAuthClient().logout();
    },
  },
};
</script>
```

### 实现单点登录

使用 Guard 进行单点登录只需要将属性 `isSSO` 设置为 `true` 即可：

```html
<template>
  <AuthingGuard :appId="AUTHING\_APP\_ID" :isSSO="true" />
</template>
```

### GuardMode

Guard 目前有两种展示方式 `modal | normal`，`normal` 方式会将表单插入指定的 dom 节点，适合将登录作为单独页面的场景，`modal` 模式会以模态框形式展示表单，适合在已有页面中弹出进行登录。默认展示方式为 `normal`，可通过传入 `mode` 参数配置展示方式。然后通过 `visible` 属性实现 Guard 是否可见。

```javascript
<AuthingGuard :appId="appId" :visible="visible" mode="modal"/>

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

Guard 组件本身基于 [Authing JavaScript SDK](../sdk-for-node/) 进行封装，当你需要进行一些更高级的操作（如管理用户自定义数据、修改用户资料、退出登录）时：

1. 调用 `initAuthClient` 初始化 [AuthenticationClient](/reference/sdk-for-node/authentication/AuthenticationClient.md)，多次调用此函数只会初始化一次。

```js
import { initAuthClient } from "@authing/vue-ui-components";

initAuthClient({
  appId: "YOUR_APP_ID",
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
| -------------- | :----------------------------------------------------------------------------------------- | ------- | ------------------------------------ | --- |
| appId          | 你的应用 ID                                                                                | String  |                                      |
| mode           | Guard 展示模式                                                                             | String  | modal：弹窗模式<br> normal：全屏模式 |     |
| autoRegister   | 如果为 true，登录时，用户不存在则自动注册账号                                              | boolean | 默认为 false                         |
| isSSO          | 是否是单点登录                                                                             | boolean | 默认为 false                         |
| clickCloseable | Modal 模式时是否隐藏登录框右上角的关闭按钮。<br>如果隐藏，用户将不能通过点击按钮关闭登录框 | boolean | 默认为 true                          |
| escCloseable   | Modal 模式时是否可以通过键盘 ESC 键关闭登录框                                              | boolean | 默认为 true                          |

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
  <AuthingGuard :appId="appId" :config="config" />
</template>

<script>
  import { AuthingGuard } from "@authing/vue-ui-components";
  import "@authing/vue-ui-components/lib/index.min.css";

  export default {
    components: {
      AuthingGuard,
    },
    data() {
      return {
        appId: "AUTHING\_APP\_ID",
        config: {
          apiHost: "https://core.your-authing-service.com",
        },
      };
    },
  };
</script>
```

## 在线体验

<br>

<iframe src="https://codesandbox.io/embed/vibrant-beaver-s3gct?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="authing-vue-guard"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

## 获取帮助

Join us on forum: [#authing-chat](https://forum.authing.cn/)
