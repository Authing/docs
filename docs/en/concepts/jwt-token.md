---
meta:
  - name: description
    content: Definition and Utilization of JWT Token
---

# Definition and Utilization of JWT Token

How to verify token in the {{$localeConfig.brandName}} system:

::: page-ref /en/guides/faqs/how-to-validate-user-token.md
:::

## Introduction of JWT Token

JSON Web Token (JWT,[RFC 7519](https://tools.ietf.org/html/rfc7519)) is a JSON-based open standard ((RFC 7519). It is designed to be compact and secure, especially suitable for single sign-on (SSO) scenarios at distributed sites. In order to obtain resources from the resource server, JWT statements are generally used to pass authenticated users information between identity providers and service providers. Some additional declarations for other business logic can also be added. JWT Token encryption and use JWT Token directly for authentication are available.

For details, please refer to this article: [What is JWT](https://www.jianshu.com/p/576dbf44b2ae)

## Verification Flow

![](~@imagesZhCn/concepts/jwt-flow.png)

### User Authentication Process

- User send Username/Password Authentication Request
- Server verify Username/Password against Database
- Server return JWT Token after validation successfully
- **Client Stored JWT Token and presented it in each Request （**[**How to Present?**](#客户端附带-jwt-token-的方式)**）**
- **Server verify JWT Token and return resource to valid User（**[**How to verify?**](/guides/faqs/how-to-validate-user-token.md)**）**

## Security Restriction

To prevent malicious user registration, Authing set below restrictions for IP addresses as default:

- User register `3 times` or more in `5 min` with the same IP address. The IP address will be banned
- User login failed `3 times` in `5 min` with same IP address. OTP verification will be required.
  > Threshold can be customized. Please refer to [Enable/Disable/Config Registration Counts Restriction](/guides/security/config-register-limit)。

## How to Present Client Stored JWT Token

Authing return JWT Token to developer after authentication passed. Developer stored JWT token at Client side and present token to backend server for validation.

**HTTP Header Authorization** is recommended to carry JWT Token. Eg (Axios in JavaScript):

```js
const axios = require('axios')
axios
  .get({
    url: 'https://yourdomain.com/api/v1/your/resources',
    headers: {
      Authorization: 'Bearer ID_TOKEN',
    },
  })
  .then((res) => {
    // custom codes
  })
```

Notice that **Bearer** in Line 5

### **What is Bearer?**

Bearer Token \([RFC 6750](http://www.rfcreader.com/#rfc6750)\) is used to authorize access to resources, any Bearer holder can use it to access related resources without an encryption key. Bearer represents the scope of authorization, validity period and other authorization items. Lifetime of Bearer should not be too long and it can be renewed by Refresh Token. Transport Layer Security \(TLS\) needs to be implemented to prevent data breach during transmission.

It is recommended that developers use Bearer for each token request.
