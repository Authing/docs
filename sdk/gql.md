# GraphQL请求列表

----------

此列表包含了所有方法的GraphQL请求文档，可直接复制粘贴使用

### ReadOAuthList

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

### login

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

此处（登录）的密码需要加密，Authing使用了非对称加密算法，加密方式是```PKCS1v1.5```。注意，个别语言，如JavaScript（非Node）和Go在加密之后还要使用```base64```包一层，要注意喔。

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

此处（登录）的密码需要加密，Authing使用了非对称加密算法，加密方式是```PKCS1v1.5```。注意，个别语言，如JavaScript（非Node）和Go在加密之后还要使用```base64```包一层，要注意喔。

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

### remove

```
mutation removeUsers($ids: [String], $registerInClient: String, $operator: String){
  removeUsers(ids: $ids, registerInClient: $registerInClient, operator: $operator) {
    _id
  }
}
```

### update

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

### 修改密码流程

1. sendResetPasswordEmail 发送重置密码邮件给用户 
2. verifyResetPasswordVerifyCode 检查验证码是否正确
3. changePassword 使用新的密码和验证码来修改密码

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