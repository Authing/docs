# 第三方登录配置及使用说明

----------

[点击体验 OAuth 登录](http://sample.authing.cn)。

### 配置参数说明

![params][1]

Client ID       | Client Secret | Redirect
--------------- | -------------------- | -------------------------------
在OAuth平台上申请的 APP ID 或 Client ID    |  OAuth 平台提供的 Client Secret    |  成功或失败后的回调 URL

```!!IMPOTRANT!! 如果你想直接用网址访问（非 SDK 生成），需要增加 state 参数，state 参数为你的 Authing clientId，如 Github：```

``` shell
https://github.com/login/oauth/authorize/?client_id=<Github_Client_ID>&state=<Authing_ClientId>
```

### 回调参数说明

注册成功或失败后都会回调 Redirect 中填写的网址，会附带三个参数：

code            | message              | data
--------------- | -------------------- | -------------------------------
错误或成功代码    |  成功或错误返回的消息    |  成功后返回的数据，操作失败不返回此参数

### Authing回调URL和对应OAuth开放平台中的回调URL的区别

 - Authing 回调 URL 由 Authing 调用，会返回最终用户数据，一般是客户端 URL，呈现给用户看；
 - 对应 OAuth 开放平台由对应 OAuth 平台调用，返回的是对应 OAuth 平台中的用户数据（仅在对应的第三方平台中配置了 Authing 的回调地址才这么做，否则还是回调至用户配置好的 URL 中）；

----------

### 回调 URL 特别说明

----------

#### 不需要编写后端代码的 OAuth 调用方法（推荐使用）

##### Github

将 Github OAuth 设置中的回调地址改为```https://oauth.authing.cn/oauth/github/redirect```.
Github 回调至此 URL 之后，Authing 会跳至开发者配置好的 Callback URL 中。

##### 微信

将微信开放平台中的回调地址改为```https://oauth.authing.cn/oauth/wechat/redirect```.
微信回调至此 URL 之后，Authing 会跳至开发者配置好的 Callback URL 中。

----------

#### 需要编写后端代码的 OAuth 调用方法

 - ```第一步```：在对应开放平台中配置好自己的回调 URL；
 - ```第二步```：下载 SDK：[Github][2]（目前仅支持 JavaScript）；
 - ```第三步```：在开放平台中配置好的回调URL中调用后端 SDK；

##### SDK OAuth 验证使用说明

##### 以 Github 为例

``` javascript
let oauth = new OAuth({
	type: 'github', //OAuth 类型，目前支持 github 和 wechat，小写
	params: {
		state: '' //你在 Github OAuth 设置中配置好的 URL 中的 state 参数
		code: '' //你在 Github OAuth 设置中配置好的 URL 中的 code 参数
	}
});

oauth.auth()
.then(function(res) {
	//success
})
.catch(function(res) {
	//error
});
```

微信只需要把 github 换成 wechat 即可。

  [1]: https://usercontents.authing.cn/docs/oauth/oauth_config.png
  [2]: https://github.com/Authing/authing-js-oauth

