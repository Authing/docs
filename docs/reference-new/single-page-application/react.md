---
tags:
  - react组件
  - react登录
---

# React 登录组件

<LastUpdated/>

Authing 登录组件（Guard）是一种可嵌入的登录表单，可根据你的需求进行配置，建议用于单页面应用程序。它使你可以轻松添加各种社会化登录方式，以便你的用户可以无缝登录，并且在不同平台拥有一致的登录体验。Guard 为开发者屏蔽了很多底层认证的实现细节，同时也包括繁琐的 UI 开发。

Guard 可以通过组件化的形式集成到你的 React 项目中，你可以借助此组件快速实现登录认证流程。

[查看旧版 react 文档](../ui-components/react.md)

## 快速开始

### 使用 npm

#### 安装

```bash
$ yarn add @authing/react-ui-components

# OR

$ npm install @authing/react-ui-components --save
```

#### 初始化

在 React 项目中初始化：

```javascript
import React from "react";
import ReactDOM from "react-dom";
import { Guard } from "@authing/react-ui-components";
// 引入 css 文件
import "@authing/react-ui-components/lib/index.min.css";

const App = () => {
  const appId = "AUTHING_APP_ID";
  const onLogin = userInfo => {
    console.log(userInfo);
  };
  return <Guard appId={appId} onLogin={onLogin} />;
};

ReactDOM.render(<App />, document.getElementById("root"));
```

### 使用 CDN

#### 使用 CDN 引入

```html
<!-- 引入 babel，支持 jsx -->
<script src="https://cdn.jsdelivr.net/npm/babel-standalone@6.26.0/babel.min.js"></script>

<!-- 引入 React -->
<script src="https://cdn.jsdelivr.net/npm/react@16.14.0/umd/react.production.min.js" crossorigin></script>
<script src="https://cdn.jsdelivr.net/npm/react-dom@16.14.0/umd/react-dom.production.min.js" crossorigin></script>

<!-- JavaScript 代码 -->
<script>
  window.react = React
  window['react-dom']  = ReactDOM
</script>
<script src="https://cdn.jsdelivr.net/npm/@authing/react-ui-components"></script>

<!-- CSS 文件 -->
<link href="https://cdn.jsdelivr.net/npm/@authing/react-ui-components/lib/index.min.css" rel="stylesheet"></link>
```

#### 在 Script 代码块中初始化

```html
<script>
  var App = () => {
    const appId = "AUTHING_APP_ID";
    const onLogin = userInfo => {
      console.log(userInfo);
    };
    return <AuthingReactUIComponents.Guard appId={appId} />;
  };

  ReactDOM.render(<App />, document.getElementById("root"));
</script>
```

### 监听登录事件

`Guard` 组件传入 `onLogin` 事件回调函数，当用户成功登录时回调用此函数，你可以在此获取当前用户的用户信息。[查看完整事件列表](#完整参数)。

```javascript
import { Guard } from "@authing/react-ui-components";
import "@authing/react-ui-components/lib/index.min.css";

function App() {
  return (
    <div className="App">
      <Guard
        appId="AUTHING_APP_ID"
        onLogin={userinfo => {
          console.log(userinfo);
        }}
      />
    </div>
  );
}
```

<details><summary><b>了解获取用户信息之后该怎么做？</b></summary>

!!!include(common/what-to-do-when-you-get-userinfo.md)!!!

</details>

### 添加社会化登录

在初始化参数 `config` 中传入 `socialConnections` 列表指定需要显示的社会化登录（默认显示[该应用配置的所有社会化登录](/guides/app/config-login-methods.md#添加社会化登录)）。

```javascript
import { Guard, SocialConnections } from "@authing/react-ui-components";

function App() {
  return (
    <div className="App">
      <Guard
        appId="AUTHING_APP_ID"
        onLogin={userinfo => {
          console.log(userinfo);
        }}
        config={{
          socialConnections: [SocialConnections.Github]
        }}
      />
    </div>
  );
}
```

<details><summary><b>查看支持的社会化登录列表及接入流程</b></summary>

{{$localeConfig.brandName}} 目前一共支持国内外将近 20 余种社会化登录，如微信、GitHub、Sign in with Apple、支付宝等，以下是完整的列表：

!!!include(common/social-connections-table.md)!!!

</details>

### 退出登录

使用 `Guard` 组件，组件加载完成后回触发的 `onLoad` 事件与登陆成功触发的 `onLogin` 事件都会返回 `AuthClient`。获取到 `AuthClient` 进行手动单例保存，可以在需要调用退出登录的时候使用。

```javascript
import { Guard, SocialConnections } from "@authing/react-ui-components";

function App() {
  let guardAuthClient

  return (
    <div className="App">
      <Guard
        appId="AUTHING_APP_ID"
        onLogin={(userinfo, authClient) => {
          console.log(authClient)
        }}

        onLoad={(authClient) => {
          console.log(authClient)
          guardAuthClient = authClient
        }}
      />

      {guardAuthClient && <button onClick={() => guardAuthClient.logout()}>退出</button>}
    </div>
  );
}
```

### 实现单点登录

使用 Guard 进行单点登录需要在初始化的时候设置 `isSSO` 为 `true`：

```javascript
import React from "react";
import ReactDOM from "react-dom";
import { Guard } from "@authing/react-ui-components";
// 引入 css 文件
import "@authing/react-ui-components/lib/index.min.css";

const App = () => {
  const appId = "AUTHING_APP_ID";
  const onLogin = userInfo => {
    console.log(userInfo);
  };
  return (
    <Guard
      appId={appId}
      onLogin={onLogin}
      config={{
        isSSO: true
      }}
    />
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
```

<!-- ## 使用 React Hooks

Guard 提供了 `useAuthing` 便于对用户进行管理。

```js
import React, { useEffect } from "react";
import { useAuthing, initAuthClient } from "@authing/react-ui-components";
// 在使用 useAuthing 前先初始化 authClient
initAuthClient({
  appId: "AUTHING_APP_ID",
});

export const useInfo = () => {
  const { authClient } = useAuthing();
  const [user, setUser] = useState();

  useEffect(() => {
    authClient.getCurrent().then((user) => setUser(user));
  }, []);

  return <div>Username: {user && user.username}</div>;
};
``` -->

## 导出 `authing-js-sdk`

Guard 组件本身基于 [Authing JavaScript SDK](../web/sdk-for-node/) 进行封装，当你需要进行一些更高级的操作（如管理用户自定义数据、修改用户资料、退出登录）时：

1. 调用 `initAuthClient` 初始化 [AuthenticationClient](/reference/sdk-for-node/authentication/AuthenticationClient.md)，多次调用此函数只会初始化一次。

```js
import { initAuthClient } from "@authing/react-ui-components";

initAuthClient({
  appId: "YOUR_APP_ID"
});
```

2. 之后使用 `getAuthClient` 获取 `AuthenticationClient` 实例。

```js
import { getAuthClient } from "@authing/react-ui-components";

const authClient = getAuthClient();
```

3. 调用 `AuthenticationClient` 实例的方法，完整方法列表请见 [AuthenticationClient 方法列表](/reference/sdk-for-node/authentication/AuthenticationClient.md)。

```js
authClient.getCurrentUser().then(user => console.log(user));
```

## 完整参数

Authing 登录组件（Guard）提供了很多高级配置，如自定义 UI，使用特定登录方式等。详细请见[完整参数列表](./parameters.md)。

## 事件列表

::: hint-info
注意在 React 中，事件监听应采用小驼峰命名，如：`onLogin`, `onLoginError`。
:::

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

**私有化部署**场景需要指定你私有化的 Authing 服务的 GraphQL 端点（**不带协议头和 Path**），如果你不清楚可以联系 Authing IDaaS 服务管理员。

```javascript
import React from "react";
import { Guard } from "@authing/react-ui-components";
import "@authing/react-ui-components/lib/index.min.css";

const App = () => {
  const appId = "AUTHING_APP_ID";
  const config = {
    host: "https://core.you-authing-service.com"
  };
  return <Guard appId={appId} />;
};
```

<!-- ## 在线体验

<br>

<iframe src="https://codesandbox.io/embed/authing-react-guard-forked-stxv2?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:800px; border:0; border-radius: 4px; overflow:hidden;"
     title="authing-react-guard (forked)"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe> -->

## 获取帮助

Join us on forum: [#authing-chat](https://forum.authing.cn/)
