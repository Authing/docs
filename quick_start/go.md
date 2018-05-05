# authing-go-sdk

----------

Authing Go SDK目前支持go1.8+版本。

[官方文档请点击这里](https://docs.authing.cn)。

## 安装

----------

```shell
go get github.com/Authing/authing-go-sdk
```

## 开始使用

```go
package main

import (
	"encoding/json"
	"fmt"
	"log"
	"os"
	"regexp"

	authing "github.com/Authing/authing-go-sdk"
	prettyjson "github.com/hokaccha/go-prettyjson"
	"github.com/kelvinji2009/graphql"
)

const (
	clientID  = "5adb75e03055230001023b26"
	appSecret = "e683d18f9d597317d43d7a6522615b9d"
)

func main() {
    // ---User Endpoint
	client := authing.NewClient(clientID, appSecret, false)
	// Enable debug info for graphql client, just comment it if you want to disable the debug info
	client.Client.Log = func(s string) {
		b := []byte(s)
		pj, _ := prettyjson.Format(b)
		fmt.Println(string(pj))
	}

	// >>>Graphql Mutation: register
	input := authing.UserRegisterInput{
		Email:            graphql.String("kelvinji2009@gmail.com"),
		Password:         graphql.String("password"),
		RegisterInClient: graphql.String(clientID),
	}

	m, err := client.Register(&input)
	if err != nil {
		log.Println(">>>>Register failed: " + err.Error())
	} else {
		printJSON(m)
	}

    // ---OAuth Endpoint
	oauthClient := authing.NewOauthClient(clientID, appSecret, false)
	// Enable debug info for graphql client, just comment it if you want to disable the debug info
	oauthClient.Client.Log = func(s string) {
		b := []byte(s)
		pj, _ := prettyjson.Format(b)
		fmt.Println(string(pj))
	}

	// >>>>Graphql Query: Read OAuth List
	readOauthListQueryParameter := authing.ReadOauthListQueryParameter{
		ClientID:   graphql.String(clientID),
		DontGetURL: graphql.Boolean(false),
	}

	q, err := oauthClient.ReadOauthList(&readOauthListQueryParameter)
	if err != nil {
		log.Println(">>>>Read OAuth List failed: " + err.Error())
	} else {
		printJSON(q)
	}
}

// printJSON prints v as JSON encoded with indent to stdout. It panics on any error.
func printJSON(v interface{}) {
	w := json.NewEncoder(os.Stdout)
	w.SetIndent("", "\t")
	err := w.Encode(v)
	if err != nil {
		panic(err)
	}
}
```

[怎样获取client ID ?](https://docs.authing.cn/#/quick_start/howto)。

获取Client ID和Client Secret，请[点击这里](https://docs.authing.cn/#/quick_start/howto)。

[更多例子](https://github.com/Authing/authing-go-sdk/blob/master/examples/main.go)

## API使用实例

### User Endpoint
请先创建一个用户endpoint Client。然后你可以对用户进行一系列操作，包括注册，登录，更新用户资料，删除用户，修改密码等等。

```go
client := authing.NewClient(clientID, appSecret, false)
// Enable debug info for graphql client, just comment it if you want to disable the debug info
client.Client.Log = func(s string) { log.Println(s) }
```

#### 注册一个新用户

```go
input := authing.UserRegisterInput{
	Email:            graphql.String("kelvinji2009@gmail.com"),
	Password:         graphql.String("password"),
	RegisterInClient: graphql.String(clientID),
}

m, err := client.Register(&input)
if err != nil {
	log.Println(">>>>Register failed: " + err.Error())
} else {
	printJSON(m)
}
```

#### 用户登录

```go
loginInput := authing.UserLoginInput{
	Email:            graphql.String("kelvinji2009@gmail.com"),
	Password:         graphql.String("password!"),
	RegisterInClient: graphql.String(clientID),
}

m, err := client.Login(&loginInput)
if err != nil {
	log.Println(">>>>Login failed: " + err.Error())
} else {
	printJSON(m)
}

userID := string(m.Login.ID) 
```

#### 检查登录状态

```go
q, err := client.CheckLoginStatus()
if err != nil {
	log.Println(">>>>Check login status failed: " + err.Error())
} else {
	printJSON(q)
}
```

#### 查询用户信息

```go
p := authing.UserQueryParameter{
	ID:               graphql.String("5ae3d830f0db4b000117a95e"),
	RegisterInClient: graphql.String(clientID),
}

q, err := client.User(&p)
if err != nil {
	log.Println(">>>>Query user failed: " + err.Error())
} else {
	printJSON(q)
}
```

#### 查询所有用户

```go
p := authing.UsersQueryParameter{
	RegisterInClient: graphql.String(clientID),
	Page:             graphql.Int(1),
	Count:            graphql.Int(10),
}

q, err := client.Users(&p)
if err != nil {
	log.Println(">>>>Query users failed: " + err.Error())
} else {
	printJSON(q)
}
```

#### 删除用户

```go
removeUsersInput := authing.RemoveUsersInput{
	IDs:              []graphql.String{"111", "222"}, // NOTE: Please use your real user IDs
	RegisterInClient: graphql.String(clientID),
	// Operator should be your `Authing.cn` account ID
	// Operator:         graphql.String("5adb75be3055230001023b20"), // no more needed
}

// UserID Validation
for i, id := range removeUsersInput.IDs {
	re := regexp.MustCompile("^[0-9a-fA-F]{24}$")

	if !re.MatchString(string(id)) {
		log.Fatalf(">>>> user ID is invalid ,index: %d, id: %s", i, id)
	}
}

m, err := client.RemoveUsers(&removeUsersInput)
if err != nil {
	log.Println(">>>>Remove users failed: " + err.Error())
} else {
	printJSON(m)
}
```

#### 更新用户资料

```go
userUpdateInput := authing.UserUpdateInput{
	ID:               graphql.String("5ae3d830f0db4b000117a95e"), // Mandotory in struct
	Username:         graphql.String("kelvinji2009x"),
	Nickname:         graphql.String("Sicario13th"),
	Phone:            graphql.String("18665308994"),
	RegisterInClient: graphql.String(clientID),
}

m, err := client.UpdateUser(&userUpdateInput)
if err != nil {
	log.Println(">>>>Update user failed: " + err.Error())
} else {
	printJSON(m)
}
```

#### 发送邮箱验证邮件

```go
sendVerifyEmailInput := authing.SendVerifyEmailInput{
	Email:  graphql.String("kelvinji2009@gmail.com"),
	Client: graphql.String(clientID),
}

err := client.SendVerifyEmail(&sendVerifyEmailInput)
if err != nil {
	log.Println(">>>>Send verify email failed: " + err.Error())
}
```

#### 发送重置密码邮件

```go
sendResetPasswordEmailInput := authing.SendResetPasswordEmailInput{
	Client: graphql.String(clientID),
	Email:  graphql.String("kelvinji2009@gmail.com"),
}

err := client.SendResetPasswordEmail(&sendResetPasswordEmailInput)
if err != nil {
	log.Println(">>>>Send reset password email failed: " + err.Error())
}
```

#### 验证重置密码的验证码

```go
verifyResetPasswordVerifyCodeInput := authing.VerifyResetPasswordVerifyCodeInput{
	Client:     graphql.String(clientID),
	Email:      graphql.String("kelvinji2009@gmail.com"),
	VerifyCode: graphql.String("7670"),
}

err := client.VerifyResetPasswordVerifyCode(&verifyResetPasswordVerifyCodeInput)
if err != nil {
	log.Println(">>>>Verify reset passwod verify code failed: " + err.Error())
}
```

#### 修改密码

```go
changePasswordInput := authing.ChangePasswordInput{
	Client:     graphql.String(clientID),
	Email:      graphql.String("kelvinji2009@gmail.com"),
	VerifyCode: graphql.String("7670"),
	Password:   graphql.String("password!"),
}

err := client.ChangePassword(&changePasswordInput)
if err != nil {
	log.Println(">>>>Change password failed: " + err.Error())
}
```

### OAuth Endpoint

请先创建OAuth Endpoint Client.

```go
oauthClient := authing.NewOauthClient(clientID, appSecret, false)
// Enable debug info for graphql client, just comment it if you want to disable the debug info
oauthClient.Client.Log = func(s string) { log.Println(s) }
```

#### 读取OAuth列表

```go
readOauthListQueryParameter := authing.ReadOauthListQueryParameter{
	ClientID:   graphql.String(clientID),
	DontGetURL: graphql.Boolean(false),
}

q, err := oauthClient.ReadOauthList(&readOauthListQueryParameter)
if err != nil {
	log.Println(">>>>Read OAuth List failed: " + err.Error())
} else {
	printJSON(q)
}
```