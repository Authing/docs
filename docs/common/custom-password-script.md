# 自定义密码加密方法

<LastUpdated/>

如果你想自定义密码加密函数，请在此上传函数片段（目前仅支持 Node.js），函数模版请[点击这里下载](https://console.authing.cn/api/v2/password/template/download)（Authing 不会存储用户的密码原文）。

此功能适用于以下场景：

1. 你将所有用户迁移进了 Authing，但不想让用户修改密码；
2. 你不信任 {{$localeConfig.brandName}} 的密码加密算法，想使用自己的密码加密算法；

本文档介绍了如何配置密码加密函数。

## 配置步骤

路径：**安全设置->密码安全->自定义密码加密方法**

如下图所示：

![](~@imagesZhCn/guides/security/1616578690192.png)

::: img-description
自定义密码加密方法
:::

### 下载模版

点击页面中的 [下载模版](https://console.authing.cn/console/62c6aac0e65730661e1c5f17/safety-management/password?password_policy=custom_password) 下载 Node.js 代码模版，模版代码如下所示：

```js
var getRawBody = require("raw-body");

const encryptPassword = (password) => {
  // 在此编写加密密码的函数

  return password;
};

/**
 *
 * @param {String} password 明文密码
 * @param {String} encryptedPassword 密文密码
 */
const comparePassword = (password, encryptedPassword) => {
  // 在此编写校验密码的函数

  return password === encryptedPassword;
};

module.exports.encrypt = function (request, response, context) {
  // get request body
  getRawBody(request, function (err, body) {
    const queries = request.queries;
    const password = queries.password;

    if (!password) {
      response.setStatusCode(500);
      response.setHeader("content-type", "application/json");
      response.send(
        JSON.stringify(
          {
            message: "Please provide password via url query",
          },
          null,
          4
        )
      );
    }

    const respBody = {
      password: encryptPassword(password), // 在此加密密码
    };

    response.setStatusCode(200);
    response.setHeader("content-type", "application/json");
    response.send(JSON.stringify(respBody, null, 4));
  });
};

module.exports.validate = function (request, response, context) {
  // get request body
  getRawBody(request, function (err, body) {
    const queries = request.queries;
    const password = queries.password;
    const encryptedPassword = queries.encryptedPassword;

    if (!password) {
      response.setStatusCode(500);
      response.setHeader("content-type", "application/json");
      response.send(
        JSON.stringify(
          {
            message: "Please provide password via url query",
          },
          null,
          4
        )
      );
    }

    const respBody = {
      isValid: comparePassword(password, encryptedPassword), // 在此校验密码
    };

    response.setStatusCode(200);
    response.setHeader("content-type", "application/json");
    response.send(JSON.stringify(respBody, null, 4));
  });
};
```

### 编写代码

你需要在 `encryptPassword` 函数中编写相应的密码加密方法，以及在 `vlidatePassword` 函数中编写相应的验证密码加密方法。

若开发者需要引入第三方 NPM 包，请直接使用 NPM 直接安装。

::: hint-info
NPM 是 Node.js 生态的包管理工具。
:::

以下是引入 `bcryptjs` 包的一个代码示例：

```haskell
$ npm install bcryptjs
```

安装完成后在文件夹内会多出一个 node_modules 文件夹，之后编写代码：

```js
var getRawBody = require("raw-body");

const encryptPassword = (password) => {
  // Implement your login here.
  // Your can use bcrypt for example
  // more info here: https://github.com/kelektiv/node.bcrypt.js
  var bcryptjs = require("bcryptjs");
  var genSaltSync = bcryptjs.genSaltSync();
  return bcryptjs.hashSync(password, genSaltSync);
};

const vlidatePassword = (plainText, encrypted) => {
  // plainText is the plainText password use provide to be validate.
  // encrypted is user's password encryped in database.

  // Implement your login here.
  // Your can use bcrypt for example
  // more info here: https://github.com/kelektiv/node.bcrypt.js
  var bcryptjs = require("bcryptjs");
  return bcryptjs.compareSync(password, encryptedPassword);
};
```

### 上传函数至服务器

::: hint-info
{{$localeConfig.brandName}} 支持的代码包只能为 .js 格式或 .zip 格式。
:::

若你没有引入任何包，可直接上传 .js 格式的模版文件；若你引入了包请连带 node_modules 一起打包为 .zip 格式并在 {{$localeConfig.brandName}} 控制台中上传。

![](~@imagesZhCn/guides/migrations/1616579059776.jpg)

### 测试密码加密函数

上传成功后开发者可测试密码加密效果，如下所示，在输入框中输入原密码后点击「加密测试」即可看到加密后的密码（若未上传任何加密函数将显示 {{$localeConfig.brandName}} 默认的密码加密结果）。

![](~@imagesZhCn/guides/migrations/1616579347869.jpg)

[示例代码](https://files.authing.co/docs/project.zip)

## 注意事项

::: hint-info
密码加密函数上传后即生效，会影响原用户，建议此功能在完全新的用户池中使用。

若你需要在旧用户池中修改密码加密函数，请联系 <a href="mailto:csm@authing.cn">Authing 售后服务人员</a>。
:::
