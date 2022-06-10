---
meta:
  - name: description
    content: UserPoolManagementClient
---

# UserPoolManagementClient

<LastUpdated/>

> {{$localeConfig.brandName}} Userpool configuration management client.

## Get user pool details

UserPoolManagementClient().detail()

> Get user pool details

#### Example:

```java
UserPool userPool = managementClient.userpool().detail();
```

## Update the user pool

UserPoolManagementClient().update(updates)

> Update the user pool.

#### Parameters:

- `updates` \<UpdateUserpoolInput>
- `updates.name` \<String> User pool name
- `updates.logo` \<String> User pool logo
- `updates.domain` \<String> User pool enterprise application panel second-level domain name
- `updates.description` \<String> Description
- `updates.emailVerifiedDefault` \<Boolean> Set the email to be verified as default (emailVerified field is true)
- `updates.sendWelcomeEmail` \<Boolean> Whether to send welcome email after user registration
- `updates.registerDisabled` \<Boolean> Whether to close the registration. When the user pool closes the registration, ordinary users will not be able to register an account, and only the administrator can create an account.
- `updates.allowedOrigins` \<String> Allowed Origins configuration. Allowed Origins is the URL that allows requests from JavaScript to the Authing API (usually used with CORS). By default, the system will allow you to use all URLs. This field also allows you to enter other sources. You can separate multiple valid URLs line by line and use wildcards at the subdomain level (for example: https://*.sample.com). The query string and hash information are not considered when verifying these URLs. If you bring the query string and hash information, the system will automatically ignore the entire domain name. If there are more than one, please separate them with line breaks.
- `updates.whitelist` \<Object> User pool whitelist configuration
- `updates.whitelist.phoneEnabled` \<Boolean> Whether to enable the whitelist of mobile phone numbers
- `updates.whitelist.emailEnabled` \<Boolean> Whether to enable the mailbox whitelist
- `updates.whitelist.usernameEnabled` \<Boolean> Whether to enable the user name whitelist
- `updates.tokenExpiresAfter` \<Integer> Token expiration time
- `updates.loginFailCheck` \<Object> Frequent login failure limit. If a user exceeds the number of times within the specified time, the system will require a verification code for login again. If you need to concurrent login in the same area at the same time period, please turn off loginFailCheck.
- `updates.loginFailCheck.enabled` \<Boolean> Whether to enable
- `updates.loginFailCheck.timeInterval` \<Integer> Check period, in seconds.
- `updates.loginFailCheck.limit` \<Integer> The limit condition will be triggered when the number of login failures for the same IP is reached.
- `updates.frequentRegisterCheck` \<Object> Frequency registration restriction. Frequency limit will be triggered when the same IP frequently registers an account, and it will take a while to register again. If you need to concurrent register in the same area and time period, please turn off frequentRegisterCheck.
- `updates.frequentRegisterCheck.enabled` \<Boolean> Whether to enable
- `updates.frequentRegisterCheck.timeInterval` \<Object> The detection period, in seconds.
- `updates.frequentRegisterCheck.limit` \<Object> The frequency limit will be triggered when the number of registrations of the same IP in the same period reaches this number.

#### Example:

```java
UserPool userPool = managementClient.userpool().update(new UpdateUserpoolInput().withDescription("desc")).execute();
```

## Get the environment variables list

UserPoolManagementClient().listEnv()

> Get the user pool environment variables list. The environment variables configured by the user pool can be used in the pipeline scenario. Please check: https://docs.authing.co/extensibility/pipeline/env.html for details.

#### Example:

```java
List<Env> list = managementClient.userpool().listEnv().execute();
```

## Add environment variables

UserPoolManagementClient().addEnv(key, value)

> Add environment variables.

#### Parameters:

- `key` \<string\> Environment variable key
- `value` \<Object\> Environment variable value

#### Example:

```java
Env env = managementClient.userpool().addEnv("key", "value").execute();
```

## Delete environment variables

UserPoolManagementClient().removeEnv(key)

> Delete environment variables.

#### Parameter:

- `key` \<String\> Environment variable key

#### Example:

```java
CommonMessage message = managementClient.userpool().removeEnv("key").execute();
```
