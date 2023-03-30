# Line 登录

<LastUpdated/>

## 准备工作

在 [Line 开发平台](https://developers.line.biz/console/) 及 [Authing Console 控制台](https://authing.cn/)进行配置，请参阅 [Line 接入准备](../../../guides/connections/social/line-mobile/README.md)及 [Line iOS 接入文档](https://developers.line.biz/en/docs/ios-sdk/swift/integrate-line-login/)。

<br>

## 集成 Line 登录

### 第一步：添加 Line 依赖

1. 在 swift package 搜索栏输入：https://github.com/Authing/authing-binary 。

2. 选择 [Authing-binary](https://github.com/Authing/authing-binary)。
> [Authing-binary](https://github.com/Authing/authing-binary) 依赖于 [Guard-iOS SDK](https://github.com/Authing/guard-ios)。

3. 依赖规则选择 **Up to Next Major Version 1.0.0** 。

4. Add Package 后勾选 **Line** 。

> **Weibo** 依赖于 [Guard-iOS 1.4.5](https://github.com/Authing/guard-ios) 之后版本。

<br>

### 第二步：设置 Associated Domains：

> 填入开发者的 Universal Link 对应的 host 。

![](./images/wechat/7.png)

<br>

### 第三步：初始化 Line 登录
```swift
import Guard
import Line

func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    Authing.start(<#AUTHING_APP_ID#>)
    // channelID: Line 开放平台 channelID
    // universalLink: Line 开放平台填写的 universalLink
    Line.register(channelID: <#your_line_channelId#>, universalLinkURL: <#your_line_universalLink#>)
}
 ```
<br>


### 第四步：处理 Line 登录回调

Line 返回应用后，如果使用了 SceneDelegate，则需要在 SceneDelegate.swift 里面重载下面的函数：

```swift
func scene(_ scene: UIScene, continue userActivity: NSUserActivity) {
    _ = Line.application(.shared, open: url)
}

func scene(_ scene: UIScene, openURLContexts URLContexts: Set<UIOpenURLContext>) {
    _ = Line.application(.shared, open: url)
}
```

如果未使用 SceneDelegate，则需要在 AppDelegate 里面重载：

```swift
func application(_ application: UIApplication, continue userActivity: NSUserActivity, restorationHandler: @escaping ([UIUserActivityRestoring]?) -> Void) -> Bool {
    return Line.application(application, open: url)
}

func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey : Any] = [:]) -> Bool {
    return Line.application(app, open: url)
}
```

<br>

### 第五步：发起 Line 登录授权
#### Line 授权登录

```swift
func login(viewController: UIViewController, permissions: [String] = ["openid","profile"], completion: @escaping Authing.AuthCompletion) -> Void
```

**示例**

```swift
Line.login(viewController: <#ViewController#>) { code, message, userInfo in
    if (code == 200) {
        // 登录成功
        // userInfo
    }
}
```

<br>

如果开发者自己集成 Line 登录，拿到 accessToken 后，可以调用以下 API 换取 Authing 用户信息：

#### 通过 Line 授权码登录

```swift
func loginByLine(_ accessToken: String, _ idToken: String? = nil, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**参数**

`accessToken` Line accessToken
`idToken` Line idToken

**示例**

```swift
AuthClient().loginByLine(<#accessToken#>, <#idToken#>) { code, message, userInfo in
    if (code == 200) {
        // userInfo：用户信息
    }
}
```