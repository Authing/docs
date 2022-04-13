Use `loginByPhoneCode` method to login.

```python
phone = '176xxxx6754'
# 手机号验证码登录，如果用户不存在会自动创建账号
user = authentication_client.login_by_phone_code(
    phone=phone,
    code='1234',
)
```