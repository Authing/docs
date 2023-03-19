# Gitee 登录

<LastUpdated/>

## 准备工作

在 [gitee.com](https://gitee.com/login) 及 [Authing Console 控制台](https://authing.cn/)进行配置，请参阅 [Gitee 接入准备](../../../guides/connections/social/gitee-mobile/README.md)。

<br>

## 集成 Gitee 登录

### 第一步：添加 Gitee 依赖

1. 在 swift package 搜索栏输入：https://github.com/Authing/authing-binary 。

2. 选择 [Authing-binary](https://github.com/Authing/authing-binary)。
> [Authing-binary](https://github.com/Authing/authing-binary) 依赖于 [Guard-iOS SDK](https://github.com/Authing/guard-ios)。

3. 依赖规则选择 **Up to Next Major Version 1.0.0** 。

4. Add Package 后勾选 **Gitee** 。

> **Gitee** 依赖于 [Guard-iOS 1.4.3](https://github.com/Authing/guard-ios) 之后版本。

<br>

### 第二步：初始化 Gitee 登录
```swift
import Guard
import Gitee

func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    Authing.start(<#AUTHING_APP_ID#>)
    // appId: Gitee ClientID
    // redirectURI: Gitee 授权回调页
    // scope: 默认为 userInfo
    Gitee.register(appId: <#your_gitee_appid#>, redirectURI: <#your_gitee_redirecturi#>, <#your_gitee_scope#>)
}
 ```
<br>

### 第三步：发起 Gitee 登录授权
#### Gitee 授权登录

```swift
func login(viewController: UIViewController, completion: @escaping Authing.AuthCompletion) -> Void
```

**参数**

* *viewController* 承载视图的 UIViewController
  
**示例**

```swift
Gitee.login(viewController: <#ViewController#>) { code, message, userInfo in
    if (code == 200) {
        // 登录成功
        // userInfo
    }
}
```

<br>

如果开发者自己集成 Gitee 登录，拿到 AuthorizationCode 后，可以调用以下 API 换取 Authing 用户信息：

#### 通过 Gitee 授权码登录

```swift
func loginByGitee(_ code: String, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**参数**

`code` Gitee 授权码

**示例**

```swift
AuthClient().loginByGitee(authCode) { code, message, userInfo in
    if (code == 200) {
        // userInfo：用户信息
    }
}
```