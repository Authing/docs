---
meta:
  - name: description
    content: Manage userpool configuration
---

# Manage userpool configuration

<LastUpdated/>

> {{$localeConfig.brandName}} Userpool configuration management module.

## Query userpool configuration

UserPoolManagementClient().detail()

> Query userpool configuration

#### parameter

#### Example

```python

```

## Update userpool configuration

UserPoolManagementClient().update(updates)

> Update userpool configuration

#### parameter

- `updates` \<UpdateUserpoolInput\>
- `updates.name` \<string\> Userpool name
- `updates.logo` \<string\> Userpool logo
- `updates.domain` \<string\> Userpool enterprise application panel secondary domain name
- `updates.description` \<string\> Description
- `updates.emailVerifiedDefault` \<boolean\> Setting the mailbox default is the verified state (the user's `emailVerified` field is `true`
- `updates.sendWelcomeEmail` \<boolean\> Whether the user is registered to send a welcome email
- `updates.registerDisabled` \<boolean\> Whether to close registration, after the user pools closes the registration, ordinary users will not be able to register an account, only the administrator can manually create an account.
- `updates.allowedOrigins` \<string\> Security domain configuration, Allowed Origins, it is allowed to send a request from JavaScript to {{$localeConfig.brandName}} API (usually used with CORS). By default, you will allow you to use all URLs. This field allows you to enter other sources if needed. You can separate multiple valid URLs by line and use wildcards (for example:`https://*.sample.com`）.
  Verifying these URLs Do not consider query strings and haveh messages, if you bring a query string and haveh information system automatically ignore the entire domain name.
  If there are multiple, please separate it.
- `updates.whitelist` \<Object\> Userpool white list configuration
- `updates.whitelist.phoneEnabled` \<boolean\> Whether to open the phone number whitelist
- `updates.whitelist.emailEnabled` \<boolean\> Whether to open a mailbox white list
- `updates.whitelist.usernameEnabled` \<boolean\> Whether to open a list of users
- `updates.tokenExpiresAfter` \<number\> token Expiration
- `updates.loginFailCheck` \<Object\> Frequent login failed restrictions, after opening, log in again after the number of times, log in again. If your business has the same time segment in the same area, close this detection.
- `updates.loginFailCheck.enabled` \<boolean\> Whether to open
- `updates.loginFailCheck.timeInterval` \<number\>The detection cycle is in seconds.
- `updates.loginFailCheck.limit` \<number\> The limit condition will be triggered when the same IP login failed has reached how many times.
- `updates.frequentRegisterCheck` \<Object\> Frequency registration restrictions, the frequency limit is triggered when the same IP is frequently registered, and you need to wait for a while to re-register. If your business has a scenario registered in the same time in the same area, please check this.
- `updates.frequentRegisterCheck.enabled` \<boolean\> Whether to open
- `updates.frequentRegisterCheck.timeInterval` \<Object\> The detection cycle is in seconds.
- `updates.frequentRegisterCheck.limit` \<Object\> Frequency limit is triggered when the number of the same IP registration is reached in the same cycle.

#### Example

```python

```

## Get list of environment variables

UserPoolManagementClient().list_env()

> Get the list of user pool environment variables. The environment variables configured by the user pool can be used in the pipeline scenario. For details, please see:https://docs.authing.co/extensibility/pipeline/env.html

#### parameter

#### Example

```python

```

## Add environment variables

UserPoolManagementClient().add_env(key, value)

> Add environment variables

#### parameter

- `key` \<string\> Environment variable
- `value` \<any\> Environment variable value

#### Example

```python

```

## Delete environment variables

UserPoolManagementClient().remove_env(key)

> Delete environment variables

#### parameter

- `key` \<string\> Environment variable

#### Example

```python

```
