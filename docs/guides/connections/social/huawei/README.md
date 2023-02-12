# 华为 

<LastUpdated />

## 场景介绍

- **概述**：华为 社会化登录是用户以 华为 为身份源安全登录第三方应用或者网站。在 {{$localeConfig.brandName}} 中配置并开启 华为 的社会化登录，即可实现通过 {{$localeConfig.brandName}} 快速获取 华为 基本开放的信息和帮助用户实现免密登录功能。
- **应用场景**：PC 网站
- **终端用户预览图**：

![](./images/login-app-1.jpeg)

## 注意事项

- 如果你还没有 华为 账号，请先前往 [华为开发者联盟网站](https://developer.huawei.com/consumer/cn)上注册成为开发者并完成实名认证，具体方法请参见 [华为帐号注册认证](https://developer.huawei.com/consumer/cn/doc/start/registration-and-verification-0000001053628148)。
- 如果你未开通 {{$localeConfig.brandName}} 控制台账号，请先前往 [{{$localeConfig.brandName}} 控制台](https://authing.cn/) 注册开发者账号

## 第一步：在 华为 创建一个服务器应用

登录[华为开发者联盟官网](https://developer.huawei.com/consumer/cn/)，点击 “管理中心”：
![](./images/open-manage-center-1.jpeg)

在“管理中心”页面，点击“帐号”:
![](./images/open-account-1.jpeg)

在“帐号”页面，点击“申请帐号服务”:
![](./images/apply-account-1.jpeg)

选择“服务器应用”，选择 **创建产品** 并配置**应用的回调地址**
- 应用回调地址：填写`https://core.authing.cn/connection/social/{唯一标识}/{用户池ID}/callback`，你需要将其中的 `{唯一标识}` 替换为你正在 {{$localeConfig.brandName}} 创建的身份源所填写的`唯一标识`，`{用户池ID}` 替换成你的 [用户池 ID](/guides/faqs/get-userpool-id-and-secret.md)

![](./images/create-client-1.jpeg)


最后点击「**提交**」，创建完成之后，你需要记录下 `APP ID` 和 `APP SECRET`，下一步需要用到。
![](./images/get-client-info.jpeg)

## 第二步：在 {{$localeConfig.brandName}} 控制台配置 华为 应用配置

2.1 请在 {{$localeConfig.brandName}} 控制台的「社会化身份源」页面，点击「创建社会化身份源」按钮，进入「选择社会化身份源」页面。

![](~@imagesZhCn/guides/connections/create-social-idp.jpg)

2.2 在「选择社会化身份源」页面，点击「华为」卡片。
![](./images/add-app-1.jpeg)

2.3 在「华为」配置页面，填写相关的字段信息。
![](./images/add-app-2.jpeg)

| 字段          | 描述|
| ------------- | ------------------ |
| 唯一标识      | a. 唯一标识由小写字母、数字、- 组成，且长度小于 32 位。<br />b. 这是此连接的唯一标识，设置之后不能修改。|
| 显示名称      | 这个名称会显示在终端用户的登录界面的按钮上。  |
| APP ID     | 上一步获取的 华为 应用 ID。 |
| APP Secret | 上一步获取的 华为 应用 Secret。 |
| 登录模式      | 开启「仅登录模式」后，只能登录既有账号，不能创建新账号，请谨慎选择。 |
| 账号身份关联  | 不开启「账号身份关联」时，用户通过身份源登录时默认创建新用户。开启「账号身份关联」后，可以允许用户通过「字段匹配」或「询问绑定」的方式直接登录到已有的账号。 |

2.4 配置完成后，点击「创建」或者「保存」按钮完成创建。

## 第三步：开发接入

- **推荐开发接入方式**：使用托管登录页
- **优劣势描述**：运维简单，由 {{$localeConfig.brandName}} 负责运维。每个用户池有一个独立的二级域名；如果需要嵌入到你的应用，需要使用弹窗模式登录，即：点击登录按钮后，会弹出一个窗口，内容是 {{$localeConfig.brandName}} 托管的登录页面，或者将浏览器重定向到 {{$localeConfig.brandName}} 托管的登录页。
- **详细接入方法**：

  3.1 在 {{$localeConfig.brandName}} 控制台创建一个应用，详情查看：[如何在 {{$localeConfig.brandName}} 创建一个应用](/guides/app-new/create-app/create-app.md)

  3.2 在已创建好的「华为」身份源连接详情页面，开启并关联一个在 {{$localeConfig.brandName}} 控制台创建的应用

![](./images/connect-app.jpeg)

  3.3 点击 {{$localeConfig.brandName}} 控制台的应用「体验登录」按钮，在弹出的登录窗口体验「华为」登录

![](./images/test-huawei.jpeg)
  
