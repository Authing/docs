# 领英登录

<LastUpdated/>

## 准备工作

在 [领英开发者中心](https://www.linkedin.com/developers/apps) 及 [Authing Console 控制台](https://authing.cn/)进行配置，请参阅 [领英接入准备](../../../guides/connections/social/linkedin-mobile/README.md)。

<br>

## 集成领英登录

### 第一步：添加 Linkedin 依赖

1. 在 swift package 搜索栏输入：https://github.com/Authing/authing-binary 。

2. 选择 [Authing-binary](https://github.com/Authing/authing-binary)。
> [Authing-binary](https://github.com/Authing/authing-binary) 依赖于 [Guard-iOS SDK](https://github.com/Authing/guard-ios)。

3. 依赖规则选择 **Up to Next Major Version 1.0.0** 。

4. Add Package 后勾选 **Linkedin** 。

> **Linkedin** 依赖于 [Guard-iOS 1.4.2](https://github.com/Authing/guard-ios) 之后版本。

<br>

### 第二步：初始化领英登录
```swift
import Guard
import Linkedin

func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    Authing.start(<#AUTHING_APP_ID#>)
    // clientId: 领英控制台 clientId
    // permissions: 领英控制台 OAuth 2.0 scopes，例如: r_liteprofile
    // redirectURI: 领英控制台授权回调页
    Linkedin.register(clientId: <#your_linkedin_clientId#>, permissions: <#your_linkedin_scopes#>, redirectURI: <#your_linkedin_redirecturi#>)
}
 ```
<br>

### 第三步：发起领英登录授权
#### 领英授权登录

```swift
func login(viewController: UIViewController, completion: @escaping Authing.AuthCompletion) -> Void
```

**参数**

* *viewController* 承载视图的 AuthViewController
  
**示例**

```swift
Linkedin.login(viewController: <#ViewController#>) { code, message, userInfo in
    if (code == 200) {
        // 登录成功
        // userInfo
    }
}
```

<br>

如果开发者自己集成领英登录，拿到 AuthorizationCode 后，可以调用以下 API 换取 Authing 用户信息：

#### 通过领英授权码登录

```swift
func loginByLinkedin(_ code: String, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**参数**

`code` 领英授权码

**示例**

```swift
AuthClient().loginByLinkedin(authCode) { code, message, userInfo in
    if (code == 200) {
        // userInfo：用户信息
    }
}
```