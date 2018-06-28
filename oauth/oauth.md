# 第三方登录配置及使用说明

----------

### 配置参数说明

![params][1]


Client ID       | Client Secret | Redirect
--------------- | -------------------- | -------------------------------
在OAuth平台上申请的APP ID或Client ID    |  OAuth平台提供的Client Secret    |  成功或失败后的回调URL

```!!IMPOTRANT!! 如果你想直接用网址访问（非SDK生成），需要增加state参数，state参数为您的Authing clientId，如Github：```

``` shell
https://github.com/login/oauth/authorize/?client_id=Github Client ID&state=Authing clientId
```

### 回调参数说明

注册成功或失败后都会回调Redirect中填写的网址，会附带三个参数：

code            | message              | data
--------------- | -------------------- | -------------------------------
错误或成功代码    |  成功或错误返回的消息    |  成功后返回的数据，操作失败不返回此参数

### Authing回调URL和对应OAuth开放平台中的回调URL的区别

 - Authing回调URL由Authing调用，会返回最终用户数据，一般是客户端URL，呈现给用户看；
 - 对应OAuth开放平台由对应OAuth平台调用，返回的是对应OAuth平台中的用户数据（仅在对应的第三方平台中配置了Authing的回调地址才这么做，否则还是回调至用户配置好的URL中）；

----------

### 回调URL特别说明

----------

#### 不需要编写后端代码的OAuth调用方法

##### Github

将Github OAuth设置中的回调地址改为```https://oauth.authing.cn/oauth/github/redirect```.
Github回调至此URL之后，Authing会跳至开发者配置好的Callback URL中。

##### 微信

将微信开放平台中的回调地址改为```https://oauth.authing.cn/oauth/wechat/redirect```.
微信回调至此URL之后，Authing会跳至开发者配置好的Callback URL中。

----------

#### 需要编写后端代码的OAuth调用方法

 - ```第一步```：在对应开放平台中配置好自己的回调URL；
 - ```第二步```：下载SDK：[Github][2]（目前仅支持JavaScript）；
 - ```第三步```：在开放平台中配置好的回调URL中调用后端SDK；

##### SDK OAuth验证使用说明

##### 以Github为例

``` javascript
let oauth = new OAuth({
	type: 'github', //OAuth类型，目前支持github和wechat，小写
	params: {
		state: '' //Github传给您在Github OAuth设置中配置好的URL中的state参数
		code: '' //Github传给您在Github OAuth设置中配置好的URL中的code参数
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

微信只需要把github换成wechat即可。

  [1]: https://usercontents.authing.cn/docs/oauth/oauth_config.png
  [2]: https://github.com/Authing/authing-js-oauth

