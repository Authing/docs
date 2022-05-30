# 管理分组

<LastUpdated/>

此模块用于管理 {{$localeConfig.brandName}} 分组，可以进行分组的增删改查、分组添加/删除用户、获取分组被授权的所有资源等操作。

```python
from authing.v2.management import ManagementClient, ManagementClientOptions

management_client = ManagementClient(
  options=ManagementClientOptions(
    user_pool_id='AUTHING_USERPOOL_ID',
    secret='AUTHING_USERPOOL_SECRET',
))

management_client.groups.list # 获取分组列表
management_client.groups.create # 创建分组
management_client.groups.list_users # 获取分组用户列表
```

## 创建分组

```python
def create(self, code, name, description=None):
  pass
```

创建分组，一个分组必须包含一个用户池全局唯一的标志符（code），此标志符必须为一个合法的英文标志符，如 developers；以及分组名称。

#### 参数

- `code` \<str\> 分组唯一标志符
- `name` \<str\> 分组名称
- `description` \<str\> 描述

#### 示例

```python
management_client.groups.create(
  code='group', 
  name='分组 xxx'
)
```

#### 返回值

```json
{
    "code": "developers",
    "name": "开发者",
    "description": null,
    "createdAt": "2021-05-06T15:36:33+08:00",
    "updatedAt": "2021-05-06T15:36:33+08:00"
}
```


## 修改分组


```python
def update(self, code, new_code=None, name=None, description=None):
  pass
```

修改分组，通过 code 唯一标志用户池中的一个分组。你可以修改此分组的 code。

#### 参数

- `code` \<str\> 分组唯一标志符
- `new_code` \<str\> 分组新的 code
- `name` \<str\> 新的名称
- `description` \<str\> 新的描述信息

#### 示例

```python
management_client.groups.update(
  code='code1',
  new_code='code2'
)
```

#### 返回值

返回新的分组详情：

```json
{
    "code": "new-code",
    "name": "开发者",
    "description": null,
    "createdAt": "2021-05-06T15:36:33+08:00",
    "updatedAt": "2021-05-06T15:36:33+08:00"
}
```

## 获取分组详情

```python
def detail(self, code):
  pass
```

获取分组详情，通过 code 唯一标志用户池中的一个分组。

#### 参数

- `code` \<str\> 分组唯一标志符

#### 示例

```python
management_client.groups.detail('manager')
```

#### 返回值

```json
{
    "code": "developers",
    "name": "开发者",
    "description": null,
    "createdAt": "2021-05-06T15:36:33+08:00",
    "updatedAt": "2021-05-06T15:36:33+08:00"
}
```

## 获取分组列表

```python
def list(self, page=1, limit=10):
  pass
```

获取分组列表，此接口为分页接口。

#### 参数

- `page` \<int\> 页码数 默认值为 : `1`。
- `limit` \<int\> 每页个数 默认值为 : `10`。

#### 示例

```python
management_client.groups.list(1, 10)
```

#### 返回值

```json
{
  "totalCount": 2,
  "list": [
    {
      "code": "code1",
      "name": "名称1",
      "description": null,
      "createdAt": "2021-05-06T15:36:33+08:00",
      "updatedAt": "2021-05-06T15:36:33+08:00"
    },
    {
      "code": "code2",
      "name": "名称2",
      "description": null,
      "createdAt": "2021-05-06T15:36:33+08:00",
      "updatedAt": "2021-05-06T15:36:33+08:00"
    }
  ]
}
```

## 删除分组


```python
def delete(self, code):
  pass
```

删除分组，通过 code 唯一标志用户池中的一个分组。

#### 参数

- `code` \<str\> 分组唯一标志符

#### 示例

```python
management_client.groups.delete('code')
```

#### 返回值

```json
{
  "code": 200,
  "massage": "删除分组成功"
}
```


## 批量删除分组


```python
def delete_many(self, code_list):
  pass
```

通过分组的 code 批量删除分组。

#### 参数

- `code_list` \<str[]\> 分组唯一标志符列表。

#### 示例

```python
management_client.groups.delete_many(['groupa', 'groupb'])
```

#### 返回值

```json
{
  "code": 200,
  "massage": "删除分组成功"
}
```

## 获取分组用户列表

```python
def list_users(self, code, page=1, limit=10, with_custom_data=True):
  pass
```

获取用户列表。此接口为分页接口。

#### 参数

- `code` \<str\> 分组唯一标志符
- `page` \<int\> 页码数 默认值为 : `1`。
- `limit` \<int\> 每页个数 默认值为 : `10`。
- `with_custom_data`: \<bool\> 是否获取自定义数据，默认为 false；如果设置为 true，将会在 `customData` 字段返回用户的所有自定义数据。示例：

```json
{
  "id": "604a12a261a85949c8ad0259",
  "customData": {
    "school": "清华大学",
    "age": 19
  }
}
```

#### 示例

- 获取分组 「group1」的用户（分页）

```python
management_client.groups.list_users('group1')
```

- 获取用户列表的同时，获取用户的自定义数据

```python
management_client.groups.list_users('group1', with_custom_data=True)
```

#### 返回值

```json
{
  "totalCount": 2,
  "list": [
    {
        "customData": {
          "school": "清华大学",
          "age": 19
        }
    },
    {
        "customData": {
          "school": "清华大学",
          "age": 19
        }
    }
  ]
}
```

## 添加用户

```python
def add_users(self, code, user_ids):
  pass
```

分组添加用户。

#### 参数

- `code` \<str\> 分组唯一标志符
- `user_ids` \<str[]\> 用户 ID 列表

#### 示例

```python
management_client.groups.add_users(code, ['USERID1', 'USERID2'])
```

#### 返回值

```json
{
  "code": 200,
  "massage": "添加用户成功"
}
```

## 移除用户

```python
def remove_users(self, code, user_ids):
  pass
```

分组移除用户。

#### 参数

- `code` \<str\> 分组唯一标志符
- `user_ids` \<str[]\> 用户 ID 列表

#### 示例

```python
management_client.groups.remove_users(code, ['USERID1', 'USERID2'])
```

#### 返回值

```json
{
  "code": 200,
  "massage": "移除用户成功"
}
```

## 获取分组被授权的所有资源列表

```python
def list_authorized_resources(self, code, namespace, resource_type=None):
  pass
```

获取一个分组被授权的所有资源。

#### 参数

- `code` \<str\> 分组 code；
- `namespace` \<str\> 权限分组的 code，详情请见[使用权限分组管理权限资源](/guides/access-control/resource-group.md)；
- `resourceType` \<str\> 可选，资源类型，默认会返回所有有权限的资源，现有资源类型如下：
  - `DATA`: 数据类型；
  - `API`: API 类型数据；
  - `MENU`: 菜单类型数据；
  - `BUTTON`: 按钮类型数据。

#### 示例

```python
management_client.groups.list_authorized_resources('GROUP_CODE', 'default')
```

#### 示例数据

- `type` 为资源类型；
- `code`: 资源描述符，如果是 `DATA` 类型资源，格式为 `resourceType:resourceId`，如 `books:*` 表示所有书籍，`books:1` 表示 ID 为 1 的书籍。
- `actions`: 用户被授权对该资源的操作。

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
