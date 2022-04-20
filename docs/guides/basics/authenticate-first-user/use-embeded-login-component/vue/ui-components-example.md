### 安装

使用 `yarn` 或 `npm` 安装：

```bash
$ yarn add @authing/vue-ui-components

# OR

$ npm install @authing/vue-ui-components --save
```

使用 CDN 引入：

```html
<script src="https://cdn.authing.co/packages/vue-ui-components/2.4.45/index.min.js"></script>

<link href="https://cdn.authing.co/packages/vue-ui-components/2.4.45/index.min.css" rel="stylesheet"></link>
```

### 初始化

你需要从 `@authing/vue-ui-components` 中引入 `AuthingGuard`，初始化 `AuthingGuard` 只需要一个参数 —— 你的应用 ID（appId），你可以在控制台的应用列表页面获取应用的 appId。

```vue
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
        socialConnections: ["github"],
        logo: "https://usercontents.authing.cn/client/logo@2.png",
        title: "{{$localeConfig.brandName}}",
      },
    };
  },
  methods: {},
};
</script>
```

### 监听成功登录事件

你只需要监听 `@login` 事件即可：

```vue
<template>
  <AuthingGuard :appId="appId" :config="config" @login="handleLogin" />
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
        socialConnections: ["github"],
        logo: "https://usercontents.authing.cn/client/logo@2.png",
        title: "{{$localeConfig.brandName}}",
      },
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

用户信息中的 `token` 字段为该用户的身份凭证，后续访问你后端资源的时候应该带上，然后在后端验证此 `token` 的身份。
