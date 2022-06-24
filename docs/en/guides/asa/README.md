# ASA 表单代填

<LastUpdated/>

Authing Secure Authentication(ASA) 是一项 {{$localeConfig.brandName}} 开发的功能，可为不支持标准认证协议（OAuth2.0、OIDC、SAML、CAS）的外部 Web 应用程序提供单点登录 (SSO) 功能。

管理员可以给用户分配应用账密。 {{$localeConfig.brandName}} 将账密加密存储在数据库中。在用户访问被分配了账号密码的应用的登录界面时，{{$localeConfig.brandName}} 会自动填充账号密码，并进行登录。最终用户只需登录 {{$localeConfig.brandName}}，就可直接访问被分配的应用。

## 如何使用

### 创建 ASA 应用

在 {{$localeConfig.brandName}} 应用市场找一个支持 ASA 的应用，以下我们以「石墨文档」为例进行演示。

![](~@imagesZhCn/guides/asa/1.png)

点击进入详情，点击「获取应用」

![](~@imagesZhCn/guides/asa/2.png)

填写应用名称，点击「下一步」

![](~@imagesZhCn/guides/asa/3.png)

点击「完成」

![](~@imagesZhCn/guides/asa/4.png)

在分配账号页面，给用户分配应用账号

![](~@imagesZhCn/guides/asa/5.png)

在访问授权页面，选择「允许所有用户访问」

![](~@imagesZhCn/guides/asa/6.png)

### 下载插件

终端用户需要下载浏览器插件才能使用 ASA。浏览器插件的下载列表如下，如果你使用的浏览器不在以下列表中，请尝试安装 Chrome 版本的插件：

| 浏览器         | 使用说明                                                                                                                                                                                                                                                                               |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Google Chrome  | <ul><li>尝试直接打开 [Chrome 应用商店](https://chrome.google.com/webstore/detail/authing-secure-authentica/ncipeimbkgimamagbpkgghchcgkgbgjf) 安装</li><li>若无法访问上面的链接，查看 <a href="./chrome-manual-install.html" target="_blank">Chrome 手动安装插件</a> 进行安装</li></ul> |
| 360 极速浏览器 | 进入 [应用中心](https://ext.chrome.360.cn/webstore/detail/djnmokbcodildihilkkhomijjmpmcdmk) 下载并安装，登录 Authing 应用面板后即可使用此插件                                                                                                                                          |
| 360 安全浏览器 | 进入 [应用中心](https://ext.se.360.cn/webstore/detail/djnmokbcodildihilkkhomijjmpmcdmk) 下载并安装，登录 Authing 应用面板后即可使用此插件                                                                                                                                              |
| Firefox        | 进入 [拓展中心](https://addons.mozilla.org/zh-CN/firefox/addon/authing-secure-authentication/) 下载并安装，登录 Authing 应用面板后即可使用此插件                                                                                                                                       |

<!-- | Safari         | 进入 [App Store](https://apps.apple.com/cn/app/%E6%90%9C%E7%8B%97%E8%BE%93%E5%85%A5%E6%B3%95-%E8%AF%AD%E9%9F%B3%E5%8F%98%E5%A3%B0%E6%96%97%E5%9B%BE%E8%A1%A8%E6%83%85/id917670924) 下载并安装，登录 Authing 应用面板后即可使用此插件                                                         | -->

### 体验登录

点击单点登录应用列表的「前往体验」按钮，进入 {{$localeConfig.brandName}} 应用面板登录页面。

![](~@imagesZhCn/guides/asa/7.png)

输入之前被分配了账号的用户的邮箱和密码，点击「登录」，进入应用面板。

![](~@imagesZhCn/guides/asa/8.png)

插件图标上将会出现红色叹号，点击「插件图标」，打开插件页面，点击「信任」当前账号。

![](~@imagesZhCn/guides/asa/9.png)

插件中会展示当前账号被管理员所分配的所有应用列表，你可以看到你之前添加的「石墨文档」。

![](~@imagesZhCn/guides/asa/10.png)

进入对应应用的登录界面，{{$localeConfig.brandName}} 浏览器插件将会自动填充之前分配的账号密码并自动登录。有时应用需要进行一些人机校验，此行为需要用户手动操作，插件无法跳过。

![](~@imagesZhCn/guides/asa/11.png)

校验完成即登录成功。

![](~@imagesZhCn/guides/asa/12.png)

我们正在加速 ASA 插件支持更多应用，如果你希望你的应用被支持，你可以在 [加入 APN 概览](../../apn/README.md) 了解更多详情。

## 自定义 ASA 应用

如果在应用市场找不到你需要的应用，你可以使用自定义 ASA 应用。

### 创建自定义 ASA 应用

下面以「石墨文档」为例进行说明。首先在应用市场中找到 **自定义 ASA 应用**。

![](~@imagesZhCn/guides/asa/custom-1.png)

点击进入详情，然后点击「获取应用」，进入应用配置界面，上传应用 logo，填写应用名称，点击「下一步」。

![](~@imagesZhCn/guides/asa/custom-2.png)

进入 ASA 配置界面

- 首先输入**应用登录页面 URL**，如「石墨文档」的登录页 URL 为 **https://shimo.im/loginByPassword**。
- 然后填写 **ASA 自动登录步骤**，自动登录步骤必须是合法的 JSON 字符串，且为对象数组，ASA 插件会根据此数组按顺序执行对象操作。数组中对象的所有 key 如下：

  - **action**：表示当前步骤的操作类型，所有操作类型为
    - **type**：输入，如输入账号
    - **click**：点击，如点击登录按钮
    - **selectFrame**：切换 iframe，某些网站登录框会嵌套在 iframe 中，此时需要切换到登录框所在 iframe 才能输入账密进行登录
    - **wait**：等待一定时间，如有些网页在输入账密后，需要等待一定时间才能点击登录按钮

  * **target**：表示当前步骤的操作目标，值为字符串，接受所有 [querySelector](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector) 能接受的 dom 元素选择器，如 `#password`
  * **value**：表示当前步骤的操作值
    - 在 **type** 操作中使用时，值为字符串，可用 <code><span v-pre>{{account}}</span></code> 表示绑定的账号，<code><span v-pre>{{password}}</span></code> 表示绑定的密码
    - 在 **wait** 操作中使用时，值为数字，单位为毫秒，如 1000 表示等待 1 秒

* 账号分配方式目前只支持**管理员设置账号和密码**

![](~@imagesZhCn/guides/asa/custom-3.png)

点击「完成」，在分配账号页面，给用户分配应用账号

![](~@imagesZhCn/guides/asa/custom-4.png)

在访问授权页面，选择「允许所有用户访问」

![](~@imagesZhCn/guides/asa/custom-5.png)

后续即可[体验登录](#体验登录)
