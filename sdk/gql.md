# GraphQL 请求列表

----------

此列表包含了所有方法的 GraphQL 请求文档，可直接复制粘贴使用。

### getAccessTokenByAppSecret

此接口用来验证 ClientId 和 Secret 是否正确，如果正确则返回相应的 Token，此 Token 在接下来的某些接口中需要进行发送（以下称 ```OwnerToken```）。

```
query getAccessTokenByAppSecret($secret: String!, $clientId: String!){
    getAccessTokenByAppSecret(secret: $secret, clientId: $clientId)
}
```

### ReadOAuthList

此接口用来读取用户在 Authing 控制台中配置的 OAuth 信息。

``` 
query ReadOAuthList($clientId: String!) {
	ReadOauthList(clientId: $clientId) {
	    _id
	    name
	    image
	    description
	    enabled
	    client
	    user
	    url
	}
}
```
#### 注意事项

此接口不需要发送任何 ```Token```

### login

此接口用来执行用户登录的操作，登录成功后会返回 ```UserToken```，建议单独维护此 Token。

```
mutation login($unionid: String, $email: String, $password: String, $lastIP: String, $registerInClient: String!, $verifyCode: String) {
    login(unionid: $unionid, email: $email, password: $password, lastIP: $lastIP, registerInClient: $registerInClient, verifyCode: $verifyCode) {
	    _id
	    email
	    emailVerified
	    username
	    nickname
	    company
	    photo
	    browser
	    token
	    tokenExpiredAt
	    loginsCount
	    lastLogin
	    lastIP
	    signedUp
	    blocked
	    isDeleted
    }
}
```

#### 注意事项

1. 此处（登录）的密码需要加密，Authing 使用了非对称加密算法，加密方式是 ```PKCS1v1.5```。注意，个别语言，如 JavaScript（非 Node ）和 Go 在加密之后还要使用 ```base64``` 包一层，要注意喔；
2. 此接口不需要发送任何 ```Token```。

##### Public Key

``` shell
-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC4xKeUgQ+Aoz7TLfAfs9+paePb
5KIofVthEopwrXFkp8OCeocaTHt9ICjTT2QeJh6cZaDaArfZ873GPUn00eOIZ7Ae
+TiA2BKHbCvloW3w5Lnqm70iSsUi5Fmu9/2+68GZRH9L7Mlh8cFksCicW2Y2W2uM
GKl64GDcIq3au+aqJQIDAQAB
-----END PUBLIC KEY-----
```

### register

```
mutation register(
	$unionid: String,
    $email: String, 
    $password: String, 
    $lastIP: String, 
    $forceLogin: Boolean,
    $registerInClient: String!,
    $oauth: String,
    $username: String,
    $nickname: String,
    $registerMethod: String,
    $photo: String
) {
    register(userInfo: {
    	unionid: $unionid,
        email: $email,
        password: $password,
        lastIP: $lastIP,
        forceLogin: $forceLogin,
        registerInClient: $registerInClient,
        oauth: $oauth,
        registerMethod: $registerMethod,
        photo: $photo,
        username: $username,
        nickname: $nickname
    }) {
        _id,
        email,
        emailVerified,
        username,
        nickname,
        company,
        photo,
        browser,
        password,
        token,
        group {
            name
        },
        blocked
    }
}
```

#### 注意事项

1. 此处（登录）的密码需要加密，Authing 使用了非对称加密算法，加密方式是 ```PKCS1v1.5```。注意，个别语言，如 JavaScript（非 Node）和 Go 在加密之后还要使用 ```base64``` 包一层，要注意喔。
2. 此接口不需要发送任何 ```Token```。

##### Public Key

``` shell
-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC4xKeUgQ+Aoz7TLfAfs9+paePb
5KIofVthEopwrXFkp8OCeocaTHt9ICjTT2QeJh6cZaDaArfZ873GPUn00eOIZ7Ae
+TiA2BKHbCvloW3w5Lnqm70iSsUi5Fmu9/2+68GZRH9L7Mlh8cFksCicW2Y2W2uM
GKl64GDcIq3au+aqJQIDAQAB
-----END PUBLIC KEY-----
```

### user

此接口用来读取用户资料，建议使用 ```OwnerToken```

```
query user($id: String!, $registerInClient: String!){
	user(id: $id, registerInClient: $registerInClient) {
		_id
		email
		emailVerified
		username
		nickname
		company
		photo
		browser
		registerInClient
		registerMethod
		oauth
		token
		tokenExpiredAt
		loginsCount
		lastLogin
		lastIP
		signedUp
		blocked
		isDeleted
	}
}
```

#### 注意事项

此接口需要发送 Token，建议直接使用 ```OwnerToken```。

### list

此接口用来读取用户列表，建议使用 ```OwnerToken```

```
query users($registerInClient: String, $page: Int, $count: Int){
  users(registerInClient: $registerInClient, page: $page, count: $count) {
    totalCount
    list {
      _id
      email
      emailVerified
      username
      nickname
      company
      photo
      browser
      password
      registerInClient
      token
      tokenExpiredAt
      loginsCount
      lastLogin
      lastIP
      signedUp
      blocked
      isDeleted
      group {
        _id
        name
        descriptions
        createdAt
      }
      clientType {
        _id
        name
        description
        image
        example
      }
      userLocation {
        _id
        when
        where
      }
      userLoginHistory {
        totalCount
        list{
          _id
          when
          success
          ip
          result
        }
      }
      systemApplicationType {
        _id
        name
        descriptions
        price
      }
    }
  }
}
```

#### 注意事项

此接口需要发送 Token，建议直接使用 ```OwnerToken```。

### checkLoginStatus

此接口检查用户登录状态，请使用 ```UserToken```

```
query checkLoginStatus {
    checkLoginStatus {
        status
        code
        message
    }
}
```

#### 注意事项

此接口需要发送 Token，请使用 ```UserToken```。

### remove

此接口用来删除用户数据，建议使用 ```OwnerToken```

```
mutation removeUsers($ids: [String], $registerInClient: String, $operator: String){
  removeUsers(ids: $ids, registerInClient: $registerInClient, operator: $operator) {
    _id
  }
}
```

#### 注意事项

此接口需要发送 Token，建议直接使用 ```OwnerToken```。

### update

此接口用来更新用户资料，建议使用 ```OwnerToken```

```
mutation UpdateUser(
	_id: String!,
	email: String,
	emailVerified: Boolean,
	username: String,
	nickname: String,
	company: String,
	photo: String,
	browser: String,
	password: String,
	oldPassword: String,
	registerInClient: String!,
	token: String,
	tokenExpiredAt: String,
	loginsCount: Int,
	lastLogin: String,
	lastIP: String,
	signedUp: String,
	blocked: Boolean,
	isDeleted: Boolean
){
  updateUser(options: {
	_id: $_id,
	email: $email,
	emailVerified: $emailVerified,
	username: $username,
	nickname: $nickname,
	company: $company,
	photo: $photo,
	browser: $browser,
	password: $password,
	oldPassword: $oldPassword,
	registerInClient: $registerInClient,
	token: $token,
	tokenExpiredAt: $tokenExpiredAt,
	loginsCount: $loginsCount,
	lastLogin: $lastLogin,
	lastIP: $lastIP,
	signedUp: $signedUp,
	blocked: $blocked,
	isDeleted: $isDeleted
  }) {
	_id
	email
	emailVerified
	username
	nickname
	company
	photo
	browser
	registerInClient
	registerMethod
	oauth
	token
	tokenExpiredAt
	loginsCount
	lastLogin
	lastIP
	signedUp
	blocked
	isDeleted
  }
}
```

#### 注意事项

此接口需要发送 Token，建议直接使用 ```OwnerToken```。

### 修改密码流程

1. sendResetPasswordEmail 发送重置密码邮件给用户 
2. verifyResetPasswordVerifyCode 检查验证码是否正确
3. changePassword 使用新的密码和验证码来修改密码

#### 注意事项

以下三个修改密码的 Token 可以不发送任何```Token```。

### sendResetPasswordEmail

```
mutation sendResetPasswordEmail(
	$email: String!,
	$client: String!
){
	sendResetPasswordEmail(
		email: $email,
		client: $client
	) {
	  	message
	  	code
	}
}
```

### verifyResetPasswordVerifyCode

```
mutation verifyResetPasswordVerifyCode(
	$email: String!,
	$client: String!,
	$verifyCode: String!
) {
	verifyResetPasswordVerifyCode(
		email: $email,
		client: $client,
		verifyCode: $verifyCode
	) {
	  	message
	  	code
	}
}
```

### changePassword

此接口用来更改忘记密码后的新密码，需要携带 verifyCode，不用发送 ```Token```，正常的密码修正请使用上面的 ```update``` 接口。

```
mutation changePassword(
	$email: String!,
	$client: String!,
	$password: String!,
	$verifyCode: String!
){
	changePassword(
		email: $email,
		client: $client,
		password: $password,
		verifyCode: $verifyCode
	) {
		_id
		email
		emailVerified
		username
		nickname
		company
		photo
		browser
		registerInClient
		registerMethod
		oauth
		token
		tokenExpiredAt
		loginsCount
		lastLogin
		lastIP
		signedUp
		blocked
		isDeleted
	}
}
```

### sendVerifyEmail

```
mutation sendVerifyEmail(
	$email: String!,
	$client: String!
){
	sendVerifyEmail(
		email: $email,
		client: $client
	) {
		message,
		code,
		status
	}
}
```

#### 注意事项

此接口不用发送任何 ```Token```。
