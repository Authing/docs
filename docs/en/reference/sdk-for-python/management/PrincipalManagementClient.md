---
meta:
  - name: description
    content: Management subject certification - Python SDK
---

# Management subject certification

<LastUpdated/>

This module is used to conduct body authentication, such as personal authentication or corporate certification.

> Initialization module

```python
from authing.v2.management import ManagementClient, ManagementClientOptions

management_client = ManagementClient(
  options=ManagementClientOptions(
    user_pool_id='AUTHING_USERPOOL_ID',
    secret='AUTHING_USERPOOL_SECRET',
))

management.principalAuth.detail() # Get an authorization details
management.principalAuth.authenticate() # Authorize
```

### Get a certification details

> Get the main authentication details

```python
def detail(self, user_id)
```

#### parameter

- `user_id` \<str\> User ID

#### Example

```python
management.principalAuth.detail("6139c4d24e78a4d706b7545b")
```

#### Example 数据

```json
{
  "message": "获取主体认证信息成功",
  "code": 200,
  "data": {
    "id": "60b4d72f56b49fb97281001b",
    "createdAt": "2021-05-31T12:31:43.416Z",
    "updatedAt": "2021-05-31T12:31:43.416Z",
    "userPoolId": "607fe30c14d1650eb1d888ca",
    "userId": "60a336dc179abb512dd64ae7",
    "principalType": "P",
    "principalName": "xxx",
    "principalCode": "xxxxxxxxxxxxxxx",
    "authenticationTime": "2021-05-31T12:31:43.414Z"
  }
}
```

### Subject authentication

> Subject authentication

```python
def authenticate(self, user_id, type, name, id_card, ext)
```

#### parameter

- `user_id` \<str\> User ID
- `type` \<str\>Type value is only p or e
- `name` \<str\> name
- `id_card` \<str\>
  - When Type is P, a personal ID card
  - When Type is E, enterprise unified credit coding
- `ext` \<str\>
  - When Type is P, the bank card number
  - When Type is E, the corporate legal person name

#### Example

```python
management.principalAuth.authenticate("6139c4d24e78a4d706b7545b","P","nn","xx","cq")
```
