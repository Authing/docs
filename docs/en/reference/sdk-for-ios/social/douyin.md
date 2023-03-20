# Douyin login

<LastUpdated/>

## Preparation

Configure on [Douyin Open Platform](https://developer.open-douyin.com/) and [Authing Console](https://authing.cn/), please refer to [Douyin official document](https://developer.open-douyin.com/docs/resource/zh-CN/dop/develop/sdk/mobile-app/access/ios).

<br>

## Integrated Douyin login

### Step 1: Add Douyin dependency

1. Enter: https://github.com/Authing/authing-binary in the swift package search bar.

2. Select [Authing-binary](https://github.com/Authing/authing-binary).
> [Authing-binary](https://github.com/Authing/authing-binary) depends on [Guard-iOS SDK](https://github.com/Authing/guard-ios).

3. Select **Up to Next Major Version 1.0.0** for the dependency rule.

4. Check **Douyin** after Add Package.

> **Douyin** depends on the version after [Guard-iOS 1.4.3](https://github.com/Authing/guard-ios).

<br>

### Step 2: Add startup whitelist in Info.plist

key: LSApplicationQueriesSchemes

value: douyinopensdk, douyinliteopensdk, douyinv1opensdk, snssdk1128

> Pay attention to capitalization

You can also open Info.plist via Source Code, and then copy and paste the following code:

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


### Step 3: Initialize Douyin login

```swift
import Guard
import Douyin

class AppDelegate: UIResponder, UIApplicationDelegate {
     func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
         Authing.start(<#AUTHING_APP_ID#>)
         Douyin.register(appId: <#your_douyin_appid#>,, application, didFinishLaunchingWithOptions: launchOptions)
     }

     func application(_ app: UIApplication, open url: URL, options: [UIApplication. OpenURLOptionsKey : Any] = [:]) -> Bool {
         return Douyin. application(app, open: url)
     }
}
  ```
<br>

### Step 4: Initiate Douyin login authorization
#### Douyin authorized login

```swift
func login(viewController: UIViewController, _ scope: String = "user_info", completion: @escaping Authing.AuthCompletion) -> Void
```

**parameter**

* *viewController* UIViewController hosting the view
* *scope* separated by commas, the default is user_info
  
**example**

```swift
Douyin.login(viewController: <#ViewController#>) { code, message, userInfo in
     if (code == 200) {
         // login successful
         // userInfo
     }
}
```

<br>

If the developer integrates Douyin login by himself, after getting the AuthorizationCode, he can call the following API in exchange for Authing user information:

#### Login via Douyin authorization code

```swift
func loginByDouyin(_ code: String, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**parameter**

`code` Douyin authorization code

**example**

```swift
AuthClient().loginByDouyin(authCode) { code, message, userInfo in
     if (code == 200) {
         // userInfo: user information
     }
}
```