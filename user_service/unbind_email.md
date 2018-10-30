# 解绑邮箱

----------

若使用 ```JavaScript``` 调用，需要使用 ```then().catch()``` 捕获结果和错误。

#### Authing.unbindEmail(options)

- **参数:**

  - ```{Object} options```
    - uesr ```{String} 用户ID，可选，默认为当前登录用户的ID```
    - client ```{String} 应用ID，可选，默认为当前登录应用的ID```

- **使用方法:**

  - ``` javascript
	Authing.unbindEmail();
  	```

- **返回数据:**

  - ``` javascript

	{
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
        "isDeleted": false
     }

    ```

#### 注意事项

若未绑定其他登录方式, 则不可解绑邮箱
