**在你的 HTML 文件中使用 `script` 和 `link` 标签直接引入文件，并使用全局变量 `GuardFactory`。**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Authing Guard Demo</title>
    <script src="https://cdn.authing.co/packages/guard/5.1.0/guard.min.js"></script>
    <link rel="stylesheet" href="https://cdn.authing.co/packages/guard/5.1.0/guard.min.css" />
  </head>
  <body>
    <div id="authing-guard-container"></div>

    <script>
      const guard = new GuardFactory.Guard({
        // 你可以前往 Authing 控制台的本应用详情页查看你的 APP ID
        appId: "AUTHING_APP_ID",

        // 如果你使用的是私有化部署的 Authing 服务，需要传入自定义 host，如:
        // host: 'https://my-authing-app.example.com',

        // 默认情况下，会使用你在 Authing 控制台中配置的第一个回调地址为此次认证使用的回调地址。
        // 如果你配置了多个回调地址，也可以手动指定（此地址也需要加入到应用的「登录回调 URL」中）：
        // redirectUri: "YOUR_REDIRECT_URI"
      });

      // 挂载 Authing Guard
      guard.start("#authing-guard-container");
    </script>
  </body>
</html>
```