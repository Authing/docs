---
tags:
  - javaScript组件
  - javaScript登录
---

# 原生 JavaScript 登录组件

<LastUpdated/>

Authing 登录组件（Guard）是一种可嵌入的登录表单，可根据你的需求进行配置，建议用于单页面应用程序。它使你可以轻松添加各种社会化登录方式，以便你的用户可以无缝登录，并且在不同平台拥有一致的登录体验。Guard 为开发者屏蔽了很多底层认证的实现细节，同时也包括繁琐的 UI 开发。

Guard 可以通过组件化的形式集成到你的原生 JavaScript 项目中，你可以借助此组件快速实现登录认证流程。

[查看旧版 原生 JavaScript 文档](../ui-components/native-javascript.md)


## 版本

稳定版本：[![](https://img.shields.io/npm/v/@authing/native-js-ui-components.svg?style=flat-square)](https://www.npmjs.com/package/@authing/native-js-ui-components)

## 安装

### 使用 npm 或者 yarn 安装

我们这里推荐使用 npm 或 yarn，它们能更好的和 [webpack](https://webpack.js.org/) 打包工具进行配合，也可放心地在生产环境打包部署使用，享受整个生态圈和工具链带来的诸多好处。

```bash
$ npm install @authing/native-js-ui-components --save
```

```bash
$ yarn add @authing/native-js-ui-components
```

如果你的网络环境不佳，我们推荐你使用 [cnpm](https://github.com/cnpm/cnpm)。

### 浏览器引入

在浏览器中使用 `script` 和 `link` 标签直接引入文件，并使用全局变量 `AuthingNativeJsUIComponents`。

我们在 npm 发布包内的 `@authing/native-js-ui-components/lib` 目录下提供了 `index.min.css` 以及 `index.min.js`。

你也可以通过 [![](https://data.jsdelivr.com/v1/package/npm/@authing/native-js-ui-components/badge)](https://www.jsdelivr.com/package/npm/@authing/native-js-ui-components) 或者 [unpkg.com](https://unpkg.com/@authing/native-js-ui-components) 进行下载 `index.min.css` 以及 `index.min.js`。


> 强烈不推荐使用已构建文件，这样无法按需加载，而且难以获得底层依赖模块的 bug 快速修复支持。

## 示例

首先你要在 [Authing Console](https://console.authing.cn) 中获取你的 `应用 ID`。如果你不知道如何获取 `应用 ID`，可以[参考文档](../../guides/faqs/get-app-id-and-secret.md)

### 直接用 `<script>` 引入

```html
<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8">
  <!-- JavaScript 代码 -->
  <script src="https://cdn.jsdelivr.net/npm/@authing/native-js-ui-components"></script>

  <!-- CSS 文件 -->
  <link href="https://cdn.jsdelivr.net/npm/@authing/native-js-ui-components/lib/index.min.css" rel="stylesheet">
  </link>

</head>

<body>

  <script>
    var guard = new AuthingNativeJsUIComponents.Guard("AUTHING_APP_ID");
    // 事件监听
    guard.on("load", (authClient) => console.log(authClient));
  </script>
</body>

</html>
```


### 在 JavaScript 项目中引入

```javascript
import { Guard } from "@authing/native-js-ui-components";

// 引入 css 文件
import "@authing/native-js-ui-components/lib/index.min.css";

// 你的 APP ID
const guard = new Guard("AUTHING_APP_ID");

```

### 完整体验

这是一个最简单的 Guard 组件的在线 [codepen](https://codepen.io/) 演示。可以将 `AppId` 修改为你自己的 ID 直接在这里展示。

<iframe height="842" style="width: 100%;" scrolling="no" title="Guard Demo" src="https://codepen.io/xuancaosu/embed/qBpbwmz?default-tab=html%2Cresult&editable=true&theme-id=light" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/xuancaosu/pen/qBpbwmz">
  Guard Demo</a> by Lucsun (<a href="https://codepen.io/xuancaosu">@xuancaosu</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

### 监听登录事件

你可以通过 `guard.on("login", callback)` 监听登录事件：

```javascript
guard.on("login", (user) => {
  console.log(user);
});
```

<details><summary><b>了解获取用户信息之后该怎么做？</b></summary>

!!!include(common/what-to-do-when-you-get-userinfo.md)!!!

</details>

### 添加社会化登录

在初始化参数 `config` 中传入 `socialConnections` 列表指定需要显示的社会化登录（默认显示[该应用配置的所有社会化登录](/guides/app-new/create-app/login-control.md#添加社会化登录)）。

```html
<script>
  var guard = new AuthingNativeJsUIComponents.Guard("AUTHING_APP_ID", {
    socialConnections: ["github"],
  });
</script>
```

<details><summary><b>查看支持的社会化登录列表及接入流程</b></summary>

{{$localeConfig.brandName}} 目前一共支持国内外将近 20 余种社会化登录，如微信、GitHub、Sign in with Apple、支付宝等，以下是完整的列表：

!!!include(common/social-connections-table.md)!!!

</details>

### 实现单点登录

使用 Guard 进行单点登录只需要初始化的时候设置 `isSSO` 为 `true` 即可：

```html
<script>
  var guard = new AuthingNativeJsUIComponents.Guard("AUTHING_APP_ID", {
    isSSO: true,
  });
</script>
```

## 实例方法

Guard 实例提供了三个方法：
| 方法名 | 方法参数 | 功能 |
| :----- | :------------------------------------------------------------------------------------ | :------------------- |
| on | <p>evtName: 事件名，详细请查看[事件列表](./parameters.md)</p><p>Handler: 对应事件的处理函数</p> | 监听某个事件 |
| show | - | modal 模式中显示表单 |
| hide | - | modal 模式中隐藏表单 |

## 完整参数

Authing 登录组件（Guard）提供了很多高级配置，如自定义 UI，使用特定登录方式等。详细请见[完整参数列表](./parameters.md)。

## 事件列表

| 事件名                        | 事件说明                                             | 事件参数                | 事件参数说明                                                                                                  |
| :---------------------------- | :--------------------------------------------------- | :---------------------- | :------------------------------------------------------------------------------------------------------------ |
| load                          | {{$localeConfig.brandName}} appId 验证通过，加载完成 | authClient              | AuthenticationClient 对象，可直接操作 login， register，详情请查看 [SDK 库](https://authing-open-api.readme.io/reference) |
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

```html
<script>
  var guard = new AuthingNativeJsUIComponents.Guard("AUTHING_APP_ID", {
    host: "https://core.you-authing-service.com",
  });
</script>
```

<!-- ## 在线体验

<br>
<iframe src="https://codesandbox.io/embed/authing-native-js-guard-forked-1n2kr?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:800px; border:0; border-radius: 4px; overflow:hidden;"
     title="authing-native-js-guard (forked)"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe> -->
<!-- <iframe src="https://codesandbox.io/embed/authing-native-js-guard-o2o1e?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:800px; border:0; border-radius: 4px; overflow:hidden;"
     title="authing-native-js-guard"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe> -->

## 获取帮助

请访问 [Authing 论坛](https://forum.authing.cn/)。
