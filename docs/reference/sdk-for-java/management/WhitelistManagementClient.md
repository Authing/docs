---
meta:
  - name: description
    content: 管理注册白名单
---

# 管理注册白名单

<LastUpdated/>


> 为你的用户池配置一个注册白名单，类似于邀请注册规则，开启后，只有白名单里的用户才能进行注册。 {{$localeConfig.brandName}} 目前支持的白名单方式有手机号、邮箱、用户名。

## 获取白名单记录

WhitelistManagementClient().list(type)

> 获取白名单记录

#### 参数

- `type` \<WhitelistType\> 白名单类型，USERNAME 为用户名、EMAIL 为邮箱、PHONE 为手机号。

#### 示例

```java
List<WhiteList> whiteLists = managementClient.whitelist().list(WhitelistType.USERNAME).execute();
```

## 添加白名单

WhitelistManagementClient().add(addWhitelistParam)

> 添加白名单

#### 参数

- `addWhitelistParam` \<AddWhitelistParam\>
- `addWhitelistParam.type` \<WhitelistType\> 白名单类型，USERNAME 为用户名、EMAIL 为邮箱、PHONE 为手机号。
- `addWhitelistParam.list` \<List\<String\>\> 白名单列表，请注意邮箱不区分大小写。

#### 示例

```java
List<WhiteList> whiteLists = managementClient
        .whitelist()
        .add(new AddWhitelistParam(WhitelistType.USERNAME, Arrays.asList("test1")))
        .execute();
```

## 移除白名单

WhitelistManagementClient().remove(removeWhitelistParam)

> 移除白名单

#### 参数

- `removeWhitelistParam` \<RemoveWhitelistParam\>
- `removeWhitelistParam.type` \<WhitelistType\> 白名单类型，USERNAME 为用户名、EMAIL 为邮箱、PHONE 为手机号。
- `removeWhitelistParam.list` \<List\<String\>\> 白名单列表，请注意邮箱不区分大小写。

#### 示例

```java
List<WhiteList> whiteLists = managementClient
        .whitelist()
        .remove(new RemoveWhitelistParam(WhitelistType.USERNAME, Arrays.asList("test")))
        .execute();
```

## 开启白名单

WhitelistManagementClient().enable(type)

> 开启白名单

#### 参数

- `type` \<WhitelistType\> 白名单类型，USERNAME 为用户名、EMAIL 为邮箱、PHONE 为手机号。

#### 示例

```java
UserPool userPool = managementClient.whitelist().enable(WhitelistType.USERNAME).execute();
```

## 关闭白名单

WhitelistManagementClient().disable(type)

> 关闭白名单

#### 参数

- `type` \<WhitelistType\> 白名单类型，USERNAME 为用户名、EMAIL 为邮箱、PHONE 为手机号。

#### 示例

```java
UserPool userPool = managementClient.whitelist().disable(WhitelistType.USERNAME).execute();
```
