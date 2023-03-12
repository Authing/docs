# QQ 登录

<LastUpdated/>

## 准备工作

在 [QQ 互联](https://developer.baidu.com/) 及 [Authing Console 控制台](https://authing.cn/)进行配置，请参阅 [QQ 接入准备](../../../guides/connections/social/qq-mobile/README.md)、[QQ 互联 iOS 应用](https://wiki.connect.qq.com/ios_sdk%e7%8e%af%e5%a2%83%e6%90%ad%e5%bb%ba)。

<br>

## 集成 QQ 登录

### 第一步：添加 Tencent 依赖

1. 在 swift package 搜索栏输入：https://github.com/Authing/authing-binary 。

2. 选择 [Authing-binary](https://github.com/Authing/authing-binary)。
> [Authing-binary](https://github.com/Authing/authing-binary) 依赖于 [Guard-iOS SDK](https://github.com/Authing/guard-ios)。

3. 依赖规则选择 **Up to Next Major Version 1.0.0** 。

4. Add Package 后勾选 **Tencent** 。

> **Tencent** 依赖于 [Guard-iOS 1.4.1](https://github.com/Authing/guard-ios) 之后版本。

<br>

### 第二步：修改项目配置

配置 QQ 登录组件回跳 URL：
1. 选择 Xcode 工程，在 **Targets** -> **Info** -> **URL Types** 中点击加号。
2. **Identifier** 填写 tencentopenapi
3. **URL Schemes** 填写 **tencent** + QQ 互联的 **APP-ID** ，例如：tencent102043018。
<br>

### 第三步：Info.plist 里面添加启动微信白名单

通过 Source Code 方式打开 Info.plist，然后复制粘贴下面代码：

```xml
<plist version="1.0">
<dict>
    ...
    <key>LSApplicationQueriesSchemes</key>
	<array>
        <string>tim</string>
		<string>mqq</string>
		<string>mqqapi</string>
		<string>mqqbrowser</string>
		<string>mttbrowser</string>
		<string>mqqOpensdkSSoLogin</string>
		<string>mqqopensdkapiV2</string>
		<string>mqqopensdkapiV4</string>
		<string>mqzone</string>
		<string>mqzoneopensdk</string>
		<string>mqzoneopensdkapi</string>
		<string>mqzoneopensdkapi19</string>
		<string>mqzoneopensdkapiV2</string>
		<string>mqqapiwallet</string>
		<string>mqqopensdkfriend</string>
		<string>mqqopensdkavatar</string>
		<string>mqqopensdkminiapp</string>
		<string>mqqopensdkdataline</string>
		<string>mqqgamebindinggroup</string>
		<string>mqqopensdkgrouptribeshare</string>
		<string>tencentapi.qq.reqContent</string>
		<string>tencentapi.qzone.reqContent</string>
		<string>mqqthirdappgroup</string>
		<string>mqqopensdklaunchminiapp</string>
		<string>mqqopensdkproxylogin</string>
		<string>mqqopensdknopasteboard</string>
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

### 第五步：初始化 QQ 登录
```swift
import Guard
import Tencent

func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    Authing.start(<#AUTHING_APP_ID#>)
    Tencent.register(appId: <#your_qq_appkey#>, universalLink: <#your_qq_universalLink#>)}
 ```

> universalLink 请按照 QQ 互联要求填写。

<br>


### 第六步：处理 QQ 登录回调

微博返回应用后，如果使用了 SceneDelegate，则需要在 SceneDelegate.swift 里面重载下面的函数：

```swift
func scene(_ scene: UIScene, continue userActivity: NSUserActivity) {
    if let url = userActivity.webpageURL {
        _ = Tencent.handleUniversalLink(url: url)
    }
}

func scene(_ scene: UIScene, openURLContexts URLContexts: Set<UIOpenURLContext>) {
    _ = Tencent.handleURL(url: url)
}
```

如果未使用 SceneDelegate，则需要在 AppDelegate 里面重载：

```swift
func application(_ application: UIApplication, continue userActivity: NSUserActivity, restorationHandler: @escaping ([UIUserActivityRestoring]?) -> Void) -> Bool {
    if let url = userActivity.webpageURL {
        return Tencent.handleUniversalLink(url: url)
    }
}

func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey : Any] = [:]) -> Bool {
    return Tencent.handleURL(url: url)
}
```

<br>

### 第七步：发起 QQ 登录授权
#### QQ 授权登录

```swift
func login(completion: @escaping Authing.AuthCompletion) -> Void
```

**示例**

```swift
Tencent.login { code, message, userInfo in
    if (code == 200) {
        // 登录成功
        // userInfo
    }
}
```

<br>

如果开发者自己集成 QQ 登录，拿到 accessToken 后，可以调用以下 API 换取 Authing 用户信息：

#### 通过 QQ 授权码登录

```swift
func loginByTencent(_ accessToken: String, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**参数**

`accessToken` QQ accessToken

**示例**

```swift
AuthClient().loginByTencent(accessToken) { code, message, userInfo in
    if (code == 200) {
        // userInfo：用户信息
    }
}
```