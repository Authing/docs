**首先，通过 npm/yarn/cnpm 安装 Authing library.**

推荐使用 npm （稳定版本 v3.1.21）或 yarn，它们能更好的和 [webpack](https://webpack.js.org/) 打包工具进行配合，也可放心地在生产环境打包部署使用，享受整个生态圈和工具链带来的诸多好处。
如果你的网络环境不佳，也可使用 [cnpm](https://github.com/cnpm/cnpm) 。

运行下列命令行安装 Authing React.JS library：

```sh
$ yarn add @authing/guard-react18

# OR

$ npm install @authing/guard-react18 --save
```

**然后，在你的 React 应用中完成配置：**

`App.tsx`

```js
// 代码示例：https://github.com/Authing/Guard/blob/master/examples/guard-react18/normal/src/App.tsx
import React from "react";
import { GuardProvider } from '@authing/guard-react18';
import "@authing/guard-react18/dist/esm/guard.min.css";

// 你的业务代码根组件
import RouterComponent from "./router";

const App = () => {
  return (
    <GuardProvider
      appId="AUTHING_APP_ID"
      // 如果你使用的是私有化部署的 Authing 服务，需要传入自定义 host，如:
      // host="https://my-authing-app.example.com"

      // 默认情况下，会使用你在 Authing 控制台中配置的第一个回调地址为此次认证使用的回调地址。
      // 如果你配置了多个回调地址，也可以手动指定（此地址也需要加入到应用的「登录回调 URL」中）：
      // redirectUri="YOUR_REDIRECT_URI"
    >
      <RouterComponent></RouterComponent>
    </GuardProvider>
  );
};
```

`Embed.tsx`

```js
// 代码示例：https://github.com/Authing/Guard/blob/master/examples/guard-react18/normal/src/pages/Embed.tsx
import React, { useEffect } from "react";
import { useGuard, User } from "@authing/guard-react18";

export default function Login() {
  // 获取 Guard 实例
  const guard = useGuard();

  useEffect(() => {
    // 使用 start 方法挂载 Guard 组件到你指定的 DOM 节点，登录成功后返回 userInfo
    guard.start("#authing-guard-container").then((userInfo: User) => {
      console.log("userInfo: ", userInfo);
    });
  }, []);

  return (
    <div>
      <div id="authing-guard-container"></div>
    </div>
  );
}
```