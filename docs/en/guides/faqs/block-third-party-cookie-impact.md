# The Impact of Disabling Third-party Cookies on Authing

This article describes the impact of the browser blocking third-party cookies, explains the reasons, and provides **solutions**.

## The cause

Starting from version 13.1, Safari will **block third-party cookies** bydefault, which will affect certain **single sign-on** featuresofAuthing. In other similar updates, starting with Chrome 83, third-party cookies are disabled by default in **incognito mode**. Other browsers are also slowly making such updates to protect user privacy. Many browsers will disable third-party cookies as a security configuration feature.

If you use the login page hosted by Authing, you will not be affected by such problems. Users who self-host the login page and **use the trackSession function** will be affected. Because when requesting the Authing API, it is necessary to **carry Authing-related cookies across domains**.

When the browser sends a cross-domain requests that need to carry cookie, browser will intercept the cookie, because the Authing domain name and user accessed domain name are not of the same origin.


## When will these effects happen?

Safari first introduced this feature in version 13.1, and an update will be released in March 2020.This feature is enabled by default in the incognito mode of Chrome 83.Firefox will introduce this feature in the near future.Safari refers to this feature as [Intelligent Tracking Prevention](https://webkit.org/blog/7675/intelligent-tracking-prevention/)，Firefox refers to this feature as Enhanced Tracking Protection.

## Which Authing functions are mainly affected?

### TrackSession

[trackSession](/en/reference/sdk-for-sso.md#tracksession) is a single sign-on function developed by Authing. The session information and user information of the current user can be obtained on any website by requesting the Session endpoint of Authing.

When Ajax cross-domain request Authing API interface is used, for example/cas/session, Authing Cookie will be automatically carried. Browser will stop this cookie, because the request does not have the same origin with the current URL. Then the cookie cannot be passed to Authing, and Authing cannot retrieve the current user&#39;s session information and complete the response. The end result is that Authing will return a response that hasn&#39;t logged in yet.

## How to solve it?

In addition to using trackSession, you have many other options, such as maintaining the login state of the application yourself instead of relying only on the central authentication server, and [using OIDC](/en/guides/federation/oidc.md) to complete single sign-on, or using [Single Sign-On (SSO)](/en/reference/sdk-for-sso-spa.md) to complete single sign-on.

If you want to use trackSession, you can change the application domain name into your custom domain name from the perspective of the browser.To configure a custom domain name, please check the [documentation](/en/guides/deployment/custom-domain.md). In this way, the original three-party cookie becomes a one-party cookie. Ajax request sent to Authing domain name and application domain are same-origin, will not trigger the browser&#39;s mechanism to block third-party cookies.

For example, your Authing application domain name is app1.Authing.cn, and your application server domain name is myapp.mysite.com. You need to use login.mysite.com to proxy app1.Authing.cn. In this way, the Authing service and your application service can be placed under the same domain.

As long as the main domain name is the same, different subdomains in the above example will not affect the [same-origin policy](http://www.ruanyifeng.com/blog/2016/04/same-origin-policy.html) of cookies.

After the custom domain name is configured, you need to modify the configuration information of the Authing related SDK, and fill in the request endpoint domain name as your custom domain name. If you call the Authing API directly, you also need to modify these request addresses to your custom domain name.
