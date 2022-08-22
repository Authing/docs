# Manage users

<LastUpdated/>

> Authing User ManagementClient

This client can create, query, update and delete users, refresh user token, manage user's group, user's role, user's policy and perform other operations.

Please follow the instructions below to use this client:

```javascript
import { ManagementClient } from "authing-js-sdk";
// Cited by Node.js:
// const { ManagementClient } = require('authing-node-sdk');

const managementClient = new ManagementClient({
  accessKeyId: 'AUTHING_USERPOOL_ID',
  accessKeySecret: 'AUTHING_USERPOOL_SECRET',
});

managementClient.users.list; // create user list
managementClient.users.create; // create a user
managementClient.users.listRoles; // get user's roles in list form
managementClient.users.search; // search for a user
```

## Create a user

UsersManagementClient().create(userInfo)

> This interface uses administrator role to crate users, so it is unnecessary to perform security verification with mobile phone number anymore.

#### Parameter

- `userInfo` \<CreateUserInput\> user information
- `userInfo.email` \<string\> email, unique in the user pool
- `userInfo.emailVerified` \<boolean\> whether the email is verified
- `userInfo.phone` \<string\> phone number
- `userInfo.phoneVerified` \<boolean\> whether the phone number is verified
- `userInfo.unionid` \<string\> For the social login user, this field is the unique ID of the user in the third-party social login identity provider.
- `userInfo.openid` \<string\> The openid returned by WeChat login
- `userInfo.password` \<string\> password
- `userInfo.registerSource` \<string\> Registration source, you can choose multiple
- `userInfo.username` \<string\> username
- `userInfo.nickname` \<string\> nickname
- `userInfo.photo` \<string\> avatar
- `userInfo.company` \<string\> company
- `userInfo.browser` \<string\> browser
- `userInfo.loginsCount` \<number\> The number of login times. This field can be set when you migrate from the original user system to Authing.
- `userInfo.lastLogin` \<string\> Last login time, a time string conforming to the ISO8601 format. (E.g. "2017-06-07T14:34:08.700Z", "2017-06-07T14:34:08.700 or "2017-06-07T14:34:08+04:00")
- `userInfo.lastIP` \<string\> The last login (or other activity) IP of the user.
- `userInfo.signedUp` \<string\> Registration time, a time string in ISO8601 format. (E.g. "2017-06-07T14:34:08.700Z", "2017-06-07T14:34:08.700 or "2017-06-07T14:34:08+04:00")
- `userInfo.blocked` \<boolean\> Whether the account is disabled
- `userInfo.isDeleted` \<boolean\> mark whether the account is deleted
- `userInfo.device` \<string\> device
- `userInfo.lastIP` \<string\> Last logged in IP
- `userInfo.name` \<string\> Name
- `userInfo.givenName` \<string\> Given Name
- `userInfo.familyName` \<string\> Family Name
- `userInfo.middleName` \<string\> Middle Name
- `userInfo.profile` \<string\> Profile Url
- `userInfo.preferredUsername` \<string\> Preferred Name
- `userInfo.website` \<string\> personal website
- `userInfo.gender` \<string\> Gender, M means male, F means female, U means unknown
- `userInfo.birthdate` \<string\> birthday
- `userInfo.zoneinfo` \<string\> timezone
- `userInfo.locale` \<string\> language
- `userInfo.address` \<string\> address
- `userInfo.streetAddress` \<string\> street address
- `userInfo.locality` \<string\>
- `userInfo.region` \<string\> region
- `userInfo.postalCode` \<string\> zipcode
- `userInfo.city` \<string\> city
- `userInfo.province` \<string\> province
- `userInfo.country` \<string\> country

#### Example

```javascript
const user = await managementClient.users.create({
  username: "bob",
  password: "passw0rd"
});
```

```javascript
const user = await managementClient.users.create({
   nickname: 'Nick',
   phone: '176xxxx6754', // since this is an admin operation, SMS code verification is required. If you need it, please use AuthenticationClient
   loginsCount: 2 // user login counter in original user system
   signedUp: '2020-10-15T17:55:37+08:00' // user register time logged by original system
})
```

#### Return value

- [Promise\<User\>](/guides/user/user-profile.md)

## Update user info

UsersManagementClient \*().update(id, updates)

> Update user info

#### Parameter

- `id` \<string\> User ID
- `updates` \<UpdateUserInput\> Modified user information
- `updates.email` \<string\> email
- `updates.emailVerified` \<boolean\> whether the email is verified
- `updates.phone` \<string\> phone number
- `updates.phoneVerified` \<boolean\> whether the phone number is verified
- `updates.unionid` \<string\> For the social login user, this field is the unique ID of the user in the third-party social login identity provider
- `updates.openid` \<string\> The openid returned by WeChat login
- `updates.password` \<string\> password
- `updates.registerSource` \<string\> Registration source, you can select multiple
- `updates.tokenExpiredAt` \<string\> The token expiration time, a time string in the ISO8601 format. (Such as "2017-06-07T14:34:08.700Z", "2017-06-07T14:34:08.700 or "2017-06-07T14:34:08+04:00"). Set the field to be earlier than the current time can make the user's token invalid.
- `updates.username` \<string\> username
- `updates.nickname` \<string\> nickname
- `updates.photo` \<string\> avatar
- `updates.company` \<string\> comapny
- `updates.browser` \<string\> browser
- `updates.loginsCount` \<number\> The number of login times. This field can be set when you migrate from the original user system to Authing.
- `updates.lastLogin` \<string\> Last login time, a time string in the ISO8601 format. (E.g. "2017-06-07T14:34:08.700Z", "2017-06-07T14:34:08.700 or "2017-06-07T14:34:08+04:00")
- `updates.lastIP` \<string\> The IP of the user's last login (or other activity)
- `updates.signedUp` \<string\> Registration time, a time string in the ISO8601 format. (E.g. "2017-06-07T14:34:08.700Z", "2017-06-07T14:34:08.700 or "2017-06-07T14:34:08+04:00")
- `updates.blocked` \<boolean\> Whether the account is disabled
- `updates.device` \<string\> device
- `updates.lastIP` \<string\> Last logged in IP
- `updates.name` \<string\> Name
- `updates.givenName` \<string\> Given Name
- `updates.familyName` \<string\> Family Name
- `updates.middleName` \<string\> Middle Name
- `updates.profile` \<string\> Profile Url
- `updates.preferredUsername` \<string\> Preferred Name
- `updates.website` \<string\> personal website
- `updates.gender` \<string\> Gender, M means male, F means female, U means unknown
- `updates.birthdate` \<string\> birthday
- `updates.zoneinfo` \<string\> timezone
- `updates.locale` \<string\> language
- `updates.address` \<string\> address
- `updates.streetAddress` \<string\> street address
- `updates.locality` \<string\>
- `updates.region` \<string\> region
- `updates.postalCode` \<string\> zipcode
- `updates.city` \<string\> city
- `updates.province` \<string\> province
- `updates.country` \<string\> country

#### Example

```javascript
const user = await managementClient.users.update("USERID", {
  nickname: "Nick"
});
```

```javascript
const user = await managementClient.users.update("USERID", {
  nickname: "Nick",
  phone: "176xxxx6754", // since this is an admin operation, SMS code verification is required. If you need it, please use AuthenticationClient
  tokenExpiredAt: "2020-10-15T17:55:37+08:00"
});
```

#### Return value

- [Promise\<User\>](/guides/user/user-profile.md)

## Get user details

UsersManagementClient().detail(userId)

> Get user details by user ID. If you want to get user details by token, please use AuthenticationClient SDK.

#### Parameter

- `userId` \<string\> User ID

#### Example

```javascript
const user = await managementClient.users.detail("USERID");
```

#### Return value

- [Promise\<User\>](/guides/user/user-profile.md)

## Get user defined data

UsersManagementClient().getUdfValue(userId)

> Before you get user defined data, you need to [set user defined field](/guides/users/user-defined-field/) in the user pool.

#### Parameter

- `userId` \<string\> user ID

#### Example

```javascript
const data = await managementClient.users.getUdfValue("USER_ID");
```

#### Sample data

```json
{
  "school": "Huazhong Institute of Technology",
  "age": 20
}
```

## Get user defined data in bulk

UsersManagementClient().getUdfValueBatch(userIds)

> Before you get user defined data, you need to [set user defined field](/guides/users/user-defined-field/) in the user pool.

#### Parameter

- `userIds` \<string\> user ID list

#### Example

```javascript
const data = await managementClient.users.getUdfValueBatch([
  "USER_ID1",
  "USER_ID2"
]);
```

#### Sanple data

```json
{
  "USER_ID1": {
    "school": "Huazhong Institute of Technology",
    "age": 20
  },
  "USER_ID2": {
    "school": "Peking University",
    "age": 21
  }
}
```

## Set user defined data

UsersManagementClient().setUdfValue(userId, data)

> Set user defined data. Before that, you need to [set user defined field](/guides/users/user-defined-field/) first in the user pool. The data type must be consistent. If failed, it will throw an exception. You need to capture it.

#### Parameter

- `userId` \<string\> user ID
- `data` \<KeyValuePair>\ user defined field data. It is an object.

#### Example

```javascript
await managementClient.users.setUdfValue(userId, {
  school: "Huazhong Institute of Technology",
  age: 20
});
```

## Batch set user defined data

UsersManagementClient().setUdfValueBatch(input)

> Set multiple users defined data. Before that, you need to [set user defined field](/guides/users/user-defined-field/) first in the user pool. The data type must be consistent. If failed, it will throw an exception. You need to capture it.

#### Parameter

- `input` \<string\> input data. See structure in example.

#### Example

```javascript
await managementClient.users.setUdfValueBatch([
  {
    userId: "USER_ID1",
    data: {
      school: "Huazhong Institute of Technology"
    }
  },
  {
    userId: "USER_ID2",
    data: {
      school: "Tsinghua University",
      age: 100
    }
  }
]);
```

## Remove user defined data

UsersManagementClient().removeUdfValue(userId, key)

> Delete user defined data. Before that, you need to [set user defined field](/guides/users/user-defined-field/) first in the user pool. The data type must be consistent. If failed, it will throw an exception. You need to capture it.

#### Parameter

- `userId` \<string\> user ID
- `key` \<string\> the key of the user defined data.

#### Example

```javascript
await authenticationClient.removeUdfValue("USER_ID", "school");
```

## Delete a user

UsersManagementClient().delete(userId)

> Delete a user

#### Parameter

- `userId` \<string\> user ID

#### Example

```javascript
const user = await managementClient.users.delete("USERID");
```

#### Return value

- `Promise<CommonMessage>`

## Batch delete users

UsersManagementClient().deleteMany(userIds)

> Batch delete users

#### Parameter

- `userIds` \<string[]\> user ID list

#### Example

```javascript
const user = await managementClient.users.deleteMany(["USERID"]);
```

#### Return value

- `Promise<CommonMessage>`

## Batch get users

UsersManagementClient().batch(userIds)

> Batch get user details by ID

#### Parameter

- `userIds` \<string[]\> user ID list

#### Example

```javascript
const users = await managementClient.users.batch(["USERID"]);
```

#### Return value

- `Promise<CommonMessage>`

## Get user list

UsersManagementClient().list(page, limit)

> Get the user list in the user pool

#### Parameter

- `page` \<number\> Page number, starting from 1. The default value is: `1`.
- `limit` \<number\> The number of users per page. The default value is: `10`.

#### Example

```javascript
const user = await managementClient.users.list();
```

#### Return value

- `null`

## Check if the user exists

UsersManagementClient().exists(options)

> Check whether the user exists. Currently it can check username, email, and phone number.

#### Parameter

- `options` \<Object\>
- `options.username` \<string\> User name, case sensitive.
- `options.email` \<string\> The email address, not case sensitive.
- `options.phone` \<string\> phone number

#### Example

```javascript
const exists = await managementClient.users.exists({
  username: "bob"
});
```

#### Return value

- `Promise<boolean>`

## Find a user

UsersManagementClient().find(options)

> Find a user by username, email, and phone number.

#### Parameter

- `options` \<Object\>
- `options.username` \<string\> User name, case sensitive.
- `options.email` \<string\> The email address, not case sensitive.
- `options.phone` \<string\> phone number

#### Example

#### Return value

## Search users

UsersManagementClient().search(query, options, page, limit)

> Search users based on keywords.

#### Parameter

- `query` \<null\> search content
- `options` \<string[]\> options
- `options.fields` \<string[]\> Search user fields. If not specified, the default will be fuzzy search from `username`, `nickname`, `email`, `phone`, `company`, `name`, `givenName`, `familyName`, `middleName`, `profile` and `preferredUsername` fields. If you need a precise search, please use the find method.
- `page` \<number\> The default value is:`1`.
- `limit` \<number\> The default value is: `10`.

#### Example

```javascript
const { totalCount, list } = await managementClient.users.search("Bob");
```

#### Return value

- `Promise<PaginatedUsers>`

## Refresh user token

UsersManagementClient().refreshToken(id)

> Refresh user token

#### Parameter

- `id` \<string\> User ID

#### Example

```javascript
const { token } = await managementClient.users.refreshToken("USERID");

// check the latest status of the token. It can get user's token

const data = await managementClient.checkLoginStatus(token, {
  fetchUserDetail: true
});
```

#### Return value

- `Promise<RefreshToken>`

## Get user group list

UsersManagementClient().listGroups(userId)

> Get user group list

#### Parameter

- `userId` \<string\> user ID

#### Example

```javascript
const { list, totalCount } = await managementClient.users.listGroups("USERID");
```

#### Return value

- `Promise<DeepPartial<PaginatedGroups>>`

## Join a group

UsersManagementClient().addGroup(userId, group)

> Add a user to a group

#### Parameter

- `userId` \<string\> user ID
- `group` \<string\> group code

#### Example

```javascript
const { code, message } = await managementClient.users.addGroup(
  "USERID",
  "GROUP_CODE"
);
```

#### Return value

- `Promise<CommonMessage>`

## Quit a group

UsersManagementClient().removeGroup(userId, group)

> Remove the user from a group.

#### Parameter

- `userId` \<string\> user ID
- `group` \<string\> group code

#### Example

```javascript
const { code, message } = await managementClient.users.removeGroup(
  "USERID",
  "GROUP_CODE"
);
```

#### Return value

- `Promise<CommonMessage>`

## Get user role list

UsersManagementClient().listRoles(userId)

> Get a user's role list

#### Parameter

- `userId` \<string\> user ID

#### Example

```javascript
const { list, totalCount } = await managementClient.users.listRoles("USERID");
```

#### Return value

- `Promise<DeepPartial<PaginatedRoles>>`

## Add roles

UsersManagementClient().addRoles(userId, roles)

> Add roles to the user

#### Parameter

- `userId` \<string\> user ID
- `roles` \<string\> role code list

#### Example

```javascript
const { code, message } = await managementClient.users.addRoles("USERID", [
  "ROLEA"
]);
```

#### Return value

- `Promise<CommonMessage>`

## Remove roles

UsersManagementClient().removeRoles(userId, roles)

> Remove roles from the user.

#### Parameter

- `userId` \<string\> User ID
- `roles` \<string\> role code list

#### Example

```javascript
const { code, message } = await managementClient.users.removeRoles("USERID", [
  "ROLEA"
]);
```

#### Return value

- `Promise<CommonMessage>`

## Get the list of authorized resources of the user

UsersManagementClient.listAuthorizedResources(userId, namespace)

> Get all the resources authorized to this user. All the resources authorized to the user include resources inherited from roles, groups, and organizations.

#### Parameter

- `userId` \<string\> user ID；
- `namespace` \<string\> the code of the permission group. For more details, please refer to [resource group](/guides/access-control/resource-group.md).

#### Example

```javascript
managementClient.users.listAuthorizedResources("USERID", "code");
```

#### Sample data

- `type`: type is the type of resource, there are several different values that can be used:
  - `DATA`: data type;
  - `API`: API interface type;
  - `MENU`: menu type;
  - `BUTTON`: button type;
- `code`: resource descriptor, if the resource is `DATA` type, the format should be: `resourceType: resourceId`, for example, `books:*` means all books, `books:1` means the book that has an id of 1.
- `actions`: actions that user is authorized to operate on the resource.

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
