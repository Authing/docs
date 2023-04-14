# 微博登录

<LastUpdated/>

## 准备工作

在 [微博开发平台](https://open.weibo.com/) 及 [Authing Console 控制台](https://authing.cn/)进行配置，请参阅 [微博接入准备](../../../guides/connections/social/weibo-mobile/README.md)。

<br>

## 集成微博登录

### 第一步：添加 Weibo 依赖

1. 在 swift package 搜索栏输入：https://github.com/Authing/authing-binary 。

2. 选择 [Authing-binary](https://github.com/Authing/authing-binary)。
> [Authing-binary](https://github.com/Authing/authing-binary) 依赖于 [Guard-iOS SDK](https://github.com/Authing/guard-ios)。

3. 依赖规则选择 **Up to Next Major Version 1.0.0** 。

4. Add Package 后勾选 **Weibo** 。

> **Weibo** 依赖于 [Guard-iOS 1.4.1](https://github.com/Authing/guard-ios) 之后版本。

<br>

### 第二步：修改项目配置

配置 Weibo 登录组件回跳 URL：
1. 选择 Xcode 工程，在 **Targets** -> **Info** -> **URL Types** 中点击加号。
2. **Identifier** 填写 com.weibo
3. **URL Schemes** 填写 **wb** + 微博控制台的 **APP-ID** ，例如：wb884123079。
<br>

### 第三步：Info.plist 里面添加启动微信白名单

key: LSApplicationQueriesSchemes

value: sinaweibo, weibosdk, weibosdk2.5, weibosdk3.3, sinaweibohd

> 注意大小写

![](./images/weibo/weibo1.png)

也可以通过 Source Code 方式打开 Info.plist，然后复制粘贴下面代码：

```xml
<plist version="1.0">
<dict>
    ...
    <key>LSApplicationQueriesSchemes</key>
	<array>
		<string>sinaweibo</string>
		<string>weibosdk</string>
        <string>weibosdk2.5</string>
		<string>weibosdk3.3</string>
		<string>sinaweibohd</string>
	</array>
    ...
</dict>
</plist>
```

<br>

### 第四步：设置 Associated Domains：

> 填入开发者的 Universal Link 对应的 host 。

![](./images/wechat/7.png)

<br>

### 第五步：初始化微博登录
```swift
import Guard
import Weibo

func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    Authing.start(<#AUTHING_APP_ID#>)
    // appId: 微博开放平台 appId
    // scope: 微博开放平台 scope，例如：all
    // redirectURI:  在微博开放平台填写的 redirectURI
    // universalLink: 在微博开放平台填写的 universalLink
    Weibo.register(appId: <#your_weibo_appid#>, scope: <#your_weibo_scope#, redirectURI: <#your_weibo_redirecturi#>, universalLink: <#your_weibo_universalLink#>)
}
 ```
<br>


### 第六步：处理微博登录回调

微博返回应用后，如果使用了 SceneDelegate，则需要在 SceneDelegate.swift 里面重载下面的函数：

```swift
func scene(_ scene: UIScene, continue userActivity: NSUserActivity) {
    _ = Weibo.handleUniversalLink(userActivity: userActivity)
}

func scene(_ scene: UIScene, openURLContexts URLContexts: Set<UIOpenURLContext>) {
    _ = Weibo.handleURL(url: url)
}
```

如果未使用 SceneDelegate，则需要在 AppDelegate 里面重载：

```swift
func application(_ application: UIApplication, continue userActivity: NSUserActivity, restorationHandler: @escaping ([UIUserActivityRestoring]?) -> Void) -> Bool {
    return  Weibo.handleUniversalLink(userActivity: userActivity)
}

func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey : Any] = [:]) -> Bool {
    return Weibo.handleURL(url: url)
}
```

<br>

### 第七步：发起微博登录授权
#### 微博授权登录

```swift
func login(completion: @escaping Authing.AuthCompletion) -> Void
```

**示例**

```swift
Weibo.login { code, message, userInfo in
    if (code == 200) {
        // 登录成功
        // userInfo
    }
}
```

<br>

如果开发者自己集成微博登录，拿到 accessToken 后，可以调用以下 API 换取 Authing 用户信息：

#### 通过微博授权码登录

```swift
func loginByWeibo(_ accessToken: String, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**参数**

`accessToken` 微博 accessToken

**示例**

```swift
AuthClient().loginByWeibo(accessToken) { code, message, userInfo in
    if (code == 200) {
        // userInfo：用户信息
    }
}
```