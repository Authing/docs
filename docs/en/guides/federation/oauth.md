# Become OAuth 2.0 Identity Source

<LastUpdated/>

This article introduces how to make Authing an OAuth2.0 identity resource, other systems can connect to Authing as identity providers through OAuth2.0 protocol.

OAuth2.0 protocol has the following authorization modes, which are: **Authorization Code**、**Implicit**、**Password**. After becoming an OAuth2.0 identity source, Other applications can use the corresponding process of the mode to complete user authentication and authorization.

You can understand the OAuth2.0 protocol in depth [here](/concepts/oidc/oidc-overview.md).

## Create an Application

In order for your application to have identity authentication capabilities, you need to create an application in Authing. It is recommended to fill in the name of your actual application project. In **Console** > **Applications** > **Application List**, click “Create Application”.

![](~@imagesZhCn/guides/federation/oidc/1-1.png)

Fill in the **application name**, for example, Web Note Project, specify an **authentication address** for your project, where your users will complete authentication. Fill in the **callback address** as the **back-end route** of your project. Authing will send user information (authorization code actually) to this address. Finally, click “Create”.

![](~@imagesZhCn/guides/federation/oidc/1-2.png)

Find your application, enter “Enable identity provider” tag.

![](~@imagesZhCn/guides/federation/oauth/1-1.png)

In the "OAuth2.0 Identity Provider" card below, turn on the Enable OAuth2.0 Provider, and then click Save.

![](~@imagesZhCn/guides/federation/oauth/1-2.png)

## Authorization Code Mode

If your application project has a **back-end service** that can store secret key safety, the **Authorization Code mode** is recommended.

In **Console** > **Applications**, find your application in the application details page, "Enable identity provider" tag, enter the "OAuth2.0 Identity Provider" card below, check `authorization_code` in the authorization mode, and then click Save.

![](~@imagesZhCn/guides/federation/oauth/1-3.png)

There are the following processes.

1. In your application, let the user visit the login link, the browser redirects to Authing, the user completes **authentication** in Authing.
2. The browser receives an **authorization code** from Authing service.
3. The browser sends the **authorization code** to your application **back-end** using redirection.
4. Your application service sends the **authorization code** to Authing to obtain **Access Token**, refresh token also will be returned if necessary.
5. Now your application back-end knows the user’s identity and can save user information later, redirect to other front-end pages, use Access Tokan to call other resources’ API, etc.

Below is the workflow:

![](~@imagesZhCn/guides/federation/oauth/authorization-code-flow.png)

[Check the document.](/federation/oauth2/authorization-code/)。

## Implicit Mode

If your application is a **SPA front-end application** and doesn’t have back-end services, it is recommended to use the **implicit mode** to complete user authentication and authorization. Implicit mode **fits the scenario that the secrete key cannot be stored safely** (such as in front-end browsers). In **implicit mode** applications don’t need to use code to exchange tokens, don’t need to call the `/token` endpoint, AccessToken will be returned directly from the **authentication endpoint**.

In **Console** > **Applications**, find your application, in the application details page, "Enable identity provider" tag, enter the "OAuth2.0 Identity Provider" card below, check `implicit` in the authorization mode, and then click Save.
![](~@imagesZhCn/guides/federation/oauth/1-4.png)

There are the following processes.

1. In your application, let the user visit the login link, the browser redirects to Authing, the user completes **authentication** in Authing.
2. Authing redirects the browser to your application callback address. AccessToken is sent as **URL hash**.
3. Your application retrieves token from URL.
4. Your application can save AccessToken for further use. Such as carrying AccessToken to access the resource service, carrying AccessToken to request the service.

Below is the workflow:

![](~@imagesZhCn/guides/federation/oauth/implicit-flow.png)

[Check the document](/federation/oauth2/implicit).

## Password Mode

It is not recommended to use this mode, try to use other modes as much as you can. **Password mode** will be considered only when other modes cannot solve the problem. If using password mode, please make sure your application code logic is very safe and will not be attacked by hackers, otherwise, **the user's account credentials will be directly disclosed**. It is generally used to integrate very old applications, otherwise, you should ** never take ** it as your first choice.

In **Console** > **Applications**, find your application, in the application details page, "Enable identity provider" tag, enter the "OAuth2.0 Identity Provider" card below, check `password` in the authorization mode, and then click Save.

![](~@imagesZhCn/guides/federation/oauth/1-5.png)

There are the following processes.

1. Your application asks the user to enter credential information.
2. Your application sends user credential to Authing.
3. If the credential is correct, Authing returns token.

Below is the workflow:

![](~@imagesZhCn/guides/federation/oauth/password-flow.png)

[Check the document](/federation/oauth2/password).
