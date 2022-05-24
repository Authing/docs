# 凭证管理

<LastUpdated/>

## 用户标识凭证（ID token）

通过 Guard 完成认证后，默认返回的 token 叫做 ID token，即 *用户标识凭证*。对用户信息的各种操作都需要校验 ID token。虽然业务后台也可以用 ID token 作为资源管理凭证，但更为普遍的做法是引入另外两个凭证：*访问凭证（Access token）* 和 *刷新凭证（Refresh token）*

## 访问凭证（Access token）

一般使用访问凭证来控制资源访问。

Access token 和 ID token 一样，一般都以 JWT 的形式出现，但其 encode 的内容有所不同。根据授权 scope，ID token 可以包含很多个人信息以及扩展信息。而 access token 只应该包含极少的关键信息，不应该包含任何个人信息。

另外，access token 的有效期一般都非常短，通常为数小时，敏感系统的有效期甚至只有数十分钟。这是因为从业务角度看，访问凭证和个人凭证确实应该有不同的有效期。对于业务操作，如转账，需要及时闭环。而更新个人头像却不用太着急。

实际上，我们甚至可以创造更多的凭证，每个凭证都有自己的业务含义，后台系统可以要求前端应用传入准确的凭证。只不过，对于大多数业务系统来说，统一的访问凭证就已经可以满足业务诉求了。

## 刷新凭证（Refresh token）

由于访问凭证时效性很短，一旦过期，就需要用户重新登录。这在一些场景下用户是可以接受的，如银行类 App，但大多数场景，这样的设计会严重影响用户体验。于是就有了 *刷新凭证*

当访问凭证过期后，App 可以通过刷新凭证来获取新的 *用户标识凭证* 和 *访问凭证*。

### 获取刷新凭证

根据 OIDC 协议规范，获取刷新凭证必须在授权请求的 scope 里面包含 offline_access。

若 App 通过 WebView 进行登录，推荐使用 Guard 提供的 WebView 来接入，请参考：[WebView](./webview.md)

> Guard 默认的 scope 里面会包含 offline_access，同时在登录 URL 上会拼接：prompt=consent 因为我们认为获取刷新凭证是移动 App 的默认行为

若 App 通过原生方式进行认证，首先参考这里唤起认证界面： [快速接入](./../quick.md)

然后将示例中的：

```java
AuthFlow.start(this);
```

替换为：
```java
AuthFlow flow = AuthFlow.start(this);
flow.setAuthProtocol(AuthContainer.AuthProtocol.EOIDC);
```

> OIDC 协议涉及到多个网络请求，所以会更耗时

在认证回调的 UserInfo 对象里面，可以通过下面代码获取 Refresh token：

```java
String refreshToken = userInfo.getRefreshToken();
```

### 通过刷新凭证换取新的访问凭证和用户标识凭证

无论是采用 WebView 还是原生的方式，都可以通过 API 来刷新访问凭证和用户标识凭证

[刷新凭证](https://core.authing.cn/openapi/)