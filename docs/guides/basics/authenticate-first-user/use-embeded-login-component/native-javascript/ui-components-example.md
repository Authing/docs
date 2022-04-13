### 安装

使用 `yarn` 或 `npm` 安装：

```bash
$ yarn add @authing/native-js-ui-components

# OR

$ npm install @authing/native-js-ui-components --save
```

使用 CDN 引入：

```html
// JavaScript 代码
<script src="https://cdn.authing.co/packages/native-js-ui-components/2.4.45/index.min.js"></script>

...
// CSS 文件
<link href="https://cdn.authing.co/packages/native-js-ui-components/2.4.45/index.min.css" rel="stylesheet"></link>
```

### 初始化

```html
<script>
  var guard = new AuthingNativeJsUIComponents.AuthingGuard("AUTHING_APP_ID");

  // 事件监听
  guard.on("load", (authClient) => console.log(authClient));
</script>
```

### 监听成功登录事件

监听成功登录事件非常简单，你只需要传入一个 `onLogin` 回调函数即可：

```javascript
guard.on("login", (user) => {
  console.log(user);
});
```

用户信息中的 `token` 字段为该用户的身份凭证，后续访问你后端资源的时候应该带上，然后在后端验证此 `token` 的身份。
