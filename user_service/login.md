# 登录

----------

#### Authing.login(options)

- **参数:**

  - ```{Object} options```
    - email
    - password
    - verifyCode(可选)

- **使用方法:**

  - ``` javascript
	Authing.login({
		email: email,
		password: password
	});
  /*
    如果返回数据提示需要输入验证码，则登录参数应为
    {
      email: email,
      password: password,
      verifyCode: verifyCode
    }
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