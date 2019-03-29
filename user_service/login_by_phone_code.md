# 使用手机验证码登录

----------

若使用 ```JavaScript``` 调用，需要使用 ```then().catch()``` 捕获结果和错误。

#### Authing.loginByPhoneCode(options)

- **参数:**

  - ```{Object} options```
    - phone
    - phoneCode，使用 [发送短信接口](/user_service/send_phone_code.md) 获取

- **使用方法:**

  - ``` javascript
	Authing.loginByPhoneCode({
		phone: phone,
		phoneCode: phoneCode
	});
  	```

- **返回数据:**

  - ``` javascript
	{
        "_id": "59e5ff4935eebf1913cfe8a1",
        "email": "用户邮箱",
        "emailVerified": false,
        "username": "用户名",
        "nickname": "",
        "phone": "用户手机号",
        "company": "",
        "photo": "https://usercontents.authing.cn/client/logo@2.png",
        "browser": "",
        "token": null,
        "tokenExpiredAt": null,
        "loginsCount": 0,
        "lastLogin": "Tue Oct 17 2017 21:02:01 GMT+0800 (CST)",
        "lastIP": null,
        "signedUp": "Tue Oct 17 2017 21:02:01 GMT+0800 (CST)",
        "blocked": false,
        "isDeleted": false,
     }
    ```