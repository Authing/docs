!!!include(common/init-python-auth-sdk.md)!!!

使用 `login_by_email` 方法：


```python
email = 'test@example.com'
user = authentication_client.login_by_email(
    email=email,
    password='passw0rd',
)
```
