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
