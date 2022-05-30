使用[应用 ID（AppID）](/guides/faqs/get-app-id-and-secret.md) 初始化 [Python SDK](/reference-new/standard-web-application/sdk-for-python/) 的 `AuthenticationClient`:

```python
from authing.v2.authentication import AuthenticationClient, AuthenticationClientOptions

authentication_client = AuthenticationClient(
  options=AuthenticationClientOptions(
    app_id='AUTHING_APP_ID'
))
```
