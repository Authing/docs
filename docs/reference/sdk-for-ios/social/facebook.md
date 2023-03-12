# Facebook 登录

<LastUpdated/>

## 准备工作

在 [Facebook 开放平台](https://developers.facebook.com/) 及 [Authing Console 控制台](https://authing.cn/)进行配置，请参阅 [FaceBook 接入准备](../../../guides/connections/social/facebook-mobile/README.md)、[FaceBook 官方文档](https://developers.facebook.com/docs/facebook-login/ios)。

<br>

## 集成 Facebook 登录

### 第一步：添加 Facebook 依赖

1. 在 swift package 搜索栏输入：https://github.com/Authing/authing-binary 。

2. 选择 [Authing-binary](https://github.com/Authing/authing-binary)。
> [Authing-binary](https://github.com/Authing/authing-binary) 依赖于 [Guard-iOS SDK](https://github.com/Authing/guard-ios)。

3. 依赖规则选择 **Up to Next Major Version 1.0.0** 。

4. Add Package 后勾选 **Facebook** 。

<br>

### 第二步：Info.plist 里面添加白名单

1. 右键点击 Info.plist，然后选择 Open As（打开方式）▸ Source Code（源代码）。
   
2. 将下列 XML 代码片段复制并粘贴到文件正文中。
   
**APP-ID** 对应 Facebook 开发者后台的应用编号。
**CLIENT-TOKEN** 可以在 Facebook 开发者后台应用面板设置 > 高级 > 客户端口令中找到此值。
**APP-NAME** 对应 Facebook 开发者后台的应用名称。

> 注意 **CFBundleURLSchemes** 的 **APP-ID** 之前需要拼接 **fb**。

```swift
<key>CFBundleURLTypes</key>
<array>
  <dict>
  <key>CFBundleURLSchemes</key>
  <array>
    <string>fbAPP-ID</string>
  </array>
  </dict>
</array>
<key>FacebookAppID</key>
<string>APP-ID</string>
<key>FacebookClientToken</key>
<string>CLIENT-TOKEN</string>
<key>FacebookDisplayName</key>
<string>APP-NAME</string>
```
<br>

### 第三步：初始化 Facebook 登录
```swift
import Guard
import Facebook

class AppDelegate: UIResponder, UIApplicationDelegate {
    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        Authing.start(<#AUTHING_APP_ID#>)
        Facebook.register(application, didFinishLaunchingWithOptions: launchOptions)
    }

    func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey : Any] = [:]) -> Bool {
        if "\(url)".contains(Facebook.getAppId()) {
            return Facebook.application(app, open: url, options: options)
        }
    }
}
 ```
<br>

### 第四步：发起 Facebook 登录授权
#### Facebook 授权登录

```swift
func login(viewController: UIViewController, completion: @escaping Authing.AuthCompletion) -> Void
```

**参数**

* *viewController* 承载视图的 AuthViewController
  
**示例**

```swift
Facebook.login(viewController: <#ViewController#>) { code, message, userInfo in
    if (code == 200) {
        // 登录成功
        // userInfo
    }
}
```

<br>

如果开发者自己集成 Facebook 登录，拿到 AccessToken 后，可以调用以下 API 换取 Authing 用户信息：

#### 通过 Facebook 授权码登录

```swift
func loginByFacebook(_ accessToken: String, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**参数**

* *accessToken* Facebook 授权成功后返回的 AccessToken

**示例**

```swift
AuthClient().loginByFacebook(accessToken) { code, message, userInfo in
    // userInfo
}
```