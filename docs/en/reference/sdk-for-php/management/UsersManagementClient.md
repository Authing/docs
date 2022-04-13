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
- `userInfo.email` \<string\> Email, unique in the user pool
- `userInfo.emailVerified` \<boolean\> Is the email verified?
- `userInfo.phone` \<string\> phone number
- `userInfo.phoneVerified` \<boolean\> Whether the phone number is verified
- `userInfo.unionid` \<string\> For the social login user, this field is the unique ID of the user in the third-party social login identity provide
- `userInfo.password` \<string\> password
- `userInfo.registerSource` \<string\> Registration source, you can choose multiple
- `userInfo.username` \<string\> username
- `userInfo.nickname` \<string\> nickname
- `userInfo.photo` \<string\> Avatar
- `userInfo.company` \<string\> company
- `userInfo.browser` \<string\> browser
- `userInfo.loginsCount` \<number\> The number of logins. This field can be set when you migrate from the original user system to {{$localeConfig.brandName}}.
- `userInfo.lastLogin` \<string\> Last login time, a time string conforming to the ISO8601 format. (E.g. "2017-06-07T14:34:08.700Z", "2017-06-07T14:34:08.700 or "2017-06-07T14:34:08+04:00")
- `userInfo.lastIP` \<string\> The last login (or other activity) IP of the user
- `userInfo.signedUp` \<string\> Registration time, a time string in ISO8601 format. (E.g. "2017-06-07T14:34:08.700Z", "2017-06-07T14:34:08.700 or "2017-06-07T14:34:08+04:00")
- `userInfo.blocked` \<boolean\> Whether the account is disabled
- `userInfo.isDeleted` \<boolean\> mark whether the account is deleted
- `userInfo.device` \<string\> device
- `userInfo.lastIP` \<string\>  Last logged in IP
- `userInfo.name` \<string\> Name
- `userInfo.givenName` \<string\> Given Name
- `userInfo.familyName` \<string\> Family Name
- `userInfo.middleName` \<string\> Middle Name
- `userInfo.profile` \<string\> Profile Url
- `userInfo.preferredUsername` \<string\> Preferred Name
- `userInfo.website` \<string\> personal website
- `userInfo.gender` \<string\> Gender, M (Man) means male, F (Female) means female, U (Unknown)  means unknown
- `userInfo.birthdate` \<string\> birthday
- `userInfo.zoneinfo` \<string\> time zone
- `userInfo.locale` \<string\> language
- `userInfo.address` \<string\> address
- `userInfo.streetAddress` \<string\> street address
- `userInfo.locality` \<string\>
- `userInfo.region` \<string\> Region
- `userInfo.postalCode` \<string\> Zip code
- `userInfo.city` \<string\> City
- `userInfo.province` \<string\> Province
- `userInfo.country` \<string\> country

#### Example

```php
$email = "test@example.com";
$password = '123456';
$user = $managementClient->users()->create((new CreateUserInput())->withEmail($email)->withPassword($password));
```

## Update user information

UsersManagementClient \*().update(id, updates)

> Update user information

#### Parameters

- `id` \<string\> user ID
- `updates` \<UpdateUserInput\> Modified user information
- `updates.email` \<string\> email
- `updates.emailVerified` \<boolean\> Whether the email is verified
- `updates.phone` \<string\> phone number
- `updates.phoneVerified` \<boolean\> Whether the phone number is verified
- `updates.unionid` \<string\> For the social login user, this field is the unique ID of the user in the third-party social login identity provider
- `updates.password` \<string\> password
- `updates.registerSource` \<string\> Registration source, you can select multiple
- `updates.tokenExpiredAt` \<string\> The token expiration time, a time string in the ISO8601 format. (Such as "2017-06-07T14:34:08.700Z", "2017-06-07T14:34:08.700 or "2017-06-07T14:34:08+04:00"). Set the field to be earlier than the current time can make the user's token invalid.
- `updates.username` \<string\> username
- `updates.nickname` \<string\> nickname
- `updates.photo` \<string\> avatar
- `updates.company` \<string\> company
- `updates.browser` \<string\> browser
- `updates.loginsCount` \<number\> The number of login times. This field can be set when you migrate from the original user system to Approw.
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

```php
$user = $managementClient->users()->detail("userId");
```

## Delete a user

UsersManagementClient().delete(userId)

> Delete a user

#### Parameter

- `userId` \<string\> user ID

#### Example

```php
$message = $managementClient->users()->delete("userId");
```

## Batch delete users

UsersManagementClient().deleteMany(userIds)

> Batch delete users

#### Parameter

- `userIds` \<string[]\> user ID list

#### Example

```php
$message = $managementClient->users()->deleteMany(["userId"]);
```

## Batch get users

UsersManagementClient().batch(userIds)

> Batch get user details by ID

#### Parameter

- `userIds` \<string[]\> user ID list

#### Example

```php
$users = $managementClient->users()->batch(["userId"]);
```

## Get user list

UsersManagementClient().list(page, limit)

> Get the user list in the user pool.

#### Parameter

- `page` \<number\> Page number, starting from 1. The default value is: `1`.
- `limit` \<number\> The number of users per page. The default value is: `10`.

#### Example

```php
$users = $managementClient->users()->paginate();
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

```php
$users = $managementClient->users()->search("query");
```

## Refresh user token

UsersManagementClient().refresh_token(id)

> Refresh user token

#### Parameter

- `id` \<string\> user ID

#### Example

```php
$message = $managementClient->users()->refreshToken("userId");
```

## Get user group list

UsersManagementClient().list_groups(userId)

> Get user group list

#### Parameter

- `userId` \<string\> user ID

#### Example

```php
$list = $managementClient->users()->listGroups("userId");
```

##  Join a group

UsersManagementClient().add_group(userId, group)

> Add a user to a group.

#### Parameter

- `userId` \<string\> user ID
- `group` \<string\> group code

#### Example

```php
$managementClient->users()->addGroup("userId", "group code");
```

## Quit a group

UsersManagementClient().remove_group(userId, group)

> Remove the user from a group.

#### Parameter

- `userId` \<string\> user ID
- `group` \<string\> group code

#### Example

```php
$managementClient->users()->removeGroup("userId", "group code");
```

## Get user role list

UsersManagementClient().list_roles(userId)

> Get user role list.

#### Parameter

- `userId` \<string\> user ID

#### Example

```php
$roles = $managementClient->users()->listRoles("userId");
```

## Add roles

UsersManagementClient().add_roles(userId, roles)

> Add roles to the user.

#### Parameter

- `userId` \<string\> user ID
- `roles` \<string\> role code list

#### Example

```php
$managementClient->users()->addRoles("userId", ["role code"]);
```

## Remove roles

UsersManagementClient().remove_roles(userId, roles)

> Remove roles from the user.

#### Parameter

- `userId` \<string\> user ID
- `roles` \<string\> role code list

#### Example

```php
$message = $managementClient->users()->removeRoles("userId", ["role code"]);
```
