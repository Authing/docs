# 验证邮箱

----------

若使用 ```JavaScript``` 调用，需要使用 ```then().catch()``` 捕获结果和错误。

#### 首先发送验证邮件 Authing.sendVerifyEmail(options)

- **参数:**

  - ```{Object} options```
    - email: 需要验证的邮箱

- **使用方法:**

  - ``` javascript
  Authing.sendVerifyEmail({
    email: email
  });
    ```

- **返回数据:**

  - ``` javascript
  {
         message: "发送验证邮件成功", 
         __typename: "CommonMessage"
    }
    ```

然后，用户将会收到一个包含验证链接的邮件，当用户打开此链接，我们将进行验证，验证完成之后重定向到您在```验证邮件模板```中所设置的```重定向链接```，并将验证结果一起返回。  
例如：'```your_redirect_link?verifyed=true&code=0```'