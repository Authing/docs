# Xiaomi login

<LastUpdated/>

## Preparation

Configure on [Xiaomi Open Platform](https://dev.mi.com/platform/) and [Authing Console](https://authing.cn/), please refer to [Xiaomi Official Document](https://github.com/xiaomi-passport/oauth-ios-sdk).

<br>

## Integrated Xiaomi login

### Step 1: Add Xiaomi dependency

1. Enter: https://github.com/Authing/authing-binary in the swift package search bar.

2. Select [Authing-binary](https://github.com/Authing/authing-binary).
> [Authing-binary](https://github.com/Authing/authing-binary) depends on [Guard-iOS SDK](https://github.com/Authing/guard-ios).

3. Select **Up to Next Major Version 1.0.0** for the dependency rule.

4. Check **Xiaomi** after Add Package.

> **Xiaomi** depends on [Guard-iOS 1.4.4](https://github.com/Authing/guard-ios) later versions.

<br>

### Step 2: Modify project configuration

Configure Xiaomi login component bounce URL:
1. Select the Xcode project, click the plus sign in **Targets** -> **Info** -> **URL Types**.
2. **Identifier** fill in **xiaomi**.
3. **URL Schemes** fill in the **AppId** of Xiaomi Open Platform.

<br>

### Step 3: Initialize millet login

```swift
import Guard
import Xiaomi

func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
     Authing.start(<#AUTHING_APP_ID#>)
     // appId: Xiaomi's AppId
     // redirectUrl: login callback address
     Xiaomi.register(appId: <#your_xiaomi_appId#>, redirectUrl: <#your_xiaomi_redirectUrl#>)
}
  ```
<br>


### Step 4: Handle Xiaomi login callback

After Xiaomi returns to the app, if SceneDelegate is used, the following functions need to be overloaded in SceneDelegate.swift:

```swift
func scene(_ scene: UIScene, openURLContexts URLContexts: Set<UIOpenURLContext>) {
     if let url = URLContexts.first?.url{
         _ = Xiaomi.handleOpenUrl(url: url)
     }
}
```

If SceneDelegate is not used, it needs to be overloaded in AppDelegate:

```swift
func application(_ app: UIApplication, open url: URL, options: [UIApplication. OpenURLOptionsKey : Any] = [:]) -> Bool {
     return Xiaomi.handleOpenUrl(url: url)
}
```

<br>

### Step 5: Initiate Xiaomi login authorization
#### Mi authorized login

```swift
func login(viewController: UIViewController, _ scopes: [String] = [], completion: @escaping Authing.AuthCompletion) -> Void
```

**parameter**

* *viewController* UIViewController hosting the view
* *scopes* are empty by default
  
**example**

```swift
Xiaomi.login(viewController: <#ViewController#>) { code, message, userInfo in
     if (code == 200) {
         // login successful
         // userInfo
     }
}
```

<br>

If the developer integrates Xiaomi login by himself, after getting the AuthorizationCode, he can call the following API in exchange for Authing user information:

#### Log in via Xiaomi authorization code

```swift
func loginByXiaomi(_ code: String, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**parameter**

`code` Xiaomi authorization code

**example**

```swift
AuthClient().loginByXiaomi(authCode) { code, message, userInfo in
     if (code == 200) {
         // userInfo: user information
     }
}
```