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

```java
CommonMessage message = managementClient.acl().allow("resource", "action").execute();
```

## Check whether a user has operation authority of a resource

AclManagementClient().isAllowed(userId, action, resource)

> Check whether a user has operation authority of a resource

#### Parameters:

- `userId` \<string\> User ID
- `action` \<string\> The name of the action, which is recommended to use the format of  \<resourceType\>:\<actionName\> , such as `books:edit`, `books:list`
- `resource` \<string\> Resource name, which must be in the format of \<resourceType\>:\<resourceId\> or _, such as `_`,`books:123`,`books:\*`

#### Example:

```java
boolean allowed = managementClient.acl().isAllowed("user id", "resource", "action").execute();
```