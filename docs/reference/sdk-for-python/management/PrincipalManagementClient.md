---
meta:
- name: description
  content: 管理主体认证 - Python SDK
---

# 管理主体认证

<LastUpdated/>

此模块用于为用户进行主体认证，如个人认证或企业认证。

>初始化模块
```python
from authing.v2.management import ManagementClient, ManagementClientOptions

management_client = ManagementClient(
  options=ManagementClientOptions(
    user_pool_id='AUTHING_USERPOOL_ID',
    secret='AUTHING_USERPOOL_SECRET',
))

management.principalAuth.detail() # 获取授权详情
management.principalAuth.authenticate() # 授权
```

### 获取认证详情
> 获取主体认证详情
```python
def detail(self, user_id)
```
#### 参数

- `user_id` \<str\> 用户 ID

#### 示例
```python
management.principalAuth.detail("6139c4d24e78a4d706b7545b")
```

#### 示例数据
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
### 进行主体认证
> 进行主体认证
```python
def authenticate(self, user_id, type, name, id_card, ext)
```
#### 参数
- `user_id` \<str\> 用户ID
- `type` \<str\>类型 取值仅 P 或 E
- `name` \<str\> 名称
- `id_card` \<str\>
  - type 为 P 时，个人身份证 
  - type 为 E 时，企业统一信用编码
- `ext` \<str\>  
  - type 为 P 时，银行卡号 
  - type 为 E 时，企业法人名称
 
#### 示例
```python
management.principalAuth.authenticate("6139c4d24e78a4d706b7545b","P","nn","xx","cq")
```

