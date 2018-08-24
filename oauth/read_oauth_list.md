# 获取应用第三方OAuth列表

----------

#### Authing.readOAuthList()

- **使用方法:**

  - ``` javascript
    Authing.readOAuthList();
    ```
  - 如果enabled为null则代表未启用

- **返回数据:**

  - ``` javascript
    {
      "data": {
        "ReadOauthList": [{
          "_id": "xxxxxxxxxxxxxxxxxxxxxxxxx",
          "name": "Github",
          "image": "http://oxacbp94f.bkt.clouddn.com/oauth/logo/github.svg",
          "description": "Github OAuth",
          "enabled": true,
          "client": "xxxxxxxxxxxxxxxxxxxxxxxxx",
          "user": "xxxxxxxxxxxxxxxxxxxxxxxxx",
          "oAuthUrl": null,
          "alias": 'github'
        }, {
          "_id": "xxxxxxxxxxxxxxxxxxxxxxxxx",
          "name": "Wechat",
          "image": "http://oxacbp94f.bkt.clouddn.com/oauth/logo/wechat.png",
          "description": "Wechat OAuth",
          "enabled": null,
          "client": null,
          "user": null,
          "oAuthUrl": "",
          "alias": 'wechat'
        }]
      }
    }
    ```

#### 注意事项

若您开启了小程序扫码登录，那么在本接口中需要手动过滤 ``alias`` 为 ``wxapp`` 的 OAuth应用，因为小程序扫码登录无链接可打开。

``alias`` 为 ``wxapp`` 的应用即小程序扫码登录的应用。

