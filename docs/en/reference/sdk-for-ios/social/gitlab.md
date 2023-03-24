# GitLab login

<LastUpdated/>

## Preparation

Configure in [GitLab Developer Settings](https://gitlab.com/-/profile/applications) and [Authing Console](https://authing.cn/).

<br>

## Integrate GitLab Login

### Step 1: Add GitLab dependency

1. Enter: https://github.com/Authing/authing-binary in the swift package search bar.

2. Select [Authing-binary](https://github.com/Authing/authing-binary).
> [Authing-binary](https://github.com/Authing/authing-binary) depends on [Guard-iOS SDK](https://github.com/Authing/guard-ios).

3. Select **Up to Next Major Version 1.0.0** for the dependency rule.

4. Check **GitLab** after Add Package.

> **GitLab** depends on [Guard-iOS 1.4.3](https://github.com/Authing/guard-ios) later.

<br>

### Step 2: Initialize GitLab login
```swift
import Guard
import GitLab

func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
     Authing.start(<#AUTHING_APP_ID#>)
     // appId: GitLab ClientID
     // redirectURI: GitLab authorization callback page
     // scope: empty by default
     GitLab.register(appId: <#your_gitlab_appid#>, redirectURI: <#your_gitlab_redirecturi#>, <#your_gitlab_scope#>)
}
  ```
<br>

### Step 3: Initiate GitLab login authorization
#### GitLab Authorized Login

```swift
func login(viewController: UIViewController, completion: @escaping Authing.AuthCompletion) -> Void
```

**parameter**

* *viewController* UIViewController hosting the view
  
**example**

```swift
GitLab.login(viewController: <#ViewController#>) { code, message, userInfo in
     if (code == 200) {
         // login successful
         // userInfo
     }
}
```

<br>

If the developer integrates GitLab login by himself, after getting the AuthorizationCode, he can call the following API in exchange for Authing user information:

#### Login via GitLab authorization code

```swift
func loginByGitLab(_ code: String, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**parameter**

`code` GitLab authorization code

**example**

```swift
AuthClient().loginByGitLab(authCode) { code, message, userInfo in
     if (code == 200) {
         // userInfo: user information
     }
}
```