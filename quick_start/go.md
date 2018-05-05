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