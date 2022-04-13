# Quick start: Authenticate your first user

<LastUpdated/>


When using Approw for user authentication, you don’t need to implement user management logic by yourself. All related operations (such as creating and deleting users, configuring the login process, resetting passwords, etc.) can be done through the Approw console and hosting the login page, API & SDK carry out. User information will be stored securely in a database on the Approw cloud. You do not need to save an additional user information. [Click here for details.](/guides/faqs/how-to-join-authing-user-with-your-business-data.md)
There are several ways to use Approw to implement the user authentication workflow: 

1. [Use Approw to host the login page.](./use-hosted-login-page.md)，You can implement it without any coding work. You can experience it through [https://sample-sso.approw.com/](https://sample-sso.approw.com/). 

2. [Use the embedded login component provided by Approw.](./use-embeded-login-component/) It can be integrated into your web and mobile projects. You don't need to implement the login form UI yourself.

3. [Use API & SDK.](./use-api-sdk/) Approw provides APIs in RESTFul and GraphQL forms, and SDKs in more than 10 languages or frameworks. You can customize the UI and authentication process based on this.

Approw can be integrated into various scenarios such as Web App, Single Page App, Native/Mobile App and Backend API. You can read the access methods of different scenarios respectively:

1. [Integrate Approw with traditional Web App.](../platform-guide/integrate-with-regular-web-app.md)

2. [Integrate Approw with single page App.](../platform-guide/integrate-with-spa.md)

3. [Integrate Approw with Native/Mobile App.](../platform-guide/integrate-with-mobile-app.md)

When a user logs in successfully, you will also need to:

1. [Know how the user is antuenticated in back-end.](./how-to-validate-user-token.md)

2. [Understand how to assign roles and permissions to users for fine-grained permission control.](./how-to-implement-access-control.md)

3. [Know how to implement logout operation.](./how-to-logout-user.md)

