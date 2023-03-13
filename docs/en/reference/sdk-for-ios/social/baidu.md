# Baidu login

<LastUpdated/>

## Preparation

Configure in [Baidu Developer Center](https://developer.baidu.com/) and [Authing Console Console](https://authing.cn/), please refer to [Baidu Access Preparation](.. /../../guides/connections/social/baidu-mobile/README.md), [Baidu iOS OAuth Access Guide](https://openauth.baidu.com/doc/ios.html).

<br>

## Integrated Baidu login

### Step 1: Add Baidu dependency

1. Enter: https://github.com/Authing/authing-binary in the swift package search bar.

2. Select [Authing-binary](https://github.com/Authing/authing-binary).
> [Authing-binary](https://github.com/Authing/authing-binary) depends on [Guard-iOS SDK](https://github.com/Authing/guard-ios).

3. Select **Up to Next Major Version 1.0.0** for the dependency rule.

4. Check **Baidu** after Add Package.

> **Baidu** depends on the version after [Guard-iOS 1.4.1](https://github.com/Authing/guard-ios).

<br>

### Step 2: Modify project configuration

Configure the bounce URL of the Baidu login component:
1. Select the Xcode project, click the plus sign in **Targets** -> **Info** -> **URL Types**.
2. **URL Schemes** fill in **BD** + **APP-ID** of Baidu Console, for example: BD30974974.

<br>

### Step 3: Initialize Baidu login
```swift
import Guard
import Baidu

func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
     Authing.start(<#AUTHING_APP_ID#>)
     // appKey: Baidu console appKey
     // appId: Baidu Console ID
     // scope: Baidu OAuth scope, for example: basic, super_msg, netdisk, pcs_doc, pcs_video
     // redirectURI: Baidu console authorization callback page
     Baidu.register(appKey: <#your_baidu_appkey#>, appId: <#your_baidu_appid#>, scope: <#your_baidu_scope#>, redirectURI: <#your_baidu_redirecturi#>)
}
  ```
<br>

### Step 4: Handle Baidu login callback

After Baidu returns to the application, if SceneDelegate is used, the following functions need to be overloaded in SceneDelegate.swift:

```swift
func scene(_ scene: UIScene, openURLContexts URLContexts: Set<UIOpenURLContext>) {
     if let url = URLContexts.first?.url{
         _ = Baidu.handleURL(url: url)
     }
}
```

If SceneDelegate is not used, it needs to be overloaded in AppDelegate:

```swift
func application(_ app: UIApplication, open url: URL, options: [UIApplication. OpenURLOptionsKey : Any] = [:]) -> Bool {
     return Baidu. handleURL(url: url)
}
```

<br>

### Step 5: Initiate Baidu login authorization
#### Baidu authorized login

```swift
func login(viewController: UIViewController, completion: @escaping Authing.AuthCompletion) -> Void
```

**parameter**

* *viewController* AuthViewController hosting the view
  
**example**

```swift
Baidu.login(viewController: <#ViewController#>) { code, message, userInfo in
     if (code == 200) {
         // login successful
         // userInfo
     }
}
```

<br>

If the developer integrates Baidu login by himself, after getting the AuthorizationCode, he can call the following API in exchange for Authing user information:

#### Login via Baidu authorization code

```swift
func loginByBaidu(_ code: String, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**parameter**

`authCode` Baidu authorization code

**example**

```swift
AuthClient().loginByBaidu(authCode) { code, message, userInfo in
     if (code == 200) {
         // userInfo: user information
     }
}
```