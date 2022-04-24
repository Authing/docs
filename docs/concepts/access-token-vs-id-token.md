# Access Token vs Id Token

与身份相关的 Token 有两种：Access Token 和 Id Token。

## Access Token

Access Token 的格式可以是 [JWT](https://tools.ietf.org/html/rfc7519) 也可以是一个随机字符串。应当携带 Access Token 访问受保护的 API 接口，API 接口应该检验 Access Token 中的 scope 权限项目决定是否返回资源。例如，有一个应用使用了谷歌登录，然后同步用户的日历信息，谷歌会返回 Access Token 给应用。当应用希望读写用户的日历数据时，应用需要携带返回的 Access Token 访问谷歌的 日历 API。

**绝对不要**使用 Access Token 做认证。Access Token 本身**不能标识用户是否已经认证**。

Access Token 中只包含了用户 id，在 `sub` 字段。在你开发的应用中，应该将 Access Token **视为一个随机字符串**，不要试图从中解析信息。

Access Token 内容示例：

```json
{
  "jti": "YEeiX17iDgNwHGmAapjSQ",
  "sub": "601ad46d0a3d171f611164ce", // subject 的缩写，为用户 ID
  "iat": 1612415013,
  "exp": 1613624613,
  "scope": "openid profile offline_access",
  "iss": "https://yelexin-test1.authing.cn/oidc",
  "aud": "601ad382d02a2ba94cf996c4" // audience 的缩写，为应用 ID
}
```

注意 Access Token 不包含除 id 之外的任何用户信息。包含 scope 权限项目，用于调用受保护的 API 接口。所以 Access Token 用于**调用接口**，**而不是用作用户认证**。

在很多场景下，你希望通过 Access Token 获取更多的用户信息，可以携带 Access Token 调用 Authing 的**用户信息端点**来获取完整的用户信息。

## Id Token

Id Token 的格式为 [JWT](https://tools.ietf.org/html/rfc7519)。Id Token 仅适用于认证场景。例如，有一个应用使用了谷歌登录，然后同步用户的日历信息，谷歌会返回 Id Token 给这个应用，Id Token 中包含用户的基本信息（用户名、头像等）。应用可以解析 Id Token 然后利用其中的信息，展示用户名和头像。

::: hint-warning
在使用 Id Token 之前应该先[验证合法性](/guides/faqs/how-to-validate-user-token.md)。
:::

不推荐使用 Id Token 来进行 API 的访问鉴权。

每个 Id Token 的受众（aud 参数）是发起认证授权请求的应用的 ID（或编程访问账号的 AK）。

Id Token 中的内容示例：

```json
{
  "sub": "601ad46d0a3d171f611164ce", // subject 的缩写，为用户 ID
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
  "aud": "601ad382d02a2ba94cf996c4", // audience 的缩写，为应用 ID
  "exp": 1613624613,
  "iat": 1612415013,
  "iss": "https://oidc1.authing.cn/oidc"
}
```
