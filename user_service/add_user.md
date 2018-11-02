# 注册

----------

#### Authing.register(options)

- **参数:**

  - ```{Object} options```
    - email
    - password
    - unionid（若不使用 email 和 password 则必选）
    - oauth （可选，oauth 信息的字符串，或者其他自定义的用户字段都可以以 JSON 字符串的形式存在这里）
    - username（可选）
    - nickname（可选）
    - company（可选）
    - photo（可选）
    - lastIP（可选）

- **使用方法:**

  - ``` javascript
	Authing.register({
		email: email,
		password: password
	});
  /*
  注意：如果5分钟超过三次调用此方法会被禁止注册
  /*  
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
        "isDeleted": false,
        "group": {
          "_id": "59e374332023830871913ebd",
          "name": "default",
          "descriptions": "default",
          "createdAt": "Sun Oct 15 2017 22:44:03 GMT+0800 (CST)"
        }
      }
    ```

