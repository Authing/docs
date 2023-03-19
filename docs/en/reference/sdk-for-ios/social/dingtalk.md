# DingTalk login

<LastUpdated/>

## Preparation

Configure on [DingTalk Open Platform](https://open-dev.dingtalk.com/) and [Authing Console Console](https://authing.cn/), please refer to [DingTalk iOS application authorization login access process] (https://open.dingtalk.com/document/orgapp /procedures-for-authorized-logon-to-ios-applications).

<br>

## Integrated DingTalk login

### Step 1: Add DingTalk dependency

1. Enter: https://github.com/Authing/authing-binary in the swift package search bar.

2. Select [Authing-binary](https://github.com/Authing/authing-binary).
> [Authing-binary](https://github.com/Authing/authing-binary) depends on [Guard-iOS SDK](https://github.com/Authing/guard-ios).

3. Select **Up to Next Major Version 1.0.0** for the dependency rule.

4. Check **DingTalk** after Add Package.

> **DingTalk** depends on the version after [Guard-iOS 1.4.3](https://github.com/Authing/guard-ios).

<br>

### Step 2: Add the WeChat whitelist in Info.plist

key: LSApplicationQueriesSchemes

value: dingtalk, dingtalk-open, dingtalk-sso

> Pay attention to capitalization

You can also open Info.plist via Source Code, and then copy and paste the following code:

```xml
<plist version="1.0">
<dict>
     ...
     <key>LSApplicationQueriesSchemes</key>
<array>
     <string>dingtalk</string>
<string>dingtalk-open</string>
<string>dingtalk-sso</string>
</array>
     ...
</dict>
</plist>
```

### Step 3: Modify project configuration

Configure the DingTalk login component bounce URL:
1. Select the Xcode project, click the plus sign in **Targets** -> **Info** -> **URL Types**.
2. **Identifier** fill in **dingtalk**.
3. **URL Schemes** **AppKey** of the DingTalk console.
<br>

### Step 4: Initialize DingTalk login
```swift
import Guard
import DingTalk

func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
     Authing.start(<#AUTHING_APP_ID#>)
     // appId: DingTalk console appId
     // bundleId: the application package name filled in the DingTalk console
     DingTalk.register(appId: <#your_dingtalk_appId#>, bundleId: <#your_bundleId#>)
}
  ```
<br>

### Step 5: Handle DingTalk login callback

After DingTalk returns to the application, if SceneDelegate is used, the following functions need to be overloaded in SceneDelegate.swift:

```swift
func scene(_ scene: UIScene, openURLContexts URLContexts: Set<UIOpenURLContext>) {
     if let url = URLContexts.first?.url{
         _ = DingTalk. handleURL(url: url)
     }
}
```

If SceneDelegate is not used, it needs to be overloaded in AppDelegate:

```swift
func application(_ app: UIApplication, open url: URL, options: [UIApplication. OpenURLOptionsKey : Any] = [:]) -> Bool {
     return DingTalk. handleURL(url: url)
}
```

<br>

### Step 6: Initiate DingTalk login authorization
#### DingTalk authorized login

```swift
func login(completion: @escaping Authing.AuthCompletion) -> Void
```

**example**

```swift
DingTalk.login() { code, message, userInfo in
     if (code == 200) {
         // login successful
         // userInfo
     }
}
```

<br>

If the developer integrates DingTalk login by himself, after getting the AuthorizationCode, he can call the following API in exchange for Authing user information:

#### Login via DingTalk authorization code

```swift
func loginByDingTalk(_ code: String, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**parameter**

`code` DingTalk authorization code

**example**

```swift
AuthClient().loginByDingTalk(authCode) { code, message, userInfo in
     if (code == 200) {
         // userInfo: user information
     }
}
```