# OAuth使用说明

----------

### 配置参数说明

![params][1]


Client ID       | Client Secret | Redirect
--------------- | -------------------- | -------------------------------
在OAuth平台上申请的APP ID或Client ID    |  OAuth平台提供的Client Secret    |  成功或失败后的回调URL

### 回调参数说明

注册成功或失败后都会回调Redirect中填写的网址，有三个参数：

code            | message              | data
--------------- | -------------------- | -------------------------------
错误或成功代码    |  成功或错误返回的消息    |  成功后返回的数据，操作失败不返回此参数

  [1]: http://oxacbp94f.bkt.clouddn.com/docs/oauth/params.jpg
  [2]: https://github.com/Authing/authing-js-oauth

----------

### 回调URL特别说明

----------

#### 不需要编写后端代码的OAuth调用方法

##### Github

将Github OAuth设置中的回调地址改为```http://oauth.authing.cn/oauth/github/redirect```.
将Github回调至此URL之后，Authing会跳至开发者配置好的Callback URL中。

##### 微信

将微信开放平台中的回调地址改为```http://oauth.authing.cn/oauth/wechat/redirect```.
微信回调至此URL之后，Authing会跳至开发者配置好的Callback URL中。

----------

#### 需要编写后端代码的OAuth调用方法

##### ```第一步```：在对应开放平台中配置好自己的回调URL；
##### ```第二步```：下载SDK：[Github][2]（目前仅支持JavaScript）；
##### ```第三步```：在开放平台中配置好的回调URL中调用后端SDK；

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

