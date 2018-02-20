# 获取单个用户资料

----------

#### Authing.user(options)

- **参数:**

  - ```{Object} options```
    - id

- **使用方法:**

  - ``` javascript
	Authing.user({
        id: 'xxxxxxx'
    });
  	```

- **返回数据:**

  - ``` javascript
  	{
        "_id": "5a584dcd32e6510001a8f144", 
        "email": "1968198962@qq.com", 
        "emailVerified": false, 
        "username": "1968198962@qq.com", 
        "nickname": "", 
        "company": "", 
        "photo": "http://oxacbp94f.bkt.clouddn.com/user-avatars/Fqy_de1Jj5TmngEFiiY1-RsCCDcO", 
        "browser": "", 
        "registerInClient": "59f86b4832eb28071bdd9214", 
        "registerMethod": "default:username-password", 
        "oauth": "", 
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiMTk2ODE5ODk2MkBxcS5jb20iLCJpZCI6IjVhNTg0ZGNkMzJlNjUxMDAwMWE4ZjE0NCJ9LCJpYXQiOjE1MTcwMzI1MjV9.Ah0Oii741L_wJHhiE5KtWDgRU1Q3x_fNZBNNM5MhqDc", 
        "tokenExpiredAt": "Sat Jan 27 2018 13:55:25 GMT+0800 (CST)", 
        "loginsCount": 0, 
        "lastLogin": "Fri Jan 12 2018 13:55:25 GMT+0800 (CST)", 
        "lastIP": null, 
        "signedUp": "Fri Jan 12 2018 13:55:25 GMT+0800 (CST)", 
        "blocked": false, 
        "isDeleted": false, 
        "__typename": "ExtendUser"
    }
 
    ```