---
meta:
  - name: description
    content: Java SDK
---

<LastUpdated/>

# {{$localeConfig.brandName}} - Java SDK CSA 模块

CAS 是 Central Authentication Service 的缩写，中央认证服务，一种独立开放指令协议。

## 初始化

初始化 AuthenticationClient 时的参数：

- `appId` \<String\> 应用 ID，必填。
- `appHost` \<String\> 应用完整地址，如 https://sample-app.authing.cn，不带最后的斜线 '/'。
- `protocol` \<ProtocolEnum\> 协议类型，可选值为 `OIDC`、`OAUTH`、`SAML`、`CAS`，默认为 `OIDC`。

### 示例

```java
// 使用 AppId 和 appHost 进行初始化
AuthenticationClient authentication = new AuthenticationClient(APP_ID, APP_HOST);

// 业务回调地址
authentication.setRedirectUri(REDIRECT_URI);
```

## 生成 CAS 协议的用户登录链接

authenticationClient.buildAuthorizeUrl(options)

> 生成 CAS 协议的用户登录链接

### 参数

- `options` \<IOidcParams\> 发起授权登录时需要填写的参数
- `options.service` \<String\> CAS 协议中的业务回调地址

### 示例

```java
// 拼接 CAS 登录链接
authenticationClient.setProtocol(ProtocolEnum.CAS);
ICasParams iCasParams = new ICasParams();
iCasParams.setService("service txt");
String casString = authenticationClient.buildAuthorizeUrl(iCasParams);
```

### 示例数据

```http
https://oidc1.authing.cn/cas-idp/5f17a529f64fb009b794a2ff/login?service=https://example.com
```
