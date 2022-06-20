# What is Authorization

<LastUpdated/>

## The meaning of Authorization

In the general field, Authorization is the process by which leaders achieve organizational goals, by providing employees and subordinates with autonomy.

In field of computer science, the authorization has the right to process, store, or transmit information to an entity by the designated approval agency of the information system.

In the field of identity authentication, authorization refers to a mechanism that allows the client to have limited access to server resources after being authenticated.

## Why do we need to "authorize"?

In the built user system, when your API needs to determine whether the current user can access the current resource, you need to build your own permission system. Authorization is a very important concept in the permission system. This refers to the process of judging, which the permissions of a user has a completely different authentication.

For enterprises, authorization can clarify the relationship between organization members, make responsibilities and boundaries clearer, and facilitate company management. At the same time, authorization can ensure data security, prevent and control risks, and different permissions allowing different operations to prevent Accidents such as user sabotage, data leakage, misoperation, etc. Authorization can improve the efficiency of decision-making. Excellent authorization and authority management make the system easier to operate and improve the work efficiency of employees.

From the product point of view, authorization can ensure the safety of product system use and data security, and prevent illegal operations and data leakage. Authorization can also improve the operability of the system and enhance user experience. In addition, a good authorization function will enhance the value of the product. Make it more competitive in the market.

## Authorization model

There are mainly two Authorization modes:
The first one, authorization code mode based on the OAuth 2.0 process.
Second, centralized verification of user authorization through the API interface to the authorization center.

### Authorization mode based on OAuth 2.0 framework

The OAuth2 framework is a secure, lightweight, and standard authorization system, it is used to help resource parties, callers, and resource owners complete the authorization process. If the resource owner is not involved in the authorization process, the client_credentials mode can be used. This mode is generally used in the M2M mode of the back-end server. You can get the application ID and key on the application details page, and you will need to store them securely on your server.

You can use OAuth2.0's client_credentials to simulate issuing an access_token with specific scope permissions:

```shell
curl --request POST \
  --url https://${YOUR_authing_DOMAIN}/oidc/token \
  --header 'accept: application/json' \
  --header 'cache-control: no-cache' \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data 'grant_type=client_credentials&scope=customScope&client_id=CLIENT_ID&client_secret=CLIENT_SECRET'
```

- {{$localeConfig.brandName}} will dynamically determine which permissions to issue the AccessTokens, based on the resource and context requested by the caller. It can return the denied scope.

```json
{
  "access_token": "...",
  "token_type": "Bearer",
  "expires_in": 3599,
  "scope": "user",
  "scope_rejected": "xxx yyy"
}
```

Where scope is the list of permissions possessed by the access_token, separated by spaces. You can use scope to determine which permissions the user has on the backend.

When the authorization process involves the resource owners, the owner needs to participate in the resource of the authorization process. The authorization code mode in the OAuth2.0 framework can be used. You need to put the permission item in the scope parameter of the link that initiates the authorization, for example:

```sh
https://${YOUR_authing_DOMAIN}/oidc/auth?client_id={ID}&scope=openid book:read book:delete&redirect_uri={url}&state={spring}&response_type=code
```

The resource owner needs to click the link, and then go to the login page. The resource owner authenticates their identity and authorizes the resource to the caller. After completing the authentication and authorization, the browser will jump to the service callback address and pass the code authorization code through the URL. The caller can use this code authorization code to {{$localeConfig.brandName}} in exchange for a permissioned AccessToken, which is used to obtain the resources of the resource party.

The code to exchange for Token is as follows:

```sh
curl --request POST \
  --url https://${YOUR_authing_DOMAIN}/oidc/token \
  --header 'Content-Type: application/x-www-form-urlencoded' \
  --data client_id={ID} \
  --data client_secret= {encryption key} \
  --data grant_type=authorization_code \
  --data redirect_uri={url} \
  --data code={Authorization code}
```

Similarly, {{$localeConfig.brandName}} will dynamically determine which permissions to issue AccessTokens based on the resource and context requested by the caller. And return the denied scope:

```json
{
  "access_token": "...",
  "token_type": "Bearer",
  "expires_in": 3599,
  "scope": "openid book:read",
  "scope_rejected": "book:delete"
}
```

The resource party must verify whether the caller carries an AccessToken with permission before returning the resource. When all the checks are passed, the resource can be returned safely.

## Permissions API

In addition to using OIDC's client_credentials mode, you can also use the universal permissions API to create roles. Authorize can create roles to roles and determine whether users have certain permissions, etc, through the permissions API. We support [SDK](/guides/access-control/) in languages such as Node.js, Python, Java, PHP, C#, etc.
