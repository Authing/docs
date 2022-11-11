**首先，通过 npm/yarn/cnpm 安装 Authing library.**

推荐使用 npm （稳定版本 v3.1.21）或 yarn，它们能更好的和 [webpack](https://webpack.js.org/) 打包工具进行配合，也可放心地在生产环境打包部署使用，享受整个生态圈和工具链带来的诸多好处。
如果你的网络环境不佳，也可使用 [cnpm](https://github.com/cnpm/cnpm) 。

运行下列命令行安装 Authing Vue.JS library：

```sh
$ yarn add @authing/guard-vue3

# OR

$ npm install @authing/guard-vue3 --save
```

**然后，在你的 Vue 应用中完成配置：**

`main.ts`

```js
// 代码示例：https://github.com/Authing/Guard/blob/master/examples/guard-vue3/normal/src/main.ts
import { createApp } from "vue";
import { createGuard } from "@authing/guard-vue3";
import "@authing/guard-vue3/dist/esm/guard.min.css";
// 你的业务代码根组件
import App from "./App.vue";

const app = createApp(App);

app.use(
  createGuard({
    appId: "AUTHING_APP_ID",
    // 如果你使用的是私有化部署的 Authing 服务，需要传入自定义 host，如:
    // host: 'https://my-authing-app.example.com',

    // 默认情况下，会使用你在 Authing 控制台中配置的第一个回调地址为此次认证使用的回调地址。
    // 如果你配置了多个回调地址，也可以手动指定（此地址也需要加入到应用的「登录回调 URL」中）：
    // redirectUri: "YOUR_REDIRECT_URI"
  })
);
```

`Embed.vue`

```vue
<template>
  <!-- 代码示例：https://github.com/Authing/Guard/blob/master/examples/guard-vue3/normal/src/views/Embed.vue -->
  <div id="authing-guard-container"></div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { useGuard } from "@authing/guard-vue3";
import type { User } from "@authing/guard-vue3";

const guard = useGuard();

onMounted(() => {
  // 使用 start 方法挂载 Guard 组件到你指定的 DOM 节点，登录成功后返回 userInfo
  guard.start("#authing-guard-container").then((userInfo: User) => {
    console.log("userInfo: ", userInfo);
  });
});
</script>
```