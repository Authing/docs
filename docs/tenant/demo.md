# 示例：基于 Authing 开发一个叫做 Uthing 的 SaaS 应用



让我们把 Uthing 作为一个需要实现多租户功能的 SaaS 应用，你可以亲自动手来体验 Authing 的多租户功能。以下操作需要一定的技术基础，如果你想直接体验完成后的效果，请在阅读完本文后到文章最后部分直接利用我们提供的[测试账号](#idTest)开始体验。



<img src="./images/demo1-main.png" />

## 在本地运行示例应用

你可以在[代码](https://github.com/Authing/demo-multi-tenant-with-authing) 克隆代码到本地部署 Uthing。代码 clone 完成后，首先你需要到 `client` 和 `server` 分别执行 `npm install` 安装依赖。然后到 Authing 控制台新建一个应用，在应用详情中找到「租户配置」，将「哪类用户可以访问此应用」改为**全部。**

<img src="./images/demo2-tennatConfig.png" />

在应用配置中找到应用 ID 、密钥和应用域名

<img src="./images/demo-appInfo.png" />

在用户池设置中找到用户池 ID 和密钥

<img src="./images/demo-userpoolInfo.png" />

粘贴到项目的`server/config.js` 

<img src="./images/demo-serverConfig.png" />

 `client/src/config.ts` 配置文件对应的配置中。

<img src="./images/demo-clientconfig.png" />

然后打开终端，在 `server` 目录中执行 `npm run start`，打开另一个终端，在 `client` 目录下执行 `npm run start` ，在浏览器打开 `http://localhost:3007` 就能看到 Uthing 界面。

<img src="./images/demo1-main.png" />



## 在 Uthing 中注册一个企业（租户）

点击首页头部「登录」按钮，进入登录界面，点击「立即注册」。 

<img src="./images/demo-loginpage.png" />



输入一个邮箱和密码，注册账号，注册完成回到登录界面，输入邮箱密码，点击「登录」，即可进入到选择企业界面，由于是新账号，没有可选择的企业，所以你可以选择在 Uthing 中创建一个企业。点击「创建」按钮。

<img src="./images/demo-choose.png" />

进入企业创建页面，填写所需信息，其中「企业域名」表示你的企业的登录地址，只要是浏览器能访问 的正常域名即可。

<img src="./images/registerEnterprise.png" />

点击「确定」即可创建企业，并进入到你企业所属的 Uthing 界面。

<img src="./images/createEnterprise.png" />

此时回到 Authing 控制台，查看租户列表，你创建的企业会在列表中展示。

<img src="./images/demo-tenantList.png" />

## 在 Uthing 中添加企业成员

进入 Uthing 成员管理，点击「添加成员」。

<img src="./images/demo-addmember.png" />





输入用户名邮箱等信息点击确定，即可添加成员。



<img src="./images/demo-addmemeberinfo.png" />



此时在 Uthing 成员列表和 Authing 租户成员列表中都可看到此用户。



<img src="./images/demo-memberlist.png">



<img src="./images/demo-memberlist2.png" />



## 为企业设置登录框样式

进入 Authing 多租户管理界面，点击「品牌化」。

<img src='./images/demo-brandconfig.png' />

在自定义登录框样式中输入一些 CSS 代码，点击右上角保存。

<img src="./images/demo-brandsave.png" />



在 Uthing 中退出登录，进入登录界面，即可看到自定义 CSS 已生效。

<img src="./images/demo-tenantlogin.png" />

## 在 Uthing 中添加身份源

本示例以 Gitlab 为例，登录 Uthing，在 Uthing 中找到 **配置** -> **Gitlab 登录** ，填入所需信息，点击确定保存。若不知道信息如何获取，可参考接入 [GitLab 社会化登录](https://docs.authing.cn/v2/connections/gitlab/)。

<img src="./images/demo-addgitlab.png" />

保存完成退出登录，即可看到登录界面有 GitLab 登录按钮。点击此按钮即可用 GitLab 登录 Uthing。

<img src="./images/demo-gitlablogin.png" />

不同的企业在 Uthing 添加的身份源是相互隔离的，上面演示了租户 A 如何添加身份源，如果另一个租户 B 同样添加了 GitLab 身份源，他们是互不影响的。



## <span id="idTest" >直接开始体验</span>

你可以使用以下账号和密码在 [Authing 官网](https://www.authing.cn/) 登录具备多租户功能的控制台，登录后可以看到我们已经在**应用**中集成好了 Uthing。

```
账号：tenant-demo@authing.cn
密码：Authing!
```



<img src="./images/demo-uthingapp.png" />

你可以访问 [http://tenant.authing-inc.co/](http://tenant.authing-inc.co/) 进入 Uthing 示例应用的登录页面，使用以下账号密码登录 Uthing 应用后结合我们提供的控制台进行体验。或按照本文说明进行新租户注册、新用户注册等操作后，结合我们提供的控制台进行体验。

```
账号：test@test.com
密码：test@test.com
```

