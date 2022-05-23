---
meta:
  - name: description
    content: 管理策略
---

# 管理策略

<LastUpdated/>

> {{$localeConfig.brandName}} 的访问控制与权限管理模型核心围绕着两个点来设计：**资源（Resource）**和**策略（Policy）**。策略定义了对某个（类）资源的某个（些）操作权限，将策略授权给用户（或角色），就能知道用户（或角色）是否具备对某个资源的某个操作具备操作权限。

## 添加策略
> 添加策略
```python
def create(self, code, statements, description=None)
```


#### 参数

- `code` \<str\> 策略唯一标志
- `statements` \<dict[]\>
- `description` \<str\> 描述

#### 示例

```python
code = 'PolicyCode'
statements = [
    {
        'resource': 'book:123',
        'actions': ['books:read'],
        'effect': 'ALLOW'
    }
]
policy = management_client.policies.create(
    code=code,
    statements=statements
)
```

## 删除策略
> 删除策略，系统内置策略由 {{$localeConfig.brandName}} 官方维护，不能修改和删除。
```python
def delete(self, code)
```

#### 参数

- `code` \<str\> 策略唯一标志

#### 示例

```python
management_client.policies.delete('PolicyCode')
```

## 批量删除策略
> 批量删除策略，系统内置策略由 {{$localeConfig.brandName}} 官方维护，不能修改和删除。
```python
def delete_many(self, code_list)
```
#### 参数

- `code_list` \<list\> 策略唯一标志列表

#### 示例

```python
management_client.policies.delete_many(['PolicyCode']])
```

## 修改策略
> 修改策略，系统内置策略由 {{$localeConfig.brandName}} 官方维护，不能修改和删除。
```python
def update(self, code, statements, description=None)
```
#### 参数

- `code` \<str\> 策略唯一标志
- `description` \<str\> 描述
- `statements` \<dict\> 

#### 示例

```python
newStatements = [
    {
        'resource': 'book:123',
        'actions': ['books:read', 'books:update'],
        'effect': 'ALLOW'
    }
]
policy = management_client.policies.update(
    code='PolicyCode',
    statements=newStatements
)
```

## 获取策略详情
> 获取策略详情
```python
def detail(self, code)
```
#### 参数
- `code` \<str\> 策略唯一标志
#### 示例

```python
code = 'PolicyCode'
policy = management_client.policies.detail(code)
```

## 获取策略列表
> 获取策略列表
```python
def list(self, page=1, limit=10)
```
#### 参数
 
- `page` \<int\>  页号 默认值为 : `1`
- `limit` \<int\>  每页记录数 默认值为 : `10`

#### 示例

```python
data = management_client.policies.list()
totalCount, _list = data['totalCount'], data['list']
# totalCount 总数
# _list 当前页列表
```

## 获取策略授权记录
> 获取策略授权记录
```python
def list_assignments(self, code, page=1, limit=10)
```
 

#### 参数

- `code` \<str\> 策略唯一标志
- `page` \<int\>  页号 默认值为 : `1`
- `limit` \<int\>  每页记录数 默认值为 : `10`

#### 示例

```python
data = management_client.policies.list_assignments(
    code='PolicyCode'
)
totalCount, _list = data['totalCount'], data['list']
# totalCount 总数
# _list 当前页列表
```

## 将策略授权给用户、角色、分组、组织机构
> 将策略授权给用户、角色、分组、组织机构，可以将策略授权给用户和角色，授权给角色的策略会被该角色下的所有用户继承 。此接口可以进行批量操作。
```python
def add_assignments(self, policies, targetType, targetIdentifiers)
```
#### 参数

- `policies` \<str[]\> 策略 code 列表
- `targetType` \<str\> 可选值为 USER (用户) 和 ROLE (角色)
- `targetIdentifiers` \<str[]\> 用户 id 列表和角色 code 列表

#### 示例

```python
management_client.policies.add_assignments(
    policies=['PolicyCode'],
    targetType='USER', # 授权给用户
    targetIdentifiers=['USERID'] # 用户的 ID
)

management_client.policies.add_assignments(
    policies=['PolicyCode'],
    targetType='ROLE', # 授权给角色
    targetIdentifiers=['PolicyCode'] # 角色的唯一标志
)
```

## 撤销策略授权
> 撤销策略授权，此接口可以进行批量操作。
```python
def remove_assignments(self, policies, targetType, targetIdentifiers)
```


#### 参数

- `policies` \<str[]\> 策略 code 列表
- `targetType` \<str\> 可选值为 USER (用户) 和 ROLE (角色)
- `targetIdentifiers` \<str[]\> 用户 id 列表和角色 code 列表

#### 示例

```python
management_client.policies.remove_assignments(
    policies=['PolicyCode'],
    targetType='ROLE',
    targetIdentifiers=['RoleCode']
)
```


## 设置策略授权状态为开启
> 设置策略授权状态为开启
```python
def enable_assignment(self, policy, target_type, target_identifier, namespace=None)
```
#### 参数
- `policy` \<str\>  策略
- `target_type` \<str\>  策略类型 可选值为 USER (用户), ROLE (角色), GROUP（分组）, ORG（组织机构）
- `target_identifier` \<str\> 目标ID
- `namespace` \<str\>命名空间
#### 示例

```python
management.policies.enable_assignment(code, 
                                        target_type='ROLE', 
                                        target_identifier=role['id'])
```

## 设置策略授权状态为关闭
> 设置策略授权状态为关闭
```python
def disable_assignment(self, policy, target_type, target_identifier, namespace=None)
```
#### 参数
- `policy` \<str\>  策略
- `target_type` \<str\>  策略类型 可选值为 USER (用户), ROLE (角色), GROUP（分组）, ORG（组织机构）
- `target_identifier` \<str\> 目标ID
- `namespace` \<str\>命名空间
#### 示例

```python
management.policies.disable_assignment(code, target_type='ROLE',
                                                    target_identifier=role['id'])
```
