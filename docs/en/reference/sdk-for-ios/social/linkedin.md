# LinkedIn login

<LastUpdated/>

## Preparation

Configure in [Linkedin Developer Center](https://www.linkedin.com/developers/apps) and [Authing Console Console](https://authing.cn/).

<br>

## Integrated LinkedIn Login

### Step 1: Add Linkedin dependency

1. Enter: https://github.com/Authing/authing-binary in the swift package search bar.

2. Select [Authing-binary](https://github.com/Authing/authing-binary).
> [Authing-binary](https://github.com/Authing/authing-binary) depends on [Guard-iOS SDK](https://github.com/Authing/guard-ios).

3. Select **Up to Next Major Version 1.0.0** for the dependency rule.

4. Check **Linkedin** after Add Package.

> **Linkedin** depends on the version after [Guard-iOS 1.4.3](https://github.com/Authing/guard-ios).

<br>

### Step 2: Initialize LinkedIn Login
```swift
import Guard
import Linkedin

func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
     Authing.start(<#AUTHING_APP_ID#>)
     // clientId: LinkedIn console clientId
     // permissions: LinkedIn console OAuth 2.0 scopes, for example: r_liteprofile
     // redirectURI: LinkedIn console authorization callback page
     Linkedin.register(clientId: <#your_linkedin_clientId#>, permissions: <#your_linkedin_scopes#>, redirectURI: <#your_linkedin_redirecturi#>)
}
  ```
<br>

### Step 3: Initiate LinkedIn login authorization
#### LinkedIn Authorized Login

```swift
func login(viewController: UIViewController, completion: @escaping Authing.AuthCompletion) -> Void
```

**parameter**

* *viewController* AuthViewController hosting the view
  
**example**

```swift
Linkedin.login(viewController: <#ViewController#>) { code, message, userInfo in
     if (code == 200) {
         // login successful
         // userInfo
     }
}
```

<br>

If the developer integrates LinkedIn login by himself, after getting the AuthorizationCode, he can call the following API in exchange for Authing user information:

#### Login via LinkedIn Authorization Code

```swift
func loginByLinkedin(_ code: String, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**parameter**

`code` LinkedIn authorization code

**example**

```swift
AuthClient().loginByLinkedin(authCode) { code, message, userInfo in
     if (code == 200) {
         // userInfo: user information
     }
}
```