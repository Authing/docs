# 使用 LDAP 登录

----------

若使用 ```JavaScript``` 调用，需要使用 ```then().catch()``` 捕获结果和错误。

LDAP 服务的配置流程请参考[配置 LDAP 服务](https://docs.authing.cn/#/ldap/config.md)。

#### Authing.loginByLDAP(options)

- **参数:**

  - ```{Object} options```
    - `username`，在 LDAP 服务中的登录名，可以是邮箱或用户名
    - `password`，在 LDAP 服务中的密码

- **使用方法:**

  - ``` javascript
	Authing.loginByLDAP({
		username: username,
		password: password
	});
  	```

- **返回数据:**

  - ``` javascript
    {
      "_id": "5cbe9a4347618069372e75ff",
      "username": "Nikola Tesla",
      "nickname": "Nikola Tesla",
      "oauth": "{\"dn\":\"uid=tesla,dc=example,dc=com\",\"controls\":[],\"objectClass\":[\"inetOrgPerson\",\"organizationalPerson\",\"person\",\"top\",\"posixAccount\"],\"cn\":\"Nikola Tesla\",\"sn\":\"Tesla\",\"uid\":\"tesla\",\"mail\":\"tesla@ldap.forumsys.com\",\"uidNumber\":\"88888\",\"gidNumber\":\"99999\",\"homeDirectory\":\"home\"}",
      "unionid": "uid=tesla,dc=example,dc=com",
      "registerMethod": "ldap:default::from-undefined",
      "email": "tesla@ldap.forumsys.com",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoidGVzbGFAbGRhcC5mb3J1bXN5cy5jb20iLCJ1bmlvbmlkIjoidWlkPXRlc2xhLGRjPWV4YW1wbGUsZGM9Y29tIiwiaWQiOiI1Y2JlOWE0MzQ3NjE4MDY5MzcyZTc1ZmYiLCJjbGllbnRJZCI6IjVjYTQwMjdjOGEzNjJjODIyZTI2ZDA0ZiJ9LCJpYXQiOjE1NTU5OTY1MjUsImV4cCI6MTU1NzI5MjUyNX0.gcKasWAzO0ZS4ay_KGGp_ihPKG_GaGXk5iQKzP6R4_w",
      "company": ""
    }
    ```