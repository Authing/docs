# 百度登录

<LastUpdated/>

## 准备工作

在 [百度开发者中心](https://developer.baidu.com/) 及 [Authing Console 控制台](https://authing.cn/)进行配置，请参阅 [百度接入准备](../../../guides/connections/social/baidu-mobile/README.md)、[百度 iOS OAuth 接入指南](https://openauth.baidu.com/doc/ios.html)。

<br>

## 集成百度登录

### 第一步：添加 Baidu 依赖

1. 在 swift package 搜索栏输入：https://github.com/Authing/authing-binary 。

2. 选择 [Authing-binary](https://github.com/Authing/authing-binary)。
> [Authing-binary](https://github.com/Authing/authing-binary) 依赖于 [Guard-iOS SDK](https://github.com/Authing/guard-ios)。

3. 依赖规则选择 **Up to Next Major Version 1.0.0** 。

4. Add Package 后勾选 **Baidu** 。

> **Baidu** 依赖于 [Guard-iOS 1.4.1](https://github.com/Authing/guard-ios) 之后版本。

<br>

### 第二步：修改项目配置

配置 Baidu 登录组件回跳 URL：
1. 选择 Xcode 工程，在 **Targets** -> **Info** -> **URL Types** 中点击加号。
2. **URL Schemes** 填写 **BD** + Baidu 控制台的 **APP-ID** ，例如：BD30974974。

<br>

### 第三步：初始化百度登录
```swift
import Guard
import Baidu

func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    Authing.start(<#AUTHING_APP_ID#>)
    // appKey: 百度控制台 appKey
    // appId: 百度控制台 ID
    // scope: 百度 OAuth scope，例如：basic,super_msg,netdisk,pcs_doc,pcs_video
    // redirectURI: 百度控制台授权回调页
    Baidu.register(appKey: <#your_baidu_appkey#>, appId: <#your_baidu_appid#>, scope: <#your_baidu_scope#>, redirectURI: <#your_baidu_redirecturi#>)
}
 ```
<br>

### 第四步：处理百度登录回调

百度返回应用后，如果使用了 SceneDelegate，则需要在 SceneDelegate.swift 里面重载下面的函数：

```swift
func scene(_ scene: UIScene, openURLContexts URLContexts: Set<UIOpenURLContext>) {
    if let url = URLContexts.first?.url{
        _ = Baidu.handleURL(url: url)
    }
}
```

如果未使用 SceneDelegate，则需要在 AppDelegate 里面重载：

```swift
func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey : Any] = [:]) -> Bool {
    return Baidu.handleURL(url: url)
}
```

<br>

### 第五步：发起百度登录授权
#### 百度授权登录

```swift
func login(viewController: UIViewController, completion: @escaping Authing.AuthCompletion) -> Void
```

**参数**

* *viewController* 承载视图的 AuthViewController
  
**示例**

```swift
Baidu.login(viewController: <#ViewController#>) { code, message, userInfo in
    if (code == 200) {
        // 登录成功
        // userInfo
    }
}
```

<br>

如果开发者自己集成百度登录，拿到 AuthorizationCode 后，可以调用以下 API 换取 Authing 用户信息：

#### 通过百度授权码登录

```swift
func loginByBaidu(_ code: String, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**参数**

`authCode` 百度授权码

**示例**

```swift
AuthClient().loginByBaidu(authCode) { code, message, userInfo in
    if (code == 200) {
        // userInfo：用户信息
    }
}
```