# 解析 JSON Web Token（仅支持 JavaScript）

----------

若使用 ```JavaScript``` 调用，需要使用 ```then().catch()``` 捕获结果和错误。

#### Authing.decodeToken(token)

- **参数:**

  - ```{String} token```

- **使用方法:**

  - ``` javascript
    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiIiwidW5pb25pZCI6Im9lU0RUNUxiZ2k3R3Nud3hIS2tpc3BtWFpxRXMiLCJpZCI6IjViMmY3ZTNlZjc5ZGUyMDAwMWJlZjllNyIsImNsaWVudElkIjoiNWIwMTNkMGIwOTZhYTYwMDAxY2IyNmY2In0sImlhdCI6MTUyOTgzOTE2NiwiZXhwIjoxNTMxMTM1MTY2fQ.Y-29y6rPNUhexw9Z07qOMkSbzyMNOFvTB7YTb4lJUNA';
    Authing.decodeToken(token);
    ```
- **返回数据:**

  - ``` javascript

    {
      "data": {
        "email": "",
        "unionid": "oeSDT5Lbgi7GsnwxHKkispmXZqEs",
        "id": "5b2f7e3ef79de20001bef9e7",
        "clientId": "5b013d0b096aa60001cb26f6"
      },
      "status": {
        "code": 200, // code 有三种值, 另外两种为, 2206: token 已过期, 2207: token 错误 
        "message": "token解析正常"
      },
      "iat": 1529839166,
      "exp": 1531135166
    }

    ```