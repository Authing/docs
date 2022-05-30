---
meta:
  - name: description
    content: 管理组织机构
---

# 管理组织机构

<LastUpdated/>


> 一个 {{$localeConfig.brandName}} 用户池可以创建多个组织机构。此模块用于管理 {{$localeConfig.brandName}} 组织机构，可以进行组织机构的增删改查、添加删除移动节点、导入组织机构等操作。

## 创建组织机构
```csharp
managementClient.Orgs.Create(string name, string description = null, string code = null)
```
> 创建组织机构，会创建一个只有一个节点的组织机构。
> 如果你想将一个完整的组织树导入进来，请使用 importByJson 方法。

#### 参数

- `name` \<string\> 组织机构名称，该名称会作为该组织机构根节点的名称。
- `description` \<string\> 根节点描述
- `code` \<string\> 根节点唯一标志，必须为合法的英文字符。

#### 示例

```csharp
var result = await  managementClient.Orgs.Create("组织结构1","组织结构1的描述","9527");
```

## 删除组织机构
```csharp
managementClient.Orgs.DeleteById(string id)
```
> 删除组织机构树

#### 参数

- `id` \<string\> 组织机构 ID

#### 示例

```csharp
managementClient.Orgs.DeleteById("id");
```

## 获取用户池组织机构列表
```csharp
managementClient.Orgs.List(int page = 1, int limit = 10)
```
> 获取用户池组织机构列表

#### 参数

- `param` \<OrgsParam\>
- `param.page` \<int\> 页码，默认值：1。
- `param.limit` \<int\> 每页展示条数，默认值：10。
- `param.sortBy` \<SortByEnum\> 排序规则
   - `CREATEDAT_DESC`: 按照创建时间降序（后创建的在前面）
   - `CREATEDAT_DESC`: 按照创建时间升序（先创建的在前面）
   - `CREATEDAT_ASC`:  按照更新时间降序（最近更新的在前面）
   - `CREATEDAT_ASC`:  按照更新时间升序（最近更新的在后面）


## 添加节点
```csharp
managementClient.Orgs.AddNode(string orgId, AddNodeParam param)
```
> 在组织机构中添加一个节点

#### 参数

- `orgId` \<string\> 组织机构 ID
- `param` \<AddNodeParam\>
- `param.ParentNodeId` \<string\> 父节点 ID
- `param.Name` \<string\> 节点名称
- `param.NameI18n` \<string\> 节点名称，国际化。
- `param.Code` \<string\> 节点唯一标志
- `param.Description` \<string\> 节点描述信息
- `param.DescriptionI18n` \<string\> 节点描述信息国际化

#### 示例

```csharp
var param = new AddNodeParam(){
  ParentNodeId = "ParentNodeId",
  Name = "Name",
  NameI18n = "NameI18n",
  Code = "Code",
  Description = "Description",
  DescriptionI18n = "DescriptionI18n"
};
var result = managementClient.Orgs.AddNode("orgId",param);
```

## 修改节点
```csharp
managementClient.Orgs.UpdateNode(string orgId, UpdateNodeParam param)
```
> 修改节点数据

#### 参数

- `orgId` \<string\> 节点唯一标志
- `param` \<UpdateNodeParam\>
- `param.Code` \<string\> 节点唯一标志
- `param.Name` \<string\> 节点名称
- `param.Description` \<string\> 节点描述信息

#### 示例

```csharp
var param = new UpdateNodeParam(){Code="one", Name="nodeName" };
var updated = managementClient.Orgs.updateNode("orgId", param);
```

## 获取组织机构详情
```csharp
managementClient.Orgs.FindById(string orgId)
```

> 通过组织机构 ID 获取组织机构详情

#### 参数

- `orgId` \<string\> 组织机构 ID

#### 示例

```csharp
var result = await managementClient.Orgs.findById("orgId");
```

## 删除节点
```csharp
managementClient.Orgs.DeleteNode(string orgId, string nodeId)
```
> 删除组织机构树中的某一个节点

#### 参数

- `orgId` \<string\> 组织机构 ID
- `nodeId` \<string\> 节点 ID

#### 示例

```csharp
var result = await  managementClient.Orgs.DeleteNode("orgId", "nodeId");
```

## 移动节点
```csharp
managementClient.Orgs.MoveNode(string orgId, string nodeId, string targetParentId)
```
> 移动组织机构节点，移动某节点时需要指定该节点新的父节点。注意不能将一个节点移动到自己的子节点下面。

#### 参数

- `orgId` \<string\> 组织机构 ID
- `nodeId` \<string\> 需要移动的节点 ID
- `targetParentId` \<string\> 目标父节点 ID

#### 示例

```csharp
var result = await managementClient.Orgs.MoveNode("orgId", "nodeId", "targetParentId");
```

## 判断是否为根节点
```csharp
managementClient.Orgs.IsRootNode(string orgId, string nodeId)
```
> 判断一个节点是不是组织树的根节点

#### 参数

- `nodeId` \<string\> 节点 ID
- `orgId` \<string\> 组织机构 ID

#### 示例

```csharp
var flag = await managementClient.Orgs.IsRootNode("nodeId", "orgId");
```

## 获取子节点列表
```csharp
managementClient.Orgs.ListChildren(string orgId, string nodeId)
```
> 查询一个节点的子节点列表

#### 参数

- `orgId` \<string\> 组织机构 ID
- `nodeId` \<string\> 节点 ID

#### 示例

```csharp
var nodes = await managementClient.Orgs.ListChildren("orgId", "nodeId");
```

## 模糊搜索组织节点
```csharp
managementClient.Orgs.SearchNodes(string keyword)
```
> 通过节点名称模糊搜索组织节点

#### 参数

- `keyword` \<string\> 组织机构名称关键字

#### 示例

```csharp
var list = await orgManagementClient.searchNodes("lastNode");
```

## 获取根节点
```csharp
managementClient.Orgs.RootNode(string orgId);
```
> 获取一个组织的根节点

#### 参数

- `orgId` \<string\> 组织机构 ID

#### 示例

```csharp
var node = managementClient.Orgs.RootNode("orgId");
```

## 通过 JSON 导入
```csharp
managementClient.Orgs.ImportByJson(string json)
```
> 通过一个 JSON 树结构导入组织机构

#### 参数

- `json` \<string\> JSON 格式的树结构，详细格式请见示例代码。

#### 示例

```csharp
Root root = new Root();
root.name = "根节点";
root.code = "9527";
string jsonStr = Newtonsoft.Json.JsonConvert.SerializeObject(root);
JsontObj ob = new JsontObj();
ob.filetype = "json";
ob.file = root;
string js=  Newtonsoft.Json.JsonConvert.SerializeObject(ob);
var result = await managementClient.Orgs.ImportByJson(js);
```

## 添加成员

```csharp
managementClient.Orgs.AddMembers(string nodeId, IEnumerable<string> userIds)
```
> 节点添加成员

#### 参数

- `nodeId` \<string\> 节点 ID
- `userIds` \<List\<string\>\> 用户 ID 列表

#### 示例

```csharp
var userList = new List<string>(){};
userList.Add("61a7274c582843df40616620");
var result = await managementClient.Orgs.AddMembers("61af013d691c6cd83c4a8ac4", userList)
```

## 移动成员

```csharp
 managementClient.Orgs.MoveMembers(string sourceNodeId, string targetNodeId, IEnumerable<string> userIds)
```
> 移动源结点成员到目标结点

#### 参数

- `sourceNodeId` \<string\> 源节点 ID
- `targetNodeId` \<string\> 目标节点 ID
- `userIds` \<List\<string\>\> 用户 ID 列表

#### 示例

```csharp
List<string> userList = new List<string>(){};
userList.Add("61a7274c582843df40616620");
var result = await managementClient.Orgs.MoveMembers("61af013d691c6cd83c4a8ac4", "61af013de626c68c3f1369d8", userList);
```


## 设置用户主部门
```csharp
managementClient.Orgs.SetMainDepartment(string userId, string departmentId)
```
> 设置用户主部门

#### 参数

- `userId` \<string\> 用户 ID
- `departmentId` \<string\> 主部门 ID

#### 示例

```csharp
var result = await managementClient.Orgs.SetMainDepartment("userId", "departmentId");
```

## 组织机构同步
```csharp
managementClient.Orgs.StartSync(ProviderTypeEnum providerTypeEnum, string adConnectorId = null)
```
> 设置用户主部门

#### 参数

- `options` \<OrgStartSyncOptions\> 
- `options.providerTypeEnum` \<ProviderTypeEnum\> 可选类型：dingtalk-钉钉 wechatwork-企业微信 ad-AD。
- `options.adConnectorId` \<string\> AD Connector ID，providerType 为 AD 时必传。

#### 示例

```csharp
var result = await managementClient.Orgs.StartSync("wechatwork", "");
```

## 获取节点成员
```csharp
managementClient.Orgs.ListMembers(string nodeId, NodeByIdWithMembersParam nodeByIdWithMembersParam = default)
```
> 获取节点成员，可以获取直接添加到该节点中的用户，也可以获取到该节点子节点的用户。

#### 参数
- `nodeId` \<string\> 节点 ID
- `param` \<NodeByIdWithMembersParam\>
- `param.Page` \<int\> 页码，默认值：1。
- `param.Limit` \<int\> 每页条数，默认值：10。
- `param.SortBy` \<SortByEnum\> 排序规则
- `param.IncludeChildrenNodes` \<bool\> 是否获取所有子节点的成员，默认值：`false`。


#### 示例

```csharp
var departmentId = "61af013d691c6cd83c4a8ac4";
var result = await managementClient.Orgs.ListMembers(departmentId, new Domain.Model.Management.Orgs.NodeByIdWithMembersParam(departmentId) { });
```

## 删除成员
```csharp
managementClient.Orgs.RemoveMembers(nodeId, userIds)
```
> 删除节点成员

#### 参数

- `nodeId` \<string\> 节点 ID
- `userIds` \<List\<string\>\> 用户 ID 列表

#### 示例

```csharp
var userList = new List<string>(){};
userList.Add("61a7274c582843df40616620");
var departmentId = "61af013d691c6cd83c4a8ac4";
var result = await managementClient.Orgs.RemoveMembers(departmentId, userList)
```

## 导出所有组织机构数据
```csharp
managementClient.Orgs.ExportAll()
```
> 导出所有组织机构，返回的数据结构为一个递归的数结构。

#### 示例

```csharp
var nodes = await managementClient.Orgs.ExportAll();
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

```csharp
managementClient.Orgs.ExportByOrgId(string orgId)
```
> 根据组织机构 ID 导出某个组织机构数据

#### 参数

- `orgId` 组织机构 ID

#### 示例

```csharp
var orgId = "60210d36262e1086cd2d1209";
var node = this.orgManagementClient.ExportByOrgId(orgId);
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
```csharp
managementClient.Orgs.ListAuthorizedResourcesByNodeId(string nodeId, string nameSpace, ResourceType resourceType = ResourceType.DATA)
```
> 根据部门 Id 获取一个部门被授权的所有资源。

#### 参数

- `param` \<ListNodeByIdAuthorizedResourcesParam\>
- `param.NodeId` \<string\> 部门 ID
- `param.NameSpace` \<string\> 权限分组的 Code，详情请见[使用权限分组管理权限资源](/guides/access-control/resource-group.md)。
- `param.ResourceType` \<string\> 可选，资源类型，默认会返回所有有权限的资源，现有资源类型如下：
    - `DATA`：数据类型；
    - `API`：API 类型数据；
    - `MENU`：菜单类型数据；
    - `BUTTON`：按钮类型数据。

#### 示例

```csharp
var param = new ListNodeByIdAuthorizedResourcesParam()
    {
      nodeId="ORG_ID"
      namespace="namespace"
      resourceType="BUTTON"
    };
var result = managementClient.Orgs.ListAuthorizedResourcesByNodeId(param);
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
```csharp
managementClient.Orgs.ListAuthorizedResourcesByNodeCode(param)
```
> 根据部门 Code 获取一个部门被授权的所有资源。

#### 参数

- `param` \<ListNodeByIdAuthorizedResourcesParam\>
- `param.Code` \<string\> 部门 Code
- `param.OrgId` \<string\> 组织机构 ID
- `param.NameSpace` \<string\> 权限分组的 Code，详情请见[使用权限分组管理权限资源](/guides/access-control/resource-group.md)。
- `param.ResourceType` \<string\> 可选，资源类型，默认会返回所有有权限的资源，现有资源类型如下：
    - `DATA`：数据类型；
    - `API`：API 类型数据；
    - `MENU`：菜单类型数据；
    - `BUTTON`：按钮类型数据。

#### 示例

```csharp
var param = new ListNodeByCodeAuthorizedResourcesParam(){
  Code = "Code",
  OrgId = "OrgId",
  NameSpace = "NameSpace",
  ResourceType = "DATA" 
};
var result = await managementClient.Orgs.ListAuthorizedResourcesByNodeCode(param);
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
## 使用id查找节点
```csharp
managementClient.Orgs.FindNodeById(string nodeId)
```
> 根据部门 Code 获取一个部门被授权的所有资源。

#### 参数

- `nodeId` \<string\>

#### 示例

```csharp
var result = await managementClient.Orgs.FindNodeById("nodeId");
```
