!!!include(en/common/init-python-auth-sdk.md)!!!

首先调用发送短信验证码接口发送短信验证码，然后 Use `register_by_phone_code` 方法：

```python
phone = '188xxxx8888'
user = authentication_client.register_by_phone_code(
    phone=phone,
    code='1234',
    password='passw0rd',
    profile={
      'nickname': 'Nick'
    }
)
```
