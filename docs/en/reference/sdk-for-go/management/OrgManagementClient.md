---
meta:
  - name: description
    content: Management organization
---

# Management organization

<LastUpdated/>

> A {{$localeConfig.brandName}} The user pool can create multiple organizations. This module is used to manage the {{$localeConfig.brandName}} organization, which can be used to delete and deduct the organization, add a delete mobile node, and import an organization.

## Get node members

management.NewClient(userPoolId, appSecret).ListMembers(listMemberRequest)

> Get a member member, you can get the user directly added to the node, or you can get the user of the node node.

#### parameter

- `model.ListMemberRequest` \<ListMemberRequest\>
- `ListMemberRequest.NodeId` \<String\> node ID

#### Example

```go
client := management.NewClient(userPoolId, appSecret)
	var req = &model.ListMemberRequest{
		NodeId:               "60bdde221e3d90c0ac5efd16",
	}
	resp, _ := client.ListMembers(req)
```

## Export all organization data

management.NewClient(userPoolId, appSecret).ExportAll()

> Export all organizational institutions, the returned data structure is a recursive number structure.

#### Example

```go
client := management.NewClient(userPoolId, appSecret)
resp, _ := client.ExportAll()
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

## Get list of user pool organization

management.NewClient(userPoolId, appSecret).GetOrganizationList(req)

> Get a list of user pool organization.

#### parameter

- `model.QueryListRequest` \<QueryListRequest\>
- `QueryListRequest.Page` \<int\> default: 1
- `QueryListRequest.Limit` \<int\> default: 10
- `QueryListRequest.SortBy` \<SortByEnum\> Sorting rules

#### Example

```go
client := management.NewClient(userPoolId, appSecret)
req := model.QueryListRequest{
		Page:  1,
		Limit: 10,
		SortBy: enum.SortByCreatedAtAsc,
}
resp, _ := client.GetOrganizationList(req)
```

## Get organizational institution details

management.NewClient(userPoolId, appSecret).GetOrganizationById(id)

> Get the organization's details through the organization ID.

#### parameter

- `id` \<string\> organization ID

#### Example

```go
client := management.NewClient(userPoolId, appSecret)
resp, _ := client.GetOrganizationById("60cd9d3ab98280ce211bc834")
```

## Get list of child child nodes

management.NewClient(userPoolId, appSecret).GetOrganizationChildren(nodeId, depth)

> Get the list of organizational child nodes.

#### parameter

- `nodeId` \<string\> Organizational node ID
- `depth` \<int\> Sub-node depth

#### Example

```go
client := management.NewClient(userPoolId, appSecret)
resp, _ := client.GetOrganizationChildren("60cd9d3a4b96cfff16e7e5f4", 1)
```

##
