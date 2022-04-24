---
meta:
  - name: description
    content: SDK for Ruby
---



# SDK for Ruby

<LastUpdated/>


## Install

```sh
gem install authing
```
## How to use

### Initialization

> Initialize by token

```ruby
authing = Authing::Client.new({
  userPoolId: "<Your userPoolId>",
  token: "<Your Token>"
})
```
> Initialize by UserPoolId + Secret

```ruby
authing = Authing::Client.new({
  userPoolId: "<Your userPoolId>",
  secret: "<Your Token>"
})
```

> Initialize by user login information

```ruby
authing = Authing::Client.new({userPoolId: "<Your userPoolId>"})
res = authing.register({
  userInfo: {
    email: "c11j@authing.cn",
    password: "username",
    username: "233",
  },
})
```

### Functions

**All method names and parameters must be consistent with Graphql.**

⚠️ The current version only supports the {{$localeConfig.brandName}} Graphql interface, and Restful needs additional support. 
  
More interfaces: [{{$localeConfig.brandName}} Graphql](https://core.authing.cn/graphql/v2)  

#### Part of `Demo`

> Login
```ruby
authing.login({
  email: "authing@tmp.cn",
  password: "authing",
  username: "authing",
})
```
> Register
```ruby
res = authing.register({
  userInfo: {
    email: "authing@tmp.cn",
    password: "authing",
    username: "authing",
  }
})
```

> Create user roles:
```ruby
res = authing.createRBACRole({
  input: {
    userPoolId: "5f0c2597061ec4de51237379",
    name: "tmp",
    description: "tmp",
  },
  description: "tmp",
  name: "tmp",
  userPoolId: "5f0c2597061ec4de51237379",
})
```

