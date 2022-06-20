---
meta:
  - name: description
    content: SDK for Go
---


# SDK for Go

<LastUpdated/>


{{$localeConfig.brandName}} currently supports Golang 1.8+ version.

GitHub address：[https://github.com/authing/authing-go-sdk](https://github.com/authing/authing-go-sdk).

## Installation

```bash
go get github.com/authing/authing-go-sdk
```

## Quick Start

```go
package main

import (
    "encoding/json"
    "fmt"
    "log"
    "os"
    "regexp"

    authing "github.com/authing/authing-go-sdk"
    prettyjson "github.com/hokaccha/go-prettyjson"
    "github.com/kelvinji2009/graphql"
)

const (
    userPoolId  = "5adb75e03055230001023b26"
    userPoolSecret = "e683d18f9d597317d43d7a6522615b9d"
)

func main() {
    // ---User Endpoint
    client := authing.NewClient(userPoolId, userPoolSecret, false)
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
        RegisterInClient: graphql.String(userPoolId),
    }

    m, err := client.Register(&input)
    if err != nil {
        log.Println(">>>>Register failed: " + err.Error())
    } else {
        printJSON(m)
    }

    // ---OAuth Endpoint
    oauthClient := authing.NewOauthClient(userPoolId, userPoolSecret, false)
    // Enable debug info for graphql client, just comment it if you want to disable the debug info
    oauthClient.Client.Log = func(s string) {
        b := []byte(s)
        pj, _ := prettyjson.Format(b)
        fmt.Println(string(pj))
    }

    // >>>>Graphql Query: Read OAuth List
    readOauthListQueryParameter := authing.ReadOauthListQueryParameter{
        ClientID:   graphql.String(userPoolId),
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

[How to get UserPool ID and UserPool Secret ？](/guides/faqs/get-userpool-id-and-secret.md)

## API use case

### User Endpoint

First, create a user Endpoint Client. Then you can perform a series of operations on the user, including registering, logging in, updating user information, deleting users, changing passwords, and so on.

```go
client := authing.NewClient(userPoolId, userPoolSecret, false)
// Enable debug info for graphql client, just comment it if you want to disable the debug info
client.Client.Log = func(s string) { log.Println(s) }
```

### **Register a new user**

```go
input := authing.UserRegisterInput{
    Email:            graphql.String("kelvinji2009@gmail.com"),
    Password:         graphql.String("password"),
    RegisterInClient: graphql.String(userPoolId),
}

m, err := client.Register(&input)
if err != nil {
    log.Println(">>>>Register failed: " + err.Error())
} else {
    printJSON(m)
}
```

### **User login**

```go
loginInput := authing.UserLoginInput{
    Email:            graphql.String("kelvinji2009@gmail.com"),
    Password:         graphql.String("password!"),
    RegisterInClient: graphql.String(userPoolId),
}

m, err := client.Login(&loginInput)
if err != nil {
    log.Println(">>>>Login failed: " + err.Error())
} else {
    printJSON(m)
}

userID := string(m.Login.ID)
```

### **Check login status**

```go
q, err := client.CheckLoginStatus()
if err != nil {
    log.Println(">>>>Check login status failed: " + err.Error())
} else {
    printJSON(q)
}
```

### **Query user information**

```go
p := authing.UserQueryParameter{
    ID:               graphql.String("5ae3d830f0db4b000117a95e"),
    RegisterInClient: graphql.String(userPoolId),
}

q, err := client.User(&p)
if err != nil {
    log.Println(">>>>Query user failed: " + err.Error())
} else {
    printJSON(q)
}
```

### **Query all users**

```go
p := authing.UsersQueryParameter{
    RegisterInClient: graphql.String(userPoolId),
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

### **Delete user**

```go
removeUsersInput := authing.RemoveUsersInput{
    IDs:              []graphql.String{"111", "222"}, // NOTE: Please use your real user IDs
    RegisterInClient: graphql.String(userPoolId),
    // Operator should be your `authing.cn` account ID
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

### **Update user information**

```go
userUpdateInput := authing.UserUpdateInput{
    ID:               graphql.String("5ae3d830f0db4b000117a95e"), // Mandotory in struct
    Username:         graphql.String("kelvinji2009x"),
    Nickname:         graphql.String("Sicario13th"),
    Phone:            graphql.String("18665308994"),
    RegisterInClient: graphql.String(userPoolId),
}

m, err := client.UpdateUser(&userUpdateInput)
if err != nil {
    log.Println(">>>>Update user failed: " + err.Error())
} else {
    printJSON(m)
}
```

### **Send verification email**

```go
sendVerifyEmailInput := authing.SendVerifyEmailInput{
    Email:  graphql.String("kelvinji2009@gmail.com"),
    Client: graphql.String(userPoolId),
}

err := client.SendVerifyEmail(&sendVerifyEmailInput)
if err != nil {
    log.Println(">>>>Send verify email failed: " + err.Error())
}
```

### **Send password reset email**

```go
sendResetPasswordEmailInput := authing.SendResetPasswordEmailInput{
    Client: graphql.String(userPoolId),
    Email:  graphql.String("kelvinji2009@gmail.com"),
}

err := client.SendResetPasswordEmail(&sendResetPasswordEmailInput)
if err != nil {
    log.Println(">>>>Send reset password email failed: " + err.Error())
}
```

### **Verify the code for reseting password**

```go
verifyResetPasswordVerifyCodeInput := authing.VerifyResetPasswordVerifyCodeInput{
    Client:     graphql.String(userPoolId),
    Email:      graphql.String("kelvinji2009@gmail.com"),
    VerifyCode: graphql.String("7670"),
}

err := client.VerifyResetPasswordVerifyCode(&verifyResetPasswordVerifyCodeInput)
if err != nil {
    log.Println(">>>>Verify reset passwod verify code failed: " + err.Error())
}
```

### **Modify password**

```go
changePasswordInput := authing.ChangePasswordInput{
    Client:     graphql.String(userPoolId),
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

Create OAuth Endpoint Client first.

```go
oauthClient := authing.NewOauthClient(userPoolId, userPoolSecret, false)
// Enable debug info for graphql client, just comment it if you want to disable the debug info
oauthClient.Client.Log = func(s string) { log.Println(s) }
```

### **Read OAuth list**

```go
readOauthListQueryParameter := authing.ReadOauthListQueryParameter{
    ClientID:   graphql.String(userPoolId),
    DontGetURL: graphql.Boolean(false),
}

q, err := oauthClient.ReadOauthList(&readOauthListQueryParameter)
if err != nil {
    log.Println(">>>>Read OAuth List failed: " + err.Error())
} else {
    printJSON(q)
}
```
