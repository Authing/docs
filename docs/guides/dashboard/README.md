# 应用面板

<LastUpdated/>

{{$localeConfig.brandName}} 应用面板用于展示企业所需的各类应用，是提供员工单点登录、提高工作效率、保证信息安全的好地方。

企业员工对各类应用的单点登录（SSO）是基于安全断言标记语言（SAML）或 {{$localeConfig.brandName}} 自研的安全身份验证 ({{$localeConfig.brandName}}  Secure Authentication) 而实现的。

![](~@imagesZhCn/guides/dashboard/app-panel.png)

## 终端用户的操作说明

### 登录应用面板
终端用户在访问应用面板前需要登录 {{$localeConfig.brandName}}  。首先，用户需要在浏览器输入应用面板的登录地址 URL，比如「https://org-name.authing.cn 」（其中「org-name」是公司或组织的名称）。接下来，用户需要输入他的用户名和密码，或者通过第三方账号登录。如果用户不知道自己的用户名或忘记了密码，他需要联系所在企业的 IT 部门，IT 管理员会为他设置 {{$localeConfig.brandName}}  帐户或重置密码。

![](~@imagesZhCn/guides/dashboard/app-panel2.png)

### 添加或卸载应用
应用面板会默认展示用户可访问的所有应用。用户可以随意添加或卸载自己的常用应用，以便降低不必要应用的干扰。

你可以在应用面板添加自建应用或者第三方应用。

![](~@imagesZhCn/guides/dashboard/app-panel3.png)

要将应用从应用面板删除，点击应用列表待删除应用的右上角「...」按钮，并在弹出的删除窗口中进行确认。

![](~@imagesZhCn/guides/dashboard/app-panel4.png)

### 更新个人信息

在应用面板右上角，用户可以点击 **个人中心** 按钮以进入用户个人中心，来编辑个人信息。

![](~@imagesZhCn/guides/dashboard/app-panel5.png)

![](~@imagesZhCn/guides/dashboard/app-panel6.png)
## 企业管理员的操作说明

### 第一步：为团队成员安装应用
企业管理员或具有 {{$localeConfig.brandName}}  控制台权限的管理员（管理员及添加协作管理员详情可见 [添加用户池协作管理员](/guides/userpool-config/collaboration-adminstrator.md)）登录 {{$localeConfig.brandName}} 控制台 **应用->单点登录 SSO->应用列表->某应用详情页->访问授权**，在 **应用访问控制** 模块设置访问应用的权限。

![](~@imagesZhCn/guides/dashboard/app-panel7.png)

### 第二步：配置应用面板

企业管理员或具有 {{$localeConfig.brandName}} 控制台权限的管理员可以进入控制台 **品牌化->应用面板->基础设置** 和 **应用->单点登录 SSO->配置** 来配置应用面板的基本信息、登录注册方式、社交登录方式、企业登录方式等（有关详情，请参阅 [登录控制](/guides/app-new/create-app/login-control.html) 及 [应用面板配置](https://docs.authing.cn/v2/guides/customize/app-panel/#%E5%BA%94%E7%94%A8%E9%9D%A2%E6%9D%BF%E9%85%8D%E7%BD%AE)）。

![](~@imagesZhCn/guides/dashboard/base-set.png)
![](~@imagesZhCn/guides/dashboard/login-set.png)


### 第三步：查看用户或组织可访问的应用

管理员可以进入控制台 **应用->单点登录 SSO->已分配应用** 来查看用户或组织可访问的应用列表。点击应用会进入应用详情页。

![](~@imagesZhCn/guides/dashboard/app-panel9.png)

### 第四步：配置应用单点登录 SSO

用户进入「单点登录 SSO」页，添加刚刚的自建应用。

::: hint-info
添加后，登录 SSO 列表页内的任意应用（自建或集成应用），即可单点登录面板所有应用。
:::

![](~@imagesZhCn/guides/dashboard/app-panel3.png)

![](~@imagesZhCn/guides/dashboard/add-created-app-to-sso.png)