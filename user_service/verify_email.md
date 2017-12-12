# Verify Email

----------

#### First Authing.sendVerifyEmail(options)

- **Arguments:**

  - ```{Object} options```
    - client: clientId
    - email: target email

- **Usage:**

  - ``` javascript
	Authing.sendVerifyEmail({
		client: clientId,
		email: email
	});
  	```

- **returns:**

  - ``` javascript
	{
         message: "发送验证邮件成功", 
         __typename: "CommonMessage"
    }
    ```

Then, the user will receive the email which include a link, when he click the link, we will verify it and redirct to the link which you configed in the email templates settings.The verify result also be included in the redirect link. e.g.'your_redirect_link?verifyed=true&code=0'