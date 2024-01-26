# Authing 网关代填

<LastUpdated/>

Authing 网关代填使用 Authing 提供的网关对应用服务进行代理，通过拦截登录、登出等 API 进行后端代填操作。此种方式相较于 [ASA 表单代填](../asa/README.md)更加安全，用户无需安装浏览器插件，使用更加便捷，但对于需要人机校验（如图形验证码）的应用，网关代填暂时还未支持代填验证码。

管理员可以给用户分配应用账密。 Authing 将账密加密存储在数据库中。在用户访问被分配了账号密码的应用的登录界面时，Authing 网关会拦截请求，并在网关中自动填充账号密码，并进行登录。最终用户只需登录 Authing，就可直接访问被分配的应用。

## 如何使用

### 部署 Authing 网关

使用 Authing 网关代填能力之前，需要先部署 Authing 网关，详情咨询 [Authing 售前人员](mailto:sales@authing.cn)。

### 连接网关

打开 [Authing 控制台](https://console.authing.cn)，进入 **应用** -> **自建应用** 菜单，选择**网关管理** tab。
![](~@imagesZhCn/guides/gateway/1.png)

点击**创建网关连接**，输入网关信息，其中**网关管理后台地址**即部署完网关后网关的管理界面地址。点击**创建**即可创建完成。
![](~@imagesZhCn/guides/gateway/2.png)

### 创建网关代填应用

点击**创建自建应用**，选择**网关代填应用**，填写应用信息，点击**创建**即可创建完成。

![](~@imagesZhCn/guides/gateway/3.png)

### 配置代填策略

#### 基础配置

创建完成后进入应用详情，进入**代填策略** tab，填写配置信息：

- 目标应用 URL：即需要被代填的应用的访问地址，需包含协议、域名（IP）、端口
- 应用代理 URL：即被代理后用户实际访问的地址，需要包含协议、域名、端口
- 应用登录地址：当需要登录时，用户访问的页面地址，Authing 网关会拦截此页面，在网关中进行代填登录操作
- 用户登出地址：当用户手动退出登录时，访问的 API 地址，Authing 网关会拦截此接口，将 Authing 登录态清除
- 登录成功重定向地址：当网关代理登录成功后，进入的页面地址，一般填写应用首页即可
- Host 请求头：一般情况下，如果目标应用本身没有域名或目标应用域名与应用代理域名一致，则选择「保持与客户端请求一致的域名」，否则选「使用目标应用 URL 的域名」
- 首次放行登录页：某些应用在访问登录页时会通过 cookie 等方式返回 csrf token 等信息，所以不能直接拦截登录页，需要浏览器先访问一次登录页再进行后续操作
  ![](~@imagesZhCn/guides/gateway/4.png)

#### 登录接口调用

登录接口调用配置的是当用户输入用户名密码，点击登录按钮后，调用的接口地址和参数，网关将模拟此流程。可以添加多个请求，在每个请求中你需要选择请求方法、输入请求地址，还有可选的 Params（拼接在请求 URL 后的参数）、Headers（请求头）、Body（请求体）；在 Params、Headers、Body 的 value 中，你可以使用变量，例如需要获取用户绑定的账号：`${bound_account.account}`。所有变量如下：

- bound_account.account：用户被绑定的账号
- bound_account.password：用户被绑定的密码
- cookie：请求 cookie，如 `${cookie.xxx}` 表示请求 cookie xxx 的值
- api_respN.body.xxx：第 N 个登录请求的响应的 xxx 的值，其中 N 是从 1 开始的递增整数，表示第 N 个登录请求
  ![](~@imagesZhCn/guides/gateway/5.png)

#### 登录完成后写 localStorage

某些单页应用，在调用登录接口成功后，需要在 localStorage 中写入 token 信息，此时就需要配置此信息。在 value 中也可以使用 `${api_respN.body.xxx}` 变量
![](~@imagesZhCn/guides/gateway/6.png)

配置完成后点击保存即可。

### 绑定账号

点击**账号绑定配置**中的**添加**按钮，输入被代替应用中真实存在的账号密码，点击确定即可创建成功。
![](~@imagesZhCn/guides/gateway/7.png)

点击账号配置，点击**账号绑定**。
![](~@imagesZhCn/guides/gateway/8.png)

选择需要使用此账号登录的用户、角色或用户组，点击确定即可完成配置。
![](~@imagesZhCn/guides/gateway/9.png)

在访问授权页面，选择「允许所有用户访问」
![](~@imagesZhCn/guides/gateway/10.png)

然后即可体验登录。
