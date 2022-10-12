# 企业微信登录

<LastUpdated/>

## 准备工作

在企业微信管理后台及 Authing 管理控制台进行配置请参阅[企业微信移动端（代开发模式）](https://docs.authing.cn/v2/guides/connections/enterprise/wecom-agency-mobile/)

<br>

## 集成企业微信登录步骤

### 步骤 1：添加依赖

1. 在 swift package 搜索栏输入：https://github.com/Authing/authing-binary 。

2. 选择 [Authing-binary](https://github.com/Authing/authing-binary)。
> [Authing-binary](https://github.com/Authing/authing-binary) 依赖于 [Guard-iOS SDK](https://github.com/Authing/guard-ios)。

3. 依赖规则选择 **Up to Next Major Version 1.0.0** 。

4. Add Package 后勾选 **WeCom** 。

<br>

### 步骤 2：修改项目配置

- 配置跳转 Scheme: LSApplicationQueriesSchemes Key 下添加 wxwork 和 wxworklocal

- 配置企业微信回跳 URL：URL types Key 下 添加企业微信管理后台申请到的 **Schema** （例如：wwauth803c38cb89ac1d57000002）

![](./images/wecom/5.png)

<br>

### 步骤 3：初始化 WeCom

1. 在 AppDelegate 或 SceneDelegate 中加入 import Guard 和 import WeCom 。

2. WeCom.registerApp 需要传入企业微信发放的 **Scheme**、**AgentID**、**CorpID** 。

```swift
import Guard
import WeCom

Authing.start(<#AUTHING_APP_ID#>)
WeCom.registerApp(appId: <#Scheme#>, corpId: <#CorpID#>, agentId: <#AgentID#>)
 ```
 
<br>

### 步骤 4：添加回调

企业微信返回应用后，如果使用了 SceneDelegate，则需要在 SceneDelegate.swift 里面重载下面的函数：

```swift
func scene(_ scene: UIScene, openURLContexts URLContexts: Set<UIOpenURLContext>) {
    if let url = URLContexts.first?.url {
        _ = WeCom.handleOpenURL(url: url)
    }
}
 ```

如果未使用 SceneDelegate，则需要在 AppDelegate 里面重载

```swift
func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey : Any] = [:]) -> Bool {
    return WeCom.handleOpenURL(url: url)
}
 ```

<br>


### 步骤 5：发起企业微信授权

SDK 提供了三种授权方式：

1. 开发者在需要登录时调用 API：

```swift
WeCom.login { code, message, userInfo in
    if (code == 200) {
        // userInfo：用户信息
    }
}
```

2. 通过我们提供的语义化 Hyper Component，只需要在 xib 里面放置一个：

```swift
WeComLoginButton
```

设置 Module 为 WeCom，Build success 后点击按钮即可登录。

![](./images/wecom/9.png)

3. 如果想自己接入 Wecom 授权整个流程，拿到授权码后，可以调用下面 API 换取 Authing 用户信息：

```swift
func loginbyWeComAgency(_ code: String, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**参数**

* *authCode* Wecom 授权码

**示例**

```swift
AuthClient().loginbyWeComAgency(authCode) { code, message, userInfo in
    if (code == 200) {
        // userInfo：用户信息
    }
}
```
