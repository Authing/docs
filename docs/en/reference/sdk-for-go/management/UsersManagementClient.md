---
meta:
  - name: description
    content: Manage user
---

# Manage user

<LastUpdated />

This module can perform user directory to delete, search for users, refresh users token, manage user grouped, manage user roles, manage user policy authorization, etc.

## Get user information by ID

management.NewClient(userPoolId, appSecret).Detail(userId)

Get user details through user ID, if you want to get user details with token, use [AuthenticationClient SDK](/en/reference/sdk-for-java/authentication/AuthenticationClient.md#获取当前登录的用户信息) .

#### parameter

- `userId` \<String\> user ID

#### Example

```go
client := management.NewClient(userPoolId, appSecret)
resp, _ := client.Detail("60a6f9ad5bcccc51834950c5")
```

#### return value

- [User](/guides/user/user-profile.md)

## Get a list of users

management.NewClient(userPoolId, appSecret).GetUserList(req)

Get the list of user pool users, the interface is a paging interface

#### parameter

- `model.QueryListRequest` \<QueryListRequest\>
- `QueryListRequest.Page` \<int\> default: 1
- `QueryListRequest.Limit` \<int\> default: 10
- `QueryListRequest.SortBy` \<SortByEnum\> sorting rules

#### Example

```java
client := management.NewClient(userPoolId, appSecret)
  req := model.GetRoleListRequest{
    Page:   1,
    Limit:  10,
    SortBy: enum.SortByCreatedAtAsc,
  }
resp, _ := client.GetUserList(req)
```

####

## Get all the list of users authorized to be authorized

management.NewClient(userPoolId, appSecret).ListAuthorizedResources(req)

Gets all resources authorized by users, and users are authorized to include resources that are inherited from roles, packets, and organizational institutions.

#### parameter

- `req` \<model.ListUserAuthorizedResourcesRequest\> Get all resource list parameters objects authorized by the user.
- `req.UserId` \<String\> User ID。
- `req.Namespace` \<String\> Permission group code, please see[Use Right Limit Group Management Rights Resources](/guides/access-control/resource-group.md).
- `req.ResourceType` \<String\> resource Type.

#### Example

```go
client := NewClient(userPoolId, appSecret)
req := model.ListUserAuthorizedResourcesRequest{
  UserId:       "611b2ff477d701441c25e29e",
  Namespace:    "6123528118b7794b2420b311",
  ResourceType: nil,
}
resp, _ := client.ListAuthorizedResources(req)
```

#### Sample data

- `type` for resource types, there are several of the following resources types
  - `DATA`: type of data;
  - `API`: API type of data;
  - `MENU`: Menu type data;
  - `BUTTON`: Button type data;
- `code`: Resource descriptor, if it is `DATA` type resource, format is `resourceType:resourceId`, such as `books:*` Represents all books,`books:1` indicates a book for ID 1.
- `actions`: The user is authorized to operate the resource.

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

####
