---
meta:
  - name: description
    content: WhitelistManagementClient
---

# WhitelistManagementClient

<LastUpdated/>


> Add a registration whitelist for your user pool, which is similar to the invitation registration rule. After you add it, only users in the whitelist can register. {{$localeConfig.brandName}} currently supports you to set phone number, email, and username in whitelist.

## Get whitelists

WhitelistManagementClient().list(type)

> Get whitelists

#### Parameter:

- `type` \<WhitelistType\> Whitelist type.

#### Example:

```java
List<WhiteList> whiteLists = managementClient.whitelist().list(WhitelistType.USERNAME).execute();
```

## Add whitelists

WhitelistManagementClient().add(addWhitelistParam)

> Add whitelists

#### Parameters:

- `addWhitelistParam` \<AddWhitelistParam\>
- `addWhitelistParam.type` \<WhitelistType\> Whitelist type
- `addWhitelistParam.list` \<List\<String\>\> Whitelist list. (email is not case sensitive)

#### Example:

```java
List<WhiteList> whiteLists = managementClient.whitelist().add(new AddWhitelistParam(WhitelistType.USERNAME, Arrays.asList("test1"))).execute();
```

## Remove whitelists

WhitelistManagementClient().remove(removeWhitelistParam)

> Remove whitelists

#### Parameters:

- `removeWhitelistParam` \<RemoveWhitelistParam\>
- `removeWhitelistParam.type` \<WhitelistType\> Whitelist type
- `removeWhitelistParam.list` \<List\<String\>\> Whitelist list. (email is not case sensitive)

#### Example:

```java
List<WhiteList> whiteLists = managementClient.whitelist().remove(new RemoveWhitelistParam(WhitelistType.USERNAME, Arrays.asList("test"))).execute();
```

## Enable whitelists

WhitelistManagementClient().enable(type)

> Enable whitelists

#### Parameter:

- `type` \<WhitelistType\> Whitelist type

#### Example:

```java
UserPool userPool = managementClient.whitelist().enable(WhitelistType.USERNAME).execute();
```

## Disable whitelists

WhitelistManagementClient().disable(type)

> Disable whitelists

#### Parameter:

- `type` \<WhitelistType\> Whitelist type

#### Example:

```java
UserPool userPool = managementClient.whitelist().disable(WhitelistType.USERNAME).execute();
```
