# 基础登录示例

<LastUpdated/>

阅读此教程之前，确保已经完成了 [开发准备](/reference-new/mobile-and-client-applications/sdk-for-ios/develop)

## 在 xib 上放置超组件

放置一个 TextField，将其类型改为 AccountTextField

![](./images/login1.png)

再放置一个 TextField，将其类型改为 PasswordTextField

![](./images/login2.png)

再放置一个 Label 将其类型改为 ErrorLabel

![](./images/login3.png)

再放置一个 Button，将其类型改为 LoginButton

![](./images/login4.png)

## 运行

<img src="./images/login5.png" alt="drawing" width="300"/>
<img src="./images/login6.png" alt="drawing" width="300"/>

一个具有登录业务能力的界面就开发完了，输入有效的用户名密码，点击登录就可以完成认证。如果登录出现错误，服务器返回的错误信息也能直接显示在 ErrorLabel 上。

>Guard 超组件提供了一些默认的视觉效果，如输入框获取焦点时，会播放一个高亮边框的动画；输入框提示语跟随 Authing 控制台配置；密码输入框默认提供 “显示明文”按钮；点击登录按钮时，会播放加载动画等等。如果需要自定这些视觉效果，请参考每个组件的详细说明。

我们注意到界面是英文版本的，因为 iOS 默认只有英文版本的 Localization，并且模拟器默认也是英文版本的。Guard 支持中英文，我们只需要在项目配置里面添加中文即可：

![](./images/login7.png)

添加中文之后，Guard 语言会跟随系统。当我们把模拟器设置为中文后，效果如下：

<img src="./images/login8.png" alt="drawing" width="300"/>

接下来，我们需要设置回调以获取用户信息：

```swift
import Guard
if let loginButton: LoginButton = Util.findView(view, viewClass: LoginButton.self) {
    loginButton.setAuthCompletion { code, message, userInfo in
        if (code == 200) {
            if let un = userInfo?.getUserName() {
                print("\(un) logged in")
            }
        }
    }
}
```

此教程展示了如何在 5 分钟左右的时间构建一个简单的登录界面。接下来，我们再构建一个更为复杂的登录界面。

<br>
<span style="background-color: #396aff;a:link:color:#FFF;padding:8px;border-radius: 4px;"><a href="./advanced-login.html" style="color:#FFF;">复杂登录示例 →</a>
</span>