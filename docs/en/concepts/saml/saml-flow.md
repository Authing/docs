# SAML Flow

In this section, we will introduce the data flow between SP, IdP and Browser.

## Roles in SAML Protocol

Browser: Handel the communication between SP and IdP
SP: Service Provider
IdP: Identity Provider

## SAML Flow

![](~@imagesZhCn/concepts/saml/saml-flow-overview.png)

1. User send access request to SP.
2. SP generate SAML request and send it to IdP via browser redirect.
3. IdP received SAML request and request user login.
4. User login.
5. IdP send SAML response including SAML assertion to SP.
6. SP validate SAML response.
7. User access granted.

## SAML Bindings Between SP and IdP

There are three bindings in SAML: HTTP Redirect Binding, HTTP POST Binding and HTTP Artifact Binding. Each binding is used in different stages during communication.

### HTTP Redirect Binding

SP send SAML request via HTTP Redirect Binding. This SAML message is carried directly in the URL query sting of an HTTP GET request

![](~@imagesZhCn/concepts/saml/HTTP-Redirect-Binding.png)

### HTTP POST Binding

IdP send SAML response to SP via HTTP POST Binding. 

![](~@imagesZhCn/concepts/saml/http-post-binding.png)

### HTTP Artifact Binding

SP and IdP only transmit artifacts in browser. Artifacts can be used to request SAML body via back channel. This avoids SAML Request and SAML Response exposed in the Front End.

![](~@imagesZhCn/concepts/saml/HTTP-Artifact-Binding.png)
