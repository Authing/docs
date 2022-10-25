!!!include(en/common/init-js-mngmt-sdk.md)!!!

Use [UsersManagementClient](/reference/sdk-for-node/management/UsersManagementClient.md) 的 `create` 方法创建用户：

```javascript
const user = await managementClient.users.create({
  username: "bob",
  password: "passw0rd"
});
```

或者：

```javascript
const user = await managementClient.users.create({
  nickname: "Nick",
  phone: "188xxxx8888", // 由于是管理员操作，所以不需要检验手机号验证码, 如果你需要检验，请Use   AuthenticationClient
  loginsCount: 2, // 原有用户系统记录的用户登录次数
  signedUp: "2020-10-15T17:55:37+08:00" // 原有用户系统记录的用户注册时间
});
```
