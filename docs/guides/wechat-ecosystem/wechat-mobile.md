# 移动 APP 使用微信登录

<LastUpdated/>

{{$localeConfig.brandName}}  为开发者提供了一种在移动端（iOS or 安卓）应用中快速跳转微信登录获取用户信息的方式，通过简单的调用 {{$localeConfig.brandName}}  移动端 SDK 可以完成微信账号接入。

- 应用场景：移动 APP；
- 概述：在移动应用中拉起微信 APP 进行登录；
- 查看[微信官方文档](https://developers.weixin.qq.com/doc/oplatform/Mobile_App/WeChat_Login/Development_Guide.html)

<img src="./images/wechat-mobile-login.png" height="400px" style="display:block;margin: 0 auto;"/>

## 第一步：在微信开放平台创建一个微信移动应用

请前往 [微信开放平台](https://open.weixin.qq.com/cgi-bin/frame?t=home/app_tmpl&lang=zh_CN)指引创建一个微信移动应用，你需要记录下该应用的 **App ID** 和 **App Secret**，后面需要用到。

## 第二步：在 {{$localeConfig.brandName}} 控制台配置微信移动应用

在控制台的社会化登录配置页面，找到 **微信移动端** 应用，填入以下配置：

- AppID: 微信移动应用 ID；
- AppSecret: 微信移动应用密钥。

配置完成后请点击「确定」保存信息。

## 第三步：开始开发接入

### 配置 iOS Universal Links

> 从微信 WechatOpenSDK 1.8.6 开始，iOS 移动应用需填写 Universal Links 信息。如果你是要开发 Android 应用或者已经配置好了，可跳过此节。[Apple 官方文档请见此](https://developer.apple.com/documentation/uikit/inter-process_communication/allowing_apps_and_websites_to_link_to_your_content/enabling_universal_links)。

#### 配置 apple-app-site-association 文件

在 Apple Developer 控制台 **Membership** 页面找到自己的 Team ID:

![](https://cdn.authing.cn/blog/image%20%28475%29.png)

在 Xcode **Targets** -&gt; **Signing & Capabilities** 中找到 Bundle Identifier:

![](https://cdn.authing.cn/blog/image%20%28395%29.png)

接下来创建 apple-app-site-association 文件：

假设你的 Team ID 为 xxxxxxx, Bundle Identifier 为 com.example.exampleApp, 设置 Universal Link 的 Path 为`/native/*`, 则 apple-app-site-association 如下：

假设你的 Team ID 为 xxxxxxx, Bundle Identifier 为 com.example.exampleApp, 设置 Universal Link 的 Path 为`/native/*`, 则 apple-app-site-association 如下：

```json
{
	"applinks": {
		"apps": [],
		"details": [
			{
				"appIDs": [ "xxxxxxx.com.example.exampleApp" ],
				"paths": [ "/native/*" ]
			}
		]
	}
}
```

你需要将此文件部署到你的域名的 .well-known/apple-app-site-association 链接下，如你的域名为 example.com，则需要通过 https://example.com/.well-known/apple-app-site-association 访问到该文件。以下几点需要注意：

- **必须使用 https**
- apple-app-site-association 需要是一个合法的 JSON 文件，但是**没有 .json 后缀**。
- content-type 需要设置为 application/json
- paths 请**使用 \* 通配符**，微信要求。

以下是一个 nginx 配置示例：（这里将 apple-app-site-association 文件放与某个 .well-known 文件夹下）

```nginx
server {
  listen 80;
  listen 443 ssl;

  server_name authing.cn;

  ssl_certificate /mnt/cerm/client/1_authing.cn_bundle.crt;
  ssl_certificate_key /mnt/cerm/client/2_authing.cn.key;
  ssl_session_timeout 5m;
  ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
  ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
  ssl_prefer_server_ciphers on;


  location /.well-known {
    alias /path/to/your/.well-known/folder;
    try_files $uri $uri/ =404;
  }
}
```

#### 在 Xcode 中配置 Associated Domains

加下来在 Xcode 中配置 Associated Domains。 在 Xcode **Targets** -&gt; **Signing & Capabilities** 页面点击 **+Capability** :

![](https://cdn.authing.cn/blog/image%20%28471%29.png)

选择 Associated Domains:

![](https://cdn.authing.cn/blog/image%20%28118%29.png)

假设你的域名是 example.com, 则填入 `applinks:example.com` :

![](https://cdn.authing.cn/blog/image%20%28111%29.png)

#### 验证 Universal Links 是否生效

假设你的域名为 example.com，Path 为 `/native/*`在手机上安装了你的 App 之后，使用 Safari 浏览器访问 `https://example.com/native/`，网上拉动网页，你应该能看到你的 App:

<img src="https://cdn.authing.cn/blog/image%20%28549%29.png" height="400px">

再访问 `https://example.com/native/xxx`，依旧可以看到。

#### 在微信开放平台填写 Universal Links

![](https://cdn.authing.cn/blog/image%20%28202%29.png)

### 接入 WechatOpenSDK

此部分请按照[微信官方文档](https://developers.weixin.qq.com/doc/oplatform/Mobile_App/Access_Guide/iOS.html)指引接入 WechatOpenSDK，如果遇到问题，这里提供一个 Swift Demo App 供开发者参考：[https://github.com/authing/AuthingIOSDemo](https://github.com/authing/AuthingIOSDemo) .

### 发起登录请求

成功接入 SDK 之后，你应该能成功打开微信获取用户授权并获取到 authorization code：

下面是发起微信登录请求代码示例（ Swift）:

```swift
func loginByWechat() {
    let req = SendAuthReq()
    req.scope = "snsapi_userinfo" //获取用户信息
    req.state = "123" //随机值即可，这里用时间戳
    WXApi.send(req)
}
```

你可以在 AppDelegate 或 SceneDelegate 的 onResp 方法获取到授权码 code, 如下图所示：

![](https://cdn.authing.cn/blog/image%20%28385%29.png)

### 接收微信回调数据获取 code

下面是一个示例代码（Swift 语言）：

```swift
func onResp(_ resp: BaseResp) {

    debugPrint(resp)

    // 微信登录请求信息
    if resp.isKind(of: SendAuthResp.self) {
        if resp.errCode == 0 && resp.type == 0{
            let response = resp as! SendAuthResp

            // 微信 authorication_code
            let code = response.code
            debugPrint("code: " ,code)
        }
    }
}
```

### 换取用户信息

用户同意收取获取到 `code` 之后，你可以调用 [Swift SDK](/reference/sdk-for-swift.md) 的 `loginByWeChatCode` 方法获取用户信息：

```swift
func loginByWeChatCode() {
    let code = "code"
    // Normal
    self.client?.loginByWeChatCode(code: code, completion: { status in
        print(status)
    })
}
```

## 接下来

!!!include(common/what-to-do-when-you-get-userinfo.md)!!!
