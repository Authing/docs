# Gitee login

<LastUpdated/>

## Preparation

Configure in [gitee.com](https://gitee.com/login) and [Authing Console](https://authing.cn/).

<br>

## Integrate Gitee login

### Step 1: Add Gitee dependency

1. Enter: https://github.com/Authing/authing-binary in the swift package search bar.

2. Select [Authing-binary](https://github.com/Authing/authing-binary).
> [Authing-binary](https://github.com/Authing/authing-binary) depends on [Guard-iOS SDK](https://github.com/Authing/guard-ios).

3. Select **Up to Next Major Version 1.0.0** for the dependency rule.

4. Check **Gitee** after Add Package.

> **Gitee** depends on [Guard-iOS 1.4.3](https://github.com/Authing/guard-ios) later.

<br>

### Step 2: Initialize Gitee login
```swift
import Guard
import Gitee

func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
     Authing.start(<#AUTHING_APP_ID#>)
     // appId: Gitee ClientID
     // redirectURI: Gitee authorization callback page
     // scope: defaults to userInfo
     Gitee.register(appId: <#your_gitee_appid#>, redirectURI: <#your_gitee_redirecturi#>, <#your_gitee_scope#>)
}
  ```
<br>

### Step 3: Initiate Gitee login authorization
#### Gitee authorization login

```swift
func login(viewController: UIViewController, completion: @escaping Authing.AuthCompletion) -> Void
```

**parameter**

* *viewController* UIViewController hosting the view
  
**example**

```swift
Gitee.login(viewController: <#ViewController#>) { code, message, userInfo in
     if (code == 200) {
         // login successful
         // userInfo
     }
}
```

<br>

If the developer integrates Gitee login by himself, after getting the AuthorizationCode, he can call the following API in exchange for Authing user information:

#### Login via Gitee authorization code

```swift
func loginByGitee(_ code: String, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**parameter**

`code` Gitee authorization code

**example**

```swift
AuthClient().loginByGitee(authCode) { code, message, userInfo in
     if (code == 200) {
         // userInfo: user information
     }
}
```