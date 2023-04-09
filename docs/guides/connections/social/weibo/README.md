# 新浪微博

<LastUpdated/>

## 场景介绍

- **概述**：新浪微博社会化登录是用户以新浪微博为身份源安全登录第三方应用或者网站。在 {{$localeConfig.brandName}} 中配置并开启新浪微博的社会化登录，即可实现通过 {{$localeConfig.brandName}} 快速获取新浪微博基本开放的信息和帮助用户实现免密登录功能。
- **应用场景**：网站接入（PC），移动应用（MOBILE）
- **终端用户预览图**：

<img src="./images/weibo_0.png" >

## 注意事项

- 如果你未开通微博开放平台账号，请先前往 [微博开放平台](https://open.weibo.com/connect) 注册开发者账号。
- 需要身份认证通过后，才可创建应用。
- 如果你未开通 {{$localeConfig.brandName}} 控制台账号，请先前往 [{{$localeConfig.brandName}} 控制台](https://authing.cn/) 注册开发者账号。


## 第一步：在微博开放平台创建一个应用

前往[微博开放平台](https://open.weibo.com/connect)按照官方指引创建一个网站应用。

<img src="./images/weibo_2.png" >
<img src="./images/weibo_7.png" >


点击页面右上方头像图标，选择开发者信息进行基本信息和身份认证，认证通过后创建一个网站应用。如有无法解决的问题可私信[微博开放平台](https://weibo.com/1904178193)咨询。

<img src="./images/weibo_1.png" >

创建应用过程中，需要配置允许的回调地址，请使用以下设置：`https://core.authing.cn/connection/social/<Unique Identifier>/<USERPOOL_ID>/callback`，你需要将其中的 `<Unique Identifier>` 替换成你的`唯一标识`，`<USERPOOL_ID>` 替换成你的 [用户池 ID](/guides/faqs/get-userpool-id-and-secret.md)


## 第二步：在 {{$localeConfig.brandName}} 控制台配置新浪微博

2.1 请在 {{$localeConfig.brandName}}  控制台 的「社会化身份源」页面，点击「创建社会化身份源」按钮，进入「选择社会化身份源」页面。

<img src="./images/weibo_3.png" >

2.2 请在  {{$localeConfig.brandName}}  控制台 的「社会化身份源」-「选择社会化身份源」页面，点击「新浪微博」身份源按钮，进入 「新浪微博登录模式」页面。

<img src="./images/weibo_4.png" >

2.3 请在  {{$localeConfig.brandName}}  控制台 的「社会化身份源」-「新浪微博」页面，配置相关的字段信息。

<img src="./images/weibo_5.png" >

| 字段/功能    | 描述                                                         |
| ------------ | ------------------------------------------------------------ |
| 唯一标识     | a.唯一标识由小写字母、数字、- 组成，且长度小于 32 位。b.这是此连接的唯一标识，设置之后不能修改。 |
| 显示名称     | 这个名称会显示在终端用户的登录界面的按钮上。                 |
| APP ID      | 新浪微博编号，需要在微博开放平台上获取。                  |
| App Secret   | 新浪微博密钥，需要在微博开放平台上获取。                   |
| Callback URL     | 可以填写你的业务回调地址，用户完成登录后，浏览器将会跳转到该地址。 |
| Scopes     | 默认情况下，{{$localeConfig.brandName}} 只会向用户申请基础用户信息（如头像、昵称等）的授权，如果你需要更多高级权限，可以勾选上对应的选项。 |
| 回调地址     | 新浪微博有效跳转 URI。需要将此 URL 配置到微博开放平台上。 |
| 登录模式     | 开启「仅登录模式」后，只能登录既有账号，不能创建新账号，请谨慎选择。 |
| 账号身份关联 | 不开启「账号身份关联」时，用户通过身份源登录时默认创建新用户。开启「账号身份关联」后，可以允许用户通过「字段匹配」或「询问绑定」的方式直接登录到已有的账号。|

配置完成后，点击「创建」或者「保存」按钮完成创建。

在 {{$localeConfig.brandName}} 控制台上创建完新浪微博身份源后，需要将回调地址配置到微博开放平台上的平台信息里面的网站回调域。

<img src="./images/weibo_6.png" >


## 第三步：开发接入

- **推荐开发接入方式**：使用托管登录页

- **优劣势描述**：运维简单，由 {{$localeConfig.brandName}} 负责运维。每个用户池有一个独立的二级域名;如果需要嵌入到你的应用，需要使用弹窗模式登录，即：点击登录按钮后，会弹出一个窗口，内容是 {{$localeConfig.brandName}} 托管的登录页面，或者将浏览器重定向到 {{$localeConfig.brandName}} 托管的登录页。

- **详细接入方法**：

3.1 在 {{$localeConfig.brandName}} 控制台创建一个应用，详情查看：[如何在 {{$localeConfig.brandName}} 创建一个应用](/guides/app-new/create-app/create-app.md)

3.2 在已创建好的新浪微博身份源连接详情页面，开启并关联一个在 {{$localeConfig.brandName}} 控制台创建的应用

<img src="./images/weibo_8.png" >

3.3 在登录页面体验新浪微博第三方登录

<img src="./images/weibo_9.png" >
