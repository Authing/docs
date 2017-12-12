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

### 微信OAuth特别说明

#### 不需要编写后端代码的OAuth调用方法

需要将微信开放平台中的回调地址改为```http://oauth.authing.cn/oauth/wechat/redirect```.
微信回调至此URL之后，会跳至开发者配置好的Redirect URL中。

#### 需要编写后端代码的OAuth调用方法

##### ```第一步```：下载后端SDK；
##### ```第二步```：在微信开放平台配置好自己的回调URL；
##### ```第三步```：在回调URL中调用后端SDK；

调用完此后端SDK后将自动回调至您在Authing平台上配置的Redirect URL中。
