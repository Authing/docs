# 小米登录

<LastUpdated/>

## 准备工作

在 [小米开放平台](https://dev.mi.com/platform/) 及 [Authing Console 控制台](https://authing.cn/)进行配置，请参阅 [小米接入准备](../../../guides/connections/social/xiaomi-mobile/README.md)、[小米官方文档](https://github.com/xiaomi-passport/oauth-ios-sdk)。

<br>

## 集成小米登录

### 第一步：添加 Xiaomi 依赖

1. 在 swift package 搜索栏输入：https://github.com/Authing/authing-binary 。

2. 选择 [Authing-binary](https://github.com/Authing/authing-binary)。
> [Authing-binary](https://github.com/Authing/authing-binary) 依赖于 [Guard-iOS SDK](https://github.com/Authing/guard-ios)。

3. 依赖规则选择 **Up to Next Major Version 1.0.0** 。

4. Add Package 后勾选 **Xiaomi** 。

> **Xiaomi** 依赖于 [Guard-iOS 1.4.4](https://github.com/Authing/guard-ios) 之后版本。

<br>

### 第二步：修改项目配置

配置小米登录组件回跳 URL：
1. 选择 Xcode 工程，在 **Targets** -> **Info** -> **URL Types** 中点击加号。
2. **Identifier** 填写 **xiaomi**。
3. **URL Schemes** 填写小米开放平台的 **AppId**。

<br>

### 第三步：初始化小米登录

```swift
import Guard
import Xiaomi

func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    Authing.start(<#AUTHING_APP_ID#>)
    // appId: 小米的 AppId
    // redirectUrl: 登录回调地址
    Xiaomi.register(appId: <#your_xiaomi_appId#>, redirectUrl: <#your_xiaomi_redirectUrl#>)
}
 ```
<br>


### 第四步：处理小米登录回调

小米返回应用后，如果使用了 SceneDelegate，则需要在 SceneDelegate.swift 里面重载下面的函数：

```swift
func scene(_ scene: UIScene, openURLContexts URLContexts: Set<UIOpenURLContext>) {
    if let url = URLContexts.first?.url{
        _ = Xiaomi.handleOpenUrl(url: url)
    }
}
```

如果未使用 SceneDelegate，则需要在 AppDelegate 里面重载：

```swift
func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey : Any] = [:]) -> Bool {
    return Xiaomi.handleOpenUrl(url: url)
}
```

<br>

### 第五步：发起小米登录授权
#### 小米授权登录

```swift
func login(viewController: UIViewController, _ scopes: [String] = [], completion: @escaping Authing.AuthCompletion) -> Void
```

**参数**

* *viewController* 承载视图的 UIViewController
* *scopes* 默认为空
  
**示例**

```swift
Xiaomi.login(viewController: <#ViewController#>) { code, message, userInfo in
    if (code == 200) {
        // 登录成功
        // userInfo
    }
}
```

<br>

如果开发者自己集成小米登录，拿到 AuthorizationCode 后，可以调用以下 API 换取 Authing 用户信息：

#### 通过小米授权码登录

```swift
func loginByXiaomi(_ code: String, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**参数**

`code` 小米授权码

**示例**

```swift
AuthClient().loginByXiaomi(authCode) { code, message, userInfo in
    if (code == 200) {
        // userInfo：用户信息
    }
}
```