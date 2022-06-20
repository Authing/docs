!!!include(en/common/init-js-auth-sdk.md)!!!

Use `registerByEmail` 方法：

```javascript
authenticationClient.registerByEmail("test@example.com", "passw0rd");
```

或者：

```javascript
authenticationClient.registerByEmail(
  "test@example.com",
  "passw0rd",
  {
    nickname: "Nick"
  },
  {
    generateToken: true
  }
);
```
