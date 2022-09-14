# 企业微信移动端（代开发模式）

<LastUpdated/>

## 场景介绍

- **概述**：企业微信移动端（代开发模式）是通过服务商提供代开发应用，第三方企业扫码授权的形式，为第三企业实现以企业微信为身份源安全登录第三方应用。在 {{$localeConfig.brandName}} 中配置并开启 企业微信移动端（代开发模式） 的企业登录，即可实现通过 {{$localeConfig.brandName}} 快速获取 企业微信 基本开放的信息和帮助用户实现免密登录功能。
- **应用场景**：移动端
- **终端用户预览图**：

![](./images/mobile_login.png)

## 注意事项

- 如果您未开通 企业微信服务商 账号，请先前往 [企业微信服务商官网](https://open.work.weixin.qq.com/) 点击成为**企业微信服务商**；
- 开发过程中，还需要一个企业微信的企业管理员账号，对代开发应用模板进行授权操作，您可以在[企业微信权限管理页面](https://work.weixin.qq.com/wework_admin/frame#profile/role)进行管理员权限的修改；
- 如果您未开通 {{$localeConfig.brandName}} 控制台账号，请先前往 [{{$localeConfig.brandName}} Console 控制台](https://authing.cn/) 注册开发者账号；

## 步骤 1：创建代开发应用

前往 [企业微信服务商后台](https://open.work.weixin.qq.com/wwopen/developer#/index)，点击**应用代开发**，选择**创建代开发应用模板**，填写相应内容。进入配置开发信息页面

![](./images/create_template.png)

![](./images/create_template_confirm.png)

在配置开发信息页面，点击**随机获取**生成 Token 和 EncodingAESKey；代开发模板回调 URL，需要在 {{$localeConfig.brandName}} 控制台创建应用后才能生成，并通过微信服务器校验，因此我们先把页面保留在这里，打开 {{$localeConfig.brandName}} 控制台。

![](./images/save_token.png)

## 步骤 2：在 {{$localeConfig.brandName}} 控制台配置 企业微信移动端（代开发模式）

2.1 请在 {{$localeConfig.brandName}} Console 控制台 的「企业身份源」页面，点击「创建企业身份源」按钮，进入「选择企业身份源」页面，点击「企业微信」身份源按钮

![](./images/idp_list.png)

2.2 选择 「企业微信移动端（代开发模式）」。

![](./images/click_wecom_agency_qrcode.png)

2.3 请在「企业微信移动端（代开发模式）」页面，填写在 **企业微信服务商后台配置开发信息页面** 获取的 Token 和 EncodingAESKey。

![](./images/save_token.png)

![](./images/console_save_token.png)

点击保存，{{$localeConfig.brandName}} 控制台会自动跳转到身份源详情页，复制页面下方的**事件地址**所展示的 URL。注意：由于企业微信需要进行回调验证，**必须点击保存后进行后续操作**，否则微信回调验证无法通过。

![](./images/event_url.png)

将在 {{$localeConfig.brandName}} 控制台获取到的**事件地址**的 URL，填写到企业微信服务商后台，配置开发信息中的**代开发模板回调 URL** 中，然后点击保存

![](./images/save_event_url.png)

## 步骤 3：上线企业微信代开发应用模板

3.1 在企业微信服务商后台，选择应用管理，在**代开发应用上线**中，点击**提交上线按钮**，提交刚创建的代开发模板

![](./images/submit_template.png)

![](./images/chose_submit_event.png)

3.2 企业微信会对代开发模板进行审核，审核通过后，点击模板，进入代开发模板审核详情，选择**提交上线**

![](./images/submit_template_confirm.png)

![](./images/confirm_template.png)

3.3 在企业微信**应用开发**页面，选择**应用代开发**，选择需要被授权的代开发应用模板，点击**查看模板信息**

![](./images/chose_template.png)

![](./images/template_information.png)

3.4 分别将模板 ID 和 模板 Secret 填写到 {{$localeConfig.brandName}} 控制台的身份源信息中
![](./images/get_suite.png)

![](./images/write_suite.png)

3.5 在企业微信服务商后台，**服务商信息页面**，选择基本信息，**IP 白名单**需要添加上 {{$localeConfig.brandName}} 的服务器 IP 地址，具体可点击 [{{$localeConfig.brandName}} 服务器 IP 列表](https://core.authing.cn/api/v2/system/public-ips)进行获取

![](./images/ip_whitelist.png)

## 步骤 4：企业授权代开发模板并开发代开发应用

4.1 在应用代开发页面，点击刚才创建的应用代开发模板，企业管理员扫描授权二维码.

![](./images/auth_template.png)

刷新页面

在页面下出现代开发应用，点击**开始代开发应用**

![](./images/start_app.png)

确认基础信息后，配置开发信息，在可信域名中填写 core.authing.cn

![](./images/auth_url.png)

## 步骤 5：配置并上线代开发应用

点击完成后，回到代开发应用模板详情页面，点击**查看**

![](./images/check_app.png)

编辑使用配置

![](./images/edit_setting.png)

点击**校验可信域名归属**

![](./images/check_auth_url.png)

在弹出窗口，选择 **下载文件**
![](./images/download_file.png)

将文件名和文件的内容填入 {{$localeConfig.brandName}} 的 **Txt Filename** 和 **Txt Content** 中，点击保存

![](./images/save_file_name.png)

![](./images/confirm_auth_url.png)

点击微信平台上的**使用配置**上的保存按钮进行保存。

设置企业微信授权登录
![](./images/set_auth_login.png)

填入相应的移动端开发者信息， iOS 侧需要填写 Bundle ID，Android 需要填写应用签名及应用包名。填写好后点击保存。将 schema (iOS 和 Android schema 是一致的)填写在 authing 的身份源连接配置中

![](./images/auth_mobile_message.jpg)

![](./images/get_schema.png)

配置完成后在代开发应用提交上线并审核

![](./images/submit_app.png)

![](./images/chose_app.png)

审核通过后，代开发应用状态变更为待上线

![](./images/wait_app.png)

点击进入待上线的应用，提交上线

![](./images/confirm_app.png)
![](./images/confirm_app_upload.jpg)

在授权企业的[企业管理后台](https://work.weixin.qq.com/wework_admin/frame#profile/role)（注意：不是服务商管理后台），我的企业 查看企业 ID

![](./images/check_corpid.png)

在 {{$localeConfig.brandName}} 中的 企业 ID 填入企业 ID

![](./images/write_corpid.png)

在授权企业的[企业管理后台](https://work.weixin.qq.com/wework_admin/frame#profile/role)（注意：不是服务商管理后台）的自建应用中找到新建的应用，进入应用详情， 将 AgentId 填入 {{$localeConfig.brandName}} 的 AgentId 中

![](./images/check_agentid.jpg)

点击编辑按钮，添加可见范围，只有选择的组织成员可使用 {{$localeConfig.brandName}} 进行登录(特别提示：如果你的应用处于 「开发中」状态，那么请返回企业微信服务商管理后台的「代开发应用上线」上线相关的应用!!!)

![](./images/chose_user.png)

点击授权信息，选择自定义权限，添加允许的成员敏感信息

![](./images/chose_premission_0.png)
![](./images/chose_premission_1.png)
![](./images/chose_premission_2.png)

## 步骤 6：开发接入

- **推荐开发接入方式**：使用托管登录页

- **优劣势描述**：运维简单，由 {{$localeConfig.brandName}} 负责运维。每个用户池有一个独立的二级域名;如果需要嵌入到你的应用，需要使用弹窗模式登录，即：点击登录按钮后，会弹出一个窗口，内容是 {{$localeConfig.brandName}} 托管的登录页面，或者将浏览器重定向到 {{$localeConfig.brandName}} 托管的登录页。

- **详细接入方法**：

  3.1 在 {{$localeConfig.brandName}} 控制台创建一个应用，详情查看：[如何在 {{$localeConfig.brandName}} 创建一个应用](/guides/app-new/create-app/create-app.md)

  3.2 在已创建好的 企业微信移动端（代开发模式） 身份源连接详情页面，开启并关联一个在 {{$localeConfig.brandName}} 控制台创建的应用

![](./images/associate_app.png)

3.3 在登录页面体验 企业微信移动端（代开发模式） 第三方登录

![](./images/mobile_login.png)
