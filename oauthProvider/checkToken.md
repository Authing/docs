# 检测 access_token 是否可用

-------

`https://sso.authing.cn/authorize`

通过访问以上链接可检测 `access_token` 是否还可用。

### 1. GET

`ajax.get(https://sso.authing.cn/authorize?access_token={myToken})`

### 2. POST

```javascript
ajax.post({
  url: https://sso.authing.cn/authorize,
  data: {
    access_token: myToken
  }
})
```

### 3. 作为 header
```javascript
ajax.post({
  url: https://sso.authing.cn/authorize,
  headers: {
    Authorization: `Bearer ${myToken}`
  }
})
```

或

```javascript
ajax.get({
  url: https://sso.authing.cn/authorize,
  headers: {
    Authorization: `Bearer ${myToken}`
  }
})
```

### 4. 返回

```javascript
{
  state: 1, // 0 表示不可用或错误，1 表示可用
  error: 'some error' // 错误信息
  token: { 
    _id: 5c7fd96bc7826bcee1acc5bd,
    accessToken: '8e39481a209d5baef9618fea8627b2747d37e5b3',
    accessTokenExpiresAt: 2019-03-06T15:30:03.095Z,
    appId: 5c7babae09c091dbebdb4cdc,
    userOrClientId: '5c00a5fbec1083000f5b27d4',
    grantType: 'authorization_code',
    when: 2019-03-06T14:30:03.100Z,
    isDeleted: false,
    isRevoked: false 
  } 
}
```
