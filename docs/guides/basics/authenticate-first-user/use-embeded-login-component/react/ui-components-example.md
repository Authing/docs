有两种方式可以供你选择：**「安装 Authing library」** 或 **「直接通过浏览器加载」**。

无论使用哪一种安装方式，你都需要用到应用的 `appid` ，请先[前往控制台获取](/guides/faqs/get-app-id-and-secret.md)。

### 方法一：安装 Authing library

**首先，通过 npm/yarn/cnpm 安装 Authing library.**

推荐使用 npm （稳定版本 v3.1.21）或 yarn，它们能更好的和 [webpack](https://webpack.js.org/) 打包工具进行配合，也可放心地在生产环境打包部署使用，享受整个生态圈和工具链带来的诸多好处。
如果你的网络环境不佳，也可使用 [cnpm](https://github.com/cnpm/cnpm) 。

运行下列命令行安装 Authing React.JS library：

```sh
$ yarn add @authing/react-ui-components

# OR

$ npm install @authing/react-ui-components --save
```

**然后，在你的 React 应用中完成配置：**

```js
import { Guard } from "@authing/react-ui-components";
import React from "react";
import ReactDOM from "react-dom";
// 引入 css 文件
import "@authing/react-ui-components/lib/index.min.css";

const App = () => {
  // 替换你的 AppId
  const appId = "your_appId_at_authing_console";

  const onLogin = (userInfo) => {
    console.log(userInfo);
  };

  return <Guard appId={appId} onLogin={onLogin} />;
};

ReactDOM.render(<App />, document.getElementById("root"));
```

### 方法二：直接通过浏览器加载

**首先，在你的 HTML 文件中使用 `script` 和 `link` 标签直接引入文件，并使用全局变量 `AuthingReactUIComponents`。**

Authing npm 发布包内的 `@authing/react-ui-components/lib` 目录下提供了 `index.min.css` 以及 `index.min.js`，你可以直接调用，也可以通过 [jsdelivr](https://www.jsdelivr.com/package/npm/@authing/react-ui-components) 或者 [unpkg](https://unpkg.com/@authing/react-ui-components/lib/index.min.js) 下载）。

```html
<html lang="en">

<head>
  <meta charset="utf-8" />
  <!-- 引入 babel，支持 jsx -->
  <script src="https://cdn.jsdelivr.net/npm/babel-standalone@6.26.0/babel.min.js"></script>

  <!-- 引入 React -->
  <script src="https://cdn.jsdelivr.net/npm/react@16.14.0/umd/react.production.min.js" crossorigin></script>
  <script src="https://cdn.jsdelivr.net/npm/react-dom@16.14.0/umd/react-dom.production.min.js" crossorigin></script>

  <!-- JavaScript 代码 -->
  <script>
    window.react = React
    window['react-dom'] = ReactDOM
  </script>
  <script src="https://cdn.jsdelivr.net/npm/@authing/react-ui-components"></script>

  <!-- CSS 文件 -->
  <link href="https://cdn.jsdelivr.net/npm/@authing/react-ui-components/lib/index.min.css" rel="stylesheet">
  </link>
</head>

<body>
  <div id="root"></div>
  <script>
    var App = () => {
      const appId = "AUTHING_APP_ID";
      const onLogin = userInfo => {
        console.log(userInfo);
      };
      return React.createElement(
        AuthingReactUIComponents.Guard, {
          appId: appId,
          onLogin: onLogin,
        },
      )
    };
    ReactDOM.render(React.createElement(App), document.getElementById("root"));
  </script>
</body>

</html>
```

**无论通过哪一种方式，你都可以完成 Authing Guard 在你项目中的安装和初始化。**
