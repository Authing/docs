# 使用社会化登录认证

<LastUpdated/>

社会化登录，是指用户使用社交平台的身份认证信息在第三方应用或网址进行认证登录的流程，比如大家经常使用个人微信、QQ、微博等社交账号登录滴滴、网易云音乐等。社会化登录不仅有助于简化用户在第三方平台的登录体验，同时也为用户在第三方平台创建新账号提供了一种更为简单便捷的方式。不论是对于普通用户来说，还是企业来说，社会化登录都有着无可比拟的优势。

## 社会化登录列表

{{$localeConfig.brandName}} 目前一共支持国内外将近 20 余种社会化登录，如微信、GitHub、Sign in with Apple、支付宝等，以下是完整的列表：

!!!include(common/social-connections-table.md)!!!

## 自定义社会化登录

{{$localeConfig.brandName}} 提供接入**自定义 OAuth2.0 身份提供商**的能力，如果你需要连接非 {{$localeConfig.brandName}} 内置的社会化登录身份源，可以<router-link to="/connections/custom-social-provider/" target="_blank">阅读此指引</router-link>。

## 微信解决方案

{{$localeConfig.brandName}} 针对微信生态有一套完整的解决方案，你可以查看[产品介绍](https://authing.cn/solutions/wechat)以及阅读[打通微信账号体系指引](/guides/wechat-ecosystem/)。

## 选择合适的开发接入方式

{{$localeConfig.brandName}} 社会化登录支持四种接入方式：**使用 JavaScript SDK**、**使用嵌入登录组件**、 **使用托管登录页** 和 **手动调用社会化登录接口**。每种不同的接入方式各有优劣点，你可以根据自己的业务需求来选择合适的方式。

### 优劣对比
以下是各种方式的优劣对比：

| 接入方式                                                                | 优势                                                                              | 劣势                                                | 是否推荐                                               |
| ----------------------------------------------------------------------- | --------------------------------------------------------------------------------- | --------------------------------------------------- | ------------------------------------------------------ |
| 使用 JavaScript SDK <img width=200 style="display:inline;float:right"/> | 接入简单，只需要几行代码。可自定义程度最高。                                      |                                                     | <img width=120 style="display:inline;float:right"/> 是 |
| 使用嵌入登录组件                                                        | 接入简单，只需要几行代码。可以将该组件集成到你的应用。自定义程度相对较高          |                                                     | 是                                                     |
| 使用托管登录页                                                          | 运维简单，由 {{$localeConfig.brandName}} 负责运维。每个用户池有一个独立的二级域名。 | 如果需要嵌入到你的应用，需要使用弹窗模式登录，即：点击登录按钮后，会弹出一个窗口，内容是 Authing 托管的登录页面，或者将浏览器重定向到 Authing 托管的登录页。                                | 是                                                     |
| 手动调用社会化登录接口                                                  |                                                                                   | 需要手动从 URL 解析用户信息。接入相对较为复杂麻烦。 | 不推荐                                                 |

### 详细接入方法
以下是每种方式详细的接入方法：

<StackSelector snippet="social-login" selectLabel="选择接入方式" :order="['sdk', 'embeded-component', 'hosted-page', 'manually']"/>
