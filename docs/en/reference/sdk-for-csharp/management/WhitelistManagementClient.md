---
meta:
  - name: description
    content: Whitelist Management 
---

# Whitelist Management

<LastUpdated/>


> Add a registration whitelist for your user pool, which is similar to the invitation registration rule. After you add it, only users in the whitelist can register. {{$localeConfig.brandName}} currently supports you to set phone number, email, and username in whitelist.

## Get whitelists

WhitelistManagementClient().list(type)

> Get the whitelist

#### Parameter

- `type` \<WhitelistType\> Whitelist type

#### Sample

```csharp
var list = await managementClient.Whitelist.List(WhitelistType.USERNAME);
```

## Add whitelists

WhitelistManagementClient().add(type, list)

> Add whitelists

#### Parameter

- `type` \<WhitelistType\> Whitelist type
- `list` \<string[]\> Whitelist list. (email is not case sensitive)

#### Sample

```csharp
var list = await managementClient.Whitelist.Add(WhitelistType.EMAIL, new string[] { "test@test.com" });
```

## Remove whitelists

WhitelistManagementClient().remove(type, list)

> Remove whitelists

#### Parameter 

- `type` \<WhitelistType\> Whitelist type
- `list` \<string[]\> Whitelist list. (email is not case sensitive)

#### Sample

```csharp
var list = await managementClient.Whitelist.Remove(WhitelistType.EMAIL, new string[] { "test@test.com" });
```

## Enable whitelists

WhitelistManagementClient().enable(type)

> Enable whitelists

#### Parameter

- `type` \<WhitelistType\> Whitelist type.

#### Sample

```csharp
await managementClient.Whitelist.Enable(WhitelistType.EMAIL);
```

## Disable whitelists

WhitelistManagementClient().disable(type)

> Disable whitelists

#### Parameter

- `type` \<WhitelistType\>  Whitelist type.

#### Sample

```csharp
await managementClient.Whitelist.Disable(WhitelistType.EMAIL);
```
