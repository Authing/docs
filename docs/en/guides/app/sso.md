# Implement Single Sign-on Between Mutiple Applications

<LastUpdated/>

After enabling single sign-on between applications, the login status between different applications under the same user pool will be connected

## Create Two Applications

At first you can create two applications follow the [guidelines](./create-app.md).

## Enable Single Sign-on for Applications

On the console’s **Applications** page, turn on the application single sign-on switch.

![](https://cdn.authing.cn/docs/20201216143359.png)

## Experience the Single Sign-on

In console > applications, click the application’s login button.

![](https://cdn.authing.cn/docs/20201216143536.png)

Finish login on the login page:
![](https://cdn.authing.cn/docs/20201216143744.png)

After login success, it will redirect to the application callback address:
![](https://cdn.authing.cn/docs/20201216143917.png)

Next click another application’s login button:
![](https://cdn.authing.cn/docs/20201216144049.png)

The user doesn’t need to enter the password again, the user can directly enter the application callback address:
![](https://cdn.authing.cn/docs/20201216144215.png)

## Using SDK for Single Sign-on

For the details about access process, please refer to the documents which introduces the implementation of [single sign-on (SSO)](/guides/authentication/sso/) and [single sign-on SDK](/reference/sdk-for-sso.md).