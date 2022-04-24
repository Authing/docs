---
meta:
  - name: description
    content: SDK for Ruby
---



# SDK for Ruby

<LastUpdated/>


## GitHub 下载地址

| 条目     | 说明                                        |
| -------- | ------------------------------------------- |
| 支持版本 | 所有版本                                    |
| 仓库地址 | [https://github.com/Authing/authing-ruby](https://github.com/Authing/authing-ruby) |


## 安装
在 Gemfile 中写上
```sh
gem "authing_ruby"
```

或者直接安装
```sh
gem install authing_ruby
```

* Ruby Gems 地址: [https://rubygems.org/gems/authing_ruby](https://rubygems.org/gems/authing_ruby)


## 基本例子：用户名+密码注册
```ruby
require 'authing_ruby'

options = {
  appId: "appId 填写应用 id, 如 60800b9151d040af9016d60b, 应用->App ID",
  appHost: "appHost 例子: https://rails-demo.authing.cn, 应用->基础设置->认证地址",
}
authenticationClient = AuthingRuby::AuthenticationClient.new(options)
username = "user#{rand(0...9999)}" # 用户名
password = "12345678" # 密码
resp = authenticationClient.registerByUsername(username, password)
puts resp # 返回注册成功的用户信息
```

## 更多例子
1. 参照 Ruby SDK 的 GitHub 里的 [`example/`](https://github.com/1c7/authing_ruby/tree/main/example)