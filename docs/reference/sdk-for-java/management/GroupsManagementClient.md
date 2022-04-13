---
meta:
  - name: description
    content: 管理分组
---

# 管理分组

<LastUpdated/>


> 此模块用于管理 {{$localeConfig.brandName}} 分组，可以进行分组的增删改查、分组添加/删除用户、分组添加/删除策略 等操作。

## 创建分组

GroupsManagementClient().create(groupInfo)

> 创建分组

#### 参数

- `groupInfo` \<CreateGroupParam\> 分组资料
- `groupInfo.code` \<String\> 分组唯一标志符
- `groupInfo.name` \<Boolean\> 分组名称
- `groupInfo.description` \<String\> 描述

#### 示例

```java
String code = "code1";
String name = "name1";
String description = "desc1";
Group group = managementClient.group().create(new CreateGroupParam(code, name, description)).execute();
```

## 删除分组

GroupsManagementClient().delete(code)

> 删除分组

#### 参数

- `code` \<String\> 分组唯一标志符

#### 示例

```java
String code = "code1";
managementClient.group().delete(code).execute();
```

## 修改分组

GroupsManagementClient().update(groupInfo)

> 修改分组

#### 参数

- `groupInfo` \<CreateGroupParam\> 分组资料
- `groupInfo.code` \<String\> 分组唯一标志符
- `groupInfo.name` \<Boolean\> 分组名称
- `groupInfo.description` \<String\> 描述
- `groupInfo.newCode` \<String\> 新的唯一标志符

#### 示例

```java
String code = "code1";
String name = "name1";
String description = "desc1";
String newCode = "code2";
Group group = managementClient.group().update(new UpdateGroupParam(code, name, description, newCode)).execute();
```

## 获取分组详情

GroupsManagementClient().detail(code)

> 获取一个分组的详情信息

#### 参数

- `code` \<String\> 分组唯一标志符

#### 示例

```java
String code = "code1";
Group group = managementClient.group().detail(code).execute();
```

## 获取分组列表

GroupsManagementClient().list(listParam)

> 获取分组列表

#### 参数

- `listParam` \<GroupsParam\> 分页请求参数
- `listParam.userId` \<String\> 用户 ID
- `listParam.page` \<Integer\> 页码数，默认值：`1`。
- `listParam.limit` \<Integer\> 每页个数，默认值：`10`。
- `listParam.sortBy` \<SortByEnum\> 排序规则

#### 示例

```java
String userId = "userId1";
Integer page = 1;
Integer limit = 10;
SortByEnum sortEnum = SortByEnum.CREATEDAT_DESC;
PaginatedGroups groups = managementClient
        .group()
        .list(new GroupsParam(userId, page, limit, sortEnum))
        .execute();
```

## 批量删除分组

GroupsManagementClient().deleteMany(codeList)

> 批量删除分组

#### 参数

- `codeList` \<List\<String\>\> 分组唯一标志符列表

#### 示例

```java
ArrayList<String> codeList = new ArrayList<>();
codeList.add("code1");
managementClient.group().deleteMany(codeList).execute();
```

## 获取分组用户列表

GroupsManagementClient().listUsers(param)

> 获取分组用户列表

#### 参数

- `param` \<GroupWithUsersParam\>
- `param.code` \<String\> 分组唯一标志符
- `param.page` \<Integer\> 页码数，默认值：`1`。
- `param.limit` \<Integer\> 每页个数，默认值：`10`。

#### 示例

```java
String code = "code1";
int page = 1;
int limit = 10;
PaginatedUsers users = managementClient.group().listUsers(code, page, limit).execute();
```

## 添加用户

GroupsManagementClient().addUsers(param)

> 添加用户

#### 参数

- `param` \<AddUserToGroupParam\>
- `param.code` \<String\> 分组唯一标志符
- `param.userIds` \<List\<String\>\> 用户 ID 列表

#### 示例

```java
String code = "code1";
List<String> userIds = new ArrayList<>();
userIds.add("userId1");
managementClient.group().addUsers(new AddUserToGroupParam(userIds, code)).execute();
```

## 移除用户

GroupsManagementClient().removeUsers(param)

> 移除用户

#### 参数

- `param` \<RemoveUserFromGroupParam\>
- `param.code` \<String\> 分组唯一标志符
- `param.userIds` \<List\<String\>\> 用户 ID 列表

#### 示例

```java
String code = "code1";
List<String> userIds = new ArrayList<>();
userIds.add("userId1");
managementClient.group().removeUsers(new RemoveUserFromGroupParam(userIds, code)).execute();
```

## 获取分组被授权的所有资源列表

managementClient.group().listAuthorizedResources(param)

> 获取一个分组被授权的所有资源。

#### 参数

- `param` \<ListGroupAuthorizedResourcesParam\>
- `param.code` \<String\> 分组 Code
- `param.namespace` \<String\> 权限分组的 Code，详情请见[使用权限分组管理权限资源](/guides/access-control/resource-group.md)。
- `param.resourceType` \<String\> 可选，资源类型，默认会返回所有有权限的资源，现有资源类型如下：
    - `DATA`：数据类型；
    - `API`：API 类型数据；
    - `MENU`：菜单类型数据；
    - `BUTTON`：按钮类型数据。

#### 示例

```java
ListGroupAuthorizedResourcesParam param = new ListGroupAuthorizedResourcesParam("code")
        .withNamespace("default")
        .withResourceType("DATA");
Group res = managementClient.group().listAuthorizedResources(param).execute();
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
