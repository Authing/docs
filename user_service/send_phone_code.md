# 发送手机验证码

----------

若使用 ```JavaScript``` 调用，需要使用 ```then().catch()``` 捕获结果和错误。

此接口可结合[使用手机验证码登录](/user_serivce/login_by_phone_code)使用。

#### Authing.getVerificationCode(phone)

- **参数:**

  - ```{String} phone```
   - 手机号

- **使用方法:**

  - ``` javascript
	Authing.getVerificationCode(phone);
  	```

- **返回数据:**

  - ``` javascript
	{
      code: 200,
      message: '发送成功'
  }
    ```
  - ``` javascript
	{
      code: 500,
      message: '发送失败'
  }
    ```

#### 消息模版

> 【Authing】{S8} 是你的验证码，有效时间为 {S2} 分钟。如非本人操作请忽略。

当前不支持修改模版。

验证码接口可结合[使用手机验证码登录](/user_serivce/login_by_phone_code)使用。