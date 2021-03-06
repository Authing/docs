# 认证方式

----------

Authing 基于 JWT Token 进行身份认证。

## JWT简介

Json web token (JWT), 是为了在网络应用环境间传递声明而执行的一种基于JSON的开放标准（(RFC 7519).该token被设计为紧凑且安全的，特别适用于分布式站点的单点登录（SSO）场景。JWT的声明一般被用来在身份提供者和服务提供者间传递被认证的用户身份信息，以便于从资源服务器获取资源，也可以增加一些额外的其它业务逻辑所必须的声明信息，该token也可直接被用于认证，也可被加密。

详细内容可以参考这篇文章：[什么是 JWT](https://www.jianshu.com/p/576dbf44b2ae)

## 认证流程

![auth_uml](https://usercontents.authing.cn/white_paper/authing_auth_uml.png)

- 用户使用用户名密码来请求服务器
- 服务器进行验证用户的信息
- 服务器通过验证发送给用户一个 Token
- 客户端存储 Token，并在每次请求时附送上这个token值
- 服务端验证 Token值，并返回数据

## 安全限制

为防止用户恶意注册，系统对 IP 进行了限制，条件如下：

- 单 IP ```5 分钟```内连续发起注册请求超过 ```3 次```会被禁止；
- 单 IP ```5 分钟```内连续发起登录请求超过 ```3 次```会要求输入验证码；

### TODO

- 单 IP ```5 分钟```内连续发起登录请求超过 ```10 次```被禁止；

## 注意事项

不能将此 Token 作为自身业务的验证 Token，因为 Token 的生成涉及到私钥，无法对外公布，建议生成一个新的 Token。Token的生成各个语言都有成熟的库可以使用，用户可到Github 上自行搜索。
