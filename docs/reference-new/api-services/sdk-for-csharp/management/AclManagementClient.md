---
meta:
  - name: description
    content: 管理资源与权限
---

# 管理资源与权限

<LastUpdated/>


> {{$localeConfig.brandName}} 基于 PBAC（Policy Based Access Control，基于策略的访问控制）构建权限模型，
> 可以和 RBAC （Role Based Access Control，基于角色的访问控制）结合，实现非常灵活、精细化的权限控制。
> 此模块将此模型抽象成了两个方法: allow，isAllowed。

## 创建权限分组

```csharp
managementClient.acl.CreateNamespace(string code, string name, string description)
```
> 创建权限分组

#### 参数

- `code` \<string\> 权限分组唯一标识符
- `name` \<string\> 权限分组名
- `description` \<string\> 可选，权限分组描述

#### 示例

```csharp
 managementClient.acl.CreateNamespace("code", "name", "description");
```

#### 示例数据

```json
{
  "appId": null,
  "appName": null,
  "name": "Test Namespace",
  "code": "code",
  "description": "This is a Test Namespace",
  "status": 1,
  "id": 38
}
```

## 获取权限分组列表

```csharp
managementClient.acl.ListNamespaces(int page = 1, int limit = 10)
```
> 获取权限分组列表

#### 参数

- `page` \<int\> 页码，默认为 1。
- `limit` \<int\> 每页个数，默认为 10。

#### 示例

```csharp
var result = await managementClient.acl.ListNamespaces(int page = 1, int limit = 10);
```

#### 示例数据

```json
{
  "list": [
    {
      "appId": null,
      "appName": null,
      "name": "Test Namespace",
      "code": "code",
      "description": "This is a Test Namespace",
      "status": 1,
      "id": 38
    }
  ],
  "totalCount": 1
}
```

## 更新权限分组
```csharp
managementClient.acl.UpdateNamespace(string nameSpaceId, UpdateNamespaceParam updateNamespaceParam)
```
> 更新权限分组

#### 参数

- `nameSpaceId` \<string\> 权限分组 ID
- `updates` \<UpdateNamespaceParams\> 需要更新的数据
- `updates.code` \<string\> 可选，权限分组唯一标识符。
- `updates.name` \<string\> 可选，权限分组名称。
- `updates.description` \<string\> 可选，权限分组描述。

#### 示例

```csharp
var result = await managementClient.acl.UpdateNamespace("nameSpaceId");
```

#### 示例数据

```json
{
  "id": 38,
  "appId": null,
  "appName": null,
  "name": "Test Namespace",
  "code": "code",
  "description": "A New Name",
  "status": 1
}
```

## 删除权限分组

```csharp
managementClient.acl.DeleteNamespace(int code)
```
> 删除权限分组

#### 参数

- `code` \<int\> 权限分组 Code

#### 示例

```csharp
var deleted = await managementClient.acl.DeleteNamespace("CODE");
```


## 获取资源列表
```csharp
managementClient.acl.ListResources(ResourceQueryFilter resourceQueryFilter)
```
> 根据筛选条件，查询用户池下的资源列表。

#### 参数
- `params` \<ResourceQueryFilter\>
- `params.NameSpaceCode` \<string\> 权限分组命名空间
- `params.type` \<ResourceType\> 资源类型，可选值为 `DATA`、`API`、`MENU`、`UI`、`BUTTON`。
- `params.FetchAll` \<bool\> 是否拉取全部，true：是 false：否。
- `params.Limit` \<int\> 每页条目数量，默认是 10。
- `params.Page` \<int\> 分页，获取第几页，默认从 1 开始。

#### 示例

```csharp
var option = new ResourceQueryFilter(){
  NameSpaceCode = "NameSpaceCode",
  FetchAll = true ,
}
var res = await managementClient.acl.ListResources(option);
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
            "code": "pih4j7j4ehh",
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
```csharp
managementClient.acl.CreateResource(ResourceParam createResourceParam)
```
> 创建一个资源。

#### 参数

- `options` \<ResourceParam\> 资源信息对象
- `options.Code` \<string\> 资源标识符
- `options.NameSpace` \<string\> 权限分组命名空间
- `options.Type` \<string\> 资源类型，可选值为 `DATA`、`API`、`MENU`、`UI`、`BUTTON`。
- `options.Actions` \<List\<ResourceAction\>\> 资源操作对象数组。其中 name 为操作名称，填写一个**动词**，description 为操作描述，填写述信息。
  - `IAction`: `name` \<string\> 操作名称，`description` \<string\> 描述信息。
- `options.Description` \<string\> 资源描述信息



#### 示例

```csharp
var option = new ResourceParam(){
  Code = "Code",
  NameSpace = "NameSpace" ,
  Type = "DATA"
};
var res = await managementClient.acl.CreateResource(option);
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

## 根据资源代码查询资源

```csharp
managementClient.acl.FindResourceByCode(string code, string nameSpace = "")
```
> 根据资源代码查询资源。

#### 参数

- `code` \<string\> 资源标识符
- `namespace` \<string\> 权限分组命名空间


#### 示例

```csharp
var result = await managementClient.acl.FindResourceByCode("code","nameSpace");
```

#### 返回数据

```json
{
  "userPoolId":"613094503c39c08026363668",
  "code":"gW764",
  "actions":[
    {
      "name":"Action1",
      "description":"desc1"
    }
  ],
  "type":"DATA",
  "description":"desc",
  "namespaceId":46215,
  "createdAt":"Sep 3, 2021 6:52:19 PM",
  "updatedAt":"Sep 3, 2021 6:52:19 PM",
  "id":"6131fe63a8de28f66ca847e6"
}
```

## 根据资源 ID 查询资源

```csharp
managementClient.acl.GetResourceById(string id)
```
> 根据资源 ID 查询资源。

#### 参数

- `id` \<string\> 资源 ID


#### 示例

```csharp
var result = await managementClient.acl.GetResourceById("responseId");
```

#### 返回数据

```json
{
  "userPoolId":"613094503c39c08026363668",
  "code":"gW764",
  "actions":[
    {
      "name":"Action1",
      "description":"desc1"
    }
  ],
  "type":"DATA",
  "description":"desc",
  "namespaceId":46215,
  "createdAt":"Sep 3, 2021 6:52:19 PM",
  "updatedAt":"Sep 3, 2021 6:52:19 PM",
  "id":"6131fe63a8de28f66ca847e6"
}
```

## 更新资源

```csharp
managementClient.acl.UpdateResource(string code, ResourceParam options)
```
> 更新一个资源。

#### 参数

- `code` \<string\> 资源标识符
- `options` \<ResourceParam\> 资源信息对象
- `options.NameSpace` \<string\> 资源所在的权限分组标识
- `options.Type` \<string\> 资源类型，可选值为 `DATA`、`API`、`MENU`、`UI`、`BUTTON`。
- `param.Actions` \<List\<IAction\>\> 资源操作对象数组。其中 name 为操作名称，填写一个**动词**，description
  为操作描述，填写描述信息。
  - `IAction`: `name` \<string\> 操作名称  `description` \<string\> 描述信息
- `options.Description` \<string\> 资源描述信息

#### 示例

```csharp
var options = new ResourceParam()
 { 
  Code = "Book", 
  NameSpace = "test", 
  Description = "HelloWord",
  Type = ResourceType.API
 };
var result = await managementClient.Acl.UpdateResource("Book",options );
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

```csharp
managementClient.acl.DeleteResource(string code, string namespaced)
```
> 删除一个资源。

#### 参数

- `code` \<string\> 资源标识符
- `namespaced` \<string\> 资源所在的权限分组标识

#### 示例

```csharp
var deleted = await managementClient.acl.DeleteResource("CODE", "namespace");
```

#### 返回数据

```json
true
```

## 允许某个用户对某个资源进行某个操作
```csharp
managementClient.acl.Allow(string userid, string nameSpace, string resource, string action)
```
> 允许某个用户对某个资源进行某个操作

#### 参数

- `userid` \<string\> 用户 ID
- `nameSpace` \<string\> 权限分组命名空间
- `action` \<string\> 操作名称，推荐使用 \<resourceType\>:\<actionName\> 的格式，如 `books:edit`，`books:list`。
- `resource` \<string\> 资源名称，必须为 \<resourceType\>:\<resourceId\> 格式或者为 _，如 `_`，`books:123`，`books:\*`。

#### 示例

```csharp 
var result = await managementClient.acl.Allow("userId", "action", "resource")
```

## 批量撤回资源
```csharp 
managementClient.acl.RevokeResource(RevokeResourceParams options)
```
> 批量撤回某个授权主体的资源

#### 参数
- `params` \<RevokeResourceParams\>
- `params.NameSpace` \<string\> 权限分组的 Code，详情请见[使用权限分组管理权限资源](/guides/access-control/resource-group.md)。
- `params.Resource` \<string\> 资源名称，必须为 \<resourceType\>:\<resourceId\> 格式或者为 _，如 `_`，`books:123`，`books:\*`。
- `params.opts` \<List\<RevokeResourceOpt\>\> 
- `params.opts.TargetType.` \<PolicyAssignmentTargetType\> 被授权主体类型
- `params.opts.TargetIdentifier.` \<string\> 被授权主体唯一标识

#### 示例

```csharp 
var options = new RevokeResourceParams()
  {
      NameSpace = "test",
      Opts = new List<RevokeResourceOpt>()
          {
            new RevokeResourceOpt()
             {
              TargetIdentifier = TestUserId,
              TargetType = PolicyAssignmentTargetType.USER
              }
          },
      Resource = "Cat:*"
  };
var result = await managementClient.Acl.RevokeResource(options);
```



## 判断某个用户是否对某个资源有某个操作权限
```csharp
managementClient.acl.IsAllowed(string userId, string resource, string action, string namespacecode = "")
```
> 判断某个用户是否对某个资源有某个操作权限

#### 参数

- `userId` \<string\> 用户 ID
- `action` \<string\> 操作名称，推荐使用 \<resourceType\>:\<actionName\> 的格式，如 `books:edit`，`books:list`。
- `resource` \<string\> 资源名称，必须为 \<resourceType\>:\<resourceId\> 格式或者为 _，如 `_`，`books:123`，`books:\*`。

#### 示例

```csharp
var allowed = await managementClient.acl.IsAllowed("user id", "resource", "action")
```

## 获取用户被授权的所有资源列表
```csharp
managementClient.acl.ListAuthorizedResources(
  PolicyAssignmentTargetType targetType,
  string targetIdentifier,
  string namespace,
  ListAuthorizedResourcesOptions options)
```
> 获取一个用户被授权的所有资源，用户被授权的所有资源里面包括从角色、分组、组织机构继承的资源。

#### 参数

- `targetType` \<PolicyAssignmentTargetType\> 被授权主体类型
- `targetIdentifier` \<string\> 被授权主体唯一标识
- `namespace` \<string\> 权限分组的 Code，详情请见[使用权限分组管理权限资源](/guides/access-control/resource-group.md)。
- `options` \<ListAuthorizedResourcesOptions\> 
- `options.ResourceType` \<string\> 可选，资源类型，默认会返回所有有权限的资源，现有资源类型如下：
    - `DATA`：数据类型；
    - `API`：API 类型数据；
    - `MENU`：菜单类型数据；
    - `BUTTON`：按钮类型数据。

#### 示例

```csharp
var result = await managementClient.acl.listAuthorizedResources("USER", "targetIdentifier", "default", "BUTTON");
```

## 获取角色被授权的所有资源列表
```csharp
RolesManagementClient.Role.ListAuthorizedResources(string code, string nameSpace, ResourceType resourceType = default);
```
> 获取一个角色被授权的所有资源。

#### 参数

- `code` \<string\> 角色 Code
- `namespace` \<string\> 权限分组的 Code，详情请见[使用权限分组管理权限资源](/guides/access-control/resource-group.md)。
- `resourceType` \<string\> 可选，资源类型，默认会返回所有有权限的资源，现有资源类型如下：
    - `DATA`：数据类型；
    - `API`：API 类型数据；
    - `MENU`：菜单类型数据；
    - `BUTTON`：按钮类型数据。

#### 示例

```csharp
var result = await RolesManagementClient.Role.ListAuthorizedResources("CODE", "nameSpace", "DATA");
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

## 获取分组被授权的所有资源列表
```csharp
ManagementClient.Groups.ListAuthorizedResources(string code, string _namespace, ResourceType resourceType = default);
```
> 获取一个分组被授权的所有资源。

#### 参数

- `code` \<string\> 分组 Code
- `_namespace` \<string\> 权限分组的 Code，详情请见[使用权限分组管理权限资源](/guides/access-control/resource-group.md)。
- `resourceType` \<string\> 可选，资源类型，默认会返回所有有权限的资源，现有资源类型如下：
    - `DATA`：数据类型；
    - `API`：API 类型数据；
    - `MENU`：菜单类型数据；
    - `BUTTON`：按钮类型数据。

#### 示例

```csharp
var result = await ManagementClient.Groups.ListAuthorizedResources("CODE", "nameSpace", "DATA");
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

## 获取部门被授权的所有资源列表
```csharp
ManagementClient.org.listAuthorizedResourcesByNodeId(string nodeId, string nameSpace, ResourceType resourceType = ResourceType.DATA)
```
> 获取一个部门被授权的所有资源。

#### 参数

- `nodeId` \<string\> 部门 ID
- `nameSpace` \<string\> 权限分组的 Code，详情请见[使用权限分组管理权限资源](/guides/access-control/resource-group.md)。
- `ResourceType` \<string\> 可选，资源类型，默认会返回所有有权限的资源，现有资源类型如下：
  - `DATA`：数据类型；
  - `API`：API 类型数据；
  - `MENU`：菜单类型数据；
  - `BUTTON`：按钮类型数据。

#### 示例

```csharp
var result = await managementClient.org.listAuthorizedResourcesByNodeId("nodeId", "nameSpace", "BUTTON");
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

## 获取具备某些资源操作权限的主体
```csharp
managementClient.acl.GetAuthorizedTargets(GetAuthorizedTargetsOptions getAuthorizedTargetsOptions)
```
> 传入权限分组、资源标识、资源类型、操作权限项、主体类型，返回具备资源操作权限的主体标识符。

#### 参数

- `options` \<GetAuthorizedTargetsOptions\> 筛选条件对象
- `options.NameSpace` \<string\> 权限分组的 Code，详情请见[使用权限分组管理权限资源](/guides/access-control/resource-group.md)。
- `options.ResourceType` \<ResourceType\> 资源类型，现有资源类型如下：
  - `DATA`：数据类型；
  - `API`：API 类型数据；
  - `MENU`：菜单类型数据；
  - `BUTTON`：按钮类型数据。
- `options.Actions` \<AuthorizedTargetsActionsInput\> 操作
  - `actions.op` \<string\> 可选值为 `AND`、`OR`，表示 list 中的操作关系是和还是或。
  - `actions.list` \<List\<string\>\> 操作，例如 `["read", "write"]`。
- `options.TargetType` \<PolicyAssignmentTargetType\> 主体类型，可选值为 `USER`、`ROLE`、`ORG`、`GROUP`，含义为用户、角色、组织机构节点、用户分组。



#### 示例数据

- `targetType` 主体类型
- `targetIdentifier` 主体标识符，可能是用户 ID、角色 ID、组织结构节点 ID、用户分组 ID。
- `actions` 用户被授权对该资源的操作

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


## 获取应用访问控制策略
```csharp
managementClient.acl.GetApplicationAccessPolicies(AppAccessPolicyQueryFilter options)
```
获取一个应用的访问控制策略。

#### 参数

- `options` \<IAppAccessPolicyQueryFilter\> 传入配置
- `options.AppId` \<string\> 应用 ID
- `options.Page` \<int\> 分页，获取第几页，默认从 1 开始
- `options.Limit` \<int\> 每页条目数量，默认为 10 个

#### 示例

```csharp
var option = new AppAccessPolicyQueryFilter() {
      appId= "appId",
      page=1, 
      limit=10
    }
var res = managementClient.acl.GetApplicationAccessPolicies(option);
```

#### 示例数据

```json
{
  "list": [
    {
      "assignedAt": "2021-04-06T12:41:33.876Z",
      "inheritByChildren": true,
      "enabled": true,
      "policyId": "60668da2bebdc82f051f3bf4",
      "code": "ApplicationLoginAccess:cNngSbDBe",
      "policy": {
        "id": "60668da2bebdc82f051f3bf4",
        "createdAt": "2021-04-02T03:21:06.645Z",
        "updatedAt": "2021-04-02T03:21:06.645Z",
        "userPoolId": "600a8f29cead8fc0127f9da6",
        "isDefault": true,
        "isAuto": false,
        "hidden": true,
        "code": "ApplicationLoginAccess:cNngSbDBe",
        "description": "允许登录应用 600a8f4e37708b363024a3ca",
        "statements": [
          {
            "resource": "arn:cn:authing:600a8f29cead8fc0127f9da6:application:600a8f4e37708b363024a3ca",
            "actions": ["application:login"],
            "effect": "ALLOW",
            "condition": [],
            "resourceType": null
          }
        ],
        "namespaceId": 22997
      },
      "targetType": "ORG",
      "targetIdentifier": "606c566a6fb32f97cf12002c",
      "target": {
        "id": "606c566a6fb32f97cf12002c",
        "createdAt": "2021-04-06T12:39:06.472Z",
        "updatedAt": "2021-04-06T12:39:06.472Z",
        "userPoolId": "600a8f29cead8fc0127f9da6",
        "orgId": "606c565526b6b92785462033",
        "name": "勘探研究院",
        "nameI18n": null,
        "description": null,
        "descriptionI18n": null,
        "order": null,
        "code": "kantan",
        "__id": null,
        "__parentid": null,
        "__groupid": null,
        "source": [],
        "dataVersion": null,
        "sourceData": null
      },
      "namespace": "600a8f4e37708b363024a3ca"
    },
    {
      "assignedAt": "2021-04-06T12:38:14.003Z",
      "inheritByChildren": null,
      "enabled": true,
      "policyId": "60668da2bebdc82f051f3bf4",
      "code": "ApplicationLoginAccess:cNngSbDBe",
      "policy": {
        "id": "60668da2bebdc82f051f3bf4",
        "createdAt": "2021-04-02T03:21:06.645Z",
        "updatedAt": "2021-04-02T03:21:06.645Z",
        "userPoolId": "600a8f29cead8fc0127f9da6",
        "isDefault": true,
        "isAuto": false,
        "hidden": true,
        "code": "ApplicationLoginAccess:cNngSbDBe",
        "description": "允许登录应用 600a8f4e37708b363024a3ca",
        "statements": [
          {
            "resource": "arn:cn:authing:600a8f29cead8fc0127f9da6:application:600a8f4e37708b363024a3ca",
            "actions": ["application:login"],
            "effect": "ALLOW",
            "condition": [],
            "resourceType": null
          }
        ],
        "namespaceId": 22997
      },
      "targetType": "GROUP",
      "targetIdentifier": "userfolder",
      "target": {
        "id": "606c56241ad7c407cc0d7b3d",
        "createdAt": "2021-04-06T12:37:56.193Z",
        "updatedAt": "2021-04-06T12:37:56.193Z",
        "userPoolId": "600a8f29cead8fc0127f9da6",
        "code": "userfolder",
        "name": "userfolder",
        "description": "userfolder",
        "externalId": null
      },
      "namespace": "600a8f4e37708b363024a3ca"
    },
    {
      "assignedAt": "2021-04-06T12:38:10.087Z",
      "inheritByChildren": null,
      "enabled": true,
      "policyId": "60668da2bebdc82f051f3bf4",
      "code": "ApplicationLoginAccess:cNngSbDBe",
      "policy": {
        "id": "60668da2bebdc82f051f3bf4",
        "createdAt": "2021-04-02T03:21:06.645Z",
        "updatedAt": "2021-04-02T03:21:06.645Z",
        "userPoolId": "600a8f29cead8fc0127f9da6",
        "isDefault": true,
        "isAuto": false,
        "hidden": true,
        "code": "ApplicationLoginAccess:cNngSbDBe",
        "description": "允许登录应用 600a8f4e37708b363024a3ca",
        "statements": [
          {
            "resource": "arn:cn:authing:600a8f29cead8fc0127f9da6:application:600a8f4e37708b363024a3ca",
            "actions": ["application:login"],
            "effect": "ALLOW",
            "condition": [],
            "resourceType": null
          }
        ],
        "namespaceId": 22997
      },
      "targetNamespace": "600a8f4e37708b363024a3ca",
      "targetType": "ROLE",
      "targetIdentifier": "admin",
      "target": {
        "id": "606c55fff48c68be7d0786eb",
        "createdAt": "2021-04-06T12:37:19.971Z",
        "updatedAt": "2021-04-06T12:37:19.971Z",
        "userPoolId": "600a8f29cead8fc0127f9da6",
        "code": "admin",
        "description": "admin",
        "parentCode": null,
        "isSystem": false,
        "namespaceId": 22997
      },
      "namespace": "600a8f4e37708b363024a3ca"
    },
    {
      "assignedAt": "2021-04-06T08:09:30.597Z",
      "inheritByChildren": null,
      "enabled": true,
      "policyId": "60668da2bebdc82f051f3bf4",
      "code": "ApplicationLoginAccess:cNngSbDBe",
      "policy": {
        "id": "60668da2bebdc82f051f3bf4",
        "createdAt": "2021-04-02T03:21:06.645Z",
        "updatedAt": "2021-04-02T03:21:06.645Z",
        "userPoolId": "600a8f29cead8fc0127f9da6",
        "isDefault": true,
        "isAuto": false,
        "hidden": true,
        "code": "ApplicationLoginAccess:cNngSbDBe",
        "description": "允许登录应用 600a8f4e37708b363024a3ca",
        "statements": [
          {
            "resource": "arn:cn:authing:600a8f29cead8fc0127f9da6:application:600a8f4e37708b363024a3ca",
            "actions": ["application:login"],
            "effect": "ALLOW",
            "condition": [],
            "resourceType": null
          }
        ],
        "namespaceId": 22997
      },
      "targetType": "USER",
      "targetIdentifier": "606c173a6111bfa6663948e5",
      "target": {
        "id": "606c173a6111bfa6663948e5",
        "createdAt": "2021-04-06T08:09:30.080Z",
        "updatedAt": "2021-04-06T08:09:30.080Z",
        "userPoolId": "600a8f29cead8fc0127f9da6",
        "isRoot": false,
        "status": "Activated",
        "oauth": null,
        "email": null,
        "phone": null,
        "username": "6lglnofn4med",
        "unionid": null,
        "openid": null,
        "nickname": null,
        "company": null,
        "photo": "https://files.authing.co/authing-console/default-user-avatar.png",
        "browser": null,
        "device": null,
        "password": "2c7b3c25ed9f046f9e7deb4ad2bb720c",
        "salt": "5b9c8nblajm7",
        "token": null,
        "tokenExpiredAt": null,
        "loginsCount": 0,
        "lastIp": null,
        "name": null,
        "givenName": null,
        "familyName": null,
        "middleName": null,
        "profile": null,
        "preferredUsername": null,
        "website": null,
        "gender": "U",
        "birthdate": null,
        "zoneinfo": null,
        "locale": null,
        "address": null,
        "formatted": null,
        "streetAddress": null,
        "locality": null,
        "region": null,
        "postalCode": null,
        "city": null,
        "province": null,
        "country": null,
        "registerSource": ["import:manual"],
        "secretInfo": null,
        "emailVerified": false,
        "phoneVerified": false,
        "lastLogin": null,
        "blocked": false,
        "isDeleted": false,
        "sendSmsCount": 0,
        "sendSmsLimitCount": 1000,
        "dataVersion": null,
        "encryptedPassword": "UFHmd5kr5+xI2LD6sGgqpCEBIvPMTSt+83jRty3fCDxFjucSuhpVUtz6tp8kS93qad61FAsO9aS8DqThqoe1hUw4UlSQIuB/sC7p7yHDh0ak+i94ShY3uD6f9YzdRp4zIMAxwTj5/WFyL2S2IIHUBt1qR0/iEz569cdTR5zLr5c=",
        "signedUp": "2021-04-06T08:09:30.080Z",
        "externalId": null,
        "mainDepartmentId": null,
        "mainDepartmentCode": null,
        "lastMfaTime": null,
        "passwordSecurityLevel": 1,
        "source": null,
        "identities": []
      },
      "namespace": "600a8f4e37708b363024a3ca"
    }
  ],
  "totalCount": 4
}
```

## 启用应用访问控制策略
```csharp
managementClient.acl.EnableApplicationAccessPolicy(AppAccessPolicy options)
```

启用一个应用的访问控制策略。

#### 参数


- `options` \<AppAccessPolicy\> 传入配置
- `options.AppId` \<string\> 应用 ID
- `options.TargetType` \<TargetTypeEnum\> 主体类型，枚举值为 `USER`、`ROLE`、`GROUP`、`ORG`
<!-- 单词拼写拼写错误 -->
- `options.TargetIdentifiers` \<string\> 主体标识符，可以为用户 id、角色标识符、分组标识符、组织机构节点标识符
- `options.NameSpace` \<string\> 当 targetType 为 `ROLE`、`GROUP`、`ORG` 时，填写其所在的权限分组标识符
- `options.InheritByChildren` \<Boolean\> 当 `targetType` 为 `ORG` 时，用于指定组织机构的子节点是否继承该策略

#### 示例

```csharp
var result = await managementClient.acl.EnableApplicationAccessPolicy(new AppAccessPolic()
{
    AppId = "AppId",
    InheritByChildren = null,
    NameSpace = "default",
    TargetType = "USER",
    TargetIdentifiers = new List<string>() { "61a5c55fc89ff91083293e45" }
});
```

#### 示例数据

```json
{ "code": 200, "data": true, "message": "启用应用访问控制策略成功" }
```

## 停用应用访问控制策略
```csharp
managementClient.acl.DisableApplicationAccessPolicy(AppAccessPolicy options)
```
停用一个应用的访问控制策略。

#### 参数

- `options` \<AppAccessPolicy\> 传入配置
- `options.AppId` \<string\> 应用 ID
- `options.TargetType` \<TargetTypeEnum\> 主体类型，枚举值为 `USER`、`ROLE`、`GROUP`、`ORG`
<!-- 单词拼写拼写错误 -->
- `options.TargetIdentifiers` \<string\> 主体标识符，可以为用户 id、角色标识符、分组标识符、组织机构节点标识符
- `options.NameSpace` \<string\> 当 targetType 为 `ROLE`、`GROUP`、`ORG` 时，填写其所在的权限分组标识符
- `options.InheritByChildren` \<Boolean\> 当 `targetType` 为 `ORG` 时，用于指定组织机构的子节点是否继承该策略

#### 示例

```csharp
var result = await managementClient.acl.DisableApplicationAccessPolicy(new AppAccessPolicy()
{
    AppId = AppId,
    InheritByChildren = null,
    NameSpace = "default",
    TargetType = PolicyAssignmentTargetType.USER,
    TargetIdentifiers = new List<string>() { "61a5c55fc89ff91083293e45" }
});
```

#### 示例数据

```json
{ "code": 200, "data": true, "message": "停用应用访问控制策略成功" }
```

## 删除应用访问控制策略

```csharp
managementClient.acl.DeleteApplicationAccessPolicy(AppAccessPolicy options)
```
删除一个应用的访问控制策略。

#### 参数

- `options` \<AppAccessPolicy\> 传入配置
- `options.AppId` \<string\> 应用 ID
- `options.TargetType` \<TargetTypeEnum\> 主体类型，可选值为 `USER`、`ROLE`、`GROUP`、`ORG`
- `options.TargetIdentifiers` \<string\> 主体标识符，可以为用户 id、角色标识符、分组标识符、组织机构节点标识符
- `options.NameSpace` \<string\> 当 targetType 为 `ROLE`、`GROUP`、`ORG` 时，填写其所在的权限分组标识符
- `options.InheritByChildren` \<Boolean\> 当 `targetType` 为 `ORG` 时，用于指定组织机构的子节点是否继承该策略

#### 示例

```csharp
var options = new AppAccessPolicy()
  {
      AppId = AppId,
      InheritByChildren = null,
      NameSpace = "default",
      TargetType = PolicyAssignmentTargetType.USER,
      TargetIdentifiers = new List<string>() { "61a5c55fc89ff91083293e45" }
  };
 var result = await managementClient.acl.DeleteApplicationAccessPolicy(options)
```

#### 示例数据

```json
{ "code": 200, "data": true, "message": "删除应用访问控制策略成功" }
```

## 配置「允许主体（用户、角色、分组、组织机构节点）访问应用」的控制策略
```csharp
managementClient.acl.AllowAccessApplication(AppAccessPolicy options)
```
配置「允许主体（用户、角色、分组、组织机构节点）访问应用」的控制策略。

#### 参数

- `options` \<AppAccessPolicy\> 传入配置
- `options.AppId` \<string\> 应用 ID
- `options.TargetType` \<TargetTypeEnum\> 主体类型，可选值为 `USER`、`ROLE`、`GROUP`、`ORG`
- `options.TargetIdentifiers` \<string\> 主体标识符，可以为用户 id、角色标识符、分组标识符、组织机构节点标识符
- `options.NameSpace` \<string\> 当 targetType 为 `ROLE`、`GROUP`、`ORG` 时，填写其所在的权限分组标识符
- `options.InheritByChildren` \<Boolean\> 当 `targetType` 为 `ORG` 时，用于指定组织机构的子节点是否继承该策略

#### 示例

```csharp
var options = new AppAccessPolicy()
  {
      AppId = AppId,
      InheritByChildren = null,
      NameSpace = "default",
      TargetType = PolicyAssignmentTargetType.USER,
      TargetIdentifiers = new List<string>() { "61a5c55fc89ff91083293e45" }
  };
var result = await managementClient.acl.AllowAccessApplication(options);
```

#### 示例数据

```json
{ "code": 200, "data": true, "message": "允许主体访问应用的策略配置已生效" }
```

## 配置「拒绝主体（用户、角色、分组、组织机构节点）访问应用」的控制策略
```csharp
managementClient.acl.DenyAccessApplication(AppAccessPolicy options)
```
配置「拒绝主体（用户、角色、分组、组织机构节点）访问应用」的控制策略。

#### 参数

- `options` \<AppAccessPolicy\> 传入配置
- `options.AppId` \<string\> 应用 ID
- `options.TargetType` \<TargetTypeEnum\> 主体类型，可选值为 `USER`、`ROLE`、`GROUP`、`ORG`
- `options.TargetIdentifiers` \<string\> 主体标识符，可以为用户 id、角色标识符、分组标识符、组织机构节点标识符
- `options.NameSpace` \<string\> 当 targetType 为 `ROLE`、`GROUP`、`ORG` 时，填写其所在的权限分组标识符
- `options.InheritByChildren` \<Boolean\> 当 `targetType` 为 `ORG` 时，用于指定组织机构的子节点是否继承该策略

#### 示例

```csharp
var options = new AppAccessPolicy()
{
    AppId = AppId,
    InheritByChildren = null,
    NameSpace = "default",
    TargetType = PolicyAssignmentTargetType.USER,
    TargetIdentifiers = new List<string>() { "61a5c55fc89ff91083293e45" }
};
var result = await managementClient.acl.DenyAccessApplication(options);
```

#### 示例数据

```json
{ "code": 200, "data": true, "message": "拒绝主体访问应用的策略配置已生效" }
```

## 更改默认应用访问策略
```csharp
managementClient.acl.UpdateDefaultApplicationAccessPolicy(DefaultAppAccessPolicy options)
```
修改默认应用访问策略：默认拒绝所有用户访问应用、默认允许所有用户访问应用

#### 参数

- `options` \<DefaultAppAccessPolicy\> 传入配置项
- `options.AppId` \<string\> 应用 ID
- `options.DefaultStrategy` \<DefaultStrategy\> 默认应用访问策略，可选值为 `ALLOW_ALL`、`DENY_ALL`，含义为默认允许所有用户访问、拒绝所有用户访问

#### 示例

```csharp
var options =  new DefaultAppAccessPolicy()
  {
      AppId = AppId,
      DefaultStrategy = DefaultStrategy.ALLOW_ALL,
  };
var result = await managementClient.acl.UpdateDefaultApplicationAccessPolicy(options);
```

#### 示例数据

```json
{
  "qrcodeScanning": {
    "redirect": false,
    "interval": 1500
  },
  "id": "600a8f4e37708b363024a3ca",
  "createdAt": "2021-01-22T08:39:43.970Z",
  "updatedAt": "2021-04-06T13:30:07.477Z",
  "userPoolId": "600a8f29cead8fc0127f9da6",
  "protocol": "oidc",
  "isOfficial": false,
  "isDeleted": false,
  "isDefault": false,
  "name": "bazooka",
  "description": null,
  "identifier": "bazooka1",
  "jwks": {
    "keys": [
      {
        "e": "AQAB",
        "n": "rc_YUeVUD6xPF6-9yuL2OXVZukRqmOgg3t0VOb_PYbGOSptBeHAhe4YZhWj_beKTl-9HcN_5ucRur_3Bb8wpVvEWYBuAgcy0PuuamSX13bKg4hqP7JblYIot_nV8kwJJG958jxW1VyEX0OjApiNyWobEvHwgBPUB5DbpjRzfT7BOY-MJ4Qlqhzq51ubdQvLJHp4_vf0-0APW-YNffJaoILS_FyCeP_CM_HvlMpCnlWyye3PX2ybmijaiA5sI2aj0vdOkytEVWZx8K0F4vc348grr7dTn-l8R64524xfkEqbWS7a59XtMdo1A02SMrsNPPtmNM8Aobg7AroxEDdmc9w",
        "d": "Km0Kc2sT6sN3huOZ4zUlPv87CLF8h5hZtaynarI8L6-EeQeOopRUR--CuULY3nyo5DQ-7vls3oBpOEIrfluKV7N_b7Qm2QgbkyQ1V16hthzNEoPDT8_Ba6Au--a3orazG79iDhcRbZQhWRgHNkZ-ukQdL5jow-z-KjORLKW4iJ2sSropK_5da7ftjR3Atldn5p0_K5J_o9fzNSq72J2KpRTqWKhcg7f2D6hNX2yC0IZiwNTyBYqY9bj0p0OfRVi9B1CyDjAQ5GExCzRHZeW_fxMjYNddGl2UyEEp8OJzks6ftTyOGD1Pv_YDSUaICtUXLHCQkp4aIurPpYLt1xtjWQ",
        "p": "3_vXEJp4jWrRKalAUk9-F9SlfqPfdMz-FdFcc-Fonbg6zKVNi-UXD5ozfVSLxlZ8cR_Y73sj2NZrZMan8fRMmwpk2kYLBU1oFsnQwb3Rd6wYywsb-qw9kd1fxo0WbGyAArMVTCgUI1CN6kL4pRae3fadoS8--VpNWEN7ZwXkOOM",
        "q": "xqgVYpbDqqb19AU0w6HSmCHFEWyJgH0RY0wgsejmdH9-5rBy7EQ2tfXrsypvbI0ob_iZcBKci9lOaOghFumV2_LPH4thh9KwRLppbIDO497cPr9gOSXTCP7mfwORaDO2B3bT-iLN8rvei0X-lUTgaeVzpOnRG1hcd8q9FQJOS90",
        "dp": "Nc3qYLuqn9X7_rUAlYUw9gqH4r78y7L-ikEro06PceuyfDxtP2C9xGq3WbD4jqFx7T7IPubmuozvaVrrNw0HZer-RQy0UwbALVE3i4LMkaHOpt-5TeMYOzThb_GuZEdADOX2BMBP7hfIr3B9CDNB4HIAdZrC1uVhVQWI3DunEh8",
        "dq": "d8_MBgfzvqqv0BqLtimU_9fuKRIS5AGKSR8S4Pocc8qpWKy2wzRo4tmM7CP9y7Re3RlMQUGYVOgc2DyYKF982IjazqWbjvVNBkZ_asdNADXbE6UMfasIWnaRwaz_N59oe5v5QPVYzLrt_4WZg6Fkz7lpQ98ZFKr4Ke-GlnMrkak",
        "qi": "XzXay0PADNPQ9BHQuQ5EYzHGPk247Tyy-XpuVRvT-3Jm0uemF5uGf-wMtH2SHzspp-9SvphwnXhNAyFYas-b4Agb4oRrcwtTKMJmkcxjC0v1hgOvBzRFSM9X8y9Xev3cd2lJd_vuOKeK4COgPllrkBBzQ-VExKtFNM2ogLHQH_k",
        "kty": "RSA",
        "kid": "VgEx8UtFMPwTf4htfvzghLtSsmr-pJoFqusaRM29Qfc",
        "alg": "RS256",
        "use": "sig"
      }
    ]
  },
  "ssoPageCustomizationSettings": null,
  "logo": "https://files.authing.co/authing-console/default-app-logo.png",
  "redirectUris": ["https://yelexin.cn"],
  "logoutRedirectUris": [],
  "oidcProviderEnabled": true,
  "oauthProviderEnabled": false,
  "samlProviderEnabled": false,
  "casProviderEnabled": false,
  "registerDisabled": false,
  "logintabs": ["phone-code", "password"],
  "defaultLogintab": "password",
  "registerTabs": ["email", "phone"],
  "defaultRegisterTab": "email",
  "ldapConnections": null,
  "adConnections": [],
  "disabledSocialConnections": null,
  "disabledOidcConnections": [],
  "disabledSamlConnections": [],
  "disabledOauth2Connections": [],
  "disabledCasConnections": [],
  "disabledAzureAdConnections": [],
  "extendsFieldsEnabled": false,
  "extendsFields": [],
  "ext": null,
  "css": "/* \n  在此编辑认证页面的 css 代码\n  如：\n  body {\n    background: #6699 !important;\n  } \n  用于修改背景色\n*/",
  "oidcConfig": {
    "grant_types": ["authorization_code", "refresh_token"],
    "response_types": ["code"],
    "id_token_signed_response_alg": "RS256",
    "token_endpoint_auth_method": "client_secret_post",
    "authorization_code_expire": 600,
    "id_token_expire": 1209600,
    "access_token_expire": 1209600,
    "refresh_token_expire": 2592000,
    "cas_expire": 1209600,
    "skip_consent": true,
    "redirect_uris": ["https://yelexin.cn"],
    "post_logout_redirect_uris": [],
    "client_id": "600a8f4e37708b363024a3ca",
    "introspection_endpoint_auth_method": "client_secret_post",
    "revocation_endpoint_auth_method": "client_secret_post"
  },
  "samlConfig": null,
  "oauthConfig": {
    "id": "600a8f4e37708b363024a3ca",
    "redirect_uris": ["https://yelexin.cn"],
    "grants": ["authorization_code"],
    "access_token_lifetime": 1209600,
    "refresh_token_lifetime": 2592000,
    "introspection_endpoint_auth_method": "client_secret_post",
    "revocation_endpoint_auth_method": "client_secret_post"
  },
  "casConfig": null,
  "showAuthorizationPage": false,
  "enableSubAccount": false,
  "loginRequireEmailVerified": false,
  "agreementEnabled": false,
  "skipMfa": false,
  "permissionStrategy": {
    "enabled": true,
    "defaultStrategy": "ALLOW_ALL",
    "allowPolicyId": "60668da2bebdc82f051f3bf4",
    "denyPolicyId": "60668da2d8ee483c3a37c0aa"
  }
}
```

-->


## 资源授权
```csharp
managementClient.acl.authorizeResource
  ( 
    string namespacecode,
    string resource,
    IEnumerable<AuthorizeResourceOpt> authorizeResourceOptions
  )
```
> 将一个（类）资源授权给用户、角色、分组、组织机构，且可以分别指定不同的操作权限

#### 参数

- `namespace` \<string\> 传入配置项
- `resourceCode` \<string\> 应用 ID
- `inputs` \<List\<AuthorizeResourceOpt\>\>  资源授权对象
- `inputs.TargetType` \<PolicyAssignmentTargetType\>  主体类型，可选值为 `USER`、`ROLE`、`GROUP`、`ORG`。
- `inputs.TargetIdentifier` \<string\> 主体标识符，可以为用户 id、角色标识符、分组标识符、组织机构节点标识符。
- `inputs.Actions` \<List\<string\>\> 资源操作对象的名称的集合

#### 示例

```csharp
var result = await managementClient.acl.AuthorizeResource
(
  "test", 
  "Cat:*"，
  new List<AuthorizeResourceOpt>()
  {
    new AuthorizeResourceOpt
      (
        PolicyAssignmentTargetType.USER,"61a5c55fc89ff91083293e45",
        new List<string>(){"Cat:Read"}
      )
  }
);
```

#### 示例数据

```json
{"message":"授权资源成功","code":200}
```


## 刷新编程访问账号密钥
```csharp
managementClient.acl.RefreshProgrammaticAccessAccountSecret(ProgrammaticAccessAccountProps options)
```
> 刷新编程访问账号密钥

#### 参数

- `param` \<ProgrammaticAccessAccountProps\> 编程访问账号信息
- `param.Id` \<string\> 编程访问账号 ID
- `param.Secret` \<string>\> 编程访问账号秘钥

#### 示例

```csharp
managementClient.acl.refreshProgrammaticAccessAccountSecret(
  new {
        Id = "programmaticAccessAccountId",
        Secret = "programmaticAccessAccountSecret"
      }
);
```

#### 示例数据

```json
{
  "id":"613202b22dfe14ceb3c29133",
  "createdAt":"2021-09-03T11:10:42.458Z",
  "updatedAt":"2021-09-03T11:10:44.244Z",
  "appId":"61309451a88c76f88ea63836",
  "secret":"bcf7f9fea856b15665ceb914458e29df",
  "remarks":"",
  "tokenLifetime":600,
  "enabled":true
}
```

## 编程访问账号列表
```csharp
managementClient.acl.ProgrammaticAccessAccountList(ProgrammaticAccessAccountListProps options)
```
> 编程访问账号列表

#### 参数

- `param` \<ProgrammaticAccessAccountListProps\> 编程访问账号信息
- `param.AppId` \<string\> 应用 ID
- `param.Limit` \<int\> 每页个数 默认值：10。
- `param.Page` \<int\> 页码数 默认值：1。


#### 示例

```csharp
managementClient.acl.programmaticAccessAccountList(new ProgrammaticAccessAccountListProps(){AppId = "appid"})
```

#### 示例数据

```json
{
  "id":"613202b22dfe14ceb3c29133",
  "createdAt":"2021-09-03T11:10:42.458Z",
  "updatedAt":"2021-09-03T11:10:44.244Z",
  "appId":"61309451a88c76f88ea63836",
  "secret":"bcf7f9fea856b15665ceb914458e29df",
  "remarks":"",
  "tokenLifetime":600,
  "enabled":true
}
```

## 添加编程访问账号
```csharp
managementClient.acl.CreateProgrammaticAccessAccount(string appId, CreateProgrammaticAccessAccountParam createProgrammaticAccessAccountParam, CancellationToken cancellationToken = default)
```
> 添加编程访问账号

#### 参数

- `param` \<CreateProgrammaticAccessAccountParam\> 编程访问账号信息
- `appId` \<string\> 应用 ID
- `param.Remarks` \<string\> 备注
- `param.Token_lifetime` \<int\> token 存活时间


#### 示例

```csharp
var options = new CreateProgrammaticAccessAccountParam() 
{ 
  Remarks = "测试创建编程账户",
  AppId = AppId, Token_lifetime = 600 
}
ar result = await managementClient.Acl.CreateProgrammaticAccessAccount(AppId,options);
```

#### 示例数据

```json
{
  "id":"6135df20aca5398ec949dd56",
  "createdAt":"2021-09-06T09:28:00.133Z",
  "updatedAt":"2021-09-06T09:28:00.133Z",
  "appId":"61309451a88c76f88ea63836",
  "secret":"31467e25a51a8e97c5fc15fd98bddec5",
  "remarks":"",
  "tokenLifetime":600,
  "enabled":true
}
```

## 删除编程访问账号
```csharp
managementClient.acl.DeleteProgrammaticAccessAccount(string programmaticAccessAccountId)
```
> 删除编程访问账号

#### 参数

- `programmaticAccessAccountId` \<string\> 编程访问账号 ID


#### 示例

```csharp
 var result = await managementClient.Acl.DeleteProgrammaticAccessAccount("123");
```

#### 示例数据

```json
true
```


## 启用编程访问账号
```csharp
managementClient.acl.EnableProgrammaticAccessAccount(string programmaticAccessAccountId)
```
> 启用编程访问账号

#### 参数

- `programmaticAccessAccountId` \<string\>  编程访问账号 ID

#### 示例

```csharp
var result = await managementClient.Acl.EnableProgrammaticAccessAccount("123");
```

#### 示例数据

```json
{
  "id":"6135dffe0e00ddfcb2059595",
  "createdAt":"2021-09-06T09:31:42.990Z",
  "updatedAt":"2021-09-06T09:31:43.704Z",
  "appId":"61309451a88c76f88ea63836",
  "secret":"490f888890afe70835c80c5c96466474",
  "remarks":"",
  "tokenLifetime":600,
  "enabled":true
}
```


## 禁用编程访问账号
```csharp
managementClient.acl.DisableProgrammaticAccessAccount(string programmaticAccessAccountId  )
```
> 禁用编程访问账号

#### 参数

- `programmaticAccessAccountId` \<string\>  编程访问账号 ID


#### 示例

```csharp
var result = await managementClient.acl.DisableProgrammaticAccessAccount("id");
```

#### 示例数据

```json
{
  "id":"6135e5428e7b130697128390",
  "createdAt":"2021-09-06T09:54:10.239Z",
  "updatedAt":"2021-09-06T09:54:11.746Z",
  "appId":"61309451a88c76f88ea63836",
  "secret":"48d78736579dd37d189e4dbe25916348",
  "remarks":"",
  "tokenLifetime":600,
  "enabled":false
}
```

