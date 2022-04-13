---
meta:
  - name: description
    content: Users Management
---

# UsersManagementClient

<LastUpdated/>

> {{$localeConfig.brandName}} User ManagementClient

This client is used to manage {{$localeConfig.brandName}} users. It can create, query, update and delete users, refresh user token, manage user's group, user's role, user's policy and perform other operations.

## Create a user

UsersManagementClient().create(userInfo)

> An administrator can use this interface to create a user and the this process does not need to perform security checks such as SMS code verification and other verifications.

#### Parameters

- `userInfo` \<CreateUserInput\> User information
- `userInfo.email` \<String\> Email, unique in the user pool
- `userInfo.emailVerified` \<Boolean\> Is the email verified?
- `userInfo.phone` \<String\> phone number
- `userInfo.phoneVerified` \<Boolean\> Whether the phone number is verified
- `userInfo.unionid` \<String\> For the social login user, this field is the unique ID of the user in the third-party social login identity provide
- `userInfo.password` \<String\> Password
- `userInfo.registerSource` \<String\> Registration source, you can choose multiple
- `userInfo.username` \<String\> Username
- `userInfo.nickname` \<String\> Nickname
- `userInfo.photo` \<String\> Avatar
- `userInfo.company` \<String\> Company
- `userInfo.browser` \<String\> Browser
- `userInfo.loginsCount` \<Integer\> The number of logins. This field can be set when you migrate from the original user system to {{$localeConfig.brandName}}.
- `userInfo.lastLogin` \<String\> Last login time, a time string conforming to the ISO8601 format. (E.g. "2017-06-07T14:34:08.700Z", "2017-06-07T14:34:08.700 or "2017-06-07T14:34:08+04:00")
- `userInfo.lastIP` \<String\> The last login (or other activity) IP of the user
- `userInfo.signedUp` \<String\> Registration time, a time string in ISO8601 format. (E.g. "2017-06-07T14:34:08.700Z", "2017-06-07T14:34:08.700 or "2017-06-07T14:34:08+04:00")
- `userInfo.blocked` \<Boolean\> Whether the account is disabled
- `userInfo.isDeleted` \<Boolean\> mark whether the account is deleted
- `userInfo.device` \<String\> Device
- `userInfo.lastIP` \<String\> Last logged in IP
- `userInfo.name` \<String\> Name
- `userInfo.givenName` \<String\> Given Name
- `userInfo.familyName` \<String\> Family Name
- `userInfo.middleName` \<String\> Middle Name
- `userInfo.profile` \<String\> Profile Url
- `userInfo.preferredUsername` \<String\> Preferred Name
- `userInfo.website` \<String\> personal website
- `userInfo.gender` \<String\> Gender, M means male, F means female, U means unknown
- `userInfo.birthdate` \<String\> Birthday
- `userInfo.zoneinfo` \<String\> Time zone
- `userInfo.locale` \<String\> Language
- `userInfo.address` \<String\> Address
- `userInfo.streetAddress` \<String\> Street address
- `userInfo.formatted` \<String\> Detailed address
- `userInfo.locality` \<String\>
- `userInfo.region` \<String\> Region
- `userInfo.postalCode` \<String\> Zip code
- `userInfo.city` \<String\> City
- `userInfo.province` \<String\> Province
- `userInfo.country` \<String\> Country

#### Example

```java
String email = "test@example.com";
String password = "123456";
User user = managementClient.users().create(new CreateUserInput().withEmail(email).withPassword(password)).execute();
```

## Update user information

UsersManagementClient().update(id, updates)

> Update user information

#### Parameters

- `id` \<String\> User ID
- `updates` \<UpdateUserInput\> Modified user information
- `updates.email` \<String\> Email
- `updates.emailVerified` \<Boolean\> Whether the email is verified
- `updates.phone` \<String\> Phone number
- `updates.phoneVerified` \<Boolean\> Whether the phone number is verified
- `updates.unionid` \<String\> For the social login user, this field is the unique ID of the user in the third-party social login identity provider
- `updates.password` \<String\> Password
- `updates.registerSource` \<String\> Registration source, you can select multiple
- `updates.tokenExpiredAt` \<String\> The token expiration time, a time string in the ISO8601 format. (Such as "2017-06-07T14:34:08.700Z", "2017-06-07T14:34:08.700 or "2017-06-07T14:34:08+04:00"). Set the field to be earlier than the current time can make the user's token invalid.
- `updates.username` \<String\> Username
- `updates.nickname` \<String\> Nickname
- `updates.photo` \<String\> Avatar
- `updates.company` \<String\> Company
- `updates.browser` \<String\> Browser
- `updates.loginsCount` \<Integer\> The number of login times. This field can be set when you migrate from the original user system to Approw.
- `updates.lastLogin` \<String\> Last login time, a time string in the ISO8601 format. (E.g. "2017-06-07T14:34:08.700Z", "2017-06-07T14:34:08.700 or "2017-06-07T14:34:08+04:00")
- `updates.lastIP` \<String\> The IP of the user's last login (or other activity)
- `updates.signedUp` \<String\> Registration time, a time string in the ISO8601 format. (E.g. "2017-06-07T14:34:08.700Z", "2017-06-07T14:34:08.700 or "2017-06-07T14:34:08+04:00")
- `updates.blocked` \<Boolean\> Whether the account is disabled
- `updates.device` \<String\> Device
- `updates.lastIP` \<String\> Last logged in IP
- `updates.name` \<String\> Name
- `updates.givenName` \<String\> Given Name
- `updates.familyName` \<String\> Family Name
- `updates.middleName` \<String\> Middle Name
- `updates.profile` \<String\> Profile Url
- `updates.preferredUsername` \<String\> Preferred Name
- `updates.website` \<String\> Personal website
- `updates.gender` \<String\> Gender, M means male, F means female, U means unknown
- `updates.birthdate` \<String\> Birthday
- `updates.zoneinfo` \<String\> Timezone
- `updates.locale` \<String\> Langeage
- `updates.address` \<String\> Address
- `updates.streetAddress` \<String\> Street address
- `updates.formatted` \<String\> Detailed address
- `updates.locality` \<String\>
- `updates.region` \<String\> Region
- `updates.postalCode` \<String\> Zipcode
- `updates.city` \<String\> City
- `updates.province` \<String\> Province
- `updates.country` \<String\> Country

#### Example

```java
String userId = 'userId';
User result = managementClient.users().update(userId, new UpdateUserInput().withNickname("nickname")).execute();
```

## Get user details

UsersManagementClient().detail(userId)

> Get user details by user ID. If you want to get user details by token, please use AuthenticationClient SDK.

#### Parameter

- `userId` \<String\> User ID

#### Example

```java
User result = managementClient.users().detail("userId").execute();
```

## Delete a user

UsersManagementClient().delete(userId)

> Delete a user

#### Parameter

- `userId` \<String\> User ID

#### Example

```java
CommonMessage message = managementClient.users().delete("userId").execute();
```

## Batch delete users

UsersManagementClient().deleteMany(userIds)

> Batch delete users

#### Parameter

- `userIds` \<List\<String\>\> User ID list

#### Example

```java
ArrayList<String> userIds = new ArrayList<>();
userIds.add("userId");
CommonMessage message = managementClient.users().deleteMany(userIds).execute();
```

## Batch get users

UsersManagementClient().batch(userIds)

> Batch get user details by ID

#### Parameter

- `userIds` \<List\<String>\> User ID list

#### Example

```java
ArrayList<String> userIds = new ArrayList<>();
userIds.add("userId");
List<User> users = managementClient.users().batch(userIds).execute();
```

## Get user list

- UsersManagementClient().list()
- UsersManagementClient().list(page)
- UsersManagementClient().list(page, limit)
- UsersManagementClient().list(page, limit, sortBy)

> Get the user list in the user pool.

#### Parameter

- `page` \<Integer\> Page number, starting from 1. The default value is: `1`.
- `limit` \<Integer\> The number of users per page. The default value is: `10`.
- `limit` \<SortByEnum\> Sort rules.

#### Example

```java
PaginatedUsers users = managementClient.users().list().execute();
```

## Check if the user exists

UsersManagementClient().exists(options)

> Check whether the user exists. The Approw currently can check username, email, and phone number.

#### Parameters

- `options` \<IsUserExistsParam\>
- `options.username` \<String\> User name, case sensitive.
- `options.email` \<String\> The email address, which is not case sensitive.
- `options.phone` \<String\> Phone number.
- `options.externalId` \<String\> User external Id.

#### Example

```java
Boolean exists = managementClient.users().exists(new IsUserExistsParam().withUsername("test")).execute();
```

## Find a user

UsersManagementClient().find(options)

> Find a user by username, email, and phone number.

#### Parameter

- `options` \<FindUserParam\>
- `options.username` \<String\> User name, case sensitive.
- `options.externalId` \<String\> User external Id.
- `options.email` \<String\> The email address, which is not case sensitive.
- `options.phone` \<String\> Phone number

#### Example

```java
User user = managementClient.users().find(new FindUserParam().withUsername(username)).execute();
```

## Search users

- UsersManagementClient().search(query)
- UsersManagementClient().search(query, options)
- UsersManagementClient().search(query, options, page)
- UsersManagementClient().search(query, options, page, limit)

> Search users based on keywords.

#### Parameter

- `query` \<String\> Search content
- `options` \<List\<String\>\> Search options
- `options.fields` \<List\<String\>\> Search user fields. If not specified, the default will be fuzzy search from `username`, `nickname`, `email`, `phone`, `company`, `name`, `givenName`, `familyName`, `middleName`, `profile` and `preferredUsername` fields. If you need a precise search, please use the `find` method.
- `page` \<Integer\> The default value is: `1`.
- `limit` \<Integer\> The default value is: `10`.

#### Example

```java
String query = "query";
PaginatedUsers users = managementClient.users().search(query).execute();
```

## Refresh user token

UsersManagementClient().refresh_token(id)

> Refresh user token

#### Parameter

- `id` \<String\> User ID

#### Example

```java
RefreshToken token = managementClient.users().refreshToken("userId").execute();
```

## Get user group list

UsersManagementClient().listGroups(userId)

> Get user group list

#### Parameter

- `userId` \<String\> User ID

#### Example

```java
managementClient.users().listGroups("userId").execute();
```

## Join a group

UsersManagementClient().addGroup(userId, group)

> Add a user to a group.

#### Parameter

- `userId` \<String\> User ID
- `group` \<String\> Group code

#### Example

```java
managementClient.users().addGroup("userId", "groupCode").execute();
```

## Quit a group

UsersManagementClient().removeGroup(userId, group)

> Remove the user from a group.

#### Parameter

- `userId` \<String\> User ID
- `group` \<String\> Group code

#### Example

```java
managementClient.users().removeGroup("userId", "groupCode").execute();
```

## List policies

UsersManagementClient().listPolicies(userId)

> List policies of user

#### Parameter

- `userId` \<String\> User ID

#### Example

```java
managementClient.users().listPolicies("userId").execute();
```

## Add policies

UsersManagementClient().listPolicies(userId, policies)

> Add policies for user

#### Parameter

- `userId` \<String\> User ID
- `policies` \<List\<String\>\> Policy code list

#### Example

```java
managementClient.users().listPolicies("userId", Arrays.asList("policyCode1", "policyCode2")).execute();
```

## Remove policies

UsersManagementClient().removePolicies(userId, policies)

> Revoke policies for user

#### Parameter

- `userId` \<String\> User ID
- `policies` \<List\<String\>\> Policy code list

#### Example

```java
managementClient.users().removePolicies("userId", Arrays.asList("policyCode1", "policyCode2")).execute();
```

## List user defined value list

UsersManagementClient().listUdv(userId)

> List user defined value list

#### Parameter

- `userId` \<String\> User ID

#### Example

```java
managementClient.users().listUdv("userId").execute();
```

## Set user defined value

- UsersManagementClient().setUdfValue(userId, data)
- UsersManagementClient().setUdv(userId, key, value)

> Set user defined value

#### Parameter

- `userId` \<String\> User ID
- `key` \<String\> User defined data key
- `value` \<String\> User defined data value
- `data` \<Map\<String, String>\> User defined data map
- `data.key` \<String\> User defined data key
- `data.value` \<String\> User defined data value

#### Example

```java
Map<String, String> data = new HashMap<>();
data.put("k", "v");
managementClient.users().setUdfValue("userId", data).execute();
```

## Batch set user defined value

UsersManagementClient().setUdfValueBatch(items)

> Batch set user defined value

#### Parameter

- `items` \<List\<SetUdfValueBatchInputItem>\> items
- `items.userId` \<String\> User ID
- `items.data` \<Map\<String, String>\> User defined data map
- `items.data.key` \<String\> User defined data key
- `items.data.value` \<String\> User defined data value

#### Example

```java
Map<String, String> data = new HashMap<>();
data.put("testKey", "testValue");
SetUdfValueBatchInputItem item1 = new SetUdfValueBatchInputItem(user1.getId(), data);
SetUdfValueBatchInputItem item2 = new SetUdfValueBatchInputItem(user2.getId(), data);
managementClient.users().setUdfValueBatch(Arrays.asList(item1, item2)).execute();
```

## Remove user defined value

- UsersManagementClient().removeUdv(userId, key)
- UsersManagementClient().removeUdfValue(userId, key)

> Remove user defined value

#### Parameter

- `userId` \<String\> User ID
- `key` \<String\> User defined data key

#### Example

```java
managementClient.users().setUdfValue("userId", "key").execute();
```

## List user's orgs

UsersManagementClient().listOrgs(userId)

> List user's orgs

#### Parameter

- `userId` \<String\> User ID

#### Example

```java
managementClient.users().listOrgs("userId").execute();
```

## List Authorized Resources

UsersManagementClient().listAuthorizedResources(userId, namespace)

> List Authorized Resources

#### Parameter

- `userId` \<String\> User ID
- `namespace` \<String\> Code of the privilege group. For more details, please refer to: [Use privilege groups to manage privileged resources](/guides/access-control/resource-group.md).

#### Example

```java
managementClient.users().listAuthorizedResources("userId", "default").execute();
```

## Get user defined value

UsersManagementClient().getUdfValue(userId)

> Get user defined value

#### Parameter

- `userId` \<String\> User ID

#### Example

```java
managementClient.users().getUdfValue("userId", "default").execute();
```

## Batch get user defined value

UsersManagementClient().getUdfValueBatch(userIds)

> Batch get user defined value

#### Parameter

- `userIds` \<List\<String\>\> User ID list

#### Example

```java
managementClient.users().getUdfValueBatch("userId", "default").execute();
```

## Has role

UsersManagementClient().hasRole(param)

> Has role

#### Parameter

- `param` \<IHasRoleParam\> Request param.
- `param.userId` \<String\> User Id.
- `param.roleCode` \<String\> Role code.
- `param.namespace` \<String\> Code of the privilege group. For more details, please refer to: [Use privilege groups to manage privileged resources](/guides/access-control/resource-group.md).

#### Example

```java
managementClient.users().hasRole(new IHasRoleParam(user.getId(), role.getCode(), "default"));
```

## Get user role list

- UsersManagementClient().listRoles(userId)
- UsersManagementClient().listRoles(userId, namespace)

> Get user role list.

#### Parameter

- `userId` \<String\> User ID
- `namespace` \<String\> Code of the privilege group. For more details, please refer to: [Use privilege groups to manage privileged resources](/guides/access-control/resource-group.md).

#### Example

```java
PaginatedRoles roles = managementClient.users().listRoles("userId").execute();
```

## Add roles

UsersManagementClient().addRoles(userId, roles, namespace)

> Add roles to the user.

#### Parameter

- `userId` \<String\> User ID
- `roles` \<String\> Role code list
- `namespace` \<String\> code of the privilege group. For more details, please refer to: [Use privilege groups to manage privileged resources](/guides/access-control/resource-group.md).

#### Example

```java
ArrayList<String> roles = new ArrayList<>();
roles.add("role code");
managementClient.users().addRoles("userId", roles, "default").execute();
```

## Remove roles

UsersManagementClient().removeRoles(userId, roles, namespace)

> Remove roles from the user.

#### Parameter

- `userId` \<String\> User ID
- `roles` \<String\> Role code list
- `namespace` \<String\> code of the privilege group. For more details, please refer to: [Use privilege groups to manage privileged resources](/guides/access-control/resource-group.md).

#### Example

```java
ArrayList<String> roles = new ArrayList<>();
roles.add("role code");
CommonMessage message = managementClient.users().removeRoles("userId", roles, "default").execute();
```

## Batch kick User

UsersManagementClient().kick(userIds)

> Batch kick User

#### Parameter

- `userIds` \<List\<String\>\> User ID List

#### Example

```java

managementClient.users().kick(Arrays.asList("userId1", "userId2")).execute();

```

## List user's actions

UsersManagementClient().listUserActions(param)

> List user's actions

#### Parameter

- `param` \<ListUserActionsParams\>
- `param.clientIp` \<String\> Client real ip address.
- `param.operationName` \<String\> Operation name.
- `param.operatoArn` \<String\> Operation arn.
- `param.page` \<Integer\> Page number, starting from 1. The default value is: `1`.
- `param.limit` \<Integer\> The number of users per page. The default value is: `10`.

#### Example

```java

managementClient.users().listUserActions(new ListUserActionsParams("clientIp",
        "operationName", "operatoArn", 1, 10)).execute();

```

## List user's department

UsersManagementClient().listDepartment(userId)

> List user's department

#### Parameter

- `userId` \<String\> User ID.

#### Example

```java

managementClient.users().listDepartment("userId").execute();

```

## Check user login status

UsersManagementClient().checkLoginStatus(param)

> Check user login status

#### Parameter

- `param` \<CheckLoginStatusParams\>
- `param.appId` \<String\> App ID.
- `param.deviceId` \<String\> User's device ID.
- `param.userId` \<String\> User ID.

#### Example

```java

managementClient.users().checkLoginStatus(new CheckLoginStatusParams(user.getId())).execute();

```

## User logout

UsersManagementClient().logout(param)

> User logout

#### Parameter

- `param` \<UserLogoutParams\>
- `param.appId` \<String\> App ID.
- `param.userId` \<String\> User ID.

#### Example

```java

managementClient.users().logout(new UserLogoutParams(user.getId())).execute();

```
