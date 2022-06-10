# OrgManagementClient

<LastUpdated/>

> An Authing user pool can create multiple organizations. This client is used to manage the Authing organization. It can create/query/update/delete organizations, create/update/delete nodes, and import organizations.

Please follow the instructions below to use this client:

```javascript
import { ManagementClient } from "authing-js-sdk";
const managementClient = new ManagementClient({
  userPoolId: "YOUR_USERPOOL_ID",
  secret: "YOUR_USERPOOL_SECRET"
});
managementClient.org.list; // get organization list of user pool
managementClient.org.moveNode; // get detail of organization
managementClient.org.listMembers; // get userlist of the node
```

## Create an organization

OrgManagementClient().create(name, description, code)

> Create an organization with only one node. If you want to import a complete organization tree, please use the importByJson method.

#### Parameter

- `name` \<string\> The name of the organization, which also will be the name of the root node of the organization.
- `description` \<string\> Root node description.
- `code` \<string\> The unique id of the root node, which must be English characters.

#### Example

```javascript
const org = await managementClient.org.create(
  "Beijing Feifan Tech",
  "Beijing Feifan Technology LLC",
  "feifan"
);
```

#### Return value

## Delete an Organization

OrgManagementClient().deleteById(id)

> Delete the organization tree

#### Parameter

- `id` \<string\> Orgranization ID

#### Example

#### Return value

- `Promise<CommonMessage>`

## Get user pool organizations list

OrgManagementClient().list(page, limit)

> Get user pool organizations list.

#### Parameter

- `page` \<number\> Default value: `1`.
- `limit` \<number\> Default value: `10`.

#### Example

```javascript
const { totalCount, list } = await managementClient.org.list();
```

#### Return value

- `null`

## Add a node

OrgManagementClient().addNode(orgId, parentNodeId, data)

> Add a node in the organization

#### Parameter

- `orgId` \<string\> Organization ID
- `parentNodeId` \<string\> Parent node ID
- `data` \<Object\> Node data
- `data.name` \<string\> Node name
- `data.code` \<string\> The unique identifier of the node
- `data.description` \<string\> Node description information

#### Example

```javascript
const org = await managementClient.org.create(
  "Beijing Feifan Tech",
  "Beijing Feifan Technology LLC",
  "feifan"
);
const { id: orgId, rootNode } = org;
const node = await managementClient.org.addNode(orgId, rootNode.id, {
  name: "operation department"
});
```

#### Return value

- `Promise<Org>`

## Update a node

OrgManagementClient().updateNode(id, updates)

> Update node data

#### Parameter

- `id` \<string\> Node ID
- `updates` \<Object\> Updated data
- `updates.name` \<string\> Node name
- `updates.code` \<string\> Unique id of node
- `updates.description` \<string\> Node description

#### Example

```javascript
await managementClient.org.updateNode("NDOEID", {
  name: "newNodeName"
});
```

#### Return value

- `Promise<Org>`

## Get Organization details

OrgManagementClient().findById(id)

> Get Organization details by organization id.

#### Parameter

- `id` \<string\> Organization ID

#### Example

#### Return value

- `Promise<Org>`

## Delete a node

OrgManagementClient().deleteNode(orgId, nodeId)

> Delete a node in the organization tree.

#### Parameter

- `orgId` \<string\> Organization ID
- `nodeId` \<string\> Node ID

#### Example

```javascript
const org = await managementClient.org.create(
  "Beijing Feifan Tech",
  "Beijing Feifan Technology LLC",
  "feifan"
);
const { id: orgId, rootNode } = org;
const node = await managementClient.org.deleteNode(orgId, rootNode.id);
```

#### Return value

- `Promise<CommonMessage>`

## Move a node

OrgManagementClient().moveNode(orgId, nodeId, targetParentId)

> When moving a node, you need to specify the node's new parent node. You cannot move a node under its child nodes.

#### Parameter

- `orgId` \<string\> Organization ID
- `nodeId` \<string\> The ID of the node that needs to be moved.
- `targetParentId` \<string\> Target parent node ID

#### Example

```javascript
await managementClient.org.moveNode("ORGID", "NODEID", "TRAGET_NODE_ID");
```

#### Return value

- `Promise<Org>` The latest tree sturcture.

## Check whether it is the root node

OrgManagementClient().isRootNode(orgId, nodeId)

> Check whether a node is the root node of the organization tree.

#### Parameter

- `orgId` \<string\> Organization ID
- `nodeId` \<string\> Node ID

#### Example

#### Return value

- `Promise<boolean>`

## Get child nodes list

OrgManagementClient().listChildren(nodeId)

> Get the child nodes list of a node.

#### Parameter

- `nodeId` \<string\> Node ID

#### Example

```javascript
// children node list
const children = await managementClient.org.listChildren("nodeId");
```

#### Return value

- `Promise<Node[]>`

## Get the root node

OrgManagementClient().rootNode(orgId)

> Get the root node of the organization.

#### Parameter

- `orgId` \<string\> Organization ID

#### Example

```javascript
const rootNode = await managementClient.org.rootNode("ORGID");
```

#### Return value

- `Promise<Node[]>`

## Import by JSON

OrgManagementClient().importByJson(json)

> Import organization through a JSON tree.

#### Parameter

- `json` \<Object\> A tree structure in JSON format. Detailed format is in the sample code.

#### Example

```javascript
const tree = {
  name: "Beijing Feifan Technology",
  code: "feifan",
  children: [
    {
      code: "operation",
      name: "operating",
      description: "business department"
    },
    {
      code: "dev",
      name: "research",
      description: "research department",
      children: [
        {
          code: "backend",
          name: "backend",
          description: "backend research department"
        }
      ]
    }
  ]
};
const org = await managementClient.org.importByJson(tree);
```

#### Return value

- `Promise<Node[]>`

## Add members

OrgManagementClient().addMembers(nodeId, userIds)

> Add a member to the node.

#### Parameter

- `nodeId` \<string\> Node ID
- `userIds` \<string[]\> User ID list

#### Example

```javascript
const { totalCount, list } = await managementClient.org.addMembers("NODE_ID", [
  "USER_ID"
]);
```

#### Return value

- `Promise<PaginatedUsers>`

## Get node members

OrgManagementClient().listMembers(nodeId, options)

> Get the node members. You can get the users directly added to the node, and you can get the users of the child nodes.

#### Parameter

- `nodeId` \<string\> Node ID
- `options` \<Object\> Query parameter
- `options.page` \<number\> Default value: `1`.
- `options.limit` \<number\> Default value: `10`.
- `options.includeChildrenNodes` \<boolean\> Whether to get the members of all child nodes. Default value: `false`.

#### Example

```javascript
const { totalCount, list } = await managementClient.org.listMembers("NODE_ID");
```

#### Return value

- `Promise<PaginatedUsers>`

## Delete members

OrgManagementClient().removeMembers(nodeId, userIds)

> Delete members of the node.

#### Parameter

- `nodeId` \<string\> Node ID
- `userIds` \<string[]\> User ID list

#### Example

```javascript
await managementClient.org.removeMembers("NODEID", ["USER_ID"]);
```

#### Return value

- `Promise<PaginatedUsers>`

## Export all organization data

OrgManagementClient().exportAll()

> Export all organizations, and return data in a recursive structure.

#### Example

```javascript
const data = await managementClient.org.exportAll();
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
    "name": "technology company",
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
        "name": "product",
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
        "name": "research",
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
            "name": "backend",
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
        "name": "commercialize",
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

- `orgId` \<string\> Organization ID

#### Example

```javascript
const data = await managementClient.org.exportByOrgId("ORG_ID");
```

#### Sample data

```json
{
  "id": "601f59578308478a692a71ea",
  "createdAt": "2021-02-07T03:07:03.822Z",
  "updatedAt": "2021-02-07T03:07:03.822Z",
  "userPoolId": "59f86b4832eb28071bdd9214",
  "orgId": "601f59573abea48cceb188c6",
  "name": "technology company",
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
      "name": "product",
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
      "name": "research",
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
          "name": "backend",
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
      "name": "commercialize",
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
