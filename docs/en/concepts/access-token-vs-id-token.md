# Access Token VS ID Token

There are two types of Token related to identity accesss: Access Token and ID Token.

## Access Token

Access Token can be [JWT](https://tools.ietf.org/html/rfc7519) format or a random string. It is required when calling protected API. API check scope in Access Token before grant access to resource. For example: User login to an application via Google. Google will return Access Token to the application. When the user wants sync data with Google Calendar, Application need to present Access Token for Google Calendar API to request resource.


**Never** use Access Token as identifier. Access Token itself can not ensure the user is Authenticated.

The only user identity information stored in Access Token is userid in sub claim. During your application development, Access Token should be treated as a **Random String**, no information stored.

Access Token Example:

```json
{
  "jti": "YEeiX17iDgNwHGmAapjSQ",
  "sub": "601ad46d0a3d171f611164ce",
  "iat": 1612415013,
  "exp": 1613624613,
  "scope": "openid profile offline_access",
  "iss": "https://yelexin-test1.authing.cn/oidc",
  "aud": "601ad382d02a2ba94cf996c4"
}
```
Be Aware: Access Token do not contain any other user information except userid. The scope claim is using to access protected API. In that case, **Access Token are used for API access rather than user identification**.

In particular scenario, developer can use Access Token to retrieve user information by access **User Information Endpoint** from Authing.

## ID Token

ID token is [JWT](https://tools.ietf.org/html/rfc7519) format. It is used for identification process. For exapmle: Application allow Login via Google and sync user information with Google Calendar. Google will return ID Token to the application, which contains basic user information (Username, Icon, etc.). Application can decrypt ID Token and read user information.

::: hint-warning
Request will be rejected if ID Token is not valid. [How to verify](/guides/faqs/how-to-validate-user-token)。
:::

Use ID Token for API access is NOT recommended.
`aud` (audience) in ID Token is the application ID which requests authentication process.

ID Token Example:

```json
{
  "sub": "601ad46d0a3d171f611164ce",
  "birthdate": null,
  "family_name": null,
  "gender": "U",
  "given_name": null,
  "locale": null,
  "middle_name": null,
  "name": null,
  "nickname": null,
  "picture": "https://files.authing.co/authing-console/default-user-avatar.png",
  "preferred_username": null,
  "profile": null,
  "updated_at": "2021-02-04T05:02:25.932Z",
  "website": null,
  "zoneinfo": null,
  "at_hash": "xnpHKuO1peDcJzbB8xBe4w",
  "aud": "601ad382d02a2ba94cf996c4",
  "exp": 1613624613,
  "iat": 1612415013,
  "iss": "https://oidc1.authing.cn/oidc"
}
```
