# 抖音登录

<LastUpdated/>

## 准备工作

在 [抖音开放平台](https://developer.open-douyin.com/) 及 [Authing Console 控制台](https://authing.cn/)进行配置，请参阅 [抖音接入准备](../../../guides/connections/social/douyin-mobile/README.md)、[抖音官方文档](https://developer.open-douyin.com/docs/resource/zh-CN/dop/develop/sdk/mobile-app/access/ios)。

<br>

## 集成抖音登录

### 第一步：添加 Douyin 依赖

1. 在 swift package 搜索栏输入：https://github.com/Authing/authing-binary 。

2. 选择 [Authing-binary](https://github.com/Authing/authing-binary)。
> [Authing-binary](https://github.com/Authing/authing-binary) 依赖于 [Guard-iOS SDK](https://github.com/Authing/guard-ios)。

3. 依赖规则选择 **Up to Next Major Version 1.0.0** 。

4. Add Package 后勾选 **Douyin** 。

> **Douyin** 依赖于 [Guard-iOS 1.4.3](https://github.com/Authing/guard-ios) 之后版本。

<br>

### 第二步：Info.plist 里面添加启动白名单

key: LSApplicationQueriesSchemes

value: douyinopensdk, douyinliteopensdk, douyinv1opensdk, snssdk1128

> 注意大小写

也可以通过 Source Code 方式打开 Info.plist，然后复制粘贴下面代码：

```xml
<key>LSApplicationQueriesSchemes</key>
<array>
    <string>douyinopensdk</string>
    <string>douyinliteopensdk</string>
    <string>douyinv1opensdk</string>
    <string>snssdk1128</string>
</array>
```
<br>


### 第三步：初始化抖音登录

```swift
import Guard
import Douyin

class AppDelegate: UIResponder, UIApplicationDelegate {
    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        Authing.start(<#AUTHING_APP_ID#>)
        Douyin.register(appId: <#your_douyin_appid#>,, application, didFinishLaunchingWithOptions: launchOptions)
    }

    func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey : Any] = [:]) -> Bool {
        return Douyin.application(app, open: url)
    }
}
 ```
<br>

### 第四步：发起抖音登录授权
#### 抖音授权登录

```swift
func login(viewController: UIViewController, _ scope: String = "user_info", completion: @escaping Authing.AuthCompletion) -> Void
```

**参数**

* *viewController* 承载视图的 UIViewController
* *scope* 以逗号分割，默认为 user_info 
  
**示例**

```swift
Douyin.login(viewController: <#ViewController#>) { code, message, userInfo in
    if (code == 200) {
        // 登录成功
        // userInfo
    }
}
```

<br>

如果开发者自己集成抖音登录，拿到 AuthorizationCode 后，可以调用以下 API 换取 Authing 用户信息：

#### 通过抖音授权码登录

```swift
func loginByDouyin(_ code: String, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**参数**

`code` 抖音授权码

**示例**

```swift
AuthClient().loginByDouyin(authCode) { code, message, userInfo in
    if (code == 200) {
        // userInfo：用户信息
    }
}
```