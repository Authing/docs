
# WhitelistManagementClient

<LastUpdated/>


> Add a registration whitelist for your user pool, which is similar to the invitation registration rule. After you enable it, only users in the whitelist can register. Approw currently supports you to register with phone number, email, and username in whitelist.


Please follow the instructions below to use this client：
```javascript
import { ManagementClient } from "approw-js-sdk"
const managementClient = new ManagementClient({
   userPoolId: "YOUR_USERPOOL_ID",
   secret: "YOUR_USERPOOL_SECRET",
})
managementClient.whitelist.list // get register whitelist record
managementClient.whitelist.add // add register whitelist record
managementClient.whitelist.remove // delete register whitelist record
```




##  Get whitelists

WhitelistManagementClient().list(type)

> Get the whitelist records


#### Parameter

- `type` \<WhitelistType\> Whitelist type. Use `USERNAME` to represent username, `Email` for email address, `Phone` for phone number.

#### Example

```javascript
import { WhitelistType } from "approw-js-sdk"
const list = await managementClient.whitelist.list(WhitelistType.Email);
```

#### Return value

-  `Promise<WhiteList[]>` 


      

## Add whitelists

WhitelistManagementClient().add(type, list)

> Add whitelists


#### Parameter

- `type` \<WhitelistType\> Whitelist type. Use `USERNAME` to represent username, `Email` for email address, `Phone` for phone number.
- `list` \<string[]\> Whitelist list. (email is not case sensitive)

#### Example

```javascript
await managementClient.whitelist.add(WhitelistType.Email, 'a@example.com');
```

#### Return value

-  `Promise<WhiteList[]>` 


      

## Remove whitelists

WhitelistManagementClient().remove(type, list)

> Remove whitelists


#### Parameter

- `type` \<WhitelistType\> Whitelist type. Use `USERNAME` to represent username, `Email` for email address, `Phone` for phone number.
- `list` \<string[]\> Whitelist list. (email is not case sensitive)

#### Example

```javascript
await managementClient.whitelist.remove(WhitelistType.Email, 'a@example.com');
```

#### Return value

-  `Promise<WhiteList[]>` 


      

## Enable whitelists

WhitelistManagementClient().enable(type)

> Enable whitelists.


#### Parameter

- `type` \<WhitelistType\> Whitelist type. Use `USERNAME` to represent username, `Email` for email address, `Phone` for phone number.

#### Example

```javascript
// add a whitelist

import { WhitelistType } from "approw-js-sdk"
await managementClient.whitelist.enable(WhitelistType.Email);
await managementClient.whitelist.add(WhitelistType.Email, [‘a@wxample.com’]);

// try to register an account not in whitelist

await approw.registerByEmail(email, 'b@example.com');
```

#### Return value




      

## Disable whitelists

WhitelistManagementClient().disable(type)

> Disable whitelists


#### Parameter

- `type` \<WhitelistType\> Whitelist type. Use `USERNAME` to represent username, `Email` for email address, `Phone` for phone number.

#### Example



#### Return value




      