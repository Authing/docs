---
meta:
  - name: description
    content: Management registration white list
---

# Management registration white list

<LastUpdated/>

> Configuring a registered list for your user pool, similar to inviting registration rules, after opening, only users in whitelist can register. {{$localeConfig.brandName}} The currently supported white list has a mobile phone number, email, user name.

## Get white list record

WhitelistManagementClient().list(type)

> Get white list record

#### parameter

- `type` \<WhitelistType\> 白名单类型，USERNAME 为用户名、Email 为邮箱、Phone 为手机号。

#### Example

```php
$list = $managementClient->whitelist()->paginate(WhitelistType::EMAIL);
```

## 添加白名单

WhitelistManagementClient().add(type, list)

> 添加白名单

#### parameter

- `type` \<WhitelistType\> 白名单类型，USERNAME 为用户名、Email 为邮箱、Phone 为手机号。
- `list` \<string[]\> 白名单列表，请注意邮箱不区分大小写。

#### Example

```php
$managementClient->whitelist()->add(WhitelistType::EMAIL, ["test@test.com"]);
```

## 移除白名单

WhitelistManagementClient().remove(type, list)

> 移除白名单

#### parameter

- `type` \<WhitelistType\> 白名单类型，USERNAME 为用户名、Email 为邮箱、Phone 为手机号。
- `list` \<string[]\> 白名单列表，请注意邮箱不区分大小写。

#### Example

```php
$managementClient->whitelist()->remove(WhitelistType::EMAIL, ["test@test.com"]);
```

## 开启白名单

WhitelistManagementClient().enable(type)

> 开启白名单

#### parameter

- `type` \<WhitelistType\> 白名单类型，USERNAME 为用户名、Email 为邮箱、Phone 为手机号。

#### Example

```php
$managementClient->whitelist()->enable(WhitelistType::EMAIL);
```

## 关闭白名单

WhitelistManagementClient().disable(type)

> 关闭白名单

#### parameter

- `type` \<WhitelistType\> White list type, USERNAME is the username、Email is the email、Phone is the mobile phone number.

#### Example

```php
$managementClient->whitelist()->disable(WhitelistType::EMAIL);
```
