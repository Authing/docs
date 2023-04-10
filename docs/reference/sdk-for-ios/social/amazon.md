# 亚马逊登录

<LastUpdated/>

## 准备工作

在 [亚马逊开放平台](https://developer.amazon.com/zh/apps-and-games/login-with-amazon) 及 [Authing Console 控制台](https://authing.cn/)进行配置，请参阅 [亚马逊官方文档](https://developer.amazon.com/zh/docs/login-with-amazon/ios-docs.html)。

<br>

## 集成亚马逊登录

### 第一步：添加 Amazon 依赖

1. 在 swift package 搜索栏输入：https://github.com/Authing/authing-binary 。

2. 选择 [Authing-binary](https://github.com/Authing/authing-binary)。
> [Authing-binary](https://github.com/Authing/authing-binary) 依赖于 [Guard-iOS SDK](https://github.com/Authing/guard-ios)。

3. 依赖规则选择 **Up to Next Major Version 1.0.0** 。

4. Add Package 后勾选 **Amazon** 。

> **Amazon** 依赖于 [Guard-iOS 1.4.5](https://github.com/Authing/guard-ios) 之后版本。

<br>

### 第二步：修改项目配置

配置亚马逊登录 APIKey：
1. 选择 Xcode 工程，在 **Targets** -> **Info** 点击加号。
2. 添加一个 String， key 为 **APIKey** value 为 亚马逊开放平台获取的 **APIKey**。

<br>


### 第四步：处理亚马逊登录回调

亚马逊返回应用后，如果使用了 SceneDelegate，则需要在 SceneDelegate.swift 里面重载下面的函数：

```swift
func scene(_ scene: UIScene, openURLContexts URLContexts: Set<UIOpenURLContext>) {
    if let url = URLContexts.first?.url{
        _ = Amazon.application(open: url)
    }
}
```

如果未使用 SceneDelegate，则需要在 AppDelegate 里面重载：

```swift
func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey : Any] = [:]) -> Bool {
    return Amazon.application(open: url, options: options)
}
```

<br>

### 第五步：发起亚马逊登录授权
#### 亚马逊授权登录

```swift
func login(_ scopes: [AMZNScope] = [AMZNProfileScope.profile(), AMZNProfileScope.postalCode(), AMZNProfileScope.userID()], completion: @escaping Authing.AuthCompletion) -> Void
```

**参数**

* *scopes* 默认为 profile, userid, postal_code
  
**示例**

```swift
Amazon.login { code, message, userInfo in
    if (code == 200) {
        // 登录成功
        // userInfo
    }
}
```

<br>

如果开发者自己集成亚马逊登录，拿到 AuthorizationCode 后，可以调用以下 API 换取 Authing 用户信息：

#### 通过亚马逊授权码登录

```swift
func loginByAmazon(_ code: String, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**参数**

`code` 亚马逊授权码

**示例**

```swift
AuthClient().loginByAmazon(authCode) { code, message, userInfo in
    if (code == 200) {
        // userInfo：用户信息
    }
}
```