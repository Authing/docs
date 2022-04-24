Python 可以使用 [PyJWT](https://pyjwt.readthedocs.io/en/stable/) 来验证 IdToken：

```python
import jwt


audience = "AUTHING_APP_ID"
secret = "AUTHING_APP_SECRET"
encoded = jwt.encode({"some": "payload"}, key, algorithm="HS256")
jwt.decode(encoded, secret, audience=audience, algorithms="HS256")
```