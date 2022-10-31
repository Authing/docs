---
meta:
  - name: description
    content: UsersManagementClient
---

# UsersManagementClient

<LastUpdated/>

> Authing User ManagementClient

This client can create, query, update and delete users, refresh user token, manage user's group, user's role, user's policy and perform other operations.

## Create a user

UsersManagementClient().create(userInfo)

> This interface uses administrator's privilege to create a user, so it doesn't need to perform security checks such as SMS code verification and other ones.

#### Parameter

- `userInfo` \<CreateUserInput\> user information
- `userInfo.email` \<string\> Email, unique in the user pool
- `userInfo.emailVerified` \<boolean\> Whether the email is verified
- `userInfo.phone` \<string\> phone number
- `userInfo.phoneVerified` \<boolean\> Whether the phone number is verified
- `userInfo.unionid` \<string\>For the social login user, this field is the unique ID of the user in the third-party social login identity provider
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
- `userInfo.lastIP` \<string\> The last login (or other activity) IP of the user
- `userInfo.signedUp` \<string\> Registration time, a time string in ISO8601 format. (E.g. "2017-06-07T14:34:08.700Z", "2017-06-07T14:34:08.700 or "2017-06-07T14:34:08+04:00")
- `userInfo.blocked` \<boolean\> Whether the account is disabled
- `userInfo.isDeleted` \<boolean\> whether the account is deleted
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

```python
user = management_client.users.create(
  userInfo={
    'username': 'bob',
    'password': '123456',
    'phone': '188xxxx8888', # Since this is an admin operation, SMS authentication is needed. If you need it, please use AuthenticationClient
    'nickname': 'Nick',
    'loginsCount': 2, # login counter of the user in original system
    'signedUpd': '2020-10-15T17:55:37+08:00', # register time of the user in original system
})
```

## Update user information

UsersManagementClient \*().update(id, updates)

> Update user information

#### Parameter

- `id` \<string\> user ID
- `updates` \<UpdateUserInput\> Modified user information
- `updates.email` \<string\> email
- `updates.emailVerified` \<boolean\> Whether the email is verified
- `updates.phone` \<string\> phone number
- `updates.phoneVerified` \<boolean\> Whether the phone number is verified
- `updates.unionid` \<string\> For the social login user, this field is the unique ID of the user in the third-party social login identity provider
- `updates.openid` \<string\> The openid returned by WeChat login
- `updates.password` \<string\> password
- `updates.registerSource` \<string\> Registration source, you can select multiple
- `updates.tokenExpiredAt` \<string\> The token expiration time, a time string in the ISO8601 format. (Such as "2017-06-07T14:34:08.700Z", "2017-06-07T14:34:08.700 or "2017-06-07T14:34:08+04:00"). Set the field to be earlier than the current time can make the user's token invalid.
- `updates.username` \<string\> username
- `updates.nickname` \<string\> nickname
- `updates.photo` \<string\> avatar
- `updates.company` \<string\> company
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
- `updates.locale` \<string\> langeage
- `updates.address` \<string\> address
- `updates.streetAddress` \<string\> street address
- `updates.locality` \<string\>
- `updates.region` \<string\> region
- `updates.postalCode` \<string\> zipcode
- `updates.city` \<string\> city
- `updates.province` \<string\> province
- `updates.country` \<string\> country

#### Example

## Get user details

UsersManagementClient().detail(userId)

> Get user details by user ID. If you want to get user details by token, please use AuthenticationClient SDK.

#### Parameter

- `userId` \<string\> user ID

#### Example

```python
data = management_client.users.detail(
  userId="60b4a136d9xxxxcc3d87e55a"
)
```

## Delete a user

UsersManagementClient().delete(userId)

> Delete a user

#### Parameter

- `userId` \<string\> user ID

#### Example

```python
data = management_client.users.delete(
  userId="USERID1"
)
```

## Batch delete users

UsersManagementClient().delete_many(userIds)

> Delete users in bulk.

#### Parameter

- `userIds` \<string[]\> user ID list

#### Example

```python
data = management_client.users.detail(
  userIds=["USERID1", "USERID2"]
)
```

## Batch get users

UsersManagementClient().batch(userIds)

> Batch get user details by ID

#### Parameter

- `userIds` \<string[]\> user ID list

#### Example

```python
data = management_client.users.batch(
  userIds=["USERID1", "USERID2"]
)
```

## Get user list

UsersManagementClient().list(page, limit)

> Get the user list in the user pool.

#### Parameter

- `page` \<number\> Page number, starting from 1. The default value is: `1`.
- `limit` \<number\> The number of users per page. The default value is: `10`.

#### Example

```python
data = management_client.users.list()
totalCount = data['totalCount'] # total amount of users
users = data['list'] # current page
```

## Find a user

UsersManagementClient().find(options)

> Find a user by username, email, and phone number.

#### Parameter

- `options` \<Object\>
- `options.username` \<string\> User name, case sensitive.
- `options.email` \<string\> The email address, which is not case sensitive.
- `options.phone` \<string\> phone number

#### Example

## Search users

UsersManagementClient().search(query, options, page, limit)

> Search users based on keywords.

#### Parameter

- `query` \<null\> search content
- `options` \<string[]\> search options
- `options.fields` \<string[]\> Search user fields. If not specified, the default will be fuzzy search from `username`, `nickname`, `email`, `phone`, `company`, `name`, `givenName`, `familyName`, `middleName`, `profile` and `preferredUsername` fields. If you need a precise search, please use the `find` method.
- `page` \<number\> The default value is: `1`.
- `limit` \<number\> The default value is: `10`.

#### Example

```python
query = 'Bob'
data = management_client.users.search(query=query)
totalCount = data['totalCount'] # total amount of users
users = data['list'] # role list
```

## Refresh user token

UsersManagementClient().refresh_token(id)

> Refresh user token

#### Parameter

- `id` \<string\> user ID

#### Example

```python
data = management_client.users.refresh_token(
    userId="60b4a136d9xxxxcc3d87e55a"
)
token, iat, exp = data['token'], data['iat'], data['exp']
```

## Get user group list

UsersManagementClient().list_groups(userId)

> Get user group list

#### Parameter

- `userId` \<string\> user ID

#### Example

```python
data = management_client.users.list_groups()
totalCount = data['totalCount'] # total amount of user group
users = data['list'] # current page
```

## Join a group

UsersManagementClient().add_group(userId, group)

> Add a user to a group.

#### Parameter

- `userId` \<string\> user ID
- `group` \<string\> group code

#### Example

```python
data = management_client.users.add_group('USER_ID', 'GEOUP_CODE')
code, message = data['code'], data['message']
```

## Quit a group

UsersManagementClient().remove_group(userId, group)

> Remove the user from a group.

#### Parameter

- `userId` \<string\> user ID
- `group` \<string\> group code

#### Example

```python
data = management_client.users.remove_group('USER_ID', 'GEOUP_CODE')
code, message = data['code'], data['message']
```

## Get user role list

UsersManagementClient().list_roles(userId)

> Get user role list.

#### Parameter

- `userId` \<string\> user ID

#### Example

```python
data = management_client.users.list_roles()
totalCount = data['totalCount'] # total amount of roles
users = data['list'] # role list
```

## Add roles

UsersManagementClient().add_roles(userId, roles)

> Add roles to the user.

#### Parameter

- `userId` \<string\> user ID
- `roles` \<string\> role code list

#### Example

```python
data = management_client.users.add_roles(
   userId='60b4a136d9xxxxcc3d87e55a',
   roles=['ROLE1', 'ROLE2']
)
totalCount = data['totalCount'] # the latest amount
users = data['list'] # latest role list
```

## Remove roles

UsersManagementClient().remove_roles(userId, roles)

> Remove roles from the user.

#### Parameter

- `userId` \<string\> user ID
- `roles` \<string\> role code list

#### Example

```python
data = management_client.users.remove_roles(
   userId='60b4a136d9xxxxcc3d87e55a',
   roles=['ROLE1', 'ROLE2']
)
totalCount = data['totalCount'] # the latest amount
users = data['list'] # latest role list
```
