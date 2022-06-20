# Twitter 社会化登录

<LastUpdated/>

## Introduction to the scenario

- **Overview** Twitter social login is a way for users to securely log in to third-party applications or websites using Twitter as their identity source. By configuring and enabling Twitter social login in Authing, you can quickly access the basic open information of Twitter and help users to achieve password-free login through Authing.
- **Application Scenario**: PC Website
- **End-User Preview**.

<img src="./images/00.png" >

## Caution.

- If you do not have a Twitter account, please go to [Twitter Platform](https://twitter.com/) to register your account.
- Go to [Twitter Developer Platform](https://developer.twitter.com/en/portal/) to complete your account information and [request Elevated access](https://developer.twitter.com/en/portal) for your account. /petition/standard/basic-info).
- If you do not have an Authing Console account, please go to [Authing Console](https://authing.cn/) to register for a developer account.

## Step 1: Create Twitter Application

1.1 To create a project, in the sidebar **Projects & Apps**, select **Overview**, and under the **Elevated** directory, click **+New Project**.

<img src=". /images/02.png" >

Fill in **project name**, **usage scenario**, **project description** in order to start the app creation.

<img src=". /images/03.png" >

During the development phase, the application environment is first selected as **Development** and switched to **Production** after debugging is complete

<img src=". /images/04.png" >

After filling in the name, you will see **APP Key** and **APP Key Secret**, record them first, they will be used in the Authing console configuration

<img src=". /images/05.png" >

## Step 2: Configure Twitter in Authing Console

2.1 Please click the "Create Social Identity" button on the "Social Identity" page of Authing Console, then enter the "Select Social Identity" page, select the "Twitter" identity button, and enter the "Twitter Login Mode" page.

<img src=". /images/11.png" >

2.3 Please configure the relevant field information in the "Social Identity Sources" - "Twitter" page of the Authing Console console.

<img src=". /images/13.png" >

| number | field/function | description |
| ----- | -------------- | ------------------------------------------------------------------------------------------------ |
| 2.3.1 | Unique identifier | a. The unique identifier consists of lowercase letters, numbers, and -, and is less than 32 bits long. b. This is the unique identifier for this connection and cannot be changed after it is set. | 2.3.2
| 2.3.2 | Display name | This name is displayed on the button in the end-user's login screen.                                                     | This is a unique identifier for this connection.
| 2.3.3 | API Key | The application number, which needs to be obtained on the Twitter platform.
| 2.3.4 | API Secret Key | The application key, which needs to be obtained on the Twitter platform.
| 2.3.5 | Callback URL | The callback address of the identity source after it has been authenticated.
| This URL needs to be configured to the callback address of the application created on the Twitter platform.                   | 2.3.6 | Twitter's redirect URI.
| 2.3.7 | Login Mode | When "Login Only Mode" is enabled, you can only login to your existing account and cannot create a new account, so please choose carefully.                             |Please choose carefully.

Once the configuration is complete, click the "Create" or "Save" button to complete the creation.

In the Twitter created project, select the app you just created, scroll to the bottom, and under **User authentication settings**, click the **Set Up** button to enter the authentication settings page
<img src=". /images/06.png" >

Turn on OAuth 1.0a
<img src=". /images/07.png" >

Select App permissions as needed, by default **Read** is sufficient for authentication, **Callback URI / Redirect URL** fills in the callback address displayed after the Twitter identity feed is created in the Authing console.
<img src=". /images/08.png" >

**Website URL** Just fill in your site's homepage and click Save
<img src=". /images/09.png" >

If you forget the application key, you can click **Keys and tokens** on the application page and select **Regenerate** to regenerate it.
<img src=". /images/10.png" >

When you're done configuring the app, go back to the app settings page and click **Edit** to switch the app environment to **Production**.
<img src=". /images/14.png" >

## Step 3: Development Access

- **Recommended development access**: Use a hosted login page

- **Description of advantages and disadvantages**: Simple to run and maintain, with Authing taking care of it. Each user pool has an independent secondary domain; if you need to embed it into your application, you need to use pop-up mode login, i.e.: after clicking the login button, a window will pop up with the Authing hosted login page, or redirect your browser to the Authing hosted login page.

- **Detailed access method**.

  3.1 Create an application in Authing console, for details see: [How to create an application in Authing](. /guides/app/create-app.md)

  3.2 Open and associate an app created in Authing console in the created Twitter identity connection details page

<img src=". /images/15.png" >

3.3 Experience Twitter third-party login on the login page

<img src=". /images/16.png" >
