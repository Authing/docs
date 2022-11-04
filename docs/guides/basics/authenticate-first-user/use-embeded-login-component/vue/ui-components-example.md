有两种方式可以供你选择：**「安装 Authing library」** 或 **「直接通过浏览器加载」**。

无论使用哪一种安装方式，你都需要用到应用的 `appId` ，请先 [前往控制台获取](https://console.authing.cn)。关于 **APP ID** 所在位置，请参阅 [应用配置](https://docs.authing.cn/v2/guides/app-new/create-app/app-configuration.html)。

### 方法一：安装 Authing library

**首先，通过 npm/yarn/cnpm 安装 Authing library.**

推荐使用 npm （稳定版本 v3.1.21）或 yarn，它们能更好的和 [webpack](https://webpack.js.org/) 打包工具进行配合，也可放心地在生产环境打包部署使用，享受整个生态圈和工具链带来的诸多好处。
如果你的网络环境不佳，也可使用 [cnpm](https://github.com/cnpm/cnpm) 。

运行下列命令行安装 Authing Vue.JS library：

```sh
$ yarn add @authing/vue-ui-components

# OR

$ npm install @authing/vue-ui-components --save
```

**然后，在你的 Vue 应用中完成配置：**

```vue
<template>
  <Guard :appId="appId" @login="onLogin"></Guard>
</template>

<script>
import { Guard } from "@authing/vue-ui-components";

// 引入 CSS 样式
import "@authing/vue-ui-components/lib/index.min.css";

export default {
  components: {
    Guard,
  },
  data: () => ({
    // 替换你的 AppId
    appId: "your_appId_at_authing_console",
  }),
  methods: {
    onLogin(userInfo) {
      console.log(userInfo);
    },
  },
};
</script>
```

### 方法二：直接通过浏览器加载

**首先，在你的 HTML 文件中使用 script 和 link 标签直接引入文件，并使用全局变量 AuthingVueUIComponents。**

Authing npm 发布包内的 `@authing/vue-components/lib` 目录下提供了 `index.min.css` 以及 `index.min.js`，你可以直接调用，也可以通过 [jsdelivr](https://www.jsdelivr.com/package/npm/@authing/vue-ui-components) 或者 [unpkg](https://unpkg.com/@authing/vue-ui-components/lib/index.min.js) 下载）。

```html
<!DOCTYPE html>
<html lang="zh-CN">

<head>
    <meta charset="utf-8" />
    <!-- 引入 Vue -->
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.js"></script>

    <script src="https://cdn.jsdelivr.net/npm/@authing/vue-ui-components/lib/index.min.js"></script>

    <!-- 引入样式 -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@authing/vue-ui-components/lib/index.min.css">
    </link>
</head>

<body>
    <div id="app"></div>

    <script>
        // 这可以替换你的 AppId
        const appId = 'your_appId_at_authing_console'

        const app = new Vue({
            el: '#app',
            render: (h) => h(AuthingVueUIComponents.Guard, {
                props: {
                    appId,
                },
            }),
        })

        window.app = app

    </script>
</body>

</html>
```

**无论通过哪一种方式，你都可以完成 Authing Guard 在你项目中的安装和初始化。**
