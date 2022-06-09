!!!include(en/common/init-python-auth-sdk.md)!!!

Use `login_by_email` 方法：

```python
email = 'test@example.com'
user = authentication_client.login_by_email(
    email=email,
    password='passw0rd',
)
```
