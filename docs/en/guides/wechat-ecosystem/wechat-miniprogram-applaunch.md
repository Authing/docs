# Mobile App Use a small program to log in

<LastUpdated/>

Moving App Pull A Small Program Login is a key way to establish a mobile phone number as a central user system. {{$localeConfig.brandName}} Through SDK, the developer greatly reduces the development of complexity, one line of code can obtain the mobile phone number authorized in the applet by the mobile terminal, establish an account system based on the mobile phone number.

- Application scenario: Mobile APP；
- Overview: Pull up the WeChat applet in your mobile application for login.
- View [WeChat official document](https://developers.weixin.qq.com/doc/oplatform/Mobile_App/WeChat_Login/Development_Guide.html)

<img src="./images/wechat-mobile-mini-program-login.png" height="400px" style="display:block;margin: 0 auto;"/>

## Step 1: Create a WeChat mobile app on the WeChat open platform

Please go to [WeChat open platform](https://open.weixin.qq.com/cgi-bin/frame?t=home/app_tmpl&lang=zh_CN)Guide creates a WeChat mobile app, and[WeChat open platform](https://open.weixin.qq.com/) **control center - Mobile Applications - Application details - Associate small program information** page, To initiate an associated small program operation by an auditing mobile application. Required applet- **Small login** `AppID` is `wxa0435021fd7a3af2`.

<img src="./images/miniprogram_on_openplatform.png" height="400px" style="display:block;margin: 0 auto;"/>

## Step 2: Create a WeChat applet in the WeChat open platform (optional)

By default, the app pulls a mini program login. {{$localeConfig.brandName}} default mini program is provided, if you need a stronger brand customization capability, or if you want to get the user WeChat account and your other WeChat public platform to log in through the applet, you need to apply for your own applet. If you belong to these two scenarios:

Please go to the [WeChat public platform](https://mp.weixin.qq.com/wxopen/waregister?action=step1&token=&lang=zh_CN) guide creates a WeChat applet, you need to record the **App ID** and **App Secret** of the app, will be used later.

At the same time, you need to contact us to get the source code of your login. For details, please consult [Authing Contact](csm@authing.cn).

## Step 3: Configure "App Pull up a Small Program Login" app in the {{$localeConfig.brandName}} console (optional)

In the console's social login configuration page, find the **app pull a mini program login**, fill in the following configuration:

- AppID: AppId of mini program, select the user fill the privatization applet;
- AppSecret: mini program AppSecret，Select the user who is privatatically applying a mini program.

## Step 4: Start development access

### Pull up WeChat mini program

Developers need to call WechatOpenSDK（Please see [WeChat official document](https://developers.weixin.qq.com/doc/oplatform/Mobile_App/Access_Guide/iOS.html):

- mini program userName is gh_a781a791e29e
- path is /routers/explore
- path query parameter is:
  - userPoolId: Your userpool ID
  - getPhone: you need to get the user's mobile phone number, 1 means need, not fill or other means
  - fromApp: 1, this parameter must be filled.
  - useSelfWxapp: 0. This parameter is required.

Take swift language as an example:

```swift
let userPoolId = "5e4cdd055df3df65dc58b97d"
let req = WXLaunchMiniProgramReq()
req.userName = "gh_a781a791e29e"
req.path = "/routes/explore?userPoolId=\(userPoolId)&getPhone=1&fromApp=1&useSelfWxapp=0"
req.miniProgramType = WXMiniProgramType.test
WXApi.send(req)
```

### Receive data returned by the applet

Small login will return a string URL Query String to the app, and the developer can convert it into a dictionary:

- code: The business status code, 200 is successful.
- message: Tip information.
- ticket: The authorization is successful. Developers can use this acquisition user information

```swift
func onResp(_ resp: BaseResp) {
    print("onResp: type=\(resp.type)")
    if resp.isKind(of: WXLaunchMiniProgramResp.self ) {
        if resp.errCode == 0 && resp.type == 0{//Authorized success
            let response = resp as! WXLaunchMiniProgramResp
            let extMsg = response.extMsg!
            //  WeChat login successful notice
            debugPrint(extMsg)
            let arr = extMsg.components(separatedBy:"&")
            var data = [String:Any]()
            for row in arr {
                let pairs = row.components(separatedBy:"=")
                data[pairs[0]] = pairs[1]
            }
            let code = data["code"]
            let message = data["message"]
            let ticket = data["ticket"]
            debugPrint(code, message, ticket)
        }
    }
}
```

### Get user information

User agrees that the developer can use Ticket to exchange user information, Ticket default valid time is two minutes. By default, for security reasons, Ticket exchanges user information requires a user pool key, which means that user information cannot be exchanged directly within the app. We also provide the right to developer choices, developers can modify this option in the user pool base configuration page (see above).

<ApiMethodSpec method="post" host="https://core.authing.cn" path="oauth/app2wxapp/auth/:userPoolId" summary="ticket exchange user information">
<template slot="headers">
<ApiMethodParam name="content-type" type="string" required description="application/json" />
</template>
<template slot="pathParams">
<ApiMethodParam name="userPoolId" type="string" required description="Userpool ID" />
</template>
<template slot="bodyParams">
<ApiMethodParam name="secret" type="string" description="Userpool key" />
<ApiMethodParam name="tickett" type="string" required description="ticket returns to App" />
</template>
<template slot="response">
<ApiMethodResponse description="_id is user ID。">

```js
{
  emailVerified: false,
  username: 'Liao Changjiang',
  nickname: 'Liao Changjiang',
  company: '',
  photo: 'https://usercontents.authing.cn/avatar-5e57540f84622ae263294a42-1582781455906',
  loginsCount: 2,
  registerMethod: 'oauth:app2wxapp',
  blocked: false,
  isDeleted: false,
  oauth: '{"nickName":"Liang Changjiang","gender":1,"language":"zh_CN","city":"Haidian","province":"Beijing","country":"China","avatarUrl":"https://wx.qlogo.cn/mmopen/vi_32/8INxh2bxDMiaU05jLqvWBszALu2u8Qw4iaxV58v4fERaDWV8yunE7icNiahJdxkOCNfGosqXcQ2SyScAcdyibv8uWWQ/132","phone":"17670416754","openid":"o1p9H4wAgb9uTqpxG5Z1g0pIr3FE","unionid":"o0pqE6Fbr5M-exSu_PeL_sjwN44U"}',
  metadata: '""',
  _id: "5e57540f84622ae263294a42",
  unionid: 'o0pqE6Fbr5M-exSu_PeL_sjwN44U',
  openid: 'o1p9H4wAgb9uTqpxG5Z1g0pIr3FE',
  lastIP: '::ffff:192.168.0.106',
  lastLogin: "2020-02-27T05:33:20.796Z",
  signedUp: "2020-02-27T05:30:55.875Z",
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVuaW9uaWQiOiJvMHBxRTZGYnI1TS1leFN1X1BlTF9zandONDRVIiwiaWQiOiI1ZTU3NTQwZjg0NjIyYWUyNjMyOTRhNDIiLCJjbGllbnRJZCI6IjVlNGNkZDA1NWRmM2RmNjVkYzU4Yjk3ZCJ9LCJpYXQiOjE1ODI3ODE2MDAsImV4cCI6MTU4NDA3NzYwMH0.pd7HJu5Ft8uytxIy4VgHdQiaAKuo96P_LcABFwM7OPI',
  tokenExpiredAt: "2020-03-13T05:33:20.000Z",
  phone: '188xxxx8888'
}
```

</ApiMethodResponse>
</template>
</ApiMethodSpec>

swift Code example:

```swift
import Alamofire

struct Body: Encodable {
    let ticket: String
}
let body = Body(ticket: ticket)
let url = "https://core.authing.cn/oauth/app2wxapp/auth/5e4cdd055df3df65dc58b97d?ticket=\(ticket)"
AF.request(
    url,
    method: .post,
    parameters: body,
    encoder: JSONParameterEncoder.default
).responseJSON { response in
    debugPrint("Response: \(response)")
}
```

## Next

!!!include(en/common/what-to-do-when-you-get-userinfo.md)!!!
