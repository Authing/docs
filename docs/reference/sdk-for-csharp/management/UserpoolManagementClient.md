---
meta:
  - name: description
    content: 管理用户池配置
---

# 管理用户池配置

<LastUpdated/>

> {{$localeConfig.brandName}} 用户池配置管理模块。

## 查询用户池配置

```csharp
managementClient.UserPool.Detail();
```
> 查询用户池配置

#### 示例

```csharp
var userPool = await managementClient.UserPool.Detail();
```

## 更新用户池配置
```csharp
managementClient.UserPool.Update(UpdateUserpoolInput updates)
```
> 更新用户池配置

#### 参数

- `updates` \<UpdateUserpoolInput\>
- `updates.name` \<string\> 用户池名称
- `updates.logo` \<string\> 用户池 Logo
- `updates.domain` \<string\> 用户池企业应用面板二级域名
- `updates.description` \<string\> 描述信息
- `updates.emailVerifiedDefault` \<bool\> 设置邮箱默认为已验证状态（用户的 `emailVerified` 字段为 `true`）。
- `updates.sendWelcomeEmail` \<bool\> 用户注册之后是否发送欢迎邮件
- `updates.registerDisabled` \<bool\> 是否关闭注册，当用户池关闭注册之后，普通用户将无法注册账号，只有管理员能够手动创建账号。
- `updates.allowedOrigins` \<string\> 安全域配置，安全域（Allowed Origins） 是允许从 JavaScript 向 {{$localeConfig.brandName}} API 发出请求的 URL（通常与 CORS 一起使用）。 默认情况下，系统会允许你使用所有网址。 如果需要，此字段允许你输入其他来源。 你可以通过逐行分隔多个有效 URL，并在子域级别使用通配符（例如：`https://*.sample.com`）。
  验证这些 URL 时不考虑查询字符串和哈希信息，如果带上了查询字符串和哈希信息系统会自动忽略整个域名，如果有多条请以换行符分隔。
- `updates.whitelist` \<RegisterWhiteListConfigInput\> 用户池白名单配置
- `updates.whitelist.phoneEnabled` \<bool\> 是否开启手机号白名单
- `updates.whitelist.emailEnabled` \<bool\> 是否开启邮箱白名单
- `updates.whitelist.usernameEnabled` \<bool\> 是否开启用户名白名单
- `updates.tokenExpiresAfter` \<Integer\> token 过期时间
- `updates.loginFailCheck` \<LoginFailCheckConfigInput\> 频繁登录失败限制，开启之后，在规定时间内超过次数后再次登录需要验证码。如果你的业务存在同一区域同一时间段并发登录的场景，请将此检测关闭。
- `updates.loginFailCheck.enabled` \<bool\> 是否开启
- `updates.loginFailCheck.timeInterval` \<Integer\> 检测周期，单位为秒。
- `updates.loginFailCheck.limit` \<Integer\> 同一 IP 登录失败次数达到多少次的时候会触发限制条件。
- `updates.frequentRegisterCheck` \<FrequentRegisterCheckConfigInput\> 频率注册限制，开启之后同一 IP 频繁注册账号时会触发频率限制，需要等一段时间之后才能重新注册。如果你的业务存在同一区域同一时间段并发注册的场景，请将此检测关闭。
- `updates.frequentRegisterCheck.enabled` \<bool\> 是否开启
- `updates.frequentRegisterCheck.timeInterval` \<Integer\> 检测周期，单位为秒。
- `updates.frequentRegisterCheck.limit` \<Integer\> 同一个周期内同一 IP 注册次数达到此数目时会触发频率限制。

#### 示例

```csharp
var result = await managementClient.Userpool.Update(
  new UpdateUserpoolInput(){Description = "测试描述"}
  );
```

## 获取环境变量列表

```csharp
managementClient.UserPool.listEnv()
```
> 获取用户池环境变量列表。用户池配置的环境变量可以在 pipeline 场景下使用，详情请见：https://docs.authing.cn/v2/guides/pipeline/env.html

#### 示例

```csharp
 await managementClient.Userpool.AddEnv("123", "123");
 var result = await managementClient.Userpool.ListEnv();
```

## 添加环境变量

```csharp
managementClient.UserPool.AddEnv(string key, object value)
```
> 添加环境变量

#### 参数

- `key` \<string\> 环境变量键
- `value` \<Object\> 环境变量值

#### 示例

```csharp
 var result = await managementClient.Userpool.AddEnv("123","123");
```

## 删除环境变量

```csharp
managementClient.UserPool.RemoveEnv(string key)
```
> 删除环境变量

#### 参数

- `key` \<string\> 环境变量的 Key

#### 示例

```csharp
var result = await managementClient.UserPool.RemoveEnv("KEY");
```
