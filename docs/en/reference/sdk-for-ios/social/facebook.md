# Facebook Login

<LastUpdated/>

## Preparation

Configure in [Facebook Open Platform](https://developers.facebook.com/) and [Authing Console](https://authing.cn/), please refer to [FaceBook Access Preparation](../ ../../guides/connections/social/facebook/README.md), [FaceBook Official Documentation](https://developers.facebook.com/docs/facebook-login/ios).

<br>

## Integrate Facebook Login

### Step 1: Add Facebook dependency

1. Enter: https://github.com/Authing/authing-binary in the swift package search bar.

2. Select [Authing-binary](https://github.com/Authing/authing-binary).
> [Authing-binary](https://github.com/Authing/authing-binary) depends on [Guard-iOS SDK](https://github.com/Authing/guard-ios).

3. Select **Up to Next Major Version 1.0.0** for the dependency rule.

4. Check **Facebook** after Add Package.

<br>

### Step 2: Add a whitelist in Info.plist

1. Right-click on Info.plist and select Open As ▸ Source Code.
   
2. Copy and paste the following XML code snippet into the body of the file.
   
**APP-ID** corresponds to the application ID of the Facebook developer background.
**CLIENT-TOKEN** This value can be found in the Facebook Developer Dashboard App Dashboard Settings > Advanced > Client Token.
**APP-NAME** corresponds to the application name of the Facebook developer backend.

> Note that **fb** needs to be concatenated before **APP-ID** of **CFBundleURLSchemes**.

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

### Step 3: Initialize Facebook Login
```swift
import Guard
import Facebook

class AppDelegate: UIResponder, UIApplicationDelegate {
     func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
         Authing.start(<#AUTHING_APP_ID#>)
         Facebook.register(application, didFinishLaunchingWithOptions: launchOptions)
     }

     func application(_ app: UIApplication, open url: URL, options: [UIApplication. OpenURLOptionsKey : Any] = [:]) -> Bool {
         if "\(url)". contains(Facebook. getAppId()) {
             return Facebook. application(app, open: url, options: options)
         }
     }
}
  ```
<br>

### Step 4: Initiate Facebook login authorization
#### Facebook Authorized Login

```swift
func login(viewController: UIViewController, completion: @escaping Authing.AuthCompletion) -> Void
```

**parameter**

* *viewController* AuthViewController hosting the view
  
**example**

```swift
Facebook.login(viewController: <#ViewController#>) { code, message, userInfo in
     if (code == 200) {
         // login successful
         // userInfo
     }
}
```

<br>

If the developer integrates Facebook login by himself, after getting AccessToken, he can call the following API in exchange for Authing user information:

#### Login via Facebook Authorization Code

```swift
func loginByFacebook(_ accessToken: String, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**parameter**

* *accessToken* AccessToken returned by Facebook after successful authorization

**example**

```swift
AuthClient().loginByFacebook(accessToken) { code, message, userInfo in
     // userInfo
}
```