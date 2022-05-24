---
meta:
  - name: description
    content: 使用管理模块
---

# 管理角色

<LastUpdated/>


> 此模块用于管理 {{$localeConfig.brandName}} 角色，可以进行角色的增删改查、角色添加/删除用户、角色添加/删除策略 等操作。

## 创建角色

- managementClient.roles().create(code)
- managementClient.roles().create(code, description)
- managementClient.roles().create(code, description, parent)
- managementClient.roles().create(code, description, parent, namespace)
- managementClient.roles().create(param)

> 创建角色

#### 参数

- `code` \<String\> 角色唯一标志符
- `userIds` \<List\<String\>\> 用户唯一标志符集合
- `param` \<RevokeRoleParam\> 请求参数对象
- `param.namespace` \<String\> 权限分组的 Code，详情请见[使用权限分组管理权限资源](/guides/access-control/resource-group.md)。
- `param.roleCode` \<String\> 角色唯一标志符
- `param.roleCodes` \<List\<String\>\> 角色唯一标志符集合
- `param.userIds` \<List\<String\>\> 用户唯一标志符集合
- `param.groupCodes` \<List\<String\>\> 用户分组唯一标志符集合
- `param.nodeCodes` \<List\<String\>\> 组织机构节点唯一标志符集合


#### 示例

```java
Role role = managementClient.roles().create(new CreateRoleParam("code")).execute();
```

## 删除角色

managementClient.roles().delete(code)

> 删除角色

#### 参数

- `code` \<String\> 角色唯一标志符

#### 示例

```java
managementClient.roles().delete("code").execute();
```

## 批量删除角色

managementClient.roles().deleteMany(codeList)

> 批量删除角色

#### 参数

- `codeList` \<List\<String\>\> 角色唯一标志符列表

#### 示例

```java
ArrayList<String> list = new ArrayList<String>();
list.add("code");
managementClient.roles().deleteMany(list).execute();
```

## 修改角色

- managementClient.roles().update(code, description, newCode)
- managementClient.roles().update(input)

> 修改角色

#### 参数

- `code` \<String\> 角色唯一标志符
- `description` \<String\> 描述信息
- `newCode` \<String\> 新的唯一标志符
- `input` \<UpdateRoleParam\>
- `input.code` \<String\> 角色唯一标志符
- `input.description` \<String\> 描述信息
- `input.newCode` \<String\> 新的唯一标志符
- `input.namespace` \<String\> 权限分组的 Code，详情请见[使用权限分组管理权限资源](/guides/access-control/resource-group.md)。

#### 示例

```java
Role role = managementClient.roles()
        .update(new UpdateRoleParam("code").withDescription("desc")).execute();
```

## 查询角色详情

managementClient.roles().findByCode(param)

> 获取角色详情

#### 参数

- `param` \<RoleParam\> 查询角色详情请求入参对象
- `param.code` \<String\> 角色唯一标识
- `param.namespace` \<String\> 权限分组的 Code，详情请见[使用权限分组管理权限资源](/guides/access-control/resource-group.md)。

#### 示例

```java
Role role = managementClient.roles().findByCode(param).execute();
```

## 获取角色列表

managementClient.roles().list(page, limit)

> 获取角色列表

#### 参数

- `page` \<Integer\> 页码数，默认值：`1`。
- `limit` \<Integer\> 每页个数，默认值：`10`。

#### 示例

```java
PaginatedRoles roles = managementClient.roles().list().execute();
```

## 获取用户列表

managementClient.roles().listUsers(code)


> 获取用户列表，此方法会获取默认权限组下的角色用户列表，如果想自定义权限组，请使用下面的 managementClient.roles().listUsers(param) 方法，传入 namespace 参数。

#### 参数

- `code` \<String\> 角色唯一标志符

#### 示例

```java
PaginatedUsers users = managementClient.roles().listUsers("code").execute();
```
<br/>

managementClient.roles().listUsers(param)

> 获取用户列表，此方法可传入自定义 namespace 参数。

#### 参数

- `param` \<RoleWithUsersParam\> 
- `param.code` \<String\> 必填，角色唯一标志符
- `param.namespace` \<String\> 可选，权限分组的 Code，详情请见[使用权限分组管理权限资源](/guides/access-control/resource-group.md)。
- `page` \<Integer\> 可选，页码数，默认值：`1`。
- `limit` \<Integer\> 可选，每页个数，默认值：`10`。


#### 示例

```java
RoleWithUsersParam param = new RoleWithUsersParam(code, namespace);
PaginatedUsers users = this.rolesManagementClient.listUsers(param).execute();
```

## 添加用户

managementClient.roles().addUsers(code, userIds)

> 添加用户

#### 参数

- `code` \<String\> 角色唯一标志符
- `userIds` \<List\<String\>\> 用户 ID 列表

#### 示例

```java
ArrayList<String> userIds = new ArrayList<>();
userIds.add("userId");
managementClient.roles().addUsers("code", userIds).execute();
```

## 移除用户

- managementClient.roles().removeUsers(code, userIds)
- managementClient.roles().removeUsers(param)

> 移除用户

#### 参数

- `code` \<String\> 角色唯一标志符
- `userIds` \<List\<String\>\> 用户 ID 列表
- `param` \<RevokeRoleParam\> 移除用户请求入参
- `param.namespace` \<String\> 权限分组的 Code，详情请见[使用权限分组管理权限资源](/guides/access-control/resource-group.md)。
- `param.roleCode` \<String\> 角色唯一标志符
- `param.roleCodes` \<List\<String\>\> 角色唯一标志符集合
- `param.userIds` \<List\<String\>\> 用户唯一标志符集合
- `param.groupCodes` \<List\<String\>\> 用户分组唯一标识符集合
- `param.nodeCodes` \<List\<String\>\> 用户组织机构节点唯一标识符集合

#### 示例

```java
ArrayList<String> userIds = new ArrayList<>();
userIds.add("userId");
managementClient.roles().removeUsers("code", userIds).execute();
```

[comment]: <> (## 获取策略列表)

[comment]: <> (managementClient.roles&#40;&#41;.listPolicies&#40;code&#41;)

[comment]: <> (> 获取策略列表)

[comment]: <> (#### 参数)

[comment]: <> (- `code` \<String\> 角色唯一标志符)


[comment]: <> (#### 示例)

[comment]: <> (```java)

[comment]: <> (managementClient.roles&#40;&#41;.listPolicies&#40;"code"&#41;.execute&#40;&#41;;)

[comment]: <> (```)

[comment]: <> (## 批量添加策略)

[comment]: <> (managementClient.roles&#40;&#41;.addPolicies&#40;code, policies&#41;)

[comment]: <> (> 批量添加策略)

[comment]: <> (#### 参数)

[comment]: <> (- `code` \<String\> 角色唯一标志符)

[comment]: <> (- `policies` \<List\<String\>\> 策略唯一标识的集合)


[comment]: <> (#### 示例)

[comment]: <> (```java)

[comment]: <> (managementClient.roles&#40;&#41;.addPolicies&#40;"code", Arrays.asList&#40;"policy1", "policy2"&#41;&#41;.execute&#40;&#41;;)

[comment]: <> (```)


[comment]: <> (## 批量移除策略)

[comment]: <> (managementClient.roles&#40;&#41;.removePolicies&#40;code, policies&#41;)

[comment]: <> (> 批量移除策略)

[comment]: <> (#### 参数)

[comment]: <> (- `code` \<String\> 角色唯一标志符)

[comment]: <> (- `policies` \<List\<String\>\> 策略唯一标识的集合)


[comment]: <> (#### 示例)

[comment]: <> (```java)

[comment]: <> (managementClient.roles&#40;&#41;.removePolicies&#40;"code", Arrays.asList&#40;"policy1", "policy2"&#41;&#41;.execute&#40;&#41;;)

[comment]: <> (```)

## 获取角色被授权的所有资源列表

managementClient.roles().listAuthorizedResources(params)

> 获取一个角色被授权的所有资源。

#### 参数

- `param` \<ListRoleAuthorizedResourcesParam\>
- `param.code` \<String\> 角色 Code
- `param.namespace` \<String\> 权限分组的 Code，详情请见[使用权限分组管理权限资源](/guides/access-control/resource-group.md)。
- `param.resourceType` \<String\> 可选，资源类型，默认会返回所有有权限的资源，现有资源类型如下：
    - `DATA`：数据类型；
    - `API`：API 类型数据；
    - `MENU`：菜单类型数据；
    - `BUTTON`：按钮类型数据。

#### 示例

```java
ListRoleAuthorizedResourcesParam param = new ListRoleAuthorizedResourcesParam("123")
                .withNamespace("default")
                .withResourceType("DATA");
PaginatedAuthorizedResources res = managementClient.roles().listAuthorizedResources(param).execute();
```

#### 示例数据

- `type` 资源类型
- `code` 资源描述符，如果是 `DATA` 类型资源，格式为 `resourceType:resourceId`，如 `books:*` 表示所有书籍，`books:1` 表示 ID 为 1 的书籍。
- `actions` 用户被授权对该资源的操作

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

managementClient.roles().getUdfValue(roleCode)

> 获取某个角色扩展字段列表

#### 参数

- `roleCode` \<String\> 角色 Code

#### 示例

```java
managementClient.roles().getUdfValue(ROLE_CODE).execute();
```

## 获取某个角色某个扩展字段

managementClient.roles().getSpecificUdfValue(roleCode, udfKey)

> 获取某个角色某个扩展字段

#### 参数

- `roleCode` \<String\> 角色 Code 
- `udfKey` \<String\> 角色自定义扩展字段的 Key

#### 示例

```java
managementClient.roles().getSpecificUdfValue(ROLE_CODE).execute();
```

## 获取多个角色扩展字段列表

managementClient.roles().getUdfValueBatch(roleCodes)

> 获取多个角色扩展字段列表

#### 参数

- `roleCodes` \<List\<String\>\> 角色 Code 列表

#### 示例

```java
List<String> codeList = Arrays.asList("ROLE_CODE_1", "ROLE_CODE_2");
Map<String, Map<String, Object>> udfMap = managementClient.roles().getUdfValueBatch(codeList).execute();
```

## 设置角色扩展字段列表

- managementClient.roles().setUdfValue(roleCode, key, value)
- managementClient.roles().setUdfValue(roleCode, dataMap)

> 设置角色扩展字段列表

#### 参数

- `roleCode` \<String\> 角色 Code
- `key` \<String\> 字段 Key
- `value` \<String\> 字段 Value
- `dataMap` \<Map\<String, String\>\> 字段映射 Map
- `dataMap.key` \<String\> 字段 Key
- `dataMap.value` \<String\>\> 字段 Value

#### 示例

```java
List<UserDefinedData> list = managementClient.roles().setUdfValue(role.getCode(), "key1", "123").execute();
```


## 设置多个角色扩展字段列表

managementClient.roles().setUdfValueBatch(param))

> 设置多个角色扩展字段列表

#### 参数

- `param` \<List\<RoleSetUdfValueBatchParams\>\> 
- \<RoleSetUdfValueBatchParams\>
  - `roleCode` \<String\> 角色 Code
  - `data` \<Map\<String, String\>\> 字段 Map

#### 示例

```java
HashMap<String, String> udfMap = new HashMap<>();
udfMap.put("key1", "\"aaa\"");
udfMap.put("key2", "\"aaa\"");
udfMap.put("key3", "\"aaa\"");
udfMap.put("key4", "\"aaa\"");
RoleSetUdfValueBatchParams params = new RoleSetUdfValueBatchParams(role.getCode(), udfMap);
managementClient.roles().setUdfValueBatch(Arrays.asList(params)).execute();
Map<String, Object> map = managementClient.roles().getUdfValue(role.getCode()).execute();
```


## 移除用户自定义数据

managementClient.roles().removeUdfValue(code, key))

> 移除用户自定义数据

#### 参数

- `code` \<String\> 角色 Code
- `key` \<String\> 字段 Key

#### 示例

```java
managementClient.roles().removeUdfValue("code", "key").execute();
```