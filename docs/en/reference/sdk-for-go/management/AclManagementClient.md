---
meta:
  - name: description
    content: Manage resources and permissions
---

# Manage resources and permissions

<LastUpdated/>

{{$localeConfig.brandName}} Based on ABAC (Attribute Base Access Control, attribute-based rights control) build permission model,

It can be combined with RBAC (Role Based Access Control, role-based access control) to achieve very flexible, refined permission control.

## Authorized resources

```go
NewClient(userPoolId, appSecret).AuthorizeResource(model.AuthorizeResourceRequest)
```

> Authorize a (class) resource to the user, role, packet, organization, and specify different operational permissions separately.

#### parameter

- `namespace`: Permissions group code;
- `resourceType`: Resource type, existing resource types are as follows:
  - `DATA`: type of data;
  - `API`: API type of data;
  - `MENU`: Menu type data;
  - `BUTTON`: Button type data.
- `resource`: Resources, such as a class of resources can be represented as `order`, a resource can be expressed as`order: 123`;
- `opts`: An array
  - `targetType`: Authorized object type, such as: USER, ROLE, GROUP, ORG
  - `targetIdentifier`: 授权对象唯一标志符，如用户 ID、角色 code、分组 code、组织机构 ID；
  - `actions`: Authorized operation list, optional. MENU、BUTTON type data does not need to specify actions。.

#### Example

1. Authorize menu type data `menuA` to authorize to users `USER_ID`:

```go
client := NewClient(userPoolId, appSecret)
	var actions []string
	actions = append(actions, "*")
	opt := model.AuthorizeResourceOpt{
		TargetType:       model.EnumPolicyAssignmentTargetTypeUSER,
		TargetIdentifier: "611b2ff477d701441c25e29e",
		Actions:          actions,
	}
	var opts []model.AuthorizeResourceOpt
	opts = append(opts, opt)
	req := model.AuthorizeResourceRequest{
		Namespace:    "6123528118b7794b2420b311",
		Resource:     "menuA",
		ResourceType: model.EnumResourceTypeBUTTON,
		Opts:         opts,
	}
	resp, _ := client.AuthorizeResource(req)
```

## Authorized resource (shortcut)

```go
NewClient(userPoolId, appSecret).Allow(model.AllowRequest)
```

Allows a user to perform a certain action.

#### parameter

- `userId` \<string\> user ID
- `action` \<string\> operating name, recommended using \<resourceType\>:\<actionName\> format, such as `books:edit`, `books:list`
- `resource` \<string\> resource name, must \<resourceType\>:\<resourceId\> format or _, such as `_`,`books:123`,`books:\*`
- `namespace` \<string\> code of permission grouping, please see [Use Right Limit Group Management Rights Resources](/guides/access-control/resource-group.md)；

#### Example

```go
client := NewClient(userPoolId, appSecret)
req := model.AllowRequest{
  Resource:  "books:123",
  Action:    "books:read",
  UserId:    "611b2ff477d701441c25e29e",
  Namespace: "6123528118b7794b2420b311",
}
resp, _ := client.Allow(req)
```

#### return value

- `bool, errror`

## Cancel the authorization resource

```go
NewClient(userPoolId, appSecret).Allow(model.AllowRequest)
```

Cancel the operation permission to a resource.

#### parameter

- `namespace`: Permissions group code；
- `resource`: Resources, such as a class of resources can be represented as `order`, a resource can be expressed as `order: 123`;
- `opts`: An array
  - `targetType`: Authorized object type, such as USER, ROLE, GROUP, ORG
  - `targetIdentifier`: Authorized object unique marker, such as user ID, role code, grouping code, organization ID;
  - `actions`: Authorized operation list, optional. MENU, BUTTON type data does not need to specify Actions.

1. Cancel user `USER_IDd` for `menuA` Resource permission:

```javascript
client := NewClient(userPoolId, appSecret)
	var actions []string
	actions = append(actions, "*")
	opt := model.AuthorizeResourceOpt{
		TargetType:       model.EnumPolicyAssignmentTargetTypeUSER,
		TargetIdentifier: "611b2ff477d701441c25e29e",
		Actions:          actions,
	}
	var opts []model.AuthorizeResourceOpt
	opts = append(opts, opt)
	req := model.AuthorizeResourceRequest{
		Namespace:    "6123528118b7794b2420b311",
		Resource:     "menuA",
		ResourceType: model.EnumResourceTypeBUTTON,
		Opts:         opts,
	}
	resp, _ := client.AuthorizeResource(req)
```

## Judging whether a user has an action permission to a resource

```go
NewClient(userPoolId, appSecret).IsAllowed(model.AllowRequest)
```

> Judging whether a user has an action permission to a resource

#### parameter

- `userId` \<string\> user ID
- `action` \<string\> Operating name, recommended \<resourceType\>:\<actionName\> format, such as `books:edit`, `books:list`
- `resource` \<string\> Resource name, must \<resourceType\>:\<resourceId\> format or _, such as `_`,`books:123`,`books:\*`
- `options`: Other options, optional
  - `options.namespace`: Resource belongs to the permissions group code, please see [Use Right Limit Packet Management Rights Resources](/guides/access-control/resource-group.md);

#### Example

```go
client := NewClient(userPoolId, appSecret)
req := model.IsAllowedRequest{
  Resource:  "books:123",
  Action:    "books:edit",
  UserId:    "611b2ff477d701441c25e29e",
  Namespace: nil,
}
        resp, _ := client.IsAllowed(req)
```

#### return value

- `bool, error` whether has Action permission
