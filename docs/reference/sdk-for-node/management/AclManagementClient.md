---
meta:
  - name: description
    content: 管理资源与权限
---

# 管理资源与权限

<LastUpdated/>

{{$localeConfig.brandName}} 基于 ABAC（Attribute Base Access Control，基于属性的权限控制）构建权限模型，

可以和 RBAC （Role Based Access Control，基于角色的访问控制）结合，实现非常灵活、精细化的权限控制。

此模块将此模型抽象成了两个方法: allow, isAllowed。

你可以通过以下方式使用此模块：

```javascript
import { ManagementClient } from "authing-js-sdk";
const managementClient = new ManagementClient({
  userPoolId: "YOUR_USERPOOL_ID",
  secret: "YOUR_USERPOOL_SECRET"
});
managementClient.acl.allow; // 允许某个用户对某个资源进行某个操作
managementClient.acl.isAllowed; // 判断某个用户是否对某个资源有某个操作权限
```

## 创建权限分组

> 创建权限分组

```javascript
AclManagementClient().createNamespace(code, name, description);
```

#### 参数

- `code` \<string\> 权限分组唯一标识符
- `name` \<string\> 权限分组名
- `description` \<string\> 可选，权限分组描述

#### 示例

```javascript
managementClient.acl.createNamespace(
  "testNamesapce",
  "Test Namcepace",
  "This is a Test Namespace"
);
```

#### 返回值

- `Promise<DeepPartial<Namespace>>`

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

```javascript
AclManagementClient().listNamespaces(page, limit);
```

#### 参数

- `page` \<number\> 页码，默认为 1
- `limit` \<number\> 每页个数，默认为 10

#### 示例

```javascript
managementClient.acl.listNamespace(1, 10);
```

#### 返回值

- `Promise<DeepPartial<{list: Namespace[],totalCount: number}>>`

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

```javascript
AclManagementClient().updateNamespace(code, updates);
```

#### 参数

- `code` \<number\> 权限分组 code
- `updates` \<object\> 需要更新的数据
- `updates.code` \<string\> 可选，权限分组唯一标识符
- `updates.name` \<string\> 可选，权限分组名称
- `updates.description` \<string\> 可选，权限分组描述

#### 示例

```javascript
managementClient.acl.updateNamespace("testNamesapce", {
  name: "A New Name"
});
```

#### 返回值

- `Promise<DeepPartial<Namespace>>`

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

```javascript
AclManagementClient().deleteNamespace(code);
```

#### 参数

- `code` \<number\> 权限分组 CODE

#### 示例

```javascript
managementClient.acl.deleteNamespace("testNamesapce");
```

#### 返回值

- `Promise<boolean>`

## 获取资源列表

> 根据筛选条件，查询用户池下的资源列表。

```javascript
AclManagementClient().listResources(options);
```

#### 参数

- `options` \<object\> 筛选条件对象
- `options.namespace` \<string\> 权限分组命名空间
- `options.type` \<string\> 资源类型，可选值为 `DATA`、`API`、`MENU`、`UI`、`BUTTON`
- `options.page` \<string\> 分页，获取第几页，默认从 1 开始
- `options.limit` \<string\> 每页条目数量

#### 示例

```js
const res = await managementClient.acl.listResources({
  namespace: "600a8f4e37708b363024a3ca",
  page: 1,
  limit: 10
});
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

> 创建一个资源。

```javascript
AclManagementClient().createResource(options);
```

#### 参数

- `options` \<object\> 资源信息对象
- `options.code` \<string\> 资源标识符，不可使用值 `userpool`、`user`、`application`、`role`、`group`、`org`、`*`、`api`、`resource-namespace`、`custom-resource`
- `options.namespace` \<string\> 权限分组命名空间
- `options.type` \<string\> 资源类型，可选值为 `DATA`、`API`、`MENU`、`UI`、`BUTTON`
- `options.actions` \<Array<{ name: string, description: string }>\> 资源操作对象数组。其中 name 为操作名称，填写一个**动词**，description 为操作描述，填写描述信息
- `options.description` \<string\> 资源描述信息

#### 示例

```js
const res = await managementClient.acl.createResource({
  code: "book",
  type: "DATA",
  description: "book",
  actions: [
    {
      name: "book:write",
      description: "图书写入操作"
    }
  ],
  namespace: "600a8f4e37708b363024a3ca"
});
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

> 更新一个资源。

```javascript
AclManagementClient().updateResource(code, options);
```

#### 参数

- `code` \<string\> 资源标识符
- `options` \<object\> 资源信息对象
- `options.namespace` \<string\> 资源所在的权限分组标识
- `options.type` \<string\> 资源类型，可选值为 `DATA`、`API`、`MENU`、`UI`、`BUTTON`
- `options.actions` \<Array<{ name: string, description: string }>\> 资源操作对象数组。其中 name 为操作名称，填写一个**动词**，description 为操作描述，填写描述信息
- `options.description` \<string\> 资源描述信息

#### 示例

```js
const updated = await managementClient.acl.updateResource(code, {
  description: "新的描述",
  type: "DATA",
  actions: [
    { name: "write", description: "图书写入操作2" },
    { name: "read", description: "图书读取操作2" }
  ],
  namespace: "600a8f4e37708b363024a3ca"
});
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

```javascript
AclManagementClient().deleteResource(code, namespace);
```

#### 参数

- `code` \<string\> 资源标识符
- `namespace` \<string\> 资源所在的权限分组标识

#### 示例

```js
let deleted = await managementClient.acl.deleteResource(
  code,
  "600a8f4e37708b363024a3ca"
);

deleted === true;
```

#### 返回数据

```json
true
```

## 授权资源

> 将一个（类）资源授权给用户、角色、分组、组织机构，且可以分别指定不同的操作权限。

```javascript
AclManagementClient.authorizeResource(params);
```

#### 参数

- `params`\<object\>
- `params.namespace`\<string\> 权限分组 code；
- `params.resource` \<string\> 资源，如一类资源可以表示为 `order`，某一个资源可以表示为 `order:123`；
- `params.opts` \<AuthorizeResourceOpt[]\> 一个数组
  - `AuthorizeResourceOpt.targetType` \<string\> 授权对象类型，如 USER, ROLE, GROUP, ORG
  - `AuthorizeResourceOpt.targetIdentifier` \<string\> 授权对象唯一标志符，如用户 ID、角色 code、分组 code、组织机构 ID；
  - `AuthorizeResourceOpt.actions` 授权的操作列表，可选。MENU、Button 类型数据不需要指定 actions。

#### 示例

1. 将菜单类型数据 `menuA` 授权给用户 `USER_ID` 和部门 `DEPARTMENT_ID`：

```javascript
import { ResourceType, PolicyAssignmentTargetType } from 'authing-js-sdk'

await managementClient.acl.authorizeResource({
  namespace: 'default',
  resource: 'menuA',
  opts: [
    {
      targetType: PolicyAssignmentTargetType.User,
      targetIdentifier: 'USER_ID',
    }.
    {
      targetType: PolicyAssignmentTargetType.Org,
      targetIdentifier: 'DEPARTMENT_ID'
    }
  ]
});
```

2. 将服务器（ESC）1 的开机权限授予角色 A，开机、关机权限授权给角色 B：

```javascript
import { ResourceType, PolicyAssignmentTargetType } from 'authing-js-sdk'

await managementClient.acl.authorizeResource({
  namespace: 'default',
  resource: 'ecs:1',
  opts: [
    {
      targetType: PolicyAssignmentTargetType.Role,
      targetIdentifier: 'A',
      actions: [
        'ecs:Start'
      ]
    }.
    {
      targetType: PolicyAssignmentTargetType.Role,
      targetIdentifier: 'B',
      actions: [
        'ecs:Start',
        'ecs:Stop'
      ]
    }
  ]
});
```

## 授权资源（快捷操作）

> 允许某个用户对某个资源进行某个操作。

```javascript
AclManagementClient().allow(userId, action, resource, namespace);
```

#### 参数

- `userId` \<string\> 用户 ID
- `action` \<string\> 操作名称，推荐使用 \<resourceType\>:\<actionName\> 的格式，如 `books:edit`, `books:list`
- `resource` \<string\> 资源名称, 必须为 \<resourceType\>:\<resourceId\> 的格式， 如 `books:123`,`books:*`
- `namespace` \<string\> 权限分组的 code，详情请见[使用权限分组管理权限资源](/guides/access-control/resource-group.md)；

#### 示例

```javascript
managementClient.acl.allow("USERID1", "books:123", "books:read");
managementClient.acl.isAllowed("USERID1", "books:123", "books:read"); // true
managementClient.acl.isAllowed("USERID1", "books:123", "books:edit"); // false
```

```javascript
managementClient.acl.allow("USERID2", "books:*", "books:*");
managementClient.acl.isAllowed("USERID2", "books:123", "books:read"); // true
managementClient.acl.isAllowed("USERID2", "books:124", "books:edit"); // true
```

#### 返回值

- `Promise<CommonMessage>`

## 取消授权资源

> 取消对某个资源的操作权限。

```javascript
AclManagementClient().revokeResource(params);
```

#### 参数

- `params`\<object\>
- `params.namespace`\<string\> 权限分组 code；
- `params.resource` \<string\> 资源，如一类资源可以表示为 `order`，某一个资源可以表示为 `order:123`；
- `params.opts` \<AuthorizeResourceOpt[]\> 一个数组
  - `AuthorizeResourceOpt.targetType` \<string\> 授权对象类型，如 USER, ROLE, GROUP, ORG
  - `AuthorizeResourceOpt.targetIdentifier` \<string\> 授权对象唯一标志符，如用户 ID、角色 code、分组 code、组织机构 ID；

1. 取消用户 `USER_ID` 和部门 `DEPARTMENT_ID` 对 `menuA` 资源权限：

```javascript
await managementClient.acl.revokeResource(
    {
      namespace='default',
      resource='menuA'
      opts=[
          {
              'targetType': PolicyAssignmentTargetType.User,
              'targetIdentifier': 'USER_ID'
          },
          {
              'targetType': PolicyAssignmentTargetType.Org,
              'targetIdentifier': 'DEPARTMENT_ID'
          }
      ]
    }
)
```

2. 取消用户 A 对服务器（ESC）1 资源的权限

```javascript
await managementClient.acl.revokeResource(
    namespace='default',
    resource='ecs:1'
    opts=[
        {
            'targetType': PolicyAssignmentTargetType.User,
            'targetIdentifier': 'A',
        },
    ]
)
```

## 判断某个用户是否对某个资源有某个操作权限

> 判断某个用户是否对某个资源有某个操作权限

```javascript
AclManagementClient().isAllowed(userId, action, resource, namesapce);
```

#### 参数

- `userId` \<string\> 用户 ID
- `action` \<string\> 操作名称，推荐使用 \<resourceType\>:\<actionName\> 的格式，如 `books:edit`, `books:list`
- `resource` \<string\> 资源名称, 必须为 \<resourceType\>:\<resourceId\> 格式或者为 _, 如 `_`,`books:123`,`books:\*`
- `options` \<object\> 其他选项，可选
  - `options.namespace` \<string\> 资源所属权限分组 code, 详情请见[使用权限分组管理权限资源](/guides/access-control/resource-group.md);

#### 示例

```javascript
managementClient.acl.isAllowed("60b4a136d9xxxxcc3d87e55a", "books:*", "books:edit", {
  namespace: "default"
});
```

#### 返回值

- `Promise<boolean>` 是否具备操作权限

## 获取用户被授权的所有资源列表

```javascript
UsersManagementClient().listAuthorizedResources(userId, namespace, options);
```

> 获取一个用户被授权的所有资源，用户被授权的所有资源里面包括从角色、分组、组织机构继承的资源。

#### 参数

- `userId` \<string\> 用户 ID；
- `namespace` \<string\> 权限分组的 code，详情请见[使用权限分组管理权限资源](/guides/access-control/resource-group.md)；
- `options` \<object\>
- `options.resourceType` \<string\> 可选，资源类型，默认会返回所有有权限的资源，现有资源类型如下：
  - `DATA`: 数据类型；
  - `API`: API 类型数据；
  - `MENU`: 菜单类型数据；
  - `BUTTON`: 按钮类型数据。

#### 示例

```javascript
import { ResourceType } from "authing-js-sdk";

managementClient.users.listAuthorizedResources("60b4a136d9xxxxcc3d87e55a", "NAMESPACE_CODE", {
  resourceType: ResourceType.MENU
});
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

## 获取角色被授权的所有资源列表

> 获取一个角色被授权的所有资源。

```javascript
RolesManagementClient().listAuthorizedResources(code, namespace, options);
```

#### 参数

- `code` \<string\> 角色 code；
- `namespace` \<string\> 权限分组的 code，详情请见[使用权限分组管理权限资源](/guides/access-control/resource-group.md)；
- `options` \<object\>
- `options.resourceType` \<string\> 可选，资源类型，默认会返回所有有权限的资源，现有资源类型如下：
  - `DATA`: 数据类型；
  - `API`: API 类型数据；
  - `MENU`: 菜单类型数据；
  - `BUTTON`: 按钮类型数据。

#### 示例

```javascript
import { ResourceType } from "authing-js-sdk";

managementClient.roles.listAuthorizedResources("ROLE_CODE", "NAMESPACE_CODE", {
  resourceType: ResourceType.MENU
});
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

## 获取分组被授权的所有资源列表

> 获取一个分组被授权的所有资源。

```javascript
GroupsManagementClient().listAuthorizedResources(code, namespace, options);
```

#### 参数

- `code` \<string\> 分组 code；
- `namespace` \<string\> 权限分组的 code，详情请见[使用权限分组管理权限资源](/guides/access-control/resource-group.md)；
- `options` \<object\>
- `options.resourceType` \<string\> 可选，资源类型，默认会返回所有有权限的资源，现有资源类型如下：
  - `DATA`: 数据类型；
  - `API`: API 类型数据；
  - `MENU`: 菜单类型数据；
  - `BUTTON`: 按钮类型数据。

#### 示例

```javascript
import { ResourceType } from "authing-js-sdk";

managementClient.groups.listAuthorizedResources(
  "GROUP_CODE",
  "NAMESPACE_CODE",
  {
    resourceType: ResourceType.MENU
  }
);
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

## 获取部门被授权的所有资源列表

> 获取一个部门被授权的所有资源。

```javascript
OrgManagementClient.listAuthorizedResourcesByNodeId(nodeId, namespace, options);
```

#### 参数

- `nodeId` \<string\> 部门 id；
- `namespace` \<string\> 权限分组的 code，详情请见[使用权限分组管理权限资源](/guides/access-control/resource-group.md)
- `options` \<object\>
- `options.resourceType` \<string\> 可选，资源类型，默认会返回所有有权限的资源，现有资源类型如下：
  - `DATA`: 数据类型；
  - `API`: API 类型数据；
  - `MENU`: 菜单类型数据；
  - `BUTTON`: 按钮类型数据。

#### 示例

```javascript
import { ResourceType } from "authing-js-sdk";

managementClient.org.listAuthorizedResourcesByNodeId(
  "NODE_ID",
  "NAMESPACE_CODE",
  {
    resourceType: ResourceType.MENU
  }
);
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

## 获取具备某些资源操作权限的主体

> 传入权限分组、资源标识、资源类型、操作权限项、主体类型，返回具备资源操作权限的主体标识符。

```javascript
AclManagementClient().getAuthorizedTargets(options);
```

#### 参数

- `options` \<object\> 筛选条件对象；
- `options.namespace` \<string\> 权限分组的 code，详情请见[使用权限分组管理权限资源](/guides/access-control/resource-group.md)
- `options.resourceType` \<string\> 资源类型，现有资源类型如下：
  - `DATA`: 数据类型；
  - `API`: API 类型数据；
  - `MENU`: 菜单类型数据；
  - `BUTTON`: 按钮类型数据。
- `options.resource`: 资源 code
- `options.actions` \<object\> 操作
  - `actions.op` \<string\>，可选值为 `AND`、`OR`，表示 list 中的操作关系是和还是或。
  - `actions.list` \<string[]\>，操作，例如 `['read', 'write']`
- `options.targetType` \<string\>，主体类型，可选值为 `USER`、`ROLE`、`ORG`、`GROUP`，含义为用户、角色、组织机构节点、用户分组。

#### 示例

- 获取权限分组 6063f88dabb536e9a23a6c80 中，具备 DATA 类型资源 book 的 write 或 read 权限的用户。

```javascript
let res = await managementClient.acl.getAuthorizedTargets({
  namespace: "6063f88dabb536e9a23a6c80",
  resource: "book",
  resourceType: "DATA",
  actions: {
    op: "OR",
    list: ["write", "read"]
  },
  targetType: "USER"
});
```

#### 示例数据

- `targetType` 为主体类型；
- `targetIdentifier`: 主体标识符，可能是用户 ID、角色 ID、组织结构节点 ID、用户分组 ID；
- `actions`: 用户被授权对该资源的操作；

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

```js
AclManagementClient().programmaticAccessAccountList(appId, page, limit);
```

#### 参数

- `appId` \<string\> 角色 code
- `page` \<int\> 页码，默认为 1
- `limit` \<int\> 每页个数，默认为 10

#### 示例

```js
management.acl.programmaticAccessAccountList("6139c4d24e78a4d706b7545b");
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

```js
AclManagementClient().createProgrammaticAccessAccount(appId, options);
```

#### 参数

- `appId` \<string\> 应用 ID
- `options` \<object\>
- `options.remark` \<string\> 备注
- `options.tokenLifetime` \<int\> Token 过期时间 默认为 600

#### 示例

```js
management.acl.createProgrammaticAccessAccount( '6139c4d24e78a4d706b7545b', {remark='xx'})
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

```js
AclManagementClient().disableProgrammaticAccessAccount(
  programmaticAccessAccountId
);
```

#### 参数

- `programmaticAccessAccountId` \<string\> 编程账号 ID

#### 示例

```js
management.acl.disableProgrammaticAccessAccount("61418fad9d4357a5308e5ecd");
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

```js
AclManagementClient().deleteProgrammaticAccessAccount(
  programmaticAccessAccountId
);
```

#### 参数

- `programmaticAccessAccountId` \<string\> 编程账号 ID

#### 示例

```js
management.acl.deleteProgrammaticAccessAccount("61418fad9d4357a5308e5ecd");
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

```js
AclManagementClient().enableProgrammaticAccessAccount(
  programmaticAccessAccountId
);
```

#### 参数

- `programmaticAccessAccountId` \<string\> 编程账号 ID

#### 示例

```js
management.acl.enableProgrammaticAccessAccount("61418fad9d4357a5308e5ecd");
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

```js
AclManagementClient().refreshProgrammaticAccessAccountSecret(
  programmaticAccessAccountId,
  programmaticAccessAccountSecret
);
```

#### 参数

- `programmaticAccessAccountId` \<string\> 编程账号 ID
- `programmaticAccessAccountSecret` \<string\> 秘钥，默认 32 位字符串

#### 示例

```js
management.acl.refreshProgrammaticAccessAccountSecret("xxxx");
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

## 启用应用访问控制策略

> 启用应用访问控制策略

```js
AclManagementClient().enableApplicationAccessPolicy(options);
```

#### 参数

- `options` \<IAppAccessPolicy\>
- `options.appId` \<string\> 应用 ID
- `options.targetType` \<string\> 对象类型
- `options.targetIdentifiers` \<Array[]\> 对象 ID 集合
- `options.namespace` \<string\> 命名空间
- `options.inheritByChildren` \<boolean\> 是否内联子类

#### 示例

```js
management.acl.enableApplicationAccessPolicy({
  namespace: "61360547f4807f63584fa152",
  appId: "61360547f4807f63584fa152",
  inheritByChildren: false,
  targetType: "USER",
  targetIdentifiers: ["613ad7081436dc0f42d8ee65"]
});
```

## 停用应用访问控制策略

> 停用应用访问控制策略

```js
AclManagementClient().disableApplicationAccessPolicy(options);
```

#### 参数

- `options` \<IAppAccessPolicy\>
- `options.appId` \<string\> 应用 ID
- `options.targetType` \<string\> 对象类型
- `options.targetIdentifiers` \<Array[]\> 对象 ID 集合
- `options.namespace` \<string\> 命名空间
- `options.inheritByChildren` \<boolean\> 是否内联子类

#### 示例

```js
management.acl.disableApplicationAccessPolicy({
  namespace: "61360547f4807f63584fa152",
  appId: "61360547f4807f63584fa152",
  inheritByChildren: false,
  targetType: "USER",
  targetIdentifiers: ["613ad7081436dc0f42d8ee65"]
});
```

## 删除应用访问控制策略

> 删除应用访问控制策略

```js
AclManagementClient().deleteApplicationAccessPolicy(options);
```

#### 参数

- `options` \<IAppAccessPolicy\>
- `options.appId` \<string\> 应用 ID
- `options.targetType` \<string\> 对象类型
- `options.targetIdentifiers` \<Array[]\> 对象 ID 集合
- `options.namespace` \<string\> 命名空间
- `options.inheritByChildren` \<boolean\> 是否内联子类

#### 示例

```js
management.acl.deleteApplicationAccessPolicy({
  namespace: "61360547f4807f63584fa152",
  appId: "61360547f4807f63584fa152",
  inheritByChildren: false,
  targetType: "USER",
  targetIdentifiers: ["613ad7081436dc0f42d8ee65"]
});
```

## 配置「允许主体（用户、角色、分组、组织机构节点）访问应用」的控制策略

> 配置「允许主体（用户、角色、分组、组织机构节点）访问应用」的控制策略

```js
AclManagementClient().allowAccessApplication(options);
```

#### 参数

- `options` \<IAppAccessPolicy\>
- `options.appId` \<string\> 应用 ID
- `options.targetType` \<string\> 对象类型
- `options.targetIdentifiers` \<Array[]\> 对象 ID 集合
- `options.namespace` \<string\> 命名空间
- `options.inheritByChildren` \<boolean\> 是否内联子类

#### 示例

```js
management.acl.allowAccessApplication({
  namespace: "61360547f4807f63584fa152",
  appId: "61360547f4807f63584fa152",
  inheritByChildren: false,
  targetType: "USER",
  targetIdentifiers: ["613ad7081436dc0f42d8ee65"]
});
```

#### 示例数据

```json
{
  "message": "允许访问成功",
  "code": 200
}
```

## 获取授权主体限制条件

> 获取授权主体限制条件

```js
AclManagementClient().getPoliciesAssignmentsCondition(
  namespace,
  policyCode,
  targetType
);
```

#### 参数

- `namespace` \<string\> 资源空间 CODE
- `policyCode` \<string\> 策略 CODE
- `targetType` \<string\> 资源类型，可选值为 UESR、ROLE、GROUP、ORG

#### 示例

```js
management.acl.getPoliciesAssignmentsCondition("default", "wIHHgw9zG", "ROLE");
```

#### 示例数据

```json
{
  "code": 200,
  "data": {
    "policyId": "62303bae47f46bf3d0869d14",
    "code": "wIHHgw9zG",
    "policy": {
      "id": "62303bae47f46bf3d0869d14",
      "createdAt": "2022-03-15T07:09:34.905Z",
      "updatedAt": "2022-03-15T07:09:34.905Z",
      "userPoolId": "6131967faf2eb55a2b7cebcc",
      "isDefault": false,
      "isAuto": true,
      "hidden": false,
      "code": "wIHHgw9zG",
      "description": "Auto generate wIHHgw9zG",
      "statements": [
        {
          "resource": "*:*",
          "actions": ["*"],
          "effect": "ALLOW",
          "condition": [],
          "resourceType": null
        },
        {
          "resource": "777:*",
          "actions": ["*"],
          "effect": "ALLOW",
          "condition": [
            {
              "param": "AppId",
              "operator": "StringEquals",
              "value": "aaa"
            },
            {
              "param": "UserId",
              "operator": "StringNotEqualsIgnoreCase",
              "value": "bbb"
            }
          ],
          "resourceType": "DATA"
        }
      ],
      "namespaceId": 46303
    },
    "targetType": "ROLE",
    "targets": [
      {
        "id": "62288d1ae6fa79e41d55eedb",
        "createdAt": "2022-03-09T11:18:50.500Z",
        "updatedAt": "2022-03-09T11:18:50.500Z",
        "userPoolId": "6131967faf2eb55a2b7cebcc",
        "code": "X1A9N",
        "description": "测试",
        "parentCode": null,
        "isSystem": false,
        "namespaceId": 46303
      }
    ],
    "namespace": "default"
  }
}
```

## 配置「拒绝主体（用户、角色、分组、组织机构节点）访问应用」的控制策略

> 配置「拒绝主体（用户、角色、分组、组织机构节点）访问应用」的控制策略

```js
AclManagementClient().denyAccessApplication(options);
```

#### 参数

- `options` \<IAppAccessPolicy\>
- `options.appId` \<string\> 应用 ID
- `options.targetType` \<string\> 对象类型
- `options.targetIdentifiers` \<Array[]\> 对象 ID 集合
- `options.namespace` \<string\> 命名空间
- `options.inheritByChildren` \<boolean\> 是否内联子类

#### 示例

```js
management.acl.denyAccessApplication({
  namespace: "61360547f4807f63584fa152",
  appId: "61360547f4807f63584fa152",
  inheritByChildren: false,
  targetType: "USER",
  targetIdentifiers: ["613ad7081436dc0f42d8ee65"]
});
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

```js
AclManagementClient().updateDefaultApplicationAccessPolicy(options);
```

#### 参数

- `options` \<object\>
- `options.appId` \<string\> 应用 ID
- `options.defaultStrategy` \<string\> 默认策略 取值范围 ALLOW_ALL,DENY_ALL

#### 示例

```js
management.acl.updateDefaultApplicationAccessPolicy({
  appId: "6139c4d24e78a4d706b7545b",
  defaultStrategy: "ALLOW_ALL"
});
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
