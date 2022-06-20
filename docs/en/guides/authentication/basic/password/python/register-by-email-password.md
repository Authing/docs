!!!include(en/common/init-python-auth-sdk.md)!!!

Use `register_by_email` 方法：

```python
email = 'test@example.com'
user = authentication_client.register_by_email(
    email=email,
    password='passw0rd',
    profile={
      'nickname': 'Nick'
    }
)
```
