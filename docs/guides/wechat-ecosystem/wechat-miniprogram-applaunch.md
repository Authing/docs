# 移动 APP 使用小程序登录

<LastUpdated/>

移动 APP 拉起小程序登录是建立移动端以手机号为中心用户体系的关键方式，{{$localeConfig.brandName}} 通过 SDK 为开发者大大降低了开发的复杂度，一行代码即可通过移动端获取用户在小程序中授权的手机号，建立以手机号码为基础的账号体系。

- 应用场景：移动 APP；
- 概述：在移动应用中拉起微信小程序进行登录。
- 查看[微信官方文档](https://developers.weixin.qq.com/doc/oplatform/Mobile_App/WeChat_Login/Development_Guide.html)

<img src="./images/wechat-mobile-mini-program-login.png" height="400px" style="display:block;margin: 0 auto;"/>

## 第一步：在微信开放平台创建一个微信移动应用

请前往 [微信开放平台](https://open.weixin.qq.com/cgi-bin/frame?t=home/app_tmpl&lang=zh_CN)指引创建一个微信移动应用，并在[微信开放平台](https://open.weixin.qq.com/) 的**管理中心-移动应用-应用详情-关联小程序信息**页面，为通过审核的移动应用发起关联小程序操作。需要关联的小程序 - **小登录**的 `AppID` 为 `wxa0435021fd7a3af2` 。

<img src="https://cdn.authing.cn/blog/image%20%28363%29.png" height="400px" style="display:block;margin: 0 auto;">

## 第二步：在微信开放平台创建一个微信小程序（可选）

默认情况下，APP 拉起小程序登录会使用 {{$localeConfig.brandName}} 提供的默认小程序，如果你需要有更强的品牌定制能力，或者想让通过小程序扫码登录的用户微信账号和自己的其他微信公众平台打通，你需要申请自己的小程序。如果你属于这两种场景的一种：

请前往 [微信公众平台](https://mp.weixin.qq.com/wxopen/waregister?action=step1&token=&lang=zh_CN)指引创建一个微信小程序，你需要记录下该应用的 **App ID** 和 **App Secret**，后面需要用到。

同时你需要联系我们获取小登录的源码，详情请咨询：176-0250-2507。

## 第三步：在 {{$localeConfig.brandName}} 控制台配置 「App 拉起小程序登录」应用（可选）

在控制台的社会化登录配置页面，找到**App 拉起小程序登录**，填入以下配置：

- AppID: 小程序的 AppID，选择私有化小程序的用户填；
- AppSecret: 小程序的 AppSecret，选择私有化小程序的用户填。

## 第四步：开始开发接入

### 拉起微信小程序

开发者需要调用 WechatOpenSDK（具体的接入流程请见[微信官方文档](https://developers.weixin.qq.com/doc/oplatform/Mobile_App/Access_Guide/iOS.html)）唤起小程序：

- 小程序 userName 为 gh_a781a791e29e
- path 为 /routers/explore
- path query 参数为：
  - userPoolId: 你的用户池 ID
  - getPhone: 是否需要获取用户手机号，1 表示需要，不填或者其他表示不需要
  - fromApp: 1，此参数必填。
  - useSelfWxapp: 0。此参数必填。

以 swift 语言为例：

```swift
let userPoolId = "5e4cdd055df3df65dc58b97d"
let req = WXLaunchMiniProgramReq()
req.userName = "gh_a781a791e29e"
req.path = "/routes/explore?userPoolId=\(userPoolId)&getPhone=1&fromApp=1&useSelfWxapp=0"
req.miniProgramType = WXMiniProgramType.test
WXApi.send(req)
```

### 接收小程序返回的数据

小登录会返回一串 URL Query String 给 App，开发者可以将其转换成一个字典：

- code: 业务状态码, 200 表示成功。
- message: 提示信息。
- ticket: 授权成功时带有。开发者可用此获取用户信息

```swift
func onResp(_ resp: BaseResp) {
    print("onResp: type=\(resp.type)")
    if resp.isKind(of: WXLaunchMiniProgramResp.self ) {
        if resp.errCode == 0 && resp.type == 0{//授权成功
            let response = resp as! WXLaunchMiniProgramResp
            let extMsg = response.extMsg!
            //  微信登录成功通知
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

### 获取用户信息

用户同意授权的情况下，开发者可以使用 ticket 换取用户信息，ticket 默认有效时间为两分钟。默认情况下，出于安全考虑，ticket 换取用户信息需要提供用户池密钥，这意味着不能直接在 App 内直接换取用户信息。我们同时也提供给开发者选择的权利，开发者可以在用户池基础配置页面修改此选项（见上文）。

<ApiMethodSpec method="post" host="https://core.authing.cn" path="oauth/app2wxapp/auth/:userPoolId" summary="ticket 换取用户信息">
<template slot="headers">
<ApiMethodParam name="content-type" type="string" required description="application/json" />
</template>
<template slot="pathParams">
<ApiMethodParam name="userPoolId" type="string" required description="用户池 ID" />
</template>
<template slot="bodyParams">
<ApiMethodParam name="secret" type="string" description="用户池密钥" />
<ApiMethodParam name="tickett" type="string" required description="小程序返回给 App 的 ticket" />
</template>
<template slot="response">
<ApiMethodResponse description="_id 为用户 ID。">

```js
{
  emailVerified: false,
  username: '廖长江',
  nickname: '廖长江',
  company: '',
  photo: 'https://usercontents.authing.cn/avatar-5e57540f84622ae263294a42-1582781455906',
  loginsCount: 2,
  registerMethod: 'oauth:app2wxapp',
  blocked: false,
  isDeleted: false,
  oauth: '{"nickName":"廖长江","gender":1,"language":"zh_CN","city":"Haidian","province":"Beijing","country":"China","avatarUrl":"https://wx.qlogo.cn/mmopen/vi_32/8INxh2bxDMiaU05jLqvWBszALu2u8Qw4iaxV58v4fERaDWV8yunE7icNiahJdxkOCNfGosqXcQ2SyScAcdyibv8uWWQ/132","phone":"17670416754","openid":"o1p9H4wAgb9uTqpxG5Z1g0pIr3FE","unionid":"o0pqE6Fbr5M-exSu_PeL_sjwN44U"}',
  metadata: '""',
  _id: "5e57540f84622ae263294a42",
  unionid: 'o0pqE6Fbr5M-exSu_PeL_sjwN44U',
  openid: 'o1p9H4wAgb9uTqpxG5Z1g0pIr3FE',
  lastIP: '::ffff:192.168.0.106',
  lastLogin: "2020-02-27T05:33:20.796Z",
  signedUp: "2020-02-27T05:30:55.875Z",
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVuaW9uaWQiOiJvMHBxRTZGYnI1TS1leFN1X1BlTF9zandONDRVIiwiaWQiOiI1ZTU3NTQwZjg0NjIyYWUyNjMyOTRhNDIiLCJjbGllbnRJZCI6IjVlNGNkZDA1NWRmM2RmNjVkYzU4Yjk3ZCJ9LCJpYXQiOjE1ODI3ODE2MDAsImV4cCI6MTU4NDA3NzYwMH0.pd7HJu5Ft8uytxIy4VgHdQiaAKuo96P_LcABFwM7OPI',
  tokenExpiredAt: "2020-03-13T05:33:20.000Z",
  phone: '176xxxx6754'
}
```

</ApiMethodResponse>
</template>
</ApiMethodSpec>

swift 代码示例：

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

## 接下来

!!!include(common/what-to-do-when-you-get-userinfo.md)!!!
