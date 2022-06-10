---
meta:
  - name: description
    content: OrgManagementClient
---

# OrgManagementClient

<LastUpdated/>

> An {{$localeConfig.brandName}} user pool can create multiple organizations. This client is used to manage the {{$localeConfig.brandName}} organization. It can create/query/update/delete organizations, create/update/delete nodes, and import organizations.

## Create an organization

OrgManagementClient().create(createOrgParam)

> Create an organization with only one node.
> If you want to import a complete organization tree, please use the importByJson method.

#### Parameters

- `createOrgParam` \<CreateOrgParam\>
- `createOrgParam.name` \<String\> The name of the organization, which also will be the name of the root node of the organization
- `createOrgParam.code` \<String\> The unique id of the root node, which must be English characters.
- `createOrgParam.description` \<String\> Root node description

#### Example

```java
Org org = managementClient.org().create(new CreateOrgParam("name1", "org1", "desc1")).execute();
```

## Delete an Organization

OrgManagementClient().deleteById(id)

> Delete the organization tree

#### Parameter

- `id` \<String\> Organization ID

#### Example

```java
CommonMessage message = managementClient.org().deleteById("id").execute();
```

## Get user pool organizations list

OrgManagementClient().list(orgsParam)

> Get user pool organizations list.

#### Parameters

- `orgsParam` \<OrgsParam\>
- `orgsParam.page` \<Integer\> Default value: `1`.
- `orgsParam.limit` \<Integer\> Default value is: `10`.
- `orgsParam.sortBy` \<SortByEnum\> Sorting rules.

#### Example

```java
PaginatedOrgs orgs = managementClient.org().list(new OrgsParam(1, 10, SortByEnum.CREATEDAT_DESC)).execute();
```

## Find org node by node Id

OrgManagementClient().findNodeById(nodeId)

> Find Org Node By Node Id.

#### Parameters

- `nodeId` \<String\> Org node Id

#### Example

```java
Node node = managementClient.org().findNodeById("nodeId").execute();
```

## Add a node

OrgManagementClient().addNode(addNodeParam)

> Add a node in the organization

#### Parameters

- `addNodeParam` \<AddNodeV2Param\>
- `addNodeParam.orgId` \<String\> Organization ID
- `addNodeParam.parentNodeId` \<String\> Parent node ID
- `addNodeParam.name` \<String\> Node name
- `addNodeParam.nameI18n` \<String\> Node name for i18n
- `addNodeParam.order` \<String\> Node order
- `addNodeParam.code` \<String\> The unique identifier of the node
- `addNodeParam.description` \<String\> Node description information
- `addNodeParam.descriptionI18n` \<String\> Node description information for i18n

#### Example

```java
AddNodeV2Param param = new AddNodeV2Param("orgId", "orgName")
        .withParentNodeId("parentId");
Node node = managementClient.org().addNode(param).execute();
```

## Update a node

OrgManagementClient().updateNode(updateNodeParam)

> Update nodes

#### Parameters

- `updateNodeParam` \<UpdateNodeParam\>
- `updateNodeParam.id` \<String\> The unique id of the node
- `updateNodeParam.name` \<String\> Node name
- `updateNodeParam.code` \<String\> The unique identifier of the node
- `updateNodeParam.description` \<String\> Node description information

#### Example

```java
UpdateNodeParam param = new UpdateNodeParam(0, "");
param.setId("id");
param.setName("name");
param.setDescription("description");
Node node = managementClient.org().updateNode(param).execute();
```

## Get Organization details

OrgManagementClient().findById(id)

> Get Organization details by organization id.

#### Parameter

- `id` \<String\> Organization ID

#### Example

```java
Org org = managementClient.org().findById("id").execute();
```

## Delete a node

OrgManagementClient().deleteNode(deleteNodeParam)

> Delete a node in the organization tree.

#### Parameters

- `deleteNodeParam` \<DeleteNodeParam\>
- `deleteNodeParam.orgId` \<string\> Organization ID
- `deleteNodeParam.nodeId` \<string\> Node ID

#### Example

```java
CommonMessage commonMessage = managementClient.org().deleteNode(new DeleteNodeParam("orgId", "nodeId")).execute();
```

## Move a node

OrgManagementClient().moveNode(orgId, nodeId, targetParentId)

> When moving a node, you need to specify the node's new parent node. You cannot move a node under its child nodes.

#### Parameters

- `orgId` \<String\> Organization ID
- `nodeId` \<String\> The ID of the node that needs to be moved
- `targetParentId` \<String\> Target parent node ID

#### Example

```java
Org org = managementClient.org().moveNode("orgId", "nodeId", "targetParentNodeId").execute();
```

## Check whether it is the root node

OrgManagementClient().isRootNode(nodeId, orgId)

> Check whether a node is the root node of the organization tree.

#### Parameters

- `nodeId` \<String\> Node ID
- `orgId` \<String\> Organization ID

#### Example

```java
Boolean flag = managementClient.org().isRootNode("nodeId", "orgId").execute();
```

## Get child nodes list

OrgManagementClient().listChildren(orgId, nodeId)

> Get child nodes list of a node.

#### Parameters

- `orgId` \<String\> Node ID
- `nodeId` \<String\> Organization ID

#### Example

```java
List<Node> nodes = managementClient.org().listChildren("orgId", "nodeId").execute();
```

## Fuzzy search organization node

OrgManagementClient().searchNodes(searchNodesParam)

> Fuzzy search organization node by node name.

#### Parameter

- `searchNodesParam.keyword` \<String\> Organization name keyword

#### Example

```java
List<Node> list = orgManagementClient.searchNodes(new SearchNodesParam("test")).execute();
```

## Get the root node

OrgManagementClient().rootNode(rootNodeParam)

> Get the root node of the organization.

#### Parameter

- `rootNodeParam` \<RootNodeParam\>
- `rootNodeParam.orgId` \<String\> Organization ID

#### Example

```java
Node node = managementClient.org().rootNode(new RootNodeParam("orgId")).execute();
```

## Import by JSON

OrgManagementClient().importByJson(json)

> Import organization through a JSON tree.

#### Parameter

- `json` \<String\> A tree structure in JSON format. Detailed format is in the sample code.

#### Example

```java

json examples:

{
  name: '北京非凡科技有限公司',
  code: 'feifan',
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

## Add members

OrgManagementClient().addMembers(nodeId, userIds)

> Add a member to the node.

#### Parameters

- `nodeId` \<String\> node ID
- `userIds` \<List\<String\>\> User ID list

#### Example

```java
Node node = managementClient.org().addMembers("nodeId", Arrays.asList("userId")).execute();
```

## Get node members

OrgManagementClient().listMembers(nodeByIdWithMembersParam)

> Get the node members. You can get the users directly added to the node, and you can get the users of the child nodes.

#### Parameters

- `nodeByIdWithMembersParam` \<NodeByIdWithMembersParam\>
- `nodeByIdWithMembersParam.page` \<Integer\> Default value: `1`
- `nodeByIdWithMembersParam.limit` \<Integer\> Default value: `10`
- `nodeByIdWithMembersParam.sortBy` \<SortByEnum\> sorting rules
- `nodeByIdWithMembersParam.includeChildrenNodes` \<Boolean\> Whether to get the members of all child nodes. Default value: `false`
- `nodeByIdWithMembersParam.id` \<String\> node ID

#### Example

```java
Node node = managementClient.org().listMembers(new NodeByIdWithMembersParam("id")).execute();
```

## Delete members

OrgManagementClient().removeMembers(nodeId, userIds)

> Delete members of node.

#### Parameters

- `nodeId` \<String\> node ID
- `userIds` \<List\<String\>\> User ID list

#### Example

```java
Node node = managementClient.org().removeMembers("nodeId", Arrays.asList("userId")).execute();
```

## Export all organization data

OrgManagementClient().exportAll()

> Export all organizations, and return data in a recursive structure.

#### Example

```java
List<OrgNode> nodes = this.orgManagementClient.exportAll().execute();
```

#### Sample data

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

## Import an organization's data

OrgManagementClient().exportByOrgId()

#### Parameter

- `orgId`: Organization ID

#### Example

```java
String orgId = "60210d36262e1086cd2d1209";
OrgNode node = this.orgManagementClient.exportByOrgId(orgId).execute();
```

#### Sample data

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
