#### 在 {{$localeConfig.brandName}} 控制台创建 AD 连接

进入 [{{$localeConfig.brandName}} 控制台](https://console.authing.cn/console/userpool)，按照下图指引找到  **连接身份源**/**连接 Active Directory** ：

![](https://cdn.authing.cn/img/20210126190459.png)

::: img-description
创建 AD 连接
:::

你需要输入以下字段信息：

- **连接标志符**: 这是此连接的唯一标志符，设置之后不能修改。
- **显示名称**: 如果设置，{{$localeConfig.brandName}} 登录表单将会显示一个 "使用 {displayName} 登录" 的按钮。
- **应用 Logo**

然后点击「**保存**」按钮，成功创建之后，你会得到一个 **Provisioning Ticket Url**，这个会在下面的步骤中使用：

![](https://cdn.authing.cn/blog/20201109141645.png)

之后你需要为你的应用开启此 AD 连接：

![](https://cdn.authing.cn/img/20210126190629.png)

#### 在 Windows 运行 {{$localeConfig.brandName}} AD Connector

在安装 {{$localeConfig.brandName}} AD Connector 之前，请先确保满足以上条件：

- Windows 服务器；
- 服务器安装了 Active Directory；
- 运行 {{$localeConfig.brandName}} AD Connector 的机器上，能够连通 Active Directory；
- 一个具有 Active Directory 的读取权限的用户账密。

首先你需要[下载](https://download.authing.cn/app/{{$localeConfig.brandName}}-AD-Connector-latest.exe) {{$localeConfig.brandName}} AD Connector，这是一个 exe 文件，需要运行在你的 Windows AD 服务器，负责和 {{$localeConfig.brandName}} 进行通信。{{$localeConfig.brandName}} AD Connector 需要**安装在局域网 AD 域环境**中，但不一定要安装到运行 AD 服务的服务器上，只要保证 {{$localeConfig.brandName}} AD Connector 能够访问到 AD 用户目录。

##### 安装 {{$localeConfig.brandName}} AD Connector

点击[这里](https://download.authing.cn/app/{{$localeConfig.brandName}}-AD-Connector-latest.exe)下载最新的 {{$localeConfig.brandName}} AD Connector。

将下载的文件上传到 AD 域环境的机器上，双击应用，进行安装。

![](https://cdn.authing.cn/docs/20200414213654.png)

系统可能提出警告，点击「仍要运行」。

![](https://cdn.authing.cn/blog/image%20%28521%29.png)

选择语言，点击「OK」。

![](https://cdn.authing.cn/docs/20200414213931.png)

点击「下一步」。

![](https://cdn.authing.cn/blog/20201109213415.png)

接受许可协议并点击「下一步」。

![](https://cdn.authing.cn/blog/20201109213443.png)

选择软件安装目录，然后点击「安装」。

![](https://cdn.authing.cn/blog/20201109213500.png)

等待安装完成。

![](https://cdn.authing.cn/blog/20201109213517.png)

点击「完成」，会弹出命令行窗口，等待安装完成。

![](https://cdn.authing.cn/docs/20200414214751.png)

中途可能会出现缺少可选依赖的报错信息，可以忽略。看到以下界面说明安装成功，可按任意键退出：

![](https://cdn.authing.cn/docs/20200414214912.png)

之后你可以在 Windows 的服务管理页面看到  AuthingADConnector 这个服务：

![](https://cdn.authing.cn/blog/20201109214605.png)

接下来，打开浏览器，访问 http://127.0.0.1:9743，会看到以下界面：

![](https://cdn.authing.cn/docs/eirog1.png)

将你的 Provisioning Ticket Url、AD 服务器链接地址（请填写 **http://ws.authing.cn:8855** ）、Base DN、域用户名、密码填入，然后点击「**保存**」按钮。

![](https://cdn.authing.cn/docs/serths2.png)
之后，点击「测试连接」，出现以下结果，说明连接正常：

![](https://cdn.authing.cn/docs/20200414220049.png)

::: hint-info
如果遇到 Connector 与 {{$localeConfig.brandName}} 链接测试失败问题，请稍等一会儿，可能因为网络延迟问题，Connector 与 {{$localeConfig.brandName}} 握手尚未完成。
:::

::: hint-info
如果遇到 AD 相关的错误，请检查 AD 服务器链接、账密信息是否正确。
:::
