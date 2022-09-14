# 自定义域名

::: hint-success
当前自定义域名功能仅对应用面板生效；对于未加入应用面板的自建应用，暂不支持自定义域名。
:::

## 为什么要使用自定义域名？

在您的 {{$localeConfig.brandName}} 用户池中，应用面板会拥有一个默认的域名 `YOUR_DOMAIN.authing.cn`。完成自定义域名的配置后，您的用户可以访问 `login.YOUR_DOMAIN.CN`，从而始终在域名内完成登录。自定义域可以提升您的品牌知名度，并让用户始终在您的域名下使用提供的应用服务。

## 使用 Authing 提供的自定义域名功能​

路径：**品牌化->自定义域名​**

版本权益：{{$localeConfig.brandName}} 当前支持在 B2B（高级版及以上）、B2E（高级版及以上）用户池场景下，为您的应用面板配置自定义域名。如果您是新注册用户，体验期内也可以自由使用本功能。更详细的版本权益说明，请查看 [官网「价格」页](https://www.authing.cn/pricing)。​

::: hint-info
对于本功能，有几点重要的说明：​
* 在配置完您的自定义域名之后，{{$localeConfig.brandName}} 为您提供的默认域名将仍旧生效，在访问原域名时，也将跳转到您配置的自定义域名下完成登录​。
* 完成自定义域名配置的当下，如果有用户正在使用原域名进行登录，其登录状态不会受到影响；其重新登录时将会在自定义域名下完成登录​。
* 使用嵌入式登录（{{$localeConfig.brandName}} Guard）/ {{$localeConfig.brandName}} SDK 实现登录时，也支持使用 {{$localeConfig.brandName}} 提供的默认域名或配置自定义域名。
:::

## 配置您的自定义域名

在 {{$localeConfig.brandName}} 实现自定义域名的配置流程只需要三步：

### 第一步：输入合法的域名

::: hint-info
您的自定义域名必须符合域名的标准规范，详情请参考 [RFC 的域名标准规范](https://www.rfc-editor.org/rfc/rfc7230#section-3.2.2)。
:::

1. 准备域名。</br>如果您还没有自己的域名，可以前往域名注册商平台（如阿里云、腾讯云、华为云等）选购自己的域名。

2. 备案。</br>根据 [工信部《互联网信息服务管理办法》（国务院 292 号令）](http://www.scio.gov.cn/wlcb/zcfg/Document/553828/553828.htm)，网站在未完成备案之前，不能指向大陆境内服务器开通访问。如果您的网站托管在中国大陆节点服务器，就必须申请互联网内容提供商 (ICP) 备案。若网站服务器为非中国大陆节点，则不用申请备案。出于合规性考虑，在 {{$localeConfig.brandName}} 使用的自定义域名都需要首先完成备案才能使用。

3. 输入域名。</br>确保域名格式正确、合法且生效后，将您的域名填入输入框，点击 **下一步**。

<img src="../images/input-domain-name.png" style="display:block;margin: 0 auto;">

### 第二步：在您的域名服务器中添加新的 CNAME

1. 在填入有效的域名信息后，{{$localeConfig.brandName}} 会生成对应的 **TXT** 和 **CNAME** 信息。您需要前往 DNS 服务提供商添加 **TXT** 和 **CNAME** 记录，将本页面的相关信息复制粘贴到您的 DNS 服务器，将域名指向 {{$localeConfig.brandName}} 对应应用的域名。

<img src="../images/cname-record.png" height=700 style="display:block;margin: 0 auto;">

::: img-description
示例：阿里云控制台 DNS 配置页 - CNAME 记录​
:::

::: hint-info
在不同的 DNS 服务器中添加 **TXT** 和 **CNAME** 记录的步骤略有差异，您可以参考：[在阿里云创建一条新的 CNAME 指向 Authing](/guides/customize/domain/create-cname.md)。
:::

2. 确保当前信息在您的域名服务器中配置完成并生效后，返回 {{$localeConfig.brandName}} **自定义域名->DNS配置**，点击 **连通测试**。

::: hint-info
通常来讲在 DNS 服务器中添加完成一条有效的 **CNAME** 信息后，需要过几分钟才会生效，因此如果您的连通测试没有通过，请稍作等待后重试。
:::

3. 连通测试完成后，点击 **下一步**。

### 第三步：填入有效的 SSL 证书信息​

出于安全性考虑，{{$localeConfig.brandName}} 当前仅支持 `https` 协议下的域名。为了确保域名能够正常访问，您需要在域名服务器中找到您的 SSL 证书并下载。

由于不同服务商提供的证书信息种类繁多，您需要在其中找到以下三项信息：​
* 签名证书​
* 签名私钥​
* 证书链

<img src="../images/ssl-certificate-config.png" style="display:block;margin: 0 auto;">

1. 上传签名证书​。</br>证书通常是以 `.crt` 或 `.pem` 为扩展名的文件。使用文本编辑器打开证书文件可以看到内容 `BEGIN CERTIFICATE` 开头，`END CERTIFICATE` 结尾。​</br>确认证书内容格式后，直接将证书内容复制粘贴到签名证书输入框。​</br>签名证书的格式为：

```language
----- BEGIN CERTIFICATE-----
签名证书正文
----- END CERTIFICATE-----
```

2. 上传签名私钥​。</br>私钥通常是以 `.key` 或 `.pem` 等为扩展名的文件。使用文本编辑器打开证书文件可以看到内容 `BEGIN PRIVATE KEY` 开头，`END PRIVATE KEY` 结尾。​​</br>确认证书内容格式后，直接将证书内容复制粘贴至签名私钥输入框。​​</br>证书私钥的格式为：

```language
-----BEGIN RSA PRIVATE KEY-----
签名证书私钥正文
----- END RSA PRIVATE KEY-----
```

3. 上传证书链​。</br>SSL 证书链的结构，一般是由 **网站证书->CA 中间证书机构->CA 根证书机构** 构成，中间证书还可能存在多层关系。​</br>证书链的格式为：

```language
----- BEGIN CERTIFICATE-----
签名证书正文
----- END CERTIFICATE-----
....
----- BEGIN CERTIFICATE-----
签名证书正文
----- END CERTIFICATE-----
```

::: hint-info
**为什么需要填写证书链？**</br>
通常情况下 PC 端浏览器都可以通过 Authority Info Access（权威信息访问）的 URL 链接获得中间证书，但在部分 Android 系统的浏览器上访问时会出现证书不可信或无法访问等问题。主要原因在于部分 Android 系统的浏览器并不支持通过 Authority Info Access（权威信息访问）的 URL 链接获得中间证书，这时就需要把证书链文件按照 SSL 证书链的结构合并为一个文件重新部署到服务器上，浏览器在与服务器连接时将会下载用户证书和中间证书，使您的浏览器访问时显示为可信证书。
:::

4. 以上三部分信息完成配置后，点击 **连通测试**，我们会验证您所配置的证书是否对应您在第一步配置的域名，并且校验此证书是否仍在有效期内。​
​
5. 连通测试通过后，点击 **完成**。您的自定义域名当即生效！

<img src="../images/ssl-certificate-valid.png" style="display:block;margin: 0 auto;">

::: hint-info
[这里以阿里云为例，说明如何下载、使用 SSL 证书。](/guides/customize/domain/use-aliyun-ssl-certificate.md)
:::

## 相关功能配置​

在开始使用自定义域名之前，您需要对现有的功能配置进行一些修改，以确保您所配置的自定义域名对现有的功能均生效。​
​
### 涉及到应用域名的邮件模板​

当您开始使用自定义域名后，预置的邮件模板中涉及到应用域名的部分都会更新为自定义域名。涉及到的发送邮件相关的场景包括：​

* 欢迎邮件​
* 首次邮箱登录验证​
* 控制台发起验证​
* 密码到期提醒​
* 管理员重置密码提醒​
* 账户密码修改提醒​
* 向内部管理员发送登录地址​
* 向租户管理员发送登录地址​
​
### 第三方身份源登录（社会化身份源、企业身份源）​

如果您在使用 Authing 的第三方身份源（社会化身份源/企业身份源），为了保证这些身份源在自定义域名下仍旧能够正常使用，您需要更新您的应用代码中包含的登录地址。​
​
### Authing API 调用​
​
所有请求（即获取令牌，并实际调用 API）必须使用相同的域。通过自定义域获得的令牌必须在相同的域名下使用。​

如果使用自定义域的身份验证流来请求访问令牌以访问管理 API，那么也必须使用自定义域调用管理 API 端点。

```language
POST https://mycustomdomain.cn/oidc/token
... // other parameters 
...
audience:https://YOUR_APP.authing.cn/api/v3/
```

您的访问令牌请求应该类似于：

```language
GET https://mycustomdomain.com/api/v3/clients
Headers:
Authorization: Bearer <access_token>
```

### SAML 相关配置

[点击了解如何使用 SAML 作为 SP。](https://auth0.com/docs/customize/custom-domains/configure-features-to-use-custom-domains#configure-saml-applications)

### 私有化部署

当前我们还不支持在私有化场景下实现自定义域名。如果有特殊需求，请联系您的服务支持团队。

## 常见操作

### 更新 SSL 证书

每一份 SSL 证书都有自己的过期时间。如发现 SSL 证书即将过期，您可以点击 **编辑** 进行修改。更新证书信息之后需要重新进行连通测试，生效后您的自定义域名即可继续正常使用。

<img src="../images/edit-ssl-certificate.png" style="display:block;margin: 0 auto;">

### 更换自定义域名

如果您需要更换自定义域名，那么需要删除掉现有的域名重新开始配置。如果当前的自定义域名处于生效状态，那么您在删除这个自定义域名后，目前正在这个域名下访问的用户将不能继续使用您的应用服务，而需关闭此页面后重新登录。

<img src="../images/delete-domain.png" style="display:block;margin: 0 auto;">

### 停止使用自定义域名

如要恢复使用默认域名，需要删除当前已经完成配置的域名。如果当前的自定义域名处于生效状态，那么您在删除这个自定义域名时，目前正在这个域名下访问的用户将不会受到影响，刷新界面之后需要重新登录。
