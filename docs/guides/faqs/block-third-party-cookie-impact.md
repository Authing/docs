# 禁用第三方 Cookie 对 Authing 的影响

<LastUpdated/>

本文讲述浏览器阻止第三方 Cookie 时产生的影响，解释其原因以及给出**解决方案**。

## 产生影响的原因

从 13.1 版本开始，Safari 默认会**阻止第三方 Cookie**，会影响 Authing 的某些**单点登录功能**。其他类似的更新，从 Chrome 83 版本开始，**隐身模式**下默认禁用第三方 Cookie。其他浏览器也在慢慢进行此类更新以保护用户隐私。很多浏览器将禁用第三方 Cookie 作为了一个安全配置功能。

如果你使用 Authing 托管的登录页面的话不会受此类问题影响。自行托管登录页面以及**使用 trackSession 功能**的用户会受到影响。因为请求 Authing API 的时需要**跨域携带 Authing 相关的 Cookie**。

在浏览器发送需要携带 Cookie 的跨域请求时，浏览器会拦截 Cookie，因为用户访问的域名和 Authing 的域名不[同源](http://www.ruanyifeng.com/blog/2016/04/same-origin-policy.html)。

具体受到影响的功能是 [trackSession](/reference-new/other/sdk-for-sso.md#authingsso-prototype-tracksession)，Authing 自研的单点登录功能。

## 这些影响是什么时候发生的？

Safari 在 13.1 版本中首先引入这个功能，在 2020 年 3 月发布更新。Chrome 83 版本的隐身模式下默认启用这个功能。Firefox 会在不久的将来引入这个功能。Safari 将这个特性称为[防止智能跟踪](https://webkit.org/blog/7675/intelligent-tracking-prevention/)，Firefox 将这个特性称为[跟踪增强保护](https://blog.mozilla.org/firefox/tracking-protection-study/#:~:text=Enhanced%20Tracking%20Protection%20is%20part,blocking%20requests%20to%20tracking%20domains.)。

## 主要影响那些 Authing 功能？

### trackSession

[trackSession](/guides/basics/authenticate-first-user/use-hosted-login-page.md#使用-tracksession) 是 Authing 自研的单点登录功能。可以在任意网站通过请求 Authing 的 Session 端点拿到当前用户的会话 Session 信息和用户资料。

当用过 Ajax 跨域请求 Authing API 接口时，例如 `/cas/session`，会自动携带 Authing Cookie。浏览器会将这个 Cookie 阻止，因为请求地址与当前 URL 不[同源](http://www.ruanyifeng.com/blog/2016/04/same-origin-policy.html)。那么 Cookie 无法传到 Authing，Authing 便无法取出当前用户的会话信息，完成响应。最终的结果是 Authing 会返回尚未登录的响应。

## 如何解决？

除了使用 trackSession，你还有很多其他选择，例如自行**维护应用的登录态**，而不仅仅依赖于中央认证服务器，以及[使用 OIDC](/guides/federation/oidc.md) 完成单点登录。

如果希望使用 trackSession，你可以在浏览器的角度上，将应用的域名变成你的自定义域名。配置自定义域名请查看[文档](/guides/deployment/custom-domain.md)。这样一来，原来的三方 Cookie 就变成了一方 Cookie。请求 Authing 的 Ajax 请求域名将与应用域名[同源](http://www.ruanyifeng.com/blog/2016/04/same-origin-policy.html)，不会触发浏览器阻止三方 Cookie 的机制。

例如，你的 Authing 应用域名为 app1.authing.cn，你的应用服务器域名为 myapp.mysite.com。你需要使用 login.mysite.com 来代理 app1.authing.cn。这样就可以将 Authing 服务与你的应用服务放在同一个域下。

只要主域名相同即可，上例中子域名不同不会影响 Cookie 的[同源策略](http://www.ruanyifeng.com/blog/2016/04/same-origin-policy.html)。

当配置了自定义域名后，你需要修改 Authing 相关 SDK 的配置信息，将请求端点域名填写为你的自定义域名。如果你直接调用 Authing API，你也需要修改这些请求地址为你的自定义域名。
