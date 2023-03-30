# Line Login

<LastUpdated/>

## Preparation

Configure in [Line Development Platform](https://developers.line.biz/console/) and [Authing Console](https://authing.cn/), please refer to [Line Access Preparation](. ./../../guides/connections/social/line-mobile/README.md) and [Line iOS access document](https://developers.line.biz/en/docs/ios-sdk/swift /integrate-line-login/).

<br>

## Integrated Line login

### Step 1: Add Weibo dependency

1. Enter: https://github.com/Authing/authing-binary in the swift package search bar.

2. Select [Authing-binary](https://github.com/Authing/authing-binary).
> [Authing-binary](https://github.com/Authing/authing-binary) depends on [Guard-iOS SDK](https://github.com/Authing/guard-ios).

3. Select **Up to Next Major Version 1.0.0** for the dependency rule.

4. Check **Line** after Add Package.

> **Weibo** depends on the version after [Guard-iOS 1.4.5](https://github.com/Authing/guard-ios).

<br>

### Step 2: Set up Associated Domains:

> Fill in the host corresponding to the developer's Universal Link.

![](./images/wechat/7.png)

<br>

### Step 3: Initialize Line login
```swift
import Guard
import Line

func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
     Authing.start(<#AUTHING_APP_ID#>)
     // channelID: Line open platform channelID
     // universalLink: UniversalLink filled in by the Line open platform
     Line.register(channelID: <#your_line_channelId#>, universalLinkURL: <#your_line_universalLink#>)
}
  ```
<br>


### Step 4: Handle the Line login callback

After Line returns to the application, if SceneDelegate is used, the following function needs to be overloaded in SceneDelegate.swift:

```swift
func scene(_ scene: UIScene, continue userActivity: NSUserActivity) {
     _ = Line. application(. shared, open: url)
}

func scene(_ scene: UIScene, openURLContexts URLContexts: Set<UIOpenURLContext>) {
     _ = Line. application(. shared, open: url)
}
```

If SceneDelegate is not used, it needs to be overloaded in AppDelegate:

```swift
func application(_ application: UIApplication, continue userActivity: NSUserActivity, restorationHandler: @escaping ([UIUserActivityRestoring]?) -> Void) -> Bool {
     return Line. application(application, open: url)
}

func application(_ app: UIApplication, open url: URL, options: [UIApplication. OpenURLOptionsKey : Any] = [:]) -> Bool {
     return Line. application(app, open: url)
}
```

<br>

### Step 5: Initiate Line login authorization
#### Line authorization login

```swift
func login(viewController: UIViewController, permissions: [String] = ["openid","profile"], completion: @escaping Authing.AuthCompletion) -> Void
```

**example**

```swift
Line.login(viewController: <#ViewController#>) { code, message, userInfo in
     if (code == 200) {
         // login successful
         // userInfo
     }
}
```

<br>

If the developer integrates Line login by himself, after getting the accessToken, he can call the following API in exchange for Authing user information:

#### Login via Line Authorization Code

```swift
func loginByLine(_ accessToken: String, _ idToken: String? = nil, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**parameter**

`accessToken` Line accessToken
`idToken` Line idToken

**example**

```swift
AuthClient().loginByLine(<#accessToken#>, <#idToken#>) { code, message, userInfo in
     if (code == 200) {
         // userInfo: user information
     }
}
```