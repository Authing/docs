# Call the WeChat Ecological Account System

<LastUpdated/>

When you start to develop an exciting application based on the WeChat ecosystem, you will need to consider how to make good use of the open capabilities of WeChat in multiple scenarios, and how to deal with complex [OpenID and UnionID](https://developers.weixin.qq.com/doc/offiaccount/en/User_Management/Get_users_basic_information_UnionID.html) mechanisms. The WeChat ecosystem is very huge, and there are several login scenarios (such as PC website scan code, official account webpage authorization, mini-program authorization, etc.), which need to call completely different interfaces, which undoubtedly increases the understanding for developers. and development costs.

{{$localeConfig.brandName}} provides developers with a concise and unified SDK in the front-end for the complex scenarios of the WeChat ecosystem, and automatically processes logic such as identity recognition and account merging in the back-end based on the three dimensions of OpenID, UnionID, and mobile phone number. Developers only need to call the front-end SDK without worrying about complex identification logic. {{$localeConfig.brandName}} will eventually return [standardized user information](/en/guides/user/user-profile.md).

## Follow WeChat Official Account Login

"Follow WeChat Official Account Login" refers to the process of generating a QR code of the WeChat official account on the PC website. The user scans the code with the WeChat APP and follows the official account to realize the process of automatic login. Using "Follow WeChat Official Account Login" can quickly attract traffic to the official account and enhance brand stickiness. With {{$localeConfig.brandName}}'s "Follow WeChat Official Account Login", you hardly need to develop any code, just simple configuration and it can be completed in a few minutes.[check the details](/en/guides/connections/social/wechatmp-qrcode/).

- Application scenario: PC website;
- Overview: The QR code of the WeChat official account is generated on the PC website, the user scans the code with the WeChat APP, and automatically logs in after following the official account;
- View [WeChat official document](https://developers.weixin.qq.com/doc/offiaccount/en/Account_Management/Generating_a_Parametric_QR_Code.html).

<img src="https://cdn.authing.cn/img/20220314121523.png" height="400px" style="display:block;margin: 0 auto;"/>

## PC Sign in with WeChat scan code

WeChat PC scan code login allows users to log in to third-party applications or websites using WeChat identity. In {{$localeConfig.brandName}} after the WeChat scan code is logged in, Adoption {{$localeConfig.brandName}} Quickly get the WeChat user basic open information and help users implement the base open function.[check the details](/en/guides/connections/social/wechat-pc/).

- Application scenario: PC website;
- Overview: Jump to the WeChat QR code page in the PC website application, then use the WeChat scan code to log in;
- View [WeChat official document](https://developers.weixin.qq.com/doc/oplatform/en/Website_App/WeChat_Login/Wechat_Login.html).

<img src="./images/wechat-pc-scan-login.png" height="400px" style="display:block;margin: 0 auto;"/>

## PC Website uses WeChat Mini Program QR code to log in

This is {{$localeConfig.brandName}} A pioneering design, {{$localeConfig.brandName}} Open the scan of small login QR code to get the official real-name user information of WeChat official,T he user can authorize the real number to complete the registration or login, and create an account system based on the mobile phone number.[check the details](/en/guides/connections/social/wechat-miniprogram-qrconnect/).

- Application Scene: PC website;
- Overview: Show the applet QR code in the PC website application, then use the WeChat scan code to log in;

<img src="./images/wechat-mini-login-scan.png" height="400px" style="display:block;margin: 0 auto;"/>

## WeChat internal web page uses WeChat Authorized Login

{{$localeConfig.brandName}} The developer provides the developer with a method of obtaining user information in the WeChat web page and completing the login. If the user accesses a third-party web page in the WeChat client, the public account can obtain the basic information of the user through the WeChat webpage authorization mechanism, and then implement business logic.[check the details](/en/guides/connections/social/wechat-mp/).

- Application Scene: WeChat web page, public number;
- Overview: The WeChat Authorization box is popped up within the webpage within the WeChat app. After the user authorizes the current user information;
- View [WeChat official document](https://developers.weixin.qq.com/doc/offiaccount/en/OA_Web_Apps/Wechat_webpage_authorization.html)

<img src="./images/wechat-web-authorize.png" height="400px" style="display:block;margin: 0 auto;"/>

## WeChat login in the mini program

{{$localeConfig.brandName}} The developer provides the developer with a method of obtaining user information in a mini program and completing the login. By {{$localeConfig.brandName}} The SDK can easily obtain the user identity identifier provided by WeChat, quickly establish an account system based on the mobile phone number.[check the details](/en/guides/connections/social/wechat-miniprogram/).

- Application scenario: mini program;
- Overview: Used in WeChat applets, pop-up WeChat Authorization boxes, and you can get information on the current user after authorization;
- View [WeChat official document](https://developers.weixin.qq.com/miniprogram/en/dev/framework/open-ability/login.html)

<img src="./images/wechat-mini-program-login.png" height="400px" style="display:block;margin: 0 auto;"/>

## Mobile App Use WeChat Login

{{$localeConfig.brandName}} Providing developers with a way to quickly jump WeChat login to obtain user information in the mobile terminal (iOS or Android) application, Simple call {{$localeConfig.brandName}} Mobile SDK can complete WeChat account access.[check the details](/en/guides/connections/social/wechat-mobile/).

- Application scenario: Mobile APP；
- Overview: Pull the WeChat APP in the mobile application to log in;
- View [WeChat official document](https://developers.weixin.qq.com/doc/oplatform/en/Mobile_App/WeChat_Login/Development_Guide.html)

<img src="./images/wechat-mobile-login.png" height="400px" style="display:block;margin: 0 auto;"/>

## Mobile App Use Mini Program Login

Launching the WeChat Mini Program on the mobile terminal is a key way to establish a mobile phone number-centric user system. {{$localeConfig.brandName}} greatly reduces the development complexity for developers through the SDK, and one line of code can obtain users through the mobile terminal in the applet. Authorized mobile phone number, establish an account system based on mobile phone number.[check the details](/en/guides/connections/social/wechat-miniprogram-applaunch/).

- Application scenario: Mobile APP；
- Overview: Launch the WeChat Mini Program in the mobile app to log in.
- View [WeChat official document](https://developers.weixin.qq.com/doc/oplatform/en/Mobile_App/WeChat_Login/Development_Guide.html)

<img src="./images/wechat-mobile-mini-program-login.png" height="400px" style="display:block;margin: 0 auto;"/>

## Summary comparison

| name                                                  | scenes to be used               | Ability to get the mobile phone number directly | Whether it is {{$localeConfig.brandName}} created |
| ----------------------------------------------------- | ------------------------------- | ----------------------------------------------- | ------------------------------------------------- |
| Follow WeChat Official Account Login                  | PC website                      | no                                              | no                                                |
| PC Sign in with WeChat scan code                      | PC website                      | no                                              | no                                                |
| PC Website uses WeChat Mini Program QR code to log in | PC website                      | yes                                             | yes                                               |
| WeChat internal web page uses WeChat Authorized Login | WeChat web page, public account | no                                              | no                                                |
| WeChat login in the mini program                      | Mini Program                    | yes                                             | no                                                |
| Mobile App Use WeChat Login                           | Mobile APP                      | no                                              | no                                                |
| Mobile App Use WeChat Mini Program to log in          | Mobile APP                      | yes                                             | yes                                               |
