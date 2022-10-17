# 使用自建 App 扫码登录网站

<LastUpdated/>

随着移动互联网的普及，手机已经成为人们生活中的必需品，通过手机扫描二维码完成认证的方式变得越来越常见。越来越多的移动应用集成了扫描二维码登录 PC 端网站应用的功能，这对于用户来说是一种既方便又安全的体验。借助 {{$localeConfig.brandName}} 提供的扫描登录能力，可以帮助快速、安全地实现此功能。

要实现使用自建移动应用扫码登录网站应用，大致可以分为以下几步：

1. 在 Web 端生成二维码并开始轮询最新扫码状态；
2. 在移动 APP 中用户扫码，同意授权用户信息；
3. Web 端接收到扫码用户的用户信息，登录成功；

## Web 端生成二维码并轮询扫码状态

在 Web 端，我们推荐使用 {{$localeConfig.brandName}} 提供的 [JavaScript SDK](/reference/sdk-for-node/authentication/QrCodeAuthenticationClient.md)，其提供了一键生成二维码、轮询最新状态、获取用户信息之后进行回调的接口，开发者只需要指定 `onSuccess` 回调函数即可：

```js
import { AuthenticationClient } from "authing-js-sdk"
const authenticationClient = new AuthenticationClient({
   appId: "YOUR_APP_ID",
   appHost: 'https://xxx.authing.cn',
})

authenticationClient.qrcode.startScanning("qrcode", {
 onSuccess: (userInfo, ticket) => {
   console.log(userInfo, ticket)
 },
 onError: (message) => onFail && onFail(`${message}`),
});
```

运行后将自动生成用于 APP 扫码登录的二维码：

<img src="https://cdn.authing.cn/blog/image%20%28619%29.png" style="display:block;margin: 0 auto;" height="250">

扫码成功之后，{{$localeConfig.brandName}} 将会回调开发者传入的 `onSuccess` 函数，回调的参数中包含 `userInfo` 和 `ticket`，`ticket` 可以用来[换取用户信息](./full-api-list.md#使用-ticket-换取用户信息)。

如果你想自定义 UI 或者想要有更强的自定义化能力，可以查看[完整的 API 列表](./full-api-list.md) 或者[使用其他的 SDK 方法](/reference/sdk-for-node/authentication/QrCodeAuthenticationClient.md)。


## 移动 APP 扫码授权用户信息

Web 端生成的二维码中包含的原始信息为一串字符串，转换为 JSON 后如下：

```json
{
    "scene": "APP_AUTH",
    "random": "5e05f0c57fde537d950f7da5",
    "userPoolId": "5e04ae0d5f3cee22fb37612b",
    "createdAt": "2019-12-27T11:53:41.260Z",
    "expireAt": "2019-12-27T11:55:41.260Z",
    "customData": { "hello": "world" }
}
```

字段含义如下：

- scene：场景值，APP_AUTH 表示 APP 扫码登录。
- random：二维码 ID，移动端之后根据此 ID 完成确认扫码、同意授权、取消授权（注意，这里的“确认扫码”意思是移动端标记此二维码已经被扫描，但是用户还没有采取同意或取消操作。有关二维码的详细状态，请见完整接口列表页）
- userPoolId：用户池 ID。
- createdAt：二维码创建时间。
- expireAt：二维码过期时间。
- customData：用户自定义字段。了解如何添加自定义数据，请见完整接口列表页。

> 有关如何在 iOS 中扫描并解析二维码的内容，可以查看[这篇文章](https://github.com/darkjoin/Learning/wiki/使用AVFoundation读取二维码)。

要实现 APP 扫描登录 Web 端，首先要求 APP 端用户处于登录状态（这是理所当然的），调用相关接口的时候要带上终端用户的 token。移动端一共需要用到三个接口：

- 确认扫码
- 同意授权
- 取消授权

> 要了解这个三个接口的详情，请见完整接口列表页。

下面以 Objective-C 为例，实现同意授权登录：

- api 地址为：[http://core.authing.cn/api/v2/qrcode/confirm](http://core.authing.cn/api/v2/qrcode/confirm)
- 第 9 行在请求头带上了用户登录凭证。

```objectivec
- (void) ConfirmAuthorization:(NSString *) random{
    NSURL * api =[NSURL URLWithString:@"http://core.authing.cn/api/v2/qrcode/confirm"];
    NSDictionary *bodyDict = @{
        @"random": random,
    };
    NSData *body = [NSJSONSerialization dataWithJSONObject:bodyDict options:kNilOptions error:nil];
    NSMutableURLRequest *request = [[NSMutableURLRequest alloc] initWithURL:api];
    request.HTTPMethod = @"POST";
    [request setValue:self.ID_TOKEN forHTTPHeaderField:@"Authorization"];
    [request setValue:@"application/json" forHTTPHeaderField:@"Content-Type"];
    [request setValue:@"application/json" forHTTPHeaderField:@"Accept"];
    [request setHTTPBody:body];

    NSURLSessionConfiguration *config = [NSURLSessionConfiguration defaultSessionConfiguration];
    NSURLSession *session = [NSURLSession sessionWithConfiguration:config];
    NSURLSessionDataTask *dataTask = [session dataTaskWithRequest:request completionHandler:^(NSData *data, NSURLResponse *response, NSError *error) {
        NSHTTPURLResponse *httpResponse = (NSHTTPURLResponse *)response;
        if(httpResponse.statusCode == 200)
        {
            NSError *parseError = nil;
            NSDictionary *responseDictionary = [NSJSONSerialization JSONObjectWithData:data options:0 error:&parseError];
            NSLog(@"The response is - %@",responseDictionary);
            NSInteger code = [[responseDictionary objectForKey:@"code"] integerValue];
            if(code == 200)
            {
                NSLog(@"SUCCESS");
            }
            else
            {
                NSLog(@"FAILURE");
            }
        }
        else
        {
            NSLog(@"Network Error");
        }
    }];

    [dataTask resume];
}
```

移动端确认授权之后，Web 将会看到相关提示。

<img src="https://cdn.authing.cn/blog/image%20%28579%29.png" style="display:block;margin: 0 auto;" height="250">

这个时候，整个登录流程也就完成了，开发者可以使用 ticket 去换取用户信息了。

Android Nativie：

请先确保已经依赖并初始化 [Android Guard SDK](https://docs.authing.cn/v2/reference/sdk-for-android/)

```java
// 初始化 Android SDK
Authing.init(context, "AUTHING_APP_ID");

// 使用 ticket 去换取用户信息
AuthClient.loginByScannedTicket("ticket", (code, message, data) -> {
    if (code == 200) {
        // 登录成功，data：用户信息，包含 token 信息
    }
});
```

IOS Nativie：

请先确保已经依赖并初始化 [IOS Guard SDK](https://docs.authing.cn/v2/reference/sdk-for-ios/)

```swift
import Guard

// 初始化IOS SDK
Authing.start(<#AUTHING_APP_ID#>)

// 使用 ticket 去换取用户信息
AuthClient().loginByScannedTicket(ticket: "ticket") { code, message, data in
    if (code == 200) {
        // 登录成功，data：用户信息，包含 token 信息
    }
}
```

其它场景：

请先确保已依赖并初始化 [IOS Guard SDK](https://docs.authing.cn/v2/reference/sdk-for-ios/)

```javascript
const authenticationClient = new AuthenticationClient({
   appId: "YOUR_APP_ID",
   appHost: 'https://xxx.authing.cn',
})
const user = await authenticationClient.qrcode.exchangeUserInfo('TICKET')
```



## 接下来

!!!include(common/what-to-do-when-you-get-userinfo.md)!!!
