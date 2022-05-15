# Mobile app Use WeChat Login

<LastUpdated/>

{{$localeConfig.brandName}} Providing developers with a way to quickly jump WeChat login to obtain user information in the mobile terminal (iOS or Android) application, Simple call {{$localeConfig.brandName}} mobile SDK can complete WeChat account access.

- Application scenario: mobile APP；
- Overview: Pull up the WeChat APP in the mobile application to log in;
- View [WeChat official document](https://developers.weixin.qq.com/doc/oplatform/en/Mobile_App/WeChat_Login/Development_Guide.html)

<img src="./images/wechat-mobile-login.png" height="400px" style="display:block;margin: 0 auto;"/>

## Step 1: Create a WeChat mobile app on the WeChat open platform

Please go to [WeChat open platform](https://open.weixin.qq.com/cgi-bin/frame?t=home/app_tmpl&lang=zh_CN)Guide Create a WeChat mobile app, you need to record the **App ID** and **App secret** of the app, will be used later.

## Step 2: Configure WeChat mobile app on {{$localeConfig.brandName}} console

In the console's social login configuration page, find the **WeChat mobile** app, fill in the following configuration:

- AppID: WeChat mobile app ID；
- AppSecret: WeChat mobile application key.

Click "OK" to save information after the configuration is complete.

## Step 3: Start development access

### Configure iOS Universal Links

> Starting from WeChat WeChatopensdk 1.8.6, iOS mobile apps need to fill in Universal Links information. If you want to develop Android applications or have been configured, you can skip this section.

#### Configure apple-app-site-association file

In the Apple Developer Console **Membership** page finds your own Team ID:

![](https://cdn.authing.cn/blog/image%20%28475%29.png)

In Xcode **Targets** -&gt; **Signing & Capabilities** find Bundle Identifier:

![](https://cdn.authing.cn/blog/image%20%28395%29.png)

Next to create apple-app-site-association file：

if your Team ID is xxxxxxx, Bundle Identifier is com.example.exampleApp, set Universal Link Path is `/native/*`, apple-app-site-association such as:

if your Team ID is xxxxxxx, Bundle Identifier is com.example.exampleApp, set Universal Link Path is `/native/*`, apple-app-site-association such as:

```json
{
  "applinks": {
    "apps": [],
    "details": [
      {
        "appIDs": ["xxxxxxx.com.example.exampleApp"],
        "paths": ["/native/*"]
      }
    ]
  }
}
```

You need to deploy this file to your domain name .well-known/apple-app-site-association link, such as your domain name example.com，It is necessary to pass https://example.com/.well-known/apple-app-site-association Access to this file. The following points need to pay attention:

- **must use https**
- apple-app-site-association need to be a legitimate JSON file, but **no .json**。
- content-type need to be set to application/json
- paths please **use \* wildcard**, WeChat requirements.

The following is an nginx configuration example: (here you put the apple-app-site-association file with a .well-known folder)

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

#### In Xcode configure Associated Domains

Add down to configure Associated Domains in Xcode. In Xcode **Targets** -&gt; **Signing & Capabilities** Page click on the upper right corner **+Capability** :

![](https://cdn.authing.cn/blog/image%20%28471%29.png)

select Associated Domains:

![](https://cdn.authing.cn/blog/image%20%28118%29.png)

Suppose your domain name is example.com, fill in `applinks:example.com` :

![](https://cdn.authing.cn/blog/image%20%28111%29.png)

#### Verify Universal Links takes effect

Suppose your domain name example.com，Path is `/native/*` After installing your app on your phone, use Safari browser Access `https://example.com/native/`, Pull the webpage online, you should be able to see your app:

<img src="https://cdn.authing.cn/blog/image%20%28549%29.png" height="400px">

Visit again `https://example.com/native/xxx`, It can still be seen.

#### Fill in the WeChat open platform Universal Links

![](https://cdn.authing.cn/blog/image%20%28202%29.png)

### Access WechatOpenSDK

Please follow [WeChat official document](https://developers.weixin.qq.com/doc/oplatform/Mobile_App/Access_Guide/iOS.html)Guide access WechatOpenSDK, if you encounter problems, here is available here for the developer reference:[https://github.com/authing/AuthingIOSDemo](https://github.com/authing/AuthingIOSDemo) .

### Running login request

After successful access SDK, you should be able to successfully open WeChat to get user authorization and get an authorization code:

Below is the initiating WeChat login request code example (Swift):

```swift
func loginByWechat() {
    let req = SendAuthReq()
    req.scope = "snsapi_userinfo" //Get user information
    req.state = "123" //The random value can be used here,
    WXApi.send(req)
}
```

You can get the authorization code Code on AppDelegate or SceneDelegate, as shown below:

![](https://cdn.authing.cn/blog/image%20%28385%29.png)

### Receive WeChat callback data acquisition code

Here is an example code (Swift language):

```swift
func onResp(_ resp: BaseResp) {

    debugPrint(resp)

    // WeChat login request information
    if resp.isKind(of: SendAuthResp.self) {
        if resp.errCode == 0 && resp.type == 0{
            let response = resp as! SendAuthResp

            // WeChat authorication_code
            let code = response.code
            debugPrint("code: " ,code)
        }
    }
}
```

### Exchange user information

The user agreed to get the `code`, you can call [Swift SDK](/reference/sdk-for-swift.md) `loginByWeChatCode` to get the user information:

```swift
func loginByWeChatCode() {
    let code = "code"
    // Normal
    self.client?.loginByWeChatCode(code: code, completion: { status in
        print(status)
    })
}
```

## Next

!!!include(en/common/what-to-do-when-you-get-userinfo.md)!!!
