# 退出登录

----------

若使用 ```JavaScript``` 调用，需要使用 ```then().catch()``` 捕获结果和错误。

#### Authing.logout(uid)

- **参数:**

  - ```{String} uid```

- **使用方法:**

  - ``` javascript
  let uid = '59e5ff4935eebf1913cfe8a1';
	Authing.logout(uid);
  	```
- **返回数据:**

  - ``` javascript

	{
		id: "59e5ff4935eebf1913cfe8a1"
	}

    ```

## 退出 SSO

如果你使用了 OAuth、OIDC 或 SAML 实现了单点登录，那么使用户退出登录需要跳转到一个 URL：

> https://<你的域名>.authing.cn/login/profile/logout?app_id=<OAuth 应用 ID>&redirect_uri=<退出之后的回调地址>

其中 `app_id` 和 `redirect_uri` 都是必填选项，`redirect_uri` 是退出后你想要返回的地址。