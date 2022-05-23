---
meta:
  - name: description
    content: 管理角色
---

# 管理角色

<LastUpdated/>


此模块用于管理 {{$localeConfig.brandName}} 角色，可以进行角色的增删改查、角色添加/删除用户等操作。


请通过以下方式使用该模块：

```python
from authing.v2.management import ManagementClient, ManagementClientOptions

management_client = ManagementClient(
  options=ManagementClientOptions(
    user_pool_id='AUTHING_USERPOOL_ID',
    secret='AUTHING_USERPOOL_SECRET',
))

management_client.roles.list # 获取角色列表
management_client.roles.create # 创建角色
management_client.roles.list_users # 获取用户列表
```

## 创建角色
>创建角色，可以指定不同的权限分组
```python
def create(self, code, description=None, namespace=None)
```
#### 参数

- `code` \<str\> 角色唯一标志符
- `description` \<str\> 描述
- `namespace` \<str\> 权限分组 code

#### 示例
```python
code = 'code'
role = management_client.roles.create(code=code, namespace="default")
```

## 删除角色
>删除角色
```python
def delete(self, code, namespace=None)
```
#### 参数

- `code` \<str\> 角色唯一标志符
- `namespace` \<str\> 权限分组 code

#### 示例

```python
data = management_client.roles.delete(code='code', namespace="default")
code = data['code'] # 200 表示成功
```

## 批量删除角色
>批量删除角色
```python
def delete_many(self, code_list, namespace=None)
```
#### 参数

- `code_list` \<str[]\> 角色唯一标志符列表
- `namespace` \<str\> 权限分组 code

#### 示例

```python
data = management_client.roles.delete_many([
  'ROLE1',
  'ROLE2'
])
totalCount = data['totalCount']
_list = data['list']
```

## 修改角色
>修改角色
```python
def update(self, code, description=None, newCode=None, namespace=None)
```
#### 参数

- `code` \<str\> 角色唯一标志符
- `description` \<str\> 描述信息
- `newCode` \<str\> 新的唯一标志符
- `namespace` \<str\> 权限分组 code

#### 示例

```python

# 修改基本信息
code = 'code'
desc = '描述'
role = management_client.roles.update(code=code, description=desc)

# 修改新 code
role = management_client.roles.update(code='old', newCode="new")
```

## 获取角色详情
>获取角色详情
```python
def detail(self, code, namespace=None)
```
#### 参数

- `code` \<str\> 角色唯一标志符
- `namespace` \<str\> 权限分组 code

#### 示例

```python
code = 'code'
management_client.roles.create(code=code)
```

## 获取角色列表
>获取某一个权限分组下的角色列表
```python
def list(self, page=1, limit=10, namespace=None)
```
#### 参数
- `page` \<int\> 页码数 默认值为 : `1`
- `limit` \<int\> 每页个数 默认值为 : `10`
- `namespace` \<str\> 权限分组 code

#### 示例
```python
data = management_client.roles.list()
totalCount = data['totalCount']
_list = data['list']
```

## 获取用户列表
>获取用户列表。此接口为分页接口
```python
def list_users(self, code, page=1, limit=10, namespace=None, with_custom_data=False)
```
#### 参数
- `code` \<str\> 角色唯一标志符
- `page` <int\> 页码数 默认值为 : `1`
- `limit` \<int\> 每页个数 默认值为 : `10`
- `namespace` \<str\> 权限分组 code
- `with_custom_data`: \<boolean\> 是否获取自定义数据，默认为 false；如果设置为 true，将会在 `customData` 字段返回用户的所有自定义数据。示例：

#### 示例


- 获取「默认权限分组」下面的角色 「ROLE」的用户（分页）
```python
data = management_client.roles.list_users('ROLE')
totalCount = data['totalCount']
lst = data['list']
```

- 获取用户列表的同时，获取用户的自定义数据


```python
data = management_client.roles.list_users('ROLE', with_custom_data=True)
totalCount = data['totalCount']
lst = data['list']
```

## 添加用户
> 添加用户

```python
def add_users(self, code, userIds, namespace=None)
```


#### 参数

- `code` \<str\> 角色唯一标志符
- `userIds` \<str[]\> 用户 ID 列表
- `namespace` \<str\> 权限分组 code

#### 示例

```python
data = management_client.roles.add_users('ROLE', [
  'USERID1',
  'USERID2'
])
totalCount = data['totalCount']
_list = data['list']
```

## 移除用户
> 移除用户

```python
def remove_users(self, code, userIds, namespace=None)
```


#### 参数

- `code` \<str\> 角色唯一标志符
- `userIds` \<str[]\> 用户 ID 列表
- `namespace` \<str\> 权限分组 code

#### 示例

```python
data = management_client.roles.remove_users('ROLE', [
  'USERID1',
  'USERID2'
])
totalCount = data['totalCount']
_list = data['list']
```

## 获取角色被授权的所有资源列表
>获取一个角色被授权的所有资源。

```python
def list_authorized_resources(self, code, namespace, resource_type=None)
```


#### 参数

- `code` \<str\> 角色 code
- `namespace` \<str\> 权限分组的 code，详情请见[使用权限分组管理权限资源](/guides/access-control/resource-group.md)
- `resource_type` \<str\> 可选，资源类型，默认会返回所有有权限的资源，现有资源类型如下：
  - `DATA`: 数据类型
  - `API`: API 类型数据
  - `MENU`: 菜单类型数据
  - `BUTTON`: 按钮类型数据

#### 示例

```python
management_client.roles.list_authorized_resources('roleCode', 'default')
```

#### 示例数据

- `type` 为资源类型
- `code`: 资源描述符，如果是 `DATA` 类型资源，格式为 `resourceType:resourceId`，如 `books:*` 表示所有书籍，`books:1` 表示 ID 为 1 的书籍
- `actions`: 用户被授权对该资源的操作

```json
{
  "totalCount": 12,
  "list": [
    {
      "code": "menu_a",
      "type": "MENU"
    },
    {
      "code": "menu_b",
      "type": "MENU"
    },
    {
      "code": "books:1",
      "type": "DATA",
      "actions": ["books:delete", "books:update"]
    }
  ]
}
```



## 获取某个角色扩展字段列表
>获取某个角色扩展字段列表

```python
def get_udf_value(self, id)
```
#### 参数
- `roleId` \<str\> 角色 ID
#### 示例
```python
data = management_client.roles.get_udf_value('ROLE_ID')
```

#### 示例数据

```json
{
  "key": "value"
}
```

## 获取某个角色某个扩展字段
>获取某个角色某个扩展字段

```python
def get_specific_udf_value(self, id, key)
```
#### 参数

- `id` \<str\> 角色 ID
- `key` \<str\> 扩展字段 Key

#### 示例

```python
data = management_client.roles.get_udf_value('ROLE_ID', 'key')
```


## 获取多个角色扩展字段列表
>获取多个角色扩展字段列表

```python
def get_udf_value_batch(self, ids)
```
#### 参数
- `ids` \<list\> 角色 ID 列表
#### 示例

```python
management_client.roles.get_udf_value_batch(
  ids=[
    'id1',
    'id2'
  ]
)
```

#### 示例数据
```json
{
  "ROLE_ID1": {
    "key1": "value1"
  },
  "ROLE_ID2": {
    "key1": "value2"
  }
}
```

## 设置角色扩展字段
>设置角色扩展字段
```python
def set_udf_value(self, id, data)
```

#### 参数
- `id` \<str\> 角色 ID
- `data` \<dict\> 扩展字段，key: value
#### 示例

```python
management_client.roles.set_udf_value('roleId', {
    key: value
})
```

## 设置多个角色扩展字段列表
>设置多个角色扩展字段列表

```python
def set_udf_value_batch(self, data)
```
#### 参数
- `data` \<dict\> 数据输入，类型请见示例
#### 示例

```python
role1_id = 'xxx'
role2_id = 'xxx'
management.roles.set_udf_value_batch(
    {
        role1_id: {
            key: value
        },
        role2_id: {
            key: value
        }
    }
)
```

## 删除角色的扩展字段
>删除角色的扩展字段
```python
def remove_udf_value(self, id, key)
```
#### 参数

- `id` \<str\> 角色 ID
- `key` \<str\> 扩展字段名
#### 示例
```python
management_client.roles.remove_udf_value('id', 'key')
```

## 获取角色策略列表
>获取角色策略列表
```python
def list_policies(self, code, page=1, limit=10)
```
#### 参数

- `code` \<str\> 角色 code
- `page` <int\> 页码数 默认值为 : `1`
- `limit` \<int\> 每页个数 默认值为 : `10`
#### 示例
```python
management.roles.list_policies(role['code'])
```

## 给角色授权策略
>给角色授权策略
```python
def add_policies(self, code, policies)
```
#### 参数

- `code` \<str\> 角色 code
- `policies` <list\> 策略编码
#### 示例
```python
policy = management.policies.create(
            code=‘code',
            statements=[
                {
                    'resource': 'book:123',
                    'actions': ['books:read'],
                    'effect': 'ALLOW'
                }
            ]
        )
role = create_role()
management.roles.add_policies(role['code'], [policy['code']])
```



## 角色移除策略
>角色移除策略
```python
def remove_policies(self, code, policies)
```
#### 参数

- `code` \<str\> 角色 code
- `policies` <list\> 策略编码
#### 示例
```python
policy = management.policies.create(
            code=‘code',
            statements=[
                {
                    'resource': 'book:123',
                    'actions': ['books:read'],
                    'effect': 'ALLOW'
                }
            ]
        )
role = create_role()
management.roles.add_policies(role['code'], [policy['code']])
management.roles.remove_policies(role['code'], [policy['code']])
```
