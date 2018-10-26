# 获取用户第三方 OAuth 列表

----------

若使用 ```JavaScript``` 调用，需要使用 ```then().catch()``` 捕获结果和错误。

#### Authing.readUserOAuthList(options)

- **参数:**

  - ```{Object} options```
    - uesr ```{String} 用户ID，可选，默认为当前登录用户的ID```
    - client ```{String} 应用ID，可选，默认为当前登录应用的ID```

- **使用方法:**

  - ``` javascript
    Authing.readUserOAuthList();
    ```
  - 如果 binded 为 true 则代表已经绑定
  - 若 binded 为 false , 若按[此方法](/oauth/oauth?id=不需要编写后端代码的-oauth-调用方法（推荐使用）)配置, 使用户访问oAuthUrl则可开始OAuth绑定流程

- **返回数据:**

  - ``` javascript
    [{
        "type":"github",
        "oAuthUrl":"https://github.com/login/oauth/authorize/?client_id=demo&state=demo",
        "image":"https://usercontents.authing.cn/oauth/logo/github.svg",
        "name":"Github登录",
        "binded":true
    },{
        "type":"wechat",
        "oAuthUrl":"https://open.weixin.qq.com/connect/qrconnect?appid=demo&redirect_uri=demo&response_type=code&scope=snsapi_login&state=demo",
        "image":"https://usercontents.authing.cn/oauth/logo/wechat.png",
        "name":"微信登录",
        "binded":false
    }]
    ```


#### 注意事项

暂不支持小程序绑定

