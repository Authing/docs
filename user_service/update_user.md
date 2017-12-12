# Update User Profile

----------

#### Authing.update(options)

此接口可以用来修改密码、昵称、头像等各种用户信息

- **Arguments:**

  - ```{Object} options```
    - _id ```{String} MUST```
    - email ```{String}```
    - emailVerified: ```{Boolean}```
	- username: ```{String}```
	- nickname: ```{String}```
	- company: ```{String}```
	- photo: ```{String}```
	- browser: ```{String}```
	- password: ```{String}```
	- token: ```{String}```
	- tokenExpiredAt: ```{String}```
	- loginsCount: ```{Number}```
	- lastLogin: ```{String}```
	- lastIP: ```{String}```
	- signedUp: ```{String}```
	- blocked: ```{Boolean}```
	- isDeleted: ```{Boolean}```

- **Usage:**

  - ``` javascript
	Authing.update({
		_id: "59e5ff4935eebf1913cfe8a1",
		email: email,
		password: password
	});
  	```

- **returns:**

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