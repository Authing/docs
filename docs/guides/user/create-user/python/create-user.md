!!!include(common/init-python-mngmt-sdk.md)!!!

使用 [UsersManagementClient](/reference-new/standard-web-application/sdk-for-python/management/UsersManagementClient.md) 的 `create` 方法创建用户：

```python
user = management_client.users.create(
  userInfo={
    'username': 'bob',
    'password': '123456',
    'phone': '176xxxx6754', # 由于是管理员操作，所以不需要检验手机号验证码, 如果你需要检验，请使用  AuthenticationClient
    'nickname': 'Nick',
    'loginsCount': 2, # 原有用户系统记录的用户登录次数
    'signedUpd': '2020-10-15T17:55:37+08:00', # 原有用户系统记录的用户注册时间
})
```
