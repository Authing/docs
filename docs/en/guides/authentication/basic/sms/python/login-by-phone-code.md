!!!include(en/common/init-python-auth-sdk.md)!!!

首先调用发送短信验证码接口发送短信验证码，然后 Use `login_by_phone_code` 方法：

```python
phone = '176xxxx6754'
# 手机号验证码登录，如果用户不存在会自动创建账号
user = authentication_client.login_by_phone_code(
    phone=phone,
    code='1234',
)
```
