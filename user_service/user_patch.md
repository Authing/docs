# 获取单个用户资料

----------

若使用 ```JavaScript``` 调用，需要使用 ```then().catch()``` 捕获结果和错误。

#### Authing.userPatch(options)

- **参数:**

  - ```{Object} options```
    - ids
      - 要获取的用户 id 列表，使用逗号分割，不要出现多余的空格；如果使用非法 id 查询时系统会自动忽略。

- **使用方法:**

  - ``` javascript
	Authing.userPatch({
      ids: '5a584dcd32e6510001a8f144,5c08fa74583d9d00019d245e'
    });
  	```

- **返回数据:**

  - ``` javascript
{ list: 
   [ { _id: '5c0a3565583d9d000219d3960',
       unionid: 'oVzVG4wo1v0c7uyiFQtHc3Nrl2hg',
       email: null,
       emailVerified: false,
       username: 'xxxxxxxxxxxxxxxxx',
       nickname: 'xxxxxxxxxxxxxxxxx',
       company: '',
       photo: 'xxxxxxxxxxxxxxxxx',
       browser: '',
       registerInClient: 'xxxxxxxxxxxxxxxxx',
       registerMethod: 'oauth:wechat',
       oauth: 'xxxxxxxxxxxxxxxxx',
       token: 'xxxxxxxxxxxxxxxxx',
       tokenExpiredAt: 'Sat Dec 22 2018 16:55:01 GMT+0800 (CST)',
       loginsCount: 1,
       lastLogin: 'Fri Dec 07 2018 16:55:01 GMT+0800 (CST)',
       lastIP: '114.93.36.228',
       signedUp: 'Fri Dec 07 2018 16:55:01 GMT+0800 (CST)',
       blocked: false,
       isDeleted: false,
       userLocation: null,
       userLoginHistory: null },
     { _id: '5c08fa74583d9d00019d24ee',
       unionid: 'xxxxxxxxxxxxxxxxx',
       email: null,
       emailVerified: false,
       username: 'xxxxxxxxxxxxxxxxx',
       nickname: 'xxxxxxxxxxxxxxxxx',
       company: '',
       photo: 'xxxxxxxxxxxxxxxxx',
       browser: '',
       registerInClient: 'xxxxxxxxxxxxxxxxx',
       registerMethod: 'oauth:wechat',
       oauth: 'xxxxxxx',
       token: 'xxxxxxx',
       tokenExpiredAt: 'Fri Dec 21 2018 18:31:16 GMT+0800 (CST)',
       loginsCount: 1,
       lastLogin: 'Thu Dec 06 2018 18:31:16 GMT+0800 (CST)',
       lastIP: '221.192.178.75',
       signedUp: 'Thu Dec 06 2018 18:31:16 GMT+0800 (CST)',
       blocked: false,
       isDeleted: false,
       userLocation: null,
       userLoginHistory: null } ],
  totalCount: 2 }
 
    ```