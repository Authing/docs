# GitLab Social Login

<LastUpdated />

## Introduction

- **Overview**: GitLab social login is a user who uses GitLab as the identity provider to securely log in to a third-party application or website. By configuring and enabling GitLab's social login in {{$localeConfig.brandName}}, you can quickly obtain basic open information of GitLab through {{$localeConfig.brandName}} and help users achieve password-free login.
- **Application scenarios**: PC website
- **End-User Preview**:

![](./images/login.jpg)

## Precautions

- If you don't have a GitLab account, please go to [GitLab.com](https://gitlab.com/users/sign_up/) to register an account
- If you do not have an {{$localeConfig.brandName}} Console account, please go to the [{{$localeConfig.brandName}} Console](https://authing.cn/) to register a developer account.

## Step 1: Create an application in GitLab (or your GitLab instance)

Go to the application management page of GitLab (or your GitLab instance) and click "**New Application**":
![](https://cdn.authing.cn/img/20210407155621.png)

On the Create Application page, configure the following information:
- Redirect URI: Fill in `https://core.authing.cn/connection/social/<Unique Identifier>/<USERPOOL_ID>/callback`, you need to replace `<Unique Identifier>` with your `Unique Identifier` and `<USERPOOL_ID>` with your [UserPool ID](/en/guides/faqs/get-userpool-id-and-secret.md)
- Scopes: **Make sure `read_user` is checked**
![](./images/step1-2.jpg)

Finally, click "**Save Application**". After the creation is complete, you need to record the `Application ID` and `Secret`, which will be used in the next step.
![](https://cdn.authing.cn/img/20210407160341.png)

## Step 2: Configure GitLab in the {{$localeConfig.brandName}} Console

2.1 On the "**Social**" page of the {{$localeConfig.brandName}} Console, click the "**Create Connection**" button to enter the "**Choosing a Social Identity Source**" page.

![](~@imagesEnUs/guides/connections/create-social-idp.jpg)

2.2 On the "**Choosing a Social Identity Source**" page, click the "**GitLab**" card.
![](./images/add-app-1.jpg)

2.3 On the "**GitLab**" configuration page, fill in the relevant field information obtained in the step 1.
![](./images/add-app-2.jpg)

| Field                        | Description                                                                                                                                                                                                                                                                                                     |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Unique Identifier            | a. The unique identifier consists of lowercase letters, numbers, and -, and the length is less than 32 digits. <br />b. This is the unique identifier of this connection and cannot be modified after setting.                                                                                                  |
| Display Name                 | This name will be displayed on the button on the end user's login screen.                                                                                                                                                                                                                                       |
| Base URL                     | By default GitLab.com is used as the authentication endpoint, but you can also specify any private GitLab instance such as https://gitlab.example.com/.                                                                                                                                                         |
| Application ID               | The GitLab application ID obtained in the previous step.                                                                                                                                                                                                                                                        |
| Secret                       | The GitLab application key obtained in the previous step.                                                                                                                                                                                                                                                       |
| Login Mode                   | After enabling the "**Login Only Mode**", you can only log in to an existing account and cannot create a new account. Please choose carefully.                                                                                                                                                                  |
| Account Identity Association | When "**Account Identity Association**" is not enabled, a new user is created by default when a user logs in through an identity provider. After enabling "**Account Identity Association**", you can allow users to directly log in to existing accounts through "**Field Matching**" or "**Ask Binding Mode**". |

2.4 After the configuration is complete, click the "Create" or "Save" button to complete the creation.

## Step 3：Development access

- **Recommended development access method**: Use a hosted login page
- **Description of advantages and disadvantages**: The operation and maintenance are simple, and {{$localeConfig.brandName}} is responsible for the operation and maintenance. Each user pool has an independent second-level domain name; if you need to embed it into your application, you need to use the pop-up mode to log in, that is: after clicking the login button, a window will pop up, the content is the login page hosted by {{$localeConfig.brandName}}, or the browser The server redirects to the login page hosted by {{$localeConfig.brandName}}.
- **Detailed access method**:

  3.1 Create an application in the {{$localeConfig.brandName}} Console. For details, see: [How to create an application in {{$localeConfig.brandName}}](/en/guides/app/create-app.md)

  3.2 On the created "**GitLab**" identity provider connection details page, open and associate an application created in the {{$localeConfig.brandName}} Console
  ![](./images/step3.2.jpg)

  3.3 Click the "**Experience Login**" button of the app in the {{$localeConfig.brandName}} Console, and experience the "**GitLab**" login in the pop-up login window
  ![](./images/step3.3-1.jpg)
  ![](./images/step3.3-2.jpg)
