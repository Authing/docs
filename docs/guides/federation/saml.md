# 成为 SAML2 身份源

<LastUpdated/>

本文讲述如何在 Authing 开启 SAML2 身份提供商，为其他服务商提供**身份断言**。可以通过 SAML2 协议将 Authing 与第三方应用集成。你可以在[这里](/concepts/saml/saml-overview.md)深入理解 SAML2 协议。

## 创建应用

为了让你的应用具备身份认证能力，你需要在 Authing 创建一个应用，名称建议填写你的实际应用项目的名称，进入**控制台** > **应用** > **应用列表**，点击创建应用：

![](~@imagesZhCn/guides/federation/oidc/1-1.png)

填写你的**应用名称**，例如：阿里云测试，随意填写一个**认证地址**，最后点击「创建」按钮：

![](~@imagesZhCn/guides/federation/saml/1-1.png)

## 配置 SAML2 身份提供商

为了将你的组织与用户用于 SAML2 身份认证，你需要开启应用的 SAML2 身份提供商并进行配置。找到你的应用，进入「启用身份提供商」选项卡。

![](~@imagesZhCn/guides/federation/oauth/1-1.png)

在「SAML2 身份提供商」卡片中，打开启用 SAML2 Provider 开关，填写**默认 ACS 地址**和**设置**信息。然后点击保存。具体的 ACS 地址 SAML SP 方会提供，具体的设置项需要根据 SAML SP 方的要求进行配置。

::: hint-info
当你在 Authing 创建 SAML2 IdP 时，有的 SP 可能会先要求你上传 IdP 的元数据文档，才会为你提供相应的配置信息。此时建议先填写一个**任意**的 ACS 地址和默认的设置信息。然后**下载** Authing 的 IdP **元数据文档**上传到 SP 方。然后再将 ACS 地址和设置信息**修改为**从 SP 获得的正确内容。
:::

![](~@imagesZhCn/guides/federation/saml/1-3.png)

**默认 ACS 地址**：SAML2 Identity Provider 默认会将 SAML Response 发送到 SAML Request 中指定的消费地址（哪里来的回到哪里去，Authing 默认会将 SAML 身份断言发到 SAML Request 中 `AssertionConsumerServiceURL` 参数指定的地址），如果 SAML Request 中未指定消费地址，Authing 会将 SAML Response 发到此处填写的地址。你可以**从 SP 处获取**到这个地址并填入这里。如果在 SP 处找不到，不妨先随意填写一个，但**某些 SP 不会在 SAML Request 中指定消费地址**，这种情况下这里**必须填写正确的地址**。

**设置**：SAML2 Identity Provider 的高级配置，需要填写一个 **JSON 格式**的对象，包含以下内容：

| key                     | 类型    | 描述                                                                                                                                                                                            | 默认值                                                                                        |
| ----------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| samlRequestSigningCert  | string  | SAML Request 验签证书，你可以从 SP 获得此证书内容。填写此字段后，会认为 SAML Request 经过签名，并检查签名是否合法。如果 **SP 未对请求进行签名**，Authing 会**拒绝 SAML Request 导致认证失败**。 | -                                                                                             |
| signResponse            | boolean | 是否对 SAML Response 签名                                                                                                                                                                       | false                                                                                         |
| nameIdentifierFormat    | string  | SAML Response 中的唯一标识符格式。                                                                                                                                                              | urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified                                         |
| lifetimeInSeconds       | number  | SAML 身份断言的过期时间，单位为秒。                                                                                                                                                             | 3600                                                                                          |
| authnContextClassRef    | string  | SAML 身份认证上下文。                                                                                                                                                                           | urn:oasis:names:tc:SAML:2.0:ac:classes:unspecified                                            |
| signatureAlgorithm      | string  | SAML 断言签名算法。                                                                                                                                                                             | http://www.w3.org/2001/04/xmldsig-more#rsa-sha256                                             |
| mappings                | object  | 属性映射字典，Authing 用户信息中的字段映射到 SAML 身份断言中的映射字典，**左侧**的 key 代表用户在 **Authing 中的信息字段**，**右侧**的 value 代表 **SAML 身份断言中的属性名**。                 | 默认不做字段映射。                                                                            |
| destination             | string  | SAML Response 中的 Destination。                                                                                                                                                                | 默认为 SAML Request 中的 `AssertionConsumerServiceURL`，如果不存在，就为配置的默认 ACS 地址。 |
| recipient               | string  | SAML Response 中的 recipient。                                                                                                                                                                  | 默认为 SAML Request 中的 `AssertionConsumerServiceURL`，如果不存在，就为配置的默认 ACS 地址。 |
| audience                | string  | SAML Response 中的 audience。                                                                                                                                                                   | 默认为 SAML Request 中的 `AssertionConsumerServiceURL`，如果不存在，就为配置的默认 ACS 地址。 |
| emailDomainSubstitution | string  | 邮件域替换，SAML 断言中的身份标识中的**邮箱域名**会被替换为这里填写的内容，一些 SP 要求身份断言中的邮件域必须为特定的内容。如果填写此字段，必须**禁止用户池注册**，否则存在账号冒用风险。       | -                                                                                             |

**示例**：

```json
{
  "audience": null,
  "recipient": "https://signin.aliyun.com/saml/SSO",
  "destination": "https://signin.aliyun.com/saml/SSO",
  "mappings": {
    "email": "Email",
    "username": "UserName"
  },
  "digestAlgorithm": "http://www.w3.org/2000/09/xmldsig#sha1",
  "signatureAlgorithm": "http://www.w3.org/2000/09/xmldsig#rsa-sha1",
  "authnContextClassRef": "urn:oasis:names:tc:SAML:2.0:ac:classes:unspecified",
  "lifetimeInSeconds": 3600,
  "nameIdentifierFormat": "urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified",
  "samlRequestSigningCert": "-----BEGIN CERTIFICATE-----\nMIICyDCCAjGgAwIBAgIBADANBgkqhkiG9w0BAQUFADCBgDELMAkGA1UEBhMCdXMx\nDTALBgNVBAgMBGFzZGYxDTALBgNVBAoMBGFzZGYxGDAWBgNVBAMMD2lkcDMuYXV0\naGluZy5jbjENMAsGA1UEBwwEYXNkZjENMAsGA1UECwwEYXNkZjEbMBkGCSqGSIb3\nDQEJARYMYXNkZkAxMjMuY29tMB4XDTE5MDUyNTA1NTgwMFoXDTIwMDUyNDA1NTgw\nMFowgYAxCzAJBgNVBAYTAnVzMQ0wCwYDVQQIDARhc2RmMQ0wCwYDVQQKDARhc2Rm\nMRgwFgYDVQQDDA9pZHAzLmF1dGhpbmcuY24xDTALBgNVBAcMBGFzZGYxDTALBgNV\nBAsMBGFzZGYxGzAZBgkqhkiG9w0BCQEWDGFzZGZAMTIzLmNvbTCBnzANBgkqhkiG\n9w0BAQEFAAOBjQAwgYkCgYEA2gggFHKUYkoEp83BfGgVjBiev+MIBm+AOuKVqIAX\naJDa1NHL+ApBWsfbKNoPPMy8sZdCBrDm6w5cx9cBjw4uBUap3elxr+MiFoCCc2Eg\nJundFhBVXkU6TafLzfoW4w6/yonmQ798nBKQrTmdc76tpT9xCwU2AmS5ooScQ9Xu\nNn0CAwEAAaNQME4wHQYDVR0OBBYEFMDHVJxYcOlCxnnRi1Lx4tj7gWKNMB8GA1Ud\nIwQYMBaAFMDHVJxYcOlCxnnRi1Lx4tj7gWKNMAwGA1UdEwQFMAMBAf8wDQYJKoZI\nhvcNAQEFBQADgYEAvDodW/ewvCEadY4PCFaBT0ZqoEvrb96hOrbP2hZV4lkCMbLq\noPWASgGTNr9TPnxGCvP9xOv77wzgLs7EAOI+ea1D+NIjUuKnjCLLBv034vMp8bRI\n/Ea9AsGqVCr8tK/3dPoJMxHIjs2cpqNdDcalCZkwBZ1Z0c0YtKIVDFnym5U=\n-----END CERTIFICATE-----",
  "emailDomainSubstitution": "authing.onaliyun.com"
}
```

**自定义 SAML Response 属性**：
你可以在 SAML 身份断言中加入一些自定义属性，新加入的属性会出现在 SAML 身份断言的 Attribute 中。

**示例**:

![配置自定义 SAML Response 属性](https://cdn.authing.cn/docs/20200929104332.png)
::: img-description
配置自定义 SAML Response 属性
:::

以上配置，会在 SAML 身份断言中增加以下属性：

```xml
<saml:Attribute Name="https://cloud.tencent.com/SAML/Attributes/Role" NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:basic">
  <saml:AttributeValue
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="xs:string">qcs::cam::uin/2165337796:roleName/authing,qcs::cam::uin/2165337796:saml-provider/authing
  </saml:AttributeValue>
</saml:Attribute>
<saml:Attribute Name="https://cloud.tencent.com/SAML/Attributes/RoleSessionName" NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:basic">
  <saml:AttributeValue
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="xs:string">Test
  </saml:AttributeValue>
</saml:Attribute>
```

你还可以从 Authing 的用户信息上动态读取字段，在一行中最右侧的文本框中输入：`My email is ${user.email} and my gender is ${user.gender}`。
![动态读取用户信息字段](https://cdn.authing.cn/docs/20200929110025.png)
::: img-description
动态读取用户信息字段
:::

该条内容会在 SAML 身份断言中增加以下属性：

```xml
<saml:Attribute Name="CustomName" NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:basic">
  <saml:AttributeValue
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="xs:string">My email is yezuwei@authing.cn and my gender is M
  </saml:AttributeValue>
</saml:Attribute>
```

## 与应用集成

Authing 已经与阿里云、腾讯云、华为云、AWS、Kibana（AWS） 进行了 SAML2 集成，查看相应的配置文档了解详细步骤。

### 登录阿里云控制台（中国区）

请查看[接入文档](/integration/ali-cloud/)。

### 登录阿里云控制台（国际区）

请查看[接入文档](/integration/ali-cloud-intl/)。

### 登录腾讯云控制台

请查看[接入文档](/integration/tencent-cloud/)。

### 登录 AWS 控制台（中国区）

请查看[接入文档](/integration/aws/)。

### 登录华为云控制台（中国区）

请查看[接入文档](/integration/huawei-cloud/)。

### 登录 Kibana 控制台（AWS 中国区）

请查看[接入文档](/integration/aws-kibana/)。
