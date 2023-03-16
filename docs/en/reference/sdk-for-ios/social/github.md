# Github login

<LastUpdated/>

## Preparation

Configure in [Github Developer Settings](https://github.com/settings/developers) and [Authing Console Console](https://authing.cn/).

<br>

## Integrate Github login

### Step 1: Add Github dependency

1. Enter: https://github.com/Authing/authing-binary in the swift package search bar.

2. Select [Authing-binary](https://github.com/Authing/authing-binary).
> [Authing-binary](https://github.com/Authing/authing-binary) depends on [Guard-iOS SDK](https://github.com/Authing/guard-ios).

3. Select **Up to Next Major Version 1.0.0** for the dependency rule.

4. Check **Github** after Add Package.

> **Github** depends on [Guard-iOS 1.4.3](https://github.com/Authing/guard-ios) later versions.

<br>

### Step 2: Initialize Github login
```swift
import Guard
import Github

func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
     Authing.start(<#AUTHING_APP_ID#>)
     // appId: Github ClientID
     // redirectURI: Github authorization callback page
     // scope: empty by default
     Github.register(appId: <#your_github_appid#>, redirectURI: <#your_github_redirecturi#>, <#your_github_scope#>)
}
  ```
<br>

### Step 3: Initiate Github login authorization
#### Github authorization login

```swift
func login(viewController: UIViewController, completion: @escaping Authing.AuthCompletion) -> Void
```

**parameter**

* *viewController* UIViewController hosting the view
  
**example**

```swift
Github.login(viewController: <#ViewController#>) { code, message, userInfo in
     if (code == 200) {
         // login successful
         // userInfo
     }
}
```

<br>

If the developer integrates Github login by himself, after getting the AuthorizationCode, he can call the following API in exchange for Authing user information:

#### Login via Github authorization code

```swift
func loginByGithub(_ code: String, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**parameter**

`code` Github authorization code

**example**

```swift
AuthClient().loginByGithub(authCode) { code, message, userInfo in
     if (code == 200) {
         // userInfo: user information
     }
}
```