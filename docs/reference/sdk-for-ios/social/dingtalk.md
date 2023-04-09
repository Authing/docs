# 钉钉登录

<LastUpdated/>

## 准备工作

在 [钉钉开放平台](https://open-dev.dingtalk.com/) 及 [Authing Console 控制台](https://authing.cn/)进行配置，请参阅 [钉钉接入准备](../../../guides/connections/enterprise/dingtalk-mobile/README.md)、[钉钉 iOS 应用授权登录接入流程](https://open.dingtalk.com/document/orgapp/procedures-for-authorized-logon-to-ios-applications)。

<br>

## 集成钉钉登录

### 第一步：添加 DingTalk 依赖

1. 在 swift package 搜索栏输入：https://github.com/Authing/authing-binary 。

2. 选择 [Authing-binary](https://github.com/Authing/authing-binary)。
> [Authing-binary](https://github.com/Authing/authing-binary) 依赖于 [Guard-iOS SDK](https://github.com/Authing/guard-ios)。

3. 依赖规则选择 **Up to Next Major Version 1.0.0** 。

4. Add Package 后勾选 **DingTalk** 。

> **DingTalk** 依赖于 [Guard-iOS 1.4.2](https://github.com/Authing/guard-ios) 之后版本。

<br>

### 第二步：Info.plist 里面添加启动微信白名单

key: LSApplicationQueriesSchemes

value: dingtalk, dingtalk-open, dingtalk-sso

> 注意大小写

也可以通过 Source Code 方式打开 Info.plist，然后复制粘贴下面代码：

```xml
<plist version="1.0">
<dict>
    ...
    <key>LSApplicationQueriesSchemes</key>
	<array>
    	<string>dingtalk</string>
		<string>dingtalk-open</string>
		<string>dingtalk-sso</string>
	</array>
    ...
</dict>
</plist>
```

### 第三步：修改项目配置

配置钉钉登录组件回跳 URL：
1. 选择 Xcode 工程，在 **Targets** -> **Info** -> **URL Types** 中点击加号。
2. **Identifier** 填写 **dingtalk**。
3. **URL Schemes** 钉钉控制台的 **AppKey**。
<br>

### 第四步：初始化钉钉登录
```swift
import Guard
import DingTalk

func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    Authing.start(<#AUTHING_APP_ID#>)
    // appId: 钉钉控制台 appId
    // bundleId: 钉钉控制台填写的应用包名
    DingTalk.register(appId: <#your_dingtalk_appId#>, bundleId: <#your_bundleId#>)
}
 ```
<br>

### 第五步：处理钉钉登录回调

钉钉返回应用后，如果使用了 SceneDelegate，则需要在 SceneDelegate.swift 里面重载下面的函数：

```swift
func scene(_ scene: UIScene, openURLContexts URLContexts: Set<UIOpenURLContext>) {
    if let url = URLContexts.first?.url{
        _ = DingTalk.handleURL(url: url)
    }
}
```

如果未使用 SceneDelegate，则需要在 AppDelegate 里面重载：

```swift
func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey : Any] = [:]) -> Bool {
    return DingTalk.handleURL(url: url)
}
```

<br>

### 第六步：发起钉钉登录授权
#### 钉钉授权登录

```swift
func login(completion: @escaping Authing.AuthCompletion) -> Void
```

**示例**

```swift
DingTalk.login() { code, message, userInfo in
    if (code == 200) {
        // 登录成功
        // userInfo
    }
}
```

<br>

如果开发者自己集成钉钉登录，拿到 AuthorizationCode 后，可以调用以下 API 换取 Authing 用户信息：

#### 通过钉钉授权码登录

```swift
func loginByDingTalk(_ code: String, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**参数**

`code` 钉钉授权码

**示例**

```swift
AuthClient().loginByDingTalk(authCode) { code, message, userInfo in
    if (code == 200) {
        // userInfo：用户信息
    }
}
```