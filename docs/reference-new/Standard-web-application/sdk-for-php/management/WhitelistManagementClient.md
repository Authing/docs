---
meta:
  - name: description
    content: 管理注册白名单
---

# 管理注册白名单

<LastUpdated/>


> 为你的用户池配置一个注册白名单，类似于邀请注册规则，开启后，只有白名单里的用户才能进行注册。 {{$localeConfig.brandName}} 目前支持的白名单方式有手机号、邮箱、用户名。

请使用以下方式使用该模块：

```php
use Authing\Mgmt\ManagementClient;

$manageClient = new ManagementClient('YOUR_USERPOOL_ID', 'YOUR_USERPOOL_SECRET');

$whitelistsManagementClient = $managementClient->whitelists();
$whitelistsManagementClient->paginate // 获取白名单记录
$whitelistsManagementClient->add   // 添加白名单
$whitelistsManagementClient->remove // 移除白名单
```

## 获取白名单记录

WhitelistManagementClient->paginate(string $type)

获取白名单记录

#### 参数

- `type` \<WhitelistType\> 白名单类型，USERNAME 为用户名、Email 为邮箱、Phone 为手机号。

#### 示例

```php
$list = $managementClient->whitelist()->paginate(WhitelistType::EMAIL);
```

## 添加白名单

WhitelistManagementClient->add(string $type, array $list)

添加白名单

#### 参数

- `type` \<WhitelistType\> 白名单类型，USERNAME 为用户名、Email 为邮箱、Phone 为手机号。
- `list` \<string[]\> 白名单列表，请注意邮箱不区分大小写。

#### 示例

```php
$managementClient->whitelist()->add(
  WhitelistType::EMAIL, 
  ["test@test.com"]
);
```

## 移除白名单

WhitelistManagementClient->remove(string $type, array $list)

移除白名单

#### 参数

- `type` \<WhitelistType\> 白名单类型，USERNAME 为用户名、Email 为邮箱、Phone 为手机号。
- `list` \<string[]\> 白名单列表，请注意邮箱不区分大小写。

#### 示例

```php
$managementClient->whitelist()->remove(
  WhitelistType::EMAIL, 
  ["test@test.com"]
);
```

## 开启白名单

WhitelistManagementClient->enable(string $type)

开启白名单

#### 参数

- `type` \<WhitelistType\> 白名单类型，USERNAME 为用户名、Email 为邮箱、Phone 为手机号。

#### 示例

```php
$managementClient->whitelist()->enable(WhitelistType::EMAIL);
```

## 关闭白名单

WhitelistManagementClient->disable(string $type)

关闭白名单

#### 参数

- `type` \<WhitelistType\> 白名单类型，USERNAME 为用户名、Email 为邮箱、Phone 为手机号。

#### 示例

```php
$managementClient->whitelist()->disable(WhitelistType::EMAIL);
```
