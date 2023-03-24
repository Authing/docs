# GitLab 登录

<LastUpdated/>

## 准备工作

在 [GitLab 开发者设置](https://gitlab.com/-/profile/applications) 及 [Authing Console 控制台](https://authing.cn/)进行配置，请参阅 [GitLab 接入准备](../../../guides/connections/social/gitlab-mobile/README.md)。

<br>

## 集成 GitLab 登录

### 第一步：添加 GitLab 依赖

1. 在 swift package 搜索栏输入：https://github.com/Authing/authing-binary 。

2. 选择 [Authing-binary](https://github.com/Authing/authing-binary)。
> [Authing-binary](https://github.com/Authing/authing-binary) 依赖于 [Guard-iOS SDK](https://github.com/Authing/guard-ios)。

3. 依赖规则选择 **Up to Next Major Version 1.0.0** 。

4. Add Package 后勾选 **GitLab** 。

> **GitLab** 依赖于 [Guard-iOS 1.4.3](https://github.com/Authing/guard-ios) 之后版本。

<br>

### 第二步：初始化 GitLab 登录
```swift
import Guard
import GitLab

func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    Authing.start(<#AUTHING_APP_ID#>)
    // appId: GitLab ClientID
    // redirectURI: GitLab 授权回调页
    // scope: 默认为空
    GitLab.register(appId: <#your_gitlab_appid#>, redirectURI: <#your_gitlab_redirecturi#>, <#your_gitlab_scope#>)
}
 ```
<br>

### 第三步：发起 GitLab 登录授权
#### GitLab 授权登录

```swift
func login(viewController: UIViewController, completion: @escaping Authing.AuthCompletion) -> Void
```

**参数**

* *viewController* 承载视图的 UIViewController
  
**示例**

```swift
GitLab.login(viewController: <#ViewController#>) { code, message, userInfo in
    if (code == 200) {
        // 登录成功
        // userInfo
    }
}
```

<br>

如果开发者自己集成 GitLab 登录，拿到 AuthorizationCode 后，可以调用以下 API 换取 Authing 用户信息：

#### 通过 GitLab 授权码登录

```swift
func loginByGitLab(_ code: String, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**参数**

`code` GitLab 授权码

**示例**

```swift
AuthClient().loginByGitLab(authCode) { code, message, userInfo in
    if (code == 200) {
        // userInfo：用户信息
    }
}
```