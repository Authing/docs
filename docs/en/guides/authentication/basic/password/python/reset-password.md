!!!include(en/common/init-python-auth-sdk.md)!!!

Use 手机号验证码重置密码：

```python
authentication_client.reset_password_by_phone_code(
  phone="188xxxx8888",
  code="1234",
  new_password="passw0rd"
)
```

Use 邮箱验证码重置密码：

```python
authentication_client.reset_password_by_email_code(
  email="test@example.com",
  code="1234",
  new_password="passw0rd"
)
```
