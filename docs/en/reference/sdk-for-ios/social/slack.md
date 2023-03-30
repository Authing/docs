# Slack login

<LastUpdated/>

## Preparation

Configure in [Slack API Documentation](https://api.slack.com/apps) and [Authing Console](https://authing.cn/), please refer to [Slack Access Preparation](.. /../../guides/connections/social/slack-mobile/README.md).

<br>

## Integrate Slack login

### Step 1: Add Slack dependency

1. Enter: https://github.com/Authing/authing-binary in the swift package search bar.

2. Select [Authing-binary](https://github.com/Authing/authing-binary).
> [Authing-binary](https://github.com/Authing/authing-binary) depends on [Guard-iOS SDK](https://github.com/Authing/guard-ios).

3. Select **Up to Next Major Version 1.0.0** for the dependency rule.

4. Check **Slack** after Add Package.

> **Slack** depends on [Guard-iOS 1.4.5](https://github.com/Authing/guard-ios) later.

<br>

### Step 2: Initialize Slack login
```swift
import Guard
import Slack

func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
     Authing.start(<#AUTHING_APP_ID#>)
     // appId: Slack ClientID
     // redirectURI: Slack authorization callback page
     // scope: empty by default
     Slack.register(appId: <#your_slack_appid#>, redirectURI: <#your_slack_redirecturi#>, scope: <#your_slack_scope#>)
}
  ```
<br>

### Step 3: Initiate Slack login authorization
#### Slack authorized login

```swift
func login(viewController: UIViewController, completion: @escaping Authing.AuthCompletion) -> Void
```

**parameter**

* *viewController* UIViewController hosting the view
  
**example**

```swift
Slack.login(viewController: <#ViewController#>) { code, message, userInfo in
     if (code == 200) {
         // login successful
         // userInfo
     }
}
```

<br>

If the developer integrates Slack login by himself, after getting the AuthorizationCode, he can call the following API in exchange for the Authing user information:

#### Login via Slack Authorization Code

```swift
func loginBySlack(_ code: String, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**parameter**

`code` Slack authorization code

**example**

```swift
AuthClient().loginBySlack(authCode) { code, message, userInfo in
     if (code == 200) {
         // userInfo: user information
     }
}
```