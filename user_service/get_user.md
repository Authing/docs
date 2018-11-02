# 获取用户列表

----------

若使用 ```JavaScript``` 调用，需要使用 ```then().catch()``` 捕获结果和错误。

#### Authing.list(page, count)

- **参数:**

  - ```{Number} page```
    - Default: ```1```
  - ```{Number} count```
    - Default: ```10```

- **使用方法:**

  - ``` javascript
	Authing.list();
  	```

- **返回数据:**

  - ``` javascript
    {
      totalCount: 222,
      list: [{
                "_id": "59e5ff4935eebf1913cfe8a1",
                "email": "86700229ww6ss@163.com",
                "emailVerified": false,
                "username": "86700229ww6ss@163.com",
                "nickname": "",
                "company": "",
                "photo": "http://www.xiaohehe.net/uploads/allimg/150305/304-1503051H136.png",
                "browser": "",
                "token": null,
                "tokenExpiredAt": null,
                "loginsCount": 0,
                "lastLogin": "Tue Oct 17 2017 21:02:01 GMT+0800 (CST)",
                "lastIP": null,
                "signedUp": "Tue Oct 17 2017 21:02:01 GMT+0800 (CST)",
                "blocked": false,
                "isDeleted": false,
                "group": {
                  "_id": "59e374332023830871913ebd",
                  "name": "default",
                  "descriptions": "default",
                  "createdAt": "Sun Oct 15 2017 22:44:03 GMT+0800 (CST)"
                  }
             },
              ...
            ]
    }
    ```