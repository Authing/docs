---
meta:
  - name: description
    content: Usages
---

# Usages

<LastUpdated/>


::: hint-success
Pipeline allows developers to execute custom code during the authentication process, realize Webhook notification, expand user fields, access control and other capabilities. If you have a good idea and scenarios of use, you are welcome to [add a template](https://github.com/authing/pipeline/blob/master/CONTRIBUTING.md). 
:::

## Extended user field

* [Add user-defined fields](https://github.com/Authing/pipeline/blob/master/src/templates/persist-metadata.js)
* [Modify the default avatar](https://github.com/Authing/pipeline/blob/master/src/templates/change-default-avatar.js)
* [Write the latest location to its MetaData each time when the user logs in](https://github.com/Authing/pipeline/blob/master/src/templates/add-location-to-metadata.js)
* [Use ui-avatars API to dynamically generate avatars](https://github.com/Authing/pipeline/blob/master/src/templates/change-avatar-to-ui-avatars.js)
* [Supplement user geographic location information field](https://github.com/Authing/pipeline/blob/master/src.src/templates/fill-user-address-field.js)
* [User-defined Token](https://github.com/Authing/pipeline/blob/master/src/templates/add-token-field.js)
* [Get user repo list through GitHub API](https://github.com/Authing/pipeline/blob/master/src/templates/get-repos-from-github-api.js)

## Access control

* [Registered Email Suffix White List](https://github.com/Authing/pipeline/blob/master/src/templates/email-domain-whitelist.js)
* [Load the whitelist dynamically via API](https://github.com/Authing/pipeline/blob/master/src/templates/load-whitelist-on-cloud.js)
* [Login after mandatory email verification](https://github.com/Authing/pipeline/blob/master/src/templates/force-email-verified.js)
* [Log in after mandatory mobile phone number verification](https://github.com/Authing/pipeline/blob/master/src/templates/force-phone-verifyed.js)
* [Register IP segment whitelist](https://github.com/Authing/pipeline/blob/master/src/templates/ip-range-whitelist.js)
* [Block users based on IP risk score](https://github.com/Authing/pipeline/blob/master/src/templates/ip-risk-analysis.js)
* [Registered mobile phone number whitelist](https://github.com/Authing/pipeline/blob/master/src/templates/phone-whitelist.js)
* [Prohibit specific registration/login](https://github.com/Authing/pipeline/blob/master/src/templates/block-specific-connection.js)
* [Registration/login is prohibited from 3-6 am for system maintenance every Sunday morning](https://github.com/Authing/pipeline/blob/master/src/templates/block-on-weekend.js)
* [Add user to user group](https://github.com/Authing/pipeline/blob/master/src/templates/add-user-to-group.js)

## OIDC certification process

* [Add user-defined idToken](https://github.com/Authing/pipeline/blob/master/src/templates/add-custom-idtoken.js)

