有两种方式可以供你选择：「安装 Authing library」或「直接通过浏览器加载」。

无论使用哪一种安装方式，你都需要用到应用的 `appId` ，请先[前往控制台获取](https://console.authing.cn)。

### 方法一：安装 Authing library

**首先，通过 npm/yarn/cnpm 安装 Authing library.**

推荐使用 npm （稳定版本 v3.1.21）或 yarn，它们能更好的和 [webpack](https://webpack.js.org/) 打包工具进行配合，也可放心地在生产环境打包部署使用，享受整个生态圈和工具链带来的诸多好处。
如果你的网络环境不佳，也可使用 [cnpm](https://github.com/cnpm/cnpm) 。

运行下列命令行安装 Authing Native.JS library：

```sh
$ yarn add @authing/native-js-ui-components

# OR

$ npm install @authing/native-js-ui-components --save
```

**然后，在你的 native 应用中完成配置：**

```js
const { Guard } = require("@authing/native-js-ui-components");

// 替换你的 AppId
const appId = "your_appId_at_authing_console";

const guardInstance = new Guard({ appId });

guardInstance.on("login", (userInfo) => {
  console.log(userInfo);
});
```

### 方法二：直接通过浏览器加载

**首先，在你的 HTML 文件中使用 script 和 link 标签直接引入文件，并使用全局变量 AuthingNativeJsUIComponents。**

Authing npm 发布包内的 `@authing/native-ui-components/lib` 目录下提供了 `index.min.css` 以及 `index.min.js`，你可以直接调用，也可以通过 [jsdelivr](https://www.jsdelivr.com/package/npm/@authing/native-js-ui-components) 或者 [unpkg](https://unpkg.com/@authing/native-js-ui-components/lib/index.min.js) 下载）。

```html
<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8">
  <!-- JavaScript 代码 -->
  <script src="https://cdn.jsdelivr.net/npm/@authing/native-js-ui-components"></script>

  <!-- CSS 文件 -->
  <link href="https://cdn.jsdelivr.net/npm/@authing/native-js-ui-components/lib/index.min.css"
    rel="stylesheet">
  </link>


  <title>native demo</title>
</head>

<body>
  <script>
    // 替换你的 AppId
    const appId = "your_appId_at_authing_console";

    const guardInstance = new AuthingNativeJsUIComponents.Guard({ appId });

    guardInstance.on("login", (userInfo) => {
      console.log(userInfo);
    });


  </script>
</body>

</html>
```

**无论通过哪一种方式，你都可以完成 Authing Guard 在你项目中的安装和初始化。**
