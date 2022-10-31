# AclManagementClient

<LastUpdated/>

> {{$localeConfig.brandName}} builds an authorization model based on PBAC (Policy Based Access Control),
> which can be combined with RBAC (Role Based Access Control) to achieve high flexible and refined privilege control.
> This client abstracts this model into two methods: allow and isAllowed.

Please follow the instructions below to use this client. Do not initialize this client directly.

```javascript
import { ManagementClient } from "authing-js-sdk";
const managementClient = new ManagementClient({
  userPoolId: "YOUR_USERPOOL_ID",
  secret: "YOUR_USERPOOL_SECRET"
});
managementClient.acl.allow; // allow a user to perfomr operation on some resource
managementClient.acl.isAllowed; // judge if a user has the privilege to operate on some resource
```

## Allow a user to perform an operation on a resource

AclManagementClient().allow(userId, action, resource)

> Allow a user to perform an operation on a resource.

#### Parameter

- `userId` \<string\> user ID
- `action` \<string\> The name of the action, which is recommended to use the format of \<resourceType\>:\<actionName\>, such as `books:edit`, `books:list`
- `resource` \<string\> Resource name, which must be in the format of \<resourceType\>:\<resourceId\> or _, such as `_`,`books:123`,`books:\*`

#### Example

```javascript
managementClient.acl.allow("USERID1", "books:123", "books:read");
managementClient.acl.isAllowed("USERID1", "books:123", "books:read"); // true
managementClient.acl.isAllowed("USERID1", "books:123", "books:edit"); // false
```

```javascript
managementClient.acl.allow("USERID2", "books:*", "books:*");
managementClient.acl.isAllowed("USERID2", "books:123", "books:read"); // true
managementClient.acl.isAllowed("USERID2", "books:124", "books:edit"); // true
```

#### Return value

- `Promise<CommonMessage>`

## Get whether a user has operation privilege of a resource

AclManagementClient().isAllowed(userId, action, resource)

> Get whether a user has operation authority of a resource

#### Parameter

- `userId` \<string\> user ID
- `action` \<string\> The name of the action, which is recommended to use the format of \<resourceType\>:\<actionName\>, such as `books:edit`, `books:list`
- `resource` \<string\> Resource name, which must be in the format of \<resourceType\>:\<resourceId\> or _, such as `_`,`books:123`,`books:\*`

#### Example

```javascript
managementClient.acl.isAllowed("60b4a136d9xxxxcc3d87e55a", "books:*", "books:edit");
```

#### Return value

- `Promise<boolean>` whether the user has the privilege or not

## Get the list of all authorized resources of the user

UsersManagementClient.listAuthorizedResources(userId, namespace)

> Get a list of resources that user is authorized to access, including resource that the user inherited from role, group and organization.

#### Parameter

- `userId` \<string\> user ID;
- `namespace` \<string\> code of the privilege group. For more details, please refer to: [Use privilege groups to manage privileged resources](/guides/access-control/resource-group.md).

#### Example

```javascript
managementClient.users.listAuthorizedResources("60b4a136d9xxxxcc3d87e55a", "code");
```

#### Sample data

- `type` type is the type of resource, there are several different values that can be used:
  - `DATA`: data type;
  - `API`: interface type;
  - `MENU`: menu type;
  - `BUTTON`: button type;
- `code`: resource descriptor, if the resource is `DATA` type, the format should be: `resourceType: resourceId`, for example, `books:*` means all books, `books:1` means the book that has an id of 1.
- `actions`: actions that user authorized to operate on the resource.

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
