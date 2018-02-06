# 获取应用第三方OAuth列表

----------

#### Authing.readOauthList()

- **使用方法:**

  - ``` javascript
    Authing.readOauthList();
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
          "client": "59f86b4832eb28071bdd9214",
          "user": "5a597f35085a2000144a10ed",
          "oAuthUrl": null
        }, {
          "_id": "xxxxxxxxxxxxxxxxxxxxxxxxx",
          "name": "Wechat",
          "image": "http://oxacbp94f.bkt.clouddn.com/oauth/logo/wechat.png",
          "description": "Wechat OAuth",
          "enabled": null,
          "client": null,
          "user": null,
          "oAuthUrl": ""
        }]
      }
    }
    ```

