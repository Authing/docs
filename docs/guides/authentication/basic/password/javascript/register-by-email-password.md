!!!include(common/init-js-auth-sdk.md)!!!

使用 `registerByEmail` 方法：


```javascript
authenticationClient.registerByEmail("test@example.com", "passw0rd");
```

或者：

```javascript
authenticationClient.registerByEmail(
  "test@example.com",
  "passw0rd",
  {
    nickname: "Nick",
  },
  {
    generateToken: true,
  }
);
```
