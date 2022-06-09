# Become SAML2 Identity Source

<LastUpdated/>

This article introduces how to enable Authing as SAML2 identity provider, provide **assertion** to other service providers. Authing can be integrated with third-party applications through the SAML2 protocol
You can understand the SAML2 protocol in depth [here](/concepts/saml/saml-overview.md).

## Create an Application

For your application to have identity authentication capabilities, you need to create an application in Authing. It is recommended to fill in the name of your actual application project. In **Console** > **Applications** > **Application List**, click “Create Application”.

![](~@imagesZhCn/guides/federation/oidc/1-1.png)

Fill in the **application name**, for example, Web Note Project, feel free to fill in an **authentication address**. Finally, click “Create”.

![](~@imagesZhCn/guides/federation/saml/1-1.png)

## Configure SAML2 Identity Provider

To use your organization and users for SAML2 authentication, you need to enable and configure the application's SAML2 identity provider. Find your application and go to the "Enable Identity Provider" tab.

![](~@imagesZhCn/guides/federation/oauth/1-1.png)

In the "SAML2 Identity Provider" card, turn on the Enable SAML2 Provider switch and fill in the **default ACS address** and **settings** information. Then click “Save”. The specific ACS address will be provided by the SAML SP, and the specific setting items need to be configured according to the requirements of the SAML SP.

::: hint-info
When you create a SAML2 IdP in Authing, some SPs may ask you to upload the IdP metadata first, then providing you with the corresponding configuration information. At this time, it is recommended to fill in an **arbitrary** ACS address and the default setting information. Then **download** the Authing IdP **metadata** and upload it to the SP. Then **modify** the ACS address and setting information to the correct content obtained from the SP.
:::

![](~@imagesZhCn/guides/federation/saml/1-3.png)

**Default ACS address**: By default, SAML2 Identity Provider will send the SAML Response to the consumer address specified in the SAML Request (go back where it comes from, by default, Authing will send the SAML assertion to the address specified by the `AssertionConsumerServiceURL` parameter in the SAML Request). If the consumer address is not specified in the SAML Request, Authing will send the SAML Response to the address filled in here. You can **get this address from SP** and fill it in here. If you can't find it at the SP, you can fill in one arbitrarily, but **some SPs will not specify the consumer address in the SAML Request**. In this case, **the correct address must be filled in here**.

**Settings**: Advanced configuration of SAML2 Identity Provider, you need to fill in an object in **JSON format**, including the following:

| key                     | Type    | Description                                                                                                                                                                                                                                                                                                                                                  | Default value                                                                                          |
| ----------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| samlRequestSigningCert  | string  | SAML Request verification certificate, you can get the content of this certificate from SP. After filling in this field, the SAML Request will be considered signed and check whether the signature is legal. If **the SP does not sign the request**, Authing will **reject the SAML Request and cause the authentication to fail**.                        | -                                                                                                      |
| signResponse            | boolean | Whether to sign the SAML Response.                                                                                                                                                                                                                                                                                                                           | false                                                                                                  |
| nameIdentifierFormat    | string  | The unique identifier format in the SAML Response.                                                                                                                                                                                                                                                                                                           | urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified                                                  |
| lifetimeInSeconds       | number  | SAML assertion expiration time, in seconds.                                                                                                                                                                                                                                                                                                                  | 3600                                                                                                   |
| authnContextClassRef    | string  | SAML authentication context                                                                                                                                                                                                                                                                                                                                  | urn:oasis:names:tc:SAML:2.0:ac:classes:unspecified                                                     |
| signatureAlgorithm      | string  | SAML assertion signature algorithm                                                                                                                                                                                                                                                                                                                           | http://www.w3.org/2001/04/xmldsig-more#rsa-sha256                                                      |
| mappings                | object  | Attribute mapping dictionary, the fields in the Authing user information are mapped to the mapping dictionary in the SAML assertion. The key **on the left** represents the user's **information field in Authing**, and the value **on the right** represents **the attribute name in the SAML assertion**.                                                 | No field mapping                                                                                       |
| destination             | string  | Destination in SAML Response.                                                                                                                                                                                                                                                                                                                                | `AssertionConsumerServiceURL` in the SAML Request by default. Or the default ACS address if not exist. |
| recipient               | string  | Recipient in SAML Response.                                                                                                                                                                                                                                                                                                                                  | `AssertionConsumerServiceURL` in the SAML Request by default. Or the default ACS address if not exist. |
| audience                | string  | Audience in SAML Response.                                                                                                                                                                                                                                                                                                                                   | `AssertionConsumerServiceURL` in the SAML Request by default. Or the default ACS address if not exist. |
| emailDomainSubstitution | string  | Mail domain replacement, the **mailbox domain name** in the identity in the SAML assertion will be replaced with the content filled in here, some SPs require the mail domain in the assertion to be specific content. If you fill in this field, user pool registration **must be prohibited**, otherwise there is a risk of fraudulent use of the account. | -                                                                                                      |

**Example**：

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

**Custom SAML Response Attribute**:
You can add some custom attributes to the SAML assertion, and the newly added attributes will appear in the Attribute of the SAML assertion.

**Example**:

![Setup Customized SAML Response Configurations](https://cdn.authing.cn/docs/20200929104332.png)
::: img-description
Setup Customized SAML Response Configurations
:::

The above configuration will add the following attributes to the SAML identity assertion

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

You can also dynamically read the fields from Authing user information, and type in the rightmost text box in a row: `My email is ${user.email} and my gender is ${user.gender}`.
![Get User Information Fields Dynamically](https://cdn.authing.cn/docs/20200929110025.png)
::: img-description
Get User Information Fields Dynamically
:::

The content of this article will add the following attributes to the SAML assertion:

```xml
<saml:Attribute Name="CustomName" NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:basic">
  <saml:AttributeValue
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="xs:string">My email is yezuwei@authing.cn and my gender is M
  </saml:AttributeValue>
</saml:Attribute>
```

## Integration with applications

Authing has already integrated SAML2 with Alibaba Cloud, Tencent Cloud, Huawei Cloud, AWS, and Kibana (AWS). Check the corresponding configuration documents for detailed steps.

### Log in Alibaba Cloud Console (China)

Please check [the integrated documentation](/integration/ali-cloud/).

### Log in Alibaba Cloud Console (International)

Please check [the integrated documentation](/integration/ali-cloud-intl/).

### Log in Tencent Cloud Console

Please check [the integrated documentation](/integration/tencent-cloud/).

### Log in AWS Console (China)

Please check [the integrated documentation](/integration/aws/).

### Log in Huawei Cloud Console (China)

Please check [the integrated documentation](/integration/huawei-cloud/).

### Log in Kibana Console (AWS China)

Please check [the integrated documentation](/integration/aws-kibana/).
