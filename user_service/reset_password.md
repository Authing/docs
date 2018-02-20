# 重置密码

----------

#### 1.发送验证码 Authing.sendResetPasswordEmail(options)

- **参数:**

  - ```{Object} options```
    - email

- **使用方法:**

  - ``` javascript
	Authing.sendResetPasswordEmail({
		email: email
	});
  	```

- **返回数据:**

  - ``` javascript
	  {
      "message":"成功",
      "code":null,
      "__typename":
      "CommonMessage"
    }
    ```

#### 2.验证验证码 Authing.verifyResetPasswordVerifyCode(options)

- **参数:**

  - ```{Object} options```
    - email
    - verifyCode

- **使用方法:**

  - ``` javascript
	Authing.verifyResetPasswordVerifyCode({
		email: email,
    verifyCode: verifyCode
	});
  	```

- **返回数据:**

  - ``` javascript
	  {
      "message": "验证成功，请输入新密码",
      "code":null,
      "__typename": "CommonMessage"
    }
    ```

#### 3.发送新密码 Authing.changePassword(options)

- **参数:**

  - ```{Object} options```
    - email
    - password
    - verifyCode

- **使用方法:**

  - ``` javascript
	Authing.changePassword({
		email: email,
     password: password,
     verifyCode: verifyCode
	});
  	```

- **返回数据:**

  - ``` javascript
	  {
        "_id":"5a2a723d598e37000106786a",
        "email":"1968108962@qq.com",
        "emailVerified":true,
        "username":"1968108962@qq.com",
        "nickname":"",
        "company":"","photo":"http://oxacbp94f.bkt.clouddn.com/authing-avatar.png","browser":"",
        "registerInClient":"59f86b4832eb28071bdd9214","registerMethod":"default:username-password",
        "oauth":"","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiMTk2ODEwODk2MkBxcS5jb20iLCJpZCI6IjVhMmE3MjNkNTk4ZTM3MDAwMTA2Nzg2YSJ9LCJpYXQiOjE1MTQwMjcyNDd9.vWrlzKY-Qr0SXwx8k__BF0ADCBjqGgMWP-wVOWgbH7A","tokenExpiredAt":"Sat Dec 23 2017 19:07:27 GMT+0800 (CST)","loginsCount":1,"lastLogin":"Fri Dec 08 2017 19:07:27 GMT+0800 (CST)","lastIP":"172.20.0.1",
        "signedUp":"Fri Dec 08 2017 19:06:37 GMT+0800 (CST)",
        "blocked":false,"isDeleted":false,
        "__typename":"ExtendUser"
      }
    ```