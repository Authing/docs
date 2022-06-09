---
meta:
  - name: description
    content: 管理资源与权限 - Python SDK
---

# 管理资源与权限

<LastUpdated/>

{{$localeConfig.brandName}} 基于 ABAC（Attribute Base Access Control，基于属性的权限控制）构建权限模型，

可以和 RBAC （Role Based Access Control，基于角色的访问控制）结合，实现非常灵活、精细化的权限控制。

此模块将此模型抽象成了两个方法: allow, is_allowed。

你可以通过以下方式使用此模块：

```python
from authing.v2.management import ManagementClient, ManagementClientOptions

management_client = ManagementClient(
  options=ManagementClientOptions(
    user_pool_id='AUTHING_USERPOOL_ID',
    secret='AUTHING_USERPOOL_SECRET',
))

management_client.acl.allow # 允许某个用户对某个资源进行某个操作
management_client.acl.is_allowed # 判断某个用户是否对某个资源有某个操作权限
```

## 创建权限分组

> 创建权限分组

```python
def create_namespace(self, code, name, description=None)
```

#### 参数

- `code` \<str\> 权限分组唯一标识符
- `name` \<str\> 权限分组名
- `description` \<str\> 可选，权限分组描述

#### 示例

```python
data = management_client.acl.create_namespace(
  code='testNamesapce',
  name='Test Namcepace',
  description='This is a Test Namespace'
)
```

#### 示例数据

```json
{
  "appId": null,
  "appName": null,
  "name": "Test Namcepace",
  "code": "testNamesapce",
  "description": "This is a Test Namespace",
  "status": 1,
  "id": 38
}
```

## 获取权限分组列表

> 获取权限分组列表

```python
def list_namespaces(self, page=1, limit=10)
```

#### 参数

- `page` \<int\> 页码，默认为 1
- `limit` \<int\> 每页个数，默认为 10

#### 示例

```python
management_client.acl.list_namespaces(1, 10)
```

#### 示例数据

```json
{
  "list": [
    {
      "appId": null,
      "appName": null,
      "name": "Test Namcepace",
      "code": "testNamesapce",
      "description": "This is a Test Namespace",
      "status": 1,
      "id": 38
    }
  ],
  "totalCount": 1
}
```

## 更新权限分组

> 更新权限分组

```python
def update_namespace(self, id, name=None, code=None, description=None)
```

#### 参数

- `id` \<int\> 权限分组 code
- `code` \<str\> 可选，权限分组新的 code
- `name` \<str\> 可选，权限分组名称
- `description` \<str\> 可选，权限分组描述

#### 示例

```python
management_client.acl.update_namespace(
    id='testNamesapce',
    name='A New Name'
)
```

#### 示例数据

```json
{
  "id": 38,
  "appId": null,
  "appName": null,
  "name": "Test Namcepace",
  "code": "testNamesapce",
  "description": "A New Name",
  "status": 1
}
```

## 删除权限分组

> 删除权限分组

```python
def delete_namespace(self, id)
```

#### 参数

- `id` \<int\> 权限分组 CODE

#### 示例

```python
management_client.acl.delete_namespace('testNamesapce')
```

## 获取资源列表

> 根据筛选条件，查询用户池下的资源列表

```python
def list_resources(self, namespace, resource_type=None, page=1, limit=10)
```

#### 参数

- `namespace` \<str\> 权限分组命名空间
- `type` \<str\> 资源类型，可选值为 `DATA`、`API`、`MENU`、`UI`、`BUTTON`
- `page` \<int\> 分页，获取第几页，默认从 1 开始
- `limit` \<int\> 每页条目数量，默认为 10

#### 示例

```python
data management_client.acl.list_resources(
  namespace='600a8f4e37708b363024a3ca',
  page=1,
  limit=10,
)
```

#### 返回数据

```json
{
  "list": [
    {
      "id": "60646ed1c7a558f935c6d49c",
      "createdAt": "2021-03-31T12:45:05.175Z",
      "updatedAt": "2021-03-31T12:45:05.175Z",
      "userPoolId": "600a8f29cead8fc0127f9da6",
      "code": "pihh4j7j4ehh",
      "actions": [
        {
          "name": "book:write",
          "description": "图书写入操作"
        }
      ],
      "type": "DATA",
      "description": "chair",
      "namespaceId": 22997,
      "apiIdentifier": null,
      "namespace": "600a8f4e37708b363024a3ca"
    }
  ],
  "totalCount": 1
}
```

## 创建资源

> 创建一个资源

```python
def create_resource(self, namespace, code, resource_type, actions, description=None)
```

#### 参数

- `code` \<str\> 资源标识符
- `namespace` \<str\> 权限分组命名空间
- `type` \<str\> 资源类型，可选值为 `DATA`、`API`、`MENU`、`UI`、`BUTTON`
- `actions` \<Array<{ name: str, description: str }>\> 资源操作对象数组。其中 name 为操作名称，填写一个**动词**，description 为操作描述，填写描述信息
- `description` \<str\> 资源描述信息

#### 示例

```python
daat =  management_client.acl.create_resource(
  code='book',
  type='DATA',
  description='book',
  actions=[
    {
      name: 'book:write',
      description: '图书写入操作',
    },
  ],
  namespace='600a8f4e37708b363024a3ca',
)
```

#### 返回数据

```json
{
  "userPoolId": "600a8f29cead8fc0127f9da6",
  "code": "book",
  "actions": [
    {
      "name": "book:write",
      "description": "图书写入操作"
    }
  ],
  "type": "DATA",
  "description": "book",
  "namespaceId": 22997,
  "createdAt": "2021-04-06T11:49:07.656Z",
  "updatedAt": "2021-04-06T11:49:07.656Z",
  "id": "606c4ab3d7fb66a8e1517132",
  "apiIdentifier": null
}
```

## 更新资源

> 更新一个资源

```python
def update_resource(self, namespace, code, resource_type=None, actions=None, description=None)
```

#### 参数

- `code` \<str\> 资源标识符
- `namespace` \<str\> 资源所在的权限分组标识
- `type` \<str\> 资源类型，可选值为 `DATA`、`API`、`MENU`、`UI`、`BUTTON`
- `actions` \<Array<{ name: str, description: str }>\> 资源操作对象数组。其中 name 为操作名称，填写一个**动词**，description 为操作描述，填写描述信息
- `description` \<str\> 资源描述信息

#### 示例

```python
updated = management_client.acl.update_resource(
  code='code',
  description='新的描述',
  type='DATA',
  actions=[
    { name: 'write', description: '图书写入操作2' },
    { name: 'read', description: '图书读取操作2' },
  ],
  namespace='600a8f4e37708b363024a3ca',
})
```

#### 返回数据

```json
{
  "id": "606c4ab3d7fb66a8e1517132",
  "createdAt": "2021-04-06T11:49:07.656Z",
  "updatedAt": "2021-04-06T11:59:26.879Z",
  "userPoolId": "600a8f29cead8fc0127f9da6",
  "code": "book",
  "actions": [
    {
      "name": "book:write",
      "description": "图书写入操作2"
    },
    {
      "name": "book:read",
      "description": "图书读取操作2"
    }
  ],
  "type": "DATA",
  "description": "新的描述",
  "namespaceId": 22997,
  "apiIdentifier": null
}
```

## 删除资源

> 删除资源

```python
def delete_resource(self, namespace, code)
```

#### 参数

- `code` \<str\> 资源标识符
- `namespace` \<str\> 资源所在的权限分组标识

#### 示例

```python
deleted = managementClient.acl.delete_resource(
  code,
  '600a8f4e37708b363024a3ca'
)
```

#### 返回数据

```python
bool
```

## 授权资源

> 将一个（类）资源授权给用户、角色、分组、组织机构，且可以分别指定不同的操作权限。

```python
def authorize_resource(self, namespace, resource, opts)
```

#### 参数

- `namespace` \<str\> 权限分组 code
- `resource` \<str\> 资源，如一类资源可以表示为 `order`，某一个资源可以表示为 `order:123`
- `opts` \<list\> 一个数组
  - `targetType` \<str\> 授权对象类型，如 USER, ROLE, GROUP, ORG
  - `targetIdentifier` \<str\> 授权对象唯一标志符，如用户 ID、角色 code、分组 code、组织机构 ID
  - `actions` \<str\> 授权的操作列表，可选。MENU、Button 类型数据不需要指定 actions

#### 示例

- 1. 将菜单类型数据 `menuA` 授权给用户 `USER_ID` 和部门 `DEPARTMENT_ID`：

```python
success = management_client.acl.authorize_resource(
    namespace='default',
    resource='menuA'
    opts=[
        {
            'targetType': 'USER',
            'targetIdentifier': 'USER_ID'
        },
        {
            'targetType': 'ORG',
            'targetIdentifier': 'DEPARTMENT_ID'
        }
    ]
)
```

- 2. 将服务器（ESC）1 的开机权限授予角色 A，开机、关机权限授权给角色 B：

```python
success = management_client.acl.authorize_resource(
    namespace='default',
    resource='ecs:1'
    opts=[
        {
            'targetType': 'ROLE',
            'targetIdentifier': 'A',
            'actions': [
                'ecs:Start'
            ]
        },
        {
            'targetType': 'ROLE',
            'targetIdentifier': 'B',
            'actions': [
                'ecs:Stop'
            ]
        },
    ]
)
```

## 授权资源（快捷操作）

> 允许某个用户对某个资源进行某个操作

```python
def allow(self, resource, action, namespace, user_id=None)
```

#### 参数

- `userId` \<str\> 用户 ID
- `action` \<str\> 操作名称，推荐使用 \<resourceType\>:\<actionName\> 的格式，如 `books:edit`, `books:list`
- `resource` \<str\> 资源名称, 必须为 \<resourceType\>:\<resourceId\> 格式或者为 _, 如 `_`,`books:123`,`books:\*`
- `namespace` \<str\> 权限分组的 code，详情请见[使用权限分组管理权限资源](/guides/access-control/resource-group.md)；

#### 示例

```python
# 允许某个用户操作某个角色
management_client.acl.allow(
    resource='books:123',
    action='books:edit',
    userId='USERID',
    namespace='default'
)
```

## 取消授权资源

> 取消对某个资源的操作权限

```python
def revoke_resource(self, namespace, resource, opts)
```

#### 参数

- `namespace` \<str\> 权限分组 code
- `resource` \<str\> 资源，如一类资源可以表示为 `order`，某一个资源可以表示为 `order:123`
- `opts`\<list\> 一个数组

  - `targetType` \<str\> 授权对象类型，如 USER, ROLE, GROUP, ORG
  - `targetIdentifier` \<str\> 授权对象唯一标志符，如用户 ID、角色 code、分组 code、组织机构 ID

- 1. 取消用户 `USER_ID` 和部门 `DEPARTMENT_ID` 对 `menuA` 资源权限：

```python
success = management_client.acl.revoke_resource(
    namespace='default',
    resource='menuA'
    opts=[
        {
            'targetType': 'USER',
            'targetIdentifier': 'USER_ID'
        },
        {
            'targetType': 'ORG',
            'targetIdentifier': 'DEPARTMENT_ID'
        }
    ]
)
```

- 2. 取消用户 A 对服务器（ESC）1 资源的权限

```python
success = management_client.acl.revoke_resource(
    namespace='default',
    resource='ecs:1'
    opts=[
        {
            'targetType': 'ROLE',
            'targetIdentifier': 'A',
        },
    ]
)
```

## 判断某个用户是否对某个资源有某个操作权限

> 判断某个用户是否对某个资源有某个操作权限

```python
def is_allowed(self, user_id, action, resource, namespace)
```

#### 参数

- `userId` \<str\> 用户 ID
- `action` \<str\> 操作名称，推荐使用 \<resourceType\>:\<actionName\> 的格式，如 `books:edit`, `books:list`
- `resource` \<str\> 资源名称, 必须为 \<resourceType\>:\<resourceId\> 格式或者为 _, 如 `_`,`books:123`,`books:\*`
- `namespace` \<str\> 权限分组的 code，详情请见[使用权限分组管理权限资源](/guides/access-control/resource-group.md)

#### 示例

```python
is_allowed = management_client.acl.is_allowed(
    userId='USERID',
    resource='books:*',
    action='books:edit',
    namespace='default'
)
```

## 获取用户被授权的所有资源列表

> 获取一个用户被授权的所有资源，用户被授权的所有资源里面包括从角色、分组、组织机构继承的资源

```python
def list_authorized_resources(self, user_id, namespace, resource_type=None)
```

#### 参数

- `user_id` \<str\> 用户 ID
- `namespace` \<str\> 权限分组的 code，详情请见[使用权限分组管理权限资源](/guides/access-control/resource-group.md)
- `resource_type` \<str\> 资源类型，可选值包含 DATA、API、MENU、UI、BUTTON

#### 示例

```python
data = management_client.users.list_authorized_resources(
  user_id='xxx',
  namespace='default',
  resource_type='DATA'
)
```

#### 示例数据

- `type` 为资源类型，一共有以下几种资源类型
  - `DATA`: 数据类型
  - `API`: API 类型数据
  - `MENU`: 菜单类型数据
  - `BUTTON`: 按钮类型数据
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

## 获取角色被授权的所有资源列表

> 获取一个角色被授权的所有资源

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

- `type` \<str\>为资源类型；
- `code` \<str\> 资源描述符，如果是 `DATA` 类型资源，格式为 `resourceType:resourceId`，如 `books:*` 表示所有书籍，`books:1` 表示 ID 为 1 的书籍
- `actions` \<str\> 用户被授权对该资源的操作。

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

## 获取具备某些资源操作权限的主体

> 传入权限分组、资源标识、资源类型、操作权限项、主体类型，返回具备资源操作权限的主体标识符

```python
def get_authorized_targets(self, namespace, resource_type, resource, actions=None, target_type=None)
```

#### 参数

- `namespace` \<str\> 权限分组的 code，详情请见[使用权限分组管理权限资源](/guides/access-control/resource-group.md)
- `resource_type` \<str\> 资源类型，现有资源类型如下：
  - `DATA`: 数据类型
  - `API`: API 类型数据
  - `MENU`: 菜单类型数据
  - `BUTTON`: 按钮类型数据
- `resource` \<str\> 资源 code
- `actions` \<dict\> 操作
  - `actions.op` \<str\> 可选值为 `AND`、`OR`，表示 list 中的操作关系是和还是或
  - `actions.list` \<str[]\> 操作，例如 `['read', 'write']`
- `targetType` \<str\> 主体类型，可选值为 `USER`、`ROLE`、`ORG`、`GROUP`，含义为用户、角色、组织机构节点、用户分组

#### 示例

- 获取权限分组 6063f88dabb536e9a23a6c80 中，具备 DATA 类型资源 book 的 write 或 read 权限的用户

```python
res = management_client.acl.get_authorized_targets(
  namespace='6063f88dabb536e9a23a6c80',
  resource='book',
  resourceType='DATA',
  actions={
    'op': 'OR',
    'list': ['write', 'read'],
  },
  targetType='USER',
)
```

#### 示例数据

- `targetType` \<str\> 为主体类型
- `targetIdentifier` \<str\> 主体标识符，可能是用户 ID、角色 ID、组织结构节点 ID、用户分组 ID
- `actions` \<str\> 用户被授权对该资源的操作

```json
{
  "totalCount": 1,
  "list": [
    {
      "targetType": "USER",
      "targetIdentifier": "6063fcd01d0d2e39d4596904",
      "actions": ["write"]
    }
  ]
}
```

## 编程访问账号列表

> 编程访问账号列表

```python
def programmatic_access_account_list(self, app_id, page=1, limit=10)
```

#### 参数

- `app_id` \<str\> 角色 code
- `page` \<int\> 页码，默认为 1
- `limit` \<int\> 每页个数，默认为 10

#### 示例

```python
management.acl.programmatic_access_account_list("6139c4d24e78a4d706b7545b")
```

#### 示例数据

```json
{
  "message": "获取编程访问账号列表成功",
  "code": 200,
  "data": {
    "totalCount": 1,
    "list": [
      {
        "userId": null,
        "updatedAt": "2021-09-15T07:06:34.151Z",
        "enabled": true,
        "secret": "msjjnzks2wwcj58ts632j5hpdxej",
        "appId": "6139c4d24e78a4d706b7",
        "remarks": null,
        "tokenLifetime": 600,
        "id": "61419b782f9c3925662e",
        "createdAt": "2021-09-15T07:06:32.603Z"
      }
    ]
  }
}
```

## 添加编程访问账号

> 添加编程访问账号

```python
def create_programmatic_access_account(self, app_id, remark=None, token_lifetime=600)
```

#### 参数

- `app_id` \<str\> 应用 ID
- `remark` \<str\> 备注
- `token_lifetime` \<int\> Token 过期时间 默认为 600

#### 示例

```python
management.acl.create_programmatic_access_account(app_id='6139c4d24e78a4d706b7545b', remark='xx')
```

#### 示例数据

```json
{
  "message": "创建编程访问账号成功",
  "code": 200,
  "data": {
    "appId": "6139c4d24e78a4d706b754",
    "enabled": true,
    "tokenLifetime": 600,
    "userId": null,
    "secret": "8e202f761f11bdc8a6fa36992115",
    "updatedAt": "2021-09-24T03:38:01.148Z",
    "remarks": null,
    "id": "614d4819fc4f70b4b8b6d",
    "createdAt": "2021-09-24T03:38:01.148Z"
  }
}
```

## 禁用编程访问账号

> 禁用编程访问账号

```python
def disable_programmatic_access_account(self, programmatic_access_account_id)
```

#### 参数

- `programmatic_access_account_id` \<str\> 编程账号 ID

#### 示例

```python
management.acl.disable_programmatic_access_account("61418fad9d4357a5308e5ecd")
```

#### 示例数据

```json
{
  "message": "修改编程访问账号成功",
  "code": 200
}
```

## 删除编程访问账号

> 删除编程访问账号

```python
def delete_programmatic_access_account(self, programmatic_access_account_id)
```

#### 参数

- `programmatic_access_account_id` \<str\> 编程账号 ID

#### 示例

```python
management.acl.delete_programmatic_access_account("61418fad9d4357a5308e5ecd")
```

#### 示例数据

```json
{
  "message": "删除编程访问账号成功",
  "code": 200
}
```

## 启用编程访问账号

> 启用编程访问账号

```python
def enable_programmatic_access_account(self, programmatic_access_account_id)
```

#### 参数

- `programmatic_access_account_id` \<str\> 编程账号 ID

#### 示例

```python
management.acl.enable_programmatic_access_account("61418fad9d4357a5308e5ecd")
```

#### 示例数据

```json
{
  "message": "修改编程访问账号成功",
  "code": 200
}
```

## 刷新编程访问账号密钥

> 刷新编程访问账号密钥

```python
def refresh_programmatic_access_account_secret(self, programmatic_access_account_id, secret=get_random_string_secret(32))
```

#### 参数

- `programmatic_access_account_id` \<str\> 编程账号 ID
- `secret` \<str\> 秘钥

#### 示例

```python
management.acl.refresh_programmatic_access_account_secret(account['data']['id'])
```

#### 示例数据

```json
{
  "message": "修改编程访问账号成功",
  "code": 200,
  "data": {
    "userId": null,
    "updatedAt": "2021-09-24T03:45:05.780Z",
    "enabled": true,
    "secret": "xjefjjst8nrdxk5haza248b4atepwj",
    "appId": "6139c4d24e78a4d706b754",
    "remarks": null,
    "tokenLifetime": 600,
    "id": "614d49c1c1435e85d2a600",
    "createdAt": "2021-09-24T03:45:05.648Z"
  }
}
```

## 根据 ID 获取单个资源

> 根据 ID 获取单个资源

```python
def get_resource_by_id(self, id)
```

#### 参数

- `id` \<str\> 主键

#### 示例

```python
management.acl.get_resource_by_id('6141a1bc2129d0b83415227f')
```

#### 示例数据

```json
{
  "message": "",
  "code": 200,
  "data": {
    "code": "eyqcalgaeo",
    "description": null,
    "userPoolId": "61384d3e302f1f75e69ce9",
    "apiIdentifier": null,
    "actions": [
      {
        "name": "fwstxqxggy",
        "description": "uzzlxbbuea"
      }
    ],
    "namespaceId": 48070,
    "updatedAt": "2021-09-15T07:33:16.932Z",
    "type": "DATA",
    "id": "6141a1bc2129d0b8341522",
    "createdAt": "2021-09-15T07:33:16.932Z"
  }
}
```

## 根据 Code 获取单个资源

> 根据 Code 获取单个资源

```python
def get_resource_by_code(self, namespace, code)
```

#### 参数

- `namespace` \<str\> 命名空间
- `code` \<str\> 资源 Code

#### 示例

```python
management.acl.get_resource_by_code(namespace='gvymeeehxt', code='eyqcalgaeo')
```

#### 示例数据

```json
{
  "message": "",
  "code": 200,
  "data": {
    "code": "eyqcalgaeo",
    "description": null,
    "userPoolId": "61384d3e302f1f75e69ce9",
    "apiIdentifier": null,
    "actions": [
      {
        "name": "fwstxqxggy",
        "description": "uzzlxbbuea"
      }
    ],
    "namespaceId": 48070,
    "updatedAt": "2021-09-15T07:33:16.932Z",
    "type": "DATA",
    "id": "6141a1bc2129d0b8341522",
    "createdAt": "2021-09-15T07:33:16.932Z"
  }
}
```

## 启用应用访问控制策略

> 启用应用访问控制策略

```python
def enable_application_access_policies(self, app_id, target_type, target_identifiers, namespace, inherit_by_children)
```

#### 参数

- `app_id` \<str\> 应用 ID
- `target_type` \<str\> 对象类型
- `target_identifiers` \<str[]\> 对象 ID 集合
- `namespace` \<str\> 命名空间
- `inherit_by_children` \<bool\> 是否内联子类

#### 示例

```python
management.acl.enable_application_access_policies(namespace='61360547f4807f63584fa152',
                                                                   app_id='61360547f4807f63584fa152',
                                                                   inherit_by_children=False,
                                                                   target_type='USER',
                                                                   target_identifiers=[
                                                                       '613ad7081436dc0f42d8ee65'
                                                                   ])
```

## 停用应用访问控制策略

> 停用应用访问控制策略

```python
def disable_application_access_policies(self, app_id, target_type, target_identifiers, namespace, inherit_by_children)
```

#### 参数

- `app_id` \<str\> 应用 ID
- `target_type` \<str\> 对象类型
- `target_identifiers` \<str[]\> 对象 ID 集合
- `namespace` \<str\> 命名空间
- `inherit_by_children` \<bool\> 是否内联子类

#### 示例

```python
management.acl.disable_application_access_policies(namespace='61360547f4807f63584fa152',
                                                                   app_id='61360547f4807f63584fa152',
                                                                   inherit_by_children=False,
                                                                   target_type='USER',
                                                                   target_identifiers=[
                                                                       '613ad7081436dc0f42d8ee65'
                                                                   ])
```

## 删除应用访问控制策略

> 删除应用访问控制策略

```python
def delete_application_access_policies(self, app_id, target_type, target_identifiers, namespace, inherit_by_children)
```

#### 参数

- `app_id` \<str\> 应用 ID
- `target_type` \<str\> 对象类型
- `target_identifiers` \<str[]\> 对象 ID 集合
- `namespace` \<str\> 命名空间
- `inherit_by_children` \<bool\> 是否内联子类

#### 示例

```python
management.acl.delete_application_access_policies(namespace='61360547f4807f63584fa152',
                                                                   app_id='61360547f4807f63584fa152',
                                                                   inherit_by_children=False,
                                                                   target_type='USER',
                                                                   target_identifiers=[
                                                                       '613ad7081436dc0f42d8ee65'
                                                                   ])
```

## 配置「允许主体（用户、角色、分组、组织机构节点）访问应用」的控制策略

> 配置「允许主体（用户、角色、分组、组织机构节点）访问应用」的控制策略

```python
def allow_access_application(self, app_id, target_type, target_identifiers, namespace, inherit_by_children)
```

#### 参数

- `app_id` \<str\> 应用 ID
- `target_type` \<str\> 对象类型
- `target_identifiers` \<str[]\> 对象 ID 集合
- `namespace` \<str\> 命名空间
- `inherit_by_children` \<bool\> 是否内联子类

#### 示例

```python
management.acl.allow_access_application(namespace='61360547f4807f63584fa152',
                                                                   app_id='61360547f4807f63584fa152',
                                                                   inherit_by_children=False,
                                                                   target_type='USER',
                                                                   target_identifiers=[
                                                                       '613ad7081436dc0f42d8ee65'
                                                                   ])
```

#### 示例数据

```json
{
  "message": "允许访问成功",
  "code": 200
}
```

## 配置「拒绝主体（用户、角色、分组、组织机构节点）访问应用」的控制策略

> 配置「拒绝主体（用户、角色、分组、组织机构节点）访问应用」的控制策略

```python
def deny_access_application(self, app_id, target_type, target_identifiers, namespace, inherit_by_children)
```

#### 参数

- `app_id` \<str\> 应用 ID
- `target_type` \<str\> 对象类型
- `target_identifiers` \<str[]\> 对象 ID 集合
- `namespace` \<str\> 命名空间
- `inherit_by_children` \<bool\> 是否内联子类

#### 示例

```python
management.acl.deny_access_application(namespace='61360547f4807f63584fa152',
                                                                   app_id='61360547f4807f63584fa152',
                                                                   inherit_by_children=False,
                                                                   target_type='USER',
                                                                   target_identifiers=[
                                                                       '613ad7081436dc0f42d8ee65'
                                                                   ])
```

#### 示例数据

```json
{
  "message": "拒绝访问成功",
  "code": 200
}
```

## 更改默认应用访问策略（默认拒绝所有用户访问应用、默认允许所有用户访问应用）

> 更改默认应用访问策略（默认拒绝所有用户访问应用、默认允许所有用户访问应用）

```python
def update_default_application_access_policy(self, app_id, default_strategy)
```

#### 参数

- `app_id` \<str\> 应用 ID
- `default_strategy` \<str\> 默认策略 取值范围 ALLOW_ALL,DENY_ALL

#### 示例

```python
management.acl.update_default_application_access_policy( app_id='6139c4d24e78a4d706b7545b',
                                                                          default_strategy='ALLOW_ALL')
```

#### 示例数据

```json
{
  "message": "更新应用成功！",
  "code": 200,
  "data": {
    "oidcJWEConfig": null,
    "isOfficial": false,
    "protocol": "oidc",
    "adConnections": [],
    "casConfig": null,
    "isDemo": false,
    "updatedAt": "2021-09-23T07:13:21.225Z",
    "logo": "https://files.authing.co/authing-console/default-app-logo.png",
    "enableDeviceMutualExclusion": false,
    "id": "6139c4d24e78a4d706b75b",
    "isDeleted": false,
    "registerTabs": ["email", "phone"],
    "disabledCasConnections": [],
    "ssoPageCustomizationSettings": null,
    "isIntegrate": false,
    "oauthProviderEnabled": false,
    "userPoolId": "61384d3e302f1f75e69ce",
    "jwks": {
      "keys": [
        {
          "use": "sig",
          "e": "AQAB",
          "d": "DSyYiMZcqFQ_plqFTJ1CXcJ0Vs2x3nMPpt9gShVdh6HgnLTfRbBALIPlyEC0PYL_JnpgZW92qff1q-9YB39zbvUes4ZdrhCPpONyhTj5UVWCb2xvguebzLgdQmMM1GIWP8y7kAL9mk01bNr7yj3Qt0EjIEaXiiwvclg-YvGjyvCHRfCPV5181Ia3Rw_zYvFNXNYqvAKEKrKuk-5fZbz0Mw3CzdMkc4vqCvMk7eGnTaO-uaRZZe3ZKBkStf27N4KOwHT1mBd8XCAK0aWfyG2-zU6hLJRTPVEpOxkWyq7RRwB4_oGUUpqEzxY_ll8yaqHLh3nWY0i9Kny1u6eZjxTh-Q",
          "alg": "RS256",
          "n": "xczXb-UbE9FQjzqvxujGLIDqMqyVNbfATdP277vx-6AQzsOIReF-qqu9YmG8rzJM6nLEdf4DBDNa1xB6Y8n7GPU_UcJ9alf0lwZbpeLxLhZj38tjfM-KBM3auqMdHW_DHcrTw5_pUfq0pAE1-Dw6tgkr5KdBFfoc4tVn0Y1TuaXTBlabmQAJgcqc0CUlKfbUnbBbsPGbA2w3yUnOBB74XBoXSRYr-zRQBJ8aZ0IOsqovrkAFoSBMzmGxwR2IKlyBxYyWZU8_x8Q_l3BUsQRCPXuOkUn_G2aVeV3biT9u6FGKH-tLxfgeC_LFVsbNUjgIT5mHBrPu2lQwu2BHCeAbKw",
          "q": "xf779mhxY66ed2CMxILWQOOdN3uraBML-3kxBB2oNM27sBawyaMylLEvvYx5gyefZbAf0jbYeM4iB_-uOlR5O5vKy6srzekJmfU-aqtgOM8fJrUpywZsU5xr_jWrgxn3DUp3vHgzVTfaGXe81gyzt8AtP6plpd3MXOnfRql0j78",
          "p": "_78q8phf8AOkgQ7A4JI1QxPGkmXhBS5CQAfJTQgMfyv1jFh2QjkE3TuN3fAn5X4T-bWw00YyiKQZQnjcYLTDw7p1ms70NNcFx1_leFvDooAMJYQuwkQ5gbdGFwzA6B8vf6ZwwTPqAIJHUN8NNDea04GPecp_o_7TPHv5oOpzz5U",
          "kty": "RSA",
          "qi": "ONZxbv_aFoh7WIBbYthhbg8KkTg6FMmgkNbXPCcSdWwbetVBXH7Xky-rwg2-ZJbc7lalFnTaTeSi64un4G-YMi7css5zstORCGT0K-MWi39WazE2c783oCwtCH5eZs1PnGWty6adpLFx2b2ESymB9h3nPxWF3NHKqCuTqxLUnPg",
          "kid": "JjhmE834pqVVPHQOYxIu244hrNITJw9SmKVddwxSvN8",
          "dp": "juU3j_kHkcnXPq0Jo_DNhb8k8mOuSQDBz5kKJtpacSwUtOgwm2vUhfBioiEviZDahGm6dTIBxks6OePh7r7Rqykh0O_VjzidZ_ry8j8DnmZBYyzqG22XXB0VMofTuV7DYWWUFr90_ffM9SjL7eMrxQXdLsWwb-dQC7mRjxGwx8k",
          "dq": "r3bkFh_C9QMH_mU6-t-0Pjc42bWoVogio05oiOw7Z-g2_7tsGpWdOra3xzRZb0jK8tQdry7Zsl2DPTFyVtELyy6qjsn3_PgbgSwcj22mzVGImsYL7peXopVKAzPO9lUpYsbuy8B-RXREvTMmz07caehOcVBx2odwF5tPOpDr8oM"
        }
      ]
    },
    "oauthConfig": {
      "introspection_endpoint_auth_method": "client_secret_post",
      "redirect_uris": ["https://www.authing.cn"],
      "access_token_lifetime": 1209600,
      "refresh_token_lifetime": 2592000,
      "grants": ["authorization_code"],
      "revocation_endpoint_auth_method": "client_secret_post",
      "id": "6139c4d24e78a4d706b7545b"
    },
    "extendsFields": [],
    "skipMfa": false,
    "oidcProviderEnabled": true,
    "createdAt": "2021-09-09T08:24:50.150Z",
    "template": null,
    "isDefault": false,
    "extendsFieldsEnabled": false,
    "ssoEnabled": false,
    "samlConfig": null,
    "description": null,
    "disabledSocialConnections": null,
    "samlProviderEnabled": false,
    "enableSubAccount": true,
    "disabledOauth2Connections": [],
    "loginRequireEmailVerified": false,
    "disabledSamlConnections": [],
    "oidcConfig": {
      "token_endpoint_auth_method": "client_secret_post",
      "post_logout_redirect_uris": [],
      "refresh_token_expire": 2592000,
      "cas_expire": 1209600,
      "access_token_expire": 1209600,
      "skip_consent": true,
      "grant_types": ["authorization_code", "password", "refresh_token"],
      "authorization_code_expire": 600,
      "id_token_signed_response_alg": "HS256",
      "redirect_uris": ["https://www.authing.cn"],
      "response_types": ["code"],
      "client_id": "6139c4d24e78a4d706b7545b",
      "id_token_expire": 1209600
    },
    "defaultLoginTab": "password",
    "redirectUris": ["https://www.authing.cn"],
    "showAuthorizationPage": false,
    "casProviderEnabled": false,
    "passwordTabConfig": {
      "enabledLoginMethods": [
        "username-password",
        "email-password",
        "phone-password"
      ]
    },
    "name": "python sdk unittest xtgf",
    "qrcodeScanning": {
      "redirect": false,
      "interval": 1500
    },
    "disabledAzureAdConnections": [],
    "agreementEnabled": false,
    "ext": null,
    "registerDisabled": false,
    "css": "/* \n  Edit login page css\n  eg：\n  .authing-guard-layout {\n    background: black !important;\n  }\n  Change the background color\n*/",
    "disabledOidcConnections": [],
    "ldapConnections": null,
    "identifier": "python-sdk-unittest-tlhs",
    "permissionStrategy": {
      "denyPolicyId": "6141af53fd36e046da0e2b",
      "defaultStrategy": "ALLOW_ALL",
      "enabled": true,
      "allowPolicyId": "6141af531fad402eac9f79"
    },
    "logoutRedirectUris": [],
    "loginTabs": ["phone-code", "password"],
    "defaultRegisterTab": "email"
  }
}
```
