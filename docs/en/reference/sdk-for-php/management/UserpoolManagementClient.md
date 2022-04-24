---
meta:
  - name: description
    content: Manage userpool configuration
---

# Manage userpool configuration

<LastUpdated/>

> {{$localeConfig.brandName}} userpool configuration management module.

## Query user pool configuration

UserPoolManagementClient().detail()

> Query user pool configuration

#### parameter

#### Example

```php
$userpool = $management->userpool()->detail();
```

## Update user pool configuration

UserPoolManagementClient().update(updates)

> Update user pool configuration

#### parameter

- `updates` \<UpdateUserpoolInput\>
- `updates.name` \<string\> Userpool name
- `updates.logo` \<string\> Userpool logo
- `updates.domain` \<string\> Userpool enterprise application panel secondary domain name
- `updates.description` \<string\> Description
- `updates.emailVerifiedDefault` \<boolean\> Description Setting the mailbox default is the verified state（the user's `emailverified` field is`true`）
- `updates.sendWelcomeEmail` \<boolean\> Whether the user is registered to send a welcome email
- `updates.registerDisabled` \<boolean\> Whether to close registration, after the user pools closes the registration, ordinary users will not be able to register an account, only the administrator can manually create an account.
- `updates.allowedOrigins` \<string\> A security domain configuration, the security domain (allowed Origins) allows URLs that allow request from JavaScript to {{$localeConfig.brandName}} API (usually used with Cors). By default, you will allow you to use all URLs. This field allows you to enter other sources if needed. You can separate multiple valid URLs by line and use wildcards（for example: `https://*.sample.com`）。
  Verifying these URLs Do not consider query strings and haveh messages, if you bring a query string and haveh information system automatically ignore the entire domain name.
  If there are multiple, please separate it.
- `updates.whitelist` \<Object\> User pool white list configuration
- `updates.whitelist.phoneEnabled` \<boolean\> Whether to open the phone number whitelist
- `updates.whitelist.emailEnabled` \<boolean\> Whether to open a list of users?
- `updates.whitelist.usernameEnabled` \<boolean\> Whether to open a list of users?
- `updates.tokenExpiresAfter` \<number\> token expiration
- `updates.loginFailCheck` \<Object\> Frequent login failed restrictions, after opening, log in again after the number of times, log in again. If your business has the same time segment in the same area, close this detection.
- `updates.loginFailCheck.enabled` \<boolean\> Whether to open
- `updates.loginFailCheck.timeInterval` \<number\> The detection cycle is in seconds.
- `updates.loginFailCheck.limit` \<number\> The same IP number of login failures reach the number of times when it will trigger the restrictions .
- `updates.frequentRegisterCheck` \<Object\> Frequency registration restrictions, the frequency limit is triggered when the same IP is frequently registered, and you need to wait for a while to re-register. If your business has a scenario registered in the same time in the same area, please check this.
- `updates.frequentRegisterCheck.enabled` \<boolean\> Whether to open
- `updates.frequentRegisterCheck.timeInterval` \<Object\> The detection cycle is in seconds.
- `updates.frequentRegisterCheck.limit` \<Object\> Frequency limit is triggered when the number of the same IP registration is reached in the same cycle.

#### Example

```php
$userpool = $management->userpool()->update((new UpdateUserpoolInput())->withDescription("official"));
```

## Get list of environment variables

UserPoolManagementClient().listEnv()

> Get the list of user pool environment variables. The environment variables configured by the user pool can be used in the pipeline scenario. For details, please see:https://docs.authing.co/extensibility/pipeline/env.html

#### parameter

#### Example

```php
$envs = $management->userpool()->listEnv();
```

## Add environment variables

UserPoolManagementClient().addEnv(key, value)

> Add environment variables

#### parameter

- `key` \<string\> Environment variable
- `value` \<any\> Environment variable value

#### Example

```php
$userpool = $management->userpool()->addEnv("key", "value");
```

## Delete environment variables

UserPoolManagementClient().removeEnv(key)

> Delete environment variables

#### parameter

- `key` \<string\> Environment variable

#### Example

```php
$management->userpool()->removeEnv("key");
```
