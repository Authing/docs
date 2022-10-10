# UserpoolManagementClient

<LastUpdated/>

> Authing user pool configuration management client.

Please follow the instructions below to use this client:

```javascript
import { ManagementClient } from "authing-js-sdk";
const managementClient = new ManagementClient({
  userPoolId: "YOUR_USERPOOL_ID",
  secret: "YOUR_USERPOOL_SECRET"
});

managementClient.userpool.detail; // get user pool detail information
managementClient.userpool.update; // update user pool configuration
managementClient.userpool.env; // get user pool configuration environment
```

## Get user pool details

UserPoolManagementClient().detail()

> Get user pool details

#### Parameter

#### Example

```javascript
const userpool = await managementClient.userpool.detail();
```

#### Return value

- `Promise<UserPool>`

## Update the user pool

UserPoolManagementClient().update(updates)

> Update the user pool

#### Parameter

- `updates` \<UpdateUserpoolInput\>
- `updates.name` \<string\> User pool name
- `updates.logo` \<string\> User pool logo
- `updates.domain` \<string\> User pool enterprise application panel second-level domain name
- `updates.description` \<string\> Description
- `updates.emailVerifiedDefault` \<boolean\> Set the email to be verified as default (`emailVerified` field of the user is `true`)
- `updates.sendWelcomeEmail` \<boolean\> Whether to send welcome email after user registration
- `updates.registerDisabled` \<boolean\> Whether to disable the registration. When the user pool disables the registration, ordinary users will not be able to register an account, and only the administrator can create an account.
- `updates.allowedOrigins` \<string\> Allowed Origins is the URL that allows requests from JavaScript to the Authing API (usually used with CORS). By default, the system will allow you to use all URLs. This field also allows you to enter other sources. You can separate multiple valid URLs line by line and use wildcards at the subdomain level (for example: `https://*.sample.com`).
  The query string and hash information are not considered when verifying these URLs. If you bring the query string and hash information, the system will automatically ignore the entire domain name.
  If there are more than one, please separate them with line breaks.
- `updates.whitelist` \<Object\> User pool whitelist configuration
- `updates.whitelist.phoneEnabled` \<boolean\> Whether to enable the whitelist of mobile phone numbers
- `updates.whitelist.emailEnabled` \<boolean\> Whether to enable the mailbox whitelist
- `updates.whitelist.usernameEnabled` \<boolean\> Whether to enable the username whitelist
- `updates.tokenExpiresAfter` \<number\> Token expiration time
- `updates.loginFailCheck` \<Object\> Frequent login failure limit. If a user exceeds the number of times within the specified time, the system will require a verification code for login again. If you need to concurrent login in the same area at the same time period, please disable it.
- `updates.loginFailCheck.enabled` \<boolean\> Whether to enable
- `updates.loginFailCheck.timeInterval` \<number\> Check period, in seconds.
- `updates.loginFailCheck.limit` \<number\> The limit condition will be triggered when the number of login failures for the same IP is reached.
- `updates.frequentRegisterCheck` \<Object\> Frequency registration restriction. Frequency limit will be triggered when the same IP frequently registers an account, and it will take a while to register again. If you need to concurrent register in the same area and time period, please turn it off.
- `updates.frequentRegisterCheck.enabled` \<boolean\> Whether to enable
- `updates.frequentRegisterCheck.timeInterval` \<Object\> The detection period, in seconds.
- `updates.frequentRegisterCheck.limit` \<Object\> The frequency limit will be triggered when the number of registrations of the same IP in the same period reaches this number.

#### Example

```javascript
const userpool = await managementClient.userpool.update({
  registerDisabled: true // disable the register system
});
```

#### Return value

- `Promise<UserPool>`

## Get the environment variables list

UserPoolManagementClient().listEnv()

> Get the user pool environment variables list. The environment variables configured by the user pool can be used in the pipeline scenario. Please check: `https://docs.authing.cn/v2/guides/pipeline/env.html` for details.

#### Parameter

#### Example

```javascript
const envList = await managementClient.userpool.listEnv();
```

#### Return value

- `Promise<Env[]>`

## Add environment variables

UserPoolManagementClient().addEnv(key, value)

> Add environment variables

#### Parameter

- `key` \<string\> Environment variable key
- `value` \<any\> Environment variable value

#### Example

```javascript
const envList = await managementClient.userpool.addEnv(
  "LARK_WEBHOOK",
  "xxxxxxx"
); // the webhppk address of adding a lark bot, you can use it later in pipeline function. (See more details in: https://docs.authing.cn/v2/guides/pipeline/)
```

#### Return value

- `Promise<Env[]>` Return the latest list of environment variables

## Delete environment variables

UserPoolManagementClient().removeEnv(key)

> Delete environment variables

#### Parameter

- `key` \<string\> Environment variable key

#### Example

```javascript
const envList = await managementClient.userpool.removeEnv("LARK_WEBHOOK");
```

#### Return value

- `Promise<Env[]>` Return the latest list of environment variables
