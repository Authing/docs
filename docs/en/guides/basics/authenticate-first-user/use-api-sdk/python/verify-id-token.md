In Python, you can use [PyJWT](https://pyjwt.readthedocs.io/en/stable/) to validate IdToken:

```python
import jwt
key = "secret"
encoded = jwt.encode({"some": "payload"}, key, algorithm="HS256")
print(encoded)
jwt.decode(encoded, key, algorithms="HS256")
```