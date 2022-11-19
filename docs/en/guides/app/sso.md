# Implement Single Sign-on Between Mutiple Applications

<LastUpdated/>

After enabling single sign-on between applications, the login status between different applications under the same user pool will be connected

## Create Two Applications

At first you can create two applications follow the [guidelines](./create-app.md).

## Configure SSO

Go to the menu **Applications** > **SSO**, click **Add Application** in the upper left corner, then select **Self-built App**, find the application you just created in the list below, click **+**, the configuration of multi-application SSO is completed.

![](./images/self-built-app-sso-1.png)

![](./images/self-built-app-sso-2.png)

## Experience the Single Sign-on

Enter the **SSO** app list page, select an app, and click **Experience Login**
![](./images/self-built-app-sso-3.png)

Finish login on the login page:
![](./images/self-built-app-sso-4.png)

After login success, it will redirect to the application callback address:
![](./images/self-built-app-sso-success.png)

Next click another application’s login button:
![](./images/self-built-app-sso-5.png)

The user doesn’t need to enter the password again, the user can directly enter the application callback address:
![](./images/self-built-app-sso-success.png)

## Using SDK for Single Sign-on

For the detailed access procedure, please refer to the [Single Sign-On (SSO)](/en/reference/sdk-for-sso.md) document.