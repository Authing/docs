# 抖音移动端

<LastUpdated/>

## 场景介绍

### 概述

抖音社会化登录是用户以抖音为身份源安全登录第三方应用或者网站。在 {{$localeConfig.brandName}} 中配置并开启抖音的社会化登录，即可实现通过 {{$localeConfig.brandName}} 快速获取抖音基本开放的信息和帮助用户实现免密登录功能。

### 应用场景

移动端

### 终端用户预览图

<img src="./images/douyin_1.png" alt="drawing" width="500"/>


## 注意事项

- 如果你未开通 抖音开放平台 账号，请先前往 [抖音开放平台](https://developer.open-douyin.com/) 注册开发者账号。
- 需要审核通过后，才可创建应用。
- 如果你未开通 {{$localeConfig.brandName}} 控制台账号，请先前往 [{{$localeConfig.brandName}} 控制台](https://authing.cn/) 注册开发者账号。


## 第一步：在 抖音开放平台 创建一个移动应用

前往 [抖音开放平台](https://developer.open-douyin.com/console?type=3)，创建一个移动应用。

点击页面左上方的 控制台 完成注册并发起审核，然后依次点击「移动应用」和「创建应用」来创建一个使用抖音登录的移动应用。过程中如遇到任何问题，请参考页面上方的抖音官方「文档资料」。

<img src="./images/douyin_2.png" >

## 第二步：在 {{$localeConfig.brandName}} 控制台配置抖音移动端

2.1 请在 {{$localeConfig.brandName}}  控制台 的「社会化身份源」页面，点击「创建社会化身份源」按钮，进入「选择社会化身份源」页面。

<img src="./images/douyin_3.png" >

2.2 请在  {{$localeConfig.brandName}}  控制台 的「社会化身份源」-「选择社会化身份也」页面，点击「抖音」身份源按钮，进入「抖音移动端登录模式」页面。

<img src="./images/douyin_4.png" >

<img src="./images/douyin_5.png" >

2.3 请在  {{$localeConfig.brandName}}  控制台 的「社会化身份源」-「抖音移动端」页面，配置相关的字段信息。

<img src="./images/douyin_6.png" >

| 字段/功能         | 描述                                                    |
|---------------|-------------------------------------------------------|
| 唯一标识          | a.唯一标识由小写字母、数字、- 组成，且长度小于 32 位。b.这是此连接的唯一标识，设置之后不能修改。 |
| 显示名称          | 这个名称会显示在终端用户的登录界面的按钮上。                                |
| Client Key    | 抖音移动应用的 Client Key，需要在 抖音开放平台 上获取。                    |
| Client Secret | 抖音移动应用的 Client Secret，需要在 抖音开放平台 上获取。                 |
| 登录模式          | 开启「仅登录模式」后，只能登录既有账号，不能创建新账号，请谨慎选择。                    |
| 账号身份关联 | 不开启「账号身份关联」时，用户通过身份源登录时默认创建新用户。开启「账号身份关联」后，可以允许用户通过「字段匹配」的方式直接登录到已有的账号。 |

配置完成后，点击「创建」或者「保存」按钮完成创建。

## 第三步：开发接入

- **推荐开发接入方式**：SDK

- **优劣势描述**：运维简单，由 {{$localeConfig.brandName}} 负责运维。每个用户池有一个独立的二级域名;如果需要嵌入到你的应用，需要使用弹窗模式登录，即：点击登录按钮后，会弹出一个窗口，内容是 {{$localeConfig.brandName}} 托管的登录页面，或者将浏览器重定向到 {{$localeConfig.brandName}} 托管的登录页。

- **详细接入方法**：
  

3.1 在 {{$localeConfig.brandName}} 控制台创建一个应用，详情查看：[如何在 {{$localeConfig.brandName}} 创建一个应用](/guides/app-new/create-app/create-app.md)

3.2 在已创建好的「抖音移动端」身份源连接详情页面，开启并关联一个在 {{$localeConfig.brandName}} 控制台创建的应用

<img src="./images/douyin_7.png" >

3.3 在登录页面体验 抖音 第三方登录（如 [终端用户预览图](#终端用户预览图) 所示）。
