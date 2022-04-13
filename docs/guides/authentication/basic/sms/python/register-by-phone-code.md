!!!include(common/init-python-auth-sdk.md)!!!

首先调用发送短信验证码接口发送短信验证码，然后使用 `register_by_phone_code` 方法：

```python
phone = '176xxxx6754'
user = authentication_client.register_by_phone_code(
    phone=phone,
    code='1234',
    password='passw0rd',
    profile={
      'nickname': 'Nick'
    }
)
```