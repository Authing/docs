# OAuth 授权流程

-------

### authorization_code 模式

#### 1. 请求授权

首先需要请求以下链接来获取 `authorization_code`

`https://sso.authing.cn/authorize?app_id=5c7253efe21948de32723725&state=123456lkjljkf3&response_type=code&redirect_uri=https%3A%2F%2Fauthing.cn&scope=user`

参数说明

参数       |  说明
-----------|----------------------------------
app_id     |  必须，创建 OAuth 应用后详情中的 `App ID`（[我想用 client_id 作为参数](https://docs.authing.cn/#/oauthProvider/authorize?id=%E4%BD%BF%E7%94%A8-client_id-%E4%BD%9C%E4%B8%BA%E5%8F%82%E6%95%B0)）
response_type  |  必须，授权的类型，在 `authorization_code 模式` 中值必须为 `"code"`
redirect_uri  |  必须，授权成功后的回掉地址，必须为 OAuth 应用配置好的 `URL` 中的一个
state      |  一段随机字符串，主要用于防止跨站请求伪造攻击，它将原封不动地在 `redirect_uri` 中返回
scope  |  允许的授权的范围，暂时没有实现此字段的相关功能，可不传

#### 2. 重定向并获取 `access_token`

`{redirect_uri}?code=8cce9189ee40f6f8874a9d4618a2996ece7dd737&state=123456lkjljkf3`

当授权成功后，用户将会被重定向到如上的链接，链接中带有参数 `code` 和 `state`。在 `redirect_uri` 的请求处理中，你应该检查 `state` 参数是否与你请求时一致，这样能确保请求不是来自第三方应用。然后，你应该使用 `POST` 请求`https://sso.authing.cn/token` 来获取 `access_token`，需要携带以下参数

参数       |  说明
-----------|----------------------------------
app_id     |  必须，创建 OAuth 应用后详情中的 `App ID`（[我想用 client_id 作为参数](https://docs.authing.cn/#/oauthProvider/authorize?id=%E4%BD%BF%E7%94%A8-client_id-%E4%BD%9C%E4%B8%BA%E5%8F%82%E6%95%B0)）
app_secret     |  必须，创建 OAuth 应用后详情中的 `App Secret`     
code     |  必须，我们返回的 `code`
redirect_uri  |  必须，授权成功后的回掉地址，必须为 OAuth 应用配置好的 `URL` 中的一个，需要经过 urlencoded 编码
grant_type      |  必须，授权类型，在 `authorization_code 模式`中必须为 `"authorization_code"`

同时 `Content-Type` 为 `application/x-www-form-urlencoded`。

例如：

```shell
curl --request POST \
  --url https://sso.authing.cn/token \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data 'app_id=<APP_ID>&app_secret=<APP_SECRET>&grant_type=authorization_code&code=<CODE>&redirect_uri=<REDIRECT_URI>'    
```

返回：

```javascript
{
  "access_token":"4331396b953d3de3bcf74c564455323d0989a9a0",
  "token_type":"Bearer",
  "expires_in":3599, // token 有效时间
  "refresh_token":"017888c6722e3433f3840a6708d9b79c23b310b8" // 可用此 token 来重新获取新的 token 而无需重新授权
}
```

#### 3. 使用 `access_token` 请求 `userInfo`

`GET https://users.authing.cn/oauth/user/userinfo?access_token=...`

或作为 `Authoriztion` 头：

`Authorization: Bearer { access_token }`

#### 4. 刷新 `access_token`

`access_token` 的有效时间只有 1 小时，`refresh_token` 的有效时间为 2 周，所以在申请 `access_token` 一小时以后，可通过 `POST` 请求`https://sso.authing.cn/token` 来重新获取 `access_token`，需要携带以下参数：

参数       |  说明
-----------|----------------------------------
app_id     |  必须，创建 OAuth 应用后详情中的 `App ID`（[我想用 client_id 作为参数](https://docs.authing.cn/#/oauthProvider/authorize?id=%E4%BD%BF%E7%94%A8-client_id-%E4%BD%9C%E4%B8%BA%E5%8F%82%E6%95%B0)）
app_secret     |  必须，创建 OAuth 应用后详情中的 `App Secret`     
refresh_token     |  必须，之前获取 `access_token` 时返回的 `refresh_token`
grant_type      |  必须，授权类型，在刷新 token 时必须为 `"refresh_token"`

返回的数据与第二步一样。

### implicit 模式

与 `authorization_code` 不同，`implicit 模式` 直接返回 `access_token`，少了验证 `authorization_code` 的步骤，且不能刷新 `access_token`。

#### 1. 获取 `access_token`

`https://sso.authing.cn/authorize?app_id=5c7253efe21948de32723725&state=123456lkjljkf3&response_type=token&redirect_uri=https%3A%2F%2Fauthing.cn&scope=user`

通过请求以上链接直接获取 `access_token`。

请求参数中与 `authorization_code 模式` 的基本一样，只有 `response_type` 必须为 `"token"`。

#### 2. 重定向并返回 `access_token`

`{redirect_uri}#access_token=9a617eb1dddc9fc7a480b0778173fd7f9db33938&state=123456lkjljkf3`

当授权成功后，用户将会重定向到如上的链接，在 `hash` 中携带 `access_token`。

#### 3. 使用 `access_token` 请求 userInfo

与 `authorization_code 模式` 的第三步一样。

`GET https://users.authing.cn/oauth/user/userinfo?access_token=...`

或作为 `Authoriztion` 头：

`Authorization: Bearer { access_token }`

### password 模式

此模式要求有用户名和密码，且必须使用 `POST` 请求

#### 1. 获取 `access_token`

`https://sso.authing.cn/authorize`

参数说明

参数       |  说明
-----------|----------------------------------
app_id     |  必须，创建 OAuth 应用后详情中的 `App ID`（[我想用 client_id 作为参数](https://docs.authing.cn/#/oauthProvider/authorize?id=%E4%BD%BF%E7%94%A8-client_id-%E4%BD%9C%E4%B8%BA%E5%8F%82%E6%95%B0)）
app_secret     |  必须，创建 OAuth 应用后详情中的 `App Secret`  
grant_type  |  必须，授权的类型，在 `password 模式` 中值必须为 `"password"`
username      |  必须，用户邮箱
password   |  必须，用户密码

返回
```javascript
{
  "access_token":"4331396b953d3de3bcf74c564455323d0989a9a0",
  "token_type":"Bearer",
  "expires_in":3599, // token 有效时间
  "refresh_token":"017888c6722e3433f3840a6708d9b79c23b310b8" // 可用此 token 来重新获取新的 token 而无需重新授权
}
```

#### 2. 使用 `access_token` 请求 userInfo

与 `authorization_code 模式` 的第三步一样。

`GET https://users.authing.cn/oauth/user/userinfo?access_token=...`

或作为 `Authoriztion` 头：

`Authorization: Bearer { access_token }`


> **IMPOTRANT** `implicit` 模式的 `access_token` 的有效时间只有 1 小时。我们建议使用 `authorization_code` 模式，这样更为安全。

### 使用 client_id 作为参数

我们支持将所有请求中的 `app_id` 参数换为 `client_id`，注意此处的 `client_id` 仍然为创建 OAuth 应用后的 `app_id`，而不是应用的 `client_id`，如下图所示：

#### 正确获取
![app_id](https://usercontents.authing.cn/docs/oauth/right_app_id.png)

若无 OAuth 应用，新建一个即可。

#### 错误获取
![app_id](https://usercontents.authing.cn/docs/oauth/not-here.png)
