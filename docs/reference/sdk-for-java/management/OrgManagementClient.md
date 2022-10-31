---
meta:
  - name: description
    content: 管理组织机构
---

# 管理组织机构

<LastUpdated/>


> 一个 {{$localeConfig.brandName}} 用户池可以创建多个组织机构。此模块用于管理 {{$localeConfig.brandName}} 组织机构，可以进行组织机构的增删改查、添加删除移动节点、导入组织机构等操作。

## 创建组织机构

OrgManagementClient().create(param)

> 创建组织机构，会创建一个只有一个节点的组织机构。
> 如果你想将一个完整的组织树导入进来，请使用 importByJson 方法。

#### 参数

- `param` \<CreateOrgParam\>
- `param.name` \<String\> 组织机构名称，该名称会作为该组织机构根节点的名称。
- `param.code` \<String\> 根节点唯一标志，必须为合法的英文字符。
- `param.description` \<String\> 根节点描述

#### 示例

```java
Org org = managementClient.org().create(new CreateOrgParam("name1", "org1", "desc1")).execute();
```

## 删除组织机构

OrgManagementClient().deleteById(id)

> 删除组织机构树

#### 参数

- `id` \<String\> 组织机构 ID

#### 示例

```java
managementClient.org().deleteById("id").execute();
```

## 获取用户池组织机构列表

OrgManagementClient().list(param)

> 获取用户池组织机构列表

#### 参数

- `param` \<OrgsParam\>
- `param.page` \<Integer\> 页码，默认值：`1`。
- `param.limit` \<Integer\> 每页展示条数，默认值：`10`。
- `param.sortBy` \<SortByEnum\> 排序规则

#### 示例

```java
PaginatedOrgs orgs = managementClient.org().list(new OrgsParam(1, 10, SortByEnum.CREATEDAT_DESC)).execute();
```

## 根据节点 Id 查询节点

OrgManagementClient().findNodeById(nodeId)

> 根据节点 Id 查询节点

#### 参数

- `nodeId` \<String\> 节点 ID

#### 示例

```java
Node node = managementClient.org().findNodeById("nodeId").execute();
```

## 添加节点

OrgManagementClient().addNode(param)

> 在组织机构中添加一个节点

#### 参数

- `param` \<AddNodeV2Param\>
- `param.orgId` \<String\> 组织机构 ID
- `param.parentNodeId` \<String\> 父节点 ID
- `param.name` \<String\> 节点名称
- `param.nameI18n` \<String\> 节点名称，国际化。
- `param.code` \<String\> 节点唯一标志
- `param.description` \<String\> 节点描述信息
- `param.descriptionI18n` \<String\> 节点描述信息国际化

#### 示例

```java
AddNodeV2Param param = new AddNodeV2Param("orgId", "orgName").withParentNodeId("parentId");
Node node = managementClient.org().addNode(param).execute();
```

## 修改节点

OrgManagementClient().updateNode(param)

> 修改节点数据

#### 参数

- `param` \<UpdateNodeParam\>
- `param.id` \<String\> 节点唯一标志
- `param.code` \<String\> 节点唯一标志
- `param.name` \<String\> 节点名称
- `param.description` \<String\> 节点描述信息

#### 示例

```java
UpdateNodeParam param = new UpdateNodeParam(0, "");
param.setId("id");
param.setName("name");
param.setDescription("description");
Node node = managementClient.org().updateNode(param).execute();
```

## 获取组织机构详情

OrgManagementClient().findById(id)

> 通过组织机构 ID 获取组织机构详情

#### 参数

- `id` \<String\> 组织机构 ID

#### 示例

```java
Org org = managementClient.org().findById("id").execute();
```

## 删除节点

OrgManagementClient().deleteNode(param)

> 删除组织机构树中的某一个节点

#### 参数

- `param` \<DeleteNodeParam\>
- `param.orgId` \<String\> 组织机构 ID
- `param.nodeId` \<String\> 节点 ID

#### 示例

```java
managementClient.org().deleteNode(new DeleteNodeParam("orgId", "nodeId")).execute();
```

## 移动节点

OrgManagementClient().moveNode(orgId, nodeId, targetParentId)

> 移动组织机构节点，移动某节点时需要指定该节点新的父节点。注意不能将一个节点移动到自己的子节点下面。

#### 参数

- `orgId` \<String\> 组织机构 ID
- `nodeId` \<String\> 需要移动的节点 ID
- `targetParentId` \<String\> 目标父节点 ID

#### 示例

```java
Org org = managementClient.org().moveNode("orgId", "nodeId", "targetParentId").execute();
```

## 判断是否为根节点

OrgManagementClient().isRootNode(nodeId, orgId)

> 判断一个节点是不是组织树的根节点

#### 参数

- `nodeId` \<String\> 节点 ID
- `orgId` \<String\> 组织机构 ID

#### 示例

```java
Boolean flag = managementClient.org().isRootNode("nodeId", "orgId").execute();
```

## 获取子节点列表

OrgManagementClient().listChildren(orgId, nodeId)

> 查询一个节点的子节点列表

#### 参数

- `orgId` \<String\> 组织机构 ID
- `nodeId` \<String\> 节点 ID

#### 示例

```java
List<Node> nodes = managementClient.org().listChildren("orgId", "nodeId").execute();
```

## 模糊搜索组织节点

OrgManagementClient().searchNodes(searchNodesParam)

> 通过节点名称模糊搜索组织节点

#### 参数

- `searchNodesParam.keyword` \<String\> 组织机构名称关键字

#### 示例

```java
List<Node> list = orgManagementClient.searchNodes(new SearchNodesParam("test")).execute();
```

## 获取根节点

OrgManagementClient().rootNode(rootNodeParam)

> 获取一个组织的根节点

#### 参数

- `rootNodeParam` \<RootNodeParam\>
- `rootNodeParam.orgId` \<String\> 组织机构 ID

#### 示例

```java
Node node = managementClient.org().rootNode(new RootNodeParam(0, "orgId")).execute();
```

## 通过 JSON 导入

OrgManagementClient().importByJson(json)

> 通过一个 JSON 树结构导入组织机构

#### 参数

- `json` \<String\> JSON 格式的树结构，详细格式请见示例代码。

#### 示例

```java
json examples:

{
  name: '北京某某公司有限公司',
  code: 'example',
  children: [
     {
         code: 'operation',
         name: '运营',
         description: '商业化部门'
     },
     {
        code: 'dev',
        name: '研发',
        description: '研发部门',
        children: [
          {
            code: 'backend',
            name: '后端',
            description: '后端研发部门'
          }
        ]
     }
  ]
}

Map map1 = new HashMap<>();
map1.put("name","ceshi11");
map1.put("code","ceshi11");

Map map2 = new HashMap<>();
map2.put("name","ceshi12");
map2.put("code","ceshi12");

Map map = new HashMap<>();
map.put("name","ceshi1");
map.put("code","ceshi1");
map.put("children",Arrays.asList(map1,map2));

Gson gson = new Gson();
String jsonStr = gson.toJson(map);
Node nodes = managementClient.org().importByJson(jsonStr).execute();
```

## 添加成员

OrgManagementClient().addMembers(nodeId, userIds)

> 节点添加成员

#### 参数

- `nodeId` \<String\> 节点 ID
- `userIds` \<List\<String\>\> 用户 ID 列表

#### 示例

```java
Node node = managementClient.org().addMembers("nodeId", Arrays.asList("userId")).execute();
```

## 移动成员

OrgManagementClient().moveMembers(options)

> 移动源结点成员到目标结点

#### 参数

- `options` \<MoveMembersParam\> 
- `options.sourceNodeId` \<String\> 源节点 ID
- `options.targetNodeId` \<String\> 目标节点 ID
- `options.userIds` \<List\<String\>\> 用户 ID 列表

#### 示例

```java
MoveMembersParam param = new MoveMembersParam(Arrays.asList("userId"), "targetNodeId", "sourceNodeId");
CommonMessage res = managementClient.org().moveMembers(param).execute();
```


## 设置用户主部门

OrgManagementClient().setMainDepartment(userId, departmentId)

> 设置用户主部门

#### 参数

- `userId` \<String\> 用户 ID
- `departmentId` \<String\> 主部门 ID

#### 示例

```java
CommonMessage res = managementClient.org().setMainDepartment("userId", "departmentId").execute();
```

## 组织机构同步

OrgManagementClient().startSync(options)

> 设置用户主部门

#### 参数

- `options` \<OrgStartSyncOptions\> 
- `options.providerType` \<String\> 可选类型：dingtalk-钉钉 wechatwork-企业微信 ad-AD。
- `options.adConnectorId` \<String\> AD Connector ID，providerType 为 AD 时必传。

#### 示例

```java
Boolean res = managementClient.org().startSync("wechatwork", "").execute();
```

## 获取节点成员

OrgManagementClient().listMembers(param)

> 获取节点成员，可以获取直接添加到该节点中的用户，也可以获取到该节点子节点的用户。

#### 参数

- `param` \<NodeByIdWithMembersParam\>
- `param.page` \<Integer\> 页码，默认值：`1`。
- `param.limit` \<Integer\> 每页条数，默认值：`10`。
- `param.sortBy` \<SortByEnum\> 排序规则
- `param.includeChildrenNodes` \<Boolean\> 是否获取所有子节点的成员，默认值：`false`。
- `param.id` \<String\> 节点 ID

#### 示例

```java
Node node = managementClient.org().listMembers(new NodeByIdWithMembersParam("id")).execute();
```

## 删除成员

OrgManagementClient().removeMembers(nodeId, userIds)

> 删除节点成员

#### 参数

- `nodeId` \<String\> 节点 ID
- `userIds` \<List\<String\>\> 用户 ID 列表

#### 示例

```java
Node node = managementClient.org().removeMembers("nodeId", Arrays.asList("userId")).execute();
```

## 导出所有组织机构数据

OrgManagementClient().exportAll()

> 导出所有组织机构，返回的数据结构为一个递归的数结构。

#### 示例

```java
List<Node> nodes = this.orgManagementClient.exportAll().execute();
```

#### 示例数据

```json
[
  {
    "id": "601f59578308478a692a71ea",
    "createdAt": "2021-02-07T03:07:03.822Z",
    "updatedAt": "2021-02-07T03:07:03.822Z",
    "userPoolId": "59f86b4832eb28071bdd9214",
    "orgId": "601f59573abea48cceb188c6",
    "name": "科技公司",
    "nameI18n": null,
    "description": null,
    "descriptionI18n": null,
    "order": null,
    "code": null,
    "children": [
      {
        "id": "601f5966800e61428d4190fb",
        "createdAt": "2021-02-07T03:07:18.835Z",
        "updatedAt": "2021-02-07T03:07:18.835Z",
        "userPoolId": "59f86b4832eb28071bdd9214",
        "orgId": "601f59573abea48cceb188c6",
        "name": "产品",
        "nameI18n": null,
        "description": null,
        "descriptionI18n": null,
        "order": null,
        "code": null,
        "children": [],
        "depth": 1,
        "root": false,
        "members": [
          {
            "id": "5a597f35085a2000144a10ed",
            "createdAt": "2021-02-02T02:36:32.172Z",
            "updatedAt": "2021-02-05T11:30:14.050Z",
            "userPoolId": "59f86b4832eb28071bdd9214",
            "isRoot": true,
            "status": "Activated",
            "oauth": null,
            "email": "root@authing.cn",
            "phone": null,
            "username": "root",
            "unionid": null,
            "openid": null,
            "nickname": null,
            "company": null,
            "photo": "https://files.authing.co/authing-console/default-user-avatar.png",
            "browser": null,
            "device": null,
            "token": "",
            "tokenExpiredAt": "2021-02-19T11:30:13.927Z",
            "loginsCount": 4,
            "lastIp": "::1",
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
            "registerSource": ["offcial:import"],
            "emailVerified": false,
            "phoneVerified": false,
            "lastLogin": "2021-02-05T11:30:14.019Z",
            "blocked": false,
            "isDeleted": false,
            "sendSmsCount": 0,
            "sendSmsLimitCount": 1000,
            "signedUp": "2021-02-02T02:36:32.172Z",
            "externalId": null,
            "mainDepartmentId": null,
            "mainDepartmentCode": null,
            "lastMfaTime": null,
            "passwordSecurityLevel": null
          }
        ]
      },
      {
        "id": "601f59622a1dea5ae5ada750",
        "createdAt": "2021-02-07T03:07:14.163Z",
        "updatedAt": "2021-02-07T03:07:14.163Z",
        "userPoolId": "59f86b4832eb28071bdd9214",
        "orgId": "601f59573abea48cceb188c6",
        "name": "研发",
        "nameI18n": null,
        "description": null,
        "descriptionI18n": null,
        "order": null,
        "code": null,
        "children": [
          {
            "id": "601f597e62eaeda4e17e3352",
            "createdAt": "2021-02-07T03:07:42.475Z",
            "updatedAt": "2021-02-07T03:07:42.475Z",
            "userPoolId": "59f86b4832eb28071bdd9214",
            "orgId": "601f59573abea48cceb188c6",
            "name": "后端",
            "nameI18n": null,
            "description": null,
            "descriptionI18n": null,
            "order": null,
            "code": null,
            "children": [],
            "depth": 2,
            "root": false,
            "members": []
          }
        ],
        "depth": 1,
        "root": false,
        "members": []
      },
      {
        "id": "601f596e89427f0549daf48f",
        "createdAt": "2021-02-07T03:07:26.919Z",
        "updatedAt": "2021-02-07T03:07:26.919Z",
        "userPoolId": "59f86b4832eb28071bdd9214",
        "orgId": "601f59573abea48cceb188c6",
        "name": "商业化",
        "nameI18n": null,
        "description": null,
        "descriptionI18n": null,
        "order": null,
        "code": null,
        "children": [],
        "depth": 1,
        "root": false,
        "members": []
      }
    ],
    "depth": 0,
    "root": true,
    "members": []
  }
]
```

## 导出某个组织机构数据

OrgManagementClient().exportByOrgId(orgId)

> 根据组织机构 ID 导出某个组织机构数据

#### 参数

- `orgId` 组织机构 ID

#### 示例

```java
String orgId = "60210d36262e1086cd2d1209";
Node node = this.orgManagementClient.exportByOrgId(orgId).execute();
```

#### 示例数据

```json
{
  "id": "601f59578308478a692a71ea",
  "createdAt": "2021-02-07T03:07:03.822Z",
  "updatedAt": "2021-02-07T03:07:03.822Z",
  "userPoolId": "59f86b4832eb28071bdd9214",
  "orgId": "601f59573abea48cceb188c6",
  "name": "科技公司",
  "nameI18n": null,
  "description": null,
  "descriptionI18n": null,
  "order": null,
  "code": null,
  "children": [
    {
      "id": "601f5966800e61428d4190fb",
      "createdAt": "2021-02-07T03:07:18.835Z",
      "updatedAt": "2021-02-07T03:07:18.835Z",
      "userPoolId": "59f86b4832eb28071bdd9214",
      "orgId": "601f59573abea48cceb188c6",
      "name": "产品",
      "nameI18n": null,
      "description": null,
      "descriptionI18n": null,
      "order": null,
      "code": null,
      "children": [],
      "depth": 1,
      "root": false,
      "members": [
        {
          "id": "5a597f35085a2000144a10ed",
          "createdAt": "2021-02-02T02:36:32.172Z",
          "updatedAt": "2021-02-05T11:30:14.050Z",
          "userPoolId": "59f86b4832eb28071bdd9214",
          "isRoot": true,
          "status": "Activated",
          "oauth": null,
          "email": "root@authing.cn",
          "phone": null,
          "username": "root",
          "unionid": null,
          "openid": null,
          "nickname": null,
          "company": null,
          "photo": "https://files.authing.co/authing-console/default-user-avatar.png",
          "browser": null,
          "device": null,
          "token": "",
          "tokenExpiredAt": "2021-02-19T11:30:13.927Z",
          "loginsCount": 4,
          "lastIp": "::1",
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
          "registerSource": ["offcial:import"],
          "emailVerified": false,
          "phoneVerified": false,
          "lastLogin": "2021-02-05T11:30:14.019Z",
          "blocked": false,
          "isDeleted": false,
          "sendSmsCount": 0,
          "sendSmsLimitCount": 1000,
          "signedUp": "2021-02-02T02:36:32.172Z",
          "externalId": null,
          "mainDepartmentId": null,
          "mainDepartmentCode": null,
          "lastMfaTime": null,
          "passwordSecurityLevel": null
        }
      ]
    },
    {
      "id": "601f59622a1dea5ae5ada750",
      "createdAt": "2021-02-07T03:07:14.163Z",
      "updatedAt": "2021-02-07T03:07:14.163Z",
      "userPoolId": "59f86b4832eb28071bdd9214",
      "orgId": "601f59573abea48cceb188c6",
      "name": "研发",
      "nameI18n": null,
      "description": null,
      "descriptionI18n": null,
      "order": null,
      "code": null,
      "children": [
        {
          "id": "601f597e62eaeda4e17e3352",
          "createdAt": "2021-02-07T03:07:42.475Z",
          "updatedAt": "2021-02-07T03:07:42.475Z",
          "userPoolId": "59f86b4832eb28071bdd9214",
          "orgId": "601f59573abea48cceb188c6",
          "name": "后端",
          "nameI18n": null,
          "description": null,
          "descriptionI18n": null,
          "order": null,
          "code": null,
          "children": [],
          "depth": 2,
          "root": false,
          "members": []
        }
      ],
      "depth": 1,
      "root": false,
      "members": []
    },
    {
      "id": "601f596e89427f0549daf48f",
      "createdAt": "2021-02-07T03:07:26.919Z",
      "updatedAt": "2021-02-07T03:07:26.919Z",
      "userPoolId": "59f86b4832eb28071bdd9214",
      "orgId": "601f59573abea48cceb188c6",
      "name": "商业化",
      "nameI18n": null,
      "description": null,
      "descriptionI18n": null,
      "order": null,
      "code": null,
      "children": [],
      "depth": 1,
      "root": false,
      "members": []
    }
  ],
  "depth": 0,
  "root": true,
  "members": []
}
```

## 根据部门 ID 获取被授权的所有资源列表

managementClient.org().listAuthorizedResourcesByNodeId(param)

> 根据部门 Id 获取一个部门被授权的所有资源。

#### 参数

- `param` \<ListNodeByIdAuthorizedResourcesParam\>
- `param.nodeId` \<String\> 部门 ID
- `param.namespace` \<String\> 权限分组的 Code，详情请见[使用权限分组管理权限资源](/guides/access-control/resource-group.md)。
- `param.resourceType` \<String\> 可选，资源类型，默认会返回所有有权限的资源，现有资源类型如下：
    - `DATA`：数据类型；
    - `API`：API 类型数据；
    - `MENU`：菜单类型数据；
    - `BUTTON`：按钮类型数据。

#### 示例

```java
ListNodeByIdAuthorizedResourcesParam param = new ListNodeByIdAuthorizedResourcesParam("ORG_ID")
        .withNamespace("default")
        .withResourceType("DATA");
Node res = managementClient.org().listAuthorizedResourcesByNodeId(param).execute();
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


## 根据部门 Code 获取被授权的所有资源列表

managementClient.org().listAuthorizedResourcesByNodeCode(param)

> 根据部门 Code 获取一个部门被授权的所有资源。

#### 参数

- `param` \<ListNodeByIdAuthorizedResourcesParam\>
- `param.code` \<String\> 部门 Code
- `param.orgId` \<String\> 组织机构 ID
- `param.namespace` \<String\> 权限分组的 Code，详情请见[使用权限分组管理权限资源](/guides/access-control/resource-group.md)。
- `param.resourceType` \<String\> 可选，资源类型，默认会返回所有有权限的资源，现有资源类型如下：
    - `DATA`：数据类型；
    - `API`：API 类型数据；
    - `MENU`：菜单类型数据；
    - `BUTTON`：按钮类型数据。

#### 示例

```java
ListNodeByCodeAuthorizedResourcesParam param = 
        new ListNodeByCodeAuthorizedResourcesParam("ORG_ID", "nodeCode", "namespace");
Node res = managementClient.org().listAuthorizedResourcesByNodeCode(param).execute();
```

#### 示例数据

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


<!--
## 获取应用访问控制策略

managementClient.acl().getApplicationAccessPolicies(options)

获取一个应用的访问控制策略。

#### 参数

- `options` \<IAppAccessPolicyQueryFilter\> 传入配置
- `options.appId` \<String\> 应用 ID
- `options.page` \<String\> 分页，获取第几页，默认从 1 开始
- `options.limit` \<String\> 每页条目数量，默认为 10 个

#### 示例

```java
IAppAccessPolicyQueryFilter app = new IAppAccessPolicyQueryFilter("60533084715b2ae009d9913a");

Pagination<IApplicationAccessPolicies> res = managementClient.acl().getApplicationAccessPolicies(app).execute();

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

managementClient.acl().enableApplicationAccessPolicy(options)

启用一个应用的访问控制策略。

#### 参数

- `options` \<IAppAccessPolicy\> 传入配置
- `options.appId` \<String\> 应用 ID
- `options.targetType` \<TargetTypeEnum\> 主体类型，枚举值为 `USER`、`ROLE`、`GROUP`、`ORG`
- `options.targetIdentifiers` \<String\> 主体标识符，可以为用户 id、角色标识符、分组标识符、组织机构节点标识符
- `options.namespace` \<String\> 当 targetType 为 `ROLE`、`GROUP`、`ORG` 时，填写其所在的权限分组标识符
- `options.inheritByChildren` \<Boolean\> 当 `targetType` 为 `ORG` 时，用于指定组织机构的子节点是否继承该策略

#### 示例

```java
IAppAccessPolicy appAccessPolicy = new IAppAccessPolicy(
                "xxxxx",
                TargetTypeEnum.USER,
                userIds,
                "default",
                null);

Boolean res = managementClient.acl().enableApplicationAccessPolicy(appAccessPolicy).execute();

```

#### 示例数据

```json
{ "code": 200, "data": true, "message": "启用应用访问控制策略成功" }
```

## 停用应用访问控制策略

managementClient.acl().disableApplicationAccessPolicy(options)

停用一个应用的访问控制策略。

#### 参数

- `options` \<IAppAccessPolicy\> 传入配置
- `options.appId` \<String\> 应用 ID
- `options.targetType` \<TargetTypeEnum\> 主体类型，枚举值为 `USER`、`ROLE`、`GROUP`、`ORG`
- `options.targetIdentifiers` \<String\> 主体标识符，可以为用户 id、角色标识符、分组标识符、组织机构节点标识符
- `options.namespace` \<String\> 当 targetType 为 `ROLE`、`GROUP`、`ORG` 时，填写其所在的权限分组标识符
- `options.inheritByChildren` \<Boolean\> 当 `targetType` 为 `ORG` 时，用于指定组织机构的子节点是否继承该策略

#### 示例

```java
IAppAccessPolicy appAccessPolicy = new IAppAccessPolicy(
                "xxxxx",
                TargetTypeEnum.USER,
                userIds,
                "default",
                null);

Boolean res = managementClient.acl().disableApplicationAccessPolicy(appAccessPolicy).execute();
```

#### 示例数据

```json
{ "code": 200, "data": true, "message": "停用应用访问控制策略成功" }
```

## 删除应用访问控制策略

managementClient.acl().deleteApplicationAccessPolicy(options)

删除一个应用的访问控制策略。

#### 参数

- `options` \<IAppAccessPolicy\> 传入配置
- `options.appId` \<String\> 应用 ID
- `options.targetType` \<TargetTypeEnum\> 主体类型，可选值为 `USER`、`ROLE`、`GROUP`、`ORG`
- `options.targetIdentifiers` \<String\> 主体标识符，可以为用户 id、角色标识符、分组标识符、组织机构节点标识符
- `options.namespace` \<String\> 当 targetType 为 `ROLE`、`GROUP`、`ORG` 时，填写其所在的权限分组标识符
- `options.inheritByChildren` \<Boolean\> 当 `targetType` 为 `ORG` 时，用于指定组织机构的子节点是否继承该策略

#### 示例

```java
IAppAccessPolicy appAccessPolicy = new IAppAccessPolicy(
                "xxxxx",
                TargetTypeEnum.USER,
                userIds,
                "default",
                null);

Boolean res = managementClient.acl().deleteApplicationAccessPolicy(appAccessPolicy).execute();
```

#### 示例数据

```json
{ "code": 200, "data": true, "message": "删除应用访问控制策略成功" }
```

## 配置「允许主体（用户、角色、分组、组织机构节点）访问应用」的控制策略

managementClient.acl().allowAccessApplication(options)

配置「允许主体（用户、角色、分组、组织机构节点）访问应用」的控制策略。

#### 参数

- `options` \<IAppAccessPolicy\> 传入配置
- `options.appId` \<String\> 应用 ID
- `options.targetType` \<TargetTypeEnum\> 主体类型，可选值为 `USER`、`ROLE`、`GROUP`、`ORG`
- `options.targetIdentifiers` \<String\> 主体标识符，可以为用户 id、角色标识符、分组标识符、组织机构节点标识符
- `options.namespace` \<String\> 当 targetType 为 `ROLE`、`GROUP`、`ORG` 时，填写其所在的权限分组标识符
- `options.inheritByChildren` \<Boolean\> 当 `targetType` 为 `ORG` 时，用于指定组织机构的子节点是否继承该策略

#### 示例

```java
IAppAccessPolicy policy = new IAppAccessPolicy(
                "xxx",
                TargetTypeEnum.USER,
                userIds,
                "default",
                null);

Boolean res = managementClient.acl().allowAccessApplication(policy).execute();

```

#### 示例数据

```json
{ "code": 200, "data": true, "message": "允许主体访问应用的策略配置已生效" }
```

## 配置「拒绝主体（用户、角色、分组、组织机构节点）访问应用」的控制策略

managementClient.acl().denyAccessApplication(options)

配置「拒绝主体（用户、角色、分组、组织机构节点）访问应用」的控制策略。

#### 参数

- `options` \<IAppAccessPolicy\> 传入配置
- `options.appId` \<String\> 应用 ID
- `options.targetType` \<TargetTypeEnum\> 主体类型，可选值为 `USER`、`ROLE`、`GROUP`、`ORG`
- `options.targetIdentifiers` \<String\> 主体标识符，可以为用户 id、角色标识符、分组标识符、组织机构节点标识符
- `options.namespace` \<String\> 当 targetType 为 `ROLE`、`GROUP`、`ORG` 时，填写其所在的权限分组标识符
- `options.inheritByChildren` \<Boolean\> 当 `targetType` 为 `ORG` 时，用于指定组织机构的子节点是否继承该策略

#### 示例

```javascript
IAppAccessPolicy policy = new IAppAccessPolicy(
                "xxx",
                TargetTypeEnum.USER,
                userIds,
                "default",
                null);

Boolean res = managementClient.acl().denyAccessApplication(policy).execute();
```

#### 示例数据

```json
{ "code": 200, "data": true, "message": "拒绝主体访问应用的策略配置已生效" }
```

## 更改默认应用访问策略

managementClient.acl().updateDefaultApplicationAccessPolicy(options)

修改默认应用访问策略：默认拒绝所有用户访问应用、默认允许所有用户访问应用

#### 参数

- `options` \<IDefaultAppAccessPolicy\> 传入配置项
- `options.appId` \<String\> 应用 ID
- `options.defaultStrategy` \<DefaultStrategy\> 默认应用访问策略，可选值为 `ALLOW_ALL`、`DENY_ALL`，含义为默认允许所有用户访问、拒绝所有用户访问

#### 示例

```javascript
IDefaultAppAccessPolicy policy = new IDefaultAppAccessPolicy(
                "60533084715b2ae009d9913a",
                DefaultStrategy.DENY_ALL
        );

Application res = this.aclManagementClient.updateDefaultApplicationAccessPolicy(policy).execute();
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
  "loginTabs": ["phone-code", "password"],
  "defaultLoginTab": "password",
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