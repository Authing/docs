---
meta:
  - name: description
    content: Management role
---

# Management role

<LastUpdated />

This module is used to manage the Authing role, and the role can be changed, the role add/delete the user.

## Get a list of roles

management.NewClient(userPoolId, appSecret).GetRoleList(req)

Get a list of roles

#### parameter

- `model.QueryListRequest` \<QueryListRequest\>
- `QueryListRequest.Page` \<int\> default: 1
- `QueryListRequest.Limit` \<int\> default: 10
- `QueryListRequest.SortBy` \<SortByEnum\> sorting rules

#### Example

```go
client := management.NewClient(userPoolId, appSecret)
req := model.GetRoleListRequest{
		Page:   1,
		Limit:  10,
		SortBy: enum.SortByCreatedAtAsc,
}
resp, _ := client.GetRoleList(req)
```

## Get a list of users

management.NewClient(userPoolId, appSecret).GetRoleUserList(req)

Get the user list, the interface is a paging interface.

#### parameter

- `model.GetRoleUserListRequest` \<GetRoleUserListRequest\>
- `GetRoleUserListRequest.Page` \<int\> default: 1
- `GetRoleUserListRequest.Limit` \<int\> default: 10
- `GetRoleUserListRequest.Code` \<string\> role Code
- `GetRoleUserListRequest.Namespace` \<string\> group ID

#### Example

```java
client := management.NewClient(userPoolId, appSecret)
req := model.GetRoleUserListRequest{
		Page:      1,
		Limit:     10,
		Code:      "develop",
		Namespace: "default",
	}
	resp, _ := client.GetRoleUserList(req)
```
