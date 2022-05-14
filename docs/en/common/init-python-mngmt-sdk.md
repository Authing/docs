Use [用户池 ID（`userPoolId`）和用户池密钥（`secret`）](/guides/faqs/get-userpool-id-and-secret.md)初始化 [Python SDK](/reference/sdk-for-python/) 的 `ManagementClient`:

```python
from authing.v2.management import ManagementClient, ManagementClientOptions

management_client = ManagementClient(
  options=ManagementClientOptions(
    user_pool_id='AUTHING_USERPOOL_ID',
    secret='AUTHING_USERPOOL_SECRET',
))
```
