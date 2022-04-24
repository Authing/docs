---
meta:
  - name: description
    content: AclManagementClient
---

# AclManagementClient

<LastUpdated/>


> {{$localeConfig.brandName}} builds an authorization model based on PBAC (Policy Based Access Control), 
> which can be combined with RBAC (Role Based Access Control) to achieve high flexible and refined privilege control. 
> This client abstracts this model into two methods: allow and isAllowed.

## Allow a user to perform an operation on a resource

AclManagementClient().allow(userId, action, resource)

> Allow a user to perform an operation on a resource

#### Parameters:

- `userId` \<string\> User ID
- `action` \<string\> The name of the action, which is recommended to use the format of  \<resourceType\>:\<actionName\> , such as `books:edit`, `books:list`
- `resource` \<string\> Resource name, which must be in the format of \<resourceType\>:\<resourceId\> or _, such as `_`,`books:123`,`books:\*`

#### Example:

```csharp
await managementClient.Acl.Allow("resource id", "role id");
```

## Get whether a user has operation authority of a resource

AclManagementClient().isAllowed(userId, action, resource)

> Get whether a user has operation authority of a resource

#### Parameters:

- `userId` \<string\> User ID
- `action` \<string\> The name of the action, which is recommended to use the format of  \<resourceType\>:\<actionName\> , such as `books:edit`, `books:list`
- `resource` \<string\> Resource name, which must be in the format of \<resourceType\>:\<resourceId\> or _, such as `_`,`books:123`,`books:\*`

#### Example:

```csharp
var isAllowed = await managementClient.Acl.IsAllowed("user id", "action id", "resource id");
```
