# 亚马逊移动端

<LastUpdated/>

## 场景介绍

### 概述

亚马逊 社会化登录是用户以 亚马逊 为身份源安全登录第三方应用或者网站。在 {{$localeConfig.brandName}} 中配置并开启 亚马逊 的社会化登录，即可实现通过 {{$localeConfig.brandName}} 快速获取 亚马逊 基本开放的信息和帮助用户实现免密登录功能。

### 应用场景

移动端

### 终端用户预览图

<img src="./images/amazon_1.png" alt="drawing" width="500"/>


## 注意事项

- 如果你未开通 亚马逊 开放平台 账号，请先前往 [亚马逊开放平台](https://developer.amazon.com/) 注册开发者账号。
- 如果你未开通 {{$localeConfig.brandName}} 控制台账号，请先前往 [{{$localeConfig.brandName}} 控制台](https://authing.cn/) 注册开发者账号。


## 第一步：在 亚马逊 开放平台 创建一个安全配置文件

1.1 前往 [亚马逊开放平台](https://developer.amazon.com/) 创建安全配置文件。

点击页面上方的「Developer Console」->「Login With Amazon」创建安全配置文件。过程中如遇到任何问题，请参考页面上方的亚马逊官方[文档资料 Login with Amazon](https://developer.amazon.com/zh/docs/login-with-amazon/register-ios.html)。

<img src="./images/amazon_lwa_1.png" >

<img src="./images/amazon_lwa_2.png" >

<img src="./images/amazon_lwa_3.png" >

1.2 记录 **Security Profile ID**, 并分别配置 Android 和 iOS 设置

<img src="./images/amazon_profile.png" >

1.2.1 **配置 Android**

填写信息，生成 **API Key** 并记录下生成的 **API Key**

<img src="./images/amazon_profile_android_1.png" >

<img src="./images/amazon_profile_android_2.png" >

<img src="./images/amazon_profile_android_3.png" >

1.2.2 **配置 iOS**

填写信息，生成 **API Key** 并记录下生成的 **API Key**

<img src="./images/amazon_profile_ios_1.png" >

<img src="./images/amazon_profile_ios_2.png" >

<img src="./images/amazon_profile_ios_3.png" >

## 第二步：在 {{$localeConfig.brandName}} 控制台配置 亚马逊移动端

2.1 请在 {{$localeConfig.brandName}}  控制台 的「社会化身份源」页面，点击「创建社会化身份源」按钮，进入「选择社会化身份源」页面。

<img src="./images/amazon_3.png" >

2.2 请在  {{$localeConfig.brandName}}  控制台 的「社会化身份源」-「选择社会化身份源」页面，点击「亚马逊」身份源按钮，进入「亚马逊移动端登录模式」页面。

<img src="./images/amazon_4.png" >

<img src="./images/amazon_5.png" >

2.3 请在  {{$localeConfig.brandName}}  控制台 的「社会化身份源」-「亚马逊移动端」页面，配置相关的字段信息。

<img src="./images/amazon_6.png" >

| 字段/功能         | 描述                                                                      |
|---------------|-------------------------------------------------------------------------|
| 唯一标识          | a.唯一标识由小写字母、数字、- 组成，且长度小于 32 位。b.这是此连接的唯一标识，设置之后不能修改。                   |
| 显示名称          | 这个名称会显示在终端用户的登录界面的按钮上。                                                  |
| 安全配置文件 ID | 亚马逊的「安全配置文件 ID」，需要在 亚马逊 开放平台 上获取。                  |
| API 密钥 (安卓) | 亚马逊的「安全配置文件」 - 「Android 设置」的 API Key，需要在 亚马逊 开放平台 上获取。 |
| API 密钥 (iOS) | 亚马逊的「安全配置文件」 - 「iOS 设置」的 API Key，需要在 亚马逊 开放平台 上获取。 |
| 登录模式          | 开启「仅登录模式」后，只能登录既有账号，不能创建新账号，请谨慎选择。                                      |
| 账号身份关联 | 不开启「账号身份关联」时，用户通过身份源登录时默认创建新用户。开启「账号身份关联」后，可以允许用户通过「字段匹配」的方式直接登录到已有的账号。 |

配置完成后，点击「创建」或者「保存」按钮完成创建。

## 第三步：开发接入

- **推荐开发接入方式**：SDK

- **优劣势描述**：运维简单，由 {{$localeConfig.brandName}} 负责运维。每个用户池有一个独立的二级域名;如果需要嵌入到你的应用，需要使用弹窗模式登录，即：点击登录按钮后，会弹出一个窗口，内容是 {{$localeConfig.brandName}} 托管的登录页面，或者将浏览器重定向到 {{$localeConfig.brandName}} 托管的登录页。

- **详细接入方法**：
  

3.1 在 {{$localeConfig.brandName}} 控制台创建一个应用，详情查看：[如何在 {{$localeConfig.brandName}} 创建一个应用](/guides/app-new/create-app/create-app.md)

3.2 在已创建好的「亚马逊移动端」身份源连接详情页面，开启并关联一个在 {{$localeConfig.brandName}} 控制台创建的应用

<img src="./images/amazon_7.png" >

3.3 在登录页面体验 亚马逊 第三方登录（如 [终端用户预览图](#终端用户预览图) 所示）。
